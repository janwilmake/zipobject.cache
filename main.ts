export default {
  fetch: async (request: Request) => {
    const url = new URL(request.url);
    const apiKey =
      url.searchParams.get("apiKey") ||
      request.headers.get("Authorization")?.slice("Bearer ".length);
    const [owner, repo] = url.pathname.slice(1).split("/");

    if (!owner || !repo) {
      return new Response(
        "Need /owner/repo in path (and optional branch+location)",
        { status: 404 },
      );
    }
    const apiKeyPart = apiKey ? `&apiKey=${apiKey}` : "";
    const staleUithubUrl = `https://nachocache.com/1w/stale/https://uithub.com${url.pathname}?omitFiles=true&omitTree=true&accept=application/json${apiKeyPart}`;
    const response = await fetch(staleUithubUrl);
    console.log({ staleUithubUrl });
    return response;
  },
};
