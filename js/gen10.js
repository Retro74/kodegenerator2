// gen9 widgtet object
var gen10 = (function() {

    // settings
    var s = {
        table: $('#gen10Table'),
		fields: $('#gen10Fields'),
		filterField: $('#gen10FilterField'),
		filter: $('#gen10Filter'),
		filterFieldType: $('#gen10FilterFieldType'),
		filterFieldValue: $('#gen10FilterFieldValue'),
		sortField: $('#gen10SortField'),
		sort: $('#gen10Sort'),
        submit: $('#gen10Button'),
        output: $('#gen10Out')
    };

    // self object
    var self = {};


    // bindings
    self.setupBindings = function() {
        s.submit.on('click', function() {
            self.generate();
        });
    };

    //handlers
    self.generate = function() {
		
		
      
        var formatedCode = 'SELECT ' + s.fields.val() + '\nFROM ' +s.table.val();
		
		if(s.filterField.val().length > 0 ) {
			 formatedCode += '\nWHERE ' + s.filterField.val() + ' ' +s.filter.val() + ' ';
			
			formatedCode += s.filterFieldValue.val();

		}
		
		if(s.sortField.val().length > 0 ) {
			 formatedCode += '\nORDER BY ' + s.sortField.val() + ' ' +s.sort.val() + ' ';
			
			
		}
        
        
        //clearing output
        s.output.html('');
        
        // adding output
        s.output.html(formatedCode);
    };
    

    // init
    self.init = function() {
        self.setupBindings();
    };

    // return self
    return self;
}());
                
                