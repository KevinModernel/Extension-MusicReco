import axios from "axios";
const api = "http://100.25.26.253:3000/";

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
		loading.style.display = "none";

		let link = document.createElement("a");
		link.href = response;
		link.innerHTML = "-" + "Playlist created";
		resultDiv.appendChild(link);
	} catch (error) {
		loading.style.display = "none";
		resultDiv.style.display = "none";
		errors.textContent  = "There´s been an error. Try again!";
	}
}

const handleSubmit = async (event) => {
	event.preventDefault();
	getPlaylist(userInput.value);
}

form.addEventListener("submit", event => handleSubmit(event));