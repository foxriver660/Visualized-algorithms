export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next: Node<T> | null = null) {
    this.value = value;
    this.next = next;
  }
 }

interface ILinkedList<T> {
  append: (element: T) => void;
  /* insertInPosition: (element: T, position: number) => void; */
  getLength: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private length: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  prepend(value: any) {
    const newNode = new Node(value, this.head);

    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  append(value: any) {
    const newNode = new Node(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return this;
  }
  deleteTail() {
    if (!this.tail) {
      return null;
    }
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }
    let currentNode: any = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }
  deleteHead() {
    if (!this.head) {
      return null;
    }
    const deletedHead = this.head;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }
  fromArray(values: any) {
    values.forEach((value: any) => this.append(value));
    return this;
  }
  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }
  getLength() {
    return this.length;
  }
  isEmpty() {
    return this.length === 0;
  }
  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}
