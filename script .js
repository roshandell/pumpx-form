async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      alert("کیف پول متصل شد: " + accounts[0]);
    } catch (error) {
      alert("اتصال ناموفق بود");
    }
  } else {
    alert("MetaMask نصب نشده. لطفاً نصب کنید.");
  }
}

document.getElementById("tokenForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const symbol = document.getElementById("symbol").value;
  const supply = document.getElementById("supply").value;
  const description = document.getElementById("description").value;
  const logo = document.getElementById("logo").value;

  alert(`توکن "${name}" با نماد "${symbol}" و عرضه ${supply} ساخته شد!`);
});
