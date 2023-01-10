import axios from 'axios';


export async function fetchApi(type, identificator, inputValue) {
  try {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/${type}.php?${identificator}${inputValue}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}