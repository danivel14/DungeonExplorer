// Implementación manual de Tabla Hash para el Grafo de Salas
export class HashTable {
    constructor(size = 50) {
        this.buckets = new Array(size);
    }

    // Función Hash simple: convierte el ID de la sala en un índice
    hash(key) {
        let total = 0;
        for (let i = 0; i < key.length; i++) {
            total += key.charCodeAt(i);
        }
        return total % this.buckets.length;
    }

    put(key, value) {
        const index = this.hash(key);
        if (!this.buckets[index]) this.buckets[index] = [];
        this.buckets[index].push([key, value]);
    }

    get(key) {
        const index = this.hash(key);
        if (!this.buckets[index]) return null;
        for (let pair of this.buckets[index]) {
            if (pair[0] === key) return pair[1];
        }
        return null;
    }
}