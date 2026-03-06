// gen8_secure - Sikker versjon av SQL-kjører-generatoren
// Forbedringer:
//   - Prepared statements istedenfor sprintf + real_escape_string
//   - CSRF-token-validering
//   - POST-validering
//   - Valgfri redirect beholdt

var gen8 = (function () {

    // settings
    var s = {
        sql: $('#gen8SQL'),
        fields: $('#gen8Fields'),
        fwd: $('#gen8Fwd'),
        submit: $('#gen8Button'),
        output: $('#gen8Out')
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
        var sqlTemplate = s.sql.val().trim();
        var fwd = s.fwd.val().trim();

        var code = '';

        code += '&lt;?php\n';
        code += 'session_start();\n\n';

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

        // bind_param
        var bindTypes = '"' + 's'.repeat(fields.length) + '"';
        code += '<div class="phpComment">// Bind parametere fra POST-data</div>\n';
        code += '$stmt->bind_param(' + bindTypes + ',\n';
        code += fields.map(function (f) { return '    $_POST["' + f + '"]'; }).join(',\n');
        code += '\n);\n\n';

        // Kjør
        code += '<div class="phpComment">// Kjør spørringen</div>\n';
        code += '$stmt->execute();\n';
        code += '$stmt->close();\n\n';

        // Valgfri redirect
        if (fwd.length !== 0) {
            code += '<div class="phpComment">// Videresend brukeren etter kjøring</div>\n';
            code += 'header("Location: ' + fwd + '");\n';
            code += 'exit();\n';
        }

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