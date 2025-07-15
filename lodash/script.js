// const arr = [1, 2, 3, 4, 5, 6];
// console.log(_.chunk(arr, 5));

// const arr = [0, false, '', 42, 'hello', null, undefined];
// console.log(_.compact(arr));

// const arr = [1, 2, 2, 3, 4, 4, 5];
// console.log(_.uniq(arr));

// const users = [
//   { name: 'Alice', age: 21 },
//   { name: 'Bob', age: 25 },
//   { name: 'Charlie', age: 21 },
// ];
// console.log(_.groupBy(users, 'age'))

// const users = [
//   { name: 'Alice', age: 25 },
//   { name: 'Zob', age: 25 },
//   { name: 'Charlie', age: 20 },
// ];
// console.log(_.orderBy(users, ['age', 'name'], ['asc', 'desc']));

// const search = () => console.log('params');
// const debouncedSearch = _.debounce(search, 500);
// debouncedSearch();
// debouncedSearch();
// debouncedSearch();

// const original = { a: 1, b: { c: 2 } };
// const copied = _.cloneDeep(original);
// copied.b.c = 999;
// console.log(original.b.c);

const obj1 = { user: { name: 'A' } };
const obj2 = { user1: { age: 20 } };
console.log(_.merge({}, obj1, obj2));