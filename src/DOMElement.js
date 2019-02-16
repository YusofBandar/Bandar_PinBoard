class DomElement {
  constructor() {
    this.children = [];
    this.dom = '{{child}}';
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

  child(index){
    return this.children[index];
  }

  render() {
    return this._render(this);
  }

  _render(element){
    

    let childDom = '';

    for(let i=0,length=element.children.length;i<length;i++){
      childDom += this._render(element.children[i]);
    }

    return element.dom.replace('{{child}}',childDom);

  }

  addElement(element) {}
}

