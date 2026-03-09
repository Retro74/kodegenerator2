// gen13_2 widget object
var gen13_2 = (function () {

    // settings
    var s = {
        sessionName:   $('#gen13_2SessionName'),
        sessionValues: $('#gen13_2SessionValues'),
        fwd:           $('#gen13_2Fwd'),
        submit:        $('#gen13_2Button'),
        output:        $('#gen13_2Out')
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

        var sessionName   = s.sessionName.val().trim();
        var values        = s.sessionValues.val().split(',').map(function (v) { return v.trim(); });
        var fwd           = s.fwd.val().trim();

        var code = '';

        code += '&lt;?php\n';
        code += '<div class="phpComment">// Sjekk om økten "' + sessionName + '" har en av de gyldige verdiene: ' + values.join(', ') + '</div>\n';
        code += 'if (\n';
        code += values.map(function (v) {
            return '    $_SESSION["' + sessionName + '"] == "' + v + '"';
        }).join(' ||\n');
        code += '\n) {\n';
        code += '<div class="phpComment">    // Gyldig øktverdi - brukeren får tilgang</div>\n';
        code += '} else {\n';
        code += '<div class="phpComment">    // Ugyldig øktverdi - videresend brukeren til ' + fwd + '</div>\n';
        code += '    header("Location: ' + fwd + '");\n';
        code += '    exit();\n';
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