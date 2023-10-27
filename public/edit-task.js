const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");

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
number5ScoreOne.onkeyup = function () {
  number5PointsOne.value =
    Math.round((number5ScoreOne.value / speedNumbersStandards) * 1000 * 100) /
    100;
  getTotalPoints();
};

number5ScoreTwo.onkeyup = function () {
  number5PointsTwo.value =
    Math.round((number5ScoreTwo.value / speedNumbersStandards) * 1000 * 100) /
    100;
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
snScoreOne.onkeyup = function () {
  snPointsOne.value =
    Math.round(Math.sqrt(snScoreOne.value) * spokenStandards * 100) / 100;
  getTotalPoints();
};
snScoreTwo.onkeyup = function () {
  snPointsTwo.value =
    Math.round(Math.sqrt(snScoreTwo.value) * spokenStandards * 100) / 100;
  getTotalPoints();
};
snScoreThree.onkeyup = function () {
  snPointsThree.value =
    Math.round(Math.sqrt(snScoreThree.value) * spokenStandards * 100) / 100;
  getTotalPoints();
};

// get Speed Cards pts
function getscPointsOne() {
  scScoreOne.innerHTML = 52;
  if (
    +scTimeOne.value < 300 &&
    scTimeOne.value !== "" &&
    +scScoreOne.value === 52
  ) {
    scPointsOne.value =
      Math.round((6862 / Math.pow(scTimeOne.value, 0.75)) * 100) / 100;
  } else if (+scScoreOne.value <= 52 && +scTimeOne.value === 300) {
    scPointsOne.value = Math.round((scScoreOne.value / 52) * 95.6 * 100) / 100;
  } else if (+scScoreOne.value <= 52 && +scTimeOne.value !== 300) {
    scPointsOne.value = Math.round((scScoreOne.value / 52) * 95.6 * 100) / 100;
  }
  getTotalPoints();
}

function getscPointsTwo() {
  scScoreTwo.innerHTML = 52;
  if (
    +scTimeTwo.value < 300 &&
    scTimeTwo.value !== "" &&
    +scScoreTwo.value === 52
  ) {
    scPointsTwo.value =
      Math.round((6862 / Math.pow(scTimeTwo.value, 0.75)) * 100) / 100;
  } else if (+scScoreTwo.value <= 52 && +scTimeTwo.value === 300) {
    scPointsTwo.value = Math.round((scScoreTwo.value / 52) * 95.6 * 100) / 100;
  } else if (+scScoreTwo.value <= 52 && +scTimeTwo.value !== 300) {
    scPointsTwo.value = Math.round((scScoreTwo.value / 52) * 95.6 * 100) / 100;
  }
  getTotalPoints();
}

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
    } = task;

    competitorName.value = name;
    competitorCountry.value = country;
    competitorCategory.value = category;
    iamId.value = IAMID;
    images5Score.value = images;
    binary5Score.value = binary;
    number5ScoreOne.value = speedNumbersOne;
    number5ScoreTwo.value = speedNumbersTwo;
    words5Score.value = words;
    number15Score.value = longNumbers;
    names5Score.value = namesAndFaces;
    dates5Score.value = dates;
    cards10Score.value = longCards;
    snScoreOne.value = spokenOne;
    snScoreTwo.value = spokenTwo;
    snScoreThree.value = spokenThree;
    scScoreOne.value = speedCardsScoreOne;
    scTimeOne.value = speedCardsTimeOne;
    scScoreTwo.value = speedCardsScoreTwo;
    scTimeTwo.value = speedCardsTimeTwo;

    // get images pts
    images5Points.value =
      Math.round((images / imagesStandards) * 1000 * 100) / 100;
    // get binary pts
    binary5Points.value =
      Math.round((binary / binaryStandards) * 1000 * 100) / 100;
    // get 5-Min Numbers pts
    number5PointsOne.value =
      Math.round((speedNumbersOne / speedNumbersStandards) * 1000 * 100) / 100;
    number5PointsTwo.value =
      Math.round((speedNumbersTwo / speedNumbersStandards) * 1000 * 100) / 100;
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
    snPointsOne.value =
      Math.round(Math.sqrt(spokenOne) * spokenStandards * 100) / 100;
    snPointsTwo.value =
      Math.round(Math.sqrt(spokenTwo) * spokenStandards * 100) / 100;
    snPointsThree.value =
      Math.round(Math.sqrt(spokenThree) * spokenStandards * 100) / 100;

    // get Speed Cards pts
    let speedCardsPoints = (score, time) => {
      if (time < 300 && score == 52) {
        return Math.round((6862 / Math.pow(time, 0.75)) * 100) / 100;
      } else if (score <= 52 && time == 300) {
        return Math.round((score / 52) * 95.6 * 100) / 100;
      } else if (score <= 52 && time != 300) {
        return Math.round((score / 52) * 95.6 * 100) / 100;
      }
    };

    scPointsOne.value = speedCardsPoints(speedCardsScoreOne, speedCardsTimeOne);
    scPointsTwo.value = speedCardsPoints(speedCardsScoreTwo, speedCardsTimeTwo);

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
      speedNumbersOne: number5ScoreOne.value,
      speedNumbersTwo: number5ScoreTwo.value,
      words: words5Score.value,
      longNumbers: number15Score.value,
      namesAndFaces: names5Score.value,
      dates: dates5Score.value,
      longCards: cards10Score.value,
      spokenOne: snScoreOne.value,
      spokenTwo: snScoreTwo.value,
      spokenThree: snScoreThree.value,
      speedCardsScoreOne: scScoreOne.value,
      speedCardsTimeOne: scTimeOne.value,
      speedCardsScoreTwo: scScoreTwo.value,
      speedCardsTimeTwo: scTimeTwo.value,
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
    } = task;

    competitorName.value = name;
    competitorCountry.value = country;
    competitorCategory.value = category;
    iamId.value = IAMID;
    images5Score.value = images;
    binary5Score.value = binary;
    number5ScoreOne.value = speedNumbersOne;
    number5ScoreTwo.value = speedNumbersTwo;
    words5Score.value = words;
    number15Score.value = longNumbers;
    names5Score.value = namesAndFaces;
    dates5Score.value = dates;
    cards10Score.value = longCards;
    snScoreOne.value = spokenOne;
    snScoreTwo.value = spokenTwo;
    snScoreThree.value = spokenThree;
    scScoreOne.value = speedCardsScoreOne;
    scTimeOne.value = speedCardsTimeOne;
    scScoreTwo.value = speedCardsScoreTwo;
    scTimeTwo.value = speedCardsTimeTwo;

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
