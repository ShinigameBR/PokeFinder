let form = document.getElementById("pokemon-form");
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let pokemon = document.getElementById("pokemon").value;
  let searchUrl = (apiUrl + pokemon).toLowerCase();
  let responseContent = document.getElementById("pokemonContent");
  let responseImages = document.getElementById("pokemonImages");
  let response;

  fetch(searchUrl)
    .then((responseContent) => responseContent.json())
    .then(function (data) {
      let name = "Nome: " + upperFirstLetter(data.name) + "<br>";
      let types = "Types: ";
      for (let i = 0; i < data.types.length; i++) {
        types += upperFirstLetter(data.types[i].type.name);
        if (i == 0 && data.types.length == 2) {
          types += ", ";
        }
      }
      response = name + types;
      responseContent.innerHTML = response;
      responseImages.innerHTML =
        '<img src="' +
        data.sprites.front_default +
        '" alt="Imagem da Frente do Pokémon."><img src="' +
        data.sprites.back_default +
        '" alt="Imagem das Costas do Pokémon.">';
    })
    .catch(function (error) {
      responseContent.innerHTML =
        "Pókemon não encontrado, verifique a escrita!";
      responseImages.innerHTML = "";
    });
});

function upperFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
