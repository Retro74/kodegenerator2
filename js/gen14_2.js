// gen12 widgtet object
var gen14_2 = (function() {

    // settings
    var s = {
        fwdURL: $('#gen14_2fwdURL'),
        submit: $('#gen14_2Button'),
        output: $('#gen14_2Out')
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
        var formatedCode =
            '&lt?php \n' +
            '    session_unset(); \n' +
            '    header("location: ' + s.fwdURL.val() + '");\n' +
            '    exit();\n' +
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
                
                