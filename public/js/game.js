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
        const userInfo = firebase.database().ref(`users/${userKey}`);
        userInfo.on('value',snapshot =>{
        const userInfo = snapshot.val();

    renderDataAsHtml(userInfo);
            console.log(userInfo);
        })

    });
  });
};



const renderDataAsHtml = (data) => {
  let cards = ``;
  for(const submissionText in data) {
    const submission = data[submissionText];
    cards += createCard(submission, submissionText)
  };
  document.querySelector('#gameSection').innerHTML = cards;
};

const createCard = (submission, submissionText) => {
  let innerHTML = "";
  innerHTML += `<div class="column is-one-quarter">`
  innerHTML += `<div class="card">`
  innerHTML += `<header class="card-header">`
  innerHTML += `<p class="card-header-title">`
  innerHTML += `2 truths and a lie`
  innerHTML += `</p>`
  innerHTML += `</header>`
  innerHTML += `<div class="card-content">`
  innerHTML += `<div class="content">`
  innerHTML += `${submission.truth1}`
  innerHTML += `</div>`
  innerHTML += `<div class="content">`
  innerHTML += `${submission.truth2}`
  innerHTML += `</div>`
  innerHTML += `<div class="content">`
  innerHTML += `${submission.lie}`
  innerHTML += `</div>`
  innerHTML += `</div>`
  innerHTML +=  `<footer class="card-footer">`
  innerHTML +=  `<a id="${submissionText}" href="#" class="card-footer-item" onclick="editNote(this.id)">Truth</a>`
  innerHTML += `<br>`
  innerHTML +=  `<a id="${submissionText}" href="#" class="card-footer-item" onclick="deleteNote(this.id)">Lie</a>`
  innerHTML +=  `</footer>`
  innerHTML += `</div>`
  innerHTML += `</div>`

  return innerHTML;
};
