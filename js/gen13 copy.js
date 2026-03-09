// gen13 widgtet object
var gen13 = (function() {

    // settings
    var s = {
        sessionName: $('#gen13SessionName'),
        sessionValue: $('#gen13SessionValue'),
        fwd: $('#gen13Fwd'),
        submit: $('#gen13Button'),
        output: $('#gen13Out')
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
        var formatedCode = '&lt?php'+
            '<div class="phpComment">    //Sjekker om økten: "' + s.sessionName.val() + '", har den gyldige verdien "' + s.sessionValue.val()+ '".</div>' +
            '    if($_SESSION["' + s.sessionName.val() + '"] != "' + s.sessionValue.val()+ '") {' +
            '<div class="phpComment">       //Ugyldg øktverdi videresender brukeren til ' + s.fwd.val() + '.</div>'+
            '       header("Location: ' + s.fwd.val() + '");\n'+
            '       exit();}\n' +
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
                
                