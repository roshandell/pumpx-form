// ===== Wallet connect (ساده/دموی)
const connectBtn = document.getElementById('connectBtn');
async function connectWallet() {
  if (window.solana && window.solana.isPhantom) {
    try {
      const resp = await window.solana.connect();
      alert('Phantom: ' + resp.publicKey.toString());
    } catch(e){ console.error(e); }
  } else {
    // اگر Phantom موجود نبود، صفحه نصب باز می‌شود
    window.open('https://phantom.app/', '_blank');
  }
}
if (connectBtn) connectBtn.addEventListener('click', connectWallet);

// ===== AI Suggest (موک؛ بعداً به بک‌اند/LLM وصل می‌کنیم)
const aiForm   = document.getElementById('aiLaunchForm');
const aiOutput = document.getElementById('aiOutput');
const btnAiSuggest = document.getElementById('btnAiSuggest');

function aiSuggest() {
  const name = document.getElementById('tName').value || 'PumpX AI Token';
  const sym  = document.getElementById('tSymbol').value || 'PXA';
  const sup  = document.getElementById('tSupply').value || '1000000000';
  const liq  = document.getElementById('tLiq').value || '80';
  const brief= document.getElementById('tBrief').value || 'AI-native utility token';

  const desc = `✅ Proposal
• Name: ${name}
• Symbol: ${sym}
• Total Supply: ${Number(sup).toLocaleString()}
• Liquidity: ${liq}%
• Use-case: ${brief}
• Taxes: buy 0.5% / sell 0.5% (liquidity & ops)
• Anti-rug: lock LP, renounce mint

Next: review & click "Create Token".`;
  aiOutput.textContent = desc;
  aiOutput.classList.remove('hidden');
}
if (btnAiSuggest) btnAiSuggest.addEventListener('click', aiSuggest);

if (aiForm) aiForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('Create Token → این بخش بعداً به قرارداد سولانا وصل می‌شود.');
});

// ===== Live Ticker & Trending (داده نمونه)
const sampleTicker = [
  {sym:'PXP', price:0.0123, chg:+8.2, liq:120_000},
  {sym:'AIP', price:0.0031, chg:-2.4, liq:44_000},
  {sym:'SOL', price:172.35, chg:+1.1, liq:5_400_000},
  {sym:'MPX', price:0.00052, chg:+21.0, liq:9_100}
];
const tickEl = document.getElementById('ticker');
if (tickEl){
  tickEl.innerHTML = sampleTicker.map(t=>`
    <div class="tick">
      <div class="sym">${t.sym}</div>
      <div>$${t.price}</div>
      <div class="chg ${t.chg>=0?'up':'down'}">${t.chg}%</div>
      <div class="muted">Liq: $${t.liq.toLocaleString()}</div>
    </div>
  `).join('');
}

const sampleTrending = [
  {name:'PumpX', sym:'PXP', price:0.0123, chg:+8.2, liq:120000, holders:2134},
  {name:'AI Power', sym:'AIP', price:0.0031, chg:-2.4, liq:44000, holders:981},
  {name:'MetaPix', sym:'MPX', price:0.00052, chg:+21.0, liq:9100, holders:540}
];
const tbody = document.querySelector('#trendTable tbody');
if (tbody){
  tbody.innerHTML = sampleTrending.map(r=>`
    <tr>
      <td><span class="badge">${r.sym}</span> ${r.name}</td>
      <td>$${r.price}</td>
      <td style="color:${r.chg>=0?'#18d48a':'#ff6b6b'}">${r.chg}%</td>
      <td>$${r.liq.toLocaleString()}</td>
      <td>${r.holders.toLocaleString()}</td>
      <td><a class="btn secondary" href="#">Trade</a></td>
    </tr>
  `).join('');
}
