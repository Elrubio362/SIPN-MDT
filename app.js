function login(){
  const u=document.getElementById('user').value.trim();
  const p=document.getElementById('pass').value.trim();
  if(u==="Pol Beltran" && p==="Polbeltran5"){
    document.getElementById("loginPage").style.display="none";
    document.getElementById("hubPage").style.display="block";
  }else{
    document.getElementById("msg").innerText="Credenciales incorrectas";
  }
}
