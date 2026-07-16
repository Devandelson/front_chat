import route from '@shared/enviromentUrl.ts'

export async function createUser(name: string, password: string) {
    const enpointData = await fetch(`${route}api/login/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            password: password
        })
    });

    if (enpointData.ok) {
        const info = await enpointData.json();
        return {message: info.message, state: true};
    } else {
        return {state: false};
    }
}