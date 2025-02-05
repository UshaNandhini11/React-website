import { Product } from "../../entity/products"
import axiosInstance from "../../axios"

export function springbootAPICallService(): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosInstance.get('http://localhost:8080/api/test')
            console.log("response in springbootAPICallService:::" + String(response.data))
            resolve(response.data)
        } catch (error) {
            console.log("Error in springbootAPICallService::" + error)
            reject(error)
        }
    })
}
export function getProductDetails(): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosInstance.get("http://localhost:8080/api/products")
            resolve(productsInfosToProductsEntities(response.data))
        } catch (error) {
            console.log("Error in getProductList::" + error)
            reject(error)
        }
    })
}
export function getProductList(value: number): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosInstance.get(`/products?limit=${value}`)
            resolve(productsInfosToProductsEntities(response.data.products))
        } catch (error) {
            console.log("Error in getProductList::" + error)
            reject(error)
        }
    })
}
export function getProductById(id: number): Promise<Product> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosInstance.get(`/products/${id}`)
            resolve(productInfoToProductEntity(response.data))
        } catch (error) {
            console.log("Error in getProductById::" + error)
            reject(error)
        }
    })
}
export function addProduct(payload: Product): Promise<Product> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosInstance.post('/products/add', payload)
            resolve(productInfoToProductEntity(response.data))
        } catch (error) {
            console.log("Error in addProduct::" + error)
            reject(error)
        }
    })
}
export function updateProduct(id: number, payload: Product): Promise<Product> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosInstance.put(`/products/${id}`, payload)
            resolve(productInfoToProductEntity(response.data))
        } catch (error) {
            console.log("Error in updateProduct::" + error)
            reject(error)
        }
    })
}
export function getProductsCategories(): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosInstance.get("products/category-list")
            console.log("categorylist::" + response.data)
            resolve(response.data)
        } catch (error) {
            console.log("Error in getProductsCategories::" + error)
            reject(error)
        }
    })
}
export function getproductsBycategory(categoryName: string): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosInstance.get(`/products/category/${categoryName}`)
            resolve(productsInfosToProductsEntities(response.data.products))
        } catch (error) {
            console.log("Error in getproductsBycategory::" + error)
            reject(error)
        }
    })
}
export function searchProducts(searchText: string): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosInstance.get(`/products/search?q=${searchText}`)
            resolve(productsInfosToProductsEntities(response.data.products))
        } catch (error) {
            console.log("Error in searchProducts::" + error)
            reject(error)
        }
    })
}
export function deleteProduct(id: number): Promise<Product> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosInstance.delete(`/products/${id}`)
            resolve(productInfoToProductEntity(response.data))
        } catch (error) {
            console.log("Error in deleteProduct::" + error)
            reject(error)
        }
    })
}
function productsInfosToProductsEntities(productsInfos: any): Product[] {
    let products: Product[] = productsInfos.map((productInfo: Product) =>
        productInfoToProductEntity(productInfo))
    return products
}
function productInfoToProductEntity(productInfo: any): Product {
    let product = new Product()
    let id = productInfo.id
    if (id) {
        product.id = id
    }
    let title = productInfo.title
    if (title) {
        product.title = title
    }
    let description = productInfo.description
    if (description) {
        product.description = description
    }
    let price = productInfo.price
    if (price) {
        product.price = Number(price)
    }
    let brand = productInfo.brand
    if (brand) {
        product.brand = brand
    }
    let rating = productInfo.rating
    if (rating) {
        product.rating = Number(rating)
    }
    let category = productInfo.category
    if (category) {
        product.category = category
    }
    let thumbnail = productInfo.thumbnail
    if (thumbnail) {
        product.thumbnail = thumbnail
    }
    let images = productInfo.images
    if (images) {
        product.images = images
    }
    let stock = productInfo.stock
    if (stock) {
        product.stock = Number(stock)
    }
    let discountPercentage = productInfo.discountPercentage
    if (discountPercentage) {
        product.discountPercentage = Number(discountPercentage)
    }
    return product
}