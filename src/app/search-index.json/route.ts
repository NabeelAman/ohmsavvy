import { buildSearchIndex } from "@/lib/search";

// The header search palette's index, served as a static JSON file and fetched
// the first time the palette opens. Passing it as a prop to the client
// SearchButton put ~110 KB into every page's RSC payload, which every page
// load had to download, parse and hydrate even if search was never used.
// Reads only static data, so it's prerendered at build time.
export function GET() {
  return Response.json(buildSearchIndex());
}
