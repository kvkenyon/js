Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
    return this;
};

Function.method('curry', function() {
    var args = arguments, that = this;
    return function() {
        return that.apply(null, args.concat(arguments));
    };
});

if(typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function() {};
        F.prototype = o;
        return new F();
    };
}

var stooge = {
    first_name : 'Jerome',
    last_name : 'Howard'
};

another_stooge = Object.create(stooge);


document.write("First Name: " + stooge.first_name + '\n');
document.write("Another Stooge: " + another_stooge.first_name + '\n');

stooge.profession = 'Actor';

document.write("Profession: " + another_stooge.profession + '\n');
document.write("Type of name: " + typeof stooge.first_name + '\n');
document.write("Type of cosnts: " + typeof stooge.constructor + '\n');

var name;
for (name in stooge) {
    document.write(name + '\n');
}

stooge.nickname = 'Curly';
another_stooge.nickname = 'Moe';

delete another_stooge.nickname

document.writeln(another_stooge.nickname);


var myObject = {
    value : 0,
    increment : function(inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
}

var myObject2 = (function() {
    var value = 0;
    return {
        increment: function(inc) {
            value += typeof inc === 'number' ? inc : 1;
        },

        getValue: function() {
            return value;
        }
    }
}());

document.writeln("myObject2: " + myObject2.getValue());
myObject2.increment(4);
document.writeln("myObject2 increment by 4: " + myObject2.getValue());
myObject2.increment(5);
document.writeln("myObject2 increment by 5: " + myObject2.getValue());

var quo = function(status) {
    return {
        get_status : function () {
            return status;
        }
    }
}

var fade = function(node) {
    var level = 1;
    var step = function() {
        var hex = level.toString(16);
        node.style.backgroundColor = '#FFFF' + hex + hex;
        if(level < 15) {
            level+=1;
            setTimeout(step,100);
        }
    };
    setTimeout(step,100);
};

fade(document.body);


document.writeln("Parse Int: " + parseInt("09"));

var i;
for(i = 1; i <= 100; i+= 1) {
    if(i % 5 == 0) {
        document.writeln("Fizz");
    } else {
        document.writeln(i);
    }
}



