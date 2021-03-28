/**********************************************************************************  
 * BTI425–Assignment 1*  
 * I declare that this assignment is my ownwork in accordance with SenecaAcademic Policy.  
 * *  No part of this assignment has been copied manually or electronically from any other source
 * *  (including web sites) or distributed to other students.* *  Name: Khashayar Faeghi Student ID: 125630186  Date: 01/31/2021
 * 
 * ********************************************************************************* 
 * 
 * **/

$(document).ready(function(){
    
    var arr = new Array();
    var flags = new Array();
    var count = 0;
    var cloneCount = 2;
   
     
    

    $('#search').click(function(){

       
        
        var input = $('#location').val();
        if(input != '')
        {
            var location = input.split(",");
            var city = location[0];
            var countrycode = location[1];
        }
        else 
        {
            $("#error").html('Field is Empty');
            setTimeout(function(){
                $('#error').remove();
              }, 5000);
              
        }


        
        $.getJSON( "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + countrycode + "&units=metric" + "&appid=03d741bc3bf706b75655d2876d9c5400", function( data ) {
        
            $.getJSON( "https://restcountries.eu/rest/v2/alpha/" + data.sys.country, function( param ) {



            flags.push(param.flag);                
            arr.push(data);

           
           
           if(count == 0)
           {
            

            $('#name', '#weather-box-1').html(data.name + "," + data.sys.country);
            $("#flag").attr("src", param.flag);
            $('#condtion', '#weather-box-1').html(data.weather[0].main);
            $('#temp', '#weather-box-1').html(data.main.temp + "&#176;");
            $('#windspeed', '#weather-box-1').html("Wind: " +data.wind.speed + " km/hr");
            $('#humidity', '#weather-box-1').html("Humidity: " + data.main.humidity + "%");
            $('#pressure', '#weather-box-1').html("Pressure: " + data.main.pressure + " hPa");
            $('#maxmin', '#weather-box-1').html("Max: " + data.main.temp_max + "&#176; " + "Min: " + data.main.temp_min + "&#176;");
            $('#sun', '#weather-box-1').html("Sunrise: " + time(data.sys.sunrise) + " Sunset: " + time(data.sys.sunset));
            $("#icon").attr("src","http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
            count++;
            
           }
           
           else {
            $('#weather-box-1')
            .clone()
             .attr('id', 'weather-box-'+ cloneCount++)
            .insertBefore($('[id^=weather-box]:first'));

           

            $('#name', '#weather-box-' + cloneCount - 1).html(data.name + "," + data.sys.country);
            $("#flag").attr("src", param.flag);
            $('#condtion', '#weather-box-' + cloneCount - 1).html(data.weather.main);
            $('#temp', '#weather-box-' + cloneCount - 1).html(data.main.temp + "&#176;");
            $('#windspeed', '#weather-box-' + cloneCount - 1).html("Wind: " +data.wind.speed + " km/hr");
            $('#humidity', '#weather-box-' + cloneCount - 1).html("Humidity: " + data.main.humidity + "%");
            $('#pressure', '#weather-box-').html("Pressure: " + data.main.pressure + " hPa");
            $('#maxmin', '#weather-box-').html("Max: " + data.main.temp_max + "&#176; " + "Min: " + data.main.temp_min + "&#176;");
            $('#sun', '#weather-box-1').html("Sunrise: " + time(data.sys.sunrise) + " Sunset: " + time(data.sys.sunset));
            $("#icon").attr("src","http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
            
            
            
            for (let index = 0; index < arr.length; index++) {
                
                
                $('#name', '#weather-box-' + index + 1).html(arr[index].name + "," + arr[index].sys.country);
                $("#flag").attr("src", flags[index].flag);
                $('#condtion', '#weather-box-' + index + 1).html(arr[index].weather.main);
                $('#temp', '#weather-box-' + index + 1).html(arr[index].main.temp);
                $('#windspeed', '#weather-box-' + index + 1).html("Wind: " + arr[index].wind.speed + " km/hr");
                $('#humidity', '#weather-box-' + index + 1).html("Humidity: " + data.main.humidity + "%");
                $('#pressure', '#weather-box-').html("Pressure: " + arr[index].main.pressure + " hPa");
                $('#maxmin', '#weather-box-').html("Max: " + arr[index].main.temp_max + "&#176; " + "Min: " + arr[index].main.temp_min + "&#176;");
                $('#sun', '#weather-box-1').html("Sunrise: " + time(data[index].sys.sunrise) + " Sunset: " + time(arr[index].sys.sunset));
                $("#icon").attr("src","http://openweathermap.org/img/wn/" + arr[index].weather[0].icon + ".png");

                
    
           
            }

        
         
          
            
            
                
            }
            
           
            


        });

        

   
   
   
    });
   
    });
   
    
});


function date(timestamp)
{

    var s = new Date(timestamp * 1000).toLocaleDateString("en-US")
    console.log(s)

    return s;

}

function time(timestamp)
{
    var s = new Date(timestamp * 1000).toLocaleTimeString("en-US")
    console.log(s)

    return s;
}
