const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

let result_box = document.querySelector(".result-box");
let search = document.querySelector(".search-button");
let sound = document.getElementById("sound");

search.addEventListener('click', () => {
  let word = document.getElementById("search").value;
  if (word == "") {
    alert("Please Enter Some word");
    return;
  }

  fetch(`${url}${word}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result_box.innerHTML = `<div class="word">
         <h3>${word}</h3>
         <button onclick ="playSound()">
           <i class="fa-sharp fa-solid fa-volume-high"></i>
         </button>
       </div>
       <div class="details">
         <p>${data[0].meanings[0].partOfSpeech}</p>
         <p> /${data[0].phonetic}/ </p>
       </div>
       <p class="word-meaning">
         ${data[0].meanings[0].definitions[0].definition}
       </p>
       <p class="example">
       
       ${data[0].meanings[0].definitions[0].example || ""}
       </p > `;

      sound.setAttribute("src", `${data[0].phonetics[1].audio}`);
    })
    .catch(() => {
      result_box.innerHTML = `<h3 class= "error"> The Word \"${word}\" Couldn't Find</h3>`
    })

});

function playSound() {
  sound.play();
}