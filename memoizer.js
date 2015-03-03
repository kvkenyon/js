


var memoizer = function(memo, formula) {
    var recur = function(n) {
        var result = memo[n];
        if (typeof n !== 'number') {
            result = formula(recur, n);
            memo[n] = result;
        }
        return result;
    }
}

var fibonacci = memoizer([0,1,1], function(recur, n) {
    return recur(n-2) + recur(n-1);
});

var factorial = memoizer([1,1], function(recur, n) {
    return n * recur(n-1);
});



