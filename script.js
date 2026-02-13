(function(){
    "use strict";

    // ------------------------------------------------------------
    // CONFIGURACIÓN DE ALMACENAMIENTO LOCAL
    // ------------------------------------------------------------
    const STORAGE_KEYS = {
        CITIZENS: 'mdt_citizens',
        VEHICLES: 'mdt_vehicles',
        CASES: 'mdt_cases',
        USERS: 'mdt_users',
        REPORTS: 'mdt_reports',
        EVIDENCE: 'mdt_evidence',
        ALERTS: 'mdt_alerts',
        LOGGED_IN: 'mdt_loggedIn'
    };

    // Funciones auxiliares de localStorage
    const load = (key, defaultValue) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch {
            return defaultValue;
        }
    };
    const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

    // ------------------------------------------------------------
    // INICIALIZACIÓN DE DATOS POR DEFECTO
    // ------------------------------------------------------------
    function initializeDatabase() {
        // Usuario por defecto
        if (!load(STORAGE_KEYS.USERS, []).length) {
            save(STORAGE_KEYS.USERS, [
                { id: '1', username: 'Pol Beltran', password: 'Polbeltran5', rank: 'Oficial', fullName: 'Pol Beltran' }
            ]);
        }

        // 200 ciudadanos aleatorios
        if (!localStorage.getItem(STORAGE_KEYS.CITIZENS)) {
            const nombres = ['Antonio', 'María', 'José', 'Laura', 'Carlos', 'Ana', 'David', 'Elena', 'Javier', 'Sara', 'Daniel', 'Paula', 'Fernando', 'Lucía', 'Manuel', 'Cristina'];
            const apellidos = ['García', 'Martínez', 'López', 'Sánchez', 'Fernández', 'Pérez', 'Gómez', 'Ruiz', 'Díaz', 'Torres', 'Romero', 'Navarro', 'Castro', 'Ortega'];
            const nacionalidades = ['Española', 'Colombiana', 'Argentina', 'Mexicana', 'Francesa', 'Italiana', 'Portuguesa'];
            const trabajos = ['Albañil', 'Profesor', 'Camarero', 'Conductor', 'Enfermero', 'Abogado', 'Comerciante', 'Estudiante', 'Jubilado', 'Administrativo'];
            const citizens = [];
            for (let i = 0; i < 200; i++) {
                const nombre = nombres[Math.floor(Math.random() * nombres.length)];
                const apellido1 = apellidos[Math.floor(Math.random() * apellidos.length)];
                const apellido2 = apellidos[Math.floor(Math.random() * apellidos.length)];
                const fullName = `${nombre} ${apellido1} ${apellido2}`;
                const dni = `${Math.floor(Math.random() * 100000000)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
                const telefono = `6${Math.floor(Math.random() * 100000000)}`.slice(0,9);
                const direccion = `C/ ${apellidos[Math.floor(Math.random()*apellidos.length)]}, ${Math.floor(Math.random()*100)}`;
                const nacionalidad = nacionalidades[Math.floor(Math.random() * nacionalidades.length)];
                const trabajo = trabajos[Math.floor(Math.random() * trabajos.length)];
                const antecedentes = Math.random() > 0.7;
                const buscaCaptura = Math.random() > 0.9;
                citizens.push({
                    id: `cit-${i}-${Date.now()}`,
                    nombre: fullName,
                    dni, telefono, direccion, nacionalidad, trabajo,
                    antecedentes: antecedentes,
                    antecedentesDesc: antecedentes ? 'Hurto menor / 2019' : '',
                    buscaCaptura: buscaCaptura,
                    foto: null,
                    vehiculoAsignado: null
                });
            }
            save(STORAGE_KEYS.CITIZENS, citizens);
        }

        // 200 vehículos aleatorios
        if (!localStorage.getItem(STORAGE_KEYS.VEHICLES)) {
            const marcas = ['Seat', 'Renault', 'Peugeot', 'Citroën', 'Ford', 'Toyota', 'Volkswagen', 'Mercedes', 'BMW', 'Audi'];
            const modelos = ['Ibiza', 'Clio', '308', 'C4', 'Focus', 'Corolla', 'Golf', 'Clase C', 'Serie 3', 'A3'];
            const colores = ['Blanco', 'Negro', 'Gris', 'Azul', 'Rojo', 'Plateado'];
            const vehicles = [];
            for (let i = 0; i < 200; i++) {
                const marca = marcas[Math.floor(Math.random() * marcas.length)];
                const modelo = modelos[Math.floor(Math.random() * modelos.length)];
                const matricula = `${Math.floor(Math.random() * 10000)}${String.fromCharCode(65 + Math.floor(Math.random()*26))}${String.fromCharCode(65 + Math.floor(Math.random()*26))}${String.fromCharCode(65 + Math.floor(Math.random()*26))}`;
                vehicles.push({
                    id: `car-${i}-${Date.now()}`,
                    marca, modelo, matricula,
                    color: colores[Math.floor(Math.random() * colores.length)],
                    bastidor: `${Math.floor(Math.random() * 1000000000000000)}`.slice(0,17),
                    itv: `202${Math.floor(Math.random() * 4)}-0${Math.floor(Math.random() * 9)+1}-${Math.floor(Math.random() * 20)+1}`,
                    ubicacion: `Polígono ${Math.floor(Math.random() * 30)}`,
                    robado: Math.random() > 0.8,
                    alertaRobo: Math.random() > 0.8 ? 'Posible uso en atraco' : '',
                    propietarioId: null
                });
            }
            save(STORAGE_KEYS.VEHICLES, vehicles);
        }

        // Otras colecciones vacías por defecto
        if (!localStorage.getItem(STORAGE_KEYS.CASES)) save(STORAGE_KEYS.CASES, []);
        if (!localStorage.getItem(STORAGE_KEYS.REPORTS)) save(STORAGE_KEYS.REPORTS, []);
        if (!localStorage.getItem(STORAGE_KEYS.EVIDENCE)) save(STORAGE_KEYS.EVIDENCE, []);
        if (!localStorage.getItem(STORAGE_KEYS.ALERTS)) save(STORAGE_KEYS.ALERTS, []);
    }

    // ------------------------------------------------------------
    // ESTADO Y NAVEGACIÓN
    // ------------------------------------------------------------
    let navigationStack = ['hub'];
    let currentPage = 'hub';
    let pageParams = {};

    const loginScreen = document.getElementById('login-screen');
    const hubScreen = document.getElementById('hub-screen');
    const appContent = document.getElementById('app-content');
    const headerTitle = document.getElementById('header-title');
    const backBtn = document.getElementById('backBtn');

    // ------------------------------------------------------------
    // COMPROBAR SESIÓN
    // ------------------------------------------------------------
    function checkLoggedIn() {
        const logged = localStorage.getItem(STORAGE_KEYS.LOGGED_IN) === 'true';
        if (logged) {
            loginScreen.classList.add('hidden');
            hubScreen.classList.remove('hidden');
            renderPage('hub');
        } else {
            loginScreen.classList.remove('hidden');
            hubScreen.classList.add('hidden');
        }
    }

    // ------------------------------------------------------------
    // EVENTOS GLOBALES (LOGIN, LOGOUT, BACK, SETTINGS)
    // ------------------------------------------------------------
    document.getElementById('btn-login').addEventListener('click', function(e) {
        e.preventDefault();
        const user = document.getElementById('usuario').value.trim();
        const pass = document.getElementById('password').value.trim();
        const users = load(STORAGE_KEYS.USERS, []);
        const validUser = users.find(u => u.username === user && u.password === pass);
        if (validUser) {
            localStorage.setItem(STORAGE_KEYS.LOGGED_IN, 'true');
            checkLoggedIn();
        } else {
            alert('Credenciales incorrectas. Prueba: Pol Beltran / Polbeltran5');
        }
    });

    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.setItem(STORAGE_KEYS.LOGGED_IN, 'false');
        checkLoggedIn();
    });

    backBtn.addEventListener('click', function() {
        goBack();
    });

    document.getElementById('settingsBtn').addEventListener('click', function() {
        renderPage('userManagement');
    });

    // ------------------------------------------------------------
    // FUNCIONES DE NAVEGACIÓN
    // ------------------------------------------------------------
    function navigateTo(page, params = {}) {
        navigationStack.push(page);
        pageParams = params;
        renderPage(page, params);
    }

    function goBack() {
        if (navigationStack.length > 1) {
            navigationStack.pop();
            const prev = navigationStack[navigationStack.length - 1];
            renderPage(prev, {});
        } else {
            renderPage('hub');
        }
    }

    // ------------------------------------------------------------
    // RENDERIZADO DE PÁGINAS
    // ------------------------------------------------------------
    function renderPage(page, params = {}) {
        currentPage = page;
        pageParams = params;
        if (!hubScreen.classList.contains('hidden')) {
            let html = '';
            headerTitle.innerText = getTitle(page);
            backBtn.style.visibility = (page === 'hub' || page === 'userManagement' ? 'hidden' : 'visible');

            switch (page) {
                case 'hub': html = renderHub(); break;
                case 'citizens': html = renderCitizensList(); break;
                case 'citizenDetail': html = renderCitizenDetail(params.id); break;
                case 'vehicles': html = renderVehiclesList(); break;
                case 'vehicleDetail': html = renderVehicleDetail(params.id); break;
                case 'createCitizen': html = renderCreateCitizen(); break;
                case 'system': html = renderSystemHub(); break;
                case 'cases': html = renderCasesList(); break;
                case 'createCase': html = renderCreateCase(); break;
                case 'facial': html = renderFacialRecognition(); break;
                case 'plate': html = renderPlateRecognition(); break;
                case 'detenciones': html = renderDetenciones(); break;
                case 'multas': html = renderMultas(); break;
                case 'informes': html = renderInformes(); break;
                case 'evidencias': html = renderEvidencias(); break;
                case 'ordenes': html = renderOrdenesAlertas(); break;
                case 'mapa': html = renderMapa(); break;
                case 'bandas': html = renderBandas(); break;
                case 'expedientes': html = renderExpedientes(); break;
                case 'userManagement': html = renderUserManagement(); break;
                default: html = '<div style="padding:20px; text-align:center;">Página no encontrada</div>';
            }
            appContent.innerHTML = html;
            attachPageEvents(page);
        }
    }

    function getTitle(page) {
        const titles = {
            hub: 'HUB CENTRAL',
            citizens: 'CIUDADANOS',
            citizenDetail: 'PERFIL CIUDADANO',
            vehicles: 'VEHÍCULOS',
            vehicleDetail: 'FICHA VEHÍCULO',
            createCitizen: 'ALTA CIUDADANO',
            system: 'SISTEMA POLICIAL',
            cases: 'CASOS POLICIALES',
            createCase: 'NUEVO CASO',
            facial: 'RECONOCIMIENTO FACIAL',
            plate: 'RECONOCIMIENTO MATRÍCULAS',
            detenciones: 'REGISTRO DETENCIONES',
            multas: 'MULTAS Y SANCIONES',
            informes: 'INFORMES POLICIALES',
            evidencias: 'REGISTRO EVIDENCIAS',
            ordenes: 'ÓRDENES Y ALERTAS',
            mapa: 'MAPA OPERATIVO',
            bandas: 'BANDAS CRIMINALES',
            expedientes: 'EXPEDIENTE AGENTES',
            userManagement: 'GESTIÓN USUARIOS'
        };
        return titles[page] || 'MDT · SIPN';
    }

    // ------------------------------------------------------------
    // PÁGINA HUB
    // ------------------------------------------------------------
    function renderHub() {
        return `
            <div class="hub-grid">
                <div class="hub-card" data-page="citizens">👥 CIUDADANOS</div>
                <div class="hub-card" data-page="vehicles">🚘 VEHÍCULOS</div>
                <div class="hub-card" data-page="system">📋 SISTEMA POLICIAL</div>
                <div class="hub-card" data-page="createCitizen">➕ CREAR CIUDADANO</div>
            </div>
            <div style="margin-top:30px; padding:15px; background:#102433; border-radius:40px; text-align:center; color:#91b9d9;">
                <span>🔒 MDT · UNIDAD 7 · OFICIAL CONECTADO</span>
            </div>
        `;
    }

    // ------------------------------------------------------------
    // MÓDULO CIUDADANOS
    // ------------------------------------------------------------
    function renderCitizensList() {
        const citizens = load(STORAGE_KEYS.CITIZENS, []);
        let html = `<input type="text" id="searchCitizen" class="search-box" placeholder="🔍 Buscar por nombre, DNI o teléfono">`;
        html += `<div id="citizen-list-container">`;
        citizens.forEach(c => {
            html += `<div class="list-item">
                        <span><strong>${c.nombre}</strong><br><small>${c.dni} · 📞 ${c.telefono}</small></span>
                        <button data-id="${c.id}" class="btn-view-citizen">VER</button>
                    </div>`;
        });
        html += `</div>`;
        return html;
    }

    function renderCitizenDetail(id) {
        const citizens = load(STORAGE_KEYS.CITIZENS, []);
        const citizen = citizens.find(c => c.id === id);
        if (!citizen) return '<div>Ciudadano no encontrado</div>';
        return `
            <div style="padding: 10px">
                <div style="display:flex; gap:20px; align-items:center; margin-bottom:20px;">
                    <div style="background:#2b4b65; width:80px; height:80px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2rem;">👤</div>
                    <div><h3>${citizen.nombre}</h3></div>
                </div>
                <div class="profile-field"><label>DNI</label><span>${citizen.dni}</span></div>
                <div class="profile-field"><label>Teléfono</label><span>${citizen.telefono}</span></div>
                <div class="profile-field"><label>Dirección</label><span>${citizen.direccion}</span></div>
                <div class="profile-field"><label>Nacionalidad</label><span>${citizen.nacionalidad}</span></div>
                <div class="profile-field"><label>Trabajo</label><span>${citizen.trabajo || 'No especificado'}</span></div>
                <div class="profile-field"><label>Antecedentes</label><span>${citizen.antecedentes ? 'SÍ: ' + citizen.antecedentesDesc : 'NO'}</span></div>
                <div class="profile-field"><label>Busca y captura</label><span>${citizen.buscaCaptura ? '🚨 SÍ' : '❌ NO'}</span></div>
                <div class="profile-field"><label>Vehículo asignado</label><span>${citizen.vehiculoAsignado ? '🔗 Enlace a vehículo' : 'Ninguno'}</span></div>
                <button class="btn-save" data-action="edit-citizen" data-id="${citizen.id}">EDITAR PERFIL</button>
            </div>
        `;
    }

    // ------------------------------------------------------------
    // MÓDULO VEHÍCULOS
    // ------------------------------------------------------------
    function renderVehiclesList() {
        const vehicles = load(STORAGE_KEYS.VEHICLES, []);
        let html = `<input type="text" id="searchVehicle" class="search-box" placeholder="🔍 Buscar matrícula, marca o modelo">`;
        html += `<div id="vehicle-list-container">`;
        vehicles.forEach(v => {
            html += `<div class="list-item">
                        <span><strong>${v.marca} ${v.modelo}</strong><br><small>${v.matricula}</small></span>
                        <button data-id="${v.id}" class="btn-view-vehicle">VER</button>
                    </div>`;
        });
        html += `</div>`;
        return html;
    }

    function renderVehicleDetail(id) {
        const vehicles = load(STORAGE_KEYS.VEHICLES, []);
        const v = vehicles.find(v => v.id === id);
        if (!v) return '<div>Vehículo no existe</div>';
        return `
            <div>
                <div style="background:#0d2a3b; padding:20px; border-radius:28px;">
                    <h3>${v.marca} ${v.modelo}</h3>
                    <div class="profile-field"><label>Matrícula</label><span>${v.matricula}</span></div>
                    <div class="profile-field"><label>Color</label><span>${v.color}</span></div>
                    <div class="profile-field"><label>Nº Bastidor</label><span>${v.bastidor}</span></div>
                    <div class="profile-field"><label>ITV última</label><span>${v.itv}</span></div>
                    <div class="profile-field"><label>Ubicación</label><span>${v.ubicacion}</span></div>
                    <div class="profile-field"><label>Robado</label><span>${v.robado ? '🚨 SÍ' : 'NO'}</span></div>
                    ${v.robado ? `<div class="profile-field"><label>Alerta</label><span>${v.alertaRobo || 'SIN DESCRIPCIÓN'}</span></div>` : ''}
                    <div class="profile-field"><label>Propietario</label><span>${v.propietarioId ? '🔗 Ver ciudadano' : 'No registrado'}</span></div>
                </div>
            </div>
        `;
    }

    // ------------------------------------------------------------
    // CREAR CIUDADANO
    // ------------------------------------------------------------
    function renderCreateCitizen() {
        return `
            <div class="full-form">
                <h3>➕ Nuevo ciudadano</h3>
                <input type="file" accept="image/*" id="fotoInput">
                <input type="text" id="nombreCompleto" placeholder="Nombre completo">
                <input type="text" id="dniInput" placeholder="DNI">
                <input type="tel" id="telefonoInput" placeholder="Teléfono">
                <input type="text" id="direccionInput" placeholder="Dirección">
                <input type="text" id="nacionalidadInput" placeholder="Nacionalidad" value="Española">
                <input type="text" id="trabajoInput" placeholder="Trabajo">
                <div style="display:flex; gap:10px; align-items:center;">
                    <label>Antecedentes:</label>
                    <input type="checkbox" id="antecedentesCheck"> <span style="margin-left:5px;">Sí</span>
                </div>
                <textarea id="antecedentesDesc" placeholder="Descripción antecedentes" rows="2"></textarea>
                <div style="display:flex; gap:10px; align-items:center;">
                    <label>Busca y captura:</label>
                    <input type="checkbox" id="buscaCheck">
                </div>
                <button class="btn-save" id="guardarCiudadanoBtn">GUARDAR CIUDADANO</button>
            </div>
        `;
    }

    // ------------------------------------------------------------
    // SISTEMA POLICIAL (SUBMENÚ)
    // ------------------------------------------------------------
    function renderSystemHub() {
        return `
            <div style="display:flex; flex-direction:column; gap:16px;">
                <div class="list-item" data-page="cases">📁 CASOS POLICIALES <button>></button></div>
                <div class="list-item" data-page="facial">😐 RECONOCIMIENTO FACIAL <button>></button></div>
                <div class="list-item" data-page="plate">🪪 RECONOCIMIENTO MATRÍCULAS <button>></button></div>
                <div style="margin-top:20px; font-weight:bold;">OPERATIVA DIARIA</div>
                <div class="list-item" data-page="detenciones">🚔 REGISTRO DETENCIONES <button>></button></div>
                <div class="list-item" data-page="multas">📝 MULTAS Y SANCIONES <button>></button></div>
                <div class="list-item" data-page="informes">📄 INFORMES POLICIALES <button>></button></div>
                <div class="list-item" data-page="evidencias">📎 REGISTRO EVIDENCIAS <button>></button></div>
                <div style="margin-top:20px; font-weight:bold;">INTELIGENCIA Y SEGURIDAD</div>
                <div class="list-item" data-page="ordenes">⚠️ ÓRDENES Y ALERTAS <button>></button></div>
                <div class="list-item" data-page="mapa">🗺️ MAPA OPERATIVO <button>></button></div>
                <div class="list-item" data-page="bandas">🕵️ BANDAS CRIMINALES <button>></button></div>
                <div style="margin-top:20px; font-weight:bold;">GESTIÓN DEPARTAMENTO</div>
                <div class="list-item" data-page="expedientes">📋 EXPEDIENTE AGENTES <button>></button></div>
            </div>
        `;
    }

    // ------------------------------------------------------------
    // CASOS POLICIALES
    // ------------------------------------------------------------
    function renderCasesList() {
        const casos = load(STORAGE_KEYS.CASES, []);
        let html = `<button class="btn-save" id="nuevoCasoBtn" style="background:#0d5470;">+ CREAR CASO</button>`;
        if (casos.length === 0) {
            html += `<div style="text-align:center; padding:30px; color:#8ab3cf;">No hay casos registrados.</div>`;
        } else {
            casos.forEach(c => {
                html += `<div class="list-item">${c.nombre} · ${c.estado || 'Activo'}<button data-id="${c.id}">EDITAR</button></div>`;
            });
        }
        return html;
    }

    function renderCreateCase() {
        return `<div class="full-form"><h3>Nuevo caso</h3><input placeholder="Nombre del caso"><textarea placeholder="Descripción"></textarea><input type="file"> <button class="btn-save">GUARDAR CASO</button></div>`;
    }

    // ------------------------------------------------------------
    // RECONOCIMIENTO FACIAL Y MATRÍCULAS (SIMULACIÓN)
    // ------------------------------------------------------------
    function renderFacialRecognition() {
        return `<div class="camera-mock">📷 CÁMARA FACIAL (SIMULACIÓN)<br><button id="simularFacial" class="btn-save" style="background: #1f5e7a;">IDENTIFICAR PERSONA</button><div id="facialResult"></div></div>`;
    }

    function renderPlateRecognition() {
        return `<div class="camera-mock">📸 LECTOR MATRÍCULAS<br><button id="simularPlaca" class="btn-save">CAPTURAR MATRÍCULA</button><div id="plateResult"></div></div>`;
    }

    // ------------------------------------------------------------
    // OPERATIVA DIARIA (MOCKUPS FUNCIONALES)
    // ------------------------------------------------------------
    function renderDetenciones() {
        return `<h3>Registro detenciones</h3><div class="full-form"><input placeholder="Motivo"><textarea placeholder="Lectura de derechos automática"></textarea><input placeholder="Tiempo custodia (min)"><button class="btn-save">REGISTRAR DETENCIÓN</button></div>`;
    }
    function renderMultas() {
        return `<h3>Generar multa</h3><div class="full-form"><input placeholder="Ciudadano (DNI o nombre)"><input placeholder="Vehículo matrícula"><select><option>Exceso velocidad</option><option>Semáforo</option></select><input placeholder="Importe automático" value="150€"><button class="btn-save">GENERAR DENUNCIA</button></div>`;
    }
    function renderInformes() {
        return `<h3>Plantillas informe</h3><div class="list-item">Intervención</div><div class="list-item">Patrulla</div><div class="list-item">Incidente</div>`;
    }
    function renderEvidencias() {
        return `<h3>Subir evidencia</h3><input type="file" multiple><input placeholder="Etiquetar caso"><button class="btn-save">SUBIR Y CUSTODIAR</button>`;
    }

    // ------------------------------------------------------------
    // INTELIGENCIA Y SEGURIDAD (MOCKUPS)
    // ------------------------------------------------------------
    function renderOrdenesAlertas() { return `<h3>Órdenes de arresto / BOLO</h3><p>Personas buscadas: 3 · Desaparecidos: 1</p>`; }
    function renderMapa() { return `<div style="background:#1f3c4a; padding:30px; border-radius:20px;">🗺️ Mapa operativo (incidentes activos, patrullas, hotspots) — SIMULACIÓN</div>`; }
    function renderBandas() { return `<h3>Bandas criminales</h3><div>Los Malditos · Miembros: 12</div>`; }
    function renderExpedientes() { return `<h3>Expediente de agentes</h3><div>Rangos · Sanciones · Condecoraciones</div>`; }

    // ------------------------------------------------------------
    // GESTIÓN DE USUARIOS (AJUSTES)
    // ------------------------------------------------------------
    function renderUserManagement() {
        const users = load(STORAGE_KEYS.USERS, []);
        let html = `<h3>👮 Gestión de usuarios</h3><div class="full-form"><input id="newUsername" placeholder="Usuario"><input id="newPassword" placeholder="Contraseña"><input id="newRank" placeholder="Rango"><button id="crearUsuarioBtn" class="btn-save">CREAR USUARIO</button></div><hr>`;
        users.forEach(u => html += `<div class="list-item">${u.username} · ${u.rank || 'Oficial'} <button data-id="${u.id}">Editar</button></div>`);
        return html;
    }

    // ------------------------------------------------------------
    // ASIGNACIÓN DE EVENTOS DINÁMICOS
    // ------------------------------------------------------------
    function attachPageEvents(page) {
        // HUB
        if (page === 'hub') {
            document.querySelectorAll('.hub-card').forEach(card => {
                card.addEventListener('click', function(e) {
                    const pageDest = this.dataset.page;
                    navigateTo(pageDest);
                });
            });
        }
        // Lista de ciudadanos
        if (page === 'citizens') {
            document.querySelectorAll('.btn-view-citizen').forEach(btn => {
                btn.addEventListener('click', e => {
                    const id = e.currentTarget.dataset.id;
                    navigateTo('citizenDetail', { id });
                });
            });
        }
        // Lista de vehículos
        if (page === 'vehicles') {
            document.querySelectorAll('.btn-view-vehicle').forEach(btn => {
                btn.addEventListener('click', e => {
                    const id = e.currentTarget.dataset.id;
                    navigateTo('vehicleDetail', { id });
                });
            });
        }
        // Crear ciudadano (simulado)
        if (page === 'createCitizen') {
            document.getElementById('guardarCiudadanoBtn')?.addEventListener('click', function() {
                alert('Funcionalidad guardar ciudadano completada (simulación). En MDT real se almacena en localStorage.');
                // Aquí se puede implementar la lógica real de guardado
            });
        }
        // Sistema policial (submenú)
        if (page === 'system') {
            document.querySelectorAll('.list-item[data-page]').forEach(el => {
                el.addEventListener('click', function(e) {
                    const dest = this.dataset.page;
                    navigateTo(dest);
                });
            });
        }
        // Reconocimiento facial
        if (page === 'facial') {
            document.getElementById('simularFacial')?.addEventListener('click', function() {
                const citizens = load(STORAGE_KEYS.CITIZENS, []);
                const random = citizens[Math.floor(Math.random() * citizens.length)];
                document.getElementById('facialResult').innerHTML = `✅ Match: ${random.nombre} <button data-id="${random.id}" class="btn-view-citizen">VER PERFIL</button>`;
                document.querySelector('#facialResult .btn-view-citizen')?.addEventListener('click', function(){
                    navigateTo('citizenDetail', { id: random.id });
                });
            });
        }
        // Reconocimiento de matrículas
        if (page === 'plate') {
            document.getElementById('simularPlaca')?.addEventListener('click', function() {
                const vehicles = load(STORAGE_KEYS.VEHICLES, []);
                const random = vehicles[Math.floor(Math.random() * vehicles.length)];
                document.getElementById('plateResult').innerHTML = `✅ Matrícula: ${random.matricula} · ${random.marca} ${random.modelo} <button data-id="${random.id}" class="btn-view-vehicle">VER VEHÍCULO</button>`;
                document.querySelector('#plateResult .btn-view-vehicle')?.addEventListener('click', function(){
                    navigateTo('vehicleDetail', { id: random.id });
                });
            });
        }
        // Gestión de usuarios
        if (page === 'userManagement') {
            document.getElementById('crearUsuarioBtn')?.addEventListener('click', function(){
                const users = load(STORAGE_KEYS.USERS, []);
                const newU = {
                    id: 'u' + Date.now(),
                    username: document.getElementById('newUsername').value,
                    password: document.getElementById('newPassword').value,
                    rank: document.getElementById('newRank').value
                };
                users.push(newU);
                save(STORAGE_KEYS.USERS, users);
                alert('✅ Usuario creado correctamente');
                renderPage('userManagement');
            });
        }
    }

    // ------------------------------------------------------------
    // ARRANQUE DE LA APLICACIÓN
    // ------------------------------------------------------------
    initializeDatabase();
    checkLoggedIn();
})();
