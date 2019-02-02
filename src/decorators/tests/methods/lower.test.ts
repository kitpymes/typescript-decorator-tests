import {lower} from "./../../decorator-method"; 

class X {
    @lower
    async foo(name) {
        console.log(`Hola, me llamo: ${name}`);
    }
}

export function LowerMethodTest() {   
  const x = new X();
  x.foo("PEPE");
}