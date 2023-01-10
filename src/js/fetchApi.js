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
// www.thecocktaildb.com / api / json / v1 / 1 / random.php;
// export async function fetchApi(type, identificator, inputValue) {
//   try {
//     const response = await axios.get(
//       `https://www.thecocktaildb.com/api/json/v1/1/${type}.php?${identificator}${inputValue}`
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function fetchApi(type, identificator, drink) {
//   return fetch(
//     `https://www.thecocktaildb.com/api/json/v1/1/${type}.php?${identificator}${drink}`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }
// import axios from 'axios';

export async function fetchApi(type, identificator, inputValue) {
  try {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
