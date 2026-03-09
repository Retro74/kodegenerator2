// gen14_1 widget object
var gen14_1 = (function () {

    // settings
    var s = {
        sessionName: $('#gen14_1sessionName'),
        submit:      $('#gen14_1Button'),
        output:      $('#gen14_1Out')
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
        code += '<div class="phpComment">// Sletter øktvariabelen "' + sessionName + '"</div>\n';
        code += 'unset($_SESSION["' + sessionName + '"]);\n';
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