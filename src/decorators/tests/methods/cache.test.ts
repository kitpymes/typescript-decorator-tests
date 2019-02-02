import {cache} from "./../../decorator-method"; 

class X {
  @cache      
  foo(){
    return "Hello";
  }
}

export function CacheMethodTest() {   
  var x = new X();
  console.log(x.foo()); 
  // Save cache: foo()
  // Hello
  console.log(x.foo()); 
  // Get cache: foo()
  // Hello
}