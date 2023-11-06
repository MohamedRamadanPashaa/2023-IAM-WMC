const loadingDOM = document.querySelector(".loading-text");
const formAlertDOM = document.querySelector(".form-alert");

let competitorName = document.getElementById("name");
let iamId = document.getElementById("IAMID");
let images5Score = document.getElementById("images5Score");
let images5Points = document.getElementById("images5Points");
let binary5Score = document.getElementById("binary5Score");
let binary5Points = document.getElementById("binary5Points");
let number5ScoreOne = document.getElementById("number5ScoreOne");
let number5PointsOne = document.getElementById("number5PointsOne");
let number5ScoreTwo = document.getElementById("number5ScoreTwo");
let number5PointsTwo = document.getElementById("number5PointsTwo");
let number15Score = document.getElementById("number15Score");
let number15Points = document.getElementById("number15Points");
let names5Score = document.getElementById("names5Score");
let names5Points = document.getElementById("names5Points");
let dates5Score = document.getElementById("dates5Score");
let dates5Points = document.getElementById("dates5Points");
let cards10Score = document.getElementById("cards10Score");
let cards10Points = document.getElementById("cards10Points");
let snScoreOne = document.getElementById("snScoreOne");
let snPointsOne = document.getElementById("snPointsOne");
let snScoreTwo = document.getElementById("snScoreTwo");
let snPointsTwo = document.getElementById("snPointsTwo");
let snScoreThree = document.getElementById("snScoreThree");
let snPointsThree = document.getElementById("snPointsThree");
let scScoreOne = document.getElementById("scScoreOne");
let scPointsOne = document.getElementById("scPointsOne");
let scTimeOne = document.getElementById("scTimeOne");
let scScoreTwo = document.getElementById("scScoreTwo");
let scPointsTwo = document.getElementById("scPointsTwo");
let scTimeTwo = document.getElementById("scTimeTwo");
let TPoints = document.getElementById("TPoints");
let competitorCountry = document.getElementById("country");
let competitorCategory = document.getElementById("category");

let mood = "create";
let itmp;

// iam Standards
let speedNumbersStandards = 649;
let binaryStandards = 6171;
let namesAndFacesStandards = 210;
let wordsStandards = 312;
let longCardsStandards = 1852;
let longNumbersStandards = 3234;
let imagesStandards = 567;
let datesStandards = 142;
let spokenStandards = 47.3;

let loggedIn = sessionStorage.getItem("login");
let adminBtn = document.querySelector(".admin");
let loginPage = document.querySelector(".login");
let closeLoginBtn = document.querySelector(".close-login");
let userNameInput = document.getElementById("user-name");
let userPasswordInput = document.getElementById("password");
let loginBtn = document.querySelector(".login-btn");
let errorLoginMsg = document.querySelector(".error-login");

adminBtn.addEventListener("click", function () {
  if (!loggedIn) {
    loginPage.style.opacity = "1";
    loginPage.style.width = "100vw";
  } else {
    sessionStorage.clear();
    location.reload();
  }
});

if (loggedIn) {
  adminBtn.textContent = "logout";
}

closeLoginBtn.addEventListener("click", function () {
  loginPage.style.width = "0";
  loginPage.style.opacity = "0";
});

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post("/api/v1/users/login-admin", {
      userName: userNameInput.value,
      password: userPasswordInput.value,
    });

    sessionStorage.setItem("login", true);
    errorLoginMsg.textContent = "You Logged In Successfully";
    errorLoginMsg.style.color = "#4caf50";

    setTimeout(() => {
      loginPage.style.width = "0";
    }, 1500);

    setTimeout(() => {
      location.reload();
    }, 2000);
  } catch (error) {
    console.log(error);
    console.log("you are not logged in");
    errorLoginMsg.textContent = "Error In Name or Password";
    errorLoginMsg.style.color = "#e91e45";
  }
});

if (loggedIn) {
  console.log("Logged In");
} else {
  console.log("Not Logged In");
  document.getElementById("competitor-info-name").remove();
  document.querySelector(".addCompetitor").remove();
  // document.querySelector(".searchBlock").remove();
  document.querySelector(".editcol").remove();
  document.querySelector(".deletecol").remove();
}

// prevent right click
document.addEventListener("contextmenu", (event) => event.preventDefault());

// Calculate Points
// get images pts
const calcPoints = (score, standard) =>
  Math.round((score / standard) * 1000 * 100) / 100;

getTotalPoints();
images5Score.onkeyup = () => {
  images5Points.value = calcPoints(images5Score.value, imagesStandards);
  getTotalPoints();
};

// get binary pts
binary5Score.onkeyup = () => {
  binary5Points.value = calcPoints(binary5Score.value, binaryStandards);
  getTotalPoints();
};

// get 5-Min Numbers pts
number5ScoreOne.onkeyup = () => {
  number5PointsOne.value = calcPoints(
    number5ScoreOne.value,
    speedNumbersStandards
  );
  getTotalPoints();
};

number5ScoreTwo.onkeyup = () => {
  number5PointsTwo.value = calcPoints(
    number5ScoreTwo.value,
    speedNumbersStandards
  );
  getTotalPoints();
};

// get 15-Min Numbers pts
number15Score.onkeyup = () => {
  number15Points.value = calcPoints(number15Score.value, longNumbersStandards);

  getTotalPoints();
};

