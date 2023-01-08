import { fetchApi } from "./js/fetchApi";
import Notiflix from "notiflix";


let inputValue = '';
let identificator = '';
let type = '';

async function getDrink() {
	const data = await fetchApi(type, identificator, inputValue);
	console.log(data);
}

getDrink();