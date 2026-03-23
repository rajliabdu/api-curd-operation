// Instructions:
// 1. Install dependencies:
//    npm install axios
// 2. Install json-server globally (or locally):
//    npm install -g json-server
// 3. Create db.json (example below) next to your project and run:
//    json-server --watch db.json --port 3001
// 4. Start your React app and open this component
import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const App = () => {
  // state to store product inputs
  const [products,setProducts]=useState([])
  const [editingId,setEditingId]=useState(null)
 console.log(products);
  // state for form inputs

  const [form ,setForm] =useState({
    name:'',
    price:'',
    desc:'',
  })
  // loading states forfetching products
   const [loading,setLoading]=useState(false)

  // error  msg state
   const [error,setError]=useState(null)
// get:fetch products from api
useEffect(()=>{
  fetchProducts()
},[])

const fetchProducts = async()=>{
  setLoading(true)//start loading
  setError(null)//clear previous errors

      
 
 
  try{
 const res =await axios.get('http://localhost:3001/products') //Api call
 setProducts(res.data)//store products in state



}catch (error){
  setError('unable to fetch products')
console.log(error);

 }finally{
  setLoading(false)//stop loading
 }

}
//delet product /remove product
      const deleteproduct = async(id)=>{
        if (!window.confirm('Delete this product ?'))return;
        try{
          await axios.delete(`http://localhost:3001/products/${id}`)
          // remove product from UI
           setProducts(p => p.filter(item => item.id !== id) )
        }
        
        catch (error){

        }

      }


      //create new product
      const createProduct =async(e)=>{

        


        
  }
 const handleEdit = (product) => {

  setForm({
    name: product.name,
    price: product.price,
    desc: product.desc
  })
   setEditingId(product.id) 
}


const handleSubmit  =async (e) => {
   e.preventDefault()//prevent page reload
        if(!form.name.trim()){
        setError('Name is required')
         return;
        }
try{

    if(editingId){
            //update product data
            
            const res = await axios.put
            (`http://localhost:3001/products/${editingId}`,{...form})
           setProducts(prev => prev.map( item =>item.id === editingId ? res.data:item))
           setEditingId(null)
            setForm({
                name:'',
                price:'',
                desc:'',
                        })
                 }
  else{

              //convert price to number
                  const payload = {...form,price:Number(form.price || 0)}
                  console.log(payload);
                  
                    //sent post request
                    const res = await axios.post('http://localhost:3001/products',payload)
                    setProducts(prev =>[...prev,res.data])    
                    setForm({
                name:'',
                price:'',
                desc:'',
                        })
  
   }
          }


        
          catch (error){

          }
      
  }


  return (
    <div>
        <h1>products</h1>
        <p>{form.name}</p>
          <p>{form.price}</p>
            <p>{form.desc}</p>
        <p></p>
        <form onSubmit={handleSubmit}>

         {/* //name */}
         <label htmlFor="">Name</label>
         <input type="text"
         placeholder='Enterproduct name'
         required
         value ={form.name}
         onChange={(e)=>setForm({...form,name :e.target.value})}/>
       {/* onchange - to take input value from input field */}

         {/* price */}
              <label htmlFor="">Price</label>
              <input type="number"
                placeholder='Enter product price'
                required
                value ={form.price}
                onChange={(e)=>setForm({...form,price :e.target.value})}/>
                

              {/* description */}
        <label htmlFor="">Description</label>
        <input type="text"
          placeholder='Enter product desc'
          required
          value ={form.desc}
          onChange={(e)=>setForm({...form,desc :e.target.value})}/>
          
            {/* submit button */}
          <button type='submit'>{editingId ?'update product':'create product' }</button>
          </form>
        <hr />



<h1>product list</h1>
{/* loading state */}
{loading ?(<p>loading...</p>):products.length === 0?(<p>no products</p>):(
  <ul>
    {/* take data using map function */}
{
  products.map((item)=>(
<li key ={item.id}>
    <h3>{item.name} </h3>
    <h5>{item.price}</h5>
    <p>{item.desc}</p>
<button onClick={()=>deleteproduct(item.id)}>Delete</button>
<button onClick={()=>handleEdit(item)}>Edit</button>
   
    <hr />

  </li>

  ))
}

</ul>
)}


    
    </div>
  )
}

export default App


// import React from 'react'



//  import { useEffect,useState } from 'react'
//  import axios from 'axios'


// const App = () => {
//   const [user,setUser] = useState([])

//     useEffect(()=>{
//       axios.get('https://jsonplaceholder.typicode.com/users')
//       .then((response)=>{
//         console.log(response);
        
//         setUser(response.data)
//       })
//       .catch((error)=>{
//         console.log('error' , error);
        
//       })

//   } , [])
//   return (
//     <div>
// <h1>users list</h1>
// {
//   user.map((user)=>(
//     <div key={user.id}>
//       <h2> {user.name}</h2>
//       <p>{user.email}</p>
//       <hr />


//     </div>
//   ))
// }

//     </div>
//   )
// }

// export default App



// import React from 'react'


// import { useEffect,useState } from 'react'
// // using async await
// const App = () => {
//    const [data,setData] =useState([])
//    useEffect (()=>{
//     const fetchData  = async ()=>{
//        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
//          const result = await response.json()
//          setData(result)

//       }
//        fetchData()
//    },[])
//   return (
//     <>

// <h1>post list</h1>
//  {
//  data.map((item)=>(
//   <div
//       key={item.id}>
//        <h4>{ item.title}</h4>
//        <p>{ item.body}</p>
//       <hr />

//    </div>
//  ))

 


//  }

   
//     </>
//      )

// } 



// export default App

//using promise

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
// import { useEffect } from 'react'

// function App() {
//    const [data,setData] =useState([])
//    useEffect(()=>{
//     fetch('https://jsonplaceholder.typicode.com/posts ')
//     .then((res)=>res.json())
//     .then((result)=>{
//       console.log(result);
//       setData(result)
      
//     })
//     .catch((err)=>{
//       console.log('error',err);
      
//     })
//    },[])

//   return (
//     <>
//   <h1>post list</h1>
//  {
// data.map((item)=>(
//   <div
//      key={item.id}>
//       <h4>{ item.title}</h4>
//       <p>{ item.body}</p>
//       <hr />

//   </div>

// ))
//  }

    
//     </>
//   )
// }

// export default App
