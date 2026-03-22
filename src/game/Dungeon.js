import { Sprites } from '../../constants/sprites';
import { HashTable } from '../structures/HashTable';
import { Enemy } from '../entities/Enemy'; 
import { NPC } from '../entities/NPC';

export class Dungeon {
    constructor() {
        this.salas = new HashTable();
        this.generarMazmorra();
    }

    generarMazmorra() {
        // --- SALA 1: ENTRADA ---
        const s1 = new Room(
            "inicio", 
            "Entrada a Valtheria", 
            Sprites.world.interior,
            "Kael, si lees esto, he bajado a las profundidades. El aire pesa aquí abajo... ten cuidado."
        );
        s1.agregarItem(new Item("pocion_1", "Poción Vida", 240, 680, Sprites.items.pocion));
        

        // --- SALA 2: CATACUMBAS ---
        const s2 = new Room(
            "catacumbas", 
            "Catacumbas del Abismo", 
            Sprites.world.tileset, 
            "Nota: ... hubo una batalla. ¡Cuidado con los enemigos!"
        );
        s2.agregarEnemigo(new Enemy("e1", 100, 680, Sprites.enemies.slime, 2));
        s2.agregarEnemigo(new Enemy("e2", 250, 680, Sprites.enemies.slime, 2));

        // --- SALA 3: CÁMARA DEL ALTAR ---
        const s3 = new Room(
            "altar", 
            "Cámara del Altar", 
            Sprites.world.catacumbas, 
            "¡Kael! Me has encontrado... El Corazón de Aether es un artefacto poderoso, pero peligroso. No lo uses a la ligera."
        );
        s3.agregarItem(new Item("pocion_2", "Poción Maná", 250, 670, Sprites.items.pocion2));

        const elias = new NPC(
            "elias", 
            80, 660, 
            "Elías (Tu Padre)", 
            Sprites.npcs.citizen2,
            "¡Kael! El Corazón de Aether está cerca.."
        );
        s3.npcs.add(elias); 

        // --- CONEXIONES ---
        s1.conexiones = [null, "catacumbas"];
        s2.conexiones = ["inicio", "altar"];
        s3.conexiones = ["catacumbas", null];

        this.salas.put(s1.id, s1);
        this.salas.put(s2.id, s2);
        this.salas.put(s3.id, s3);
    }

    obtenerSala(id) {
        return this.salas.get(id);
    }
}