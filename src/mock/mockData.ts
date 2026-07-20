import { IArticulo, IArticuloManufacturado, ICategoria, IEmpresa, IPromocion, ISucursal, IUnidadMedida } from "../types/empresa";
import { IPais, IProvincia, ILocalidad } from "../types/ubicacion";
import { ICliente, IUsuario } from "../types/usuario";
import { TipoPromocion } from "../types/enums";

const U = "https://images.unsplash.com/photo";

export const mockEmpresas: IEmpresa[] = [
  {
    id: 1,
    nombre: "Buen Sabor",
    razonSocial: "Buen Sabor S.A.",
    cuil: 30711234568,
    imagenEmpresa: { id: "emp-1", url: `${U}-1414234699778-b0ba7b0b1e9d?w=200&h=200&fit=crop`, name: "buen-sabor" },
  },
];

export const mockSucursales: ISucursal[] = [
  {
    id: 1,
    nombre: "Buen Sabor Centro",
    horarioApertura: "08:00",
    horarioCierre: "22:00",
    imagenSucursal: { id: "suc-1", url: `${U}-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop`, name: "centro" },
    esCasaMatriz: true,
    empresa: mockEmpresas[0],
    domicilio: { id: 1, calle: "San Martín", numero: 123, cp: 5000, localidad: { id: 1, nombre: "Córdoba", provincia: { id: 1, nombre: "Córdoba", pais: { id: 1, nombre: "Argentina" } } } },
  },
  {
    id: 2,
    nombre: "Buen Sabor Norte",
    horarioApertura: "09:00",
    horarioCierre: "23:00",
    imagenSucursal: { id: "suc-2", url: `${U}-1552566626-52f8b828add9?w=400&h=300&fit=crop`, name: "norte" },
    esCasaMatriz: false,
    empresa: mockEmpresas[0],
    domicilio: { id: 2, calle: "Colón", numero: 456, cp: 5001, localidad: { id: 1, nombre: "Córdoba", provincia: { id: 1, nombre: "Córdoba", pais: { id: 1, nombre: "Argentina" } } } },
  },
  {
    id: 3,
    nombre: "Buen Sabor Sur",
    horarioApertura: "10:00",
    horarioCierre: "21:00",
    imagenSucursal: { id: "suc-3", url: `${U}-1559339352-11d035aa65de?w=400&h=300&fit=crop`, name: "sur" },
    esCasaMatriz: false,
    empresa: mockEmpresas[0],
    domicilio: { id: 3, calle: "Belgrano", numero: 789, cp: 5002, localidad: { id: 2, nombre: "Mendoza", provincia: { id: 2, nombre: "Mendoza", pais: { id: 1, nombre: "Argentina" } } } },
  },
];

export const mockUnidadesMedida: IUnidadMedida[] = [
  { id: 1, denominacion: "Unidad" },
  { id: 2, denominacion: "Gramo" },
  { id: 3, denominacion: "Kilogramo" },
  { id: 4, denominacion: "Litro" },
  { id: 5, denominacion: "Mililitro" },
];

export const mockCategorias: ICategoria[] = [
  {
    id: 1, denominacion: "Hamburguesas", esInsumo: false, esParaVender: true,
    sucursales: [{ id: 1 }, { id: 2 }, { id: 3 }],
    subCategorias: [
      { id: 11, denominacion: "Hamburguesas Clásicas", esInsumo: false, esParaVender: true, sucursales: [{ id: 1 }, { id: 2 }, { id: 3 }] },
      { id: 12, denominacion: "Hamburguesas Premium", esInsumo: false, esParaVender: true, sucursales: [{ id: 1 }, { id: 2 }] },
    ],
  },
  {
    id: 2, denominacion: "Pizzas", esInsumo: false, esParaVender: true,
    sucursales: [{ id: 1 }, { id: 2 }, { id: 3 }],
    subCategorias: [
      { id: 21, denominacion: "Pizzas Tradicionales", esInsumo: false, esParaVender: true, sucursales: [{ id: 1 }, { id: 2 }, { id: 3 }] },
      { id: 22, denominacion: "Pizzas Especiales", esInsumo: false, esParaVender: true, sucursales: [{ id: 1 }, { id: 2 }] },
    ],
  },
  {
    id: 3, denominacion: "Bebidas", esInsumo: true, esParaVender: true,
    sucursales: [{ id: 1 }, { id: 2 }, { id: 3 }],
    subCategorias: [
      { id: 31, denominacion: "Gaseosas", esInsumo: true, esParaVender: true, sucursales: [{ id: 1 }, { id: 2 }, { id: 3 }] },
      { id: 32, denominacion: "Aguas", esInsumo: true, esParaVender: true, sucursales: [{ id: 1 }, { id: 2 }, { id: 3 }] },
    ],
  },
  {
    id: 4, denominacion: "Postres", esInsumo: false, esParaVender: true,
    sucursales: [{ id: 1 }, { id: 3 }],
    subCategorias: [
      { id: 41, denominacion: "Helados", esInsumo: false, esParaVender: true, sucursales: [{ id: 1 }, { id: 3 }] },
      { id: 42, denominacion: "Tortas", esInsumo: false, esParaVender: true, sucursales: [{ id: 1 }] },
    ],
  },
];

