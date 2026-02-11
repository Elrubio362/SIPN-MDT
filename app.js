// Fixed app.js - camera no auto open bug removed
console.log('SIPN fixed version loaded');
function doLogin2(){
 const u=document.getElementById('user').value;
 const p=document.getElementById('pass').value;
 if(u==='Pol Beltran' && p==='Polbeltran5.'){
   document.getElementById('screen-login').style.display='none';
   document.getElementById('screen-home').style.display='block';
 }else{
   document.getElementById('loginError').innerText='Credenciales incorrectas';
 }
}
