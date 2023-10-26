const loadingDOM = document.querySelector(".loading-text");
const formAlertDOM = document.querySelector(".form-alert");

let competitorName = document.getElementById("name");
let iamId = document.getElementById("IAMID");
let images5Score = document.getElementById("images5Score");
let images5Points = document.getElementById("images5Points");
let binary5Score = document.getElementById("binary5Score");
let binary5Points = document.getElementById("binary5Points");
let number5Score = document.getElementById("number5Score");
let number5Points = document.getElementById("number5Points");
let number15Score = document.getElementById("number15Score");
let number15Points = document.getElementById("number15Points");
let names5Score = document.getElementById("names5Score");
let names5Points = document.getElementById("names5Points");
let dates5Score = document.getElementById("dates5Score");
let dates5Points = document.getElementById("dates5Points");
let cards10Score = document.getElementById("cards10Score");
let cards10Points = document.getElementById("cards10Points");
let snScore = document.getElementById("snScore");
let snPoints = document.getElementById("snPoints");
let scScore = document.getElementById("scScore");
let scPoints = document.getElementById("scPoints");
let scTime = document.getElementById("scTime");
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
let imagesStandards = 446;
let datesStandards = 142;
let spokenStandards = 47.3;

// login info
let adminUserName = "IAMWMC2023";
let adminPassword = "123789456IAM20wmc23";
let loggedIn = false;
let adminBtn = document.querySelector(".admin");
let loginPage = document.querySelector(".login");
let closeLoginBtn = document.querySelector(".close-login");
let userNameInput = document.getElementById("user-name");
let userPasswordInput = document.getElementById("password");
let loginBtn = document.querySelector(".login-btn");
let errorLoginMsg = document.querySelector(".error-login");

adminBtn.addEventListener("click", function () {
  loginPage.style.opacity = "1";
  loginPage.style.width = "100vw";
});
closeLoginBtn.addEventListener("click", function () {
  loginPage.style.width = "0";
  loginPage.style.opacity = "0";
});

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    userNameInput.value == adminUserName &&
    userPasswordInput.value == adminPassword
  ) {
    console.log("logged in");
    sessionStorage.setItem("userName", userNameInput.value);
    sessionStorage.setItem("password", userPasswordInput.value);
    loggedIn == true;
    errorLoginMsg.textContent = "You Logged In Successfully";
    errorLoginMsg.style.color = "#4caf50";

    setTimeout(() => {
      loginPage.style.width = "0";
    }, 1500);

    setTimeout(() => {
      location.reload();
    }, 2000);
  } else {
    console.log("you are not logged in");
    errorLoginMsg.textContent = "Error In Name or Password";
    errorLoginMsg.style.color = "#e91e45";
  }
});

if (
  sessionStorage.userName == adminUserName &&
  sessionStorage.password == adminPassword
) {
  loggedIn = true;
}

if (loggedIn) {
  console.log("Logged In");
} else {
  console.log("Not Logged In");
  document.getElementById("competitor-info-name").remove();
  document.querySelector(".addCompetitor").remove();
  document.querySelector(".searchBlock").remove();
  document.querySelector(".editcol").remove();
  document.querySelector(".deletecol").remove();
}

// prevent right click
document.addEventListener("contextmenu", (event) => event.preventDefault());

// Calculate Points
// get images pts
getTotalPoints();
images5Score.onkeyup = function () {
  images5Points.value =
    Math.round((images5Score.value / imagesStandards) * 1000 * 100) / 100;
  getTotalPoints();
};
// get binary pts
binary5Score.onkeyup = function () {
  binary5Points.value =
    Math.round((binary5Score.value / binaryStandards) * 1000 * 100) / 100;
  getTotalPoints();
};
// get 5-Min Numbers pts
number5Score.onkeyup = function () {
  number5Points.value =
    Math.round((number5Score.value / speedNumbersStandards) * 1000 * 100) / 100;
  getTotalPoints();
};
// get 15-Min Numbers pts
number15Score.onkeyup = function () {
  number15Points.value =
    Math.round((number15Score.value / longNumbersStandards) * 1000 * 100) / 100;
  getTotalPoints();
};
// get 5-Min Names&faces pts
names5Score.onkeyup = function () {
  names5Points.value =
    Math.round((names5Score.value / namesAndFacesStandards) * 1000 * 100) / 100;
  getTotalPoints();
};
// get 5-Min Dates pts
dates5Score.onkeyup = function () {
  dates5Points.value =
    Math.round((dates5Score.value / datesStandards) * 1000 * 100) / 100;
  getTotalPoints();
};
// get 5-Min Words pts
words5Score.onkeyup = function () {
  words5Points.value =
    Math.round((words5Score.value / wordsStandards) * 1000 * 100) / 100;
  getTotalPoints();
};

