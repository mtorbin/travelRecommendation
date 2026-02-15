const input = document.querySelector('#destinationInput');
const btnSearch = document.querySelector('#btnSearch');
const btnClear = document.querySelector('#btnClear');
const resultDiv = document.querySelector('#result');
const destinations = { 
  country: 'countries',
  countries: 'countries',
  temple: 'temples',
  temples: 'temples',
  beach: 'beaches',
  beaches: 'beaches'
};

function searchDestination() {
  const inputText = input.value.toLowerCase();
  // console.log(inputText);
  // resultDiv.innerHTML = inputText;


  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      let destination = undefined;
      if (Object.hasOwn(destinations, inputText)) {
        destination = destinations[inputText];
      } else { destination = false; }
      
      // const condition = data.conditions.find(item => item.name.toLowerCase() === input);

      if (destination) {
        

        // const symptoms = condition.symptoms.join(', ');
        // const prevention = condition.prevention.join(', ');
        // const treatment = condition.treatment;

        // resultDiv.innerHTML = `<h2>${data.destination[0].name}</h2>`;
        resultDiv.innerHTML = `<h2>${data}</h2>`;
        // resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

        // resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
        // resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
        // resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
      } else {
        resultDiv.innerHTML = 'Destination not found.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    });



}

btnSearch.addEventListener('click', searchDestination);

