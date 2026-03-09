// gen20 widget object
var gen20 = (function () {

    // settings
    var s = {
        datasetName: $('#gen20_datasetName'),
        submit:      $('#gen20Button'),
        output:      $('#gen20Out')
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

        var datasetName = s.datasetName.val().trim();

        var code = '';

        code += '&lt;?php\n';
        code += '<div class="phpComment">// Resett pekeren i datasettet til første rad</div>\n';
        code += '$' + datasetName + '->data_seek(0);\n';
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