// gen12 widgtet object
var gen14_1 = (function() {

    // settings
    var s = {
        sessionName: $('#gen14_1sessionName'),
        submit: $('#gen14_1Button'),
        output: $('#gen14_1Out')
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
            '   unset($_SESSION["' + s.sessionName.val() + '"]);\n' +
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
                
                