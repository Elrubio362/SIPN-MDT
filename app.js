
const names=["Juan","Carlos","Luis","David","Sergio","Miguel","Antonio","Jorge"];
const surnames=["García","López","Martínez","Sánchez","Fernández","Pérez"];
function rand(a){return a[Math.floor(Math.random()*a.length)]}

let citizens=[]; let vehicles=[];
for(let i=0;i<200;i++){
 let name=rand(names)+" "+rand(surnames);
 let car="Seat Ibiza "+(1000+i);
 citizens.push({id:i,name,phone:"6"+Math.floor(10000000+Math.random()*89999999),car});
 vehicles.push({plate:""+(1000+i)+"ABC",model:car,owner:name});
}

function back(){
 document.querySelectorAll('.page').forEach(p=>p.style.display='none');
 document.getElementById('hub').style.display='block';
}
function openCitizens(){hub.style.display='none';citizensDiv().style.display='block';renderCitizens('')}
function openVehicles(){hub.style.display='none';vehiclesDiv().style.display='block';renderVehicles('')}
function citizensDiv(){return document.getElementById('citizens')}
function vehiclesDiv(){return document.getElementById('vehicles')}

function renderCitizens(q){
 let list=document.getElementById('citList'); list.innerHTML='';
 citizens.filter(c=>c.name.toLowerCase().includes(q.toLowerCase()))
 .forEach(c=>{
   let li=document.createElement('li');
   li.innerHTML=c.name+' <button class="ver" onclick="alert(\'Ficha: '+c.name+' | '+c.phone+' | '+c.car+'\')">Ver</button>';
   list.appendChild(li);
 })
}

function renderVehicles(q){
 let list=document.getElementById('vehList'); list.innerHTML='';
 vehicles.filter(v=>v.model.toLowerCase().includes(q.toLowerCase()))
 .forEach(v=>{
   let li=document.createElement('li');
   li.innerHTML=v.model+' <button class="ver" onclick="alert(\'Vehículo: '+v.model+' | '+v.plate+' | '+v.owner+'\')">Ver</button>';
   list.appendChild(li);
 })
}
