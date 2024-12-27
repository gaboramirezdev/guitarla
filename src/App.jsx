
import { useState } from 'react'
import './App.css'
import Guitar from './components/Guitar'
import Header from './components/Header'
import { db } from './data/bd'
import useCart from './hooks/useCart'


function App() {
    const [guitars, setGuitars] = useState(db);
    const{addGuitarToCart,decreaseQuantity,deleteGuitar,increaseQuantity,emptyCart,cart}=useCart();
    
  return (
    <>
      
     <Header cart={cart} emptyCart={emptyCart} deleteGuitar={deleteGuitar} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity}/>

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
