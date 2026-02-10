
// SIPN v17 fix - avoid using global name 'login' for function
const USER="Pol Beltran";const PASS="Polbeltran5.";
let autoCitizens=[];let manual=JSON.parse(localStorage.getItem('manual')||"[]");
let cases=JSON.parse(localStorage.getItem('cases')||"[]");

function doLogin(){
  const u = document.getElementById('user').value;
  const p = document.getElementById('pass').value;
  if(u === USER && p === PASS){
    document.getElementById('login').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('loginError').innerText = '';
  } else {
    document.getElementById('loginError').innerText = 'Credenciales incorrectas';
  }
}

const names=["Alberto","Carlos","Juan","Luis","Sergio","David"];const surnames=["Garcia","Martinez","Lopez"];const cars=["Seat Ibiza","VW Golf","BMW Serie 3","Audi A3","Toyota Corolla"];
function rand(a){return a[Math.floor(Math.random()*a.length)]}
function photo(name){return "https://ui-avatars.com/api/?name="+encodeURIComponent(name)+"&background=0D8ABC&color=fff&size=256"}

function gen(){autoCitizens=[];for(let i=0;i<200;i++){let n=rand(names)+" "+rand(surnames);autoCitizens.push({name:n,dni:Math.floor(Math.random()*89999999)+"X",job:"Desconocido",crime:"Sin antecedentes",vehicle:rand(cars),plate:Math.floor(Math.random()*8999)+"ABC",photo:photo(n)})}}
function allCitizens(){return autoCitizens.concat(manual)}

function openCitizens(){document.getElementById('dashboard').style.display='none';document.getElementById('citizensPage').style.display='block';gen();render(allCitizens())}
function render(list){const container=document.getElementById('citizenList');container.innerHTML='';list.forEach((c,i)=>{const div=document.createElement('div');div.className='card';div.textContent=c.name;div.tabIndex=0;div.addEventListener('click',()=>openProfile(i));container.appendChild(div);})}
function searchCitizen(){const q=document.getElementById('search').value.toLowerCase();render(allCitizens().filter(c=>c.name.toLowerCase().includes(q)))}

function openCreate(){document.getElementById('dashboard').style.display='none';document.getElementById('createPage').style.display='block'}
function saveManual(){const obj={name:document.getElementById('cname').value,dni:document.getElementById('cdni').value,job:document.getElementById('cjob').value,crime:document.getElementById('ccrime').value,vehicle:document.getElementById('cvehicle').value,plate:document.getElementById('cplate').value,photo:photo(document.getElementById('cname').value)};manual.push(obj);localStorage.setItem('manual',JSON.stringify(manual));back();}

let current=null;
function openProfile(i){current=allCitizens()[i];document.getElementById('citizensPage').style.display='none';document.getElementById('profilePage').style.display='block';document.getElementById('alertBanner').innerText=current.alert?("⚠ "+current.alert):"";document.getElementById('profile').innerHTML=`<img src="${current.photo}" width=120><br>Nombre:${current.name}<br>DNI:${current.dni}<br>Trabajo:${current.job}<br>Antecedentes:${current.crime}<br>Vehículo:${current.vehicle}<br>Matrícula:${current.plate}`}
function setAlert(){current.alert="Búsqueda y captura";localStorage.setItem('manual',JSON.stringify(manual));document.getElementById('alertBanner').innerText="⚠ ALERTA ACTIVA"}
function clearAlert(){current.alert="";document.getElementById('alertBanner').innerText="";localStorage.setItem('manual',JSON.stringify(manual))}

function openVehicles(){document.getElementById('dashboard').style.display='none';document.getElementById('vehiclesPage').style.display='block';renderVehicles(allCitizens())}
function renderVehicles(list){const v=document.getElementById('vehicleList');v.innerHTML='';list.forEach((c,i)=>{const div=document.createElement('div');div.className='card';div.textContent=c.vehicle+' - '+c.plate;div.tabIndex=0;div.addEventListener('click',()=>openVehicle(i));v.appendChild(div)})}
function searchVehicle(){const q=document.getElementById('vsearch').value;renderVehicles(allCitizens().filter(c=>c.plate.includes(q)))}
function openVehicle(i){const c=allCitizens()[i];document.getElementById('vehicleProfile').innerHTML=`Propietario:${c.name}<br>Vehículo:${c.vehicle}<br>Matrícula:${c.plate}`}

function openCases(){document.getElementById('dashboard').style.display='none';document.getElementById('casesPage').style.display='block';renderCases()}
function createCase(){cases.push({id:"CASO-"+Date.now(),note:document.getElementById('casenote').value});localStorage.setItem('cases',JSON.stringify(cases));renderCases()}
function renderCases(){const el=document.getElementById('caseList');el.innerHTML='';cases.forEach(c=>{const d=document.createElement('div');d.className='card';d.innerHTML=`${c.id}<br>${c.note}`;el.appendChild(d)})}

function back(){document.getElementById('citizensPage').style.display='none';document.getElementById('vehiclesPage').style.display='none';document.getElementById('casesPage').style.display='none';document.getElementById('createPage').style.display='none';document.getElementById('dashboard').style.display='block'}
