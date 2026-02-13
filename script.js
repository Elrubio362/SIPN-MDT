(function(){
    "use strict";
    const KEYS = {
        CITIZENS: 'mdt_citizens', VEHICLES: 'mdt_vehicles', CASES: 'mdt_cases',
        USERS: 'mdt_users', LOGGED_IN: 'mdt_loggedIn'
    };
    const load = (k,d)=> { try { return JSON.parse(localStorage.getItem(k))||d; } catch { return d; } };
    const save = (k,v)=> localStorage.setItem(k, JSON.stringify(v));

    if(!load(KEYS.USERS,[]).length) save(KEYS.USERS, [{id:1, username:'Pol Beltran', password:'Polbeltran5', rank:'Oficial'}]);

    if(!localStorage.getItem(KEYS.CITIZENS)) {
        let c = [];
        for(let i=0;i<200;i++) c.push({
            id:'c'+i+Date.now(), nombre:'Ciudadano '+i, dni: Math.floor(Math.random()*100000000)+'X',
            telefono:'6'+Math.floor(Math.random()*100000000), direccion:'C/ '+i, nacionalidad:'Española',
            trabajo:'Oficio', antecedentes:Math.random()>0.7, antecedentesDesc:'Hurto',
            buscaCaptura:Math.random()>0.9, vehiculoAsignado:null
        });
        save(KEYS.CITIZENS, c);
    }
    if(!localStorage.getItem(KEYS.VEHICLES)) {
        let v = [];
        for(let i=0;i<200;i++) v.push({
            id:'v'+i+Date.now(), marca:'Seat', modelo:'Ibiza', matricula: Math.floor(Math.random()*10000)+'XYZ',
            color:'Blanco', bastidor:'VIN'+i, itv:'2025-05-01', ubicacion:'Poligono',
            robado:Math.random()>0.8, alertaRobo:'Vehículo alertado', propietarioId:null
        });
        save(KEYS.VEHICLES, v);
    }
    if(!localStorage.getItem(KEYS.CASES)) save(KEYS.CASES, []);

    const login = document.getElementById('login-screen');
    const hub = document.getElementById('hub-screen');
    const content = document.getElementById('app-content');
    const header = document.getElementById('header-title');
    const back = document.getElementById('backBtn');
    let stack = ['hub'];

    function check() {
        if(localStorage.getItem(KEYS.LOGGED_IN)==='true') { login.classList.add('hidden'); hub.classList.remove('hidden'); render('hub'); }
        else { login.classList.remove('hidden'); hub.classList.add('hidden'); }
    }

    document.getElementById('btn-login').onclick = (e)=>{
        e.preventDefault();
        let u = document.getElementById('usuario').value.trim();
        let p = document.getElementById('password').value.trim();
        if(load(KEYS.USERS,[]).some(us=> us.username===u && us.password===p)) {
            localStorage.setItem(KEYS.LOGGED_IN,'true'); check();
        } else alert('Credenciales incorrectas');
    };
    document.getElementById('logoutBtn').onclick = ()=>{ localStorage.setItem(KEYS.LOGGED_IN,'false'); check(); };
    back.onclick = ()=>{ if(stack.length>1) { stack.pop(); render(stack[stack.length-1]); } else render('hub'); };
    document.getElementById('settingsBtn').onclick = ()=> render('userManagement');

    function render(p) {
        if(!hub.classList.contains('hidden')) {
            stack.push(p);
            header.innerText = p==='hub'? 'HUB CENTRAL' : p;
            back.style.visibility = p==='hub'? 'hidden' : 'visible';
            let html = '';
            if(p==='hub') html = '<div class="hub-grid"><div class="hub-card" data-page="citizens">👥 CIUDADANOS</div><div class="hub-card" data-page="vehicles">🚘 VEHÍCULOS</div><div class="hub-card" data-page="system">📋 SISTEMA POLICIAL</div><div class="hub-card" data-page="createCitizen">➕ CREAR CIUDADANO</div></div>';
            if(p==='citizens') {
                let list = load(KEYS.CITIZENS,[]);
                html = '<input class="search-box" placeholder="🔍 Buscar nombre/DNI/teléfono">';
                list.forEach(c => html += '<div class="list-item"><span><strong>'+c.nombre+'</strong><br><small>'+c.dni+'</small></span><button data-id="'+c.id+'" class="btn-view-citizen">VER</button></div>');
            }
            if(p==='vehicles') {
                let list = load(KEYS.VEHICLES,[]);
                html = '<input class="search-box" placeholder="🔍 Buscar matrícula/marca/modelo">';
                list.forEach(v => html += '<div class="list-item"><span><strong>'+v.marca+' '+v.modelo+'</strong><br><small>'+v.matricula+'</small></span><button data-id="'+v.id+'" class="btn-view-vehicle">VER</button></div>');
            }
            if(p==='createCitizen') html = '<div class="full-form"><h3>➕ Nuevo ciudadano</h3><input placeholder="Nombre completo"><input placeholder="DNI"><input placeholder="Teléfono"><input placeholder="Dirección"><input placeholder="Nacionalidad" value="Española"><input placeholder="Trabajo"><div style="display:flex; gap:10px;"><label>Antecedentes:</label><input type="checkbox"></div><textarea placeholder="Descripción antecedentes"></textarea><div style="display:flex; gap:10px;"><label>Busca y captura:</label><input type="checkbox"></div><button class="btn-save">GUARDAR CIUDADANO</button></div>';
            if(p==='system') html = '<div style="display:flex; flex-direction:column; gap:16px;"><div class="list-item" data-page="facial">😐 RECONOCIMIENTO FACIAL <button>></button></div><div class="list-item" data-page="plate">🪪 RECONOCIMIENTO MATRÍCULAS <button>></button></div><div class="list-item" data-page="cases">📁 CASOS POLICIALES <button>></button></div><div class="list-item" data-page="detenciones">🚔 REGISTRO DETENCIONES <button>></button></div><div class="list-item" data-page="multas">📝 MULTAS Y SANCIONES <button>></button></div></div>';
            if(p==='facial') html = '<div class="camera-mock">📷 CÁMARA FACIAL (SIMULACIÓN)<br><button id="simularFacial" class="btn-save">IDENTIFICAR PERSONA</button><div id="facialResult"></div></div>';
            if(p==='plate') html = '<div class="camera-mock">📸 LECTOR MATRÍCULAS<br><button id="simularPlaca" class="btn-save">CAPTURAR MATRÍCULA</button><div id="plateResult"></div></div>';
            if(p==='userManagement') {
                let users = load(KEYS.USERS,[]);
                html = '<h3>👮 Gestión de usuarios</h3><div class="full-form"><input id="newUsername" placeholder="Usuario"><input id="newPassword" placeholder="Contraseña"><input id="newRank" placeholder="Rango"><button id="crearUsuarioBtn" class="btn-save">CREAR USUARIO</button></div><hr>';
                users.forEach(u => html += '<div class="list-item">'+u.username+' · '+(u.rank||'Oficial')+'</div>');
            }
            if(p==='cases') html = '<button class="btn-save" id="nuevoCasoBtn">+ CREAR CASO</button><div class="list-item">Caso 1 · Activo</div>';
            if(p==='detenciones') html = '<h3>Registro detenciones</h3><div class="full-form"><input placeholder="Motivo"><textarea placeholder="Lectura de derechos automática"></textarea><input placeholder="Tiempo custodia (min)"><button class="btn-save">REGISTRAR DETENCIÓN</button></div>';
            if(p==='multas') html = '<h3>Generar multa</h3><div class="full-form"><input placeholder="Ciudadano (DNI o nombre)"><input placeholder="Vehículo matrícula"><select><option>Exceso velocidad</option><option>Semáforo</option></select><input placeholder="Importe automático" value="150€"><button class="btn-save">GENERAR DENUNCIA</button></div>';

            content.innerHTML = html;

            if(p==='hub') document.querySelectorAll('.hub-card').forEach(el=> el.onclick = ()=> render(el.dataset.page));
            if(p==='citizens') document.querySelectorAll('.btn-view-citizen').forEach(b=> b.onclick = ()=> alert('🔍 Perfil de ciudadano (simulado)'));
            if(p==='vehicles') document.querySelectorAll('.btn-view-vehicle').forEach(b=> b.onclick = ()=> alert('🔍 Ficha de vehículo (simulado)'));
            if(p==='system') document.querySelectorAll('.list-item[data-page]').forEach(el=> el.onclick = ()=> render(el.dataset.page));
            if(p==='facial') document.getElementById('simularFacial')?.addEventListener('click', function(){
                let c = load(KEYS.CITIZENS,[]);
                let r = c[Math.floor(Math.random()*c.length)];
                document.getElementById('facialResult').innerHTML = '✅ Match: '+r.nombre+' <button data-id="'+r.id+'" class="btn-view-citizen">VER PERFIL</button>';
                document.querySelector('#facialResult .btn-view-citizen')?.addEventListener('click', ()=> alert('Perfil: '+r.nombre));
            });
            if(p==='plate') document.getElementById('simularPlaca')?.addEventListener('click', function(){
                let v = load(KEYS.VEHICLES,[]);
                let r = v[Math.floor(Math.random()*v.length)];
                document.getElementById('plateResult').innerHTML = '✅ Matrícula: '+r.matricula+' · '+r.marca+' '+r.modelo+' <button data-id="'+r.id+'" class="btn-view-vehicle">VER VEHÍCULO</button>';
                document.querySelector('#plateResult .btn-view-vehicle')?.addEventListener('click', ()=> alert('Vehículo: '+r.matricula));
            });
            if(p==='userManagement') document.getElementById('crearUsuarioBtn')?.addEventListener('click', function(){
                let u = load(KEYS.USERS,[]);
                u.push({ id: Date.now(), username: document.getElementById('newUsername').value, password: document.getElementById('newPassword').value, rank: document.getElementById('newRank').value });
                save(KEYS.USERS, u);
                alert('✅ Usuario creado');
                render('userManagement');
            });
        }
    }
    check();
})();
