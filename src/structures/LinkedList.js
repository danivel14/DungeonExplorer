class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export class LinkedList {
    constructor() {
        this.head = null;
    }

    toArray() {
    let arr = [];
    let curr = this.head;
    while(curr) {
        arr.push(curr.value);
        curr = curr.next;
    }
    return arr;
}

    add(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) current = current.next;
            current.next = newNode;
        }
    }
}