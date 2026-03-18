import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';

// --- IMPORTACIÓN DE LÓGICA Y CONSTANTES ---
import { Dungeon } from '../src/game/Dungeon';
import { Player } from '../src/entities/Player';
import { Sprites } from '../constants/sprites';
import { GameStory } from '../constants/Story'; 
import { Combat } from '../src/systems/Combat';
import { MenuUI } from '../src/ui/MenuUI';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  // --- ESTADOS DE LA APLICACIÓN ---
  const [menuAbierto, setMenuAbierto] = useState(null); 
  const [mostrarIntro, setMostrarIntro] = useState(true); 
  const [pasoStory, setPasoStory] = useState(0); 
  const [tick, setTick] = useState(0); 

  const [mazmorra] = useState(new Dungeon());
  const [jugador] = useState(new Player(100, 420, Sprites.player_attack));
  const [salaActual, setSalaActual] = useState(mazmorra.obtenerSala("inicio"));

  // --- EFECTO INICIAL ---
  useEffect(() => {
    jugador.inventario.agregarItem("Brújula Antigua");
    setTick(t => t + 1);
  }, []);

  // --- LÓGICA DE NARRATIVA ---
  const siguienteHistoria = () => {
    if (pasoStory < GameStory.length - 1) {
      setPasoStory(pasoStory + 1);
    } else {
      setMostrarIntro(false); 
    }
  };

  // --- RECOLECCIÓN (LinkedList Manual) ---
  const revisarItems = () => {
    if (salaActual.items) {
      const listaItems = salaActual.items.toArray();
      listaItems.forEach(it => {
        if (!it.recogido) {
          const dx = jugador.x - it.x;
          const dy = jugador.y - it.y;
          const distancia = Math.sqrt(dx * dx + dy * dy);

          if (distancia < 50) {
            it.recogido = true;
            jugador.inventario.agregarItem(it.nombre);
            setTick(t => t + 1);
          }
        }
      });
    }
  };

  // --- COMBATE (Animación de Espadazo) ---
  const atacar = () => {
    if (menuAbierto) return;
    let frame = 0;
    const intervalo = setInterval(() => {
      jugador.frameX = frame;
      setTick(t => t + 1);
      frame++;
      if (frame >= 6) {
        clearInterval(intervalo);
        jugador.frameX = 0;
        setTick(t => t + 1);
      }
    }, 60);

    if (salaActual.enemigos) {
      salaActual.enemigos.toArray().forEach(enm => {
        Combat.verificarAtaque(jugador, enm);
      });
    }
  };

  // --- MOVIMIENTO Y EXPLORACIÓN ---
  const manejarAccion = (dir) => {
    if (menuAbierto) return;

    jugador.mover(dir, width, height);
    revisarItems();

    if (salaActual.enemigos) {
      salaActual.enemigos.toArray().forEach(enm => {
        enm.actualizarIA(jugador.x, jugador.y);
        Combat.verificarDanoJugador(jugador, enm); 
      });
    }

    if (jugador.x > width - 60 && salaActual.conexiones?.length > 0) {
      const siguienteId = salaActual.conexiones[0]; 
      const nuevaSala = mazmorra.obtenerSala(siguienteId);
      if (nuevaSala) {
        setSalaActual(nuevaSala);
        jugador.x = 30; 
      }
    }

    setTick(t => t + 1);
    setTimeout(() => {
      jugador.detener();
      setTick(t => t + 1);
    }, 200);
  };

  // --- RENDER: INTRODUCCIÓN ---
  if (mostrarIntro) {
    return (
      <ImageBackground 
        source={GameStory[pasoStory].bg} 
        style={styles.introBg} 
        resizeMode="cover" // CORRECCIÓN: Para que no se vea cuadriculado
        blurRadius={3}
      >
        <View style={styles.overlay}>
          <Text style={styles.tituloStory}>{GameStory[pasoStory].title}</Text>
          <View style={styles.cajaTexto}>
            <Text style={styles.textoStory}>{GameStory[pasoStory].text}</Text>
          </View>
          <TouchableOpacity onPress={siguienteHistoria} style={styles.botonNext}>
            <Text style={styles.textoBoton}>
              {pasoStory === GameStory.length - 1 ? "ENTRAR A VALTHERIA" : "CONTINUAR..."}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  // --- RENDER: JUEGO ---
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={salaActual.imagen} 
        style={styles.mapa}
        resizeMode="cover" // CORRECCIÓN: Para evitar el efecto de Tileset repetido
      >
        
        {/* ENTIDADES (POO) */}
        {jugador.render()}
        {salaActual.items?.toArray().map(it => it.render())}
        {salaActual.enemigos?.toArray().map(enm => enm.render())}
        {salaActual.npcs?.toArray().map(npc => npc.render())}

        {/* NARRATIVA EN SALA */}
        {salaActual.nota && (
          <View style={styles.cajaNota}>
            <Text style={styles.textoNota}>📜 {salaActual.nota}</Text>
          </View>
        )}

        {/* HUD */}
        <View style={styles.hud}>
          <Text style={styles.textoHud}>📍 {salaActual.nombre}</Text>
          <Text style={styles.textoHud}>🗺️ Mapeado: {salaActual.id === "corazon_aether" ? "100%" : "Explorando..."}</Text>
          <Text style={styles.textoHud}>❤️ Vida: {jugador.vida}</Text>
        </View>

        {/* BOTONES DE MENÚ */}
        <View style={styles.botonesExtra}>
            <TouchableOpacity onPress={() => setMenuAbierto('inventario')} style={styles.btnCircular}>
                <Text style={{fontSize: 20}}>🎒</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuAbierto('settings')} style={styles.btnCircular}>
                <Text style={{fontSize: 20}}>⚙️</Text>
            </TouchableOpacity>
        </View>

        {/* MODAL DEL MENÚ */}
        {menuAbierto && (
            <MenuUI 
                tipo={menuAbierto} 
                cerrar={() => setMenuAbierto(null)} 
                items={jugador.inventario.obtenerLista()}
            />
        )}

        {/* BOTÓN ATAQUE */}
        <TouchableOpacity onPress={atacar} style={styles.botonAtaque}>
           <Text style={{fontSize: 30}}>🗡️</Text>
        </TouchableOpacity>

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

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  mapa: { flex: 1, width: '100%', height: '100%' },
  hud: { 
    position: 'absolute', top: 50, left: 20, 
    backgroundColor: 'rgba(0,0,0,0.7)', padding: 10, 
    borderRadius: 8, borderWidth: 1, borderColor: 'gold' 
  },
  textoHud: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  controles: { position: 'absolute', bottom: 30, alignSelf: 'center', alignItems: 'center' },
  boton: { 
    backgroundColor: 'rgba(255,255,255,0.8)', width: 60, height: 60, 
    justifyContent: 'center', alignItems: 'center', margin: 4, borderRadius: 30 
  },
  flecha: { fontSize: 20 },
  introBg: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  overlay: { 
    flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', width: '100%', 
    justifyContent: 'center', alignItems: 'center', padding: 25 
  },
  tituloStory: { fontSize: 26, color: '#FFD700', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  cajaTexto: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#FFD700' },
  textoStory: { fontSize: 15, color: 'white', textAlign: 'center', lineHeight: 22 },
  botonNext: { marginTop: 30, backgroundColor: '#FFD700', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 5 },
  textoBoton: { fontWeight: 'bold', color: 'black' },
  cajaNota: {
    position: 'absolute', top: 150, left: 20, right: 20,
    backgroundColor: 'rgba(252, 245, 229, 0.95)', padding: 12,
    borderRadius: 5, borderWidth: 2, borderColor: '#8B4513'
  },
  textoNota: { color: '#3e2723', fontSize: 12, fontStyle: 'italic', textAlign: 'center' },
  botonAtaque: {
    position: 'absolute', bottom: 40, right: 20,
    backgroundColor: '#8B0000', width: 70, height: 70,
    borderRadius: 35, justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: 'white', elevation: 5
  },
  botonesExtra: { position: 'absolute', top: 50, right: 20, flexDirection: 'row' },
  btnCircular: {
    backgroundColor: 'rgba(255,255,255,0.9)', width: 45, height: 45,
    borderRadius: 22, justifyContent: 'center', alignItems: 'center',
    marginLeft: 8, borderWidth: 2, borderColor: 'gold'
  }
});