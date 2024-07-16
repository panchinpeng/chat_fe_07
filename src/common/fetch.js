export default async function(url, settings) {
    try {
        const res = settings ? await fetch(url,{
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(settings.body),
            method: settings.method,
        }) : await fetch(url, {
            credentials: "include"
        });
        const data = await res.json();
        return data;
    } catch(e) {
        console.log("error", e);
    }
}