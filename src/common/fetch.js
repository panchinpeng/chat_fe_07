export default async function (url, settings) {
  try {
    const res = settings
      ? await fetch(url, {
          credentials: "include",
          headers: settings.headers
            ? settings.headers
            : {
                "Content-Type": "application/json",
              },
          body:
            settings.body instanceof FormData
              ? settings.body
              : JSON.stringify(settings.body),
          method: settings.method,
        })
      : await fetch(url, {
          credentials: "include",
        });
    console.log();
    if (/image\//.test(res.headers.get("content-type"))) {
      const data = await res.text();
      return data;
    } else {
      const data = await res.json();
      return data;
    }
  } catch (e) {
    console.log("error", e);
  }
}
