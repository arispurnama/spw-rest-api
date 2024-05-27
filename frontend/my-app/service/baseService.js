import axios from 'axios';
const API_URL = 'http://localhost:3030';

// Create an Axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Base service
const baseService = {
    // Create a new resource
    create: async (endpoint, data) => {
        try {
            console.log(endpoint)
            return await api.post(endpoint, data);
            
            // return response.response;
        } catch (error) {
            console.log(error)
            handleError(error);
        }
    },

    // Update an existing resource
    update: async (endpoint, data) => {
        try {
            const response = await api.put(endpoint, data);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    // Delete a resource
    delete: async (endpoint) => {
        try {
            const response = await api.delete(endpoint);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    //getAll
    get: async(endpoint) =>{
        try {
            const response = await api.get(endpoint);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }
};

// Error handling function
const handleError = (error) => {
    if (error.response) {
        // The request was made, but the server responded with a status code outside the range of 2xx
        console.error('Error response:', error.response);
        alert(`Error: ${error.response.data.message || 'Something went wrong!'}`);
    } else if (error.request) {
        // The request was made, but no response was received
        console.error('Error request:', error.request);
        alert('Error: No response received from the server.');
    } else {
        // Something happened in setting up the request
        console.error('Error message:', error.message);
        alert(`Error: ${error.message}`);
    }
};

export default baseService