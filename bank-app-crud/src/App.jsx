import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import Table from "./components/Table/Table";
import { fetchRequest } from './fetch.custom';

function App() {
  const [products, setProducts] = useState([]);
  const [openForm, setOpenForm] = useState({ open: false, product: null });

  const handleOpenForm = (bool, product) => {
    setOpenForm({
      open: bool,
      product
    });
  };

  const fetchData = async () => {
    const data = await fetchRequest(
      "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products",
      "GET",
      null
    );
    setProducts(data);
    setOpenForm({ open: false, product: null });
  }

  useEffect(() => {
    fetchData();
  }, [setProducts]);

  const saveHandler = productData => {
    if(openForm.product) editProduct(productData)
    else newProduct(productData)
  }

  const editProduct = async productData => {
    await fetchRequest(
      "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products",
      "PUT",
      productData
    )
    await fetchData();
  }

  const deleteProduct = async productId => {
    window.location.reload(false)
    await fetchRequest(
      `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products?id=`+productId,
      "DELETE",
      null
    )
    await fetchData();
  }

  const newProduct = async productData => {
    await fetchRequest(
      "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products",
      "POST",
      productData
    )

    await fetchData();
  }

  return (
    <div className="App">
      <div className="bankLogo">
        <img
          className="bankLogo"
          src="https://www.bancopichincha.com.co/o/pichincha-theme/images/logo.png"
          alt="Bank Logo"
        />
      </div>

      {!openForm.open ? (
        <Table products={products} handleOpenForm={handleOpenForm} openForm={openForm} deleteProduct={deleteProduct}/>
      ) : (
        <Form handleOpenForm={handleOpenForm} openForm={openForm} onSave={saveHandler} onGoBack={() => setOpenForm({ open: false, product: null })} />
      )}
    </div>
  );
}

export default App;
