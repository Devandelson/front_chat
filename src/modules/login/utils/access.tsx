import route from '@shared/enviromentUrl.ts'

export async function Access(name: string, password: string) {
    const enpointData = await fetch(`${route}api/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            password: password
        }),
        credentials: 'include'
    });
    const info = await enpointData.json();
    return info;
}