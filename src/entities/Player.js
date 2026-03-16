// src/entities/Player.js
import React from 'react';
import { Image } from 'react-native';
import { GameAssets } from '../constants/Sprites';

export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
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