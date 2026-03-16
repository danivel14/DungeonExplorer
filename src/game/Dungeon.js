import { Room } from './Room';
import { GameAssets } from '../constants/Sprites';
import { HashTable } from '../structures/HashTable';

export class Dungeon {
    constructor() {
        this.salas = new HashTable();
        this.generarMazmorra();
    }

    generarMazmorra() {
        const entrada = new Room("inicio", "Exterior del Castillo", GameAssets.world.exterior);
        const bosque = new Room("bosque", "Camino Real", GameAssets.world.exterior);

        const s1 = new Room("inicio", "Entrada", require('../../assets/images/entrada.png'));
        const s2 = new Room("pasillo", "Bosque de Hyrule", require('../../assets/images/pasillo.png'));

        s1.conexiones.push("pasillo");
        s2.conexiones.push("inicio");

        this.salas.put(s1.id, s1);
        this.salas.put(s2.id, s2);
    }

    obtenerSala(id) {
        return this.salas.get(id);
    }
}