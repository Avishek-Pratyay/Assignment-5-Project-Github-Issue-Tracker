const API_ALL = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

let issues = []
let currentTab = "all"

window.onload = () =>{
loadIssues()
}

async function loadIssues(){

document.getElementById("loading").classList.remove("hidden")

const res = await fetch(API_ALL)
const data = await res.json()

issues = data.data

document.getElementById("loading").classList.add("hidden")

displayIssues()

}

function displayIssues(){

const container = document.getElementById("issuesContainer")
container.innerHTML = ""

let filtered = issues

if(currentTab === "open"){
filtered = issues.filter(i=>i.status==="open")
}

if(currentTab === "closed"){
filtered = issues.filter(i=>i.status==="closed")
}

document.getElementById("issueCount").innerText =
filtered.length + " Issues"

filtered.forEach(issue=>{

const border =
issue.status === "open"
? "border-open"
: "border-closed"

container.innerHTML +=

`

<div class="issue-card ${border}" onclick="openModal(${issue.id})">

<h3 class="font-semibold mb-2">${issue.title}</h3>

<p class="text-sm text-gray-600 mb-2">
${issue.description.substring(0,60)}...
</p>

<p class="text-xs">Author: ${issue.author}</p>
<p class="text-xs">Priority: ${issue.priority}</p>

</div>
`

})

}

function changeTab(tab){

currentTab = tab

document.querySelectorAll(".tab").forEach(t=>{
t.classList.remove("active")
})

if(tab==="all") document.getElementById("tabAll").classList.add("active")
if(tab==="open") document.getElementById("tabOpen").classList.add("active")
if(tab==="closed") document.getElementById("tabClosed").classList.add("active")

displayIssues()

}

async function searchIssues(){

const text = document.getElementById("searchInput").value

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
)

const data = await res.json()

issues = data.data

currentTab = "all"

displayIssues()

}