// get 10-Min Cards pts
cards10Score.onkeyup = function () {
  cards10Points.value =
    Math.round((cards10Score.value / longCardsStandards) * 1000 * 100) / 100;
  getTotalPoints();
};
// get spoken numbers Cards pts
snScore.onkeyup = function () {
  snPoints.value =
    Math.round(Math.sqrt(snScore.value) * spokenStandards * 100) / 100;
  getTotalPoints();
};
// get Speed Cards pts
function getscPoints() {
  scScore.innerHTML = 52;
  if (scTime.value < 300 && scScore.value == 52) {
    scPoints.value =
      Math.round((6862 / Math.pow(scTime.value, 0.75)) * 100) / 100;
  } else if (scScore.value <= 52 && scTime.value == 300) {
    scPoints.value = Math.round((scScore.value / 52) * 95.6 * 100) / 100;
  } else if (scScore.value <= 52 && scTime.value != 300) {
    scPoints.value = Math.round((scScore.value / 52) * 95.6 * 100) / 100;
  }
  getTotalPoints();
}
function getTotalPoints() {
  TPoints.value =
    Math.round(
      (+scPoints.value +
        +snPoints.value +
        +cards10Points.value +
        +words5Points.value +
        +dates5Points.value +
        +names5Points.value +
        +number15Points.value +
        +number5Points.value +
        +binary5Points.value +
        +images5Points.value) *
        100
    ) / 100;
  TPoints.style.background = "#4caf50";
  TPoints.style.color = "#fff";
  TPoints.style.fontWeight = "bold";
  TPoints.style.fontSize = "22px";
}

let competitorData;
// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = "visible";

  try {
    const {
      data: { tasks },
    } = await axios.get("/api/v1/tasks");

    competitorData = tasks;

    if (tasks.length < 1) {
      document.getElementById("tbody").innerHTML = `<tr class="empty-list">
          <td colspan="29">No data to show</td>
        </tr>`;

      loadingDOM.style.visibility = "hidden";
      return;
    }

    // Sort the array based on name
    tasks.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

    let table = "";
    for (let i = 0; i < tasks.length; i++) {
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
        speedNumbers,
        namesAndFaces,
        words,
        longCards,
        dates,
        spoken,
        speedCardsScore,
        speedCardsTime,
      } = tasks[i];

      let imagesPoints =
        Math.round((images / imagesStandards) * 1000 * 100) / 100;
      let binaryPoints =
        Math.round((binary / binaryStandards) * 1000 * 100) / 100;
      let longNumbersPoints =
        Math.round((longNumbers / longNumbersStandards) * 1000 * 100) / 100;
      let speedNumbersPoints =
        Math.round((speedNumbers / speedNumbersStandards) * 1000 * 100) / 100;
      let namesAndFacesPoints =
        Math.round((namesAndFaces / namesAndFacesStandards) * 1000 * 100) / 100;
      let wordsPoints = Math.round((words / wordsStandards) * 1000 * 100) / 100;
      let datesPoints = Math.round((dates / datesStandards) * 1000 * 100) / 100;
      let longCardsPoints =
        Math.round((longCards / longCardsStandards) * 1000 * 100) / 100;
      let spokenPoints =
        Math.round(Math.sqrt(spoken) * spokenStandards * 100) / 100;
      let speedCardsPoints = () => {
        if (speedCardsTime < 300 && speedCardsScore == 52) {
          return (
            Math.round((6862 / Math.pow(speedCardsTime, 0.75)) * 100) / 100
          );
        } else if (speedCardsScore <= 52 && speedCardsTime == 300) {
          return (scPoints.value =
            Math.round((speedCardsScore / 52) * 95.6 * 100) / 100);
        } else if (speedCardsScore <= 52 && speedCardsTime != 300) {
          return (scPoints.value =
            Math.round((speedCardsScore / 52) * 95.6 * 100) / 100);
        }
      };
      let overallPoints =
        imagesPoints +
        binaryPoints +
        longNumbersPoints +
        speedNumbersPoints +
        namesAndFacesPoints +
        wordsPoints +
        datesPoints +
        longCardsPoints +
        spokenPoints +
        speedCardsPoints();

      overallPoints = Math.round(overallPoints * 100) / 100;

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
              
              <td id="nameWidth">${name}</td>
              <td>${country || ""}</td>
              <td>${category || ""}</td>
              <td>${IAMID || ""}</td>
              <td>${images || ""}</td>
              <td>${imagesPoints}</td>
              <td>${binary || ""}</td>
              <td>${binaryPoints}</td>
              <td>${speedNumbers || ""}</td>
              <td>${speedNumbersPoints}</td>
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
              <td>${spoken || ""}</td>
              <td>${spokenPoints}</td>
              <td>${speedCardsScore || ""}</td>
              <td>${speedCardsTime || ""}</td>
              <td>${speedCardsPoints()}</td>
              <td class="total">${overallPoints}</td>
              <td class="Rank"></td>
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
    rankTotal();
    showImageTable();
    showBinaryTable();
    showNumber5Table();
    showWordsTable();
    showNumbers15Table();
    showNamesTable();
    showDatesTable();
    showCardsTable();
    showSNTable();
    showSCTable();
    sortTable();
    rankTotal();
    rankBin();
    rankImg();
    rankNum5();
    rankNum15();
    rankWor();
    rankNam();
    rankDat();
    rankCar();
    rankSN();
    rankSC();
  } catch (error) {
    document.getElementById("tbody").innerHTML =
      '<tr class="empty-list"><td colspan="29">There was an error, please try again later....</td></tr>';
  }

  loadingDOM.style.visibility = "hidden";
};
showTasks();

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

