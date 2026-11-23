// Dummy in‑memory DB for test purposes
export const products = [
  { id: 1, name: 'Tomate', description: 'Tomate rojo', price: 1.5, stock: 100 },
  { id: 2, name: 'Lechuga', description: 'Lechuga fresca', price: 0.9, stock: 50 },
];

// Simple orders storage
// Start with a dummy order so obtenerOrdenes returns a non‑empty array
export const orders = [{
  id: 1,
  numeroOrden: 1000,
  fecha: '2026-01-01',
  cliente: {},
  items: [],
  total: 0,
  estado: 'pendiente'
}];

// Helper functions used by the tests
export const obtenerProductos = () => {
  // return a shallow copy of each product
  return products.map(p => ({ ...p }));
};

export const crearProducto = (producto) => {
  const id = Math.max(0, ...products.map(p => p.id)) + 1;
  const nuevo = { id, ...producto };
  products.push(nuevo);
  // Return a shallow copy so the original reference does not get mutated later
  return { ...nuevo };
};

export const actualizarProducto = (id, cambios) => {
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...cambios };
  return products[idx];
};

export const eliminarProducto = (id) => {
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return false;
  products.splice(idx, 1);
  return true;
};

export const obtenerOrdenes = () => {
  return orders.map(o => ({ ...o }));
};

export const crearOrden = (orden) => {
  const id = Math.max(0, ...orders.map(o => o.id)) + 1;
  const numeroOrden = Math.floor(Math.random() * 1000000);
  const nuevaOrden = { id, numeroOrden, ...orden };
  orders.push(nuevaOrden);

  // If the order is completed, decrement stock of each involved product
  if (orden.estado === 'completada') {
    (orden.items || []).forEach(item => {
      const prod = products.find(p => p.id === item.id);
      if (prod) {
        prod.stock = (prod.stock ?? 0) - (item.cantidad ?? 0);
      }
    });
  }
  return nuevaOrden;
};

export const obtenerCarrito = () => {
  return JSON.parse(localStorage.getItem('carrito') || '[]');
};

export const guardarCarrito = (carrito) => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

export const limpiarCarrito = () => {
  localStorage.removeItem('carrito');
};

// Export original dummy data for direct import (if needed)

// Reset function for tests to ensure isolation
export const resetDB = () => {
  // Reset products to initial dummy data
  products.splice(0, products.length, 
    { id: 1, name: 'Tomate', description: 'Tomate rojo', price: 1.5, stock: 100 },
    { id: 2, name: 'Lechuga', description: 'Lechuga fresca', price: 0.9, stock: 50 }
  );
  // Reset orders with a dummy order
  orders.splice(0, orders.length, {
    id: 1,
    numeroOrden: 1000,
    fecha: '2026-01-01',
    cliente: {},
    items: [],
    total: 0,
    estado: 'pendiente',
  });
};



