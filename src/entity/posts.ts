import { Reactions } from "./reactions"

export class Posts {
    id: number
    title: string
    body: string
    userId: number
    tags: string[]
    reactions: Reactions
    views: number
}