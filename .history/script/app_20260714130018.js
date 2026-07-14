const api = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const issueContainer = document.getElementById("issueContainer");
const issueCount = document.getElementById("issueCount");

const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");

const searchInput = document.getElementById("searchInput");

let allIssues = [];


//================ LOAD ISSUES =================

async function loadIssues() {

    const res = await fetch(api);
    const data = await res.json();

    allIssues = data.data;

    displayIssues(allIssues);
    updateCount(allIssues);

}


//================ DISPLAY =================

function displayIssues(issues) {

    issueContainer.innerHTML = "";

    issues.forEach(issue => {

        const card = document.createElement("div");

        card.className = `bg-white rounded-lg border-t-4 shadow p-4 cursor-pointer ${
            issue.status === "open"
                ? "border-green-500"
                : "border-purple-500"
        }`;

        card.innerHTML = `

        <div class="flex justify-between">

            <span class="badge badge-outline">
                #${issue.id}
            </span>

            <span class="badge ${
                issue.priority === "HIGH"
                    ? "badge-error"
                    : issue.priority === "MEDIUM"
                    ? "badge-warning"
                    : "badge-neutral"
            }">
                ${issue.priority}
            </span>

        </div>

        <h2 class="font-bold mt-3">
            ${issue.title}
        </h2>

        <p class="text-gray-500 text-sm mt-2">
            ${issue.description.slice(0,70)}...
        </p>

    <div class="mt-3 flex gap-2 ">
    ${
        issues.label.map(label=>`
            <span class="badge badge-warning">${label}</span>
            `).join("")}
    }
    </div>

        <div class="mt-5 text-sm text-gray-500">
            By ${issue.author}
        </div>

        <div class="text-xs text-gray-400">
            ${issue.createdAt}
        </div>

        `;

        card.onclick = () => showIssue(issue.id);

        issueContainer.appendChild(card);

    });

}


//================ MODAL =================

async function showIssue(id) {

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);

    const data = await res.json();

    const issue = data.data;

    const modal = document.createElement("dialog");

    modal.className = "modal";

    modal.innerHTML = `

<form method="dialog" class="modal-box">

<h3 class="font-bold text-xl">
${issue.title}
</h3>

<p class="py-3">
${issue.description}
</p>

<p><b>Status:</b> ${issue.status}</p>

<p><b>Priority:</b> ${issue.priority}</p>

<p><b>Label:</b> ${issue.labels}</p>

<p><b>Author:</b> ${issue.author}</p>

<p><b>Created:</b> ${issue.createdAt}</p>

<div class="modal-action">

<button class="btn">
Close
</button>

</div>

</form>

`;

    document.body.appendChild(modal);

    modal.showModal();

    modal.addEventListener("close", () => {
        modal.remove();
    });

}


//================ COUNT =================

function updateCount(issues) {

    issueCount.innerText = `${issues.length} Issues`;

}


//================ FILTER =================

allBtn.onclick = () => {

    displayIssues(allIssues);
    updateCount(allIssues);
    setActive(allBtn);

};

openBtn.onclick = () => {

    const open = allIssues.filter(i => i.status === "open");

    displayIssues(open);
    updateCount(open);
    setActive(openBtn);

};

closedBtn.onclick = () => {

    const close = allIssues.filter(i => i.status === "closed");

    displayIssues(close);
    updateCount(close);
    setActive(closedBtn);

};


//================ ACTIVE BUTTON =================

function setActive(btn) {

    [allBtn, openBtn, closedBtn].forEach(b => {

        b.classList.remove("btn-primary");

    });

    btn.classList.add("btn-primary");

}


//================ SEARCH =================

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const result = allIssues.filter(issue =>
        issue.title.toLowerCase().includes(value)
    );

    displayIssues(result);

    updateCount(result);

});


//================ START =================

loadIssues();