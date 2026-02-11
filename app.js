
function login(){
  const u=document.getElementById('user').value;
  const p=document.getElementById('pass').value;
  if(u==="Pol Beltran" && p==="Polbeltran5"){
    document.getElementById("loginScreen").style.display="none";
    document.getElementById("mdtScreen").style.display="block";
  }else{
    alert("Credenciales incorrectas");
  }
}
function openModule(id){
  document.querySelectorAll('.module').forEach(m=>m.style.display='none');
  document.getElementById(id).style.display='block';
}
