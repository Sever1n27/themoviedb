const bearer = `Bearer ${process.env.RAZZLE_ACCESS_TOKEN}`;

export async function dataProvider(url: string, method = "GET", body?: any) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/${url}`, {
      method,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
