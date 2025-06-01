export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { fbclid, landing, pixelId, accessToken, dominio } = req.body;

  if (!fbclid || !landing || !pixelId || !accessToken || !dominio) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  console.log('Click recibido:', { fbclid, landing, pixelId, accessToken, dominio });

  return res.status(200).json({ success: true });
}
