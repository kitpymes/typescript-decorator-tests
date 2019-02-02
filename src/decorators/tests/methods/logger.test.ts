import {logger} from "./../../decorator-method";   

class X {
    @logger()
    faa(a, b) {
        return a + b;
    }

    @logger("Sumando")
    fee(a, b) {
        return a + b;
    } 

    @logger("Empezamos!", "Terminados!")
    fii(a, b) {
        return a + b;
    } 
}

export function LoggerMethodTest() {    
  const x = new X(); 
  x.faa(1, 2);
  // Call Method: "foo()" with Arguments: [1, 2]
  // Result: 3
  x.fee(6, 0);
  // Message Start: Sumando
  // Call Method: "foo()" with Arguments: [6, 0]
  // Result: 3
   x.fii(3, 9);
  // Empezamos!
  // Call Method: "foo()" with Arguments: [3, 9]
  // Result: 12
  // Terminados!
}