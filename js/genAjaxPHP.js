// genAjaxPHP widget object
var genAjaxPHP = (function () {

    // settings
    var s = {
        tableName:    $('#genAjaxPHPTable'),
        lookupField:  $('#genAjaxPHPLookupField'),
        returnField:  $('#genAjaxPHPReturnField'),
        submit:       $('#genAjaxPHPButton'),
        output:       $('#genAjaxPHPOut')
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

        var tableName   = s.tableName.val().trim();
        var lookupField = s.lookupField.val().trim();
        var returnField = s.returnField.val().trim();

        var code = '';

        code += '&lt;?php\n';


        //Påminnelse om databaseconnection
        code += '<div class="phpComment">// Husk at du må legge til databaseconnection</div>\n\n';

        // POST-sjekk
        code += '<div class="phpComment">// Sjekk at forespørselen er POST</div>\n';
        code += 'if ($_SERVER["REQUEST_METHOD"] !== "POST") {\n';
        code += '    http_response_code(405);\n';
        code += '    die(json_encode(["feil" => "Kun POST er tillatt."]));\n';
        code += '}\n\n';

        // CSRF-sjekk
        code += '<div class="phpComment">// CSRF-validering</div>\n';
        code += 'if (!isset($_POST["csrf_token"]) || $_POST["csrf_token"] !== $_SESSION["csrf_token"]) {\n';
        code += '    http_response_code(403);\n';
        code += '    die(json_encode(["feil" => "Ugyldig forespørsel.  Manglende CSRF-token."]));\n';
        code += '}\n\n';

        // Sett JSON-header
        code += '<div class="phpComment">// Sett header til JSON slik at Ajax-kallet forstår svaret</div>\n';
        code += 'header("Content-Type: application/json; charset=utf-8");\n\n';

        // Hent POST-verdi
        code += '<div class="phpComment">// Hent søkeverdien fra POST</div>\n';
        code += '$sokeverdi = $_POST["' + lookupField + '"] ?? "";\n\n';

        // Tom verdi
        code += '<div class="phpComment">// Svar med funnet=false hvis søkeverdien er tom</div>\n';
        code += 'if (empty($sokeverdi)) {\n';
        code += '    echo json_encode(["funnet" => false]);\n';
        code += '    exit();\n';
        code += '}\n\n';

        // Prepared statement
        code += '<div class="phpComment">// Klargjør prepared statement</div>\n';
        code += '$stmt = $tilkobling->prepare(\n';
        code += '    "SELECT ' + returnField + ' FROM ' + tableName + ' WHERE ' + lookupField + ' = ?"\n';
        code += ');\n';
        code += 'if (!$stmt) {\n';
        code += '    echo json_encode(["feil" => "Prepare-feil: " . $tilkobling->error]);\n';
        code += '    exit();\n';
        code += '}\n\n';

        // bind og kjør
        code += '<div class="phpComment">// Bind søkeverdien og kjør spørringen</div>\n';
        code += '$stmt->bind_param("s", $sokeverdi);\n';
        code += '$stmt->execute();\n';
        code += '$datasett = $stmt->get_result();\n\n';

        // Svar med JSON
        code += '<div class="phpComment">// Svar med JSON - funnet eller ikke funnet</div>\n';
        code += 'if ($rad = $datasett->fetch_assoc()) {\n';
        code += '    echo json_encode([\n';
        code += '        "funnet"       => true,\n';
        code += '        "' + returnField + '" => htmlspecialchars($rad["' + returnField + '"])\n';
        code += '    ]);\n';
        code += '} else {\n';
        code += '    echo json_encode(["funnet" => false]);\n';
        code += '}\n\n';

        code += '$stmt->close();\n';
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
