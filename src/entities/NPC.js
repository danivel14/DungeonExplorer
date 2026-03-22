import React from 'react';
import { Image, View, Text } from 'react-native';

export class NPC {
    constructor(id, x, y, nombre, spriteSheet, dialogo ="") {
        this.id = id;
        this.x = x;
        this.y = y;
        this.nombre = nombre;
        this.spriteSheet = spriteSheet;
        this.dialogo = dialogo;
        this.frameWidth = 84;
        this.frameHeight = 84;
        this.frameX = 0;
        this.frameY = 0;
    }

    animar() {
        this.frameX = (this.frameX + 1) % 6;
    }

    render() {
        return (
        <View key={this.id} style={{ position: 'absolute', left: this.x, top: this.y, zIndex: 80 }}>
            <Text style={{ color: 'gold', fontSize: 10, textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                {this.nombre}
            </Text>
            <View style={{ width: 84, height: 84, overflow: 'hidden' }}>
                <Image
                    source={this.spriteSheet}
                    style={{
                        width: 504, 
                        height: 336,
                        marginLeft: -(Math.floor(this.frameX) * 84),
                        marginTop: -(this.frameY * 84),
                    }}
                />
            </View>
        </View>
        );
    }
}