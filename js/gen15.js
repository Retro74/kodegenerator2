// gen15 widget object
var gen15 = (function () {

    // settings
    var s = {
        echoValue: $('#gen15value'),
        submit:    $('#gen15Button'),
        output:    $('#gen15Out')
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

        var echoValue = s.echoValue.val().trim();

        var code = '';

        code += '&lt;?php\n';
        code += '<div class="phpComment">// Skriver ut verdien</div>\n';
        code += 'echo("' + echoValue + '");\n';
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