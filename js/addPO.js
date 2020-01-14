let sel_supplier = document.getElementById("sel-suppleir");
let supName = document.getElementById("supplierName");
let supNumber = document.getElementById("supplierNumber");
let supAdd = document.getElementById("supplierAddress");
let supplier = [];
let addPOBTN = document.getElementById("addPO");
db.ref("supplier/").on("value", data => {
  supplier = Object.values(data.val());
});


function addPO() {
  sel_supplier.innerHTML = "";
  var option = document.createElement("option");
  option.text = "--Select Supplier--";
  sel_supplier.appendChild(option);
  for (let i = 0; i < supplier.length; i++) {
    var option = document.createElement("option");
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
  addPOBTN.classList += ' disabled'
}
function addItem() {
}
