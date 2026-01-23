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
    const inviteModal = document.getElementById('inviteModal');
    const inviteTargetName = document.getElementById('inviteTargetName');
    const closeInviteModal = document.querySelector('.close-invite-modal');
    const sendInviteBtn = document.getElementById('sendInviteBtn');

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
                <div class="match-action">
                    <button class="primary-btn match-btn-small" style="margin-top:0; padding: 8px 16px; font-size: 0.9rem;">发起挑战</button>
                    <div class="match-score" style="text-align: right; font-size: 0.8rem; margin-top: 5px;">
                        <span style="color:var(--primary); font-weight:bold;">${m.match}</span> 匹配度
                    </div>
                </div>
            `;

            // 绑定约球点击事件
            const btn = card.querySelector('button');
            btn.onclick = () => {
                inviteTargetName.innerText = m.name;
                inviteModal.style.display = 'block';
            };

            matchList.appendChild(card);
        });
    }

    // 约球弹窗逻辑
    if (closeInviteModal) {
        closeInviteModal.onclick = () => inviteModal.style.display = 'none';
    }

    if (sendInviteBtn) {
        sendInviteBtn.onclick = () => {
            alert('挑战书已通过短信发送给对方！');
            inviteModal.style.display = 'none';
        };
    }

    // --- 模拟教程数据 ---
    const tutorials = [
        { title: '费德勒同款正手教程', duration: '12:05', diff: '中级', img: 'https://images.unsplash.com/photo-1622279457486-62dcc4a4ea13?auto=format&fit=crop&w=400&q=80', videoId: '0L-66yqX7Is' },
        { title: '单反击球的秘密', duration: '08:45', diff: '高级', img: 'https://images.unsplash.com/photo-1595435934249-5df7ed86eb82?auto=format&fit=crop&w=400&q=80', videoId: 'eToezFhX8hM' },
        { title: '网球发球基石：抛球', duration: '05:20', diff: '入门', img: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&w=400&q=80', videoId: 'HIKyY_Hk2n8' }
    ];

    const tutorialGrid = document.getElementById('tutorialGrid');
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const closeVideoModal = document.querySelector('.close-video-modal');

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

            card.addEventListener('click', () => {
                videoTitle.innerText = t.title;
                videoPlayer.src = `https://www.youtube.com/embed/${t.videoId}?autoplay=1`;
                videoModal.style.display = 'block';
            });

            tutorialGrid.appendChild(card);
        });
    }

    if (closeVideoModal) {
        closeVideoModal.onclick = () => {
            videoModal.style.display = 'none';
            videoPlayer.src = ""; // 停止播放
        };
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

    // 点击外部关闭弹窗
    window.onclick = (e) => {
        if (e.target == modal) modal.style.display = 'none';
        if (e.target == videoModal) {
            videoModal.style.display = 'none';
            videoPlayer.src = "";
        }
        if (e.target == inviteModal) inviteModal.style.display = 'none';
        if (e.target == document.getElementById('posterModal')) document.getElementById('posterModal').style.display = 'none';
    };

    // --- 球星卡生成逻辑 (Canvas) ---
    const sharePosterBtn = document.getElementById('sharePosterBtn');
    const posterCanvas = document.getElementById('posterCanvas');
    const posterModal = document.getElementById('posterModal');
    const posterImg = document.getElementById('posterImg');
    const closePosterModal = document.querySelector('.close-poster-modal');

    if (sharePosterBtn && posterCanvas) {
        sharePosterBtn.addEventListener('click', () => {
            const ctx = posterCanvas.getContext('2d');

            // 1. 绘制背景
            const gradient = ctx.createLinearGradient(0, 0, 0, 800);
            gradient.addColorStop(0, '#111');
            gradient.addColorStop(1, '#2D5A27'); // 网球绿
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 600, 800);

            // 2. 绘制装饰圆环
            ctx.beginPath();
            ctx.arc(300, 250, 110, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(206, 255, 0, 0.2)';
            ctx.lineWidth = 20;
            ctx.stroke();

            // 3. 绘制文字信息
            ctx.fillStyle = '#CEFF00'; // 品牌黄
            ctx.font = 'bold 80px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('NTRP 4.0', 300, 280);

            ctx.fillStyle = '#fff';
            ctx.font = '30px sans-serif';
            ctx.fillText('SuperAce', 300, 400);

            ctx.fillStyle = '#ccc';
            ctx.font = '24px sans-serif';
            ctx.fillText('累计胜率 85% • 击败全区 92% 球友', 300, 450);

            // 4. 底部 Slogan
            ctx.fillStyle = '#fff';
            ctx.font = 'italic bold 40px sans-serif';
            ctx.fillText('ACE MATCH', 300, 700);

            ctx.font = '20px sans-serif';
            ctx.fillText('不服来战', 300, 740);

            // 5. 生成图片并弹窗
            const dataUrl = posterCanvas.toDataURL('image/png');
            posterImg.src = dataUrl;
            posterModal.style.display = 'block';
        });

        if (closePosterModal) {
            closePosterModal.onclick = () => posterModal.style.display = 'none';
        }
    }

    // --- 日历生成 logic (实时) ---
    const weekGrid = document.getElementById('weekGrid');
    const calendarMonth = document.getElementById('calendarMonth');
    const now = new Date();

    // 设置月份显示
    const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    if (calendarMonth) {
        calendarMonth.innerText = `${now.getFullYear()}年 ${monthNames[now.getMonth()]}`;
    }

    if (weekGrid) {
        const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

        // 获取本周的第一天（周一）
        const firstDayOfWeek = new Date(now);
        const diff = now.getDay() === 0 ? -6 : 1 - now.getDay();
        firstDayOfWeek.setDate(now.getDate() + diff);

        for (let i = 0; i < 7; i++) {
            const date = new Date(firstDayOfWeek);
            date.setDate(firstDayOfWeek.getDate() + i);

            const dayName = days[date.getDay()];
            const dayNum = date.getDate();
            const isToday = date.toDateString() === now.toDateString();

            const dayEl = document.createElement('div');
            dayEl.className = `day-cell ${isToday ? 'today' : ''}`;
            dayEl.innerHTML = `
                <span class="day-name">${dayName}</span>
                <span class="day-num">${dayNum}</span>
            `;

            // 模拟未来几天的空闲状态
            if (date > now) {
                dayEl.classList.add('available');
                dayEl.title = '点击设置空闲';
            }

            weekGrid.appendChild(dayEl);
        }
    }

    // --- 高德地图加载逻辑 ---
    // 兜底数据（当Key未配置时显示）
    const fallbackCourts = [
        { name: "奥林匹克森林公园网球中心", address: "朝阳区科荟路33号", dist: "2.3km", rating: 4.8 },
        { name: "国家网球中心 (钻石球场)", address: "朝阳区林萃路2号", dist: "3.1km", rating: 4.9 },
        { name: "朝阳公园网球中心", address: "朝阳区朝阳公园南路1号", dist: "5.5km", rating: 4.6 },
        { name: "通州运河网球场", address: "通州区运河公园内", dist: "12km", rating: 4.5 }
    ];

    const renderCourts = (list) => {
        const courtList = document.getElementById('courtList');
        if (!courtList) return;
        courtList.innerHTML = '';
        list.forEach(c => {
            const item = document.createElement('div');
            item.className = 'card glass court-item';
            item.innerHTML = `
                <i class="fas fa-map-pin" style="font-size: 1.2rem; color: var(--text-dim);"></i>
                <div class="court-info">
                    <h4>${c.name}</h4>
                    <p style="font-size: 0.8rem; color: var(--text-dim);">${c.address || c.address || '暂无地址'} · ${c.dist || '未知距离'}</p>
                </div>
                <div class="court-score">
                    ${c.rating || 4.5} <span style="font-size:0.8rem">分</span>
                </div>
            `;
            courtList.appendChild(item);
        });
    };

    // 尝试加载地图
    if (window.AMapLoader) {
        window.AMapLoader.load({
            key: "YOUR_AMAP_KEY", // 你的 Key
            version: "2.0",
            plugins: ['AMap.PlaceSearch', 'AMap.Geolocation']
        }).then((AMap) => {
            const map = new AMap.Map('amap-container', {
                viewMode: "3D",
                zoom: 13,
                mapStyle: 'amap://styles/dark', // 暗黑系地图风格
                center: [116.397428, 39.90923] // 默认北京
            });

            // 定位当前位置
            const geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,
                timeout: 10000,
                buttonPosition: 'RB',
                buttonOffset: new AMap.Pixel(10, 20),
                zoomToAccuracy: true,
            });
            map.addControl(geolocation);

            geolocation.getCurrentPosition((status, result) => {
                if (status == 'complete') {
                    // 搜索附近的网球场
                    const placeSearch = new AMap.PlaceSearch({
                        type: '网球场|体育馆',
                        pageSize: 10,
                        pageIndex: 1,
                        map: map,
                        autoFitView: true
                    });

                    placeSearch.searchNearBy('网球', result.position, 5000, (status, result) => {
                        if (status === 'complete' && result.info === 'OK') {
                            // 将高德数据转换为我们的格式
                            const apiCourts = result.poiList.pois.map(p => ({
                                name: p.name,
                                address: p.address,
                                dist: p.distance + 'm',
                                rating: (p.shopinfo && p.shopinfo.score) ? p.shopinfo.score : 4.5
                            }));
                            renderCourts(apiCourts);
                        } else {
                            renderCourts(fallbackCourts);
                        }
                    });
                } else {
                    renderCourts(fallbackCourts); // 定位失败使用兜底
                }
            });

        }).catch(e => {
            console.log("AMap load failed, using fallback", e);
            renderCourts(fallbackCourts);
        });
    } else {
        renderCourts(fallbackCourts);
    }
});
