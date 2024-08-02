export default async function (url, settings) {
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
  if (/image\//.test(res.headers.get("content-type"))) {
    const data = await res.text();
    return data;
  } else {
    const data = await res.json();
    if (
      data.status === false &&
      data.msg === "verify fail" &&
      !/\/user\/verify/.test(url)
    ) {
      // 打api，但狀態已被登出
      window.location = "/login";
      return;
    }
    return data;
  }
}
