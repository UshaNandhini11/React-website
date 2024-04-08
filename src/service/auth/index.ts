import axios from "axios"
import { User } from '../../entity/user';

export function login(username: string, password: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
        try {
            const requestData = {
                username: username,
                password: password
            }
            let response = await axios.post('https://dummyjson.com/auth/login', requestData)
            resolve(userInfoToUserEntity(response.data))
        } catch (error) {
            reject(error)
        }
    });
}

function userInfoToUserEntity(response: any) {
    let user = new User()
    let username = response.username
    if (username) {
        user.username = username
    }
    let id = response.id
    if (id) {
        user.id = id
    }
    let email = response.email
    if (email) {
        user.email = email
    }
    let token = response.token
    if (token) {
        user.token = token
    }
    return user
}