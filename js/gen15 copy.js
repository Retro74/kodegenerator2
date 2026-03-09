// gen12 widgtet object
var gen15 = (function() {

    // settings
    var s = {
        echoValue: $('#gen15value'),
        submit: $('#gen15Button'),
        output: $('#gen15Out')
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
        var formatedCode = '&lt?php \n' +
            '    echo("' + s.echoValue.val() + '");\n' +
            '?&gt';
        
        //clearing output
        s.output.html('');
        
        // adding output
        s.output.html(formatedCode);
    };
    
    // init
    self.init = function() {
        self.setupBindings();
    };

    // return self
    return self;
}());
                
                