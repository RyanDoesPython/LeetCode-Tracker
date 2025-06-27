const container = document.getElementById("cardContainer");
let data;
let sortSetting = "question time low to high";

fetch("http://localhost:3000/api/cards")
  .then(res => res.json())
  .then(cards => {
    loadCards(cards, sortSetting);
  })
  .catch(err => {
    console.error("Failed to load cards:", err);
    container.innerHTML = "<p style='color:red;'>Error loading cards.</p>";
  });

function loadCards(data, sortSetting){
  data = sortData(data, sortSetting);
  
  container.innerHTML = ""
  data.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";

    // Convert number to string and pad with non-breaking spaces
    const numberString = card.problemNumber.toString();
    const paddedNumber = numberString.padEnd(4, '\u00A0'); // 4-character width using non-breaking space

    div.innerHTML = `
      <div class=${card.difficulty}></div>
      <h3 class="numberText">#${paddedNumber}</h3>
      <a href="${card.url}" target="_blank" class="problemName">${card.name}</a>

      <p class="timeData">${card.time} min ~ ${card.date}</p>

      <button class="notesButton" id="${card.problemNumber}">
        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="notesSVG" d="M15.5 20.6667V15.5M15.5 10.3333H15.5129M28.4166 15.5C28.4166 22.6337 22.6337 28.4167 15.5 28.4167C8.3663 28.4167 2.58331 22.6337 2.58331 15.5C2.58331 8.36632 8.3663 2.58333 15.5 2.58333C22.6337 2.58333 28.4166 8.36632 28.4166 15.5Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <button class="deleteButton" id="${card.problemNumber}">
        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="deleteSVG" d="M28.75 2.75L2.25 28.25M2.25 2.75L28.75 28.25" stroke="#F8615C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;
    container.appendChild(div);
  });
}

const sortButton = document.getElementById("sortButton");
const sortOptions = document.getElementById("sortOptions");

const timeToCompleteButton = document.getElementById("timeToCompleteButton");
const sortQuestionIDButton = document.getElementById("sortQuestionIDButton");
const sortQuestionDifficulty = document.getElementById("sortQuestionDifficulty");
const sortQuestionDate = document.getElementById("sortQuestionDate");

let questionIDSortDirection = "question ID low to high";
let questionDifficultySortDirection = "question difficulty easy to hard";
let questionDateSortDirection = "question date submitted recent";
let timeToCompleteSortDirection = "question time low to high";


const sortSVGDown = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-down-short-wide" class="svg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M15 377l96 96c9.4 9.4 24.6 9.4 33.9 0l96-96c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55V56c0-13.3-10.7-24-24-24s-24 10.7-24 24V398.1L49 343c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9zM312 48c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H312zm0 128c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H312zm0 128c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H312zm0 128c-13.3 0-24 10.7-24 24s10.7 24 24 24H552c13.3 0 24-10.7 24-24s-10.7-24-24-24H312z"></path></svg>`
const sortSVGUp = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-down-wide-short" class="svg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M15 377l96 96c9.4 9.4 24.6 9.4 33.9 0l96-96c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55V56c0-13.3-10.7-24-24-24s-24 10.7-24 24V398.1L49 343c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9zM312 480h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H312c-13.3 0-24 10.7-24 24s10.7 24 24 24zm0-128H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H312c-13.3 0-24 10.7-24 24s10.7 24 24 24zm0-128H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H312c-13.3 0-24 10.7-24 24s10.7 24 24 24zm0-128H552c13.3 0 24-10.7 24-24s-10.7-24-24-24H312c-13.3 0-24 10.7-24 24s10.7 24 24 24z"></path></svg>`
const numberSortSVGDown = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-down-9-1" class="svg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M47 377l96 96c9.4 9.4 24.6 9.4 33.9 0l96-96c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55V56c0-13.3-10.7-24-24-24s-24 10.7-24 24V398.1L81 343c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9zm409-65c0-7.7-3.7-15-10-19.5s-14.3-5.7-21.6-3.3l-48 16c-12.6 4.2-19.4 17.8-15.2 30.4s17.8 19.4 30.4 15.2l16.4-5.5V432H384c-13.3 0-24 10.7-24 24s10.7 24 24 24h48 48c13.3 0 24-10.7 24-24s-10.7-24-24-24H456V312zM424 160a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm88-40c0-48.6-39.4-88-88-88s-88 39.4-88 88c0 42.1 29.6 77.3 69.1 86l-15.6 18.7c-8.5 10.2-7.1 25.3 3.1 33.8s25.3 7.1 33.8-3.1l64.6-77.6c13-15.6 20.3-35.1 20.9-55.3c0-.8 0-1.6 0-2.5z"></path></svg>`
const numberSortSVGUp = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-down-1-9" class="svg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M456 56c0-7.7-3.7-15-10-19.5s-14.3-5.7-21.6-3.3l-48 16C363.8 53.4 357 67 361.2 79.6S379 99 391.6 94.8L408 89.3V128v48H384c-13.3 0-24 10.7-24 24s10.7 24 24 24h48 48c13.3 0 24-10.7 24-24s-10.7-24-24-24H456V128 56zM143 473c9.4 9.4 24.6 9.4 33.9 0l96-96c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55V56c0-13.3-10.7-24-24-24s-24 10.7-24 24V398.1L81 343c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l96 96zm281-89a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-17.9 46.2l-8.7 10.6c-8.4 10.3-6.9 25.4 3.4 33.8s25.4 6.9 33.8-3.4l56.8-69.4C504.7 385.5 512 365.1 512 344c0-48.6-39.4-88-88-88s-88 39.4-88 88c0 42.5 30.1 77.9 70.1 86.2z"></path></svg>`


timeToCompleteButton.addEventListener("click", () => {
  let SVG;

  // Flip the sort direction FIRST
  if (timeToCompleteSortDirection === "question time low to high") {
    timeToCompleteSortDirection = "question time high to low";
    SVG = numberSortSVGDown;
  } else {
    timeToCompleteSortDirection = "question time low to high";
    SVG = numberSortSVGUp;
  }

  // Now use the UPDATED sortSetting
  sortSetting = timeToCompleteSortDirection;

  search()

  selectSort(timeToCompleteButton, "Time to Complete", SVG);
})

sortQuestionIDButton.addEventListener("click", () => {
  let SVG;

  // Flip the sort direction FIRST
  if (questionIDSortDirection === "question ID low to high") {
    questionIDSortDirection = "question ID high to low";
    SVG = numberSortSVGDown;
  } else {
    questionIDSortDirection = "question ID low to high";
    SVG = numberSortSVGUp;
  }

  // Now use the UPDATED sortSetting
  sortSetting = questionIDSortDirection;

  search()

  selectSort(sortQuestionIDButton, "Question ID", SVG);
});


sortQuestionDifficulty.addEventListener("click", () => {
  let SVG;

  if (questionDifficultySortDirection === "question difficulty easy to hard") {
    questionDifficultySortDirection = "question difficulty hard to easy";
    SVG = sortSVGUp;
  } else {
    questionDifficultySortDirection = "question difficulty easy to hard";
    SVG = sortSVGDown;
  }

  sortSetting = questionDifficultySortDirection;

  search()

  selectSort(sortQuestionDifficulty, "Difficulty", SVG)
})

sortQuestionDate.addEventListener("click", () => {
  let SVG;

  if (questionDateSortDirection === "question date submitted recent") {
    questionDateSortDirection = "question date submitted least recent";
    SVG = sortSVGDown;
  } else {
    questionDateSortDirection = "question date submitted recent";
    SVG = sortSVGUp;
  }

  sortSetting = questionDateSortDirection;

  search()
  
  selectSort(sortQuestionDate, "Date Submitted", SVG)
})

function selectSort(button, buttonText, SVG){
  timeToCompleteButton.classList.remove("selected");
  timeToCompleteButton.innerHTML = "Time to Complete"
  sortQuestionIDButton.classList.remove("selected");
  sortQuestionIDButton.innerHTML = "Question ID"
  sortQuestionDifficulty.classList.remove("selected");
  sortQuestionDifficulty.innerHTML = "Difficulty"
  sortQuestionDate.classList.remove("selected")
  sortQuestionDate.innerHTML = "Date Submitted"

  sortButton.innerHTML = SVG + `<p>${buttonText}</p>`

  button.classList.add("selected")
  button.innerHTML = `<p>${buttonText}</p>` + SVG
}

sortButton.addEventListener("click", (event) => {
  sortOptions.style.display = sortOptions.style.display == "flex" ? "none": "flex";
});

document.addEventListener("click", (event) => {
  if (!sortOptions.contains(event.target) && !sortButton.contains(event.target)) {
    sortOptions.style.display = "none";
  }
});

sortOptions.addEventListener("click", (event) => {
  event.stopPropagation();
});

function sortData(data, sortSetting){
  if(sortSetting == "question ID low to high"){
    data.sort((a, b) => a.problemNumber - b.problemNumber)
  }else if(sortSetting == "question ID high to low"){
    data.sort((a, b) => b.problemNumber - a.problemNumber)
  }else if(sortSetting == "question difficulty easy to hard"){
    const difficultyOrder = {
      Easy: 0,
      Medium: 1,
      Hard: 2
    };

    data.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
  }else if(sortSetting == "question difficulty hard to easy"){
    const difficultyOrder = {
      Easy: 2,
      Medium: 1,
      Hard: 0
    }

    data.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
  }else if(sortSetting == "question date submitted recent"){
    data.sort((a, b) => new Date(b.date) - new Date(a.date))
  }else if(sortSetting == "question date submitted least recent"){
    data.sort((a, b) => new Date(a.date) - new Date(b.date))
  }else if(sortSetting == "question time high to low"){
    data.sort((a, b) => b.time - a.time)
  }else if(sortSetting == "question time low to high"){
    data.sort((a, b) => a.time - b.time)
  }

  return data;
}

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchInput.addEventListener("input", (event) => {
  search()
});

function search(){
  console.log(searchInput.value)
  fetch("http://localhost:3000/api/cards")
  .then(res => res.json())
  .then(cards => {
    let data = cards.filter(a => a.name.includes(searchInput.value) || a.problemNumber.includes(searchInput.value))
    loadCards(data, sortSetting);
  })
}