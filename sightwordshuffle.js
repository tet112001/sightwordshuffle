
function sightWordsShuffle() {
    var shuffledToSightWord = {};
    
    $("#shuffleButton").click(function() {
        var sightwordinputs = $('#sightWordsInput').val().trim().replace(/,/g, ' ').replace(/\s+/g, " ");
	sightwordinputs = sightwordinputs.replace(/[^a-zA-Z ]+/g, '');
        var sightwords = sightwordinputs.split(" ");
        sightwords.forEach(function(word) {
            var shuffledWord = shuffle(word);
            shuffledToSightWord[shuffledWord] = word;
            var wordInputID = word+'-input';
            var $label = $('<label/>').attr({'id': word+'-label', 'class': 'col-sm-2 control-label', 'for': wordInputID}).html(shuffledWord);
            
            var $input = $('<input/>').attr({'id': wordInputID, 'type': 'text', 'class': 'form-control', 'aria-describedby': wordInputID}).on("input", function(e) {    
                if(word.startsWith($(this).val())) {
                    if(word == $(this).val()) {
                        $('#'+word+'-form-group').removeClass('has-error').addClass('has-success');
                        $('#'+word+'-label').html(word);
                        var $successSpan = $('<span/>').attr({'class': 'glyphicon glyphicon-ok form-control-feedback', 'aria-hidden': 'true'});
                        $('#'+word+'-input_group').append($successSpan);
                        $(this).prop('disabled', true);
                    }
                } else {
                    $('#'+word+'-form-group').removeClass('has-success').addClass('has-error');
//                    var $errorSpan = $('<span/>').attr({'class': 'glyphicon glyphicon-remove form-control-feedback', 'aria-hidden': 'true'});
//                    $('#'+word+'-input_group').append($errorSpan);
                };
            });
//        http://getbootstrap.com/css/#forms-control-validation
            var $hint = $('<span/>').attr({'id': word+'-hint', 'class': 'glyphicon glyphicon-volume-up input-group-addon', 'aria-hidden': 'true'}).click(function() {
                var msg = new SpeechSynthesisUtterance(word);
                window.speechSynthesis.speak(msg);
            });
            
            var $inputDiv = $('<div/>').attr({'id': word+'-input_group', 'class': 'input-group col-sm-10'}).append($hint, $input);
            var $form = $('<div/>').attr({'id': word+'-form-group', 'class': 'form-group has-feedback'}).append($label, $inputDiv);
            $('#shuffledWords').append($form);
        });
        $('#shuffle-input-group').hide();
    });
    
    function shuffle(word) {
        var a = word.split("");
        var n = a.length;

        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join("")
    }
}

$(function() {
    sightWordsShuffle();
});
