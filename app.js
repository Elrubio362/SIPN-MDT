
const USER="Pol Beltran";const PASS="Polbeltran5.";
let autoCitizens=[];let manual=JSON.parse(localStorage.getItem('manual')||"[]");
let current=null;

function doLogin(){if(user.value===USER&&pass.value===PASS){login.style.display="none";home.style.display="grid"}else loginError.innerText="Credenciales incorrectas"}

const names=["Alberto","Carlos","Juan","Luis","Sergio"];const surnames=["Garcia","Martinez","Lopez"];const cars=["Seat Ibiza","VW Golf","BMW Serie 3","Audi A3","Toyota Corolla"];
function rand(a){return a[Math.floor(Math.random()*a.length)]}
function gen(){autoCitizens=[];for(let i=0;i<200;i++){autoCitizens.push({id:"c"+i,name:rand(names)+" "+rand(surnames),vehicle:rand(cars),plate:Math.floor(Math.random()*8999)+"ABC"})}}
function allCitizens(){return autoCitizens.concat(manual)}

function goHome(){document.querySelectorAll("body > div").forEach(d=>d.style.display="none");home.style.display="grid"}

function openCitizens(){goHome();citizensPage.style.display="block";gen();render(allCitizens())}
function render(list){citizenList.innerHTML="";list.forEach((c,i)=>citizenList.innerHTML+=`<div class=card onclick="openProfile(${i})">${c.name}</div>`)}
function searchCitizen(){render(allCitizens().filter(c=>c.name.toLowerCase().includes(search.value.toLowerCase())))}

function getPhoto(id){return localStorage.getItem("photo_"+id)}
function openProfile(i){current=allCitizens()[i];goHome();profilePage.style.display="block";let photo=getPhoto(current.id);profile.innerHTML=(photo?`<img src="${photo}" width=120>`:"<div>Sin foto</div>")+`<br>${current.name}<br>${current.vehicle} ${current.plate}`}
function uploadPhoto(e){const file=e.target.files[0];const reader=new FileReader();reader.onload=()=>{localStorage.setItem("photo_"+current.id,reader.result);openProfile(allCitizens().indexOf(current))};reader.readAsDataURL(file)}

function openVehicles(){goHome();vehiclesPage.style.display="block";renderVehicles(allCitizens())}
function renderVehicles(list){vehicleList.innerHTML="";list.forEach((c,i)=>vehicleList.innerHTML+=`<div class=card onclick="openVehicle(${i})">${c.vehicle} ${c.plate}</div>`)}
function searchVehicle(){renderVehicles(allCitizens().filter(c=>c.plate.includes(vsearch.value)))}
function openVehicle(i){let c=allCitizens()[i];vehicleProfile.innerHTML=`Propietario:${c.name}<br>Coche:${c.vehicle}<br>Matrícula:${c.plate}`}
