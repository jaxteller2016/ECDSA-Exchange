const users = require('./User');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

const balances = {}

for (let i = 0; i < users.length; i++) {

        const {
                balance, 
                key,
                publicKey, 
                address, 
                privateKey,  
                publicX, 
                publicY,
      } = users[i];
      users[i].id = i; 
    }
 Object.entries(balances).forEach(([key, value]) => {


  console.log(`${key}: ${value}`); // "a 5", "b 7", "c 9"
});

console.log(`Succesfully generated >>>>${users.length} users!`);


// function signed(transaction) {
//   const tHash = SHA256(transaction);
//   const signature = user.signKey.sign(tHash.toString());
//   return signature;
// }


users.forEach(function(user,i) {   
  balances[user.address] = user.balance;
  console.log(`Balance for Address: ${user.address} is ${user.balance} `);
  console.log(`PrivateKey: ${user.privateKey}`);
 
});  
console.log(balances);


app.get('/balance/:frontAddress/:inputPrivateKey', (req, res) => {
  const frontAddress = req.params.frontAddress;
  const inputPrivateKey = req.params.inputPrivateKey;
  let balance = 0;
  let error = '';

  if (frontAddress && inputPrivateKey) {

  for (const [i, user] of users.entries()) {
   
    if (user.address === frontAddress && user.address in balances && inputPrivateKey === user.privateKey) {
      // SUCCESS
      balance = balances[user.address];
      console.log(balance);
      break;
    } else {
      // FAIL
      if (!balances.hasOwnProperty(frontAddress)) {
        error = "Wallet address not found!!";
      } else {
        console.log(inputPrivateKey);
        console.log(typeof inputPrivateKey);
        console.log(user.privateKey);
        console.log(typeof user.privateKey);
        error = "GET: Private key does not match this wallet address!";
        
      };
    }
  }
  };
 
  res.send({balance: balance, error: error});
});

app.post('/send', (req, res) => {
  const {sender, recipient, amount, inputPrivateKey} = req.body;
  let error = '';

  if (sender && recipient && inputPrivateKey && amount > 0) {
    // const key = ec.keyFromPrivate(privateKey);
    // const walletId = getWalletIdFromPublicKey(getPublicHexFromKey(key));

    for (const [i, user] of users.entries()) {

    if (user.address === sender && user.address in balances && recipient in balances && (balances[user.address] - amount) >= 0) {
      // SUCCESS
      balances[sender] -= amount;
      balances[recipient] = (balances[recipient] || 0) + +amount;
      console.log({
        sender, 
        recipient, 
        amount, 
        inputPrivateKey});
      break;
    } else {
      // FAIL
      if ((balances[sender] - amount) < 0) {
        error = "Insufficient balance."
      } else if (!balances.hasOwnProperty(recipient)) {
        error = "Unknown recipient address";
      } else if (!balances.hasOwnProperty(sender)) {
        error = "Unknown sender address";
      } else if (user.address !== sender) {
        console.log(inputPrivateKey);
        console.log(typeof inputPrivateKey);
        console.log(user.privateKey);
        console.log(typeof user.privateKey);
        console.log(user.address);
        console.log(sender);
        
        error = " POST: Private key does not match this wallet address!";
      }
    }
  }
  res.send({balance: balances[sender] || 0, error: error});
  console.log(balances);
}
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

//console.log(wallets);