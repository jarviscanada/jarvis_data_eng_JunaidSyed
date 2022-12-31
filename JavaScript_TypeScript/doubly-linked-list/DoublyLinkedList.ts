class DLLNode<T> {
  value: T;
  next: DLLNode<T> | null;
  prev: DLLNode<T> | null;
  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList<T> {
  head: DLLNode<T> | null;

  constructor(value: T) {
    this.head = new DLLNode(value);
  }

  // add new node to end of list
  push(value: T): void {
    let newNode = new DLLNode(value);
    if (this.head == null) {
      this.head = newNode;
      return;
    }
    let currNode = this.head;
    while (currNode != null) {
      if (currNode.next == null) {
        currNode.next = newNode;
        newNode.prev = currNode;
        return;
      }
      currNode = currNode.next;
    }
  }

  // remove last node
  pop(): void {
    if (this.head == null) return;
    if (this.head.next == null && this.head.prev == null) {
      this.head = null;
      return;
    }
    let currNode = this.head;
    while (currNode != null) {
      if (currNode.next == null) {
        currNode.prev!.next = currNode.next;
        return;
      }
      currNode = currNode.next;
    }
  }

  //shift head of the list clockwise
  shift(position: number): void {
    if (position < 0) {
      console.log("Error: position >=0");
      return;
    }
    if (position == 0 || this.head == null) return;
    let lastNode = this.head;
    while (lastNode.next != null) lastNode = lastNode.next;
    this.head.prev = lastNode;
    lastNode.next = this.head;
    for (let i = 1; i <= position; i++) {
      this.head = this.head!.next;
      lastNode = lastNode.next!;
    }
    this.head!.prev = null;
    lastNode.next = null;
  }

  // shift head of the list counter clockwise
  unshift(position: number): void {
    if (position < 0) {
      console.log("Error: position >=0");
      return;
    }
    if (position == 0 || this.head == null) return;
    let lastNode = this.head;
    while (lastNode.next != null) lastNode = lastNode.next;
    this.head.prev = lastNode;
    lastNode.next = this.head;
    for (let i = 1; i <= position; i++) {
      this.head = this.head!.prev;
      lastNode = lastNode.prev!;
    }
    this.head!.prev = null;
    lastNode.next = null;
  }
}
