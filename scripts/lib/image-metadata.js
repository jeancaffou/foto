"use strict";

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "../..");
const cache = new Map();

function jpegSize(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) { offset += 1; continue; }
    const marker = buffer[offset + 1];
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    if (marker === 0xd8 || marker === 0xd9) { offset += 2; continue; }
    const length = buffer.readUInt16BE(offset + 2);
    if (length < 2) break;
    offset += length + 2;
  }
  return null;
}

function webpSize(buffer) {
  if (buffer.length < 30 || buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") return null;
  const type = buffer.toString("ascii", 12, 16);
  if (type === "VP8X") {
    return {
      width: 1 + buffer.readUIntLE(24, 3),
      height: 1 + buffer.readUIntLE(27, 3)
    };
  }
  if (type === "VP8 ") {
    const marker = buffer.indexOf(Buffer.from([0x9d, 0x01, 0x2a]), 20);
    if (marker >= 0 && marker + 7 < buffer.length) {
      return {
        width: buffer.readUInt16LE(marker + 3) & 0x3fff,
        height: buffer.readUInt16LE(marker + 5) & 0x3fff
      };
    }
  }
  if (type === "VP8L" && buffer[20] === 0x2f) {
    const bits = buffer.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1
    };
  }
  return null;
}

function svgSize(buffer) {
  const source = buffer.toString("utf8", 0, Math.min(buffer.length, 8192));
  const viewBox = source.match(/\bviewBox=["']\s*[-.\d]+\s+[-.\d]+\s+([.\d]+)\s+([.\d]+)\s*["']/i);
  const width = source.match(/\bwidth=["']([.\d]+)(?:px)?["']/i)?.[1];
  const height = source.match(/\bheight=["']([.\d]+)(?:px)?["']/i)?.[1];
  if (width && height) return { width: Math.round(Number(width)), height: Math.round(Number(height)) };
  if (viewBox) return { width: Math.round(Number(viewBox[1])), height: Math.round(Number(viewBox[2])) };
  return null;
}

function imageMetadata(urlPath) {
  const cleanUrl = String(urlPath ?? "").split(/[?#]/, 1)[0];
  if (cache.has(cleanUrl)) return cache.get(cleanUrl);
  if (!cleanUrl.startsWith("/assets/")) return null;
  let decoded;
  try { decoded = decodeURI(cleanUrl); } catch { decoded = cleanUrl; }
  const filePath = path.resolve(ROOT, "src", decoded.replace(/^\/+/, ""));
  if (!filePath.startsWith(path.join(ROOT, "src", "assets") + path.sep) || !fs.existsSync(filePath)) return null;
  const buffer = fs.readFileSync(filePath);
  const extension = path.extname(filePath).toLowerCase();
  let dimensions = null;
  let mimeType = "application/octet-stream";
  if ([".jpg", ".jpeg"].includes(extension)) { dimensions = jpegSize(buffer); mimeType = "image/jpeg"; }
  else if (extension === ".png") { dimensions = buffer.length >= 24 ? { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) } : null; mimeType = "image/png"; }
  else if (extension === ".gif") { dimensions = buffer.length >= 10 ? { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) } : null; mimeType = "image/gif"; }
  else if (extension === ".webp") { dimensions = webpSize(buffer); mimeType = "image/webp"; }
  else if (extension === ".svg") { dimensions = svgSize(buffer); mimeType = "image/svg+xml"; }
  const metadata = dimensions ? { ...dimensions, mimeType } : { mimeType };
  cache.set(cleanUrl, metadata);
  return metadata;
}

module.exports = { imageMetadata };
