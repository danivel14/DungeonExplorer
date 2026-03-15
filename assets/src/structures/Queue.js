export class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty()) return "Underflow";
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    front() {
        return this.items[0];
    }
}

// Lógica de combate (ejemplo):
// let turno = new Queue();
// turno.enqueue("Jugador");
// turno.enqueue("Esqueleto");
// turno.enqueue("Murciélago");
// Al atacar: let atacanteActual = turno.dequeue(); 
// Y luego lo vuelves a encolar: turno.enqueue(atacanteActual);