
let citizens=[];
function rand(a){return a[Math.floor(Math.random()*a.length)]}
for(let i=0;i<200;i++){
 citizens.push({
  name:rand(['Juan', 'Carlos', 'Luis', 'Miguel', 'David', 'Sergio', 'Antonio', 'Javier', 'Pedro', 'Raul', 'Daniel', 'Adrian', 'Mario', 'Pablo', 'Ivan', 'Alberto'])+" "+rand(['Garcia', 'Lopez', 'Martinez', 'Sanchez', 'Perez', 'Gomez', 'Fernandez', 'Ruiz', 'Diaz', 'Moreno', 'Muñoz', 'Alvarez', 'Romero', 'Navarro', 'Torres', 'Dominguez']),
  dni:Math.floor(10000000+Math.random()*89999999)+"A",
  phone:"6"+Math.floor(10000000+Math.random()*89999999),
  address:"Calle "+(i+1)+", Barcelona",
  nationality:rand(['Española', 'Francesa', 'Italiana', 'Alemana', 'Marroquí', 'Argentina', 'Colombiana']),
  car:rand(['Seat Ibiza', 'VW Golf', 'Audi A3', 'Toyota Corolla', 'Ford Focus', 'BMW Serie 1', 'Mercedes A180', 'Peugeot 208']),
  antecedentes:Math.random()<0.3?"Sí":"No",
  busca:Math.random()<0.1?"Sí":"No"
 });
}
function login(){if(user.value==="Pol Beltran"&&pass.value==="Polbeltran5."){loginPage.style.display="none";hub.style.display="grid";}else alert("Credenciales incorrectas");}
function openCitizens(){hub.style.display="none";citizensPage.style.display="block";renderCitizens();}
function backHub(){citizensPage.style.display="none";citizenDetail.style.display="none";hub.style.display="grid";}
function renderCitizens(){let q=search.value?.toLowerCase()||"";citizensList.innerHTML="";citizens.filter(c=>c.name.toLowerCase().includes(q)||c.dni.includes(q)||c.phone.includes(q)).forEach((c,i)=>{citizensList.innerHTML+=`<div class="listItem">${c.name}<button class="verBtn" onclick="openCitizen(${i})">Ver</button></div>`});}
function openCitizen(i){citizensPage.style.display="none";citizenDetail.style.display="block";let c=citizens[i];citizenDetail.innerHTML=`<button onclick="openCitizens()">← Volver</button><h2>${c.name}</h2>DNI: ${c.dni}<br>Teléfono: ${c.phone}<br>Dirección: ${c.address}<br>Nacionalidad: ${c.nationality}<br>Vehículo: ${c.car}<br>Antecedentes: ${c.antecedentes}<br>Búsqueda y captura: ${c.busca}`;}
