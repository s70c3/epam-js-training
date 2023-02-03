/**
 * Created by s70c3 on 23.11.16.
 */

'use strict'

function initializeClock() {

    var date;
    var params=[];
    var result="";
    if (( arguments[0] instanceof Date)) {
        date=new Date(arguments[0]);
    if (arguments.length == 1)
        params = ['hours', 'minutes', 'seconds'];
    else params = arguments[1];
    }
    else if (arguments.length == 1) {
        params = arguments[0];
        date = new Date();
    }
    else {
        params = ['hours', 'minutes', 'seconds'];
        date = new Date();
    }

      var parts = {
         seconds : 0,
          minutes : 0,
          hours :  0,
          days : date.getDate(),
          months : date.getMonth()+1,
          years : date.getFullYear()
      };

    var delimiters = {
        seconds : '',
        minutes : ':',
        hours :  ':',
        days : '.',
        months : '.',
        years : ' '
    }

      setInterval( function () {
          for(var i in params)
          {
              if(parts[params[i]]<10) result+="0";
              result+=parts[params[i]];
              result+=delimiters[params[i]];
          }

          console.log(result);
          document.querySelector('.clock').innerHTML = result;
          result="";

          parts.seconds++;
          if(parts.seconds==60) {
              parts.seconds=0;
              parts.minutes++;
          }
          if(parts.minutes==60) {
              parts.minutes=0;
              parts.hours++;
          }
          if(parts.hours==24) {
              parts.hours=0;
              parts.days++;
          }
          if(parts.days==30) {
              parts.days=1;
              parts.month++;
          }
          if(parts.month==12) {
              parts.month=1;
              parts.year++;
          }

      }, 1000);


}
initializeClock(['days','months','years',  'hours', 'minutes', 'seconds']);