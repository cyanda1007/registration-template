
// Template
var errorMsgElementTemp = document.querySelector('.errorMessageTemp');
var RegTextHolderElementTemp = document.querySelector('.regTextHolderTemp');
var regNoplateTemp = document.querySelector('.resetButtonTemp');
var errorsElementTemp = document.querySelector('.errorsTemp');
var displayByTownButtonTemp = document.querySelector('.displayByTownTemp');

var ReggRadioTemp = document.querySelector('.reggRadioTemp');
var addregBtnTemp = document.querySelector('.regBtnTemp');
var displayButtonTemp = document.querySelector('.displayButtonTemp');
var resetButtonTemp = document.querySelector('.resetButtonTemp');

var plateRegNumsArray2 = [];

var plateRegNumsKey2 = 'PlateRegNums2';

var plateRegistrationTemplate = document.querySelector(".plateRegTemplate").innerHTML;

var templateCompiler = Handlebars.compile(plateRegistrationTemplate);

plateRegNumsArray2 = getLocalStorageObject(plateRegNumsKey2);

if(plateRegNumsArray2) {
    document.querySelector("#templateDisplay").innerHTML = templateCompiler({plate : plateRegNumsArray2})
}


addregBtnTemp.addEventListener('click', function() {

    var registrationsNumberTemp = RegTextHolderElementTemp.value;

    if (!registrationFunc.emptyStringTest(registrationsNumberTemp)) {   
        errorMsgElementTemp.innerHTML = "Please enter a number plate, required";
        errorMsgElementTemp.style.color = "red";
        errorMessageTimeoutTemp();
        return false;
    }

    registrationsNumberTemp = registrationFunc.toUpperCaseReg(registrationsNumberTemp);

    if (!registrationFunc.regexCheck(registrationsNumberTemp)) {
        errorMsgElementTemp.innerHTML = "Please insert the number plate in a correct format e.g. CA 123456 CL 123-123 CJ 123 456";
        errorMsgElementTemp.style.color = "red";
        errorMessageTimeoutTemp();
        clearField(RegTextHolderElementTemp);
        return false;
    }
    

    //Get existing array of objects in localStorage
    plateRegNumsArray2 = getLocalStorageObject(plateRegNumsKey2);
   
    
    if (plateRegNumsArray2) {
        //Filter registrationsNumber in existing array on localstorage
        //creates an array filled with all array elements that pass a test (provided as a function).    
        let existingobject = plateRegNumsArray2.filter(x => x.regNum === registrationsNumberTemp)[ZERO]
        if (existingobject) {
            errorMsgElementTemp.innerHTML = "Entered number plate already exists, please enter a different number plate";
            errorMsgElementTemp.style.color = "red";
            errorMessageTimeoutTemp();
            clearField(RegTextHolderElementTemp);
            return false;
            
        } else {
            plateRegNumsArray2.push({
                regNum: registrationsNumberTemp
            });
        }
    } else {
        plateRegNumsArray2 = [];
        plateRegNumsArray2.push({
            regNum: registrationsNumberTemp
        });
        setLocalStorageObject(plateRegNumsKey2, plateRegNumsArray2);
        errorMsgElementTemp.innerHTML = "Registration number successfuly added!";
        errorMsgElementTemp.style.color = "green";
        errorMessageTimeoutTemp();
        clearField(RegTextHolderElementTemp);
        if(plateRegNumsArray2) {
            document.querySelector("#templateDisplay").innerHTML = templateCompiler({plate : plateRegNumsArray2})
        }
        plateRegNumsArray2 = [];
        return true;
    }
    //Update NamesStored array in localstorage with new added data
    setLocalStorageObject(plateRegNumsKey2, plateRegNumsArray2);
    errorMsgElementTemp.innerHTML = "Registration number successfuly added!";
    errorMsgElementTemp.style.color = "green";
    errorMessageTimeoutTemp();
    clearField(RegTextHolderElementTemp);
    if(plateRegNumsArray2) {
        document.querySelector("#templateDisplay").innerHTML = templateCompiler({plate : plateRegNumsArray2})
    }
    plateRegNumsArray2 = [];
    return true;
    
});


displayByTownButtonTemp.addEventListener('click', function() {
    displayElementsOnFormByTownTemp()
});

displayButtonTemp.addEventListener('click', function() {
    displayElementsOnFormTemp();
    return true;
});


resetButtonTemp.addEventListener('click', function() {
    clearLocalStorage(plateRegNumsKey2);
    // errorMsgElementTemp.innerHTML = "Local Storage cleared!";
    errorMsgElementTemp.style.color = "green";
    clearField(RegTextHolderElementTemp)
    errorMessageTimeoutTemp();
    location.reload();
    return true;

});

/**
 * This is a function we use to to display the elements stored in the local storage
 */
function displayElementsOnFormTemp() {
    plateRegNumsArrayTemp = getLocalStorageObject(plateRegNumsKey2);
    if(plateRegNumsArrayTemp) {
        document.querySelector("#templateDisplay").innerHTML = templateCompiler({plate : plateRegNumsArrayTemp})
    }
}




/**
 * This is a function we use to display elements stord in the local storage by their selected radio button "town"
 */
function displayElementsOnFormByTownTemp() {
    //Tis retrieves the elements in the local storage
    plateRegNumsArrayTemp = getLocalStorageObject(plateRegNumsKey2);
    if (plateRegNumsArrayTemp) {
        var plateRegNumsArrayByTownTemp = [];
        for (var i = 0; i < plateRegNumsArrayTemp.length; i++) {
            var checkedRegistrationElem = document.querySelector("input[name='registrationRadioTemp']:checked")
            if (checkedRegistrationElem) {
                if (plateRegNumsArrayTemp[i].regNum.substr(0, 2) === checkedRegistrationElem.value) {
                    plateRegNumsArrayByTownTemp.push(plateRegNumsArrayTemp[i])
                }
            } else {
                errorMsgElementTemp.innerHTML = "Please first select the town you want to filter on";
                errorMsgElementTemp.style.color = "red";
                errorMessageTimeout();
                return;
            }
        }
        if(plateRegNumsArrayByTownTemp.length > 0) {
            document.querySelector("#templateDisplay").innerHTML = templateCompiler({plate : plateRegNumsArrayByTownTemp})
        } else{
            errorMsgElementTemp.innerHTML = "No list to dispaly!";
            errorMsgElementTemp.style.color = "orange";
            errorMessageTimeoutTemp();
            return;
        }
        
    }
}
/**
 * This removes all the diplayed elements on the form
 */
function removeDynamicallyAddedElementsTemp() {
    plateRegNumsArray = getLocalStorageObject(plateRegNumsKey);
    var divId = document.getElementById('regNumDisplay');
    if (plateRegNumsArray) {
        for (var i = 0; i < plateRegNumsArray.length; i++) {
            var childId = document.getElementById('regNumDisplay' + i);
            if (childId) {
                divId.removeChild(childId)
            }
        }
    }
}


function errorMessageTimeoutTemp() {
    setTimeout(function() {
        errorMsgElementTemp.innerHTML = "";
    }, 6000)
}