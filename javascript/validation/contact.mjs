document.getElementById('contactForm').addEventListener('submit', function(event) {
    let isValid = true;

    const name = document.getElementById('name').value;
    if (name.length < 5) {
        alert("Name must be at least 5 characters long.");
        isValid = false;
    }

    const email = document.getElementById('email').value;
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("You must enter a valid email address.");
        isValid = false;
    }

    const subject = document.getElementById('subject').value;
    if (subject.length < 15) {
        alert("Subject must be at least 15 characters long.");
        isValid = false;
    }

    const message = document.getElementById('message').value;
    if (message.length < 25) {
        alert("Message content must be at least 25 characters long.");
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault(); // Stop form submission
    }
});
