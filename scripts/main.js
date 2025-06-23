import { miniGame } from './miniGame.js';
import { achievements } from './achievements.js';

function app() {
    const WORK_DURATION = 25 * 60; // 25 minutes in seconds
    const SHORT_BREAK = 5 * 60; // 5 minutes
    const LONG_BREAK = 15 * 60; // 15 minutes
    const CYCLES = 4;

    let timer;
    let timeLeft = WORK_DURATION;
    let currentPhase = 'work';
    let cycleCount = 0;
    let xp = 0;
    let level = 1;
    let combo = 0;
    let focusLog = [];
    let dailyQuest = generateDailyQuest();

    // Load saved data
    const savedData = localStorage.getItem('focusMountainData');
    if (savedData) {
        const data = JSON.parse(savedData);
        xp = data.xp || 0;
        level = data.level || 1;
        focusLog = data.focusLog || [];
    }

    function startTimer() {
        timer = setInterval(() => {
            if (timeLeft <= 0) {
                handlePhaseChange();
            } else {
                timeLeft--;
                updateDisplay();
            }
        }, 1000);
    }

    function handlePhaseChange() {
        if (currentPhase === 'work') {
            // Log focus level
            if (cycleCount % CYCLES === 0) {
                // Boss battle
                miniGame().then((result) => {
                    if (result) {
                        xp += 20; // Double XP for boss victory
                        addAchievement('bossVictory');
                    } else {
                        xp += 10; // Regular XP for failure
                    }
                    startNextPhase();
                });
            } else {
                xp += 10;
                startNextPhase();
            }
        } else {
            startNextPhase();
        }
    }

    function startNextPhase() {
        if (currentPhase === 'work') {
            timeLeft = SHORT_BREAK;
            currentPhase = 'break';
        } else if (currentPhase === 'break') {
            if (cycleCount % CYCLES === 0) {
                timeLeft = LONG_BREAK;
            } else {
                timeLeft = WORK_DURATION;
                currentPhase = 'work';
                cycleCount++;
            }
        }
        updateDisplay();
        startTimer();
    }

    function updateDisplay() {
        // Update timer display
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        $dispatch('update-time', {
            time: `${minutes}:${seconds.toString().padStart(2, '0')}`,
            phase: currentPhase
        });

        // Update hiker position
        const progress = 1 - (timeLeft / WORK_DURATION);
        const hiker = this.$refs.hiker;
        if (hiker) {
            hiker.style.transform = `translateY(${progress * 100}%)`;
        }
    }

    function addAchievement(achievementId) {
        achievements.checkAchievement(achievementId, () => {
            // Show achievement toast
            showNotification(`Achievement unlocked: ${achievementId}`);
        });
    }

    function showNotification(message) {
        // Implement notification system
    }

    function generateDailyQuest() {
        const quests = [
            { type: 'consecutive', target: 3, reward: 50 },
            { type: 'focus', target: 4, reward: 30 }
        ];
        return quests[Math.floor(Math.random() * quests.length)];
    }

    return {
        formattedTime: '25:00',
        currentPhase: 'work',
        xp,
        level,
        combo,
        dailyQuest,
        start: function() {
            startTimer();
        },
        stop: function() {
            if (timer) {
                clearInterval(timer);
            }
        },
        logFocusLevel: function(level) {
            focusLog.push({ time: new Date(), level });
            saveData();
        },
        saveData: function() {
            const data = {
                xp,
                level,
                focusLog
            };
            localStorage.setItem('focusMountainData', JSON.stringify(data));
        }
    };
}

// Export for Alpine.js
window.app = app;
