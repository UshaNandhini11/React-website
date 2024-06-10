import axiosInstance from "../../axios"
import { Posts } from "../../entity/posts"

export function getPostsList(): Promise<Posts[]> {
    return new Promise<Posts[]>(async (resolve, reject) => {
        try {
            let response = await axiosInstance.get("/posts?limit=0&delay=1000")
            resolve(postsInfosTopostsEntities(response.data.posts))
        } catch (error) {
            console.log("Error in getPostsList::" + error)
            reject(error)
        }
    })
}

function postsInfosTopostsEntities(postsInfos: any): Posts[] {
    let posts: Posts[] = postsInfos.map((postInfo: Posts) => postInfoTopostEntity(postInfo))
    return posts
}

function postInfoTopostEntity(postInfo: any): Posts {
    let post = new Posts()
    let id = postInfo.id
    if (id) {
        post.id = id
    }
    let title = postInfo.title
    if (title) {
        post.title = title
    }
    let body = postInfo.body
    if (body) {
        post.body = body
    }
    let userId = postInfo.userId
    if (userId) {
        post.userId = Number(userId)
    }
    let tags = postInfo.tags
    if (tags) {
        post.tags = tags
    }
    let reactions = postInfo.reactions
    if (reactions) {
        post.reactions = reactions
    }
    return post
}