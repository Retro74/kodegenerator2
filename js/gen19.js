// gen19 widget object
var gen19 = (function () {

    // settings
    var s = {
        submit: $('#gen19Button'),
        output: $('#gen19Out')
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
        code += '<div class="phpComment">// Skriptet frigjør automatisk ressurser når koden er ferdigkjørt,\n';
        code += '// men dette er den korrekte måten å gjøre det på eksplisitt</div>\n';
        code += '$datasett->free();\n';
        code += '$tilkobling->close();\n';
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