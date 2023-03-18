import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let searchParam=new URLSearchParams(search)
 
  return searchParam.get("adventure");

  // Place holder for functionality to work in the Stubs
 
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
    try{
      let res=await fetch(config.backendEndpoint+ `/adventures/detail?adventure=${adventureId}`)
      let data=await res.json();
    //console.log(data)
          return data;
    }     catch(error){
          return null;
      }
    
  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML=adventure.name;
  document.getElementById("adventure-subtitle").innerHTML=adventure.subtitle;
 
 adventure.images.map((key)=>{
    let createImage=document.createElement("div");
    let img=document.createElement("img")
    img.setAttribute("class","activity-card-image");
    img.src=key;
    createImage.append(img);

    document.getElementById("photo-gallery").appendChild(createImage)

       
  });
  document.getElementById("adventure-content").innerHTML=adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
    document.getElementById("photo-gallery").innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner" id="carousel-inner">
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`
    images.map((images, index) => {
      let getImages = document.createElement("div");
      getImages.className = `carousel-item ${index === 0 ? "active" : ""}`;
      getImages.innerHTML = `<img src=${images} class="activity-card-image">`;
      document.getElementById("carousel-inner").appendChild(getImages);
    });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
 
   
    if(adventure["available"]){
      document.getElementById("reservation-panel-sold-out").style.display="none";
      document.getElementById("reservation-panel-available").style.display="block";
      document.getElementById("reservation-person-cost").innerHTML=adventure["costPerHead"];
     }else{
      document.getElementById("reservation-panel-sold-out").style.display="block";
      document.getElementById("reservation-panel-available").style.display="none";
  }

}
//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
let personCost=document.getElementById("reservation-cost");
personCost.innerHTML=persons*adventure["costPerHead"];
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
 
  const forms = document.getElementById("myForm");
   forms.addEventListener("submit" ,async(element)=>{
    element.preventDefault();
    const submitValue={
        name:forms.elements["name"].value ,
        date:new Date(forms.elements["date"].value),
        person:forms.elements["person"].value,
        adventure:adventure["id"]
  }
  console.log(submitValue);
   try{
    const getData=`${config.backendEndpoint}/reservations/new`;
    const results=await fetch(getData,{
          method:"POST",
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(submitValue)
    });
    alert("Success!")
    window.location.reload();

   }catch(error){
    console.log(error)
    alert("Failed!")
   }
  });
  }

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log(adventure);
  if(adventure["reserved"]==true){
    document.getElementById("reserved-banner").style.display="block";
  } else{
    document.getElementById("reserved-banner").style.display="none";
  }
 

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
