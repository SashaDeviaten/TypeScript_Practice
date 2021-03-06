class Scales <StorageEngine extends IStorageEngine>{

    storage: StorageEngine ;

    constructor(type: { new (): StorageEngine; }) {
        this.storage = new type();
    }

    add(item: Product): number {
        return this.storage.addItem(item)
    }

    getItem(index: number): Product {
        return this.storage.getItem(index)
    }


    getSumScale(): number {
        let sumScale: number = 0;
        let count: number = this.storage.getCount();
        for (let i = 0; i < count; i++) {
            let item: Product = this.storage.getItem(i);
            sumScale += item.getScale()
        }
        return sumScale
    }

    getNameList(): string[] {
        let nameList: string[] = [];
        let count: number = this.storage.getCount();
        for (let i = 0; i < count; i++) {
            let item: Product = this.storage.getItem(i);
            nameList.push(item.getName())
        }
        return nameList
    }

}

class ScalesStorageEngineArray implements IStorageEngine {

    items: Array<Product> = [];

    addItem(item: Product): number {
        return  this.items.push(item) - 1
    }

    getItem(index: number): Product {
        return this.items[index]
    }

    getCount(): number {
        return this.items.length
    }

}

class ScalesStorageEngineLocalStorage implements IStorageEngine {

    id: number = Math.random();

    constructor() {
        localStorage.setItem(`ScalesStorageEngineLocalStorage_${this.id}`, JSON.stringify([]))
    }

    addItem(item: Product): number {
        let items = JSON.parse(localStorage.getItem(`ScalesStorageEngineLocalStorage_${this.id}`));
        items.push(item);
        localStorage.setItem(`ScalesStorageEngineLocalStorage_${this.id}`, JSON.stringify(items));
        return items.length - 1
    }

    getItem(index: number): Product {
        let items = JSON.parse(localStorage.getItem(`ScalesStorageEngineLocalStorage_${this.id}`));
        return new Product(items[index].name, items[index].scale);
    }

    getCount(): number {
        let items = JSON.parse(localStorage.getItem(`ScalesStorageEngineLocalStorage_${this.id}`));
        return items.length
    }

}

interface IStorageEngine {
    addItem(item: Product): number;
    getItem(index: number): Product;
    getCount(): number
}

class Product {

    private name: string;
    private scale: number;

    constructor(_name: string, _scale: number) {
        this.name = _name;
        this.scale = _scale;
    }


    getScale(): number {
        return this.scale
    }

    getName(): string {
        return this.name
    }



}

const apple1: Product = new Product('apple1', 100);
const tomato1: Product = new Product('tomato1', 50);
const apple2: Product = new Product('apple2', 200);
const tomato2: Product = new Product('tomato2', 75);

let scalesArray: Scales<ScalesStorageEngineArray> = new Scales<ScalesStorageEngineArray>(ScalesStorageEngineArray);
let scalesLocalStorage: Scales<ScalesStorageEngineLocalStorage> = new Scales<ScalesStorageEngineLocalStorage>(ScalesStorageEngineLocalStorage);

let appleFirst = scalesArray.add(apple1);
scalesArray.add(tomato1);

scalesLocalStorage.add(apple2);
scalesLocalStorage.add(tomato2);
console.log('scalesArray getNameList:', scalesArray.getNameList());
console.log('scalesLocalStorage getNameList:', scalesLocalStorage.getNameList());
console.log('scalesArray getSumScale:', scalesArray.getSumScale());
console.log('scalesLocalStorage getSumScale:', scalesLocalStorage.getSumScale());
console.log('appleFirst was', scalesArray.getItem(appleFirst));
