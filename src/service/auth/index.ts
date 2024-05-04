
import { User } from '../../entity/user';
import axiosInstance from "../../axios";
import { Profile } from '../../entity/profile';

export function login(username: string, password: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
        try {
            const requestData = {
                username: username,
                password: password,
                expiresInMins: 30
            }
            let response = await axiosInstance.post('/auth/login', requestData)
            resolve(userInfoToUserEntity(response.data))
        } catch (error) {
            reject(error)
        }
    });
}

export function authenticateUser(): Promise<Profile> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axiosInstance.get('/auth/me')
            resolve(profileInfoToProfileEntity(response.data))
        } catch (error) {
            reject(error)
        }
    })
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
    let firstName = response.firstName
    if (firstName) {
        user.firstName = firstName
    }
    let lastName = response.lastName
    if (lastName) {
        user.lastName = lastName
    }
    let gender = response.gender
    if (gender) {
        user.gender = gender
    }
    let image = response.image
    if (image) {
        user.image = image
    }
    return user
}

function profileInfoToProfileEntity(response: any) {
    let profile = new Profile()
    let username = response.username
    if (username) {
        profile.username = username
    }
    let firstName = response.firstName
    if (firstName) {
        profile.firstName = firstName
    }
    let lastName = response.lastName
    if (lastName) {
        profile.lastName = lastName
    }
    let email = response.email
    if (email) {
        profile.email = email
    }
    let age = response.age
    if (age) {
        profile.age = age
    }
    let birthDate = response.birthDate
    if (birthDate) {
        profile.birthDate = birthDate
    }
    let bloodGroup = response.bloodGroup
    if (bloodGroup) {
        profile.bloodGroup = bloodGroup
    }
    let phone = response.phone
    if (phone) {
        profile.phone = phone
    }
    let ssn = response.ssn
    if (ssn) {
        profile.ssn = ssn
    }
    let address = response.address
    if (address) {
        profile.address = address
    }
    let image = response.image
    if (image) {
        profile.image = image
    }
    return profile
}