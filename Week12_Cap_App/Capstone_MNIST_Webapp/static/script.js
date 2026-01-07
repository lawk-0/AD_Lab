function predictDigit() {
    const fileInput = document.getElementById("imageInput");
    const result = document.getElementById("result");

    if (fileInput.files.length === 0) {
        result.innerText = "Please select an image first.";
        return;
    }

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);

    fetch("/predict", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.prediction !== undefined) {
            result.innerText = "Predicted Digit: " + data.prediction;
        } else {
            result.innerText = "Error in prediction.";
        }
    })
    .catch(error => {
        console.error(error);
        result.innerText = "Error connecting to server.";
    });
}
