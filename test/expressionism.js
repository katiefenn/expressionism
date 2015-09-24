var expect = require('chai').expect;

var Expressionism = require('../expressionism');

describe("Expr", function () {
    var expr;

    before(function () {
        expr = Expressionism.expr;
    });

    it("should concatenate two simple regexes", function () {
        expect(expr(/a/, /b/).source).to.equal('ab');
    });

    it("should reduce an array of simple regexes", function () {
        expect(expr(/a/, /b/, /c/, /d/).source).to.equal('abcd');
    });

    it("should create a regex from string items", function () {
        expect(expr("a", "bc", "d").source).to.equal('abcd');
    });

    it("should escape special characters", function () {
        expect(expr("?*", "+-[", "]{}|.").source).to.equal(
            "\\?\\*\\+\\-\\[\\]\\{\\}\\|\\."
        );
    });
});

describe("Zero or one", function () {
    var zeroOrOne;
    before(function () {
        zeroOrOne = Expressionism.zeroOrOne;
    });

    it("should return the same value as /x?/ for a single character", function () {
        expect(zeroOrOne("x").source).to.equal("x?");
    });

    it("should return the same value as /[xyz]?/ for multiple character", function () {
        expect(zeroOrOne("xyz").source).to.equal("[xyz]?");
    });

    it("should escape special characters", function () {
        expect(zeroOrOne("?*+-[]{}|.").source).to.equal("[\\?\\*\\+\\-\\[\\]\\{\\}\\|\\.]?")
    });

    it("should return the same value as /[xyz]?/ for multiple arguments", function () {
        expect(zeroOrOne("x", "y", "z").source).to.equal("[xyz]?");
    });

    it("should combine regex character class items with string items", function () {
        expect(zeroOrOne("x", /\s/).source).to.equal("[x\\s]?");
    });
});

describe("Zero or more", function () {
    var zeroOrMore;

    before(function () {
        zeroOrMore = Expressionism.zeroOrMore;
    });

    it("should return the same value as /x+/ for a single character", function () {
        expect(zeroOrMore("x").source).to.equal("x*");
    });

    it("should return the same value as /[xyz]+/ for multiple character", function () {
        expect(zeroOrMore("xyz").source).to.equal("[xyz]*");
    });

    it("should escape special characters", function () {
        expect(zeroOrMore("?*+-[]{}|.").source).to.equal("[\\?\\*\\+\\-\\[\\]\\{\\}\\|\\.]*")
    });

    it("should combine regex character class items with string items", function () {
        expect(zeroOrMore("x", /\s/).source).to.equal("[x\\s]*");
    });
});

describe("One or more", function () {
    var oneOrMore;

    before(function () {
        oneOrMore = Expressionism.oneOrMore;
    });

    it("should return the same value as /x+/ for a single character", function () {
        expect(oneOrMore("x").source).to.equal("x+");
    });

    it("should return the same value as /[xyz]+/ for multiple character", function () {
        expect(oneOrMore("xyz").source).to.equal("[xyz]+");
    });

    it("should escape special characters", function () {
        expect(oneOrMore("?*+-[]{}|.").source).to.equal("[\\?\\*\\+\\-\\[\\]\\{\\}\\|\\.]+")
    });

    it("should combine regex character class items with string items", function () {
        expect(oneOrMore("x", /\s/).source).to.equal("[x\\s]+");
    });
});

describe("Anything but", function () {
    var anythingBut;

    before(function () {
        anythingBut = Expressionism.anythingBut;
    });

    it("should return the same value as /[^x]/ for a single character", function () {
        expect(anythingBut('x').source).to.equal('[^x]');
    });

    it("should return the same value as /[^xyx]/ for multiple characters", function () {
        expect(anythingBut('xyz').source).to.equal('[^xyz]');
    });

    it("should return the same value as /[^x]/ for single character regex", function () {
        expect(anythingBut(/x/).source).to.equal('[^x]');
    });

    it("should combine regex character class items with string items", function () {
        expect(anythingBut(/\s/).source).to.equal("[^\\s]");
    });
});

describe("Many", function () {
    var many;

    before(function () {
        many = Expressionism.many;
    });

    it("should return the same as x{2} for single characters", function () {
        expect(many('x', 2).source).to.equal('x{2}');
    });

    it("should return the same as x{2,3} for single characters", function () {
        expect(many('x', 2, 3).source).to.equal('x{2,3}');
    });
});

describe("Or", function () {
    var or;

    before(function () {
        or = Expressionism.or;
    });

    it("should return the same as /|/", function () {
        expect(or.source).to.equal('|');
    });
});
