/**
 * ==========================================================================
 * CUTE DATE PROJECT - CORE LOGIC
 * Architecture: Modular ES6 classes for maintainability and performance.
 * ==========================================================================
 */

// --------------------------------------------------------------------------
// 1. STATE MANAGEMENT
// --------------------------------------------------------------------------
const AppState = {
    date: null,
    time: null,
    activity: null,
    food: null,
    excitement: 50,
    emojiTheme: ['❤️']
};

// --------------------------------------------------------------------------
// 2. SYSTEM INFO DETECTOR
// --------------------------------------------------------------------------
class SystemDetector {
    static getInfo() {
        const ua = navigator.userAgent;
        let os = "Unknown";
        let browser = "Unknown";
        let device = "Desktop";

        if (/Windows/.test(ua)) os = "Windows";
        else if (/Mac OS X/.test(ua)) os = "Mac";
        else if (/Linux/.test(ua)) os = "Linux";
        else if (/Android/.test(ua)) os = "Android";
        else if (/iPhone/.test(ua)) os = "iPhone";
        else if (/iPad/.test(ua)) os = "iPad";

        if (/Mobi|Android|iPhone/.test(ua)) device = "Mobile";
        else if (/Tablet|iPad/.test(ua)) device = "Tablet";

        if (/OPR|Opera/.test(ua)) browser = "Opera";
        else if (/Edg/.test(ua)) browser = "Edge";
        else if (/SamsungBrowser/.test(ua)) browser = "Samsung Internet";
        else if (/Chrome/.test(ua)) browser = "Chrome";
        else if (/Safari/.test(ua) && !/Chrome/.test(ua)) browser = "Safari";
        else if (/Firefox/.test(ua)) browser = "Firefox";

        return {
            os, browser, device,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            screenRes: `${screen.width}x${screen.height}`,
            pixelRatio: window.devicePixelRatio,
            url: window.location.href,
            userAgent: ua,
            localTime: new Date().toLocaleString(),
            timestamp: Date.now()
        };
    }
}

// --------------------------------------------------------------------------
// 3. TELEGRAM INTEGRATION
// --------------------------------------------------------------------------
class TelegramService {
    static async sendPayload() {
        const sys = SystemDetector.getInfo();
        
        const message = `❤️ New Date Accepted ❤️
📅 Date: ${AppState.date}
🕒 Time: ${AppState.time}
🎯 Activity: ${AppState.activity}
${AppState.food ? `🍽️ Food: ${AppState.food}\n` : ''}🔥 Excitement: ${AppState.excitement}/100

📱 Device: ${sys.device}
🌐 Browser: ${sys.browser}
💻 OS: ${sys.os}
🌍 Timezone: ${sys.timezone}
🕰️ Local Time: ${sys.localTime}`;

        const workerURL = "https://telegram-proxy.erfanakbarzadegan.workers.dev/";
        
        try {
            await fetch(`${workerURL}?text=${encodeURIComponent(message)}`, {
                method: 'GET',
                mode: 'no-cors'
            });
            return true;
        } catch (error) {
            console.error("Transmission failed:", error);
            return true; // Proceed anyway for UX
        }
    }
}

// --------------------------------------------------------------------------
// 4. PARTICLE PHYSICS ENGINE
// --------------------------------------------------------------------------
class ParticleEngine {
    constructor() {
        this.container = document.getElementById('particle-container');
        this.particles = [];
        this.animationId = null;
        this.active = false;
    }

    createRain(emojis) {
        this.active = true;
        const count = window.innerWidth < 600 ? 50 : 100;
        
        for (let i = 0; i < count; i++) {
            this.spawnParticle(emojis);
        }
        this.animate();
    }

