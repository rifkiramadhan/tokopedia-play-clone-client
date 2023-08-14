import React from 'react';
import './ProductList.css';

const ProductList = ({ products }) => (
  <div className='product-list-container'>
    <div className='product-list'>
      {products.map((product, idx) => (
        <div key={idx} className='product-card'>
          <img src={product.linkProduct} alt={product.title} />

          <h4>{product.title}</h4>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  </div>
);

export default ProductList;
