import {tryCatch} from "./../../decorator-method"; 

class X {
    @tryCatch
    async foo(name) {
        throw new Error('Whoops!!!');
    }
}

export function TryCatchMethodTest() {   
  const x = new X();
  x.foo("PEPE");
}