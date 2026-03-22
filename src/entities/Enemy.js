import React from 'react';
import { Image } from 'react-native';
import { Sprites } from '../../constants/sprites';

export class Enemy {
    /**
     * @param {string} id - Identificador único
     * @param {number} x - Posición inicial X
     * @param {number} y - Posición inicial Y
     * @param {any} sprite - Imagen (require)
     * @param {number} vida - Puntos de salud
     */
    constructor(id, x, y, sprite, vida = 2) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.spriteSheet = spriteSheet;
        this.frameWidth = 84;  
        this.frameHeight = 84; 
        this.frameX = 0;
        this.frameY = 0; 
        this.displaySize = 100; 
        this.vida = vida;
        this.vivo = true;
        this.velocidad = 1.2; 
    }

    /**
     * el enemigo se mueve lentamente hacia el jugador.
     * @param {number} playerX - Posición X del jugador
     * @param {number} playerY - Posición Y del jugador
     */
    actualizarIA(playerX, playerY) {
        if (!this.vivo) return;

        // IA de persecución
        if (this.x < playerX) {
            this.x += this.velocidad;
            this.frameY = 2; // Derecha
        } else if (this.x > playerX) {
            this.x -= this.velocidad;
            this.frameY = 1; // Izquierda
        }

        if (this.y < playerY) {
            this.y += this.velocidad;
            this.frameY = 0; // Abajo
        } else if (this.y > playerY) {
            this.y -= this.velocidad;
            this.frameY = 3; // Arriba
        }

        // Animación fluida
        this.frameX = (this.frameX + 0.2); 
        if (this.frameX >= 6) this.frameX = 0;
    }

    recibirDaño(cantidad) {
        this.vida -= cantidad;
        if (this.vida <= 0) {
            this.vida = 0;
            this.vivo = false;
        }
    }

    /**
     * Reduce la vida del enemigo 
     * @param {number} danio 
     */
    recibirDaño(daño) {
        this.vida -= daño;
        if (this.vida <= 0) {
            this.vida = 0;
            this.vivo = false;
        }
    }

    /**
     * Renderizado del componente visual
     */
    render() {
    if (!this.vivo) return null;

    const size = 100; 

    return (
        <View 
            key={this.id}
            style={{
                position: 'absolute',
                left: this.x,
                top: this.y,
                width: size, 
                height: size,
                overflow: 'hidden', // Corta el resto de la hoja
                zIndex: 40,
            }}
        >
            <Image
                source={this.spriteSheet}
                style={{
                    // Escalamos la imagen para que cada cuadro mida exactamente 'size'
                    width: size * 6, // 600px
                    height: size * 4, // 400px
                    marginLeft: -(Math.floor(this.frameX) * size),
                    marginTop: -(this.frameY * size),
                    tintColor: this.vida === 1 ? 'rgba(255,0,0,0.6)' : null,
                }}
                resizeMode="stretch"
            />
        </View>
    );
    }
}