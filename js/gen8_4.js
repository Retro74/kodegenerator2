// gen8_4 widget object
var gen8_4 = (function () {

    // settings
    var s = {
        sql: $('#gen8_4SQL'),
        PKOrigin: $('#gen8_4PKOrigin'),
        PKName: $('#gen8_4PKName'),
        fwd: $('#gen8_4Fwd'),
        submit: $('#gen8_4Button'),
        output: $('#gen8_4Out')
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

        var sqlTemplate = s.sql.val().trim();
        var pkOrigin    = s.PKOrigin.val().trim(); // POST / GET / SESSION
        var pkName      = s.PKName.val().trim();
        var fwd         = s.fwd.val().trim();

        var code = '';

        code += '&lt;?php\n';

        // POST-sjekk
        code += '<div class="phpComment">// Sjekk at forespørselen er POST</div>\n';
        code += 'if ($_SERVER["REQUEST_METHOD"] !== "POST") {\n';
        code += '    http_response_code(405);\n';
        code += '    die("Kun POST er tillatt.");\n';
        code += '}\n\n';

        // CSRF-sjekk
        code += '<div class="phpComment">// CSRF-validering</div>\n';
        code += 'if (!isset($_POST["csrf_token"]) || $_POST["csrf_token"] !== $_SESSION["csrf_token"]) {\n';
        code += '    http_response_code(403);\n';
        code += '    die("Ugyldig forespørsel.");\n';
        code += '}\n\n';

        // Prepared statement
        code += '<div class="phpComment">// Klargjør prepared statement</div>\n';
        code += '$stmt = $tilkobling->prepare(\n';
        code += '    "' + sqlTemplate + '"\n';
        code += ');\n\n';

        // bind_param: kun primærnøkkel
        code += '<div class="phpComment">// Bind primærnøkkel fra ' + pkOrigin + '</div>\n';
        code += '$stmt->bind_param("s", $_' + pkOrigin + '["' + pkName + '"]);\n\n';

        // Kjør
        code += '<div class="phpComment">// Kjør spørringen</div>\n';
        code += '$stmt->execute();\n';
        code += '$stmt->close();\n\n';

        // Redirect
        code += '<div class="phpComment">// Videresend brukeren etter kjøring</div>\n';
        code += 'header("Location: ' + fwd + '");\n';
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