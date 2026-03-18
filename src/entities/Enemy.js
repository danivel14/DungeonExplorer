import React from 'react';
import { Image, View } from 'react-native';

export class Enemy {
    constructor(id, x, y, spriteSheet, vida = 2) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.spriteSheet = spriteSheet;
        this.frameWidth = 84; 
        this.frameHeight = 84;
        this.frameX = 0;
        this.frameY = 0; 
        this.vida = vida;
        this.vivo = true;
        this.velocidad = 1.5; 
    }

    actualizarIA(playerX, playerY) {
        if (!this.vivo) return;
        // movimiento + cambio de animación
        if (this.x < playerX) {
            this.x += this.velocidad;
            this.frameY = 2; // Mirar a la derecha
        } else if (this.x > playerX) {
            this.x -= this.velocidad;
            this.frameY = 1; // Mirar a la izquierda
        }

        if (this.y < playerY) {
            this.y += this.velocidad;
            this.frameY = 0; // Mirar abajo
        } else if (this.y > playerY) {
            this.y -= this.velocidad;
            this.frameY = 3; // Mirar arriba
        }

        this.frameX = (this.frameX + 1) % 6;
    }

    render() {
        if (!this.vivo) return null;
        return (
            <View key={this.id} style={{position: 'absolute', left: this.x, top: this.y, width: 60, height: 60, overflow: 'hidden' }}>
                <Image
                    source={this.spriteSheet}
                    style={{
                        marginLeft: -(this.frameX * this.frameWidth),
                        marginTop: -(this.frameY * this.frameHeight),
                        width: this.frameWidth * 6,
                        height: this.frameHeight * 4,
                        tintColor: this.vida === 1 ? 'red' : null, // Feedback de daño
                    }}
                />
            </View>
        );
    }
}