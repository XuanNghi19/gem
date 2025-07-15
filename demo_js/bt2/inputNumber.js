/**
 * (1) Chỉ cho phép nhập số với thẻ <input type='text'>
 * (2) cho phép nhập số thập phân (số có chứa 1 '.')
 * (3) cho phép nhập số âm (cho dấu '-' ở đầu)
 * (4) cho phép nhập hai dấu '--' biến chuỗi hiện tại thành số dương
 * (5) cho phép ctrl + c, ctrl + v, ctrl + a
 * (6) xử lý trường hợp giá trị được paste vào
 */

const inputNumber = document.getElementById("inputNumber");

function isValidChar(char, crrValue = "", position = 0) {
  // (1)
  if (/[0-9]/.test(char)) {
    return true;
  }

  // (2)
  if (char === "." && !crrValue.includes(".")) {
    return true;
  }

  if (char === '-') {
    // cho phép xử lý để thành số dương
    if (crrValue.startsWith("-") && position === 1) {
      return true;
    }

    // (3)
    if (position === 0 && !crrValue.startsWith("-")) {
      return true;
    }
  }

  return false;
}

inputNumber.addEventListener("keydown", function (e) {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "Tab",
    "Escape",
    "Enter",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Home",
    "End",
  ];

  // (5)
  if(e.ctrlKey && ['a', 'c', 'v'].includes(e.key.toLowerCase())) {
    return;
  }

  // cho phép các phím điều khiển
  if(allowedKeys.includes(e.key)) {
    return;
  }

  const cursorPos = e.target.selectionStart;
  console.log(cursorPos);
  const crrVal = e.target.value;
  const char = e.key;

  if(!isValidChar(char, crrVal, cursorPos)) {
    e.preventDefault();
    return;
  }

  // (4)
  if(char === '-' && crrVal.startsWith('-') && cursorPos === 1) {
    e.preventDefault();

    const newVal = crrVal.substring(1);
    e.target.value = newVal;
    return;
  }
});

inputNumber.addEventListener('input', function(e) {
  let val = e.target.value;
  let newVal = '';
  let hasDecimal = false;
  let hasMinus = false;

  // (6) 
  for(let i = 0; i < val.length; i++) {
    const char = val[i];

    if(/[0-9]/.test(char)) {
      newVal += char;
    } else if (char === '.' && !hasDecimal) {
      hasDecimal = true;
      newVal += char;
    } else if (char === '-') {
      if (i === 0 && !hasMinus) {
        hasMinus = true;
        newVal += char;
      } else if (i === 1 && newVal.startsWith('-')) {
        newVal = newVal.substring(1);
        hasMinus = false;
      }
    }
  }

  if(val !== newVal) {
    e.target.value = newVal;
  }
});