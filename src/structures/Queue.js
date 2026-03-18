class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

/**
 * Queue: Sistema de mensajes y diálogos de Valtheria.
 */
export class Queue {
    constructor() {
        this.front = null; // salida
        this.back = null;  // entrada
        this.length = 0;
    }

    // Encolar: Agrega al final (O(1))
    enqueue(value) {
        const newNode = new Node(value);
        if (this.length === 0) {
            this.front = newNode;
            this.back = newNode;
        } else {
            this.back.next = newNode;
            this.back = newNode;
        }
        this.length++;
    }

    // Desencolar: Saca el primero (O(1))
    dequeue() {
        if (!this.front) return null;
        
        const temp = this.front;
        this.front = this.front.next;
        this.length--;
        
        if (this.length === 0) {
            this.back = null;
        }
        return temp.value;
    }

    isEmpty() {
        return this.length === 0;
    }

    peek() {
        return this.front ? this.front.value : null;
    }
}