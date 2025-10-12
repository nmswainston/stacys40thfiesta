import type { Memory } from '../../src/features/memories/types';

// Strip HTML tags from a string
function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, '');
}

export const handler = async () => {
  const token = process.env.NETLIFY_TOKEN;
  const formId = process.env.NETLIFY_FORM_ID_MEMORIES;
  
  if (!token || !formId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing NETLIFY_TOKEN or NETLIFY_FORM_ID_MEMORIES' })
    };
  }

  try {
    const res = await fetch(`https://api.netlify.com/api/v1/forms/${formId}/submissions`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      return { statusCode: res.status, body: await res.text() };
    }

    const subs = await res.json();
    
    // Map to Memory[] and strip HTML
    const memories: Memory[] = subs.map((s: any) => {
      const data = s.data || {};
      const photoUrl = data.photo_url || data.photo || (s?.uploads && s.uploads[0]?.url) || undefined;
      
      return {
        id: s.id,
        name: stripHtml(data.name || ''),
        email: data.email || undefined,
        message: stripHtml(data.message || ''),
        photoUrl,
        createdAt: s.created_at || new Date().toISOString()
      };
    });

    // Sort newest first
    memories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return { 
      statusCode: 200, 
      body: JSON.stringify({ memories }) 
    };
  } catch (e: any) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: e.message }) 
    };
  }
};

