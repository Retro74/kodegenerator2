// gen13_2 widgtet object
var gen13_2 = (function() {

    // settings
    var s = {
        sessionName: $('#gen13_2SessionName'),
        sessionValues: $('#gen13_2SessionValues'),
        fwd: $('#gen13_2Fwd'),
        submit: $('#gen13_2Button'),
        output: $('#gen13_2Out')
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
        var values = s.sessionValues.val().split(',');
        for (var i = 0; i < values.length; i++) {
            values[i] = values[i].trim()
        }
        var formatedCode = '&lt?php' +
            '<div class="phpComment">    //Sjekker om økten: "' + s.sessionName.val() + '", har noen av de gyldige verdiene "' + values + '".</div>' +
            '    if(';

        for (var i =0; i < values.length; i++) {
            formatedCode += '$_SESSION["' + s.sessionName.val() + '"] == "' + values[i] + '"';
            if(i+1 < values.length){
                formatedCode += ' || ';
            }


        }
        formatedCode += '){<div class="phpComment">     //OK, du kan være her </div>}\n else {' +
                '<div class="phpComment">     //Send brukeren ut </div>'+
            '        header("Location: ' + s.fwd.val() + '");\n    exit();\n' +
            '        }  \n'+
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
                
                