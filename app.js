
// Credentials
function login(){
  const u = document.getElementById('user').value.trim();
  const p = document.getElementById('pass').value;
  const err = document.getElementById('loginError');
  if(u === 'Pol Beltran' && p === 'Polbeltran5.'){
    err.textContent = '';
    document.getElementById('screen-login').classList.add('hidden');
    document.getElementById('screen-hub').classList.remove('hidden');
  } else {
    err.textContent = 'Credenciales incorrectas';
  }
}

function showHub(){
  hideAllScreens();
  document.getElementById('screen-hub').classList.remove('hidden');
}

function hideAllScreens(){
  document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));
}

// Data seeds
const NAMES = ["Juan","Carlos","Luis","Miguel","David","Sergio","Antonio","Javier","Pedro","Raul","Daniel","Adrian","Mario","Pablo","Ivan","Alberto","Alfonso","Fernando","Andres","Victor"];
const SURNAMES = ["García","López","Martínez","Sánchez","Pérez","Gómez","Fernández","Ruiz","Díaz","Moreno","Muñoz","Álvarez","Romero","Navarro","Torres","Domínguez"];
const CARS = ["Seat Ibiza","VW Golf","Audi A3","Toyota Corolla","Ford Focus","BMW Serie 1","Mercedes A180","Peugeot 208","Renault Clio","Opel Corsa"];
const COLORS = ["Rojo","Negro","Blanco","Azul","Gris","Verde"];
const NATIONALITIES = ["Española","Francesa","Italiana","Marroquí","Argentina","Colombiana"];

let citizens = [];
let vehicles = [];

function rnd(a){ return a[Math.floor(Math.random()*a.length)] }

function seedData(){
  citizens = [];
  vehicles = [];
  for(let i=0;i<200;i++){
    const name = rnd(NAMES) + ' ' + rnd(SURNAMES);
    const dni = (10000000 + Math.floor(Math.random()*89999999)) + String.fromCharCode(65 + Math.floor(Math.random()*26));
    const phone = '6' + (10000000 + Math.floor(Math.random()*89999999));
    const address = (Math.floor(1+Math.random()*200)) + ' Calle Falsa, ' + rnd(['Barcelona','Madrid','Valencia','Sevilla','Bilbao']);
    const nationality = rnd(NATIONALITIES);
    const antecedentes = Math.random()<0.25 ? 'Sí' : 'No';
    const busca = Math.random()<0.08 ? 'Sí' : 'No';
    citizens.push({id:i,name,dni,phone,address,nationality,antecedentes,busca});
  }
  // vehicles and assign to random citizens (some citizens no vehicle)
  for(let v=0; v<160; v++){
    const model = rnd(CARS);
    const plate = (1000 + Math.floor(Math.random()*8999)) + '-' + String.fromCharCode(65 + Math.floor(Math.random()*26)) + String.fromCharCode(65 + Math.floor(Math.random()*26));
    const color = rnd(COLORS);
    const city = rnd(['Barcelona','Madrid','Valencia','Sevilla','Bilbao']);
    const itv = (2018 + Math.floor(Math.random()*8)) + '-' + (1 + Math.floor(Math.random()*12));
    const vin = 'VIN' + (10000000 + Math.floor(Math.random()*89999999));
    const ownerIndex = Math.floor(Math.random()*citizens.length);
    vehicles.push({id:v,model,plate,color,city,itv,vin,owner:ownerIndex});
    if(!('vehicleId' in citizens[ownerIndex])) citizens[ownerIndex].vehicleId = v;
  }
}

// Navigation: open module full-screen
function openModule(mod){
  hideAllScreens();
  if(mod === 'citizens'){ document.getElementById('screen-citizens').classList.remove('hidden'); renderCitizens(); }
  else if(mod === 'vehicles'){ document.getElementById('screen-vehicles').classList.remove('hidden'); renderVehicles(); }
}

// --- Citizens ---
function renderCitizens(){
  const q = (document.getElementById('searchCit')?.value || '').toLowerCase();
  const container = document.getElementById('citizenList');
  container.innerHTML = '';
  citizens.filter(c => c.name.toLowerCase().includes(q) || c.dni.includes(q) || c.phone.includes(q))
    .forEach(c => {
      const row = document.createElement('div');
      row.className = 'listItem';
      row.innerHTML = `<div><strong>${c.name}</strong><br><small style="color:#9fbcec">${c.dni} · ${c.phone}</small></div>
        <div><button class="smallBtn" onclick="viewCitizen(${c.id})">Ver</button></div>`;
      container.appendChild(row);
    });
}

function viewCitizen(id){
  const c = citizens[id];
  const content = document.getElementById('detailContent');
  let vehicleHtml = '—';
  if('vehicleId' in c){
    const vid = c.vehicleId;
    const v = vehicles.find(x => x.id === vid);
    if(v) vehicleHtml = `<span class="linkish" onclick="viewVehicle(${v.id})">${v.model} (${v.plate})</span>`;
  }
  content.innerHTML = `<div class="detail">
    <h2>${c.name}</h2>
    <strong>DNI:</strong> ${c.dni}<br>
    <strong>Teléfono:</strong> ${c.phone}<br>
    <strong>Dirección:</strong> ${c.address}<br>
    <strong>Nacionalidad:</strong> ${c.nationality}<br>
    <strong>Antecedentes:</strong> ${c.antecedentes}<br>
    <strong>Búsqueda y captura:</strong> ${c.busca}<br>
    <strong>Vehículo:</strong> ${vehicleHtml}
  </div>`;
  hideAllScreens();
  document.getElementById('screen-detail').classList.remove('hidden');
}

function detailBack(){
  // go back to hub by default
  showHub();
}

// --- Vehicles ---
function renderVehicles(){
  const q = (document.getElementById('searchVeh')?.value || '').toLowerCase();
  const container = document.getElementById('vehicleList');
  container.innerHTML = '';
  vehicles.filter(v => v.model.toLowerCase().includes(q) || v.plate.toLowerCase().includes(q))
    .forEach(v => {
      const row = document.createElement('div');
      row.className = 'listItem';
      row.innerHTML = `<div><strong>${v.model}</strong> · <small style="color:#9fbcec">${v.plate}</small></div>
        <div><button class="smallBtn" onclick="viewVehicle(${v.id})">Ver</button></div>`;
      container.appendChild(row);
    });
}

function viewVehicle(id){
  const v = vehicles[id];
  const owner = citizens[v.owner];
  const content = document.getElementById('detailContent');
  content.innerHTML = `<div class="detail">
    <h2>${v.model}</h2>
    <strong>Matrícula:</strong> ${v.plate}<br>
    <strong>Color:</strong> ${v.color}<br>
    <strong>Ubicación registrada:</strong> ${v.city}<br>
    <strong>Última ITV:</strong> ${v.itv}<br>
    <strong>Nº bastidor:</strong> ${v.vin}<br>
    <strong>Propietario:</strong> <span class="linkish" onclick="viewCitizen(${owner.id})">${owner.name}</span>
  </div>`;
  hideAllScreens();
  document.getElementById('screen-detail').classList.remove('hidden');
}

// init
window.addEventListener('load', ()=>{ seedData(); /* start with login visible */ });
