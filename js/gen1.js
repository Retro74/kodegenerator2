// gen1 widget object
var gen1 = (function () {

    // settings
    var s = {
        user: $('#gen1User'),
        pass: $('#gen1Pass'),
        db: $('#gen1Db'),
        submit: $('#gen1Button'),
        output: $('#gen1Out')
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

        var user = s.user.val().trim();
        var pass = s.pass.val().trim();
        var db   = s.db.val().trim();

        var code = '';

        code += '&lt;?php\n';

        // Konfigurasjonsfil (anbefalt mønster)
        code += '<div class="phpComment">// Lagre tilkoblingsinformasjon i en egen konfigurasjonsfil\n';
        code += '// utenfor webroot, f.eks: /config/db_config.php</div>\n';
        code += '<div class="phpComment">// Innhold i konfigurasjonsfilen:</div>\n';
        code += '<div class="phpComment">// &lt;?php\n';
        code += '//     define("DB_HOST", "localhost");\n';
        code += '//     define("DB_USER", "' + user + '");\n';
        code += '//     define("DB_PASS", "' + pass + '");\n';
        code += '//     define("DB_NAME", "' + db + '");\n';
        code += '// ?&gt;</div>\n\n';

        // Include konfig og opprett tilkobling
        code += '<div class="phpComment">// Inkluder konfigurasjonsfilen</div>\n';
        code += 'require_once "/config/db_config.php";\n\n';

        code += '<div class="phpComment">// Opprett databasetilkobling</div>\n';
        code += '$tilkobling = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);\n\n';

        // Feilhåndtering
        code += '<div class="phpComment">// Sjekk at tilkoblingen var vellykket</div>\n';
        code += 'if ($tilkobling->connect_error) {\n';
        code += '    die("Tilkoblingsfeil: " . $tilkobling->connect_error);\n';
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