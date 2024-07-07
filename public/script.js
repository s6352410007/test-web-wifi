async function getUserPass() {
    try {
        const userResponse = await fetch('user.json');
        const passResponse = await fetch('pass.json');

        const button = document.getElementById('getUserPassButton');
        const countdownDiv = document.getElementById('countdown');

        button.disabled = true; // Disable the button

        // Initialize countdown timer for 1 minute
        let timeLeft = 5; // 1 minute in seconds
        countdownDiv.innerText = `กรุณารอเป็นเวลา ${timeLeft} วินาที เพื่อที่จะขอครั้งต่อไป`; // Show initial countdown message

        const interval = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            countdownDiv.innerText = `กรุณารอเป็นเวลา ${minutes} นาที ${seconds} วินาที เพื่อที่จะขอครั้งต่อไป`; // Update countdown message

            if (timeLeft <= 0) {
                clearInterval(interval);
                countdownDiv.innerText = ''; // Clear the countdown message
                button.disabled = false; // Re-enable the button
            }
        }, 1000);


        if (!userResponse.ok || !passResponse.ok) {
            throw new Error('Error fetching data');
        }

        const userData = await userResponse.json();
        const passData = await passResponse.json();

        // Assuming the JSON data is an array
        const user = userData.length > 0 ? userData.shift() : 'No user';
        const pass = passData.length > 0 ? passData.shift() : 'No pass';

        document.getElementById('result').innerHTML = `User: ${user}<br> Pass: ${pass}`;

        // Save the modified JSON back to the server
        await fetch('/user.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        await fetch('/pass.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(passData)
        });


    } catch (error) {
        console.error('Error:', error);
    }
}
