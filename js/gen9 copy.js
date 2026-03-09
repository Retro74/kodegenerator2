// gen9 widgtet object
var gen9 = (function() {

    // settings
    var s = {
        fields: $('#gen9Fields'),
        id: $('#gen9ID'),
        fk: $('#gen9FK'),
        submit: $('#gen9Button'),
        output: $('#gen9Out')
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
      
        var formatedCode = '&ltselect name="' + s.id.val() + '"&gt\n' +
            '<div class="phpComment">//For hver rad i datasettet, lager PHPkoden ett valgt i rullegardinslisten</div>' +
            '    &lt?php while($rad = mysqli_fetch_array($datasett)) { ?&gt\n        &ltoption value="&lt?php echo $rad["' + s.fk.val() + '"]; ?&gt"&gt';
        
        formatedCode += '&lt?php echo $rad["' + s.fields.val() + '"];?&gt';
        formatedCode += '&lt/option&gt\n    &lt?php } ?&gt\n&lt/select&gt';
        
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
                
                