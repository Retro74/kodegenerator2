// gen3_3 widget object
var gen3_3 = (function () {

    // settings
    var s = {
        sql:           $('#gen3_3SQL'),
        values:        $('#gen3_3Value'),
        hashtype:      $('#gen3_3HashType'),
        hashvalues:    $('#gen3_3HashValue'),
        hashedDBvalue: $('#gen3_3_DatabasefieldHashedValue'),
        submit:        $('#gen3_3Button'),
        output:        $('#gen3_3Out')
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

        var sqlTemplate   = s.sql.val().trim();
        var values        = s.values.val().split(',').map(function (v) { return v.trim(); }).filter(Boolean);
        var hashtype      = s.hashtype.val().trim();
        var hashvalues    = s.hashvalues.val().split(',').map(function (v) { return v.trim(); }).filter(Boolean);
        var hashedDBvalue = s.hashedDBvalue.val().trim();

        // bcrypt og argon2id bruker password_hash() / password_verify()
        var isModern = (hashtype === 'bcrypt' || hashtype === 'argon2id');

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
        code += '    die("Ugyldig forespørsel.  Manglende CSRF-token.");\n';
        code += '}\n\n';

        if (isModern) {
            // ---- bcrypt / argon2id: SELECT på ikke-hashede felter, deretter password_verify() ----

            code += '<div class="phpComment">// Prepared statement - hent rad basert på ikke-hashede felter</div>\n';
            code += '<div class="phpComment">// Passordet verifiseres etterpå med password_verify()</div>\n';
            code += '$stmt = $tilkobling->prepare(\n';
            code += '    "' + sqlTemplate + '"\n';
            code += ');\n';
            code += 'if (!$stmt) {\n';
            code += '    die("Prepare-feil: " . $tilkobling->error);\n';
            code += '}\n\n';

            if (values.length > 0) {
                var bindTypes = '"' + 's'.repeat(values.length) + '"';
                code += '<div class="phpComment">// Bind parametere fra POST-data</div>\n';
                code += '$stmt->bind_param(' + bindTypes + ',\n';
                code += values.map(function (v) { return '    $_POST["' + v + '"]'; }).join(',\n');
                code += '\n);\n\n';
            }

            code += '<div class="phpComment">// Kjør spørringen og hent datasett</div>\n';
            code += '$stmt->execute();\n';
            code += '$datasett = $stmt->get_result();\n';
            code += 'if (!$datasett) {\n';
            code += '    die("SQL-feil: " . $tilkobling->error);\n';
            code += '}\n\n';

            // password_verify: $_POST[formfelt] mot $rad[databasefelt]
            code += '<div class="phpComment">// Hent raden og verifiser passordet:</div>\n';
            code += '<div class="phpComment">// password_verify(passord fra form, hash fra database)</div>\n';
            code += '$rad = $datasett->fetch_assoc();\n';
            code += 'if ($rad && password_verify($_POST["' + hashvalues[0] + '"], $rad["' + hashedDBvalue + '"])) {\n';
            code += '<div class="phpComment">    // Gyldig - passord stemmer med lagret hash</div>\n';
            code += '    echo("Gyldig brukernavn og passord");\n';
            code += '} else {\n';
            code += '<div class="phpComment">    // Ugyldig - bruker ikke funnet eller feil passord</div>\n';
            code += '    echo("Ugyldig brukernavn eller passord");\n';
            code += '}\n';

        } else {
            // ---- md5 / sha256 / sha512: hash() direkte i bind_param ----
            var allFields = values.concat(hashvalues);
            var bindTypes = '"' + 's'.repeat(allFields.length) + '"';

            code += '<div class="phpComment">// Klargjør prepared statement</div>\n';
            code += '$stmt = $tilkobling->prepare(\n';
            code += '    "' + sqlTemplate + '"\n';
            code += ');\n';
            code += 'if (!$stmt) {\n';
            code += '    die("Prepare-feil: " . $tilkobling->error);\n';
            code += '}\n\n';

            var bindVars = values.map(function (v) { return '    $_POST["' + v + '"]'; });
            hashvalues.forEach(function (v) {
                bindVars.push('    hash("' + hashtype + '", $_POST["' + v + '"])');
            });

            code += '<div class="phpComment">// Bind parametere - vanlige felter og hashede felter fra POST</div>\n';
            code += '$stmt->bind_param(' + bindTypes + ',\n';
            code += bindVars.join(',\n');
            code += '\n);\n\n';

            code += '<div class="phpComment">// Kjør spørringen og hent datasett</div>\n';
            code += '$stmt->execute();\n';
            code += '$datasett = $stmt->get_result();\n';
            code += 'if (!$datasett) {\n';
            code += '    die("SQL-feil: " . $tilkobling->error);\n';
            code += '}\n';
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