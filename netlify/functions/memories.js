export const handler = async () => {
  const token = process.env.NETLIFY_TOKEN;
  const formId = process.env.NETLIFY_FORM_ID_MEMORIES;
  if(!token || !formId){
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing NETLIFY_TOKEN or NETLIFY_FORM_ID_MEMORIES' })
    };
  }
  try {
    const res = await fetch(`https://api.netlify.com/api/v1/forms/${formId}/submissions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if(!res.ok){
      return { statusCode: res.status, body: await res.text() };
    }
    const subs = await res.json();
    const items = subs.map(s => {
      const data = s.data || {};
      const photo = data.file_url || data.file || (s?.uploads && s.uploads[0]?.url) || null;
      return {
        id: s.id,
        name: data.name || data["context[name]"] || "",
        title: data.title || data["context[title]"] || "",
        story: data.story || data["context[story]"] || "",
        photo
      };
    });
    return { statusCode: 200, body: JSON.stringify({ items }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};