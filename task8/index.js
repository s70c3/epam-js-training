'use strict';


$(document).ready(function () {
    const url = 'http://api.fixer.io/latest?base=RUB';
    const jsonpUrl = 'http://run.plnkr.co/plunks/v8xyYN64V4nqCshgjKms/data-2.json';
    const postUrl = 'https://jsonplaceholder.typicode.com/posts/';
    const content = $('#content');
    const OK = 200;
    $('.controlButton').on('click', function (event) {
        var button = event.target;
        if (button.tagName.toLowerCase() !== 'button') return;
        switch (button.id) {
            case 'xhr' :
                useXhr();
                break;
            case 'fetch' :
                useFetch();
                break;
            case 'jsonp' :
                useJsonp();
                break;
            case 'ajax' :
                useAjax();
                break;
            case 'get' :
                useGet();
                break;
            case 'post' :
                usePost();
                break;
            case 'clean' :
                content.empty();
                break;
        }
    });


    function printData(data,
                       parent = content.empty()) {
        if (typeof data !== 'object') return;
        if (!parent.tagName) parent = content.empty();

        let valueElement = document.createElement('div');
        valueElement.className = 'data';


        for (let key in data) {

            var keySpan = document.createElement('span');
            keySpan.className = 'key';
            keySpan.textContent = key+': ';

            if (data[key] instanceof Object) {
                valueElement.appendChild(keySpan);
                printData(data[key], valueElement);
            }
            else {
                var innerValueElement = document.createElement('p');
                innerValueElement.appendChild(keySpan);
                var dataSpan = document.createElement('span');
                dataSpan.className = 'value';
                dataSpan.textContent = data[key];
                innerValueElement.appendChild(dataSpan);

                valueElement.appendChild(innerValueElement);
            }
        }
        parent.append(valueElement);
    }

    function useXhr() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            if (xhr.status != OK) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                printData(JSON.parse(xhr.responseText));
            }
        }
    };
    function useFetch() {
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(
                printData
            )
            .catch(alert);
    };

    function useJsonp() {
        $.ajax({
            url: jsonpUrl,
            type: 'GET',
            jsonpCallback: "jsonCallback",
            dataType: "jsonp",
            success : function(data) {
                printData(data);
            },
            error: function (responseInfo) {
                if (responseInfo.status !== OK)
                    alert(responseInfo.status.toString());
            }
        });
    };
    function jsonCallback(data) {
        printData(data);
    }


    function useAjax() {
        $.ajax(
            {
                url: url,
                type: 'GET',
                datatype: 'json'
            }
        )
            .done(printData)
            .fail(alert);
    };

    function useGet() {
        $.get(url, printData)
            .fail(function (responseInfo) {
                alert(responseInfo)
            });
    };

    function usePost() {
        var data = [
            {
                color: "red",
                value: "#f00"
            },
            {
                color: "green",
                value: "#0f0"
            },
            {
                color: "blue",
                value: "#00f"
            }];

        data = JSON.stringify(data);
        $.post(postUrl, {data: data}, 'json')
            .done(function (response) {
                printData(JSON.parse(response.data));
            })
            .fail(function (responseInfo) {
                alert(responseInfo.status);
            });
    }
});