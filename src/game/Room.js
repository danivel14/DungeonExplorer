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
        this.items = new LinkedList();
    }

    agregarEnemigo(enemigo) {
        this.enemigos.add(enemigo);
    }
    
    agregarNPC(npc) {
    this.npcs.add(npc);
    }
    
    agregarItem(item) {
        this.items.add(item);
    }
}