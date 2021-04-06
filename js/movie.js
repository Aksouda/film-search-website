const APIURL = 'https://api.themoviedb.org/3/discover/movie?api_key=b84566034ae4d00d77950d5426f0c71c';
const imgpath = 'https://image.tmdb.org/t/p/w500'

let poster = document.querySelector('#poster');
let title = document.querySelector('#film-title');
let rating = document.querySelector('#film-rating');
let overview = document.querySelector('#overview');
let films = document.querySelector('.films');


 async function getfilms (){
     let filmreq = await fetch(APIURL);
     let filmData = await filmreq.json();
     console.log(filmData);
     

     filmData.results.forEach(film =>{

        let filmEL = document.createElement('div');
        filmEL.classList.add('film');
       
         filmEL.innerHTML = `<img id="poster" src="${imgpath + film.poster_path}" alt="">
         <div class="film-info">
             <h3 id="film-title">${film.title}</h3>
             <p id="film-rating">${film.vote_average}</p>
            </div> `;
        
        
        /*  rating.innerHTML = `${film.release_date}`
         overview.innerHTML = `${film.overview}` */

        films.appendChild(filmEL);

        
            let popup = document.createElement('div');
            popup.classList.add('popup');
            popup.innerHTML = `<div>
            <h3 class="popup-title">${film.title}</h3>
            <h5 class="popup-date">${film.release_date}</h5>
            <p >${film.overview}</p>
            </div>`;
            filmEL.appendChild(popup);
            

        
        

        

         
     });

     return filmData;
 }
 getfilms();

 const search_film = document.getElementById('search-film');
 const search_input = document.getElementById('search-word');
 let searchWord = search_input.value ;
 console.log(searchWord);

 search_film.addEventListener("submit",resultfilm);

 let searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=b84566034ae4d00d77950d5426f0c71c&language=en-US&page=1&query=${searchWord}`
 async function resultfilm(e){
     e.preventDefault;
     let searchreq = await fetch(searchAPI);
     let searchresp = await searchreq.json();
     console.log(searchresp);

 }