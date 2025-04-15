import { IndexedWeakStorage } from "../lib";

console.group(`IndexedWeakStorage`);

export interface Profile {
  id: number,
  age: number;
  score: number;
  firstName: string;
  lastName: string;
};

new IndexedWeakStorage(
  { id: 1, firstName: 'first', lastName: 'last', age: 27, score: 1100 } as Profile,
  'id',
  'profiles1'
);

new IndexedWeakStorage(
  { id: 1, firstName: 'first1', lastName: 'last1', age: 127, score: 1200 } as Profile,
  'id',
  'profiles2'
);


console.log(
  `IndexedWeakStorage.getByIndex(1, 'profiles2'): `,
  IndexedWeakStorage.getByIndex(1, 'profiles2') // { id: 1, firstName: 'first1', lastName: 'last1', age: 127, score: 1200 }
);

console.log(
  `IndexedWeakStorage.getByIndex(1, 'profiles1'): `,
  IndexedWeakStorage.getByIndex(1, 'profiles1') // { id: 1, firstName: 'first', lastName: 'last', age: 27, score: 1100 }
);

console.groupEnd();
