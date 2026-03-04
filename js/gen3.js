// gen3 widgtet object
var gen3 = (function() {

    // settings
    var s = {
        sql: $('#gen3SQL'),
        value: $('#gen3Value'),
        type: $('#gen3Type'),
        submit: $('#gen3Button'),
        output: $('#gen3Out')
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
            '$sql = sprintf("' + s.sql.val() + '",\n' +
            '    $tilkobling->real_escape_string($_' + s.type.val()  + '["' + s.value.val() + '"])\n    );\n' +
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
                
                