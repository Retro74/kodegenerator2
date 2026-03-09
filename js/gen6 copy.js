// gen6 widgtet object
var gen6 = (function() {

    // settings
    var s = {
        url: $('#gen6URL'),
        param: $('#gen6Param'),
        field: $('#gen6Field'),
        text: $('#gen6Text'),
        submit: $('#gen6Button'),
        output: $('#gen6Out')
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
      
        var formatedCode = '&lta href="' + s.url.val() + '?' + s.param.val() + '=&lt?php echo $rad["' + s.field.val() + '"];?&gt"&gt' + s.text.val() + '&lt/a&gt';
        
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
                
                