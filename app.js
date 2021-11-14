//Places for car park
const cars = document.querySelectorAll(".park");

const parking = document.querySelector(".parking-container");
// get username and password for create an account and save to localstorage
const userNameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const userAccountID = document.getElementById("id");
// account create button
const createBtn = document.getElementById("createBtn");
// not exactly backdrop but for show a message to successfull account creation 
const createAccBackdrop = document.querySelector(".create-backdrop");

const accontSection = document.querySelector(".account-container");
const userAccount = document.querySelector(".user-info-container");

const loginArea = document.querySelector(".login");
const loginBtn = document.getElementById("loginBtn");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");

const logoutBtn = document.getElementById("logoutBtn");

const reservBtn = document.getElementById("reserv");

let users = {};
let localUsers = "";
let counterReserv = 0;
let parkingPlace = "";

createBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  localUsers = localStorage.getItem(userNameInput.value);

  // For Empty Inputs Alert
  if (userNameInput.value === "" || passwordInput.value === "") {
    userNameInput.classList.add("danger-input");
    passwordInput.classList.add("danger-input");
    setTimeout(() => {
      userNameInput.classList.remove("danger-input");
      passwordInput.classList.remove("danger-input");
    }, 1000);
  }

  if (userNameInput.value !== "" && passwordInput.value !== "" && !localUsers) {
    let id = Math.random().toString(16).slice(2);
    users = {
      id: id,
      userName: userNameInput.value,
      password: passwordInput.value,
    };
    window.localStorage.setItem(users.userName, JSON.stringify(users));

    userNameInput.value = "";
    passwordInput.value = "";
    createAccBackdrop.style.display = "block";
    createAccBackdrop.innerHTML = "Your Account Successfully saved!";
    setTimeout(() => {
      createAccBackdrop.style.display = "none";
    }, 1000);
  } else if (userNameInput.value === JSON.parse(localUsers).userName) {
    userNameInput.value = `UserName "${userNameInput.value}" Already Exist`;
    passwordInput.value = "";
    userNameInput.classList.add("danger-input");
    setTimeout(() => {
      userNameInput.classList.remove("danger-input");
      userNameInput.value = "";
    }, 1000);
  }
});

// Login Proccess
loginBtn.addEventListener("click", () => {
  localUsers = localStorage.getItem(loginUsername.value)
    ? JSON.parse(localStorage.getItem(loginUsername.value))
    : [];
  const localStorageUserName = localUsers.userName;
  const localStoragePassword = localUsers.password;
  const localStorageID = localUsers.id;

  // Check inputs not empty for login
  if (loginUsername.value === "" || loginPassword.value === "") {
    alert("Enter Password and Username");
  } else if (loginUsername.value !== localStorageUserName) {
    alert("user not found!");
  } else if (loginPassword.value !== localStoragePassword) {
    alert("Wrong Password!");
  } else {
    // Create HTML Elements for user-info-container class
    // Section for Show user Info Like id , userName Password and Hours Input
    const userTitle = document.createElement("h2");
    const userPassword = document.createElement("p");
    const userID = document.createElement("p");
    let parkHours = document.createElement("input");
    parkHours.setAttribute("type", "number");
    parkHours.setAttribute("placeholder", "Hours");
    parkHours.className = "reserv-hours";

    // Show user info
    userTitle.innerHTML = "User Name: " + localStorageUserName;
    userPassword.innerHTML = "Password: " + localStoragePassword;
    userID.innerHTML = "ID: " + localStorageID;

    // Add Elements to DOM
    userAccount.insertBefore(userID, reservBtn);
    userAccount.insertBefore(userTitle, reservBtn);
    userAccount.insertBefore(userPassword, reservBtn);
    userAccount.insertBefore(parkHours, reservBtn);

    // When we are Login Decide What Sections must show or not show
    userAccount.style.display = "block";
    accontSection.style.display = "none";
    userAccount.style.display = "block";
    loginArea.style.display = "none";
  }
  // Reserv Parking
  let hours = document.querySelector(".reserv-hours");

  cars.forEach((car) => {
    car.addEventListener("click", (event) => {
      // get parking place for add hours in innerHTML (reservBtn event)
      parkingPlace = event.target;
      if (counterReserv < 1) {
        event.target.style.backgroundColor = "red";
      }
      counterReserv++;
    });
  });

  reservBtn.addEventListener("click", () => {
    // Check Hours input not Empty
    if (hours.value === 0) {
      alert("enter hours");
    } else {
      // Add hours to parking place number
      parkingPlace.innerHTML += "<br>" + hours.value + " hours";
    }
  });
});

// Logout Proccess
logoutBtn.addEventListener("click", () => {
  //Reset login input values when we are logout
  loginUsername.value = "";
  loginPassword.value = "";
  loginArea.style.display = "block";
  accontSection.style.display = "block";
  userAccount.style.display = "none";
  counterReserv = 0;
});
