module.exports.expr = expr;
function expr() {
    return argsToArray(arguments).reduce(combine);
}

module.exports.combine = combine;
function combine(regex1, regex2) {
    var source1;
    var source2;

    if(typeof regex2 == 'string') {
        source2 = escapeSpecialCharacters(regex2);
    } else {
        source2 = regex2.source;
    }

    if(typeof regex1 == 'string') {
        source1 = escapeSpecialCharacters(regex1);
    } else {
        source1 = regex1.source;
    }

    return new RegExp(source1 + source2);
}

module.exports.zeroOrOne = zeroOrOne;
function zeroOrOne() {
    var pattern = argsToArray(arguments).map(regexToString).join('');
    return new RegExp(quantify(escapeSpecialCharacters(pattern), '?'));
};

module.exports.zeroOrMore = zeroOrMore;
function zeroOrMore(pattern) {
    var pattern = argsToArray(arguments).map(regexToString).join('');
    return new RegExp(quantify(escapeSpecialCharacters(pattern), '*'));
};

module.exports.oneOrMore = oneOrMore;
function oneOrMore(pattern) {
    var pattern = argsToArray(arguments).map(regexToString).join('');
    return new RegExp(quantify(escapeSpecialCharacters(pattern), '+'));
};

module.exports.anythingBut = anythingBut;
function anythingBut(pattern) {
    var pattern = regexToString(pattern);

    // TODO: Improve type checking
    if(typeof pattern == 'string') {
        return negateClasses("[" + pattern + "]");
    } else {
        return negateClasses(pattern.source);
    }
};

module.exports.many = many;
function many(pattern, quantity1, quantity2) {
    if(arguments.length === 2) {
        return new RegExp(pattern + "{" + quantity1 + "}");
    }
    if(arguments.length === 3) {
        switch([quantity1, quantity2]) {

        }
        return new RegExp(pattern + "{" + quantity1 + "," + quantity2 + "}");
    }
}

module.exports.or = /|/;

module.exports.word = /\w/;

module.exports.digit = /\d/;

module.exports.space = /\s/;

function quantify(pattern, quantifier) {
    if(pattern.length > 1) {
        return "[" + pattern + "]" + quantifier;
    }

    return pattern + quantifier;
}

function negateClasses(pattern) {
    // TODO: Ignore escaped brackets
    // TODO: Profile performance
    return new RegExp(pattern.replace('[', '[^'))
}

function escapeSpecialCharacters(pattern) {
    var str = "";

    for(var index = 0, limit = pattern.length; index < limit; index++) {
        if(['?', '*', '+', '-', '[', ']', '{', '}', '|', '.'].indexOf(pattern.charAt(index)) > -1 && pattern.charAt(index - 1) !== '\\') {
            str += '\\' + pattern.charAt(index);
        } else {
            str += pattern.charAt(index);
        }
    }
    return str;
}

function argsToArray(args) {
    var arr = [];
    for(var index = 0, length = args.length; index < length; index++) {
        arr.push(args[index]);
    }

    return arr;
}

function argsToString(args) {
    return argsToArray(args).join('');
}

function regexToString(obj) {
    // TODO: Improve type checking
    if(obj.source) {
        return obj.source;
    }

    return obj;
}
