export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { fbclid, landing, pixelId, accessToken, dominio } = req.body;

  // Podés hacer console.log para verificar que llegan bien los datos
  console.log("Nuevo click recibido:", {
    fbclid,
    landing,
    pixelId,
    accessToken,
    dominio
  });

  // Si quisieras integrar lógica de guardado en base de datos o notificación, lo hacés acá.

  return res.status(200).json({ success: true });
}