// get 5-Min Names&faces pts
names5Score.onkeyup = () => {
  names5Points.value = calcPoints(names5Score.value, namesAndFacesStandards);
  getTotalPoints();
};

// get 5-Min Dates pts
dates5Score.onkeyup = () => {
  dates5Points.value = calcPoints(dates5Score.value, datesStandards);
  getTotalPoints();
};

// get 5-Min Words pts
words5Score.onkeyup = () => {
  words5Points.value = calcPoints(words5Score.value, wordsStandards);
  getTotalPoints();
};

// get 10-Min Cards pts
cards10Score.onkeyup = () => {
  cards10Points.value = calcPoints(cards10Score.value, longCardsStandards);
  getTotalPoints();
};

// get spoken numbers Cards pts
const calcSpokenPoints = (score) =>
  Math.round(Math.sqrt(score) * spokenStandards * 100) / 100;

snScoreOne.onkeyup = () => {
  snPointsOne.value = calcSpokenPoints(snScoreOne.value);
  getTotalPoints();
};

snScoreTwo.onkeyup = () => {
  snPointsTwo.value = calcSpokenPoints(snScoreTwo.value);
  getTotalPoints();
};

snScoreThree.onkeyup = () => {
  snPointsThree.value = calcSpokenPoints(snScoreThree.value);
  getTotalPoints();
};

// get Speed Cards pts
const getScPoints = (score, time) => {
  let points;
  if (+time < 300 && time !== "" && +score === 52) {
    points = Math.round((6862 / Math.pow(time, 0.75)) * 100) / 100;
  } else if (+score <= 52 && +time === 300) {
    points = Math.round((score / 52) * 95.6 * 100) / 100;
  } else if (+score <= 52 && +time !== 300) {
    points = Math.round((score / 52) * 95.6 * 100) / 100;
  }

  return points;
};

const getScPointsOne = () => {
  scPointsOne.value = getScPoints(scScoreOne.value, scTimeOne.value);
  getTotalPoints();
};

const getScPointsTwo = () => {
  scPointsTwo.value = getScPoints(scScoreTwo.value, scTimeTwo.value);
  getTotalPoints();
};

function getTotalPoints() {
  TPoints.value =
    Math.round(
      (Math.max(+scPointsOne.value, +scPointsTwo.value) +
        Math.max(+snPointsOne.value, +snPointsTwo.value, +snPointsThree.value) +
        +cards10Points.value +
        +words5Points.value +
        +dates5Points.value +
        +names5Points.value +
        +number15Points.value +
        Math.max(+number5PointsOne.value, +number5PointsTwo.value) +
        +binary5Points.value +
        +images5Points.value) *
        100
    ) / 100;
  TPoints.style.background = "#4caf50";
  TPoints.style.color = "#fff";
  TPoints.style.fontWeight = "bold";
  TPoints.style.fontSize = "22px";
}

const itemsPerPage = 20;
const pages = document.querySelector(".pages");
let page = 1;

const createPagesNumber = () => {
  const pageCount = Math.ceil(competitorData.length / itemsPerPage);
  if (pageCount > 1)
    for (let i = 1; i <= pageCount; i++) {
      const page = document.createElement("div");
      page.innerHTML = i;
      page.className = "page";
      page.id = `page-${i}`;
      i === 1 && page.classList.add("active-page");
      page.onclick = () => clickPage(i);
      pages.appendChild(page);
    }
};

const clickPage = (p) => {
  page = p;
  const data = competitorData.filter(
    (el, i) => i >= (page - 1) * itemsPerPage - 1 && i < page * itemsPerPage - 1
  );

  const pagesPagination = document.querySelectorAll(".page");
  pagesPagination.forEach((el) => {
    el.classList.remove("active-page");
  });

  const currPage = document.getElementById(`page-${page}`);
  currPage.classList.add("active-page");

  showTasks(data);
  showImageTable();
  showBinaryTable();
  showNumber5TableOne();
  showNumber5TableTwo();
  showWordsTable();
  showNumbers15Table();
  showNamesTable();
  showDatesTable();
  showCardsTable();
  showSNTableOne();
  showSNTableTwo();
  showSNTableThree();
  showSCTableOne();
  showSCTableTwo();
};

