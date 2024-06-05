// ------Variables------
var form = document.getElementById("add-frm");
var ntitle = document.getElementById("n-title");
var nbody = document.getElementById("n-body");
var items = document.getElementById("items");
var tableDiv = document.getElementById("tbl-div");
var search = document.getElementById("srch");
var resetBtn = document.getElementById("reset");

var noteCount = 0;
var newNote = "";
var isUpdate = false;
var record = "";
var note = "";
var body = "";

// ------Events------

// for page loads
window.onload = updateTable;

// for form submit
form.addEventListener("submit", addNote);

// for search
search.addEventListener("keyup", searchNote);

// for remove
items.addEventListener("click", removeNote);

// for view and update
items.addEventListener("click", viewNUpdateNote);

// for reset
resetBtn.addEventListener("click", resetAll);

// ------Functions------

// update table
function updateTable() {
  // display the table when notes get added
  if (noteCount > 0) {
    tableDiv.style.display = "";

    // update note
    if (isUpdate) {
      note.firstChild.textContent = ntitle.value;
      note.lastChild.textContent = nbody.value;
      //    Reset update and note count
      isUpdate = false;
      noteCount--;
    }
    // add a new note
    else {
      items.appendChild(newNote);
    }
  } else {
    tableDiv.style.display = "none";
  }
}

// add new note to the table

// Add Note
function addNote(e) {
  // stop initial behaviour
  e.preventDefault();

  //   validation for empty fields
  if (ntitle.value == "" || nbody.value == "") {
    alert("Please fill in all fields");
  } else {
    // new tr
    var tr = document.createElement("tr");
    tr.className = "item";

    // new td for title and body
    var td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(ntitle.value));
    var span = document.createElement("span");
    span.className = "note-body";
    span.appendChild(document.createTextNode(nbody.value));
    td1.appendChild(span);

    // new td for view
    var td2 = document.createElement("td");
    td2.className = "btcellv";
    var btn1 = document.createElement("button");
    btn1.appendChild(document.createTextNode("View"));
    btn1.setAttribute("id", "vw");
    td2.appendChild(btn1);

    // new td for delete
    var td3 = document.createElement("td");
    td3.className = "btcelld";
    var btn2 = document.createElement("button");
    btn2.appendChild(document.createTextNode("Delete"));
    btn2.setAttribute("id", "del");
    td3.appendChild(btn2);

    // add all tds to tr
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    // increment note count
    noteCount++;

    // set new note
    newNote = tr;

    // add or update the note of the table
    updateTable();
  }
  //   reset input fields
  resetAll();
}

// search notes
function searchNote(e) {
  // text to lowercase
  var searchTxt = e.target.value.toLowerCase();

  //   get list
  var list = items.getElementsByClassName("item");

  // convert to array
  var listArr = Array.from(list);
  listArr.forEach(function (item) {
    // get title
    var noteTitle = item.firstChild.textContent;
    //   match
    if (noteTitle.toLowerCase().indexOf(searchTxt) != -1) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

// remove note
function removeNote(e) {
  if (e.target.id == "del") {
    if (confirm("Are you sure?")) {
      // delete notes
      var tr = e.target.parentElement.parentElement;
      items.removeChild(tr);
      noteCount--;
      if (noteCount == 0) {
        updateTable();
      }
    }
  }
}

// view and update note
function viewNUpdateNote(e) {
  if (e.target.id == "vw") {
    // get the element values and update input fields
    record = e.target.parentElement.parentElement;
    note = record.firstChild;
    ntitle.value = note.firstChild.textContent;
    nbody.value = note.lastChild.textContent;
    isUpdate = true;
  }
}

// reset all
function resetAll() {
  ntitle.value = "";
  nbody.value = "";
  isUpdate = false;
  newNote = "";
}
