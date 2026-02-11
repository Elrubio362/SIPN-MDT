// Fixed app.js - camera no auto open bug removed
console.log('SIPN fixed version loaded');
function showScreen(id){
 document.querySelectorAll('.screen').forEach(s=>s.style.display='none');
 document.getElementById(id).style.display='block';
}
function doLogin(){
 const u=document.getElementById('user').value;
 const p=document.getElementById('pass').value;
 if(u==='Pol Beltran' && p==='Polbeltran5.'){
   showScreen('screen-home');
 }else{
   document.getElementById('loginError').innerText='Credenciales incorrectas';
 }
}
