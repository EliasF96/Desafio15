import axios from "axios"
import { useState } from "react"
export const ProductList = ({products}) => {
    
    const [updateModal, setOpenModal] = useState(false)

    const [updateValue, setupdateValue] = useState(
        {id: null, name: "", desc: "", price: ""} )

      const getValuesFromEvent = (index)=>{
        axios.get(`http://localhost:3000/products/${index}`)
        .then(info => {
            setupdateValue({ id:info.data.id,  name: info.data.name, desc: info.data.desc, price: info.data.price })
            console.log(updateValue)
            // console.log(info.data)
        })
        }
        const updateInfo= ()=>{
            let answer = window.confirm("Are you sure to Update this product?");
            if(answer){

            axios.patch(`http://localhost:3000/products/${updateValue.id}`, updateValue)
            .then(alert("The product has been updated successfully"))
            .then(updatedData=> console.log(updatedData))
            window.location.reload()
        }else{
            alert("Action Denied!")
        }}

        
    return (
        <>
        <div className='productContainer'>
        {
            products.map( product => (
            <article  key={product.id}>
                <h2>{product.name}</h2>
                
                <h3>{product.desc}</h3>
                <h3>PRICE</h3>
                <h3>{product.price}</h3>
                <button className='updateButton' value={product.id} onClick={(e)=> {
                    setOpenModal(true)
                    getValuesFromEvent(e.target.value)
                }}>Update</button>

                <button className='deleteButton' onClick={()=> {
                let answer = window.confirm("confirm delete this product?");
                if(answer){
                        axios.delete(`http://localhost:3000/products/${product.id}` )
                        .then(alert("This product has been deleted successfully"))
                        window.location.reload()
                    }else{
                        alert("Action Denied!")
                    }
                        }} >Delete</button>
            </article>  
            ))}
        </div>
        <div className={ updateModal ? "updateModal open": "updateModal"}>
      <h2>UPDATE YOUR PRODUCT</h2>
      <input type="text" placeholder='Enter name'  value={updateValue.name} onChange={e=> {
       setupdateValue({ id:updateValue.id,  name:e.target.value, desc:updateValue.desc, price: updateValue.price })
            // console.log(updateValue) 
        }} required />
      <input type="text" placeholder='Enter desc' value={updateValue.desc} onChange={e=> {
       setupdateValue({ id:updateValue.id,  name:updateValue.name, desc:e.target.value, price: updateValue.price })
            // console.log(updateValue) 
        }} required />
      <input type="text" placeholder='Enter price' value={ updateValue.price } onChange={e=> {
       setupdateValue({ id:updateValue.id,  name:updateValue.name, desc:updateValue.desc, price:e.target.value })
            // console.log(updateValue) 
        }} required  />
        <div className="updateButtonContainer">
            <button  onClick={updateInfo}>UPDATE</button>
            <button onClick={()=> setOpenModal(false)}>CLOSE</button>
        </div>
    </div>
        </>
    )
}