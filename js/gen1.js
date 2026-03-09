// gen1 widget object
var gen1 = (function () {

    // settings
    var s = {
        user: $('#gen1User'),
        pass: $('#gen1Pass'),
        db: $('#gen1Db'),
        submit: $('#gen1Button'),
        output: $('#gen1Out')
    };

    var self = {};

    // bindings
    self.setupBindings = function () {
        s.submit.on('click', function () {
            self.generate();
        });
    };

    // handlers
    self.generate = function () {

        var user = s.user.val().trim();
        var pass = s.pass.val().trim();
        var db   = s.db.val().trim();

        var code = '';

        code += '&lt;?php\n';
        code += '<div class="phpComment">// Databasetilkobling med server, brukernavn, passord og databasenavn</div>\n';
        code += '$tilkobling = new mysqli("localhost", "' + user + '", "' + pass + '", "' + db + '");\n\n';
        code += '<div class="phpComment">// Sjekk at tilkoblingen var vellykket</div>\n';
        code += 'if ($tilkobling->connect_error) {\n';
        code += '    die("Tilkoblingsfeil: " . $tilkobling->connect_error);\n';
        code += '}\n';
        code += '?&gt;';

        // Output
        s.output.html('');
        s.output.html(code);
    };

    // init
    self.init = function () {
        self.setupBindings();
    };

    return self;
}());