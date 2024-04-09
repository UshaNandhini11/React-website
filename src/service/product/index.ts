import axios from "axios"
import { Product } from "../../entity/products"

export function getProductList(): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios.get("https://dummyjson.com/products?limit=0")
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
        product.price = price
    }
    let brand = productInfo.brand
    if (brand) {
        product.brand = brand
    }
    let rating = productInfo.rating
    if (rating) {
        product.rating = rating
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
        product.stock = stock
    }
    let discountPercentage = productInfo.discountPercentage
    if (discountPercentage) {
        product.discountPercentage = discountPercentage
    }

    return product
}