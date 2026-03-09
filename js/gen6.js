// gen6 widget object
var gen6 = (function () {

    // settings
    var s = {
        url: $('#gen6URL'),
        param: $('#gen6Param'),
        field: $('#gen6Field'),
        text: $('#gen6Text'),
        submit: $('#gen6Button'),
        output: $('#gen6Out')
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

        var url   = s.url.val().trim();
        var param = s.param.val().trim();
        var field = s.field.val().trim();
        var text  = s.text.val().trim();

        var code = '';

        code += '&lt;a href="' + url + '?' + param + '=&lt;?php echo htmlspecialchars($rad["' + field + '"]); ?&gt;"&gt;';
        code += text;
        code += '&lt;/a&gt;';

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