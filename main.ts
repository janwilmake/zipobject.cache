import { KVNamespace, Queue, MessageBatch } from "@cloudflare/workers-types";
interface Env {
  tokens: KVNamespace;
  size: Queue;
}
type TokensValue = {
  // can be undefined if it wasn't found
  tokens?: number;
  updatedAt: number;
};

export default {
  queue: async (batch: MessageBatch<string>, env: Env) => {
    await Promise.all(
      batch.messages.map(async (message) => {
        const id = message.body;
        // TODO: Stream the zip (see how I did that before, but only get size back)
        console.log("supposed to look up " + id);

        // If not found, still enter here but without tokens

        // If found, enter here with tokens
        const value: TokensValue = { updatedAt: Date.now() };
        await env.tokens.put(id, JSON.stringify(value));
      }),
    );
  },
  fetch: async (request: Request, env: Env) => {
    const url = new URL(request.url);
    const [owner, repo] = url.pathname.slice(1).split("/");

    if (!owner || !repo) {
      return new Response("Need /owner/repo in path", { status: 404 });
    }
    const id = owner + "/" + repo;
    const size = await env.tokens.get<TokensValue>(id, "json");

    if (!size) {
      await env.size.send(id, { contentType: "text" });
      return new Response("Not found", { status: 404 });
    }

    const isWeekOld = Date.now() - size.updatedAt > 7 * 86400 * 1000;
    const isDayOld = Date.now() - size.updatedAt > 1 * 86400 * 1000;
    if (isWeekOld || (!size.tokens && isDayOld)) {
      // update required because its over a week ago
      // or it wasn't found before and it's more than a day ago
      await env.size.send(id, { contentType: "text" });
    }

    return new Response(JSON.stringify(size), { status: 200 });
  },
};
