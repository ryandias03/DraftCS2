const https = require("https");

exports.handler = async (event) => {
  const url = event.queryStringParameters?.url;

  if (!url || !url.startsWith("https://liquipedia.net/")) {
    return { statusCode: 400, body: "URL inválida" };
  }

  return new Promise((resolve) => {
    const req = https.get(
      url,
      {
        headers: {
          Referer: "https://liquipedia.net/",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const buffer = Buffer.concat(chunks);
          resolve({
            statusCode: 200,
            headers: {
              "Content-Type": res.headers["content-type"] || "image/jpeg",
              "Cache-Control": "public, max-age=86400",
              "Access-Control-Allow-Origin": "*",
            },
            body: buffer.toString("base64"),
            isBase64Encoded: true,
          });
        });
      }
    );
    req.on("error", () => resolve({ statusCode: 502, body: "Erro ao buscar imagem" }));
  });
};
