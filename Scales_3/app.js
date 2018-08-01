var Scales = /** @class */ (function () {
    function Scales(type) {
        this.storage = new type();
    }
    Scales.prototype.add = function (item) {
        return this.storage.addItem(item);
    };
    Scales.prototype.getItem = function (index) {
        return this.storage.getItem(index);
    };
    Scales.prototype.getSumScale = function () {
        var sumScale = 0;
        var count = this.storage.getCount();
        for (var i = 0; i < count; i++) {
            var item = this.storage.getItem(i);
            sumScale += item.scale;
        }
        return sumScale;
    };
    Scales.prototype.getNameList = function () {
        var nameList = [];
        var count = this.storage.getCount();
        for (var i = 0; i < count; i++) {
            var item = this.storage.getItem(i);
            nameList.push(item.name);
        }
        return nameList;
    };
    return Scales;
}());
var ScalesStorageEngineArray = /** @class */ (function () {
    function ScalesStorageEngineArray() {
        this.items = [];
    }
    ScalesStorageEngineArray.prototype.addItem = function (item) {
        return this.items.push(item) - 1;
    };
    ScalesStorageEngineArray.prototype.getItem = function (index) {
        return this.items[index];
    };
    ScalesStorageEngineArray.prototype.getCount = function () {
        return this.items.length;
    };
    return ScalesStorageEngineArray;
}());
var ScalesStorageEngineLocalStorage = /** @class */ (function () {
    function ScalesStorageEngineLocalStorage() {
        this.id = Math.random();
        localStorage.setItem("ScalesStorageEngineLocalStorage_" + this.id, JSON.stringify([]));
    }
    ScalesStorageEngineLocalStorage.prototype.addItem = function (item) {
        var items = JSON.parse(localStorage.getItem("ScalesStorageEngineLocalStorage_" + this.id));
        items.push(item);
        localStorage.setItem("ScalesStorageEngineLocalStorage_" + this.id, JSON.stringify(items));
        return --items.length;
    };
    ScalesStorageEngineLocalStorage.prototype.getItem = function (index) {
        var items = JSON.parse(localStorage.getItem("ScalesStorageEngineLocalStorage_" + this.id));
        return items[index];
    };
    ScalesStorageEngineLocalStorage.prototype.getCount = function () {
        var items = JSON.parse(localStorage.getItem("ScalesStorageEngineLocalStorage_" + this.id));
        return items.length;
    };
    return ScalesStorageEngineLocalStorage;
}());
var Product = /** @class */ (function () {
    function Product(_name, _scale) {
        this.name = _name;
        this.scale = _scale;
    }
    return Product;
}());
var apple1 = new Product('apple1', 100);
var tomato1 = new Product('tomato1', 50);
var apple2 = new Product('apple2', 200);
var tomato2 = new Product('tomato2', 75);
var scalesArray = new Scales(ScalesStorageEngineArray);
var scalesLocalStorage = new Scales(ScalesStorageEngineLocalStorage);
var appleFirst = scalesArray.add(apple1);
scalesArray.add(tomato1);
scalesLocalStorage.add(apple2);
scalesLocalStorage.add(tomato2);
console.log('scalesArray getNameList:', scalesArray.getNameList());
console.log('scalesLocalStorage getNameList:', scalesLocalStorage.getNameList());
console.log('scalesArray getSumScale:', scalesArray.getSumScale());
console.log('scalesLocalStorage getSumScale:', scalesLocalStorage.getSumScale());
console.log('appleFirst was', scalesArray.getItem(appleFirst));
//# sourceMappingURL=app.js.map