export { renderListMarkup, renderInfoMarkup };

function renderListMarkup(info) {
  const listMarkup = info
    .map(item => {
      return `
      <li>
      <img src="${item.flags.svg}" alt="flag of ${item.name.common}" width="30" />
      <span class="listname">${item.name.common}</span>
      </li>
      `;
    })
    .join('');

  return listMarkup;
}

function renderInfoMarkup(info) {
  const languagesList = Object.values(info[0].languages).join(', ');

  return `
  <img src="${info[0].flags.svg}" alt="flag of ${info[0].name.common}" width="50" />
  <span class="infoname">${info[0].name.common}</span>
  <p><b>Capital</b>: ${info[0].capital}</p>
  <p><b>Population</b>: ${info[0].population}</p>
  <p><b>Languages</b>: ${languagesList}</p>
  `;
}