    spawnParticle(emojis) {
        const el = document.createElement('div');
        el.className = 'particle';
        el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        const size = Math.random() * 35 + 15;
        const x = Math.random() * window.innerWidth;
        const y = -50 - Math.random() * 150;
        
        const particleObj = {
            el: el, x: x, y: y, size: size,
            speedY: Math.random() * 4 + 2,
            speedX: (Math.random() - 0.5) * 2,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 6
        };
        
        el.style.fontSize = `${size}px`;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${particleObj.rotation}deg)`;
        
        this.container.appendChild(el);
        this.particles.push(particleObj);
    }

    animate = () => {
        if (!this.active) return;
        
        const h = window.innerHeight;
        const w = window.innerWidth;
        
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;
            p.x += Math.sin(p.y * 0.015) * 0.8; // Smooth wobble
            
            p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg)`;
            
            if (p.y > h + 50) {
                p.y = -50;
                p.x = Math.random() * w;
            }
        }
        this.animationId = requestAnimationFrame(this.animate);
    }
}
const Particles = new ParticleEngine();

// --------------------------------------------------------------------------
// 5. NO BUTTON DODGE LOGIC
// --------------------------------------------------------------------------
class DodgeMechanic {
    constructor(btnElement, containerElement) {
        this.btn = btnElement;
        this.container = containerElement;
        this.bindEvents();
    }

    bindEvents() {
        this.btn.addEventListener('mouseover', (e) => this.dodge(e));
        this.btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.dodge(null, true);
        }, { passive: false });
    }

    dodge(e, isTouch = false) {
        const containerRect = this.container.getBoundingClientRect();
        const btnRect = this.btn.getBoundingClientRect();
        
        const maxX = containerRect.width - btnRect.width;
        const maxY = containerRect.height - btnRect.height;
        
        let newX, newY;

        if (isTouch) {
            newX = Math.random() * maxX;
            newY = Math.random() * maxY;
        } else {
            const mouseX = e.clientX - containerRect.left;
            const mouseY = e.clientY - containerRect.top;
            
            const dirX = (btnRect.left - containerRect.left + btnRect.width/2) > mouseX ? 1 : -1;
            const dirY = (btnRect.top - containerRect.top + btnRect.height/2) > mouseY ? 1 : -1;
            
            newX = (btnRect.left - containerRect.left) + (dirX * (Math.random() * 60 + 40));
            newY = (btnRect.top - containerRect.top) + (dirY * (Math.random() * 60 + 40));
            
            newX = Math.max(0, Math.min(newX, maxX));
            newY = Math.max(0, Math.min(newY, maxY));
        }

        this.btn.style.position = 'absolute';
        this.btn.style.left = `${newX}px`;
        this.btn.style.top = `${newY}px`;
        this.btn.style.transform = 'none';
    }
}

// --------------------------------------------------------------------------
// 6. UI CONTROLLER (View Router)
// --------------------------------------------------------------------------
class UIController {
    constructor() {
        this.container = document.getElementById('view-container');
        this.init();
    }

    init() {
        // Start directly at the invite page
        this.renderView('tpl-invite', this.bindInviteEvents.bind(this));
    }

    renderView(templateId, callback) {
        this.container.innerHTML = '';
        const template = document.getElementById(templateId);
        const clone = template.content.cloneNode(true);
        this.container.appendChild(clone);
        if (callback) callback();
    }

    // --- View Bindings ---

    bindInviteEvents() {
        const btnYes = document.getElementById('btnYes');
        const btnNo = document.getElementById('btnNo');
        const btnContainer = document.getElementById('invite-buttons');

        new DodgeMechanic(btnNo, btnContainer);

        btnYes.addEventListener('click', () => {
            this.renderView('tpl-activity', this.bindActivityEvents.bind(this));
        });
    }

    bindActivityEvents() {
        const grid = document.getElementById('activity-grid');
        let selectedBtn = null;

        grid.addEventListener('click', (e) => {
            const btn = e.target.closest('.grid-btn');
            if (!btn) return;

            if (selectedBtn) selectedBtn.classList.remove('selected');
            btn.classList.add('selected');
            selectedBtn = btn;

            AppState.activity = btn.getAttribute('data-value');
            const emoji = btn.getAttribute('data-emoji');
            if(emoji && !AppState.emojiTheme.includes(emoji)) {
                AppState.emojiTheme.push(emoji);
            }

            // Route based on selection
            setTimeout(() => {
                if (AppState.activity.includes('Dinner')) {
                    this.renderView('tpl-food', this.bindFoodEvents.bind(this));
                } else {
                    this.renderView('tpl-datetime', this.bindDateTimeEvents.bind(this));
                }
            }, 350);
        });
    }

