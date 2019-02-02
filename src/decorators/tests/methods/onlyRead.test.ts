import {onlyRead} from "./../../decorator-method"; 

class X {
  name = ""; 
  constructor(name) {
      this.name = name;
  }
  
  method() { 
      return this.name;
  }

  @onlyRead
  methodOnlyRead() { 
      return this.name;
  }
}

export function OnlyReadMethodTest() {  
  const x = new X("PEPE"); 

  console.groupCollapsed("method");
    console.log("GET: x.method() =>", x.method()); 
    // => PEPE 

    x.method = () => 'HACKED!';
    console.log("SET: x.method() =>", x.method()); 
    // HACKED! 

    X.prototype.method = () => 'HACKED!';
    console.log("SET prototype: X.prototype.method() =>", x.method());  
    // HACKED! 
  console.groupEnd(); 

  console.groupCollapsed("methodOnlyRead");
    console.log("GET: x.methodOnlyRead() =>", x.methodOnlyRead()); 
    // => PEPE 

    x.methodOnlyRead  = () => 'HACKED!';
    console.log("SET: x.methodOnlyRead() =>", x.methodOnlyRead()); 
    // Error: Cannot assign to read only property 'methodOnlyRead' of object '#<X>' 

    X.prototype.methodOnlyRead  = () => 'HACKED!';
    console.log("SET prototype: X.prototype.methodOnlyRead() =>", x.methodOnlyRead());  
    // Error: Cannot assign to read only property 'methodOnlyRead' of object '#<X>'
  console.groupEnd();
}