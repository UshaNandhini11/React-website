export class Product {
    id: number
    title: string
    description: string
    price: number
    rating: number
    brand: string
    category: string
    discountPercentage: number
    thumbnail: string
    images: string[]
    stock: number
    quantity?: number
    total?: number
    discountedPrice?: number
}