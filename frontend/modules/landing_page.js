import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();


  //Updates the DOM with the cities
  if(cities){
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image)
    
  });
}
}
//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let response= await fetch(config.backendEndpoint+ "/cities");
    let user= await response.json();
    return user;
  } catch(error){
    return null;
  }
 
 
}
//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let createCity=document.createElement("div")
  createCity.className= "col-12 col-sm-6 col-lg-3 mb-3";
  createCity.innerHTML=`
  <a href="pages/adventures/?city=${id}" , id="${id}">
    <div class="tile">
      <div class="tile-text text-center text-white">
        <h4>${city}</h4>
        <p>${description}</p>
      </div>
      <img class="image-responsive" src="${image}">
    </div>
  </a>
 `;
document.getElementById("data").appendChild(createCity)
}
export { init, fetchCities, addCityToDOM };
