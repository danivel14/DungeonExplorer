// src/entities/Player.js
import React from 'react';
import { Image } from 'react-native';
import { GameAssets } from '../../constants/sprites';

export class Player {
    constructor(x=-1250, y=-1650, sprite, width = 80, height = 80) {
        this.x = 50;
        this.y = 650;
        this.sprite = sprite;
        this.width = width;  
        this.height = height; 
        this.vida = 3;
        this.estado = 'idle';
    }

    mover(dir, w, h) {
        this.estado = 'walk'; 
        const paso = 25;
        if (dir === 'up') this.y -= paso;
        if (dir === 'down') this.y += paso;
        if (dir === 'left') this.x -= paso;
        if (dir === 'right') this.x += paso;
        // Limitar movimiento dentro de la pantalla
        if (this.x < 0) this.x = 0;
        if (this.y < 50) this.y = 50;
    }

    detener() {
        this.estado = 'idle'; 
    }

    render() {
        const spriteActual = this.estado === 'walk' 
            ? GameAssets.player.walk 
            : GameAssets.player.idle;

        return (
            <Image
                source={spriteActual}
                style={{
                    position: 'absolute',
                    left: this.x,
                    top: this.y,
                    width: this.width,
                    height: this.height,
                }}
            />
        );
    }
}