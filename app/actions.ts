'use server';

export async function fetchBirthdays(params?: string) {
  // this is a server side action, avoids making the fetch from the client
  const lang = 'en';
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const type = 'births'; // all, births, deaths

  // API: /feed/1v/ wikipedia / { language } / onthisday / { type } / { MM } / { DD }
  try {
    if (params) {
      return {
        success: false,
        error:
          'Fetch birthdays API does not accept parameters. Please try again.',
        status: 400,
      };
    }
    // Uncomment this to test error case:
    // throw new Error('API request failed');

    const response = await fetch(
      `https://api.wikimedia.org/feed/v1/wikipedia/${lang}/onthisday/${type}/${month}/${day}`
    );

    if (!response.ok) {
      throw new Error('API request failed');
    }
    const data = await response.json();
    return { success: true, data, status: 200 };
  } catch (error) {
    // do additional things like log to Sentry
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 400,
    };
  }
}
