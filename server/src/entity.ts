/**
 * Components container
 */
export type Entity = {
    /**
     * unique indificator
     */
    id: number;
};
addEventListener('sd', () => {});

export let EntitySystem = {
    contents: {}
};

//export declare var Entity: {
//    prototype: Entity;
//    new(): Entity;
//};

function identity<Type>(arg: Type): Type {
    return arg;
}

let ds: Entity;

console.log(identity(new FileList));