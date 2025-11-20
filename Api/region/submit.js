form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    const response = await fetch("/api/region/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message })
    });

    const result = await response.json();

    if (!result.ok) {
        feedback.textContent = "خطا: " + result.error;
    } else {
        feedback.textContent = "ثبت شد!";
        form.reset();
    }
});
