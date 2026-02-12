const v=(id)=>document.getElementById(id)
const views=["login","hub","citizens","vehicles","citizenDetail","vehicleDetail"]
function show(x){views.forEach(vv=>v(vv).classList.add("hidden"));v(x).classList.remove("hidden")}

v("enter").onclick=()=>{
 if(v("user").value==="Pol Beltran"&&v("pass").value==="Polbeltran5"){
  show("hub")
 } else alert("Credenciales incorrectas")
}

v("goCit").onclick=()=>show("citizens")
v("goVeh").onclick=()=>show("vehicles")
document.querySelectorAll(".back").forEach(b=>b.onclick=()=>show("hub"))

// generate citizens & vehicles
let citizens=[];let vehicles=[]
for(let i=1;i<=200;i++){
 citizens.push({id:i,name:"Ciudadano "+i})
 vehicles.push({id:i,name:"Vehículo "+i,owner:i})
}

// render citizens
citizens.forEach(c=>{
 let li=document.createElement("li")
 li.innerHTML=`${c.name} <button onclick="openCitizen(${c.id})">Ver</button>`
 v("citList").appendChild(li)
})
vehicles.forEach(c=>{
 let li=document.createElement("li")
 li.innerHTML=`${c.name} <button onclick="openVehicle(${c.id})">Ver</button>`
 v("vehList").appendChild(li)
})

function openCitizen(id){
 let c=citizens[id-1]
 v("citDetail").innerHTML=`<h2>${c.name}</h2><p>Vehículo: <a href="#" onclick="openVehicle(${id})">Vehículo ${id}</a></p>`
 show("citizenDetail")
}
function openVehicle(id){
 let c=vehicles[id-1]
 v("vehDetail").innerHTML=`<h2>${c.name}</h2><p>Propietario: <a href="#" onclick="openCitizen(${id})">Ciudadano ${id}</a></p>`
 show("vehicleDetail")
}
