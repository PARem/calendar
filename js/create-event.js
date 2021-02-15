
showCheckboxes();
/*******************************Close select with checkbox********************************/
//function close select with checkboxes when clicking outside the field
const toggleSelector = function(e) {
  let checkboxes = document.getElementById('checkboxes');
  if(checkboxes.style.display === "block"
    && !(e.target.className === 'form-check')
    && !(e.target.className === 'form-check-input')
    && !(e.target.className === 'form-check-label')) {
    checkboxes.style.display = "none";
    expanded = false;
  }
};
document.body.addEventListener('click', toggleSelector, true);
/******************************Create event**********************************************/
//function checks the date for uniqueness
const checkTimeAndDayEvent = (checkDate) => {
  let userMeetings = addUserMeetings();
  let dateSet = new Set();
  for(let person in userMeetings) {
    for(let date in userMeetings[person]) {
      dateSet.add(date);
    }
  }
  return !dateSet.has(checkDate);
};
// show error message
const showErrorMessage = () => {
  let span = document.querySelector('.error-message span');
  let div = document.querySelector('.error-message');
  let messages = errorMessage.join(' ');

  div.classList.remove('visually-hidden');
  span.innerHTML = messages;
};
// validation form( title meeting and person)
const validationForm = (meetingName, checkedPersons) => {
  errorMessage = [];
  let countChecked = 0;
  let inputName = document.querySelector('.form-group input[type=text]');
  let inputParticipants = document.querySelector('.overSelect');

  checkedPersons.forEach((person) => {
    if(person.checked) {
      countChecked++;
    }
  });
  if(meetingName === '') {
    errorMessage.push('Fill in the name of event field. ');
    inputName.classList.add('invalid');
  }
  if(countChecked === 0) {
    errorMessage.push('Checked person(s).');
    inputParticipants.classList.add('invalid');
  }
 return (errorMessage.length === 0)
};
// function create meeting
const createMeeting = function() {
  //get data from form fields
  let meetingName = document.querySelector('.form-group input[type=text]').value;
  let checkedPersons = document.querySelectorAll('.form-group input[type=checkbox]');
  let day = document.querySelector('#form-day').value;
  let time = document.querySelector('#form-time').value;
  // get user meetings from localStorage;
  let userMeetings = addUserMeetings();

  //check data from form fields
  if(!validationForm(meetingName, checkedPersons)) {
    showErrorMessage();
    return false;
  }
  //create event object
  let date = `${day} ${time}`;
  if(!checkTimeAndDayEvent(date)) {
    errorMessage.push('Change time or day!!!');
    showErrorMessage();
    return false;
  }
  checkedPersons.forEach((person) => {
    if(person.checked) {
      userMeetings[person.value][date] = meetingName;
      // write the object to localStorage
      setUserMeetings(userMeetings);
      //relocation to calendar page
      window.location.pathname = IndexPath;
    }
  });
};
// function create event when press button "Create"
const createEvent = function() {
  //get button Create
  const buttonCreate = document.querySelector('#button-create');

  buttonCreate.addEventListener('click', createMeeting);
};
createEvent();