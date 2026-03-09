// gen5 widgtet object
var gen5_2 = (function() {

    // settings
    var s = {
        fwd1: $('#gen5_2Fwd1'),
        fwd2: $('#gen5_2Fwd2'),
        submit: $('#gen5_2Button'),
        output: $('#gen5_2Out')
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
        var formatedCode = '&lt?php \n ' +
            '<div class="phpComment">    //Sjekker om spørringen gir et resultat</div>' +
            '    if($rad = mysqli_fetch_array($datasett)) {\n' +
            '<div class="phpComment">        //Spørringen gir et resultat</div>' +
            '        header("Location: ' + s.fwd1.val() + '");\n        exit();' +
            '} \n    else {\n' +
            '<div class="phpComment">        //Spørringen gir ikke et resultat</div>' +
            '        header("Location: ' + s.fwd2.val() + '");\n        exit();}' +
            '\n?&gt';
        
        
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
                
                