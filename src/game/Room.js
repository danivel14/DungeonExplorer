import { LinkedList } from '../structures/LinkedList';

export class Room {
    constructor(id, nombre, imagen, nota = null) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.nota = nota; // mensaje del padre
        this.conexiones = []; // IDs de salas conectadas
        this.enemigos = new LinkedList();
        this.npcs = new LinkedList();
    }

    agregarEnemigo(enemigo) {
        this.enemigos.add(enemigo);
    }
}