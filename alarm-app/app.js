// Alarm App - Main JavaScript
class AlarmApp {
    constructor() {
        this.alarms = [];
        this.activeAlarm = null;
        this.checkInterval = null;
        this.audioContext = null;
        this.alarmSoundInterval = null;
        this.init();
    }

    init() {
        this.loadAlarms();
        this.setupEventListeners();
        this.startClock();
        this.startAlarmChecker();
        this.requestNotificationPermission();
        this.registerServiceWorker();
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    playAlarmSound() {
        if (!this.audioContext) return;

        const playBeep = () => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = 800; // Frequency in Hz
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.5);
        };

        // Play beep repeatedly
        playBeep();
        this.alarmSoundInterval = setInterval(playBeep, 1000);
    }

    stopAlarmSound() {
        if (this.alarmSoundInterval) {
            clearInterval(this.alarmSoundInterval);
            this.alarmSoundInterval = null;
        }
    }

    setupEventListeners() {
        document.getElementById('addAlarmBtn').addEventListener('click', () => this.addAlarm());
        document.getElementById('snoozeBtn').addEventListener('click', () => this.snoozeAlarm());
        document.getElementById('dismissBtn').addEventListener('click', () => this.dismissAlarm());

        // Enter key to add alarm
        document.getElementById('alarmTimeInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addAlarm();
        });
        document.getElementById('alarmLabelInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addAlarm();
        });
    }

    startClock() {
        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            document.getElementById('currentTime').textContent = `${hours}:${minutes}:${seconds}`;
        };
        updateClock();
        setInterval(updateClock, 1000);
    }

    startAlarmChecker() {
        this.checkInterval = setInterval(() => {
            this.checkAlarms();
        }, 1000);
    }

    addAlarm() {
        const timeInput = document.getElementById('alarmTimeInput');
        const labelInput = document.getElementById('alarmLabelInput');
        const vibrateOption = document.getElementById('vibrateOption');
        const soundOption = document.getElementById('soundOption');

        if (!timeInput.value) {
            alert('Please select a time for the alarm');
            return;
        }

        const alarm = {
            id: Date.now(),
            time: timeInput.value,
            label: labelInput.value || 'Alarm',
            vibrate: vibrateOption.checked,
            sound: soundOption.checked,
            enabled: true,
            snoozed: false
        };

        this.alarms.push(alarm);
        this.saveAlarms();
        this.renderAlarms();

        // Clear inputs
        timeInput.value = '';
        labelInput.value = '';

        // Show feedback
        this.showNotification('Alarm added successfully!', 'success');
    }

    deleteAlarm(id) {
        this.alarms = this.alarms.filter(alarm => alarm.id !== id);
        this.saveAlarms();
        this.renderAlarms();
        this.showNotification('Alarm deleted', 'info');
    }

    toggleAlarm(id) {
        const alarm = this.alarms.find(a => a.id === id);
        if (alarm) {
            alarm.enabled = !alarm.enabled;
            this.saveAlarms();
            this.renderAlarms();
        }
    }

    checkAlarms() {
        if (this.activeAlarm) return;

        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        for (const alarm of this.alarms) {
            if (alarm.enabled && alarm.time === currentTime) {
                this.triggerAlarm(alarm);
                break;
            }
        }
    }

    triggerAlarm(alarm) {
        this.activeAlarm = alarm;

        // Show modal
        const modal = document.getElementById('alarmModal');
        document.getElementById('modalAlarmLabel').textContent = alarm.label;
        document.getElementById('modalTime').textContent = alarm.time;
        modal.classList.remove('hidden');

        // Play sound
        if (alarm.sound) {
            this.playAlarmSound();
        }

        // Vibrate
        if (alarm.vibrate && 'vibrate' in navigator) {
            const vibratePattern = [200, 100, 200, 100, 200];
            const vibrateInterval = setInterval(() => {
                navigator.vibrate(vibratePattern);
            }, 1000);

            // Store interval to clear later
            this.vibrateInterval = vibrateInterval;
        }

        // Show notification
        this.showSystemNotification(alarm);

        // Disable alarm after triggering (one-time alarm)
        alarm.enabled = false;
        this.saveAlarms();
        this.renderAlarms();
    }

    snoozeAlarm() {
        if (!this.activeAlarm) return;

        // Add 5 minutes to current time
        const now = new Date();
        now.setMinutes(now.getMinutes() + 5);
        const snoozeTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        // Create new snoozed alarm
        const snoozedAlarm = {
            id: Date.now(),
            time: snoozeTime,
            label: `${this.activeAlarm.label} (Snoozed)`,
            vibrate: this.activeAlarm.vibrate,
            sound: this.activeAlarm.sound,
            enabled: true,
            snoozed: true
        };

        this.alarms.push(snoozedAlarm);
        this.saveAlarms();
        this.renderAlarms();

        this.dismissAlarm();
        this.showNotification(`Alarm snoozed until ${snoozeTime}`, 'info');
    }

    dismissAlarm() {
        // Stop sound
        this.stopAlarmSound();

        // Stop vibration
        if (this.vibrateInterval) {
            clearInterval(this.vibrateInterval);
            navigator.vibrate(0);
        }

        // Hide modal
        document.getElementById('alarmModal').classList.add('hidden');
        this.activeAlarm = null;
    }

    renderAlarms() {
        const container = document.getElementById('alarmsList');

        if (this.alarms.length === 0) {
            container.innerHTML = '<p class="no-alarms">No alarms set. Add one above! 👆</p>';
            return;
        }

        // Sort alarms by time
        const sortedAlarms = [...this.alarms].sort((a, b) => a.time.localeCompare(b.time));

        container.innerHTML = sortedAlarms.map(alarm => `
            <div class="alarm-item ${alarm.enabled ? 'active' : ''}">
                <div class="alarm-info">
                    <div class="alarm-time">
                        ${alarm.time}
                        ${alarm.enabled ? '<span class="alarm-badge">ON</span>' : ''}
                    </div>
                    <div class="alarm-label">${alarm.label}</div>
                </div>
                <div class="alarm-controls">
                    <label class="toggle-switch">
                        <input type="checkbox" ${alarm.enabled ? 'checked' : ''}
                               onchange="app.toggleAlarm(${alarm.id})">
                        <span class="slider"></span>
                    </label>
                    <button class="delete-btn" onclick="app.deleteAlarm(${alarm.id})">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    saveAlarms() {
        localStorage.setItem('alarms', JSON.stringify(this.alarms));
    }

    loadAlarms() {
        const saved = localStorage.getItem('alarms');
        if (saved) {
            this.alarms = JSON.parse(saved);
            this.renderAlarms();
        }
    }

    requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }

    showSystemNotification(alarm) {
        if ('Notification' in window && Notification.permission === 'granted') {
            const notification = new Notification('⏰ Alarm!', {
                body: `${alarm.label} - ${alarm.time}`,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⏰</text></svg>',
                tag: 'alarm',
                requireInteraction: true,
                vibrate: [200, 100, 200]
            });

            notification.onclick = () => {
                window.focus();
                notification.close();
            };
        }
    }

    showNotification(message, type = 'info') {
        // Simple toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#10b981' : '#6366f1'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            z-index: 2000;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideDown 0.3s ease;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').catch(err => {
                console.log('Service Worker registration failed:', err);
            });
        }
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translate(-50%, -100px); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
    @keyframes slideUp {
        from { transform: translate(-50%, 0); opacity: 1; }
        to { transform: translate(-50%, -100px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize app
const app = new AlarmApp();
