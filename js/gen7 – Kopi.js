// gen7 widgtet object
var gen7 = (function() {

    // settings
    var s = {
        url: $('#gen7URL'),
        title: $('#gen7Title'),
        submit: $('#gen7Button'),
        output: $('#gen7Out')
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
      
        var formatedCode = '&ltimg src="&lt?php echo $rad["' + s.url.val() + '"]; ?&gt" alt="&lt?php echo $rad["' + s.title.val() + '"]; ?&gt" /&gt';
        
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
                
                