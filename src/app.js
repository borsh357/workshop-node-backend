'use strict';

document.querySelector(".registration-form").onsubmit = function(event) {
  event.preventDefault();
  const username = event.target.querySelector('input[name="username"]').value;
  const email = event.target.querySelector('input[name="email"]').value;
  const data = {
    username: username,
    email: email
  }

  fetch('http://localhost:3000/user-register', {
      method: 'post',
      mode: 'no-cors',
      body: JSON.stringify(data)
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });

};

window.onload = function() {
  fetch('http://localhost:3000/users')
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        response.json().then(function(data) {
          data.forEach(user => {
            document.querySelector('.user-list').innerHTML += '<p> <strong>' + user.username +
              '</strong> <span>: ' + user.email +
              '</span> </p>';
          });
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error', err);
    });
};