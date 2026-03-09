// gen5_2 widget object
var gen5_2 = (function () {

    // settings
    var s = {
        fwd1: $('#gen5_2Fwd1'),
        fwd2: $('#gen5_2Fwd2'),
        submit: $('#gen5_2Button'),
        output: $('#gen5_2Out')
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

        var fwd1 = s.fwd1.val().trim();
        var fwd2 = s.fwd2.val().trim();

        var code = '';

        code += '&lt;?php\n';
        code += '<div class="phpComment">// Sjekk om spørringen gir et resultat</div>\n';
        code += 'if ($rad = $datasett->fetch_assoc()) {\n';
        code += '<div class="phpComment">    // Spørringen gir et resultat - videresend</div>\n';
        code += '    header("Location: ' + fwd1 + '");\n';
        code += '    exit();\n';
        code += '} else {\n';
        code += '<div class="phpComment">    // Spørringen gir ikke et resultat - videresend</div>\n';
        code += '    header("Location: ' + fwd2 + '");\n';
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