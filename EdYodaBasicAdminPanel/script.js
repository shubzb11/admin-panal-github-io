const url =
  "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";

const tableBody = document.getElementById("table-body");
const infoContent = document.getElementById("info-content");
const searchBox = document.getElementById("search-box");

function updateTable(users) {
  tableBody.innerHTML = "";
  users.forEach((user) => {
    const row = document.createElement("tr");
    row.classList.add("data-row");
    row.setAttribute("id", user.id);
    row.appendChild(createColumn(user.id, 1));
    row.appendChild(createColumn(user.firstName, 2));
    row.appendChild(createColumn(user.lastName, 3));
    row.appendChild(createColumn(user.email, 4));
    row.appendChild(createColumn(user.phone, 5));

    row.addEventListener("click", () => {
      updateDetails(user);
    });

    tableBody.appendChild(row);
  });
}

function updateDetails(user) {
  const selectedRow = document.getElementById(user.id);

  const previousSelectedRow = document.getElementsByClassName("active")[0];

  if (previousSelectedRow !== undefined) {
    previousSelectedRow.classList.remove("active");
  }

  selectedRow.classList.add("active");

  infoContent.innerHTML = `
    <div><b>User selected:</b> ${user.firstName} ${user.lastName}</div>
    <div>
        <b>Description: </b>
        <textarea cols="50" rows="5" readonly>
            ${user.description}
        </textarea>
    </div>
    <div><b>Address:</b>${user.address.streetAddress}</div>
    <div><b>City:</b>${user.address.city}</div>
    <div><b>State:</b>${user.address.state}</div>
    <div><b>Zip:</b>${user.address.city}</div>
</div>

    `;
}

function createColumn(data, index) {
  const column = document.createElement("td");
  column.classList.add(`column${index}`);
  column.innerText = data;
  return column;
}

function search(searchString, users) {
  const filteredUsers = users.filter((user) => {
    const firstName = user.firstName.toLowerCase();
    searchString = searchString.toLowerCase();
    return (
      firstName.includes(searchString) || `${user.id}`.includes(searchString)
    );
  });

  updateTable(filteredUsers);
}

function Geturldata() {
  $.get(url, (response) => {
    updateTable(response);
    searchBox.addEventListener("keyup", () => {
      search(searchBox.value, response);
    });
  });
}

Geturldata();
