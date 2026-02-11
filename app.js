
const USER="Pol Beltran";const PASS="Polbeltran5.";
let autoCitizens=[];
let manual=JSON.parse(localStorage.getItem('manual')||"[]");
let cases=JSON.parse(localStorage.getItem('cases')||"[]");
let currentCitizen=null,currentCase=null;

function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.style.display='none');document.getElementById(id).style.display='block';}
function doLogin(){if(user.value===USER&&pass.value===PASS)showScreen('screen-home');else loginError.innerText="Credenciales incorrectas"}

const names=["Alberto","Carlos","Juan","Luis","Sergio","David"];const surnames=["Garcia","Martinez","Lopez"];const cars=["Seat Ibiza","VW Golf","BMW Serie 3","Audi A3","Toyota Corolla"];
function rand(a){return a[Math.floor(Math.random()*a.length)]}
function photo(name){return "https://ui-avatars.com/api/?name="+encodeURIComponent(name)}

function generateCitizens(){
autoCitizens=[];
for(let i=0;i<200;i++){
let n=rand(names)+" "+rand(surnames);
autoCitizens.push({id:"a"+i,name:n,dni:Math.floor(Math.random()*89999999)+"X",address:"España",phone:"+34 6"+Math.floor(Math.random()*99999999),job:"Desconocido",crime:"Sin antecedentes",vehicle:rand(cars),plate:Math.floor(Math.random()*8999)+"ABC"})
}}

function allCitizens(){return autoCitizens.concat(manual)}

function openCitizens(){generateCitizens();renderCitizens(allCitizens());showScreen('screen-citizens')}
function renderCitizens(list){citizenList.innerHTML="";list.forEach((c,i)=>citizenList.innerHTML+=`<div class=card onclick="openProfile(${i})">${c.name}</div>`)}
function searchCitizen(){renderCitizens(allCitizens().filter(c=>c.name.toLowerCase().includes(search.value.toLowerCase())))}

function openProfile(i){currentCitizen=allCitizens()[i];showScreen('screen-profile');let img=localStorage.getItem("citPhoto_"+currentCitizen.id)||photo(currentCitizen.name);profile.innerHTML=`<img src="${img}" width=120><br>${currentCitizen.name}<br>DNI:${currentCitizen.dni}<br>Dirección:${currentCitizen.address}<br>Tel:${currentCitizen.phone}<br>Trabajo:${currentCitizen.job}<br>Antecedentes:${currentCitizen.crime}<br>Vehículo:${currentCitizen.vehicle} ${currentCitizen.plate}`}
function uploadCitizenPhoto(e){let r=new FileReader();r.onload=()=>{localStorage.setItem("citPhoto_"+currentCitizen.id,r.result);openProfile(allCitizens().indexOf(currentCitizen))};r.readAsDataURL(e.target.files[0])}

function openVehicles(){renderVehicles(allCitizens());showScreen('screen-vehicles')}
function renderVehicles(list){vehicleList.innerHTML="";list.forEach((c,i)=>vehicleList.innerHTML+=`<div class=card onclick="openVehicle(${i})">${c.vehicle} ${c.plate}</div>`)}
function searchVehicle(){renderVehicles(allCitizens().filter(c=>c.plate.includes(vsearch.value)))}
function openVehicle(i){let c=allCitizens()[i];vehicleProfile.innerHTML=`Propietario:${c.name}<br>${c.vehicle}<br>${c.plate}`}

function saveManual(){manual.push({id:"m"+Date.now(),name:cname.value,dni:cdni.value,address:caddr.value,phone:cphone.value,job:cjob.value,crime:ccrime.value,vehicle:cvehicle.value,plate:cplate.value});localStorage.setItem('manual',JSON.stringify(manual));alert("Guardado");}

function createCase(){cases.push({id:"CASO-"+Date.now(),title:caseTitle.value,desc:caseDesc.value,photos:[],status:"Activo"});localStorage.setItem('cases',JSON.stringify(cases));renderCases()}
function renderCases(){caseList.innerHTML="";cases.forEach((c,i)=>caseList.innerHTML+=`<div class=card onclick="openCase(${i})">${c.id} - ${c.title}</div>`);}
function openCase(i){currentCase=i;let c=cases[i];caseProfile.innerHTML=`<h3>${c.title}</h3>${c.desc}<br>Estado:${c.status}<br><button onclick="closeCase()">Cerrar</button><button onclick="deleteCase()">Eliminar</button><div id="casePhotos"></div>`;renderCasePhotos()}
function uploadCasePhoto(e){let r=new FileReader();r.onload=()=>{cases[currentCase].photos.push(r.result);localStorage.setItem('cases',JSON.stringify(cases));renderCasePhotos()};r.readAsDataURL(e.target.files[0])}
function renderCasePhotos(){let div=document.getElementById("casePhotos");div.innerHTML="";cases[currentCase].photos.forEach(p=>div.innerHTML+=`<img src="${p}" width=80>`);}
function closeCase(){cases[currentCase].status="Cerrado";localStorage.setItem('cases',JSON.stringify(cases));renderCases()}
function deleteCase(){cases.splice(currentCase,1);localStorage.setItem('cases',JSON.stringify(cases));renderCases()}
