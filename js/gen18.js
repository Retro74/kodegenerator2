// gen18 widget object
var gen18 = (function () {

    // settings
    var s = {
        submit: $('#gen18Button'),
        output: $('#gen18Out')
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

        var code = '';

        code += '&lt;?php\n';
        code += '<div class="phpComment">// Sjekk tilkoblingsfeil</div>\n';
        code += 'if ($tilkobling->connect_errno) {\n';
        code += '<div class="phpComment">    // Logg feilen på server - ikke vis detaljer til bruker</div>\n';
        code += '    error_log("Tilkoblingsfeil (" . $tilkobling->connect_errno . "): " . $tilkobling->connect_error);\n';
        code += '    die("En feil oppstod. Vennligst prøv igjen senere.");\n';
        code += '}\n\n';
        code += '<div class="phpComment">// Sjekk spørringsfeil</div>\n';
        code += 'if ($tilkobling->errno) {\n';
        code += '<div class="phpComment">    // Logg feilen på server - ikke vis detaljer til bruker</div>\n';
        code += '    error_log("Spørringsfeil (" . $tilkobling->errno . "): " . $tilkobling->error);\n';
        code += '    die("En feil oppstod. Vennligst prøv igjen senere.");\n';
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