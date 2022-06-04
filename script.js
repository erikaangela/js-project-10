/* Available data in TheMealDB API: id, meal name, drink alternate, category, type of cuisine, instructions, thumb img, tags, youtube, ingredient 1 - measure 1, source, img source, date modified*/

// localStorage.clear();

// (The main takeaway to note here is: you should not define a function within another function.)


function renderRecipe() {

  axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => {
        let currentRecipe = response.data.meals[0];
        localStorage.setItem("currentRecipe", JSON.stringify(currentRecipe));

        setTitle(currentRecipe);
        setPicture(currentRecipe);
        setDetails(currentRecipe);
        setInstructions(currentRecipe);
        setVideoLink(currentRecipe);
        setIngredientList(currentRecipe);
        setTags(currentRecipe);
        setSourceLink(currentRecipe);
        // console.log(localStorage);

      })
      .catch(error => console.log(error))
}

renderRecipe();


function setTitle(currentRecipe) {
  document.getElementById("title").innerText = currentRecipe.strMeal;
}


function setPicture(currentRecipe) {
  let picture = document.getElementById("picture");
  picture.src = currentRecipe.strMealThumb;
  picture.alt = currentRecipe.strMeal;
  document.getElementById("caption").innerText = currentRecipe.strMeal;
  picture.style.height = "250px";
  picture.style.width = "300px";
}


function setDetails(currentRecipe) {
  document.getElementById("category").innerText = currentRecipe.strCategory;
  document.getElementById("type").innerText = currentRecipe.strArea;
}


function setInstructions(currentRecipe) {
  document.getElementById("instructions").innerText = currentRecipe.strInstructions;
}


function setVideoLink(currentRecipe) {
  document.getElementById("link").href = currentRecipe.strYoutube;
}


function setIngredientList(currentRecipe) {
  let arrayOfIngredients = [];

  for(let i = 0; i < 21; i++) {
    const individualIngredients = currentRecipe["strIngredient" + i];
    const individualMeasures = currentRecipe["strMeasure" + i];

    if(individualIngredients) {
      arrayOfIngredients.push(individualIngredients + " &#8212; " + individualMeasures);
    };
  }

  itemsList.innerHTML = "<li>" + arrayOfIngredients.join("</li><li>"); + "</li>";
}


function setTags(currentRecipe) {
  for (let property in currentRecipe) {
    // console.log(`${property}: ${currentRecipe[property]}`);
    if (currentRecipe.strTags !== null && currentRecipe.strTags !== "") {
      document.getElementById("tags").innerText = currentRecipe.strTags.split(',').join(' | ');
    } else {
      document.getElementById("tags").innerText = "N/A";
    }
  }
}


function setSourceLink(currentRecipe) {
  document.getElementById("source").href = currentRecipe.strSource;
  document.getElementById("source").target = "_blank";
}



function resetPicture() {
  let picture = document.getElementById("picture");
  picture.src = "";
  picture.alt = "";
  document.getElementById("caption").innerText = "";
}

function resetAll() {
  document.getElementById("title").innerText = "";
  document.getElementById("category").innerText = "";
  document.getElementById("type").innerText = "";
  document.getElementById("instructions").innerText = "";
  document.getElementById("link").href = "";
  document.getElementById("tags").innerText = "";
  document.getElementById("source").href = "";
  resetPicture();
}

function getNewRecipe() {
  resetAll();

  renderRecipe();
}
