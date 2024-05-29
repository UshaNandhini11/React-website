export class Product {
    id: number
    title: string
    description: string
    category: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    thumbnail: string
    images: string[]
    quantity?: number
    total?: number
    discountedPrice?: number
    isDeleted: boolean
    deletedOn: string
}