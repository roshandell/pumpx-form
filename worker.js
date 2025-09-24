export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

    if (url.pathname === "/upload-image") {
      const form = await req.formData();
      const file = form.get("file");
      if (!file) return new Response("no file", { status: 400 });

      const up = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: { Authorization: `Bearer ${env.PINATA_JWT}` },
        body: form
      });
      const j = await up.json();
      return Response.json({ cid: j.IpfsHash, uri: `ipfs://${j.IpfsHash}` });
    }

    if (url.pathname === "/upload-json") {
      const meta = await req.json();
      const up = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${env.PINATA_JWT}`
        },
        body: JSON.stringify(meta)
      });
      const j = await up.json();
      return Response.json({ cid: j.IpfsHash, uri: `ipfs://${j.IpfsHash}` });
    }

    return new Response("Not found", { status: 404 });
  }
};
