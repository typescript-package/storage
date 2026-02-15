
import { NamedEventEmitter } from "@typescript-package/event-emitter";
import { WebStorageAdapter } from "../../adapter";
import { ReactiveStorage } from "../src/lib";

const storage = new ReactiveStorage(
  {async: false, value: {a: 1, b: 2}},
  WebStorageAdapter,
  localStorage,
  'test-storage', 
  JSON.stringify,
  JSON.parse
);

storage.setEmitter(NamedEventEmitter);

storage.on('put', ({key, value}) => {
  console.log(`put event: key=${key}, value=${value}`);
});

storage.put('b', 3);
