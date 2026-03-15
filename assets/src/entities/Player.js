export class Player {
    constructor(x, y, spritePath) {
        this.x = x;
        this.y = y;
        this.width = 50;  // Adjust based on your PNG size
        this.height = 50;
        this.speed = 5;

        // Load the sprite
        this.image = new Image();
        this.image.src = spritePath; 
    }

    // Logic to move the player
    update(input) {
        if (input.keys['ArrowUp']) this.y -= this.speed;
        if (input.keys['ArrowDown']) this.y += this.speed;
        if (input.keys['ArrowLeft']) this.x -= this.speed;
        if (input.keys['ArrowRight']) this.x += this.speed;
    }

    dibujar(ctx) {
        if (this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            // Placeholder while image loads
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}