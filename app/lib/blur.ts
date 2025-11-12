// Simple fetch→base64 helper for blur placeholders
export async function getBlurDataURL(
  src: string,
  width = 24,
  blur = 100,
): Promise<string | undefined> {
  try {
    // Sanity image API supports width + blur params
    const tinyUrl = `${src}${src.includes("?") ? "&" : "?"}w=${width}&blur=${blur}&auto=format`;
    const res = await fetch(tinyUrl, { cache: "force-cache" });
    if (!res.ok) return undefined;
    const buffer = Buffer.from(await res.arrayBuffer());
    const base64 = buffer.toString("base64");
    return `data:image/jpeg;base64,${base64}`;
  } catch {
    return undefined;
  }
}
