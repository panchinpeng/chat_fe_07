export default async function (url, settings) {
  const isFormData = settings?.body instanceof FormData;
  const res = settings
    ? await fetch(`${url}`, {
        credentials: "include",
        withCredentials: true,
        headers: isFormData
          ? settings.headers || undefined
          : settings.headers
          ? settings.headers
          : {
              "Content-Type": "application/json",
            },
        body: isFormData ? settings.body : JSON.stringify(settings.body),
        method: settings.method,
      })
    : await fetch(`${url}`, {
        credentials: "include",
      });
  const contentType = res.headers.get("content-type") || "";

  if (res.status === 204) {
    return { status: res.ok };
  }

  if (/image\//.test(contentType)) {
    const data = await res.text();
    return data;
  }

  const parseBody = async () => {
    if (/application\/json/.test(contentType)) {
      try {
        return await res.json();
      } catch (e) {
        return null;
      }
    }

    const text = await res.text();
    return text ? { status: res.ok, msg: text } : { status: res.ok };
  };

  const data = await parseBody();

  if (!res.ok) {
    return {
      status: false,
      statusCode: res.status,
      msg: data?.msg || res.statusText || "request fail",
      data,
    };
  }

  if (!data) {
    return { status: false, msg: "invalid json response" };
  }

  if (
    data.status === false &&
    data.msg === "verify fail" &&
    !/\/user\/verify/.test(url) &&
    !/\/user\/logout/.test(url)
  ) {
    // 打api，但狀態已被登出
    window.location = "/login";
    return;
  }
  return data;
}
