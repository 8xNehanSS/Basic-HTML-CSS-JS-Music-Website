function sendEmail() {

    const name = document.getElementById("Name").value;
    const email = document.getElementById("Email").value;
    const gender = document.getElementById("Gender").value;
    const dob = document.getElementById("dob").value;
    const message = document.getElementById("Message").value;
    const rating = document.querySelector('input[name="rating"]:checked').value;

    const emailContent = `
                Name: ${name}
                Email: ${email}
                Gender: ${gender}
                Date of Birth: ${dob}
                Comment: ${message}
                Rate the Website: ${rating}
            `;

    const subject = "User Feedback";
    const body = encodeURIComponent(emailContent);


    window.location.href = `mailto:nehanshashith@gmai.com?subject=${subject}&body=${body}`;
    redirectthis();

}

function redirectthis() {
    location.href = 'commentpagex.html';
}

function redirectMainPage() {
    window.location.href = 'index.html';
  }

function updateCountdown() {
    const countdownElement = document.getElementById('count');
    let countdownValue = parseInt(countdownElement.textContent);

    countdownValue--;
    countdownElement.textContent = countdownValue;

    if (countdownValue <= 0) {
      redirectMainPage();
    } else {
      setTimeout(updateCountdown, 1000);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
  })

