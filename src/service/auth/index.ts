
import { User } from '../../entity/user';
import axiosInstance from "../../axios";

export function login(username: string, password: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
        try {
            const requestData = {
                username: username,
                password: password,
                expiresInMins: 1
            }
            let response = await axiosInstance.post('/auth/login', requestData)
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