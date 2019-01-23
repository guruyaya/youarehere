(function(){
    var all_pages = document.getElementById('all_pages');
    var slides = document.querySelectorAll('.slide');
    for(var i=0;i<slides.length;i++){
        var slide = slides[i];
        var option = document.createElement('option');
        option.value = slide.id;
        var slideHead = slide.children[0].querySelector('h3');
        if (slideHead){
            var slideName = slideHead.innerText;
        }else{
            var slideName = slide.id;
        }
        if (slideName == "*"){
            var lines = slide.children[0].querySelectorAll('p');
            slideName = '*' + ' (' + lines[0].innerText.split('\n')[0] + ')';
            if (slideName == '* ()'){
                slideName = slide.id;
                slideName = '*' + ' (' + slideName + ')';
            }
        }
        if (slide.classList.contains('section'))
            option.innerHTML = "* * " + slideName + " * *";
        else
            option.innerHTML = slideName;
        all_pages.appendChild(option);
    }
    all_pages.addEventListener('change', function(){
        impress().goto(all_pages.options[all_pages.selectedIndex].value);
    });
    var current_location = (decodeURIComponent(window.location.hash).substr(1).replace('/', ''));
    console.log(current_location);
    impress().init();
    setTimeout(function(){
        console.log(current_location);
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
        if (currentInnerElement){
            currentInnerElement.style.transform = 'translate(0, 0)';
            currentInnerElement.dataset.ypos = 0;
        }
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
