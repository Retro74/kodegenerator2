// gen16 widget object
var gen16 = (function () {

    // settings
    var s = {
        fwdUrl: $('#gen16fwdUrl'),
        submit: $('#gen16Button'),
        output: $('#gen16Out')
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

        var fwdUrl = s.fwdUrl.val().trim();

        var code = '';

        code += '&lt;?php\n';
        code += '<div class="phpComment">// Videresend brukeren</div>\n';
        code += 'header("Location: ' + fwdUrl + '");\n';
        code += 'exit();\n';
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