const subCat = (parentId: number, subIndex: number): ICategoria => {
  const parent = mockCategorias.find((c) => c.id === parentId)!;
  return parent.subCategorias![subIndex];
};

export const mockArticulosManufacturados: IArticuloManufacturado[] = [
  {
    id: 1, denominacion: "Hamburguesa Clásica", precioVenta: 1200, esInsumo: false,
    categoria: subCat(1, 0), categoriaId: 11,
    unidadMedida: mockUnidadesMedida[0], unidadMedidaId: 1,
    imagenes: [{ id: "img-1", url: `${U}-1568901346375-23c9450c58cd?w=400&h=300&fit=crop`, name: "burger-clasica" }],
    descripcion: "Hamburguesa con carne, lechuga, tomate y queso",
    tiempoEstimadoMinutos: 15,
    preparacion: "Cocinar la carne, agregar vegetales y queso",
    articuloManufacturadoDetalles: [{ id: 1, cantidad: 1, baja: false }],
    stockActual: 50, stockMinimo: 5,
  },
  {
    id: 2, denominacion: "Hamburguesa con Cheddar", precioVenta: 1500, esInsumo: false,
    categoria: subCat(1, 0), categoriaId: 11,
    unidadMedida: mockUnidadesMedida[0], unidadMedidaId: 1,
    imagenes: [{ id: "img-2", url: `${U}-1550547660-d9450f859349?w=400&h=300&fit=crop`, name: "burger-cheddar" }],
    descripcion: "Hamburguesa con doble cheddar y bacon",
    tiempoEstimadoMinutos: 18,
    preparacion: "Cocinar la carne, derretir cheddar, agregar bacon",
    articuloManufacturadoDetalles: [{ id: 2, cantidad: 1, baja: false }],
    stockActual: 40, stockMinimo: 5,
  },
  {
    id: 3, denominacion: "Hamburguesa Veggie", precioVenta: 1300, esInsumo: false,
    categoria: subCat(1, 1), categoriaId: 12,
    unidadMedida: mockUnidadesMedida[0], unidadMedidaId: 1,
    imagenes: [{ id: "img-3", url: `${U}-1520072959219-c595dc870360?w=400&h=300&fit=crop`, name: "burger-veggie" }],
    descripcion: "Hamburguesa de lentejas con vegetales frescos",
    tiempoEstimadoMinutos: 20,
    preparacion: "Preparar medallón de lentejas, cocinar y armar",
    articuloManufacturadoDetalles: [{ id: 3, cantidad: 1, baja: false }],
    stockActual: 30, stockMinimo: 3,
  },
  {
    id: 4, denominacion: "Pizza Mozzarella", precioVenta: 1800, esInsumo: false,
    categoria: subCat(2, 0), categoriaId: 21,
    unidadMedida: mockUnidadesMedida[0], unidadMedidaId: 1,
    imagenes: [{ id: "img-4", url: `${U}-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop`, name: "pizza-mozza" }],
    descripcion: "Pizza clásica con mozzarella y orégano",
    tiempoEstimadoMinutos: 25,
    preparacion: "Estirar masa, agregar salsa y queso, hornear",
    articuloManufacturadoDetalles: [{ id: 4, cantidad: 1, baja: false }],
    stockActual: 20, stockMinimo: 3,
  },
  {
    id: 5, denominacion: "Pizza Napolitana", precioVenta: 2200, esInsumo: false,
    categoria: subCat(2, 1), categoriaId: 22,
    unidadMedida: mockUnidadesMedida[0], unidadMedidaId: 1,
    imagenes: [{ id: "img-5", url: `${U}-1574071318508-1cdbab80d002?w=400&h=300&fit=crop`, name: "pizza-napo" }],
    descripcion: "Pizza con mozzarella, tomate fresco y albahaca",
    tiempoEstimadoMinutos: 25,
    preparacion: "Estirar masa, agregar salsa, mozzarella y tomate, hornear",
    articuloManufacturadoDetalles: [{ id: 5, cantidad: 1, baja: false }],
    stockActual: 15, stockMinimo: 3,
  },
  {
    id: 6, denominacion: "Pizza Pepperoni", precioVenta: 2500, esInsumo: false,
    categoria: subCat(2, 1), categoriaId: 22,
    unidadMedida: mockUnidadesMedida[0], unidadMedidaId: 1,
    imagenes: [{ id: "img-6", url: `${U}-1628840042765-356cda07504e?w=400&h=300&fit=crop`, name: "pizza-pepperoni" }],
    descripcion: "Pizza con pepperoni y queso extra",
    tiempoEstimadoMinutos: 30,
    preparacion: "Estirar masa, agregar salsa, pepperoni y queso, hornear",
    articuloManufacturadoDetalles: [{ id: 6, cantidad: 1, baja: false }],
    stockActual: 12, stockMinimo: 2,
  },
  {
    id: 7, denominacion: "Helado de Chocolate", precioVenta: 800, esInsumo: false,
    categoria: subCat(4, 0), categoriaId: 41,
    unidadMedida: mockUnidadesMedida[0], unidadMedidaId: 1,
    imagenes: [{ id: "img-7", url: `${U}-1501443762994-82bd5dace89a?w=400&h=300&fit=crop`, name: "helado-choco" }],
    descripcion: "Helado artesanal de chocolate belga",
    tiempoEstimadoMinutos: 5,
    preparacion: "Servir dos bochas de helado",
    articuloManufacturadoDetalles: [{ id: 7, cantidad: 1, baja: false }],
    stockActual: 100, stockMinimo: 10,
  },
  {
    id: 8, denominacion: "Torta de Frutilla", precioVenta: 1500, esInsumo: false,
    categoria: subCat(4, 1), categoriaId: 42,
    unidadMedida: mockUnidadesMedida[0], unidadMedidaId: 1,
    imagenes: [{ id: "img-8", url: `${U}-1565958011703-44f9829ba187?w=400&h=300&fit=crop`, name: "torta-frutilla" }],
    descripcion: "Torta con crema y frutillas frescas",
    tiempoEstimadoMinutos: 10,
    preparacion: "Porcionar y decorar con crema",
    articuloManufacturadoDetalles: [{ id: 8, cantidad: 1, baja: false }],
    stockActual: 8, stockMinimo: 2,
  },
];

