import { Dungeon } from './src/game/Dungeon.js';
import { Player } from './src/entities/Player.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const dungeon = new Dungeon();
// Link the path to your sprite folder
const player = new Player(100, 100, 'assets/sprites/link_idle.png'); 

let currentRoom = dungeon.obtenerSala("inicio");

function gameLoop() {
    // Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update & Draw
    // Here you would call player.update(inputHandler)
    currentRoom.dibujar(ctx, player);

    requestAnimationFrame(gameLoop);
}

gameLoop();