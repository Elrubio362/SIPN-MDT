
// Credentials: user "Pol Beltran" / pass "Polbeltran5."
function login(){
  const u = document.getElementById('user').value.trim();
  const p = document.getElementById('pass').value;
  const msg = document.getElementById('loginMsg');
  if(u === 'Pol Beltran' && p === 'Polbeltran5.'){
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mdtPage').style.display = 'block';
    loadHub();
  } else {
    msg.textContent = 'Credenciales incorrectas';
  }
}

const names = ["Juan","Carlos","Luis","Miguel","David","Sergio","Antonio","Javier","Pedro","Raul","Daniel","Adrian","Mario","Pablo","Ivan","Alberto","Alfonso","Fernando","Andres","Victor"];
const surnames = ["García","López","Martínez","Sánchez","Pérez","Gómez","Fernández","Ruiz","Díaz","Moreno","Muñoz","Álvarez","Romero","Navarro","Torres","Domínguez"];
const cars = ["Seat Ibiza","VW Golf","Audi A3","Toyota Corolla","Ford Focus","BMW Serie 1","Mercedes A180","Peugeot 208","Renault Clio","Opel Corsa"];
const colors = ["Rojo","Negro","Blanco","Azul","Gris","Verde"];
const nationalities = ["Española","Francesa","Italiana","Marroquí","Argentina","Colombiana","Peruana"];

let citizens = [];
let vehicles = [];

function rand(arr){return arr[Math.floor(Math.random()*arr.length)]}

function seedData(){
  citizens = [];
  vehicles = [];
  for(let i=0;i<200;i++){
    const name = rand(names) + " " + rand(surnames);
    const dni = (10000000 + Math.floor(Math.random()*89999999)) + String.fromCharCode(65 + Math.floor(Math.random()*26));
    const phone = "6" + (10000000 + Math.floor(Math.random()*89999999));
    const address = (Math.floor(1+Math.random()*200)) + " Calle Falsa, " + rand(["Barcelona","Madrid","Valencia","Sevilla","Bilbao"]);
    const nationality = rand(nationalities);
    const antecedentes = Math.random() < 0.25 ? "Sí" : "No";
    const busca = Math.random() < 0.08 ? "Sí" : "No";
    citizens.push({id:i,name,dni,phone,address,nationality,antecedentes,busca});
  }
  // create vehicles and assign randomly
  for(let j=0;j<160;j++){
    const model = rand(cars);
    const plate = (1000 + Math.floor(Math.random()*8999)) + "-" + String.fromCharCode(65 + Math.floor(Math.random()*26)) + String.fromCharCode(65+Math.floor(Math.random()*26));
    const color = rand(colors);
    const city = rand(["Barcelona","Madrid","Valencia","Sevilla","Bilbao"]);
    const itv = (2018 + Math.floor(Math.random()*8)) + "-" + (1 + Math.floor(Math.random()*12));
    const vin = "VIN" + (10000000 + Math.floor(Math.random()*89999999));
    const ownerIndex = Math.floor(Math.random()*citizens.length);
    vehicles.push({id:j,model,plate,color,city,itv,vin,owner:ownerIndex});
    // link vehicle in citizen record (first vehicle wins)
    if(!citizens[ownerIndex].vehicleId) citizens[ownerIndex].vehicleId = j;
  }
}

function loadHub(){
  seedData();
  // no-op; hub visible already
  document.getElementById('content').innerHTML = '<p style="padding:18px;color:#9fbcec">Seleccione un módulo del HUB</p>';
}

// --- Citizens module
function openCitizens(){
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="toolbar"><button class="backBtn" onclick="showHub()">← Hub</button>
    <input id="searchCit" class="searchInput" placeholder="Buscar por nombre, DNI o teléfono" oninput="renderCitizens()"></div>
    <div id="citList"></div>`;
  renderCitizens();
}

function renderCitizens(){
  const q = document.getElementById('searchCit').value.toLowerCase();
  const list = document.getElementById('citList');
  list.innerHTML = '';
  citizens.filter(c=> c.name.toLowerCase().includes(q) || c.dni.includes(q) || c.phone.includes(q))
    .forEach(c => {
      const div = document.createElement('div');
      div.className = 'listItem';
      div.innerHTML = `<div>${c.name} <br><small style="color:#9fbcec">${c.dni}</small></div>
        <div><button class="smallBtn" onclick="viewCitizen(${c.id})">Ver</button></div>`;
      list.appendChild(div);
    });
}

function viewCitizen(id){
  const c = citizens[id];
  const content = document.getElementById('content');
  const vehicleHtml = c.vehicleId !== undefined ? `<span class="linkish" onclick="viewVehicle(${c.vehicleId})">${vehicles.find(v=>v.id===c.vehicleId).model} (${vehicles.find(v=>v.id===c.vehicleId).plate})</span>` : '—';
  content.innerHTML = `<div><button class="backBtn" onclick="openCitizens()">← Volver</button></div>
    <div class="detail">
      <h2>${c.name}</h2>
      <strong>DNI:</strong> ${c.dni}<br>
      <strong>Teléfono:</strong> ${c.phone}<br>
      <strong>Dirección:</strong> ${c.address}<br>
      <strong>Nacionalidad:</strong> ${c.nationality}<br>
      <strong>Antecedentes:</strong> ${c.antecedentes}<br>
      <strong>Búsqueda y captura:</strong> ${c.busca}<br>
      <strong>Vehículo:</strong> ${vehicleHtml}
    </div>`;
}

// --- Vehicles module
function openVehicles(){
  const content = document.getElementById('content');
  content.innerHTML = `<div class="toolbar"><button class="backBtn" onclick="showHub()">← Hub</button>
    <input id="searchVeh" class="searchInput" placeholder="Buscar por matrícula o modelo" oninput="renderVehicles()"></div>
    <div id="vehList"></div>`;
  renderVehicles();
}

function renderVehicles(){
  const q = document.getElementById('searchVeh').value.toLowerCase();
  const list = document.getElementById('vehList');
  list.innerHTML = '';
  vehicles.filter(v=> v.model.toLowerCase().includes(q) || v.plate.toLowerCase().includes(q))
    .forEach(v => {
      const div = document.createElement('div');
      div.className = 'listItem';
      div.innerHTML = `<div>${v.model} — <small style="color:#9fbcec">${v.plate}</small></div>
        <div><button class="smallBtn" onclick="viewVehicle(${v.id})">Ver</button></div>`;
      list.appendChild(div);
    });
}

function viewVehicle(id){
  const v = vehicles[id];
  const owner = citizens[v.owner];
  const content = document.getElementById('content');
  content.innerHTML = `<div><button class="backBtn" onclick="openVehicles()">← Volver</button></div>
    <div class="detail">
      <h2>${v.model}</h2>
      <strong>Matrícula:</strong> ${v.plate}<br>
      <strong>Color:</strong> ${v.color}<br>
      <strong>Ubicación registrada:</strong> ${v.city}<br>
      <strong>Última ITV:</strong> ${v.itv}<br>
      <strong>Nº bastidor:</strong> ${v.vin}<br>
      <strong>Propietario:</strong> <span class="linkish" onclick="viewCitizen(${owner.id})">${owner.name}</span>
    </div>`;
}

function showHub(){
  document.getElementById('content').innerHTML = '<p style="padding:18px;color:#9fbcec">Seleccione un módulo del HUB</p>';
  // show hub UI remains visible as grid in page; user can click cards
  // no navigation page change needed; hub cards remain on screen background
}

window.onload = function(){
  // keep login shown initially; hub appears after login
  // Pre-seed data on load so modules work immediately after login
  seedData();
};
