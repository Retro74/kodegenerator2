// gen3 widgtet object
var gen3_3 = (function() {

    // settings
    var s = {
        sql: $('#gen3_3SQL'),
        values: $('#gen3_3Value'),
        hashtype: $('#gen3_3HashType'),
        hashvalues: $('#gen3_3HashValue'),
        submit: $('#gen3_3Button'),
        output: $('#gen3_3Out')
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
        var hashvalues = s.hashvalues.val().split(',');
        for (var i = 0; i < hashvalues.length; i++) {
            hashvalues[i] = hashvalues[i].trim()
        }

        for (var i =0; i < values.length; i++)
        {
            formatedCode +=
                '        $tilkobling->real_escape_string($_POST["' + values[i] + '"])';
            formatedCode +=',\n';
        }
        for (var i =0; i < hashvalues.length; i++)
        {
            formatedCode +=
                '        $tilkobling->real_escape_string(hash("' + s.hashtype.val() + '", $_POST["' + hashvalues[i] + '"]))';
            if (i+1 < hashvalues.length)
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
                
                