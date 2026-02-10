
const USER="Pol Beltran";const PASS="Polbeltran5.";
let autoCitizens=[];let manual=JSON.parse(localStorage.getItem('manual')||"[]");
let cases=JSON.parse(localStorage.getItem('cases')||"[]");

function login(){if(user.value===USER&&pass.value===PASS){login.style.display="none";dashboard.style.display="block"}else loginError.innerText="Credenciales incorrectas"}
const names=["Alberto","Carlos","Juan","Luis","Sergio","David"];const surnames=["Garcia","Martinez","Lopez"];const cars=["Seat Ibiza","VW Golf","BMW Serie 3","Audi A3","Toyota Corolla"];
function rand(a){return a[Math.floor(Math.random()*a.length)]}
function photo(name){return "https://ui-avatars.com/api/?name="+encodeURIComponent(name)+"&background=0D8ABC&color=fff&size=256"}

function gen(){autoCitizens=[];for(let i=0;i<200;i++){let n=rand(names)+" "+rand(surnames);autoCitizens.push({name:n,dni:Math.floor(Math.random()*89999999)+"X",job:"Desconocido",crime:"Sin antecedentes",vehicle:rand(cars),plate:Math.floor(Math.random()*8999)+"ABC",photo:photo(n)})}}
function allCitizens(){return autoCitizens.concat(manual)}

function openCitizens(){dashboard.style.display="none";citizensPage.style.display="block";gen();render(allCitizens())}
function render(list){citizenList.innerHTML="";list.forEach((c,i)=>citizenList.innerHTML+=`<div class=card onclick="openProfile(${i})">${c.name}</div>`)}
function searchCitizen(){render(allCitizens().filter(c=>c.name.toLowerCase().includes(search.value.toLowerCase())))}

function openCreate(){dashboard.style.display="none";createPage.style.display="block"}
function saveManual(){let n=cname.value;manual.push({name:n,dni:cdni.value,job:cjob.value,crime:ccrime.value,vehicle:cvehicle.value,plate:cplate.value,photo:photo(n)});localStorage.setItem('manual',JSON.stringify(manual));back()}

let current=null;
function openProfile(i){current=allCitizens()[i];citizensPage.style.display="none";profilePage.style.display="block";alertBanner.innerText=current.alert?("⚠ "+current.alert):"";profile.innerHTML=`<img src="${current.photo}" width=120><br>Nombre:${current.name}<br>DNI:${current.dni}<br>Trabajo:${current.job}<br>Antecedentes:${current.crime}<br>Vehículo:${current.vehicle}<br>Matrícula:${current.plate}`}
function setAlert(){current.alert="Búsqueda y captura";localStorage.setItem('manual',JSON.stringify(manual));alertBanner.innerText="⚠ ALERTA ACTIVA"}
function clearAlert(){current.alert="";alertBanner.innerText=""}

function openVehicles(){dashboard.style.display="none";vehiclesPage.style.display="block";renderVehicles(allCitizens())}
function renderVehicles(list){vehicleList.innerHTML="";list.forEach((c,i)=>vehicleList.innerHTML+=`<div class=card onclick="openVehicle(${i})">${c.vehicle} - ${c.plate}</div>`)}
function searchVehicle(){renderVehicles(allCitizens().filter(c=>c.plate.includes(vsearch.value)))}
function openVehicle(i){let c=allCitizens()[i];vehicleProfile.innerHTML=`Propietario:${c.name}<br>Vehículo:${c.vehicle}<br>Matrícula:${c.plate}`}

function openCases(){dashboard.style.display="none";casesPage.style.display="block";renderCases()}
function createCase(){cases.push({id:"CASO-"+Date.now(),note:casenote.value});localStorage.setItem('cases',JSON.stringify(cases));renderCases()}
function renderCases(){caseList.innerHTML="";cases.forEach(c=>caseList.innerHTML+=`<div class=card>${c.id}<br>${c.note}</div>`)}

function back(){citizensPage.style.display="none";vehiclesPage.style.display="none";casesPage.style.display="none";createPage.style.display="none";dashboard.style.display="block"}
