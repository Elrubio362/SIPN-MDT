const citizens=[
{name:"Luis García",vehicle:"Toyota Corolla"},
{name:"Ana López",vehicle:"Seat Ibiza"}
];
const vehicles=[
{model:"Toyota Corolla",owner:"Luis García"},
{model:"Seat Ibiza",owner:"Ana López"}
];

function hub(){
document.getElementById('app').innerHTML=`
<div class="grid">
<div class="card" onclick="citizenList()">Ciudadanos</div>
<div class="card" onclick="vehicleList()">Vehículos</div>
<div class="card">Sistema policial</div>
<div class="card">Crear ciudadano</div>
</div>`
}

function citizenList(){
let html='<div class=list><h2>Ciudadanos</h2>';
citizens.forEach(c=>{
html+=`${c.name}<button onclick="citizenFile('${c.name}')">Ver</button><br>`
})
html+='<br><button onclick="hub()">Volver</button></div>';
document.getElementById('app').innerHTML=html;
}

function citizenFile(name){
const c=citizens.find(x=>x.name==name);
document.getElementById('app').innerHTML=`
<div class=list>
<h2>${c.name}</h2>
Vehículo: <a href="#" onclick="vehicleFile('${c.vehicle}')">${c.vehicle}</a><br><br>
<button onclick="citizenList()">Volver</button>
</div>`
}

function vehicleList(){
let html='<div class=list><h2>Vehículos</h2>';
vehicles.forEach(v=>{
html+=`${v.model}<button onclick="vehicleFile('${v.model}')">Ver</button><br>`
})
html+='<br><button onclick="hub()">Volver</button></div>';
document.getElementById('app').innerHTML=html;
}

function vehicleFile(model){
const v=vehicles.find(x=>x.model==model);
document.getElementById('app').innerHTML=`
<div class=list>
<h2>${v.model}</h2>
Propietario: <a href="#" onclick="citizenFile('${v.owner}')">${v.owner}</a><br><br>
<button onclick="vehicleList()">Volver</button>
</div>`
}

hub();