let competitorData = [];
const loadData = async () => {
  loadingDOM.style.visibility = "visible";

  try {
    const {
      data: { tasks },
    } = await axios.get("/api/v1/tasks");

    // Sort the array based on name
    competitorData = tasks.sort((a, b) => a.name.localeCompare(b.name));

    for (let i = 0; i < competitorData.length; i++) {
      const {
        images,
        binary,
        longNumbers,
        speedNumbersOne,
        speedNumbersTwo,
        namesAndFaces,
        words,
        longCards,
        dates,
        spokenOne,
        spokenTwo,
        spokenThree,
        speedCardsScoreOne,
        speedCardsTimeOne,
        speedCardsScoreTwo,
        speedCardsTimeTwo,
      } = competitorData[i];

      let imagesPoints = calcPoints(images, imagesStandards);
      let binaryPoints = calcPoints(binary, binaryStandards);
      let longNumbersPoints = calcPoints(longNumbers, longNumbersStandards);
      let speedNumbersPointsOne = calcPoints(
        speedNumbersOne,
        speedNumbersStandards
      );
      let speedNumbersPointsTwo = calcPoints(
        speedNumbersTwo,
        speedNumbersStandards
      );
      let namesAndFacesPoints = calcPoints(
        namesAndFaces,
        namesAndFacesStandards
      );
      let wordsPoints = calcPoints(words, wordsStandards);
      let datesPoints = calcPoints(dates, datesStandards);
      let longCardsPoints = calcPoints(longCards, longCardsStandards);
      let spokenPointsOne = calcSpokenPoints(spokenOne);
      let spokenPointsTwo = calcSpokenPoints(spokenTwo);
      let spokenPointsThree = calcSpokenPoints(spokenThree);

      let speedCardsPointsOne = getScPoints(
        speedCardsScoreOne,
        speedCardsTimeOne
      );
      let speedCardsPointsTwo = getScPoints(
        speedCardsScoreTwo,
        speedCardsTimeTwo
      );

      let overallPoints =
        imagesPoints +
        binaryPoints +
        longNumbersPoints +
        Math.max(speedNumbersPointsOne, speedNumbersPointsTwo) +
        namesAndFacesPoints +
        wordsPoints +
        datesPoints +
        longCardsPoints +
        Math.max(spokenPointsOne, spokenPointsTwo, spokenPointsThree) +
        Math.max(speedCardsPointsOne, speedCardsPointsTwo);

      overallPoints = Math.round(overallPoints * 100) / 100;

      competitorData[i].overall = overallPoints || 0;
    }
  } catch (error) {
    document.getElementById("tbody").innerHTML =
      '<tr class="empty-list"><td colspan="38">There was an error, please try again later....</td></tr>';
  }

  loadingDOM.style.visibility = "hidden";
  ranking("overall");
  createPagesNumber();
  showTasks();
};
loadData();

// Load tasks from /api/tasks
const showTasks = (
  data = competitorData.filter((el, i) => i >= 0 && i < 20)
) => {
  if (data.length === 0) {
    document.getElementById("tbody").innerHTML = `
        <tr class="empty-list">
          <td colspan="38">No data to show</td>
        </tr>`;

    return;
  }

  let table = "";
  for (let i = 0; i < data.length; i++) {
    const {
      completed,
      _id: taskID,
      name,
      IAMID,
      country,
      category,
      images,
      binary,
      longNumbers,
      speedNumbersOne,
      speedNumbersTwo,
      namesAndFaces,
      words,
      longCards,
      dates,
      spokenOne,
      spokenTwo,
      spokenThree,
      speedCardsScoreOne,
      speedCardsTimeOne,
      speedCardsScoreTwo,
      speedCardsTimeTwo,
      overall,
      rank,
    } = data[i];

    let imagesPoints = calcPoints(images, imagesStandards) || "";
    let binaryPoints = calcPoints(binary, binaryStandards) || "";
    let longNumbersPoints = calcPoints(longNumbers, longNumbersStandards) || "";
    let speedNumbersPointsOne =
      calcPoints(speedNumbersOne, speedNumbersStandards) || "";
    let speedNumbersPointsTwo =
      calcPoints(speedNumbersTwo, speedNumbersStandards) || "";
    let namesAndFacesPoints =
      calcPoints(namesAndFaces, namesAndFacesStandards) || "";
    let wordsPoints = calcPoints(words, wordsStandards) || "";
    let datesPoints = calcPoints(dates, datesStandards) || "";
    let longCardsPoints = calcPoints(longCards, longCardsStandards) || "";
    let spokenPointsOne = calcSpokenPoints(spokenOne) || "";
    let spokenPointsTwo = calcSpokenPoints(spokenTwo) || "";
    let spokenPointsThree = calcSpokenPoints(spokenThree) || "";

    let speedCardsPointsOne =
      getScPoints(speedCardsScoreOne, speedCardsTimeOne) || "";
    let speedCardsPointsTwo =
      getScPoints(speedCardsScoreTwo, speedCardsTimeTwo) || "";

    table += `
      <tr> 
              ${
                loggedIn
                  ? `
              <td>
                <a href="task.html?id=${taskID}"  class="edit-link">
                <i class="fas fa-edit"></i>
                </a>
              </td>
              `
                  : ""
              }
              
              <td>${rank}</td>
              <td id="nameWidth">${name}</td>
              <td>${country || ""}</td>
              <td>${category || ""}</td>
              <td>${IAMID || ""}</td>
              <td>${images || ""}</td>
              <td>${imagesPoints}</td>
              <td>${binary || ""}</td>
              <td>${binaryPoints}</td>
              <td>${speedNumbersOne || ""}</td>
              <td>${speedNumbersPointsOne}</td>
              <td>${speedNumbersTwo || ""}</td>
              <td>${speedNumbersPointsTwo}</td>
              <td>${longNumbers || ""}</td>
              <td>${longNumbersPoints}</td>
              <td>${namesAndFaces || ""}</td>
              <td>${namesAndFacesPoints}</td>
              <td>${dates || ""}</td>
              <td>${datesPoints}</td>
              <td>${words || ""}</td>
              <td>${wordsPoints}</td>
              <td>${longCards || ""}</td>
              <td>${longCardsPoints}</td>
              <td>${spokenOne || ""}</td>
              <td>${spokenPointsOne}</td>
              <td>${spokenTwo || ""}</td>
              <td>${spokenPointsTwo}</td>
              <td>${spokenThree || ""}</td>
              <td>${spokenPointsThree}</td>
              <td>${speedCardsScoreOne || ""}</td>
              <td>${speedCardsTimeOne || ""}</td>
              <td>${speedCardsPointsOne}</td>
              <td>${speedCardsScoreTwo || ""}</td>
              <td>${speedCardsTimeTwo || ""}</td>
              <td>${speedCardsPointsTwo}</td>
              <td class="total">${overall}</td>
              ${
                loggedIn
                  ? `
              <td>
                <button type="button" class="delete-btn" data-id="${taskID}" data-name="${name}">
                <i class="fas fa-trash"></i>
                </button>
              </td>
              `
                  : ""
              }
          </tr>
`;
  }

  document.getElementById("tbody").innerHTML = table;
};

