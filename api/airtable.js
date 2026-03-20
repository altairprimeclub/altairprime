// api/airtable.js
export default async function handler(req, res) {
  // Разрешаем запросы с любого домена (для разработки)
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { table } = req.query;
  
  if (!table) {
    return res.status(400).json({ error: 'Missing table parameter' });
  }

  const baseId = process.env.AIRTABLE_BASE_ID;
  const token = process.env.ALTTOKEN;

  if (!baseId || !token) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${table}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Airtable' });
  }
}
