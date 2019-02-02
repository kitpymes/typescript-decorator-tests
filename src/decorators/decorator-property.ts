export { onlyRead, range }; 

/*************************************************************************************
* @name onlyRead
* @description La propiedad es de solo lectura no puede ser editado o asignado.
* @param target {Object} La propiedad decorado.
* @param propertyKey {string} El nombre de la propiedad decorada.
* @return {void}
*/
const onlyRead = (target: Object, propertyKey: string): void => {
    let descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
    descriptor.writable = false;
    Object.defineProperty(target, propertyKey, descriptor)
}

/*************************************************************************************
* @name range
* @description Valida el rango numerico..
* @param target {Object} La propiedad decorado.
* @param propertyKey {string} El nombre de la propiedad decorada.
* @return {void}
*/
const range = (f: ((val: any) => any), msg : string) => 
  (target: Object, propertyKey: string): void => {
     let val = this[propertyKey];

    const get = () => val;
    const set = (newVal) => {
      if (!f(newVal)) {
       throw new Error(`La propiedad "${propertyKey}" solo acepta números: "${msg}" Usted ingreso: ${newVal}.`);  
      }
      else{ 
        val = newVal;
      }
    }

  Object.defineProperty(target, propertyKey, {get, set});
}