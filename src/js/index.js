import '../css/styles.css';
import fetchCountries from './fetch';
import { renderListMarkup, renderInfoMarkup } from './markup';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  width: '360px',
  position: 'right-top',
  fontSize: '18px',
});

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

searchBox.addEventListener(
  'input',
  debounce(e => {
    if (!/\S/.test(e.target.value)) {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      return;
    }

    fetchCountries(e.target.value.trim()).then(r => {
      if (!r) {
        Notify.info('Oops, there is no country with that name');
        return;
      }

      if (r.length === 1) {
        countryInfo.classList.remove('hidden');
        countryList.classList.add('hidden');
        countryInfo.innerHTML = renderInfoMarkup(r);
        return;
      }

      if (r.length >= 2 && r.length <= 10) {
        countryList.classList.remove('hidden');
        countryInfo.classList.add('hidden');
        countryList.innerHTML = renderListMarkup(r);
        return;
      }

      if (r.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
    });
  }, DEBOUNCE_DELAY)
);
