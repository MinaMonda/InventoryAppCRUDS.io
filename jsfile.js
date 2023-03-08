// Variables
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("categoty");
let submit = document.getElementById("submit");
let mood = "Cereate";
let tmp;
let searchMood = "Title";
// Array to save products
let dataPro = [];

//get total
function getTotal() {
  if (price.value != "" && price.value > 0 && count.value > 0) {
    let sum1 = parseInt(price.value) * parseInt(count.value);
    let sum2 = +taxes.value * +count.value;
    let sum3 = +discount.value * +count.value;
    let finalResult = sum1 + sum2 - sum3;
    total.innerHTML = finalResult;
    total.style.background = "green";
  } else if (price.value != "" && price.value > 0) {
    let result = +price.value + +taxes.value + +ads.value;
    result = result - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

//Check if there is local storage is not empty
// and if it not empty transfer the data from storage to array to show the data in the site
if (localStorage.products != null) {
  dataPro = JSON.parse(localStorage.products);
} else {
  dataPro = [];
}
//Create Product & Clear Fildes
submit.onclick = function () {
  if (
    title.value != "" &&
    price.value > 0 &&
    count.value != 0 &&
    category.value != "" &&
    count.value <= 100 &&
    mood == "Cereate" &&
    count.value >= 1
  ) {
    //opject to save products
    let newPro = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLowerCase(),
    };
    // creating products as the number of count

    for (i = 0; i < newPro.count; i++) {
      dataPro.push(newPro);
    }
    // transfer the data from array to local storage
    localStorage.setItem("products", JSON.stringify(dataPro));
    // reloading the site
    location.reload(true);
    // alert msg to the user
  } else if (mood == "Cereate") {
    window.alert(
      "Make Sure To fill All fealeds And the count is Between 1 to 100!"
    );
  }
  // updateing mood
  else if (title.value != "" && price.value > 0 && category.value != "") {
    dataPro[tmp].title = title.value;
    dataPro[tmp].price = price.value;
    dataPro[tmp].taxes = taxes.value;
    dataPro[tmp].ads = ads.value;
    dataPro[tmp].discount = discount.value;
    dataPro[tmp].category = category.value;
    mood = "Cereate";
    count.style.display = "block";
    submit.innerHTML = "Create";
    localStorage.setItem("products", JSON.stringify(dataPro));
    showData();
    clearData();
  } else {
    window.alert(
      "Make Sure To fill All fealeds And the count is Between 1 to 100!"
    );
  }
  showData();
};

// Clear Data
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerText = "";
  count.value = "";
  category.value = "";
  total.style.background = "#a00d02";
}
//Show Data

function showData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += ` <tr>
         <td>${i + 1}</td>
         <td>${dataPro[i].title}</td>
         <td>${dataPro[i].price}</td>
         <td>${dataPro[i].taxes}</td>
         <td>${dataPro[i].ads}</td>
         <td>${dataPro[i].discount}</td>
         <td>${dataPro[i].total}</td>
         <td>${dataPro[i].category}</td>
         
         <td><button onclick="updateData(${i})" id="update">Update</button></td>
         <td><button id="delete" onclick="DeleteItem(${i})">Delete</button></td>
    </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  if (dataPro.length > 0) {
    let deleteAll = document.getElementById("deleteAll");
    deleteAll.innerHTML = `<button onclick="deleteAllItems()">Delete All (${dataPro.length} Products)</button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}

showData();

// Delete 1 item

function DeleteItem(i) {
  //Confirmation before delete
  let text = `Are you sure you want to delet ( ${dataPro[i].title} )`;
  if (confirm(text) == true) {
    //Delete if the user is sure
    dataPro.splice(i, 1);
    localStorage.products = JSON.stringify(dataPro);
    showData();
  } else {
    showData();
  }
}

//Delete All Items

function deleteAllItems() {
  let text = prompt("Are you sure you want to delet this item? Y or N");
  text = text.toLowerCase();
  if (text === "y") {
    localStorage.clear();
    dataPro.splice(0);
    showData();
    clearData();
    deleteAll.innerHTML = "";
  } else if (text === "n") {
    showData();
  } else {
    alert("You Should Answer With Y Or N");
  }
}
// update buttons
function updateData(i) {
  // السكرول بتطلع لفوق بنعومه
  scroll({ top: 0, behavior: "smooth" });
  window.scro;
  mood = "update";
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  count.style.display = "none";
  submit.innerHTML = "Update";
  getTotal();
  tmp = i;
}
//Search Mode

function SM(id) {
  const search = document.getElementById("search");
  search.focus();
  if (id == "searchByTitle") {
    search.placeholder = "Search By Title";
  } else {
    search.placeholder = " Search By Category";
    searchMood = "Category";
  }
  console.log(id);
  console.log(searchMood);
}