    bindFoodEvents() {
        const grid = document.getElementById('food-grid');
        let selectedBtn = null;

        grid.addEventListener('click', (e) => {
            const btn = e.target.closest('.grid-btn');
            if (!btn) return;

            if (selectedBtn) selectedBtn.classList.remove('selected');
            btn.classList.add('selected');
            selectedBtn = btn;

            AppState.food = btn.getAttribute('data-value');
            const emoji = btn.getAttribute('data-emoji');
            if(emoji && !AppState.emojiTheme.includes(emoji)) {
                AppState.emojiTheme.push(emoji);
            }

            setTimeout(() => {
                this.renderView('tpl-datetime', this.bindDateTimeEvents.bind(this));
            }, 350);
        });
    }

    bindDateTimeEvents() {
        // Generate Times: 06:00 to 23:00 (30 min intervals)
        const timeSelect = document.getElementById('timeInput');
        if(timeSelect.options.length <= 1) {
            for(let h=6; h<=23; h++) {
                let hourStr = h.toString().padStart(2, '0');
                timeSelect.add(new Option(`${hourStr}:00`, `${hourStr}:00`));
                if(h !== 23) { // Generate up to 23:00, stop before 23:30
                    timeSelect.add(new Option(`${hourStr}:30`, `${hourStr}:30`));
                }
            }
        }

        // Initialize Persian Datepicker
        if (window.jQuery && $.fn.persianDatepicker) {
            $("#datePicker").persianDatepicker({
                format: "YYYY/MM/DD",
                autoClose: true
            });
        }

        const btnNext = document.getElementById('btnNextDateTime');
        btnNext.addEventListener('click', () => {
            const dateVal = document.getElementById('datePicker').value;
            const timeVal = document.getElementById('timeInput').value;

            if (!dateVal || !timeVal) {
                alert("Please select both a date and time so I can plan perfectly! ❤️");
                return;
            }

            AppState.date = dateVal;
            AppState.time = timeVal;
            this.renderView('tpl-excitement', this.bindExcitementEvents.bind(this));
        });
    }

    bindExcitementEvents() {
        const slider = document.getElementById('excitementSlider');
        const emojiDisplay = document.getElementById('excitementEmoji');
        const btnFinish = document.getElementById('btnFinish');

        slider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            AppState.excitement = val;
            
            let emoji = '😊', scale = 1;
            if (val < 20) { emoji = '🙂'; scale = 0.85; }
            else if (val < 40) { emoji = '😌'; scale = 0.95; }
            else if (val < 60) { emoji = '😊'; scale = 1.05; }
            else if (val < 80) { emoji = '🥰'; scale = 1.25; }
            else if (val < 95) { emoji = '😍'; scale = 1.45; }
            else { emoji = '🤯❤️'; scale = 1.7; }

            emojiDisplay.innerText = emoji;
            emojiDisplay.style.transform = `scale(${scale})`;
        });

        btnFinish.addEventListener('click', async () => {
            this.renderView('tpl-loading');
            await TelegramService.sendPayload();
            setTimeout(() => {
                this.renderView('tpl-final', this.bindFinalEvents.bind(this));
            }, 1200); 
        });
    }

    bindFinalEvents() {
        document.getElementById('final-activity').innerText = AppState.activity;
        document.getElementById('final-time').innerText = `${AppState.date} at ${AppState.time}`;
        
        if (AppState.food) {
            document.getElementById('food-summary-row').style.display = 'flex';
            document.getElementById('final-food').innerText = AppState.food;
        }

        Particles.createRain(AppState.emojiTheme);
    }
}

// --------------------------------------------------------------------------
// 7. BOOTSTRAP
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    window.app = new UIController();
});
