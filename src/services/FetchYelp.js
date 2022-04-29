export async function fetchRestaurantZip(zip = '97211', search = '') {
  const params = new URLSearchParams();
  params.set('zip', zip);
  params.set('search', search);
  const resp = await fetch(
    `/.netlify/functions/fetch-zip?${params.toString()}`,
    {
      headers: { Accept: 'application/json' },
    }
  );
}
