const DomElement = require('./DomElement');
const HeaderElement = require('./HeaderElement');

let domEl = new DomElement();
let header = new HeaderElement('hello');



console.log(header.render());