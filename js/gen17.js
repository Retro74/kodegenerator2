// gen17 widget object
var gen17 = (function () {

    // settings
    var s = {
        submit: $('#gen17Button'),
        output: $('#gen17Out')
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
        code += '<div class="phpComment">// Skriver ut hele PHP-oppsettet på websiden</div>\n';
        code += '<div class="phpComment">// Legg merke til <strong>"Loaded Configuration File"</strong>,</div>\n';
        code += '<div class="phpComment">// at <strong>"output_buffering"</strong> bør stå til <strong>"4096"</strong></div>\n';
        code += '<div class="phpComment">// og at <strong>"session.auto_start"</strong> bør stå til <strong>"On"</strong></div>\n';
        code += '<div class="phpComment">// NB: Fjern denne filen fra produksjonsmiljø!</div>\n';
        code += 'phpinfo();\n';
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