export const mockArticulosInsumos: IArticulo[] = [
  {
    id: 101, denominacion: "Coca-Cola 500ml", precioVenta: 500, esInsumo: true,
    categoria: subCat(3, 0), categoriaId: 31,
    unidadMedida: mockUnidadesMedida[4], unidadMedidaId: 5,
    imagenes: [{ id: "img-101", url: `${U}-1554866585-cd94860890b7?w=200&h=300&fit=crop`, name: "coca-500" }],
    stockActual: 200, stockMinimo: 20,
  },
  {
    id: 102, denominacion: "Sprite 500ml", precioVenta: 500, esInsumo: true,
    categoria: subCat(3, 0), categoriaId: 31,
    unidadMedida: mockUnidadesMedida[4], unidadMedidaId: 5,
    imagenes: [{ id: "img-102", url: `${U}-1629203851122-3726ec8cb81c?w=200&h=300&fit=crop`, name: "sprite-500" }],
    stockActual: 180, stockMinimo: 20,
  },
  {
    id: 103, denominacion: "Agua Mineral 500ml", precioVenta: 350, esInsumo: true,
    categoria: subCat(3, 1), categoriaId: 32,
    unidadMedida: mockUnidadesMedida[4], unidadMedidaId: 5,
    imagenes: [{ id: "img-103", url: `${U}-1523362628745-0c100150b504?w=200&h=300&fit=crop`, name: "agua-500" }],
    stockActual: 150, stockMinimo: 30,
  },
  {
    id: 104, denominacion: "Agua Saborizada 500ml", precioVenta: 400, esInsumo: true,
    categoria: subCat(3, 1), categoriaId: 32,
    unidadMedida: mockUnidadesMedida[4], unidadMedidaId: 5,
    imagenes: [{ id: "img-104", url: `${U}-1534352956036-cd81e27dd615?w=200&h=300&fit=crop`, name: "agua-sabor" }],
    stockActual: 90, stockMinimo: 15,
  },
];

