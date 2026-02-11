
const USER="Pol Beltran";
const PASS="Polbeltran5.";

const $=id=>document.getElementById(id);

document.getElementById("loginBtn").onclick=()=>{
 if($("user").value===USER && $("pass").value===PASS){
   $("login").style.display="none";
   $("home").classList.remove("hidden");
 }else $("error").innerText="Credenciales incorrectas";
};

let citizens=[];
for(let i=0;i<200;i++) citizens.push({id:i,name:"Ciudadano "+i});

function showHome(){
 document.querySelectorAll("div").forEach(d=>d.classList.add("hidden"));
 $("home").classList.remove("hidden");
}

function openCitizens(){
 document.querySelectorAll("div").forEach(d=>d.classList.add("hidden"));
 $("citizens").classList.remove("hidden");
 renderCitizens();
}

function renderCitizens(){
 let list=$("citizenList"); list.innerHTML="";
 citizens.forEach(c=>{
   let div=document.createElement("div");
   div.innerHTML=`<b>${c.name}</b> <button onclick="openCitizen(${c.id})">Ver</button>`;
   list.appendChild(div);
 });
}

function openCitizen(id){
 let c=citizens[id];
 $("citizenDetail").innerHTML=`<button onclick="openCitizens()">←</button><h2>${c.name}</h2>`;
 document.querySelectorAll("div").forEach(d=>d.classList.add("hidden"));
 $("citizenDetail").classList.remove("hidden");
}

function openVehicles(){
 document.querySelectorAll("div").forEach(d=>d.classList.add("hidden"));
 $("vehicles").classList.remove("hidden");
 renderVehicles();
}

let vehicles=[];
for(let i=0;i<50;i++) vehicles.push({id:i,mat:"MAT"+i,owner:i});

function renderVehicles(){
 let list=$("vehicleList"); list.innerHTML="";
 vehicles.forEach(v=>{
   let div=document.createElement("div");
   div.innerHTML=`<b>${v.mat}</b> <button onclick="openVehicle(${v.id})">Ver</button>`;
   list.appendChild(div);
 });
}

function openVehicle(id){
 let v=vehicles[id];
 $("vehicleDetail").innerHTML=`<button onclick="openVehicles()">←</button>
 <h2>${v.mat}</h2>
 Propietario <a href='#' onclick='openCitizen(${v.owner});return false;'>Ciudadano ${v.owner}</a>`;
 document.querySelectorAll("div").forEach(d=>d.classList.add("hidden"));
 $("vehicleDetail").classList.remove("hidden");
}
