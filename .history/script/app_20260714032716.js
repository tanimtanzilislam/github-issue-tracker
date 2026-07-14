

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
        ${issue.title};
        </h2>

        <p class="text-gray-500 text-sm mt-2">
          ${issue.description.slice(0,70)}...
        </p>



        <div class="mt-3 flex gap-2">

        <span class="bagde badge-error">
              ${issue.label}
        </span>

        <span class="badge badge-warning">
         ${issue.category}
        </span>

        </div>


        <div class="mt-5 text-sm text-gray-500">
        By ${issue.author}
        </div>

        <div class="text-xs text-gray-400">

        ${issue.createdAt};

        </div>
        `

        card.onclick=()=>showIssue(issue.id);
        issueContainer.append(card);

})

// ==================Modal====================


async function showIssue(id){
    const res= await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data=await res.json();
    const issue=data.data;
    const model=document.createElement("dialog");
    modal.className="modal";
    modal.innerHTML=`
    
    <form method="dialog" class="modal-box">
    <h3 class="font-bold text-xl">
    ${issue.title}
    </h3>
    
    <p class="py-3">
     ${issue.description}
    </p>
    <p>
    <b> Status:</b>

    ${issue.status};
    
     </p>
     
     
     <p>
     <b> Priority:</b>

    ${issue.priority};
     </p>
     <p>
     <b> Author:</b>

    ${issue.author};
     </p>


     <p>
     <b> Created:</b>

    ${issue.createdAt};
     </p>
     

     <div class="mode-action">
     <butto class="btn">
       close
       </button>
       </div>
       </form>    
     `;
     document.body.appendChild(modal);
     modal.showModal();
   

}


function updateCount(issues){
    document.getElementById('issueCounr')=`${issues.length} issues`
}

//================filter=================
allBtn.onclick=()=>{

    displayIssues(allIssues);
    updateCount(allIssues);
    setActive(allBtn);

}


openBtn.onclick=()=>{
    const open = allIssues.filter(i=>i.status=="open");
    displayIssues(open);
    updateCount(open);
    setActive(open);
}

closedBtn.onclick=()=>{
    const close= allIssues.filter(i=>i.status=="closed");
    displayIssues(close);
    updateCount(close);
    setActive(closedBtn);
}


//=============ACTIVE Function=============

function setActive(btn){

    [allBtn,openBtn,closedBtn,closedBtn].forEach(b=>{
        b.classList.remove('btn-primary');
    });

    btn.classList.add('btn-primary');


}


//=============searchInput==============

searchInput.addEventListener("keyup",()=>{
    const value= searchInput.value.toLowerCase();
    const result=allissues.filer(issue=>issue.title.toLowerCase().includes(value));

    displayIssues(result);
    updateCount(result);
})

    loadIssues();

    //app.js