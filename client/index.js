import "./index.scss";

const server = "http://localhost:3042";

document.querySelectorAll(".balance-fields").forEach((el) => {
  el.addEventListener('input', () => {
    const frontAddress = document.getElementById("exchange-address").value;
    const inputPrivateKey = document.getElementById("private-key").value;
    document.getElementById("wallet-error").innerHTML = '';

    if (!frontAddress || !inputPrivateKey) {
      document.getElementById("balance").innerHTML = ' ' + 0;
      return;
    }

    fetch(`${server}/balance/${frontAddress}/${inputPrivateKey}`).then((response) => {
      return response.json();
    }).then(({ balance, error }) => {
      document.getElementById("balance").innerHTML = ' ' + balance +' Available';
      if (error) {
        document.getElementById("wallet-error").innerHTML = error;
      }
    });
  });
});

document.getElementById("transfer-amount").addEventListener('click', () => {
  const sender = document.getElementById("exchange-address").value;
  const amount = document.getElementById("send-amount").value;
  const recipient = document.getElementById("recipient").value;
  const inputPrivateKey = document.getElementById("private-key").value;
  document.getElementById("transfer-success").innerHTML = '';
  document.getElementById("transfer-error").innerHTML = '';

  const body = JSON.stringify({
    sender, amount, recipient, inputPrivateKey
  });

  const request = new Request(`${server}/send`, { method: 'POST', body });

  fetch(request, { headers: { 'Content-Type': 'application/json' }}).then(response => {
    return response.json();
  }).then(({ balance, error }) => {
    document.getElementById("balance").innerHTML = balance;
     if (error) {
       document.getElementById("transfer-error").innerHTML = 'Transfer Failed: ' + error;
     } else {
       document.getElementById("transfer-success").innerHTML = 'Transfer Success: ' + amount + ' sent to (' + recipient + ')';
     }
  });
});