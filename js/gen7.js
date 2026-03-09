// gen7 widget object
var gen7 = (function () {

    // settings
    var s = {
        url: $('#gen7URL'),
        title: $('#gen7Title'),
        submit: $('#gen7Button'),
        output: $('#gen7Out')
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
        var title = s.title.val().trim();

        var code = '';

        code += '&lt;img ';
        code += 'src="&lt;?php echo htmlspecialchars($rad["' + url + '"]); ?&gt;" ';
        code += 'alt="&lt;?php echo htmlspecialchars($rad["' + title + '"]); ?&gt;" /&gt;';

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