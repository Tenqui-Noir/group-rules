const UPSTREAM = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.mjs";

export async function onRequest() {
  const response = await fetch(UPSTREAM, {
    cf: {
      cacheEverything: true,
      cacheTtl: 604800
    }
  });

  if (!response.ok) {
    return new Response("PDF.js worker upstream unavailable", { status: 502 });
  }

  const headers = new Headers(response.headers);
  headers.set("Content-Type", "text/javascript; charset=utf-8");
  headers.set("Cache-Control", "public, max-age=604800");
  headers.delete("Content-Disposition");

  return new Response(response.body, {
    status: response.status,
    headers
  });
}
