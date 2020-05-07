'use strict';

//DOM Manipulate
let add_html = (elem, data) => {
    let _elem = document.querySelector(elem);
    if (_elem !== null) { //check if element exist, if not then no need to add
        _elem.innerHTML = data;
    }
}

let append_html = (elem, data) => {
    let _elem = document.querySelector(elem);
    if (_elem !== null) { //check if element exist, if not then no need to append
        _elem.insertAdjacentHTML('beforeend', data);
    }
}

let prepend_html = (elem, data) => {
    let _elem = document.querySelector(elem);
    if (_elem !== null) { //check if element exist, if not then no need to append
        _elem.insertAdjacentHTML('afterbegin', data);
    }
}

let remove_element = (elem) => {
    let _elem = document.querySelector(elem);
    if (_elem !== null) { //check if element exist, if not then no need to remove
        _elem.parentNode.removeChild(_elem);
    }
}

let renderPreLoader = (isAppend, bg) => {
    let _loader = '';

    _loader += `<div style="position:fixed;top:0;left:0;z-index:1000;width:100%;height:100%;" class="loading-wrapper">
        <div style="position:fixed;transform: translate(-50%, -50%); top: 50%; left: 50%;" class="loader-container">
            <div class="loader"></div>
        </div>
    </div>`;

    if (!isAppend) {
        add_html(_render, _loader);
    }

    return _loader;
}

let dragElement = (elem) => {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    let trigger_function = async (e) => {
        let event = e;
        let dragHandle = event.target.closest('.drag-handle')
        let _row = dragHandle.parentNode.parentNode;
        
        if (dragHandle) {
            console.log(_row)
            //console.log(dragHandle.parentNode.parentNode)
            dragMouseDown(event)
        }

        function dragMouseDown (event) {
            console.log(e)
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
            _row.style.position = 'absolute';
        }

        function elementDrag (e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            _row.style.top = (_row.offsetTop - pos2) + "px";
            _row.style.left = (_row.offsetLeft - pos1) + "px";
        }

        function closeDragElement () {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
            //_row.style.position = 'relative';
        }
    }

    let trigger = elem.addEventListener('mousedown', trigger_function);

    return trigger;
    
    //if (dragHandle) {
        /* if present, the header is where you move the DIV from:*/
        //dragHandle.onmousedown = dragMouseDown;
    //} else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        //elmnt.onmousedown = dragMouseDown;
    //}
}


//methods
let isFunction = (functionToCheck) => {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

let isJSON = (str) => {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
} 

let capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

let lowerCaseFirstLetter = (str) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

let multiIndex = (arr, elem, type) => { //change to recursion
    let _return = -1;
    arr.forEach(function (value, key) {
        if (!isNaN(parseFloat(elem)) && isFinite(elem)) {
            if (value[type] == elem) {
                _return = key;
            }
        }
        else {
            if (value[type] == elem) {
                _return = key;
            }
        }
    });
    return _return;
}

let timeFormat12To24 = (time) => {

    let hours = Number(time.match(/^(\d+)/)[1]);
    let minutes = Number(time.match(/:(\d+)/)[1]);
    let AMPM = time.match(/\s(.*)$/)[1];

    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;

    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;

    return sHours + ":" + sMinutes;
}

let timeFormat24To12 = (time) => {
    let hours = Number(time.match(/^(\d+)/)[1]);
    let minutes = Number(time.match(/:(\d+)/)[1]);
    let AMPM = '';

    if (hours < 12 || hours == 24) AMPM = 'AM';
    else AMPM = 'PM';
    if (hours == 0 || hours == 24) hours = 12;
    if (AMPM == 'PM' && hours > 12) hours -= 12;

    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;

    return sHours + ":" + sMinutes + ' ' + AMPM;
}

let timeMinHrToMin = (minHr) => {
    let hours = Number(minHr.match(/^(\d+)/)[1]) * 60;
    let minutes = Number(minHr.match(/:(\d+)/)[1]);
    return hours + minutes;
}

let timeMinToMinHr = (min) => {
    let hours = (parseInt(min / 60)).toString().padStart(2, '0');
    let minutes = (min % 60).toString().padStart(2, '0');
    return hours + ':' + minutes;
}

let timeSecToMin = (sec) => {
    let seconds = sec;
    let minutes = parseInt(seconds) / 60;
    return minutes;
}

let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let newLineToLineBreak = (x) => {
    return x.replace(/\r?\n/g, '<br>');
}

let convertLineBreak = (x) => {
}

//Namespaces
let present = (function() { //namespace
    let self = {}; //this namespace

    let getToday = function () { //get today instance
        let today = new Date();
        return today;
    }

    let day_name = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month_abbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let formats = {
        'dd': getToday().getDate(),
        'MM': month_name[getToday().getMonth()],
        'mm': getToday().getMonth() + 1,
        'yyyy': getToday().getFullYear(),
        'w': day_name[getToday().getDay()] //get the "day name" of the week
    };

    self.getDateTime = function (str) {
        let date = null;

        date = (str === undefined || str === '' ? getToday() : getFormat(str));
        return date;
    }

    let getFormat = function (str) {
        let format_list = []; //element, start, length
        let present = '';
        let str_list = str.split('');

        Object.keys(formats).forEach((elem) => { //initial review of the string parameters, to determine the position of every date_format in the string. This would avoid other characters e.g. ,.|{}[]~
            let len = elem.length;
            let re = RegExp(`${elem}`, 'g');
            let match;

            while ((match = re.exec(str)) != null) {
                format_list.push([elem, match.index, len]);
            }
        });

        format_list.sort((a, b) => { //sort the date format list, also for duplicate formats
            return a[1] - b[1];
        });

        let _count = 0; //index of "date format list"

        for (let i = 0; i < str_list.length; i++) {
            let elem = str_list[i];

            if (format_list[_count][1] === i) { //"date format" element that would be retrieve from the "date_formats" collection
                present += formats[format_list[_count][0]];
                i += (format_list[_count][2] - 1);
                _count++;
            }
            else { //regular element from the "string array"
                present += elem;
            }
        }

        return present;
    }
    
    return self;
}());

export {
    add_html,
    append_html,
    prepend_html,
    remove_element,
    renderPreLoader,
    numberWithCommas,
    newLineToLineBreak,
    isJSON,
    present,
    dragElement
};