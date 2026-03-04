// gen8_3 widgtet object
var gen8_4 = (function() {

    // settings
    var s = {
        sql: $('#gen8_4SQL'),
        PKOrigin: $('#gen8_4PKOrigin'),
        PKName:$('#gen8_4PKName'),
        fwd: $('#gen8_4Fwd'),
        submit: $('#gen8_4Button'),
        output: $('#gen8_4Out')
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
      
        var formatedCode = '&lt?php\n<div class="phpComment">//Lager SQL-spørringen</div>$sql = sprintf("' + s.sql.val() + '",';
        
        formatedCode += '\n        $tilkobling->real_escape_string(' + s.PKOrigin.val() + '["' + s.PKName.val() + '"])';

        formatedCode += '\n    );\n<div class="phpComment">//Kjører spørringen mot databasen</div>    $tilkobling->query($sql);\n\n';
    
        formatedCode += '<div class="phpComment">//Videresender brukeren etter kjøring av SQLspørringen</div>    header("Location: ' + s.fwd.val() + '");\n?&gt';
        

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
                
                