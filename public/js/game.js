//get user key
    //get submission  (so the 2 truth a lie)
        //get user 2 truth and a lie    

let googleUserId;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
    } else {
    // If not logged in, navigate back to login page.
    //   window.location = 'index.html'; 
    console.log("not signed in");

    };
  });
};