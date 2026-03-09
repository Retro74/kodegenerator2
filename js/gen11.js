// gen11 widget object
var gen11 = (function () {

    // settings
    var s = {
        valueOrigin:  $('#gen11ValueOrigin'),
        value:        $('#gen11value'),
        sessionName:  $('#gen11SessionName'),
        submit:       $('#gen11Button'),
        output:       $('#gen11Out')
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
        var code;

        if (s.valueOrigin.val() === 'value')
            code = self.generateValue();
        else
            code = self.generatePOSTGET();

        // Output
        s.output.html('');
        s.output.html(code);
    };

    // members
    self.generateValue = function () {
        var sessionName = s.sessionName.val().trim();
        var value       = s.value.val().trim();

        var code = '';
        code += '&lt;?php\n';
        code += '<div class="phpComment">// Setter en fast øktverdi (Session) som heter ' + sessionName + '</div>\n';
        code += '$_SESSION["' + sessionName + '"] = "' + value + '";\n';
        code += '?&gt;';

        return code;
    };

    self.generatePOSTGET = function () {
        var sessionName = s.sessionName.val().trim();
        var value       = s.value.val().trim();
        var origin      = s.valueOrigin.val().trim(); // $_POST / $_GET
        var method      = origin.substring(2);        // POST / GET

        var code = '';
        code += '&lt;?php\n';
        code += '<div class="phpComment">// Setter øktverdi (Session) som heter ' + sessionName + ', hentet fra HTTP-' + method + '</div>\n';
        code += '$_SESSION["' + sessionName + '"] = htmlspecialchars(' + origin + '["' + value + '"]);\n';
        code += '?&gt;';

        return code;
    };

    // init
    self.init = function () {
        self.setupBindings();
    };

    return self;
}());