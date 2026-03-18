import React from 'react';
import { Image, View } from 'react-native';

export class Item {
    constructor(id, nombre, x, y, sprite) {
        this.id = id;
        this.nombre = nombre;
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.recogido = false; 
        this.width = 40;
        this.height = 40;
    }

    render() {
    if (this.recogido) return null; 

        return (
        // Añadimos key={this.id} aquí
            <View key={this.id} style={{ position: 'absolute', left: this.x, top: this.y }}>
                <Image
                 source={this.sprite}
                    style={{ width: this.width, height: this.height }}
                />
            </View>
        );
    }
}