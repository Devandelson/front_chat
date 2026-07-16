export async function Access(name: string, password: string) {
    const enpointData = await fetch('http://localhost:3000/api/login', {
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