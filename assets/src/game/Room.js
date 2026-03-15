export class Room {
    constructor(id, nombre, imagenUrl) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = new Image();
        this.imagen.src = imagenUrl;
        this.conexiones = []; 
        
        // Use your manual LinkedList here instead of an Array!
        this.entities = []; 
    }

    addEnemy(enemy) {
        this.entities.push(enemy);
    }

    dibujar(ctx, player) {
        // 1. Draw Background
        if (this.imagen.complete) {
            ctx.drawImage(this.imagen, 0, 0, 800, 600);
        }

        // 2. Draw Player
        player.dibujar(ctx);

        // 3. Draw all other entities (Enemies, Items)
        this.entities.forEach(entity => {
            entity.dibujar(ctx);
        });

        // 4. Draw UI
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(this.nombre, 20, 40);
    }
}