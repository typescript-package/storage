import { WeakStorage } from "../lib";

console.group(`WeakStorage`);

// Define a class that extends WeakStorage
export class ProfileData extends WeakStorage<number, 'age' | 'score'> {}

// Create two instances with different names
const ageData = new ProfileData(25, 'age');
const scoreData = new ProfileData(90, 'score');

// Access the values stored in each instance using their respective names
console.log(ageData.value); // Outputs: 25
console.log(scoreData.value); // Outputs: 90

// You can also retrieve the data from another instance using the static method `getFrom`
console.log(WeakStorage.get('age', ageData)); // Outputs: 25
console.log(WeakStorage.get('score', scoreData)); // Outputs: 90

// Setting new values
ageData.set(30);
console.log(ageData.value); // Outputs: 30

// Destroy an instance and clear its stored data
ageData.destroy();
console.log(WeakStorage.get('age', ageData)); // Outputs: undefined

// Clear all stored values from the map
scoreData.delete();
console.log(WeakStorage.get('score', scoreData)); // Outputs: undefined


// Profile
// export class UserData<Profile> extends Data<Data<Profile>> {}

export interface Profile {
  id: number,
  age: number;
  score: number;
}


const someone = new WeakStorage<Profile, 'profile'>({} as any, 'profile');

someone.set({
  id: 27,
  age: 25,
  score: 1200
});

console.debug(`someone.value:`, someone.value); // { id: 27, age: 25, score: 1200 }


// 
console.debug(`WeakStorage.get('profile', someone)?.age: `, WeakStorage.get('profile', someone)?.age);

// WeakStorage.getFrom(profiles, 'profile')?.set(user1, { age: 25, score: 1200 });
// WeakStorage.getFrom(profiles, 'profile')?.set(user2, { age: 30, score: 1500 });

console.groupEnd();
