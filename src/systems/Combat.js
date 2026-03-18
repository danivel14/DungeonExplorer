/**
 * Clase Combat: colisiones y el daño entre entidades.
 */
export class Combat {
    /**
     * Verifica si el jugador está lo suficientemente cerca para atacar.
     * @param {Player} jugador 
     * @param {Enemy} enemigo 
     */
    static verificarAtaque(jugador, enemigo) {
        if (!enemigo.vivo) return false;
        const dx = jugador.x - enemigo.x;
        const dy = jugador.y - enemigo.y;
        const distancia = Math.sqrt(dx * dx + dy * dy);

        // Rango de la espada de Kael
        const rangoAtaque = 60;

        if (distancia < rangoAtaque) {
            console.log("¡Golpe certero!");
            enemigo.recibirDaño(1); // El enemigo pierde 1 de vida
            return true;
        }
        return false;
    }

    static verificarDañoJugador(jugador, enemigo) {
        if (!enemigo.vivo) return false;

        const dx = jugador.x - enemigo.x;
        const dy = jugador.y - enemigo.y;
        const distancia = Math.sqrt(dx * dx + dy * dy);

        if (distancia < 40) {
            jugador.recibirDaño(1); // El jugador pierde un corazón
            return true;
        }
        return false;
    }
}