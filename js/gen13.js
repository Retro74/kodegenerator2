// gen13 widget object
var gen13 = (function () {

    // settings
    var s = {
        sessionName:  $('#gen13SessionName'),
        sessionValue: $('#gen13SessionValue'),
        fwd:          $('#gen13Fwd'),
        submit:       $('#gen13Button'),
        output:       $('#gen13Out')
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

        var sessionName  = s.sessionName.val().trim();
        var sessionValue = s.sessionValue.val().trim();
        var fwd          = s.fwd.val().trim();

        var code = '';

        code += '&lt;?php\n';
        code += '<div class="phpComment">// Sjekk om økten "' + sessionName + '" har den gyldige verdien "' + sessionValue + '"</div>\n';
        code += 'if ($_SESSION["' + sessionName + '"] != "' + sessionValue + '") {\n';
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