import { createContext, useState } from "react";


//This code is creating a React Context object 
//called ProductContext and a Provider component 
//called ProductProvider. The ProductContext is initialized 
//with an empty object, and the Provider component contains state variables 
//for addCart, products, filterdProduct, and wishlistBag. The Provider component also 
//contains functions for setting the values of each of these state variables. The Provider component 
//is then passed the children props which will be rendered 
//within the context of this Provider.
export const ProductContext = createContext({});
export const ProductProvider = ({ children }) => {

    const [addCart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [filterdProduct, setFilteredProduct] = useState([]);
    const [wishlistBag, setWishListBag] = useState([])


return (
    <ProductContext.Provider
      value={{
        products,
        addCart,
        filterdProduct,
        wishlistBag,
        setProducts,
        setCart,
        setFilteredProduct,

      }}
    >
      {children}
    </ProductContext.Provider>
    )
}
