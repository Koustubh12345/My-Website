document.addEventListener("DOMContentLoaded", () => {
    const dino = document.getElementById("dino");
    const cactus = document.getElementById("cactus");
    const startButton = document.getElementById("startButton");
    let isJumping = false;
    let isGameOver = false;

    function jump() {
        if (isJumping || isGameOver) return;
        isJumping = true;

        let position = 0;
        let upInterval = setInterval(() => {
            if (position >= 150) {
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    if (position <= 0) {
                        clearInterval(downInterval);
                        isJumping = false;
                    }
                    position -= 5;
                    dino.style.bottom = position + "px";
                }, 20);
            }
            position += 5;
            dino.style.bottom = position + "px";
        }, 20);
    }

    function moveCactus() {
        let cactusPosition = 600;
        cactus.style.right = cactusPosition + "px";

        let moveInterval = setInterval(() => {
            if (cactusPosition <= 0) {
                cactusPosition = 600;
            }

            if (cactusPosition < 80 && cactusPosition > 30 && parseInt(dino.style.bottom) < 30) {
                clearInterval(moveInterval);
                alert("Game Over! Try Again.");
                isGameOver = true;
                startButton.style.display = "block";
                return;
            }

            cactusPosition -= 5;
            cactus.style.right = cactusPosition + "px";
        }, 20);
    }

    function startGame() {
        if (isGameOver) {
            isGameOver = false;
            dino.style.bottom = "0px";
        }
        startButton.style.display = "none";
        moveCactus();
    }

    startButton.addEventListener("click", startGame);
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") jump();
    });

    document.addEventListener("touchstart", () => {
        jump();
    });
});
