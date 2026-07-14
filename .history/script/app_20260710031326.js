

const api="https://phi-lab-server.vercel.app/api/v1/lab/issues";

const issueContainer=document.getElementById("issueContainer");


async function loadIssues(){
      const res=await fetch(api);
      const data=await res.json();
      console.log(data.id);
    }


    