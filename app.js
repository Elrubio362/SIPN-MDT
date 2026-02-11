
let citizens=[];let vehicles=[];
function rand(a){return a[Math.floor(Math.random()*a.length)]}
for(let i=0;i<200;i++){citizens.push({
 name:rand(['Juan', 'Carlos', 'Luis', 'Miguel', 'David', 'Sergio', 'Antonio', 'Javier', 'Pedro', 'Raul', 'Daniel', 'Adrian', 'Mario', 'Pablo', 'Ivan', 'Alberto'])+" "+rand(['Garcia', 'Lopez', 'Martinez', 'Sanchez', 'Perez', 'Gomez', 'Fernandez', 'Ruiz', 'Diaz', 'Moreno', 'Muñoz', 'Alvarez', 'Romero', 'Navarro', 'Torres', 'Dominguez']),
 dni:Math.floor(10000000+Math.random()*89999999)+"A",
 phone:"6"+Math.floor(10000000+Math.random()*89999999),
 address:"Calle "+(i+1)+", Barcelona",
 nationality:rand(['Española', 'Francesa', 'Italiana', 'Alemana', 'Marroquí', 'Argentina', 'Colombiana']),
 antecedentes:Math.random()<0.3?"Sí":"No",
 busca:Math.random()<0.1?"Sí":"No"
})}
for(let i=0;i<120;i++){vehicles.push({
 model:rand(['Seat Ibiza', 'VW Golf', 'Audi A3', 'Toyota Corolla', 'Ford Focus', 'BMW Serie 1', 'Mercedes A180', 'Peugeot 208']),
 plate:Math.floor(1000+Math.random()*8999)+"ABC",
 color:rand(['Rojo', 'Negro', 'Blanco', 'Azul', 'Gris', 'Verde']),
 city:rand(['Barcelona', 'Madrid', 'Valencia', 'Sevilla', 'Bilbao']),
 itv:"2024",
 vin:"VIN"+Math.floor(Math.random()*99999999),
 owner:citizens[Math.floor(Math.random()*citizens.length)].name
})}

function login(){if(user.value==="Pol Beltran"&&pass.value==="Polbeltran5."){loginPage.style.display="none";hub.style.display="grid";}else alert("Credenciales incorrectas");}
function backHub(){document.querySelectorAll('.page').forEach(p=>p.style.display="none");hub.style.display="grid";}

function openCitizens(){hub.style.display="none";citizensPage.style.display="block";renderCitizens();}
function renderCitizens(){let q=searchCit.value?.toLowerCase()||"";citizensList.innerHTML="";citizens.filter(c=>c.name.toLowerCase().includes(q)||c.dni.includes(q)||c.phone.includes(q)).forEach((c,i)=>citizensList.innerHTML+=`<div class="listItem">${c.name}<button class="verBtn" onclick="openCitizen(${i})">Ver</button></div>`);}
function openCitizen(i){citizensPage.style.display="none";citizenDetail.style.display="block";let c=citizens[i];citizenDetail.innerHTML=`<button onclick='openCitizens()'>← Volver</button><h2>${c.name}</h2>DNI: ${c.dni}<br>Teléfono: ${c.phone}<br>Dirección: ${c.address}<br>Nacionalidad: ${c.nationality}<br>Antecedentes: ${c.antecedentes}<br>Búsqueda y captura: ${c.busca}`; }

function openVehicles(){hub.style.display="none";vehiclesPage.style.display="block";renderVehicles();}
function renderVehicles(){let q=searchVeh.value?.toLowerCase()||"";vehiclesList.innerHTML="";vehicles.filter(v=>v.model.toLowerCase().includes(q)||v.plate.toLowerCase().includes(q)).forEach((v,i)=>vehiclesList.innerHTML+=`<div class="listItem">${v.model} - ${v.plate}<button class="verBtn" onclick="openVehicle(${i})">Ver</button></div>`);}
function openVehicle(i){vehiclesPage.style.display="none";vehicleDetail.style.display="block";let v=vehicles[i];vehicleDetail.innerHTML=`<button onclick='openVehicles()'>← Volver</button><h2>${v.model}</h2>Matrícula: ${v.plate}<br>Color: ${v.color}<br>Ubicación: ${v.city}<br>ITV: ${v.itv}<br>Bastidor: ${v.vin}<br>Propietario: ${v.owner}`; }
