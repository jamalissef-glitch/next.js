import React from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
}

interface ApiResponse {
  products: Product[];
}

export default async function Exercise2ProductPage() {
 const response = await fetch('https://dummyjson.com/products?limit=5');
 const data: ApiResponse = await response.json();

 return ((<React.Fragment>
  <h1>Products</h1>
  <ul>
   {data.products.map((product) => (
    <li key={product.id}>
     <h2>{product.title}</h2>
     <p>${product.price.toFixed(2)}</p>
    </li>
   ))}
  </ul>
 </React.Fragment>))
}