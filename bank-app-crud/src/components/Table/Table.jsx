import React, { useState } from 'react';
import './table.css';
import dots from '../../imgs/dots.svg';

function Table({ products, deleteProduct, handleOpenForm }) {
  const [searchText, setSearchText] = useState('');
  const filterProducts = (e) => setSearchText(e.target.value);

  const limitRows = () => {
    Array.from(document.querySelectorAll('.productsTable tr'))
      .forEach((row, index) => {
        row.style.display = index <= document.querySelector('.rowSelect').value ? 'table-row' : 'none';
      });
  };

  limitRows();

  return (
    <section className='tableWrapper'>
      <header className='tableHeader'>
        <span className='inputWrap'>
          <input
            className='search'
            placeholder='Search'
            onKeyDown={filterProducts}
          />
        </span>
        <button
          className='add'
          onClick={() => handleOpenForm(true)}
        >
          Agregar
        </button>
      </header>

      <table className='productsTable'>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Nombre de Producto</th>
            <th>Descripcion</th>
            <th>Fecha de Liberacion</th>
            <th>Fecha de reestructuracion</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((product) =>
              Object.values(product).some((val) =>
                val.toString().includes(searchText)
              )
            )
            .slice(0, )
            .map((product) => (
              <tr key={product.id} id={product.id}>
                <td>
                  <img className='productLogo' src={product.logo} alt='' />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.date_release.split('T')[0]}</td>
                <td>{product.date_revision.split('T')[0]}</td>
                <td id='menu'>
                  <img src={dots} alt='' />
                  <span id="menu-options">
                    <small onClick={() => handleOpenForm(true, product)}>Editar</small>
                    <small onClick={() => {window.confirm('estas seguro que quieres borrar este producto?') && deleteProduct(product.id)} }>Eliminar</small>
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <aside className='tableFooter'>
        <span className='productCount'>{products.length} Resultados</span>
        <select className='rowSelect' onChange={limitRows}>
          {[5, 10, 15, 20, 25, products.length].map((value) => (
            <option value={value}>
              {value}
            </option>
          ))}
        </select>
      </aside>
    </section>
  );
}

export default Table;
