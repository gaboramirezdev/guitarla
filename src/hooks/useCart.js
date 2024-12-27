import { useEffect, useState } from 'react'

const useCart = () => {

    
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

    const emptyCart=()=>{
        setcart([]);
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
    {
    addGuitarToCart,
    decreaseQuantity,
    increaseQuantity,
    deleteGuitar,
    emptyCart,
    cart

    }
  )
}

export default useCart