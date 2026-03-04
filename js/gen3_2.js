// gen3 widgtet object
var gen3_2 = (function() {

    // settings
    var s = {
        sql: $('#gen3_2SQL'),
        values: $('#gen3_2Value'),
        type: $('#gen3_2Type'),
        submit: $('#gen3_2Button'),
        output: $('#gen3_2Out')
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
        var formatedCode = '&lt?php<div class="phpComment">    //Spørring med parametre fra bruker </div>' +
            '    $sql = sprintf("' + s.sql.val() + '",\n';

        formatedCode +=
            '<div class="phpComment">    //Setter inn alle brukerverdier</div>';

        //Legg til alle brukerverdier
        var values = s.values.val().split(',');
        for (var i = 0; i < values.length; i++) {
            values[i] = values[i].trim()
        }
        for (var i =0; i < values.length; i++)
        {
            formatedCode +=
                '        $tilkobling->real_escape_string($_' + s.type.val()  +
                '["' + values[i] + '"])';
            if (i+1 < values.length)
            {
                formatedCode +=',';
            }
            formatedCode +='\n';
        }

        //Siste del
        formatedCode +=');\n' +
            '<div class="phpComment">    //Kjører spørringen mot databasen og resultatet settes i datasettet </div>' +
            '    $datasett = $tilkobling->query($sql);\n' +
            '?&gt';
        
        s.output.html(formatedCode);
    };

    // init
    self.init = function() {
        self.setupBindings();
    };

    // return self
    return self;
}());
                
                