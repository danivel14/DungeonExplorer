import { Room } from './Room';
import { Sprites } from '../../constants/sprites'; 
import { HashTable } from '../structures/HashTable';
import { Enemy } from '../entities/Enemy'; 
import { Item } from '../entities/Item'; 

export class Dungeon {
    constructor() {
        this.salas = new HashTable();
        this.generarMazmorra();
    }

    generarMazmorra() {
        const s1 = new Room(
            "inicio", 
            "Entrada a Valtheria", 
            Sprites.world.pasillo, 
            "Kael, si lees esto, he bajado a las profundidades. El aire pesa aquí abajo... ten cuidado."
        );

        const s2 = new Room("catacumbas_1", "Pasillo de los Caídos", Sprites.world.pasillo);
        const s3 = new Room("cavernas_inicio", "Umbral de Ceniza", Sprites.world.crack);
        const s4 = new Room("cripta_dragon", "Guarida de Sombra", Sprites.world.exterior);
        const s5 = new Room("corazon_aether", "El Núcleo de Valtheria", Sprites.world.tileset);

        s1.agregarItem(new Item("pocion_1", "Poción Vida", 120, 550, Sprites.items.pocion));
        s1.agregarItem(new Item("pocion_2", "Poción Maná", 240, 550, Sprites.items.pocion2));

        // Conexiones y guardado en HashTable
        s1.conexiones.push("catacumbas_1");
        s2.conexiones.push("inicio");
        s2.conexiones.push("cavernas_inicio");
        s3.conexiones.push("cripta_dragon");
        s4.conexiones.push("corazon_aether");

        this.salas.put(s1.id, s1);
        this.salas.put(s2.id, s2);
        this.salas.put(s3.id, s3);
        this.salas.put(s4.id, s4);
        this.salas.put(s5.id, s5);

        // Enemigos
        s2.agregarEnemigo(new Enemy("skele_1", 200, 300, Sprites.enemies.slime, 2));
        s5.agregarEnemigo(new Enemy("boss", 150, 150, Sprites.enemies.fighter, 20));
    }

    obtenerSala(id) {
        return this.salas.get(id);
    }
}