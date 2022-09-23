// Timetable constructor, including the arrays of bus times
var Timetable = function(){
  var vokzalMF = ["06:05", "06:25", "06:57", "07:30", "08:01", "08:32", "09:03", "09:56", "10:29", "11:00", "11:32", "12:05", "12:36", "13:41", "14:13", "14:46", "15:17", "15:50", "16:21", "17:03", "17:30", "18:00", "19:00", "20:30"];
    var nanovoobrazMF = ["06:07", "06:27", "06:59", "07:32", "08:03", "08:34", "09:05", "09:58", "10:31", "11:02", "11:34", "12:07", "12:38", "13:43", "14:15", "14:48", "15:19", "15:52", "16:23", "17:05", "17:32", "18:02", "19:02", "20:32"];
   var navokzalMF = ["06:11", "06:52", "07:12", "07:44", "08:16", "08:48", "09:20", "09:52", "10:43", "11:15", "11:47", "12:19", "12:51", "13:23", "14:28", "15:00", "15:32", "16:04", "16:36", "17:08", "17:47", "18:17", "18:47", "19:47", "21:17"];
  var novoobrazMF = ["06:09", "06:50", "07:10", "07:42", "08:14", "08:46", "09:18", "09:50", "10:41", "11:13", "11:45", "12:17", "12:49", "13:21", "14:26", "14:58", "15:30", "16:02", "16:34", "17:06", "17:45", "18:15", "18:45", "19:45", "21:15"];
  var leamSA = [];
  var leamSU = [];
  
  var today = new Date().toUTCString().slice(0, 16);
  
  // Convert time strings to actual dates (doesn't work past midnight yet)
  for(var i=0, l=vokzalMF.length; i<l; i++){
    vokzalMF[i] = new Date(today+" "+vokzalMF[i]);
  }
  for(var i=0, l=vokzalMF.length; i<l; i++){
    navokzalMF[i] = new Date(today+" "+navokzalMF[i]);
  }
  for(var i=0, l=novoobrazMF.length; i<l; i++){
    novoobrazMF[i] = new Date(today+" "+novoobrazMF[i]);
  }

  for(var i=0, l=novoobrazMF.length; i<l; i++){
    nanovoobrazMF[i] = new Date(today+" "+nanovoobrazMF[i]);
  }

  
  // This will be where we work out what timetable to use
  var campus = vokzalMF;
  var leam = novoobrazMF;
  var ostingorog = navokzalMF;
  var ostinnovo = nanovoobrazMF;

  // A variable for updating the time left automatically
  var update = setTimeout($.noop, 0);
  
  // The body of the Timetable object, returns a HTML string
  // that will look nice on the page containing the time til
  // the next bus at the given stop ('c' or 'l');
  this.next = function(place){
    clearTimeout(update); //Updating now so cancel the planned one
    if(place == "l")
      var times = leam;
 if(place == "c")
      var times = campus;
if(place == "g")
      var times = ostingorog;
if(place == "n")
      var times = ostinnovo;
//    else
//      times = campus;
    var now = new Date();
    var d; // Time to wait in mins
    var next = '<span id="time">';
    for(var i=0, l=times.length; i<l; i++){
      if(times[i].getTime() >= now.getTime()){
        d = (times[i].getTime()-now.getTime())/(1000*60);
        if(d >= 60)
          next += Math.floor(d/60)+"</span>час и "+Math.round(d % 60)+" мин.";
        else
          next += Math.round(d)+"</span> мин.";
        break;
      }
    }
    var fn = arguments.callee;
    var _this = this;
    update = setTimeout(function(){
      document.getElementById('info').innerHTML = fn.call(_this, place);
    },(d+0.5-Math.floor(d+0.5))*60*1000+1000);
    // The time here makes it so an update happens at just gone 30
    // seconds past each minute (when round actually changes the value)
    return next;
  }
}

// Lets use what we've built!
var timetable = new Timetable();

// Update the screen even if jquery isn't available for some reason
document.onready = function(){
  document.getElementById('info').innerHTML = timetable.next('c');
}


$(document).ready(function(){
    $('#c').click(function(){
      if($(this).hasClass('active'))
        return;
      document.getElementById('info').innerHTML = timetable.next('c');
      $(this).addClass('active')
             .siblings().removeClass('active');
    });
    $('#l').click(function(){
      if($(this).hasClass('active'))
        return;
      document.getElementById('info').innerHTML = timetable.next('l');
      $(this).addClass('active')
             .siblings().removeClass('active');
    });

    $('#n').click(function(){
      if($(this).hasClass('active'))
        return;
      document.getElementById('info').innerHTML = timetable.next('n');
      $(this).addClass('active')
             .siblings().removeClass('active');
    });

    $('#g').click(function(){
      if($(this).hasClass('active'))
        return;
      document.getElementById('info').innerHTML = timetable.next('g');
      $(this).addClass('active')
             .siblings().removeClass('active');
    });




});