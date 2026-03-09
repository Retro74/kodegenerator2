// gen10 widget object
var gen10 = (function () {

    // settings
    var s = {
        table:            $('#gen10Table'),
        fields:           $('#gen10Fields'),
        filterField:      $('#gen10FilterField'),
        filter:           $('#gen10Filter'),
        filterFieldType:  $('#gen10FilterFieldType'),
        filterFieldValue: $('#gen10FilterFieldValue'),
        sortField:        $('#gen10SortField'),
        sort:             $('#gen10Sort'),
        submit:           $('#gen10Button'),
        output:           $('#gen10Out')
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

        var code = '';

        code += 'SELECT ' + s.fields.val().trim();
        code += '\nFROM ' + s.table.val().trim();

        if (s.filterField.val().trim().length > 0) {
            code += '\nWHERE ' + s.filterField.val().trim();
            code += ' ' + s.filter.val().trim();
            code += ' ' + s.filterFieldValue.val().trim();
        }

        if (s.sortField.val().trim().length > 0) {
            code += '\nORDER BY ' + s.sortField.val().trim();
            code += ' ' + s.sort.val().trim();
        }

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