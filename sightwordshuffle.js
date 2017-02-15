
function sightWordsShuffle() {
    var shuffledToSightWord = {};
    
    $("#shuffleButton").click(function() {
        var sightwordinputs = $('#sightWordsInput').val();
        var sightwords = sightwordinputs.split(" ");
        sightwords.forEach(function(word) {
            var shuffledWord = shuffle(word);
            shuffledToSightWord[shuffledWord] = word;
            <!--TODO append input and validation -->
            $('#shuffledWords').append(shuffledWord);
        })
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