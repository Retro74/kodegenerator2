// gen4_2 widgtet object
var gen4_2 = (function() {

    // settings
    var s = {
        tabellNavn: $('#gen4_2tabellNavn'),
        fields: $('#gen4_2Fields'),
        pk_field: $('#gen4_2PK_Field'),
        chb_insert: $('#gen4_2chb_insert'),
        chb_update: $('#gen4_2chb_update'),
        chb_delete: $('#gen4_2chb_delete'),
        submit: $('#gen4_2Button'),
        output: $('#gen4_2Out')
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
        var formatedCode = '&lt?php \n ';


        //Lager insertsetningen
        if (s.chb_insert.is(':checked')) {
            formatedCode += '<div class="phpComment">//Hvis det er en GET med kommandoen "Insert"</div>' +
                'if (isset($_GET["command"])) {if ($_GET["command"]=="insert"){';

            formatedCode += '<div class="phpComment">//Lager insertspørringen</div>' +
                '$sql_insert = sprintf("INSERT INTO ' + s.tabellNavn.val() + ' (' + s.fields.val() + ') VALUES (';
            //Setter inn '%s'
            for (var i = 0; i < fields.length; i++) {
                formatedCode += "'%s'";
                if (i < fields.length - 1) {
                    formatedCode += ', ';
                }
            }
            formatedCode += ')",';

            //Setter inn realescapestrings
            for (var i = 0; i < fields.length; i++) {
                formatedCode += '\n    $tilkobling->real_escape_string($_GET["' + fields[i].trim() + '"])';
                if (i !== fields.length - 1)
                    formatedCode += ',';
            }
            formatedCode += '\n    );\n\n';

            //Sjekker om det er insert som skal gjøres
            formatedCode += '<div class="phpComment">    //Gjør en "Insert"</div>' +
                '    $tilkobling->query($sql_insert);}}\n\n';

        }

        //Lager updatefunksjonalitet og kjører den om
        if (s.chb_update.is(':checked')) {
            formatedCode += '<div class="phpComment">//Hvis det er en GET med kommandoen "update"</div>' +
                'if(isset($_GET["command"])) { if ($_GET["command"]=="do_update"){';

            formatedCode += '<div class="phpComment">//Lager updatespørringen</div>' +
                '$sql_update = sprintf("UPDATE ' + s.tabellNavn.val() + ' SET '

            //Setter inn '%s'
            for (var i = 0; i < fields.length; i++) {
                formatedCode += fields[i] + " = '%s' "
                if (i < fields.length - 1) {
                    formatedCode += ', ';
                }
            }
            formatedCode += " WHERE " + s.pk_field.val() + " = '%s'" + '",';

            //Setter inn realescapestrings
            for (var i = 0; i < fields.length; i++) {
                formatedCode += '\n    $tilkobling->real_escape_string($_GET["' + fields[i].trim() + '"])'
                formatedCode += ',';
            }
            formatedCode += '\n    $tilkobling->real_escape_string($_GET["' + s.pk_field.val() + '"]));\n\n';


            formatedCode += '<div class="phpComment">    //Kjører updatesetningen</div>' +
                '    $tilkobling->query($sql_update);}}\n\n';

        }

        //Lager deletefunksjonalitet og kjører den om kommandoen er gitt
        if (s.chb_delete.is(':checked')) {
            formatedCode += 'if(isset($_GET["command"])){ if ($_GET["command"]=="delete"){' +
                '<div class="phpComment">//Lager deletespørringen</div>' +
                '$sql_delete = sprintf("DELETE FROM ' + s.tabellNavn.val() + ' WHERE ' + s.pk_field.val() + " = '%s'" + '", ';
            formatedCode += '\n    $tilkobling->real_escape_string($_GET["' + s.pk_field.val() + '"]));\n\n';

            formatedCode += '<div class="phpComment">//Hvis det er en GET med kommandoen "delete"</div>';
            formatedCode += '<div class="phpComment">    //Kjør deletesetningen</div>' +
                '    $tilkobling->query($sql_delete);}}\n\n';

        }

        //Lager Selectspørringen
        formatedCode += '<div class="phpComment">//Lager Selectspørringen</div>' +
            '$sql_select = "SELECT ' + s.fields.val() + ', ' + s.pk_field.val() + ' FROM ' + s.tabellNavn.val() + '";\n\n' +
            '<div class="phpComment">//Kjører spørringen mot databasen og resultatet settes i datasettet </div>' +
            '$datasett = $tilkobling->query($sql_select);\n\n';


        formatedCode += '?&gt';


        //Lager tabellen!
        formatedCode +=
            '<div class="phpComment">&lt!-- For hver rad i datasettet, lager PHPkoden en rad i HTML-tabelen ,\n' +
            'med kolonner for feltene: ' + fields + '--&gt</div>' +
            '&lttable border="1" &gt' +
            '\n   &lttr&gt';
        //Lager overskrift
        for (var i = 0; i < fields.length; i++) {
            formatedCode +=
                '\n      &ltth&gt' + fields[i].trim().charAt(0).toUpperCase() + fields[i].trim().slice(1) + '&lt/th&gt';
        }
        formatedCode += '\n   &lt/tr&gt';

        //Setter inn hver kolonne

        formatedCode += '\n    &lt?php while($rad = mysqli_fetch_array($datasett)) { ?&gt' +
            '\n        &lttr&gt'; //TR

        formatedCode += '&ltform method="GET"&gt'; //FORM
        formatedCode += '\n      &ltinput type="hidden" name="command" value="do_update"&gt'; //HIDDEN COMMAND
        formatedCode += '\n      &ltinput type="hidden" name="' + s.pk_field.val() + '" value="&lt?php echo($rad["' + s.pk_field.val() + '"]); ?&gt"&gt'; //HIDDEN PK


        //if (s.chb_update.is(':checked')) {
        //Sjekker om det skal settes inn en editboks


        for (var i = 0; i < fields.length; i++) {
            formatedCode +=
                '\n      &lt?php' +
                '\n      if (isset($_GET["command"])){' +
                '\n            if ($_GET["command"]=="update"){' +
                '\n                  if ($rad["' + s.pk_field.val() + '"] == $_GET["' + s.pk_field.val() + '"]){' +
                '\n      ?&gt';

            //Det er en update, og en input skal inn
            formatedCode +=
                '\n      &lttd&gt' + //TD
                '\n         &ltinput type="text" name = "' + fields[i].trim() + '" value = "&lt?php echo ($rad["' + fields[i].trim() + '"]); ?&gt" style="background-color : #d1d1d1;"&gt' +
                '\n      &lt/td&gt';
            //Setter inn en knapp til slutt
            if (i == fields.length - 1) {
                formatedCode +=
                    '\n               &lttd&gt' + //TD
                    '\n                  &ltinput type="submit" value="Endre"&gt' + //SUBMIT
                    '\n               &lt/td&gt' + // /TD
                    '\n            &lt/form&gt' ; // /FORM
            }

            // not command
            formatedCode +=
                '\n      &lt?php } else { ?&gt' +
                '\n            &lttd&gt ' +  //TD
                '\n            &lt?php echo ($rad["' + fields[i].trim() + '"]); ?&gt' +
                '\n            &lt/td&gt' + // /TD
                '\n      &lt?php }}else { ?&gt' +  //not update
                '\n            &lttd&gt ' +  //TD
                '\n            &lt?php echo ($rad["' + fields[i].trim() + '"]); ?&gt' +
                '\n            &lt/td&gt' +  // /TD
                '\n       &lt?php }} else { ?&gt' +  //not edititem
                '\n            &lttd&gt ' +  //TD
                '\n            &lt?php echo ($rad["' + fields[i].trim() + '"]); ?&gt' +
                '\n            &lt/td&gt'+ // /TD
                '\n            &lt?php } ?&gt';



        }
    //}

                    //Legger til kolonner for linker til Edit og Delete
                    if (s.chb_update.is(':checked')) {
                        formatedCode +=
                            '\n            &lttd&gt ' + // TD
                            '\n            &lta href="?command=update&' + s.pk_field.val() + '=&lt?php echo ($rad["' + s.pk_field.val() + '"]); ?&gt" &gt Rediger &lt/a&gt' +
                            '\n            &lt/td&gt'; // /TD

                    }
                    if (s.chb_delete.is(':checked')) {
                        formatedCode +=
                            '\n            &lttd&gt' + // TD
                            '\n            &lta href="?command=delete&' + s.pk_field.val() + '=&lt?php echo ($rad[' + "'" + s.pk_field.val() + "'" + ']); ?&gt" &gt Slett &lt/a&gt' +
                            '\n            &lt/td&gt'; // /TD
                    }


                    formatedCode +=
                        '\n        &lt/tr&gt' + // /TR
                        '\n    &lt?php } ?&gt';   //  }

                    //Setter inn en rad for å sette inn data
                    if (s.chb_insert.is(':checked')) {
                        formatedCode += '\n    &ltform action="?command=insert&" method="GET"&gt &ltinput type="hidden" name="command" value="insert" &lttr&gt';
                        for (var i = 0; i < fields.length; i++) {
                            formatedCode +=
                                '\n    &lttd&gt' +
                                '\n    &ltinput type="text" name = "' + fields[i].trim() + '" value = "" style="background-color : #d1d1d1;"&gt ' +
                                '\n    &lt/td&gt';
                        }
                        formatedCode += '&lttd&gt&ltinput type="submit" value="Ny"&gt &lt/td&gt&lt/tr&gt&lt/form&gt';
                        //formatedCode += '\n &lt?php } ?&gt';

                    }

                    formatedCode += '\n&lt/table&gt\n\n';  // /TABLE



                //______________________________

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