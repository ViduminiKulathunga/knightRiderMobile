import { create } from 'axios'
import { auth } from '../firebase'

const baseURL = 'https://us-central1-knight-rider-cabs.cloudfunctions.net/api/'

const API = create({
    baseURL: baseURL,
    timeout: 60000,
    'Content-Type': 'application/json',
});

const getAllUsers = async () => {
    try {
        const token = await auth.currentUser.getIdToken()
        //console.log("token through api", token)
        return API({
            url: 'users',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        throw error
    }
}

const updateDriverLocation = async (data) => {
    try {
        const token = await auth.currentUser.getIdToken()
        //console.log("token", token)
        return API({
            url: 'driver/location',
            method: 'post',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data
        })
    } catch (error) {
        throw error
    }
}

export {
    getAllUsers,
    updateDriverLocation
}