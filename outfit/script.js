// Initialize Lucide Icons
lucide.createIcons();

// --- State Management ---
const state = {
    currentPage: 'daily',
    wardrobe: JSON.parse(localStorage.getItem('wardrobe')) || [
        { id: 1, name: '米色风衣', category: 'outer', img: 'img/trench.png', style: '通勤', season: '春/秋' },
        { id: 2, name: '真丝白衬衫', category: 'top', img: 'img/shirt.png', style: '优雅', season: '四季' },
        { id: 3, name: '深灰西裤', category: 'bottom', img: 'img/trousers.png', style: '商务', season: '四季' }
    ],
    userDims: JSON.parse(localStorage.getItem('userDims')) || { height: 175, weight: 65, shoulder: 45 },
    weather: { temp: 22, condition: '多云', location: '上海' },
    horoscope: {
        birthDate: localStorage.getItem('birthDate') || '',
        sign: '--', luck: '--', color: '--',
        report: '请设置生日以开启穿搭运势分析'
    }
};

// --- DOM Elements ---
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-links li, .mobile-nav-item');
const birthInput = document.getElementById('birth-date');

// --- Initialization ---
function init() {
    if (state.horoscope.birthDate) {
        birthInput.value = state.horoscope.birthDate;
        updateHoroscope(state.horoscope.birthDate);
    }
    renderWardrobe();
    initDailyRecommendation();
}

// --- Navigation ---
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const pageId = link.getAttribute('data-page');
        switchPage(pageId);
    });
});

function switchPage(pageId) {
    state.currentPage = pageId;
    // Update Desktop Nav
    document.querySelectorAll('.nav-links li').forEach(l => {
        l.classList.toggle('active', l.getAttribute('data-page') === pageId);
    });
    // Update Mobile Nav
    document.querySelectorAll('.mobile-nav-item').forEach(l => {
        l.classList.toggle('active', l.getAttribute('data-page') === pageId);
    });
    // Update Visibility
    pages.forEach(p => p.classList.toggle('active', p.id === `page-${pageId}`));

    if (pageId === 'wardrobe') renderWardrobe();
    if (pageId === 'stylist') initStylist();
    if (pageId === 'tryon') init3D();
    if (pageId === 'shop') initShop();
}

// --- Horoscope Analysis (Date + Sign Logic) ---
birthInput.onchange = (e) => {
    const val = e.target.value;
    state.horoscope.birthDate = val;
    localStorage.setItem('birthDate', val);
    updateHoroscope(val);
};

function updateHoroscope(dob) {
    const signs = ['摩羯座', '水瓶座', '双鱼座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座'];
    const date = new Date(dob);
    const month = date.getMonth();
    const day = date.getDate();
    // Simplified Sun Sign calculation
    const signIndex = (day < [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22][month]) ? month : (month + 1) % 12;
    const userSign = signs[signIndex];

    // Logic: Use today's date + user sign to generate deterministic fortune
    const today = new Date();
    const combinedSeed = today.getDate() + today.getMonth() + signIndex;

    const lucks = ['极佳', '运势走高', '稳步提升', '小吉', '灵感迸发'];
    const colors = ['银色', '珠光白', '天青色', '深色系', '卡其色'];
    const logicPoints = [
        '结合今日水星相位，简约线条能增强您的职业气场。',
        '火星带来的活力建议您尝试轻盈的运动感叠穿。',
        '月亮宫位的变化预示社交机遇，丝稠材质能提升亲和力。',
        '木星方位利于自我表达，建议增加金属质感配饰点缀。'
    ];

    state.horoscope.sign = userSign;
    state.horoscope.luck = lucks[combinedSeed % lucks.length];
    state.horoscope.color = colors[combinedSeed % colors.length];

    const reportText = `今日是 ${today.toLocaleDateString()}，对于${userSign}的您而言，星盘显示${state.horoscope.luck}。${logicPoints[combinedSeed % logicPoints.length]}`;

    // Update UI
    document.querySelector('.user-info .sign').innerText = userSign;
    document.getElementById('fortune-luck').innerText = state.horoscope.luck;
    document.getElementById('fortune-color').innerText = state.horoscope.color;
    document.querySelector('#horoscope-report .report-text').innerText = reportText;
    document.getElementById('recommendation-title').innerText = `${userSign} · 今日风尚`;
    document.getElementById('daily-welcome').innerText = `欢迎回来，${userSign}的旅人。今日幸运色为 ${state.horoscope.color}。`;

    // Populate logic list
    const logicList = document.getElementById('logic-list');
    logicList.innerHTML = `
        <li><strong>今日逻辑:</strong> 应对${state.weather.condition}天气 + 核心星位</li>
        <li><strong>幸运加持:</strong> ${state.horoscope.color}系单品</li>
    `;

    initDailyRecommendation();
}

