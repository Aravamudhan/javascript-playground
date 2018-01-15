function numbersCloseEnough(n1, n2) {
    return Math.abs(n1 - n2) < Number.EPSILON
}

function numberTest() {
    console.log('42 === 42.0', (42 === 42.0))
    console.log('0.1+0.2 === 0.3', ((0.1 + 0.2) === 0.3))
    var a = 0.1 + 0.2
    var b = 0.3
    console.log('numbersCloseEnough: a :', a, 'b:', b, numbersCloseEnough(a, b))
    console.log('Number.MAX', Number.MAX_VALUE)
    console.log('Number.MAX_SAFE_INTEGER', Number.MAX_SAFE_INTEGER)
    console.log('Number.isInteger(42.0)', Number.isInteger(42.0))
    console.log('Number.isInteger(42.1)', Number.isInteger(42.1))
}

function specialValueTest() {
    var a = typeof null
    console.log('typeof null', a);
    var b = typeof undefined
    console.log('typeof undefined', b)
    var a = 1 / 'foo'
    console.log('isNaN(a)', isNaN(a))
    console.log('Number.isNaN(a)', Number.isNaN(a))
    console.log('isNaN("foo")', isNaN('foo')) //true
    console.log('Number.isNaN("foo")', Number.isNaN('foo')) //false
    var c = 1 / 0
    console.log('c', c)
    console.log('typeof c', typeof c)
    var d = 1 / -0
    console.log('d', d)
    console.log('typeof d', typeof d)
    var e = 1 / 0
    console.log('e', e)
    console.log('c===d', c === d)
}

function valuesAndReferences() {
    function copyByValue(a) {
        a = 10;
        console.log('a in copyByValue', a);
    }

    function copyByReference(obj) {
        obj.a = 100;
        obj.b = 200;
        console.log('obj in copyByReference', obj);
    }
    var a = 20;
    console.log('a before', a);
    copyByValue(a);
    console.log('a after', a);
    var obj = {
        a: 10,
        b: 20
    };
    console.log('obj before copyByReference', obj);
    copyByReference(obj);
    console.log('obj after copyByReference', obj);
}

function arrays() {
    var movies = [];
    movies[0] = 'Up';
    movies[1] = 'Toy story';
    console.log('movies', movies);
    // indices can be skipped
    movies[3] = 'Nemo';
    console.log('movies', movies);
    console.log('movies.length', movies.length);
    movies['foo'] = 'foo';
    console.log('movies', movies);
    console.log('movies.length', movies.length);
}

function stringReverse() {
    var name = 'The lord of the rings';
    var reversedName =
        //reverse it
        name
        // split name into an array of characters
        .split('')
        // reverse the array
        .reverse()
        // join the array characters back into a string
        .join('');
    console.log('reversedName', reversedName);

    var esrever = require('esrever');
    var input = 'Lorem ipsum 𝌆 dolor sit ameͨ͆t.';
    console.log('UTF-16 string:', input);
    console.log('Reversed:', input.split('').reverse().join(''));
    var inputReversed = esrever.reverse(input);
    console.log('Reversed:', inputReversed);
}

function nativeString() {
    var a = new String('abc');
    console.log('a', a);
    console.log('typeof a:', typeof a);
    console.log('a instanceof String:', (a instanceof String));
    console.log('Object.prototype.toString.call(a)', Object.prototype.toString.call(a));
    var c = String('cba');
    console.log('c', c);
    console.log('typeof c:', typeof c);
    console.log('c instanceof String:', (c instanceof String));
    console.log('Object.prototype.toString.call(c)', Object.prototype.toString.call(c));
    var d = null;
    try {
        d.toString();
    } catch (e) {
        console.log('Exception on calling toString for a null value', e);
    }
    console.log('String(d)', String(d));
}

function nativeArray() {
    var a = new Array(1, 2, 3);
    console.log('a', a);
    console.log('typeof a:', typeof a);
    console.log('a instanceof Array:', (a instanceof Array));
    console.log('Object.prototype.toString.call(a)', Object.prototype.toString.call(a));
    var b = Array(1, 2, 3);
    console.log('b', b);
    console.log('typeof b:', typeof b);
    console.log('b instanceof Array:', (b instanceof Array));
    console.log('Object.prototype.toString.call(b)', Object.prototype.toString.call(b));
    var c = [1, 2, 3];
    console.log('c', c);
    console.log('typeof c:', typeof c);
    console.log('c instanceof Array:', (c instanceof Array));
    console.log('Object.prototype.toString.call(c)', Object.prototype.toString.call(c));
    var d = new Array(3);
    console.log('sparse array - d', d);
    console.log('d.length', d.length);
}

function date() {
    var a = new Date();
    console.log('a', a);
    var b = Date();
    console.log('b', b);
}