function displyOverallTable() {
  displayOneTable("overall-table", "overall-btn");
  sortTable();
  rankTotal();
}

function displyImageTable() {
  displayOneTable("img-table", "img-btn");
  sortImgTable();
}
function displyBinaryTable() {
  displayOneTable("bin-table", "bin-btn");
  sortBinTable();
}
function displyNumbers5Table() {
  displayOneTable("num5-table", "num5-btn");
  sortNum5Table();
}
function displyWordsTable() {
  displayOneTable("wor-table", "wor-btn");
  sortWorTable();
}
function displyNumbers15Table() {
  displayOneTable("num15-table", "num15-btn");
  sortNum15Table();
}
function displyNamesTable() {
  displayOneTable("nam-table", "nam-btn");
  sortNamTable();
}
function displyDatesTable() {
  displayOneTable("dat-table", "dat-btn");
  sortDatTable();
}
function displyCardsTable() {
  displayOneTable("car-table", "car-btn");
  sortCarTable();
}
function displySNTable() {
  displayOneTable("sn-table", "sn-btn");
  sortSNTable();
}
function displySCTable() {
  displayOneTable("sc-table", "sc-btn");
  sortSCTable();
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

function rankImg() {
  rankOneTable(".imgRank");
}
rankImg();

function showImageTable() {
  let imgtable = "";
  for (let i = 0; i < competitorData.length; i++)
    imgtable += `
        <tr>
            <td id="nameWidth">${competitorData[i].name}</td>
            <td>${competitorData[i].country}</td>
            <td>${competitorData[i].category}</td>
            <td>${competitorData[i].IAMID || ""}</td>
            <td>${competitorData[i].images || ""}</td>
            <td class="imgRank">${
              Math.round(
                (competitorData[i].images / imagesStandards) * 1000 * 100
              ) / 100
            }</td>
            <td class="Rank"></td>
        </tr>
    `;
  document.getElementById("imgTable").innerHTML = imgtable;
}

function rankBin() {
  rankOneTable(".binRank");
}
rankBin();

function showBinaryTable() {
  let bintable = "";
  for (let i = 0; i < competitorData.length; i++)
    bintable += `
    <tr>        
      <td id="nameWidth">${competitorData[i].name}</td>
      <td>${competitorData[i].country}</td>
      <td>${competitorData[i].category}</td>
      <td>${competitorData[i].IAMID || ""}</td>
      <td>${competitorData[i].binary || ""}</td>
      <td class="binRank">${
        Math.round((competitorData[i].binary / binaryStandards) * 1000 * 100) /
        100
      }</td>
      <td class="Rank"></td>
    </tr>
    `;
  document.getElementById("binTable").innerHTML = bintable;
}

function rankNum5() {
  rankOneTable(".num5Rank");
}
rankNum5();

function showNumber5Table() {
  let num5table = "";
  for (let i = 0; i < competitorData.length; i++)
    num5table += `
    <tr>      
                <td id="nameWidth">${competitorData[i].name}</td>
                <td>${competitorData[i].country}</td>
                <td>${competitorData[i].category}</td>
                <td>${competitorData[i].IAMID || ""}</td>
                <td>${competitorData[i].speedNumbers || ""}</td>
                <td class="num5Rank">${
                  Math.round(
                    (competitorData[i].speedNumbers / speedNumbersStandards) *
                      1000 *
                      100
                  ) / 100
                }</td>
                <td class="Rank"></td>
            </tr>
    `;
  document.getElementById("num5Table").innerHTML = num5table;
}

function rankWor() {
  rankOneTable(".worRank");
}
rankWor();
function showWordsTable() {
  let wortable = "";
  for (let i = 0; i < competitorData.length; i++)
    wortable += `
    <tr>
                <td id="nameWidth">${competitorData[i].name}</td>
                <td>${competitorData[i].country}</td>
                <td>${competitorData[i].category}</td>
                <td>${competitorData[i].IAMID || ""}</td>
                <td>${competitorData[i].words || ""}</td>
                <td class="worRank">${
                  Math.round(
                    (competitorData[i].words / wordsStandards) * 1000 * 100
                  ) / 100
                }</td>
                <td class="Rank"></td>
            </tr>
    `;
  document.getElementById("worTable").innerHTML = wortable;
}

function rankNum15() {
  rankOneTable(".num15Rank");
}
rankNum15();

function showNumbers15Table() {
  let num15table = "";
  for (let i = 0; i < competitorData.length; i++)
    num15table += `
    <tr>
                <td id="nameWidth">${competitorData[i].name}</td>
                <td>${competitorData[i].country}</td>
                <td>${competitorData[i].category}</td>
                <td>${competitorData[i].IAMID || ""}</td>
                <td>${competitorData[i].longNumbers || ""}</td>
                <td class="num15Rank">${
                  Math.round(
                    (competitorData[i].longNumbers / longNumbersStandards) *
                      1000 *
                      100
                  ) / 100
                }</td>
                <td class="Rank"></td>
            </tr>
    `;
  document.getElementById("num15Table").innerHTML = num15table;
}

function rankNam() {
  rankOneTable(".namRank");
}
rankNam();

function showNamesTable() {
  let namtable = "";
  for (let i = 0; i < competitorData.length; i++)
    namtable += `
    <tr>
                <td id="nameWidth">${competitorData[i].name}</td>
                <td>${competitorData[i].country}</td>
                <td>${competitorData[i].category}</td>
                <td>${competitorData[i].IAMID || ""}</td>
                <td>${competitorData[i].namesAndFaces || ""}</td>
                <td class="namRank">${
                  Math.round(
                    (competitorData[i].namesAndFaces / namesAndFacesStandards) *
                      1000 *
                      100
                  ) / 100
                }</td>
                <td class="Rank"></td>
            </tr>
    `;
  document.getElementById("namTable").innerHTML = namtable;
}

function rankDat() {
  rankOneTable(".datRank");
}
rankDat();

function showDatesTable() {
  let dattable = "";
  for (let i = 0; i < competitorData.length; i++)
    dattable += `
    <tr>
                <td id="nameWidth">${competitorData[i].name}</td>
                <td>${competitorData[i].country}</td>
                <td>${competitorData[i].category}</td>
                <td>${competitorData[i].IAMID || ""}</td>
                <td>${competitorData[i].dates || ""}</td>
                <td class="datRank">${
                  Math.round(
                    (competitorData[i].dates / datesStandards) * 1000 * 100
                  ) / 100
                }</td>
                <td class="Rank"></td>
            </tr>
    `;
  document.getElementById("datTable").innerHTML = dattable;
}

function rankCar() {
  rankOneTable(".carRank");
}
rankCar();

function showCardsTable() {
  let cartable = "";
  for (let i = 0; i < competitorData.length; i++)
    cartable += `
        <tr>
            <td id="nameWidth">${competitorData[i].name}</td>
            <td>${competitorData[i].country}</td>
            <td>${competitorData[i].category}</td>
            <td>${competitorData[i].IAMID || ""}</td>
            <td>${competitorData[i].longCards || ""}</td>
            <td class="carRank">${
              Math.round(
                (competitorData[i].longCards / longCardsStandards) * 1000 * 100
              ) / 100
            }</td>
            <td class="Rank"></td>
        </tr>
    `;
  document.getElementById("carTable").innerHTML = cartable;
}

function rankSN() {
  rankOneTable(".snRank");
}
rankSN();

function showSNTable() {
  let sntable = "";
  for (let i = 0; i < competitorData.length; i++)
    sntable += `
    <tr>
                <td id="nameWidth">${competitorData[i].name}</td>
                <td>${competitorData[i].country}</td>
                <td>${competitorData[i].category}</td>
                <td>${competitorData[i].IAMID || ""}</td>
                <td>${competitorData[i].spoken || ""}</td>
                <td class="snRank">${
                  Math.round(
                    Math.sqrt(competitorData[i].spoken) * spokenStandards * 100
                  ) / 100
                }</td>
                <td class="Rank"></td>
            </tr>
    `;
  document.getElementById("snTable").innerHTML = sntable;
}

function rankSC() {
  rankOneTable(".scRank");
}
rankSC();

function showSCTable() {
  let sctable = "";
  for (let i = 0; i < competitorData.length; i++) {
    let speedCardsPoints = () => {
      if (
        competitorData[i].speedCardsTime < 300 &&
        competitorData[i].speedCardsScore == 52
      ) {
        return (
          Math.round(
            (6862 / Math.pow(competitorData[i].speedCardsTime, 0.75)) * 100
          ) / 100
        );
      } else if (
        competitorData[i].speedCardsScore <= 52 &&
        competitorData[i].speedCardsTime == 300
      ) {
        return (scPoints.value =
          Math.round((competitorData[i].speedCardsScore / 52) * 95.6 * 100) /
          100);
      } else if (
        competitorData[i].speedCardsScore <= 52 &&
        competitorData[i].speedCardsTime != 300
      ) {
        return (scPoints.value =
          Math.round((competitorData[i].speedCardsScore / 52) * 95.6 * 100) /
          100);
      }
    };

    sctable += `
    <tr>
                <td id="nameWidth">${competitorData[i].name}</td>
                <td>${competitorData[i].country}</td>
                <td>${competitorData[i].category}</td>
                <td>${competitorData[i].IAMID || ""}</td>
                <td>${competitorData[i].speedCardsScore || ""}</td>
                <td>${competitorData[i].speedCardsTime || ""}</td>
                <td class="scRank">${speedCardsPoints()}</td>
                <td class="Rank"></td>
            </tr>
    `;
  }
  document.getElementById("scTable").innerHTML = sctable;
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

// form
if (loggedIn) {
  document.getElementById("AddCompetitor").onclick = async (e) => {
    e.preventDefault();

    const name = competitorName.value;
    const IAMID = iamId.value;
    const country = competitorCountry.value;
    const category = competitorCategory.value;
    const images = images5Score.value;
    const binary = binary5Score.value;
    const longNumbers = number15Score.value;
    const speedNumbers = number5Score.value;
    const namesAndFaces = names5Score.value;
    const words = words5Score.value;
    const dates = dates5Score.value;
    const spoken = snScore.value;
    const speedCardsScore = scScore.value;
    const speedCardsTime = scTime.value;
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
        speedNumbers,
        namesAndFaces,
        words,
        dates,
        spoken,
        speedCardsScore,
        speedCardsTime,
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
        formAlertDOM.innerHTML = `error, something went wrong, please try again later!`;
      }
      formAlertDOM.style.display = "block";
      formAlertDOM.style.color = "#e91e45";
    }
    setTimeout(() => {
      formAlertDOM.style.display = "none";
    }, 3000);
  };
} else {
}

