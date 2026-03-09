// genCSRF widget object
var genCSRF = (function () {

    // settings
    var s = {
        submit:     $('#genCSRFButton'),
        output:     $('#genCSRFOut')
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

        // ---- PHP-del: generer token ----
        code += '&lt;?php\n';
        code += '<div class="phpComment">// Generer CSRF-token hvis det ikke finnes</div>';
        code += 'if (empty($_SESSION["csrf_token"])) {\n';
        code += '    $_SESSION["csrf_token"] = bin2hex(random_bytes(32));\n';
        code += '}\n';
        code += '?&gt;\n\n';

        // ---- HTML-skjema ----
        code += '<div class="phpComment">&lt;!-- HTML/PHP til skjult CSRF-token i form/skjema--&gt;</div>';
        code += '&lt;input type="hidden" name="csrf_token"\n';
        code += '      value="&lt;?php echo $_SESSION[\'csrf_token\']; ?&gt;"&gt;\n\n';


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