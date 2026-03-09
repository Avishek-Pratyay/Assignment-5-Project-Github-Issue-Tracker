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
filtered = issues.filter(i => i.status === "open")
}

if(currentTab === "closed"){
filtered = issues.filter(i => i.status === "closed")
}

document.getElementById("issueCount").innerText =
filtered.length + " Issues"

filtered.forEach(issue => {

const border =
issue.status === "open"
? "border-open"
: "border-closed"

const statusIcon =
issue.status === "open"
? "assets/Open-Status.png"
: "assets/Closed-Status.png"

const priorityColor =
issue.priority === "HIGH"
? "bg-red-100 text-red-600 border border-red-300 rounded-full px-2 py-1"
: issue.priority === "MEDIUM"
? "bg-yellow-100 text-yellow-700 border border-yellow-300 rounded-full px-2 py-1"
: "bg-gray-100 text-gray-600 border border-gray-300 rounded-full px-2 py-1"
/* -------- LABELS (DYNAMIC) -------- */

let labelsHTML = ""

if(issue.labels && issue.labels.length > 0){

issue.labels.forEach(label => {

const name = label.name ? label.name : label

let colorClass =
"px-2 py-1 rounded-full shadow-sm"

if(name.toLowerCase() === "bug"){
colorClass +=
" bg-red-100 text-red-600 border border-red-300"
}

else if(name.toLowerCase() === "help wanted"){
colorClass +=
" bg-yellow-100 text-yellow-700 border border-yellow-300"
}

else if(name.toLowerCase() === "enhancement"){
colorClass +=
" bg-green-100 text-green-700 border border-green-300"
}

else{
colorClass +=
" bg-gray-100 text-gray-700 border border-gray-300"
}

labelsHTML += `<span class="${colorClass}">
${name} </span>`

})

}

/* -------- CARD HTML -------- */

container.innerHTML += `

<div class="issue-card ${border}" onclick="openModal('${issue._id || issue.id}')">

<!-- top row -->

<div class="flex justify-between items-center mb-2">

<img src="${statusIcon}" class="w-4">

<span class="text-xs ${priorityColor}">
${issue.priority}
</span>

</div>

<!-- title -->

<h3 class="font-semibold text-sm mb-1">
${issue.title}
</h3>

<!-- description -->

<p class="text-xs text-gray-500 mb-3">
${issue.description.substring(0,80)}...
</p>

<!-- labels -->

<div class="flex gap-3 mb-3 text-xs">

${labelsHTML}

</div>

<!-- underline -->

<hr class="mb-3">

<!-- footer -->

<div class="text-xs text-gray-500">

<p># by ${issue.author}</p>
<p>${new Date(issue.createdAt).toLocaleDateString()}</p>

</div>

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
