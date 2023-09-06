import { render, screen } from "@testing-library/react";
import App from "./App";
import '@testing-library/jest-dom';
import nock from 'nock';

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("Consume API with ", async () => {
  const productMock = {
    "id" : "jhhh-crd",
    "name" : "Prestamos en Crypto",
    "description" : "Prestamos en Crypto",
    "logo" : "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    "date_release" : "2023-06-01",
    "date_revision" : "2024-06-01"
  };

  const scope = nock(
    "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp"
  )
    .get("/products")
    .once()
    .reply(200, {
      data: "response",
    });
  
});
