// IMMEDIATE EXECUTION TEST - This runs as soon as the script loads
(function() {
    const jsStatusDiv = document.getElementById('jsStatus');
    if (jsStatusDiv) {
        jsStatusDiv.style.background = 'rgba(76, 175, 80, 0.8)';
        jsStatusDiv.innerHTML = '✅ JS cargado';
    }
})();

// STATE MANAGEMENT
let currentUser = null;
let currentScreen = 'loginScreen';
let currentCitizenId = null;
let currentVehicleId = null;
let currentCaseId = null;

// DATA INITIALIZATION
function initializeData() {
    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            { username: 'Pol Beltran', password: 'Polbeltran5', rank: 'Inspector' }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }

    if (!localStorage.getItem('citizens')) {
        const citizens = generateRandomCitizens(200);
        localStorage.setItem('citizens', JSON.stringify(citizens));
    }

    if (!localStorage.getItem('vehicles')) {
        const vehicles = generateRandomVehicles(150);
        localStorage.setItem('vehicles', JSON.stringify(vehicles));
    }

    if (!localStorage.getItem('cases')) localStorage.setItem('cases', JSON.stringify([]));
    if (!localStorage.getItem('detentions')) localStorage.setItem('detentions', JSON.stringify([]));
    if (!localStorage.getItem('multas')) localStorage.setItem('multas', JSON.stringify([]));
    if (!localStorage.getItem('reports')) localStorage.setItem('reports', JSON.stringify([]));
    if (!localStorage.getItem('evidences')) localStorage.setItem('evidences', JSON.stringify([]));
    if (!localStorage.getItem('gangs')) localStorage.setItem('gangs', JSON.stringify([]));
}

// RANDOM DATA GENERATORS
function generateRandomCitizens(count) {
    const firstNames = ['Juan', 'María', 'Carlos', 'Ana', 'Pedro', 'Laura', 'José', 'Carmen', 'Francisco', 'Isabel', 'Antonio', 'Dolores', 'Manuel', 'Pilar', 'David', 'Teresa', 'Javier', 'Rosa', 'Miguel', 'Cristina'];
    const lastNames = ['García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martín', 'Jiménez', 'Ruiz', 'Hernández', 'Díaz', 'Moreno', 'Muñoz', 'Álvarez', 'Romero', 'Alonso', 'Gutiérrez'];
    const streets = ['Calle Mayor', 'Avenida Principal', 'Calle del Sol', 'Plaza España', 'Calle Real', 'Paseo Marítimo', 'Calle Larga', 'Avenida Constitución'];
    const jobs = ['Comerciante', 'Profesor', 'Médico', 'Ingeniero', 'Abogado', 'Camarero', 'Mecánico', 'Electricista', 'Empresario', 'Administrativo', 'Desempleado'];
    const nationalities = ['Española', 'Francesa', 'Italiana', 'Portuguesa', 'Alemana', 'Británica', 'Rumana', 'Marroquí'];

    const citizens = [];
    for (let i = 0; i < count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName1 = lastNames[Math.floor(Math.random() * lastNames.length)];
        const lastName2 = lastNames[Math.floor(Math.random() * lastNames.length)];
        
        citizens.push({
            id: 'C' + String(i + 1).padStart(6, '0'),
            name: `${firstName} ${lastName1} ${lastName2}`,
            dni: generateDNI(),
            phone: `6${Math.floor(Math.random() * 90000000 + 10000000)}`,
            address: `${streets[Math.floor(Math.random() * streets.length)]}, ${Math.floor(Math.random() * 100 + 1)}`,
            nationality: nationalities[Math.floor(Math.random() * nationalities.length)],
            job: jobs[Math.floor(Math.random() * jobs.length)],
            hasRecord: Math.random() < 0.15,
            recordDetails: '',
            wanted: Math.random() < 0.05,
            vehicle: null,
            photo: null
        });
    }
    return citizens;
}

function generateRandomVehicles(count) {
    const brands = ['Seat', 'Renault', 'Peugeot', 'Volkswagen', 'Ford', 'Opel', 'Citroën', 'BMW', 'Mercedes', 'Audi', 'Toyota', 'Nissan', 'Hyundai', 'Kia'];
    const models = ['Ibiza', 'León', 'Clio', 'Megane', '208', '308', 'Golf', 'Polo', 'Fiesta', 'Focus', 'Corsa', 'Astra', 'C3', 'C4', 'Serie 3', 'Clase A', 'A3', 'A4', 'Corolla', 'Qashqai'];
    const colors = ['Blanco', 'Negro', 'Gris', 'Plata', 'Azul', 'Rojo', 'Verde', 'Amarillo'];

    const vehicles = [];
    for (let i = 0; i < count; i++) {
        const brand = brands[Math.floor(Math.random() * brands.length)];
        const model = models[Math.floor(Math.random() * models.length)];
        
        vehicles.push({
            id: 'V' + String(i + 1).padStart(6, '0'),
            brand: brand,
            model: model,
            fullName: `${brand} ${model}`,
            color: colors[Math.floor(Math.random() * colors.length)],
            plate: generatePlate(),
            vin: generateVIN(),
            itv: generateRandomDate(),
            location: 'Barcelona',
            stolen: Math.random() < 0.08,
            stolenDetails: '',
            owner: null
        });
    }
    return vehicles;
}

function generateDNI() {
    const num = Math.floor(Math.random() * 90000000 + 10000000);
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    return num + letters[num % 23];
}

