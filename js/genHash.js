// genHash widget object
var genHash = (function () {

    // settings
    var s = {
        inputField: $('#genHashInputField'),
        hashtype:   $('#genHashType'),
        submit:     $('#genHashButton'),
        output:     $('#genHashOut')
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

        var inputField = s.inputField.val().trim();
        var hashtype   = s.hashtype.val().trim();

        if (!inputField) {
            s.output.html('<div class="phpComment">// Fyll inn navn på POST-feltet som skal hashes</div>');
            return;
        }

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

        // Tom-sjekk
        code += '<div class="phpComment">// Hent verdien fra POST-feltet og sjekk at den ikke er tom</div>\n';
        code += '$verdi = trim($_POST["' + inputField + '"] ?? "");\n';
        code += 'if ($verdi === "") {\n';
        code += '    die("Feltet kan ikke være tomt.");\n';
        code += '}\n\n';

        if (hashtype === 'argon2id') {

            code += '<div class="phpComment">// Hash med Argon2id (mest anbefalt for passord)</div>\n';
            code += '<div class="phpComment">// Inkluderer automatisk et tilfeldig salt</div>\n';
            code += '$hash = password_hash($verdi, PASSWORD_ARGON2ID);\n';
            code += 'echo($hash);\n';

        } else if (hashtype === 'bcrypt') {

            code += '<div class="phpComment">// Hash med bcrypt (anbefalt for passord)</div>\n';
            code += '<div class="phpComment">// Inkluderer automatisk et tilfeldig salt</div>\n';
            code += '$hash = password_hash($verdi, PASSWORD_BCRYPT);\n';
            code += 'echo($hash);\n';

        } else if (hashtype === 'sha512') {

            code += '<div class="phpComment">// Hash med SHA-512 – produserer 128 tegn lang hex-streng</div>\n';
            code += '<div class="phpComment">// NB: Ikke anbefalt for passord</div>\n';
            code += '$hash = hash("sha512", $verdi);\n';
            code += 'echo($hash);\n';

        } else if (hashtype === 'sha256') {

            code += '<div class="phpComment">// Hash med SHA-256 – produserer 64 tegn lang hex-streng</div>\n';
            code += '<div class="phpComment">// NB: Ikke anbefalt for passord</div>\n';
            code += '$hash = hash("sha256", $verdi);\n';
            code += 'echo($hash);\n';

        } else if (hashtype === 'md5') {

            code += '<div class="phpComment">// Hash med MD5 – produserer 32 tegn lang hex-streng</div>\n';
            code += '<div class="phpComment">// Advarsel: MD5 er kryptografisk svak og ikke anbefalt</div>\n';
            code += '$hash = hash("md5", $verdi);\n';
            code += 'echo($hash);\n';

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