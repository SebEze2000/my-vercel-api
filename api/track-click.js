export default async function handler(req, res) {
  const allowedOrigin = 'https://landing2.corleoneteam.site';

  // Cabeceras CORS
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Manejo de preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { fbclid, landing, pixelId, accessToken, dominio } = req.body;

  // Validación de datos
  if (!fbclid || !landing || !pixelId || !accessToken || !dominio) {
    console.warn("⚠️ Body incompleto:", req.body);
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  console.log("✅ Nuevo click recibido:", {
    fbclid,
    landing,
    pixelId,
    accessToken,
    dominio
  });

  // Enviar a Google Sheets
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

    const text = await response.text(); // Usamos .text() en lugar de .json() por seguridad
    console.log("📤 Respuesta de Google Sheets:", text);

    return res.status(200).json({ success: true, response: text });
  } catch (err) {
    console.error("❌ Error al enviar a Google Sheets:", err);
    return res.status(500).json({ error: "Error al enviar a Google Sheets", details: err.message });
  }
}
