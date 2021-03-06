//get user key
    //get submission  (so the 2 truth a lie)
        //get user 2 truth and a lie    
            //display user 2 truths and a lie
                //randomize location of the two truths and lie

let googleUser;
let userData;
window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("Logged in as: " + user.displayName);
      googleUser = user.uid;
      console.log(googleUser);
      getSubmission(googleUser);
    } else {
      // If not logged in, navigate back to login page.
      window.location = "index.html";
      // console.log("not signed in");
    }
  });
};

const getSubmission = () => {
  document.querySelector("#gameSection").innerHTML = "";

  console.log("getting submissions");
  const userRef = firebase.database().ref(`users`);
  userRef.on("value", (data) => {
    const userData = data.val();
    // renderDataAsHtml(data);
    var userKeys = Object.keys(userData);
    console.log(userKeys);
    userKeys.forEach((userKey) => {
      if (userKey != googleUser) {
        const userInfo = userData[userKey];
        console.log(userInfo);
        renderDataAsHtml(userInfo);
      }
      else{
          console.log("error")
      }
    });
  });
};

const renderDataAsHtml = (data) => {
  let cards = ``;
  for (const submissionKey in data) {
    console.log(submissionKey);
    const submissionText = data[submissionKey];
    // cards += randTruthLie(submissionText, submissionKey);
    cards += createCard(submissionText, submissionKey);

  }
  document.querySelector("#gameSection").innerHTML += cards;
};

// const createCard = (submissionText, submissionKey) => {
//   let innerHTML = "";
//   innerHTML += `<div class="card-content">`;
//   innerHTML += `<div class="content">`;
//   innerHTML += `${submissionText.truth1}`;
//   innerHTML += `</div>`;
//   innerHTML +=  `<a id="${submissionText.truth1}" href="#" class="card-footer-item" onclick="correct()">Truth</a>`
//   innerHTML += `<br>`;
//   innerHTML +=  `<a id="${submissionText.lie}" href="#" class="card-footer-item" onclick="incorrect()">Lie</a>`
//   innerHTML += `<div class="content">`;
//   innerHTML += `${submissionText.truth2}`;
//   innerHTML += `</div>`;
//   innerHTML +=  `<a id="${submissionText.truth2}" href="#" class="card-footer-item" onclick="correct()">Truth</a>`
//   innerHTML += `<br>`;
//   innerHTML +=  `<a id="${submissionText.lie}" href="#" class="card-footer-item" onclick="incorrect()">Lie</a>`
//   innerHTML += `<div class="content">`;
//   innerHTML += `${submissionText.lie}`;
//   innerHTML += `</div>`;
//    innerHTML +=  `<a id="wrong" href="#" class="card-footer-item" onclick="incorrect()">Truth</a>`
//   innerHTML += `<br>`;
//   innerHTML +=  `<a id="${submissionText.lie}" href="#" class="card-footer-item" onclick="correct()">Lie</a>`

//   innerHTML += `</div>`;


// //   return innerHTML;
// };


const createCard = (submissionText, submissionKey) => {
  let innerHTML = "";
  innerHTML += `<div class="column is-one-quarter">`;
  innerHTML += `<div class="card">`;
  innerHTML += `<header class="card-header">`;
  innerHTML += `<p class="card-header-title">`;
  innerHTML += `2 truths and a lie`;
  innerHTML += `</p>`;
  innerHTML += `</header>`;
  innerHTML += `<div class="card-content">`;
  innerHTML += `<div class="content">`;
  innerHTML += `${submissionText.truth1}`;
  innerHTML += `</div>`;
  innerHTML +=  `<a id="${submissionText.truth1}" class="card-footer-item" onclick="correct()">Truth</a>`
  innerHTML += `<br>`;
  innerHTML +=  `<a id="${submissionText.lie}" class="card-footer-item" onclick="incorrect()">Lie</a>`
  innerHTML += `<div class="content">`;
  innerHTML += `${submissionText.truth2}`;
  innerHTML += `</div>`;
  innerHTML +=  `<a id="${submissionText.truth2}" class="card-footer-item" onclick="correct()">Truth</a>`
  innerHTML += `<br>`;
  innerHTML +=  `<a id="${submissionText.lie}" class="card-footer-item" onclick="incorrect()">Lie</a>`
  innerHTML += `<div class="content">`;
  innerHTML += `${submissionText.lie}`;
  innerHTML += `</div>`;
  innerHTML += `</div>`;
  innerHTML += `<footer class="card-footer">`;
  innerHTML +=  `<a id="Wrong" class="card-footer-item" onclick="incorrect()">Truth</a>`
  innerHTML += `<br>`;
  innerHTML +=  `<a id="${submissionText.lie}"  class="card-footer-item" onclick="correct()">Lie</a>`
  innerHTML += `</footer>`;
  innerHTML += `</div>`;
  innerHTML += `</div>`;

  return innerHTML;
};
let scoreCard 
let score = 0;
    const correct = () => {
        score = score + 1
        console.log(score)
       scoreCard = document.querySelector("#scoreCard").innerHTML = score;
  
        if (score == 8) {
            window.location = "win.html"
      }          
    }


    const incorrect = () => {
        console.log("Try again")
    }

var texts = {
    "truth1": "placeholder",
    "truth2": "placeholder",
    "truth3": "placeholder"

}

const shuffle = () => {
    let myArr = ['truth1', 'truth2', 'lie'];
    for (let i=0; i<myArr.length; i++){
        let rand = Math.floor(Math.random()*(2-0+1))+0;
        if(myArr[rand] === 'lie'){
            texts.truth3 = "lie";
        } else {
            texts.truth[rand] = `truth${rand}`;
        }
        myArr.splice(rand,1);
    }
    
}
