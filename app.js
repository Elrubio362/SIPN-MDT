
function login(){
    const u=document.getElementById('user').value;
    const p=document.getElementById('pass').value;
    if(u==='Pol Beltran' && p==='Polbeltran5.'){
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('hub').classList.remove('hidden');
    }else{
        document.getElementById('error').innerText='Credenciales incorrectas';
    }
}
