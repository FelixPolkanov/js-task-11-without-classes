import { fetchArticles } from './axios-servise';
import './common.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMoreBTN: document.querySelector('.load-more'),
    galleryContainer: document.querySelector('.gallery')
}

let page;
let searchQuery = '';
let hits = '';
let dataResponse = '';


refs.loadMoreBTN.classList.add("is-hidden");
refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBTN.addEventListener('click', onloadMore)


async function onSearch(evt) {
  evt.preventDefault();
  clearGalleryContainer();
  searchQuery = evt.currentTarget.elements.searchQuery.value;
  if (searchQuery === '') {
    (Notify.failure('Sorry, there are no images matching your search query. Please try again.'))
    return;
  }
  page = 1
  dataResponse = await fetchArticles(searchQuery, page);
  hits = dataResponse.hits;
  console.log(hits)
  refs.loadMoreBTN.classList.remove("is-hidden");
  appendPictureMarkup(hits) 
}




function appendPictureMarkup(hits) {
    if (hits.length === 0) {
    refs.loadMoreBTN.classList.add("is-hidden");
    (Notify.failure('Sorry, there are no images matching your search query. Please try again.'))
  } 
   const markup = hits.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
    return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`;
  }).join('');
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup) 
}
 


function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
  refs.loadMoreBTN.classList.add("is-hidden");
}



async function onloadMore() {
   console.log("текущая  страница до if", page)
    if (dataResponse.totalHits <= 40 || dataResponse.totalHits <= page * 40 ) {
    refs.loadMoreBTN.classList.add("is-hidden");
    (Notify.failure("We're sorry, but you've reached the end of search results."))
     console.log("страница внутри if", page)
     return
  } 
  page += 1;
  console.log('страница после if',  page)

   dataResponse = await fetchArticles(searchQuery, page);
   hits = dataResponse.hits;
  appendPictureMarkup(hits)
   
 }
