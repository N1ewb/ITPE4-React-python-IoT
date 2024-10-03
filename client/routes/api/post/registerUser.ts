import axios from 'axios'
export const registerUser = async (username: {username: string}, email: {email: string}, password : {password: string}, confirmPassword: {confirmPassword: string}) => {
    try{
        const URL = '/http://127.0.0.1:5000/register'
        const response = await axios.post('a')
        return response.data

    }catch(error: Error | any){
        throw new Error(`Error in fetching: ${error.message}`)
    }
}