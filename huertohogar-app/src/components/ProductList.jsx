import React, { useEffect, useState } from 'react';
import productService from '../services/productService.js';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      const data = await productService.list();
      setProducts(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar producto?')) {
      try {
        await productService.remove(id);
        load();
      } catch (e) {
        setError(e.message);
      }
    }
  };

  return (
    <div>
      <h2>Productos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Link to="/new">Nuevo</Link>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.price}$
            {' '}
            <Link to={`/edit/${p.id}`}>Editar</Link>
            {' '}
            <button onClick={() => handleDelete(p.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