function jsonTest() {
    // a json representation
    var movie = {
        name: "Up",
        genre: "animation",
        year: 2009,
        summary: function summary() {
            return 'An animation movie';
        }
    };
    console.log('Movie object', movie);
    var jsonMovie = JSON.stringify(movie)
    console.log('JSON movie', jsonMovie);
    var objMovie = JSON.parse(jsonMovie);
    console.log('Object movie', objMovie);
    var army = {
        cavalry: 80,
        knights: 10,
        toJSON: function toJSON() {
            var jsonO = {
                cavalry: this.cavalry + ' thousand strong cavalry holding spears high!',
                knights: this.knights + ' thousand brave knights in shining armor'
            }
            return jsonO;
        }
    };
    console.log(JSON.stringify(army));
    var fluffy = {
        name: 'Fluffy',
        type: 'Dog',
        eat: function eat() {
            return 'Eating';
        },
        sleep: function sleep() {
            return 'Sleeping';
        }
    }
    console.log('Without replacer', JSON.stringify(fluffy));
    var fluffyJson = JSON.stringify(fluffy, function(k, v) {
        if (k !== 'type') {
            return v;
        }
    });
    console.log('With replacer', fluffyJson);
    var eatery = ['Starters',
        function() {
            console.log('Eat!!!!!');
        },
        'Main course',
        function() {
            console.log('Drink!!!!!');
        },
        'Dessert'
    ];
    console.log('Eatery:', eatery);
    console.log(JSON.stringify(eatery, function replacer(k,v){
    	if(typeof v == 'function'){
    		return 'A function';
    	}
    	return v;
    }));
    var eateryJson = JSON.stringify(eatery);
    console.log('Eatery JSON:', eateryJson);
}

function booleanTest() {
    // all are falsy values
    var a = "";
    var b = "0";
    var c = "''";
    var d = Boolean(a && b && c);
    console.log(d);
    var e = new Boolean(false);
    if (e) {
        console.log(e, 'is truthy');
    }
    var f1 = 2;
    var f2 = true;
    console.log(f1==f2);
}

function coercions() {
    var a = new Date();
    console.log('The date', a);
    // Avoid this. Always use #getTime() to get the timestamp
    var b = Number(a);
    console.log('The date converted to timestamp:', b);
    var s1 = "100";
    var n1 = 10;
    var r1 = n1+Number(s1);// 110
    console.log('r1:'+r1);
    var r2 = n1 + s1;
    console.log('r2:'+r2);// 10110
    var l = 42;
	var m = "abc";
	var n = null;
	console.log('l:',l);
	console.log('m:',m);
	console.log('n:',n);
	console.log("l||m:",(l||m)); // 42
	console.log("l&&m:",(l&&m)); // "abc"

    console.log("m || n",(m||n));//"abc"
    console.log("m && n",(m && n));
    console.log("n && m",(n && m));
    if(l && (m || n)){// Results in 
		console.log("Works!!");//Works
	}

    function foo(t1,t2){
    	var v1 = t1 || 'Hello';
    	var v2 = t2 || 'World';
    	console.log(v1,v2);
    }
    foo();
    foo('Hola','Amigo');
    var s1 = 'Hello';
    var s2 = new String(s1);
    var s3 = String(s1);
    var s4 = Object(s1);
    console.log('s1',s1);
    console.log('s2',s2);
    console.log('s3',s3);
    console.log('s4',s4);
    console.log('s1==s2',s1==s2);
    console.log('s1===s2',s1===s2);
    console.log('s1==s3',s1==s3);
    console.log('s1==s4',s1==s4);
    console.log('s1===s3',s1===s3);
    console.log('s1===s4',s1===s4);
    console.log('Explicit conversion using numerical operators');
    var n1 = '10';
    console.log('n1',n1);
    console.log('typeof n1',typeof n1);
    var n2 = +n1;
    console.log('typeof n2',typeof n2);
    var n3 = n1/1;
    console.log('typeof n3',typeof n3);
    var n4 = 'abc';
    console.log('n4',n4);
    n5 = +n4;
    console.log('n5',n5);
    console.log('typeof n5',typeof n5);
    var a1 = 10;
    var a2 = [10,20,30];
    console.log("Implicit coercions");
    console.log(a1+a2);
    var a3 = 10;
    var a4 = "1";
    console.log(a3+a4);
}
function grammar(){
    foo: for(let i=0;i<10;i++){
            if(i>=5){
                console.log('Not going to print here after.');
                continue foo;
            } else {
                console.log('i now',i);
            }
        }
    let j = 1;
    bar: for(let i=0;i<5;i++){
        for(let j=0;j<10;j++){
            if(j>=5){
                continue bar; // continues the execution of the loop named bar
            }
            console.log(i,j);
        }
    }
    console.log('Labeled break');
    foobar: for(let i=0;i<5;i++){
    for (let j = 0; j < 10; j++) {
            if(j>=5){
                break foobar; // stops the execution of the loop with the label foobar
            }
            console.log(i,j);
        }
    }
    function foo1() {
        // `bar1` labeled-block
        bar1: {
            console.log( "Hello" );
            break bar1;
            console.log( "never runs" );
        }
        console.log( "World" );
    }
    foo1();
    // Hello World
    console.log('Desctructuring...');
    var o1 = {
        k:10,
        fun1:function(){
            k++
            console.log('In fun1',k);
        }
    }
    var {k,fun1} = o1;
    console.log(k);
    fun1();
    fun1();
    fun1();
}
// numberTest()
// specialValueTest()
// valuesAndReferences();
// arrays();
// stringReverse();
// nativeString();
// nativeArray();
// date();
// jsonTest();
// booleanTest();
// coercions();
grammar();