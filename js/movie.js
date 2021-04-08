/* using api to show films from movie database*/ 
const APIURL = 'https://api.themoviedb.org/3/discover/movie?api_key=b84566034ae4d00d77950d5426f0c71c';
const imgpath = 'https://image.tmdb.org/t/p/w500'

let poster = document.querySelector('#poster');
let title = document.querySelector('#film-title');
let rating = document.querySelector('#film-rating');
let overview = document.querySelector('#overview');
let films = document.querySelector('.films');
let container = document.querySelector('.container');
let genreContainer = document.querySelector('.genre-container');

/* fechting from api*/ 
 async function getfilms (){
     let filmreq = await fetch(APIURL);
     let filmData = await filmreq.json();
     console.log(filmData);
 /* looping through each result of Discover api*/ 
     filmData.results.forEach(film =>{
        let filmEL = document.createElement('div');
        filmEL.classList.add('film');
         filmEL.innerHTML = `<a onclick="make_storage('${film.id}')" href="#"><img id="poster" src="${imgpath + film.poster_path}" alt="">
         <div class="film-info">
             <h3 id="film-title">${film.title}</h3>
             <p id="film-rating">${film.vote_average}</p>
             
            </div></a>
          `;
        films.appendChild(filmEL);

        /* adding a pop up */ 
            let popup = document.createElement('div');
            popup.classList.add('popup');
            popup.innerHTML = `<div>
            <h3 class="popup-title">${film.title}</h3>
            <h5 class="popup-date">${film.release_date}</h5>
            <p >${film.overview}</p>
            <a onclick="make_storage('${film.id}')" href="#">Details</a></div>`;
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
 
 /* clearing the previous search*/
 function clearSearch(){
     while(search_result.firstChild){
        search_result.removeChild(search_result.firstChild);
     }
     
 }
 /* clearing the main content to only display the search results*/
 function clearMain(){
     while(films.firstChild){
         films.removeChild(films.firstChild);
     }
 }


/* using  input to search*/ 
 search_film.addEventListener("submit",resultfilm);

/* passing a film id value from the search api 
 to session storage to use film id variable 
in the next page  */ 
 function make_storage(id){
    sessionStorage.setItem('movieID',id);
    window.location = 'single';
    return false;
};
 

/* requesting api function */ 
        async function resultfilm(e){
                 e.preventDefault();
                 /* calling the functions to clear the main content and previous search */
                 clearSearch();
                 clearMain();
                let searchWord = search_input.value ;
                console.log(searchWord);
                let searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=b84566034ae4d00d77950d5426f0c71c&language=en-US&page=1&query=${searchWord}`
                let searchreq = await fetch(searchAPI);
                let searchresp = await searchreq.json();
                console.log(searchresp);
                
                 /* looping through search result then using film id 
                 value on click to pass it tosingle film page*/ 
                searchresp.results.forEach(result=>{
                    let foundfilmEL = document.createElement('div');
                    foundfilmEL.classList.add('film');
                    foundfilmEL.innerHTML = `
                    <a id="result-film" onclick="make_storage('${result.id}')" href="#"><img src="${imgpath + result.poster_path}" alt="">
                    <h3>${result.title}</h3>
                    <h3>${result.vote_average}</h3></a>`;
                    search_result.appendChild(foundfilmEL);
                    
                });  
               
        }
        /* the dedicated single film using film id from session storage*/ 
                async function single_film(){
                    let filmID = sessionStorage.getItem('movieID');
                    let filmAPI = `https://api.themoviedb.org/3/movie/${filmID}?api_key=b84566034ae4d00d77950d5426f0c71c`;
                    let singleReq = await fetch(filmAPI);
                    let singleResponse = await singleReq.json();
                    console.log(singleResponse);
                    films.innerHTML = 
                    `<div class="single">
                        <img src="${imgpath + singleResponse.poster_path}" alt="poster">
                        <div class ="single-info">
                            <h3>${singleResponse.title}</h3>
                            <div class="rate-date">
                            <h3>Release Date: ${singleResponse.release_date}</h3>
                            <h4>Score : <span>${singleResponse.vote_average}</span></h4>
                            </div>
                            
                            <p>Plot:<br><br>${singleResponse.overview}</p>
                            <a href="index.php">return to main page</a>                                                                                             
                        </div>  
                    </div>
                    `; 

                        for(i=0; i<singleResponse.genres.length; i++){
                            let Filmgenres = document.createElement('p');
                            Filmgenres.classList.add('genres');
                            Filmgenres.innerHTML = `${singleResponse.genres[i].name}`;
                            
                            console.log(Filmgenres);
                           
                            genreContainer.appendChild(Filmgenres);

                            
                           
                        }
                   

                }
                    

        