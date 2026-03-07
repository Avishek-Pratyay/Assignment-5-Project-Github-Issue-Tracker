const API_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";


/* LOGIN FUNCTION */

function login(){

const username = document.getElementById("username").value.trim();
const password = document.getElementById("password").value.trim();

if(username === "admin" && password === "admin123"){

localStorage.setItem("loggedIn", true);
window.location.href = "dashboard.html";

}else{

alert("Invalid Username or Password");

}

}


/* ENTER KEY LOGIN */

document.addEventListener("keypress", function(e){

if(e.key === "Enter"){
login();
}

});



/* LOAD ISSUES */

async function loadIssues(type="all"){

setActiveTab(type);

document.getElementById("spinner").style.display="block";

try{

const res = await fetch(API_URL);
const result = await res.json();

let issues = result.data;


if(type === "open"){
issues = issues.filter(issue => issue.status === "open");
}

if(type === "closed"){
issues = issues.filter(issue => issue.status === "closed");
}

displayIssues(issues);

}
catch(error){
console.log("Error loading issues:", error);
}

document.getElementById("spinner").style.display="none";

}



/* DISPLAY ISSUE CARDS */

function displayIssues(issues){

const container = document.getElementById("issuesContainer");

container.innerHTML = "";

document.getElementById("issueCount").innerText = issues.length;

issues.forEach(issue => {

const card = document.createElement("div");

card.className = "card " + issue.status;

card.innerHTML = `

<h3>${issue.title}</h3>

<p>${issue.description}</p>

<p><b>Status:</b> ${issue.status}</p>

<p><b>Category:</b> ${issue.category}</p>

<p><b>Author:</b> ${issue.author}</p>

<p><b>Priority:</b> ${issue.priority}</p>

<p><b>Label:</b> ${issue.label}</p>

<p><b>Date:</b> ${new Date(issue.createdAt).toLocaleDateString()}</p>

`;

card.addEventListener("click", () => openModal(issue));

container.appendChild(card);

});

}



/* ACTIVE TAB */

function setActiveTab(type){

document.querySelectorAll(".tabs button").forEach(btn=>{
btn.classList.remove("active");
});

if(type === "all"){
document.getElementById("allTab").classList.add("active");
}

if(type === "open"){
document.getElementById("openTab").classList.add("active");
}

if(type === "closed"){
document.getElementById("closedTab").classList.add("active");
}

}



/* MODAL OPEN */

function openModal(issue){

document.getElementById("modal").style.display = "block";

document.getElementById("modalTitle").innerText = issue.title;

document.getElementById("modalDesc").innerText = issue.description;

document.getElementById("modalAuthor").innerText = "Author: " + issue.author;

document.getElementById("modalCategory").innerText = "Category: " + issue.category;

document.getElementById("modalPriority").innerText = "Priority: " + issue.priority;

document.getElementById("modalLabel").innerText = "Label: " + issue.label;

document.getElementById("modalDate").innerText =
"Created At: " + new Date(issue.createdAt).toLocaleString();

}



/* MODAL CLOSE */

function closeModal(){
document.getElementById("modal").style.display="none";
}



/* CLOSE MODAL WHEN CLICK OUTSIDE */

window.onclick = function(event){

const modal = document.getElementById("modal");

if(event.target === modal){
modal.style.display="none";
}

}



/* SEARCH FUNCTION */

async function searchIssue(){

const text = document.getElementById("searchInput").value.trim();

if(text === ""){
loadIssues();
return;
}

const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`;

try{

const res = await fetch(url);
const data = await res.json();

displayIssues(data.data);

}
catch(error){
console.log("Search error:", error);
}

}



/* PAGE LOAD */

window.onload = () => {

if(window.location.pathname.includes("dashboard")){
loadIssues("all");
}

};