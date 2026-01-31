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

            // 懒加载地图：只有进入发现页才加载
            if (target === 'explore' && !window.mapInitialized) {
                setTimeout(loadMap, 300);
            }
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

    // --- 模拟教程数据 (采用图文形式，规避播放权限问题) ---
    const tutorials = [
        {
            title: '顶级正手突破：拉出职业级上旋',
            duration: '12分钟',
            diff: '中级',
            img: 'https://images.unsplash.com/photo-1622279457486-62dcc4a4bd13?auto=format&fit=crop&w=400&q=80',
            bvid: 'BV1vL411p7Z1', // 示例B站视频ID
            content: '在身体正前方击球，手臂呈自然的直线伸展，利用核心力量驱动球拍。随挥自然绕过肩膀。'
        },
        {
            title: '单反击球核心秘籍',
            duration: '8分钟',
            diff: '高级',
            img: 'https://images.unsplash.com/photo-1595435934249-5df7ed86eb82?auto=format&fit=crop&w=400&q=80',
            bvid: 'BV1hY41117M8',
            content: '现代单反的核心在于肩关节锁定。挥拍瞬间肩膀稳固，大臂带动小臂，像挥舞鞭子一样。'
        },
        {
            title: '发球必杀技：高度与旋转',
            duration: '10分钟',
            diff: '入门',
            img: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&w=400&q=80',
            bvid: 'BV1mJ411n7fS',
            content: '抛球高度应略高于球拍伸直后的最高点。确保身体呈弓箭步蓄力，利用腰腹力量。'
        }
    ];

    const tutorialGrid = document.getElementById('tutorialGrid');
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer'); // 实际上作为容器使用
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
                        <span><i class="fas fa-book-open"></i> ${t.duration}</span>
                        <span>${t.diff}</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                videoTitle.innerText = t.title;
                const modalBody = videoModal.querySelector('.video-container');
                // 使用B站嵌入框架
                modalBody.innerHTML = `
                    <iframe src="//player.bilibili.com/player.html?bvid=${t.bvid}&page=1&high_quality=1&as_wide=1" 
                            scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"
                            style="width: 100%; height: 100%;"></iframe>
                `;
                videoModal.style.display = 'block';
            });

            tutorialGrid.appendChild(card);
        });
    }

    if (closeVideoModal) {
        closeVideoModal.onclick = () => {
            videoModal.style.display = 'none';
        };
    }

    // --- 打卡功能逻辑 (持久化) ---
    const checkInBtn = document.getElementById('checkInBtn');
    const mobileCheckInBtn = document.getElementById('mobileCheckInBtn');
    const modal = document.getElementById('checkInModal');
    const closeModal = document.querySelector('.close-modal');
    const submitCheckInBtn = document.getElementById('submitCheckInBtn');
    const checkInDaysDisplay = document.getElementById('checkInDaysDisplay');
    const typeBtns = document.querySelectorAll('#checkInTypeContainer .type-btn');
    const checkInMessage = document.getElementById('checkInMessage');

    // 初始化显示
    let checkInData = JSON.parse(localStorage.getItem('aceMatchCheckIns') || '[]');
    const updateStats = () => {
        if (checkInDaysDisplay) {
            checkInDaysDisplay.innerText = checkInData.length;
        }
    };
    updateStats();

    const openModal = () => modal.style.display = 'block';

    if (checkInBtn) checkInBtn.onclick = openModal;
    if (mobileCheckInBtn) mobileCheckInBtn.onclick = openModal;

    if (closeModal) {
        closeModal.onclick = () => modal.style.display = 'none';
    }

    // 类型切换
    typeBtns.forEach(btn => {
        btn.onclick = () => {
            typeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
    });

    // 提交打卡
    if (submitCheckInBtn) {
        submitCheckInBtn.onclick = () => {
            const selectedType = document.querySelector('#checkInTypeContainer .type-btn.active').innerText;
            const message = checkInMessage.value;

            const newEntry = {
                date: new Date().toISOString(),
                type: selectedType,
                message: message
            };

            checkInData.push(newEntry);
            localStorage.setItem('aceMatchCheckIns', JSON.stringify(checkInData));

            // 更新 UI
            updateStats();

            // 反馈并关闭
            alert(`打卡成功！您已累计训练 ${checkInData.length} 天。`);
            checkInMessage.value = '';
            modal.style.display = 'none';
        };
    }

    // 点击外部关闭弹窗
    window.onclick = (e) => {
        if (e.target == modal) modal.style.display = 'none';
        if (e.target == videoModal) videoModal.style.display = 'none';
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

    // --- 日历生成 logic (实时 + 精确到小时) ---
    const weekGrid = document.getElementById('weekGrid');
    const calendarMonth = document.getElementById('calendarMonth');
    const timeSlotsArea = document.getElementById('timeSlotsArea');
    const hourGrid = document.getElementById('hourGrid');
    const selectedDateTitle = document.getElementById('selectedDateTitle');
    const selectedTimeRange = document.getElementById('selectedTimeRange');
    const saveAvailabilityBtn = document.getElementById('saveAvailabilityBtn');

    const now = new Date();
    let selectedDate = null;
    let selectedHours = new Set();

    // 设置月份显示
    const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    if (calendarMonth) {
        calendarMonth.innerText = `${now.getFullYear()}年 ${monthNames[now.getMonth()]}`;
    }

    const renderHours = (dateStr) => {
        hourGrid.innerHTML = '';
        selectedHours.clear();
        updateTimeRangeDisplay();

        // 模拟一些已经被占用的时段 (为了美观和真实感)
        const bookedHours = [9, 14, 15, 19];

        for (let h = 8; h <= 22; h++) {
            const isBooked = bookedHours.includes(h);
            const slot = document.createElement('div');
            slot.className = `time-slot ${isBooked ? 'booked' : ''}`;
            slot.innerHTML = `
                <div class="time-label">${h}:00</div>
                <div class="status-dot"></div>
            `;

            if (!isBooked) {
                slot.onclick = () => {
                    if (selectedHours.has(h)) {
                        selectedHours.delete(h);
                        slot.classList.remove('selected');
                    } else {
                        selectedHours.add(h);
                        slot.classList.add('selected');
                        // 触觉反馈 (如果设备支持)
                        if (navigator.vibrate) navigator.vibrate(10);
                    }
                    updateTimeRangeDisplay();
                };
            } else {
                slot.title = "该时段已被预约";
            }
            hourGrid.appendChild(slot);
        }
        timeSlotsArea.style.display = 'block';
    };

    const updateTimeRangeDisplay = () => {
        if (selectedHours.size === 0) {
            selectedTimeRange.innerText = '未选择';
        } else {
            const sorted = Array.from(selectedHours).sort((a, b) => a - b);
            selectedTimeRange.innerText = sorted.map(h => `${h}:00`).join(', ');
        }
    };

    if (weekGrid) {
        const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        const firstDayOfWeek = new Date(now);
        const diff = now.getDay() === 0 ? -6 : 1 - now.getDay();
        firstDayOfWeek.setDate(now.getDate() + diff);

        for (let i = 0; i < 7; i++) {
            const date = new Date(firstDayOfWeek);
            date.setDate(firstDayOfWeek.getDate() + i);

            const dayName = days[date.getDay()];
            const dayNum = date.getDate();
            const isToday = date.toDateString() === now.toDateString();
            const dateStr = `${date.getMonth() + 1}月${dayNum}日`;

            const dayEl = document.createElement('div');
            dayEl.className = `day-cell ${isToday ? 'today' : ''}`;
            dayEl.innerHTML = `
                <span class="day-name">${dayName}</span>
                <span class="day-num">${dayNum}</span>
            `;

            dayEl.onclick = () => {
                document.querySelectorAll('.day-cell').forEach(el => el.classList.remove('active'));
                dayEl.classList.add('active');
                selectedDate = dateStr;
                selectedDateTitle.innerText = `选择具体时间 (${dateStr})`;
                renderHours(dateStr);
            };

            weekGrid.appendChild(dayEl);
        }
    }

    if (saveAvailabilityBtn) {
        saveAvailabilityBtn.onclick = () => {
            if (selectedHours.size === 0) {
                alert('请至少选择一个时间段');
                return;
            }
            alert(`已成功设置 ${selectedDate} 的空闲时间！\n${selectedTimeRange.innerText}`);
        };
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
                    <p style="font-size: 0.8rem; color: var(--text-dim);">${c.address || '暂无地址'} · ${c.dist || '未知距离'}</p>
                </div>
                <div class="court-score">
                    ${c.rating || 4.5} <span style="font-size:0.8rem">分</span>
                </div>
            `;
            courtList.appendChild(item);
        });
    };

    // --- 高德地图加载逻辑 ---
    const initAMap = (AMap) => {
        const mapContainer = document.getElementById('amap-container');
        if (!mapContainer) return;

        const map = new AMap.Map('amap-container', {
            viewMode: "3D",
            zoom: 13,
            mapStyle: 'amap://styles/dark',
            center: [116.397428, 39.90923]
        });

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
                const placeSearch = new AMap.PlaceSearch({
                    type: '网球场|体育馆',
                    pageSize: 10,
                    pageIndex: 1,
                    map: map,
                    autoFitView: true
                });

                placeSearch.searchNearBy('网球', result.position, 5000, (status, result) => {
                    if (status === 'complete' && result.info === 'OK') {
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
                renderCourts(fallbackCourts);
            }
        });
    };

    const loadMap = () => {
        if (window.mapInitialized) return;
        const mapContainer = document.getElementById('amap-container');

        // 标记已尝试初始化
        window.mapInitialized = true;

        // 如果已经通过 script 标签直接加载
        if (window.AMap && window.AMap.Map) {
            initAMap(window.AMap);
        }
        // 否则尝试使用 AMapLoader (如果你还保留了 loader 加载方式)
        else if (window.AMapLoader) {
            window.AMapLoader.load({
                key: "de0c3f54bcda0d0dc814f2e264c378b0",
                version: "2.0",
                plugins: ['AMap.PlaceSearch', 'AMap.Geolocation']
            }).then((AMap) => {
                initAMap(AMap);
            }).catch(e => {
                console.error("AMap load failed:", e);
                showMapPlaceholder(mapContainer, "地图连接超时", "正在为您展示精品预约球场");
                renderCourts(fallbackCourts);
            });
        } else {
            showMapPlaceholder(mapContainer, "智能地图初始化中", "正在自动为您匹配附近场地");
            renderCourts(fallbackCourts);
        }
    };

    const showMapPlaceholder = (container, title, subtitle) => {
        if (!container) return;
        container.innerHTML = `
            <div style="height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(206,255,0,0.05) 0%, rgba(255,255,255,0.02) 100%); border-radius:15px; color:var(--text-dim); text-align:center; padding:20px; border: 1px solid rgba(255,255,255,0.05);">
                <i class="fas fa-map-marked-alt" style="font-size:3rem; margin-bottom:15px; color:var(--primary); opacity: 0.8;"></i>
                <h3 style="color: white; margin-bottom: 8px;">${title}</h3>
                <p style="font-size:0.85rem; opacity: 0.7;">${subtitle}</p>
                <div style="margin-top: 20px; font-size: 0.7rem; background: rgba(255,255,255,0.05); padding: 5px 15px; border-radius: 20px;">
                    PREVIEW MODE
                </div>
            </div>
        `;
    };

    // 手机端无需自动延迟加载，等待用户点击Tab触发
    if (window.innerWidth > 768) {
        setTimeout(loadMap, 1000);
    }
});
