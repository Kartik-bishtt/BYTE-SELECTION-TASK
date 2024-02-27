console.log("connected");

function registerUser() {
    const formData = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
    };

    console.log(formData);

    const apiUrl = "http://panel.mait.ac.in:8001/auth/register/";

    axios.post(apiUrl, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => {
            console.log("Registration successful: ", res.data);
        })
        .catch(err => {
            console.log("Error:", err.message);
    });
}   