// Stacks and Queues Classes

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// Queues Class

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    // enqueue method
    enqueue(value) {
        let node = new Node(value);

        if (!this.first) {
            this.first = node;
            this.last = node;
          } else {
            this.last.next = node;
            this.last = node;
          }
          this.size++;
    }

    // dequeue method
    dequeue() {
        if (!this.first) throw new Error("Empty Queue!");

        let temp = this.first;

        if (this.first == this.last) {
          this.last = null;
        }
        this.first = this.first.next;
        this.size--;

        return temp.value;
    }

    // peek method
    peek() {
        return this.first.value;
    }

    // isEmpty method
    isEmpty() {
        return this.size === 0;
    }
}

// Stack Class

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    push(value) {
        let node = new Node(value);

        if(!this.first) {
            this.first = node;
            this.last = node;
        } else {
            let temp = this.first;

            this.first = node;
            this.first.next = temp;
        }

        this.size++;
    }

    pop() {
        if (!this.first) throw new Error("Empty Stack!");
    
        let temp = this.first;
    
        if (this.first == this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
    
        return temp.value;
    }
    
}

module.exports = Queue;