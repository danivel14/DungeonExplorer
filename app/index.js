import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Dimensions, ScrollView } from 'react-native';

import { Dungeon } from '../src/game/Dungeon';
import { Player } from '../src/entities/Player';
import { Sprites } from '../constants/sprites';
import { GameStory } from '../constants/Story'; 

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [mostrarIntro, setMostrarIntro] = useState(true); 
  const [pasoStory, setPasoStory] = useState(0); 
  const [mazmorra] = useState(new Dungeon());
  const [jugador] = useState(new Player(100, 200, Sprites.player_idle));
  const [salaActual, setSalaActual] = useState(mazmorra.obtenerSala("inicio"));
  const [tick, setTick] = useState(0);

  const siguienteHistoria = () => {
    if (pasoStory < GameStory.length - 1) {
      setPasoStory(pasoStory + 1);
    } else {
      setMostrarIntro(false); 
    }
  };

  // --- INTRODUCCIÓN ---
  if (mostrarIntro) {
    return (
      <ImageBackground source={GameStory[pasoStory].bg} style={styles.introBg} blurRadius={5}>
        <View style={styles.overlay}>
          <Text style={styles.tituloStory}>{GameStory[pasoStory].title}</Text>
          <View style={styles.cajaTexto}>
            <Text style={styles.textoStory}>{GameStory[pasoStory].text}</Text>
          </View>
          <TouchableOpacity onPress={siguienteHistoria} style={styles.botonNext}>
            <Text style={styles.textoBoton}>
              {pasoStory === GameStory.length - 1 ? "ENTRAR A LA MAZMORRA" : "CONTINUAR..."}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  // Movimiento
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
        {salaActual.nota && (
        <View style={styles.cajaNota}>
          <Text style={styles.textoNota}>📜 {salaActual.nota}</Text>
       </View>
      )}
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
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  mapa: { 
    flex: 1, 
    width: '100%', 
    height: '100%' 
  },
  hud: { 
    position: 'absolute', 
    top: 60, left: 20, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    padding: 10, 
    borderRadius: 5, 
    borderWidth: 1, 
    borderColor: 'gold' 
  },
  textoHud: { 
    color: 'white', 
    fontWeight: 'bold' 
  },
  controles: { 
    position: 'absolute', 
    bottom: 40, 
    alignSelf: 'center', 
    alignItems: 'center' 
  },
  boton: { 
    backgroundColor: 'rgba(255,255,255,0.8)', 
    width: 65, 
    height: 65, 
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: 5, 
    borderRadius: 35 
  },
  flecha: { 
    fontSize: 25 
  },
  introBg: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.7)', 
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  tituloStory: { 
    fontSize: 32, 
    color: '#FFD700', 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20,
    fontFamily: 'serif' 
  },
  cajaTexto: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD700'
  },
  textoStory: { 
    fontSize: 18, 
    color: 'white', 
    textAlign: 'center', 
    lineHeight: 28 
  },
  botonNext: { 
    marginTop: 40, 
    backgroundColor: '#FFD700', 
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    borderRadius: 5 
  },
  textoBoton: { 
    fontWeight: 'bold', 
    color: 'black' 
  },
  cajaNota: {
    position: 'absolute',
    top: 140, 
    left: 20,
    right: 20,
    backgroundColor: 'rgba(252, 245, 229, 0.9)', 
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#8B4513', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  textoNota: {
    color: '#3e2723', 
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    fontFamily: 'serif', 
    lineHeight: 20,
  }
});
