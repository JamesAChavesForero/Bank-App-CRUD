import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import Table from "./components/Table/Table";

const API_URL = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products";

function App() {
  const [products, setProducts] = useState([]);
  const [openForm, setOpenForm] = useState({ open: false, id: null });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorId: "57",
          },
        });
        if (response.status === 204) return;
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
        <Table products={products} openForm={openForm} setOpenForm={setOpenForm} />
      ) : (
        <Form state={openForm} setState={setOpenForm} />
      )}
    </div>
  );
}

export default App;