// for prev next btn in pagination
let allPaginationBtn = document.querySelectorAll(".container a");
function nextTable() {
  let index;
  allPaginationBtn.forEach((el, i) => {
    if (el.className.includes("active")) {
      index = i;
    }
  });

  if (index < allPaginationBtn.length - 2) {
    document.getElementById(allPaginationBtn[index + 1].id).click();
  }
}

function prevTable() {
  let index;
  allPaginationBtn.forEach((el, i) => {
    if (el.className.includes("active")) {
      index = i;
    }
  });

  if (index > 1) {
    document.getElementById(allPaginationBtn[index - 1].id).click();
  }
}

let allTables = document.querySelectorAll(".competitors-table");
let allNav = document.querySelectorAll(".pagination .container a");
function displayOneTable(tableId, btnId) {
  allTables.forEach((table) => {
    table.style.display = "none";
  });
  document.getElementById(tableId).style.display = "block";

  allNav.forEach((nav) => {
    nav.classList.remove("active");
  });
  document.getElementById(btnId).classList.add("active");
}

function displayOverallTable() {
  displayOneTable("overall-table", "overall-btn");
  sortTable();
}

function displayImageTable() {
  displayOneTable("img-table", "img-btn");
  sortImgTable();
  showImageTable();
  page = 1;
  document.getElementById(`page-${1}`).click();
}

function displayBinaryTable() {
  displayOneTable("bin-table", "bin-btn");
  sortBinTable();
  showBinaryTable();
  page = 1;
  document.getElementById(`page-${1}`).click();
}

function displayNumbers5TableOne() {
  displayOneTable("num5-table-one", "num5-btn-one");
  sortNum5TableOne();
  showNumber5TableOne();
  page = 1;
  document.getElementById(`page-${1}`).click();
}

function displayNumbers5TableTwo() {
  displayOneTable("num5-table-two", "num5-btn-two");
  sortNum5TableTwo();
  showNumber5TableTwo();
  page = 1;
  document.getElementById(`page-${1}`).click();
}

function displayWordsTable() {
  displayOneTable("wor-table", "wor-btn");
  sortWorTable();
  showWordsTable();
  page = 1;
  document.getElementById(`page-${1}`).click();
}

function displayNumbers15Table() {
  displayOneTable("num15-table", "num15-btn");
  sortNum15Table();
  showNumbers15Table();
  page = 1;
  document.getElementById(`page-${1}`).click();
}

function displayNamesTable() {
  displayOneTable("nam-table", "nam-btn");
  sortNamTable();
  showNamesTable();
  page = 1;
  document.getElementById(`page-${1}`).click();
}

function displayDatesTable() {
  displayOneTable("dat-table", "dat-btn");
  sortDatTable();
  showDatesTable();
  page = 1;
  document.getElementById(`page-${1}`).click();
}

function displayCardsTable() {
  displayOneTable("car-table", "car-btn");
  sortCarTable();
  showCardsTable();
  page = 1;
  document.getElementById(`page-${1}`).click();
}

function displaySNTableOne() {
  displayOneTable("sn-table-one", "sn-btn-one");
  sortSNTableOne();
  showSNTableOne();
  page = 1;
  document.getElementById(`page-${1}`).click();
}
function displaySNTableTwo() {
  displayOneTable("sn-table-two", "sn-btn-two");
  sortSNTableTwo();
  showSNTableTwo();
  page = 1;
  document.getElementById(`page-${1}`).click();
}

function displaySNTableThree() {
  displayOneTable("sn-table-three", "sn-btn-three");
  sortSNTableThree();
  showSNTableThree();
  page = 1;
  document.getElementById(`page-${1}`).click();
}

function displaySCTableOne() {
  displayOneTable("sc-table-one", "sc-btn-one");
  sortSCTableOne();
  showSCTableOne();
  page = 1;
  document.getElementById(`page-${1}`).click();
}

function displaySCTableTwo() {
  displayOneTable("sc-table-two", "sc-btn-two");
  sortSCTableTwo();
  showSCTableTwo();
  page = 1;
  document.getElementById(`page-${1}`).click();
}

// enter to go to next field
var allField = document.querySelectorAll(".score-input");
for (var i = 0; i < allField.length; i++) {
  allField[i].addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (this.parentElement.nextElementSibling.querySelector("input")) {
        this.parentElement.nextElementSibling.querySelector("input").focus();
      }
    }
  });
}

