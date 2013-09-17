$(function(){
    $(".dialog button.connect").on(Modernizr.touch ? 'touchstart' : 'mousedown', function() {
        var ip = $(".dialog input").val();

        if(!ip) {
            return;
        }
        $(".dialog").hide();

        var iosocket = io.connect(ip);
         
        //var result = screen.lockOrientation("portrait-primary");
        //alert(result);
        $("a.btn").on(Modernizr.touch ? 'touchstart' : 'mousedown', function() {
            $(this).css("box-shadow", "inset 0 0 0 rgba(255,255,255,0.5), 0 0 0 rgba(0,0,20,0.4), 0 0 1px 8px rgba(0,0,20,0.1), inset 0 0 0 rgba(255,255,255,.22), inset 0 0 0 rgba(0,0,20,.15), inset 0 20px 10px rgba(255,255,255,.12)");
            window.navigator.tglVibrate && window.navigator.tglVibrate(100);
        });

        $("a.btn").on(Modernizr.touch ? 'touchend touchcancel' : 'mouseup', function() {
            $(this).css("box-shadow", "inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 2px rgba(0,0,20,0.4), 0 0 1px 8px rgba(0,0,20,0.1), inset 0 3px 2px rgba(255,255,255,.22), inset 0 -3px 2px rgba(0,0,20,.15), inset 0 20px 10px rgba(255,255,255,.12)");
        });

        iosocket.on('connect', function () {
             $("div.status img").attr("src", "image/connected.png");
             $("div.status span").text("服务已连接");
        });
        iosocket.on('disconnect', function() {
             $("div.status img").attr("src", "image/disconnected.png");
             $("div.status span").text("服务已断开");
        });

        $(window).keydown(function(e) {
            // console.log('Sending keyboard command: '+e.keyCode);
            iosocket.emit("key down", { keyCode: e.keyCode, shiftKey: e.shiftKey, altKey: e.altKey, ctrlKey: e.ctrlKey, metaKey: e.metaKey });
        });

        $(window).keyup(function(e) {
            // console.log('Sending keyboard command: '+e.keyCode);
            iosocket.emit("key up", { keyCode: e.keyCode, shiftKey: e.shiftKey, altKey: e.altKey, ctrlKey: e.ctrlKey, metaKey: e.metaKey });
        });

        var press = Modernizr.touch ? 'touchstart' : 'click';
        $('body').on(press,'.btn', function(e) {
            e.preventDefault();
            if ($(this).attr('data-key')) {
                // console.log('sending button command: '+$(this).attr('data-key'));
                iosocket.send($(this).attr('data-key'));
            }
            else if ($(this).attr('data-goto')) {
                iosocket.send('goto:'+$(this).attr('data-goto'));
            }
            else if ($(this).attr('data-command')) {
                iosocket.send($(this).attr('data-command'));
            }
        });

        iosocket.on('flowtime minimap complete', function(data){
            var minimap = $('<div class="minimap ft-default-progress"></div>');
            $('body').append(minimap);
            minimap.append(data.dom);
            var ftThumbs = document.querySelectorAll('.ft-page-thumb');
            $('body').on(press,'.ft-page-thumb', function(e) {
                e.preventDefault();
                for (var i = 0; i < ftThumbs.length; i++) {
                    ftThumbs[i].classList.remove('actual');
                } 
                e.target.classList.add('actual');
                var s = e.target.getAttribute('data-section').replace('__', '');
                var p = e.target.getAttribute('data-page').replace('__', '');
                iosocket.emit("navigate", { section: Number(s), page: Number(p) });
                console.log("e.target", s, p);
            });

            iosocket.on('navigate', function(data){
                for (var i = 0; i < ftThumbs.length; i++) {
                    ftThumbs[i].classList.remove('actual');
                }
                var actualThumb = document.querySelector('.ft-page-thumb[data-section=__' + data.section + '][data-page=__' + data.page + ']');
                actualThumb.classList.add('actual');
            });

        });
    });
});