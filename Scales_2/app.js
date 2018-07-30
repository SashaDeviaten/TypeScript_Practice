var Scales = /** @class */ (function () {
    function Scales() {
        this.productsArray = []; // products in Scales
    }
    Scales.prototype.add = function (product) {
        this.productsArray.push(product);
    };
    Scales.prototype.getSumScale = function () {
        var sumScale = 0;
        this.productsArray.forEach(function (el) {
            sumScale += el.getScale();
        });
        return sumScale;
    };
    Scales.prototype.getNameList = function () {
        var nameList = [];
        this.productsArray.forEach(function (el) {
            nameList.push(el.getName());
        });
        return nameList;
    };
    return Scales;
}());
var Apple = /** @class */ (function () {
    function Apple(_name, _scale) {
        this.name = _name;
        this.scale = _scale;
    }
    Apple.prototype.getScale = function () {
        return this.scale;
    };
    Apple.prototype.getName = function () {
        return this.name;
    };
    return Apple;
}());
var Tomato = /** @class */ (function () {
    function Tomato(_name, _scale) {
        this.name = _name;
        this.scale = _scale;
    }
    Tomato.prototype.getScale = function () {
        return this.scale;
    };
    Tomato.prototype.getName = function () {
        return this.name;
    };
    return Tomato;
}());
var apple1 = new Apple('apple1', 100);
var tomato1 = new Tomato('tomato1', 50);
var myScales = new Scales();
myScales.add(apple1);
myScales.add(tomato1);
console.log('myScales get products:', myScales.getNameList());
console.log('myScales get scale:', myScales.getSumScale());
//# sourceMappingURL=app.js.map