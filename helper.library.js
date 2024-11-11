// 1. Deep Clone Object 
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// 2. Random Number Generator
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);   
}

// 3. Check if Array is Empty
const isEmptyArray = (arr) => Array.isArray(arr) && arr.length === 0;

// 4. Unique Array Elements 
const uniqueArray = (arr) => [...new Set(arr)];

// 5. Convert Camel Case to Snake Case
const camelToSnake = (str) => str.replace(/([A-Z])/g, "_$1").toLowerCase()

// 6. GET URL Parameters
const getURLParams = () => Object.fromEntries(new URLSearchParams(window.location.search))

// 7. Capitalize First Letter of Each Word
const capitalizeWords = (str) => str.replace(/\b\w/g, (char) => char.toUpperCase());

// 8. Check if Object is Empty 
const isEmptyObject = (obj) => Object.keys(obj).length === 0;

// 9. Check for palindrome
function isPalindrome(str) {
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    return cleanedStr === cleanedStr.split("").reverse().join("")
}

// 10. Fetch Data from an API
const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
}

// 11. Random Color Generator
const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`

// 12. Convert String to Title Case
const toTitleCase = (str) => str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())

// 13. Get current Date and Time
const now = new Date().toLocaleString()

// 14. Check if a Number is Event or Odd
const isEven = (num) => num % 2 === 0;

// 15. Find the Maximum Value in an Array
const maxInArray = (arr) => Math.max(...arr);

// 16. Sort an Array of Numbers
const sortNumbers = (arr) => arr.sort((a, b) => a - b);

// 17. Flatten Nested Arrays
const flattenArray = (arr) => arr.flat(Infinity);

// 18. Reverse a String
const reverseString = (str) => str.split("").reverse().join("")

// 19. Shuffle an Array
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

// 20. Merge Two Arrays
const mergeArrays = (arr1, arr2) => [...arr1, ...arr2];

// 21. Merge Two Objects
function mergeObjects(obj1, obj2) {
  return {...obj1, ...obj2};
}

// 22. Remove a specific item from an array
function arrayRemove(arr, value) {
  return arr.filter(item => item !== value);
}

// 23. Check if is an Array
function isArray(value) {
  return Array.isArray(value);
}

// 24. Check if is an Object
function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

// 25. Check if is a function
function isFunction(value) {
  return typeof value === 'function';
}

// 26. Check if is a null
function isNull(value) {
  return value === null;
}

// 27. Check if is an undefined
function isUndefined(value) {
  return typeof value === 'undefined';
}