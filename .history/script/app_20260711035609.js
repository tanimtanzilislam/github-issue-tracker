

const api="https://phi-lab-server.vercel.app/api/v1/lab/issues";

const issueContainer=document.getElementById("issueContainer");


async function loadIssues(){
      const res=await fetch(api);
      const data=await res.json();
    displayIssues(data.data);
    }


function displayIssues(issues){
    issueContainer.innerHTML="";
    issues.forEach(issue=>{

        const card =document.createElement("div");
        card.className=`bg-white rounded-lg border-t-4 p-4 ${
            issue.status==="open"?"border-green-500":"border-purple-400"
        }`
        

    })

    card.innerHTML=`
    <div class="flex justify-between">
    <span class="badge badge-outline">
      #${issue.id}
    </span>
    <span class="badge ${issue.priority=="HIGH"? "badge-error":
        issue.priority=="MEDIUM" ?"badge-warning":"badge-neutral"
    }">

    ${issue.priority}
    </span>
    </div>


    <h2 class="font-bold mt-3">
        ${issue.title}
        </h2>

        `

}
    loadIssues();

    