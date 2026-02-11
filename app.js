
/* APP V34 - Vehicles clickable + link owner to citizen profile. Keep login credentials unchanged. */

/* Credentials */
const LOGIN_USER = "Pol Beltran";
const LOGIN_PASS = "Polbeltran5.";

/* Storage keys */
const KEY_CIT = "sipn_citizens_v34";
const KEY_VEH = "sipn_vehicles_v34";

/* Utilities */
const $ = id => document.getElementById(id);
const show = id => { document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden')); $(id).classList.remove('hidden'); }
const formatDate = d => d.toISOString().slice(0,10);

/* Login */
function doLogin(){
  const u = $("user").value.trim();
  const p = $("pass").value;
  if(u === LOGIN_USER && p === LOGIN_PASS){
    show("screen-home");
  } else {
    $("loginError").innerText = "Credenciales incorrectas";
    setTimeout(()=> $("loginError").innerText = "", 2500);
  }
}

/* Seed data if missing */
function seedData(){
  if(!localStorage.getItem(KEY_CIT) || !localStorage.getItem(KEY_VEH)){
    const first = ["Alejandro","David","Juan","Luis","Sergio","Carlos","Pablo","Marco","Ángel","Miguel","Laura","Ana","Lucía","María","Sofía","Alba","Marta","Victor","Raúl","Isabel"];
    const last = ["García","Martínez","López","Sánchez","Pérez","Gómez","Ruiz","Hernández","Díaz","Torres","Muñoz","Romero","Alonso","Ramírez"];
    const makes = ["Seat Ibiza","Toyota Corolla","Ford Focus","BMW 318","Renault Clio","Volkswagen Golf","Audi A3","Hyundai i30"];
    const citizens = [];
    const vehicles = [];
    for(let i=0;i<200;i++){
      const fn = first[Math.floor(Math.random()*first.length)];
      const ln = last[Math.floor(Math.random()*last.length)];
      const name = fn + " " + ln + (Math.random()<0.25? " " + last[Math.floor(Math.random()*last.length)] : "");
      const dni = String(Math.floor(10000000 + Math.random()*89999999)) + String.fromCharCode(65 + Math.floor(Math.random()*26));
      const phone = "6" + String(Math.floor(10000000 + Math.random()*89999999)).padStart(8,'0');
      const address = `${Math.floor(Math.random()*200)+1} Calle Falsa, ${["Barcelona","Madrid","Sevilla","Valencia","Castelldefels"][Math.floor(Math.random()*5)]}`;
      const job = ["Repartidor","Fontanero","Camarero","Estudiante","Hostelería","Policía","Medico","Comerciante"][Math.floor(Math.random()*8)];
      const cp = String(8000 + Math.floor(Math.random()*9000));
      citizens.push({ id: "C"+i, name, dni, phone, address, job, cp, records: Math.random()>0.8 ? "Con antecedentes" : "Sin antecedentes", photo: null, vehicles: [] });
    }
    // vehicles
    for(let i=0;i<120;i++){
      const matricula = String.fromCharCode(65 + Math.floor(Math.random()*26)) + String.fromCharCode(65 + Math.floor(Math.random()*26)) + "-" + (1000 + Math.floor(Math.random()*9000));
      const make = makes[Math.floor(Math.random()*makes.length)];
      const color = ["Blanco","Negro","Gris","Rojo","Azul","Verde"][Math.floor(Math.random()*6)];
      const itv = formatDate(new Date(2022 + Math.floor(Math.random()*4), Math.floor(Math.random()*12), Math.floor(Math.random()*28)+1));
      const bastidor = "B" + Math.floor(100000000 + Math.random()*900000000);
      const ownerIndex = Math.floor(Math.random()*citizens.length);
      const vid = "V"+i;
      vehicles.push({ id: vid, matricula, make, color, itv, bastidor, ownerId: citizens[ownerIndex].id, robado: Math.random()>0.98 });
      citizens[ownerIndex].vehicles.push(vid);
    }
    localStorage.setItem(KEY_CIT, JSON.stringify(citizens));
    localStorage.setItem(KEY_VEH, JSON.stringify(vehicles));
  }
}

/* Data accessors */
function getCitizens(){ return JSON.parse(localStorage.getItem(KEY_CIT) || "[]"); }
function setCitizens(arr){ localStorage.setItem(KEY_CIT, JSON.stringify(arr)); }
function getVehicles(){ return JSON.parse(localStorage.getItem(KEY_VEH) || "[]"); }
function setVehicles(arr){ localStorage.setItem(KEY_VEH, JSON.stringify(arr)); }

/* Navigation */
function showHome(){ show('screen-home'); }
function openCitizens(){ show('screen-citizens'); renderCitizens(); }
function openVehicles(){ show('screen-vehicles'); renderVehicles(); }
function openPolice(){ alert('Módulo sistema policial en desarrollo'); }
function openCreate(){ alert('Crear ciudadano en desarrollo (próxima versión)'); }

/* Citizens rendering */
function renderCitizens(){
  const q = $("searchCitizen").value.trim().toLowerCase();
  const list = $("citizenList"); list.innerHTML = "";
  let arr = getCitizens();
  arr.sort((a,b)=> a.name.localeCompare(b.name));
  if(q) arr = arr.filter(c => c.name.toLowerCase().includes(q) || c.dni.toLowerCase().includes(q));
  if(arr.length === 0){ list.innerHTML = "<div class='item'>No hay resultados</div>"; return; }
  arr.forEach(c => {
    const div = document.createElement('div'); div.className='item';
    div.innerHTML = `<div><strong>${c.name}</strong><div class="meta">DNI: ${c.dni} • ${c.address}</div></div><div><button onclick="openCitizenDetail('${c.id}')">Ver</button></div>`;
    list.appendChild(div);
  });
}

function openCitizenDetail(id){
  const citizen = getCitizens().find(x=>x.id===id); if(!citizen) return;
  const detail = $("citizenDetail"); detail.innerHTML = "";
  let html = `<h3>${citizen.name}</h3>
    <div><strong>DNI:</strong> ${citizen.dni}</div>
    <div><strong>Teléfono:</strong> ${citizen.phone}</div>
    <div><strong>Dirección:</strong> ${citizen.address}</div>
    <div><strong>CP:</strong> ${citizen.cp}</div>
    <div><strong>Trabajo:</strong> ${citizen.job}</div>
    <div><strong>Antecedentes:</strong> ${citizen.records}</div>`;
  if(citizen.vehicles && citizen.vehicles.length){
    html += "<div><strong>Vehículos:</strong><ul>";
    citizen.vehicles.forEach(vid => {
      const v = getVehicles().find(x=>x.id===vid);
      if(v) html += `<li><a href='#' onclick="openVehicleDetail('${v.id}');return false;">${v.matricula} — ${v.make}</a></li>`;
    });
    html += "</ul></div>";
  } else html += "<div><strong>Vehículos:</strong> Ninguno</div>";
  detail.innerHTML = html;
  show('screen-citizen-detail');
}

/* Vehicles rendering */
function renderVehicles(){
  const q = $("searchVehicle").value.trim().toLowerCase();
  const list = $("vehicleList"); list.innerHTML = "";
  let arr = getVehicles();
  arr.sort((a,b)=> a.matricula.localeCompare(b.matricula));
  if(q) arr = arr.filter(v => v.matricula.toLowerCase().includes(q) || v.make.toLowerCase().includes(q));
  if(arr.length === 0){ list.innerHTML = "<div class='item'>No hay vehículos</div>"; return; }
  arr.forEach(v => {
    const owner = getCitizens().find(c=>c.id===v.ownerId);
    const div = document.createElement('div'); div.className='item';
    div.innerHTML = `<div><strong>${v.matricula}</strong><div class="meta">${v.make} • ${v.color} • Propietario: ${owner?owner.name:'(sin dueño)'}</div></div><div><button onclick="openVehicleDetail('${v.id}')">Ver</button></div>`;
    list.appendChild(div);
  });
}

function openVehicleDetail(id){
  const v = getVehicles().find(x=>x.id===id); if(!v) return;
  const owner = getCitizens().find(c=>c.id===v.ownerId);
  const detail = $("vehicleDetail");
  detail.innerHTML = `<h3>${v.matricula} — ${v.make}</h3>
    <div><strong>Color:</strong> ${v.color}</div>
    <div><strong>ITV:</strong> ${v.itv}</div>
    <div><strong>Bastidor:</strong> ${v.bastidor}</div>
    <div><strong>Robado:</strong> ${v.robado ? 'Sí' : 'No'}</div>
    <div><strong>Propietario:</strong> ${owner ? "<a href='#' onclick="openCitizenDetail('"+owner.id+"');return false;">"+owner.name+"</a>" : 'N/A'}</div>`;
  show('screen-vehicle-detail');
}

/* Init */
document.addEventListener('DOMContentLoaded', ()=>{
  seedData();
  // if user already on home (no persisted session), show login by default
  show('screen-login');
});
