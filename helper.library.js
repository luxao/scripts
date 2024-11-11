const log = console.log.bind(document)

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

// 6.5 GET PARAMETERS NAME
function getParamName(paramName) {
    var qs = window.location.search;
    qs = qs.substring(qs.indexOf("?") + 1) || qs.substring(qs.indexOf("&") + 1);
    allParams = qs.split("&");
    for (var i = 0; i < allParams.length; i++) {
        keyVal = allParams[i].split("=");
        if (keyVal[0] == paramName) {
            return decodeURI(keyVal[1]);
        }
    }
    return "";
}

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

// 28. Check if is a num
const isNum = (num) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/** PERFORMANCE TIMER
 * 
 * const start = performance.now()
 * SOME PROGRAM
 * const end = performance.now()
 * const total = start - end
 * 
 */

function convertSecondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}m ${String(remainingSeconds).padStart(2, '0')}s`;
}

function countInversions(arr) {
    let inversions = 0;
    let flatArray = arr.flat(); 
    for (let i = 0; i < flatArray.length; i++) {
        for (let j = i + 1; j < flatArray.length; j++) {
            if (flatArray[i] > flatArray[j] && flatArray[j] != 0) {
                inversions++;
            }
        }
    }
    return inversions;
}

function toRadians(angle, half) {
    return angle * (Math.PI / half);
}

function checkVideoTime(video_id) {
    var video = e$(video_id)[0]
    var duration = video.duration
    e$(video_id).on('timeupdate', function() {
        var currentTime = video.currentTime;
        var threshold = 0.1; 
        if (currentTime > duration - threshold) {
            video.currentTime = 0;
        }
    });
}

function findDuplicates(arr) {
    return arr.filter((currentValue, currentIndex) =>
    arr.indexOf(currentValue) !== currentIndex);
}

function deleteDiacritics(text) {
  return text
    .normalize('NFD') 
    .replace(/[\u0300-\u036f]/g, ''); 
}

// ID OF TEXT
function animText(index){
    var text = document.querySelector('#b-'+index);
    var letters = text.textContent.split("");
    text.textContent = ""; // Clear the original text

    letters.forEach(function(letter, index) {
    var span = document.createElement("span");
    span.textContent = letter;
    span.style.animationDelay = (index * 0.1) + "s"; // Delay each letter's animation
    text.appendChild(span);
  });
}

 function _send_postmessage(el){
    try{
        window.postMessage(el,'*');    
    }catch(e){
        console.log(e);
    }
    try{
        window.top.postMessage(el,'*');    
    }catch(e){
        console.log(e);
    }
    try{
        parent.postMessage(el,'*');    
    }catch(e){
        console.log(e);
    }
    try{
        parent.top.postMessage(el,'*');    
    }catch(e){
        console.log(e);
    }
    try{
        top.postMessage(el,'*');    
    }catch(e){
        console.log(e);
    }
}

function _createObserver(_et_target, _et_flag, _et_handleIntersect) {
    let _et_options = {
        root: null,
        rootMargin: "0px",
        treshold: _et_adapt_buildTresholdList(),
    };

    let _et_observer = new IntersectionObserver(
        _et_handleIntersect,
        _et_options
    );
    if (_et_flag === 1) {
        if (_et_target != null) {
            _et_observer.observe(_et_target);
        }
    } else {
        _et_observer.unobserve(_et_target);
    }
}

function _handleIntersect(entries) {
    entries.forEach((entry) => {
        //TODO:
    });
}



function _buildTresholdList() {
    let thresholds = [];
    let numSteps = 100;

    for (let i = 1.0; i <= numSteps; i++) {
        let ratio = i / numSteps;
        thresholds.push(ratio);
    }
    thresholds.push(0);
    return thresholds;
}

function getTimestamp() {
    return new Date().getTime();
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function _createEl(el, id, cssClass, textFlag, text) {
    let div = document.createElement(el)
    div.id = id
    div.className = cssClass
    if (textFlag) {
        div.innerHTML  = text
    }
    return div
}


// EXAMPLE OF JQUERY AJAX
// $.ajax({
//         url: '',
//         contentType: 'application/json',
//         type: 'post',
//         headers: {"Authorization": "")},
//         data: JSON.stringify(dataToSend),
//         success: function(){
//         	
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//             
//         }
//     });


// ==== EXAMPLE OF USING SLIDER ==== 
// var slider = document.getElementById('cards-container'),
//     sliderItems = document.getElementById('cards-slider'),
//     prev = document.getElementById('arrow_l'),
//     next = document.getElementById('arrow_r');

// function slide(wrapper, items, prev, next) {
//   var posX1 = 0,
//       posX2 = 0,
//       posInitial = -155,
//       posFinal,
//       threshold = 100,
//       slides = items.getElementsByClassName('card'),
//       slidesLength = slides.length,
//       slideSize = 220,
//       firstSlide = slides[0],
//       lastSlide = slides[slidesLength - 1],
//       cloneFirst = firstSlide.cloneNode(true),
//       cloneLast = lastSlide.cloneNode(true),
//       index = 0,
//       allowShift = true;
  
//   cloneFirst.id = `card-${finalCountCards + 1}`
//   cloneLast.id = `card-${finalCountCards + 2}`
//   cloneFirst.className = `card card-${finalCountCards + 1}`
//   cloneLast.className = `card card-${finalCountCards + 2}`
  
//   beforeIndex = parseInt(cloneLast.id.split("-")[1])
  
//   items.appendChild(cloneFirst);
//   items.insertBefore(cloneLast, firstSlide);
//   wrapper.classList.add('loaded');
  
//   items.onmousedown = dragStart;
  
//   items.addEventListener('touchstart', dragStart);
//   items.addEventListener('touchend', dragEnd);
//   items.addEventListener('touchmove', dragAction);
  
//   prev.addEventListener('click', function () { shiftSlide(-1) });
//   next.addEventListener('click', function () { shiftSlide(1) });
  
//   items.addEventListener('transitionend', checkIndex);
  
//   function dragStart (e) {
//     e = e || window.event;
//     posInitial = items.offsetLeft;
    
//     if (e.type == 'touchstart') {
//       posX1 = e.touches[0].clientX;
//     } else {
//       posX1 = e.clientX;
//       document.onmouseup = dragEnd;
//       document.onmousemove = dragAction;
//     }
//   }

//   function dragAction (e) {
//     e = e || window.event;
    
//     if (e.type == 'touchmove') {
//       posX2 = posX1 - e.touches[0].clientX;
//       posX1 = e.touches[0].clientX;
//     } else {
//       posX2 = posX1 - e.clientX;
//       posX1 = e.clientX;
//     }
//     items.style.left = (items.offsetLeft - posX2) + "px";
//   }
  
//   function dragEnd (e) {
//     posFinal = items.offsetLeft;
//     if (posFinal - posInitial < -threshold) {
//       shiftSlide(1, 'drag');
//     } 
//     else if (posFinal - posInitial > threshold) {
//       shiftSlide(-1, 'drag');
//     } 
//     else {
//       items.style.left = (posInitial) + "px";
//     }

//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
  
  
//   function shiftSlide(dir, action) {
//     items.classList.add('shifting');
    
//     if (allowShift) {
//       if (!action) { posInitial = items.offsetLeft; }
//       if (dir == 1) {
//             items.style.left = (posInitial - slideSize) + "px";
//             index++;   
//             if (mouseIn && interact) {
//                 if (action == 'drag') {
//                     userAction('SWIPE_LEFT',false);
//                 }
//                 if (index == slidesLength) { userAction('MANUAL_VIEW@1',false);}
//                 else {userAction('MANUAL_VIEW@'+(index+1),false);}
//             }
//       } 
//       else if (dir == -1) {
//         items.style.left = (posInitial + slideSize) + "px";
//         index--;    
//          if (mouseIn && interact) {
//             if (action == 'drag') {
//                 userAction('SWIPE_RIGHT',false);
//             }
//             if (index == -1) {userAction('MANUAL_VIEW@'+(slidesLength),false);}
//             else {userAction('MANUAL_VIEW@'+(index+1),false);}
//         }
//       }
//     };
    
//     allowShift = false;
//   }
    
//   function checkIndex (){
//     items.classList.remove('shifting');
//     if (index == -1) {
//       let leftValue = (-(slidesLength * slideSize)) + 65
//       items.style.left = leftValue + "px";
//       index = slidesLength - 1;
//     }

     
//     if (index == slidesLength) {
//       let leftValue = -((1 * 155) )
//       items.style.left = leftValue + "px";
//       index = 0;
//     }
    
//     allowShift = true;
//   }
  
  

// }



//========SWIPE && DRAG EXAMPLE ============
//     var start_x=0;
//     var end_x=0;
//     var start_y=0;
//     var end_y=0;
//     var mouse_down = false;
//     var mouse_move = false;
//     var changing  = false;
    
//     function swipe(flag){
//         if(mouse_down && mouse_move){
//             if(Math.abs(start_y - end_y) < Math.abs(start_x - end_x)){
                
//                 if((start_x-end_x) > 0){
//                     userAction("SWIPE_LEFT",false);
//                     if (flag) {
//                         moveShip(-1)
//                     }
//                     else {
//                         moveImg(-1)
//                     }
//                 }else{
//                     userAction("SWIPE_RIGHT",false);
//                     if (flag) {
//                         moveShip(1)
//                     }
//                     else {
//                         moveImg(1)
//                     }
//                 }
                
//                 start_x=0;
//                 end_x=0;
//                 start_y=0;
//                 end_y=0;
//                 setTimeout(function(){mouse_down = false;},0);
//                 mouse_move = false;
//                 changing  = true;
//                 return;
//             }
            
            
//             start_x=0;
//             end_x=0;
//             start_y=0;
//             end_y=0;
//             mouse_move = false;
//             setTimeout(function(){mouse_down = false;},0);
//         }
        
//     }
//   e$(document).ready(function (){
      
      
//       e$('.ship').on('mousedown',function(e){
//           e.preventDefault();
//           e.stopPropagation();
//           mouse_down = true;
//           start_x = e.pageX;
//           start_y = e.pageY;
//           e$("#glow").hide()
//       });
//       e$('.ship').on('touchstart',function(e){
//           //e.preventDefault();
//           //e.stopPropagation();
//           mouse_down = true;
//           start_x = e.originalEvent.touches[0].pageX;
//           start_y = e.originalEvent.touches[0].pageY;
//           e$("#glow").hide()
//       });
      
//         e$('.ship').on('mousemove',function (e){
//             if (e.buttons>0)mouse_move = true;
//             e.preventDefault();
//             e.stopPropagation();
//         });
//         e$('.ship').on('mouseleave mouseup',function (e){
            
//             end_x = e.pageX > 0 ? e.pageX : 1;
//             end_y = e.pageY > 0 ? e.pageY : 1;
//             swipe(true);
//             e$("#glow").show()
//         });
//         e$('.ship').on('mouseleave',function (e){
//           mouse_down = false;
//           e$("#glow").show()
//         });
        
//         e$('.ship').on('touchend',function (e){
           
//             end_x = e.originalEvent.changedTouches[0].pageX > 0 ? e.originalEvent.changedTouches[0].pageX : 1;
//             end_y = e.originalEvent.changedTouches[0].pageY > 0 ? e.originalEvent.changedTouches[0].pageY : 1;
            
//             swipe(true);
//             e$("#glow").show()
//             changing = false;
//         });
        
//         e$('.ship').on('touchmove',function (e){
//             mouse_move = true;
//           if(Math.abs(start_y - e.originalEvent.changedTouches[0].pageY) <100){}
//         });
        
        
//       e$('.ship-services').on('mousedown',function(e){
//           e.preventDefault();
//           e.stopPropagation();
//           mouse_down = true;
//           start_x = e.pageX;
//           start_y = e.pageY;
          
//       });
//       e$('.ship-services').on('touchstart',function(e){
//           //e.preventDefault();
//           //e.stopPropagation();
//           mouse_down = true;
//           start_x = e.originalEvent.touches[0].pageX;
//           start_y = e.originalEvent.touches[0].pageY;
          
//       });
      
//         e$('.ship-services').on('mousemove',function (e){
//             if (e.buttons>0)mouse_move = true;
//             e.preventDefault();
//             e.stopPropagation();
//         });
//         e$('.ship-services').on('mouseleave mouseup',function (e){
            
//             end_x = e.pageX > 0 ? e.pageX : 1;
//             end_y = e.pageY > 0 ? e.pageY : 1;
//             swipe(false);
            
//         });
//         e$('.ship').on('mouseleave',function (e){
//           mouse_down = false;
          
//         });
        
//         e$('.ship-services').on('touchend',function (e){
           
//             end_x = e.originalEvent.changedTouches[0].pageX > 0 ? e.originalEvent.changedTouches[0].pageX : 1;
//             end_y = e.originalEvent.changedTouches[0].pageY > 0 ? e.originalEvent.changedTouches[0].pageY : 1;
            
//             swipe(false);
            
//             changing = false;
//         });
//         e$('.ship-services').on('touchmove',function (e){
//             mouse_move = true;
//           if(Math.abs(start_y - e.originalEvent.changedTouches[0].pageY) <100){}
//         });

//     });
//=========================================================================================================================
