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
// ---------- Module Resolution Debug ----------
const testBtn = document.createElement("button");
testBtn.className = "btn";
testBtn.textContent = "آزمایش ماژول‌ها";
document.querySelector(".tabs").after(Object.assign(document.createElement("div"),{className:"row"})).appendChild(testBtn);

const modStatus = document.createElement("div");
modStatus.className = "card";
document.querySelector(".tabs").after(modStatus);

testBtn.onclick = async () => {
  const mods = [
    "buffer","process","util","events","stream","crypto",
    "bn.js","bs58","@solana/buffer-layout","@solana/buffer-layout-utils",
    "borsh","bigint-buffer","safe-buffer","ieee754",
    "@noble/curves/ed25519","@noble/hashes/sha256","@noble/hashes/sha512","@noble/hashes/utils"
  ];
  let html = "<b>نتیجه تست ماژول‌ها:</b><ul>";
  for (const m of mods) {
    try { await import(m); html += `<li>✅ ${m}</li>`; }
    catch(e){ html += `<li>❌ ${m} — <code>${e?.message||e}</code></li>`; }
  }
  html += "</ul><div class='muted'>اگر حتی یکی ❌ بود، ImportMap آن بسته را باید اصلاح کنیم.</div>";
  modStatus.innerHTML = html;
};

