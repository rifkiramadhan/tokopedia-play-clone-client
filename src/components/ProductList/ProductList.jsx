import React from 'react';
import './ProductList.css';
import { NumericFormat } from 'react-number-format';

const ProductList = ({ products }) => (
  <div className='product-list-container'>
    <div className='product-list'>
      {products.map((product, idx) => (
        <div key={idx} className='product-card'>
          <img src={product.linkProduct} alt={product.title} />

          <h4>{product.title}</h4>

          <NumericFormat
            value={product.price}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp '}
            renderText={(value) => <p>{value}</p>}
          />
        </div>
      ))}
    </div>
  </div>
);

export default ProductList;
