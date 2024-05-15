import axiosInstance from "../../axios"
import { Carts } from "../../entity/carts"

export function getCartByUserId(id: number): Promise<Carts[]> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosInstance.get(`/carts/user/${id}`)
            resolve((response.data))
        } catch (error) {
            reject(error)
        }
    })
}