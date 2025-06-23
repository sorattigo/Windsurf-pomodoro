const achievements = {
    // アチーブメントリスト
    achievements: {
        'firstPomodoro': {
            name: '初めてのポモドーロ',
            description: '最初のポモドーロを完了',
            condition: () => true
        },
        'bossVictory': {
            name: 'ボス撃破',
            description: 'ボスバトルに勝利',
            condition: () => true
        },
        'level5': {
            name: '5レベル到達',
            description: 'レベル5に到達',
            condition: (level) => level >= 5
        },
        'combo5': {
            name: '5コンボ',
            description: '5回連続で集中度4以上',
            condition: (combo) => combo >= 5
        },
        'dailyQuest': {
            name: 'デイリーコンプリート',
            description: 'デイリークエストを達成',
            condition: (questCompleted) => questCompleted
        }
    },

    checkAchievement: function(achievementId, callback) {
        const achievement = this.achievements[achievementId];
        if (!achievement) return;

        // 条件をチェック
        if (achievement.condition()) {
            // アチーブメントを保存
            const unlocked = localStorage.getItem('unlockedAchievements') || '[]';
            const achievements = JSON.parse(unlocked);
            if (!achievements.includes(achievementId)) {
                achievements.push(achievementId);
                localStorage.setItem('unlockedAchievements', JSON.stringify(achievements));
                callback(achievement);
            }
        }
    },

    getUnlockedAchievements: function() {
        const unlocked = localStorage.getItem('unlockedAchievements') || '[]';
        return JSON.parse(unlocked);
    }
};

export { achievements };
