// src/entities/Player.js
export class Player {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.speed = 20;
        this.vida = 3;
    }

    mover(dir, w, h) {
        const paso = this.speed;
        if (dir === 'up') this.y -= paso;
        if (dir === 'down') this.y += paso;
        if (dir === 'left') this.x -= paso;
        if (dir === 'right') this.x += paso;

        // Límites básicos para no salir de la pantalla
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        if (this.x > w - 80) this.x = w - 80;
        if (this.y > h - 200) this.y = h - 200;
    }
}