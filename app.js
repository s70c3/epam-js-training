/**
 * Created by s70c3 on 30.11.16.
 */
'use strict';

function Application() {
    this.square = document.querySelector('.square');
    this.square.style.left='5px';
    this.square.style.top='5px';
    this.delta=10;
    this.angle = 0;
    this.listener=this.listener.bind(this);
}


Application.prototype = {
    start : function () {
        document.addEventListener('keydown', this.listener);

        console.log(this);
        console.log('Game started!');
    },
    stop : function () {
        document.removeEventListener('keydown', this.listener);
        console.log('Game stopped!');
    },

    listener : function (event) {

        if(event.shiftKey) {
            switch (event.keyCode) {
                case 40:
                case 39:
                    this.angle+=this.delta;
                    break;
                case 38:
                case 37:
                    this.angle-=this.delta;
                    break;
                default:
                    break;

            }
            this.square.style.transform='rotate('+this.angle+'deg)';
        }
        else {
            console.log(this.square);
            switch (event.keyCode) {

                case 40:
                    this.square.style.top=parseInt(this.square.style.top)+parseInt(this.delta)+'px';
                    break;
                case 39:
                    this.square.style.left=parseInt(this.square.style.left)+parseInt(this.delta)+'px';
                    break;
                case 38:
                    this.square.style.top=parseInt(this.square.style.top)-this.delta+'px';
                    break;
                case 37:
                    this.square.style.left=parseInt(this.square.style.left)-this.delta+'px';
                    break;
                default:
                    break;

            }
        }
    }
}


var app = new Application();


var input = document.querySelector('.offset');

input.addEventListener('change', function (event) {
    if (input.value < 10 ) input.value = 10;
    else  if (input.value > 50) input.value = 50;
    app.delta=input.value;
})

var start = document.querySelector('.start');
start.addEventListener('click', app.start.bind(app));

var stop = document.querySelector('.stop');
stop.addEventListener('click', app.stop.bind(app));

