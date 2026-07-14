

const api="https://phi-lab-server.vercel.app/api/v1/lab/issues";

const issueContainer=document.getElementById("issueContainer");


async function loadIssues(){
      const res=await fetch(api);
      const data=await res.json();
      console.log(data.data);
    }


function displayIssues(issues){
    issueContainer.innerHTML="";
    issues.forEach(issue=>{

        const card =document.createElement("div");
        card.className=`bg-white rounded-lg border-t-4 p-4`

    })
}
    loadIssues();

    