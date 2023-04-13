import { ElementStates } from "../../types/element-states";

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private item = { value: "", color: ElementStates.Default };
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(this.item);
  }

  enqueue = (item: T) => {
    if (this.getLength() >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    if (this.tail === 7) {
      this.container[this.tail % this.size] = item;
      this.tail = -1;
    }
    if (this.head < 7) {
      this.container[this.tail % this.size] = item;
      this.tail++;
    }
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = this.item as any;
    this.head++;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    return this.container[this.head];
  };
  getLength() {
    return this.tail - this.head;
  }
  getTail() {
    return this.tail;
  }
  getHead() {
    return this.head;
  }
  getContainer() {
    return this.container;
  }
  isFullQueue() {
    return this.tail === this.size;
  }
  reset() {
    this.container = Array(this.size).fill(this.item);
    this.head = 0;
    this.tail = 0;
  }
  isEmpty = () => this.getLength() === 0;
}
