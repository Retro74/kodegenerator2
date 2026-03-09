// gen20 widgtet object
var gen20 = (function() {

    // settings
    var s = {
        datasetName: $('#gen20_datasetName'),
        submit: $('#gen20Button'),
        output: $('#gen20Out')
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
        var formatedCode = '&lt?php \n' +
            '   mysqli_data_seek(' + s.datasetName.val() + ', 0);\n' +
            '?&gt';
        
        
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
                
                