// --- Modal Controls ---
const modals = {
    upload: document.getElementById('upload-modal'),
    taobao: document.getElementById('taobao-modal')
};

document.getElementById('add-item-btn').onclick = () => modals.upload.classList.add('active');
document.getElementById('modal-close-icon').onclick = () => modals.upload.classList.remove('active');
document.getElementById('import-taobao-btn').onclick = () => modals.taobao.classList.add('active');
document.getElementById('taobao-close-icon').onclick = () => modals.taobao.classList.remove('active');

// --- Wardrobe ---
function renderWardrobe() {
    const grid = document.getElementById('wardrobe-items');
    grid.innerHTML = '';
    state.wardrobe.forEach(item => {
        const card = document.createElement('div');
        card.className = 'clothing-card glass-card';
        card.innerHTML = `<img src="${item.img}" alt="${item.name}"><div class="name">${item.name}</div><div class="meta">${item.style}</div>`;
        grid.appendChild(card);
    });
}

// --- Taobao Import ---
document.getElementById('sync-taobao').onclick = () => {
    try {
        const items = JSON.parse(document.getElementById('taobao-input').value);
        items.forEach(item => {
            state.wardrobe.push({
                id: Date.now() + Math.random(),
                name: item.name, category: 'top', img: item.img || 'img/shirt.png', style: '淘宝导入'
            });
        });
        localStorage.setItem('wardrobe', JSON.stringify(state.wardrobe));
        modals.taobao.classList.remove('active');
        renderWardrobe();
        alert('成功导入 ' + items.length + ' 件宝贝！');
    } catch (e) { alert('数据格式不正确'); }
};

// --- 2D Stylist ---
function initStylist() {
    const drawer = document.getElementById('drawer-items');
    drawer.innerHTML = '';
    state.wardrobe.forEach(item => {
        const img = document.createElement('img');
        img.src = item.img;
        img.className = 'drawer-item';
        img.onclick = () => {
            const canvas = document.getElementById('stylist-canvas');
            if (canvas.querySelector('.placeholder')) canvas.querySelector('.placeholder').remove();
            const cImg = img.cloneNode();
            cImg.style.position = 'absolute'; cImg.style.width = '120px';
            cImg.style.left = '20px'; cImg.style.top = '20px';
            canvas.appendChild(cImg);
            // Basic drag omitted for mobile performance, tap to place
        };
        drawer.appendChild(img);
    });
}

// --- 3D Tryon ---
let scene, camera, renderer, model;
function init3D() {
    const container = document.getElementById('three-container');
    if (container.children.length > 0) return;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    const geometry = new THREE.CapsuleGeometry(0.5, 2, 10, 20);
    const material = new THREE.MeshPhongMaterial({ color: 0xe0ac69 });
    model = new THREE.Mesh(geometry, material);
    scene.add(model);
    const light = new THREE.DirectionalLight(0xffffff, 1); light.position.set(2, 2, 5);
    scene.add(light); scene.add(new THREE.AmbientLight(0x404040));
    camera.position.z = 5;
    function animate() { requestAnimationFrame(animate); model.rotation.y += 0.01; renderer.render(scene, camera); }
    animate();
}

function initShop() {
    const grid = document.getElementById('shop-items');
    grid.innerHTML = '<div class="clothing-card glass-card"><img src="img/trench.png" style="filter:hue-rotate(45deg)"><div class="name">摩羯幸运大衣</div><div class="meta">¥1,599</div></div>';
}

function initDailyRecommendation() {
    const canvas = document.getElementById('daily-outfit-canvas');
    canvas.innerHTML = '';
    state.wardrobe.slice(0, 2).forEach((item, i) => {
        const img = document.createElement('img');
        img.src = item.img;
        img.style.position = 'absolute'; img.style.width = i === 0 ? '60%' : '50%';
        img.style.left = i === 0 ? '10%' : '40%';
        img.style.top = i === 0 ? '10%' : '30%';
        canvas.appendChild(img);
    });
}

init();
