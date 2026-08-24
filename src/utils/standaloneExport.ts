// Generates 100% self-contained Vanilla HTML+CSS+JS single file for direct GitHub Pages deployment
export function generateStandaloneHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Movement & Break Tracker</title>
  <style>
    /* CSS Reset & Design Tokens */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    :root {
      --primary: #059669;
      --primary-light: #ecfdf5;
      --primary-hover: #047857;
      --accent-blue: #0284c7;
      --accent-blue-light: #e0f2fe;
      --bg-canvas: #f8fafc;
      --surface: #ffffff;
      --surface-subtle: #f1f5f9;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
      --shadow-md: 0 4px 12px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.03);
      --radius-lg: 18px;
      --radius-md: 12px;
      --radius-full: 9999px;
      --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    body {
      font-family: var(--font-family);
      background-color: #0f172a;
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      line-height: 1.5;
    }

    /* Mobile Container Frame */
    .mobile-app-container {
      width: 100%;
      max-width: 440px;
      min-height: 100vh;
      background-color: var(--bg-canvas);
      display: flex;
      flex-direction: column;
      position: relative;
      box-shadow: 0 20px 40px rgba(0,0,0,0.25);
    }

    /* Header */
    header {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 16px 20px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 20;
    }
    .header-brand {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .header-logo {
      width: 34px;
      height: 34px;
      background: var(--primary);
      color: white;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 18px;
    }
    .header-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--text-main);
    }
    .header-date {
      font-size: 12px;
      color: var(--text-muted);
    }

    /* Tab Content Area */
    main {
      flex: 1;
      padding: 20px;
      padding-bottom: 90px;
    }

    .tab-view {
      display: none;
    }
    .tab-view.active {
      display: block;
      animation: fadeIn 0.25s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Cards */
    .card {
      background: var(--surface);
      border-radius: var(--radius-lg);
      padding: 20px;
      border: 1px solid var(--border);
      box-shadow: var(--shadow-sm);
      margin-bottom: 16px;
    }

    .card-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* Timer Dial */
    .timer-card {
      text-align: center;
      padding: 28px 20px;
    }
    .dial-wrapper {
      position: relative;
      width: 220px;
      height: 220px;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dial-svg {
      transform: rotate(-90deg);
      width: 100%;
      height: 100%;
    }
    .dial-bg {
      stroke: var(--surface-subtle);
      fill: none;
      stroke-width: 10;
    }
    .dial-progress {
      stroke: var(--primary);
      fill: none;
      stroke-width: 10;
      stroke-linecap: round;
      transition: stroke-dashoffset 0.5s ease;
    }
    .dial-text {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .dial-time {
      font-size: 40px;
      font-weight: 800;
      letter-spacing: -0.5px;
      font-variant-numeric: tabular-nums;
      color: var(--text-main);
    }
    .dial-status {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Buttons */
    .btn-group {
      display: flex;
      gap: 10px;
      justify-content: center;
    }
    .btn {
      min-height: 48px;
      padding: 12px 24px;
      border-radius: var(--radius-full);
      font-size: 15px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.15s ease;
      touch-action: manipulation;
    }
    .btn:active {
      transform: scale(0.96);
    }
    .btn-primary {
      background: var(--primary);
      color: white;
      flex: 2;
      box-shadow: 0 4px 10px rgba(5, 150, 105, 0.25);
    }
    .btn-secondary {
      background: var(--surface-subtle);
      color: var(--text-main);
      border: 1px solid var(--border);
      flex: 1;
    }
    .btn-blue {
      background: var(--accent-blue);
      color: white;
    }

    /* Stretch Section */
    .stretch-card {
      background: var(--surface);
      border-radius: var(--radius-lg);
      padding: 20px;
      border: 1px solid var(--border);
      text-align: center;
      margin-bottom: 16px;
    }
    .stretch-badge {
      display: inline-block;
      padding: 4px 12px;
      background: var(--primary-light);
      color: var(--primary);
      border-radius: var(--radius-full);
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .stretch-illustration {
      width: 140px;
      height: 140px;
      margin: 10px auto;
      background: var(--primary-light);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
    }
    .stretch-name {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .stretch-target {
      font-size: 13px;
      color: var(--text-muted);
      margin-bottom: 14px;
    }
    .stretch-timer {
      font-size: 32px;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 16px;
      font-variant-numeric: tabular-nums;
    }
    .stretch-instructions {
      text-align: left;
      font-size: 14px;
      color: #334155;
      background: var(--surface-subtle);
      padding: 14px;
      border-radius: var(--radius-md);
      margin-bottom: 16px;
    }

    /* Hydration Section */
    .hydration-wave-box {
      background: linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%);
      border-radius: var(--radius-lg);
      padding: 24px 20px;
      text-align: center;
      border: 1px solid #bae6fd;
      position: relative;
      overflow: hidden;
      margin-bottom: 16px;
    }
    .hydro-amount {
      font-size: 36px;
      font-weight: 800;
      color: var(--accent-blue);
      line-height: 1.1;
    }
    .hydro-sub {
      font-size: 14px;
      font-weight: 600;
      color: #0369a1;
      margin-bottom: 14px;
    }
    .progress-bar-bg {
      height: 12px;
      background: rgba(2, 132, 199, 0.15);
      border-radius: var(--radius-full);
      overflow: hidden;
      position: relative;
    }
    .progress-bar-fill {
      height: 100%;
      background: var(--accent-blue);
      border-radius: var(--radius-full);
      transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .hydro-quick-btns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    /* Dashboard Checklist */
    .habit-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      margin-bottom: 8px;
      cursor: pointer;
      user-select: none;
      touch-action: manipulation;
    }
    .habit-item.done {
      background: var(--primary-light);
      border-color: #a7f3d0;
    }
    .habit-check {
      width: 22px;
      height: 22px;
      border-radius: 6px;
      border: 2px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 800;
      color: white;
      flex-shrink: 0;
      background: white;
    }
    .habit-item.done .habit-check {
      background: var(--primary);
      border-color: var(--primary);
    }
    .habit-label {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-main);
    }
    .habit-item.done .habit-label {
      text-decoration: line-through;
      color: var(--text-muted);
    }

    /* Bottom Navigation Bar */
    nav.bottom-nav {
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: 440px;
      height: 70px;
      background: var(--surface);
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: space-around;
      align-items: center;
      z-index: 30;
      padding-bottom: 6px;
    }
    .nav-btn {
      background: none;
      border: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      color: var(--text-muted);
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      padding: 6px 12px;
      border-radius: var(--radius-md);
      transition: color 0.15s;
    }
    .nav-btn.active {
      color: var(--primary);
    }
    .nav-icon {
      font-size: 20px;
    }

    /* Modal Backdrop */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(15, 23, 42, 0.6);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 50;
      padding: 20px;
    }
    .modal-overlay.open {
      display: flex;
    }
    .modal-content {
      background: white;
      border-radius: var(--radius-lg);
      padding: 24px;
      width: 100%;
      max-width: 360px;
      box-shadow: var(--shadow-md);
      animation: popIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes popIn {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  </style>
</head>
<body>

  <div class="mobile-app-container">
    <!-- Header -->
    <header>
      <div class="header-brand">
        <div class="header-logo">🏃</div>
        <div>
          <div class="header-title">Move & Hydrate</div>
          <div class="header-date" id="headerDate">Today</div>
        </div>
      </div>
      <button class="btn btn-secondary" style="padding: 6px 14px; min-height: 36px; font-size: 13px;" onclick="openSettings()">⚙️ Settings</button>
    </header>

    <main>
      <!-- TAB 1: TIMER -->
      <section id="tab-timer" class="tab-view active">
        <div class="card timer-card">
          <div class="dial-wrapper">
            <svg class="dial-svg" viewBox="0 0 200 200">
              <circle class="dial-bg" cx="100" cy="100" r="88" />
              <circle class="dial-progress" id="timerProgressRing" cx="100" cy="100" r="88" stroke-dasharray="552.92" stroke-dashoffset="0" />
            </svg>
            <div class="dial-text">
              <span class="dial-time" id="timerDisplay">45:00</span>
              <span class="dial-status" id="timerStatus">Ready</span>
            </div>
          </div>

          <div class="btn-group">
            <button class="btn btn-primary" id="btnTimerToggle" onclick="toggleTimer()">▶ Start Focus</button>
            <button class="btn btn-secondary" onclick="resetTimer()">↺ Reset</button>
          </div>
        </div>

        <div class="card">
          <div class="card-title">
            <span>⚡ Quick Stretch Break</span>
            <span style="font-size: 12px; color: var(--primary); font-weight: 600;">30s per pose</span>
          </div>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px;">Relieve neck strain and tight hip flexors from long sitting sessions.</p>
          <button class="btn btn-blue" style="width: 100%;" onclick="switchTab('stretches')">🧘 Launch Stretch Guide</button>
        </div>
      </section>

      <!-- TAB 2: STRETCHES -->
      <section id="tab-stretches" class="tab-view">
        <div class="stretch-card">
          <span class="stretch-badge" id="stretchCategory">Neck & Shoulders</span>
          <h2 class="stretch-name" id="stretchName">Neck Tilt & Roll</h2>
          <p class="stretch-target" id="stretchTarget">Target: Upper Trapezius</p>
          
          <div class="stretch-illustration" id="stretchIcon">🧘</div>
          
          <div class="stretch-timer" id="stretchCountdown">00:30</div>

          <div class="stretch-instructions" id="stretchInstructions">
            Gently lower right ear toward right shoulder. Hold 15s, then switch sides. Breathe deeply.
          </div>

          <div class="btn-group">
            <button class="btn btn-secondary" onclick="prevStretch()">⏮ Prev</button>
            <button class="btn btn-primary" id="btnStretchPlay" onclick="toggleStretchTimer()">▶ Start (30s)</button>
            <button class="btn btn-secondary" onclick="nextStretch()">Next ⏭</button>
          </div>
        </div>
      </section>

      <!-- TAB 3: HYDRATION -->
      <section id="tab-hydration" class="tab-view">
        <div class="hydration-wave-box">
          <div style="font-size: 28px; margin-bottom: 6px;">💧</div>
          <div class="hydro-amount" id="hydroCountDisplay">0 / 8 Glasses</div>
          <div class="hydro-sub" id="hydroMlDisplay">0 / 2,000 ml</div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" id="hydroProgressBar" style="width: 0%;"></div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">Quick Log</div>
          <div class="hydro-quick-btns">
            <button class="btn btn-blue" onclick="addWater(250)">+1 Glass (250ml)</button>
            <button class="btn btn-blue" onclick="addWater(500)">+1 Bottle (500ml)</button>
          </div>
          <div style="margin-top: 10px; text-align: center;">
            <button class="btn btn-secondary" style="font-size: 12px; padding: 6px 14px; min-height: 32px;" onclick="undoWater()">↺ Undo Last Entry</button>
          </div>
        </div>
      </section>

      <!-- TAB 4: DASHBOARD -->
      <section id="tab-dashboard" class="tab-view">
        <div class="card">
          <div class="card-title">Today's Health Summary</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            <div style="background: var(--surface-subtle); padding: 12px; border-radius: var(--radius-md); text-align: center;">
              <div style="font-size: 12px; color: var(--text-muted);">Breaks Taken</div>
              <div style="font-size: 24px; font-weight: 800; color: var(--primary);" id="dashBreaksCount">0</div>
            </div>
            <div style="background: var(--surface-subtle); padding: 12px; border-radius: var(--radius-md); text-align: center;">
              <div style="font-size: 12px; color: var(--text-muted);">Water Target</div>
              <div style="font-size: 24px; font-weight: 800; color: var(--accent-blue);" id="dashWaterPct">0%</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">Daily Habits Checklist</div>
          <div id="habitsList"></div>
        </div>
      </section>
    </main>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
      <button class="nav-btn active" onclick="switchTab('timer')">
        <span class="nav-icon">⏱️</span>
        <span>Timer</span>
      </button>
      <button class="nav-btn" onclick="switchTab('stretches')">
        <span class="nav-icon">🧘</span>
        <span>Stretches</span>
      </button>
      <button class="nav-btn" onclick="switchTab('hydration')">
        <span class="nav-icon">💧</span>
        <span>Hydration</span>
      </button>
      <button class="nav-btn" onclick="switchTab('dashboard')">
        <span class="nav-icon">📋</span>
        <span>Habits</span>
      </button>
    </nav>

    <!-- Settings Modal -->
    <div class="modal-overlay" id="settingsModal">
      <div class="modal-content">
        <h3 style="margin-bottom: 16px; font-size: 18px; font-weight: 700;">Interval Settings</h3>
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px;">Sitting Timer Duration (Minutes):</label>
          <input type="number" id="inputTimerMins" min="5" max="120" value="45" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border); font-size: 16px;">
        </div>
        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px;">Daily Water Goal (Glasses):</label>
          <input type="number" id="inputWaterGoal" min="4" max="20" value="8" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border); font-size: 16px;">
        </div>
        <div class="btn-group">
          <button class="btn btn-secondary" onclick="closeSettings()">Cancel</button>
          <button class="btn btn-primary" onclick="saveSettings()">Save Changes</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    // State Management & LocalStorage
    const STORAGE_KEY = 'movement_tracker_vanilla_v1';
    
    const stretches = [
      { name: "Neck Tilt & Roll", cat: "Neck & Shoulders", target: "Upper Trapezius", icon: "🧘", desc: "Gently lower right ear to shoulder. Hold 15s, then switch sides." },
      { name: "Shoulder Blade Squeeze", cat: "Upper Back", target: "Rhomboids", icon: "💪", desc: "Roll shoulders back and squeeze shoulder blades together for 10s." },
      { name: "Wrist & Finger Flex", cat: "Hands & Wrists", target: "Carpal & Forearm", icon: "🖐️", desc: "Extend arm, gently pull fingers back for 15s. Switch hands." },
      { name: "Seated Spinal Twist", cat: "Spine & Core", target: "Erector Spinae", icon: "🔄", desc: "Sit tall, place right hand on left knee, gently rotate torso." },
      { name: "Standing Quad Stretch", cat: "Legs & Hips", target: "Quadriceps & Psoas", icon: "🦵", desc: "Stand tall, hold right ankle behind you. Hold 15s per leg." }
    ];

    let currentStretchIndex = 0;
    let stretchTimer = null;
    let stretchTimeLeft = 30;

    let appData = {
      date: new Date().toISOString().split('T')[0],
      timerDurationMins: 45,
      waterMl: 0,
      waterGoalGlasses: 8,
      breaksCompleted: 0,
      habits: [
        { id: 1, text: "Ergonomic posture check", done: false },
        { id: 2, text: "3+ Movement breaks taken", done: false },
        { id: 3, text: "Quick stretch routine completed", done: false },
        { id: 4, text: "Daily hydration goal met", done: false },
        { id: 5, text: "20-20-20 eye rest rule", done: false }
      ]
    };

    // Load LocalStorage
    function loadData() {
      const raw = localStorage.getItem(STORAGE_KEY);
      const today = new Date().toISOString().split('T')[0];
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.date === today) {
          appData = parsed;
        } else {
          appData.date = today;
          appData.waterMl = 0;
          appData.breaksCompleted = 0;
          appData.habits.forEach(h => h.done = false);
          saveData();
        }
      }
      document.getElementById('headerDate').textContent = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      updateAllUI();
    }

    function saveData() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    }

    // Timer Variables
    let timerTotalSeconds = 45 * 60;
    let timerRemainingSeconds = 45 * 60;
    let timerInterval = null;
    let isTimerRunning = false;

    function toggleTimer() {
      if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        document.getElementById('btnTimerToggle').textContent = '▶ Resume';
        document.getElementById('timerStatus').textContent = 'Paused';
      } else {
        isTimerRunning = true;
        document.getElementById('btnTimerToggle').textContent = '⏸ Pause';
        document.getElementById('timerStatus').textContent = 'Focusing...';
        timerInterval = setInterval(() => {
          if (timerRemainingSeconds > 0) {
            timerRemainingSeconds--;
            updateTimerDisplay();
          } else {
            clearInterval(timerInterval);
            isTimerRunning = false;
            appData.breaksCompleted++;
            saveData();
            updateAllUI();
            alert("⏰ Time to Move! Your sitting interval is complete. Take a 2-minute stretch break!");
            switchTab('stretches');
          }
        }, 1000);
      }
    }

    function resetTimer() {
      clearInterval(timerInterval);
      isTimerRunning = false;
      timerTotalSeconds = appData.timerDurationMins * 60;
      timerRemainingSeconds = timerTotalSeconds;
      document.getElementById('btnTimerToggle').textContent = '▶ Start Focus';
      document.getElementById('timerStatus').textContent = 'Ready';
      updateTimerDisplay();
    }

    function updateTimerDisplay() {
      const mins = Math.floor(timerRemainingSeconds / 60);
      const secs = timerRemainingSeconds % 60;
      document.getElementById('timerDisplay').textContent = 
        String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');

      const circumference = 2 * Math.PI * 88;
      const progress = (timerTotalSeconds - timerRemainingSeconds) / timerTotalSeconds;
      const offset = circumference * (1 - progress);
      document.getElementById('timerProgressRing').style.strokeDashoffset = offset;
    }

    // Stretch Guides
    function renderStretch() {
      const cur = stretches[currentStretchIndex];
      document.getElementById('stretchCategory').textContent = cur.cat;
      document.getElementById('stretchName').textContent = cur.name;
      document.getElementById('stretchTarget').textContent = 'Target: ' + cur.target;
      document.getElementById('stretchIcon').textContent = cur.icon;
      document.getElementById('stretchInstructions').textContent = cur.desc;
      document.getElementById('stretchCountdown').textContent = '00:' + String(stretchTimeLeft).padStart(2, '0');
    }

    function toggleStretchTimer() {
      if (stretchTimer) {
        clearInterval(stretchTimer);
        stretchTimer = null;
        document.getElementById('btnStretchPlay').textContent = '▶ Resume (30s)';
      } else {
        document.getElementById('btnStretchPlay').textContent = '⏸ Pause';
        stretchTimer = setInterval(() => {
          if (stretchTimeLeft > 0) {
            stretchTimeLeft--;
            document.getElementById('stretchCountdown').textContent = '00:' + String(stretchTimeLeft).padStart(2, '0');
          } else {
            clearInterval(stretchTimer);
            stretchTimer = null;
            document.getElementById('btnStretchPlay').textContent = '▶ Start (30s)';
            stretchTimeLeft = 30;
            nextStretch();
          }
        }, 1000);
      }
    }

    function nextStretch() {
      if (stretchTimer) { clearInterval(stretchTimer); stretchTimer = null; }
      stretchTimeLeft = 30;
      currentStretchIndex = (currentStretchIndex + 1) % stretches.length;
      document.getElementById('btnStretchPlay').textContent = '▶ Start (30s)';
      renderStretch();
    }

    function prevStretch() {
      if (stretchTimer) { clearInterval(stretchTimer); stretchTimer = null; }
      stretchTimeLeft = 30;
      currentStretchIndex = (currentStretchIndex - 1 + stretches.length) % stretches.length;
      document.getElementById('btnStretchPlay').textContent = '▶ Start (30s)';
      renderStretch();
    }

    // Hydration Logic
    function addWater(amount) {
      appData.waterMl += amount;
      const targetMl = appData.waterGoalGlasses * 250;
      if (appData.waterMl >= targetMl) {
        const habit = appData.habits.find(h => h.id === 4);
        if (habit) habit.done = true;
      }
      saveData();
      updateAllUI();
    }

    function undoWater() {
      appData.waterMl = Math.max(0, appData.waterMl - 250);
      saveData();
      updateAllUI();
    }

    // Tab Switching
    function switchTab(tabId) {
      document.querySelectorAll('.tab-view').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      
      document.getElementById('tab-' + tabId).classList.add('active');
      
      const tabIndices = { 'timer': 0, 'stretches': 1, 'hydration': 2, 'dashboard': 3 };
      document.querySelectorAll('.nav-btn')[tabIndices[tabId]].classList.add('active');
    }

    // Habit Toggling
    function toggleHabit(id) {
      const h = appData.habits.find(item => item.id === id);
      if (h) {
        h.done = !h.done;
        saveData();
        updateAllUI();
      }
    }

    // Settings Modal
    function openSettings() {
      document.getElementById('inputTimerMins').value = appData.timerDurationMins;
      document.getElementById('inputWaterGoal').value = appData.waterGoalGlasses;
      document.getElementById('settingsModal').classList.add('open');
    }
    function closeSettings() {
      document.getElementById('settingsModal').classList.remove('open');
    }
    function saveSettings() {
      const mins = parseInt(document.getElementById('inputTimerMins').value) || 45;
      const water = parseInt(document.getElementById('inputWaterGoal').value) || 8;
      appData.timerDurationMins = mins;
      appData.waterGoalGlasses = water;
      saveData();
      resetTimer();
      updateAllUI();
      closeSettings();
    }

    // Master UI Update
    function updateAllUI() {
      // Hydration
      const glasses = Math.floor(appData.waterMl / 250);
      const totalMlTarget = appData.waterGoalGlasses * 250;
      const pct = Math.min(100, Math.round((appData.waterMl / totalMlTarget) * 100));
      
      document.getElementById('hydroCountDisplay').textContent = glasses + ' / ' + appData.waterGoalGlasses + ' Glasses';
      document.getElementById('hydroMlDisplay').textContent = appData.waterMl.toLocaleString() + ' / ' + totalMlTarget.toLocaleString() + ' ml';
      document.getElementById('hydroProgressBar').style.width = pct + '%';

      // Dashboard
      document.getElementById('dashBreaksCount').textContent = appData.breaksCompleted;
      document.getElementById('dashWaterPct').textContent = pct + '%';

      // Habits
      const habitsEl = document.getElementById('habitsList');
      habitsEl.innerHTML = '';
      appData.habits.forEach(h => {
        const item = document.createElement('div');
        item.className = 'habit-item ' + (h.done ? 'done' : '');
        item.onclick = () => toggleHabit(h.id);
        item.innerHTML = '<div class="habit-check">' + (h.done ? '✓' : '') + '</div><span class="habit-label">' + h.text + '</span>';
        habitsEl.appendChild(item);
      });
    }

    // Initialize
    window.addEventListener('DOMContentLoaded', () => {
      loadData();
      renderStretch();
      resetTimer();
    });
  </script>
</body>
</html>`;
}
