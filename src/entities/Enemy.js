import React from 'react';
import { Image } from 'react-native';
import { GameAssets } from '../../constants/sprites';

/**
 * Clase Enemy: Representa a los oponentes en la mazmorra.
 * Sigue los principios de POO y manejo de estados internos.
 */
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
        this.width = 50;
        this.height = 50;
        this.sprite = sprite;
        this.vida = vida;
        this.vivo = true;
        this.velocidad = 2; // Velocidad del enemigo
    }

    /**
     * el enemigo se mueve lentamente hacia el jugador.
     * @param {number} playerX - Posición X del jugador
     * @param {number} playerY - Posición Y del jugador
     */
    actualizarIA(playerX, playerY) {
        if (!this.vivo) return;

        // Verificación de que las coordenadas sean números
        if (isNaN(playerX) || isNaN(playerY)) return;

        // Lógica de persecución simple
        if (this.x < playerX) this.x += this.velocidad;
        if (this.x > playerX) this.x -= this.velocidad;
        if (this.y < playerY) this.y += this.velocidad;
        if (this.y > playerY) this.y -= this.velocidad;
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
        if (!this.vivo) return null; // No dibujar si está muerto

        return (
            <Image
                key={this.id}
                source={this.sprite}
                style={{
                    position: 'absolute',
                    left: this.x,
                    top: this.y,
                    width: this.width,
                    height: this.height,
                    tintColor: this.vida === 1 ? 'red' : null, // Feedback visual de daño
                }}
            />
        );
    }
}