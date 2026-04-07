// gen1 widget object
var gen1 = (function() {

    // settings
    var s = {
        server: $('#gen1Server'),
        user:   $('#gen1User'),
        pass:   $('#gen1Pass'),
        db:     $('#gen1Db'),
        submit: $('#gen1Button'),
        output: $('#gen1Out')
    };

    // self object
    var self = {};

    // bindings
    self.setupBindings = function() {
        s.submit.on('click', function() {
            self.generate();
        });
    };

    // handlers
    self.generate = function() {
        var code = '';
        code += '&lt;?php\n';
        code += '<div class="phpComment">// Databasetilkobling – oppgitt server, brukernavn, passord og databasenavn.</div>';
        code += '    $tilkobling = new mysqli("' + s.server.val() + '", "' + s.user.val() + '", "' + s.pass.val() + '", "' + s.db.val() + '");\n';
        code += '<div class="phpComment">// SIKKERHET – passord i produksjon:</div>';
        code += '<div class="phpComment">// Ikke bruk standardpassordet til root i produksjon.</div>';
        code += '<div class="phpComment">// Sett eget <strong>!langt!</strong> passord  i phpMyAdmin: Brukere → root → Endre passord,</div>';
        code += '<div class="phpComment">// eller SQL-kommandoen: ALTER USER \'root\'@\'localhost\' IDENTIFIED BY \'NyttPassord\';</div>\n';
        code += '<div class="phpComment">// ADVARSEL - Denne filen inneholder brukernavn og passord i klartekst</div>';
        code += '<div class="phpComment">// Ikke publiser den til et sted hvor innholdet kan leses.</div>';
        code += '<div class="phpComment">// Tips: Legg til filens navn f.eks. "db_connect.php" i ".gitignore".</div>';
        code += '\n';
        code += '<div class="phpComment">// Sjekk om tilkoblingen feilet:</div>';
        code += '    if ($tilkobling->connect_error) {\n';
        code += '        error_log("Tilkoblingsfeil: " . $tilkobling->connect_error);\n';
        code += '        die("Kunne ikke koble til databasen.");\n';
        code += '    }\n';
        code += '?&gt;';

        // clearing output
        s.output.html('');

        // adding output
        s.output.html(code);
    };

    // init
    self.init = function() {
        self.setupBindings();
    };

    // return self
    return self;
}());
