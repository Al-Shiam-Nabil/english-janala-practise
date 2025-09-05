// fetch api
const getLessonApi = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

// remove all active class
const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  lessonBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
};

// loading spinner function

const loadingSpinner = (status, id) => {
  if (status) {
    document.getElementById("loading-spinner").classList.remove("hidden");
    document.getElementById(id).classList.add("hidden");
  } else {
    document.getElementById("loading-spinner").classList.add("hidden");
    document.getElementById(id).classList.remove("hidden");
  }
};

// load word
const loadWord = (id) => {
  loadingSpinner(true, "word-container");
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // get lesson btn id
      const lessonBtnId = document.getElementById(`lesson-btn-${id}`);
      removeActive();
      lessonBtnId.classList.add("active");
      displayWord(data.data);
    });
};

// load word details
const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

//synonyms function
const showSynonyms = (words) => {
  const badge = words.map((word) => {
    const htmlElement = `<div class="badge badge-soft badge-success py-4 px-3 mr-2 text-gray-700">${
      word ? word : "--"
    }  </div>`;
    return htmlElement;
  });

  return badge.join(" ");
};

// <div class="badge badge-soft badge-success py-4 px-3 mr-2 text-gray-700">${data.synonyms}</div>

// display word details
const displayWordDetails = (data) => {
  const detailsModal = document.getElementById("details_modal");
  const detailsBox = document.getElementById("details-box");

  detailsBox.innerHTML = `
<h3 class="text-2xl font-bold">${
    data.word ? data.word : "--"
  }  (<i class="fa-solid fa-microphone-lines"></i> : ${
    data.pronunciation ? data.pronunciation : "--"
  } )</h3>
<div class="">
  <p class="font-medium">Meaning</p>
<h3 class="font-bangla text-lg font-semibold">${
    data.meaning ? data.meaning : "--"
  } </h3>
</div>
<div class="">
  <p class="font-medium">Example</p>
<p class="text-gray-600">${data.sentence ? data.sentence : "--"} </p>
</div>

<div class="space-y-1">
  <h3 class="font-medium font-bangla">সমার্থক শব্দ গুলো</h3>
  <div class="">
 
${showSynonyms(data.synonyms)}
 
  </div>
</div>

    <div class="modal-action w-full flex justify-start">
      <form method="dialog" class="">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary ">Complete Learning</button>
      </form>
    </div>
`;
  detailsModal.showModal();
};

// display word
const displayWord = (words) => {
  // get word container
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
       <div class="col-span-full space-y-3">
       <img class="mx-auto" src="./assets/alert-error.png" alt="error image">
            <p class="text-gray-500 text-lg font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h3 class="font-bold text-3xl font-bangla">নেক্সট Lesson এ যান</h3>
           </div>
    `;
    loadingSpinner(false, "word-container");
    return;
  }
  words.forEach((word) => {
    // create new div
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `

<div class="bg-white p-8 rounded-xl shadow-sm space-y-4">
  <h3 class="font-bold text-lg">${
    word.word
      ? word.word
      : `শব্দ পাওয়া যায়নি
`
  }</h3>
  <p>Meaning /Pronounciation</p>
  <h3 class="text-gray-600 font-bangla font-medium">"${
    word.meaning
      ? word.meaning
      : `অর্থ পাওয়া যায়নি
`
  } / ${
      word.pronunciation
        ? word.pronunciation
        : `পাওয়া যায়নি
`
    }"</h3>
  <div class="flex justify-between w-full">
    <button  onclick="loadWordDetails(${
      word.id
    })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>
  </div>
</div>

`;

    wordContainer.append(cardDiv);
  });
  loadingSpinner(false, "word-container");
};

// display data from fetch
const displayLesson = (lesson) => {
  //    get lesson container
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";
  // get all data for loop
  for (const e of lesson) {
    // console.log(e.level_no)
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <button id="lesson-btn-${e.level_no}" onclick=loadWord(${e.level_no}) class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson-${e.level_no}</button>
    
    `;
    // append new button into container
    lessonContainer.appendChild(newDiv);
  }
};

getLessonApi();
