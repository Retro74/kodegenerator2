// gen5 widget object
var gen5 = (function () {

    // settings
    var s = {
        ex: $('#gen5Exception'),
        fields: $('#gen5Fields'),
        submit: $('#gen5Button'),
        output: $('#gen5Out')
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
        var fields = s.fields.val().split(',').map(function (f) { return f.trim(); });
        var exception = s.ex.val().trim();

        var code = '';

        code += '&lt;?php if ($rad = $datasett->fetch_assoc()) { ?&gt;\n';

        fields.forEach(function (f) {
            code += '    ' + f + ': &lt;?php echo htmlspecialchars($rad["' + f + '"]); ?&gt;\n';
        });

        if (exception.length !== 0) {
            code += '&lt;?php } else { ?&gt;\n';
            code += '    &lt;p&gt;' + exception + '&lt;/p&gt;\n';
        }

        code += '&lt;?php } ?&gt;';

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