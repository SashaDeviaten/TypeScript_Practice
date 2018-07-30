class Scales {

    productsArray: IScalable[] = []; // products in Scales

    add(product: IScalable): void {
        this.productsArray.push(product)
    }


    getSumScale(): number {
        let sumScale: number = 0;
        this.productsArray.forEach((el) => {
            sumScale += el.getScale()
        });
        return sumScale
    }

    getNameList(): string[] {
        let nameList: string[] = [];
        this.productsArray.forEach((el) => {
            nameList.push(el.getName())
        });
        return nameList
    }
}


interface IScalable {

    getScale(): number;
    getName(): string

}

class Apple implements IScalable{

    name: string;
    scale: number;

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

class Tomato implements IScalable{

    name: string;
    scale: number;

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

const apple1: Apple = new Apple('apple1', 100);
const tomato1: Tomato = new Tomato('tomato1', 50);

let myScales: Scales = new Scales();

myScales.add(apple1);
myScales.add(tomato1);
console.log('myScales get products:', myScales.getNameList());
console.log('myScales get scale:', myScales.getSumScale());