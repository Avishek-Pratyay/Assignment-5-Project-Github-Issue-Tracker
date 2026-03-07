async function openModal(id){

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
)

const data = await res.json()

const issue = data.data

document.getElementById("modalTitle").innerText = issue.title
document.getElementById("modalDesc").innerText = issue.description
document.getElementById("modalAuthor").innerText = issue.author
document.getElementById("modalPriority").innerText = issue.priority
document.getElementById("modalLabel").innerText = issue.label
document.getElementById("modalDate").innerText = issue.createdAt

document.getElementById("issueModal").classList.remove("hidden")
document.getElementById("issueModal").classList.add("flex")

}

function closeModal(){

document.getElementById("issueModal").classList.add("hidden")

}
