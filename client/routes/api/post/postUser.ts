import axios from 'axios';
import { Users } from '../../../lib/types';

export const postUser = async (userData: { name: string, email: string }): Promise<Users[]> => {
    const postUserURL = 'http://127.0.0.1:5173/api/postUser';
    try {
        const response = await axios.post(postUserURL, userData);  // Pass the data here
        return response.data;
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            throw new Error(`Error in posting data: ${error.message}`);
        } else {
            throw new Error('Unknown error occurred.');
        }
    }
};
