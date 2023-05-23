import { createClient } from 'pexels';

const searchForm = document.querySelector('.form-control');
const btnFetch = document.querySelector('.btn-fetch');
const imagesContainer = document.querySelector('.imagesContainer');

let pageSize = 100;
btnFetch.disabled = true

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

    searchForm.value = '';
})

const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const image = entry.target
            image.src = image.dataset.lazy

            image.classList.add('appear')
            observer.unobserve(image)
        }
    })
})

function fetchSmth(query){

    const client = createClient('xf6QFcVzShVimELdDWtaeMhs3jLvQJSR7dfEl5EC9mqoj5BdPUq548rQ');

    client.photos.search({ query, per_page: pageSize })
        .then(photos => {

            for(let i = 0; i < photos.photos.length; i ++){
                const li = document.createElement('li')
            
                const image = document.createElement('img')
                image.dataset.lazy = photos.photos[i].src.original;
                
                li.append(image)
                imagesContainer.append(li)
            }
        })
        .then(data => {
            const images = document.querySelectorAll('img')

            images.forEach(image => io.observe(image))
        })
}