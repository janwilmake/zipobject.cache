const DOMAIN = "zipobject.com";
export default {
  fetch: async (request: Request) => {
    const url = new URL(request.url);

    const staleUithubUrl = new URL(
      `https://nachocache.com/1w/stale/https://${DOMAIN}/${url.pathname}`,
    );
    // take over the params
    url.searchParams.forEach((value, key) => {
      staleUithubUrl.searchParams.set(key, value);
    });

    const apiKey =
      url.searchParams.get("apiKey") ||
      request.headers.get("Authorization")?.slice("Bearer ".length);
    // but overwrite these
    if (apiKey) {
      staleUithubUrl.searchParams.set("apiKey", "apiKey");
    }
    staleUithubUrl.searchParams.set("omitFiles", "true");
    staleUithubUrl.searchParams.set("omitTree", "true");

    const response = await fetch(staleUithubUrl);
    return response;
  },
};
