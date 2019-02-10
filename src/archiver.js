let casper = require('casper').create();

casper.start('http://casperjs.org/');

casper.then(function(){
    log('first page: ', this.getTitle());
})




casper.run();