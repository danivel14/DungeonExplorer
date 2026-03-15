const GameState = {
    MENU: 'MENU',
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    GAMEOVER: 'GAMEOVER'
};

let currentState = GameState.MENU;

// En el loop principal:
function gameLoop() {
    if (currentState === GameState.PLAYING) {
        actualizarJuego();
    } else if (currentState === GameState.MENU) {
        dibujarMenu();
    }
    requestAnimationFrame(gameLoop);
}