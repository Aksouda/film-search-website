/* using api to show films from movie data base*/ 
const APIURL = 'https://api.themoviedb.org/3/discover/movie?api_key=b84566034ae4d00d77950d5426f0c71c';
const imgpath = 'https://image.tmdb.org/t/p/w500'

let poster = document.querySelector('#poster');
let title = document.querySelector('#film-title');
let rating = document.querySelector('#film-rating');
let overview = document.querySelector('#overview');
let films = document.querySelector('.films');

/* fechting from api*/ 
 async function getfilms (){
     let filmreq = await fetch(APIURL);
     let filmData = await filmreq.json();
     console.log(filmData);
 /* looping through each result of Discover api*/ 
     filmData.results.forEach(film =>{
        let filmEL = document.createElement('div');
        filmEL.classList.add('film');
         filmEL.innerHTML = `<img id="poster" src="${imgpath + film.poster_path}" alt="">
         <div class="film-info">
             <h3 id="film-title">${film.title}</h3>
             <p id="film-rating">${film.vote_average}</p>
            </div> `;
        films.appendChild(filmEL);

        /* adding a pop up */ 
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


 /* search film funcions
 introducing input elements*/ 
 const search_film = document.getElementById('search-film');
 const search_input = document.getElementById('search-word');
 const search_result = document.getElementById('search-result');
 
/* using  input to search*/ 
 search_film.addEventListener("submit",resultfilm);

/* passing a film id to session storage to use film id variable in the next page*/ 
 function make_storage(id){
    sessionStorage.setItem('movieID',id);
    window.location = 'single';
    return false;
};
 

/* requesting api function */ 
        async function resultfilm(e){
                 e.preventDefault();
                let searchWord = search_input.value ;
                console.log(searchWord);
                let searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=b84566034ae4d00d77950d5426f0c71c&language=en-US&page=1&query=${searchWord}`
                let searchreq = await fetch(searchAPI);
                let searchresp = await searchreq.json();
                console.log(searchresp);
                
                searchresp.results.forEach(result=>{
                    let foundfilmEL = document.createElement('div');
                    foundfilmEL.classList.add('film');
                    foundfilmEL.innerHTML = `<img src="${imgpath + result.poster_path}" alt="">
                    <h3>${result.title}</h3>
                    <a onclick="make_storage('${result.id}')" href="#">more info</a>`;
                    search_result.appendChild(foundfilmEL);
                    
                });  
               
        }
        /* the dedicated single film using film id from session storage*/ 
                async function single_film(){
                    let filmID = sessionStorage.getItem('movieID');
                    let filmAPI = `https://api.themoviedb.org/3/movie/${filmID}?api_key=b84566034ae4d00d77950d5426f0c71c`;
                    let singleReq = await fetch(filmAPI);
                    let singleResponse = await singleReq.json();

                    films.innerHTML = `<div class="single">
                    <img src="${imgpath + singleResponse.poster_path}" alt="">
                    <h3>${singleResponse.title}</h3>
                    <h3>${singleResponse.release_date}</h3>
                    <h4>${singleResponse.vote_average}</h4>
                    <p>${singleResponse.overview}</p>
                    <a href="index.php">return to main page</a>
                    </div>
                    
                    `;

                }
                    

        