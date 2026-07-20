import { handleMockRequest } from "./mockInterceptor";

// Limpieza de localStorage corrupto ANTES de que Redux lea
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

    // Cualquier request que no matchee un mock se devuelve como 404 local
    console.warn(`[MockAPI] Ruta no mockeada: ${init?.method || "GET"} ${url}`);
    return new Response(
      JSON.stringify({ error: `Mock: ruta no implementada ${url}` }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  };
}
