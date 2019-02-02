import {timer} from "./../../decorator-method"; 

class X {
    @timer
    async foo(age) {
        let _age = 0;
        for (let i = 1; i < age; i++) {   
            _age = i;
        }
    }
}

export function TimerMethodTest() {   
  const x = new X();
  x.foo(999);
  x.foo(99);
  x.foo(9);
}