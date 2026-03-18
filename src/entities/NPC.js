import React from 'react';
import { Image, View, Text } from 'react-native';

export class NPC {
    constructor(id, x, y, nombre, spriteSheet) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.nombre = nombre;
        this.spriteSheet = spriteSheet;
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
            <View key={this.id} style={{ position: 'absolute', left: this.x, top: this.y, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 10, backgroundColor: 'rgba(0,0,0,0.5)', marginBottom: 2 }}>
                    {this.nombre}
                </Text>
                <View style={{ width: 50, height: 50, overflow: 'hidden' }}>
                    <Image
                        source={this.spriteSheet}
                        style={{
                            marginLeft: -(this.frameX * this.frameWidth),
                            marginTop: -(this.frameY * this.frameHeight),
                            width: this.frameWidth * 6,
                            height: this.frameHeight * 4,
                        }}
                    />
                </View>
            </View>
        );
    }
}