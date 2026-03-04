// gen1 widgtet object
var gen1 = (function() {

    // settings
    var s = {
        user: $('#gen1User'),
        pass: $('#gen1Pass'),
        db: $('#gen1Db'),
        submit: $('#gen1Button'),
        output: $('#gen1Out')
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
        var formatedCode = '&lt?php<div class="phpComment">    //Databasetilkobling, med databaseplassering, brukernavn, passord og databasenavn </div>' +
            '    $tilkobling = new mysqli("localhost","' + s.user.val() + '","' + s.pass.val() + '","' + s.db.val() + '");\n' +
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
                
                