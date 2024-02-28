console.log("connected");

let accessToken = null;

function loginUser() {
    const formData = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
    };

    console.log(formData);

    const apiUrl = "http://panel.mait.ac.in:8001/auth/login/";

    axios.post(apiUrl, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => {
            accessToken = res.data.access;
            console.log("Login successful. Access Token:", accessToken);

            window.location.href = `dashboard.html?token=${accessToken}`;
        })
        .catch(err => {
            alert("User not registered");
            console.log("Error:", err.message);
        });
}