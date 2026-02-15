const input = document.querySelector('#destinationInput');
const btnSearch = document.querySelector('#btnSearch');
const btnClear = document.querySelector('#btnClear');
const resultDiv = document.querySelector('#result');
resultDiv.style.visibility = 'hidden';

const destinations = { 
  country: 'countries',
  countries: 'countries',
  temple: 'temples',
  temples: 'temples',
  beach: 'beaches',
  beaches: 'beaches'
};

function searchDestination() {
  resultDiv.style.visibility = 'visible';
  const inputText = input.value.toLowerCase();

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      let destination = undefined;
      if (Object.hasOwn(destinations, inputText)) {
        destination = destinations[inputText];
      } else { destination = false; }
      
      if (destination) {
        if(destination === 'countries') {
          data[destination].forEach(item => {
            for(let city of item.cities) {
              resultDiv.innerHTML += `<img src="${city.imageUrl}" alt="destination">`;
              resultDiv.innerHTML += `<h2>${city.name}</h2>`;
              resultDiv.innerHTML += `<p>${city.description}</p><br>`;
            }
          });
        } else {
            data[destination].forEach(item => {
              resultDiv.innerHTML += `<img src="${item.imageUrl}" alt="destination">`;
              resultDiv.innerHTML += `<h2>${item.name}</h2>`;
              resultDiv.innerHTML += `<p>${item.description}</p><br>`;
            });
        }
      } else {
        resultDiv.innerHTML = 'Destination not found.';
      }
    })

    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    });



}

function clearResults() {
  resultDiv.style.visibility = 'hidden';
  input.value = '';
  resultDiv.innerHTML = '';
}

btnSearch.addEventListener('click', searchDestination);
btnClear.addEventListener('click', clearResults);

