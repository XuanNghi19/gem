function setupNumberInput(inputElement) {
  const displayElement = document.getElementById("currentValue");

  // Cập nhật hiển thị giá trị
  function updateDisplay() {
    displayElement.textContent = `"${inputElement.value}"`;
  }

  // Kiểm tra xem ký tự có hợp lệ không
  function isValidChar(char, currentValue, position) {
    // Cho phép số
    if (/[0-9]/.test(char)) {
      return true;
    }

    // Cho phép dấu chấm (chỉ một dấu chấm)
    if (char === "." && !currentValue.includes(".")) {
      return true;
    }

    // Cho phép dấu trừ
    if (char === "-") {
      // Nếu đã có dấu trừ ở đầu và đang nhập dấu trừ thứ hai ở vị trí 1
      if (currentValue.startsWith("-") && position === 1) {
        return true; // Cho phép để xử lý chuyển thành số dương
      }
      // Chỉ cho phép dấu trừ ở đầu
      if (position === 0 && !currentValue.startsWith("-")) {
        return true;
      }
    }

    return false;
  }

  // Xử lý sự kiện keydown
  inputElement.addEventListener("keydown", function (e) {
    // Cho phép các phím điều khiển
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

    // Cho phép Ctrl+A, Ctrl+C, Ctrl+V
    if (e.ctrlKey && ["a", "c", "v"].includes(e.key.toLowerCase())) {
      return;
    }

    // Cho phép các phím điều khiển
    if (allowedKeys.includes(e.key)) {
      return;
    }

    // Lấy vị trí con trỏ
    const cursorPosition = e.target.selectionStart;
    const currentValue = e.target.value;
    const char = e.key;

    // Kiểm tra ký tự có hợp lệ không
    if (!isValidChar(char, currentValue, cursorPosition)) {
      e.preventDefault();
      return;
    }

    // Xử lý trường hợp đặc biệt: hai dấu trừ
    if (char === "-" && currentValue.startsWith("-") && cursorPosition === 1) {
      e.preventDefault();
      // Chuyển thành số dương bằng cách xóa dấu trừ
      const newValue = currentValue.substring(1);
      e.target.value = newValue;
      updateDisplay();
      return;
    }
  });

  // Xử lý sự kiện input (cho việc paste)
  inputElement.addEventListener("input", function (e) {
    let value = e.target.value;
    let newValue = "";
    let hasDecimal = false;
    let hasMinus = false;

    // Xử lý trường hợp paste hoặc input phức tạp
    for (let i = 0; i < value.length; i++) {
      const char = value[i];

      if (/[0-9]/.test(char)) {
        newValue += char;
      } else if (char === "." && !hasDecimal) {
        hasDecimal = true;
        newValue += char;
      } else if (char === "-") {
        if (i === 0 && !hasMinus) {
          hasMinus = true;
          newValue += char;
        } else if (i === 1 && newValue.startsWith("-")) {
          // Trường hợp hai dấu trừ: chuyển thành số dương
          newValue = newValue.substring(1);
          hasMinus = false;
        }
      }
    }

    // Cập nhật giá trị nếu có thay đổi
    if (value !== newValue) {
      e.target.value = newValue;
    }

    updateDisplay();
  });

  // Cập nhật hiển thị ban đầu
  updateDisplay();
}
