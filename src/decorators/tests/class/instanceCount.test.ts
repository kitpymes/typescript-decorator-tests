import { instanceCount } from "./../../decorator-class";   

@instanceCount  
class X { 
  constructor() {  } 
}

export function InstanceCountClassTest() {   
  console.groupCollapsed("method"); 

  const x1 = new X();
  const x2 = new X();
  new X();

  console.groupEnd(); 
}