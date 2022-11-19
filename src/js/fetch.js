export default function fetchCountries(input) {
  return fetch(
    `https://restcountries.com/v3.1/name/${input}` +
      '?fields=name,capital,population,flags,languages'
  )
    .then(r => {
      if (r.status !== 404) {
        return r.json();
      }
    })
    .catch();
}
