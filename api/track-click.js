export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Only POST allowed" });
    }

    // Podés loggear si querés
    console.log("Click recibido:", req.body);

    return res.status(200).json({ success: true });
}
