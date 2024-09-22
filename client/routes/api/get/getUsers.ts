import axios from 'axios'
import { Users } from '../../../lib/types'

export const getUsers = async ():Promise <Users[]> => {
    const getUsersURL = 'http://127.0.0.1:8080/api/users'
    try{
        const response = await axios.get(getUsersURL)
        
       return response.data.users
    }catch(error: Error | unknown){
        if(error instanceof Error){
            throw new Error(`Error in fetching data, ${error.message}`)
        } else {
            throw new Error(`Unkown Error`)
        }
    }
}