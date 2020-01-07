// View Data in Html
const itemRef = db.ref("item/");
let item = [];
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
                        <td>${item[i].isActive}</td>
                        <td>
                        <button onclick="getitem('${
                          item[i].key
                        }')" data-toggle="modal"
                        data-target="#additem" class="btn btn-warning">Edit</button>
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
  let isActive = document.getElementById("isActive");
  let status;
  if (isActive.checked) {
    status = "Enable";
  } else {
    status = "Disable";
  }
  let itemId = db
    .ref()
    .child("posts")
    .push().key;

  db.ref("item/" + itemId).set({
    itemName: itemName.value.toLowerCase(),
    isActive: status
  });

  itemName.value = "";
  isActive.checked = false;
}
// get item
function getitem(itemKey) {
  let itemName = document.getElementById("itemName");
  let isActive = document.getElementById("isActive");
  let senditemData = document.getElementById("senditem");
  let editData = db.ref("item/" + itemKey + "/").once("value", data => {
    dbData = data.val();
    itemName.value = dbData.itemName;
    if (dbData.isActive == "Enable") {
      isActive.checked = true;
    } else {
      isActive.checked = false;
    }
  });
  let key = itemKey;
  senditemData.onclick = function() {
    updateitem(itemKey, itemName, isActive);
  };
  senditemData.innerHTML = "Update Record";
}
// Update item
function updateitem(itemKey, name, checked) {
  let senditemData = document.getElementById("senditem");
  let active;
  if (checked.checked) {
    active = "enable";
  } else {
    active = "disable";
  }
  db.ref("item/" + itemKey).update({
    itemName: name.value,
    isActive: active
  });
  name.value = "";
  checked.checked = false;
  senditemData.innerHTML = "Add Record";
}
// Delete item
function delteitem(itemKey) {
  db.ref("item/" + itemKey).remove();
}
