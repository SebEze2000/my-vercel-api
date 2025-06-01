// /api/track-click.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { fbclid, landing, pixelId, accessToken, dominio } = req.body;

  // Lógica: loguear, enviar, etc.
  console.log({ fbclid, landing, pixelId, accessToken, dominio });

  return res.status(200).json({ success: true });
}
