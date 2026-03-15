export class Hud {
    constructor() {
        this.mensajes = [];
    }

    // Añadir un mensaje que desaparece después de un tiempo
    notificar(texto) {
        this.mensajes.push({ texto, tiempo: 200 });
    }

    dibujar(ctx, jugador) {
        // Dibujar barra de vida (un rectángulo rojo y uno verde encima)
        ctx.fillStyle = "red";
        ctx.fillRect(20, 550, 200, 20);
        ctx.fillStyle = "green";
        ctx.fillRect(20, 550, (jugador.vida / 100) * 200, 20);

        // Dibujar texto de vida y sala
        ctx.fillStyle = "white";
        ctx.font = "16px 'Courier New'";
        ctx.fillText(`Vida: ${jugador.vida}%`, 25, 565);
        ctx.fillText(`Sala: ${jugador.salaActualId}`, 20, 540);

        // Mostrar mensajes flotantes
        this.mensajes.forEach((m, index) => {
            ctx.globalAlpha = m.tiempo / 200; // Se vuelve transparente
            ctx.fillText(m.texto, 20, 100 + (index * 25));
            m.tiempo--;
        });
        this.mensajes = this.mensajes.filter(m => m.tiempo > 0);
        ctx.globalAlpha = 1.0;
    }
}