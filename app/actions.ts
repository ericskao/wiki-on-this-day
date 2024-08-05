'use server';

export type FetchBirthdaysParamsType = { date?: Date; fail?: boolean };

export async function fetchBirthdays(params: FetchBirthdaysParamsType) {
  // this is a server side action, avoids making the fetch from the client
  const type = 'births'; // all, births, deaths

  // API: /feed/1v/ wikipedia / { language } / onthisday / { type } / { MM } / { DD }
  try {
    if (params?.fail || !params?.date) {
      return {
        success: false,
        error: 'API request failed. Please try again later.',
        status: 400,
      };
    }
    const month = params.date.getMonth() + 1;
    const day = params.date.getDate();
    const response = await fetch(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/${type}/${month}/${day}`
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
