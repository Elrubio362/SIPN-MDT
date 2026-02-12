document.getElementById('login-btn').onclick=()=>{
 if(document.getElementById('login-user').value==='Pol Beltran' &&
 document.getElementById('login-pass').value==='Polbeltran5'){
  document.getElementById('screen-login').classList.remove('active');
  document.getElementById('screen-hub').classList.add('active');
 } else alert('Credenciales incorrectas');
};