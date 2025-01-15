document.getElementById("fitness-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const activity = document.getElementById("activity").value;

    // Show the loading indicator
    document.querySelector(".loading-indicator").style.display = "block";

    const response = await fetch("http://localhost:8080/api/fitness", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            weight: weight,
            height: height,
            activity: activity
        })
    });

    // Hide the loading indicator
    document.querySelector(".loading-indicator").style.display = "none";

    if (response.ok) {
        const data = await response.json();
        if (data && data.message) {
            // Format the response with HTML and CSS classes
            document.getElementById("results").innerHTML = `
                <div class="ai-response">
                    <h3>AI Recommendation</h3>
                    <p class="ai-message">${data.message}</p>
                </div>
            `;
        } else {
            document.getElementById("results").innerHTML = `
                <div class="error-message">
                    <h3>Error</h3>
                    <p>Unable to retrieve AI recommendation.</p>
                </div>
            `;
        }
    } else {
        document.getElementById("results").innerHTML = `
            <div class="error-message">
                <h3>Error</h3>
                <p>Internal server error.</p>
            </div>
        `;
    }
});