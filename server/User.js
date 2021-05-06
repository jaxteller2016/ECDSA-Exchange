const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
let users = [], usersNr = 3;

while (users.length < usersNr) {

const ec = new EC('secp256k1');

let user = new Object();

    user.balance = 100;
    user.key = ec.genKeyPair();

// encode the entire public key as a hexadecimal string
user.publicKey = user.key.getPublic().encode('hex');

// get the address from the publicKey as the last 
// 40 hexadecimal characters
user.address = user.publicKey.slice(-40).toString(16);

// get the publicKeyX from the Elliptic Curve Digital Signature Algorithm
// line 5, as a "String Representation of the Number object in the 16-th radix"
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString

user.publicX = user.key.getPublic().x.toString(16);

// get the publicKeyY from the Elliptic Curve Digital Signature Algorithm
// line 5, as a "String Representation of the Number object in the 16-th radix"
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString

user.publicY = user.key.getPublic().y.toString(16);

// get the privateKey from the Elliptic Curve Digital Signature Algorithm
// line 5, as a "String Representation of the Number object in the 16-th radix"
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString

user.privateKey = user.key.getPrivate().toString(16);
   
users.push(user);

}
//    console.log(users);

module.exports = users;