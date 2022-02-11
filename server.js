const MD5 = require("crypto-js/md5");
const express = require("express");

/************************** */

const port = 3001;
const apiSecret = "RhapiQY5LfrJhikAHYQ2U05e";
const playerHost = "https://cdn.jwplayer.com/";

/************************** */

/**
 * Returns a signed url, can be used for any "non-JWT" endpoint
 * @param {string} path
 * @param {int} expires
 * @param {string} secret
 * @param {string} host
 * @returns {string} A signed url
 */
function signed_url(path, expires = 6000) {
  const base = `${path}:${expires}:${apiSecret}`;
  const signature = MD5(base);
  return `${playerHost}${path}?exp=${expires}&sig=${signature}`;
}

/************************** */

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

/************************** */

app.get("/sample.m3u8", (req, res) => {
  res.sendFile("sample.m3u8", { root: __dirname });
});

app.get("/get-signed-url", (req, res) => {
  const expiryTimeInSec = Math.ceil(+new Date()/ 1000);
  const expiryTime = expiryTimeInSec + 20
  const result = signed_url(req.query.url.replace(playerHost, ""), expiryTime);
  res.send(result);
});

/************************** */

app.listen(port, () => console.log("listning on port " + port));
