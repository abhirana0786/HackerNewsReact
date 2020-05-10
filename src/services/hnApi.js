import axios from 'axios';

export const baseUrl = 'http://hn.algolia.com/api/v1/';

export const getStoryData = async (payload) => {
    const result = await axios.get(`${baseUrl}search?tags=front_page&hitsPerPage=20&page=${payload.page}`).then(({ data }) => data);
    return result;
}