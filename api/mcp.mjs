// De OneUI-MCP online, op deze site: https://<site>/mcp/<sleutel>. Alleen lezen, streamable HTTP zonder sessies.
// De server (mcp/oneui.mjs) en zijn gegevens (mcp/data.json) komen uit mcg-oneui via `npm run sync`; niet hier aanpassen.
// Zonder ONEUI_MCP_SLEUTEL in Vercel staat hij dicht.
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { readFileSync } from "node:fs";
import { maakServer } from "../mcp/oneui.mjs";

const data = JSON.parse(readFileSync(new URL("../mcp/data.json", import.meta.url), "utf8"));

export default async function handler(req, res) {
  const sleutel = process.env.ONEUI_MCP_SLEUTEL;
  const gegeven = new URL(req.url, "http://x").searchParams.get("sleutel") || (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!sleutel || gegeven !== sleutel) { res.statusCode = 401; return res.end("Geen toegang."); }
  if (req.method !== "POST") {   // geen sessies, dus geen stream om op te wachten
    res.statusCode = 405; res.setHeader("Allow", "POST");
    return res.end(JSON.stringify({ jsonrpc: "2.0", error: { code: -32000, message: "Alleen POST." }, id: null }));
  }
  const server = maakServer(data);
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  res.on("close", () => { transport.close(); server.close(); });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
}
