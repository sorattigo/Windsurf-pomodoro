export function miniGame() {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4';
        
        const gameContainer = document.createElement('div');
        gameContainer.className = 'bg-white rounded-lg p-8 shadow-xl';
        
        const title = document.createElement('h2');
        title.className = 'text-2xl font-bold mb-4';
        title.textContent = 'ボスバトル！';
        
        const countdown = document.createElement('div');
        countdown.className = 'text-4xl font-bold mb-4';
        countdown.textContent = '5';
        
        const startButton = document.createElement('button');
        startButton.className = 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600';
        startButton.textContent = '開始！';
        startButton.onclick = () => {
            startButton.remove();
            startGame();
        };

        gameContainer.appendChild(title);
        gameContainer.appendChild(countdown);
        gameContainer.appendChild(startButton);
        modal.appendChild(gameContainer);
        document.body.appendChild(modal);

        let clicks = 0;
        let gameInterval;
        let remainingTime = 5;

        function startGame() {
            gameInterval = setInterval(() => {
                remainingTime--;
                countdown.textContent = remainingTime;
                
                if (remainingTime <= 0) {
                    clearInterval(gameInterval);
                    modal.remove();
                    resolve(clicks >= 50); // 5秒間50クリック以上で勝利
                }
            }, 1000);

            modal.addEventListener('click', () => {
                clicks++;
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                resolve(false);
            }
        });
    });
}
