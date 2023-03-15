// Write your helper functions here!
require('isomorphic-fetch');
// let pilot = document.getElementById("pilotName");
// let copilot = document.getElementById("copilotName");
// let fuelLevel = document.getElementById("fuelLevel");
// let cargoLevel = document.getElementById("cargoLevel");

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`

}

function validateInput(testInput) {
   //let numberInput = Number(testInput);
   if (testInput === null) {
       return "Empty";
   }
   if ( isNaN(testInput)) {
       return "Not a Number";
   }
   if (testInput === Number) {
       return "Is a Number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelLevelStatus = document.getElementById("fuelStatus");
    let cargoLevelStatus = document.getElementById("cargoStatus");
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required!");
    }else if(validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
     alert("Enter valid info for each field")
    }else{
        let launchStatus = document.getElementById("launchStatus");
        list.style.visibility = "visible";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready`;
        copilotStatus.innerHTML = `Copilot ${copilot} is ready`
        if (fuelLevel < 10000 && cargoLevel <= 10000) {
            fuelLevelStatus.innerHTML = "not enough fuel for takeoff";
            cargoLevelStatus.innerHTML = "enough mass for take off";
            launchStatus.innerHTML = "shuttle not ready for launch";
            launchStatus.style.color = "red"
        }else if (fuelLevel >= 10000 && cargoLevel > 10000) {
            fuelLevelStatus.innerHTML = "enough fuel for takeoff";
            cargoLevelStatus.innerHTML = "too mass enough mass for take off";
            launchStatus.innerHTML = "shuttle not ready for launch";
            launchStatus.style.color = "red"
        }else if (fuelLevel < 10000 && cargoLevel > 10000) {
            fuelLevelStatus.innerHTML = "not enough fuel for takeoff";
            cargoLevelStatus.innerHTML = "too mass enough mass for take off";
            launchStatus.innerHTML = "shuttle not ready for launch";
            launchStatus.style.color = "red"
        }else{
            fuelLevelStatus.innerHTML = "enough fuel for takeoff";
            cargoLevelStatus.innerHTML = "tenough mass for take off";
            launchStatus.innerHTML = "shuttle ready for launch";
            launchStatus.style.color = "blue"
        }
    }    
}


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        //response.json().then(function(json) {
           return response.json();
         });
        //});

    return planetsReturned;
}

function pickPlanet(planets) {
  let index = Math.floor(Math.random()*planets.length);
  return planets[index]   
}




module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
