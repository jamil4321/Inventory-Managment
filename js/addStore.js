// View Data in Html
const storeRef = db.ref("store/");
let store = [];
//Get realtime data
storeRef.on("value", function(snapshot) {
  let storeTable = document.getElementById("store");
  storeTable.innerHTML = "";
  if (!snapshot.val()) return;
  store = Object.values(snapshot.val());
  var j = 0;
  for (key in snapshot.val()) {
    store[j++].key = key;
  }
  storeTable.innerHTML += `
    <tbody>
                  <tr>
                    <th>Sr No.</th>
                    <th>Store Name</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                  </tr>
    `;
  for (var i = 0; i < store.length; i++) {
    storeTable.innerHTML += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${store[i].storeName}</td>
                        <td>${store[i].isActive}</td>
                        <td>
                        <button onclick="getStore('${
                          store[i].key
                        }')" data-toggle="modal"
                        data-target="#addStore" class="btn btn-warning">Edit</button>
                        </td>
                        <td><button onclick="delteStore('${
                          store[i].key
                        }')" class="btn btn-danger">Delete</button></td>
                    </tr>`;
  }
  storeTable.innerHTML += "</tbody>";
});

// Add Store Function
function addStore() {
  let storeName = document.getElementById("storeName");
  let isActive = document.getElementById("isActive");
  let status;
  if (isActive.checked) {
    status = "Enable";
  } else {
    status = "Disable";
  }
  let storeId = db
    .ref()
    .child("posts")
    .push().key;

  db.ref("store/" + storeId).set({
    storeName: storeName.value.toLowerCase(),
    isActive: status
  });

  storeName.value = "";
  isActive.checked = false;
}
// get Store
function getStore(storeKey) {
  let storeName = document.getElementById("storeName");
  let isActive = document.getElementById("isActive");
  let sendStoreData = document.getElementById("sendStore");
  let editData = db.ref("store/" + storeKey + "/").once("value", data => {
    dbData = data.val();
    storeName.value = dbData.storeName;
    if (dbData.isActive == "Enable") {
      isActive.checked = true;
    } else {
      isActive.checked = false;
    }
  });
  let key = storeKey;
  sendStoreData.onclick = function() {
    updateStore(storeKey, storeName, isActive);
  };
  sendStoreData.innerHTML = "Update Record";
}
// Update Store
function updateStore(storeKey, name, checked) {
  let sendStoreData = document.getElementById("sendStore");
  let active;
  if (checked.checked) {
    active = "enable";
  } else {
    active = "disable";
  }
  db.ref("store/" + storeKey).update({
    storeName: name.value,
    isActive: active
  });
  name.value = "";
  checked.checked = false;
  sendStoreData.innerHTML = "Add Record";
}
// Delete Store
function delteStore(storeKey) {
  db.ref("store/" + storeKey).remove();
}
