import {upper} from "./../../decorator-method"; 

class X {
    @upper
    async foo(name) {
        console.log(`HOLA, ME LLAMO: ${name}`);
    }
}

export function UpperMethodTest() {   
  const x = new X();
  x.foo("pepe");
}