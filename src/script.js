import { createClient } from 'pexels';
import imagesCardTPL from "./templates/image-card";

const searchForm = document.querySelector('.form-control');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');
const showLessBtn = document.querySelector('[data-action="show-less"]');
const btnFetch = document.querySelector('.btn-fetch');
const imagesContainer = document.querySelector('.js-card-container');

let pageSize = 10;
btnFetch.disabled = true
loadMoreBtn.style.display = 'none';
showLessBtn.style.display = 'none';

searchForm.addEventListener('input', e => {
     
    if(searchForm.value.length == 0){
        btnFetch.disabled = true 
    }else{
        btnFetch.disabled = false
    }

})

btnFetch.addEventListener('click', e => {
    e.preventDefault();

    const query = searchForm.value;

    fetchSmth(query)

    loadMoreBtn.addEventListener('click', onLoadMore);

    function onLoadMore(){
        pageSize += 10;
    
        fetchSmth(query)
    }

    showLessBtn.addEventListener('click', onShowLess);

    function onShowLess(){
        if(pageSize > 10){
            pageSize -= 10;
        }else if (pageSize <= 10){
        }
    
        fetchSmth(query)
    }

    searchForm.value = '';
    showLessBtn.style.display = 'block';
    loadMoreBtn.style.display = 'block';
})

function fetchSmth(query){

    const client = createClient('xf6QFcVzShVimELdDWtaeMhs3jLvQJSR7dfEl5EC9mqoj5BdPUq548rQ');

    client.photos.search({ query, per_page: pageSize })
        .then(photos => {
            const markup = imagesCardTPL(photos);

            imagesContainer.innerHTML = markup
        });

}