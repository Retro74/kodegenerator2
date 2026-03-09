// gen18 widgtet object
var gen18 = (function() {

    // settings
    var s = {
        submit: $('#gen18Button'),
        output: $('#gen18Out')
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
        var formatedCode = '&lt?php\n'+
            '<div class="phpComment">    //Sjekker og viser om det er feil med tilkoblingen til databasen</div>' +
            '    if ($tilkobling->connect_errno)\n' +
            '        echo ("Failed to connect to MySQL: \n' +
            '         (" . $tilkobling->connect_errno . ")\n' +
            '         " . $tilkobling->connect_error);\n\n' +
            '<div class="phpComment">    //Sjekker og viser om det er noe feil med spørringen som kjøres mot databasen</div>' +
            '    if (mysqli_errno($tilkobling))\n' +
            '        echo ("Error in query, " . $sql . ",  execution, MySQL returns: \n' +
            '         (" . $tilkobling->errno . ")\n' +
            '         " . $tilkobling->error );\n' +
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
                
                