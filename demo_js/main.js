// import {a,b} from './module1.js';
import greet from './module1.js';

import * as module1 from './module1.js';
// import anything from './module1.js';

console.log(module1.default('World'));
console.log(module1.a);
console.log(greet('Alice'));