import { Storage } from "../lib";
import { WebStorageAdapter } from "../adapter";

const storage = new Storage(
  {async: false, value: {a: 1, b: 2}},
  WebStorageAdapter,
  localStorage,
  'test-storage',
  JSON.stringify,
  JSON.parse
);

console.log(`storage.value:`, storage.value); // { a: 1, b: 2 }
