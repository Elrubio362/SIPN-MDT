
function login(){
 let u=document.getElementById('user').value;
 let p=document.getElementById('pass').value;
 if(u==="Pol Beltran" && p==="Polbeltran5."){
   document.getElementById('login').classList.add('hidden');
   document.getElementById('hub').classList.remove('hidden');
 } else {
   document.getElementById('msg').innerText="Credenciales incorrectas";
 }
}
