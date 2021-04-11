function showData()
{
    event.preventDefault();
    var country=document.getElementById("cname").value;
    var sDate=document.getElementById("sdate").value;
    var eDate=document.getElementById("edate").value;
    var confirmed=document.getElementById("confirmed");
    var active=document.getElementById("active");
    var deaths=document.getElementById("deaths");

    let arr = [];

    if(country=='' || sDate=='' || eDate==''){
        alert("Enter the Required Fields");
    }
    else
    {
        var difference= Math.abs(new Date(eDate)-new Date(sDate));
        days = difference/(1000 * 3600 * 24)


            for(i = 0; i <  days; i++)
            {
                if(i==0){
                    var startDate = new Date(sDate)
                    var endDate = new Date()
                }
                else{
                    var startDate = new Date(endDate)
                    var endDate = new Date()
                }
                endDate.setDate(startDate.getDate() + 1)
                var s = moment(startDate).format("YYYY-MM-DD");
                var e = moment(endDate).format("YYYY-MM-DD");
                var url="https://api.covid19api.com/country/"+country+"?from="+s+"T00:00:00Z&to="+e+"T00:00:00Z";
                console.log(url)
                fetch(url)
                .then((res) => res.json())
                .then((res) => {
                    var length=res.length;
                    var index=length-1;

                    var c=res[index].Confirmed;
                    var a=res[index].Active;
                    var d=res[index].Deaths;

                    confirmed.innerHTML =c;
                    active.innerHTML =a;
                    deaths.innerHTML =d;

                        document.getElementById("res").innerHTML += 
                            "<div id='cstm'"+i+"><h4>Confirmed Cases: <span id='confirmed '>"+ confirmed.innerHTML +"</span></h4>"+
                            "<h4>Active Cases: <span id='active'>"+active.innerHTML +"</span></h4>"+
                            "<h4>Death Cases: <span id='deaths'>"+deaths.innerHTML+ "</span></h4></div>";
                    
                        document.getElementById("res").style.display="block";

                    parent = document.querySelector('#res');
                    children = parent.children;
                    $("div#res > h4").css("display","none");
                })
            }




        
    }
}

