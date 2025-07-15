/*
Bài tập javascript 2:  Javascript DOM cơ bản. 
DOD: Tạo các pen với các nội dung sau (chỉ dùng javascript, không dùng thư viện ngoài) : 
(1) 1 button với text là 'click', khi click vào button thì text của button đổi thành 'clicked' , 
(2) 1 button, 1 input[type=text] và 1 div, mỗi khi nhập gì vào input rồi ấn button thì nội dung trong input sẽ vào trong div, ko đè lên nội dung cũ, 
và text của input sẽ được clear. 
(3) tạo 1 input[type=text] nhưng lại chỉ cho phép người dùng nhập vào số (có dấu thập phân, có dấu âm, có thể backspace và select all text trong input được
*/

document.getElementById("click").addEventListener("click", function() {
  this.value = 'clicked';
  console.log("st");
});