// clear after creat
function clearData() {
  competitorName.value = "";
  iamId.value = "";
  images5Score.value = "";
  images5Points.value = "";
  binary5Score.value = "";
  binary5Points.value = "";
  number5Score.value = "";
  number5Points.value = "";
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
  snScore.value = "";
  snPoints.value = "";
  scScore.value = "";
  scPoints.value = "";
  scTime.value = "";
  TPoints.value = "0";
}

function rankOneTable(valuesClassName) {
  $(function () {
    //Get all total values, sort and remove duplicates
    let totalList = $(valuesClassName)
      .map(function () {
        return $(this).text();
      })
      .get()
      .sort(function (a, b) {
        return a - b;
      })
      .reduce(function (a, b) {
        if (b != a[0]) a.unshift(b);
        return a;
      }, []);

    //Assign rank
    totalList.forEach((v, i) => {
      $(valuesClassName)
        .filter(function () {
          return $(this).text() == v;
        })
        .next()
        .text(i + 1);
    });
  });
}

// rank
function rankTotal() {
  rankOneTable(".total");
}
rankTotal();

// sort overall table
function sortOneTable(tbodyId, colNumber) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById(tbodyId);
  switching = true;
  /*Make a loop that will continue until
    no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
      first, which contains table headers):*/
    for (i = 0; i <= rows.length; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
        one from current row and one from the next:*/
      x = rows[i]?.getElementsByTagName("td")[colNumber];
      y = rows[i + 1]?.getElementsByTagName("td")[colNumber];
      //check if the two rows should switch place:
      if (Number(x?.innerHTML) < Number(y?.innerHTML)) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortOneTableString(tbodyId, coloNumber) {
  sortTable();
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById(tbodyId);
  switching = true;
  /*Make a loop that will continue until
      no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
        first, which contains table headers):*/
    for (i = 0; i <= rows.length; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
          one from current row and one from the next:*/
      x = rows[i]?.getElementsByTagName("TD")[coloNumber];
      y = rows[i + 1]?.getElementsByTagName("TD")[coloNumber];
      //check if the two rows should switch place:
      if (x?.innerHTML > y?.innerHTML) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
          and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortTable() {
  sortOneTable("tbody", loggedIn ? 26 : 25);
}
sortTable();

function sortCountryTable() {
  sortTable();
  sortOneTableString("tbody", loggedIn ? 2 : 1);
}
function sortCategoryTable() {
  sortTable();
  sortOneTableString("tbody", loggedIn ? 3 : 2);
}
function sortAlphabitTable() {
  sortTable();
  sortOneTableString("tbody", loggedIn ? 1 : 0);
}

// sort one discpline table
function sortImgTable() {
  sortOneTable("imgTable", 5);
}
function sortCountryImgTable() {
  sortImgTable();
  sortOneTableString("imgTable", 1);
}

function sortCategoryImgTable() {
  sortImgTable();
  sortOneTableString("imgTable", 2);
}
function sortAlphabitImgTable() {
  sortImgTable();
  sortOneTableString("imgTable", 0);
}

function sortBinTable() {
  sortOneTable("binTable", 5);
}

function sortCountryBinTable() {
  sortBinTable();
  sortOneTableString("binTable", 1);
}

function sortCategoryBinTable() {
  sortBinTable();
  sortOneTableString("binTable", 2);
}

function sortAlphabitBinTable() {
  sortBinTable();
  sortOneTableString("binTable", 0);
}

function sortNum5Table() {
  sortOneTable("num5Table", 5);
}

function sortCountryNum5Table() {
  sortNum5Table();
  sortOneTableString("num5Table", 1);
}

function sortCategoryNum5Table() {
  sortNum5Table();
  sortOneTableString("num5Table", 2);
}

function sortAlphabitNum5Table() {
  sortNum5Table();
  sortOneTableString("num5Table", 0);
}

function sortWorTable() {
  sortOneTable("worTable", 5);
}

function sortCountryWorTable() {
  sortWorTable();
  sortOneTableString("worTable", 1);
}

function sortCategoryWorTable() {
  sortWorTable();
  sortOneTableString("worTable", 2);
}

function sortAlphabitWorTable() {
  sortWorTable();
  sortOneTableString("worTable", 0);
}

function sortNum15Table() {
  sortOneTable("num15Table", 5);
}

function sortCountryNum15Table() {
  sortNum15Table();
  sortOneTableString("num15Table", 1);
}

function sortCategoryNum15Table() {
  sortNum15Table();
  sortOneTableString("num15Table", 2);
}

function sortAlphabitNum15Table() {
  sortNum15Table();
  sortOneTableString("num15Table", 0);
}

function sortNamTable() {
  sortOneTable("namTable", 5);
}

function sortCountryNamTable() {
  sortNamTable();
  sortOneTableString("namTable", 1);
}

function sortCategoryNamTable() {
  sortNamTable();
  sortOneTableString("namTable", 2);
}

function sortAlphabitNamTable() {
  sortNamTable();
  sortOneTableString("namTable", 0);
}

function sortDatTable() {
  sortOneTable("datTable", 5);
}

function sortCountryDatTable() {
  sortDatTable();
  sortOneTableString("datTable", 1);
}

function sortCategoryDatTable() {
  sortDatTable();
  sortOneTableString("datTable", 2);
}

function sortAlphabitDatTable() {
  sortDatTable();
  sortOneTableString("datTable", 0);
}

function sortCarTable() {
  sortOneTable("carTable", 5);
}

function sortCountryCarTable() {
  sortCarTable();
  sortOneTableString("carTable", 1);
}

function sortCategoryCarTable() {
  sortCarTable();
  sortOneTableString("carTable", 2);
}

function sortAlphabitCarTable() {
  sortCarTable();
  sortOneTableString("carTable", 0);
}

function sortSNTable() {
  sortOneTable("snTable", 5);
}

function sortCountrySNTable() {
  sortSNTable();
  sortOneTableString("snTable", 1);
}

function sortCategorySNTable() {
  sortSNTable();
  sortOneTableString("snTable", 2);
}

function sortAlphabitSNTable() {
  sortSNTable();
  sortOneTableString("snTable", 0);
}

function sortSCTable() {
  sortOneTable("scTable", 6);
}

function sortCountrySCTable() {
  sortSCTable();
  sortOneTableString("scTable", 1);
}

function sortCategorySCTable() {
  sortSCTable();
  sortOneTableString("scTable", 2);
}

function sortAlphabitSCTable() {
  sortSCTable();
  sortOneTableString("scTable", 0);
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
  showTasks();
  showImageTable();
  showBinaryTable();
  showNumber5Table();
  showWordsTable();
  showNumbers15Table();
  showNamesTable();
  showDatesTable();
  showCardsTable();
  showSNTable();
  showSCTable();
  sortTable();
  rankTotal();
  rankBin();
  sortBinTable();
  rankImg();
  sortImgTable();
  rankNum5();
  sortNum5Table();
  rankNum15();
  sortNum15Table();
  rankWor();
  sortWorTable();
  rankNam();
  sortNamTable();
  rankDat();
  sortDatTable();
  rankCar();
  sortCarTable();
  rankSN();
  sortSNTable();
  rankSC();
  sortSCTable();
}

function searchCompetitors(value) {
  let table = "";
  if (searchMood == "name") {
    for (let i = 0; i < competitorData.length; i++) {
      if (competitorData[i].name.includes(value.toLowerCase())) {
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
          speedNumbers,
          namesAndFaces,
          words,
          longCards,
          dates,
          spoken,
          speedCardsScore,
          speedCardsTime,
        } = competitorData[i];

        let imagesPoints =
          Math.round((images / imagesStandards) * 1000 * 100) / 100;
        let binaryPoints =
          Math.round((binary / binaryStandards) * 1000 * 100) / 100;
        let longNumbersPoints =
          Math.round((longNumbers / longNumbersStandards) * 1000 * 100) / 100;
        let speedNumbersPoints =
          Math.round((speedNumbers / speedNumbersStandards) * 1000 * 100) / 100;
        let namesAndFacesPoints =
          Math.round((namesAndFaces / namesAndFacesStandards) * 1000 * 100) /
          100;
        let wordsPoints =
          Math.round((words / wordsStandards) * 1000 * 100) / 100;
        let datesPoints =
          Math.round((dates / datesStandards) * 1000 * 100) / 100;
        let longCardsPoints =
          Math.round((longCards / longCardsStandards) * 1000 * 100) / 100;
        let spokenPoints =
          Math.round(Math.sqrt(spoken) * spokenStandards * 100) / 100;
        let speedCardsPoints = () => {
          if (speedCardsTime < 300 && speedCardsScore == 52) {
            return (
              Math.round((6862 / Math.pow(speedCardsTime, 0.75)) * 100) / 100
            );
          } else if (speedCardsScore <= 52 && speedCardsTime == 300) {
            return (scPoints.value =
              Math.round((speedCardsScore / 52) * 95.6 * 100) / 100);
          } else if (speedCardsScore <= 52 && speedCardsTime != 300) {
            return (scPoints.value =
              Math.round((speedCardsScore / 52) * 95.6 * 100) / 100);
          }
        };
        let overallPoints =
          imagesPoints +
          binaryPoints +
          longNumbersPoints +
          speedNumbersPoints +
          namesAndFacesPoints +
          wordsPoints +
          datesPoints +
          longCardsPoints +
          spokenPoints +
          speedCardsPoints();

        overallPoints = Math.round(overallPoints * 100) / 100;

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
              
              <td id="nameWidth">${name}</td>
              <td>${country || ""}</td>
              <td>${category || ""}</td>
              <td>${IAMID || ""}</td>
              <td>${images || ""}</td>
              <td>${imagesPoints}</td>
              <td>${binary || ""}</td>
              <td>${binaryPoints}</td>
              <td>${speedNumbers || ""}</td>
              <td>${speedNumbersPoints}</td>
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
              <td>${spoken || ""}</td>
              <td>${spokenPoints}</td>
              <td>${speedCardsScore || ""}</td>
              <td>${speedCardsTime || ""}</td>
              <td>${speedCardsPoints()}</td>
              <td class="total">${overallPoints}</td>
              <td class="Rank"></td>
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
    }
  } else {
    for (let i = 0; i < competitorData.length; i++) {
      if (competitorData[i].IAMID.toString().includes(value)) {
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
          speedNumbers,
          namesAndFaces,
          words,
          longCards,
          dates,
          spoken,
          speedCardsScore,
          speedCardsTime,
        } = competitorData[i];

        let imagesPoints =
          Math.round((images / imagesStandards) * 1000 * 100) / 100;
        let binaryPoints =
          Math.round((binary / binaryStandards) * 1000 * 100) / 100;
        let longNumbersPoints =
          Math.round((longNumbers / longNumbersStandards) * 1000 * 100) / 100;
        let speedNumbersPoints =
          Math.round((speedNumbers / speedNumbersStandards) * 1000 * 100) / 100;
        let namesAndFacesPoints =
          Math.round((namesAndFaces / namesAndFacesStandards) * 1000 * 100) /
          100;
        let wordsPoints =
          Math.round((words / wordsStandards) * 1000 * 100) / 100;
        let datesPoints =
          Math.round((dates / datesStandards) * 1000 * 100) / 100;
        let longCardsPoints =
          Math.round((longCards / longCardsStandards) * 1000 * 100) / 100;
        let spokenPoints =
          Math.round(Math.sqrt(spoken) * spokenStandards * 100) / 100;
        let speedCardsPoints = () => {
          if (speedCardsTime < 300 && speedCardsScore == 52) {
            return (
              Math.round((6862 / Math.pow(speedCardsTime, 0.75)) * 100) / 100
            );
          } else if (speedCardsScore <= 52 && speedCardsTime == 300) {
            return (scPoints.value =
              Math.round((speedCardsScore / 52) * 95.6 * 100) / 100);
          } else if (speedCardsScore <= 52 && speedCardsTime != 300) {
            return (scPoints.value =
              Math.round((speedCardsScore / 52) * 95.6 * 100) / 100);
          }
        };
        let overallPoints =
          imagesPoints +
          binaryPoints +
          longNumbersPoints +
          speedNumbersPoints +
          namesAndFacesPoints +
          wordsPoints +
          datesPoints +
          longCardsPoints +
          spokenPoints +
          speedCardsPoints();

        overallPoints = Math.round(overallPoints * 100) / 100;

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
                  
                  <td id="nameWidth">${name}</td>
                  <td>${country || ""}</td>
                  <td>${category || ""}</td>
                  <td>${IAMID || ""}</td>
                  <td>${images || ""}</td>
                  <td>${imagesPoints}</td>
                  <td>${binary || ""}</td>
                  <td>${binaryPoints}</td>
                  <td>${speedNumbers || ""}</td>
                  <td>${speedNumbersPoints}</td>
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
                  <td>${spoken || ""}</td>
                  <td>${spokenPoints}</td>
                  <td>${speedCardsScore || ""}</td>
                  <td>${speedCardsTime || ""}</td>
                  <td>${speedCardsPoints()}</td>
                  <td class="total">${overallPoints}</td>
                  <td class="Rank"></td>
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
    }
  }
  document.getElementById("tbody").innerHTML = table;
  rankTotal();
  sortTable();
}
