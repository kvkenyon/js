var LISP = {};
LISP.app = (function () {
    //Private Variables/Functions
    //Get input from textarea
	   'use strict';
    var env = {
        outer : undefined,
        vars : {},
        find : function (name) {
            if (this.vars[name] !== undefined) {
                return this;
            }
            return this.outer.find(name);
        }
    };

    function add_functions(env) {
        env.vars['+'] = function (x) { return x[0] + x[1]; };
        env.vars['-'] = function (x) { return x[0] - x[1]; };
        env.vars['*'] = function (x) { return x[0] * x[1]; };
        env.vars['/'] = function (x) { return x[0] / x[1]; };
        env.vars['not'] = function (x) { return !x[0]; };
        env.vars['>'] = function (x) { return x[0] > x[1]; };
        env.vars['>='] = function (x) { return x[0] >= x[1]; };
        env.vars['<'] = function (x) { return x[0] < x[1]; };
        env.vars['<='] = function (x) { return x[0] <= x[1]; };
        env.vars['='] = function (x) { return x[0] === x[1]; };
        env.vars['equal?'] = function (x) {return x[0] === x[1]; };
        env.vars['length'] = function (x) {return x[0].length; };
        env.vars['car'] = function (x) { return x[0]; };
        env.vars['cdr'] = function (x) { return x.slice(1); };
        return env;
    }

    function evaluate(x, env) {
        if (typeof x === 'string') {
            //find it in the environment
            return env.find(x).vars[x];
        } else if (typeof x === 'number' || typeof x === 'boolean') { //constant literal
            //Return the x value itself
            return x;
        } else if (x[0] === 'quote') {
            //Return the expression
            return x[1];
        } else if (x[0] === 'if') {
            var test = x[1], conseq = x[2], alt = x[3];
            return evaluate((function () {
                if (evaluate(test, env)) {
                    return conseq;
                }
                return alt;
              }()), env);
        } else if (x[0] === 'set!') {
            //if exists eval and set
            //Find the environment
            var variable = x[1], exp = x[2], scope = env.find(variable);
            try {
                if (scope) {
                    //Found it
                    scope.vars[variable] = evaluate(exp, env);
                } else {
                    //Throw exception
                    //Not defined
                    throw "Error: Variable " + variable + " is not defined.";
                }
            } catch(error) {
                alert(error);
            }
        } else if (x[0] === 'define') {
            var name = x[1], exp = x[2];
            env.vars[name] = evaluate(exp, env);
        } else if (x[0] === 'lambda') {
            var vars = x[1], exp = x[2];
            return function (args) {
                var lambda_env = Object.create(env), i = 0;
                lambda_env.outer = env;
                for (i; i < vars.length; i++) {
                    lambda_env.vars[vars[i]] = args[i];
                }
                var result = evaluate(exp, lambda_env);
                return result;
            };
        } else if (x[0] === 'begin') {
            //Sequencing call
            //Iterate over all expression evaluate them
            var result, i = 1;
			
            for (i; i < x.length; i++) {
                result = evaluate(x[i], env);
            }
            return result;
        } else {
            //Procedure call
            var exp = [], i = 0;
            for (i; i < x.length; i+=1) {
                exp[i] = evaluate(x[i],env);
            }
            return exp[0](exp.slice(1));
        }
    }
	
    var tokenize = function (text) {
        //Given text (string), create array of all the tokens
        //ignore whitespace
        return text.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ').match(/\S+/g);
    }

    var parse = function (s) {
        return read_from(tokenize(s));
    }

    var atom = function (token) {
        //Return as float or number
        if (isNaN(token)) {
            return token;
        }
		return parseFloat(token);
    }

    var read_from = function (tokens) {
        if (tokens.length === 0) {
            throw "Syntax Error: Unexpected EOF while reading.";
        }
        var token = tokens.shift();

        if (token === '(') { //Legal Operation
            //Loop and Recurse
            //Build an Expression
            var expression = [];
            while (tokens[0] !== ')') {
                expression.push(read_from(tokens));
            }
            //Remove the ')'
            tokens.shift(); //Shift removes the first element and shifts left the rest
            return expression;
        } else if (token === ')') { //Syntax Error
            throw "Syntax Error: Unexpected Parentheses.";
        } else {
            return atom(token);
        }
    }

    var run = function () {
        var input = document.getElementById("input").value;
        var output = document.getElementById("output");

        env = Object.create(env);
        env = add_functions(env);

        var expr = parse(input);
        var result = evaluate(expr,env);
        output.innerHTML = result;
    }

    var button = document.getElementById("eval_button");
    var raw_input = button.addEventListener("click", run, false);


})();
