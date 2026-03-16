import React from 'react';
import { Image, Text, View } from 'react-native';

export class NPC {
    constructor(id, x, y, nombre, sprite) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.nombre = nombre;
        this.sprite = sprite;
        this.ancho = 50;
        this.alto = 50;
    }

    render() {
        return (
            <View key={this.id} style={{ position: 'absolute', left: this.x, top: this.y, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 10, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 4 }}>
                    {this.nombre}
                </Text>
                <Image
                    source={this.sprite}
                    style={{ width: this.ancho, height: this.alto }}
                />
            </View>
        );
    }
}