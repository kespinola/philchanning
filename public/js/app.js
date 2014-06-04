var $document = $(document);
var $window = $(window);
var app = window.app = new App();


function App() {

    this.$header = $('header');

    this.app = this;

    this.$page = $('.main-module');

    this.$sidebar = $('#Sidebar');


    this.slideshow = {
        $el: $('.slideshow'),
        title: $('#title'),
        blurb: $('#blurb'),
        date: $('#date'),
        $pagers: $('.cycle-pager'),
        slidesTemplate: $('#cycle2-template').html(),
        pagersTemplate: $('#pagers-template').html(),

        options: {
            fx:'scrollHorz',
            speed:500,
            slides:'> img',
            pager:'.cycle-pager',
            prev:'#Prev',
            next:'#Next',
            timeout:0,
            swipe:true,
            pagerTemplate:"<a class='pager-wrapper' href='#'><img src='{{src}}' class='img-responsive' width=250 height=250></a>",
            centerHorz:true,
            centerVert:true
        }
    };

    this.$jumbotron = $('.jumbotron');

    this.initialize = function () {
        this.activateSlideshow();
        this.startAnimation();
        this.onResize();

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
        this.$page.toggleClass('active');
        $('.full-overlay').toggleClass('active');
        $('#Gallery').toggleClass('overflow-hidden');
        $('.direction-btn').toggleClass('hidden');

    };

    this.activateSlideshow = function () {
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


        slideshow.$el.html(parsedSlidesTemplate);
        this.setSlideshowDemensions();


        this.activateSlideshow();

    };

    this.processCardOverlay = function (id) {
        var $activeOverlay = $('.overlay[data-id="' + id + '"]');
            $('.overlay').removeClass('active');
            $activeOverlay.addClass('active');
    };

    this.toggleSidebar = function(){
        this.$sidebar.toggleClass('active');
    };


    this.onResize = function(){
        this.slideshow.$el.length ? this.setSlideshowDemensions() : '';
    };


    this.setSlideshowDemensions = function(){
        var height = $window.height() - this.$header.height();

        this.slideshow.$el.css({height: height})
    };



}

$document.ready(function () {
    $window.scrollTop(0);
    app.initialize();
});

$document.on('click touchstart', '.item-thumb', function (e) {
    var id = $(this).data('id');
    app.getGallery(id);
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

$window.resize(function(){
    app.onResize();
});

$document.on('click', '#TogglePanel', function(e){
   app.toggleSidebar();
   app.toggleFullView();
});
