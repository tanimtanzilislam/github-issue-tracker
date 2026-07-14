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

        card.className = `bg-white rounded-lg border-t-4 shadow p-4 cursor-pointer flex flex-col h-full ${
            issue.status === "open"
                ? "border-green-500"
                : "border-purple-500"
        }`;

        card.innerHTML = `

        <div class="flex justify-between items-center">

            <img
                src="${issue.status === "open"
                    ? "./assets/Open-Status.png"
                    : "./assets/Closed- Status .png"}"
                alt="${issue.status}"
            >

            <span class="px-3 py-1 rounded-full text-sm font-medium border ${
                issue.priority === "high"
                    ? "bg-red-100 text-red-600 border-red-600"
                    : issue.priority === "medium"
                    ? "bg-yellow-100 text-yellow-500 border-yellow-600"
                    : "bg-gray-100 text-gray-500 border-gray-600"
            }">
                ${issue.priority}
            </span>

        </div>

        <h2 class="font-bold mt-3">
            ${issue.title}
        </h2>

        <p class="text-gray-500 text-sm mt-2">
            ${issue.description.slice(0, 70)}...
        </p>

        <div class="mt-auto">

            <div class="mt-3 flex flex-wrap gap-2">
                ${
                    issue.labels
                        .map(label => `
                            <span class="badge badge-warning">
                                ${label}
                            </span>
                        `)
                        .join("")
                }
            </div>

            <div class="border-t border-gray-300 mt-4 pt-4">
     
<div class="flex gap-7">
            <div>
                <div class="text-sm text-gray-400">
                    #${issue.id} By ${issue.author}
                </div>

                <div class="text-sm text-gray-400">
                   Assignee:${issue.assignee===""?"Unassigned": issue.assignee}
                </div>

                </div>

                <div>

                <div class="text-xs text-gray-400 mt-1">
                    ${new Date(issue.createdAt).toLocaleDateString("en-US")}
                </div>

                <div class="text-xs text-gray-400 mt-1">
                  Updated:${new Date(issue.updatedAt).toLocaleDateString("en-US")}
                </div>

                </div>

                </div>

            </div>

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
    <form method="dialog" class="modal-box max-w-4xl rounded-2xl p-8">

        <!-- Title -->
        <h2 class="text-4xl font-bold text-slate-800">
            ${issue.title}
        </h2>

        <!-- Status -->
        <div class="flex items-center gap-3 mt-5">

            <span class="px-4 py-1 rounded-full text-white text-sm font-semibold ${
                issue.status === "open"
                    ? "bg-green-500"
                    : "bg-purple-500"
            }">
                ${issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
            </span>

            <span class="text-slate-500">
                Opened by ${issue.author}
            </span>

            <span class="text-slate-400">•</span>

            <span class="text-slate-500">
                ${new Date(issue.createdAt).toLocaleDateString("en-GB")}
            </span>

        </div>

        <!-- Labels -->
        <div class="flex flex-wrap gap-2 mt-6">
            ${
                issue.labels.map(label => `
                    <span class="badge badge-outline badge-warning">
                        ${label.toUpperCase()}
                    </span>
                `).join("")
            }
        </div>

        <!-- Description -->
        <p class="text-lg text-slate-500 mt-8 leading-8">
            ${issue.description}
        </p>

        <!-- Information Box -->
        <div class="grid grid-cols-2 gap-10 bg-slate-50 rounded-xl p-6 mt-8">

            <div>
                <p class="text-gray-500 text-lg">
                    Assignee:
                </p>

                <p class="text-2xl font-bold mt-2">
                    ${issue.assignee || "Unassigned"}
                </p>
            </div>

            <div>
                <p class="text-gray-500 text-lg">
                    Priority:
                </p>

                <span class="inline-block mt-2 px-4 py-1 rounded-full text-white text-sm font-semibold ${
                    issue.priority === "high"
                        ? "bg-red-500"
                        : issue.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                }">
                    ${issue.priority.toUpperCase()}
                </span>
            </div>

        </div>

        <!-- Close Button -->
        <div class="modal-action mt-8">

            <button class="btn bg-purple-700 hover:bg-purple-800 text-white border-0 px-8">
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