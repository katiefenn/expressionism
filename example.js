var Expressionism = require('./expressionism'),
    expr = Expressionism.expr,
    zeroOrOne = Expressionism.zeroOrOne,
    zeroOrMore = Expressionism.zeroOrMore,
    oneOrMore = Expressionism.oneOrMore,
    anythingBut = Expressionism.anythingBut,
    many = Expressionism.many,
    or = Expressionism.or,
    word = Expressionism.word;

var identifier = expr(zeroOrOne('#.:'), oneOrMore(word, '-*'));
var attribute = expr('[', oneOrMore(word, '=-~\'"|'), ']');
var pseudoElement = expr(many(':', 2), oneOrMore(word, '-'));
var pattern = expr(identifier, or, attribute, or, pseudoElement);

console.log(pattern);
// => /[#\.:]?[\w\-\*]+|\[[\w=\-~'"\|]+\]|:{2}[\w\-]+/

console.log(/[#\.:]?[\w\-\*]+|\[[\w=\-~'"\|]+\]|:{2}[\w/-]+/);
// => /[#\.:]?[\w\-\*]+|\[[\w=\-~'"\|]+\]|:{2}[\w/-]+/
