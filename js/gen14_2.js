// gen14_2 widget object
var gen14_2 = (function () {

    // settings
    var s = {
        fwdURL: $('#gen14_2fwdURL'),
        submit: $('#gen14_2Button'),
        output: $('#gen14_2Out')
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

        var fwdURL = s.fwdURL.val().trim();

        var code = '';

        code += '&lt;?php\n';
        code += '<div class="phpComment">// Tøm alle øktvariable (logout)</div>\n';
        code += 'session_unset();\n\n';
        code += '<div class="phpComment">// Videresend brukeren etter utlogging</div>\n';
        code += 'header("Location: ' + fwdURL + '");\n';
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