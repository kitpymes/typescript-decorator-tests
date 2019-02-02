import {range} from "./../../decorator-property";  
 
class X {
  @range(x => x < 0, "x < 0") 
  prop: number;
  
  @range(x => x > 0, "x > 0") 
  prop1: number;
  
  @range(x => x > -1 && x < 0, "x > -1 && x < 0") 
  prop2: number;
  
  @range(x => x > 0 && x < 1, "x > 0 && x < 1") 
  prop3: number;

  @range(x => x >= -100 && x <= 0, "x >= -100 && x <= 0") 
  prop4: number;

  @range(x => x >= 0 && x <= 100, "x >= 0 && x <= 100") 
  prop5: number;
}

export function RangePropertyTest() {  
  var x = new X();

  console.log(`x.prop`);
  x.prop = 0; 
  x.prop = 1;

  console.log(`x.prop1`);
  x.prop1 = 0;
  x.prop1 = -1;

  console.log(`x.prop2`);
  x.prop2 = -1;
  x.prop2 = -5;
  x.prop2 = 0;
  x.prop2 = 5;

 console.log(`x.prop3`);
 x.prop3 = -1;
 x.prop3 = 0;
 x.prop3 = 1;
 x.prop3 = 5;

 console.log(`x.prop4`);
 x.prop4 = -101;
 x.prop4 = 0.1;
 x.prop4 = 5;

 console.log(`x.prop5`);
 x.prop5 = -0.1;
 x.prop5 = 101;
 x.prop5 = -5;  
}