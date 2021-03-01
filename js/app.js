'use strict'
const searchBar = document.getElementById('searchbar')
const select = document.getElementById('select')
const ul = document.getElementById('ul')
const header = document.getElementById('header')


header.addEventListener('click', ()=>{
    ul.innerHTML="";
    searchBar.value = ''
})

searchBar.addEventListener("input", (e) =>{
    e.preventDefault
    const searchType = select.value
    const API = `https://api.jikan.moe/v3/search/${searchType}?q=`
    console.log(searchType)
    document.addEventListener('keydown', function(e){
        if(e.key === 'Enter'){
            let search = searchBar.value
            // console.log(search)
            axios.get(API + search)
            .then(function (results) {
                // handle success
                // console.log(results)
                const datas = results.data.results
                // console.log(datas)
                if(datas.length == 0){
                    ul.innerHTML="";
                    searchBar.value = ''
                    handleButtonClick(`Aucun résultats`)
                }else{
                    // console.log(datas)
                    createItem(datas)
                }               
            }).catch((error) => {
                ul.innerHTML="";
                handleButtonClick(`L'Api ne repond pas : ${error}`)
                }
            )   
        }
    })
});

const createItem = (arr) =>{
    ul.innerHTML="";
    const searchType = select.value
    for(let data of arr){
        console.log(data)
        let li = document.createElement('li')
        const episodesOrChapters = (dataType) => {
            if(dataType === "anime"){
                return data.episodes + " épisodes"
            }
            else if(dataType === "manga"){
                return data.volumes + " chapitres"
            }
        }
        li.innerHTML = `
                <a target="_blank" href="${data.url}">
                    <ion-card color="tertiary">
                        <img src="${data.image_url}"/>
                        <ion-card-subtitle>${searchType}</ion-card-subtitle>
                        ${searchType === "anime" || searchType === "manga" ? `<ion-card-subtitle class="chapter"> ${episodesOrChapters(searchType)} </ion-card-subtitle>` : '' }
                        <ion-card-header>
                            <ion-card-title>${searchType === "character" || searchType === "people" ? data.name : data.title}</ion-card-title>
                        </ion-card-header>
                        <ion-card-content>${searchType === "character" || searchType === "people" ? "Cliquez pour en savoir plus" : data.synopsis}</ion-card-content>
                    </ion-card>
                </a> 
        `
        ul.append(li)
        searchBar.value = ''   
    }
} 


async function handleButtonClick(text) {
    const toast = await toastController.create({
      color: 'danger',
      duration: 4000,
      message: text,
      showCloseButton: true
    });

    await toast.present();
}