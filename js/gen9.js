// gen9 widget object
var gen9 = (function () {

    // settings
    var s = {
        fields: $('#gen9Fields'),
        id: $('#gen9ID'),
        fk: $('#gen9FK'),
        submit: $('#gen9Button'),
        output: $('#gen9Out')
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

        var fields = s.fields.val().trim();
        var id     = s.id.val().trim();
        var fk     = s.fk.val().trim();

        var code = '';

        code += '&lt;select name="' + id + '"&gt;\n';
        code += '<div class="phpComment">// For hver rad i datasettet lager PHP ett valg i nedtrekkslisten</div>\n';
        code += '    &lt;?php while ($rad = $datasett->fetch_assoc()) { ?&gt;\n';
        code += '        &lt;option value="&lt;?php echo htmlspecialchars($rad["' + fk + '"]); ?&gt;"&gt;\n';
        code += '            &lt;?php echo htmlspecialchars($rad["' + fields + '"]); ?&gt;\n';
        code += '        &lt;/option&gt;\n';
        code += '    &lt;?php } ?&gt;\n';
        code += '&lt;/select&gt;';

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