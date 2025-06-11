export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { fbclid, landing, pixelId, accessToken, dominio } = req.body;

  console.log("Nuevo click recibido:", {
    fbclid,
    landing,
    pixelId,
    accessToken,
    dominio
  });

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxcVfpHIGukNQwmyXKtiiDpyTkq3PEqsaGbOpvHGe3eBxn1DZxUeKiN3vFo_3LIDA2oLQ/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        landing,
        pixelId,
        fbclid,
        dominio,
        accessToken
      })
    });

    const text = await response.text(); // ✅ usar text() en lugar de json()
    console.log("✅ Respuesta de Google Sheets:", text);

    return res.status(200).json({ success: true, response: text });
  } catch (err) {
    console.error("❌ Error al enviar a Google Sheets:", err);
    return res.status(500).json({ error: "Error al enviar a Google Sheets", details: err.message });
  }
}
