
let citizens=[];
for(let i=0;i<200;i++){
 citizens.push({
  name:"Nombre"+i+" Apellido"+i,
  dni:"000000"+i+"A",
  phone:"600000"+i,
  address:"Calle "+i+" Barcelona"
 });
}

function login(){
 if(user.value==="Pol Beltran" && pass.value==="Polbeltran5."){
   loginPage.style.display="none";
   hub.style.display="grid";
 } else alert("Credenciales incorrectas");
}

function openCitizens(){
 hub.style.display="none";
 citizensPage.style.display="block";
 renderCitizens();
}

function backHub(){
 citizensPage.style.display="none";
 citizenDetail.style.display="none";
 hub.style.display="grid";
}

function renderCitizens(){
 let q=search.value?.toLowerCase()||"";
 citizensList.innerHTML="";
 citizens.filter(c=>c.name.toLowerCase().includes(q)||c.dni.includes(q)||c.phone.includes(q))
 .forEach((c,i)=>{
   citizensList.innerHTML+=`<div class="listItem">${c.name}<button class="verBtn" onclick="openCitizen(${i})">Ver</button></div>`;
 });
}

function openCitizen(i){
 citizensPage.style.display="none";
 citizenDetail.style.display="block";
 let c=citizens[i];
 citizenDetail.innerHTML=`<button onclick="openCitizens()">← Volver</button>
 <h2>${c.name}</h2>
 DNI: ${c.dni}<br>
 Teléfono: ${c.phone}<br>
 Dirección: ${c.address}`;
}
