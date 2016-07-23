/**
 * Handles StudyMode custom themes
 */
var themes = (function() {
    
    var iFrame;
    var targetOrigin = (window.location.protocol == "file:") ? "*" : window.location.protocol+"//"+window.location.host;

    return {
        init: init,
    };

    function init() {
        iFrame = document.getElementById('sg-viewport').contentWindow;
        
        $('.sm-themes').on('click', function(event) {
            $(this).next('.sm-themes-list').toggleClass('active');
        })
        
        $('.sm-themes-list a').on('click', function(event) {
            event.preventDefault();
            
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var theme = $(this).data('theme')
            switchTheme(theme);
        })
    }
    
    function switchTheme(theme) {
        iFrame.postMessage({theme: theme}, targetOrigin);
    }

})();


$(document).ready(function() {
    themes.init();
});
