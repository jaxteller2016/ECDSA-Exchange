const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
const users = require('../server/User');
const ec = new EC('secp256k1');

// Take the user publicKey and signKey

const [balance, publicKey, address, signKey, publicX, publicY] = users;

// const publicKey = {
//   x: "b182c6da4b2d29412e89b1cfd63a65f64e68f6439f17ced35171a5b008c9ff73",
//   y: "62926a455c8f499eb35ab83b35a286dc5f423bb86355e1b008cfdcb5dca9d16b"
// }

const key = ec.keyFromPublic(publicKey, 'hex');

// TODO: change this message to whatever was signed
const msg = "HI I'm Sorin and I'm in the ChainShot Bootcamp, team B ;p";
const msgHash = SHA256(msg).toString();

// TODO: fill in the signature components
const signature = {
  r: "809419f9db49ad177a74bb04e57275197b5b2315841be5418a68fb10f3b9e6a8",
  s: "8e3118c34a5417e6618d8b715ea59b514b349dd4ea38ea1f4aa46ec27fe16693"
};

console.log(key.verify(msgHash, signature));
