import axios from 'axios';

export async function fetchArticles(searchQuery, page) {
  const dataResponse = await axios.get(`https://pixabay.com/api/?key=31251439-64cf22bfdeb9633faeca9a5f6&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
   
return dataResponse.data;
}
