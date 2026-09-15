// ===== Typing Effect =====
const phrases = [
    '新媒体运营 × 活动运营 × AI 实践',
    '内容策划 · 视觉表达 · 数据复盘',
    '用内容连接人，用数据改进内容',
    '把用户需求落地成方案',
    '流程优化，让协作更顺畅'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing after page load
setTimeout(typeEffect, 1000);

// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinksContainer.classList.remove('open');
    });
});

// ===== Reveal on Scroll =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== Skill Bars Animation =====
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const width = fill.getAttribute('data-width');
            fill.style.width = width;
            skillObserver.unobserve(fill);
        }
    });
}, {
    threshold: 0.3
});

skillFills.forEach(fill => skillObserver.observe(fill));

// ===== Number Counter =====
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.getAttribute('data-target'));
            const suffix = el.getAttribute('data-suffix') || '';
            const duration = 1800;
            const startTime = performance.now();
            const isDecimal = target % 1 !== 0;

            function animate(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = target * eased;

                if (isDecimal) {
                    el.textContent = current.toFixed(1) + suffix;
                } else {
                    el.textContent = Math.floor(current) + suffix;
                }

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
                }
            }

            requestAnimationFrame(animate);
            counterObserver.unobserve(el);
        }
    });
}, {
    threshold: 0.5
});

statNumbers.forEach(num => counterObserver.observe(num));

// ===== Smooth Scroll for Nav Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            const offset = 70;
            const targetPosition = targetEl.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Parallax for Hero Orbs =====
const orbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 15;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// ===== Photo Carousel (About) =====
(function () {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dots = document.querySelectorAll('#carouselDots .dot');
    if (!track) return;

    let index = 0;
    const total = dots.length;
    let timer = null;

    function goTo(i) {
        index = (i + total) % total;
        track.style.transform = 'translateX(-' + (index * (100 / total)) + '%)';
        dots.forEach(function (d, di) { d.classList.toggle('active', di === index); });
    }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function startAuto() { timer = setInterval(next, 5000); }
    function stopAuto() { if (timer) clearInterval(timer); }

    nextBtn.addEventListener('click', function () { next(); stopAuto(); startAuto(); });
    prevBtn.addEventListener('click', function () { prev(); stopAuto(); startAuto(); });
    dots.forEach(function (d, di) { d.addEventListener('click', function () { goTo(di); stopAuto(); startAuto(); }); });

    const carousel = document.getElementById('photoCarousel');
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
    startAuto();
})();

// ===== Tarot (Interests) =====
(function () {
    const card = document.getElementById('tarotCard');
    const drawBtn = document.getElementById('tarotDraw');
    const emojiEl = document.getElementById('tarotEmoji');
    const nameEl = document.getElementById('tarotCardName');
    const meaningEl = document.getElementById('tarotMeaning');
    if (!card) return;

    const cards = [
        { emoji: '🎵', name: '静水流深 · 古筝', meaning: '在喧嚣里守住自己的节奏，慢下来反而更稳。' },
        { emoji: '🥾', name: '向前一步 · 徒步', meaning: '路是走出来的，答案也总在路上等你。' },
        { emoji: '💃', name: '自在表达 · 中国舞', meaning: '用身体说话，自信从姿态里长出来。' },
        { emoji: '🏐', name: '并肩 · 排球', meaning: '一个人走得快，一群人走得远。' },
        { emoji: '🎾', name: '对手 · 网球', meaning: '把竞争当成让自己更强的礼物。' },
        { emoji: '🧗', name: '向上 · 攀岩', meaning: '每一步都算数，顶峰见。' },
        { emoji: '🏊', name: '自在 · 游泳', meaning: '沉得住气，也游得自由。' }
    ];

    let busy = false;
    function draw() {
        if (busy) return;
        busy = true;
        drawBtn.disabled = true;
        const pick = cards[Math.floor(Math.random() * cards.length)];
        const apply = function () {
            emojiEl.textContent = pick.emoji;
            nameEl.textContent = pick.name;
            meaningEl.textContent = pick.meaning;
        };
        if (card.classList.contains('flipped')) {
            card.classList.remove('flipped');
            setTimeout(function () { apply(); card.classList.add('flipped'); }, 400);
        } else {
            apply();
            card.classList.add('flipped');
        }
        setTimeout(function () { busy = false; drawBtn.disabled = false; }, 750);
    }

    drawBtn.addEventListener('click', draw);
    card.addEventListener('click', draw);
})();

// ===== Project Achievement Modal =====
(function () {
    const overlay = document.getElementById('projectModal');
    if (!overlay) return;

    const closeBtn = document.getElementById('modalClose');
    const cards = document.querySelectorAll('.project-card[data-project]');
    const details = {
        sales: document.getElementById('detail-sales'),
        inventory: document.getElementById('detail-inventory')
    };
    const frame = document.getElementById('inventoryFrame');
    const FRAME_SRC = 'assets/projects/inventory-dashboard.html';
    let lastFocused = null;

    function openProject(key) {
        const panel = details[key];
        if (!panel) return;
        lastFocused = document.activeElement;
        Object.keys(details).forEach(k => { if (details[k]) details[k].hidden = true; });
        panel.hidden = false;
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (key === 'inventory' && frame && !frame.getAttribute('src')) {
            frame.setAttribute('src', FRAME_SRC);
        }
        closeBtn.focus();
    }

    function closeModal() {
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (frame) frame.removeAttribute('src'); // unload dashboard to free resources
        if (lastFocused) lastFocused.focus();
    }

    cards.forEach(card => {
        const key = card.getAttribute('data-project');
        card.addEventListener('click', () => openProject(key));
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openProject(key);
            }
        });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
    });
})();

// ===== Experience / Internship Output Modal (live dashboard via iframe) =====
(function () {
    const overlay = document.getElementById('experienceModal');
    if (!overlay) return;

    const closeBtn = document.getElementById('expModalClose');
    const card = document.querySelector('.exp-card[data-exp="amer"]');
    const frame = document.getElementById('expFrame');
    const loading = document.getElementById('expLoading');
    const DASHBOARD_URL = 'assets/projects/amer-dashboard/index.html';
    let lastFocused = null;
    let loadTimer = null;

    function openExp() {
        lastFocused = document.activeElement;
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        loading.classList.remove('hidden');
        // lazy-load the live dashboard; only set src once
        if (frame && !frame.getAttribute('src')) {
            frame.setAttribute('src', DASHBOARD_URL);
        }
        closeBtn.focus();
        // fallback: if the local server is not running, show a hint after a while
        clearTimeout(loadTimer);
        loadTimer = setTimeout(() => {
            if (loading && !loading.classList.contains('hidden')) {
                loading.querySelector('.exp-loading-main').textContent = '无法连接到本地看板';
                loading.querySelector('.exp-loading-note').innerHTML =
                    '请检查快照文件 assets/projects/amer-dashboard/ 是否完整，再重新打开本弹窗。';
            }
        }, 9000);
    }

    function closeExp() {
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        clearTimeout(loadTimer);
        if (frame) frame.removeAttribute('src'); // unload to free resources
        if (lastFocused) lastFocused.focus();
    }

    if (frame) {
        frame.addEventListener('load', () => {
            clearTimeout(loadTimer);
            if (loading) loading.classList.add('hidden');
        });
    }

    if (card) {
        card.addEventListener('click', openExp);
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openExp();
            }
        });
    }

    closeBtn.addEventListener('click', closeExp);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeExp(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) closeExp();
    });
})();
