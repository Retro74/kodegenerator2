// gen19 widgtet object
var gen19 = (function() {

    // settings
    var s = {
        submit: $('#gen19Button'),
        output: $('#gen19Out')
    };

    // self object
    var self = {};


    // bindings
    self.setupBindings = function() {
        s.submit.on('click', function() {
            self.generate();
        });
    };

    //handlers
    self.generate = function() {
        var formatedCode = '&lt?php\n'+
            '<div class="phpComment">    //Skriptet vil automatisk frigjøre resultatet og lukke MySQL-\n    //tilkoblingen når koden er ferdigkjørt,\n    //men dette er en riktige måten å gjøre det på</div>' +
            '    $datasett->free();\n' +
            '    $mysqli->close();\n' +
            '?&gt';

        s.output.html(formatedCode);
    };

    // init
    self.init = function() {
        self.setupBindings();
    };

    // return self
    return self;
}());
                
                