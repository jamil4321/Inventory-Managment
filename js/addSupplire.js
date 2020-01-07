// View Data in Html
const supplierRef = db.ref("supplier/");
let supplier = [];
//Get realtime data
supplierRef.on("value", function(snapshot) {
  let supplierTable = document.getElementById("supplier");
  supplierTable.innerHTML = "";
  if (!snapshot.val()) return;
  supplier = Object.values(snapshot.val());
  var j = 0;
  for (key in snapshot.val()) {
    supplier[j++].key = key;
  }
  supplierTable.innerHTML += `
    <tbody>
                  <tr>
                    <th>Sr No.</th>
                    <th>Supplire Name</th>
                    <th>Supplire Number</th>
                    <th>Supplire Address</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                  </tr>
    `;
  for (var i = 0; i < supplier.length; i++) {
    supplierTable.innerHTML += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${supplier[i].supplierName}</td>
                        <td>${supplier[i].supplierNumber}</td>
                        <td>${supplier[i].supplierAddress}</td>
                        <td>${supplier[i].isActive}</td>
                        <td>
                        <button onclick="getsupplier('${
                          supplier[i].key
                        }')" data-toggle="modal"
                        data-target="#addSuplier" class="btn btn-warning">Edit</button>
                        </td>
                        <td><button onclick="deltesupplier('${
                          supplier[i].key
                        }')" class="btn btn-danger">Delete</button></td>
                    </tr>`;
  }
  supplierTable.innerHTML += "</tbody>";
});

// Add supplier Function
function addSupplier() {
  let supplierName = document.getElementById("supplierName");
  let supplierNumber = document.getElementById("supplierNumber");
  let supplierAddress = document.getElementById("supplierAddress");
  let isActive = document.getElementById("isActive");
  let status;
  if (isActive.checked) {
    status = "Enable";
  } else {
    status = "Disable";
  }
  let supplierId = db
    .ref()
    .child("posts")
    .push().key;

  db.ref("supplier/" + supplierId).set({
    supplierName: supplierName.value.toLowerCase(),
    supplierNumber: supplierNumber.value,
    supplierAddress: supplierAddress.value.toLowerCase(),
    isActive: status
  });

  supplierName.value = "";
  supplierNumber.value = "";
  supplierAddress.value = "";
  isActive.checked = false;
}
// get supplier
function getsupplier(supplierKey) {
  let supplierName = document.getElementById("supplierName");
  let supplierNumber = document.getElementById("supplierNumber");
  let supplierAddress = document.getElementById("supplierAddress");
  let isActive = document.getElementById("isActive");
  let sendsupplierData = document.getElementById("sendSupplier");
  let editData = db.ref("supplier/" + supplierKey + "/").once("value", data => {
    dbData = data.val();
    supplierName.value = dbData.supplierName;
    supplierNumber.value = dbData.supplierNumber;
    supplierAddress.value = dbData.supplierAddress;
    if (dbData.isActive == "Enable") {
      isActive.checked = true;
    } else {
      isActive.checked = false;
    }
  });
  let key = supplierKey;
  sendsupplierData.onclick = function() {
    updatesupplier(supplierKey, supplierName, supplierNumber,supplierAddress,isActive);
  };
  sendsupplierData.innerHTML = "Update Record";
}
// Update supplier
function updatesupplier(supplierKey, name, number, address,checked) {
  let sendsupplierData = document.getElementById("sendSupplier");
  let active;
  if (checked.checked) {
    active = "enable";
  } else {
    active = "disable";
  }
  db.ref("supplier/" + supplierKey).update({
    supplierName: name.value,
    supplierNumber: number.value,
    supplierAddress: address.value,
    isActive: active
  });
  name.value = "";
  number.value = "";
  address.value = "";
  checked.checked = false;
  sendsupplierData.innerHTML = "Add Record";
}
// Delete supplier
function deltesupplier(supplierKey) {
  db.ref("supplier/" + supplierKey).remove();
}
