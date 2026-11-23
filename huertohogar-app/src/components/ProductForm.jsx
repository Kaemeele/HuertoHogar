import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productService from '../../services/productService.js';
import { AuthContext } from '../../context/AuthContext.jsx';

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState({ name: '', description: '', price: '', quantity: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      productService.find(id).then(setProduct).catch((e) => setError(e.message));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await productService.update(id, product);
      } else {
        await productService.create(product);
      }
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h2>{isEdit ? 'Editar' : 'Nuevo'} Producto</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Descripción:</label>
          <input name="description" value={product.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Precio:</label>
          <input name="price" type="number" step="0.01" value={product.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Cantidad:</label>
          <input name="quantity" type="number" value={product.quantity} onChange={handleChange} required />
        </div>
        <button type="submit">{isEdit ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
