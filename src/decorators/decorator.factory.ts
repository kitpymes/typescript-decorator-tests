// declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
// declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void
// declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
// declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;

export function DecoratorFactory(message?: string) {
  return (...args: any[]) => {
    if(message)
      console.error("message: ", message); 

    let arg0 = args[0], arg1 = args[1], arg2 = args[2];

    switch (true) {
      case (arg1 === undefined && arg2 === undefined): // class
          console.log("class name: ", arg0.name); 
          break;
      case (arg1 !== undefined && arg2 === undefined): // property 
          console.log("class name: ", arg0.constructor.name); 
          console.log("property name: ", arg1);
          break;
      case (arg1 !== undefined && typeof arg2 === 'object'): // method
          console.log("class name: ", arg0.constructor.name); 
          console.log("method name: ", arg1);
          console.log("descriptor: ", arg2);
          break;
      case (arg1 !== undefined && typeof arg2 === 'number'): // parameter
          console.log("class name: ", arg0.constructor.name); 
          console.log("method name: ", arg1);
          console.log("parameter index: ", arg2);
          break;
      default:
    }
  };
}


export function ClassDecorator<TFunction extends Function>(target: TFunction): TFunction | void {
    console.log(`- Decorating class ${target.name}`); 
}

export function MethodDecorator<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) : TypedPropertyDescriptor<T> | void {
    console.log(`- Decorating method ${propertyKey}() from ${target.constructor.name}`); 
}

export function PropertyDecorator(target: Object, propertyKey: string) : void {
    console.log(`- Decorating property ${propertyKey} from class ${target.constructor.name}`);
}

export function ParameterDecorator(target: Object, propertyKey: string, parameterIndex: number): void {
    console.log(`- Decorating parameter ${propertyKey}(index: ${parameterIndex})`+
    ` from class ${target.constructor.name}`)
}