const arr = [1, 2, 4, 5, 6, 2, 3, 5];
// first approach

const obj = {};
const originalArr = []; 
for (let i = 0; i < arr.length; i++) {
    // console.log(arr[i]);
    if (!obj[arr[i]]) {
        obj[arr[i]] = true
        originalArr.push(arr[i]);
    }
}
console.log(obj);
console.log(originalArr);

//second by filter
// const newArr=arr.filter((item,index)=>)