function generatePlate() {
    const nums = Math.floor(Math.random() * 9000 + 1000);
    const letters = 'BCDFGHJKLMNPRSTVWXYZ';
    const l1 = letters[Math.floor(Math.random() * letters.length)];
    const l2 = letters[Math.floor(Math.random() * letters.length)];
    const l3 = letters[Math.floor(Math.random() * letters.length)];
    return `${nums}${l1}${l2}${l3}`;
}

function generateVIN() {
    const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
    let vin = '';
    for (let i = 0; i < 17; i++) {
        vin += chars[Math.floor(Math.random() * chars.length)];
    }
    return vin;
}

function generateRandomDate() {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
}

// NAVIGATION
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;
}

// LOGIN
function login() {
    const debugDiv = document.getElementById('debugInfo');
    debugDiv.style.display = 'block';
    let debugMsg = '';
    
    debugMsg += '🔍 Iniciando login...\n';
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorMsg = document.getElementById('loginError');

    debugMsg += '👤 Usuario: "' + username + '"\n';
    debugMsg += '🔑 Contraseña: "' + password + '"\n';

    const users = JSON.parse(localStorage.getItem('users'));
    debugMsg += '📊 Usuarios en BD: ' + JSON.stringify(users) + '\n';
    
    const user = users.find(u => u.username === username && u.password === password);
    debugMsg += '✅ Usuario encontrado: ' + (user ? 'SÍ' : 'NO') + '\n';

    debugDiv.innerHTML = debugMsg.replace(/\n/g, '<br>');

    if (user) {
        currentUser = user;
        errorMsg.textContent = '';
        debugMsg += '🎉 Login exitoso!\n';
        debugDiv.innerHTML = debugMsg.replace(/\n/g, '<br>');
        setTimeout(() => {
            showScreen('mainHub');
        }, 500);
    } else {
        debugMsg += '❌ Login fallido\n';
        debugDiv.innerHTML = debugMsg.replace(/\n/g, '<br>');
        errorMsg.textContent = 'Usuario o contraseña incorrectos';
    }
}

// CITIZENS MODULE
function loadCitizens() {
    const citizens = JSON.parse(localStorage.getItem('citizens'));
    const container = document.getElementById('citizensList');
    container.innerHTML = '';

    citizens.forEach(citizen => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-info">
                <div class="list-item-name">
                    ${citizen.name}
                    ${citizen.wanted ? '<span class="alert-badge wanted">BUSCA Y CAPTURA</span>' : ''}
                    ${citizen.hasRecord ? '<span class="alert-badge" style="background: #FF9800;">ANTECEDENTES</span>' : ''}
                </div>
                <div class="list-item-detail">DNI: ${citizen.dni} | Tel: ${citizen.phone}</div>
            </div>
            <button onclick="viewCitizen('${citizen.id}')">Ver</button>
        `;
        container.appendChild(item);
    });
}

function viewCitizen(id) {
    currentCitizenId = id;
    const citizens = JSON.parse(localStorage.getItem('citizens'));
    const citizen = citizens.find(c => c.id === id);

    if (!citizen) return;

    document.getElementById('citizenName').value = citizen.name;
    document.getElementById('citizenDNI').value = citizen.dni;
    document.getElementById('citizenPhone').value = citizen.phone;
    document.getElementById('citizenAddress').value = citizen.address;
    document.getElementById('citizenNationality').value = citizen.nationality;
    document.getElementById('citizenJob').value = citizen.job;
    document.getElementById('citizenRecord').checked = citizen.hasRecord;
    document.getElementById('citizenRecordText').value = citizen.recordDetails || '';
    document.getElementById('citizenWanted').checked = citizen.wanted;

    document.getElementById('citizenRecordDetails').style.display = citizen.hasRecord ? 'flex' : 'none';

    if (citizen.photo) {
        document.getElementById('citizenPhoto').src = citizen.photo;
    } else {
        document.getElementById('citizenPhoto').src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect fill='%23ddd' width='150' height='150'/%3E%3Ctext x='50%25' y='50%25' font-size='60' text-anchor='middle' alignment-baseline='middle' fill='%23999'%3E👤%3C/text%3E%3C/svg%3E";
    }

    if (citizen.vehicle) {
        const vehicles = JSON.parse(localStorage.getItem('vehicles'));
        const vehicle = vehicles.find(v => v.plate === citizen.vehicle);
        if (vehicle) {
            document.getElementById('citizenVehicleLink').innerHTML = `${vehicle.fullName} - ${vehicle.plate}`;
            document.getElementById('citizenVehicleLink').onclick = () => viewVehicle(vehicle.id);
        }
    } else {
        document.getElementById('citizenVehicleLink').innerHTML = 'Ninguno';
        document.getElementById('citizenVehicleLink').onclick = null;
    }

    showScreen('citizenProfile');
}

// VEHICLES MODULE
function loadVehicles() {
    const vehicles = JSON.parse(localStorage.getItem('vehicles'));
    const container = document.getElementById('vehiclesList');
    container.innerHTML = '';

    vehicles.forEach(vehicle => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-info">
                <div class="list-item-name">
                    ${vehicle.fullName}
                    ${vehicle.stolen ? '<span class="alert-badge stolen">ROBADO</span>' : ''}
                </div>
                <div class="list-item-detail">Matrícula: ${vehicle.plate} | Color: ${vehicle.color}</div>
            </div>
            <button onclick="viewVehicle('${vehicle.id}')">Ver</button>
        `;
        container.appendChild(item);
    });
}

