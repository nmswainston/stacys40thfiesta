interface CarpoolSubmission {
  id: string;
  data: {
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
    seats?: string;
    location?: string;
    notes?: string;
  };
  created_at: string;
}

interface CarpoolDriver {
  firstName: string;
  lastInitial: string;
  seats: number;
  location: string;
}

interface CarpoolRider {
  firstName: string;
  lastInitial: string;
  location: string;
}

// Helper to extract first name and last initial
function sanitizeName(fullName: string): { firstName: string; lastInitial: string } {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] || '';
  const lastInitial = parts.length > 1 ? parts[parts.length - 1][0].toUpperCase() : '';
  
  return { firstName, lastInitial };
}

export const handler = async () => {
  const token = process.env.NETLIFY_TOKEN;
  const formId = process.env.NETLIFY_FORM_ID_CARPOOL;
  
  if (!token || !formId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Missing NETLIFY_TOKEN or NETLIFY_FORM_ID_CARPOOL',
        drivers: [],
        riders: []
      })
    };
  }

  try {
    const res = await fetch(`https://api.netlify.com/api/v1/forms/${formId}/submissions`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      console.error('Netlify API error:', res.status, await res.text());
      return { 
        statusCode: res.status, 
        body: JSON.stringify({ drivers: [], riders: [] }) 
      };
    }

    const submissions: CarpoolSubmission[] = await res.json();
    
    const drivers: CarpoolDriver[] = [];
    const riders: CarpoolRider[] = [];

    submissions.forEach((submission) => {
      const data = submission.data || {};
      
      if (!data.name || !data.role) return;

      const { firstName, lastInitial } = sanitizeName(data.name);
      const location = data.location || 'Unknown';

      if (data.role === 'driver') {
        const seats = parseInt(data.seats || '1', 10);
        drivers.push({
          firstName,
          lastInitial,
          seats,
          location
        });
      } else if (data.role === 'rider') {
        riders.push({
          firstName,
          lastInitial,
          location
        });
      }
    });

    // Sort by name for consistency
    drivers.sort((a, b) => a.firstName.localeCompare(b.firstName));
    riders.sort((a, b) => a.firstName.localeCompare(b.firstName));

    return { 
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60' // Cache for 1 minute
      },
      body: JSON.stringify({ drivers, riders }) 
    };
  } catch (e: any) {
    console.error('Carpool list error:', e);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ 
        error: e.message,
        drivers: [],
        riders: []
      }) 
    };
  }
};

