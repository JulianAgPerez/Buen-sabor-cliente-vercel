import { handleMockRequest } from "./mockInterceptor";

const originalFetch = globalThis.fetch;

// ← Se ejecuta durante la fase de import, ANTES de que cualquier slice de Redux lea localStorage
(() => {
  const themeRaw = localStorage.getItem("theme");
  if (themeRaw) {
    try {
      const parsed = JSON.parse(themeRaw);
      if (!parsed || typeof parsed.isDarkMode !== "boolean") {
        throw new Error("Formato invalido");
      }
    } catch {
      localStorage.setItem(
        "theme",
        JSON.stringify({ isDarkMode: false })
      );
    }
  }
  ["cart", "selectedSucursal", "selectedCategoria", "SelectedDataSlice", "AuthUser"].forEach((key) => {
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        JSON.parse(raw);
      } catch {
        localStorage.removeItem(key);
      }
    }
  });
})();

const API_BASE = "http://localhost:8080";

export function setupMockApi() {
  console.log("[MockAPI] Mock API activado — no se requiere backend");

  globalThis.fetch = async (
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : input.url;

    const resolved = await handleMockRequest(url, init);
    if (resolved) {
      return resolved;
    }

    if (url.includes(API_BASE)) {
      return new Response(
        JSON.stringify({ error: `Mock: ruta no interceptada ${url}` }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return originalFetch(input, init);
  };
}
