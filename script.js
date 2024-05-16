
//API URL
const API_URL="https://663711c0288fedf6937f53d9.mockapi.io/Details"
//fetching data from API
async function fetchData() {
    try {
        let res=await fetch(API_URL);
        let data=await res.json();
        if(res.status==200)
            constructTable(data);
        else
        alert(`${res.status}-${res.statusText}`);
    } catch (error) {
        console.error(error);
        
    }

}
//constructing table body 

function constructTable(data) {
    let tbody=document.getElementById('table-body');
   data.forEach((e)=>{
    let tr=document.createElement('tr');
    tr.innerHTML = 
    `<td>${e.id}</td>
    <td>${e.firstName}</td>
    <td>${e.lastName}</td>
    <td>${e.email}</td>
    <td>${e.address}</td>
    <td>${e.pincode}</td>
    <td>${e.gender}</td>
    <td>${e.food}</td>
    <td>${e.state}</td>
    <td>${e.country}</td>`

tbody.appendChild(tr)
   })
}

let myForm=document.getElementById('createForm');
myForm.addEventListener('submit',async(e)=>{
    e.preventDefault()
    try {
        //assigning the gender values to the variables
       let male=document.getElementById('male');
       let female=document.getElementById('female');
       let others=document.getElementById('others');
       let gender;
       //checking the userinput gender and assign the value to gender

       if(male.checked==true){
        gender=document.getElementById('male').value
       }else if(female.checked==true){
        gender=document.getElementById('female').value
       }else if(others.checked==true){
        gender=document.getElementById('others').value
       }

       //getting the food values which are selected by user
       
        var selectedValues=[];
        var input=document.getElementsByClassName('select');
        for(var i=0; i<input.length; i++){
         if(input[i].checked){
             selectedValues.push(input[i].value);
         }
        }
    
       
       //pushing the input values to data object
        let data={
            firstName: document.getElementById("fname").value,
            lastName: document.getElementById("lname").value,
            email: document.getElementById("email").value,
            gender: gender,
            address: document.getElementById("address").value,
            pincode: document.getElementById("pincode").value,
            state: document.getElementById("state").value,
            country: document.getElementById("country").value,
            food:selectedValues
        }

        //pushing the data values to database or API using POST method
        let res = await fetch(API_URL,{ 
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify(data)
        })
        if(res.status===201)
            window.location.href='/'
        else
            alert(`${res.status} - ${res.statusText}`)
       
    } catch (error) 
    {
        console.error(error);
    }

}
)
fetchData();






