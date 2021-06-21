console.log("hi! this is our notes website");
shownote();
impnotes();
document.querySelector("#addBtn").addEventListener("click", addnotes);
function addnotes(e) {
    let addtext = document.querySelector("#addtext");
    let addtitle = document.querySelector("#addtitle");
    let notes1 = localStorage.getItem("notes");
    if (notes1 == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes1);
    }

    let myobj={
        text: addtext.value,
        title: addtitle.value
    }
    notesobj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesobj));

    addtext.value = "";
    addtitle.value="";

    shownote();
    impnotes();
}

function shownote() {
    let notes1 = localStorage.getItem("notes");
    if (notes1 == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes1);
    }

    let html="";

    notesobj.forEach(function(element, index) {
         html =html+ `
                <div class="note-card my-2 mx-2 card" id="${index+5}" style="width: 18rem; border:3px solid black; ">
                 <div class="card-body">
                 <h5 class="card-title" style="margin-x:10px;">${element.title}  <span id="span" onclick="impnotes(${index+5})"style="font-size:13px; margin-x:8px;">mark As Important <input type="checkbox" id="checked"></span></h5>
                
                   <p class="card-text">${element.text}</p>
          <a id=${index} onclick=deletenote(${index}) class="btn btn-primary">delete note</a>
        </div>
      </div>`;
    });

    let notesk = document.querySelector("#notes");
    if (notesobj.length!= 0) {
        
        notesk.innerHTML = html;
    }
    else{
        notesk.innerHTML="THERE IS NOTHING TO SHOW YOU SO, PLEASE ADD SOME NOTES TO WRITE OUTSIDE..."
    }


    
}

// document.querySelector("#btndel").addEventListener("click",deletenote);
function deletenote(index)
{
    let notes=localStorage.getItem("notes");
    if(notes==null)
    {
        notesobj=[];
    }
    else{
        notesobj=JSON.parse(notes);
    }
    notesobj.splice(index,1);

    localStorage.setItem("notes",JSON.stringify(notesobj));
    shownote();
}

document.querySelector("#searchon").addEventListener("input",searchnote);
function searchnote(e)
{
    let searchval=document.querySelector("#searchon");
    let txt=searchval.value;
    
    let notecards =document.querySelectorAll(".note-card");
Array.from(notecards).forEach(function(element){
    let cardText =element.querySelector(".card-text").innerText;
    
    if(cardText.includes(txt))
    {
        element.style.display="block";
    }
    else{
        element.style.display="none";
    }

})

}

function impnotes(index)
{
    
    let checkbox=document.querySelectorAll("#checked");
    Array.from(checkbox).forEach((element,index)=>{
    
        element.addEventListener("change",function(){
    
            if(this.checked)
            {
                document.getElementById(`${index+5}`).style="background-color:pink; width:18rem";
                console.log("checkbox is checked")
            }
            else
            {
                document.getElementById(`${index+5}`).style="border:3px solid black; width:18rem";
                console.log("checkbox is not check");
            }
        })
    
    })
}

   



