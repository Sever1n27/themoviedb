const bearer = `Bearer ${process.env.RAZZLE_ACCESS_TOKEN}`;

export async function dataProvider(url: string) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/${url}`, {
            method: 'GET',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json;charset=utf-8 '
            }
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}