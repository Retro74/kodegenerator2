// gen2 widgtet object
var gen2 = (function() {

    // settings
    var s = {
        sql: $('#gen2SQL'),
        submit: $('#gen2Button'),
        output: $('#gen2Out')
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
        var formatedCode = '&lt?php\n<div class="phpComment">    //SQL-spørringen </div>' +
            '    $sql = "' + s.sql.val() + '";\n' +
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
                
                