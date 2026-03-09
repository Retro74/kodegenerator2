// gen12 widget object
var gen12 = (function () {

    // settings
    var s = {
        sessionName: $('#gen12SessionName'),
        submit:      $('#gen12Button'),
        output:      $('#gen12Out')
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

        var sessionName = s.sessionName.val().trim();

        var code = '';

        code += '&lt;?php\n';
        code += '<div class="phpComment">// Skriver ut en øktverdi (Session) som heter ' + sessionName + '</div>\n';
        code += 'echo htmlspecialchars($_SESSION["' + sessionName + '"]);\n';
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