function showImageTable(data) {
  showTable("images", "imgTable", imagesStandards, "imgRank", data);
}

function showBinaryTable(data) {
  showTable("binary", "binTable", binaryStandards, "binRank", data);
}

function showNumber5TableOne(data) {
  showTable(
    "speedNumbersOne",
    "num5TableOne",
    speedNumbersStandards,
    "num5RankOne",
    data
  );
}

function showNumber5TableTwo(data) {
  showTable(
    "speedNumbersTwo",
    "num5TableTwo",
    speedNumbersStandards,
    "num5RankTwo",
    data
  );
}

function showWordsTable(data) {
  showTable("words", "worTable", wordsStandards, "worRank", data);
}

function showNumbers15Table(data) {
  showTable(
    "longNumbers",
    "num15Table",
    longNumbersStandards,
    "num15Rank",
    data
  );
}

function showNamesTable(data) {
  showTable(
    "namesAndFaces",
    "namTable",
    namesAndFacesStandards,
    "namRank",
    data
  );
}

function showDatesTable(data) {
  showTable("dates", "datTable", datesStandards, "datRank", data);
}

function showCardsTable(data) {
  showTable("longCards", "carTable", longCardsStandards, "carRank", data);
}

function showTable(
  test,
  tableId,
  standard,
  classRank,
  data = competitorData.filter(
    (el, i) => i >= (page - 1) * itemsPerPage - 1 && i < page * itemsPerPage - 1
  )
) {
  let table = "";
  for (let i = 0; i < data.length; i++)
    table += `
        <tr>
            <td>${data[i].rank}</td>
            <td id="nameWidth">${data[i].name}</td>
            <td>${data[i].country}</td>
            <td>${data[i].category}</td>
            <td>${data[i].IAMID || ""}</td>
            <td>${data[i][test] || ""}</td>
            <td class=${classRank}>
              ${Math.round((data[i][test] / standard) * 1000 * 100) / 100 || ""}
            </td>
        </tr>
    `;
  document.getElementById(tableId).innerHTML = table;
}

function showSNTableOne(data) {
  showSNTable("spokenOne", "snTableOne", spokenStandards, "snRankOne", data);
}

function showSNTableTwo(data) {
  showSNTable("spokenTwo", "snTableTwo", spokenStandards, "snRankTwo", data);
}

function showSNTableThree(data) {
  showSNTable(
    "spokenThree",
    "snTableThree",
    spokenStandards,
    "snRankThree",
    data
  );
}

function showSNTable(
  test,
  tableId,
  standard,
  snRank,
  data = competitorData.filter(
    (el, i) => i >= (page - 1) * itemsPerPage - 1 && i < page * itemsPerPage - 1
  )
) {
  let snTable = "";

  for (let i = 0; i < data.length; i++)
    snTable += `
    <tr>
                <td id="nameWidth">${data[i].rank}</td>
                <td id="nameWidth">${data[i].name}</td>
                <td>${data[i].country}</td>
                <td>${data[i].category}</td>
                <td>${data[i].IAMID || ""}</td>
                <td>${data[i][test] || ""}</td>
                <td class=${snRank}>${
      Math.round(Math.sqrt(data[i][test]) * standard * 100) / 100 || ""
    }</td>
            </tr>
    `;
  document.getElementById(tableId).innerHTML = snTable;
}

function showSCTableOne(
  data = competitorData.filter(
    (el, i) => i >= (page - 1) * itemsPerPage - 1 && i < page * itemsPerPage - 1
  )
) {
  let scTable = "";
  for (let i = 0; i < data.length; i++) {
    let speedCardsPoints = () => {
      if (data[i].speedCardsTimeOne < 300 && data[i].speedCardsScoreOne == 52) {
        return (
          Math.round((6862 / Math.pow(data[i].speedCardsTimeOne, 0.75)) * 100) /
          100
        );
      } else if (
        data[i].speedCardsScoreOne <= 52 &&
        data[i].speedCardsTimeOne == 300
      ) {
        return Math.round((data[i].speedCardsScoreOne / 52) * 95.6 * 100) / 100;
      } else if (
        data[i].speedCardsScoreOne <= 52 &&
        data[i].speedCardsTimeOne != 300
      ) {
        return Math.round((data[i].speedCardsScoreOne / 52) * 95.6 * 100) / 100;
      }
    };

    scTable += `
            <tr>
                <td>${data[i].rank}</td>
                <td id="nameWidth">${data[i].name}</td>
                <td>${data[i].country}</td>
                <td>${data[i].category}</td>
                <td>${data[i].IAMID || ""}</td>
                <td>${data[i].speedCardsScoreOne || ""}</td>
                <td>${data[i].speedCardsTimeOne || ""}</td>
                <td class="scRankOne">${speedCardsPoints() || ""}</td>
            </tr>
    `;
  }
  document.getElementById("scTableOne").innerHTML = scTable;
}

