
let citizens = ["Juan Pérez","Luis García","Ana Torres"];

function login(){
 if(user.value==="Pol Beltran" && pass.value==="Polbeltran5.")
 { document.getElementById("login").style.display="none";
   document.getElementById("hub").classList.remove("hidden");
   renderCitizens();
 } else alert("Credenciales incorrectas");
}

function show(id){
 document.querySelectorAll("div").forEach(d=>d.classList.add("hidden"));
 document.getElementById(id).classList.remove("hidden");
}

function renderCitizens(){
 let list=document.getElementById("citizenList");
 list.innerHTML="";
 citizens.forEach(c=>{
   let li=document.createElement("li");
   li.textContent=c;
   list.appendChild(li);
 });
}

function addCitizen(){
 citizens.push(document.getElementById("newName").value);
 alert("Guardado");
}
