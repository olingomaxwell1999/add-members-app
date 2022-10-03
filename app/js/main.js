import { initializeApp } from 'firebase/app'
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

let members = []

// This function will create a new member object based on the text in the input
// text that was entered in the text input, and push it into
// the `members` array
function addMember(text) {
    const member = {
      text,
      checked: false,
      id: Date.now(),
    };
  
    members.push(member);
    console.log(members);
    renderMember(member);
}

// Select the form element
const form = document.querySelector('.js-form');

// Add a submit event listener
form.addEventListener('submit', event => {
  // prevent page refresh on form submission
  event.preventDefault();
  // select the text input
  const input = document.querySelector('#input');

  // Get the value of the input and remove whitespace
  const text = input.value.trim();
  if (text !== '') {
    addMember(text);
    input.value = '';
    input.focus();
  }
});

function renderMember(member) {
    // Select the first element with a class of `js-todo-list`
    const membersList = document.querySelector('.members-list');
  
    // Use the ternary operator to check if `members.checked` is true
    // if so, assign 'done' to `isChecked`. Otherwise, assign an empty string
    const isChecked = member.checked ? 'done': '';
    // Create an `li` element and assign it to `newMember`
    const newMember = document.createElement("li");
    // Set the class attribute
    newMember.setAttribute('class', `member-item ${isChecked}`);
    // Set the data-key attribute to the id of the member
    newMember.setAttribute('data-key', member.id);
    // Set the contents of the `li` element created above
    newMember.innerHTML = `
      <input id="${member.id}" type="checkbox"/>
      <label for="${member.id}" class="tick js-tick"></label>
      <span>${member.text}</span>
    `;
  
    // Append the element to the DOM as the last child of
    // the element referenced by the `memberList` variable
    membersList.append(newMember);
}

//Dark and Light Mode Functionality

const container = document.querySelector('.container')

const lightButton = document.querySelector('#light')

const darkButton = document.querySelector('#dark')

lightButton.addEventListener('click', () => {
    container.style.backgroundColor = '#53E8F0'
})

darkButton.addEventListener('click', () => {
    container.style.backgroundColor = '#000'
})

// Connecting to firebase 
//Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyCKErUOqSdcapa4Xu9wPmFyjloCHKwVTq4",
    authDomain: "add-members-app.firebaseapp.com",
    projectId: "add-members-app",
    storageBucket: "add-members-app.appspot.com",
    messagingSenderId: "702453804263",
    appId: "1:702453804263:web:69a8528409794272f38642",
    measurementId: "G-C3B9VPRSYY",
    databaseURL:"https://add-members-app-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig)

const db = getDatabase(app);


//Creating collections
db.collection('members').getDocs()
const membersCollection = collection(db, 'members')
const snapshot = await getDocs(membersCollection)