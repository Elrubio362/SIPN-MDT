
function login(){
 const u=document.getElementById('user').value;
 const p=document.getElementById('pass').value;
 if(u==='Pol Beltran' && p==='Polbeltran5.'){
   document.getElementById('loginScreen').style.display='none';
   document.getElementById('hub').style.display='block';
 } else {
   document.getElementById('msg').innerText='Credenciales incorrectas';
 }
}
function showPage(id){
 document.getElementById('hub').style.display='none';
 document.getElementById(id).style.display='block';
}
function back(){
 document.querySelectorAll('.page').forEach(p=>p.style.display='none');
 document.getElementById('hub').style.display='block';
}
