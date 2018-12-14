(function(){
    var all_pages = document.getElementById('all_pages');
    var slides = document.querySelectorAll('.slide');
    for(var i=0;i<slides.length;i++){
        var slide = slides[i];
        var option = document.createElement('option');
        option.value = slide.id;
        if (slide.classList.contains('section'))
            option.innerHTML = "* * " + slide.id + " * *";
        else
            option.innerHTML = slide.id;
        all_pages.appendChild(option);
    }
    all_pages.addEventListener('change', function(){
        impress().goto(all_pages.options[all_pages.selectedIndex].value);
    });
    var current_location = (decodeURIComponent(window.location.hash).substr(1));
    impress().init();
    setTimeout(function(){
        impress().goto(current_location);
    }, 100);

    var rootElement = document.getElementById( "impress" );
    rootElement.addEventListener( "impress:stepenter", function(event) {
      var currentStep = event.target;
      var targetOption = document.querySelector('#all_pages option[value='+currentStep.id+']');
      targetOption.selected = 'selected';
    });
    rootElement.addEventListener( "impress:stepleave", function(event) {
        var currentInnerElement = event.target.querySelector('.inner');
        currentInnerElement.style.transform = 'translate(0, 0)';
        currentInnerElement.dataset.ypos = 0;
    });
    window.HorizontalMove = function(factor){
        var currentInnerElement = document.querySelector('.slide.active .inner');
        currentInnerElement.dataset.ypos = (currentInnerElement.dataset.ypos || 0) - factor;
        currentInnerElement.style.transform = 'translate(0, ' + currentInnerElement.dataset.ypos + 'px)';
    }
    var downBtn = document.querySelector('.controls .downBtn');
    downBtn.addEventListener('click', function(){ HorizontalMove(50) });
    var him_or_me = document.getElementById('הוא--אני');
    him_or_me.addEventListener('click', function(e) {
        if (e.target.classList.contains('option1')) {
            him_or_me.classList.add('show-other');
        }else if (e.target.classList.contains('option2')) {
            him_or_me.className = him_or_me.className.replace(/\bshow-other\b/g, "");
        }
    });
})();
