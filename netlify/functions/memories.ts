import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

interface NetlifySubmission {
  id: string;
  data?: Record<string, any>;
  uploads?: Array<{ url: string }>;
}

interface MemoryItem {
  id: string;
  name: string;
  title: string;
  story: string;
  photo: string | null;
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
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
    const subs: NetlifySubmission[] = await res.json();
    const items: MemoryItem[] = subs.map(s => {
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
  } catch (e: any) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
