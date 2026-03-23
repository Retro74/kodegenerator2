// gen3_2 widget object
var gen3_2 = (function () {

    // settings
    var s = {
        sql: $('#gen3_2SQL'),
        values: $('#gen3_2Value'),
        type: $('#gen3_2Type'),
        submit: $('#gen3_2Button'),
        output: $('#gen3_2Out')
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
        var values = s.values.val().split(',').map(function (v) { return v.trim(); });
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
            code += '    die("Ugyldig forespørsel. Manglende CSRF-token.");\n';
            code += '}\n\n';
        }

        // Prepared statement
        code += '<div class="phpComment">// Klargjør prepared statement</div>\n';
        code += '$stmt = $tilkobling->prepare("' + sqlTemplate + '");\n';
        code += 'if (!$stmt) {\n';
        code += '    die("Prepare-feil: " . $tilkobling->error);\n';
        code += '}\n\n';

        // bind_param med én 's' per verdi
        var bindTypes = '"' + 's'.repeat(values.length) + '"';
        code += '<div class="phpComment">// Bind alle parametere fra ' + type + '-data</div>\n';
        code += '$stmt->bind_param(' + bindTypes + ',\n';
        code += values.map(function (v) { return '    $_' + type + '["' + v + '"]'; }).join(',\n');
        code += '\n);\n\n';

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