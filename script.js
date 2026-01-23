document.addEventListener('DOMContentLoaded', () => {
    // --- 导航逻辑 ---
    const navLinks = document.querySelectorAll('.nav-links li');
    const views = document.querySelectorAll('.view');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const target = link.getAttribute('data-target');

            // 更新导航激活状态
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            // 切换视图
            views.forEach(view => {
                view.classList.remove('visible');
                if (view.id === target) {
                    view.classList.add('visible');
                }
            });
        });
    });

    // --- 等级滑动逻辑 ---
    const levelSlider = document.getElementById('levelSlider');
    const levelValue = document.getElementById('levelValue');
    const levelBadge = document.querySelector('.level-badge');

    levelSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value).toFixed(1);
        levelValue.innerText = val;

        // 更新等级标签
        if (val < 2.5) levelBadge.innerText = '初学者';
        else if (val < 4.5) levelBadge.innerText = '中级';
        else if (val < 6.0) levelBadge.innerText = '高级';
        else levelBadge.innerText = '专业';
    });

    // --- 模拟球友数据 ---
    const mockMatches = [
        { name: '张伟', level: '4.0', dist: '2.5km', match: '98%', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
        { name: '李娜', level: '4.5', dist: '1.2km', match: '92%', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anita' },
        { name: '王强', level: '3.5', dist: '4.0km', match: '85%', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
        { name: 'Sarah', level: '4.0', dist: '0.8km', match: '95%', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' }
    ];

    const matchList = document.getElementById('matchList');
    if (matchList) {
        mockMatches.forEach(m => {
            const card = document.createElement('div');
            card.className = 'match-card glass';
            card.innerHTML = `
                <img src="${m.img}" class="avatar" alt="${m.name}">
                <div class="match-info">
                    <h4>${m.name}</h4>
                    <p>NTRP ${m.level} • 距离 ${m.dist}</p>
                </div>
                <div class="match-score">
                    <span class="score-pct">${m.match}</span>
                    <p>匹配度</p>
                </div>
            `;
            matchList.appendChild(card);
        });
    }

    // --- 模拟教程数据 ---
    const tutorials = [
        { title: '费德勒同款正手教程', duration: '12:05', diff: '中级', img: 'https://images.unsplash.com/photo-1622279457486-62dcc4a4ea13?auto=format&fit=crop&w=400&q=80' },
        { title: '单反击球的秘密', duration: '08:45', diff: '高级', img: 'https://images.unsplash.com/photo-1595435934249-5df7ed86eb82?auto=format&fit=crop&w=400&q=80' },
        { title: '网球发球基石：抛球', duration: '05:20', diff: '入门', img: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&w=400&q=80' }
    ];

    const tutorialGrid = document.getElementById('tutorialGrid');
    if (tutorialGrid) {
        tutorials.forEach(t => {
            const card = document.createElement('div');
            card.className = 'card glass video-card';
            card.style.padding = '0';
            card.style.overflow = 'hidden';
            card.innerHTML = `
                <div style="height: 150px; background: url('${t.img}') center/cover;"></div>
                <div style="padding: 1rem;">
                    <h4 style="margin-bottom: 0.5rem;">${t.title}</h4>
                    <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-dim);">
                        <span><i class="fas fa-clock"></i> ${t.duration}</span>
                        <span>${t.diff}</span>
                    </div>
                </div>
            `;
            tutorialGrid.appendChild(card);
        });
    }

    // --- 打卡弹窗逻辑 ---
    const checkInBtn = document.getElementById('checkInBtn');
    const mobileCheckInBtn = document.getElementById('mobileCheckInBtn');
    const modal = document.getElementById('checkInModal');
    const closeModal = document.querySelector('.close-modal');

    const openModal = () => modal.style.display = 'block';

    if (checkInBtn) checkInBtn.onclick = openModal;
    if (mobileCheckInBtn) mobileCheckInBtn.onclick = openModal;

    closeModal.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

    // --- 日历生成 logic ---
    const weekGrid = document.getElementById('weekGrid');
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const currentDay = 3; // 假设今天是周四

    if (weekGrid) {
        days.forEach((day, i) => {
            const dayEl = document.createElement('div');
            dayEl.className = `day-cell ${i === currentDay ? 'today' : ''}`;
            dayEl.innerHTML = `
                <span class="day-name">${day}</span>
                <span class="day-num">${20 + i}</span>
            `;
            // 随机模拟一些有空的时间点
            if (i > currentDay) {
                dayEl.classList.add('available');
                dayEl.title = '点击设置空闲';
            }
            weekGrid.appendChild(dayEl);
        });
    }
});
