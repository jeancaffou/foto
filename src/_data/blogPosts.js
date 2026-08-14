const wordpressPosts = require("./wordpressPosts");
const eclipsePages = require("./eclipsePages");

const latestEclipse = eclipsePages.find((page) => page.lang === "en");

module.exports = [latestEclipse, ...wordpressPosts];