function showSCTableTwo(
  data = competitorData.filter(
    (el, i) => i >= (page - 1) * itemsPerPage - 1 && i < page * itemsPerPage - 1
  )
) {
  let scTable = "";

  for (let i = 0; i < data.length; i++) {
    let speedCardsPoints = () => {
      if (data[i].speedCardsTimeTwo < 300 && data[i].speedCardsScoreTwo == 52) {
        return (
          Math.round((6862 / Math.pow(data[i].speedCardsTimeTwo, 0.75)) * 100) /
          100
        );
      } else if (
        data[i].speedCardsScoreTwo <= 52 &&
        data[i].speedCardsTimeTwo == 300
      ) {
        return Math.round((data[i].speedCardsScoreTwo / 52) * 95.6 * 100) / 100;
      } else if (
        data[i].speedCardsScoreTwo <= 52 &&
        data[i].speedCardsTimeTwo != 300
      ) {
        return Math.round((data[i].speedCardsScoreTwo / 52) * 95.6 * 100) / 100;
      }
    };

    scTable += `
            <tr>
                <td id="nameWidth">${data[i].rank}</td>
                <td id="nameWidth">${data[i].name}</td>
                <td>${data[i].country}</td>
                <td>${data[i].category}</td>
                <td>${data[i].IAMID || ""}</td>
                <td>${data[i].speedCardsScoreTwo || ""}</td>
                <td>${data[i].speedCardsTimeTwo || ""}</td>
                <td class="scRankTwo">${speedCardsPoints() || ""}</td>
            </tr>
    `;
  }
  document.getElementById("scTableTwo").innerHTML = scTable;
}

// // delete task /api/tasks/:id
document.getElementById("tbody").addEventListener("click", async (e) => {
  const el = e.target;

  if (el.parentElement.classList.contains("delete-btn")) {
    loadingDOM.style.visibility = "visible";
    const id = el.parentElement.dataset.id;
    const name = el.parentElement.dataset.name;

    let confirmDeleteCompetitor = window.confirm("Delete: " + name);

    if (confirmDeleteCompetitor) {
      try {
        await axios.delete(`/api/v1/tasks/${id}`);
        showTasks();
      } catch (error) {
        console.log(error);
      }
    }
  }
  loadingDOM.style.visibility = "hidden";
});

let addCompetitorBtn = document.getElementById("AddCompetitor");
// form
if (loggedIn) {
  addCompetitorBtn.onclick = async (e) => {
    e.preventDefault();
    addCompetitorBtn.classList.add("disabled");

    const name = competitorName.value;
    const IAMID = iamId.value;
    const country = competitorCountry.value;
    const category = competitorCategory.value;
    const images = images5Score.value;
    const binary = binary5Score.value;
    const longNumbers = number15Score.value;
    const speedNumbersOne = number5ScoreOne.value;
    const speedNumbersTwo = number5ScoreTwo.value;
    const namesAndFaces = names5Score.value;
    const words = words5Score.value;
    const dates = dates5Score.value;
    const spokenOne = snScoreOne.value;
    const spokenTwo = snScoreTwo.value;
    const spokenThree = snScoreThree.value;
    const speedCardsScoreOne = scScoreOne.value;
    const speedCardsTimeOne = scTimeOne.value;
    const speedCardsScoreTwo = scScoreTwo.value;
    const speedCardsTimeTwo = scTimeTwo.value;
    const longCards = cards10Score.value;

    try {
      await axios.post("/api/v1/tasks", {
        name,
        IAMID,
        country,
        category,
        images,
        binary,
        longCards,
        longNumbers,
        speedNumbersOne,
        speedNumbersTwo,
        namesAndFaces,
        words,
        dates,
        spokenOne,
        spokenTwo,
        spokenThree,
        speedCardsScoreOne,
        speedCardsTimeOne,
        speedCardsScoreTwo,
        speedCardsTimeTwo,
      });
      showTasks();
      clearData();
      formAlertDOM.style.display = "block";
      formAlertDOM.style.color = "#4caf50";
      formAlertDOM.textContent = `success, competitor added`;
    } catch (error) {
      if (competitorName.value === "") {
        formAlertDOM.innerHTML = `error, name can't be empty!`;
      } else {
        console.log(error);
        formAlertDOM.innerHTML = `error, something went wrong, please try again later!`;
      }
      formAlertDOM.style.display = "block";
      formAlertDOM.style.color = "#e91e45";
    }

    setTimeout(() => {
      addCompetitorBtn.classList.remove("disabled");
      formAlertDOM.style.display = "none";
    }, 3000);
  };
}

// clear after create
function clearData() {
  competitorName.value = "";
  iamId.value = "";
  images5Score.value = "";
  images5Points.value = "";
  binary5Score.value = "";
  binary5Points.value = "";
  number5ScoreOne.value = "";
  number5PointsOne.value = "";
  number5ScoreTwo.value = "";
  number5PointsTwo.value = "";
  words5Score.value = "";
  words5Points.value = "";
  number15Score.value = "";
  number15Points.value = "";
  names5Score.value = "";
  names5Points.value = "";
  dates5Score.value = "";
  dates5Points.value = "";
  cards10Score.value = "";
  cards10Points.value = "";
  snScoreOne.value = "";
  snPointsOne.value = "";
  snScoreTwo.value = "";
  snPointsTwo.value = "";
  snScoreThree.value = "";
  snPointsThree.value = "";
  scScoreOne.value = "";
  scPointsOne.value = "";
  scTimeOne.value = "";
  scScoreTwo.value = "";
  scPointsTwo.value = "";
  scTimeTwo.value = "";
  TPoints.value = "0";
}

