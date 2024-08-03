export async function fetchBirthdays(formData?: FormData) {
  console.log('viewing birthday');
  const lang = 'en';
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const type = 'births'; // all, births, deaths

  // API: /feed/1v/ wikipedia / { language } / onthisday / { type } / { MM } / { DD }
  // example GET https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/08/03
  const response = await fetch(
    `https://api.wikimedia.org/feed/v1/wikipedia/${lang}/onthisday/${type}/${month}/${day}`
  );
  const data = await response.json();
  return data;
}
