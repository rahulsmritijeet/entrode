const SHEET_API = process.env.NEXT_PUBLIC_SHEET_API || 'YOUR_GOOGLE_APPS_SCRIPT_URL';

export async function fetchVentures() {
  try {
    const response = await fetch(`${SHEET_API}?action=getAll`);
    const data = await response.json();
    return data.ventures || [];
  } catch (error) {
    console.error('Failed to fetch ventures:', error);
    return [];
  }
}

export async function createVenture(ventureData) {
  try {
    const response = await fetch(SHEET_API, {
      method: 'POST',
      body: JSON.stringify({
        action: 'create',
        venture: ventureData
      })
    });
    const data = await response.json();
    return data.venture;
  } catch (error) {
    console.error('Failed to create venture:', error);
    throw error;
  }
}

export async function pulseVenture(id) {
  try {
    const response = await fetch(SHEET_API, {
      method: 'POST',
      body: JSON.stringify({
        action: 'pulse',
        id: id
      })
    });
    const data = await response.json();
    return data.venture;
  } catch (error) {
    console.error('Failed to pulse venture:', error);
    throw error;
  }
}

export async function investInVenture(id, investor) {
  try {
    const response = await fetch(SHEET_API, {
      method: 'POST',
      body: JSON.stringify({
        action: 'invest',
        id: id,
        investor: investor
      })
    });
    const data = await response.json();
    return data.venture;
  } catch (error) {
    console.error('Failed to invest:', error);
    throw error;
  }
}

export async function getVenture(id) {
  try {
    const response = await fetch(`${SHEET_API}?action=getOne&id=${id}`);
    const data = await response.json();
    return data.venture;
  } catch (error) {
    console.error('Failed to get venture:', error);
    return null;
  }
}