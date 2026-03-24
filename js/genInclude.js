// genInclude widget object
var genInclude = (function() {

    // settings
    var s = {
        filnavn: $('#genInclude_filnavn'),
        type:    $('#genInclude_type'),
        submit:  $('#genIncludeButton'),
        output:  $('#genIncludeOut')
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
        var filnavn = s.filnavn.val().trim();
        var type    = s.type.val();

        var code = '';
        code += '&lt;?php\n';

        if (type === 'include') {
            code += '<div class="phpComment">// include() henter inn og kjører innholdet fra en annen PHP-fil.<br>';
            code += '// Anbefalt for mindre deler som kan inkluderes flere ganger.</div>';
            code += '   include("' + filnavn + '");\n';
        } else {
            code += '<div class="phpComment">// include_once() henter inn og kjører innholdet fra en annen PHP-fil en gang<br>';
            code += '// Hvis filen allerede er inkludert tidligere, hoppes den over.<br>';
            code += '// Anbefalt for filer som bl.a. oppretter databasetilkobling.</div>';
            code += '   include_once("' + filnavn + '");\n';
        }

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
