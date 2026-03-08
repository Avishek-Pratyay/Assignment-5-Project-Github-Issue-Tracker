async function openModal(id){

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
)

const data = await res.json()
const issue = data.data

// STATUS BADGE

const statusBadge = document.getElementById("modalStatusBadge")
const openedBy = document.getElementById("modalOpenedBy")

if(issue.status.toLowerCase() === "open"){

statusBadge.innerText = "Opened"

statusBadge.className =
"px-2 py-1 text-xs rounded-full border border-green-300 bg-green-100 text-green-700"

openedBy.innerText = "opened by " + issue.author

}
else{

statusBadge.innerText = "Closed"

statusBadge.className =
"px-2 py-1 text-xs rounded-full border border-purple-300 bg-purple-100 text-purple-700"

openedBy.innerText = "closed by " + issue.author

}

// DATE

document.getElementById("modalDate").innerText =
new Date(issue.createdAt).toLocaleDateString()

// DESCRIPTION

document.getElementById("modalDesc").innerText = issue.description

// ASSIGNEE

document.getElementById("modalAssignee").innerText =
issue.assignee ? issue.assignee : issue.author

// PRIORITY

const priority = document.getElementById("modalPriority")

priority.innerText = issue.priority

if(issue.priority === "HIGH"){

priority.className =
"px-2 py-1 rounded-full text-xs border border-red-300 bg-red-100 text-red-600"

}
else if(issue.priority === "MEDIUM"){

priority.className =
"px-2 py-1 rounded-full text-xs border border-yellow-300 bg-yellow-100 text-yellow-700"

}
else{

priority.className =
"px-2 py-1 rounded-full text-xs border border-gray-300 bg-gray-100 text-gray-600"

}

// SHOW MODAL

const modal = document.getElementById("issueModal")

modal.classList.remove("hidden")
modal.classList.add("flex")

}

function closeModal(){

const modal = document.getElementById("issueModal")

modal.classList.add("hidden")
modal.classList.remove("flex")

}
