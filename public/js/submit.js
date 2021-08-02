let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

let counter = 0;
const sumbitResponse = () => {
    counter += 1;
  // 1. Capture the form data
  const truth1 = document.querySelector('#truth1');
  const truth2 = document.querySelector('#truth2');
  const lie = document.querySelector('#lie');
  // 2. Format the data and write it to the database
  firebase.database().ref(`users/${googleUser.uid}/Submission/${counter}`).push({
    truth1: truth1.value,
    truth2: truth2.value,
    lie: lie.vlaue
  })
  // 3. Clear the form so that the user can write a new submission
  .then(() => {
    truth1.value = "";
    truth2.value = "";
    lie.value = "";
  });
}