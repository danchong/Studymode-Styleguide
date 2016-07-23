import { 
  triggerEvent, 
  getSiblings, 
  onlyDivsFilter, 
  onlyAnchorsFilter } from './utilities';

var beckettTabs = (function () {

  var tabItems = [];
  var tabContents = [];
  var ACTIVE_TAB_ITEM_CLASS = 'nav-tabs--active';
  var ACTIVE_TAB_ITEM_REGEX = new RegExp(ACTIVE_TAB_ITEM_CLASS, 'gi');
  var ACTIVE_TAB_CONTENT_CLASS = 'nav-tabs__content--active';
  var ACTIVE_TAB_CONTENT_REGEX = new RegExp(ACTIVE_TAB_CONTENT_CLASS, 'gi');


  init();

  /**
   * Setup event bindings for each tab 
   */
  function init() {
    setupTabItems();
    
    tabContents = document.getElementsByClassName('nav-tabs__content');
    
    document.getElementsByTagName('body')[0].addEventListener('beckett.tab.clicked', handleTabClicked);
  }
  
  /**
   * Add a single click event listener to a tab
   */
  function setupTabItems() {
    tabItems = document.getElementsByClassName('nav-tabs__item');
    
    Array.prototype.map.call(tabItems, function addTabListener(element) {
      element.addEventListener('click', tabClicked);
    });
  }
  
  /**
   * Handle tabs being clicked. Show and hide content areas
   */
  function handleTabClicked(event) {
    var tabId = event.target.getAttribute('href');
    
    // Look for tabs targeting content
    if(tabId[0] != '#') {
      return false;   // no tab targeted
    } else {
      tabId = tabId.substring(1);   // get targeted id
    }
    
    var target = document.getElementById(tabId);
    
    if(!target) {
      return false;  // target not found
    }
    
    var sibs = getSiblings(target, onlyDivsFilter);
    
    Array.prototype.map.call(sibs, function removeActiveClass(tab) {
      tab.className = tab.className.replace(ACTIVE_TAB_CONTENT_REGEX, '');
    });
    
    target.className += ' ' + ACTIVE_TAB_CONTENT_CLASS;
  }

  /**
   * Handle click event on a single tab
   */
  function tabClicked(event) {
    
    if(tabHasStandardLink(event.target)) {
      return true;
    }
    
    event.preventDefault();
    
    if(tabIsActive(event.target)) {
      return true;
    }

    deselectAllTabs(event.target);
    selectTab(event.target);
    
    triggerEvent(event.target, 'beckett.tab.clicked');
  }
  
  /**
   * Is tab currently the currently selected tab
   */
  function tabIsActive(element) {
    return element.className.indexOf('nav-tabs--active') > -1;
  }
  
  /**
   * Tab is not targeting a content area but is instead a regular link
   */
  function tabHasStandardLink(element) {
    var href = element.getAttribute('href');
    return !!href && href[0] != '#';
  }

  /**
   * Remove active class from all siblings of a tab 
   */
  function deselectAllTabs(element) {
    var sibs = getSiblings(element, onlyAnchorsFilter);

    Array.prototype.map.call(sibs, function removeActiveClass(tab) {
      tab.className = tab.className.replace(ACTIVE_TAB_ITEM_REGEX, '');
    });
  }
  
  /**
   * Set a tab to active by adding the active class 
   */
  function selectTab(element) {
    element.className += ' ' + ACTIVE_TAB_ITEM_CLASS;
  }

})();
