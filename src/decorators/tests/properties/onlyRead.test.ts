import {onlyRead} from "./../../decorator-property"; 

class X {
  // Propiedad sin decoradores
  public prop: string;

  /* Decorador TypeScript:
    SI muestra el error en el codigo.
    SI sigue ejecutandose.
    Ver linea 59.
  */
  public readonly propReadonly: string;

  /* Decorador Custom:
    NO muestra el error en el codigo.
    NO sigue ejecutandose.
    Ver linea 62.
  */
  @onlyRead
  public propOnlyRead: string;

   /* Decorador TypeScript + Custom:
    SI muestra el error en el codigo.
    NO sigue ejecutandose.
    Ver linea 65.
  */
  @onlyRead
  public readonly propReadonlyOnlyRead: string;

  constructor() {

    console.group("constructor");
    this.prop = "prop";
    console.log("this.prop | Expected: 'prop' | Actual: ",  this.prop); 

    this.propReadonly = "propReadonly";
    console.log("this.propReadonly | Expected: 'propReadonly' | Actual: ", this.propReadonly);

    //this.propOnlyRead = "propOnlyRead";
    console.log("this.propOnlyRead | Expected: 'propOnlyRead' | Actual: ", this.propOnlyRead);

    //this.propReadonlyOnlyRead = "propReadonlyOnlyRead"; 
    console.log("this.propReadonlyOnlyRead | Expected: 'propReadonlyOnlyRead' | Actual: ", this.propReadonlyOnlyRead);

    console.group('Class members:');
    console.log(Object.keys(this));
    console.groupEnd(); 
    console.groupEnd(); 
  }
}

export function OnlyReadPropertyTest() {  
  var x = new X();

  console.group("set values instance");
  x.prop = "new prop";
  console.log("test.prop | Expected: 'new prop' | Actual: ", x.prop); 
 
  //test.propReadonly = "new propReadonly";
  console.log("test.propReadonly | Expected: 'new propReadonly' | Actual: ", x.propReadonly);

  //test.propOnlyRead = "new propOnlyRead";
  console.log("test.propOnlyRead | Expected: 'new propOnlyRead' | Actual: ", x.propOnlyRead);

  //test.propReadonlyOnlyRead = "new propReadonlyOnlyRead";
  console.log("test.propReadonlyOnlyRead | Expected: 'new propReadonlyOnlyRead' | Actual: ", x.propReadonlyOnlyRead);

  console.group('Class members:');
  console.log(Object.keys(x));
  console.groupEnd(); 
  console.groupEnd(); 
}