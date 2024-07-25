import { useContext, createContext } from "react"

export const cartContext = createContext()

export const useCart = ()=> useContext(cartContext)

