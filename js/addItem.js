// View Data in Html
const itemRef = db.ref("item/");
let item = [];
let selectSupplier = document.getElementById('selectSpplier')
let supplire = [];
db.ref("supplier/").once("value", data => {
   supplire= Object.values(data.val());
  for (let i = 0; i < supplire.length; i++) {
    var option = document.createElement("option");
    option.value = supplire[i].supplierName;
    option.text = supplire[i].supplierName;
    selectSupplier.appendChild(option);
}
});
//Get realtime data
itemRef.on("value", function(snapshot) {
  let itemTable = document.getElementById("item");
  itemTable.innerHTML = "";
  if (!snapshot.val()) return;
  item = Object.values(snapshot.val());
  var j = 0;
  for (key in snapshot.val()) {
    item[j++].key = key;
  }
  itemTable.innerHTML += `
  <tbody>
                <tr>
                  <th>Sr No.</th>
                  <th>item Name</th>
                  <th>cost price</th>
                  <th>sale price</th>
                  <th>supplier Name</th>
                  <th>Status</th>
                  <th></th>
                  <th></th>
                </tr>
  `;
  for (var i = 0; i < item.length; i++) {
    itemTable.innerHTML += `
                  <tr>
                      <td>${i + 1}</td>
                      <td>${item[i].itemName}</td>
                      <td>${item[i].costPrice}</td>
                      <td>${item[i].salePrice}</td>
                      <td>${item[i].supplier}</td>
                      <td>${item[i].isActive}</td>
                      <td>
                      <button onclick="getitem('${
                        item[i].key
                      }')" data-toggle="modal"
                      data-target="#addItem" class="btn btn-warning">Edit</button>
                      </td>
                      <td><button onclick="delteitem('${
                        item[i].key
                      }')" class="btn btn-danger">Delete</button></td>
                  </tr>`;
  }
  itemTable.innerHTML += "</tbody>";
});

// Add item Function
function additem() {
  let itemName = document.getElementById("itemName");
  let costPrice = document.getElementById("costPrice");
  let salePrice = document.getElementById("salePrice");
  let uom = document.getElementById("uom");
  let isActive = document.getElementById("isActive");
  let status;
  if (isActive.checked) {
    status = "enable";
  } else {
    status = "disable";
  }
  let itemId = db
    .ref()
    .child("posts")
    .push().key;

  db.ref("item/" + itemId).set({
    itemName: itemName.value.toLowerCase(),
    costPrice: costPrice.value,
    salePrice: salePrice.value,
    uom: uom.value,
    supplier: selectSpplier.value,
    isActive: status
  });

  itemName.value = "";
  costPrice.value = "";
  salePrice.value = "";
  uom.value = "";
  selectSupplier.value = "";
  isActive.checked = false;
}
// get item
function getitem(itemKey) {
  let itemName = document.getElementById("itemName");
  let costPrice = document.getElementById("costPrice");
  let salePrice = document.getElementById("salePrice");
  let uom = document.getElementById("uom");
  let isActive = document.getElementById("isActive");
  let senditemData = document.getElementById("senditem");
  console.log(selectSupplier.value)
  db.ref("item/" + itemKey + "/").once("value", data => {
    dbData = data.val();
    itemName.value = dbData.itemName;
    costPrice.value = dbData.costPrice;
    salePrice.value = dbData.salePrice;
    uom.value = dbData.uom;
    console.log(selectSupplier.value)
    selectSupplier.value = dbData.supplier;
    console.log(selectSupplier.value)
    if (dbData.isActive == "enable") {
      isActive.checked = true;
    } else {
      isActive.checked = false;
    }
  });
  senditemData.onclick = function() {
    updateitem(itemKey, itemName,costPrice,salePrice,uom,selectSupplier, isActive);
  };
  senditemData.innerHTML = "Update Record";
}
// Update item
function updateitem(itemKey, name,cost,sale,uom,supplier, checked) {
  let senditemData = document.getElementById("senditem");
  let active;
  if (checked.checked) {
    active = "enable";
  } else {
    active = "disable";
  }
  db.ref("item/" + itemKey).update({
    itemName: itemName.value.toLowerCase(),
    costPrice: cost.value,
    salePrice: sale.value,
    uom: uom.value,
    supplier: selectSpplier.value,
    isActive: active
  });
  name.value = "";
  cost.value = '';
  sale.value = '';
  uom.value ='';
  supplier.value='';
  checked.checked = false;
  senditemData.innerHTML = "Add Record";
}
// Delete item
function delteitem(itemKey) {
  db.ref("item/" + itemKey).remove();
}
