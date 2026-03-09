// gen8_3 widgtet object
var gen8_3 = (function() {

    // settings
    var s = {
        sql: $('#gen8_3SQL'),
        fields: $('#gen8_3Fields'),
        PKName: $('#gen8_3PKName'),
        PKOrigin: $('#gen8_3PKOrigin'),
        PKValue:$('#gen8_3PKValue'),
        fwd: $('#gen8_3Fwd'),
        submit: $('#gen8_3Button'),
        output: $('#gen8_3Out')
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
        
        var fields = s.fields.val().split(',');
        for (var i = 0; i < fields.length; i++) {
            fields[i] = fields[i].trim()
        }
        for(var i = 0; i < fields.length; i++){
            formatedCode += '\n        $tilkobling->real_escape_string($_POST["' + fields[i].trim() + '"]),';
        }
        formatedCode += '\n        $tilkobling->real_escape_string(' + s.PKOrigin.val() + '["' + s.PKValue.val() + '"])';

        formatedCode += '\n    );\n\n\n<div class="phpComment">//Kjører spørringen mot databasen</div>    $tilkobling->query($sql);\n\n';
    
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
                
                