// gen3 widget object
var gen3 = (function () {

    // settings
    var s = {
        sql: $('#gen3SQL'),
        value: $('#gen3Value'),
        type: $('#gen3Type'),
        submit: $('#gen3Button'),
        output: $('#gen3Out')
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

        var sqlTemplate = (s.sql.val() || '').trim();
        var field = (s.value.val() || '').trim();
        var type = s.type.val(); // POST / GET / SESSION

        var code = '';

        code += '&lt;?php\n';

        // CSRF-sjekk kun for POST
        if (type === 'POST') {
            code += '<div class="phpComment">// Sjekk at forespørselen er POST</div>\n';
            code += 'if ($_SERVER["REQUEST_METHOD"] !== "POST") {\n';
            code += '    http_response_code(405);\n';
            code += '    die("Kun POST er tillatt.");\n';
            code += '}\n\n';

            code += '<div class="phpComment">// CSRF-validering</div>\n';
            code += 'if (!isset($_POST["csrf_token"]) || $_POST["csrf_token"] !== $_SESSION["csrf_token"]) {\n';
            code += '    http_response_code(403);\n';
            code += '    die("Ugyldig forespørsel.");\n';
            code += '}\n\n';
        }

        // Prepared statement
        code += '<div class="phpComment">// Klargjør prepared statement</div>\n';
        code += '$stmt = $tilkobling->prepare("' + sqlTemplate + '");\n';
        code += 'if (!$stmt) {\n';
        code += '    die("Prepare-feil: " . $tilkobling->error);\n';
        code += '}\n\n';

        // bind_param
        code += '<div class="phpComment">// Bind parameter fra ' + type + '-data</div>\n';
        code += '$stmt->bind_param("s", $_' + type + '["' + field + '"]);\n\n';

        // Kjør og hent resultat
        code += '<div class="phpComment">// Kjør spørringen og hent datasett</div>\n';
        code += '$stmt->execute();\n';
        code += '$datasett = $stmt->get_result();\n';
        code += 'if (!$datasett) {\n';
        code += '    die("SQL-feil: " . $tilkobling->error);\n';
        code += '}\n';
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