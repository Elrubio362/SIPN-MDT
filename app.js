
const USER="Pol Beltran";
const PASS="Polbeltran5";

const app=document.getElementById("app");

function randomFrom(arr){return arr[Math.floor(Math.random()*arr.length)]}
const nombres=["Juan","Luis","Carlos","Miguel","Sergio","David","Jorge","Pablo","Raul","Mario","Pedro","Andres","Ivan","Adrian","Diego"];
const apellidos=["Garcia","Martinez","Lopez","Sanchez","Perez","Gomez","Martin","Jimenez","Ruiz","Hernandez","Diaz","Moreno","Alvarez","Romero","Navarro"];
const marcas=["Seat Ibiza","VW Golf","Toyota Corolla","Ford Focus","BMW 320","Audi A3","Kia Sportage","Hyundai i30"];

let ciudadanos=[...Array(200)].map((_,i)=>{
  let nombre=randomFrom(nombres)+" "+randomFrom(apellidos);
  return {id:i,nombre,dni:""+Math.floor(10000000+Math.random()*89999999),telefono:"6"+Math.floor(10000000+Math.random()*89999999)}
});
let vehiculos=[...Array(200)].map((_,i)=>{
  let owner=randomFrom(ciudadanos);
  return {id:i,modelo:randomFrom(marcas),matricula:""+Math.floor(1000+Math.random()*8999)+"-ABC",owner};
});

function loginView(){
 app.innerHTML=`
 <div class="login">
 <h1>SIPN</h1>
 <input id="u" placeholder="Usuario">
 <input id="p" placeholder="Contraseña" type="password">
 <button onclick="login()">Entrar</button>
 </div>`;
}
window.login=function(){
 if(document.getElementById("u").value===USER && document.getElementById("p").value===PASS){
   hub();
 }else alert("Credenciales incorrectas");
}

function hub(){
 app.innerHTML=`
 <div class="hub">
  <div class="sq" onclick="listaCiudadanos()">Ciudadanos</div>
  <div class="sq" onclick="listaVehiculos()">Vehiculos</div>
  <div class="sq">Sistema Policial</div>
  <div class="sq">Crear Ciudadano</div>
 </div>`;
}

window.listaCiudadanos=function(){
 app.innerHTML=`<button onclick="hub()">Volver</button><h2>Ciudadanos</h2>`+
 ciudadanos.map(c=>`<div>${c.nombre} <button onclick="fichaCiudadano(${c.id})">Ver</button></div>`).join("");
}
window.fichaCiudadano=function(id){
 const c=ciudadanos.find(x=>x.id==id);
 const v=vehiculos.find(x=>x.owner.id==id);
 app.innerHTML=`<button onclick="listaCiudadanos()">Volver</button>
 <h2>${c.nombre}</h2>
 DNI:${c.dni}<br>Tel:${c.telefono}<br>
 Vehiculo: <a href="#" onclick="fichaVehiculo(${v.id})">${v.modelo}</a>`;
}

window.listaVehiculos=function(){
 app.innerHTML=`<button onclick="hub()">Volver</button><h2>Vehiculos</h2>`+
 vehiculos.map(v=>`<div>${v.modelo} ${v.matricula} <button onclick="fichaVehiculo(${v.id})">Ver</button></div>`).join("");
}
window.fichaVehiculo=function(id){
 const v=vehiculos.find(x=>x.id==id);
 app.innerHTML=`<button onclick="listaVehiculos()">Volver</button>
 <h2>${v.modelo}</h2>
 Matricula:${v.matricula}<br>
 Propietario: <a href="#" onclick="fichaCiudadano(${v.owner.id})">${v.owner.nombre}</a>`;
}

loginView();
