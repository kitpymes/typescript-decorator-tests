import {immutable} from "./../../decorator-class"; 

@immutable 
class X { 
  _name: string; 

  constructor(name) {
      this._name = name;
  }
  
  method() { 
      return this._name;
  }
}

export function InmutableClassTest() {   
  const x = new X("PEPE"); 

  console.groupCollapsed("method");

  console.log("GET: x.method() =>", x.method()); 
  // => PEPE   

  //x._name = "Carlos"; 
  // => Error: Cannot assign to read only property '_name' of object '#<class_1>' 

  //x.method = () => 'HACKED!';
  // => Error: Cannot add property method, object is not extensible 

  //X.prototype.method = () => 'HACKED!';
  // => PEPE

  console.groupEnd(); 
}