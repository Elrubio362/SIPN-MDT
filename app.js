
const USER="Pol Beltran";const PASS="Polbeltran5.";
let DB=JSON.parse(localStorage.getItem("SIPN_DB")||'{"citizens":[],"cases":[]}');
let autoCitizens=[];let currentCitizen=null;let currentCase=null;

function saveDB(){localStorage.setItem("SIPN_DB",JSON.stringify(DB));}
function showScreen(id){document.querySelectorAll(".screen").forEach(s=>s.style.display="none");document.getElementById(id).style.display="block";}
function doLogin(){if(user.value===USER&&pass.value===PASS)showScreen("screen-home");else loginError.innerText="Credenciales incorrectas"}

// EXPORT / IMPORT "CLOUD"
function exportDB(){const blob=new Blob([JSON.stringify(DB)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="SIPN_DATABASE.json";a.click();}
function importDB(e){const r=new FileReader();r.onload=()=>{DB=JSON.parse(r.result);saveDB();alert("Base cargada");};r.readAsText(e.target.files[0]);}

const names=["Luis","Carlos","Juan","Sergio","David"];const surnames=["Garcia","Martinez","Lopez"];const cars=["Seat Ibiza","VW Golf","BMW Serie 3","Audi A3"];
function rand(a){return a[Math.floor(Math.random()*a.length)]}
function genCitizens(){autoCitizens=[];for(let i=0;i<200;i++){autoCitizens.push({id:"auto_"+i,name:rand(names)+" "+rand(surnames),dni:Math.floor(Math.random()*89999999)+"X",nationality:"Española",phone:"+34 6"+Math.floor(Math.random()*99999999),address:"Barcelona",job:"Empleado",crime:"Sin antecedentes",vehicle:rand(cars),plate:Math.floor(Math.random()*8999)+"ABC"})}}
function allCitizens(){return [...autoCitizens,...DB.citizens]}

function openCitizens(){genCitizens();citizenList.innerHTML="";allCitizens().forEach(c=>citizenList.innerHTML+=`<div class=card onclick="openProfile('${c.id}')">${c.name}</div>`);showScreen("screen-citizens")}
function openProfile(id){currentCitizen=id;let c=allCitizens().find(x=>x.id===id);let img=localStorage.getItem("citPhoto_"+id)||"https://ui-avatars.com/api/?name="+encodeURIComponent(c.name);profile.innerHTML=`<img src="${img}" width=120><br><b>Nombre:</b> ${c.name}<br><b>DNI:</b> ${c.dni}<br><b>Nacionalidad:</b> ${c.nationality}<br><b>Teléfono:</b> ${c.phone}<br><b>Dirección:</b> ${c.address}<br><b>Trabajo:</b> ${c.job}<br><b>Antecedentes:</b> ${c.crime}<br><b>Vehículo:</b> ${c.vehicle}<br><b>Matrícula:</b> ${c.plate}`;showScreen("screen-profile")}
function uploadCitizenPhoto(e){let r=new FileReader();r.onload=()=>{localStorage.setItem("citPhoto_"+currentCitizen,r.result);openProfile(currentCitizen)};r.readAsDataURL(e.target.files[0])}

function saveManual(){DB.citizens.push({id:"m_"+Date.now(),name:cname.value,dni:cdni.value,nationality:"Española",phone:cphone.value,address:caddr.value,job:cjob.value,crime:ccrime.value,vehicle:cvehicle.value,plate:cplate.value});saveDB();document.querySelectorAll("#screen-create input").forEach(i=>i.value="");alert("Guardado");}

function openVehicles(){vehicleList.innerHTML="";allCitizens().forEach(c=>vehicleList.innerHTML+=`<div class=card onclick="openVehicle('${c.id}')">${c.vehicle} ${c.plate}</div>`);showScreen("screen-vehicles")}
function openVehicle(id){let c=allCitizens().find(x=>x.id===id);vehicleProfile.innerHTML=`<b>Matrícula:</b> ${c.plate}<br><b>Modelo:</b> ${c.vehicle}<br><b>Color:</b> Rojo<br><b>Año:</b> 2019<br><b>ITV:</b> Vigente<br><b>Seguro:</b> Activo<br><b>Robado:</b> No<br><b>Propietario:</b> ${c.name}`;showScreen("screen-vehicleProfile")}

function openCases(){caseList.innerHTML="";DB.cases.forEach(c=>caseList.innerHTML+=`<div class=card onclick="openCase('${c.id}')">${c.title}</div>`);showScreen("screen-cases")}
function createCase(){DB.cases.push({id:"CASE_"+Date.now(),title:caseTitle.value,desc:caseDesc.value,status:"Activo",photos:[]});saveDB();openCases()}
function openCase(id){currentCase=id;let c=DB.cases.find(x=>x.id===id);caseProfile.innerHTML=`
<input id="editTitle" value="${c.title}">
<textarea id="editDesc">${c.desc}</textarea>
<br><b>Estado:</b> ${c.status}
<br><button onclick="toggleCase()">Cambiar estado</button>
<button onclick="saveCaseEdit()">Guardar cambios</button>
<button onclick="deleteCase()">Eliminar</button>
<div id="casePhotos"></div>`;renderCasePhotos();showScreen("screen-caseProfile")}
function toggleCase(){let c=DB.cases.find(x=>x.id===currentCase);c.status=c.status==="Activo"?"Cerrado":"Activo";saveDB();openCase(currentCase)}
function saveCaseEdit(){let c=DB.cases.find(x=>x.id===currentCase);c.title=editTitle.value;c.desc=editDesc.value;saveDB();openCase(currentCase)}
function deleteCase(){DB.cases=DB.cases.filter(c=>c.id!==currentCase);saveDB();openCases()}
function uploadCasePhoto(e){let c=DB.cases.find(x=>x.id===currentCase);if(c.photos.length>=5){alert("Máx 5 fotos");return;}let r=new FileReader();r.onload=()=>{c.photos.push(r.result);saveDB();renderCasePhotos()};r.readAsDataURL(e.target.files[0])}
function renderCasePhotos(){let c=DB.cases.find(x=>x.id===currentCase);casePhotos.innerHTML=c.photos.map(p=>`<img src="${p}" width=80>`).join("")}
