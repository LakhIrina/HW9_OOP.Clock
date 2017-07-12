
    function Clock(timezone, elementId) {
        this.clockModeShort = false;
        this.timezone = timezone;
        this.elementId = elementId;

        this.renderClock = function() {
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
            var t = setInterval(function(){ that.clock() }, 500);
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

    Clock.prototype.toggleClockPicker = function(){
        var x;
        x = document.getElementById(this.elementId);
        x.classList.toggle("shortTime");
        x.classList.toggle("longTime");
        this.clockModeShort = !this.clockModeShort;
        this.clock();
    };

    function createClock() {
        var clock1;
        var clock2;
        var clock3;
        clock1 = new Clock("America/New_York", "clock1Id");
        clock1.clock();
        clock2 = new Clock("Europe/London", "clock2Id");
        clock2.clock();
        clock3 = new Clock("UTC", "clock3Id");
        clock3.clock();
    }

    window.addEventListener('load', createClock, false);
