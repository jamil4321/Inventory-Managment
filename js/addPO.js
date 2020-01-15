let sel_supplier = document.getElementById("sel-suppleir");
let supName = document.getElementById("supplierName");
let supNumber = document.getElementById("supplierNumber");
let supAdd = document.getElementById("supplierAddress");
let sel_item = document.getElementById('sel-item')
let supplier = [];
let items = [];
let addPOBTN = document.getElementById("addPO");
db.ref("supplier/").on("value", data => {
  supplier = Object.values(data.val());
});
db.ref("item/").on("value", data => {
  items = Object.values(data.val());
  for (let i = 0;i < items.length; i++){
    itemName.push(items[i].itemName) 
   }
});

function addPO() {
  sel_supplier.innerHTML = "";
  var option = document.createElement("option");
  option.text = "--Select Supplier--";
  sel_supplier.appendChild(option);
  for (let i = 0; i < supplier.length; i++) {
    option = document.createElement("option");
    option.value = supplier[i].supplierName;
    option.text = supplier[i].supplierName;
    sel_supplier.appendChild(option);
  }
}
function startPO() {
  supName.disabled = true;
  supNumber.disabled = true;
  supAdd.disabled = true;

  for (let i = 0; i < supplier.length; i++) {
    if (sel_supplier.value === supplier[i].supplierName) {
      supName.value = supplier[i].supplierName;
      supNumber.value = supplier[i].supplierNumber;
      supAdd.value = supplier[i].supplierAddress;
      break;
    }
  }
  addPOBTN.classList += " disabled";
}
function findItem() {
  sel_item.innerHTML = "";
  var option = document.createElement("option");
  option.text = "--Select Supplier--";
  sel_item.appendChild(option);
  for (let i = 0; i < items.length; i++) {
    if (sel_supplier.value === items[i].supplier) {
      option = document.createElement("option");
      option.value = items[i].itemName;
      option.text = items[i].itemName;
      sel_item.appendChild(option);
    }
  }
}


// Find Item via search box
let search = document.getElementById('searchItem')
let itemName = [];
search.addEventListener('keyup',(e)=>{
  let key = e.target.value.toLowerCase()
  itemName.forEach((item)=>{
    if(item.indexOf(key) != -1){
      console.log(item)
    }else{
      console.log('no item found')
    }
  })
})