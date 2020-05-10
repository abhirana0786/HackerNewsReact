import axios from 'axios';

export const baseUrl = 'http://hn.algolia.com/api/v1/';

//export const StoryUrl = `${baseUrl}search_by_date?tags=story`;

// export const getStory = async (storyId) => {
//     const result = await axios.get(StoryUrl).then(({ data }) => data);
//     return result;
// }
export const getStoryData = async (payload) => {
    const result = await axios.get(`${baseUrl}search?tags=front_page&hitsPerPage=20&page=${payload.page}`).then(({ data }) => data);
    return result;
}