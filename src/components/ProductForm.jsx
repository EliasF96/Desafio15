import React, { useState } from 'react'
import axios from "axios"
export const ProductForm = () => {
  
  const [productFormValues, setProductFormValues] = useState({
    name: "", desc: "", price:0
  })

  const handlerUpdateFormValue= (value, reference)=>{
    // console.log(reference, value)
    if(reference == "name"){
      setProductFormValues({name: value, desc: productFormValues.desc, price: productFormValues.price})
    }else if(reference == "desc"){
      setProductFormValues({name: productFormValues.name, desc : value, price: productFormValues.price})
    }else if(reference == "price"){
      setProductFormValues({name: productFormValues.name, desc : productFormValues.desc, price: "$"+value})
    }
  }
  const handleSubmit = ()=>{
    let answer = window.confirm("Are you sure want to add this product?");
    if(answer){
        if(productFormValues.name===""){
            alert('Name must not be empty');
        }else if(productFormValues.desc===""){
          alert('Description must not be empty');
        }else if(productFormValues.price ===0){
          
          alert('Price must not be empty or negative');
        }else{
          
      axios.post("http://localhost:3000/products", {...productFormValues})
      .then(alert("This product has been added successfully"))
            window.location.reload()
        }}else{
            alert("Action Denied!")
        }
       

  }
  return (
    <>
    <div className='postForm'>
      <h2>ADD YOUR PRODUCTS</h2>
      <input type="text" placeholder='Enter name'  onChange={e=> {
       handlerUpdateFormValue(e.target.value, "name")
    }} required />
      <input type="text" placeholder='Enter desc' onChange={e=> {
       handlerUpdateFormValue(e.target.value, "desc")
    }} required />
      <input type="number" placeholder='Enter price'  onChange={e=> {
       handlerUpdateFormValue(e.target.value, "price")
    }} required  />
    <button onClick={handleSubmit}>POST</button>
    </div>
    
    </>
  )
}
