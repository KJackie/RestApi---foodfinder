
$( document ).ready(function() {

  const urlParams = new URLSearchParams(window.location.search);
  
  let zipcode  = urlParams.get('zipcode')
  const encodedParams = new URLSearchParams();
  encodedParams.append("location_id", zipcode);
  encodedParams.append("language", "en_US");
  encodedParams.append("currency", "USD");
  encodedParams.append("limit", "1000");

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'eadd077581msh2b5d8adb8de7f46p12766cjsn52e3f42e1d2e',
		  'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
    }
    // body: encodedParams
  };
  
  fetch('https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/zipcode/'+`${zipcode}` +'/0', options)
    .then(response => response.json())
    .then(response => {

      let restaurants = response.restaurants;
      const row = document.getElementById("rowArea");
      row.innerHTML= "";
      if(restaurants != null && restaurants != undefined )
      {
         let page_number = restaurants.matching_result;
         let png_cnt = page_number / 10 + 1;
         restaurants.map((element) => {
          
          const foodContainer = document.createElement("div");
          foodContainer.setAttribute("class", "col col-style");
          let restaurantName = '';
          
          restaurantName= element.restaurantName;
          
          const foodImg = element.website;
          const foodId = element.id;

          const foodDiv = `<div class="card card-style " onclick="getmealDetails('${element.website}')" style="width: 14rem;">
            <div class="card-body"><h6 class="card=text">${restaurantName} / ${element.address}</h6></div>`;
            foodContainer.innerHTML = foodDiv;
            row.appendChild(foodContainer);

          console.log(response);
        })
        
      }
      else{
        alert("There are no restaurants.");
      }
    })
    .catch(err => console.error(err));


  $(".page-link").on('click', function() {
    let pageNum = $(this).data('url');
    fetch('https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/zipcode/'+`${zipcode}` +'/'+`${pageNum}`, options)
    .then(response => response.json())
    .then(response => {

      let restaurants = response.restaurants;
      const row = document.getElementById("rowArea");
      row.innerHTML= "";
      if(restaurants != null && restaurants != undefined )
      {
         let page_number = restaurants.matching_result;
         let png_cnt = page_number / 10 + 1;
         restaurants.map((element) => {
          
          const foodContainer = document.createElement("div");
          foodContainer.setAttribute("class", "col col-style");
          let restaurantName = '';
          
          restaurantName= element.restaurantName;
          
          const foodImg = element.website;
          const foodId = element.id;

          const foodDiv = `<div class="card card-style " onclick="getmealDetails('${element.website}')" style="width: 14rem;">
            <div class="card-body"><h6 class="card=text"><span color="black">Name<span>: ${restaurantName} / <span color="white">Address<span>: ${element.address}</h6></div>`;
            foodContainer.innerHTML = foodDiv;
            row.appendChild(foodContainer);

          console.log(response);
        })
        
      }
      else{
        alert("There are no restaurants.");
      }
    })
    .catch(err => console.error(err));
  });
});

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

// const getSearchValue = () => {
//   // const searchValue = document.getElementById("search_input").value;
//   // if (!searchValue) {
//   //   document.getElementById("rowArea").innerHTML =
//   //     "<h1>Please type your food name!</h1>";
//   // } 
//   // else 
//   {
//     // document.getElementById("rowArea").innerHTML = "";
    
//     fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=american`)
//     .then((res) => res.json())
//     .then((data) => {
//       const food = data.meals;
//       food.map((element) => {
//         const row = document.getElementById("rowArea");
//         const foodContainer = document.createElement("div");
//         foodContainer.setAttribute("class", "col col-style");
//         const foodName = element.strMeal;
//         const foodImg = element.strMealThumb;
//         const foodId = element.idMeal;

//         const foodDiv = `<div class="card card-style " onclick="getmealDetails(${element.website})" style="width: 14rem;"><img class="card-img-top" src="${element.address}" alt="Card Food Image">
//           <div class="card-body"><h6 class="card=text">${foodName}</h6></div>`;
//           foodContainer.innerHTML = foodDiv;
//           row.appendChild(foodContainer);
//       });
//     })
//     .catch((error) => {
//       document.getElementById("rowArea").innerHTML="<h1>Wrrong! please try again.</h1>";
//     });
//   }
// };


const getmealDetails = (id) => {
  location.href = id;
  // fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     const meal = data.meals;
  //     meal.map((element) => {
  //       const foodImg = element.strMealThumb;
  //       const foodDetailsContainer = document.createElement("div");
  //       const foodDetailsDiv = `<div class="card p-4 w-75 shadow-lg rounded-3" > <img src="${foodImg}" alt="Food Card image>
  //           <div class="card-body"">
  //           <h4 class="card-title">${element.strMeal}</h4>
  //           <h5>Ingredient</h5>
  //           <h6 class="card-text"> > ${element.strIngredient1}</h6> <h6 class="card-text"> > ${element.strIngredient2}</h6>
  //           <h6 class="card-text"> > ${element.strIngredient3}</h6> <h6 class="card-text"> > ${element.strIngredient4}</h6> 
  //           <h6 class="card-text"> > ${element.strIngredient5}</h6> <h6 class="card-text"> > ${element.strIngredient6}</h6>
  //           <h6 class="card-text"> > ${element.strIngredient7}</h6> <h6 class="card-text"> > ${element.strIngredient8}</h6>
  //           <h6 class="card-text"> > ${element.strIngredient9}</h6> <h6 class="card-text"> > ${element.strIngredient10}</h6>

  //           <button class="btn btn-info"  onclick="backHome()" id="back-search"> < Back</button>
  //           </div>
  //        </div>`;
  //       foodDetailsContainer.innerHTML = foodDetailsDiv;
  //       document
  //         .getElementById("search-food")
  //         .appendChild(foodDetailsContainer);
  //       document.getElementById("all-food").style.display = "none";
  //     });
  //   });
};



const backHome = () => {
  document.getElementById("all-food").style.display = "block";
  document.getElementById("search-food").innerHTML = "";
  document.getElementById("rowArea").innerHTML = "";
  // document.getElementById("search_input").value = "";
 // getSearchValue();
};

