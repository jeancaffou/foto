"use strict";

const fs = require("node:fs");

const MYSQL_ESCAPES = {
  "0": "\0",
  b: "\b",
  n: "\n",
  r: "\r",
  t: "\t",
  Z: "\x1a"
};

function decodeEscape(character) {
  return MYSQL_ESCAPES[character] ?? character;
}

function parseQuotedValue(sql, start) {
  let value = "";
  let index = start + 1;

  while (index < sql.length) {
    const character = sql[index];

    if (character === "\\") {
      index += 1;
      if (index >= sql.length) {
        throw new Error("Unterminated escape sequence in SQL string");
      }
      value += decodeEscape(sql[index]);
      index += 1;
      continue;
    }

    if (character === "'") {
      if (sql[index + 1] === "'") {
        value += "'";
        index += 2;
        continue;
      }

      return { value, index: index + 1 };
    }

    value += character;
    index += 1;
  }

  throw new Error("Unterminated quoted value in SQL dump");
}

function parseUnquotedValue(sql, start) {
  let index = start;

  while (index < sql.length && sql[index] !== "," && sql[index] !== ")") {
    index += 1;
  }

  const token = sql.slice(start, index).trim();

  if (token.toUpperCase() === "NULL") {
    return { value: null, index };
  }

  if (/^-?\d+(?:\.\d+)?$/.test(token)) {
    return { value: Number(token), index };
  }

  return { value: token, index };
}

function skipWhitespace(sql, start) {
  let index = start;
  while (index < sql.length && /\s/.test(sql[index])) {
    index += 1;
  }
  return index;
}

function parseRows(sql, start, columns, onRow) {
  let index = start;

  while (index < sql.length) {
    index = skipWhitespace(sql, index);

    if (sql[index] === ";") {
      return index + 1;
    }

    if (sql[index] === ",") {
      index = skipWhitespace(sql, index + 1);
    }

    if (sql[index] !== "(") {
      throw new Error(`Expected row opening parenthesis at byte ${index}`);
    }

    index += 1;
    const values = [];

    for (let columnIndex = 0; columnIndex < columns.length; columnIndex += 1) {
      index = skipWhitespace(sql, index);
      const parsed = sql[index] === "'"
        ? parseQuotedValue(sql, index)
        : parseUnquotedValue(sql, index);

      values.push(parsed.value);
      index = skipWhitespace(sql, parsed.index);

      const expectedSeparator = columnIndex === columns.length - 1 ? ")" : ",";
      if (sql[index] !== expectedSeparator) {
        throw new Error(
          `Expected ${JSON.stringify(expectedSeparator)} at byte ${index} while parsing ${columns[columnIndex]}`
        );
      }
      index += 1;
    }

    onRow(Object.fromEntries(columns.map((column, columnIndex) => [column, values[columnIndex]])));
  }

  throw new Error("Unterminated INSERT statement in SQL dump");
}

function parseTables(dumpPath, requestedTables) {
  const sql = fs.readFileSync(dumpPath, "utf8");
  const requested = new Set(requestedTables);
  const tables = Object.fromEntries(requestedTables.map((table) => [table, []]));
  const headerPattern = /INSERT INTO `([^`]+)` \(([^\n]+)\) VALUES\s*/g;
  let match;

  while ((match = headerPattern.exec(sql)) !== null) {
    const table = match[1];
    const columns = [...match[2].matchAll(/`([^`]+)`/g)].map((columnMatch) => columnMatch[1]);

    if (!requested.has(table)) {
      continue;
    }

    const end = parseRows(sql, headerPattern.lastIndex, columns, (row) => tables[table].push(row));
    headerPattern.lastIndex = end;
  }

  for (const table of requested) {
    if (tables[table].length === 0) {
      throw new Error(`No rows found for required table ${table}`);
    }
  }

  return tables;
}

module.exports = { parseTables };
