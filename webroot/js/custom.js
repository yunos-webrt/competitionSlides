Reveal.addEventListener( 'slidechanged', function( event ) {
    // console.log(event.indexh);
    // if(event.indexh === 8 && event.indexv === 3) {
        // var num = document.querySelector('.number');
        // times = 0;

        // update = function() {
            // num.innerHTML = times;
            // console.log(num.innerText);
            // num.style.fontSize = "74px";
            // times++;
            // if (times === 101) {
                // times = 0;
                // document.querySelector('.progress-circle-outer').classList.remove('animate');
            // }else{
                // setTimeout(update,20);
            // }
        // };
        // setTimeout(update,20);

    // }

    // if(event.indexh === 8 && event.indexv === 9) {
        // var cols = 8;
        // var s = 256;
        // for (var i = 0; i < 200; i++) {
            // var el = document.createElement('img');
            // el.className = 'mover';
            // el.src="img/yunos.png";
            // el.basicLeft = (i % cols) * s;
            // el.style.top = (Math.floor(i / cols) * s) + 'px';
            // document.querySelector("#paint-demo").appendChild(el);
        // }

        // updatePaintClasses();
        // updatePositions();
    // }
} );

Reveal.addEventListener( 'fragmenthidden', function( event ) {
    // event.fragment.style.display = "none";
} );

document.querySelector('.toggle-test').addEventListener('click', function(event) {
    var el = event.target;
    var prop;
    if (el.getAttribute('class').indexOf('toggler') != -1) {
        if (el.getAttribute('class').indexOf('on') != -1) {
            el.setAttribute('class', 'toggler');
        }
        else {
            el.setAttribute('class', 'toggler on');
        }
        event.preventDefault();
    }
});

var w = 200;
document.querySelector("#layer-control").addEventListener("click", function(event) {
    w = w + 10;
    document.querySelector("#layer").style.width = w + 'px';
});

function hasClassName(inElement, inClassName)
{
    var regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)');
    return regExp.test(inElement.className);
}

function addClassName(inElement, inClassName)
{
    if (!hasClassName(inElement, inClassName))
        inElement.className = [inElement.className, inClassName].join(' ');
}

function removeClassName(inElement, inClassName)
{
    if (hasClassName(inElement, inClassName)) {
        var regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)', 'g');
        var curClasses = inElement.className;
        inElement.className = curClasses.replace(regExp, ' ');
    }
}

function toggleClassName(inElement, inClassName)
{
    if (hasClassName(inElement, inClassName))
        removeClassName(inElement, inClassName);
    else
        addClassName(inElement, inClassName);
}

function toggleShape()
{
    var shape = document.getElementById('shape');
    if (hasClassName(shape, 'ring')) {
        removeClassName(shape, 'ring');
        addClassName(shape, 'cube');
    } else {
        removeClassName(shape, 'cube');
        addClassName(shape, 'ring');
    }

    // Move the ring back in Z so it's not so in-your-face.
    var stage = document.getElementById('stage');
    if (hasClassName(shape, 'ring'))
        stage.style.webkitTransform = 'translateZ(-200px)';
    else
        stage.style.webkitTransform = '';
}

function toggleBackfaces()
{
    var backfacesVisible = document.getElementById('backfaces').checked;
    var shape = document.getElementById('shape');
    if (backfacesVisible)
        addClassName(shape, 'backfaces');
    else
        removeClassName(shape, 'backfaces');
}

function updatePositions() {
    var heavyScroll = !!document.querySelector('#heavy-scroll').checked;
    var items = document.querySelectorAll('.mover');

    var cachedScrollTop = document.body.scrollTop;
    for (var i = 0; i < items.length; i++) {
        var phase;
        if (heavyScroll)
            phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));
        else
            phase = Math.sin((cachedScrollTop / 1250) + (i % 5));

        items[i].style.left = items[i].basicLeft + 100*phase + 'px';
    }
}
function updatePaintClasses() {
    var heavyPaint = !!document.querySelector('#heavy-paint').checked;
    var items = document.querySelectorAll('.demo-logo');
    for (var i = 0; i < items.length; i++) {
        if (heavyPaint)
            items[i].classList.add('heavy-painting');
        else
            items[i].classList.remove('heavy-painting');
    }
}

document.querySelector('#controls').addEventListener('click', updatePaintClasses);
window.addEventListener('scroll', updatePositions);

document.addEventListener('DOMContentLoaded', function() {
});



