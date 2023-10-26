const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");

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

let tempName;

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
// get spoken numbers pts
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
// get images pts
getTotalPoints();

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

const showTask = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`);
    const {
      _id: taskID,
      completed,
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
    } = task;

    competitorName.value = name;
    competitorCountry.value = country;
    competitorCategory.value = category;
    iamId.value = IAMID;
    images5Score.value = images;
    binary5Score.value = binary;
    number5Score.value = speedNumbers;
    words5Score.value = words;
    number15Score.value = longNumbers;
    names5Score.value = namesAndFaces;
    dates5Score.value = dates;
    cards10Score.value = longCards;
    snScore.value = spoken;
    scScore.value = speedCardsScore;
    scTime.value = speedCardsTime;

    // get images pts
    images5Points.value =
      Math.round((images / imagesStandards) * 1000 * 100) / 100;
    // get binary pts
    binary5Points.value =
      Math.round((binary / binaryStandards) * 1000 * 100) / 100;
    // get 5-Min Numbers pts
    number5Points.value =
      Math.round((speedNumbers / speedNumbersStandards) * 1000 * 100) / 100;
    // get 15-Min Numbers pts
    number15Points.value =
      Math.round((longNumbers / longNumbersStandards) * 1000 * 100) / 100;

    // get 5-Min Names&faces pts
    names5Points.value =
      Math.round((namesAndFaces / namesAndFacesStandards) * 1000 * 100) / 100;

    // get 5-Min Dates pts
    dates5Points.value =
      Math.round((dates / datesStandards) * 1000 * 100) / 100;

    // get 5-Min Words pts
    words5Points.value =
      Math.round((words / wordsStandards) * 1000 * 100) / 100;

    // get 10-Min Cards pts
    cards10Points.value =
      Math.round((longCards / longCardsStandards) * 1000 * 100) / 100;

    // get 10-Min Cards pts
    snPoints.value =
      Math.round(Math.sqrt(spoken) * spokenStandards * 100) / 100;

    // get Speed Cards pts
    let speedCardsPoints = () => {
      if (speedCardsTime < 300 && speedCardsScore == 52) {
        return Math.round((6862 / Math.pow(speedCardsTime, 0.75)) * 100) / 100;
      } else if (speedCardsScore <= 52 && speedCardsTime == 300) {
        return (scPoints.value =
          Math.round((speedCardsScore / 52) * 95.6 * 100) / 100);
      } else if (speedCardsScore <= 52 && speedCardsTime != 300) {
        return (scPoints.value =
          Math.round((speedCardsScore / 52) * 95.6 * 100) / 100);
      }
    };

    scPoints.value = speedCardsPoints();
    getTotalPoints();

    tempName = name;

    // if (completed) {
    //   taskCompletedDOM.checked = true;
    // }
  } catch (error) {
    console.log(error);
  }
};

showTask();

let addCompetitor = document.getElementById("AddCompetitor");

addCompetitor.addEventListener("click", async (e) => {
  addCompetitor.textContent = "Loading...";
  e.preventDefault();

  try {
    // const taskName = taskNameDOM.value;
    // const taskCompleted = taskCompletedDOM.checked;

    const {
      data: { task },
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: competitorName.value,
      country: competitorCountry.value,
      category: competitorCategory.value,
      IAMID: iamId.value,
      images: images5Score.value,
      binary: binary5Score.value,
      speedNumbers: number5Score.value,
      words: words5Score.value,
      longNumbers: number15Score.value,
      namesAndFaces: names5Score.value,
      dates: dates5Score.value,
      longCards: cards10Score.value,
      spoken: snScore.value,
      speedCardsScore: scScore.value,
      speedCardsTime: scTime.value,
    });

    const {
      _id: taskID,
      completed,
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
    } = task;

    competitorName.value = name;
    competitorCountry.value = country;
    competitorCategory.value = category;
    iamId.value = IAMID;
    images5Score.value = images;
    binary5Score.value = binary;
    number5Score.value = speedNumbers;
    words5Score.value = words;
    number15Score.value = longNumbers;
    names5Score.value = namesAndFaces;
    dates5Score.value = dates;
    cards10Score.value = longCards;
    snScore.value = spoken;
    scScore.value = speedCardsScore;
    scTime.value = speedCardsTime;

    // if (completed) {
    //   taskCompletedDOM.checked = true;
    // }

    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, edited competitor`;
    formAlertDOM.style.color = "#4caf50";
  } catch (error) {
    console.error(error);
    if (competitorName.value === "") {
      formAlertDOM.innerHTML = `error, name can't be empty`;
    } else {
      formAlertDOM.innerHTML = `error, please try again`;
    }
    formAlertDOM.style.color = "#e91e45";
    // competitorName.value = tempName;
    formAlertDOM.style.display = "block";
  }
  addCompetitor.textContent = "Edit Competitor";
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
