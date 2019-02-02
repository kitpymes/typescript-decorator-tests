import {logger} from "./../../decorator-class";   

@logger("Empezamos!", "Terminados!")
class X { 
    constructor(a, b) {
        return a + b;
    } 
}

export function LoggerClassTest() {    
  const x = new X(1,2 ); 
 }