function viewVehicle(id) {
    currentVehicleId = id;
    const vehicles = JSON.parse(localStorage.getItem('vehicles'));
    const vehicle = vehicles.find(v => v.id === id);

    if (!vehicle) return;

    document.getElementById('vehicleBrand').value = vehicle.fullName;
    document.getElementById('vehicleColor').value = vehicle.color;
    document.getElementById('vehiclePlate').value = vehicle.plate;
    document.getElementById('vehicleVIN').value = vehicle.vin;
    document.getElementById('vehicleITV').value = vehicle.itv;
    document.getElementById('vehicleLocation').value = vehicle.location;
    document.getElementById('vehicleStolen').checked = vehicle.stolen;
    document.getElementById('vehicleStolenText').value = vehicle.stolenDetails || '';

    document.getElementById('vehicleStolenDetails').style.display = vehicle.stolen ? 'flex' : 'none';

    if (vehicle.owner) {
        const citizens = JSON.parse(localStorage.getItem('citizens'));
        const owner = citizens.find(c => c.dni === vehicle.owner);
        if (owner) {
            document.getElementById('vehicleOwnerLink').innerHTML = owner.name;
            document.getElementById('vehicleOwnerLink').onclick = () => viewCitizen(owner.id);
        }
    } else {
        document.getElementById('vehicleOwnerLink').innerHTML = 'Desconocido';
        document.getElementById('vehicleOwnerLink').onclick = null;
    }

    showScreen('vehicleProfile');
}

// CREATE CITIZEN
function resetCreateCitizenForm() {
    document.getElementById('newCitizenName').value = '';
    document.getElementById('newCitizenDNI').value = '';
    document.getElementById('newCitizenPhone').value = '';
    document.getElementById('newCitizenAddress').value = '';
    document.getElementById('newCitizenNationality').value = 'Española';
    document.getElementById('newCitizenJob').value = '';
    document.getElementById('newCitizenRecord').checked = false;
    document.getElementById('newCitizenRecordText').value = '';
    document.getElementById('newCitizenWanted').checked = false;
    document.getElementById('newCitizenVehicle').value = '';
    document.getElementById('newCitizenPhoto').src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23ddd' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' font-size='60' text-anchor='middle' alignment-baseline='middle' fill='%23999'%3E👤%3C/text%3E%3C/svg%3E";
    document.getElementById('newCitizenRecordDetails').style.display = 'none';
}

// CASOS
function loadCases() {
    const cases = JSON.parse(localStorage.getItem('cases'));
    const container = document.getElementById('casesList');
    container.innerHTML = '';

    cases.forEach(c => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-info">
                <div class="list-item-name">
                    ${c.name}
                    <span class="alert-badge ${c.status === 'Activo' ? 'active' : 'closed'}">${c.status}</span>
                </div>
                <div class="list-item-detail">${c.description.substring(0, 60)}...</div>
            </div>
            <button onclick="editCase('${c.id}')">Ver</button>
        `;
        container.appendChild(item);
    });
}

function editCase(id) {
    currentCaseId = id;
    const cases = JSON.parse(localStorage.getItem('cases'));
    const c = cases.find(case => case.id === id);

    if (c) {
        document.getElementById('caseFormTitle').textContent = 'Editar Caso';
        document.getElementById('caseName').value = c.name;
        document.getElementById('caseDescription').value = c.description;
        document.getElementById('caseStatus').value = c.status;
        document.getElementById('deleteCaseBtn').style.display = 'block';
        showScreen('caseForm');
    }
}

// DETENCIONES
function loadDetentions() {
    const detentions = JSON.parse(localStorage.getItem('detentions'));
    const container = document.getElementById('detentionsList');
    container.innerHTML = '';

    detentions.forEach(d => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-info">
                <div class="list-item-name">${d.citizenName}</div>
                <div class="list-item-detail">${d.reason.substring(0, 60)}...</div>
            </div>
        `;
        container.appendChild(item);
    });
}

// MULTAS
function loadMultas() {
    const multas = JSON.parse(localStorage.getItem('multas'));
    const container = document.getElementById('multasList');
    container.innerHTML = '';

    multas.forEach(m => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-info">
                <div class="list-item-name">${m.citizenName} - ${m.amount}€</div>
                <div class="list-item-detail">${m.type}</div>
            </div>
        `;
        container.appendChild(item);
    });
}

// INFORMES
function loadReports() {
    const reports = JSON.parse(localStorage.getItem('reports'));
    const container = document.getElementById('reportsList');
    container.innerHTML = '';

    reports.forEach(r => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-info">
                <div class="list-item-name">${r.type}</div>
                <div class="list-item-detail">${r.location} - ${new Date(r.date).toLocaleDateString()}</div>
            </div>
        `;
        container.appendChild(item);
    });
}

