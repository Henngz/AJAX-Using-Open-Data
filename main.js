const searchBar = document.getElementById('searchBar');
const btn = document.getElementById('btn');
const tableBody = document.getElementById('table-body');
const table = document.getElementById('table');
const error = document.getElementById('error');


btn.addEventListener('click',uploadData);

function uploadData(){

    let locationName = searchBar.value;
    console.log(searchBar.value);
    const apiUrl = 'https://data.winnipeg.ca/resource/tx3d-pfxq.json?' +
                    `$where=lower(location_description) LIKE lower('%${locationName}%')` +
                    '&$order=area_in_hectares DESC' +
                    '&$limit=100';
    const encodedURL = encodeURI(apiUrl);

   fetch(encodedURL)
     .then(function (result) {
       return result.json(); 
     })
     .then(function (data) {
        

        var length = data.length;
        console.log(length);
        let dataHtml = '';

        if(length >= 100){
          // Make current error invisible
          if (error.style.display === "block") {
            error.style.display = "none";
          }

          table.style.display="block";

            for(let i = 0; i<100; i++){
                dataHtml += `<tr>
                            <td>${data[i].park_name}</td>
                            <td>${data[i].location_description}</td>
                            <td>${data[i].neighbourhood}</td>
                            <td>${data[i].district}</td>
                           </tr>`;
            }
            tableBody.innerHTML = dataHtml;         
        }
        else if(length>0 && length<100){   
          // Make current error invisible
          if (error.style.display === "block") {
            error.style.display = "none";
          }

          table.style.display="block";

           for(let oneData of data){
                dataHtml += `<tr>
                            <td>${oneData.park_name}</td>
                            <td>${oneData.location_description}</td>
                            <td>${oneData.neighbourhood}</td>
                            <td>${oneData.district}</td>
                            </tr>`;
           }
           tableBody.innerHTML = dataHtml;          
        }
        else if(length<1){        
          if (table.style.display === "block") {
            table.style.display = "none";
          } 
            error.style.display = "block";        
        }
     })
}


