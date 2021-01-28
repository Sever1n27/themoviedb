const bearer = `Bearer ${process.env.RAZZLE_ACCESS_TOKEN}`;

export async function dataProvider(url: string, method = "GET", params?: any) {
  const urlString = new URL(`https://api.themoviedb.org/3/${url}`);
  let body = null;

  if (params) {
    if (method === "GET") {
      Object.keys(params).forEach((key) =>
        urlString.searchParams.append(key, params[key])
      );
    }
    if (method === "POST") {
      body = JSON.stringify(params);
    }
  }

  try {
    const response = await fetch(`${urlString.toString()}`, {
      method,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json;charset=utf-8",
      },
      body,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