const ranking = (test) => {
  competitorData.sort((a, b) => b[test] - a[test]);

  let rank = 1;
  competitorData[0].rank = rank;

  for (let i = 1; i < competitorData.length; i++) {
    const valueOne = competitorData[i - 1][test] || 0;
    const valueTwo = competitorData[i][test] || 0;
    if (valueTwo === valueOne) {
      // If the score is the same as the previous element, share the same rank
      competitorData[i].rank = rank;
    } else {
      // If the score is different, increment the rank
      rank = i + 1;
      competitorData[i].rank = i + 1;
    }
  }
};

const sorting = (field) => {
  competitorData.sort((a, b) => b[field] - a[field]);
};

const sortingString = (field) => {
  competitorData.sort((a, b) => a[field].localeCompare(b[field]));
};

function sortTable() {
  ranking("overall");
  sorting("overall");
  showTasks();
}

function sortCountryTable() {
  sorting("overall");
  sortingString("country");
  showTasks();
}
function sortCategoryTable() {
  sorting("overall");
  sortingString("category");
  showTasks();
}
function sortAlphabetTable() {
  sorting("overall");
  sortingString("name");
  showTasks();
}

// sort one discipline table
function sortImgTable() {
  ranking("images");
  sorting("images");
  showImageTable();
}

function sortCountryImgTable() {
  sorting("images");
  sortingString("country");
  showImageTable();
}

function sortCategoryImgTable() {
  sorting("images");
  sortingString("category");
  showImageTable();
}
function sortAlphabetImgTable() {
  sorting("images");
  sortingString("name");
  showImageTable();
}

function sortBinTable() {
  ranking("binary");
  sorting("binary");
  showBinaryTable();
}

function sortCountryBinTable() {
  sorting("binary");
  sortingString("country");
  showBinaryTable();
}

function sortCategoryBinTable() {
  sorting("binary");
  sortingString("category");
  showBinaryTable();
}

function sortAlphabetBinTable() {
  sorting("binary");
  sortingString("name");
  showBinaryTable();
}

function sortNum5TableOne() {
  ranking("speedNumbersOne");
  sorting("speedNumbersOne");
  showNumber5TableOne();
}

function sortCountryNum5TableOne() {
  sorting("speedNumbersOne");
  sortingString("country");
  showNumber5TableOne();
}

function sortCategoryNum5TableOne() {
  sorting("speedNumbersOne");
  sortingString("category");
  showNumber5TableOne();
}

function sortAlphabetNum5TableOne() {
  sorting("speedNumbersOne");
  sortingString("name");
  showNumber5TableOne();
}

function sortNum5TableTwo() {
  ranking("speedNumbersTwo");
  sorting("speedNumbersTwo");
  showNumber5TableTwo();
}

function sortCountryNum5TableTwo() {
  sorting("speedNumbersTwo");
  sortingString("country");
  showNumber5TableTwo();
}

function sortCategoryNum5TableTwo() {
  sorting("speedNumbersTwo");
  sortingString("category");
  showNumber5TableTwo();
}

function sortAlphabetNum5TableTwo() {
  sorting("speedNumbersTwo");
  sortingString("name");
  showNumber5TableTwo();
}

function sortWorTable() {
  ranking("words");
  sorting("words");
  showWordsTable();
}

function sortCountryWorTable() {
  sorting("words");
  sortingString("country");
  showWordsTable();
}

function sortCategoryWorTable() {
  sorting("words");
  sortingString("category");
  showWordsTable();
}

function sortAlphabetWorTable() {
  sorting("words");
  sortingString("name");
  showWordsTable();
}

function sortNum15Table() {
  ranking("longNumbers");
  sorting("longNumbers");
  showNumbers15Table();
}

function sortCountryNum15Table() {
  sorting("longNumbers");
  sortingString("country");
  showNumbers15Table();
}

function sortCategoryNum15Table() {
  sorting("longNumbers");
  sortingString("category");
  showNumbers15Table();
}

function sortAlphabetNum15Table() {
  sorting("longNumbers");
  sortingString("name");
  showNumbers15Table();
}

function sortNamTable() {
  ranking("namesAndFaces");
  sorting("namesAndFaces");
  showNamesTable();
}

function sortCountryNamTable() {
  sorting("namesAndFaces");
  sortingString("country");
  showNamesTable();
}

function sortCategoryNamTable() {
  sorting("namesAndFaces");
  sortingString("category");
  showNamesTable();
}

function sortAlphabetNamTable() {
  sorting("namesAndFaces");
  sortingString("name");
  showNamesTable();
}

function sortDatTable() {
  ranking("dates");
  sorting("dates");
  showDatesTable();
}

function sortCountryDatTable() {
  sorting("dates");
  sortingString("country");
  showDatesTable();
}

function sortCategoryDatTable() {
  sorting("dates");
  sortingString("category");
  showDatesTable();
}

function sortAlphabetDatTable() {
  sorting("dates");
  sortingString("name");
  showDatesTable();
}

function sortCarTable() {
  ranking("longCards");
  sorting("longCards");
  showCardsTable();
}

function sortCountryCarTable() {
  sorting("longCards");
  sortingString("country");
  showCardsTable();
}

function sortCategoryCarTable() {
  sorting("longCards");
  sortingString("category");
  showCardsTable();
}

function sortAlphabetCarTable() {
  sorting("longCards");
  sortingString("name");
  showCardsTable();
}

