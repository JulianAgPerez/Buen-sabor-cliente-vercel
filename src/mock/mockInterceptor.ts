import {
  mockArticulosInsumos,
  mockArticulosManufacturados,
  mockCategorias,
  mockCliente,
  mockEmpresas,
  mockLocalidades,
  mockPaises,
  mockPreferenceMp,
  mockPromociones,
  mockProvincias,
  mockSucursales,
  mockSucursalesById,
  mockUnidadesMedida,
} from "./mockData";

const API_BASE = "http://localhost:8080";
const SIMULATED_DELAY_MS = 300;

function getUrlObj(url: string): URL | null {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

function matchPath(
  pathname: string,
  pattern: string
): Record<string, string> | null {
  const patternParts = pattern.split("/");
  const pathParts = pathname.split("/");

  if (patternParts.length !== pathParts.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(":")) {
      params[patternParts[i].slice(1)] = pathParts[i];
    } else if (patternParts[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
}

function parseQuery(url: string): Record<string, string> {
  const urlObj = getUrlObj(url);
  if (!urlObj) return {};
  const params: Record<string, string> = {};
  urlObj.searchParams.forEach((value: string, key: string) => {
    params[key] = value;
  });
  return params;
}

function delay(ms: number = SIMULATED_DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function okResponse<T>(data: T): Response {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function paginate<T>(items: T[], page: number, size: number) {
  const start = page * size;
  const content = items.slice(start, start + size);
  return { content, totalPages: Math.ceil(items.length / size) };
}

export async function handleMockRequest(
  url: string,
  options?: RequestInit
): Promise<Response | null> {
  if (!url.includes(API_BASE)) return null;

  const method = options?.method || "GET";
  const urlObj = getUrlObj(url);
  if (!urlObj) return null;
  const pathname = urlObj.pathname;
  const query = parseQuery(url);

  await delay();

  if (method === "GET") {
    if (pathname === "/sucursales") {
      return okResponse(mockSucursales);
    }
    const sucursalMatch = matchPath(pathname, "/sucursales/:id");
    if (sucursalMatch) {
      const id = Number(sucursalMatch.id);
      return okResponse(mockSucursalesById[id] || null);
    }
    const categoriasMatch = matchPath(pathname, "/sucursales/:id/categorias");
    if (categoriasMatch) {
      return okResponse(mockCategorias);
    }
    if (pathname === "/categorias") {
      return okResponse(mockCategorias);
    }
    if (pathname === "/categorias/active") {
      return okResponse(mockCategorias);
    }
    if (pathname === "/empresa") {
      return okResponse(mockEmpresas);
    }
    if (pathname === "/paises") {
      return okResponse(mockPaises);
    }
    const provMatch = matchPath(pathname, "/provincias/findByPais/:id");
    if (provMatch) {
      return okResponse(mockProvincias);
    }
    const locMatch = matchPath(pathname, "/localidades/findByProvincia/:id");
    if (locMatch) {
      return okResponse(mockLocalidades);
    }
    if (pathname === "/articulos") {
      return okResponse([...mockArticulosManufacturados, ...mockArticulosInsumos]);
    }
    if (pathname === "/articulosManufacturados") {
      return okResponse(mockArticulosManufacturados);
    }
    if (pathname.startsWith("/articulosManufacturados/filtrar/")) {
      const page = parseInt(query["page"] || "0");
      const size = parseInt(query["size"] || "6");
      let items = [...mockArticulosManufacturados];
      if (query["nombre"]) {
        items = items.filter((a) =>
          a.denominacion.toLowerCase().includes(query["nombre"])
        );
      }
      if (query["categoriaId"]) {
        const catId = Number(query["categoriaId"]);
        items = items.filter(
          (a) => a.categoriaId === catId || a.categoria?.id === catId
        );
      }
      return okResponse(paginate(items, page, size));
    }
    if (pathname.startsWith("/articulosInsumos/filtrar/")) {
      const page = parseInt(query["page"] || "0");
      const size = parseInt(query["size"] || "6");
      let items = [...mockArticulosInsumos];
      if (query["nombre"]) {
        items = items.filter((a) =>
          a.denominacion.toLowerCase().includes(query["nombre"])
        );
      }
      if (query["categoriaId"]) {
        const catId = Number(query["categoriaId"]);
        items = items.filter(
          (a) => a.categoriaId === catId || a.categoria?.id === catId
        );
      }
      return okResponse(paginate(items, page, size));
    }
    if (pathname.startsWith("/promociones/filtrar/")) {
      const page = parseInt(query["page"] || "0");
      const size = parseInt(query["size"] || "6");
      let items = [...mockPromociones];
      if (query["nombre"]) {
        items = items.filter((p) =>
          p.denominacion.toLowerCase().includes(query["nombre"])
        );
      }
      return okResponse(paginate(items, page, size));
    }
    if (pathname === "/unidadMedida") {
      return okResponse(mockUnidadesMedida);
    }
    if (pathname === "/domicilios") {
      return okResponse([]);
    }
    if (pathname === "/categoriaSucursal") {
      return okResponse([]);
    }
    if (pathname === "/usuarios") {
      return okResponse([]);
    }
  }

  if (method === "POST") {
    if (pathname === "/clientes/login") {
      return okResponse(mockCliente);
    }
    if (pathname === "/clientes") {
      return okResponse(mockCliente);
    }
    if (pathname === "/mercadoPago/preference_mp") {
      return okResponse(mockPreferenceMp);
    }
  }

  return new Response(
    JSON.stringify({ error: `Mock: ruta no implementada ${method} ${pathname}` }),
    { status: 404, headers: { "Content-Type": "application/json" } }
  );
}
