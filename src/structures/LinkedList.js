class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
export class LinkedList {
    constructor() { this.head = null; }
    add(value) {
        const newNode = new Node(value);
        if (!this.head) this.head = newNode;
        else {
            let curr = this.head;
            while (curr.next) curr = curr.next;
            curr.next = newNode;
        }
    }
    toArray() {
        let arr = [];
        let curr = this.head;
        while (curr) { arr.push(curr.value); curr = curr.next; }
        return arr;
    }
}