import { DecoratorFactory, ClassDecorator, MethodDecorator, PropertyDecorator, ParameterDecorator } from "../../decorator.factory";

@DecoratorFactory("class")
@ClassDecorator
class X {

    @DecoratorFactory("property")
    @PropertyDecorator
    public _name: string = "PEPE";

    constructor() { 
        console.log("Constructor class initialized => Name: ", this._name);
    }

    @DecoratorFactory("method")
    @MethodDecorator
    public foo(
      @DecoratorFactory("parameter")
      @ParameterDecorator name: string, 
      @DecoratorFactory("parameter")
      @ParameterDecorator lastname?: string): void {
        this._name = name;  
    }

    @DecoratorFactory("method")
    @MethodDecorator
    get name(){
      return this._name;
    }
}

export default function FactoryTest() {  
  var x = new X();
  x.foo("Carlos");
  console.log("Name: ", x.name);
}