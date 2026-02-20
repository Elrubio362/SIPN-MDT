function showSection(id){
document.querySelectorAll('.module').forEach(m=>m.classList.remove('active'));
document.getElementById(id).classList.add('active');
}
function guardarInforme(){
const texto=document.getElementById('nuevoInforme').value;
localStorage.setItem('informe',texto);
document.getElementById('listaInformes').innerText=texto;
}
function guardarEvidencia(){
const desc=document.getElementById('descripcionEvidencia').value;
localStorage.setItem('evidencia',desc);
document.getElementById('listaEvidencias').innerText=desc;
}
function guardarAlerta(){
const desc=document.getElementById('descripcionAlerta').value;
const prio=document.getElementById('prioridad').value;
localStorage.setItem('alerta',prio+" - "+desc);
document.getElementById('listaAlertas').innerText=prio+" - "+desc;
}
function guardarCiudadano(){
const nombre=document.getElementById('nombreCiudadano').value;
const dni=document.getElementById('dniCiudadano').value;
localStorage.setItem('ciudadano',nombre+" - "+dni);
document.getElementById('fichaGuardada').innerText=nombre+" - "+dni;
}
document.addEventListener("DOMContentLoaded",function(){
const map=L.map('map').setView([40.4168,-3.7038],12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap'}).addTo(map);
L.marker([40.4168,-3.7038]).addTo(map).bindPopup("Unidad operativa").openPopup();
});