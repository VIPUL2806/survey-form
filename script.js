document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('survey-form');

    // Check if the user has already voted
    const hasVoted = localStorage.getItem('hasVoted');
    if (hasVoted) {
        alert('You have already submitted your opinion.');
        window.location.href = 'result_page.html';
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const state = document.getElementById('state').value;
        const city = document.getElementById('city').value;
        const reason = document.getElementById('reason').value;
        const candidate = document.getElementById('candidate').value;

        if (state && city && reason && candidate) {
            // Update the vote count for the selected candidate
            let candidateKey = candidate.toLowerCase();
            let voteCount = localStorage.getItem(candidateKey) || 0;
            voteCount = parseInt(voteCount) + 1;
            localStorage.setItem(candidateKey, voteCount);

            // Save the survey details
            const surveys = JSON.parse(localStorage.getItem('surveys') || '[]');
            surveys.push({ state, city, reason, candidate });
            localStorage.setItem('surveys', JSON.stringify(surveys));

            // Set the flag indicating the user has voted
            localStorage.setItem('hasVoted', true);

            alert('Your opinion has been recorded!');
            form.reset(); // Reset the form after submission

            // Redirect to the bar graph page
            window.location.href = 'result_page.html';
        } else {
            alert('Please fill in all fields.');
        }
    });
});