// EVIDENCIAS
function loadEvidences() {
    const evidences = JSON.parse(localStorage.getItem('evidences'));
    const container = document.getElementById('evidencesList');
    container.innerHTML = '';

    const cases = JSON.parse(localStorage.getItem('cases'));
    const caseSelect = document.getElementById('evidenceCase');
    caseSelect.innerHTML = '<option value="">Seleccionar caso...</option>';
    cases.forEach(c => {
        const option = document.createElement('option');
        option.value = c.id;
        option.textContent = c.name;
        caseSelect.appendChild(option);
    });

    evidences.forEach(e => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-info">
                <div class="list-item-name">${e.type} - Caso ${e.caseId}</div>
                <div class="list-item-detail">${e.description.substring(0, 60)}...</div>
            </div>
        `;
        container.appendChild(item);
    });
}

// ALERTAS
function loadAlertas() {
    loadAlertTab('buscados');
}

function loadAlertTab(tab) {
    const container = document.getElementById('alertsContent');
    const citizens = JSON.parse(localStorage.getItem('citizens'));
    
    switch(tab) {
        case 'buscados':
            const wanted = citizens.filter(c => c.wanted);
            container.innerHTML = '<h3>Personas Buscadas</h3>';
            wanted.forEach(c => {
                const item = document.createElement('div');
                item.className = 'list-item';
                item.innerHTML = `
                    <div class="list-item-info">
                        <div class="list-item-name">${c.name}</div>
                        <div class="list-item-detail">DNI: ${c.dni}</div>
                    </div>
                    <button onclick="viewCitizen('${c.id}')">Ver</button>
                `;
                container.appendChild(item);
            });
            break;
        case 'ordenes':
            container.innerHTML = '<h3>Órdenes de Arresto</h3><p style="color: #aaa; padding: 20px;">No hay órdenes activas</p>';
            break;
        case 'desaparecidos':
            container.innerHTML = '<h3>Personas Desaparecidas</h3><p style="color: #aaa; padding: 20px;">No hay desaparecidos registrados</p>';
            break;
        case 'bolo':
            container.innerHTML = '<h3>Alertas BOLO (Be On the Look Out)</h3><p style="color: #aaa; padding: 20px;">No hay alertas BOLO activas</p>';
            break;
    }
}

// BANDAS
function loadGangs() {
    const gangs = JSON.parse(localStorage.getItem('gangs'));
    const container = document.getElementById('gangsList');
    container.innerHTML = '';

    gangs.forEach(g => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-info">
                <div class="list-item-name">${g.name}</div>
                <div class="list-item-detail">Peligrosidad: ${g.danger}</div>
            </div>
        `;
        container.appendChild(item);
    });
}

// AGENTES
function loadAgentes() {
    loadAgentTab('rangos');
}

function loadAgentTab(tab) {
    const container = document.getElementById('agentesContent');
    const users = JSON.parse(localStorage.getItem('users'));
    
    switch(tab) {
        case 'rangos':
            container.innerHTML = '<h3>Rangos de Agentes</h3>';
            users.forEach(u => {
                const item = document.createElement('div');
                item.className = 'list-item';
                item.innerHTML = `
                    <div class="list-item-info">
                        <div class="list-item-name">${u.username}</div>
                        <div class="list-item-detail">Rango: ${u.rank}</div>
                    </div>
                `;
                container.appendChild(item);
            });
            break;
        case 'sanciones':
            container.innerHTML = '<h3>Sanciones Internas</h3><p style="color: #aaa; padding: 20px;">No hay sanciones registradas</p>';
            break;
        case 'condecoraciones':
            container.innerHTML = '<h3>Condecoraciones</h3><p style="color: #aaa; padding: 20px;">No hay condecoraciones registradas</p>';
            break;
        case 'historial':
            container.innerHTML = '<h3>Historial de Servicio</h3><p style="color: #aaa; padding: 20px;">Consultar historial individual</p>';
            break;
    }
}

