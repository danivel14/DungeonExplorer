import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';

import { Dungeon } from '../src/game/Dungeon';
import { Player } from '../src/entities/Player';
import { Sprites } from '../constants/sprites';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [mazmorra] = useState(new Dungeon());
  const [jugador] = useState(new Player(100, 200, Sprites.player_idle));
  const [salaActual, setSalaActual] = useState(mazmorra.obtenerSala("inicio"));
  const [tick, setTick] = useState(0);

  // 3. Función de Movimiento
  const manejarAccion = (dir) => {
    // Mover jugador usando su clase
    jugador.mover(dir, width, height);
    if (salaActual.enemigos) {
        salaActual.enemigos.toArray().forEach(enm => {
            enm.actualizarIA(jugador.x, jugador.y);
        });
    }

    setTick(prev => prev + 1);

    setTimeout(() => {
        if (jugador.detener) jugador.detener();
        setTick(prev => prev + 1);
    }, 200);
  };

  return (
    <View style={styles.container}>
      {/* Fondo de la sala actual */}
      <ImageBackground source={salaActual.imagen} style={styles.mapa}>
        
        {/* Render del Jugador */}
        {jugador.render()}

        {/* Render de Enemigos y NPCs */}
        {salaActual.enemigos && salaActual.enemigos.toArray().map(enm => enm.render())}
        {salaActual.npcs && salaActual.npcs.toArray().map(npc => npc.render())}

        {/* Interfaz (HUD) */}
        <View style={styles.hud}>
          <Text style={styles.textoHud}>🏰 {salaActual.nombre}</Text>
          <Text style={styles.textoHud}>❤️ Vida: {jugador.vida}</Text>
        </View>

        {/* Controles */}
        <View style={styles.controles}>
          <TouchableOpacity onPress={() => manejarAccion('up')} style={styles.boton}><Text style={styles.flecha}>▲</Text></TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => manejarAccion('left')} style={styles.boton}><Text style={styles.flecha}>◀</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => manejarAccion('right')} style={styles.boton}><Text style={styles.flecha}>▶</Text></TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => manejarAccion('down')} style={styles.boton}><Text style={styles.flecha}>▼</Text></TouchableOpacity>
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  mapa: { flex: 1, width: '100%', height: '100%' },
  hud: { position: 'absolute', top: 60, left: 20, backgroundColor: 'rgba(0,0,0,0.6)', padding: 10, borderRadius: 5, borderWidth: 1, borderColor: 'gold' },
  textoHud: { color: 'white', fontWeight: 'bold' },
  controles: { position: 'absolute', bottom: 40, alignSelf: 'center', alignItems: 'center' },
  boton: { backgroundColor: 'rgba(255,255,255,0.8)', width: 65, height: 65, justifyContent: 'center', alignItems: 'center', margin: 5, borderRadius: 35 },
  flecha: { fontSize: 25 }
});