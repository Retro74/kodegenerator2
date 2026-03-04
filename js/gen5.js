// gen5 widgtet object
var gen5 = (function() {

    // settings
    var s = {
        ex: $('#gen5Exception'),
        fields: $('#gen5Fields'),
        submit: $('#gen5Button'),
        output: $('#gen5Out')
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
        var fields = s.fields.val().split(',');
        var formatedCode = '&lt?php if($rad = mysqli_fetch_array($datasett)) { ?&gt';
        
        for(var i = 0; i < fields.length; i++){
            formatedCode += '\n    ' + fields[i].trim() + ': &lt?php echo $rad["' + fields[i].trim() + '"]; ?&gt'; 
        }
        
        if(s.ex.val().length !== 0)
            formatedCode += '\n&lt?php } else {?&gt\n    &ltp&gt' + s.ex.val() + '&lt/p&gt';
        
        formatedCode += '\n&lt?php } ?&gt';
        
        
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
                
                