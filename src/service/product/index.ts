import axios from "axios"
import { Product } from "../../entity/products"

export function getProductList(): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios.get("https://dummyjson.com/products?limit=0&delay=1000")
            resolve(productsInfosToProductsEntities(response.data.products))
        } catch (error) {
            reject(error)
        }
    })
}
export function getProductById(id: number): Promise<Product> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios.get(`https://dummyjson.com/products/${id}`)
            resolve(productInfoToProductEntity(response.data))
        } catch (error) {
            reject(error)
        }
    })
}
export function addProduct(payload: Product): Promise<Product> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios.post('https://dummyjson.com/products/add', payload)
            resolve(productInfoToProductEntity(response.data))
        } catch (error) {
            reject(error)
        }
    })
}
export function updateProduct(id: number, payload: Product): Promise<Product> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios.put(`https://dummyjson.com/products/${id}`, payload)
            resolve(productInfoToProductEntity(response.data))
        } catch (error) {
            reject(error)
        }
    })
}
export function getProductsCategories(): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios.get("https://dummyjson.com/products/categories")
            resolve(response.data)
        } catch (error) {
            reject(error)
        }
    })
}
export function getproductsBycategory(categoryName: string): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios.get(`https://dummyjson.com/products/category/${categoryName}`)
            resolve(productsInfosToProductsEntities(response.data.products))
        } catch (error) {
            reject(error)
        }
    })
}
export function searchProducts(searchText: string): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios.get(`https://dummyjson.com/products/search?q=${searchText}`)
            resolve(productsInfosToProductsEntities(response.data.products))
        } catch (error) {
            reject(error)
        }
    })
}
function productsInfosToProductsEntities(productsInfos: any): Product[] {
    let products: Product[] = productsInfos.map((productInfo: Product) => productInfoToProductEntity(productInfo))
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