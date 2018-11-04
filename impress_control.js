(function(){
    window.HorizontalMove = function(factor){
        var impress_root = document.querySelector('#impress>div');
        var transformVars = impress_root.style.transform;
        var translate3dRe = /translate3d\((-?[0-9]+px), ?(-?[0-9]+)px/
        var translate3dMatch = transformVars.match(translate3dRe);
        var yFactor = parseFloat(translate3dMatch[2]) + factor;
        impress_root.style.transform = transformVars.replace(translate3dRe, 'translate3d($1, ' + yFactor + 'px');
    }
    var downBtn = document.querySelector('.controls .downBtn');
    downBtn.addEventListener('click', function(){ HorizontalMove(-50 * 300) });
})();
