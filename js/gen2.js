// gen2 widget object
var gen2 = (function () {

    // settings
    var s = {
        sql: $('#gen2SQL'),
        submit: $('#gen2Button'),
        output: $('#gen2Out')
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

        var code = '';

        code += '&lt;?php\n';
        code += '<div class="phpComment">// SQL-spørringen</div>\n';
        code += '$sql = "' + sqlTemplate + '";\n\n';
        code += '<div class="phpComment">// Kjør spørringen og sett resultatet i datasettet</div>\n';
        code += '$datasett = $tilkobling->query($sql);\n\n';
        code += '<div class="phpComment">// Sjekk at spørringen var vellykket</div>\n';
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