// gen4_2_secure - Sikker versjon av PHP-kodegeneratoren
// Forbedringer:
//   - Prepared statements (MySQLi) istedenfor sprintf + real_escape_string
//   - htmlspecialchars() på all output (XSS-beskyttelse)
//   - CSRF-token-mekanisme
//   - POST istedenfor GET for alle skriveoperasjoner
//   - Konsistent OOP MySQLi-stil gjennomgående

var gen4_2 = (function () {

    // settings
    var s = {
        tabellNavn: $('#gen4_2tabellNavn'),
        fields: $('#gen4_2Fields'),
        pk_field: $('#gen4_2PK_Field'),
        chb_insert: $('#gen4_2chb_insert'),
        chb_update: $('#gen4_2chb_update'),
        chb_delete: $('#gen4_2chb_delete'),
        submit: $('#gen4_2Button'),
        output: $('#gen4_2Out')
    };

    var self = {};

    // -------------------------------------------------------
    // Hjelpefunksjoner
    // -------------------------------------------------------

    /**
     * Returnerer PHP-kode for CSRF-token-validering.
     * Forutsetter at siden starter session og at token er satt i $_SESSION['csrf_token'].
     * Denne for å verifisere at det er websiden selv som poster og ingen andre
     */
    function csrfCheck() {
        return [
            'if (!isset($_POST["csrf_token"]) || $_POST["csrf_token"] !== $_SESSION["csrf_token"]) {',
            '    http_response_code(403);',
            '    die("Ugyldig forespørsel. Manglende CSRF-token.");',
            '}',
            ''
        ].join('\n');
    }

    /**
     * Returnerer en streng med PHP-typebokstaver for prepared statement bind_param,
     * én 's' per felt.
     */
    function bindTypes(count) {
        return '"' + 's'.repeat(count) + '"';
    }

    // -------------------------------------------------------
    // Kodegenerering
    // -------------------------------------------------------

    self.generate = function () {
        var rawFields = s.fields.val();
        var fields = rawFields.split(',').map(function (f) { return f.trim(); });
        var tableName = s.tabellNavn.val().trim();
        var pkField = s.pk_field.val().trim();

        var code = '';

        // ---- PHP-åpning og session/CSRF-oppsett ----
        code += '&lt;?php\n';
        code += '<div class="phpComment">// Oppretter en CSRF-token for å verifisere at det er siden selv som sender</div>\n';
        code += 'if (empty($_SESSION["csrf_token"])) {\n';
        code += '    $_SESSION["csrf_token"] = bin2hex(random_bytes(32));\n';
        code += '}\n\n';

        // ---- INSERT ----
        if (s.chb_insert.is(':checked')) {
            code += '<div class="phpComment">// INSERT: Kjøres når skjema for ny rad sendes inn</div>\n';
            code += 'if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["command"]) && $_POST["command"] === "insert") {\n';
            code += '    ' + csrfCheck().split('\n').join('\n    ');
            code += '    $stmt = $tilkobling->prepare(\n';
            code += '        "INSERT INTO ' + tableName + ' (' + fields.join(', ') + ') VALUES (';
            code += fields.map(function () { return '?'; }).join(', ');
            code += ')"\n    );\n';
            code += '    $stmt->bind_param(' + bindTypes(fields.length) + ',\n';
            code += fields.map(function (f) { return '        $_POST["' + f + '"]'; }).join(',\n');
            code += '\n    );\n';
            code += '    $stmt->execute();\n';
            code += '    $stmt->close();\n';
            code += '}\n\n';
        }

        // ---- UPDATE ----
        if (s.chb_update.is(':checked')) {
            code += '<div class="phpComment">// UPDATE: Kjøres når en redigert rad sendes inn</div>\n';
            code += 'if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["command"]) && $_POST["command"] === "do_update") {\n';
            code += '    ' + csrfCheck().split('\n').join('\n    ');
            code += '    $stmt = $tilkobling->prepare(\n';
            code += '        "UPDATE ' + tableName + ' SET ';
            code += fields.map(function (f) { return f + ' = ?'; }).join(', ');
            code += ' WHERE ' + pkField + ' = ?"\n    );\n';
            // bind_param: alle felter + pk = n+1 s-er
            code += '    $stmt->bind_param(' + bindTypes(fields.length + 1) + ',\n';
            code += fields.map(function (f) { return '        $_POST["' + f + '"]'; }).join(',\n');
            code += ',\n        $_POST["' + pkField + '"]\n    );\n';
            code += '    $stmt->execute();\n';
            code += '    $stmt->close();\n';
            //code += '<div class="phpComment">// Redirect til visningsmodus etter lagring</div>\n';
            //code += '    header("Location: " . strtok($_SERVER["REQUEST_URI"], "?"));\n';
            //code += '    exit();\n';
            code += '}\n\n';
        }

        // ---- DELETE ----
        if (s.chb_delete.is(':checked')) {
            code += '<div class="phpComment">// DELETE: Kjøres når en rad skal slettes</div>\n';
            code += 'if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["command"]) && $_POST["command"] === "delete") {\n';
            code += '    ' + csrfCheck().split('\n').join('\n    ');
            code += '    $stmt = $tilkobling->prepare(\n';
            code += '        "DELETE FROM ' + tableName + ' WHERE ' + pkField + ' = ?"\n    );\n';
            code += '    $stmt->bind_param("s", $_POST["' + pkField + '"]);\n';
            code += '    $stmt->execute();\n';
            code += '    $stmt->close();\n';
            code += '}\n\n';
        }

        // ---- SELECT ----
        code += '<div class="phpComment">// SELECT: Henter alle rader fra tabellen</div>\n';
        code += '$sql_select = "SELECT ' + fields.join(', ') + ', ' + pkField + ' FROM ' + tableName + '";\n';
        code += '$datasett = $tilkobling->query($sql_select);\n\n';

        // ---- Hent GET-parametre for hvilken rad som redigeres ----
        code += '<div class="phpComment">// Hent hvilken rad som ev. er i redigeringsmodus (fra GET)</div>\n';
        code += '$edit_id = isset($_GET["edit_id"]) ? $_GET["edit_id"] : null;\n\n';

        code += '?>\n\n';

        // ---- HTML-tabell ----
        code += '<div class="phpComment">&lt;!-- HTML-tabell med data fra databasen --&gt;</div>\n';
        code += '&lt;table border="1"&gt;\n';
        code += '   &lt;thead&gt;\n';
        code += '   &lt;tr&gt;\n';

        // Kolonneoverskrifter
        fields.forEach(function (f) {
            var label = f.charAt(0).toUpperCase() + f.slice(1);
            code += '      &lt;th&gt;' + label + '&lt;/th&gt;\n';
        });
        if (s.chb_update.is(':checked')) code += '      &lt;th&gt;Rediger&lt;/th&gt;\n';
        if (s.chb_delete.is(':checked')) code += '      &lt;th&gt;Slett&lt;/th&gt;\n';
        code += '   &lt;/tr&gt;\n';
        code += '   &lt;/thead&gt;\n';
        code += '   &lt;tbody&gt;\n';

        // Løkke over rader
        code += '&lt;?php while ($rad = $datasett->fetch_assoc()) { ?&gt;\n';
        code += '   &lt;tr&gt;\n';

        // ---- Datafelt: vanlig visning eller redigeringsfelt ----
        fields.forEach(function (f) {
            if (s.chb_update.is(':checked')) {
                // Redigeringsmodus for denne raden
                code += '      &lt;?php if ($edit_id !== null && $rad["' + pkField + '"] == $edit_id) { ?&gt;\n';
                code += '         &lt;td&gt;\n';
                // Redigeringsskjema startes én gang (ved første felt)
                if (f === fields[0]) {
                    code += '         &lt;?php if ($rad["' + pkField + '"] == $edit_id) { ?&gt;\n';
                    code += '         &lt;form method="POST" action="&lt;?php echo($_SERVER["PHP_SELF"]) ?&gt;" &gt;\n';
                    code += '         &lt;input type="hidden" name="command" value="do_update"&gt;\n';
                    code += '         &lt;input type="hidden" name="' + pkField + '" value="&lt;?php echo htmlspecialchars($rad["' + pkField + '"]); ?&gt;"&gt;\n';
                    code += '         &lt;input type="hidden" name="csrf_token" value="&lt;?php echo $_SESSION[\'csrf_token\']; ?&gt;"&gt;\n';
                    code += '         &lt;?php } ?&gt;\n';
                }
                code += '            &lt;input type="text" name="' + f + '" value="&lt;?php echo htmlspecialchars($rad["' + f + '"]); ?&gt;"&gt;\n';
                code += '         &lt;/td&gt;\n';
                code += '      &lt;?php } else { ?&gt;\n';
                code += '         &lt;td&gt;&lt;?php echo htmlspecialchars($rad["' + f + '"]); ?&gt;&lt;/td&gt;\n';
                code += '      &lt;?php } ?&gt;\n';
            } else {
                code += '      &lt;td&gt;&lt;?php echo htmlspecialchars($rad["' + f + '"]); ?&gt;&lt;/td&gt;\n';
            }
        });

        // ---- Submit-knapp for update (etter siste felt) ----
        if (s.chb_update.is(':checked')) {
            code += '      &lt;td&gt;\n';
            code += '         &lt;?php if ($edit_id !== null && $rad["' + pkField + '"] == $edit_id) { ?&gt;\n';
            code += '            &lt;input type="submit" value="Lagre"&gt;\n';
            code += '            &lt;/form&gt;\n';
            code += '         &lt;?php } else { ?&gt;\n';
            code += '            &lt;a href="&lt;?php echo($_SERVER["REQUEST_URI"])?&gt;?edit_id=&lt;?php echo $rad["' + pkField + '"]; ?&gt;"&gt;Rediger&lt;/a&gt;\n';
            code += '         &lt;?php } ?&gt;\n';
            code += '      &lt;/td&gt;\n';
        }

        // ---- Slett-kolonne med POST-skjema ----
        if (s.chb_delete.is(':checked')) {
            code += '      &lt;td&gt;\n';
            code += '         &lt;form method="POST" onsubmit="return confirm(\'Er du sikker på at du vil slette denne raden?\');"&gt;\n';
            code += '            &lt;input type="hidden" name="command" value="delete"&gt;\n';
            code += '            &lt;input type="hidden" name="csrf_token" value="&lt;?php echo($_SESSION["csrf_token"]) ?&gt;" &gt;\n';
            code += '            &lt;input type="hidden" name="' + pkField + '" value="&lt;?php echo htmlspecialchars($rad["' + pkField + '"]); ?&gt;"&gt;\n';
            code += '            &lt;input type="hidden" name="csrf_token" value="&lt;?php echo $_SESSION[\'csrf_token\']; ?&gt;"&gt;\n';
            code += '            &lt;input type="submit" value="Slett"&gt;\n';
            code += '         &lt;/form&gt;\n';
            code += '      &lt;/td&gt;\n';
        }

        code += '   &lt;/tr&gt;\n';
        code += '&lt;?php } ?&gt;\n';

        // ---- INSERT-rad nederst i tabellen ----
        if (s.chb_insert.is(':checked')) {
            code += '\n<div class="phpComment">&lt;!-- Rad for å legge til nye data --&gt;</div>\n';
            code += '   &lt;tr&gt;\n';
            code += '   &lt;form method="POST"&gt;\n';
            code += '   &lt;input type="hidden" name="command" value="insert"&gt;\n';
            code += '   &lt;input type="hidden" name="csrf_token" value="&lt;?php echo $_SESSION[\'csrf_token\']; ?&gt;"&gt;\n';
            fields.forEach(function (f) {
                code += '      &lt;td&gt;\n';
                code += '         &lt;input type="text" name="' + f + '" placeholder="' + f + '"&gt;\n';
                code += '      &lt;/td&gt;\n';
            });
//            if (s.chb_update.is(':checked')) code += '      &lt;td&gt;&lt;/td&gt;\n';
//            if (s.chb_delete.is(':checked')) code += '      &lt;td&gt;&lt;/td&gt;\n';
            if (s.chb_update.is(':checked') && s.chb_delete.is(':checked')) {
            code += '      &lt;td colspan="2" &gt;&lt;input type="submit" value="Legg til"&gt;&lt;/td&gt;\n';
            }else if (s.chb_update.is(':checked') || s.chb_delete.is(':checked')){
            code += '      &lt;td&gt;&lt;input type="submit" value="Legg til"&gt;&lt;/td&gt;\n';

            }else{
            code += '      &lt;input type="submit" value="Legg til"&gt;\n';

            }
            
            code += '   &lt;/form&gt;\n';
            code += '   &lt;/tr&gt;\n';
        }

        code += '&lt;/tbody&gt;\n';
        code += '&lt;/table&gt;\n';

        // ---- Output ----
        s.output.html('');
        s.output.html(code);
    };

    // bindings
    self.setupBindings = function () {
        s.submit.on('click', function () {
            self.generate();
        });
    };

    // init
    self.init = function () {
        self.setupBindings();
    };

    return self;
}());
