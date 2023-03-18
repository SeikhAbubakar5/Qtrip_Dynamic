import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let getReservations=await fetch(config.backendEndpoint +`/reservations`)
    let data=await getReservations.json();
    console.log(data)
    return data;
  }catch(error){
    return null;
  }
    

  // Place holder for functionality to work in the Stubs
 
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
    console.log(reservations);
  //Conditionally render the no-reservation-banner and reservation-table-parent
  let noReservationBanner=document.getElementById("no-reservation-banner")
   let reservationTableParent=document.getElementById("reservation-table-parent")
   if(reservations.length===0){
    noReservationBanner.style.display="block";
    reservationTableParent.style.display="none"

   }else{
    noReservationBanner.style.display="none";
    reservationTableParent.style.display="block"
   }


   reservations.forEach((element)=>{
    let date=new Date(element.date);
    let time=new Date(element.time);
    let month=time.toLocaleString(undefined,{month:"long"});
    let day=time.getDate();
    let year=time.getFullYear();
    let bookTime=time.toLocaleString("en-IN").split(" ");
    let res=element.adventure;
    console.log(element.person);
    const tableData=document.createElement("tr");
    tableData.innerHTML=`<td>"${element.id}"</td>
                <td>${element.name}</td>
                <td>${element.adventureName}</td>
                <td>${element.person}</td>
                <td>${date.toLocaleDateString("en-IN")}</td>
                
                <td>${element.price}</td>
                <td>${day} ${month} ${year}, ${bookTime[1]} ${bookTime[2]}</td>
                <td id="${element.id}">
                <a href="../detail/?adventure=${res}">
                <button class="reservation-visit-button">Visit Adventure Page</button>
                </a>
                </td>
                `
                document.getElementById("reservation-table").appendChild(tableData);
    

   });
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
    
  */
   
}

export { fetchReservations, addReservationToTable };
