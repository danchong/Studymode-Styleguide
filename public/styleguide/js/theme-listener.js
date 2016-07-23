/**
 * Listens for theme changes from outside iFrame
 */
window.addEventListener('message', function(event) {
    var curentTheme;
    var themeBaseUrl = 'styleguide/css/';
    var themeUrl = '';
    var data = event.data;
    var head = document.getElementsByTagName('head')[0];
    var link = document.getElementById('theme-css');
    
    if(curentTheme == data.theme) return;

    if (data.theme) {
        themeUrl = '../../' + themeBaseUrl + 'sm-' + data.theme + '.css'
    }
    
    if(!link) {
        link = document.createElement("link");
        link.setAttribute("id", "theme-css");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("media", "all");
        head.appendChild(link);
    }

    link.setAttribute("href", themeUrl);

}, false);