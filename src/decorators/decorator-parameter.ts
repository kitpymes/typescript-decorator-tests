import "reflect-metadata";
export { required };
export const REQUIRED_KEY = Symbol("requiredParameter");

const logger = (
  target: Object, 
  propertyKey: string, 
  parameterIndex: number): void => {

  var metadataKey = `log_${propertyKey}_parameters`;
  if (Array.isArray(target[metadataKey])) {
    target[metadataKey].push(parameterIndex);
  }
  else { 
    target[metadataKey] = [parameterIndex];
  }
}

const required = (
  target: Object, 
  propertyKey: string | symbol, 
  parameterIndex: number): void => {

    let requiredParameters: number[] = 
      Reflect.getOwnMetadata(REQUIRED_KEY, target, propertyKey) || [];

    requiredParameters.push(parameterIndex);
    requiredParameters.sort();
    Reflect.defineMetadata(REQUIRED_KEY, requiredParameters, target, propertyKey);
}

const validate = (
  target: Object, 
  propertyKey: string, 
  descriptor: TypedPropertyDescriptor<Function>) => {

    const fn = descriptor.value;
    
    descriptor.value = function () {
        let requiredParameters: number[] = 
          Reflect.getOwnMetadata(REQUIRED_KEY, target, propertyKey);

        if (requiredParameters) {
            for (let parameterIndex of requiredParameters) {
                if (parameterIndex >= arguments.length || 
                arguments[parameterIndex] === undefined) {
                    throw new Error("Missing required argument.");
                }
            }
        }

        return fn.apply(this, arguments);
    }
}
