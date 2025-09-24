import { Connection, clusterApiUrl, PublicKey, Transaction } from "https://esm.sh/@solana/web3.js@1.95.3";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID,
} from "https://esm.sh/@solana/spl-token@0.4.6?bundle";

const $ = (id) => document.getElementById(id);
const statusEl = $("status");
const resultEl = $("result");
let wallet = null;
let network = "devnet";
let connection = new Connection(clusterApiUrl(network), "confirmed");

$("network").addEventListener("change", (e) => {
  network = e.target.value;
  connection = new Connection(clusterApiUrl(network), "confirmed");
});

$("connect").addEventListener("click", async () => {
  try {
    if (!window.solana || !window.solana.isPhantom) {
      alert("Phantom نصب نیست. لطفاً Phantom را نصب کنید.");
      return;
    }
    const resp = await window.solana.connect();
    wallet = new PublicKey(resp.publicKey.toString());
    $("create").disabled = false;
    $("connect").textContent = `متصل: ${wallet.toBase58().slice(0,4)}…${wallet.toBase58().slice(-4)}`;
  } catch (e) {
    console.error(e);
    alert("اتصال ناموفق بود");
  }
});

$("create").addEventListener("click", async () => {
  if (!wallet) return alert("ابتدا به Phantom وصل شوید.");

  const name = $("name").value.trim();
  const symbol = $("symbol").value.trim();
  const decimals = parseInt($("decimals").value, 10) || 9;
  const supplyHuman = Number($("supply").value || "0");
  if (supplyHuman <= 0) return alert("عرضه اولیه معتبر نیست.");

  setStatus("ساخت Mint جدید...");
  resultEl.classList.add("hidden");
  try {
    // Phantom signer adapter
    const provider = window.solana;
    const signer = {
      publicKey: wallet,
      signTransaction: async (tx) => provider.signTransaction(tx),
      signAllTransactions: async (txs) => provider.signAllTransactions(txs),
    };

    // 1) ایجاد مینت
    const mintPk = await createMint(
      connection,
      signer,
      wallet, // mintAuthority
      wallet, // freezeAuthority (می‌تونی null بدهی)
      decimals,
      undefined,
      undefined,
      TOKEN_PROGRAM_ID
    );

    // 2) حساب مرتبط کاربر (ATA)
    setStatus("ساخت حساب توکن...");
    const ata = await getOrCreateAssociatedTokenAccount(connection, signer, mintPk, wallet);

    // 3) محاسبه مقدار عرضه
    const amount = BigInt(Math.round(supplyHuman * (10 ** decimals)));

    // 4) مینت به کاربر
    setStatus("مینت کردن عرضه اولیه...");
    const sig = await mintTo(connection, signer, mintPk, ata.address, wallet, Number(amount));

    setStatus("انجام شد ✅");
    resultEl.classList.remove("hidden");
    const txUrl = `https://explorer.solana.com/tx/${sig}?cluster=${network==="devnet"?"devnet":""}`;
    const addrUrl = `https://explorer.solana.com/address/${mintPk.toBase58()}?cluster=${network==="devnet"?"devnet":""}`;
    resultEl.innerHTML = `
      <div>آدرس مینت: <code>${mintPk.toBase58()}</code></div>
      <div><a href="${addrUrl}" target="_blank">مشاهده Mint در Explorer</a></div>
      <div><a href="${txUrl}" target="_blank">تراکنش ساخت/مینت</a></div>
      <div style="opacity:.75;margin-top:8px">نام/نماد UI: ${name} (${symbol}) — برای ثبت دائمی، مرحله‌ی بعد Metadata روی‌چین است.</div>
    `;
  } catch (e) {
    console.error(e);
    setStatus("خطا در ساخت توکن");
    alert(e?.message ?? e);
  }
});

function setStatus(t){ statusEl.textContent = t; }
