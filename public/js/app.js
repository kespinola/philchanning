var $document = $(document);
var $window = $(window);


function App() {

    this.$header = $('header');

    this.$page = $('.main-module');

    this.$sidebar = $('#Sidebar');

    this.slideshow = {
        $el: $('.cycle-slideshow'),
        title: $('#title'),
        blurb: $('#blurb'),
        date: $('#date'),
        $pagers: $('.cycle-pager'),
        slidesTemplate: $('#cycle2-template').html(),
        pagersTemplate: $('#pagers-template').html(),
        options: {
            fx:'scrollHorz',
            speed:'500',
            slides:'div',
            pager:'.cycle-pager',
            pagerTemplate:"<a href='#' ><img src={{src}} width=100 height=100></a>",
            prev:'#Prev',
            next:'#Next',
            log: false,
            timeout:0

        }
    };

    this.$jumbotron = $('.jumbotron');

    this.initialize = function () {
        this.activateSlideshow();
        this.startAnimation();

    };

    this.startAnimation = function () {
       var _self = this;
       this.toggleJumbotron();

        var delay = null;

        this.$jumbotron.length ? delay = 1000 : 400;

        setTimeout(function () {
            _self.togglePage();
        }, delay);

        setTimeout(function(){ _self.$sidebar.removeClass('active') },750);
    };

    this.togglePage = function(){
        var $spyNav = $('#module-spy');
        this.$page.toggleClass('active');
        $spyNav.length ? $spyNav.toggleClass('active'): false;
    };

    this.toggleJumbotron = function(){
        var _self = this;
        setTimeout(function () {
            _self.$jumbotron.toggleClass('active');
        }, 500);
    };

    this.toggleFullView = function(){
        this.$page.toggleClass('hide-page');
        $('#ShowGallery').toggleClass('active');
        $('.full-overlay').toggle('active');
        $('#Sidebar').toggle('hide');

    };

    this.activateSlideshow = function () {
        var _self = this;
        this.slideshow.$el.length ? this.slideshow.$el.cycle(this.slideshow.options) : false;
    };

    this.getGallery = function (id) {
        var _self = this;
        var url = '/api/gallery/' + id;
        $.getJSON(url, function () {

        })
            .done(function (data) {
                _self.updateSlideshow(data.gallery)
            })
    };

    this.updateSlideshow = function (gallery) {
        var slideshow = this.slideshow;

        slideshow.title.text(gallery.name);
        slideshow.blurb.text(gallery.blurb.Type.md);
        slideshow.date.text(moment(gallery.publishedDate).format('Do MMM YYYY'));



        slideshow.$el.cycle('destroy');
        slideshow.$pagers.html('');


        var parsedSlidesTemplate = _.template(slideshow.slidesTemplate, {images: gallery.images });
        var parsedPagersTemplate = _.template(slideshow.pagersTemplate, {images: gallery.images });

        slideshow.$el.html(parsedSlidesTemplate);
        slideshow.$pagers.html(parsedPagersTemplate);


        this.activateSlideshow();

    };

    this.processCardOverlay = function (id) {
        var $activeOverlay = $('.overlay[data-id="' + id + '"]');
            $('.overlay').removeClass('active');
            $activeOverlay.addClass('active');
    }

    this.toggleSidebar = function(){
        this.$sidebar.toggleClass('active');
    }

}

$document.ready(function () {
    $('window').scrollTop(0);
    window.app = new App();
    app.initialize();
});

$document.on('click', '.item-thumb', function (e) {
    var id = $(this).data('id');
    window.app.getGallery(id);
});

$document.on('click', '.icon-btn', function (e) {
    var id = $(this).data('id'),
        $icon = $(this),
        $icons = $('.icon-btn');

    if($icon.hasClass('active') == false){
        $icons.removeClass('active');
        $icon.addClass('active');
        app.processCardOverlay(id);
    }else{
        $('.overlay').removeClass('active');
        $icons.removeClass('active');
    }
});

$document.on('click','.toggle-page', function(e) {
    app.toggleFullView();
});

$document.on('click', '#TogglePanel', function(e){
   app.toggleSidebar();
});
