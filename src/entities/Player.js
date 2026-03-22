import React from 'react';
import { Image, View } from 'react-native'; 
import { Inventory } from '../systems/Inventory';

export class Player {
    constructor(x, y, spriteSheet) { 
        this.x = x;
        this.y = y;
        this.spriteSheet = spriteSheet; 
        this.frameWidth = 84;  
        this.frameHeight = 84; 
        this.frameX = 0; 
        this.frameY = 0; 
        this.vida = 3;
        this.inventario = new Inventory();
        this.estado = 'idle';
    }

    animar() {
        this.frameX = (this.frameX + 1) % 6; 
    }

    recibirDaño(cantidad) { 
        this.vida -= cantidad;
        if (this.vida < 0) this.vida = 0;
    }

    mover(dir, screenWidth, screenHeight) {
        this.estado = 'walk';
        const paso = 15; 

        if (dir === 'up') {
            this.y -= paso;
            this.frameY = 3; 
        }
        if (dir === 'down') {
            this.y += paso;
            this.frameY = 0; 
        }
        if (dir === 'left') {
            this.x -= paso;
            this.frameY = 1;
        }
        if (dir === 'right') {
            this.x += paso;
            this.frameY = 2; 
        }

        this.animar();

        if (this.x < -20) this.x = -20; // Permite salir un poco por la izquierda
        if (this.y < 0) this.y = 0;
        if (this.x > screenWidth - 40) this.x = screenWidth - 40; 
        
        if (this.y > screenHeight - this.frameHeight) this.y = screenHeight - this.frameHeight;
    }

    detener() {
        this.estado = 'idle';
        this.frameX = 0; 
    }

    render() {
    // Si por alguna razón la imagen no carga, que no se rompa la app
    if (!this.spriteSheet) return <View style={{position:'absolute', left:this.x, top:this.y, width:50, height:50, backgroundColor:'blue'}} />;

    return (
        <View 
            key="player_container"
            style={{
                position: 'absolute',
                left: this.x,
                top: this.y,
                width: 84, // Tamaño de la "ventana"
                height: 84,
                overflow: 'hidden', // Esto corta el resto de la hoja
                zIndex: 500, // Lo ponemos muy alto para que nada lo tape
                // backgroundColor: 'rgba(255,0,0,0.3)', // Puedes dejar esto para debug, luego quítalo
            }}
        >
            <Image
                source={this.spriteSheet}
                style={{
                    // IMPORTANTE: La imagen completa debe medir 84 * 6 de ancho y 84 * 4 de alto
                    width: 504, 
                    height: 336,
                    // Movemos la hoja para mostrar el cuadro correcto
                    marginLeft: -(this.frameX * 84),
                    marginTop: -(this.frameY * 84),
                }}
                resizeMode="stretch" 
            />
        </View>
    );
}
}