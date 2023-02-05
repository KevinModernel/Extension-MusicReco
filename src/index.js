import axios from "axios";
//const api = "http://100.25.26.253:3000/";
// DNS de IPv4 pública changes?
const api = "http://ec2-100-25-180-165.compute-1.amazonaws.com:3000/"

const errors = document.querySelector(".errors");
const loading = document.querySelector(".loading");
let resultDiv = document.querySelector(".result");
resultDiv.style.display = "none";
loading.style.display = "none";
errors.textContent = "";

// Grab the form.
const form = document.querySelector(".form-data");
// Grab the user input.
const userInput = document.querySelector(".userInput");

// Get playlist link.
const getPlaylist = async (userInput) => {
	loading.style.display = "block";
	errors.textContent = "";
	try {
		const response = await axios.get(`${api}${userInput}`);
		// Validates if response is a playlist link or fail message.
		if (response.data.link !== "Request failed. Try again!") {
			displayPlaylist(response.data.link);
		} else {
			displayError();
		}
	} catch (error) {
		displayError();
	}
};
// Display playlist link to user.
function displayPlaylist (playlist) {
	let link = document.createElement("a");
	link.href = playlist;
	link.innerHTML = "-" + "Playlist created";
	link.target = "_blank";
	resultDiv.appendChild(link);
	loading.style.display = "none";
	resultDiv.style.display = "block";
};
// Display error message to user.
function displayError () {
	loading.style.display = "none";
	resultDiv.style.display = "none";
	errors.textContent  = "There has been an error. Try again!";	
};

// Delete created HTML elements.
function cleanDisplay() {
    let outputDiv = document.querySelector(".result");
    outputDiv.textContent = '';
};

const handleSubmit = async (event) => {
	event.preventDefault();
	cleanDisplay();
	getPlaylist(userInput.value);
};

form.addEventListener("submit", event => handleSubmit(event));