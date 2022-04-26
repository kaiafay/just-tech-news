function signupFormHandler(event) {
    event.preventDefault();

    // save values in respective variables
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // conditional statement makes sure all fields have values before making the POST request
    if(username && email && password) {
        fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {console.log(response)});
    }

};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);