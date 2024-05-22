export class Product {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
    quantity?: number
    total?: number
    discountedPrice?: number
    isDeleted: boolean
    deletedOn: string
}