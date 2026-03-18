/**
 * Nodo para la Pila
 */
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

/**
 * Stack: Implementación manual
 */
export class Stack {
    constructor() {
        this.top = null; // El último elemento en entrar es el primero en salir
        this.length = 0;
    }

    // Push: Apilar un elemento arriba (O(1))
    push(value) {
        const newNode = new Node(value);
        if (!this.top) {
            this.top = newNode;
        } else {
            newNode.next = this.top;
            this.top = newNode;
        }
        this.length++;
    }

    // Pop: Retirar el elemento de arriba (O(1))
    pop() {
        if (!this.top) return null;
        
        const temp = this.top;
        this.top = this.top.next;
        this.length--;
        return temp.value;
    }

    // Peek: Ver qué hay en la cima sin quitarlo
    peek() {
        return this.top ? this.top.value : null;
    }

    isEmpty() {
        return this.length === 0;
    }
}