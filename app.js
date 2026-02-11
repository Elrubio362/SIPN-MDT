
let citizens=[];
let vehicles=[];

for(let i=0;i<200;i++){
  citizens.push({name:"Ciudadano "+i, phone:"600000"+i, address:"Calle "+i});
}
for(let i=0;i<100;i++){
  vehicles.push({model:"Coche "+i, owner:i});
}

function login(){
 if(user.value==="Pol Beltran" && pass.value==="Polbeltran5."){
   loginPage.classList.add("hidden");
   hub.classList.remove("hidden");
 } else alert("Credenciales incorrectas");
}

function openCitizens(){
 hub.classList.add("hidden");
 citizensPage.classList.remove("hidden");
 citizensPage.innerHTML="<button onclick='backHub()'>← Volver</button><h2>Ciudadanos</h2>";
 citizens.forEach((c,i)=>{
   citizensPage.innerHTML+=`<div class="listItem">${c.name}<button onclick="showCitizen(${i})">Ver</button></div>`;
 });
}

function openVehicles(){
 hub.classList.add("hidden");
 vehiclesPage.classList.remove("hidden");
 vehiclesPage.innerHTML="<button onclick='backHub()'>← Volver</button><h2>Vehículos</h2>";
 vehicles.forEach((v,i)=>{
   vehiclesPage.innerHTML+=`<div class="listItem">${v.model}<button onclick="showVehicle(${i})">Ver</button></div>`;
 });
}

function showCitizen(i){
 citizensPage.classList.add("hidden");
 detailPage.classList.remove("hidden");
 let c=citizens[i];
 detailPage.innerHTML=`<button onclick='openCitizens()'>← Volver</button>
 <h2>${c.name}</h2>
 Tel: ${c.phone}<br>Dirección: ${c.address}`;
}

function showVehicle(i){
 vehiclesPage.classList.add("hidden");
 detailPage.classList.remove("hidden");
 let v=vehicles[i];
 detailPage.innerHTML=`<button onclick='openVehicles()'>← Volver</button>
 <h2>${v.model}</h2>
 Propietario: <span class='link' onclick='showCitizen(${v.owner})'>Ciudadano ${v.owner}</span>`;
}

function backHub(){
 citizensPage.classList.add("hidden");
 vehiclesPage.classList.add("hidden");
 detailPage.classList.add("hidden");
 hub.classList.remove("hidden");
}
