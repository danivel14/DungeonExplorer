import { LinkedList } from '../structures/LinkedList';

export class Room {
    constructor(id, nombre, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.conexiones = [];
        this.enemigos = new LinkedList();
        this.npcs = new LinkedList(); 
    }

    agregarEnemigo(enemigo) {
        this.enemigos.add(enemigo);
    }
}