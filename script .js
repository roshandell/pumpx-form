async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      document.getElementById("walletAddress").innerText = "آدرس متصل: " + accounts[0];
    } catch (error) {
      alert("اتصال به کیف پول ناموفق بود");
    }
  } else {
    alert("MetaMask نصب نشده. لطفاً نصب کنید.");
  }
}

document.getElementById("logo").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.getElementById("logoPreview");
      preview.src = e.target.result;
      preview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("tokenForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const symbol = document.getElementById("symbol").value;
  const supply = document.getElementById("supply").value;
  const description = document.getElementById("description").value;
  const logo = document.getElementById("logo").files[0];

  alert(`توکن "${name}" با نماد "${symbol}" و عرضه ${supply} ثبت شد!`);
});
