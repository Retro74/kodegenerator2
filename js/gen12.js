// gen12 widgtet object
var gen12 = (function() {

    // settings
    var s = {
        sessionName: $('#gen12SessionName'),
        submit: $('#gen12Button'),
        output: $('#gen12Out')
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
            '    <div class="phpComment">//Skriver ut en økyverdi (Session) som heter ' + s.sessionName.val() +'.</div>'+
            '    echo($_SESSION["' + s.sessionName.val() + '"]);\n' +
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
                
                