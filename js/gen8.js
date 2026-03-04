// gen8 widgtet object
var gen8 = (function() {

    // settings
    var s = {
        sql: $('#gen8SQL'),
        fields: $('#gen8Fields'),
        fwd: $('#gen8Fwd'),
        submit: $('#gen8Button'),
        output: $('#gen8Out')
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
      
        var formatedCode = '&lt?php\n<div class="phpComment">//Hvis det er en POST-back</div>if(isset($_POST["submit"]))\n{\n';
        formatedCode += '<div class="phpComment">//Lager SQL-spørringen</div>    $sql = sprintf("' + s.sql.val() + '",';
        var fields = s.fields.val().split(',');
        for (var i = 0; i < fields.length; i++) {
            fields[i] = fields[i].trim()
        }
        for(var i = 0; i < fields.length; i++){
            formatedCode += '\n        $tilkobling->real_escape_string($_POST["' + fields[i].trim() + '"])'
            if(i !== fields.length - 1)
                formatedCode += ',';
        }

        formatedCode += '\n    );\n\n<div class="phpComment">//Kjører spørringen mot databasen</div>    $tilkobling->query($sql);\n\n';


        if(s.fwd.val().length !== 0)
            formatedCode += '\n<div class="phpComment">//Videresender brukeren etter kjøring av SQLspørringen</div>    header("Location: ' + s.fwd.val() + '");\n    exit();\n';
        
        formatedCode += '}\n?&gt';
        
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
                
                