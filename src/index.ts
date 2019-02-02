import FactoryTest from "./decorators/tests/factory/factory.test";
import { OnlyReadPropertyTest, RangePropertyTest } from "./decorators/tests/properties"; 
import { LoggerClassTest, InstanceCountClassTest, InmutableClassTest } from "./decorators/tests/class";
import { CacheMethodTest, LoggerMethodTest, LowerMethodTest, OnlyReadMethodTest, RequiredMethodTest, TimerMethodTest, 
 TryCatchMethodTest, UpperMethodTest } from "./decorators/tests/methods"; 

export default class Decorators {
 constructor() {
  window.document.write("Open console debug F12");

  // FACTORY
  FactoryTest();
   
  // CLASS
  // LoggerClassTest();
  // InstanceCountClassTest(); 
  // InmutableClassTest(); 

  // METHODS
  // CacheMethodTest();
  // TimerMethodTest();
  // OnlyReadMethodTest();
  // TryCatchMethodTest(); 
  // LowerMethodTest();
  // UpperMethodTest();
  // LoggerMethodTest();
  // RequiredMethodTest();

  // PROPERTIES
  // OnlyReadPropertyTest(); 
  // RangePropertyTest();
 }
}