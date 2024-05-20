import axiosInstance from "../../axios"
import { CartsResponse } from "../../entity/cartsResponse"

export function getCartByUserId(id: number): Promise<CartsResponse> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosInstance.get(`/carts/user/${id}`)
            resolve((response.data))
        } catch (error) {
            reject(error)
        }
    })
}

export function addProductToCart(id: number): Promise<CartsResponse> {
    return new Promise(async (resolve, reject) => {
        try {
            const requestData = {

            }
            let response = await axiosInstance.post('/carts/add', requestData)
            resolve((response.data))
        } catch (error) {
            reject(error)
        }
    })
}