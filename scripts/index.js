// fetch api
const getLessonApi=()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all').then(res=>res.json()).then(json=>displayLesson(json.data));
}


// display data from fetch
const displayLesson=(lesson)=>{
//    get lesson container
const lessonContainer=document.getElementById('lesson-container');
lessonContainer.innerHTML='';
// get all data for loop
for(const e of lesson){
    // console.log(e.level_no)
    const newDiv=document.createElement('div');
    newDiv.innerHTML=`
    <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson-${e.level_no}</button>
    
    `
    // // append new button into container
    lessonContainer.appendChild(newDiv);
}

}
getLessonApi()