magazines = [
  "https://flipboard.com/@thenewsdesk/the-latest-on-coronavirus-covid-19-t82no8kmz.rss",
  "https://flipboard.com/@dfletcher/india-tech-b2meqpd6z.rss",
  "https://flipboard.com/@thehindu/sportstarlive-rj3ttinvz.rss",
]


// fetching rss api
// default first accordion will stay open and make api call

const makeRequest = async (indexVal)=>{

  let endPoint = "https://api.rss2json.com/v1/api.json?rss_url=";
  // getting div id value of accordion parent which will later control child
  // by default we are calling api for first given address
  try{
    let data = await fetch(endPoint+magazines[indexVal]);
    let dataJson = await data.json();
    return dataJson;
  }
   catch(err){
     console.log("Error");
   }
}


let ariaExpanded = document.querySelectorAll("data-index");

// function to create accordion skeleton
let accordionBody =  function (){

  let accordion = document.getElementById("accordionExample");

        magazines.forEach((val,index)=>{
          let div= document.createElement("div");
          div.className = "accordion-item";

          if(index==0){
            div.innerHTML = `

            <h2 class="accordion-header" id="heading${index}">
            <button class="accordion-button" id="num${index}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}" data-index=${index}>
              <p>The Latest on Coronavirus (COVID-19)</p>
            </button>
          </h2>
          <div id="collapse${index}" class="accordion-collapse collapse show" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
            <div class="accordion-body" >
                
            </div>
          </div>

         `
          }else if(index==1){
            div.innerHTML = `

            <h2 class="accordion-header" id="heading${index}">
              <button class="accordion-button" id="num${index}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}" data-index=${index}>
               <p>India Tech</p>
              </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse " aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
              <div class="accordion-body" >

              </div>
            </div>

       `}
       else if(index==2){
        div.innerHTML = `

        <h2 class="accordion-header" id="heading${index}">
          <button class="accordion-button" id="num${index}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}" data-index=${index}>
          <p>Sports</p>
          </button>
        </h2>
        <div id="collapse${index}" class="accordion-collapse collapse " aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
          <div class="accordion-body" >

          </div>
        </div>

   `
          }

          accordion.append(div)
        })

}
accordionBody()


// function to create carousel skeleton which will later append on accordion
let carouselSkeletion = function (val){

  let div = document.createElement("div");
  div.setAttribute("id","carouselExampleControls"+val)
  div.setAttribute("data-bs-ride","carousel")
  div.setAttribute("class","carousel slide")

  div.innerHTML = `<div class="carousel-inner">

  </div>

  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${val}"data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  `
 return div;
}



// function to create full carousel body with content
 function carouselBody(){
    let carouselInner = document.getElementsByClassName("carousel-inner");
    for(let i=0; i<carouselInner.length;i++){
      let data = makeRequest(i);
      data.then(callback=>{

      console.log("callback items",callback.items)
      callback.items.forEach((val,index)=>{
            let date = new Date(val.pubDate);
            let author = val.author.split(",");

            let innderDiv = document.createElement("div");
            if(index==0){
              innderDiv.className = "carousel-item active"
              }else{
              innderDiv.className = "carousel-item";
            }
            innderDiv.innerHTML = `
            <a href=${val.link}>
            <img src=${val.enclosure.link} class="d-block w-100 " alt="...">
            </a>
            <div class="card-body">
          <h5 class="card-title">${val.title}</h5>
          <div class="d-flex justify-content-between author"><div>${author[0]}</div> <i class="fa-solid fa-circle-small"></i> <div>${date.toLocaleDateString()}</div></div>

          <p class="card-text">${val.description}</p>
        </div>
         `
            carouselInner[i].append(innderDiv);

      })
    })
    }

 }

// function to append carousel in accordion

function appendCarouselInAccordion(element){

  let carouselSpace = document.getElementsByClassName("accordion-body");
  console.log(carouselSpace)

  for(let i=0; i<carouselSpace.length;i++){
    carouselSpace[i].append(carouselSkeletion(i))
  }
  carouselBody()
}

appendCarouselInAccordion();