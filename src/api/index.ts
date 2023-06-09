import axios from 'axios';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

export enum SearchType {
  TRENDING = 'trending',
  SEARCH = 'search',
}

export type Gif = {
  id: string;
  url: string;
  title: string;
};

export const searchGifs = async (
  searchTerm: string,
  searchType: SearchType,
) => {
  const API_URL =
    searchType === 'trending'
      ? `https://api.giphy.com/v1/gifs/trending?&api_key=${API_KEY}`
      : `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${API_KEY}`;
  try {
    const response = await axios.get(API_URL);
    console.log(response);
    return response.data.data.map((gif: any) => ({
      id: gif.id,
      url: gif.images.preview_gif.url,
      title: gif.title,
    }));
  } catch (error) {
    console.error('Error fetching GIFs', error);
    return [];
  }
};
