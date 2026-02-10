
const USER="Pol Beltran";const PASS="Polbeltran5.";
let DB=JSON.parse(localStorage.getItem("SIPN_DB")||'{"citizens":[],"vehicles":[],"cases":[]}');
let autoCitizens=[];let currentCitizen=null;let currentCase=null;

function saveDB(){localStorage.setItem("SIPN_DB",JSON.stringify(DB));}
function showScreen(id){document.querySelectorAll(".screen").forEach(s=>s.style.display="none");document.getElementById(id).style.display="block";}
function doLogin(){if(user.value===USER&&pass.value===PASS)showScreen("screen-home");else loginError.innerText="Credenciales incorrectas"}

const names=["Alberto","Carlos","Juan","Luis","Sergio"];const surnames=["Garcia","Martinez","Lopez"];const cars=["Seat Ibiza","VW Golf","BMW Serie 3","Audi A3"];
function rand(a){return a[Math.floor(Math.random()*a.length)]}

function genCitizens(){autoCitizens=[];for(let i=0;i<200;i++){let id="auto_"+i;autoCitizens.push({id,name:rand(names)+" "+rand(surnames),dni:Math.floor(Math.random()*89999999)+"X",address:"España",phone:"+34 6"+Math.floor(Math.random()*99999999),vehicle:rand(cars),plate:Math.floor(Math.random()*8999)+"ABC"})}}
function allCitizens(){return [...autoCitizens,...DB.citizens]}

function openCitizens(){genCitizens();renderCitizens(allCitizens());showScreen("screen-citizens")}
function renderCitizens(list){citizenList.innerHTML="";list.forEach(c=>citizenList.innerHTML+=`<div class=card onclick="openProfile('${c.id}')">${c.name}</div>`)}
function searchCitizen(){renderCitizens(allCitizens().filter(c=>c.name.toLowerCase().includes(search.value.toLowerCase())))}

function findCitizen(id){return allCitizens().find(c=>c.id===id)}
function openProfile(id){currentCitizen=id;let c=findCitizen(id);let img=localStorage.getItem("citPhoto_"+id)||"https://ui-avatars.com/api/?name="+encodeURIComponent(c.name);profile.innerHTML=`<img src="${img}" width=120><br><b>${c.name}</b><br>DNI:${c.dni}<br>${c.address}<br>${c.phone}<br>Vehículo:${c.vehicle} ${c.plate}`;showScreen("screen-profile")}
function uploadCitizenPhoto(e){let r=new FileReader();r.onload=()=>{localStorage.setItem("citPhoto_"+currentCitizen,r.result);openProfile(currentCitizen)};r.readAsDataURL(e.target.files[0])}

function saveManual(){let id="m_"+Date.now();DB.citizens.push({id,name:cname.value,dni:cdni.value,address:caddr.value,phone:cphone.value,vehicle:cvehicle.value,plate:cplate.value});saveDB();document.querySelectorAll("#screen-create input").forEach(i=>i.value="");alert("Guardado");}

function openVehicles(){vehicleList.innerHTML="";allCitizens().forEach(c=>vehicleList.innerHTML+=`<div class=card onclick="vehicleProfile.innerHTML='Propietario:'+ '${c.name}' +'<br>'+ '${c.vehicle}' +'<br>'+ '${c.plate}'">${c.vehicle} ${c.plate}</div>`);showScreen("screen-vehicles")}
function searchVehicle(){openVehicles()}

function openCases(){renderCases();showScreen("screen-cases")}
function createCase(){let id="CASE_"+Date.now();DB.cases.push({id,title:caseTitle.value,desc:caseDesc.value,photos:[],status:"Activo"});saveDB();renderCases()}
function renderCases(){caseList.innerHTML="";DB.cases.forEach(c=>caseList.innerHTML+=`<div class=card onclick="openCase('${c.id}')">${c.title}</div>`)}
function openCase(id){currentCase=id;let c=DB.cases.find(x=>x.id===id);caseProfile.innerHTML=`<h3>${c.title}</h3>${c.desc}<br>Estado:${c.status}<br><button onclick="closeCase()">Cerrar</button>`;showScreen("screen-caseProfile")}
function uploadCasePhoto(e){let r=new FileReader();r.onload=()=>{DB.cases.find(x=>x.id===currentCase).photos.push(r.result);saveDB();};r.readAsDataURL(e.target.files[0])}
function closeCase(){DB.cases.find(x=>x.id===currentCase).status="Cerrado";saveDB();openCases()}
