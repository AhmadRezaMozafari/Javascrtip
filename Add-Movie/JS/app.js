const startAddMovieButton=document.getElementById("add-movie-btn");
const backdrop=document.getElementById("backdrop");
const userInputs=document.querySelectorAll('input');
const confirmAddMovieButton=document.getElementById("confirm-add-btn");
const cancelAddMovieButton=confirmAddMovieButton.nextElementSibling;
const confirmDeleteMovieButton=document.getElementById("confirm-delete-btn");
const cancelDeleteMovieButton=confirmDeleteMovieButton.nextElementSibling;
const addMovieSection=document.getElementById("add-modal");
const deleteModalSection=document.getElementById("delete-modal");
const enteryTextSection=document.getElementById("entery-text");
const ulList=enteryTextSection.nextElementSibling;
const itemHolder=ulList.getElementsByTagName('li');

const movies=[];

const clearInput=()=>{
    for(const usrinp of userInputs){
        usrinp.value='';
    }
}

const showBackdrop=()=>{
    backdrop.classList.toggle('visible');
}

const updateUI=()=>{
    if (movies.length===0){
        enteryTextSection.style.display="block";
    }else{
        enteryTextSection.style.display="none";
    }
}

const showDeleteModal=()=>{
    deleteModalSection.classList.toggle('visible');
    showBackdrop();
}

const deleteMovies=(movieId)=>{
    let movieIndex=movies.map(itm=>itm.movieID).indexOf(movieId);
    movies.splice(movieIndex,1);
    ulList.children[movieIndex].remove();
    showDeleteModal();
    updateUI();

}

const startDeleteMovieHandler = movieId => {
    showDeleteModal();
  
    const cancelDeletionButton =document.getElementById("canc-btn");
    let confirmDeletionButton =document.getElementById("confirm-delete-btn");
    
    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
    confirmDeletionButton =document.getElementById("confirm-delete-btn");

    cancelDeletionButton.removeEventListener('click',showDeleteModal);

    cancelDeletionButton.addEventListener('click',showDeleteModal);
    confirmDeletionButton.addEventListener('click',deleteMovies.bind(null,movieId));
};

const renderNewMovieElement=(movieID,movieTitle,movieURL,movieRate)=>{
    const newLiEle=document.createElement('li');
    newLiEle.className="item-holder";
    newLiEle.innerHTML=`    
        <div class="img-holder"><img src="${movieURL}" alt="${movieTitle}"></div>
        <div class="info">
            <p>${movieTitle}</p>
            <p>${movieRate}/5</p>
        </div>
    `
    newLiEle.addEventListener('click',startDeleteMovieHandler.bind(null,movieID));
    ulList.append(newLiEle);
}

const confirmButtonHandler=()=>{
    let movieTitle=userInputs[0].value;
    let movieImageURL=userInputs[1].value;
    let movieRate=userInputs[2].value;

    if(movieTitle.trim()===''||
        movieImageURL.trim()===''||
        movieRate.trim()===''||
        +movieRate<1||
        +movieRate>5){
            
        alert("please enter all informations!!");
        return;
    }
    
    const movie={
        movieID:Math.random().toString(),
        movieTitle:movieTitle,
        movieURL:movieImageURL,
        movieRate:movieRate
    }
    movies.push(movie);
    console.log(movies);
    closeShowAddMovieModal();
    clearInput();
    renderNewMovieElement(movie.movieID,movie.movieTitle,movie.movieURL,movie.movieRate);
    updateUI();
}



const closeShowAddMovieModal=()=>{
    addMovieSection.classList.remove("visible");
    deleteModalSection.classList.remove('visible');
    showBackdrop();
}

const showAddMovieModal=()=>{
    addMovieSection.classList.toggle('visible');
    showBackdrop();
}

const backdropClickHandler=()=>{
    closeShowAddMovieModal();
    clearInput();
}
startAddMovieButton.addEventListener("click",showAddMovieModal);
backdrop.addEventListener("click",backdropClickHandler);
cancelAddMovieButton.addEventListener('click',backdropClickHandler);
confirmAddMovieButton.addEventListener("click",confirmButtonHandler);
cancelDeleteMovieButton.addEventListener('click',showDeleteModal);