export const mockPromociones: IPromocion[] = [
  {
    id: 201, denominacion: "Combo Hamburguesa + Bebida", baja: false,
    fechaDesde: new Date("2024-01-01"), fechaHasta: new Date("2025-12-31"),
    horaDesde: new Date("2024-01-01T12:00"), horaHasta: new Date("2024-01-01T22:00"),
    descripcionDescuento: "20% de descuento en combo",
    precioPromocional: 1600,
    tipoPromocion: TipoPromocion.PROMOCION,
    promocionDetalles: { id: 1, cantidad: 1, articulo: mockArticulosManufacturados[0] },
    imagenes: [{ id: "img-201", url: `${U}-1551782450-a2132b4ba21d?w=400&h=300&fit=crop`, name: "combo-burger" }],
    sucursales: [mockSucursales[0], mockSucursales[1]],
  },
  {
    id: 202, denominacion: "2x1 en Pizzas", baja: false,
    fechaDesde: new Date("2024-01-01"), fechaHasta: new Date("2025-12-31"),
    horaDesde: new Date("2024-01-01T18:00"), horaHasta: new Date("2024-01-01T21:00"),
    descripcionDescuento: "Llevá dos pizzas al precio de una",
    precioPromocional: 2200,
    tipoPromocion: TipoPromocion.PROMOCION,
    promocionDetalles: { id: 2, cantidad: 2, articulo: mockArticulosManufacturados[3] },
    imagenes: [{ id: "img-202", url: `${U}-1513104890138-7c749659a591?w=400&h=300&fit=crop`, name: "2x1-pizza" }],
    sucursales: [mockSucursales[0], mockSucursales[2]],
  },
];

export const mockPaises: IPais[] = [
  { id: 1, nombre: "Argentina" },
  { id: 2, nombre: "Uruguay" },
];

export const mockProvincias: IProvincia[] = [
  { id: 1, nombre: "Córdoba", pais: mockPaises[0] },
  { id: 2, nombre: "Mendoza", pais: mockPaises[0] },
  { id: 3, nombre: "Buenos Aires", pais: mockPaises[0] },
  { id: 4, nombre: "Santa Fe", pais: mockPaises[0] },
  { id: 5, nombre: "Montevideo", pais: mockPaises[1] },
];

export const mockLocalidades: ILocalidad[] = [
  { id: 1, nombre: "Córdoba Capital", provincia: mockProvincias[0] },
  { id: 2, nombre: "Mendoza Capital", provincia: mockProvincias[1] },
  { id: 3, nombre: "La Plata", provincia: mockProvincias[2] },
  { id: 4, nombre: "Rosario", provincia: mockProvincias[3] },
  { id: 5, nombre: "Villa María", provincia: mockProvincias[0] },
  { id: 6, nombre: "Montevideo Capital", provincia: mockProvincias[4] },
];

export const mockUsuario: IUsuario = {
  id: 1, username: "julian", email: "test@test.com",
};

export const mockCliente: ICliente = {
  id: 1, nombre: "Julian", apellido: "Perez", telefono: "3512345678",
  fechaNacimiento: new Date("1990-01-01"),
  clave: "123456",
  usuario: mockUsuario,
  domicilios: [
    { id: 1, calle: "San Martin", numero: 123, cp: 5000, localidad: mockLocalidades[0] },
  ],
  pedidos: [],
};

export const mockPreferenceMp = {
  id: "mp-pref-123456",
  statusCode: 201,
};

export const mockSucursalesById: Record<number, ISucursal> = {};
mockSucursales.forEach(s => { mockSucursalesById[s.id!] = s; });

export const mockCategoriasById: Record<number, ICategoria> = {};
const indexCategorias = (cats: ICategoria[]) => {
  cats.forEach(c => {
    mockCategoriasById[c.id!] = c;
    if (c.subCategorias) indexCategorias(c.subCategorias);
  });
};
indexCategorias(mockCategorias);
