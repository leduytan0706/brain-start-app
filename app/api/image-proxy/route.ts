export async function GET(req: Request) {
    const url = new URL(req.url)
    const target = url.searchParams.get("url")
    if (!target) return new Response("Missing URL", { status: 400 })

    const res = await fetch(target)
    const buffer = await res.arrayBuffer()

    const contentType = res.headers.get("content-type");
    // console.log(contentType);
  return new Response(buffer, {
    headers: {
      "Content-Type": res.headers.get("content-type") || "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
