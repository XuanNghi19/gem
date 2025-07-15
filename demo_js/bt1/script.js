/**
 * Bài tập javascript 1:
 * Làm ví dụ thêm sửa xóa phần tử trong mảng object
 * ( mảng object có format: [ { id: number, age: number, name: string }])
 */

let users = [
  { id: 1, name: "Mai Văn Quyết", age: 22 },
  { id: 2, name: "Mai Văn Thắng", age: 21 },
  { id: 3, name: "Mai Văn Định", age: 23 },
  { id: 4, name: "Mai Văn Thống", age: 45 },
];

document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("users")) {
    users = JSON.parse(sessionStorage.getItem("users"));
  } else sessionStorage.setItem("users", JSON.stringify(users));

  const userTable = document.getElementById("userTable");
  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.age}</td>
    <td>
      <button onclick="deleteUser(${user.id})">Xóa</button>
      <button onclick="showEditUser(${user.id})">Sửa</button>
    </td>
    `;

    userTable.append(row);
  });
});

function addUser() {
  const addUserForm = document.querySelector("#addUserForm");
  const id = Number(addUserForm.elements["id"].value);
  const name = addUserForm.elements["name"].value;
  const age = Number(addUserForm.elements["age"].value);

  if (id && name && age) {
    if (users.find((user) => user.id === id)) {
      alert("id đã tồn tại!");
      return;
    }
    users.unshift({
      id,
      name,
      age,
    });

    sessionStorage.setItem("users", JSON.stringify(users));
    alert("Thêm thành công");
  } else alert("Vui lòng nhập đầu đủ thông tin!");
}

function showEditUser(id) {
  const editUserForm = document.querySelector("#editUserForm");
  const user = users.find((user) => user.id === id);
  editUserForm.elements["id"].value = user.id;
  editUserForm.elements["name"].value = user.name;
  editUserForm.elements["age"].value = user.age;
  editUserForm.style.visibility = "visible";
}

function showAddUser() {
  const addUserForm = document.querySelector("#addUserForm");
  addUserForm.style.visibility = "visible";
}

function editUser() {
  const addUserForm = document.querySelector("#editUserForm");

  const id = Number(addUserForm.elements["id"].value);
  const name = addUserForm.elements["name"].value;
  const age = Number(addUserForm.elements["age"].value);

  if (id && name && age) {
    const user = users.find((user) => user.id === id);
    if (user === null || user === undefined) {
      alert(`id ${id} không tồn tại!`);
      return;
    }

    user.name = name;
    user.age = age;

    confirm("Sửa người dùng thành công!");
    sessionStorage.setItem("users", JSON.stringify(users));
  } else alert("Vui lòng nhập đầu đủ thông tin!");
}

function deleteUser(id = 0) {
  const action = confirm("Xác nhận xóa người dùng!");
  if (action) {
    const user = users.find((user) => user.id === id);

    if (user) {
      users.splice(
        users.findIndex((user) => user.id === id),
        1
      );
      
      alert("Xóa thành công!");
      sessionStorage.setItem("users", JSON.stringify(users));
      window.location.reload();
    } else alert("Khong ton tai user voi id " + id);
  }
}
