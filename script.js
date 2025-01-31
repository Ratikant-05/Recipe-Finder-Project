document.addEventListener('DOMContentLoaded', function (){
const entryForm = document.querySelector('form')
const searchInput = document.querySelector('#search')
const searchResults = document.querySelector('#results')
const searchIcon = document.querySelector('.searchIcon')
// const filterButtons = document.querySelectorAll('.filter-buttons button')
// const theme = document.querySelector('#theme')
const filter = document.querySelector('.filter')

entryForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  searchRecipes()
})

searchIcon.addEventListener('click',inputFocus)
function inputFocus(){
  if(searchInput.value == ''){
    alert('Please Enter Something To Get Exciting Recipes...')
  }else{
    searchRecipes()
  }
}

async function searchRecipes(){
  // e.preventDefault()
  const searchValue = searchInput.value.trim()
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
  // console.log(response.meals);
  const data = await response.json()
  // console.log(data.meals)
  console.log(data)
  function count(){
    const dataValue = data.meals
    for(let i=1;i<dataValue.length+1;i++){
      // console.log(`You can make ${i} dishes`)
      searchRecipes.innerHTML = `
      <div class="count">You can make ${i} recipes.</div>
      `  
    }
  }
  count()
  displayResults(data.meals)
  // displayRequirement(data.meals)
}


function displayResults(recipes){
  if(!searchInput.value == ''){
    let innerHTML = "";
    recipes.forEach((recipe)=>{
    
    innerHTML += `
    <div class="recipe-container">
      <div class="image-container">
      <div class="javascript">
      <i class='bx bxl-javascript'></i> <span>Made with JavaScript</span>
    </div>
        <img src="${recipe.strMealThumb}" alt="recipe.strMeal">
    </div>
    <div class="recipe-details">
      <h1>${recipe.strMeal} (${recipe.strCategory})</h1>
      <h4>Origin : ${recipe.strArea}</h4>
      <ul>
      <li>${recipe.strInstructions}</li>
      </ul>
      
      <a class="view-recipe" href="https://www.themealdb.com/meal/${recipe.idMeal}" target="_blank">Click here to view full recipe</a>
      
      <div class="watch">
      <h2>Watch on <a href="${recipe.strYoutube}" target="_blank" ><i class='bx bxl-youtube'></i></a></h2>
      </div>
      </div>
  </div>
      `
    });
    searchResults.innerHTML = innerHTML;
  }else{
    alert("Please Enter Something To Get Exciting Recipes...")
  }
}


// filter functionality
  // document.querySelector('.filter-buttons').addEventListener('click', (e) => {
  //   const id = e.target.value;
  //   const status = id.split('-').pop()
  //   // console.log(status)
  //   // console.log(id)
  //   filterButtons.forEach((item)=>{
  //     const currentId = item.value;
  //     const currentStatus = currentId
  //     if(currentStatus === status){
  //       console.log(currentStatus)
  //     }
  //   })
  // })
})
