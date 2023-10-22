import { useEffect, useState } from 'react';
import './App.css';
import { ProductList } from './components/ProductList';
import { ProductForm } from './components/ProductForm';
import axios from "axios";

function App() {
  const [products, setProducts] = useState([])
  useEffect( ()=>{ 
    fetchProductsData()  
  },[])


  const fetchProductsData = async()=>{
    
    const {data} = await axios.get("http://localhost:3000/products")
    setProducts(data)
  }
  return (
    <>      
    <ProductForm setProducts={setProducts} />
      <ProductList products={products} />
    </>
  )
}


export default App;
