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

    // get pts
    images5Points.value = calcPoints(images, imagesStandards);
    binary5Points.value = calcPoints(binary, binaryStandards);
    number5PointsOne.value = calcPoints(speedNumbersOne, speedNumbersStandards);
    number5PointsTwo.value = calcPoints(speedNumbersTwo, speedNumbersStandards);
    number15Points.value = calcPoints(longNumbers, longNumbersStandards);
    names5Points.value = calcPoints(namesAndFaces, namesAndFacesStandards);
    dates5Points.value = calcPoints(dates, datesStandards);
    words5Points.value = calcPoints(words, wordsStandards);
    cards10Points.value = calcPoints(longCards, longCardsStandards);
    snPointsOne.value = calcSpokenPoints(spokenOne);
    snPointsTwo.value = calcSpokenPoints(spokenTwo);
    snPointsThree.value = calcSpokenPoints(spokenThree);
    scPointsOne.value = getScPoints(speedCardsScoreOne, speedCardsTimeOne);
    scPointsTwo.value = getScPoints(speedCardsScoreTwo, speedCardsTimeTwo);

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
