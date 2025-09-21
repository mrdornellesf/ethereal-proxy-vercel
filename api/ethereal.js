// Vercel Serverless Function (Node.js)
// GET /api/ethereal?page=1&limit=100
export default async function handler(req, res) {
  const page  = (req.query.page  || "1").toString();
  const limit = (req.query.limit || "100").toString();

  const upstream = `https://deposit-api.ethereal.trade/v1/waitlist?page=${encodeURIComponent(page)}&limit=${encodeURIComponent(limit)}`;

  const r = await fetch(upstream, {
    headers: {
      "accept": "application/json, text/plain, */*",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "referer": "https://ethereal.trade/",
      "origin": "https://ethereal.trade",
      "accept-language": "en-US,en;q=0.9"
    }
  });

  const text = await r.text();
  res
    .status(r.status)
    .setHeader("content-type", r.headers.get("content-type") || "application/json; charset=utf-8")
    .setHeader("cache-control", "no-store")
    .setHeader("access-control-allow-origin", "*")
    .send(text);
}
