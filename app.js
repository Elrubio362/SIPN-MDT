
let citizens=[];
let vehicles=[];

function randomItem(arr){return arr[Math.floor(Math.random()*arr.length)]}

function generateData(){
 const names=["Juan","Luis","Carlos","Miguel","David","Pedro","Sergio","Mario"];
 const surnames=["García","López","Martínez","Sánchez","Pérez","Ramírez"];
 const brands=["Toyota","Seat","Ford","BMW","Audi"];
 const models=["Corolla","Ibiza","Focus","X3","A4"];

 for(let i=0;i<200;i++){
   let name=randomItem(names)+" "+randomItem(surnames);
   let plate=""+Math.floor(1000+Math.random()*9000)+"ABC";
   let vehicle={model:randomItem(brands)+" "+randomItem(models),plate:plate,owner:name};
   vehicles.push(vehicle);
   citizens.push({name:name,dni:""+Math.floor(Math.random()*99999999)+"X",vehicle:vehicle});
 }
}

generateData();

function login(){
 if(document.getElementById("user").value==="Pol Beltran" &&
    document.getElementById("pass").value==="Polbeltran5"){
      document.getElementById("login").classList.add("hidden");
      document.getElementById("hub").classList.remove("hidden");
 }
}

function openCitizens(){
 document.getElementById("hub").classList.add("hidden");
 document.getElementById("citizens").classList.remove("hidden");
 renderCitizens();
}
function openVehicles(){
 document.getElementById("hub").classList.add("hidden");
 document.getElementById("vehicles").classList.remove("hidden");
 renderVehicles();
}
function backHub(){
 document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
 document.getElementById("hub").classList.remove("hidden");
}

function renderCitizens(){
 let q=document.getElementById("searchCitizen").value.toLowerCase();
 let list=document.getElementById("citizensList");
 list.innerHTML="";
 citizens.filter(c=>c.name.toLowerCase().includes(q)).forEach(c=>{
   list.innerHTML+=`<div class='card'><b>${c.name}</b><br>DNI: ${c.dni}<br>
   Vehículo: <a href="#" onclick="showVehicle('${c.vehicle.plate}')">${c.vehicle.model}</a></div>`;
 });
}

function renderVehicles(){
 let q=document.getElementById("searchVehicle").value.toLowerCase();
 let list=document.getElementById("vehiclesList");
 list.innerHTML="";
 vehicles.filter(v=>v.model.toLowerCase().includes(q)||v.plate.toLowerCase().includes(q)).forEach(v=>{
   list.innerHTML+=`<div class='card'><b>${v.model}</b> ${v.plate}<br>
   Propietario: <a href="#" onclick="showCitizen('${v.owner}')">${v.owner}</a></div>`;
 });
}

function showVehicle(plate){
 openVehicles();
 document.getElementById("searchVehicle").value=plate;
 renderVehicles();
}
function showCitizen(name){
 openCitizens();
 document.getElementById("searchCitizen").value=name;
 renderCitizens();
}
