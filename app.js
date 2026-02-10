
const USER="Pol Beltran";const PASS="Polbeltran5.";
let autoCitizens=[];let manual=JSON.parse(localStorage.getItem('manual')||"[]");
let cases=JSON.parse(localStorage.getItem('cases')||"[]");
let current=null;

function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.style.display='none');document.getElementById(id).style.display='block';}
function doLogin(){if(user.value===USER&&pass.value===PASS)showScreen('screen-home');else loginError.innerText='Credenciales incorrectas'}

const names=["Alberto","Carlos","Juan","Luis","Sergio"];const surnames=["Garcia","Martinez","Lopez"];const cars=["Seat Ibiza","VW Golf","BMW Serie 3","Audi A3","Toyota Corolla"];
function rand(a){return a[Math.floor(Math.random()*a.length)]}
function photo(name){return "https://ui-avatars.com/api/?name="+encodeURIComponent(name)+"&background=0D8ABC&color=fff&size=256"}

function gen(){autoCitizens=[];for(let i=0;i<200;i++){let n=rand(names)+" "+rand(surnames);autoCitizens.push({id:"a"+i,name:n,dni:Math.floor(Math.random()*89999999)+"X",address:"Barcelona",phone:"+34 6"+Math.floor(Math.random()*99999999),job:"Desconocido",crime:"Sin antecedentes",vehicle:rand(cars),plate:Math.floor(Math.random()*8999)+"ABC",photo:photo(n)})}}
function allCitizens(){return autoCitizens.concat(manual)}

function openProfile(i){current=allCitizens()[i];showScreen('screen-profile');let img=localStorage.getItem("photo_"+current.id)||current.photo;profile.innerHTML=`<img src="${img}" width=120><br><b>${current.name}</b><br>DNI:${current.dni}<br>Dirección:${current.address}<br>Tel:${current.phone}<br>Trabajo:${current.job}<br>Antecedentes:${current.crime}<br>Vehículo:${current.vehicle} ${current.plate}`}
function uploadPhoto(e){const r=new FileReader();r.onload=()=>{localStorage.setItem("photo_"+current.id,r.result);openProfile(allCitizens().indexOf(current))};r.readAsDataURL(e.target.files[0])}

function openCitizens(){gen();render(allCitizens());showScreen('screen-citizens')}
function render(list){citizenList.innerHTML="";list.forEach((c,i)=>citizenList.innerHTML+=`<div class=card onclick="openProfile(${i})">${c.name}</div>`)}
function searchCitizen(){render(allCitizens().filter(c=>c.name.toLowerCase().includes(search.value.toLowerCase())))}

function openVehicles(){renderVehicles(allCitizens());showScreen('screen-vehicles')}
function renderVehicles(list){vehicleList.innerHTML="";list.forEach((c,i)=>vehicleList.innerHTML+=`<div class=card onclick="openVehicle(${i})">${c.vehicle} ${c.plate}</div>`)}
function searchVehicle(){renderVehicles(allCitizens().filter(c=>c.plate.includes(vsearch.value)))}
function openVehicle(i){let c=allCitizens()[i];vehicleProfile.innerHTML=`Propietario:${c.name}<br>${c.vehicle}<br>${c.plate}`}

function saveManual(){let n=cname.value;manual.push({id:"m"+Date.now(),name:n,dni:cdni.value,address:caddr.value,phone:cphone.value,job:cjob.value,crime:ccrime.value,vehicle:cvehicle.value,plate:cplate.value,photo:photo(n)});localStorage.setItem('manual',JSON.stringify(manual));showScreen('screen-home')}

function createCase(){cases.push({id:"CASO-"+Date.now(),note:casenote.value});localStorage.setItem('cases',JSON.stringify(cases));caseList.innerHTML=cases.map(c=>`<div class=card>${c.id}<br>${c.note}</div>`).join("")}
