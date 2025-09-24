async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      alert("کیف پول متصل شد: " + accounts[0]);
    } catch (error) {
      alert("اتصال ناموفق بود");
      console.error("Wallet connection failed:", error);
    }
  } else {
    alert("MetaMask نصب نشده. لطفاً نصب کنید.");
  }
}
