import { LinkedList } from '../structures/LinkedList';

/**
 * Clase Inventory: objetos recolectados por Kael.
*/
export class Inventory {
    constructor() {
        this.items = new LinkedList();
        this.capacidadMaxima = 10;
        this.cantidadActual = 0;
    }

    /**
     * Agrega un ítem al inventario si hay espacio.
     * @param {string} nombreItem 
     */

    agregarItem(nombreItem) {
        if (this.cantidadActual < this.capacidadMaxima) {
            this.items.add(nombreItem);
            this.cantidadActual++;
            console.log(`¡${nombreItem} guardado en el zurrón!`);
            return true;
        } else {
            console.log("Inventario lleno. ¡Manejo de errores!");
            return false;
        }
    }

    obtenerLista() {
        return this.items.toArray();
    }
}