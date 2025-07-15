/*
Bài tập javascript 3: Tại màn hình cho desktop, khi click vào block ở góc trên cùng bên trái 
thì thanh sidebar màu xanh lá sẽ ẩn/hiện, content chính sẽ rộng fullscreen. 
Tại màn hình tablet và mobile, khi ấn vào block xanh lá góc trên cùng bên phải, 
sidebar xanh lá sẽ hiện ra full màn hình, đè lên trên content, ấn lần nữa sẽ ẩn sidebar. 
Trong content, các ô nhỏ sẽ hiển thị thông tin các nhân vật trong 
ReqRes API lấy từ api https://reqres.in/api/users?page=1 phân trang, mỗi trang sẽ có 6 user (2 ngày)
*/

const api = "https://reqres.in/api/users?";

const getUser = async function (params) {
  try {
    const res = await fetch(api + params, {
      method: "GET",
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });
    const data = await res.json();
    return data;
  } catch (e) {
    error("Đã xảy ra lỗi: " + e);
  }
};

document.addEventListener("DOMContentLoaded", async function () {
  const usersContainer = document.querySelector(".container__users");
  const data = await getUser("page=1");
  usersContainer.innerHTML = "";

  data.data.forEach((user) => {
    const card = document.createElement("div");
    card.className = "container__card";
    card.innerHTML = `
      <img src="${user.avatar}" alt="${user.first_name}">
      <h3>${user.first_name} ${user.last_name}</h3>
      <p>${user.email}</p>
    `;

    usersContainer.appendChild(card);
  });
});

document.querySelector(".sidebar-toggle").addEventListener("click", function() {
  const sidebar = document.querySelector(".sidebar");
  if(sidebar.style.visibility === "hidden") sidebar.style.visibility = "visible"
  else sidebar.style.visibility = "hidden";
});