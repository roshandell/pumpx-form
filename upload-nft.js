// upload-nft.js
// این اسکریپت برای آپلود فایل (مثلاً لوگو یا آیکون توکن) روی NFT.Storage ساخته شده

// 🔑 اینجا API Key خودت رو قرار بده
const NFT_STORAGE_API = "396c66f2.85bd820e33d54ff5bdcffffd2dfa6549";

// تابع آپلود فایل به NFT.Storage
async function uploadToNFTStorage(file) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch("https://api.nft.storage/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NFT_STORAGE_API}`,
    },
    body: form,
  });

  const data = await res.json();

  if (data.ok) {
    const url = `https://${data.value.cid}.ipfs.nftstorage.link`;
    console.log("✅ فایل با موفقیت آپلود شد!");
    console.log("🌐 لینک IPFS:", url);
    return url;
  } else {
    console.error("❌ خطا در آپلود:", data);
  }
}

// نمونه استفاده (آپلود یک فایل انتخابی توسط کاربر)
document.getElementById("fileInput").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (file) {
    await uploadToNFTStorage(file);
  }
});
