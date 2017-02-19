
function sightWordsShuffle() {
    var shuffledToSightWord = {};
    
    $("#shuffleButton").click(function() {
        var sightwordinputs = $('#sightWordsInput').val();
        var sightwords = sightwordinputs.split(" ");
        var divs = []
        sightwords.forEach(function(word) {
            var shuffledWord = shuffle(word);
            shuffledToSightWord[shuffledWord] = word;
            <!--TODO append input and validation -->
            var wordInputID = word+'-input';
            var $label = $('<label/>').attr({'id': word+'-label', 'for': wordInputID}).html(shuffledWord);
            var $input = $('<input/>').attr({'id': wordInputID, 'type': 'text', 'class': 'form-control', 'aria-describedby': wordInputID}).on("input",function(e){    
                if(word.startsWith($(this).val())) {
                    $(this).css({'border-color': 'green', 'border-width': 3});
                    if(word == $(this).val()) {
                        $(this).hide();
                        $('#'+word+'-label').html("&nbsp;&nbsp"+word);
                        var $span = $('<span/>').attr({'class': 'glyphicon glyphicon-ok text-success', 'aria-hidden': 'true'});
                        $('#'+word+'-label').before($span);
                    }
                } else {
                    $(this).css({'border-color': 'red', 'border-width': 3});
                };
            });
            
            $('#shuffledWords').append($label, $input);
        });
        $('#shuffledWords').append(divs);
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