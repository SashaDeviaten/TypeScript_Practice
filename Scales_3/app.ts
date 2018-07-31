class Scales <StorageEngine extends IStorageEngine>{

    storage: StorageEngine ;

    constructor(type: { new (): StorageEngine; }) {
        this.storage = new type();
    }

    add(item: any): number {
        return this.storage.addItem(item)
    }

    getItem(index: number): any {
        return this.storage.getItem(index)
    }


    getSumScale(): number {
        let sumScale: number = 0;
        let count: number = this.storage.getCount();
        for (let i = 0; i < count; i++) {
            let item: any = this.storage.getItem(i);
            sumScale += item.scale
        }
        return sumScale
    }

    getNameList(): string[] {
        let nameList: string[] = [];
        let count: number = this.storage.getCount();
        for (let i = 0; i < count; i++) {
            let item: any = this.storage.getItem(i);
            nameList.push(item.name)
        }
        return nameList
    }

}

class ScalesStorageEngineArray implements IStorageEngine {

    items: Array<any> = [];

    addItem(item): number {
        return  this.items.push(item) - 1
    }

    getItem(index): any {
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

    addItem(item): number {
        let items = JSON.parse(localStorage.getItem(`ScalesStorageEngineLocalStorage_${this.id}`));
        items.push(item);
        localStorage.setItem(`ScalesStorageEngineLocalStorage_${this.id}`, JSON.stringify(items));
        return --items.length
    }

    getItem(index): any {
        let items = JSON.parse(localStorage.getItem(`ScalesStorageEngineLocalStorage_${this.id}`));
        return items[index]
    }

    getCount(): number {
        let items = JSON.parse(localStorage.getItem(`ScalesStorageEngineLocalStorage_${this.id}`));
        return items.length
    }

}

interface IStorageEngine {
    addItem(item): number;
    getItem(index): any;
    getCount(): number
}

class Product {

    name: string;
    scale: number;

    constructor(_name: string, _scale: number) {
        this.name = _name;
        this.scale = _scale;
    }

}

class Apple extends Product{

}

class Tomato extends Product{

}

const apple1: Apple = new Apple('apple1', 100);
const tomato1: Tomato = new Tomato('tomato1', 50);
const apple2: Apple = new Apple('apple2', 200);
const tomato2: Tomato = new Tomato('tomato2', 75);

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