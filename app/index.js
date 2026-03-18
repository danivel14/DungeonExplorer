import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Sprites } from '../constants/sprites';
import { GameStory } from '../constants/Story';
import { Player } from '../src/entities/Player';
import { Dungeon } from '../src/game/Dungeon';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [mostrarIntro, setMostrarIntro] = useState(true); 
  const [pasoStory, setPasoStory] = useState(0); 
  const [mazmorra] = useState(new Dungeon());
  
  // 1. Iniciamos el jugador (Lógica)
  const [jugador] = useState(new Player(150, 250, Sprites.player_idle));
  
  // 2. Iniciamos la posición (Vista) - ¡ESTO ES LO QUE MUEVE LA IMAGEN!
  const [pos, setPos] = useState({ x: 150, y: 250 });

  const [salaActual] = useState(mazmorra.obtenerSala("inicio"));

  const manejarAccion = (dir) => {
    // Movemos los datos en la clase
    jugador.mover(dir, width, height);

    // ACTUALIZAMOS EL ESTADO CON UNA COPIA NUEVA (Spread operator)
    // Esto obliga a React a redibujar sí o sí
    setPos({ x: jugador.x, y: jugador.y });

    console.log("Nueva posición en pantalla:", jugador.x, jugador.y);
  };

  if (mostrarIntro) {
    return (
      <ImageBackground source={GameStory[pasoStory].bg} style={styles.introBg}>
        <View style={styles.overlay}>
          <Text style={styles.tituloStory}>{GameStory[pasoStory].title}</Text>
          <Text style={styles.textoStory}>{GameStory[pasoStory].text}</Text>
          <TouchableOpacity onPress={() => pasoStory < GameStory.length - 1 ? setPasoStory(pasoStory + 1) : setMostrarIntro(false)} style={styles.botonNext}>
            <Text style={styles.textoBoton}>CONTINUAR</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={salaActual.imagen} style={styles.mapa}>
        
        {/* DEBUG: Si ves estos números cambiar en la pantalla, el problema es la imagen */}
        <View style={{position: 'absolute', top: 100, right: 20, backgroundColor: 'black'}}>
           <Text style={{color: 'lime'}}>X: {pos.x} Y: {pos.y}</Text>
        </View>

        {/* JUGADOR: Usamos transform para máxima compatibilidad */}
        <View style={[styles.playerContainer, { transform: [{ translateX: pos.x }, { translateY: pos.y }] }]}>
            <Image 
              source={Sprites.player_idle} 
              style={styles.playerImage} 
            />
        </View>

        <View style={styles.hud}>
          <Text style={styles.textoHud}>🏰 {salaActual.nombre} | ❤️ {jugador.vida}</Text>
        </View>

        {/* CONTROLES */}
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
  mapa: { flex: 1 },
  // Contenedor del jugador para usar transform
  playerContainer: {
    position: 'absolute',
    width: 80,
    height: 80,
    zIndex: 10,
  },
  playerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  hud: { position: 'absolute', top: 50, left: 20, backgroundColor: 'rgba(0,0,0,0.7)', padding: 10, borderRadius: 5, zIndex: 20 },
  textoHud: { color: 'white', fontWeight: 'bold' },
  controles: { position: 'absolute', bottom: 40, alignSelf: 'center', alignItems: 'center', zIndex: 30 },
  boton: { backgroundColor: 'white', width: 60, height: 60, justifyContent: 'center', alignItems: 'center', margin: 5, borderRadius: 30, elevation: 5 },
  flecha: { fontSize: 24, fontWeight: 'bold' },
  introBg: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  tituloStory: { fontSize: 28, color: 'gold', marginBottom: 20, textAlign: 'center' },
  textoStory: { color: 'white', textAlign: 'center', fontSize: 16 },
  botonNext: { marginTop: 30, backgroundColor: 'gold', padding: 15, borderRadius: 10 },
  textoBoton: { fontWeight: 'bold' }
});