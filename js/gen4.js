// gen4 widget object
var gen4 = (function () {

    // settings
    var s = {
        type: $('#gen4Type'),
        fields: $('#gen4Fields'),
        submit: $('#gen4Button'),
        output: $('#gen4Out')
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
        var fields = s.fields.val().split(',').map(function (f) { return f.trim(); });
        var code;

        if (s.type.val() === 'p')
            code = self.generateP(fields);
        else if (s.type.val() === 'td')
            code = self.generateTd(fields);
        else
            code = self.generateLi(fields);

        // Output
        s.output.html('');
        s.output.html(code);
    };

    // members
    self.generateP = function (fields) {
        var code = '';

        code += '<div class="phpComment">&lt;!-- For hver rad i datasettet lager PHP ett HTML-avsnitt\n';
        code += '     med feltene: ' + fields.join(', ') + ' --&gt;</div>\n';
        code += '&lt;?php while ($rad = $datasett->fetch_assoc()) { ?&gt;\n';
        code += '    &lt;p&gt;\n';

        fields.forEach(function (f) {
            code += '        ' + f + ': &lt;?php echo htmlspecialchars($rad["' + f + '"]); ?&gt; &lt;br /&gt;\n';
        });

        code += '    &lt;/p&gt;\n';
        code += '&lt;?php } ?&gt;';

        return code;
    };

    self.generateTd = function (fields) {
        var code = '';

        code += '<div class="phpComment">&lt;!-- For hver rad i datasettet lager PHP en rad i HTML-tabellen\n';
        code += '     med kolonner for feltene: ' + fields.join(', ') + ' --&gt;</div>\n';
        code += '&lt;table&gt;\n';
        code += '    &lt;thead&gt;\n';
        code += '    &lt;tr&gt;\n';

        fields.forEach(function (f) {
            code += '        &lt;th&gt;' + f.charAt(0).toUpperCase() + f.slice(1) + '&lt;/th&gt;\n';
        });

        code += '    &lt;/tr&gt;\n';
        code += '    &lt;/thead&gt;\n';
        code += '    &lt;tbody&gt;\n';
        code += '    &lt;?php while ($rad = $datasett->fetch_assoc()) { ?&gt;\n';
        code += '        &lt;tr&gt;\n';

        fields.forEach(function (f) {
            code += '            &lt;td&gt;&lt;?php echo htmlspecialchars($rad["' + f + '"]); ?&gt;&lt;/td&gt;\n';
        });

        code += '        &lt;/tr&gt;\n';
        code += '    &lt;?php } ?&gt;\n';
        code += '    &lt;/tbody&gt;\n';
        code += '&lt;/table&gt;';

        return code;
    };

    self.generateLi = function (fields) {
        var code = '';

        code += '<div class="phpComment">&lt;!-- For hver rad i datasettet lager PHP ett sett med kulepunkt\n';
        code += '     for feltene: ' + fields.join(', ') + ' --&gt;</div>\n';
        code += '&lt;ul&gt;\n';
        code += '    &lt;?php while ($rad = $datasett->fetch_assoc()) { ?&gt;\n';

        fields.forEach(function (f) {
            code += '        &lt;li&gt;&lt;?php echo htmlspecialchars($rad["' + f + '"]); ?&gt;&lt;/li&gt;\n';
        });

        code += '    &lt;?php } ?&gt;\n';
        code += '&lt;/ul&gt;';

        return code;
    };

    // init
    self.init = function () {
        self.setupBindings();
    };

    return self;
}());