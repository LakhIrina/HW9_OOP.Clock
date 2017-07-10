Clock.prototype.toggleClockPicker = function(){
    var x = document.getElementById(this.elementId);
    x.classList.toggle("shortTime");
    x.classList.toggle("longTime");
    this.clockModeShort = !this.clockModeShort;
    this.clock();
};

function Clock(timezone, elementId) {
    this.clockModeShort = false;
    this.timezone = timezone;
    this.elementId = elementId;
    this.clock = function() {
        var timezoneDateString = new Date().toLocaleString("en-US", {timeZone: this.timezone});
        var timezoneDate = new Date(timezoneDateString);
        var h = timezoneDate.getHours();
        var m = timezoneDate.getMinutes();
        var s = timezoneDate.getSeconds();
        m = this.formatTime(m);
        s = this.formatTime(s);

        var timeHtml;

        if(this.clockModeShort){
            timeHtml = h + ":" + m;
        }
        else {
            timeHtml = h + ":" + m + ":" + s;
        }

        document.getElementById(this.elementId).innerHTML = timeHtml;

        var that = this;
        var t = setInterval(function(){ that.clock() }, 1000); // в этом варианте иногда "проскакивают" секунды на табло часов... с setTimeout - нет
        //var t = setTimeout(function(){ that.clock() }, 0);
    };

    this.formatTime = function(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };

    var that = this;
    document.getElementById(this.elementId).addEventListener('click', function(){ that.toggleClockPicker() } , false);
};


function createClock() {
    var clock1 = new Clock("America/New_York", "clock1Id");
    clock1.clock();
    var clock2 = new Clock("Europe/London", "clock2Id");
    clock2.clock();
    var clock3 = new Clock("UTC", "clock3Id");
    clock3.clock();
}

window.addEventListener('load', createClock, false);
