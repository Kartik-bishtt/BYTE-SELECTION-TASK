const urlParams = new URLSearchParams(window.location.search);
const accessToken = urlParams.get('token');

console.log("Your access token is:", accessToken);

async function getUserDetails() {
    try {
        const response = await axios.get("http://panel.mait.ac.in:8001/auth/user-details/", {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json"
            }
        });

        const userDetails = response.data;
        const userDetailsDiv = document.querySelector("#userDetails");
        userDetailsDiv.innerHTML = `<p>Name: ${userDetails.name}</p><p>Email: ${userDetails.email}</p>`;
    } catch (err) {
        console.log("Error fetching details: ", err);
    }
}

getUserDetails();

async function submitPoem() {
    const textareaValue = document.querySelector("#poem").value;
    const authorValue = document.querySelector("#author").value;

    console.log("Poem:", textareaValue);
    console.log("Author:", authorValue);

    const cardContainer = document.createElement("div");
    cardContainer.className = "card-container";

    const cardPoem = document.createElement("div");
    cardPoem.className = "card-body";
    cardPoem.textContent = `${textareaValue}`;

    const cardAuthor = document.createElement("div");
    cardAuthor.className = "card-body";
    cardAuthor.textContent = `By ${authorValue}`;

    cardContainer.appendChild(cardPoem);
    cardContainer.appendChild(cardAuthor);

    const poemList = document.querySelector("#poem-list");
    poemList.appendChild(cardContainer);

    try {
        const response = await axios.post("http://panel.mait.ac.in:8001/poem/create/", {
            author: authorValue,
            poem: textareaValue,
        }, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });

        console.log("Poem creation successful: ", response.data);
    } catch (err) {
        console.log("Error, data not sent:", err);
    }

    document.querySelector("#poem").value = "";
    document.querySelector("#author").value = "";
}