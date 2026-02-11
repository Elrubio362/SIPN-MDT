
const USER="Pol Beltran";
const PASS="Polbeltran5.";

const $=id=>document.getElementById(id);
function show(id){
 document.querySelectorAll(".screen").forEach(s=>s.classList.add("hidden"));
 $(id).classList.remove("hidden");
}
function showHome(){show("screen-home")}

document.addEventListener("DOMContentLoaded",()=>{
 $("loginBtn").onclick=login;
 $("pass").addEventListener("keypress",e=>{if(e.key==="Enter") login();});
});

function login(){
 if($("user").value===USER && $("pass").value===PASS){
   show("screen-home");
 }else{$("loginError").innerText="Credenciales incorrectas";}
}

/* dummy minimal citizens+vehicles working */
let citizens=[];
let vehicles=[];
function seed(){
 if(citizens.length) return;
 for(let i=0;i<200;i++){
   citizens.push({id:i,name:"Ciudadano "+i,dni:"0000000"+i,phone:"600000"+i,address:"España"});
 }
 for(let i=0;i<50;i++){
   vehicles.push({id:i,mat:"MAT"+i,owner:i});
 }
}
seed();

function openCitizens(){show("screen-citizens");renderCitizens();}
function openVehicles(){show("screen-vehicles");renderVehicles();}

function renderCitizens(){
 let list=$("citizenList");list.innerHTML="";
 citizens.forEach(c=>{
  let div=document.createElement("div");
  div.className="item";
  div.innerHTML=`<b>${c.name}</b> <button onclick="openCitizen(${c.id})">Ver</button>`;
  list.appendChild(div);
 });
}
function openCitizen(id){
 let c=citizens[id];
 $("citizenDetail").innerHTML=`<h3>${c.name}</h3>DNI:${c.dni}<br>Tel:${c.phone}`;
 show("screen-citizen-detail");
}

function renderVehicles(){
 let list=$("vehicleList");list.innerHTML="";
 vehicles.forEach(v=>{
  let div=document.createElement("div");
  div.className="item";
  div.innerHTML=`<b>${v.mat}</b> <button onclick="openVehicle(${v.id})">Ver</button>`;
  list.appendChild(div);
 });
}
function openVehicle(id){
 let v=vehicles[id];
 $("vehicleDetail").innerHTML=`<h3>${v.mat}</h3>Propietario <a href='#' onclick='openCitizen(${v.owner});return false;'>Ciudadano ${v.owner}</a>`;
 show("screen-vehicle-detail");
}
