// gen4 widgtet object
var gen4 = (function() {

    // settings
    var s = {
        type: $('#gen4Type'),
        fields: $('#gen4Fields'),
        submit: $('#gen4Button'),
        output: $('#gen4Out')
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
        var formatedCode;
        
        if(s.type.val() === 'p')
            this.formatedCode = self.generateP(fields);
        else if(s.type.val() === 'td')
            this.formatedCode = self.generateTd(fields);
        else
            this.formatedCode = self.generateLi(fields);
        
        //clearing output
        s.output.html('');
        
        // adding output
        s.output.html(this.formatedCode);
    };
    
    
    // members
    self.generateP = function(fields) {
        
        var returnText = '<div class="phpComment">&lt!-- For hver rad i datasettet, lager PHPkoden ett HTML-avsnitt,\n' +
            'med feltene: ' + fields + '--&gt</div>'+
            '&lt?php while($rad = mysqli_fetch_array($datasett)){' +
            '?&gt\n    &ltp&gt\n';
        
        for(var i = 0; i < fields.length; i++){
           returnText += '        ' + fields[i].trim() + ': &lt?php echo $rad["' + 
               fields[i].trim() + '"]; ?&gt &ltbr /&gt\n'
        }
        
        returnText += '    &lt/p&gt\n&lt?php } ?&gt';
        
        return returnText;
    }
    
    self.generateTd =function(fields) {
        var returnText = '<div class="phpComment">&lt!-- For hver rad i datasettet, lager PHPkoden en rad i HTML-tabelen ,\n' +
            'med kolonner for feltene: ' + fields + '--&gt</div>'+
            '&lttable&gt\n    &lttr&gt';

        for(var i = 0; i < fields.length; i++){
           returnText += '\n        &ltth&gt' + fields[i].trim().charAt(0).toUpperCase() +
               fields[i].trim().slice(1) +
               '&lt/th&gt';
        }
        
        returnText += '\n    &lt/tr&gt\n    &lt?php while($rad = mysqli_fetch_array($datasett)) { ?&gt\n        &lttr&gt';
        
        for(var i = 0; i < fields.length; i++){
           returnText += '\n            &lttd&gt&lt?php echo $rad["' + fields[i].trim() + '"]; ?&gt&lt/td&gt';
        }
        
        returnText += '\n        &lt/tr&gt\n    &lt?php } ?&gt\n&lt/table&gt';
        
        return returnText;
    }
    
    self.generateLi = function(fields) {

        var returnText = '<div class="phpComment">&lt!-- For hver rad i datasettet, lager PHPkoden ett sett med HTML-kulepunkt,\n' +
            'for feltene: ' + fields + '--&gt</div>'+
            '&ltul&gt\n';
		
		returnText += '    &lt?php while($rad = mysqli_fetch_array($datasett)){' +
        '?&gt';
        
        for(var i = 0; i < fields.length; i++){
            returnText += '\n        &ltli&gt&lt?php echo $rad["' + fields[i].trim() + '"]; ?&gt&lt/li&gt';
        }
        
		returnText += '\n    &lt?php } ?&gt';
        returnText += '\n&lt/ul&gt';
        
        return returnText;
    }

    // init
    self.init = function() {
        self.setupBindings();
    };

    // return self
    return self;
}());
                
                