// USUARIOS
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users'));
    const container = document.getElementById('usersList');
    container.innerHTML = '';

    users.forEach(u => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-info">
                <div class="list-item-name">${u.username}</div>
                <div class="list-item-detail">Rango: ${u.rank}</div>
            </div>
        `;
        container.appendChild(item);
    });
}

// INITIALIZE WHEN DOM IS READY
document.addEventListener('DOMContentLoaded', function() {
    const debugDiv = document.getElementById('debugInfo');
    const jsStatus = document.getElementById('jsStatus');
    
    if (jsStatus) {
        jsStatus.innerHTML = '✅ DOM Ready';
    }
    
    if (debugDiv) {
        debugDiv.style.display = 'block';
        debugDiv.innerHTML = '⏳ Cargando aplicación...<br>';
    }
    
    try {
        initializeData();
        
        if (debugDiv) {
            debugDiv.innerHTML += '✅ Datos inicializados<br>';
        }
    } catch (error) {
        if (debugDiv) {
            debugDiv.innerHTML += '❌ Error inicializando: ' + error.message + '<br>';
        }
    }
    
    // LOGIN - Try to get the button
    const loginBtn = document.getElementById('loginButton');
    const loginPassword = document.getElementById('loginPassword');
    
    if (debugDiv) {
        debugDiv.innerHTML += '🔍 Buscando botón login...<br>';
        if (loginBtn) {
            debugDiv.innerHTML += '✅ Botón encontrado<br>';
        } else {
            debugDiv.innerHTML += '❌ Botón NO encontrado<br>';
        }
    }
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (debugDiv) {
                debugDiv.innerHTML += '🖱️ Click detectado!<br>';
            }
            login();
        });
        
        if (debugDiv) {
            debugDiv.innerHTML += '✅ Listener añadido al botón<br>';
        }
    }
    
    if (loginPassword) {
        loginPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                login();
            }
        });
    }
    
    if (debugDiv) {
        debugDiv.innerHTML += '👉 Sistema listo para login<br>';
    }
    
    if (jsStatus) {
        jsStatus.innerHTML = '✅ App lista';
    }
    
    // LOGOUT
    document.getElementById('logoutButton').addEventListener('click', () => {
        currentUser = null;
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        showScreen('loginScreen');
    });
    
    // HUB NAVIGATION
    document.querySelectorAll('.hub-button').forEach(btn => {
        btn.addEventListener('click', () => {
            const module = btn.getAttribute('data-module');
            
            switch(module) {
                case 'ciudadanos':
                    loadCitizens();
                    showScreen('ciudadanosModule');
                    break;
                case 'vehiculos':
                    loadVehicles();
                    showScreen('vehiculosModule');
                    break;
                case 'sistema':
                    showScreen('sistemaModule');
                    break;
                case 'crear-ciudadano':
                    resetCreateCitizenForm();
                    showScreen('crearCiudadanoModule');
                    break;
            }
        });
    });
    
    // BACK BUTTONS
    document.querySelectorAll('.btn-back').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentScreenEl = document.querySelector('.screen.active');
            const currentId = currentScreenEl.id;

            if (currentId === 'ciudadanosModule' || currentId === 'vehiculosModule' || 
                currentId === 'sistemaModule' || currentId === 'crearCiudadanoModule') {
                showScreen('mainHub');
            } else if (currentId === 'citizenProfile') {
                loadCitizens();
                showScreen('ciudadanosModule');
            } else if (currentId === 'vehicleProfile') {
                loadVehicles();
                showScreen('vehiculosModule');
            } else if (currentId.includes('Section') || currentId.includes('Form')) {
                showScreen('sistemaModule');
            } else {
                const prevScreen = currentScreenEl.getAttribute('data-prev') || 'sistemaModule';
                showScreen(prevScreen);
            }
        });
    });
    
    // SEARCH CITIZENS
    document.getElementById('searchCitizens').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const citizens = JSON.parse(localStorage.getItem('citizens'));
        const filtered = citizens.filter(c => 
            c.name.toLowerCase().includes(query) ||
            c.dni.toLowerCase().includes(query) ||
            c.phone.includes(query)
        );

        const container = document.getElementById('citizensList');
        container.innerHTML = '';

        filtered.forEach(citizen => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.innerHTML = `
                <div class="list-item-info">
                    <div class="list-item-name">
                        ${citizen.name}
                        ${citizen.wanted ? '<span class="alert-badge wanted">BUSCA Y CAPTURA</span>' : ''}
                    </div>
                    <div class="list-item-detail">DNI: ${citizen.dni} | Tel: ${citizen.phone}</div>
                </div>
                <button onclick="viewCitizen('${citizen.id}')">Ver</button>
            `;
            container.appendChild(item);
        });
    });
    
    // CITIZEN RECORD CHECKBOX
    document.getElementById('citizenRecord').addEventListener('change', (e) => {
        document.getElementById('citizenRecordDetails').style.display = e.target.checked ? 'flex' : 'none';
    });
    
    // SAVE CITIZEN PROFILE
    document.getElementById('saveCitizenProfile').addEventListener('click', () => {
        const citizens = JSON.parse(localStorage.getItem('citizens'));
        const citizen = citizens.find(c => c.id === currentCitizenId);

        if (citizen) {
            citizen.phone = document.getElementById('citizenPhone').value;
            citizen.address = document.getElementById('citizenAddress').value;
            citizen.nationality = document.getElementById('citizenNationality').value;
            citizen.job = document.getElementById('citizenJob').value;
            citizen.hasRecord = document.getElementById('citizenRecord').checked;
            citizen.recordDetails = document.getElementById('citizenRecordText').value;
            citizen.wanted = document.getElementById('citizenWanted').checked;

            localStorage.setItem('citizens', JSON.stringify(citizens));
            alert('Perfil actualizado correctamente');
        }
    });
    
    // CITIZEN PHOTO
    document.getElementById('citizenPhotoBtn').addEventListener('click', () => {
        document.getElementById('citizenPhotoInput').click();
    });

    document.getElementById('citizenPhotoInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                document.getElementById('citizenPhoto').src = event.target.result;
                
                const citizens = JSON.parse(localStorage.getItem('citizens'));
                const citizen = citizens.find(c => c.id === currentCitizenId);
                if (citizen) {
                    citizen.photo = event.target.result;
                    localStorage.setItem('citizens', JSON.stringify(citizens));
                }
            };
            reader.readAsDataURL(file);
        }
    });
    
    // SEARCH VEHICLES
    document.getElementById('searchVehicles').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const vehicles = JSON.parse(localStorage.getItem('vehicles'));
        const filtered = vehicles.filter(v => 
            v.plate.toLowerCase().includes(query) ||
            v.brand.toLowerCase().includes(query) ||
            v.model.toLowerCase().includes(query)
        );

        const container = document.getElementById('vehiclesList');
        container.innerHTML = '';

        filtered.forEach(vehicle => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.innerHTML = `
                <div class="list-item-info">
                    <div class="list-item-name">
                        ${vehicle.fullName}
                        ${vehicle.stolen ? '<span class="alert-badge stolen">ROBADO</span>' : ''}
                    </div>
                    <div class="list-item-detail">Matrícula: ${vehicle.plate}</div>
                </div>
                <button onclick="viewVehicle('${vehicle.id}')">Ver</button>
            `;
            container.appendChild(item);
        });
    });
    
    // VEHICLE STOLEN CHECKBOX
    document.getElementById('vehicleStolen').addEventListener('change', (e) => {
        document.getElementById('vehicleStolenDetails').style.display = e.target.checked ? 'flex' : 'none';
    });
    
    // SAVE VEHICLE PROFILE
    document.getElementById('saveVehicleProfile').addEventListener('click', () => {
        const vehicles = JSON.parse(localStorage.getItem('vehicles'));
        const vehicle = vehicles.find(v => v.id === currentVehicleId);

        if (vehicle) {
            vehicle.color = document.getElementById('vehicleColor').value;
            vehicle.vin = document.getElementById('vehicleVIN').value;
            vehicle.itv = document.getElementById('vehicleITV').value;
            vehicle.location = document.getElementById('vehicleLocation').value;
            vehicle.stolen = document.getElementById('vehicleStolen').checked;
            vehicle.stolenDetails = document.getElementById('vehicleStolenText').value;

            localStorage.setItem('vehicles', JSON.stringify(vehicles));
            alert('Perfil actualizado correctamente');
        }
    });
    
    // NEW CITIZEN FORM
    document.getElementById('newCitizenRecord').addEventListener('change', (e) => {
        document.getElementById('newCitizenRecordDetails').style.display = e.target.checked ? 'flex' : 'none';
    });

    document.getElementById('newCitizenPhotoBtn').addEventListener('click', () => {
        document.getElementById('newCitizenPhotoInput').click();
    });

    document.getElementById('newCitizenPhotoInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                document.getElementById('newCitizenPhoto').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('createCitizenBtn').addEventListener('click', () => {
        const name = document.getElementById('newCitizenName').value.trim();
        const dni = document.getElementById('newCitizenDNI').value.trim();

        if (!name || !dni) {
            alert('Por favor, completa los campos obligatorios (Nombre y DNI)');
            return;
        }

        const citizens = JSON.parse(localStorage.getItem('citizens'));
        
        const newCitizen = {
            id: 'C' + String(citizens.length + 1).padStart(6, '0'),
            name: name,
            dni: dni,
            phone: document.getElementById('newCitizenPhone').value,
            address: document.getElementById('newCitizenAddress').value,
            nationality: document.getElementById('newCitizenNationality').value,
            job: document.getElementById('newCitizenJob').value,
            hasRecord: document.getElementById('newCitizenRecord').checked,
            recordDetails: document.getElementById('newCitizenRecordText').value,
            wanted: document.getElementById('newCitizenWanted').checked,
            vehicle: document.getElementById('newCitizenVehicle').value || null,
            photo: document.getElementById('newCitizenPhoto').src.startsWith('data:image/svg') ? null : document.getElementById('newCitizenPhoto').src
        };

        citizens.push(newCitizen);
        localStorage.setItem('citizens', JSON.stringify(citizens));

        alert('Ciudadano creado correctamente');
        resetCreateCitizenForm();
        showScreen('mainHub');
    });
    
    // SISTEMA POLICIAL MENU
    document.querySelectorAll('#sistemaModule .menu-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            
            switch(section) {
                case 'casos':
                    loadCases();
                    showScreen('casosSection');
                    break;
                case 'reconocimiento-facial':
                    showScreen('reconocimientoFacialSection');
                    break;
                case 'reconocimiento-matriculas':
                    showScreen('reconocimientoMatriculasSection');
                    break;
                case 'detenciones':
                    loadDetentions();
                    showScreen('detencionesSection');
                    break;
                case 'multas':
                    loadMultas();
                    showScreen('multasSection');
                    break;
                case 'informes':
                    loadReports();
                    showScreen('informesSection');
                    break;
                case 'evidencias':
                    loadEvidences();
                    showScreen('evidenciasSection');
                    break;
                case 'alertas':
                    loadAlertas();
                    showScreen('alertasSection');
                    break;
                case 'mapa':
                    showScreen('mapaSection');
                    break;
                case 'bandas':
                    loadGangs();
                    showScreen('bandasSection');
                    break;
                case 'agentes':
                    loadAgentes();
                    showScreen('agentesSection');
                    break;
                case 'usuarios':
                    loadUsers();
                    showScreen('usuariosSection');
                    break;
            }
        });
    });
    
    // CASOS
    document.getElementById('createCaseBtn').addEventListener('click', () => {
        currentCaseId = null;
        document.getElementById('caseFormTitle').textContent = 'Crear Caso';
        document.getElementById('caseName').value = '';
        document.getElementById('caseDescription').value = '';
        document.getElementById('caseStatus').value = 'Activo';
        document.getElementById('deleteCaseBtn').style.display = 'none';
        showScreen('caseForm');
    });

    document.getElementById('saveCaseBtn').addEventListener('click', () => {
        const name = document.getElementById('caseName').value.trim();
        const description = document.getElementById('caseDescription').value.trim();
        const status = document.getElementById('caseStatus').value;

        if (!name) {
            alert('Por favor, introduce un nombre para el caso');
            return;
        }

        const cases = JSON.parse(localStorage.getItem('cases'));

        if (currentCaseId) {
            const c = cases.find(case => case.id === currentCaseId);
            if (c) {
                c.name = name;
                c.description = description;
                c.status = status;
            }
        } else {
            const newCase = {
                id: 'CASE' + String(cases.length + 1).padStart(4, '0'),
                name: name,
                description: description,
                status: status,
                date: new Date().toISOString()
            };
            cases.push(newCase);
        }

        localStorage.setItem('cases', JSON.stringify(cases));
        alert('Caso guardado correctamente');
        loadCases();
        showScreen('casosSection');
    });

    document.getElementById('deleteCaseBtn').addEventListener('click', () => {
        if (confirm('¿Estás seguro de eliminar este caso?')) {
            const cases = JSON.parse(localStorage.getItem('cases'));
            const filtered = cases.filter(c => c.id !== currentCaseId);
            localStorage.setItem('cases', JSON.stringify(filtered));
            alert('Caso eliminado');
            loadCases();
            showScreen('casosSection');
        }
    });
    
    // RECONOCIMIENTO FACIAL
    document.getElementById('scanFaceBtn').addEventListener('click', () => {
        const citizens = JSON.parse(localStorage.getItem('citizens'));
        const randomCitizen = citizens[Math.floor(Math.random() * citizens.length)];
        
        const result = document.getElementById('faceResult');
        result.innerHTML = `
            <h3>✅ Coincidencia Encontrada</h3>
            <div class="list-item" style="margin-top: 15px;">
                <div class="list-item-info">
                    <div class="list-item-name">${randomCitizen.name}</div>
                    <div class="list-item-detail">DNI: ${randomCitizen.dni}</div>
                </div>
                <button onclick="viewCitizen('${randomCitizen.id}')">Ver Perfil</button>
            </div>
        `;
    });

    // RECONOCIMIENTO MATRICULAS
    document.getElementById('scanPlateBtn').addEventListener('click', () => {
        const vehicles = JSON.parse(localStorage.getItem('vehicles'));
        const randomVehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
        
        const result = document.getElementById('plateResult');
        result.innerHTML = `
            <h3>✅ Matrícula Identificada</h3>
            <div class="list-item" style="margin-top: 15px;">
                <div class="list-item-info">
                    <div class="list-item-name">${randomVehicle.fullName}</div>
                    <div class="list-item-detail">Matrícula: ${randomVehicle.plate}</div>
                </div>
                <button onclick="viewVehicle('${randomVehicle.id}')">Ver Perfil</button>
            </div>
        `;
    });
    
    // DETENCIONES
    document.getElementById('createDetentionBtn').addEventListener('click', () => {
        document.getElementById('detentionCitizen').value = '';
        document.getElementById('detentionReason').value = '';
        document.getElementById('detentionTime').value = '24';
        document.getElementById('detentionAgents').value = currentUser.username;
        showScreen('detentionForm');
    });

    document.getElementById('detentionCitizen').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) {
            document.getElementById('detentionCitizenResults').innerHTML = '';
            return;
        }

        const citizens = JSON.parse(localStorage.getItem('citizens'));
        const filtered = citizens.filter(c => 
            c.name.toLowerCase().includes(query) ||
            c.dni.toLowerCase().includes(query)
        ).slice(0, 5);

        const results = document.getElementById('detentionCitizenResults');
        results.innerHTML = '';
        
        filtered.forEach(c => {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            item.textContent = `${c.name} - ${c.dni}`;
            item.onclick = () => {
                document.getElementById('detentionCitizen').value = c.name;
                document.getElementById('detentionCitizen').dataset.citizenId = c.id;
                results.innerHTML = '';
            };
            results.appendChild(item);
        });
    });

    document.getElementById('saveDetentionBtn').addEventListener('click', () => {
        const citizenName = document.getElementById('detentionCitizen').value;
        const reason = document.getElementById('detentionReason').value;

        if (!citizenName || !reason) {
            alert('Por favor, completa todos los campos obligatorios');
            return;
        }

        const detentions = JSON.parse(localStorage.getItem('detentions'));
        
        const newDetention = {
            id: 'DET' + String(detentions.length + 1).padStart(4, '0'),
            citizenName: citizenName,
            reason: reason,
            time: document.getElementById('detentionTime').value,
            agents: document.getElementById('detentionAgents').value,
            date: new Date().toISOString()
        };

        detentions.push(newDetention);
        localStorage.setItem('detentions', JSON.stringify(detentions));

        alert('Detención registrada correctamente');
        loadDetentions();
        showScreen('detencionesSection');
    });
    
    // MULTAS
    document.getElementById('createMultaBtn').addEventListener('click', () => {
        document.getElementById('multaCitizen').value = '';
        document.getElementById('multaVehicle').value = '';
        document.getElementById('multaType').value = '';
        document.getElementById('multaAmount').value = '';
        document.getElementById('multaDescription').value = '';
        document.getElementById('multaDate').value = new Date().toISOString().slice(0, 16);
        document.getElementById('multaAgent').value = currentUser.username;
        showScreen('multaForm');
    });

    document.getElementById('multaType').addEventListener('change', (e) => {
        const selected = e.target.selectedOptions[0];
        const amount = selected.getAttribute('data-amount');
        document.getElementById('multaAmount').value = amount;
    });

    document.getElementById('multaCitizen').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) {
            document.getElementById('multaCitizenResults').innerHTML = '';
            return;
        }

        const citizens = JSON.parse(localStorage.getItem('citizens'));
        const filtered = citizens.filter(c => 
            c.name.toLowerCase().includes(query) ||
            c.dni.toLowerCase().includes(query)
        ).slice(0, 5);

        const results = document.getElementById('multaCitizenResults');
        results.innerHTML = '';
        
        filtered.forEach(c => {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            item.textContent = `${c.name} - ${c.dni}`;
            item.onclick = () => {
                document.getElementById('multaCitizen').value = c.name;
                results.innerHTML = '';
            };
            results.appendChild(item);
        });
    });

    document.getElementById('saveMultaBtn').addEventListener('click', () => {
        const citizenName = document.getElementById('multaCitizen').value;
        const type = document.getElementById('multaType').value;
        const amount = document.getElementById('multaAmount').value;

        if (!citizenName || !type || !amount) {
            alert('Por favor, completa todos los campos obligatorios');
            return;
        }

        const multas = JSON.parse(localStorage.getItem('multas'));
        
        const newMulta = {
            id: 'MULTA' + String(multas.length + 1).padStart(4, '0'),
            citizenName: citizenName,
            vehicle: document.getElementById('multaVehicle').value,
            type: type,
            amount: amount,
            description: document.getElementById('multaDescription').value,
            date: document.getElementById('multaDate').value,
            agent: document.getElementById('multaAgent').value
        };

        multas.push(newMulta);
        localStorage.setItem('multas', JSON.stringify(multas));

        alert('Multa generada correctamente');
        loadMultas();
        showScreen('multasSection');
    });
    
    // INFORMES
    document.querySelectorAll('#informesSection .menu-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const reportType = btn.getAttribute('data-report');
            document.getElementById('reportFormTitle').textContent = `Nuevo Informe de ${reportType.charAt(0).toUpperCase() + reportType.slice(1)}`;
            document.getElementById('reportForm').dataset.reportType = reportType;
            document.getElementById('reportDate').value = new Date().toISOString().slice(0, 16);
            document.getElementById('reportLocation').value = '';
            document.getElementById('reportDescription').value = '';
            document.getElementById('reportAgents').value = currentUser.username;
            document.getElementById('reportPeople').value = '';
            document.getElementById('reportNotes').value = '';
            showScreen('reportForm');
        });
    });

    document.getElementById('saveReportBtn').addEventListener('click', () => {
        const description = document.getElementById('reportDescription').value;

        if (!description) {
            alert('Por favor, completa la descripción del suceso');
            return;
        }

        const reports = JSON.parse(localStorage.getItem('reports'));
        const reportType = document.getElementById('reportForm').dataset.reportType;
        
        const newReport = {
            id: 'REP' + String(reports.length + 1).padStart(4, '0'),
            type: reportType,
            date: document.getElementById('reportDate').value,
            location: document.getElementById('reportLocation').value,
            description: description,
            agents: document.getElementById('reportAgents').value,
            people: document.getElementById('reportPeople').value,
            notes: document.getElementById('reportNotes').value
        };

        reports.push(newReport);
        localStorage.setItem('reports', JSON.stringify(reports));

        alert('Informe guardado correctamente');
        loadReports();
        showScreen('informesSection');
    });
    
    // EVIDENCIAS
    document.getElementById('createEvidenceBtn').addEventListener('click', () => {
        document.getElementById('evidenceCase').value = '';
        document.getElementById('evidenceType').value = 'Fotografía';
        document.getElementById('evidenceDescription').value = '';
        document.getElementById('evidenceCustody').value = '';
        showScreen('evidenceForm');
    });

    document.getElementById('saveEvidenceBtn').addEventListener('click', () => {
        const caseId = document.getElementById('evidenceCase').value;
        const description = document.getElementById('evidenceDescription').value;

        if (!caseId || !description) {
            alert('Por favor, completa los campos obligatorios');
            return;
        }

        const evidences = JSON.parse(localStorage.getItem('evidences'));
        
        const newEvidence = {
            id: 'EV' + String(evidences.length + 1).padStart(4, '0'),
            caseId: caseId,
            type: document.getElementById('evidenceType').value,
            description: description,
            custody: document.getElementById('evidenceCustody').value,
            date: new Date().toISOString()
        };

        evidences.push(newEvidence);
        localStorage.setItem('evidences', JSON.stringify(evidences));

        alert('Evidencia registrada correctamente');
        loadEvidences();
        showScreen('evidenciasSection');
    });
    
    // ALERTAS TABS
    document.querySelectorAll('#alertasSection .tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#alertasSection .tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadAlertTab(btn.getAttribute('data-tab'));
        });
    });
    
    // BANDAS
    document.getElementById('createGangBtn').addEventListener('click', () => {
        document.getElementById('gangName').value = '';
        document.getElementById('gangActivities').value = '';
        document.getElementById('gangMembers').value = '';
        document.getElementById('gangRelations').value = '';
        document.getElementById('gangDanger').value = 'Medio';
        showScreen('gangForm');
    });

    document.getElementById('saveGangBtn').addEventListener('click', () => {
        const name = document.getElementById('gangName').value.trim();

        if (!name) {
            alert('Por favor, introduce un nombre para la banda');
            return;
        }

        const gangs = JSON.parse(localStorage.getItem('gangs'));
        
        const newGang = {
            id: 'GANG' + String(gangs.length + 1).padStart(3, '0'),
            name: name,
            activities: document.getElementById('gangActivities').value,
            members: document.getElementById('gangMembers').value,
            relations: document.getElementById('gangRelations').value,
            danger: document.getElementById('gangDanger').value
        };

        gangs.push(newGang);
        localStorage.setItem('gangs', JSON.stringify(gangs));

        alert('Banda guardada correctamente');
        loadGangs();
        showScreen('bandasSection');
    });
    
    // AGENTES TABS
    document.querySelectorAll('#agentesSection .tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#agentesSection .tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadAgentTab(btn.getAttribute('data-tab'));
        });
    });
    
    // USUARIOS
    document.getElementById('createUserBtn').addEventListener('click', () => {
        document.getElementById('newUsername').value = '';
        document.getElementById('newUserPassword').value = '';
        document.getElementById('newUserRank').value = 'Agente';
        showScreen('userForm');
    });

    document.getElementById('saveUserBtn').addEventListener('click', () => {
        const username = document.getElementById('newUsername').value.trim();
        const password = document.getElementById('newUserPassword').value;

        if (!username || !password) {
            alert('Por favor, completa todos los campos');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users'));
        
        const newUser = {
            username: username,
            password: password,
            rank: document.getElementById('newUserRank').value
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Usuario creado correctamente');
        loadUsers();
        showScreen('usuariosSection');
    });
});