function sortSNTableOne() {
  ranking("spokenOne");
  sorting("spokenOne");
  showSNTableOne();
}

function sortCountrySNTableOne() {
  sorting("spokenOne");
  sortingString("country");
  showSNTableOne();
}

function sortCategorySNTableOne() {
  sorting("spokenOne");
  sortingString("category");
  showSNTableOne();
}

function sortAlphabetSNTableOne() {
  sorting("spokenOne");
  sortingString("name");
  showSNTableOne();
}

function sortSNTableTwo() {
  ranking("spokenTwo");
  sorting("spokenTwo");
  showSNTableTwo();
}

function sortCountrySNTableTwo() {
  sorting("spokenTwo");
  sortingString("country");
  showSNTableTwo();
}

function sortCategorySNTableTwo() {
  sorting("spokenTwo");
  sortingString("category");
  showSNTableTwo();
}

function sortAlphabetSNTableTwo() {
  sorting("spokenTwo");
  sortingString("name");
  showSNTableTwo();
}

function sortSNTableThree() {
  ranking("spokenThree");
  sorting("spokenThree");
  showSNTableThree();
}

function sortCountrySNTableThree() {
  sorting("spokenThree");
  sortingString("country");
  showSNTableThree();
}

function sortCategorySNTableThree() {
  sorting("spokenThree");
  sortingString("category");
  showSNTableThree();
}

function sortAlphabetSNTableThree() {
  sorting("spokenThree");
  sortingString("name");
  showSNTableThree();
}

const rankingSc = (score, time) => {
  competitorData.sort((a, b) => {
    // First, compare by 'score' in descending order
    if (b[score] - a[score] !== 0) {
      return b[score] - a[score];
    }

    // If scores are equal, compare by time
    return a[time] - b[time];
  });

  let rank = 1;
  competitorData[0].rank = rank;

  for (let i = 1; i < competitorData.length; i++) {
    const scoreOne = competitorData[i - 1][score] || 0;
    const scoreTwo = competitorData[i][score] || 0;
    const timeOne = competitorData[i - 1][time] || 0;
    const timeTwo = competitorData[i][time] || 0;
    if (scoreOne === scoreTwo && timeOne === timeTwo) {
      // If the score is the same as the previous element, share the same rank
      competitorData[i].rank = rank;
    } else {
      // If the score is different, increment the rank
      rank = i + 1;
      competitorData[i].rank = rank;
    }
  }
};

const sortingSc = (score, time) => {
  competitorData.sort((a, b) => {
    // First, compare by 'score' in descending order
    if (b[score] - a[score] !== 0) {
      return b[score] - a[score];
    }

    // If scores are equal, compare by time
    return a[time] - b[time];
  });
};

function sortSCTableOne() {
  rankingSc("speedCardsScoreOne", "speedCardsTimeOne");
  sortingSc("speedCardsScoreOne", "speedCardsTimeOne");
  showSCTableOne();
}

function sortCountrySCTableOne() {
  sortingSc("speedCardsScoreOne", "speedCardsTimeOne");
  sortingString("country");
  showSCTableOne();
}

function sortCategorySCTableOne() {
  sortingSc("speedCardsScoreOne", "speedCardsTimeOne");
  sortingString("category");
  showSCTableOne();
}

function sortAlphabetSCTableOne() {
  sortingSc("speedCardsScoreOne", "speedCardsTimeOne");
  sortingString("name");
  showSCTableOne();
}

function sortSCTableTwo() {
  rankingSc("speedCardsScoreTwo", "speedCardsTimeTwo");
  sortingSc("speedCardsScoreTwo", "speedCardsTimeTwo");
  showSCTableTwo();
}

function sortCountrySCTableTwo() {
  sortingSc("speedCardsScoreTwo", "speedCardsTimeTwo");
  sortingString("country");
  showSCTableTwo();
}

function sortCategorySCTableTwo() {
  sortingSc("speedCardsScoreTwo", "speedCardsTimeTwo");
  sortingString("category");
  showSCTableTwo();
}

function sortAlphabetSCTableTwo() {
  sortingSc("speedCardsScoreTwo", "speedCardsTimeTwo");
  sortingString("name");
  showSCTableTwo();
}

let searchMood = "name";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchName") {
    searchMood = "name";
    search.placeholder = "Search By Name";
  } else {
    searchMood = "ID";
    search.placeholder = "Search By ID";
  }
  search.focus();
  search.value = "";
}

function searchCompetitors(value) {
  let data = [];
  if (searchMood == "name") {
    data = competitorData.filter((el) =>
      el.name.toLowerCase().includes(value.toLowerCase())
    );
  } else {
    data = competitorData.filter(
      (el) => el.IAMID && el.IAMID.toString().includes(value)
    );
  }

  console.log(data);
  showTasks(data);
  showImageTable(data);
  showBinaryTable(data);
  showNumber5TableOne(data);
  showNumber5TableTwo(data);
  showWordsTable(data);
  showNumbers15Table(data);
  showNamesTable(data);
  showDatesTable(data);
  showCardsTable(data);
  showSNTableOne(data);
  showSNTableTwo(data);
  showSNTableThree(data);
  showSCTableOne(data);
  showSCTableTwo(data);
  value.length === 0 && showTasks();
}
