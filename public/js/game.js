//get user key
    //get submission  (so the 2 truth a lie)
        //get user 2 truth and a lie    
            //display user 2 truths and a lie
                //randomize location of the two truths and lie

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user.uid;
      console.log(googleUser)
      getSubmission(googleUser);

    } else {
    // If not logged in, navigate back to login page.
      window.location = 'index.html'; 
    // console.log("not signed in");

    };
  });
};

const getSubmission = () => {
    console.log("getting submissions")
  const userRef = firebase.database().ref(`users`);
  userRef.on('value', (data) => {
    const userData = data.val();
    // renderDataAsHtml(data);
    var userKeys = Object.keys(userData)
    console.log(userKeys);
    
    
        

    userKeys.forEach((userKey)=>{
        if(userKey != googleUser){
/*            
        // const userInfo = firebase.database().ref(`users/${userKey}`);
        // userInfo.on('value',snapshot =>{
        const userInfo = snapshot.val();
            console.log("1")
            renderDataAsHtml(userInfo);
            console.log(userInfo);
        // })
        */

        const userInfo = userData[userKey];
        console.log(userInfo);
        renderDataAsHtml(userInfo);
      }
    });

  });
};



const renderDataAsHtml = (data) => {
  let cards = ``;
  for(const submissionKey in data) {
      if(submissionKey != googleUser){
      console.log(submissionKey)
    const submissionText = data[submissionKey];
    cards += createCard(submissionText, submissionKey)
  };
  }
  document.querySelector('#gameSection').innerHTML = cards;
};

  let innerHTML = "";

const createCard = (submissionText, submissionKey) => {
  innerHTML += `<div class="column is-one-quarter">`
  innerHTML += `<div class="card">`
  innerHTML += `<header class="card-header">`
  innerHTML += `<p class="card-header-title">`
  innerHTML += `2 truths and a lie`
  innerHTML += `</p>`
  innerHTML += `</header>`
  innerHTML += `<div class="card-content">`
  innerHTML += `<div class="content">`
  innerHTML += `${submissionText.truth1}`
  innerHTML += `</div>`
  innerHTML += `<div class="content">`
  innerHTML += `${submissionText.truth2}`
  innerHTML += `</div>`
  innerHTML += `<div class="content">`
  innerHTML += `${submissionText.lie}`
  innerHTML += `</div>`
  innerHTML += `</div>`
  innerHTML +=  `<footer class="card-footer">`
//   innerHTML +=  `<a id="${submissionKey}" href="#" class="card-footer-item" onclick="editNote(this.id)">Truth</a>`
  innerHTML += `<br>`
//   innerHTML +=  `<a id="${submissionKey}" href="#" class="card-footer-item" onclick="deleteNote(this.id)">Lie</a>`
  innerHTML +=  `</footer>`
  innerHTML += `</div>`
  innerHTML += `</div>`

  return innerHTML;
};
