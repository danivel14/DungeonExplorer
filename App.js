import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';

import { Dungeon } from './src/game/Dungeon';
import { Player } from './src/entities/Player';
import { Enemy } from './src/entities/Enemy';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [mazmorra] = useState(new Dungeon());
  const [jugador] = useState(new Player(100, 200, require('./assets/sprites/player.png')));
  const [salaActual, setSalaActual] = useState(mazmorra.obtenerSala("inicio"));
  const [tick, setTick] = useState(0);

  // Efecto de carga
  useEffect(() => {
    const aldeano = new NPC(
        "npc_01", 
        200, 150, 
        "Aldeano Kakariko", 
        require('./assets/sprites/Citizen1_Idle.png')
    );
    
    salaActual.npcs.add(aldeano); 
    setTick(t => t + 1);

    const slime = new Enemy(
      "enm_01", 
      250, 300, 
      require('./assets/sprites/enemy.png'), 
      2 // puntos de vida
    );
    salaActual.enemigos.add(slime); 
    
    setTick(t => t + 1); // Redibujar para mostrar al enemigo
  }, []);


  const manejarAccion = (dir) => {
    jugador.mover(dir, width, height);

    const listaEnemigos = salaActual.enemigos.toArray();
    listaEnemigos.forEach(enemigo => {
      enemigo.actualizarIA(jugador.x, jugador.y);
      
      // Si el enemigo está muy cerca del jugador, el jugador recibe daño
      const distancia = Math.sqrt(
        Math.pow(jugador.x - enemigo.x, 2) + Math.pow(jugador.y - enemigo.y, 2)
      );
      if (distancia < 40 && enemigo.vivo) {
        console.log("¡Daño recibido!");
        jugador.recibirDaño(1);
      }
      setTick(prev => prev + 1);

      setTimeout(() => {
        jugador.detener();
        setTick(prev => prev + 1);
      }, 200);
    });

    // cambio de sala (Grafo)
    if (jugador.x > width - 60 && salaActual.conexiones.length > 0) {
      const siguienteId = salaActual.conexiones[0]; 
      const nuevaSala = mazmorra.obtenerSala(siguienteId);
      if (nuevaSala) {
        setSalaActual(nuevaSala);
        jugador.x = 20; // Reposicionar jugador al inicio de la nueva sala
      }
    }

    // Actualizar Interfaz
    setTick(prev => prev + 1);
  };

  // Vista
  return (
    <View style={styles.container}>
      <ImageBackground source={salaActual.imagen} style={styles.mapa}>
        
        {/* Renderizado del Jugador (Método de la Clase) */}
        {jugador.render()}
        {salaActual.enemigos.toArray().map(enm => enm.render())}
        {salaActual.npcs.toArray().map(npc => npc.render())}

        {/* HUD (Menú Interactivo / Interfaz) */}
        <View style={styles.hud}>
          <Text style={styles.textoHud}>📍 {salaActual.nombre}</Text>
          <Text style={styles.textoHud}>❤️ Vida: {jugador.vida}</Text>
        </View>

        {/* CONTROLES (Joystick) */}
        <View style={styles.controles}>
          <TouchableOpacity 
            onPress={() => manejarAccion('up')} 
            style={styles.botonControl}
          >
            <Text style={styles.flecha}>▲</Text>
          </TouchableOpacity>
          
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity 
              onPress={() => manejarAccion('left')} 
              style={styles.botonControl}
            >
              <Text style={styles.flecha}>◀</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => manejarAccion('right')} 
              style={styles.botonControl}
            >
              <Text style={styles.flecha}>▶</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            onPress={() => manejarAccion('down')} 
            style={styles.botonControl}
          >
            <Text style={styles.flecha}>▼</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  mapa: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  hud: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffd700', 
  },
  textoHud: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  controles: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    alignItems: 'center',
  },
  botonControl: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 35,
    elevation: 5, 
  },
  flecha: {
    fontSize: 30,
    color: '#333',
  }
});