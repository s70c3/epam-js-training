
/**
 * Created by s70c3 on 22.11.16.
 */
'use strict'


var names = ['Вася', 'Дима', 'Катя'];
var jobs = ['Слесарь', 'Менеджер', 'Премьер-министр'];
var persons = [];

var minAge = 25, maxAge = 35;
var minSelary = 20, maxSelary = 120;

for ( var i=0; i<10; i++) {
    var person = {
        name : names[ Math.floor(Math.random()*3)],
        age : Math.floor(Math.random()*(maxAge-minAge)+minAge),
        job : jobs[ Math.floor(Math.random()*3)],
        selary :  Math.floor(Math.random()*(maxSelary-minSelary)+minSelary)
    }
    persons[i] = person;
}

function propsToStr(object) {
    var result = '';
    for (var i in object) {
        result+=(i + ' - <span class=\''+i+'\'>' + object[i]+'</span>; ');
    }
    return result;
}
var list = document.querySelector('ul');
for (var i=0; i<10; i++) {
    var elem = document.createElement('li');
    elem.innerHTML=propsToStr(persons[i]);
    if (persons[i].selary < 50) elem.style.backgroundColor = '#f00';
    else if (persons[i].selary < 80) elem.style.backgroundColor = '#ff0';
    else elem.style.backgroundColor = '#0f0';
    if (persons[i].age < 27)  elem.querySelector('.name').style.fontWeight = 'bold';
    if(persons[i].job==='Премьер-министр') elem.style.textDecoration = 'underline';
    if(persons[i].name==='Катя') elem.style.fontSize = '1.5em';
    list.appendChild(elem);
}