
function sightWordsShuffle() {
    var shuffledToSightWord = {};
    
    $("#shuffleButton").click(function() {
        var sightwordinputs = $('#sightWordsInput').val();
        var sightwords = sightwordinputs.split(" ");
        sightwords.forEach(function(word) {
            var shuffledWord = shuffle(word);
            shuffledToSightWord[shuffledWord] = word;
            var wordInputID = word+'-input';
            var $label = $('<label/>').attr({'id': word+'-label', 'class': 'col-sm-2 control-label', 'for': wordInputID}).html(shuffledWord);
            var $input = $('<input/>').attr({'id': wordInputID, 'type': 'text', 'class': 'form-control', 'aria-describedby': wordInputID}).on("input", function(e) {    
                if(word.startsWith($(this).val())) {
                    $(this).css({'border-color': 'green', 'border-width': 3});
                    if(word == $(this).val()) {
                        $(this).hide();
                        $('#'+word+'-label').html(word);
                        var $span = $('<span/>').attr({'class': 'glyphicon glyphicon-ok text-success col-sm-1', 'aria-hidden': 'true'});
                        $('#'+word+'-hint').before($span);
                        $('#'+word+'-label').after('<br/>');
                    }
                } else {
                    $(this).css({'border-color': 'red', 'border-width': 3});
                };
            });
            var $hint = $('<span/>').attr({'id': word+'-hint', 'class': 'glyphicon glyphicon-volume-up col-sm-1', 'aria-hidden': 'true'}).click(function() {
                var msg = new SpeechSynthesisUtterance(word);
                window.speechSynthesis.speak(msg);
            });
            var $inputDiv = $('<div/>').attr({'class': 'col-sm-5'}).append($input);
            var $form = $('<form/>').attr({'class': 'form-group'}).append($hint, $label, $inputDiv);
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