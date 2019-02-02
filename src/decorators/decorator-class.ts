export { logger, immutable, instanceCount };

/*************************************************************************************
* @name logger
* @description Loguea en consola el nombre de la clase, los párametros del constructor y el resultado.
* @param target {TFunction} La clase decorada.
* @return {TFunction} El nuevo constructor.
*/
const logger = (messageStart?: string, messageEnd?: string) => <TFunction extends Function>(target: TFunction): TFunction => {
  const originalConstructor = target;

    let newConstructor = (...args) =>{
        if (messageStart) console.log(messageStart);
        var a = args.map(a => JSON.stringify(a)).join();
        var result = originalConstructor.apply(this, args);
        var r = JSON.stringify(result);
        console.log(`new class ${target.name}(${a}) => ${r}`);
        if (messageEnd) console.log(messageEnd);  
    }

    return <any>newConstructor;
}

/*************************************************************************************
* @name immutable
* @description Clase de solo lectura no puede ser modificada.
* @param target {any} La clase decorada.
* @return {any} La extension de la clase decorada.
*/
const immutable = (target: any): any =>{
  const Immutable = class extends target {
    constructor (...args) {
      super(...args);

      if (new.target === Immutable) {
        Object.freeze(this);
      }
    }
  }

  return Immutable;
}

/*************************************************************************************
* @name instanceCount
* @description Cuenta cuantas instancias de han creado de una clase.
* @param target {any} La clase decorada.
* @return {any} La extension de la clase decorada.
*/
const instanceCount = (target: any): any => {
  const Instance = class extends target {
    static _instanceCount: number = 0;
    static get instance() {
      return this._instanceCount;          
    }

    constructor (...args) {
      super(...args);

      if (new.target === Instance) {
        Instance._instanceCount += 1; 
        console.log("class X: instance Nº =>", Instance.instance);  
      }
    }
  }

  return Instance;
}