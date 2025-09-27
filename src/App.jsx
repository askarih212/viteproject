import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./App.css"
// https://fakestoreapi.com/products
const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(()=>{
    const getAllProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products")
        console.log(response.data);
        setProducts(response.data);
        setFilteredProducts(response.data)
      } catch (error) {
        console.log(error);
      }
    }

    getAllProducts()
  },[])

  const handleFilterProducts = (category) => {
    if(category === "all"){
      setFilteredProducts(products)
    } else {
      const filter = products.filter((product) => product.category === category)
      setFilteredProducts(filter)
    }
  }
  return (
    <div className='container'>
      <div className="btn-container">
        <button className='btn btn-primary me-3 mt-4' onClick={() => handleFilterProducts("all")}>All</button>
        <button className='btn btn-primary me-3 mt-4' onClick={() => handleFilterProducts("men's clothing")}>Men's Clothings</button>
        <button className='btn btn-primary me-3 mt-4' onClick={() => handleFilterProducts("electronics")}>Electronics</button>
        <button className='btn btn-primary me-3 mt-4' onClick={() => handleFilterProducts("women's clothing")}>Women's Clothings</button>
        <button className='btn btn-primary me-3 mt-4' onClick={() => handleFilterProducts("jewelery")}>Jewelery</button>
      </div>
      <h1 className='text-center mt-4 mb-4'>Products</h1>
      <div className="row g-4">
        {
          filteredProducts.map((product)=>(
            <div className="col-lg-3 col-sm-6 col-12 product">
              <img src={product.image} alt="" />
              <h4>{product.title}</h4>
              <p>${product.price}</p>
              <p>Category : {product.category}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App