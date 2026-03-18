import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Sprites } from '../../constants/sprites';

export const MenuUI = ({ tipo, cerrar, items = [] }) => {
    const isInv = tipo === 'inventario';
    const offsetX = isInv ? -315 : -635; 

    return (
        <View style={styles.overlay}>
            <View style={styles.modal}>
                <View style={styles.crop}>
                    <Image source={isInv ? Sprites.ui_inventory : Sprites.ui_settings} 
                           style={{ width: 950, height: 600, marginLeft: offsetX }} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>{tipo.toUpperCase()}</Text>
                    {items.map((it, i) => <Text key={i} style={styles.it}>- {it}</Text>)}
                </View>
                <TouchableOpacity onPress={cerrar} style={styles.closeBtn} />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    overlay: { ...StyleSheet.absoluteFillObject, 
        backgroundColor: 'rgba(0,0,0,0.8)', 
        justifyContent: 'center', 
        alignItems: 'center', 
        zIndex: 2000 
    },
    modal: { 
        width: 310, 
        height: 340, 
        overflow: 'hidden' 
    },
    crop: { 
        position: 'absolute', 
        width: '100%', 
        height: '100%' 
    },
    content: { 
        flex: 1, 
        paddingTop: 60, 
        alignItems: 'center' 
    },
    title: { 
        fontWeight: 'bold', 
        color: '#2e7d32', 
        marginBottom: 10 
    },
    it: { 
        fontSize: 10, 
        color: '#3e2723' },
    closeBtn: { 
        position: 'absolute', 
        top: 15, 
        right: 15, 
        width: 40, 
        height: 40 
    }
});