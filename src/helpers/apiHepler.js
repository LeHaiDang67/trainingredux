import axios from 'axios';
import apolloClient from '../apollo/apolloClient';

export default async function requestApi( query, variables) {
   try {
    const response = await apolloClient.query({
        query,
        variables
    });
    if(!response || !response.data){
        throw new Error("Something went wrong");
    }
    return response.data.Page;
   } catch (error) {
    throw error
   }
}
