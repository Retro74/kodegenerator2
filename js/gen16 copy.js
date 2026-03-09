// gen16 widgtet object
var gen16 = (function() {

    // settings
    var s = {
        fwdUrl: $('#gen16fwdUrl'),
        submit: $('#gen16Button'),
        output: $('#gen16Out')
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
            '    header("location: ' + s.fwdUrl.val() + '");\n    exit();\n' +
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
                
                