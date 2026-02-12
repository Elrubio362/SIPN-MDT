function show(id){
 document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'))
 document.getElementById(id).classList.remove('hidden')
}

function login(){
 if(user.value==="Pol Beltran" && pass.value==="Polbeltran5.") show('hub');
 else alert("Credenciales incorrectas")
}

function openScreen(id){ show(id) }
function goHub(){ show('hub') }

// generate citizens
const citizenList=document.getElementById("citizenList")
for(let i=1;i<=200;i++){
 let row=document.createElement("div")
 row.innerHTML="Ciudadano "+i+" <button>Ver</button>"
 citizenList.appendChild(row)
}

// generate vehicles
const vehicleList=document.getElementById("vehicleList")
for(let i=1;i<=200;i++){
 let row=document.createElement("div")
 row.innerHTML="Vehículo "+i+" <button>Ver</button>"
 vehicleList.appendChild(row)
}
