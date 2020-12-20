// window.onload = function() {
// var search_button = document.getElementById("search_ok");
// search_button.onclick = function() {
//     let song = document.getElementById('song_text').value;
//     let autor = document.getElementById('autor_text').value;
//     console.log(autor)
//     console.log(song)
// }
// }
window.onload = function() {
    let buttonSearch = document.getElementById("id_search_ok");
    buttonSearch.onclick = Search;
};

async function getSearch() {
    
    let invest = {
        autor_text: document.getElementById("id_autor_text").value,
        song_text: document.getElementById("id_song_text").value
      };
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invest)
    };
    let promise = await fetch('/search', options)
    return await promise.json()
};

async function Search() {
    let form= await getSearch()
    document.getElementById("id_albom_img").src = form.album
    document.getElementById("id_audio").src = form.music
};