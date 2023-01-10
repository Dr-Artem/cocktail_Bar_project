import card from '../teamplates/cockteil.hbs';
import { fetchApi } from './fetchApi';

const mainSection = document.querySelector('.cocktail');

export async function getRandomDrink() {
  const data = await fetchApi('random');
  console.log(data);
  try {
    mainSection.insertAdjacentHTML('beforeend', card(data.drinks));
  } catch (err) {
    console.log(err);
  }
}
