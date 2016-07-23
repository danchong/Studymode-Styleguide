(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _utilities = require('./utilities');

var beckettTabs = function () {

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
    if (tabId[0] != '#') {
      return false; // no tab targeted
    } else {
        tabId = tabId.substring(1); // get targeted id
      }

    var target = document.getElementById(tabId);

    if (!target) {
      return false; // target not found
    }

    var sibs = (0, _utilities.getSiblings)(target, _utilities.onlyDivsFilter);

    Array.prototype.map.call(sibs, function removeActiveClass(tab) {
      tab.className = tab.className.replace(ACTIVE_TAB_CONTENT_REGEX, '');
    });

    target.className += ' ' + ACTIVE_TAB_CONTENT_CLASS;
  }

  /**
   * Handle click event on a single tab
   */
  function tabClicked(event) {

    if (tabHasStandardLink(event.target)) {
      return true;
    }

    event.preventDefault();

    if (tabIsActive(event.target)) {
      return true;
    }

    deselectAllTabs(event.target);
    selectTab(event.target);

    (0, _utilities.triggerEvent)(event.target, 'beckett.tab.clicked');
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
    var sibs = (0, _utilities.getSiblings)(element, _utilities.onlyAnchorsFilter);

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
}();

},{"./utilities":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggerEvent = triggerEvent;
exports.onlyAnchorsFilter = onlyAnchorsFilter;
exports.onlyDivsFilter = onlyDivsFilter;
exports.getSiblings = getSiblings;
/**
 * Helper class to triger a custom even for an element
 */
function triggerEvent(element, name, data) {
  var event = document.createEvent('Event');

  event.initEvent(name, true, true); //can bubble, and is cancellable
  event.data = data;
  element.dispatchEvent(event);
}

/**
 * Filter to only select anchor tags
 */
function onlyAnchorsFilter(element) {
  return element.nodeName.toLowerCase() == 'a';
}

/**
 * Filter to only select div tags
 */
function onlyDivsFilter(element) {
  return element.nodeName.toLowerCase() == 'div';
}

/**
 * Get all siblings for an element 
 * todo: Move to sharable utility class
 */
function getSiblings(el, filter) {
  var siblings = [];
  el = el.parentNode.firstChild;
  do {
    if (!filter || filter(el)) siblings.push(el);
  } while (el = el.nextSibling);
  return siblings;
}

},{}]},{},[1]);
