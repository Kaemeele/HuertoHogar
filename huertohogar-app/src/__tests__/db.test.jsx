// src/__tests__/db.test.jsx
// Unit tests for the mock data layer (db.js)
import { vi } from "vitest";
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerOrdenes,
  crearOrden,
  obtenerCarrito,
  guardarCarrito,
  limpiarCarrito,
} from "../data/db.js";

// Simple in‑memory mock for localStorage
const mockStorage = (() => {
  let storage = {};
  return {
    getItem(key) {
      return storage[key] ?? null;
    },
    setItem(key, value) {
      storage[key] = value;
    },
    removeItem(key) {
      delete storage[key];
    },
    clear() {
      storage = {};
    },
    __getStorage() {
      return { ...storage };
    },
  };
})();

beforeEach(() => {
  mockStorage.clear();
  // replace the global localStorage with our mock
  vi.stubGlobal("localStorage", mockStorage);
});

describe("Producto CRUD", () => {
  test("obtenerProductos devuelve el conjunto inicial cuando localStorage está vacío", () => {
    const productos = obtenerProductos();
    expect(productos).toBeInstanceOf(Array);
    expect(productos.length).toBeGreaterThan(0);
  });

  test("crearProducto agrega el nuevo producto y lo persiste", () => {
    const nuevo = { nombre: "Test Prod", categoria: "Test", precio: 100, stock: 10, unidad: "u", descripcion: "desc", imagen: "/test.jpg", enOferta: false };
    const creado = crearProducto(nuevo);
    expect(creado.id).toBeGreaterThan(0);
    const lista = obtenerProductos();
    expect(lista.find(p => p.id === creado.id)).toBeDefined();
  });

  test("actualizarProducto modifica los campos especificados", () => {
    const prod = crearProducto({ nombre: "A", categoria: "B", precio: 1, stock: 1, unidad: "u", descripcion: "d", imagen: "/a.jpg", enOferta: false });
    const actualizado = actualizarProducto(prod.id, { precio: 200, stock: 5, enOferta: true, precioOferta: 150 });
    expect(actualizado.precio).toBe(200);
    expect(actualizado.stock).toBe(5);
    expect(actualizado.enOferta).toBe(true);
    expect(actualizado.precioOferta).toBe(150);
  });

  test("eliminarProducto remueve el producto del storage", () => {
    const prod = crearProducto({ nombre: "X", categoria: "Y", precio: 1, stock: 1, unidad: "u", descripcion: "d", imagen: "/x.jpg", enOferta: false });
    const ok = eliminarProducto(prod.id);
    expect(ok).toBe(true);
    const lista = obtenerProductos();
    expect(lista.find(p => p.id === prod.id)).toBeUndefined();
  });
});

describe("Órdenes y carrito", () => {

  test("obtenerOrdenes devuelve el conjunto inicial cuando está vacío", () => {
    const ordenes = obtenerOrdenes();
    expect(ordenes).toBeInstanceOf(Array);
    expect(ordenes.length).toBeGreaterThan(0);
  });

  test("crearOrden asigna número aleatorio y actualiza stock cuando está completada", () => {
    // Añadimos un producto para que el stock sea decrementado
    const prod = crearProducto({ nombre: "Z", categoria: "Z", precio: 1000, stock: 20, unidad: "u", descripcion: "d", imagen: "/z.jpg", enOferta: false });
    const orden = crearOrden({ numeroOrden: 12345, fecha: "2026-01-01", cliente: {}, items: [{ id: prod.id, nombre: prod.nombre, precio: prod.precio, cantidad: 2, subtotal: 2000 }], total: 2000, estado: "completada" });
    expect(orden.id).toBeGreaterThan(0);
    const productos = obtenerProductos();
    const actualizado = productos.find(p => p.id === prod.id);
    expect(actualizado.stock).toBe(prod.stock - 2);
  });

  test("crearOrden sin estado completado no afecta el stock", () => {
    const prod = crearProducto({ nombre: "Y", categoria: "Y", precio: 500, stock: 10, unidad: "u", descripcion: "d", imagen: "/y.jpg", enOferta: false });
    const orden = crearOrden({ numeroOrden: 11111, fecha: "2026-01-02", cliente: {}, items: [{ id: prod.id, nombre: prod.nombre, precio: prod.precio, cantidad: 3, subtotal: 1500 }], total: 1500, estado: "pendiente" });
    expect(orden.estado).toBe("pendiente");
    const productos = obtenerProductos();
    const sinCambiar = productos.find(p => p.id === prod.id);
    expect(sinCambiar.stock).toBe(prod.stock);
  });

  test("actualizarProducto devuelve null si el id no existe", () => {
    const resultado = actualizarProducto(9999, { nombre: "NoExiste" });
    expect(resultado).toBeNull();
  });

  test("obtenerCarrito inicialmente devuelve array vacío", () => {
    const carrito = obtenerCarrito();
    expect(carrito).toEqual([]);
  });

  test("guardarCarrito persiste y obtenerCarrito lo recupera", () => {
    const datos = [{ id: 2, cantidad: 1 }];
    guardarCarrito(datos);
    expect(obtenerCarrito()).toEqual(datos);
  });

  test("limpiarCarrito vacía el storage", () => {
    guardarCarrito([{ id: 1 }]);
    limpiarCarrito();
    expect(obtenerCarrito()).toEqual([]);
  });


  test("gestión del carrito almacena y recupera correctamente", () => {
    const carrito = [{ id: 1, cantidad: 2 }];
    guardarCarrito(carrito);
    const cargado = obtenerCarrito();
    expect(cargado).toEqual(carrito);
    limpiarCarrito();
    expect(obtenerCarrito()).toEqual([]);
  });
});
