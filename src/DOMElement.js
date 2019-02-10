class DOMElement {
  constructor() {
    this.children = [];
    this.dom = '';
  }

  get domCount() {
    return this._domCount(this);
  }

  _domCount(element) {
    if (element.children.length < 1) {
      return 1;
    }

    let total = 0;

    for (var i = 0, length = element.children.length; i < length; i++) {
      total += this._domCount(element.children[i]);
    }

    return total;
  }

  get childCount(){
    return this.children.length;
  }

  get child(index){
    return this.children[index];
  }

  render() {}

  addElement(element) {}
}