export default async function handler(req, res) {
  // Manejo de preflight request (CORS)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Cambia por tu dominio si quieres limitarlo
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // CORS para otras solicitudes (como POST)
  res.setHeader('Access-Control-Allow-Origin', '*'); // Cambia por "https://landing1.corleoneteam.site" si quieres restringir
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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

  return res.status(200).json({ success: true });
}

await fetch('https://script.google.com/macros/s/AKfycbxcVfpHIGukNQwmyXKtiiDpyTkq3PEqsaGbOpvHGe3eBxn1DZxUeKiN3vFo_3LIDA2oLQ/exec', {
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
})
  .then(r => r.json())
  .then(data => {
    console.log("✅ Datos enviados a Google Sheets:", data);
  })
  .catch(err => {
    console.error("❌ Error al enviar a Google Sheets:", err);
  });

