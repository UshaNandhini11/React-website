import axiosInstance from "../../axios"
import { Cart } from "../../entity/carts"
import { CartsResponse } from "../../entity/cartsResponse"
import { Product } from "../../entity/products"
import { Profile } from "../../entity/profile"

export function getCartByUserId(userId: number): Promise<CartsResponse> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosInstance.get(`/carts/user/${userId}`)
            resolve((response.data))
        } catch (error) {
            console.log("Error in getCartByUserId::" + error)
            reject(error)
        }
    })
}
export function addProductToCart(productId: number, quantity: number): Promise<Cart> {
    return new Promise(async (resolve, reject) => {
        const userdata = localStorage.getItem('UserData')
        const data: Profile = userdata ? JSON.parse(userdata) : null
        console.log("userdata in  add cart service :: " + data.id)
        try {
            const requestData = {
                userId: data.id,
                products: [
                    {
                        id: productId,
                        quantity: quantity
                    }
                ]
            }
            let response = await axiosInstance.post('/carts/add', requestData)
            resolve((response.data))
        } catch (error) {
            console.log("Error in addProductToCart::" + error)
            reject(error)
        }
    })
}
export function updateProductToCart(productId: number, quantity: number): Promise<Cart> {
    return new Promise(async (resolve, reject) => {
        const userdata = localStorage.getItem('UserData')
        const data: Profile = userdata ? JSON.parse(userdata) : null
        console.log("userdata in update cart service :: " + data.id)
        try {
            const requestData = {
                merge: true,
                products: [
                    {
                        id: productId,
                        quantity: quantity
                    }
                ]
            }
            let response = await axiosInstance.put(`/carts/add/${data.id}`, requestData)
            resolve((response.data))
        } catch (error) {
            console.log("Error in updateProductToCart::" + error)
            reject(error)
        }
    })
}
export function deleteProductFromCart(productId: number): Promise<Product> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosInstance.delete(`/products/${productId}`)
            resolve((response.data))
        } catch (error) {
            console.log("Error in deleteProductFromCart::" + error)
            reject(error)
        }
    })
}