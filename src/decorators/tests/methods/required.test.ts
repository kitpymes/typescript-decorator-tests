import {requiredAll, requiredAllString, requiredAllNumber} from "./../../decorator-method";   

class X {
    @requiredAll    
    faa(name, lastname) {
        console.log(`requiredAll: ${name}, ${lastname}`);
    }

    @requiredAllString    
    fee(name, lastname) {
        console.log(`requiredAllString: ${name}, ${lastname}`);
    }

    @requiredAllNumber    
    fii(name, lastname) {
        console.log(`requiredAllNumber: ${name}, ${lastname}`);
    }
}

export function RequiredMethodTest() {   
  const x = new X();

  //x.faa(); 
  //x.faa(null, null);
  //x.faa("", "");
  //x.faa(undefined, undefined);
  //x.faa("undefined", "undefined");
  //x.faa("Carlos", 567);
  //x.faa("Carlos");
  //x.faa("Carlos", "Garcia"); 

  //x.fee("Carlos", 567);
  //x.fee(567, "Garcia");
  //x.fee(567, 567);
  //x.fee("Carlos", "Garcia");

  //x.fii("Carlos", 567);
  //x.fii(567, "Garcia");
  //x.fii("Carlos", "Garcia");
  x.fii(567, 567);
}