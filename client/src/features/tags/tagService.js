import axios from "axios";

const API_URL = 'http://localhost:5000/api/users/tags/'

// Get user tags
const getTags = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer: ${token}` 
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const updateTags = async (tags, token) => {
    const config = {
        headers: {
            Authorization: `Bearer: ${token}` 
        },
    }

    const response = await axios.put(API_URL, tags, config)

    return response.data
}

const tagService = {
    getTags,
    updateTags
}

export default tagService