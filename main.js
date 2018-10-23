

(function () {
    var myVar = null;
    document.querySelector('#btnStart').addEventListener("click", stratSnaphot);
    document.querySelector('#btnStartCrop').addEventListener("click", stratSnaphotCrop);
    document.querySelector('#btnStartCropAndScale').addEventListener("click", stratSnaphotCropScale);
    document.querySelector('#btnStartScale').addEventListener("click", stratSnaphotScale);
    document.querySelector('#btnStop').addEventListener("click", StopSnaphot);


function stratSnaphot() {
   StopSnaphot();
   myVar = setInterval(function () {myTimer()}, 100);
   //myTimer();

}

function stratSnaphotCrop() {
    StopSnaphot();
    myVar = setInterval(function () { myTimerCrop() }, 1000);

}

function stratSnaphotCropScale() {
    StopSnaphot();
    //myVar = setInterval(function () { myTimerCropScale() }, 1000);
    setTimeout(function () { myTimerCropScale() }, 50);
    //myTimerCropScale();

}
function stratSnaphotScale() {
    StopSnaphot();
    myVar = setInterval(function () { myTimerScale() }, 1000);

}


function StopSnaphot() {
    window.clearTimeout(myVar);
}


function myTimer() {
    overwolf.media.getScreenshotUrl({}, function(info)
    {
    	if(typeof info.url === 'undefined')
    	{
    		console.log(info);
    		return;
    	}

    	document.getElementById("myimg").src = info.url;
    });
}

function myTimerCrop() {
    overwolf.media.getScreenshotUrl({"crop": {x:0,y:200, width:100, height:100}}, function(info){
        if (typeof info.url === 'undefined') {
            console.log(info);
            return;
        }

        document.getElementById("myimg").src = info.url;
    });
}

// function myTimerCropScale() {

    // // overwolf.media.getScreenshotUrl({"crop": { x : 441, y: 275, height: 116, width: 116 }, "rescale" :{width:128, height:128}}, function(info) {
        // // if (typeof info.url === 'undefined') {
            // // console.log(info);
            // // return;
        // // }

        // // document.getElementById("myimg").src = info.url;
    // // });
// }
    
var oImg1 = document.createElement("img");
function myTimerCropScale() {
   document.getElementById("myimg").src = ""
   document.getElementById("myimg2").src = ""
   document.getElementById("myimg3").src = ""
   var settings = {"crop": {x:299,y:194, width:82, height:82}, "rescale" :{width:42, height:42}};
   overwolf.media.getScreenshotUrl(settings, function(info) {
       if (typeof info.url === 'undefined') {
           console.error(info);
           return;
       }

      document.getElementById("myimg").src = info.url;
      
     var settings2 = {"crop": {x:500,y:194, width:82, height:82}, "rescale" :{width:42, height:42}};
     overwolf.media.getScreenshotUrl(settings2, function(info1) {
       if (typeof info1.url === 'undefined') {
           console.error(info1);
           return;
       }

      document.getElementById("myimg2").src = info1.url;
      
      var settings3 = {"crop": {x:698,y:194, width:82, height:82}, "rescale" :{width:42, height:42}};
        overwolf.media.getScreenshotUrl(settings3, function(info2) {
       if (typeof info2.url === 'undefined') {
           console.error(info2);
           return;
       }

      document.getElementById("myimg3").src = info2.url;
        //stratSnaphotCropScale();
      });
      
     });
      
  });
	
/*	
        overwolf.media.getScreenshotUrl(settings, function (info) {
	//	oImg1 .src = info.url;
        overwolf.media.getScreenshotUrl(settings, function (info) {
		//oImg1 .src = info.url;
                overwolf.media.getScreenshotUrl(settings, function (info) {
                    if (typeof info.url === 'undefined') {
                        console.log("Failed to create screenshot with error:");
                        console.log(info);
                        console.log("And settings:");
                        console.log(settings);
                        cb(null);
                        return;
                    }
                  // oImg1.src = info.url;
                   document.getElementById("myimg").src = info.url;
                });
            });
        });
        */
    
	
}


function myTimerScale() {
    overwolf.media.getScreenshotUrl({"rescale": { width: 300, height: 300 } }, function (info) {
        if (typeof info.url === 'undefined') {
            console.log(info);
            return;
        }

        document.getElementById("myimg").src = info.url;
    });
}

	var lastgameInfo = null;
	
	function OverwathSnapshot() {
		
		
		if (lastgameInfo== null)
			return;
		
		var size = 150;
		var xPos = lastgameInfo.logicalWidth / 2  - (size * 0.5);
		var yPos = lastgameInfo.logicalHeight / 2 - (size * 0.5);
		overwolf.media.getScreenshotUrl({"crop": {x:xPos,y:yPos, width:size, height:size}}, function(info){
        if (typeof info.url === 'undefined') {
            console.log(info);
            return;
        }

        document.getElementById("myimg").src = info.url;
    });
}

	function onOverwatchStarted(data)
	{
		console.log("start overwatch: ", data);
		lastgameInfo = data;
		StopSnaphot();
		myVar = setInterval(function () { OverwathSnapshot() }, 1000);
		
	}
	
	overwolf.games.getRunningGameInfo(function (res) {
		if (res && res.isRunning && res.isInFocus) {
			console.log("Loaded while game already running", res);
			var gameId = Math.floor(res.id / 10);

			if(gameId == 10844){
			 onOverwatchStarted(res);
			}
		} else {
			StopSnaphot();
		}
	});
	
	overwolf.games.onGameInfoUpdated.addListener(function (res) {
		console.log("GAME INFO UPDATE EVENT", res);
			if (res && res.gameInfo.isRunning && res.gameInfo.isInFocus) {
			console.log("Loaded while game already running", res);
			var gameId = Math.floor(res.gameInfo.id / 10);

			if(gameId == 10844){
			 onOverwatchStarted(res.gameInfo)
			}
		} else {
			StopSnaphot();
		}
	});

})();
