(function(){
    var current_location = (decodeURIComponent(window.location.hash).substr(1).replace('/', ''));
    impress().init();
    setTimeout(function(){
        impress().goto(current_location);
    }, 100);

    var rootElement = document.getElementById( "impress" );
    rootElement.addEventListener( "impress:stepleave", function(event) {
        event.detail.next.style.width = String(Math.round(100 /   document.getElementById('impress').dataset.windowScale)) + 'vw'
        var currentInnerElement = event.target.querySelector('.inner');
        if (currentInnerElement){
            currentInnerElement.style.transform = 'translate(0, 0)';
            currentInnerElement.dataset.ypos = 0;
        }
    });
    rootElement.addEventListener( "impress:stepenter", function(event) {

        var selected_id = event.target.id;
        var all_li =document.querySelectorAll( '#top_controls .search #all_pages li' );
        for (var i=0; i < all_li.length ; i++) {
            all_li[i].classList.remove('transition');
            if (all_li[i].dataset.target == selected_id)
                all_li[i].classList.add('active');
            else
                all_li[i].classList.remove('active');

        }
    });

    var downBtn = document.querySelector('#bottom_controls .arrow');
    downBtn.addEventListener('click', function(){ impress().next() });

    var upBtn = document.querySelector('#top_controls .arrow');
    upBtn.addEventListener('click', function(){ impress().prev() });

    var schBtn = document.querySelector('.search img');
    schBtn.addEventListener('click', function() {
         if (document.querySelector('.search').classList.toggle('open'))
            document.querySelector('.search input').select();
    });
    var all_pages_input = document.querySelector('#top_controls .search input');
    document.body.addEventListener('click', function (ev) {
        if (ev.target.matches('#top_controls .search #all_pages li')) {
            ev.target.classList.add('transition');
            impress().goto(ev.target.dataset.target);
            setTimeout(function(){
                document.querySelector('#top_controls .search').classList.remove('open');
                setTimeout(function(){
                    all_pages_input.value = '';
                    var all_li =document.querySelectorAll( '#top_controls .search #all_pages li' );
                    for (var i=0; i < all_li.length ; i++) {
                        all_li[i].style.display = 'list-item'
                    }
                }, 800);
            }, 1000);
        }
    });
    var sch_func = function (){
        var this_li;
        var search_phrase=all_pages_input.value.replace(' ', '-')
        var all_li =document.querySelectorAll( '#top_controls .search #all_pages li' );
        for (var i=0; i < all_li.length ; i++) {
            if (all_li[i].dataset.target.search(search_phrase) == -1)
                all_li[i].style.display = 'none';
            else
                all_li[i].style.display = 'list-item'
        }
    }
    all_pages_input.addEventListener('keydown', sch_func);
    all_pages_input.addEventListener('keyup', sch_func);

    var him_or_me = document.getElementById('הוא--אני');
    him_or_me.addEventListener('click', function(e) {
        if (e.target.classList.contains('option1')) {
            him_or_me.classList.add('show-other');
        }else if (e.target.classList.contains('option2')) {
            him_or_me.className = him_or_me.className.replace(/\bshow-other\b/g, "");
        }
    });
})();
