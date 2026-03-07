const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"



function login(){

const username = document.getElementById("username").value
const password = document.getElementById("password").value

if(username === "admin" && password === "admin123"){

window.location = "dashboard.html"

}else{

alert("Invalid credentials")

}

}



async function loadIssues(type="all"){

setActiveTab(type)

document.getElementById("spinner").style.display="block"

const res = await fetch(API)
const data = await res.json()

let issues = data.data


if(type==="open"){
issues = issues.filter(issue => issue.status==="open")
}

if(type==="closed"){
issues = issues.filter(issue => issue.status==="closed")
}


displayIssues(issues)

document.getElementById("spinner").style.display="none"

}



function displayIssues(issues){

const container = document.getElementById("issuesContainer")

container.innerHTML=""

document.getElementById("issueCount").innerText = issues.length

issues.forEach(issue=>{

const card=document.createElement("div")

card.className=`card ${issue.status}`

card.innerHTML=`

<h3>${issue.title}</h3>

<p>${issue.description}</p>

<p><strong>Author:</strong> ${issue.author}</p>

<p><strong>Category:</strong> ${issue.category}</p>

<p><strong>Priority:</strong> ${issue.priority}</p>

<p><strong>Label:</strong> ${issue.label}</p>

`

card.onclick=()=>openModal(issue)

container.appendChild(card)

})

}



function setActiveTab(type){

document.querySelectorAll(".tabs button").forEach(btn=>{
btn.classList.remove("active")
})

if(type==="all") document.getElementById("allTab").classList.add("active")
if(type==="open") document.getElementById("openTab").classList.add("active")
if(type==="closed") document.getElementById("closedTab").classList.add("active")

}



function openModal(issue){

document.getElementById("modal").style.display="block"

document.getElementById("modalTitle").innerText = issue.title
document.getElementById("modalDesc").innerText = issue.description
document.getElementById("modalAuthor").innerText = "Author: " + issue.author
document.getElementById("modalCategory").innerText = "Category: " + issue.category
document.getElementById("modalPriority").innerText = "Priority: " + issue.priority
document.getElementById("modalLabel").innerText = "Label: " + issue.label
document.getElementById("modalDate").innerText = "Created At: " + issue.createdAt

}



function closeModal(){

document.getElementById("modal").style.display="none"

}



async function searchIssue(){

const text = document.getElementById("searchInput").value

const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`

const res = await fetch(url)
const data = await res.json()

displayIssues(data.data)

}



window.onload=()=>{

if(window.location.pathname.includes("dashboard")){

loadIssues()

}

}