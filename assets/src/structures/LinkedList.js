class Node {
    constructor(data) {
        this.data = data; // El objeto (ej: "Llave Dorada")
        this.next = null;
    }
}

export class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Agregar un objeto al inventario
    add(item) {
        const newNode = new Node(item);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    // Listar todos para mostrar en pantalla
    toArray() {
        let items = [];
        let current = this.head;
        while (current) {
            items.push(current.data);
            current = current.next;
        }
        return items;
    }
}