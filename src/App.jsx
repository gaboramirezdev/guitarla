
import { useEffect, useState } from 'react'
import './App.css'
import Guitar from './components/Guitar'
import Header from './components/Header'
import { db } from './data/bd'


function App() {
    const [guitars, setGuitars] = useState(db);
    const [cart, setcart] = useState(JSON.parse(localStorage.getItem('cart'))||[]);

    useEffect(() => {
      localStorage.setItem('cart',JSON.stringify(cart));
    }, [cart])
    

    const addGuitarToCart=(item)=>{

        const itemExists= cart.findIndex(g=>g.id===item.id)

        if (itemExists>=0) {
            const cart_copy=[...cart];
            cart_copy[itemExists].quantity+=1;
            setcart(cart_copy);
            return;
        }
        item.quantity=1;
        setcart(prevCart=>([...prevCart,item]))
    }

    
    const deleteGuitar=(id)=>{
        setcart(prevCart=>prevCart.filter(guitar=>guitar.id!==id));
    }

    const increaseQuantity=(id)=>{
        const updatedCart=cart.map(guitar=>{
            if(guitar.id===id) return {...guitar,quantity:guitar.quantity+1}
        else{
            return guitar;
        }
        })

        setcart(updatedCart);
    }

    const decreaseQuantity=(id)=>{
        const updatedCart=cart.map(guitar=>{
            if(guitar.id===id&&guitar.quantity>1) return {...guitar,quantity:guitar.quantity-1}
        else{
            return guitar;
        }
        })

        setcart(updatedCart);
    }
    
  return (
    <>
      
     <Header cart={cart} setcart={setcart} deleteGuitar={deleteGuitar} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity}/>

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
           {guitars.map(guitar=>(<Guitar guitar={guitar} key={guitar.id} addGuitarToCart={addGuitarToCart} />))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
