"use strict";
var KTApp = function () {
  var t = {},
    e = function (t) {
      var e = t.data("skin") ? "tooltip-" + t.data("skin") : "",
        a = "auto" == t.data("width") ? "tooltop-auto-width" : "",
        n = t.data("trigger") ? t.data("trigger") : "hover";
      t.data("placement") && t.data("placement");
      $(t).tooltip({
        trigger: n,
        template: '<div class="tooltip ' + e + " " + a + '" role="tooltip">                <div class="arrow"></div>                <div class="tooltip-inner"></div>            </div>'
      })
    },
    a = function () {
      $('[data-toggle="tooltip"]').each(function () {
        e($(this))
      })
    },
    n = function (t) {
      var e = t.data("skin") ? "popover-" + t.data("skin") : "",
        a = t.data("trigger") ? t.data("trigger") : "hover";
      t.popover({
        trigger: a,
        template: '            <div class="popover ' + e + '" role="tooltip">                <div class="arrow"></div>                <h3 class="popover-header"></h3>                <div class="popover-body"></div>            </div>'
      })
    },
    i = function () {
      $('[data-toggle="popover"]').each(function () {
        n($(this))
      })
    },
    o = function (t, e) {
      t = $(t),
        new KTCard(t[0], e)
    },
    l = function () {
      $('[data-card="true"]').each(function () {
        var t = $(this);
        !0 !== t.data("data-card-initialized") && (o(t, {}),
          t.data("data-card-initialized", !0))
      })
    };
  return {
    init: function (e) {
      e && (t = e),
        KTApp.initComponents()
    },
    initComponents: function () {
      $('[data-scroll="true"]').each(function () {
          var t = $(this);
          KTUtil.scrollInit(this, {
            mobileNativeScroll: !0,
            handleWindowResize: !0,
            rememberPosition: "true" == t.data("remember-position"),
            height: function () {
              return KTUtil.isBreakpointDown("lg") && t.data("mobile-height") ? t.data("mobile-height") : t.data("height")
            }
          })
        }),
        a(),
        i(),
        $("body").on("click", "[data-close=alert]", function () {
          $(this).closest(".alert").hide()
        }),
        $(".custom-file-input").on("change", function () {
          var t = $(this).val();
          $(this).next(".custom-file-label").addClass("selected").html(t)
        }),
        l(),
        "undefined" != typeof Sticky && new Sticky('[data-sticky="true"]'),
        $("body").on("show.bs.dropdown", function (t) {
          var e = $(t.target).find("[data-attach='body']");
          if (0 !== e.length) {
            var a = $(t.target).find(".dropdown-menu").detach();
            e.data("dropdown-menu", a),
              $("body").append(a),
              a.css("display", "block"),
              a.position({
                my: "right top",
                at: "right bottom",
                of: $(t.relatedTarget)
              })
          }
        }),
        $("body").on("hide.bs.dropdown", function (t) {
          var e = $(t.target).find("[data-attach='body']");
          if (0 !== e.length) {
            var a = e.data("dropdown-menu");
            $(t.target).append(a.detach()),
              a.hide()
          }
        })
    },
    initTooltips: function () {
      a()
    },
    initTooltip: function (t) {
      e(t)
    },
    initPopovers: function () {
      i()
    },
    initPopover: function (t) {
      n(t)
    },
    initCard: function (t, e) {
      o(t, e)
    },
    initCards: function () {
      l()
    },
    initSticky: function () {
      initSticky()
    },
    initAbsoluteDropdown: function (t) {
      ! function (t) {
        var e;
        t && $("body").on("show.bs.dropdown", t, function (t) {
          e = $(t.target).find(".dropdown-menu"),
            $("body").append(e.detach()),
            e.css("display", "block"),
            e.position({
              my: "right top",
              at: "right bottom",
              of: $(t.relatedTarget)
            })
        }).on("hide.bs.dropdown", t, function (t) {
          $(t.target).append(e.detach()),
            e.hide()
        })
      }(t)
    },
    block: function (t, e) {
      var a, n = $(t),
        i = '<span class="spinner ' + ((e = $.extend(!0, {
          opacity: .05,
          overlayColor: "#000000",
          type: "",
          size: "",
          state: "primary",
          centerX: !0,
          centerY: !0,
          message: "",
          shadow: !0,
          width: "auto"
        }, e)).type ? "spinner-" + e.type : "") + " " + (e.state ? "spinner-" + e.state : "") + " " + (e.size ? "spinner-" + e.size : "") + '"></span';
      if (e.message && e.message.length > 0) {
        var o = "blockui " + (!1 === e.shadow ? "blockui" : "");
        a = '<div class="' + o + '"><span>' + e.message + "</span>" + i + "</div>";
        n = document.createElement("div");
        $("body").prepend(n),
          KTUtil.addClass(n, o),
          n.innerHTML = a,
          e.width = KTUtil.actualWidth(n) + 10,
          KTUtil.remove(n),
          "body" == t && (a = '<div class="' + o + '" style="margin-left:-' + e.width / 2 + 'px;"><span>' + e.message + "</span><span>" + i + "</span></div>")
      } else
        a = i;
      var l = {
        message: a,
        centerY: e.centerY,
        centerX: e.centerX,
        css: {
          top: "30%",
          left: "50%",
          border: "0",
          padding: "0",
          backgroundColor: "none",
          width: e.width
        },
        overlayCSS: {
          backgroundColor: e.overlayColor,
          opacity: e.opacity,
          cursor: "wait",
          zIndex: "body" == t ? 1100 : 10
        },
        onUnblock: function () {
          n && n[0] && (KTUtil.css(n[0], "position", ""),
            KTUtil.css(n[0], "zoom", ""))
        }
      };
      "body" == t ? (l.css.top = "50%",
        $.blockUI(l)) : (n = $(t)).block(l)
    },
    unblock: function (t) {
      t && "body" != t ? $(t).unblock() : $.unblockUI()
    },
    blockPage: function (t) {
      return KTApp.block("body", t)
    },
    unblockPage: function () {
      return KTApp.unblock("body")
    },
    progress: function (t, e) {
      e && e.color && e.color;
      var a = e && e.alignment ? e.alignment : "right",
        n = e && e.size ? " spinner-" + e.size : "",
        i = "spinner spinner-" + skin + " spinner-" + a + n;
      KTApp.unprogress(t),
        KTUtil.attr(t, "disabled", !0),
        $(t).addClass(i),
        $(t).data("progress-classes", i)
    },
    unprogress: function (t) {
      $(t).removeClass($(t).data("progress-classes")),
        KTUtil.removeAttr(t, "disabled")
    },
    getSettings: function () {
      return t
    }
  }
}();
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTApp),
  $(document).ready(function () {
    KTApp.init(KTAppSettings)
  });
var KTCard = function (t, e) {
  var a = this,
    n = KTUtil.getById(t),
    i = KTUtil.getBody();
  if (n) {
    var o = {
        toggleSpeed: 400,
        sticky: {
          releseOnReverse: !1,
          offset: 300,
          zIndex: 101
        }
      },
      l = {
        construct: function (t) {
          return KTUtil.data(n).has("card") ? a = KTUtil.data(n).get("card") : (l.init(t),
              l.build(),
              KTUtil.data(n).set("card", a)),
            a
        },
        init: function (t) {
          a.element = n,
            a.events = [],
            a.options = KTUtil.deepExtend({}, o, t),
            a.header = KTUtil.child(n, ".card-header"),
            a.footer = KTUtil.child(n, ".card-footer"),
            KTUtil.child(n, ".card-body") ? a.body = KTUtil.child(n, ".card-body") : KTUtil.child(n, ".form") && (a.body = KTUtil.child(n, ".form"))
        },
        build: function () {
          var t = KTUtil.find(a.header, "[data-card-tool=remove]");
          t && KTUtil.addEvent(t, "click", function (t) {
            t.preventDefault(),
              l.remove()
          });
          var e = KTUtil.find(a.header, "[data-card-tool=reload]");
          e && KTUtil.addEvent(e, "click", function (t) {
            t.preventDefault(),
              l.reload()
          });
          var n = KTUtil.find(a.header, "[data-card-tool=toggle]");
          n && KTUtil.addEvent(n, "click", function (t) {
            t.preventDefault(),
              l.toggle()
          })
        },
        initSticky: function () {
          a.options.sticky.offset;
          a.header && window.addEventListener("scroll", l.onScrollSticky)
        },
        onScrollSticky: function (t) {
          var e = a.options.sticky.offset;
          if (!isNaN(e)) {
            var n = KTUtil.getScrollTop();
            n >= e && !1 === KTUtil.hasClass(i, "card-sticky-on") ? (l.eventTrigger("stickyOn"),
              KTUtil.addClass(i, "card-sticky-on"),
              l.updateSticky()) : 1.5 * n <= e && KTUtil.hasClass(i, "card-sticky-on") && (l.eventTrigger("stickyOff"),
              KTUtil.removeClass(i, "card-sticky-on"),
              l.resetSticky())
          }
        },
        updateSticky: function () {
          var t, e, n;
          a.header && (KTUtil.hasClass(i, "card-sticky-on") && (t = a.options.sticky.position.top instanceof Function ? parseInt(a.options.sticky.position.top.call(this, a)) : parseInt(a.options.sticky.position.top),
            e = a.options.sticky.position.left instanceof Function ? parseInt(a.options.sticky.position.left.call(this, a)) : parseInt(a.options.sticky.position.left),
            n = a.options.sticky.position.right instanceof Function ? parseInt(a.options.sticky.position.right.call(this, a)) : parseInt(a.options.sticky.position.right),
            KTUtil.css(a.header, "z-index", a.options.sticky.zIndex),
            KTUtil.css(a.header, "top", t + "px"),
            KTUtil.css(a.header, "left", e + "px"),
            KTUtil.css(a.header, "right", n + "px")))
        },
        resetSticky: function () {
          a.header && !1 === KTUtil.hasClass(i, "card-sticky-on") && (KTUtil.css(a.header, "z-index", ""),
            KTUtil.css(a.header, "top", ""),
            KTUtil.css(a.header, "left", ""),
            KTUtil.css(a.header, "right", ""))
        },
        remove: function () {
          !1 !== l.eventTrigger("beforeRemove") && (KTUtil.remove(n),
            l.eventTrigger("afterRemove"))
        },
        setContent: function (t) {
          t && (a.body.innerHTML = t)
        },
        getBody: function () {
          return a.body
        },
        getSelf: function () {
          return n
        },
        reload: function () {
          l.eventTrigger("reload")
        },
        toggle: function () {
          KTUtil.hasClass(n, "card-collapse") || KTUtil.hasClass(n, "card-collapsed") ? l.expand() : l.collapse()
        },
        collapse: function () {
          !1 !== l.eventTrigger("beforeCollapse") && (KTUtil.slideUp(a.body, a.options.toggleSpeed, function () {
              l.eventTrigger("afterCollapse")
            }),
            KTUtil.addClass(n, "card-collapse"))
        },
        expand: function () {
          !1 !== l.eventTrigger("beforeExpand") && (KTUtil.slideDown(a.body, a.options.toggleSpeed, function () {
              l.eventTrigger("afterExpand")
            }),
            KTUtil.removeClass(n, "card-collapse"),
            KTUtil.removeClass(n, "card-collapsed"))
        },
        eventTrigger: function (t) {
          for (var e = 0; e < a.events.length; e++) {
            var n = a.events[e];
            if (n.name == t) {
              if (1 != n.one)
                return n.handler.call(this, a);
              if (0 == n.fired)
                return a.events[e].fired = !0,
                  n.handler.call(this, a)
            }
          }
        },
        addEvent: function (t, e, n) {
          return a.events.push({
              name: t,
              handler: e,
              one: n,
              fired: !1
            }),
            a
        }
      };
    return a.setDefaults = function (t) {
        o = t
      },
      a.remove = function () {
        return l.remove(html)
      },
      a.initSticky = function () {
        return l.initSticky()
      },
      a.updateSticky = function () {
        return l.updateSticky()
      },
      a.resetSticky = function () {
        return l.resetSticky()
      },
      a.destroySticky = function () {
        l.resetSticky(),
          window.removeEventListener("scroll", l.onScrollSticky)
      },
      a.reload = function () {
        return l.reload()
      },
      a.setContent = function (t) {
        return l.setContent(t)
      },
      a.toggle = function () {
        return l.toggle()
      },
      a.collapse = function () {
        return l.collapse()
      },
      a.expand = function () {
        return l.expand()
      },
      a.getBody = function () {
        return l.getBody()
      },
      a.getSelf = function () {
        return l.getSelf()
      },
      a.on = function (t, e) {
        return l.addEvent(t, e)
      },
      a.one = function (t, e) {
        return l.addEvent(t, e, !0)
      },
      l.construct.apply(a, [e]),
      a
  }
};
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTCard);
var KTCookie = {
  getCookie: function (t) {
    var e = document.cookie.match(new RegExp("(?:^|; )" + t.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    return e ? decodeURIComponent(e[1]) : void 0
  },
  setCookie: function (t, e, a) {
    a || (a = {}),
      (a = Object.assign({}, {
        path: "/"
      }, a)).expires instanceof Date && (a.expires = a.expires.toUTCString());
    var n = encodeURIComponent(t) + "=" + encodeURIComponent(e);
    for (var i in a)
      if (a.hasOwnProperty(i)) {
        n += "; " + i;
        var o = a[i];
        !0 !== o && (n += "=" + o)
      }
    document.cookie = n
  },
  deleteCookie: function (t) {
    setCookie(t, "", {
      "max-age": -1
    })
  }
};
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTCookie);

// Component Definition 
var KTDialog = function (options) {
  // Main object
  var the = this;

  // Get element object
  var element;
  var body = KTUtil.getBody();

  // Default options
  var defaultOptions = {
    'placement': 'top center',
    'type': 'loader',
    'width': 100,
    'state': 'default',
    'message': 'Loading...'
  };

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Construct
     */

    construct: function (options) {
      Plugin.init(options);

      return the;
    },

    /**
     * Handles subtoggle click toggle
     */
    init: function (options) {
      the.events = [];

      // merge default and user defined options
      the.options = KTUtil.deepExtend({}, defaultOptions, options);

      the.state = false;
    },

    /**
     * Show dialog
     */
    show: function () {
      Plugin.eventTrigger('show');

      element = document.createElement("DIV");
      KTUtil.setHTML(element, the.options.message);

      KTUtil.addClass(element, 'dialog dialog-shown');
      KTUtil.addClass(element, 'dialog-' + the.options.state);
      KTUtil.addClass(element, 'dialog-' + the.options.type);

      if (the.options.placement == 'top center') {
        KTUtil.addClass(element, 'dialog-top-center');
      }

      body.appendChild(element);

      the.state = 'shown';

      Plugin.eventTrigger('shown');

      return the;
    },

    /**
     * Hide dialog
     */
    hide: function () {
      if (element) {
        Plugin.eventTrigger('hide');

        element.remove();
        the.state = 'hidden';

        Plugin.eventTrigger('hidden');
      }

      return the;
    },

    /**
     * Trigger events
     */
    eventTrigger: function (name) {
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];

        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              return event.handler.call(this, the);
            }
          } else {
            return event.handler.call(this, the);
          }
        }
      }
    },

    addEvent: function (name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });

      return the;
    }
  };

  //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };

  /**
   * Check shown state
   */
  the.shown = function () {
    return the.state == 'shown';
  };

  /**
   * Check hidden state
   */
  the.hidden = function () {
    return the.state == 'hidden';
  };

  /**
   * Show dialog
   */
  the.show = function () {
    return Plugin.show();
  };

  /**
   * Hide dialog
   */
  the.hide = function () {
    return Plugin.hide();
  };

  /**
   * Attach event
   * @returns {KTToggle}
   */
  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };

  /**
   * Attach event that will be fired once
   * @returns {KTToggle}
   */
  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  };

  // Construct plugin
  Plugin.construct.apply(the, [options]);

  return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = KTDialog;
}

// Component Definition
var KTHeader = function (elementId, options) {
  // Main object
  var the = this;
  var init = false;

  // Get element object
  var element = KTUtil.getById(elementId);
  var body = KTUtil.getBody();

  if (element === undefined) {
    return;
  }

  // Default options
  var defaultOptions = {
    offset: {
      desktop: true,
      tabletAndMobile: true
    },
    releseOnReverse: {
      desktop: false,
      tabletAndMobile: false
    }
  };

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Run plugin
     * @returns {KTHeader}
     */
    construct: function (options) {
      if (KTUtil.data(element).has('header')) {
        the = KTUtil.data(element).get('header');
      } else {
        // reset header
        Plugin.init(options);

        // build header
        Plugin.build();

        KTUtil.data(element).set('header', the);
      }

      return the;
    },

    /**
     * Handles subheader click toggle
     * @returns {KTHeader}
     */
    init: function (options) {
      the.events = [];

      // merge default and user defined options
      the.options = KTUtil.deepExtend({}, defaultOptions, options);
    },

    /**
     * Reset header
     * @returns {KTHeader}
     */
    build: function () {
      var eventTriggerState = true;
      var viewportHeight = KTUtil.getViewPort().height;
      var documentHeight = KTUtil.getDocumentHeight();
      var lastScrollTop = 0;

      window.addEventListener('scroll', function () {
        var offset = 0,
          st, attrName;

        if (KTUtil.isBreakpointDown('lg') && the.options.offset.tabletAndMobile === false) {
          return;
        }

        if (KTUtil.isBreakpointUp('lg') && the.options.offset.desktop === false) {
          return;
        }

        if (KTUtil.isBreakpointUp('lg')) {
          offset = the.options.offset.desktop;
        } else if (KTUtil.isBreakpointDown('lg')) {
          offset = the.options.offset.tabletAndMobile;
        }

        st = KTUtil.getScrollTop();

        if (
          (KTUtil.isBreakpointDown('lg') && the.options.releseOnReverse.tabletAndMobile) ||
          (KTUtil.isBreakpointUp('lg') && the.options.releseOnReverse.desktop)
        ) {
          if (st > offset && lastScrollTop < st) { // down scroll mode
            if (body.hasAttribute('data-header-scroll') === false) {
              body.setAttribute('data-header-scroll', 'on');
            }

            if (eventTriggerState) {
              Plugin.eventTrigger('scrollOn', the);
              eventTriggerState = false;
            }
          } else { // back scroll mode
            if (body.hasAttribute('data-header-scroll') === true) {
              body.removeAttribute('data-header-scroll');
            }

            if (eventTriggerState == false) {
              Plugin.eventTrigger('scrollOff', the);
              eventTriggerState = true;
            }
          }

          lastScrollTop = st;
        } else {
          if (st > offset) { // down scroll mode
            if (body.hasAttribute('data-header-scroll') === false) {
              body.setAttribute('data-header-scroll', 'on');
            }

            if (eventTriggerState) {
              Plugin.eventTrigger('scrollOn', the);
              eventTriggerState = false;
            }
          } else { // back scroll mode
            if (body.hasAttribute('data-header-scroll') === true) {
              body.removeAttribute('data-header-scroll');
            }

            if (eventTriggerState == false) {
              Plugin.eventTrigger('scrollOff', the);
              eventTriggerState = true;
            }
          }
        }
      });
    },

    /**
     * Trigger events
     */
    eventTrigger: function (name, args) {
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];
        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              return event.handler.call(this, the, args);
            }
          } else {
            return event.handler.call(this, the, args);
          }
        }
      }
    },

    addEvent: function (name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
    }
  };

  //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };

  /**
   * Register event
   */
  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };

  ///////////////////////////////
  // ** Plugin Construction ** //
  ///////////////////////////////

  // Run plugin
  Plugin.construct.apply(the, [options]);

  // Init done
  init = true;

  // Return plugin instance
  return the;
};
// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = KTHeader;
}

// Component Definition
var KTMenu = function (elementId, options) {
  // Main object
  var the = this;
  var init = false;

  // Get element object
  var element = KTUtil.getById(elementId);
  var body = KTUtil.getBody();

  if (!element) {
    return;
  }

  // Default options
  var defaultOptions = {
    // scrollable area with Perfect Scroll
    scroll: {
      rememberPosition: false
    },

    // accordion submenu mode
    accordion: {
      slideSpeed: 200, // accordion toggle slide speed in milliseconds
      autoScroll: false, // enable auto scrolling(focus) to the clicked menu item
      autoScrollSpeed: 1200,
      expandAll: true // allow having multiple expanded accordions in the menu
    },

    // dropdown submenu mode
    dropdown: {
      timeout: 500 // timeout in milliseconds to show and hide the hoverable submenu dropdown
    }
  };

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Run plugin
     * @returns {KTMenu}
     */
    construct: function (options) {
      if (KTUtil.data(element).has('menu')) {
        the = KTUtil.data(element).get('menu');
      } else {
        // reset menu
        Plugin.init(options);

        // reset menu
        Plugin.reset();

        // build menu
        Plugin.build();

        KTUtil.data(element).set('menu', the);
      }

      return the;
    },

    /**
     * Handles submenu click toggle
     * @returns {KTMenu}
     */
    init: function (options) {
      the.events = [];

      the.eventHandlers = {};

      // merge default and user defined options
      the.options = KTUtil.deepExtend({}, defaultOptions, options);

      // pause menu
      the.pauseDropdownHoverTime = 0;

      the.uid = KTUtil.getUniqueID();
    },

    update: function (options) {
      // merge default and user defined options
      the.options = KTUtil.deepExtend({}, defaultOptions, options);

      // pause menu
      the.pauseDropdownHoverTime = 0;

      // reset menu
      Plugin.reset();

      the.eventHandlers = {};

      // build menu
      Plugin.build();

      KTUtil.data(element).set('menu', the);
    },

    reload: function () {
      // reset menu
      Plugin.reset();

      // build menu
      Plugin.build();

      // reset submenu props
      Plugin.resetSubmenuProps();
    },

    /**
     * Reset menu
     * @returns {KTMenu}
     */
    build: function () {
      // General accordion submenu toggle
      the.eventHandlers['event_1'] = KTUtil.on(element, '.menu-toggle', 'click', Plugin.handleSubmenuAccordion);

      // Dropdown mode(hoverable)
      if (Plugin.getSubmenuMode() === 'dropdown' || Plugin.isConditionalSubmenuDropdown()) {
        // dropdown submenu - hover toggle
        the.eventHandlers['event_2'] = KTUtil.on(element, '[data-menu-toggle="hover"]', 'mouseover', Plugin.handleSubmenuDrodownHoverEnter);
        the.eventHandlers['event_3'] = KTUtil.on(element, '[data-menu-toggle="hover"]', 'mouseout', Plugin.handleSubmenuDrodownHoverExit);

        // dropdown submenu - click toggle
        the.eventHandlers['event_4'] = KTUtil.on(element, '[data-menu-toggle="click"] > .menu-toggle, [data-menu-toggle="click"] > .menu-link .menu-toggle', 'click', Plugin.handleSubmenuDropdownClick);
        the.eventHandlers['event_5'] = KTUtil.on(element, '[data-menu-toggle="tab"] > .menu-toggle, [data-menu-toggle="tab"] > .menu-link .menu-toggle', 'click', Plugin.handleSubmenuDropdownTabClick);
      }

      // Handle general link click
      the.eventHandlers['event_6'] = KTUtil.on(element, '.menu-item > .menu-link:not(.menu-toggle):not(.menu-link-toggle-skip)', 'click', Plugin.handleLinkClick);

      // Init scrollable menu
      if (the.options.scroll && the.options.scroll.height) {
        Plugin.scrollInit();
      }
    },

    /**
     * Reset menu
     * @returns {KTMenu}
     */
    reset: function () {
      KTUtil.off(element, 'click', the.eventHandlers['event_1']);

      // dropdown submenu - hover toggle
      KTUtil.off(element, 'mouseover', the.eventHandlers['event_2']);
      KTUtil.off(element, 'mouseout', the.eventHandlers['event_3']);

      // dropdown submenu - click toggle
      KTUtil.off(element, 'click', the.eventHandlers['event_4']);
      KTUtil.off(element, 'click', the.eventHandlers['event_5']);

      // handle link click
      KTUtil.off(element, 'click', the.eventHandlers['event_6']);
    },

    /**
     * Init scroll menu
     *
     */
    scrollInit: function () {
      if (the.options.scroll && the.options.scroll.height) {
        KTUtil.scrollDestroy(element, true);
        KTUtil.scrollInit(element, {
          mobileNativeScroll: true,
          windowScroll: false,
          resetHeightOnDestroy: true,
          handleWindowResize: true,
          height: the.options.scroll.height,
          rememberPosition: the.options.scroll.rememberPosition
        });
      } else {
        KTUtil.scrollDestroy(element, true);
      }
    },

    /**
     * Update scroll menu
     */
    scrollUpdate: function () {
      if (the.options.scroll && the.options.scroll.height) {
        KTUtil.scrollUpdate(element);
      }
    },

    /**
     * Scroll top
     */
    scrollTop: function () {
      if (the.options.scroll && the.options.scroll.height) {
        KTUtil.scrollTop(element);
      }
    },

    /**
     * Get submenu mode for current breakpoint and menu state
     * @returns {KTMenu}
     */
    getSubmenuMode: function (el) {
      if (KTUtil.isBreakpointUp('lg')) {
        if (el && KTUtil.hasAttr(el, 'data-menu-toggle') && KTUtil.attr(el, 'data-menu-toggle') == 'hover') {
          return 'dropdown';
        }

        if (KTUtil.isset(the.options.submenu, 'desktop.state.body')) {
          if (KTUtil.hasClasses(body, the.options.submenu.desktop.state.body)) {
            return the.options.submenu.desktop.state.mode;
          } else {
            return the.options.submenu.desktop.default;
          }
        } else if (KTUtil.isset(the.options.submenu, 'desktop')) {
          return the.options.submenu.desktop;
        }
      } else if (KTUtil.isBreakpointUp('md') && KTUtil.isBreakpointDown('lg') && KTUtil.isset(the.options.submenu, 'tablet')) {
        return the.options.submenu.tablet;
      } else if (KTUtil.isBreakpointDown('md') && KTUtil.isset(the.options.submenu, 'mobile')) {
        return the.options.submenu.mobile;
      } else {
        return false;
      }
    },

    /**
     * Get submenu mode for current breakpoint and menu state
     * @returns {KTMenu}
     */
    isConditionalSubmenuDropdown: function () {
      if (KTUtil.isBreakpointUp('lg') && KTUtil.isset(the.options.submenu, 'desktop.state.body')) {
        return true;
      } else {
        return false;
      }
    },


    /**
     * Reset submenu attributes
     * @returns {KTMenu}
     */
    resetSubmenuProps: function (e) {
      var submenus = KTUtil.findAll(element, '.menu-submenu');
      if (submenus) {
        for (var i = 0, len = submenus.length; i < len; i++) {
          KTUtil.css(submenus[0], 'display', '');
          KTUtil.css(submenus[0], 'overflow', '');
        }
      }
    },

    /**
     * Handles submenu hover toggle
     * @returns {KTMenu}
     */
    handleSubmenuDrodownHoverEnter: function (e) {
      if (Plugin.getSubmenuMode(this) === 'accordion') {
        return;
      }

      if (the.resumeDropdownHover() === false) {
        return;
      }

      var item = this;

      if (item.getAttribute('data-hover') == '1') {
        item.removeAttribute('data-hover');
        clearTimeout(item.getAttribute('data-timeout'));
        item.removeAttribute('data-timeout');
      }

      Plugin.showSubmenuDropdown(item);
    },

    /**
     * Handles submenu hover toggle
     * @returns {KTMenu}
     */
    handleSubmenuDrodownHoverExit: function (e) {
      if (the.resumeDropdownHover() === false) {
        return;
      }

      if (Plugin.getSubmenuMode(this) === 'accordion') {
        return;
      }

      var item = this;
      var time = the.options.dropdown.timeout;

      var timeout = setTimeout(function () {
        if (item.getAttribute('data-hover') == '1') {
          Plugin.hideSubmenuDropdown(item, true);
        }
      }, time);

      item.setAttribute('data-hover', '1');
      item.setAttribute('data-timeout', timeout);
    },

    /**
     * Handles submenu click toggle
     * @returns {KTMenu}
     */
    handleSubmenuDropdownClick: function (e) {
      if (Plugin.getSubmenuMode(this) === 'accordion') {
        return;
      }

      var item = this.closest('.menu-item');

      // Trigger click event handlers
      var result = Plugin.eventTrigger('submenuToggle', this, e);
      if (result === false) {
        return;
      }

      if (item.getAttribute('data-menu-submenu-mode') == 'accordion') {
        return;
      }

      if (KTUtil.hasClass(item, 'menu-item-hover') === false) {
        KTUtil.addClass(item, 'menu-item-open-dropdown');
        Plugin.showSubmenuDropdown(item);
      } else {
        KTUtil.removeClass(item, 'menu-item-open-dropdown');
        Plugin.hideSubmenuDropdown(item, true);
      }

      e.preventDefault();
    },

    /**
     * Handles tab click toggle
     * @returns {KTMenu}
     */
    handleSubmenuDropdownTabClick: function (e) {
      if (Plugin.getSubmenuMode(this) === 'accordion') {
        return;
      }
      var item = this.closest('.menu-item');

      // Trigger click event handlers
      var result = Plugin.eventTrigger('submenuToggle', this, e);
      if (result === false) {
        return;
      }

      if (item.getAttribute('data-menu-submenu-mode') == 'accordion') {
        return;
      }

      if (KTUtil.hasClass(item, 'menu-item-hover') == false) {
        KTUtil.addClass(item, 'menu-item-open-dropdown');
        Plugin.showSubmenuDropdown(item);
      }

      e.preventDefault();
    },

    /**
     * Handles link click
     * @returns {KTMenu}
     */
    handleLinkClick: function (e) {
      var submenu = this.closest('.menu-item.menu-item-submenu');

      // Trigger click event handlers
      var result = Plugin.eventTrigger('linkClick', this, e);
      if (result === false) {
        return;
      }

      if (submenu && Plugin.getSubmenuMode(submenu) === 'dropdown') {
        Plugin.hideSubmenuDropdowns();
      }
    },

    /**
     * Handles submenu dropdown close on link click
     * @returns {KTMenu}
     */
    handleSubmenuDropdownClose: function (e, el) {
      // exit if its not submenu dropdown mode
      if (Plugin.getSubmenuMode(el) === 'accordion') {
        return;
      }

      var shown = element.querySelectorAll('.menu-item.menu-item-submenu.menu-item-hover:not(.menu-item-tabs)');

      // check if currently clicked link's parent item ha
      if (shown.length > 0 && KTUtil.hasClass(el, 'menu-toggle') === false && el.querySelectorAll('.menu-toggle').length === 0) {
        // close opened dropdown menus
        for (var i = 0, len = shown.length; i < len; i++) {
          Plugin.hideSubmenuDropdown(shown[0], true);
        }
      }
    },

    /**
     * helper functions
     * @returns {KTMenu}
     */
    handleSubmenuAccordion: function (e, el) {
      var query;
      var item = el ? el : this;

      // Trigger click event handlers
      var result = Plugin.eventTrigger('submenuToggle', this, e);
      if (result === false) {
        return;
      }

      if (Plugin.getSubmenuMode(el) === 'dropdown' && (query = item.closest('.menu-item'))) {
        if (query.getAttribute('data-menu-submenu-mode') != 'accordion') {
          e.preventDefault();
          return;
        }
      }

      var li = item.closest('.menu-item');
      var submenu = KTUtil.child(li, '.menu-submenu, .menu-inner');

      if (KTUtil.hasClass(item.closest('.menu-item'), 'menu-item-open-always')) {
        return;
      }

      if (li && submenu) {
        e.preventDefault();
        var speed = the.options.accordion.slideSpeed;
        var hasClosables = false;

        if (KTUtil.hasClass(li, 'menu-item-open') === false) {
          // hide other accordions
          if (the.options.accordion.expandAll === false) {
            var subnav = item.closest('.menu-nav, .menu-subnav');
            var closables = KTUtil.children(subnav, '.menu-item.menu-item-open.menu-item-submenu:not(.menu-item-here):not(.menu-item-open-always)');

            if (subnav && closables) {
              for (var i = 0, len = closables.length; i < len; i++) {
                var el_ = closables[0];
                var submenu_ = KTUtil.child(el_, '.menu-submenu');
                if (submenu_) {
                  KTUtil.slideUp(submenu_, speed, function () {
                    Plugin.scrollUpdate();
                    KTUtil.removeClass(el_, 'menu-item-open');
                  });
                }
              }
            }
          }

          KTUtil.slideDown(submenu, speed, function () {
            Plugin.scrollToItem(item);
            Plugin.scrollUpdate();

            Plugin.eventTrigger('submenuToggle', submenu, e);
          });

          KTUtil.addClass(li, 'menu-item-open');

        } else {
          KTUtil.slideUp(submenu, speed, function () {
            Plugin.scrollToItem(item);
            Plugin.eventTrigger('submenuToggle', submenu, e);
          });

          KTUtil.removeClass(li, 'menu-item-open');
        }
      }
    },

    /**
     * scroll to item function
     * @returns {KTMenu}
     */
    scrollToItem: function (item) {
      // handle auto scroll for accordion submenus
      if (KTUtil.isBreakpointUp('lg') && the.options.accordion.autoScroll && element.getAttribute('data-menu-scroll') !== '1') {
        KTUtil.scrollTo(item, the.options.accordion.autoScrollSpeed);
      }
    },

    /**
     * Hide submenu dropdown
     * @returns {KTMenu}
     */
    hideSubmenuDropdown: function (item, classAlso) {
      // remove submenu activation class
      if (classAlso) {
        KTUtil.removeClass(item, 'menu-item-hover');
        KTUtil.removeClass(item, 'menu-item-active-tab');
      }

      // clear timeout
      item.removeAttribute('data-hover');

      if (item.getAttribute('data-menu-toggle-class')) {
        KTUtil.removeClass(body, item.getAttribute('data-menu-toggle-class'));
      }

      var timeout = item.getAttribute('data-timeout');
      item.removeAttribute('data-timeout');
      clearTimeout(timeout);
    },

    /**
     * Hide submenu dropdowns
     * @returns {KTMenu}
     */
    hideSubmenuDropdowns: function () {
      var items;
      if (items = element.querySelectorAll('.menu-item-submenu.menu-item-hover:not(.menu-item-tabs):not([data-menu-toggle="tab"])')) {
        for (var j = 0, cnt = items.length; j < cnt; j++) {
          Plugin.hideSubmenuDropdown(items[j], true);
        }
      }
    },

    /**
     * helper functions
     * @returns {KTMenu}
     */
    showSubmenuDropdown: function (item) {
      // close active submenus
      var list = element.querySelectorAll('.menu-item-submenu.menu-item-hover, .menu-item-submenu.menu-item-active-tab');

      if (list) {
        for (var i = 0, len = list.length; i < len; i++) {
          var el = list[i];
          if (item !== el && el.contains(item) === false && item.contains(el) === false) {
            Plugin.hideSubmenuDropdown(el, true);
          }
        }
      }

      // add submenu activation class
      KTUtil.addClass(item, 'menu-item-hover');

      if (item.getAttribute('data-menu-toggle-class')) {
        KTUtil.addClass(body, item.getAttribute('data-menu-toggle-class'));
      }
    },

    /**
     * Handles submenu slide toggle
     * @returns {KTMenu}
     */
    createSubmenuDropdownClickDropoff: function (el) {
      var query;
      var zIndex = (query = KTUtil.child(el, '.menu-submenu') ? KTUtil.css(query, 'z-index') : 0) - 1;

      var dropoff = document.createElement('<div class="menu-dropoff" style="background: transparent; position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: ' + zIndex + '"></div>');

      body.appendChild(dropoff);

      KTUtil.addEvent(dropoff, 'click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        KTUtil.remove(this);
        Plugin.hideSubmenuDropdown(el, true);
      });
    },

    /**
     * Handles submenu hover toggle
     * @returns {KTMenu}
     */
    pauseDropdownHover: function (time) {
      var date = new Date();

      the.pauseDropdownHoverTime = date.getTime() + time;
    },

    /**
     * Handles submenu hover toggle
     * @returns {KTMenu}
     */
    resumeDropdownHover: function () {
      var date = new Date();

      return (date.getTime() > the.pauseDropdownHoverTime ? true : false);
    },

    /**
     * Reset menu's current active item
     * @returns {KTMenu}
     */
    resetActiveItem: function (item) {
      var list;
      var parents;

      list = element.querySelectorAll('.menu-item-active');

      for (var i = 0, len = list.length; i < len; i++) {
        var el = list[0];
        KTUtil.removeClass(el, 'menu-item-active');
        KTUtil.hide(KTUtil.child(el, '.menu-submenu'));
        parents = KTUtil.parents(el, '.menu-item-submenu') || [];

        for (var i_ = 0, len_ = parents.length; i_ < len_; i_++) {
          var el_ = parents[i];
          KTUtil.removeClass(el_, 'menu-item-open');
          KTUtil.hide(KTUtil.child(el_, '.menu-submenu'));
        }
      }

      // close open submenus
      if (the.options.accordion.expandAll === false) {
        if (list = element.querySelectorAll('.menu-item-open')) {
          for (var i = 0, len = list.length; i < len; i++) {
            KTUtil.removeClass(parents[0], 'menu-item-open');
          }
        }
      }
    },

    /**
     * Sets menu's active item
     * @returns {KTMenu}
     */
    setActiveItem: function (item) {
      // reset current active item
      Plugin.resetActiveItem();

      var parents = KTUtil.parents(item, '.menu-item-submenu') || [];
      for (var i = 0, len = parents.length; i < len; i++) {
        KTUtil.addClass(parents[i], 'menu-item-open');
      }

      KTUtil.addClass(item, 'menu-item-active');
    },

    /**
     * Returns page breadcrumbs for the menu's active item
     * @returns {KTMenu}
     */
    getBreadcrumbs: function (item) {
      var query;
      var breadcrumbs = [];
      var link = KTUtil.child(item, '.menu-link');

      breadcrumbs.push({
        text: (query = KTUtil.child(link, '.menu-text') ? query.innerHTML : ''),
        title: link.getAttribute('title'),
        href: link.getAttribute('href')
      });

      var parents = KTUtil.parents(item, '.menu-item-submenu');
      for (var i = 0, len = parents.length; i < len; i++) {
        var submenuLink = KTUtil.child(parents[i], '.menu-link');

        breadcrumbs.push({
          text: (query = KTUtil.child(submenuLink, '.menu-text') ? query.innerHTML : ''),
          title: submenuLink.getAttribute('title'),
          href: submenuLink.getAttribute('href')
        });
      }

      return breadcrumbs.reverse();
    },

    /**
     * Returns page title for the menu's active item
     * @returns {KTMenu}
     */
    getPageTitle: function (item) {
      var query;

      return (query = KTUtil.child(item, '.menu-text') ? query.innerHTML : '');
    },

    /**
     * Trigger events
     */
    eventTrigger: function (name, target, e) {
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];
        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              return event.handler.call(this, target, e);
            }
          } else {
            return event.handler.call(this, target, e);
          }
        }
      }
    },

    addEvent: function (name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
    },

    removeEvent: function (name) {
      if (the.events[name]) {
        delete the.events[name];
      }
    }
  };

  //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };

  /**
   * Update scroll
   */
  the.scrollUpdate = function () {
    return Plugin.scrollUpdate();
  };

  /**
   * Re-init scroll
   */
  the.scrollReInit = function () {
    return Plugin.scrollInit();
  };

  /**
   * Scroll top
   */
  the.scrollTop = function () {
    return Plugin.scrollTop();
  };

  /**
   * Set active menu item
   */
  the.setActiveItem = function (item) {
    return Plugin.setActiveItem(item);
  };

  the.reload = function () {
    return Plugin.reload();
  };

  the.update = function (options) {
    return Plugin.update(options);
  };

  /**
   * Set breadcrumb for menu item
   */
  the.getBreadcrumbs = function (item) {
    return Plugin.getBreadcrumbs(item);
  };

  /**
   * Set page title for menu item
   */
  the.getPageTitle = function (item) {
    return Plugin.getPageTitle(item);
  };

  /**
   * Get submenu mode
   */
  the.getSubmenuMode = function (el) {
    return Plugin.getSubmenuMode(el);
  };

  /**
   * Hide dropdown
   * @returns {Object}
   */
  the.hideDropdown = function (item) {
    Plugin.hideSubmenuDropdown(item, true);
  };

  /**
   * Hide dropdowns
   * @returns {Object}
   */
  the.hideDropdowns = function () {
    Plugin.hideSubmenuDropdowns();
  };

  /**
   * Disable menu for given time
   * @returns {Object}
   */
  the.pauseDropdownHover = function (time) {
    Plugin.pauseDropdownHover(time);
  };

  /**
   * Disable menu for given time
   * @returns {Object}
   */
  the.resumeDropdownHover = function () {
    return Plugin.resumeDropdownHover();
  };

  /**
   * Register event
   */
  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };

  the.off = function (name) {
    return Plugin.removeEvent(name);
  };

  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  };

  ///////////////////////////////
  // ** Plugin Construction ** //
  ///////////////////////////////

  // Run plugin
  Plugin.construct.apply(the, [options]);

  // Handle plugin on window resize
  KTUtil.addResizeHandler(function () {
    if (init) {
      the.reload();
    }
  });

  // Init done
  init = true;

  // Return plugin instance
  return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = KTMenu;
}

// Plugin global lazy initialization
document.addEventListener("click", function (e) {
  console.log(e)
  var body = KTUtil.getByTagName('body')[0];
  var query;
  if (query = body.querySelectorAll('.menu-nav .menu-item.menu-item-submenu.menu-item-hover:not(.menu-item-tabs)[data-menu-toggle="click"]')) {
    console.log(query)
    for (var i = 0, len = query.length; i < len; i++) {
      
      var element = query[i].closest('.menu-nav').parentNode;
      if (element) {
        var the = KTUtil.data(element).get('menu');

        if (!the) {
          break;
        }

        if (!the || the.getSubmenuMode() !== 'dropdown') {
          break;
        }

        if (e.target !== element && element.contains(e.target) === false) {
          the.hideDropdowns();
        }
      }
    }
  }
});


// Component Definition
var KTOffcanvas = function (elementId, options) {
  // Main object
  var the = this;
  var init = false;

  // Get element object
  var element = KTUtil.getById(elementId);
  var body = KTUtil.getBody();

  if (!element) {
    return;
  }

  // Default options
  var defaultOptions = {
    customClass: ''
  };

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    construct: function (options) {
      if (KTUtil.data(element).has('offcanvas')) {
        the = KTUtil.data(element).get('offcanvas');
      } else {
        // Reset offcanvas
        Plugin.init(options);

        // Build offcanvas
        Plugin.build();

        KTUtil.data(element).set('offcanvas', the);
      }

      return the;
    },

    init: function (options) {
      the.events = [];

      // merge default and user defined options
      the.options = KTUtil.deepExtend({}, defaultOptions, options);

      the.classBase = the.options.baseClass;
      the.classCustom = the.options.customClass;
      the.classShown = the.classBase + '-on';
      the.classOverlay = the.classBase + '-overlay';
      the.target;

      the.state = KTUtil.hasClass(element, the.classShown) ? 'shown' : 'hidden';
    },

    build: function () {
      // offcanvas toggle
      if (the.options.toggleBy) {
        if (typeof the.options.toggleBy === 'string') {
          KTUtil.addEvent(KTUtil.getById(the.options.toggleBy), 'click', function (e) {
            e.preventDefault();
            the.target = this;
            Plugin.toggle();
          });
        } else if (the.options.toggleBy && the.options.toggleBy[0]) {
          if (the.options.toggleBy[0].target) {
            for (var i in the.options.toggleBy) {
              KTUtil.addEvent(KTUtil.getById(the.options.toggleBy[i].target), 'click', function (e) {
                e.preventDefault();
                the.target = this;
                Plugin.toggle();
              });
            }
          } else {
            for (var i in the.options.toggleBy) {
              KTUtil.addEvent(KTUtil.getById(the.options.toggleBy[i]), 'click', function (e) {
                e.preventDefault();
                the.target = this;
                Plugin.toggle();
              });
            }
          }

        } else if (the.options.toggleBy && the.options.toggleBy.target) {
          KTUtil.addEvent(KTUtil.getById(the.options.toggleBy.target), 'click', function (e) {
            e.preventDefault();
            the.target = this;
            Plugin.toggle();
          });
        }
      }

      // offcanvas close
      var closeBy = KTUtil.getById(the.options.closeBy);
      if (closeBy) {
        KTUtil.addEvent(closeBy, 'click', function (e) {
          e.preventDefault();
          the.target = this;
          Plugin.hide();
        });
      }
    },

    isShown: function () {
      return (the.state == 'shown' ? true : false);
    },

    toggle: function () {
      ;
      Plugin.eventTrigger('toggle');

      if (the.state == 'shown') {
        Plugin.hide();
      } else {
        Plugin.show();
      }
    },

    show: function () {
      if (the.state == 'shown') {
        return;
      }

      Plugin.eventTrigger('beforeShow');

      Plugin.toggleClass('show');

      // Offcanvas panel
      KTUtil.addClass(body, the.classShown);
      KTUtil.addClass(element, the.classShown);

      if (the.classCustom.length > 0) {
        KTUtil.addClass(body, the.classCustom);
      }

      the.state = 'shown';

      if (the.options.overlay) {
        the.overlay = KTUtil.insertAfter(document.createElement('DIV'), element);
        KTUtil.addClass(the.overlay, the.classOverlay);

        KTUtil.addEvent(the.overlay, 'click', function (e) {
          e.stopPropagation();
          e.preventDefault();
          Plugin.hide(the.target);
        });
      }

      Plugin.eventTrigger('afterShow');
    },

    hide: function () {
      if (the.state == 'hidden') {
        return;
      }

      Plugin.eventTrigger('beforeHide');

      Plugin.toggleClass('hide');

      KTUtil.removeClass(body, the.classShown);
      KTUtil.addClass(body, the.classPush);
      KTUtil.removeClass(element, the.classShown);

      if (the.classCustom.length > 0) {
        KTUtil.removeClass(body, the.classCustom);
      }

      the.state = 'hidden';

      if (the.options.overlay && the.overlay) {
        KTUtil.remove(the.overlay);
      }

      Plugin.eventTrigger('afterHide');
    },

    toggleClass: function (mode) {
      var id = KTUtil.attr(the.target, 'id');
      var toggleBy;

      if (the.options.toggleBy && the.options.toggleBy[0] && the.options.toggleBy[0].target) {
        for (var i in the.options.toggleBy) {
          if (the.options.toggleBy[i].target === id) {
            toggleBy = the.options.toggleBy[i];
          }
        }
      } else if (the.options.toggleBy && the.options.toggleBy.target) {
        toggleBy = the.options.toggleBy;
      }

      if (toggleBy) {
        var el = KTUtil.getById(toggleBy.target);

        if (mode === 'show') {
          KTUtil.addClass(el, toggleBy.state);
        }

        if (mode === 'hide') {
          KTUtil.removeClass(el, toggleBy.state);
        }
      }
    },

    eventTrigger: function (name, args) {
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];
        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              return event.handler.call(this, the, args);
            }
          } else {
            return event.handler.call(this, the, args);
          }
        }
      }
    },

    addEvent: function (name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
    }
  };

  //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options
   * @param options
   */
  the.setDefaults = function (options) {
    defaultOptions = options;
  };

  /**
   * Check if canvas is shown
   * @returns {boolean}
   */
  the.isShown = function () {
    return Plugin.isShown();
  };

  /**
   * Set to hide the canvas
   */
  the.hide = function () {
    return Plugin.hide();
  };

  /**
   * Set to show the canvas
   */
  the.show = function () {
    return Plugin.show();
  };

  /**
   * Attach event
   * @param name
   * @param handler
   */
  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };

  /**
   * Attach event that will be fired once
   * @param name
   * @param handler
   */
  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  };

  ///////////////////////////////
  // ** Plugin Construction ** //
  ///////////////////////////////

  // Run plugin
  Plugin.construct.apply(the, [options]);

  // Init done
  init = true;

  // Return plugin instance
  return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = KTOffcanvas;
}


var KTScrolltop = function (elementId, options) {
  // Main object
  var the = this;
  var init = false;

  // Get element object
  var element = KTUtil.getById(elementId);
  var body = KTUtil.getBody();

  if (!element) {
    return;
  }

  // Default options
  var defaultOptions = {
    offset: 300,
    speed: 6000
  };

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Run plugin
     * @returns {mscrolltop}
     */
    construct: function (options) {
      if (KTUtil.data(element).has('scrolltop')) {
        the = KTUtil.data(element).get('scrolltop');
      } else {
        // reset scrolltop
        Plugin.init(options);

        // build scrolltop
        Plugin.build();

        KTUtil.data(element).set('scrolltop', the);
      }

      return the;
    },

    /**
     * Handles subscrolltop click toggle
     * @returns {mscrolltop}
     */
    init: function (options) {
      the.events = [];

      // merge default and user defined options
      the.options = KTUtil.deepExtend({}, defaultOptions, options);
    },

    build: function () {
      var timer;

      window.addEventListener('scroll', function () {
        KTUtil.throttle(timer, function () {
          Plugin.handle();
        }, 200);
      });

      // handle button click
      KTUtil.addEvent(element, 'click', Plugin.scroll);
    },

    /**
     * Handles scrolltop click scrollTop
     */
    handle: function () {
      var pos = KTUtil.getScrollTop(); // current vertical position

      if (pos > the.options.offset) {
        if (body.hasAttribute('data-scrolltop') === false) {
          body.setAttribute('data-scrolltop', 'on');
        }
      } else {
        if (body.hasAttribute('data-scrolltop') === true) {
          body.removeAttribute('data-scrolltop');
        }
      }
    },

    /**
     * Handles scrolltop click scrollTop
     */
    scroll: function (e) {
      e.preventDefault();

      KTUtil.scrollTop(0, the.options.speed);
    },


    /**
     * Trigger events
     */
    eventTrigger: function (name, args) {
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];
        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              return event.handler.call(this, the, args);
            }
          } else {
            return event.handler.call(this, the, args);
          }
        }
      }
    },

    addEvent: function (name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });
    }
  };

  //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };

  /**
   * Get subscrolltop mode
   */
  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };

  /**
   * Set scrolltop content
   * @returns {mscrolltop}
   */
  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  };

  ///////////////////////////////
  // ** Plugin Construction ** //
  ///////////////////////////////

  // Run plugin
  Plugin.construct.apply(the, [options]);

  // Init done
  init = true;

  // Return plugin instance
  return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = KTScrolltop;
}

// Component Definition 
var KTToggle = function (elementId, options) {
  // Main object
  var the = this;
  var init = false;

  // Get element object
  var element = KTUtil.getById(elementId);

  if (!element) {
    return;
  }

  // Default options
  var defaultOptions = {};

  ////////////////////////////
  // ** Private Methods  ** //
  ////////////////////////////

  var Plugin = {
    /**
     * Construct
     */

    construct: function (options) {
      if (KTUtil.data(element).has('toggle')) {
        the = KTUtil.data(element).get('toggle');
      } else {
        // reset menu
        Plugin.init(options);

        // build menu
        Plugin.build();

        KTUtil.data(element).set('toggle', the);
      }

      return the;
    },

    /**
     * Handles subtoggle click toggle
     */
    init: function (options) {
      the.element = element;
      the.events = [];

      // options
      the.options = options;

      //alert(the.options.target.tagName);
      the.target = KTUtil.getById(the.options.target);

      the.targetState = the.options.targetState;
      the.toggleState = the.options.toggleState;

      the.state = KTUtil.hasClasses(the.target, the.targetState) ? 'on' : 'off';
    },

    /**
     * Setup toggle
     */
    build: function () {
      KTUtil.addEvent(element, 'mouseup', Plugin.toggle);
    },

    /**
     * Handles offcanvas click toggle
     */
    toggle: function (e) {
      Plugin.eventTrigger('beforeToggle');

      if (the.state == 'off') {
        Plugin.toggleOn();
      } else {
        Plugin.toggleOff();
      }

      Plugin.eventTrigger('afterToggle');

      e.preventDefault();

      return the;
    },

    /**
     * Handles toggle click toggle
     */
    toggleOn: function () {
      Plugin.eventTrigger('beforeOn');

      KTUtil.addClass(the.target, the.targetState);

      if (the.toggleState) {
        KTUtil.addClass(element, the.toggleState);
      }

      the.state = 'on';

      Plugin.eventTrigger('afterOn');

      Plugin.eventTrigger('toggle');

      return the;
    },

    /**
     * Handles toggle click toggle
     */
    toggleOff: function () {
      Plugin.eventTrigger('beforeOff');

      KTUtil.removeClass(the.target, the.targetState);

      if (the.toggleState) {
        KTUtil.removeClass(element, the.toggleState);
      }

      the.state = 'off';

      Plugin.eventTrigger('afterOff');

      Plugin.eventTrigger('toggle');

      return the;
    },

    /**
     * Trigger events
     */
    eventTrigger: function (name) {
      for (var i = 0; i < the.events.length; i++) {
        var event = the.events[i];

        if (event.name == name) {
          if (event.one == true) {
            if (event.fired == false) {
              the.events[i].fired = true;
              return event.handler.call(this, the);
            }
          } else {
            return event.handler.call(this, the);
          }
        }
      }
    },

    addEvent: function (name, handler, one) {
      the.events.push({
        name: name,
        handler: handler,
        one: one,
        fired: false
      });

      return the;
    }
  };

  //////////////////////////
  // ** Public Methods ** //
  //////////////////////////

  /**
   * Set default options
   */

  the.setDefaults = function (options) {
    defaultOptions = options;
  };

  /**
   * Get toggle state
   */
  the.getState = function () {
    return the.state;
  };

  /**
   * Toggle
   */
  the.toggle = function () {
    return Plugin.toggle();
  };

  /**
   * Toggle on
   */
  the.toggleOn = function () {
    return Plugin.toggleOn();
  };

  /**
   * Toggle off
   */
  the.toggleOff = function () {
    return Plugin.toggleOff();
  };

  /**
   * Attach event
   * @returns {KTToggle}
   */
  the.on = function (name, handler) {
    return Plugin.addEvent(name, handler);
  };

  /**
   * Attach event that will be fired once
   * @returns {KTToggle}
   */
  the.one = function (name, handler) {
    return Plugin.addEvent(name, handler, true);
  };

  // Construct plugin
  Plugin.construct.apply(the, [options]);

  return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = KTToggle;
}

var KTLayoutHeader = function () {
  // Private properties
  var _element;
  var _elementForMobile;
  var _object;

  // Private functions
  var _init = function () {
    var options = {
      offset: {
        desktop: 300,
        tabletAndMobile: false
      },
      releseOnReverse: {
        desktop: true,
        tabletAndMobile: false
      }
    };

    _object = new KTHeader(_element, options);
  }

  // Get height
  var _getHeight = function () {
    var height = 0;

    if (_element) {
      height = KTUtil.actualHeight(_element) + 1;
    }

    return height;
  }

  // Get height
  var _getHeightForMobile = function () {
    var height;

    height = KTUtil.actualHeight(_elementForMobile);

    return height;
  }

  // Public methods
  return {
    init: function (id, idForMobile) {

      try {
        _element = KTUtil.getById(id);
      } catch (error) {
        console.log(error)
      }
      _elementForMobile = KTUtil.getById(idForMobile);

      if (!_element) {
        return;
      }

      // Initialize
      _init();
    },

    isFixed: function () {
      return KTUtil.hasClass(KTUtil.getBody(), 'header-fixed')
    },

    isFixedForMobile: function () {
      return KTUtil.hasClass(KTUtil.getBody(), 'header-mobile-fixed')
    },

    getElement: function () {
      return _element;
    },

    getElementForMobile: function () {
      return _elementForMobile;
    },

    getHeader: function () {
      return _object;
    },

    getHeight: function () {
      return _getHeight();
    },

    getHeightForMobile: function () {
      return _getHeightForMobile();
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutHeader;
}

var KTLayoutAsideMenu = function () {
  // Private properties
  var _element;
  var _menuObject;

  // Initialize
  var _init = function () {
    var menuDesktopMode = (KTUtil.attr(_element, 'data-menu-dropdown') === '1' ? 'dropdown' : 'accordion');
    var scroll;

    if (KTUtil.isBreakpointDown('lg') && KTUtil.attr(_element, 'data-menu-scroll') === '1') {
      scroll = {
        rememberPosition: true, // remember position on page reload
        height: function () { // calculate available scrollable area height
          var height = parseInt(KTUtil.getViewPort().height);

          height = height - (parseInt(KTUtil.css(_element, 'marginBottom')) + parseInt(KTUtil.css(_element, 'marginTop')));

          return height;
        }
      };
    }

    _menuObject = new KTMenu(_element, {
      // Vertical scroll
      scroll: scroll,

      // Submenu setup
      submenu: {
        desktop: menuDesktopMode,
        tablet: 'accordion', // menu set to accordion in tablet mode
        mobile: 'accordion' // menu set to accordion in mobile mode
      },

      // Accordion setup
      accordion: {
        expandAll: false // allow having multiple expanded accordions in the menu
      }
    });
  }

  // Public methods
  return {
    init: function (id) {
      _element = KTUtil.getById(id);

      if (!_element) {
        return;
      }

      // Initialize menu
      _init();
    },

    getElement: function () {
      return _element;
    },

    getMenu: function () {
      return _menuObject;
    },

    pauseDropdownHover: function (time) {
      if (_menuObject) {
        _menuObject.pauseDropdownHover(time);
      }
    },

    closeMobileOffcanvas: function () {
      if (_menuObject && KTUtil.isMobileDevice()) {
        _menuObject.hide();
      }
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutAsideMenu;
}

var KTLayoutAside = function () {
  // Private properties
  var _body;
  var _element;
  var _offcanvasObject;

  // Private functions
  // Initialize
  var _init = function () {
    var offcanvasClass = KTUtil.hasClass(_element, 'aside-offcanvas-default') ? 'aside-offcanvas-default' : 'aside';

    // Initialize mobile aside offcanvas
    _offcanvasObject = new KTOffcanvas(_element, {
      baseClass: offcanvasClass,
      overlay: true,
      closeBy: 'kt_aside_close_btn',
      toggleBy: {
        target: 'kt_aside_mobile_toggle',
        state: 'mobile-toggle-active'
      }
    });
  }

  // Public methods
  return {
    init: function (id) {
      _element = KTUtil.getById(id);
      _body = KTUtil.getBody();

      if (!_element) {
        return;
      }

      // Initialize
      _init();
    },

    getElement: function () {
      return _element;
    },

    getOffcanvas: function () {
      return _offcanvasObject;
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutAside;
}

var KTLayoutContent = function () {
  // Private properties
  var _element;

  // Private functions
  var _getHeight = function () {
    var height;

    height = KTUtil.getViewPort().height;

    if (_element) {
      height = height - parseInt(KTUtil.css(_element, 'paddingTop')) - parseInt(KTUtil.css(_element, 'paddingBottom'));
    }

    height = height - KTLayoutHeader.getHeight();
    height = height - KTLayoutSubheader.getHeight();
    height = height - KTLayoutFooter.getHeight();

    return height;
  }

  // Public methods
  return {
    init: function (id) {
      _element = KTUtil.getById(id);
    },

    getHeight: function () {
      return _getHeight();
    },

    getElement: function () {
      return _element;
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutContent;
}

var KTLayoutFooter = function () {
  // Private properties
  var _element;

  // Private functions
  var _getHeight = function () {
    var height = 0;

    if (_element) {
      height = KTUtil.actualHeight(_element);
    }

    return height;
  }

  // Public methods
  return {
    init: function (id) {
      _element = KTUtil.getById(id);
    },

    getHeight: function () {
      return _getHeight();
    },

    getElement: function () {
      return _element;
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutFooter;
}

var KTLayoutHeaderMenu = function () {
  // Private properties
  var _menuElement;
  var _menuObject;
  var _offcanvasElement;
  var _offcanvasObject;

  // Private functions
  var _init = function () {
    _offcanvasObject = new KTOffcanvas(_offcanvasElement, {
      overlay: true,
      baseClass: 'header-menu-wrapper',
      closeBy: 'kt_header_menu_mobile_close_btn',
      toggleBy: {
        target: 'kt_header_mobile_toggle',
        state: 'burger-icon-active'
      }
    });

    _menuObject = new KTMenu(_menuElement, {
      submenu: {
        desktop: 'dropdown',
        tablet: 'accordion',
        mobile: 'accordion'
      },
      accordion: {
        slideSpeed: 200, // accordion toggle slide speed in milliseconds
        expandAll: false // allow having multiple expanded accordions in the menu
      }
    });
  }

  // Public methods
  return {
    init: function (menuId, offcanvasId) {
      _menuElement = KTUtil.getById(menuId);
      _offcanvasElement = KTUtil.getById(offcanvasId);

      if (!_menuElement) {
        return;
      }

      // Initialize menu
      _init();
    },

    getMenuElement: function () {
      return _menuElement;
    },

    getOffcanvasElement: function () {
      return _offcanvasElement;
    },

    getMenu: function () {
      return _menuObject;
    },

    pauseDropdownHover: function (time) {
      if (_menuObject) {
        _menuObject.pauseDropdownHover(time);
      }
    },

    getOffcanvas: function () {
      return _offcanvasObject;
    },

    closeMobileOffcanvas: function () {
      if (_menuObject && KTUtil.isMobileDevice()) {
        _offcanvasObject.hide();
      }
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutHeaderMenu;
}

var KTLayoutHeaderTopbar = function () {
  // Private properties
  var _toggleElement;
  var _toggleObject;

  // Private functions
  var _init = function () {
    _toggleObject = new KTToggle(_toggleElement, {
      target: KTUtil.getBody(),
      targetState: 'topbar-mobile-on',
      toggleState: 'active'
    });
  }

  // Public methods
  return {
    init: function (id) {
      _toggleElement = KTUtil.getById(id);

      if (!_toggleElement) {
        return;
      }

      // Initialize
      _init();
    },

    getToggleElement: function () {
      return _toggleElement;
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutHeaderTopbar;
}

var KTLayoutScrolltop = function () {
  var t;

  return {
    init: function (e) {

      try {
        t = KTUtil.getById(e);
      } catch (error) {
        console.log(error)
      }
      

      if (!t) {
        return;
      }

      // Initialize
      new KTScrolltop(t, {
        offset: 300,
        speed: 600
      })
    },
    getElement: function () {
      return t
    }
  }
}();

if (typeof module !== 'undefined') {
  module.exports = KTLayoutScrolltop;
}

var KTLayoutStickyCard = function () {
  // Private properties
  var _element;
  var _object;

  // Private functions
  var _init = function () {
    var offset = 300;

    if (typeof KTLayoutHeader !== 'undefined') {
      offset = KTLayoutHeader.getHeight();
    }

    _object = new KTCard(_element, {
      sticky: {
        offset: offset,
        zIndex: 90,
        position: {
          top: function () {
            var pos = 0;
            var body = KTUtil.getBody();

            if (KTUtil.isBreakpointUp('lg')) {
              if (typeof KTLayoutHeader !== 'undefined' && KTLayoutHeader.isFixed()) {
                pos = pos + KTLayoutHeader.getHeight();
              }

              if (typeof KTLayoutSubheader !== 'undefined' && KTLayoutSubheader.isFixed()) {
                pos = pos + KTLayoutSubheader.getHeight();
              }
            } else {
              if (typeof KTLayoutHeader !== 'undefined' && KTLayoutHeader.isFixedForMobile()) {
                pos = pos + KTLayoutHeader.getHeightForMobile();
              }
            }

            pos = pos - 1; // remove header border width

            return pos;
          },
          left: function (card) {
            return KTUtil.offset(_element).left;
          },
          right: function (card) {
            var body = KTUtil.getBody();

            var cardWidth = parseInt(KTUtil.css(_element, 'width'));
            var bodyWidth = parseInt(KTUtil.css(body, 'width'));
            var cardOffsetLeft = KTUtil.offset(_element).left;

            return bodyWidth - cardWidth - cardOffsetLeft;
          }
        }
      }
    });

    _object.initSticky();

    KTUtil.addResizeHandler(function () {
      _object.updateSticky();
    });
  }

  // Public methods
  return {
    init: function (id) {
      _element = KTUtil.getById(id);

      if (!_element) {
        return;
      }

      // Initialize
      _init();
    },

    update: function () {
      if (_object) {
        _object.updateSticky();
      }
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutStickyCard;
}

var KTLayoutStretchedCard = function () {
  // Private properties
  var _element;

  // Private functions
  var _init = function () {
    var scroll = KTUtil.find(_element, '.card-scroll');
    var cardBody = KTUtil.find(_element, '.card-body');
    var cardHeader = KTUtil.find(_element, '.card-header');

    var height = KTLayoutContent.getHeight();

    height = height - parseInt(KTUtil.actualHeight(cardHeader));

    height = height - parseInt(KTUtil.css(_element, 'marginTop')) - parseInt(KTUtil.css(_element, 'marginBottom'));
    height = height - parseInt(KTUtil.css(_element, 'paddingTop')) - parseInt(KTUtil.css(_element, 'paddingBottom'));

    height = height - parseInt(KTUtil.css(cardBody, 'paddingTop')) - parseInt(KTUtil.css(cardBody, 'paddingBottom'));
    height = height - parseInt(KTUtil.css(cardBody, 'marginTop')) - parseInt(KTUtil.css(cardBody, 'marginBottom'));

    height = height - 3;

    KTUtil.css(scroll, 'height', height + 'px');
  }

  // Public methods
  return {
    init: function (id) {
      _element = KTUtil.getById(id);

      if (!_element) {
        return;
      }

      // Initialize
      _init();

      // Re-calculate on window resize
      KTUtil.addResizeHandler(function () {
        _init();
      });
    },

    update: function () {
      _init();
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutStretchedCard;
}

var KTLayoutSubheader = function () {
  // Private properties
  var _element;

  // Private functions
  var _getHeight = function () {
    var height = 0;

    if (_element) {
      height = KTUtil.actualHeight(_element);
    }

    return height;
  }

  // Public methods
  return {
    init: function (id) {
      _element = KTUtil.getById(id);

      if (!_element) {
        return;
      }
    },

    isFixed: function () {
      return KTUtil.hasClass(KTUtil.getBody(), 'subheader-fixed');
    },

    getElement: function () {
      return _element;
    },

    getHeight: function () {
      return _getHeight();
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutSubheader;
}

var KTLayoutQuickCartPanel = function () {
  // Private properties
  var _element;
  var _offcanvasObject;

  // Private functions
  var _init = function () {
    _offcanvasObject = new KTOffcanvas(_element, {
      overlay: true,
      baseClass: 'offcanvas',
      placement: 'right',
      closeBy: 'kt_quick_cart_close',
      toggleBy: 'kt_quick_cart_toggle'
    });

    var header = KTUtil.find(_element, '.offcanvas-header');
    var content = KTUtil.find(_element, '.offcanvas-content');
    var wrapper = KTUtil.find(_element, '.offcanvas-wrapper');
    var footer = KTUtil.find(_element, '.offcanvas-footer');

    KTUtil.scrollInit(wrapper, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function () {
        var height = parseInt(KTUtil.getViewPort().height);

        if (header) {
          height = height - parseInt(KTUtil.actualHeight(header));
          height = height - parseInt(KTUtil.css(header, 'marginTop'));
          height = height - parseInt(KTUtil.css(header, 'marginBottom'));
        }

        if (content) {
          height = height - parseInt(KTUtil.css(content, 'marginTop'));
          height = height - parseInt(KTUtil.css(content, 'marginBottom'));
        }

        if (wrapper) {
          height = height - parseInt(KTUtil.css(wrapper, 'marginTop'));
          height = height - parseInt(KTUtil.css(wrapper, 'marginBottom'));
        }

        if (footer) {
          height = height - parseInt(KTUtil.actualHeight(footer));
          height = height - parseInt(KTUtil.css(footer, 'marginTop'));
          height = height - parseInt(KTUtil.css(footer, 'marginBottom'));
        }

        height = height - parseInt(KTUtil.css(_element, 'paddingTop'));
        height = height - parseInt(KTUtil.css(_element, 'paddingBottom'));

        height = height - 2;

        return height;
      }
    });
  }

  // Public methods
  return {
    init: function (id) {
      _element = KTUtil.getById(id);

      if (!_element) {
        return;
      }

      // Initialize
      _init();
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutQuickCartPanel;
}

var KTLayoutExamples = function () {

  var initDefaultMode = function (element) {
    var elements = element;
    if (typeof elements === 'undefined') {
      elements = document.querySelectorAll('.example:not(.example-compact):not(.example-hover):not(.example-basic)');
    }

    for (var i = 0; i < elements.length; ++i) {
      var example = elements[i];
      var copy = KTUtil.find(example, '.example-copy');

      var clipboard = new ClipboardJS(copy, {
        target: function (trigger) {
          var example = trigger.closest('.example');
          var el = KTUtil.find(example, '.example-code .tab-pane.active');

          if (!el) {
            el = KTUtil.find(example, '.example-code');
          }

          return el;
        }
      });

      clipboard.on('success', function (e) {
        KTUtil.addClass(e.trigger, 'example-copied');
        e.clearSelection();

        setTimeout(function () {
          KTUtil.removeClass(e.trigger, 'example-copied');
        }, 2000);
      });
    }
  }

  var initCompactMode = function (element) {
    var example, code, toggle, copy, clipboard;
    var elements = element;
    if (typeof elements === 'undefined') {
      var elements = document.querySelectorAll('.example.example-compact');
    }

    for (var i = 0; i < elements.length; ++i) {
      var example = elements[i];
      var toggle = KTUtil.find(example, '.example-toggle');
      var copy = KTUtil.find(example, '.example-copy');

      // Handle toggle
      KTUtil.addEvent(toggle, 'click', function () {
        var example = this.closest('.example');
        var code = KTUtil.find(example, '.example-code');
        var the = this;

        if (KTUtil.hasClass(this, 'example-toggled')) {
          KTUtil.slideUp(code, 300, function () {
            KTUtil.removeClass(the, 'example-toggled');
            KTUtil.removeClass(code, 'example-code-on');
            KTUtil.hide(code);
          });
        } else {
          KTUtil.addClass(code, 'example-code-on');
          KTUtil.addClass(this, 'example-toggled');
          KTUtil.slideDown(code, 300, function () {
            KTUtil.show(code);
          });
        }
      });

      // Handle copy
      var clipboard = new ClipboardJS(copy, {
        target: function (trigger) {
          var example = trigger.closest('.example');
          var el = KTUtil.find(example, '.example-code .tab-pane.active');

          if (!el) {
            el = KTUtil.find(example, '.example-code');
          }

          return el;
        }
      });

      clipboard.on('success', function (e) {
        KTUtil.addClass(e.trigger, 'example-copied');
        e.clearSelection();

        setTimeout(function () {
          KTUtil.removeClass(e.trigger, 'example-copied');
        }, 2000);
      });
    }
  }

  return {
    init: function (element, options) {
      initDefaultMode(element);
      initCompactMode(element);
    }
  };
}();

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = KTLayoutExamples;
}

var KTLayoutDemoPanel = function () {
  // Private properties
  var _element;
  var _offcanvasObject;

  // Private functions
  var _init = function () {
    _offcanvasObject = new KTOffcanvas(_element, {
      overlay: true,
      baseClass: 'offcanvas',
      placement: 'right',
      closeBy: 'kt_demo_panel_close',
      toggleBy: 'kt_demo_panel_toggle'
    });

    var header = KTUtil.find(_element, '.offcanvas-header');
    var content = KTUtil.find(_element, '.offcanvas-content');
    var wrapper = KTUtil.find(_element, '.offcanvas-wrapper');
    var footer = KTUtil.find(_element, '.offcanvas-footer');

    KTUtil.scrollInit(wrapper, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function () {
        var height = parseInt(KTUtil.getViewPort().height);

        if (header) {
          height = height - parseInt(KTUtil.actualHeight(header));
          height = height - parseInt(KTUtil.css(header, 'marginTop'));
          height = height - parseInt(KTUtil.css(header, 'marginBottom'));
        }

        if (content) {
          height = height - parseInt(KTUtil.css(content, 'marginTop'));
          height = height - parseInt(KTUtil.css(content, 'marginBottom'));
        }

        if (wrapper) {
          height = height - parseInt(KTUtil.css(wrapper, 'marginTop'));
          height = height - parseInt(KTUtil.css(wrapper, 'marginBottom'));
        }

        if (footer) {
          height = height - parseInt(KTUtil.actualHeight(footer));
          height = height - parseInt(KTUtil.css(footer, 'marginTop'));
          height = height - parseInt(KTUtil.css(footer, 'marginBottom'));
        }

        height = height - parseInt(KTUtil.css(_element, 'paddingTop'));
        height = height - parseInt(KTUtil.css(_element, 'paddingBottom'));

        height = height - 2;

        return height;
      }
    });

    if (typeof offcanvas !== 'undefined' && offcanvas.length === 0) {
      offcanvas.on('hide', function () {
        var expires = new Date(new Date().getTime() + 60 * 60 * 1000); // expire in 60 minutes from now
        KTCookie.setCookie('kt_demo_panel_shown', 1, {
          expires: expires
        });
      });
    }
  }

  var _remind = function () {
    if (!(encodeURI(window.location.hostname) == 'keenthemes.com' || encodeURI(window.location.hostname) == 'www.keenthemes.com')) {
      return;
    }

    setTimeout(function () {
      if (!KTCookie.getCookie('kt_demo_panel_shown')) {
        var expires = new Date(new Date().getTime() + 15 * 60 * 1000); // expire in 15 minutes from now
        KTCookie.setCookie('kt_demo_panel_shown', 1, {
          expires: expires
        });
        if (typeof _offcanvasObject !== 'undefined') {
          _offcanvasObject.show();
        }
      }
    }, 4000);
  }

  // Public methods
  return {
    init: function (id) {
      _element = KTUtil.getById(id);

      if (!_element) {
        return;
      }

      // Initialize
      _init();

      // Remind
      _remind();
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutDemoPanel;
}

// Class definition
var KTLayoutChat = function () {
  // Private functions
  var _init = function (element) {
    var scrollEl = KTUtil.find(element, '.scroll');
    var cardBodyEl = KTUtil.find(element, '.card-body');
    var cardHeaderEl = KTUtil.find(element, '.card-header');
    var cardFooterEl = KTUtil.find(element, '.card-footer');

    if (!scrollEl) {
      return;
    }

    // initialize perfect scrollbar(see:  https://github.com/utatti/perfect-scrollbar)
    KTUtil.scrollInit(scrollEl, {
      windowScroll: false, // allow browser scroll when the scroll reaches the end of the side
      mobileNativeScroll: true, // enable native scroll for mobile
      desktopNativeScroll: false, // disable native scroll and use custom scroll for desktop
      resetHeightOnDestroy: true, // reset css height on scroll feature destroyed
      handleWindowResize: true, // recalculate hight on window resize
      rememberPosition: true, // remember scroll position in cookie
      height: function () { // calculate height
        var height;

        if (KTUtil.isBreakpointDown('lg')) { // Mobile mode
          return KTUtil.hasAttr(scrollEl, 'data-mobile-height') ? parseInt(KTUtil.attr(scrollEl, 'data-mobile-height')) : 400;
        } else if (KTUtil.isBreakpointUp('lg') && KTUtil.hasAttr(scrollEl, 'data-height')) { // Desktop Mode
          return parseInt(KTUtil.attr(scrollEl, 'data-height'));
        } else {
          height = KTLayoutContent.getHeight();

          if (scrollEl) {
            height = height - parseInt(KTUtil.css(scrollEl, 'margin-top')) - parseInt(KTUtil.css(scrollEl, 'margin-bottom'));
          }

          if (cardHeaderEl) {
            height = height - parseInt(KTUtil.css(cardHeaderEl, 'height'));
            height = height - parseInt(KTUtil.css(cardHeaderEl, 'margin-top')) - parseInt(KTUtil.css(cardHeaderEl, 'margin-bottom'));
          }

          if (cardBodyEl) {
            height = height - parseInt(KTUtil.css(cardBodyEl, 'padding-top')) - parseInt(KTUtil.css(cardBodyEl, 'padding-bottom'));
          }

          if (cardFooterEl) {
            height = height - parseInt(KTUtil.css(cardFooterEl, 'height'));
            height = height - parseInt(KTUtil.css(cardFooterEl, 'margin-top')) - parseInt(KTUtil.css(cardFooterEl, 'margin-bottom'));
          }
        }

        // Remove additional space
        height = height - 2;

        return height;
      }
    });

    // attach events
    KTUtil.on(element, '.card-footer textarea', 'keydown', function (e) {
      if (e.keyCode == 13) {
        _handeMessaging(element);
        e.preventDefault();

        return false;
      }
    });

    KTUtil.on(element, '.card-footer .chat-send', 'click', function (e) {
      _handeMessaging(element);
    });
  }

  var _handeMessaging = function (element) {
    var messagesEl = KTUtil.find(element, '.messages');
    var scrollEl = KTUtil.find(element, '.scroll');
    var textarea = KTUtil.find(element, 'textarea');

    if (textarea.value.length === 0) {
      return;
    }

    var node = document.createElement("DIV");
    KTUtil.addClass(node, 'd-flex flex-column mb-5 align-items-end');

    var html = '';
    html += '<div class="d-flex align-items-center">';
    html += '	<div>';
    html += '		<span class="text-muted font-size-sm">2 Hours</span>';
    html += '		<a href="#" class="text-dark-75 text-hover-primary font-weight-bold font-size-h6">You</a>';
    html += '	</div>';
    html += '	<div class="symbol symbol-circle symbol-40 ml-3">';
    html += '		<img alt="Pic" src="assets/media/users/300_12.jpg"/>';
    html += '	</div>';
    html += '</div>';
    html += '<div class="mt-2 rounded p-5 bg-light-primary text-dark-50 font-weight-bold font-size-lg text-right max-w-400px">' + textarea.value + '</div>';

    KTUtil.setHTML(node, html);
    messagesEl.appendChild(node);
    textarea.value = '';
    scrollEl.scrollTop = parseInt(KTUtil.css(messagesEl, 'height'));

    var ps;
    if (ps = KTUtil.data(scrollEl).get('ps')) {
      ps.update();
    }

    setTimeout(function () {
      var node = document.createElement("DIV");
      KTUtil.addClass(node, 'd-flex flex-column mb-5 align-items-start');

      var html = '';
      html += '<div class="d-flex align-items-center">';
      html += '	<div class="symbol symbol-circle symbol-40 mr-3">';
      html += '		<img alt="Pic" src="assets/media/users/300_12.jpg"/>';
      html += '	</div>';
      html += '	<div>';
      html += '		<a href="#" class="text-dark-75 text-hover-primary font-weight-bold font-size-h6">Matt Pears</a>';
      html += '		<span class="text-muted font-size-sm">Just now</span>';
      html += '	</div>';
      html += '</div>';
      html += '<div class="mt-2 rounded p-5 bg-light-success text-dark-50 font-weight-bold font-size-lg text-left max-w-400px">';
      html += 'Right before vacation season we have the next Big Deal for you.';
      html += '</div>';

      KTUtil.setHTML(node, html);
      messagesEl.appendChild(node);
      textarea.value = '';
      scrollEl.scrollTop = parseInt(KTUtil.css(messagesEl, 'height'));

      var ps;
      if (ps = KTUtil.data(scrollEl).get('ps')) {
        ps.update();
      }
    }, 2000);
  }

  // Public methods
  return {
    init: function () {
      // init modal chat example
      _init(KTUtil.getById('kt_chat_modal'));

      // trigger click to show popup modal chat on page load
      if (encodeURI(window.location.hostname) == 'keenthemes.com' || encodeURI(window.location.hostname) == 'www.keenthemes.com') {
        setTimeout(function () {
          if (!KTCookie.getCookie('kt_app_chat_shown')) {
            var expires = new Date(new Date().getTime() + 60 * 60 * 1000); // expire in 60 minutes from now

            KTCookie.setCookie('kt_app_chat_shown', 1, {
              expires: expires
            });

            if (KTUtil.getById('kt_app_chat_launch_btn')) {
              KTUtil.getById('kt_app_chat_launch_btn').click();
            }
          }
        }, 2000);
      }
    },

    setup: function (element) {
      _init(element);
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutChat;
}

var KTLayoutQuickActions = function () {
  // Private properties
  var _element;
  var _offcanvasObject;

  // Private functions
  var _init = function () {
    var header = KTUtil.find(_element, '.offcanvas-header');
    var content = KTUtil.find(_element, '.offcanvas-content');

    _offcanvasObject = new KTOffcanvas(_element, {
      overlay: true,
      baseClass: 'offcanvas',
      placement: 'right',
      closeBy: 'kt_quick_actions_close',
      toggleBy: 'kt_quick_actions_toggle'
    });

    KTUtil.scrollInit(content, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function () {
        var height = parseInt(KTUtil.getViewPort().height);

        if (header) {
          height = height - parseInt(KTUtil.actualHeight(header));
          height = height - parseInt(KTUtil.css(header, 'marginTop'));
          height = height - parseInt(KTUtil.css(header, 'marginBottom'));
        }

        if (content) {
          height = height - parseInt(KTUtil.css(content, 'marginTop'));
          height = height - parseInt(KTUtil.css(content, 'marginBottom'));
        }

        height = height - parseInt(KTUtil.css(_element, 'paddingTop'));
        height = height - parseInt(KTUtil.css(_element, 'paddingBottom'));

        height = height - 2;

        return height;
      }
    });
  }

  // Public methods
  return {
    init: function (id) {
      _element = KTUtil.getById(id);

      if (!_element) {
        return;
      }

      // Initialize
      _init();
    },

    getElement: function () {
      return _element;
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutQuickActions;
}

var KTLayoutQuickNotifications = function () {
  // Private properties
  var _element;
  var _offcanvasObject;

  // Private functions
  var _init = function () {
    var header = KTUtil.find(_element, '.offcanvas-header');
    var content = KTUtil.find(_element, '.offcanvas-content');

    _offcanvasObject = new KTOffcanvas(_element, {
      overlay: true,
      baseClass: 'offcanvas',
      placement: 'right',
      closeBy: 'kt_quick_notifications_close',
      toggleBy: 'kt_quick_notifications_toggle'
    });

    KTUtil.scrollInit(content, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function () {
        var height = parseInt(KTUtil.getViewPort().height);

        if (header) {
          height = height - parseInt(KTUtil.actualHeight(header));
          height = height - parseInt(KTUtil.css(header, 'marginTop'));
          height = height - parseInt(KTUtil.css(header, 'marginBottom'));
        }

        if (content) {
          height = height - parseInt(KTUtil.css(content, 'marginTop'));
          height = height - parseInt(KTUtil.css(content, 'marginBottom'));
        }

        height = height - parseInt(KTUtil.css(_element, 'paddingTop'));
        height = height - parseInt(KTUtil.css(_element, 'paddingBottom'));

        height = height - 2;

        return height;
      }
    });
  }

  // Public methods
  return {
    init: function (id) {
      _element = KTUtil.getById(id);

      if (!_element) {
        return;
      }

      // Initialize
      _init();
    },

    getElement: function () {
      return _element;
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutQuickNotifications;
}

var KTLayoutQuickPanel = function () {
  // Private properties
  var _element;
  var _offcanvasObject;
  var _notificationsElement;
  var _logsElement;
  var _settingsElement;

  // Private functions
  var _getContentHeight = function () {
    var height;

    var header = KTUtil.find(_element, '.offcanvas-header');
    var content = KTUtil.find(_element, '.offcanvas-content');

    var height = parseInt(KTUtil.getViewPort().height);

    if (header) {
      height = height - parseInt(KTUtil.actualHeight(header));
      height = height - parseInt(KTUtil.css(header, 'marginTop'));
      height = height - parseInt(KTUtil.css(header, 'marginBottom'));
    }

    if (content) {
      height = height - parseInt(KTUtil.css(content, 'marginTop'));
      height = height - parseInt(KTUtil.css(content, 'marginBottom'));
    }

    height = height - parseInt(KTUtil.css(_element, 'paddingTop'));
    height = height - parseInt(KTUtil.css(_element, 'paddingBottom'));

    height = height - 2;

    return height;
  }

  var _init = function () {
    _offcanvasObject = new KTOffcanvas(_element, {
      overlay: true,
      baseClass: 'offcanvas',
      placement: 'right',
      closeBy: 'kt_quick_panel_close',
      toggleBy: 'kt_quick_panel_toggle'
    });
  }

  var _initNotifications = function () {
    KTUtil.scrollInit(_notificationsElement, {
      mobileNativeScroll: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function () {
        return _getContentHeight();
      }
    });
  }

  var _initLogs = function () {
    KTUtil.scrollInit(_logsElement, {
      mobileNativeScroll: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function () {
        return _getContentHeight();
      }
    });
  }

  var _initSettings = function () {
    KTUtil.scrollInit(_settingsElement, {
      mobileNativeScroll: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function () {
        return _getContentHeight();
      }
    });
  }

  var _updateScrollbars = function () {
    $(_element).find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      KTUtil.scrollUpdate(_notificationsElement);
      KTUtil.scrollUpdate(_logsElement);
      KTUtil.scrollUpdate(_settingsElement);
    });
  }

  // Public methods
  return {
    init: function (id) {
      _element = KTUtil.getById(id);
      _notificationsElement = KTUtil.getById('kt_quick_panel_notifications');
      _logsElement = KTUtil.getById('kt_quick_panel_logs');
      _settingsElement = KTUtil.getById('kt_quick_panel_settings');

      _init();
      _initNotifications();
      _initLogs();
      _initSettings();

      _updateScrollbars();
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutQuickPanel;
}

var KTLayoutQuickSearch = function () {
  // Private properties
  var _element;
  var _offcanvasObject;

  // Private functions
  var _init = function () {
    var header = KTUtil.find(_element, '.offcanvas-header');
    var content = KTUtil.find(_element, '.offcanvas-content');
    var form = KTUtil.find(_element, '.quick-search-form');
    var results = KTUtil.find(_element, '.quick-search-wrapper');

    _offcanvasObject = new KTOffcanvas(_element, {
      overlay: true,
      baseClass: 'offcanvas',
      placement: 'right',
      closeBy: 'kt_quick_search_close',
      toggleBy: 'kt_quick_search_toggle'
    });

    KTUtil.scrollInit(results, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function () {
        var height = parseInt(KTUtil.getViewPort().height);

        if (header) {
          height = height - parseInt(KTUtil.actualHeight(header));
          height = height - parseInt(KTUtil.css(header, 'marginTop'));
          height = height - parseInt(KTUtil.css(header, 'marginBottom'));
        }

        if (content) {
          height = height - parseInt(KTUtil.css(content, 'marginTop'));
          height = height - parseInt(KTUtil.css(content, 'marginBottom'));
        }

        if (results) {
          height = height - parseInt(KTUtil.actualHeight(form));
          height = height - parseInt(KTUtil.css(form, 'marginTop'));
          height = height - parseInt(KTUtil.css(form, 'marginBottom'));

          height = height - parseInt(KTUtil.css(results, 'marginTop'));
          height = height - parseInt(KTUtil.css(results, 'marginBottom'));
        }

        height = height - parseInt(KTUtil.css(_element, 'paddingTop'));
        height = height - parseInt(KTUtil.css(_element, 'paddingBottom'));

        height = height - 2;

        return height;
      }
    });
  }

  // Public methods
  return {
    init: function (id) {
      _element = KTUtil.getById(id);

      if (!_element) {
        return;
      }

      // Initialize
      _init();
    },

    getElement: function () {
      return _element;
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutQuickSearch;
}

var KTLayoutQuickUser = function () {
  // Private properties
  var _element;
  var _offcanvasObject;

  // Private functions
  var _init = function () {
    var header = KTUtil.find(_element, '.offcanvas-header');
    var content = KTUtil.find(_element, '.offcanvas-content');

    _offcanvasObject = new KTOffcanvas(_element, {
      overlay: true,
      baseClass: 'offcanvas',
      placement: 'right',
      closeBy: 'kt_quick_user_close',
      toggleBy: 'kt_quick_user_toggle'
    });

    KTUtil.scrollInit(content, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: function () {
        var height = parseInt(KTUtil.getViewPort().height);

        if (header) {
          height = height - parseInt(KTUtil.actualHeight(header));
          height = height - parseInt(KTUtil.css(header, 'marginTop'));
          height = height - parseInt(KTUtil.css(header, 'marginBottom'));
        }

        if (content) {
          height = height - parseInt(KTUtil.css(content, 'marginTop'));
          height = height - parseInt(KTUtil.css(content, 'marginBottom'));
        }

        height = height - parseInt(KTUtil.css(_element, 'paddingTop'));
        height = height - parseInt(KTUtil.css(_element, 'paddingBottom'));

        height = height - 2;

        return height;
      }
    });
  }

  // Public methods
  return {
    init: function (id) {
      _element = KTUtil.getById(id);

      if (!_element) {
        return;
      }

      // Initialize
      _init();
    },

    getElement: function () {
      return _element;
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutQuickUser;
}

var KTLayoutSearch = function () {
  // Private properties
  var _target;
  var _form;
  var _input;
  var _closeIcon;
  var _resultWrapper;
  var _resultDropdown;
  var _resultDropdownToggle;
  var _closeIconContainer;
  var _inputGroup;
  var _query = '';

  var _hasResult = false;
  var _timeout = false;
  var _isProcessing = false;
  var _requestTimeout = 200; // ajax request fire timeout in milliseconds
  var _spinnerClass = 'spinner spinner-sm spinner-primary';
  var _resultClass = 'quick-search-has-result';
  var _minLength = 2;

  // Private functions
  var _showProgress = function () {
    _isProcessing = true;
    KTUtil.addClass(_closeIconContainer, _spinnerClass);

    if (_closeIcon) {
      KTUtil.hide(_closeIcon);
    }
  }

  var _hideProgress = function () {
    _isProcessing = false;
    KTUtil.removeClass(_closeIconContainer, _spinnerClass);

    if (_closeIcon) {
      if (_input.value.length < _minLength) {
        KTUtil.hide(_closeIcon);
      } else {
        KTUtil.show(_closeIcon, 'flex');
      }
    }
  }

  var _showDropdown = function () {
    if (_resultDropdownToggle && !KTUtil.hasClass(_resultDropdown, 'show')) {
      $(_resultDropdownToggle).dropdown('toggle');
      $(_resultDropdownToggle).dropdown('update');
    }
  }

  var _hideDropdown = function () {
    if (_resultDropdownToggle && KTUtil.hasClass(_resultDropdown, 'show')) {
      $(_resultDropdownToggle).dropdown('toggle');
    }
  }

  var _processSearch = function () {
    if (_hasResult && _query === _input.value) {
      _hideProgress();
      KTUtil.addClass(_target, _resultClass);
      _showDropdown();
      KTUtil.scrollUpdate(_resultWrapper);

      return;
    }

    _query = _input.value;

    KTUtil.removeClass(_target, _resultClass);
    _showProgress();
    _hideDropdown();

    setTimeout(function () {
      $.ajax({
        url: HOST_URL + '/api/quick_search.php',
        data: {
          query: _query
        },
        dataType: 'html',
        success: function (res) {
          _hasResult = true;
          _hideProgress();
          KTUtil.addClass(_target, _resultClass);
          KTUtil.setHTML(_resultWrapper, res);
          _showDropdown();
          KTUtil.scrollUpdate(_resultWrapper);
        },
        error: function (res) {
          _hasResult = false;
          _hideProgress();
          KTUtil.addClass(_target, _resultClass);
          KTUtil.setHTML(_resultWrapper, '<span class="font-weight-bold text-muted">Connection error. Please try again later..</div>');
          _showDropdown();
          KTUtil.scrollUpdate(_resultWrapper);
        }
      });
    }, 1000);
  }

  var _handleCancel = function (e) {
    _input.value = '';
    _query = '';
    _hasResult = false;
    KTUtil.hide(_closeIcon);
    KTUtil.removeClass(_target, _resultClass);
    _hideDropdown();
  }

  var _handleSearch = function () {
    if (_input.value.length < _minLength) {
      _hideProgress();
      _hideDropdown();

      return;
    }

    if (_isProcessing == true) {
      return;
    }

    if (_timeout) {
      clearTimeout(_timeout);
    }

    _timeout = setTimeout(function () {
      _processSearch();
    }, _requestTimeout);
  }

  // Public methods
  return {
    init: function (id) {
      _target = KTUtil.getById(id);

      if (!_target) {
        return;
      }

      _form = KTUtil.find(_target, '.quick-search-form');
      _input = KTUtil.find(_target, '.form-control');
      _closeIcon = KTUtil.find(_target, '.quick-search-close');
      _resultWrapper = KTUtil.find(_target, '.quick-search-wrapper');
      _resultDropdown = KTUtil.find(_target, '.dropdown-menu');
      _resultDropdownToggle = KTUtil.find(_target, '[data-toggle="dropdown"]');
      _inputGroup = KTUtil.find(_target, '.input-group');
      _closeIconContainer = KTUtil.find(_target, '.input-group .input-group-append');

      // Attach input keyup handler
      KTUtil.addEvent(_input, 'keyup', _handleSearch);
      KTUtil.addEvent(_input, 'focus', _handleSearch);

      // Prevent enter click
      _form.onkeypress = function (e) {
        var key = e.charCode || e.keyCode || 0;
        if (key == 13) {
          e.preventDefault();
        }
      }

      KTUtil.addEvent(_closeIcon, 'click', _handleCancel);
    }
  };
};

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutSearch;
}

var KTLayoutSearchInline = KTLayoutSearch;
var KTLayoutSearchOffcanvas = KTLayoutSearch;

var KTImageInput = function (t, e) {
  var a = this,
    n = KTUtil.getById(t);
  KTUtil.getBody();
  if (n) {
    var i = {
        editMode: !1
      },
      o = {
        construct: function (t) {
          return KTUtil.data(n).has("imageinput") ? a = KTUtil.data(n).get("imageinput") : (o.init(t),
              o.build(),
              KTUtil.data(n).set("imageinput", a)),
            a
        },
        init: function (t) {
          a.element = n,
            a.events = [],
            a.input = KTUtil.find(n, 'input[type="file"]'),
            a.wrapper = KTUtil.find(n, ".image-input-wrapper"),
            a.cancel = KTUtil.find(n, '[data-action="cancel"]'),
            a.remove = KTUtil.find(n, '[data-action="remove"]'),
            a.src = KTUtil.css(a.wrapper, "backgroundImage"),
            a.hidden = KTUtil.find(n, 'input[type="hidden"]'),
            a.options = KTUtil.deepExtend({}, i, t)
        },
        build: function () {
          KTUtil.addEvent(a.input, "change", function (t) {
              if (t.preventDefault(),
                a.input && a.input.files && a.input.files[0]) {
                var e = new FileReader;
                e.onload = function (t) {
                    KTUtil.css(a.wrapper, "background-image", "url(" + t.target.result + ")")
                  },
                  e.readAsDataURL(a.input.files[0]),
                  KTUtil.addClass(a.element, "image-input-changed"),
                  KTUtil.removeClass(a.element, "image-input-empty"),
                  o.eventTrigger("change")
              }
            }),
            KTUtil.addEvent(a.cancel, "click", function (t) {
              t.preventDefault(),
                o.eventTrigger("cancel"),
                KTUtil.removeClass(a.element, "image-input-changed"),
                KTUtil.removeClass(a.element, "image-input-empty"),
                KTUtil.css(a.wrapper, "background-image", a.src),
                a.input.value = "",
                a.hidden && (a.hidden.value = "0")
            }),
            KTUtil.addEvent(a.remove, "click", function (t) {
              t.preventDefault(),
                o.eventTrigger("remove"),
                KTUtil.removeClass(a.element, "image-input-changed"),
                KTUtil.addClass(a.element, "image-input-empty"),
                KTUtil.css(a.wrapper, "background-image", "none"),
                a.input.value = "",
                a.hidden && (a.hidden.value = "1")
            })
        },
        eventTrigger: function (t) {
          for (var e = 0; e < a.events.length; e++) {
            var n = a.events[e];
            if (n.name == t) {
              if (1 != n.one)
                return n.handler.call(this, a);
              if (0 == n.fired)
                return a.events[e].fired = !0,
                  n.handler.call(this, a)
            }
          }
        },
        addEvent: function (t, e, n) {
          return a.events.push({
              name: t,
              handler: e,
              one: n,
              fired: !1
            }),
            a
        }
      };
    return a.setDefaults = function (t) {
        i = t
      },
      a.on = function (t, e) {
        return o.addEvent(t, e)
      },
      a.one = function (t, e) {
        return o.addEvent(t, e, !0)
      },
      o.construct.apply(a, [e]),
      a
  }
};
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTImageInput);

var KTWizard = function (t, e) {
  var a = this,
    n = KTUtil.getById(t);
  KTUtil.getBody();
  if (n) {
    var i = {
        startStep: 1,
        clickableSteps: !1
      },
      o = {
        construct: function (t) {
          return KTUtil.data(n).has("wizard") ? a = KTUtil.data(n).get("wizard") : (o.init(t),
              o.build(),
              KTUtil.data(n).set("wizard", a)),
            a
        },
        init: function (t) {
          a.element = n,
            a.events = [],
            a.options = KTUtil.deepExtend({}, i, t),
            a.steps = KTUtil.findAll(n, '[data-wizard-type="step"]'),
            a.btnSubmit = KTUtil.find(n, '[data-wizard-type="action-submit"]'),
            a.btnNext = KTUtil.find(n, '[data-wizard-type="action-next"]'),
            a.btnPrev = KTUtil.find(n, '[data-wizard-type="action-prev"]'),
            a.btnLast = KTUtil.find(n, '[data-wizard-type="action-last"]'),
            a.btnFirst = KTUtil.find(n, '[data-wizard-type="action-first"]'),
            a.events = [],
            a.currentStep = 1,
            a.stopped = !1,
            a.totalSteps = a.steps.length,
            a.options.startStep > 1 && o.goTo(a.options.startStep),
            o.updateUI()
        },
        build: function () {
          KTUtil.addEvent(a.btnNext, "click", function (t) {
              t.preventDefault(),
                o.goTo(o.getNextStep(), !0)
            }),
            KTUtil.addEvent(a.btnPrev, "click", function (t) {
              t.preventDefault(),
                o.goTo(o.getPrevStep(), !0)
            }),
            KTUtil.addEvent(a.btnFirst, "click", function (t) {
              t.preventDefault(),
                o.goTo(o.getFirstStep(), !0)
            }),
            KTUtil.addEvent(a.btnLast, "click", function (t) {
              t.preventDefault(),
                o.goTo(o.getLastStep(), !0)
            }),
            !0 === a.options.clickableSteps && KTUtil.on(n, '[data-wizard-type="step"]', "click", function () {
              var t = KTUtil.index(this) + 1;
              t !== a.currentStep && o.goTo(t, !0)
            })
        },
        goTo: function (t, e) {
          if (!(t === a.currentStep || t > a.totalSteps || t < 0)) {
            var n;
            if (t = t ? parseInt(t) : o.getNextStep(),
              !0 === e && (n = t > a.currentStep ? o.eventTrigger("beforeNext") : o.eventTrigger("beforePrev")),
              !0 !== a.stopped)
              return !1 !== n && (!0 === e && o.eventTrigger("beforeChange"),
                  a.currentStep = t,
                  o.updateUI(),
                  !0 === e && o.eventTrigger("change")),
                !0 === e && (t > a.startStep ? o.eventTrigger("afterNext") : o.eventTrigger("afterPrev")),
                a;
            a.stopped = !1
          }
        },
        stop: function () {
          a.stopped = !0
        },
        start: function () {
          a.stopped = !1
        },
        isLastStep: function () {
          return a.currentStep === a.totalSteps
        },
        isFirstStep: function () {
          return 1 === a.currentStep
        },
        isBetweenStep: function () {
          return !1 === o.isLastStep() && !1 === o.isFirstStep()
        },
        updateUI: function () {
          var t = "",
            e = a.currentStep - 1;
          t = o.isLastStep() ? "last" : o.isFirstStep() ? "first" : "between",
            KTUtil.attr(a.element, "data-wizard-state", t);
          var n = KTUtil.findAll(a.element, '[data-wizard-type="step"]');
          if (n && n.length > 0)
            for (var i = 0, l = n.length; i < l; i++)
              i == e ? KTUtil.attr(n[i], "data-wizard-state", "current") : i < e ? KTUtil.attr(n[i], "data-wizard-state", "done") : KTUtil.attr(n[i], "data-wizard-state", "pending");
          var r = KTUtil.findAll(a.element, '[data-wizard-type="step-info"]');
          if (r && r.length > 0)
            for (i = 0,
              l = r.length; i < l; i++)
              i == e ? KTUtil.attr(r[i], "data-wizard-state", "current") : KTUtil.removeAttr(r[i], "data-wizard-state");
          var s = KTUtil.findAll(a.element, '[data-wizard-type="step-content"]');
          if (s && s.length > 0)
            for (i = 0,
              l = s.length; i < l; i++)
              i == e ? KTUtil.attr(s[i], "data-wizard-state", "current") : KTUtil.removeAttr(s[i], "data-wizard-state")
        },
        getNextStep: function () {
          return a.totalSteps >= a.currentStep + 1 ? a.currentStep + 1 : a.totalSteps
        },
        getPrevStep: function () {
          return a.currentStep - 1 >= 1 ? a.currentStep - 1 : 1
        },
        eventTrigger: function (t, e) {
          for (var n = 0; n < a.events.length; n++) {
            var i = a.events[n];
            if (i.name == t) {
              if (1 != i.one)
                return i.handler.call(this, a);
              if (0 == i.fired)
                return a.events[n].fired = !0,
                  i.handler.call(this, a)
            }
          }
        },
        addEvent: function (t, e, n) {
          return a.events.push({
              name: t,
              handler: e,
              one: n,
              fired: !1
            }),
            a
        }
      };
    return a.setDefaults = function (t) {
        i = t
      },
      a.goNext = function (t) {
        return o.goTo(o.getNextStep(), t)
      },
      a.goPrev = function (t) {
        return o.goTo(o.getPrevStep(), t)
      },
      a.goLast = function (t) {
        return o.goTo(o.getLastStep(), t)
      },
      a.goFirst = function (t) {
        return o.goTo(o.getFirstStep(), t)
      },
      a.goTo = function (t, e) {
        return o.goTo(t, e)
      },
      a.stop = function () {
        return o.stop()
      },
      a.start = function () {
        return o.start()
      },
      a.getStep = function () {
        return a.currentStep
      },
      a.isLastStep = function () {
        return o.isLastStep()
      },
      a.isFirstStep = function () {
        return o.isFirstStep()
      },
      a.on = function (t, e) {
        return o.addEvent(t, e)
      },
      a.one = function (t, e) {
        return o.addEvent(t, e, !0)
      },
      o.construct.apply(a, [e]),
      a
  }
};
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTWizard),
  function (t) {
    var e = "KTDatatable",
      a = KTUtil,
      n = KTApp;
    if (void 0 === a)
      throw new Error("Util class is required and must be included before KTDatatable");
    t.fn.KTDatatable = function (i) {
        if (0 !== t(this).length) {
          var o = this;
          o.debug = !1,
            o.API = {
              record: null,
              value: null,
              params: null
            };
          var l = {
            isInit: !1,
            cellOffset: 110,
            iconOffset: 15,
            stateId: "meta",
            ajaxParams: {},
            pagingObject: {},
            init: function (e) {
              var a, n = !1;
              null === e.data.source && (l.extractTable(),
                  n = !0),
                l.setupBaseDOM.call(),
                l.setupDOM(o.table),
                t(o).on("datatable-on-layout-updated", l.afterRender),
                o.debug && l.stateRemove(l.stateId),
                l.setDataSourceQuery(l.getOption("data.source.read.params.query")),
                t.each(l.getOption("extensions"), function (e, a) {
                  "function" == typeof t.fn.KTDatatable[e] && ("object" != typeof a && (a = t.extend({}, a)),
                    new t.fn.KTDatatable[e](o, a))
                }),
                l.spinnerCallback(!0),
                "remote" !== e.data.type && "local" !== e.data.type || (!1 === e.data.saveState && l.stateRemove(l.stateId),
                  "local" === e.data.type && "object" == typeof e.data.source && (o.dataSet = o.originalDataSet = l.dataMapCallback(e.data.source)),
                  l.dataRender()),
                n && (t(o.tableHead).find("tr").remove(),
                  t(o.tableFoot).find("tr").remove()),
                l.setHeadTitle(),
                l.getOption("layout.footer") && l.setHeadTitle(o.tableFoot),
                void 0 !== e.layout.header && !1 === e.layout.header && t(o.table).find("thead").remove(),
                void 0 !== e.layout.footer && !1 === e.layout.footer && t(o.table).find("tfoot").remove(),
                null !== e.data.type && "local" !== e.data.type || (l.setupCellField.call(),
                  l.setupTemplateCell.call(),
                  l.setupSubDatatable.call(),
                  l.setupSystemColumn.call(),
                  l.redraw());
              var i = !1;
              t(window).resize(function () {
                  t(this).width() !== a && (a = t(this).width(),
                      l.fullRender()),
                    i || (a = t(this).width(),
                      i = !0)
                }),
                t(o).height("");
              var r = "";
              return t(l.getOption("search.input")).on("keyup", function (e) {
                  if (!l.getOption("search.onEnter") || 13 === e.which) {
                    var a = t(this).val();
                    r !== a && (l.search(a),
                      r = a)
                  }
                }),
                o
            },
            extractTable: function () {
              var e = [],
                n = t(o).find("tr:first-child th").get().map(function (a, n) {
                  var o = t(a).data("field"),
                    l = t(a).data("title");
                  void 0 === o && (o = t(a).text().trim()),
                    void 0 === l && (l = t(a).text().trim());
                  var r = {
                    field: o,
                    title: l
                  };
                  for (var s in i.columns)
                    i.columns[s].field === o && (r = t.extend(!0, {}, i.columns[s], r));
                  return e.push(r),
                    o
                });
              i.columns = e;
              var l = [],
                r = [];
              t(o).find("tr").each(function () {
                  t(this).find("td").length && l.push(t(this).prop("attributes"));
                  var e = {};
                  t(this).find("td").each(function (t, a) {
                      e[n[t]] = a.innerHTML.trim()
                    }),
                    a.isEmpty(e) || r.push(e)
                }),
                i.data.attr.rowProps = l,
                i.data.source = r
            },
            layoutUpdate: function () {
              l.setupSubDatatable.call(),
                l.setupSystemColumn.call(),
                l.setupHover.call(),
                void 0 === i.detail && 1 === l.getDepth() && l.lockTable.call(),
                l.resetScroll(),
                l.isLocked() || (l.redraw.call(),
                  l.isSubtable() || !0 !== l.getOption("rows.autoHide") || l.autoHide(),
                  t(o.table).find(".datatable-row").css("height", "")),
                l.columnHide.call(),
                l.rowEvenOdd.call(),
                l.sorting.call(),
                l.scrollbar.call(),
                l.isInit || (l.dropdownFix(),
                  t(o).trigger("datatable-on-init", {
                    table: t(o.wrap).attr("id"),
                    options: i
                  }),
                  l.isInit = !0),
                t(o).trigger("datatable-on-layout-updated", {
                  table: t(o.wrap).attr("id")
                })
            },
            dropdownFix: function () {
              var e;
              t("body").on("show.bs.dropdown", ".datatable .datatable-body", function (a) {
                  e = t(a.target).find(".dropdown-menu"),
                    t("body").append(e.detach()),
                    e.css("display", "block"),
                    e.position({
                      my: "right top",
                      at: "right bottom",
                      of: t(a.relatedTarget)
                    }),
                    o.closest(".modal").length && e.css("z-index", "2000")
                }).on("hide.bs.dropdown", ".datatable .datatable-body", function (a) {
                  t(a.target).append(e.detach()),
                    e.hide()
                }),
                t(window).on("resize", function (t) {
                  void 0 !== e && e.hide()
                })
            },
            lockTable: function () {
              var e = {
                lockEnabled: !1,
                init: function () {
                  e.lockEnabled = l.lockEnabledColumns(),
                    0 === e.lockEnabled.left.length && 0 === e.lockEnabled.right.length || e.enable()
                },
                enable: function () {
                  t(o.table).find("thead,tbody,tfoot").each(function () {
                    var a = this;
                    0 === t(this).find(".datatable-lock").length && t(this).ready(function () {
                      ! function (a) {
                        if (t(a).find(".datatable-lock").length > 0)
                          l.log("Locked container already exist in: ", a);
                        else if (0 !== t(a).find(".datatable-row").length) {
                          var n = t("<div/>").addClass("datatable-lock datatable-lock-left"),
                            i = t("<div/>").addClass("datatable-lock datatable-lock-scroll"),
                            r = t("<div/>").addClass("datatable-lock datatable-lock-right");
                          t(a).find(".datatable-row").each(function () {
                              var e = t("<tr/>").addClass("datatable-row").data("obj", t(this).data("obj")).appendTo(n),
                                a = t("<tr/>").addClass("datatable-row").data("obj", t(this).data("obj")).appendTo(i),
                                o = t("<tr/>").addClass("datatable-row").data("obj", t(this).data("obj")).appendTo(r);
                              t(this).find(".datatable-cell").each(function () {
                                  var n = t(this).data("locked");
                                  void 0 !== n ? (void 0 === n.left && !0 !== n || t(this).appendTo(e),
                                    void 0 !== n.right && t(this).appendTo(o)) : t(this).appendTo(a)
                                }),
                                t(this).remove()
                            }),
                            e.lockEnabled.left.length > 0 && (t(o.wrap).addClass("datatable-lock"),
                              t(n).appendTo(a)),
                            (e.lockEnabled.left.length > 0 || e.lockEnabled.right.length > 0) && t(i).appendTo(a),
                            e.lockEnabled.right.length > 0 && (t(o.wrap).addClass("datatable-lock"),
                              t(r).appendTo(a))
                        } else
                          l.log("No row exist in: ", a)
                      }(a)
                    })
                  })
                }
              };
              return e.init(),
                e
            },
            fullRender: function () {
              t(o.tableHead).empty(),
                l.setHeadTitle(),
                l.getOption("layout.footer") && (t(o.tableFoot).empty(),
                  l.setHeadTitle(o.tableFoot)),
                l.spinnerCallback(!0),
                t(o.wrap).removeClass("datatable-loaded"),
                l.insertData()
            },
            lockEnabledColumns: function () {
              var e = t(window).width(),
                n = i.columns,
                o = {
                  left: [],
                  right: []
                };
              return t.each(n, function (t, n) {
                  void 0 !== n.locked && (void 0 !== n.locked.left && a.getBreakpoint(n.locked.left) <= e && o.left.push(n.locked.left),
                    void 0 !== n.locked.right && a.getBreakpoint(n.locked.right) <= e && o.right.push(n.locked.right))
                }),
                o
            },
            afterRender: function (e, a) {
              t(o).ready(function () {
                l.isLocked() && l.redraw(),
                  t(o.tableBody).css("visibility", ""),
                  t(o.wrap).addClass("datatable-loaded"),
                  l.spinnerCallback(!1)
              })
            },
            hoverTimer: 0,
            isScrolling: !1,
            setupHover: function () {
              t(window).scroll(function (t) {
                  clearTimeout(l.hoverTimer),
                    l.isScrolling = !0
                }),
                t(o.tableBody).find(".datatable-cell").off("mouseenter", "mouseleave").on("mouseenter", function () {
                  if (l.hoverTimer = setTimeout(function () {
                      l.isScrolling = !1
                    }, 200),
                    !l.isScrolling) {
                    var e = t(this).closest(".datatable-row").addClass("datatable-row-hover"),
                      a = t(e).index() + 1;
                    t(e).closest(".datatable-lock").parent().find(".datatable-row:nth-child(" + a + ")").addClass("datatable-row-hover")
                  }
                }).on("mouseleave", function () {
                  var e = t(this).closest(".datatable-row").removeClass("datatable-row-hover"),
                    a = t(e).index() + 1;
                  t(e).closest(".datatable-lock").parent().find(".datatable-row:nth-child(" + a + ")").removeClass("datatable-row-hover")
                })
            },
            adjustLockContainer: function () {
              if (!l.isLocked())
                return 0;
              var e = t(o.tableHead).width(),
                a = t(o.tableHead).find(".datatable-lock-left").width(),
                n = t(o.tableHead).find(".datatable-lock-right").width();
              void 0 === a && (a = 0),
                void 0 === n && (n = 0);
              var i = Math.floor(e - a - n);
              return t(o.table).find(".datatable-lock-scroll").css("width", i),
                i
            },
            dragResize: function () {
              var e, a, n = !1,
                i = void 0;
              t(o.tableHead).find(".datatable-cell").mousedown(function (o) {
                  i = t(this),
                    n = !0,
                    e = o.pageX,
                    a = t(this).width(),
                    t(i).addClass("datatable-cell-resizing")
                }).mousemove(function (l) {
                  if (n) {
                    var r = t(i).index(),
                      s = t(o.tableBody),
                      d = t(i).closest(".datatable-lock");
                    if (d) {
                      var c = t(d).index();
                      s = t(o.tableBody).find(".datatable-lock").eq(c)
                    }
                    t(s).find(".datatable-row").each(function (n, i) {
                        t(i).find(".datatable-cell").eq(r).width(a + (l.pageX - e)).children().width(a + (l.pageX - e))
                      }),
                      t(i).children().css("width", a + (l.pageX - e))
                  }
                }).mouseup(function () {
                  t(i).removeClass("datatable-cell-resizing"),
                    n = !1
                }),
                t(document).mouseup(function () {
                  t(i).removeClass("datatable-cell-resizing"),
                    n = !1
                })
            },
            initHeight: function () {
              if (i.layout.height && i.layout.scroll) {
                var e = t(o.tableHead).find(".datatable-row").outerHeight(),
                  a = t(o.tableFoot).find(".datatable-row").outerHeight(),
                  n = i.layout.height;
                e > 0 && (n -= e),
                  a > 0 && (n -= a),
                  n -= 2,
                  t(o.tableBody).css("max-height", Math.floor(parseFloat(n)))
              }
            },
            setupBaseDOM: function () {
              o.initialDatatable = t(o).clone(),
                "TABLE" === t(o).prop("tagName") ? (o.table = t(o).removeClass("datatable").addClass("datatable-table"),
                  0 === t(o.table).parents(".datatable").length && (o.table.wrap(t("<div/>").addClass("datatable").addClass("datatable-" + i.layout.theme)),
                    o.wrap = t(o.table).parent())) : (o.wrap = t(o).addClass("datatable").addClass("datatable-" + i.layout.theme),
                  o.table = t("<table/>").addClass("datatable-table").appendTo(o)),
                void 0 !== i.layout.class && t(o.wrap).addClass(i.layout.class),
                t(o.table).removeClass("datatable-destroyed").css("display", "block"),
                void 0 === t(o).attr("id") && (l.setOption("data.saveState", !1),
                  t(o.table).attr("id", a.getUniqueID("datatable-"))),
                l.getOption("layout.minHeight") && t(o.table).css("min-height", l.getOption("layout.minHeight")),
                l.getOption("layout.height") && t(o.table).css("max-height", l.getOption("layout.height")),
                null === i.data.type && t(o.table).css("width", "").css("display", ""),
                o.tableHead = t(o.table).find("thead"),
                0 === t(o.tableHead).length && (o.tableHead = t("<thead/>").prependTo(o.table)),
                o.tableBody = t(o.table).find("tbody"),
                0 === t(o.tableBody).length && (o.tableBody = t("<tbody/>").appendTo(o.table)),
                void 0 !== i.layout.footer && i.layout.footer && (o.tableFoot = t(o.table).find("tfoot"),
                  0 === t(o.tableFoot).length && (o.tableFoot = t("<tfoot/>").appendTo(o.table)))
            },
            setupCellField: function (e) {
              void 0 === e && (e = t(o.table).children());
              var a = i.columns;
              t.each(e, function (e, n) {
                t(n).find(".datatable-row").each(function (e, n) {
                  t(n).find(".datatable-cell").each(function (e, n) {
                    void 0 !== a[e] && t(n).data(a[e])
                  })
                })
              })
            },
            setupTemplateCell: function (e) {
              void 0 === e && (e = o.tableBody);
              var a = i.columns;
              t(e).find(".datatable-row").each(function (e, n) {
                var i = t(n).data("obj");
                if (void 0 !== i) {
                  var r = l.getOption("rows.callback");
                  "function" == typeof r && r(t(n), i, e);
                  var s = l.getOption("rows.beforeTemplate");
                  "function" == typeof s && s(t(n), i, e),
                    void 0 === i && (i = {},
                      t(n).find(".datatable-cell").each(function (e, n) {
                        var o = t.grep(a, function (e, a) {
                          return t(n).data("field") === e.field
                        })[0];
                        void 0 !== o && (i[o.field] = t(n).text())
                      })),
                    t(n).find(".datatable-cell").each(function (n, r) {
                      var s = t.grep(a, function (e, a) {
                        return t(r).data("field") === e.field
                      })[0];
                      if (void 0 !== s && void 0 !== s.template) {
                        var d = "";
                        "string" == typeof s.template && (d = l.dataPlaceholder(s.template, i)),
                          "function" == typeof s.template && (d = s.template(i, e, o)),
                          "undefined" != typeof DOMPurify && (d = DOMPurify.sanitize(d));
                        var c = document.createElement("span");
                        c.innerHTML = d,
                          t(r).html(c),
                          void 0 !== s.overflow && (t(c).css("overflow", s.overflow),
                            t(c).css("position", "relative"))
                      }
                    });
                  var d = l.getOption("rows.afterTemplate");
                  "function" == typeof d && d(t(n), i, e)
                }
              })
            },
            setupSystemColumn: function () {
              if (o.dataSet = o.dataSet || [],
                0 !== o.dataSet.length) {
                var e = i.columns;
                t(o.tableBody).find(".datatable-row").each(function (a, n) {
                  t(n).find(".datatable-cell").each(function (a, n) {
                    var i = t.grep(e, function (e, a) {
                      return t(n).data("field") === e.field
                    })[0];
                    if (void 0 !== i) {
                      var o = t(n).text();
                      if (void 0 !== i.selector && !1 !== i.selector) {
                        if (t(n).find('.checkbox [type="checkbox"]').length > 0)
                          return;
                        t(n).addClass("datatable-cell-check");
                        var r = t("<label/>").addClass("checkbox checkbox-single").append(t("<input/>").attr("type", "checkbox").attr("value", o).on("click", function () {
                          t(this).is(":checked") ? l.setActive(this) : l.setInactive(this)
                        })).append("&nbsp;<span></span>");
                        void 0 !== i.selector.class && t(r).addClass(i.selector.class),
                          t(n).children().html(r)
                      }
                      if (void 0 !== i.subtable && i.subtable) {
                        if (t(n).find(".datatable-toggle-subtable").length > 0)
                          return;
                        t(n).children().html(t("<a/>").addClass("datatable-toggle-subtable").attr("href", "#").attr("data-value", o).append(t("<i/>").addClass(l.getOption("layout.icons.rowDetail.collapse"))))
                      }
                    }
                  })
                });
                var a = function (a) {
                  var n = t.grep(e, function (t, e) {
                    return void 0 !== t.selector && !1 !== t.selector
                  })[0];
                  if (void 0 !== n && void 0 !== n.selector && !1 !== n.selector) {
                    var i = t(a).find('[data-field="' + n.field + '"]');
                    if (t(i).find('.checkbox [type="checkbox"]').length > 0)
                      return;
                    t(i).addClass("datatable-cell-check");
                    var o = t("<label/>").addClass("checkbox checkbox-single checkbox-all").append(t("<input/>").attr("type", "checkbox").on("click", function () {
                      t(this).is(":checked") ? l.setActiveAll(!0) : l.setActiveAll(!1)
                    })).append("&nbsp;<span></span>");
                    void 0 !== n.selector.class && t(o).addClass(n.selector.class),
                      t(i).children().html(o)
                  }
                };
                i.layout.header && a(t(o.tableHead).find(".datatable-row").first()),
                  i.layout.footer && a(t(o.tableFoot).find(".datatable-row").first())
              }
            },
            maxWidthList: {},
            adjustCellsWidth: function () {
              var e = t(o.tableBody).innerWidth() - l.iconOffset,
                a = t(o.tableBody).find(".datatable-row:first-child").find(".datatable-cell").not(".datatable-toggle-detail").not(":hidden").length;
              if (a > 0) {
                e -= l.iconOffset * a;
                var n = Math.floor(e / a);
                n <= l.cellOffset && (n = l.cellOffset),
                  t(o.table).find(".datatable-row").find(".datatable-cell").not(".datatable-toggle-detail").not(":hidden").each(function (e, a) {
                    var i = n,
                      r = t(a).data("width");
                    if (void 0 !== r)
                      if ("auto" === r) {
                        var s = t(a).data("field");
                        if (l.maxWidthList[s])
                          i = l.maxWidthList[s];
                        else {
                          var d = t(o.table).find('.datatable-cell[data-field="' + s + '"]');
                          i = l.maxWidthList[s] = Math.max.apply(null, t(d).map(function () {
                            return t(this).outerWidth()
                          }).get())
                        }
                      } else
                        i = r;
                    t(a).children().css("width", Math.ceil(i))
                  })
              }
              return o
            },
            adjustCellsHeight: function () {
              t.each(t(o.table).children(), function (e, a) {
                for (var n = t(a).find(".datatable-row").first().parent().find(".datatable-row").length, i = 1; i <= n; i++) {
                  var o = t(a).find(".datatable-row:nth-child(" + i + ")");
                  if (t(o).length > 0) {
                    var l = Math.max.apply(null, t(o).map(function () {
                      return t(this).outerHeight()
                    }).get());
                    t(o).css("height", Math.ceil(l))
                  }
                }
              })
            },
            setupDOM: function (e) {
              t(e).find("> thead").addClass("datatable-head"),
                t(e).find("> tbody").addClass("datatable-body"),
                t(e).find("> tfoot").addClass("datatable-foot"),
                t(e).find("tr").addClass("datatable-row"),
                t(e).find("tr > th, tr > td").addClass("datatable-cell"),
                t(e).find("tr > th, tr > td").each(function (e, a) {
                  0 === t(a).find("span").length && t(a).wrapInner(t("<span/>").css("width", l.cellOffset))
                })
            },
            scrollbar: function () {
              var e = {
                scrollable: null,
                tableLocked: null,
                initPosition: null,
                init: function () {
                  var n = a.getViewPort().width;
                  if (i.layout.scroll) {
                    t(o.wrap).addClass("datatable-scroll");
                    var r = t(o.tableBody).find(".datatable-lock-scroll");
                    t(r).find(".datatable-row").length > 0 && t(r).length > 0 ? (e.scrollHead = t(o.tableHead).find("> .datatable-lock-scroll > .datatable-row"),
                      e.scrollFoot = t(o.tableFoot).find("> .datatable-lock-scroll > .datatable-row"),
                      e.tableLocked = t(o.tableBody).find(".datatable-lock:not(.datatable-lock-scroll)"),
                      l.getOption("layout.customScrollbar") && 10 != a.detectIE() && n > a.getBreakpoint("lg") ? e.initCustomScrollbar(r[0]) : e.initDefaultScrollbar(r)) : t(o.tableBody).find(".datatable-row").length > 0 && (e.scrollHead = t(o.tableHead).find("> .datatable-row"),
                      e.scrollFoot = t(o.tableFoot).find("> .datatable-row"),
                      l.getOption("layout.customScrollbar") && 10 != a.detectIE() && n > a.getBreakpoint("lg") ? e.initCustomScrollbar(o.tableBody) : e.initDefaultScrollbar(o.tableBody))
                  }
                },
                initDefaultScrollbar: function (a) {
                  e.initPosition = t(a).scrollLeft(),
                    t(a).css("overflow-y", "auto").off().on("scroll", e.onScrolling),
                    t(a).css("overflow-x", "auto")
                },
                onScrolling: function (n) {
                  var i = t(this).scrollLeft(),
                    o = t(this).scrollTop();
                  a.isRTL() && (i -= e.initPosition),
                    t(e.scrollHead).css("left", -i),
                    t(e.scrollFoot).css("left", -i),
                    t(e.tableLocked).each(function (e, a) {
                      l.isLocked() && (o -= 1),
                        t(a).css("top", -o)
                    })
                },
                initCustomScrollbar: function (a) {
                  e.scrollable = a,
                    l.initScrollbar(a),
                    e.initPosition = t(a).scrollLeft(),
                    t(a).off().on("scroll", e.onScrolling)
                }
              };
              return e.init(),
                e
            },
            initScrollbar: function (e, n) {
              if (e && e.nodeName) {
                t(o.tableBody).css("overflow", "");
                var i = t(e).data("ps");
                a.hasClass(e, "ps") && void 0 !== i ? i.update() : (i = new PerfectScrollbar(e, Object.assign({}, {
                      wheelSpeed: .5,
                      swipeEasing: !0,
                      minScrollbarLength: 40,
                      maxScrollbarLength: 300,
                      suppressScrollX: l.getOption("rows.autoHide") && !l.isLocked()
                    }, n)),
                    t(e).data("ps", i)),
                  t(window).resize(function () {
                    i.update()
                  })
              }
            },
            setHeadTitle: function (e) {
              void 0 === e && (e = o.tableHead),
                e = t(e)[0];
              var n = i.columns,
                r = e.getElementsByTagName("tr")[0],
                s = e.getElementsByTagName("td");
              void 0 === r && (r = document.createElement("tr"),
                  e.appendChild(r)),
                t.each(n, function (e, n) {
                  var i = s[e];
                  if (void 0 === i && (i = document.createElement("th"),
                      r.appendChild(i)),
                    void 0 !== n.title && (i.innerHTML = n.title,
                      i.setAttribute("data-field", n.field),
                      a.addClass(i, n.class),
                      void 0 !== n.autoHide && (!0 !== n.autoHide ? i.setAttribute("data-autohide-disabled", n.autoHide) : i.setAttribute("data-autohide-enabled", n.autoHide)),
                      t(i).data(n)),
                    void 0 !== n.attr && t.each(n.attr, function (t, e) {
                      i.setAttribute(t, e)
                    }),
                    void 0 !== n.textAlign) {
                    var l = void 0 !== o.textAlign[n.textAlign] ? o.textAlign[n.textAlign] : "";
                    a.addClass(i, l)
                  }
                }),
                l.setupDOM(e)
            },
            dataRender: function (e) {
              t(o.table).siblings(".datatable-pager").removeClass("datatable-paging-loaded");
              var a = function () {
                  o.dataSet = o.dataSet || [],
                    l.localDataUpdate();
                  var e = l.getDataSourceParam("pagination");
                  0 === e.perpage && (e.perpage = i.data.pageSize || 10),
                    e.total = o.dataSet.length;
                  var a = Math.max(e.perpage * (e.page - 1), 0),
                    n = Math.min(a + e.perpage, e.total);
                  return o.dataSet = t(o.dataSet).slice(a, n),
                    e
                },
                n = function (e) {
                  var n = function (e, a) {
                    t(e.pager).hasClass("datatable-paging-loaded") || (t(e.pager).remove(),
                        e.init(a)),
                      t(e.pager).off().on("datatable-on-goto-page", function (n) {
                        t(e.pager).remove(),
                          e.init(a)
                      });
                    var n = Math.max(a.perpage * (a.page - 1), 0),
                      i = Math.min(n + a.perpage, a.total);
                    l.localDataUpdate(),
                      o.dataSet = t(o.dataSet).slice(n, i),
                      l.insertData()
                  };
                  if (t(o.wrap).removeClass("datatable-error"),
                    i.pagination)
                    if (i.data.serverPaging && "local" !== i.data.type) {
                      var r = l.getObject("meta", e || null);
                      l.pagingObject = null !== r ? l.paging(r) : l.paging(a(), n)
                    } else
                      l.pagingObject = l.paging(a(), n);
                  else
                    l.localDataUpdate();
                  l.insertData()
                };
              "local" === i.data.type || !1 === i.data.serverSorting && "sort" === e || !1 === i.data.serverFiltering && "search" === e ? setTimeout(function () {
                n(),
                  l.setAutoColumns()
              }) : l.getData().done(n)
            },
            insertData: function () {
              o.dataSet = o.dataSet || [];
              var e = l.getDataSourceParam(),
                n = e.pagination,
                r = (Math.max(n.page, 1) - 1) * n.perpage,
                s = Math.min(n.page, n.pages) * n.perpage,
                d = {};
              void 0 !== i.data.attr.rowProps && i.data.attr.rowProps.length && (d = i.data.attr.rowProps.slice(r, s));
              var c = document.createElement("tbody");
              c.style.visibility = "hidden";
              var u = i.columns.length;
              if (t.each(o.dataSet, function (n, r) {
                  var s = document.createElement("tr");
                  s.setAttribute("data-row", n),
                    t(s).data("obj", r),
                    void 0 !== d[n] && t.each(d[n], function () {
                      s.setAttribute(this.name, this.value)
                    });
                  for (var p = 0; p < u; p += 1) {
                    var f = i.columns[p],
                      g = [];
                    if (l.getObject("sort.field", e) === f.field && g.push("datatable-cell-sorted"),
                      void 0 !== f.textAlign) {
                      var m = void 0 !== o.textAlign[f.textAlign] ? o.textAlign[f.textAlign] : "";
                      g.push(m)
                    }
                    void 0 !== f.class && g.push(f.class);
                    var h = document.createElement("td");
                    a.addClass(h, g.join(" ")),
                      h.setAttribute("data-field", f.field),
                      void 0 !== f.autoHide && (!0 !== f.autoHide ? h.setAttribute("data-autohide-disabled", f.autoHide) : h.setAttribute("data-autohide-enabled", f.autoHide)),
                      h.innerHTML = l.getObject(f.field, r),
                      h.setAttribute("aria-label", l.getObject(f.field, r)),
                      s.appendChild(h)
                  }
                  c.appendChild(s)
                }),
                0 === o.dataSet.length) {
                var p = document.createElement("span");
                a.addClass(p, "datatable-error"),
                  p.innerHTML = l.getOption("translate.records.noRecords"),
                  c.appendChild(p),
                  t(o.wrap).addClass("datatable-error datatable-loaded"),
                  l.spinnerCallback(!1)
              }
              t(o.tableBody).replaceWith(c),
                o.tableBody = c,
                l.setupDOM(o.table),
                l.setupCellField([o.tableBody]),
                l.setupTemplateCell(o.tableBody),
                l.layoutUpdate()
            },
            updateTableComponents: function () {
              o.tableHead = t(o.table).children("thead").get(0),
                o.tableBody = t(o.table).children("tbody").get(0),
                o.tableFoot = t(o.table).children("tfoot").get(0)
            },
            getData: function () {
              var e = {
                dataType: "json",
                method: "POST",
                data: {},
                timeout: l.getOption("data.source.read.timeout") || 3e4
              };
              if ("local" === i.data.type && (e.url = i.data.source),
                "remote" === i.data.type) {
                var a = l.getDataSourceParam();
                l.getOption("data.serverPaging") || delete a.pagination,
                  l.getOption("data.serverSorting") || delete a.sort,
                  e.data = t.extend({}, e.data, l.getOption("data.source.read.params"), a),
                  "string" != typeof (e = t.extend({}, e, l.getOption("data.source.read"))).url && (e.url = l.getOption("data.source.read")),
                  "string" != typeof e.url && (e.url = l.getOption("data.source"))
              }
              return t.ajax(e).done(function (e, a, n) {
                o.lastResponse = e,
                  o.dataSet = o.originalDataSet = l.dataMapCallback(e),
                  l.setAutoColumns(),
                  t(o).trigger("datatable-on-ajax-done", [o.dataSet])
              }).fail(function (e, a, n) {
                t(o).trigger("datatable-on-ajax-fail", [e]),
                  t(o.tableBody).html(t("<span/>").addClass("datatable-error").html(l.getOption("translate.records.noRecords"))),
                  t(o.wrap).addClass("datatable-error datatable-loaded"),
                  l.spinnerCallback(!1)
              }).always(function () {})
            },
            paging: function (e, n) {
              var i = {
                meta: null,
                pager: null,
                paginateEvent: null,
                pagerLayout: {
                  pagination: null,
                  info: null
                },
                callback: null,
                init: function (e) {
                  i.meta = e,
                    i.meta.page = parseInt(i.meta.page),
                    i.meta.pages = parseInt(i.meta.pages),
                    i.meta.perpage = parseInt(i.meta.perpage),
                    i.meta.total = parseInt(i.meta.total),
                    i.meta.pages = Math.max(Math.ceil(i.meta.total / i.meta.perpage), 1),
                    i.meta.page > i.meta.pages && (i.meta.page = i.meta.pages),
                    i.paginateEvent = l.getTablePrefix("paging"),
                    i.pager = t(o.table).siblings(".datatable-pager"),
                    t(i.pager).hasClass("datatable-paging-loaded") || (t(i.pager).remove(),
                      0 !== i.meta.pages && (l.setDataSourceParam("pagination", {
                          page: i.meta.page,
                          pages: i.meta.pages,
                          perpage: i.meta.perpage,
                          total: i.meta.total
                        }),
                        i.callback = i.serverCallback,
                        "function" == typeof n && (i.callback = n),
                        i.addPaginateEvent(),
                        i.populate(),
                        i.meta.page = Math.max(i.meta.page || 1, i.meta.page),
                        t(o).trigger(i.paginateEvent, i.meta),
                        i.pagingBreakpoint.call(),
                        t(window).resize(i.pagingBreakpoint)))
                },
                serverCallback: function (t, e) {
                  l.dataRender()
                },
                populate: function () {
                  var e = l.getOption("layout.icons.pagination"),
                    a = l.getOption("translate.toolbar.pagination.items.default");
                  i.pager = t("<div/>").addClass("datatable-pager datatable-paging-loaded");
                  var n = t("<ul/>").addClass("datatable-pager-nav");
                  i.pagerLayout.pagination = n,
                    t("<li/>").append(t("<a/>").attr("title", a.first).addClass("datatable-pager-link datatable-pager-link-first").append(t("<i/>").addClass(e.first)).on("click", i.gotoMorePage).attr("data-page", 1)).appendTo(n),
                    t("<li/>").append(t("<a/>").attr("title", a.prev).addClass("datatable-pager-link datatable-pager-link-prev").append(t("<i/>").addClass(e.prev)).on("click", i.gotoMorePage)).appendTo(n),
                    t("<li/>").append(t("<a/>").attr("title", a.more).addClass("datatable-pager-link datatable-pager-link-more-prev").html(t("<i/>").addClass(e.more)).on("click", i.gotoMorePage)).appendTo(n),
                    t("<li/>").append(t("<input/>").attr("type", "text").addClass("datatable-pager-input form-control").attr("title", a.input).on("keyup", function () {
                      t(this).attr("data-page", Math.abs(t(this).val()))
                    }).on("keypress", function (t) {
                      13 === t.which && i.gotoMorePage(t)
                    })).appendTo(n);
                  var r = l.getOption("toolbar.items.pagination.pages.desktop.pagesNumber"),
                    s = Math.ceil(i.meta.page / r) * r,
                    d = s - r;
                  s > i.meta.pages && (s = i.meta.pages),
                    d < 0 && (d = 0);
                  for (var c = d; c < (s || 1); c++) {
                    var u = c + 1;
                    t("<li/>").append(t("<a/>").addClass("datatable-pager-link datatable-pager-link-number").text(u).attr("data-page", u).attr("title", u).on("click", i.gotoPage)).appendTo(n)
                  }
                  t("<li/>").append(t("<a/>").attr("title", a.more).addClass("datatable-pager-link datatable-pager-link-more-next").html(t("<i/>").addClass(e.more)).on("click", i.gotoMorePage)).appendTo(n),
                    t("<li/>").append(t("<a/>").attr("title", a.next).addClass("datatable-pager-link datatable-pager-link-next").append(t("<i/>").addClass(e.next)).on("click", i.gotoMorePage)).appendTo(n),
                    t("<li/>").append(t("<a/>").attr("title", a.last).addClass("datatable-pager-link datatable-pager-link-last").append(t("<i/>").addClass(e.last)).on("click", i.gotoMorePage).attr("data-page", i.meta.pages)).appendTo(n),
                    l.getOption("toolbar.items.info") && (i.pagerLayout.info = t("<div/>").addClass("datatable-pager-info").append(t("<span/>").addClass("datatable-pager-detail"))),
                    t.each(l.getOption("toolbar.layout"), function (e, a) {
                      t(i.pagerLayout[a]).appendTo(i.pager)
                    });
                  var p = t("<select/>").addClass("selectpicker datatable-pager-size").attr("title", l.getOption("translate.toolbar.pagination.items.default.select")).attr("data-width", "60px").attr("data-container", "body").val(i.meta.perpage).on("change", i.updatePerpage).prependTo(i.pagerLayout.info),
                    f = l.getOption("toolbar.items.pagination.pageSizeSelect");
                  0 == f.length && (f = [5, 10, 20, 30, 50, 100]),
                    t.each(f, function (e, a) {
                      var n = a; -
                      1 === a && (n = l.getOption("translate.toolbar.pagination.items.default.all")),
                        t("<option/>").attr("value", a).html(n).appendTo(p)
                    }),
                    t(o).ready(function () {
                      t(".selectpicker").selectpicker().on("hide.bs.select", function () {
                        t(this).closest(".bootstrap-select").removeClass("dropup")
                      }).siblings(".dropdown-toggle").attr("title", l.getOption("translate.toolbar.pagination.items.default.select"))
                    }),
                    i.paste()
                },
                paste: function () {
                  t.each(t.unique(l.getOption("toolbar.placement")), function (e, a) {
                    "bottom" === a && t(i.pager).clone(!0).insertAfter(o.table),
                      "top" === a && t(i.pager).clone(!0).addClass("datatable-pager-top").insertBefore(o.table)
                  })
                },
                gotoMorePage: function (e) {
                  if (e.preventDefault(),
                    "disabled" === t(this).attr("disabled"))
                    return !1;
                  var a = t(this).attr("data-page");
                  return void 0 === a && (a = t(e.target).attr("data-page")),
                    i.openPage(parseInt(a)),
                    !1
                },
                gotoPage: function (e) {
                  e.preventDefault(),
                    t(this).hasClass("datatable-pager-link-active") || i.openPage(parseInt(t(this).data("page")))
                },
                openPage: function (e) {
                  i.meta.page = parseInt(e),
                    t(o).trigger(i.paginateEvent, i.meta),
                    i.callback(i, i.meta),
                    t(i.pager).trigger("datatable-on-goto-page", i.meta)
                },
                updatePerpage: function (e) {
                  e.preventDefault(),
                    t(this).selectpicker("toggle"),
                    i.pager = t(o.table).siblings(".datatable-pager").removeClass("datatable-paging-loaded"),
                    e.originalEvent && (i.meta.perpage = parseInt(t(this).val())),
                    t(i.pager).find("select.datatable-pager-size").val(i.meta.perpage).attr("data-selected", i.meta.perpage),
                    l.setDataSourceParam("pagination", {
                      page: i.meta.page,
                      pages: i.meta.pages,
                      perpage: i.meta.perpage,
                      total: i.meta.total
                    }),
                    t(i.pager).trigger("datatable-on-update-perpage", i.meta),
                    t(o).trigger(i.paginateEvent, i.meta),
                    i.callback(i, i.meta),
                    i.updateInfo.call()
                },
                addPaginateEvent: function (e) {
                  t(o).off(i.paginateEvent).on(i.paginateEvent, function (e, a) {
                    l.spinnerCallback(!0),
                      i.pager = t(o.table).siblings(".datatable-pager");
                    var n = t(i.pager).find(".datatable-pager-nav");
                    t(n).find(".datatable-pager-link-active").removeClass("datatable-pager-link-active"),
                      t(n).find('.datatable-pager-link-number[data-page="' + a.page + '"]').addClass("datatable-pager-link-active"),
                      t(n).find(".datatable-pager-link-prev").attr("data-page", Math.max(a.page - 1, 1)),
                      t(n).find(".datatable-pager-link-next").attr("data-page", Math.min(a.page + 1, a.pages)),
                      t(i.pager).each(function () {
                        t(this).find('.datatable-pager-input[type="text"]').prop("value", a.page)
                      }),
                      l.setDataSourceParam("pagination", {
                        page: i.meta.page,
                        pages: i.meta.pages,
                        perpage: i.meta.perpage,
                        total: i.meta.total
                      }),
                      t(i.pager).find("select.datatable-pager-size").val(a.perpage).attr("data-selected", a.perpage),
                      t(o.table).find('.checkbox > [type="checkbox"]').prop("checked", !1),
                      t(o.table).find(".datatable-row-active").removeClass("datatable-row-active"),
                      i.updateInfo.call(),
                      i.pagingBreakpoint.call()
                  })
                },
                updateInfo: function () {
                  var e = Math.max(i.meta.perpage * (i.meta.page - 1) + 1, 1),
                    a = Math.min(e + i.meta.perpage - 1, i.meta.total);
                  t(i.pager).find(".datatable-pager-info").find(".datatable-pager-detail").html(l.dataPlaceholder(l.getOption("translate.toolbar.pagination.items.info"), {
                    start: 0 === i.meta.total ? 0 : e,
                    end: -1 === i.meta.perpage ? i.meta.total : a,
                    pageSize: -1 === i.meta.perpage || i.meta.perpage >= i.meta.total ? i.meta.total : i.meta.perpage,
                    total: i.meta.total
                  }))
                },
                pagingBreakpoint: function () {
                  var e = t(o.table).siblings(".datatable-pager").find(".datatable-pager-nav");
                  if (0 !== t(e).length) {
                    var n = l.getCurrentPage(),
                      r = t(e).find(".datatable-pager-input").closest("li");
                    t(e).find("li").show(),
                      t.each(l.getOption("toolbar.items.pagination.pages"), function (o, s) {
                        if (a.isInResponsiveRange(o)) {
                          switch (o) {
                            case "desktop":
                            case "tablet":
                              Math.ceil(n / s.pagesNumber),
                                s.pagesNumber,
                                s.pagesNumber;
                              t(r).hide(),
                                i.meta = l.getDataSourceParam("pagination"),
                                i.paginationUpdate();
                              break;
                            case "mobile":
                              t(r).show(),
                                t(e).find(".datatable-pager-link-more-prev").closest("li").hide(),
                                t(e).find(".datatable-pager-link-more-next").closest("li").hide(),
                                t(e).find(".datatable-pager-link-number").closest("li").hide()
                          }
                          return !1
                        }
                      })
                  }
                },
                paginationUpdate: function () {
                  var e = t(o.table).siblings(".datatable-pager").find(".datatable-pager-nav"),
                    a = t(e).find(".datatable-pager-link-more-prev"),
                    n = t(e).find(".datatable-pager-link-more-next"),
                    r = t(e).find(".datatable-pager-link-first"),
                    s = t(e).find(".datatable-pager-link-prev"),
                    d = t(e).find(".datatable-pager-link-next"),
                    c = t(e).find(".datatable-pager-link-last"),
                    u = t(e).find(".datatable-pager-link-number"),
                    p = Math.max(t(u).first().data("page") - 1, 1);
                  t(a).each(function (e, a) {
                      t(a).attr("data-page", p)
                    }),
                    1 === p ? t(a).parent().hide() : t(a).parent().show();
                  var f = Math.min(t(u).last().data("page") + 1, i.meta.pages);
                  t(n).each(function (e, a) {
                      t(n).attr("data-page", f).show()
                    }),
                    f === i.meta.pages && f === t(u).last().data("page") ? t(n).parent().hide() : t(n).parent().show(),
                    1 === i.meta.page ? (t(r).attr("disabled", !0).addClass("datatable-pager-link-disabled"),
                      t(s).attr("disabled", !0).addClass("datatable-pager-link-disabled")) : (t(r).removeAttr("disabled").removeClass("datatable-pager-link-disabled"),
                      t(s).removeAttr("disabled").removeClass("datatable-pager-link-disabled")),
                    i.meta.page === i.meta.pages ? (t(d).attr("disabled", !0).addClass("datatable-pager-link-disabled"),
                      t(c).attr("disabled", !0).addClass("datatable-pager-link-disabled")) : (t(d).removeAttr("disabled").removeClass("datatable-pager-link-disabled"),
                      t(c).removeAttr("disabled").removeClass("datatable-pager-link-disabled"));
                  var g = l.getOption("toolbar.items.pagination.navigation");
                  g.first || t(r).remove(),
                    g.prev || t(s).remove(),
                    g.next || t(d).remove(),
                    g.last || t(c).remove(),
                    g.more || (t(a).remove(),
                      t(n).remove())
                }
              };
              return i.init(e),
                i
            },
            columnHide: function () {
              var e = a.getViewPort().width;
              t.each(i.columns, function (n, i) {
                if (void 0 !== i.responsive || void 0 !== i.visible) {
                  var r = i.field,
                    s = t.grep(t(o.table).find(".datatable-cell"), function (e, a) {
                      return r === t(e).data("field")
                    });
                  setTimeout(function () {
                    !1 === l.getObject("visible", i) ? t(s).hide() : (a.getBreakpoint(l.getObject("responsive.hidden", i)) >= e ? t(s).hide() : t(s).show(),
                      a.getBreakpoint(l.getObject("responsive.visible", i)) <= e ? t(s).show() : t(s).hide())
                  })
                }
              })
            },
            setupSubDatatable: function () {
              var e = l.getOption("detail.content");
              if ("function" == typeof e && !(t(o.table).find(".datatable-subtable").length > 0)) {
                t(o.wrap).addClass("datatable-subtable"),
                  i.columns[0].subtable = !0;
                var a = function (a) {
                    a.preventDefault();
                    var n = t(this).closest(".datatable-row"),
                      r = t(n).next(".datatable-row-subtable");
                    0 === t(r).length && (r = t("<tr/>").addClass("datatable-row-subtable datatable-row-loading").hide().append(t("<td/>").addClass("datatable-subtable").attr("colspan", l.getTotalColumns())),
                        t(n).after(r),
                        t(n).hasClass("datatable-row-even") && t(r).addClass("datatable-row-subtable-even")),
                      t(r).toggle();
                    var s = t(r).find(".datatable-subtable"),
                      d = t(this).closest("[data-field]:first-child").find(".datatable-toggle-subtable").data("value"),
                      c = t(this).find("i").removeAttr("class");
                    t(n).hasClass("datatable-row-subtable-expanded") ? (t(c).addClass(l.getOption("layout.icons.rowDetail.collapse")),
                        t(n).removeClass("datatable-row-subtable-expanded"),
                        t(o).trigger("datatable-on-collapse-subtable", [n])) : (t(c).addClass(l.getOption("layout.icons.rowDetail.expand")),
                        t(n).addClass("datatable-row-subtable-expanded"),
                        t(o).trigger("datatable-on-expand-subtable", [n])),
                      0 === t(s).find(".datatable").length && (t.map(o.dataSet, function (t, e) {
                          return d === t[i.columns[0].field] && (a.data = t,
                            !0)
                        }),
                        a.detailCell = s,
                        a.parentRow = n,
                        a.subTable = s,
                        e(a),
                        t(s).children(".datatable").on("datatable-on-init", function (e) {
                          t(r).removeClass("datatable-row-loading")
                        }),
                        "local" === l.getOption("data.type") && t(r).removeClass("datatable-row-loading"))
                  },
                  n = i.columns;
                t(o.tableBody).find(".datatable-row").each(function (e, i) {
                  t(i).find(".datatable-cell").each(function (e, i) {
                    var o = t.grep(n, function (e, a) {
                      return t(i).data("field") === e.field
                    })[0];
                    if (void 0 !== o) {
                      var r = t(i).text();
                      if (void 0 !== o.subtable && o.subtable) {
                        if (t(i).find(".datatable-toggle-subtable").length > 0)
                          return;
                        t(i).html(t("<a/>").addClass("datatable-toggle-subtable").attr("href", "#").attr("data-value", r).attr("title", l.getOption("detail.title")).on("click", a).append(t("<i/>").css("width", t(i).data("width")).addClass(l.getOption("layout.icons.rowDetail.collapse"))))
                      }
                    }
                  })
                })
              }
            },
            dataMapCallback: function (t) {
              var e = t;
              return "function" == typeof l.getOption("data.source.read.map") ? l.getOption("data.source.read.map")(t) : (void 0 !== t && void 0 !== t.data && (e = t.data),
                e)
            },
            isSpinning: !1,
            spinnerCallback: function (t, e) {
              void 0 === e && (e = o);
              var a = l.getOption("layout.spinner");
              void 0 !== a && a && (t ? l.isSpinning || (void 0 !== a.message && !0 === a.message && (a.message = l.getOption("translate.records.processing")),
                l.isSpinning = !0,
                void 0 !== n && n.block(e, a)) : (l.isSpinning = !1,
                void 0 !== n && n.unblock(e)))
            },
            sortCallback: function (e, a, n) {
              var i = n.type || "string",
                o = n.format || "",
                l = n.field;
              return t(e).sort(function (n, r) {
                var s = n[l],
                  d = r[l];
                switch (i) {
                  case "date":
                    if ("undefined" == typeof moment)
                      throw new Error("Moment.js is required.");
                    var c = moment(s, o).diff(moment(d, o));
                    return "asc" === a ? c > 0 ? 1 : c < 0 ? -1 : 0 : c < 0 ? 1 : c > 0 ? -1 : 0;
                  case "number":
                    return isNaN(parseFloat(s)) && null != s && (s = Number(s.replace(/[^0-9\.-]+/g, ""))),
                      isNaN(parseFloat(d)) && null != d && (d = Number(d.replace(/[^0-9\.-]+/g, ""))),
                      s = parseFloat(s),
                      d = parseFloat(d),
                      "asc" === a ? s > d ? 1 : s < d ? -1 : 0 : s < d ? 1 : s > d ? -1 : 0;
                  case "html":
                    return t(e).sort(function (e, n) {
                      return s = t(e[l]).text(),
                        d = t(n[l]).text(),
                        "asc" === a ? s > d ? 1 : s < d ? -1 : 0 : s < d ? 1 : s > d ? -1 : 0
                    });
                  case "string":
                  default:
                    return "asc" === a ? s > d ? 1 : s < d ? -1 : 0 : s < d ? 1 : s > d ? -1 : 0
                }
              })
            },
            log: function (t, e) {
              void 0 === e && (e = ""),
                o.debug && console.log(t, e)
            },
            autoHide: function () {
              var e = !1,
                a = t(o.table).find("[data-autohide-enabled]");
              a.length && (e = !0,
                a.hide());
              var n = function (e) {
                e.preventDefault();
                var a = t(this).closest(".datatable-row"),
                  n = t(a).next();
                if (t(n).hasClass("datatable-row-detail"))
                  t(this).find("i").removeClass(l.getOption("layout.icons.rowDetail.expand")).addClass(l.getOption("layout.icons.rowDetail.collapse")),
                  t(n).remove();
                else {
                  t(this).find("i").removeClass(l.getOption("layout.icons.rowDetail.collapse")).addClass(l.getOption("layout.icons.rowDetail.expand"));
                  var o = t(a).find(".datatable-cell:hidden").clone().show();
                  n = t("<tr/>").addClass("datatable-row-detail").insertAfter(a);
                  var r = t("<td/>").addClass("datatable-detail").attr("colspan", l.getTotalColumns()).appendTo(n),
                    s = t("<table/>");
                  t(o).each(function () {
                      var e = t(this).data("field"),
                        a = t.grep(i.columns, function (t, a) {
                          return e === t.field
                        })[0];
                      void 0 !== a && !1 === a.visible || t(s).append(t('<tr class="datatable-row"></tr>').append(t('<td class="datatable-cell"></td>').append(t("<span/>").append(a.title))).append(this))
                    }),
                    t(r).append(s)
                }
              };
              setTimeout(function () {
                  t(o.table).find(".datatable-cell").show(),
                    t(o.tableBody).each(function () {
                      for (var a = 0; t(this)[0].offsetWidth < t(this)[0].scrollWidth && a < i.columns.length;)
                        t(o.table).find(".datatable-row").each(function (a) {
                          var n = t(this).find(".datatable-cell:not(:hidden):not([data-autohide-disabled])").last();
                          t(n).hide(),
                            e = !0
                        }),
                        a++
                    }),
                    e && t(o.tableBody).find(".datatable-row").each(function () {
                      0 === t(this).find(".datatable-toggle-detail").length && t(this).prepend(t("<td/>").addClass("datatable-cell datatable-toggle-detail").append(t("<a/>").addClass("datatable-toggle-detail").attr("href", "").on("click", n).append('<i class="' + l.getOption("layout.icons.rowDetail.collapse") + '"></i>'))),
                        0 === t(o.tableHead).find(".datatable-toggle-detail").length ? (t(o.tableHead).find(".datatable-row").first().prepend('<th class="datatable-cell datatable-toggle-detail"><span></span></th>'),
                          t(o.tableFoot).find(".datatable-row").first().prepend('<th class="datatable-cell datatable-toggle-detail"><span></span></th>')) : t(o.tableHead).find(".datatable-toggle-detail").find("span")
                    })
                }),
                l.adjustCellsWidth.call()
            },
            setAutoColumns: function () {
              l.getOption("data.autoColumns") && (t.each(o.dataSet[0], function (e, a) {
                  0 === t.grep(i.columns, function (t, a) {
                    return e === t.field
                  }).length && i.columns.push({
                    field: e,
                    title: e
                  })
                }),
                t(o.tableHead).find(".datatable-row").remove(),
                l.setHeadTitle(),
                l.getOption("layout.footer") && (t(o.tableFoot).find(".datatable-row").remove(),
                  l.setHeadTitle(o.tableFoot)))
            },
            isLocked: function () {
              var t = l.lockEnabledColumns();
              return t.left.length > 0 || t.right.length > 0
            },
            isSubtable: function () {
              return a.hasClass(o.wrap[0], "datatable-subtable") || !1
            },
            getExtraSpace: function (e) {
              return parseInt(t(e).css("paddingRight")) + parseInt(t(e).css("paddingLeft")) + (parseInt(t(e).css("marginRight")) + parseInt(t(e).css("marginLeft"))) + Math.ceil(t(e).css("border-right-width").replace("px", ""))
            },
            dataPlaceholder: function (e, a) {
              var n = e;
              return t.each(a, function (t, e) {
                  n = n.replace("{{" + t + "}}", e)
                }),
                n
            },
            getTableId: function (e) {
              void 0 === e && (e = "");
              var a = t(o).attr("id");
              return void 0 === a && (a = t(o).attr("class").split(" ")[0]),
                a + e
            },
            getTablePrefix: function (t) {
              return void 0 !== t && (t = "-" + t),
                l.getTableId() + "-" + l.getDepth() + t
            },
            getDepth: function () {
              var e = 0,
                a = o.table;
              do {
                a = t(a).parents(".datatable-table"),
                  e++
              } while (t(a).length > 0);
              return e
            },
            stateKeep: function (t, e) {
              t = l.getTablePrefix(t),
                !1 !== l.getOption("data.saveState") && localStorage && localStorage.setItem(t, JSON.stringify(e))
            },
            stateGet: function (t, e) {
              if (t = l.getTablePrefix(t),
                !1 !== l.getOption("data.saveState")) {
                var a = null;
                return localStorage && (a = localStorage.getItem(t)),
                  null != a ? JSON.parse(a) : void 0
              }
            },
            stateUpdate: function (e, a) {
              var n = l.stateGet(e);
              null == n && (n = {}),
                l.stateKeep(e, t.extend({}, n, a))
            },
            stateRemove: function (t) {
              t = l.getTablePrefix(t),
                localStorage && localStorage.removeItem(t)
            },
            getTotalColumns: function (e) {
              return void 0 === e && (e = o.tableBody),
                t(e).find(".datatable-row").first().find(".datatable-cell").length
            },
            getOneRow: function (e, a, n) {
              void 0 === n && (n = !0);
              var i = t(e).find(".datatable-row:not(.datatable-row-detail):nth-child(" + a + ")");
              return n && (i = i.find(".datatable-cell")),
                i
            },
            sortColumn: function (e, a, n) {
              void 0 === a && (a = "asc"),
                void 0 === n && (n = !1);
              var i = t(e).index(),
                l = t(o.tableBody).find(".datatable-row"),
                r = t(e).closest(".datatable-lock").index(); -
              1 !== r && (l = t(o.tableBody).find(".datatable-lock:nth-child(" + (r + 1) + ")").find(".datatable-row"));
              var s = t(l).parent();
              t(l).sort(function (e, o) {
                var l = t(e).find("td:nth-child(" + i + ")").text(),
                  r = t(o).find("td:nth-child(" + i + ")").text();
                return n && (l = parseInt(l),
                    r = parseInt(r)),
                  "asc" === a ? l > r ? 1 : l < r ? -1 : 0 : l < r ? 1 : l > r ? -1 : 0
              }).appendTo(s)
            },
            sorting: function () {
              var e = {
                init: function () {
                  i.sortable && (t(o.tableHead).find(".datatable-cell:not(.datatable-cell-check)").addClass("datatable-cell-sort").off("click").on("click", e.sortClick),
                    e.setIcon())
                },
                setIcon: function () {
                  var e = l.getDataSourceParam("sort");
                  if (!t.isEmptyObject(e)) {
                    var a = l.getColumnByField(e.field);
                    if (void 0 === a || void 0 === a.sortable || !1 !== a.sortable) {
                      var n = t(o.tableHead).find('.datatable-cell[data-field="' + e.field + '"]').attr("data-sort", e.sort),
                        i = t(n).find("span"),
                        r = t(i).find("i"),
                        s = l.getOption("layout.icons.sort");
                      t(r).length > 0 ? t(r).removeAttr("class").addClass(s[e.sort]) : t(i).append(t("<i/>").addClass(s[e.sort])),
                        t(n).addClass("datatable-cell-sorted")
                    }
                  }
                },
                sortClick: function (n) {
                  var r = l.getDataSourceParam("sort"),
                    s = t(this).data("field"),
                    d = l.getColumnByField(s);
                  if ((void 0 === d.sortable || !1 !== d.sortable) && (t(o.tableHead).find("th").removeClass("datatable-cell-sorted"),
                      a.addClass(this, "datatable-cell-sorted"),
                      t(o.tableHead).find(".datatable-cell > span > i").remove(),
                      i.sortable)) {
                    l.spinnerCallback(!0);
                    var c = "desc";
                    l.getObject("field", r) === s && (c = l.getObject("sort", r)),
                      r = {
                        field: s,
                        sort: c = void 0 === c || "desc" === c ? "asc" : "desc"
                      },
                      l.setDataSourceParam("sort", r),
                      e.setIcon(),
                      setTimeout(function () {
                        l.dataRender("sort"),
                          t(o).trigger("datatable-on-sort", r)
                      }, 300)
                  }
                }
              };
              e.init()
            },
            localDataUpdate: function () {
              var e = l.getDataSourceParam();
              void 0 === o.originalDataSet && (o.originalDataSet = o.dataSet);
              var a = l.getObject("sort.field", e),
                n = l.getObject("sort.sort", e),
                i = l.getColumnByField(a);
              if (void 0 !== i && !0 !== l.getOption("data.serverSorting") ? "function" == typeof i.sortCallback ? o.dataSet = i.sortCallback(o.originalDataSet, n, i) : o.dataSet = l.sortCallback(o.originalDataSet, n, i) : o.dataSet = o.originalDataSet,
                "object" == typeof e.query && !l.getOption("data.serverFiltering")) {
                e.query = e.query || {};
                var r = function (t) {
                    for (var e in t)
                      if (t.hasOwnProperty(e))
                        if ("string" == typeof t[e]) {
                          if (t[e].toLowerCase() == s || -1 !== t[e].toLowerCase().indexOf(s))
                            return !0
                        } else if ("number" == typeof t[e]) {
                      if (t[e] === s)
                        return !0
                    } else if ("object" == typeof t[e] && r(t[e]))
                      return !0;
                    return !1
                  },
                  s = t(l.getOption("search.input")).val();
                void 0 !== s && "" !== s && (s = s.toLowerCase(),
                    o.dataSet = t.grep(o.dataSet, r),
                    delete e.query[l.getGeneralSearchKey()]),
                  t.each(e.query, function (t, a) {
                    "" === a && delete e.query[t]
                  }),
                  o.dataSet = l.filterArray(o.dataSet, e.query),
                  o.dataSet = o.dataSet.filter(function () {
                    return !0
                  })
              }
              return o.dataSet
            },
            filterArray: function (e, a, n) {
              if ("object" != typeof e)
                return [];
              if (void 0 === n && (n = "AND"),
                "object" != typeof a)
                return e;
              if (n = n.toUpperCase(),
                -1 === t.inArray(n, ["AND", "OR", "NOT"]))
                return [];
              var i = Object.keys(a).length,
                o = [];
              return t.each(e, function (e, r) {
                  var s = r,
                    d = 0;
                  t.each(a, function (t, e) {
                      e = e instanceof Array ? e : [e];
                      var a = l.getObject(t, s);
                      if (void 0 !== a && a) {
                        var n = a.toString().toLowerCase();
                        e.forEach(function (t, e) {
                          t.toString().toLowerCase() != n && -1 === n.indexOf(t.toString().toLowerCase()) || d++
                        })
                      }
                    }),
                    ("AND" == n && d == i || "OR" == n && d > 0 || "NOT" == n && 0 == d) && (o[e] = r)
                }),
                e = o
            },
            resetScroll: function () {
              void 0 === i.detail && 1 === l.getDepth() && (t(o.table).find(".datatable-row").css("left", 0),
                t(o.table).find(".datatable-lock").css("top", 0),
                t(o.tableBody).scrollTop(0))
            },
            getColumnByField: function (e) {
              var a;
              if (void 0 !== e)
                return t.each(i.columns, function (t, n) {
                    if (e === n.field)
                      return a = n,
                        !1
                  }),
                  a
            },
            getDefaultSortColumn: function () {
              var e;
              return t.each(i.columns, function (a, n) {
                  if (void 0 !== n.sortable && -1 !== t.inArray(n.sortable, ["asc", "desc"]))
                    return e = {
                        sort: n.sortable,
                        field: n.field
                      },
                      !1
                }),
                e
            },
            getHiddenDimensions: function (e, a) {
              var n = {
                  position: "absolute",
                  visibility: "hidden",
                  display: "block"
                },
                i = {
                  width: 0,
                  height: 0,
                  innerWidth: 0,
                  innerHeight: 0,
                  outerWidth: 0,
                  outerHeight: 0
                },
                o = t(e).parents().addBack().not(":visible");
              a = "boolean" == typeof a && a;
              var l = [];
              return o.each(function () {
                  var t = {};
                  for (var e in n)
                    t[e] = this.style[e],
                    this.style[e] = n[e];
                  l.push(t)
                }),
                i.width = t(e).width(),
                i.outerWidth = t(e).outerWidth(a),
                i.innerWidth = t(e).innerWidth(),
                i.height = t(e).height(),
                i.innerHeight = t(e).innerHeight(),
                i.outerHeight = t(e).outerHeight(a),
                o.each(function (t) {
                  var e = l[t];
                  for (var a in n)
                    this.style[a] = e[a]
                }),
                i
            },
            getGeneralSearchKey: function () {
              var e = t(l.getOption("search.input"));
              return l.getOption("search.key") || t(e).prop("name")
            },
            getObject: function (t, e) {
              return t.split(".").reduce(function (t, e) {
                return null !== t && void 0 !== t[e] ? t[e] : null
              }, e)
            },
            extendObj: function (t, e, a) {
              var n = e.split("."),
                i = 0;
              return function t(e) {
                  var o = n[i++];
                  void 0 !== e[o] && null !== e[o] ? "object" != typeof e[o] && "function" != typeof e[o] && (e[o] = {}) : e[o] = {},
                    i === n.length ? e[o] = a : t(e[o])
                }(t),
                t
            },
            rowEvenOdd: function () {
              t(o.tableBody).find(".datatable-row").removeClass("datatable-row-even"),
                t(o.wrap).hasClass("datatable-subtable") ? t(o.tableBody).find(".datatable-row:not(.datatable-row-detail):even").addClass("datatable-row-even") : t(o.tableBody).find(".datatable-row:nth-child(even)").addClass("datatable-row-even")
            },
            timer: 0,
            redraw: function () {
              return l.adjustCellsWidth.call(),
                l.isLocked() && (l.scrollbar(),
                  l.resetScroll(),
                  l.adjustCellsHeight.call()),
                l.adjustLockContainer.call(),
                l.initHeight.call(),
                o
            },
            load: function () {
              return l.reload(),
                o
            },
            reload: function () {
              return function (t, e) {
                  clearTimeout(l.timer),
                    l.timer = setTimeout(t, e)
                }(function () {
                  i.data.serverFiltering || l.localDataUpdate(),
                    l.dataRender(),
                    t(o).trigger("datatable-on-reloaded")
                }, l.getOption("search.delay")),
                o
            },
            getRecord: function (e) {
              return void 0 === o.tableBody && (o.tableBody = t(o.table).children("tbody")),
                t(o.tableBody).find(".datatable-cell:first-child").each(function (a, n) {
                  if (e == t(n).text()) {
                    var i = t(n).closest(".datatable-row").index() + 1;
                    return o.API.record = o.API.value = l.getOneRow(o.tableBody, i),
                      o
                  }
                }),
                o
            },
            getColumn: function (e) {
              return l.setSelectedRecords(),
                o.API.value = t(o.API.record).find('[data-field="' + e + '"]'),
                o
            },
            destroy: function () {
              t(o).parent().find(".datatable-pager").remove();
              var e = t(o.initialDatatable).addClass("datatable-destroyed").show();
              return t(o).replaceWith(e),
                t(o = e).trigger("datatable-on-destroy"),
                l.isInit = !1,
                e = null
            },
            sort: function (e, a) {
              a = void 0 === a ? "asc" : a,
                l.spinnerCallback(!0);
              var n = {
                field: e,
                sort: a
              };
              return l.setDataSourceParam("sort", n),
                setTimeout(function () {
                  l.dataRender("sort"),
                    t(o).trigger("datatable-on-sort", n),
                    t(o.tableHead).find(".datatable-cell > span > i").remove()
                }, 300),
                o
            },
            getValue: function () {
              return t(o.API.value).text()
            },
            setActive: function (e) {
              "string" == typeof e && (e = t(o.tableBody).find('.checkbox-single > [type="checkbox"][value="' + e + '"]')),
                t(e).prop("checked", !0);
              var a = [];
              t(e).each(function (e, n) {
                  t(n).closest("tr").addClass("datatable-row-active");
                  var i = t(n).attr("value");
                  void 0 !== i && a.push(i)
                }),
                t(o).trigger("datatable-on-check", [a])
            },
            setInactive: function (e) {
              "string" == typeof e && (e = t(o.tableBody).find('.checkbox-single > [type="checkbox"][value="' + e + '"]')),
                t(e).prop("checked", !1);
              var a = [];
              t(e).each(function (e, n) {
                  t(n).closest("tr").removeClass("datatable-row-active");
                  var i = t(n).attr("value");
                  void 0 !== i && a.push(i)
                }),
                t(o).trigger("datatable-on-uncheck", [a])
            },
            setActiveAll: function (e) {
              var a = t(o.table).find("> tbody, > thead").find("tr").not(".datatable-row-subtable").find('.datatable-cell-check [type="checkbox"]');
              e ? l.setActive(a) : l.setInactive(a)
            },
            setSelectedRecords: function () {
              return o.API.record = t(o.tableBody).find(".datatable-row-active"),
                o
            },
            getSelectedRecords: function () {
              return l.setSelectedRecords(),
                o.API.record = o.rows(".datatable-row-active").nodes(),
                o.API.record
            },
            getOption: function (t) {
              return l.getObject(t, i)
            },
            setOption: function (t, e) {
              i = l.extendObj(i, t, e)
            },
            search: function (e, a) {
              void 0 !== a && (a = t.makeArray(a)),
                n = function () {
                  var n = l.getDataSourceQuery();
                  if (void 0 === a && void 0 !== e) {
                    var r = l.getGeneralSearchKey();
                    n[r] = e
                  }
                  "object" == typeof a && (t.each(a, function (t, a) {
                        n[a] = e
                      }),
                      t.each(n, function (e, a) {
                        ("" === a || t.isEmptyObject(a)) && delete n[e]
                      })),
                    l.setDataSourceQuery(n),
                    o.setDataSourceParam("pagination", Object.assign({}, o.getDataSourceParam("pagination"), {
                      page: 1
                    })),
                    i.data.serverFiltering || l.localDataUpdate(),
                    l.dataRender("search")
                },
                r = l.getOption("search.delay"),
                clearTimeout(l.timer),
                l.timer = setTimeout(n, r);
              var n, r
            },
            setDataSourceParam: function (e, a) {
              o.API.params = t.extend({}, {
                  pagination: {
                    page: 1,
                    perpage: l.getOption("data.pageSize")
                  },
                  sort: l.getDefaultSortColumn(),
                  query: {}
                }, o.API.params, l.stateGet(l.stateId)),
                o.API.params = l.extendObj(o.API.params, e, a),
                l.stateKeep(l.stateId, o.API.params)
            },
            getDataSourceParam: function (e) {
              return o.API.params = t.extend({}, {
                  pagination: {
                    page: 1,
                    perpage: l.getOption("data.pageSize")
                  },
                  sort: l.getDefaultSortColumn(),
                  query: {}
                }, o.API.params, l.stateGet(l.stateId)),
                "string" == typeof e ? l.getObject(e, o.API.params) : o.API.params
            },
            getDataSourceQuery: function () {
              return l.getDataSourceParam("query") || {}
            },
            setDataSourceQuery: function (t) {
              l.setDataSourceParam("query", t)
            },
            getCurrentPage: function () {
              return t(o.table).siblings(".datatable-pager").last().find(".datatable-pager-nav").find(".datatable-pager-link.datatable-pager-link-active").data("page") || 1
            },
            getPageSize: function () {
              return t(o.table).siblings(".datatable-pager").last().find("select.datatable-pager-size").val() || 10
            },
            getTotalRows: function () {
              return o.API.params.pagination.total
            },
            getDataSet: function () {
              return o.originalDataSet
            },
            nodeTr: [],
            nodeTd: [],
            nodeCols: [],
            recentNode: [],
            table: function () {
              if (void 0 !== o.table)
                return o.table
            },
            row: function (e) {
              return l.rows(e),
                l.nodeTr = l.recentNode = t(l.nodeTr).first(),
                o
            },
            rows: function (e) {
              return l.isLocked() ? l.nodeTr = l.recentNode = t(o.tableBody).find(e).filter(".datatable-lock-scroll > .datatable-row") : l.nodeTr = l.recentNode = t(o.tableBody).find(e).filter(".datatable-row"),
                o
            },
            column: function (e) {
              return l.nodeCols = l.recentNode = t(o.tableBody).find(".datatable-cell:nth-child(" + (e + 1) + ")"),
                o
            },
            columns: function (e) {
              var a = o.table;
              l.nodeTr === l.recentNode && (a = l.nodeTr);
              var n = t(a).find('.datatable-cell[data-field="' + e + '"]');
              return n.length > 0 ? l.nodeCols = l.recentNode = n : l.nodeCols = l.recentNode = t(a).find(e).filter(".datatable-cell"),
                o
            },
            cell: function (e) {
              return l.cells(e),
                l.nodeTd = l.recentNode = t(l.nodeTd).first(),
                o
            },
            cells: function (e) {
              var a = t(o.tableBody).find(".datatable-cell");
              return void 0 !== e && (a = t(a).filter(e)),
                l.nodeTd = l.recentNode = a,
                o
            },
            remove: function () {
              return t(l.nodeTr.length) && l.nodeTr === l.recentNode && t(l.nodeTr).remove(),
                l.layoutUpdate(),
                o
            },
            visible: function (e) {
              if (t(l.recentNode.length)) {
                var a = l.lockEnabledColumns();
                if (l.recentNode === l.nodeCols) {
                  var n = l.recentNode.index();
                  if (l.isLocked()) {
                    var o = t(l.recentNode).closest(".datatable-lock-scroll").length;
                    o ? n += a.left.length + 1 : t(l.recentNode).closest(".datatable-lock-right").length && (n += a.left.length + o + 1)
                  }
                }
                e ? (l.recentNode === l.nodeCols && delete i.columns[n].visible,
                    t(l.recentNode).show()) : (l.recentNode === l.nodeCols && l.setOption("columns." + n + ".visible", !1),
                    t(l.recentNode).hide()),
                  l.columnHide(),
                  l.redraw()
              }
            },
            nodes: function () {
              return l.recentNode
            },
            dataset: function () {
              return o
            },
            gotoPage: function (t) {
              void 0 !== l.pagingObject && (l.isInit = !0,
                l.pagingObject.openPage(t))
            }
          };
          if (t.each(l, function (t, e) {
              o[t] = e
            }),
            void 0 !== i)
            if ("string" == typeof i) {
              var r = i;
              void 0 !== (o = t(this).data(e)) && (i = o.options,
                l[r].apply(this, Array.prototype.slice.call(arguments, 1)))
            } else
              o.data(e) || t(this).hasClass("datatable-loaded") || (o.dataSet = null,
                o.textAlign = {
                  left: "datatable-cell-left",
                  center: "datatable-cell-center",
                  right: "datatable-cell-right"
                },
                i = t.extend(!0, {}, t.fn.KTDatatable.defaults, i),
                o.options = i,
                l.init.apply(this, [i]),
                t(o.wrap).data(e, o));
          else
            void 0 === (o = t(this).data(e)) && t.error("KTDatatable not initialized"),
            i = o.options;
          return o
        }
        console.warn("No KTDatatable element exist.")
      },
      t.fn.KTDatatable.defaults = {
        data: {
          type: "local",
          source: null,
          pageSize: 10,
          saveState: !0,
          serverPaging: !1,
          serverFiltering: !1,
          serverSorting: !1,
          autoColumns: !1,
          attr: {
            rowProps: []
          }
        },
        layout: {
          theme: "default",
          class: "datatable-primary",
          scroll: !1,
          height: null,
          minHeight: null,
          footer: !1,
          header: !0,
          customScrollbar: !0,
          spinner: {
            overlayColor: "#000000",
            opacity: 0,
            type: "loader",
            state: "primary",
            message: !0
          },
          icons: {
            sort: {
              asc: "flaticon2-arrow-up",
              desc: "flaticon2-arrow-down"
            },
            pagination: {
              next: "flaticon2-next",
              prev: "flaticon2-back",
              first: "flaticon2-fast-back",
              last: "flaticon2-fast-next",
              more: "flaticon-more-1"
            },
            rowDetail: {
              expand: "fa fa-caret-down",
              collapse: "fa fa-caret-right"
            }
          }
        },
        sortable: !0,
        resizable: !1,
        filterable: !1,
        pagination: !0,
        editable: !1,
        columns: [],
        search: {
          onEnter: !1,
          input: null,
          delay: 400,
          key: null
        },
        rows: {
          callback: function () {},
          beforeTemplate: function () {},
          afterTemplate: function () {},
          autoHide: !0
        },
        toolbar: {
          layout: ["pagination", "info"],
          placement: ["bottom"],
          items: {
            pagination: {
              type: "default",
              pages: {
                desktop: {
                  layout: "default",
                  pagesNumber: 5
                },
                tablet: {
                  layout: "default",
                  pagesNumber: 3
                },
                mobile: {
                  layout: "compact"
                }
              },
              navigation: {
                prev: !0,
                next: !0,
                first: !0,
                last: !0,
                more: !1
              },
              pageSizeSelect: []
            },
            info: !0
          }
        },
        translate: {
          records: {
            processing: "Please wait...",
            noRecords: "No records found"
          },
          toolbar: {
            pagination: {
              items: {
                default: {
                  first: "First",
                  prev: "Previous",
                  next: "Next",
                  last: "Last",
                  more: "More pages",
                  input: "Page number",
                  select: "Select page size",
                  all: "all"
                },
                info: "Showing {{start}} - {{end}} of {{total}}"
              }
            }
          }
        },
        extensions: {}
      }
  }(jQuery),
  function (t) {
    
    t.fn.KTDatatable = t.fn.KTDatatable || {},
      t.fn.KTDatatable.checkbox = function (e, a) {
        var n = {
          selectedAllRows: !1,
          selectedRows: [],
          unselectedRows: [],
          init: function () {
            n.selectorEnabled() && (e.setDataSourceParam(a.vars.selectedAllRows, !1),
              e.stateRemove("checkbox"),
              a.vars.requestIds && e.setDataSourceParam(a.vars.requestIds, !0),
              t(e).on("datatable-on-reloaded", function () {
                e.stateRemove("checkbox"),
                  e.setDataSourceParam(a.vars.selectedAllRows, !1),
                  n.selectedAllRows = !1,
                  n.selectedRows = [],
                  n.unselectedRows = []
              }),
              n.selectedAllRows = e.getDataSourceParam(a.vars.selectedAllRows),
              t(e).on("datatable-on-layout-updated", function (a, i) {
                i.table == t(e.wrap).attr("id") && e.ready(function () {
                  n.initVars(),
                    n.initEvent(),
                    n.initSelect()
                })
              }),
              t(e).on("datatable-on-check", function (a, i) {
                i.forEach(function (t) {
                  n.selectedRows.push(t),
                    n.unselectedRows = n.remove(n.unselectedRows, t)
                });
                var o = {};
                o.selectedRows = t.unique(n.selectedRows),
                  o.unselectedRows = t.unique(n.unselectedRows),
                  e.stateKeep("checkbox", o)
              }),
              t(e).on("datatable-on-uncheck", function (a, i) {
                i.forEach(function (t) {
                  n.unselectedRows.push(t),
                    n.selectedRows = n.remove(n.selectedRows, t)
                });
                var o = {};
                o.selectedRows = t.unique(n.selectedRows),
                  o.unselectedRows = t.unique(n.unselectedRows),
                  e.stateKeep("checkbox", o)
              }))
          },
          initEvent: function () {
            t(e.tableHead).find('.checkbox-all > [type="checkbox"]').click(function (i) {
                if (n.selectedRows = n.unselectedRows = [],
                  e.stateRemove("checkbox"),
                  n.selectedAllRows = !!t(this).is(":checked"),
                  !a.vars.requestIds) {
                  t(this).is(":checked") && (n.selectedRows = t.makeArray(t(e.tableBody).find('.checkbox-single > [type="checkbox"]').map(function (e, a) {
                    return t(a).val()
                  })));
                  var o = {};
                  o.selectedRows = t.unique(n.selectedRows),
                    e.stateKeep("checkbox", o)
                }
                e.setDataSourceParam(a.vars.selectedAllRows, n.selectedAllRows),
                  t(e).trigger("datatable-on-click-checkbox", [t(this)])
              }),
              t(e.tableBody).find('.checkbox-single > [type="checkbox"]').click(function (i) {
                var o = t(this).val();
                t(this).is(":checked") ? (n.selectedRows.push(o),
                    n.unselectedRows = n.remove(n.unselectedRows, o)) : (n.unselectedRows.push(o),
                    n.selectedRows = n.remove(n.selectedRows, o)),
                  !a.vars.requestIds && n.selectedRows.length < 1 && t(e.tableHead).find('.checkbox-all > [type="checkbox"]').prop("checked", !1);
                var l = {};
                l.selectedRows = n.selectedRows.filter(n.unique),
                  l.unselectedRows = n.unselectedRows.filter(n.unique),
                  e.stateKeep("checkbox", l),
                  t(e).trigger("datatable-on-click-checkbox", [t(this)])
              })
          },
          unique: function (t, e, a) {
            return a.indexOf(t) === e
          },
          initSelect: function () {
            n.selectedAllRows && a.vars.requestIds ? (e.hasClass("datatable-error") || t(e.tableHead).find('.checkbox-all > [type="checkbox"]').prop("checked", !0),
              e.setActiveAll(!0),
              n.unselectedRows.forEach(function (t) {
                e.setInactive(t)
              })) : (n.selectedRows.forEach(function (t) {
                e.setActive(t)
              }),
              !e.hasClass("datatable-error") && t(e.tableBody).find('.checkbox-single > [type="checkbox"]').not(":checked").length < 1 && t(e.tableHead).find('.checkbox-all > [type="checkbox"]').prop("checked", !0))
          },
          selectorEnabled: function () {
            return t.grep(e.options.columns, function (t, e) {
              return t.selector || !1
            })[0]
          },
          initVars: function () {
            var t = e.stateGet("checkbox");
            void 0 !== t && (n.selectedRows = t.selectedRows || [],
              n.unselectedRows = t.unselectedRows || [])
          },
          getSelectedId: function (i) {
            if (n.initVars(),
              n.selectedAllRows && a.vars.requestIds) {
              void 0 === i && (i = a.vars.rowIds);
              var o = e.getObject(i, e.lastResponse) || [];
              return o.length > 0 && n.unselectedRows.forEach(function (t) {
                  o = n.remove(o, parseInt(t))
                }),
                t.unique(o)
            }
            return n.selectedRows
          },
          remove: function (t, e) {
            return t.filter(function (t) {
              return t !== e
            })
          }
        };
        return e.checkbox = function () {
            return n
          },
          "object" == typeof a && (a = t.extend(!0, {}, t.fn.KTDatatable.checkbox.default, a),
            n.init.apply(this, [a])),
          e
      },
      t.fn.KTDatatable.checkbox.default = {
        vars: {
          selectedAllRows: "selectedAllRows",
          requestIds: "requestIds",
          rowIds: "meta.rowIds"
        }
      }
  }(jQuery);
  
var KTWidgets = function () {
  var t = function (t) {
    var e = KTUtil.getById(t);
    KTUtil.on(e, "thead th .checkbox > input", "change", function (t) {
      for (var o = KTUtil.findAll(e, "tbody td .checkbox > input"), s = 0, a = o.length; s < a; s++)
        o[s].checked = this.checked
    })
  };
  return {
    init: function () {
      console.log(KTApp.getSettings())
      // ! function () {
      //   if (0 != $("#kt_dashboard_daterangepicker").length) {
      //     var t = $("#kt_dashboard_daterangepicker"),
      //       e = moment(),
      //       o = moment();
      //     t.daterangepicker({
      //         direction: KTUtil.isRTL(),
      //         startDate: e,
      //         endDate: o,
      //         opens: "left",
      //         applyClass: "btn-primary",
      //         cancelClass: "btn-light-primary",
      //         ranges: {
      //           Today: [moment(), moment()],
      //           Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
      //           "Last 7 Days": [moment().subtract(6, "days"), moment()],
      //           "Last 30 Days": [moment().subtract(29, "days"), moment()],
      //           "This Month": [moment().startOf("month"), moment().endOf("month")],
      //           "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
      //         }
      //       }, s),
      //       s(e, o, "")
      //   }

      //   function s(t, e, o) {
      //     var s = "",
      //       a = "";
      //     e - t < 100 || "Today" == o ? (s = "Today:",
      //         a = t.format("MMM D")) : "Yesterday" == o ? (s = "Yesterday:",
      //         a = t.format("MMM D")) : a = t.format("MMM D") + " - " + e.format("MMM D"),
      //       $("#kt_dashboard_daterangepicker_date").html(a),
      //       $("#kt_dashboard_daterangepicker_title").html(s)
      //   }
      // }(),
      ! function () {
        var t = document.getElementById("kt_stats_widget_7_chart");
        if (t) {
          var e = {
            series: [{
              name: "Net Profit",
              data: [30, 45, 32, 70, 40]
            }],
            chart: {
              type: "area",
              height: 150,
              toolbar: {
                show: !1
              },
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "solid",
              opacity: 1
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 3,
              colors: [KTApp.getSettings().colors.theme.base.success]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                show: !1,
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.gray["gray-300"],
                  width: 1,
                  dashArray: 3
                }
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.light.success],
            markers: {
              colors: [KTApp.getSettings().colors.theme.light.success],
              strokeColor: [KTApp.getSettings().colors.theme.base.success],
              strokeWidth: 3
            }
          };
          new ApexCharts(t, e).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_stats_widget_8_chart");
        if (t) {
          var e = {
            series: [{
              name: "Net Profit",
              data: [30, 45, 32, 70, 40]
            }],
            chart: {
              type: "area",
              height: 150,
              toolbar: {
                show: !1
              },
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "solid",
              opacity: 1
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 3,
              colors: [KTApp.getSettings().colors.theme.base.danger]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                show: !1,
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.gray["gray-300"],
                  width: 1,
                  dashArray: 3
                }
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.light.danger],
            markers: {
              colors: [KTApp.getSettings().colors.theme.light.danger],
              strokeColor: [KTApp.getSettings().colors.theme.base.danger],
              strokeWidth: 3
            }
          };
          new ApexCharts(t, e).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_stats_widget_9_chart");
        if (t) {
          var e = {
            series: [{
              name: "Net Profit",
              data: [30, 45, 32, 70, 40]
            }],
            chart: {
              type: "area",
              height: 150,
              toolbar: {
                show: !1
              },
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "solid",
              opacity: 1
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 3,
              colors: [KTApp.getSettings().colors.theme.base.primary]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                show: !1,
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.gray["gray-300"],
                  width: 1,
                  dashArray: 3
                }
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.light.primary],
            markers: {
              colors: [KTApp.getSettings().colors.theme.light.primary],
              strokeColor: [KTApp.getSettings().colors.theme.base.primary],
              strokeWidth: 3
            }
          };
          new ApexCharts(t, e).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_stats_widget_10_chart"),
          e = parseInt(KTUtil.css(t, "height")),
          o = KTUtil.hasAttr(t, "data-color") ? KTUtil.attr(t, "data-color") : "info";
        if (t) {
          var s = {
            series: [{
              name: "Net Profit",
              data: [40, 40, 30, 30, 35, 35, 50]
            }],
            chart: {
              type: "area",
              height: e,
              toolbar: {
                show: !1
              },
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "solid",
              opacity: 1
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 3,
              colors: [KTApp.getSettings().colors.theme.base[o]]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                show: !1,
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.gray["gray-300"],
                  width: 1,
                  dashArray: 3
                }
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              min: 0,
              max: 55,
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.light[o]],
            markers: {
              colors: [KTApp.getSettings().colors.theme.light[o]],
              strokeColor: [KTApp.getSettings().colors.theme.base[o]],
              strokeWidth: 3
            }
          };
          new ApexCharts(t, s).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_stats_widget_11_chart"),
          e = (parseInt(KTUtil.css(t, "height")),
            KTUtil.hasAttr(t, "data-color") ? KTUtil.attr(t, "data-color") : "success");
        if (t) {
          var o = {
            series: [{
              name: "Net Profit",
              data: [40, 40, 30, 30, 35, 35, 50]
            }],
            chart: {
              type: "area",
              height: 150,
              toolbar: {
                show: !1
              },
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "solid",
              opacity: 1
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 3,
              colors: [KTApp.getSettings().colors.theme.base[e]]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Aug", "Sep"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                show: !1,
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.gray["gray-300"],
                  width: 1,
                  dashArray: 3
                }
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              min: 0,
              max: 55,
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.light[e]],
            markers: {
              colors: [KTApp.getSettings().colors.theme.light[e]],
              strokeColor: [KTApp.getSettings().colors.theme.base[e]],
              strokeWidth: 3
            }
          };
          new ApexCharts(t, o).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_stats_widget_12_chart"),
          e = parseInt(KTUtil.css(t, "height")),
          o = KTUtil.hasAttr(t, "data-color") ? KTUtil.attr(t, "data-color") : "primary";
        if (t) {
          var s = {
            series: [{
              name: "Net Profit",
              data: [40, 40, 30, 30, 35, 35, 50]
            }],
            chart: {
              type: "area",
              height: e,
              toolbar: {
                show: !1
              },
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "solid",
              opacity: 1
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 3,
              colors: [KTApp.getSettings().colors.theme.base[o]]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Aug", "Sep"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                show: !1,
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.gray["gray-300"],
                  width: 1,
                  dashArray: 3
                }
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              min: 0,
              max: 55,
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.light[o]],
            markers: {
              colors: [KTApp.getSettings().colors.theme.light[o]],
              strokeColor: [KTApp.getSettings().colors.theme.base[o]],
              strokeWidth: 3
            }
          };
          new ApexCharts(t, s).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_charts_widget_1_chart");
        if (t) {
          var e = {
            series: [{
              name: "Net Profit",
              data: [44, 55, 57, 56, 61, 58]
            }, {
              name: "Revenue",
              data: [76, 85, 101, 98, 87, 105]
            }],
            chart: {
              type: "bar",
              height: 350,
              toolbar: {
                show: !1
              }
            },
            plotOptions: {
              bar: {
                horizontal: !1,
                columnWidth: ["30%"],
                endingShape: "rounded"
              }
            },
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            stroke: {
              show: !0,
              width: 2,
              colors: ["transparent"]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              labels: {
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            fill: {
              opacity: 1
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.base.success, KTApp.getSettings().colors.gray["gray-300"]],
            grid: {
              borderColor: KTApp.getSettings().colors.gray["gray-200"],
              strokeDashArray: 4,
              yaxis: {
                lines: {
                  show: !0
                }
              }
            }
          };
          new ApexCharts(t, e).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_charts_widget_2_chart");
        if (t) {
          var e = {
            series: [{
              name: "Net Profit",
              data: [44, 55, 57, 56, 61, 58]
            }, {
              name: "Revenue",
              data: [76, 85, 101, 98, 87, 105]
            }],
            chart: {
              type: "bar",
              height: 350,
              toolbar: {
                show: !1
              }
            },
            plotOptions: {
              bar: {
                horizontal: !1,
                columnWidth: ["30%"],
                endingShape: "rounded"
              }
            },
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            stroke: {
              show: !0,
              width: 2,
              colors: ["transparent"]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              labels: {
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            fill: {
              opacity: 1
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.base.warning, KTApp.getSettings().colors.gray["gray-300"]],
            grid: {
              borderColor: KTApp.getSettings().colors.gray["gray-200"],
              strokeDashArray: 4,
              yaxis: {
                lines: {
                  show: !0
                }
              }
            }
          };
          new ApexCharts(t, e).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_charts_widget_3_chart");
        if (t) {
          var e = {
            series: [{
              name: "Net Profit",
              data: [30, 40, 40, 90, 90, 70, 70]
            }],
            chart: {
              type: "area",
              height: 350,
              toolbar: {
                show: !1
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "solid",
              opacity: 1
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 3,
              colors: [KTApp.getSettings().colors.theme.base.info]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.theme.base.info,
                  width: 1,
                  dashArray: 3
                }
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              labels: {
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.light.info],
            grid: {
              borderColor: KTApp.getSettings().colors.gray["gray-200"],
              strokeDashArray: 4,
              yaxis: {
                lines: {
                  show: !0
                }
              }
            },
            markers: {
              strokeColor: KTApp.getSettings().colors.theme.base.info,
              strokeWidth: 3
            }
          };
          new ApexCharts(t, e).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_charts_widget_4_chart");
        if (t) {
          var e = {
            series: [{
              name: "Net Profit",
              data: [60, 50, 80, 40, 100, 60]
            }, {
              name: "Revenue",
              data: [70, 60, 110, 40, 50, 70]
            }],
            chart: {
              type: "area",
              height: 350,
              toolbar: {
                show: !1
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "solid",
              opacity: 1
            },
            stroke: {
              curve: "smooth"
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.theme.light.success,
                  width: 1,
                  dashArray: 3
                }
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              labels: {
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.base.success, KTApp.getSettings().colors.theme.base.warning],
            grid: {
              borderColor: KTApp.getSettings().colors.gray["gray-200"],
              strokeDashArray: 4,
              yaxis: {
                lines: {
                  show: !0
                }
              }
            },
            markers: {
              colors: [KTApp.getSettings().colors.theme.light.success, KTApp.getSettings().colors.theme.light.warning],
              strokeColor: [KTApp.getSettings().colors.theme.light.success, KTApp.getSettings().colors.theme.light.warning],
              strokeWidth: 3
            }
          };
          new ApexCharts(t, e).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_charts_widget_5_chart");
        if (t) {
          var e = {
            series: [{
              name: "Net Profit",
              data: [40, 50, 65, 70, 50, 30]
            }, {
              name: "Revenue",
              data: [-30, -40, -55, -60, -40, -20]
            }],
            chart: {
              type: "bar",
              stacked: !0,
              height: 350,
              toolbar: {
                show: !1
              }
            },
            plotOptions: {
              bar: {
                horizontal: !1,
                columnWidth: ["12%"],
                endingShape: "rounded"
              }
            },
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            stroke: {
              show: !0,
              width: 2,
              colors: ["transparent"]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              min: -80,
              max: 80,
              labels: {
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            fill: {
              opacity: 1
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.base.info, KTApp.getSettings().colors.theme.base.primary],
            grid: {
              borderColor: KTApp.getSettings().colors.gray["gray-200"],
              strokeDashArray: 4,
              yaxis: {
                lines: {
                  show: !0
                }
              }
            }
          };
          new ApexCharts(t, e).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_charts_widget_6_chart");
        if (t) {
          var e = {
            series: [{
              name: "Net Profit",
              type: "bar",
              stacked: !0,
              data: [40, 50, 65, 70, 50, 30]
            }, {
              name: "Revenue",
              type: "bar",
              stacked: !0,
              data: [20, 20, 25, 30, 30, 20]
            }, {
              name: "Expenses",
              type: "area",
              data: [50, 80, 60, 90, 50, 70]
            }],
            chart: {
              stacked: !0,
              height: 350,
              toolbar: {
                show: !1
              }
            },
            plotOptions: {
              bar: {
                stacked: !0,
                horizontal: !1,
                endingShape: "rounded",
                columnWidth: ["12%"]
              }
            },
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 2,
              colors: ["transparent"]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              max: 120,
              labels: {
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            fill: {
              opacity: 1
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.base.info, KTApp.getSettings().colors.theme.base.primary, KTApp.getSettings().colors.theme.light.primary],
            grid: {
              borderColor: KTApp.getSettings().colors.gray["gray-200"],
              strokeDashArray: 4,
              yaxis: {
                lines: {
                  show: !0
                }
              },
              padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
              }
            }
          };
          new ApexCharts(t, e).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_charts_widget_7_chart");
        if (t) {
          var e = {
            series: [{
              name: "Net Profit",
              data: [30, 30, 50, 50, 35, 35]
            }, {
              name: "Revenue",
              data: [55, 20, 20, 20, 70, 70]
            }, {
              name: "Expenses",
              data: [60, 60, 40, 40, 30, 30]
            }],
            chart: {
              type: "area",
              height: 300,
              toolbar: {
                show: !1
              },
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "solid",
              opacity: 1
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 2,
              colors: [KTApp.getSettings().colors.theme.base.warning, "transparent", "transparent"]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                show: !1,
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.gray["gray-300"],
                  width: 1,
                  dashArray: 3
                }
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.light.warning, KTApp.getSettings().colors.theme.light.info, KTApp.getSettings().colors.gray["gray-100"]],
            grid: {
              borderColor: KTApp.getSettings().colors.gray["gray-200"],
              strokeDashArray: 4,
              yaxis: {
                lines: {
                  show: !0
                }
              }
            },
            markers: {
              colors: [KTApp.getSettings().colors.theme.light.warning, KTApp.getSettings().colors.theme.light.info, KTApp.getSettings().colors.gray["gray-100"]],
              strokeColor: [KTApp.getSettings().colors.theme.base.warning, KTApp.getSettings().colors.theme.base.info, KTApp.getSettings().colors.gray["gray-500"]],
              strokeWidth: 3
            }
          };
          new ApexCharts(t, e).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_charts_widget_8_chart");
        if (t) {
          var e = {
            series: [{
              name: "Net Profit",
              data: [30, 30, 50, 50, 35, 35]
            }, {
              name: "Revenue",
              data: [55, 20, 20, 20, 70, 70]
            }, {
              name: "Expenses",
              data: [60, 60, 40, 40, 30, 30]
            }],
            chart: {
              type: "area",
              height: 300,
              toolbar: {
                show: !1
              },
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "solid",
              opacity: 1
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 2,
              colors: ["transparent", "transparent", "transparent"]
            },
            xaxis: {
              x: 0,
              offsetX: 0,
              offsetY: 0,
              padding: {
                left: 0,
                right: 0,
                top: 0
              },
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                show: !1,
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.gray["gray-300"],
                  width: 1,
                  dashArray: 3
                }
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              y: 0,
              offsetX: 0,
              offsetY: 0,
              padding: {
                left: 0,
                right: 0
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.light.success, KTApp.getSettings().colors.theme.light.danger, KTApp.getSettings().colors.theme.light.info],
            grid: {
              borderColor: KTApp.getSettings().colors.gray["gray-200"],
              strokeDashArray: 4,
              padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
              }
            },
            markers: {
              colors: [KTApp.getSettings().colors.theme.light.success, KTApp.getSettings().colors.theme.light.danger, KTApp.getSettings().colors.theme.light.info],
              strokeColor: [KTApp.getSettings().colors.theme.base.success, KTApp.getSettings().colors.theme.base.danger, KTApp.getSettings().colors.theme.base.info],
              strokeWidth: 3
            }
          };
          new ApexCharts(t, e).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_mixed_widget_1_chart"),
          e = parseInt(KTUtil.css(t, "height"));
        if (t) {
          var o = {
            series: [{
              name: "Net Profit",
              data: [30, 45, 32, 70, 40, 40, 40]
            }],
            chart: {
              type: "area",
              height: e,
              toolbar: {
                show: !1
              },
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              },
              dropShadow: {
                enabled: !0,
                enabledOnSeries: void 0,
                top: 5,
                left: 0,
                blur: 3,
                color: "#D13647",
                opacity: .5
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "solid",
              opacity: 0
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 3,
              colors: ["#D13647"]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                show: !1,
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.gray["gray-300"],
                  width: 1,
                  dashArray: 3
                }
              }
            },
            yaxis: {
              min: 0,
              max: 80,
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              },
              marker: {
                show: !1
              }
            },
            colors: ["transparent"],
            markers: {
              colors: [KTApp.getSettings().colors.theme.light.danger],
              strokeColor: ["#D13647"],
              strokeWidth: 3
            }
          };
          new ApexCharts(t, o).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_mixed_widget_2_chart"),
          e = parseInt(KTUtil.css(t, "height"));
        if (t) {
          var o = {
            series: [{
              name: "Net Profit",
              data: [30, 45, 32, 70, 40, 40, 40]
            }],
            chart: {
              type: "area",
              height: e,
              toolbar: {
                show: !1
              },
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              },
              dropShadow: {
                enabled: !0,
                enabledOnSeries: void 0,
                top: 5,
                left: 0,
                blur: 3,
                color: "#287ED7",
                opacity: .5
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "solid",
              opacity: 0
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 3,
              colors: ["#287ED7"]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                show: !1,
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.gray["gray-300"],
                  width: 1,
                  dashArray: 3
                }
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              min: 0,
              max: 80,
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              },
              marker: {
                show: !1
              }
            },
            colors: ["transparent"],
            markers: {
              colors: [KTApp.getSettings().colors.theme.light.info],
              strokeColor: ["#287ED7"],
              strokeWidth: 3
            }
          };
          new ApexCharts(t, o).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_mixed_widget_3_chart"),
          e = parseInt(KTUtil.css(t, "height"));
        if (t) {
          var o = KTApp.getSettings().colors.theme.base.white,
            s = {
              series: [{
                name: "Net Profit",
                data: [30, 45, 32, 70, 40, 40, 40]
              }],
              chart: {
                type: "area",
                height: e,
                toolbar: {
                  show: !1
                },
                zoom: {
                  enabled: !1
                },
                sparkline: {
                  enabled: !0
                },
                dropShadow: {
                  enabled: !0,
                  enabledOnSeries: void 0,
                  top: 5,
                  left: 0,
                  blur: 3,
                  color: o,
                  opacity: .3
                }
              },
              plotOptions: {},
              legend: {
                show: !1
              },
              dataLabels: {
                enabled: !1
              },
              fill: {
                type: "solid",
                opacity: 0
              },
              stroke: {
                curve: "smooth",
                show: !0,
                width: 3,
                colors: [o]
              },
              xaxis: {
                categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                axisBorder: {
                  show: !1
                },
                axisTicks: {
                  show: !1
                },
                labels: {
                  show: !1,
                  style: {
                    colors: KTApp.getSettings().colors.gray["gray-500"],
                    fontSize: "12px",
                    fontFamily: KTApp.getSettings()["font-family"]
                  }
                },
                crosshairs: {
                  show: !1,
                  position: "front",
                  stroke: {
                    color: KTApp.getSettings().colors.gray["gray-300"],
                    width: 1,
                    dashArray: 3
                  }
                },
                tooltip: {
                  enabled: !0,
                  formatter: void 0,
                  offsetY: 0,
                  style: {
                    fontSize: "12px",
                    fontFamily: KTApp.getSettings()["font-family"]
                  }
                }
              },
              yaxis: {
                min: 0,
                max: 80,
                labels: {
                  show: !1,
                  style: {
                    colors: KTApp.getSettings().colors.gray["gray-500"],
                    fontSize: "12px",
                    fontFamily: KTApp.getSettings()["font-family"]
                  }
                }
              },
              states: {
                normal: {
                  filter: {
                    type: "none",
                    value: 0
                  }
                },
                hover: {
                  filter: {
                    type: "none",
                    value: 0
                  }
                },
                active: {
                  allowMultipleDataPointsSelection: !1,
                  filter: {
                    type: "none",
                    value: 0
                  }
                }
              },
              tooltip: {
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                },
                y: {
                  formatter: function (t) {
                    return "$" + t + " thousands"
                  }
                },
                marker: {
                  show: !1
                }
              },
              colors: ["transparent"],
              markers: {
                colors: [KTApp.getSettings().colors.theme.light.dark],
                strokeColor: [o],
                strokeWidth: 3
              }
            };
          new ApexCharts(t, s).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_mixed_widget_4_chart"),
          e = parseInt(KTUtil.css(t, "height"));
        if (t) {
          var o = {
            series: [{
              name: "Net Profit",
              data: [35, 65, 75, 55, 45, 60, 55]
            }, {
              name: "Revenue",
              data: [40, 70, 80, 60, 50, 65, 60]
            }],
            chart: {
              type: "bar",
              height: e,
              toolbar: {
                show: !1
              },
              sparkline: {
                enabled: !0
              }
            },
            plotOptions: {
              bar: {
                horizontal: !1,
                columnWidth: ["30%"],
                endingShape: "rounded"
              }
            },
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            stroke: {
              show: !0,
              width: 1,
              colors: ["transparent"]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              min: 0,
              max: 100,
              labels: {
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            fill: {
              type: ["solid", "solid"],
              opacity: [.25, 1]
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              },
              marker: {
                show: !1
              }
            },
            colors: ["#ffffff", "#ffffff"],
            grid: {
              borderColor: KTApp.getSettings().colors.gray["gray-200"],
              strokeDashArray: 4,
              yaxis: {
                lines: {
                  show: !0
                }
              },
              padding: {
                left: 20,
                right: 20
              }
            }
          };
          new ApexCharts(t, o).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_mixed_widget_5_chart"),
          e = parseInt(KTUtil.css(t, "height"));
        if (t) {
          var o = {
            series: [{
              name: "Net Profit",
              data: [35, 65, 75, 55, 45, 60, 55]
            }, {
              name: "Revenue",
              data: [40, 70, 80, 60, 50, 65, 60]
            }],
            chart: {
              type: "bar",
              height: e,
              toolbar: {
                show: !1
              },
              sparkline: {
                enabled: !0
              }
            },
            plotOptions: {
              bar: {
                horizontal: !1,
                columnWidth: ["30%"],
                endingShape: "rounded"
              }
            },
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            stroke: {
              show: !0,
              width: 1,
              colors: ["transparent"]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              min: 0,
              max: 100,
              labels: {
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            fill: {
              type: ["solid", "solid"],
              opacity: [.25, 1]
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              },
              marker: {
                show: !1
              }
            },
            colors: ["#ffffff", "#ffffff"],
            grid: {
              borderColor: KTApp.getSettings().colors.gray["gray-200"],
              strokeDashArray: 4,
              yaxis: {
                lines: {
                  show: !0
                }
              },
              padding: {
                left: 20,
                right: 20
              }
            }
          };
          new ApexCharts(t, o).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_mixed_widget_6_chart"),
          e = parseInt(KTUtil.css(t, "height"));
        if (t) {
          var o = {
            series: [{
              name: "Net Profit",
              data: [35, 65, 75, 55, 45, 60, 55]
            }, {
              name: "Revenue",
              data: [40, 70, 80, 60, 50, 65, 60]
            }],
            chart: {
              type: "bar",
              height: e,
              toolbar: {
                show: !1
              },
              sparkline: {
                enabled: !0
              }
            },
            plotOptions: {
              bar: {
                horizontal: !1,
                columnWidth: ["30%"],
                endingShape: "rounded"
              }
            },
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            stroke: {
              show: !0,
              width: 1,
              colors: ["transparent"]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              min: 0,
              max: 100,
              labels: {
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            fill: {
              type: ["solid", "solid"],
              opacity: [.25, 1]
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              },
              marker: {
                show: !1
              }
            },
            colors: ["#ffffff", "#ffffff"],
            grid: {
              borderColor: KTApp.getSettings().colors.gray["gray-200"],
              strokeDashArray: 4,
              yaxis: {
                lines: {
                  show: !0
                }
              },
              padding: {
                left: 20,
                right: 20
              }
            }
          };
          new ApexCharts(t, o).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_mixed_widget_13_chart"),
          e = parseInt(KTUtil.css(t, "height"));
        if (t) {
          var o = {
            series: [{
              name: "Net Profit",
              data: [30, 25, 45, 30, 55, 55]
            }],
            chart: {
              type: "area",
              height: e,
              toolbar: {
                show: !1
              },
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "solid",
              opacity: 1
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 3,
              colors: [KTApp.getSettings().colors.theme.base.info]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                show: !1,
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.gray["gray-300"],
                  width: 1,
                  dashArray: 3
                }
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              min: 0,
              max: 60,
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.light.info],
            markers: {
              colors: [KTApp.getSettings().colors.theme.light.info],
              strokeColor: [KTApp.getSettings().colors.theme.base.info],
              strokeWidth: 3
            }
          };
          new ApexCharts(t, o).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_mixed_widget_14_chart"),
          e = parseInt(KTUtil.css(t, "height"));
        if (t) {
          var o = {
            series: [74],
            chart: {
              height: e,
              type: "radialBar"
            },
            plotOptions: {
              radialBar: {
                hollow: {
                  margin: 0,
                  size: "65%"
                },
                dataLabels: {
                  showOn: "always",
                  name: {
                    show: !1,
                    fontWeight: "700"
                  },
                  value: {
                    color: KTApp.getSettings().colors.gray["gray-700"],
                    fontSize: "30px",
                    fontWeight: "700",
                    offsetY: 12,
                    show: !0
                  }
                },
                track: {
                  background: KTApp.getSettings().colors.theme.light.success,
                  strokeWidth: "100%"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.base.success],
            stroke: {
              lineCap: "round"
            },
            labels: ["Progress"]
          };
          new ApexCharts(t, o).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_mixed_widget_15_chart"),
          e = parseInt(KTUtil.css(t, "height"));
        if (t) {
          var o = {
            series: [{
              name: "Net Profit",
              data: [30, 30, 60, 25, 25, 40]
            }],
            chart: {
              type: "area",
              height: e,
              toolbar: {
                show: !1
              },
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "gradient",
              opacity: 1,
              gradient: {
                type: "vertical",
                shadeIntensity: .5,
                gradientToColors: void 0,
                inverseColors: !0,
                opacityFrom: 1,
                opacityTo: .375,
                stops: [25, 50, 100],
                colorStops: []
              }
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 3,
              colors: [KTApp.getSettings().colors.theme.base.danger]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                show: !1,
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.gray["gray-300"],
                  width: 1,
                  dashArray: 3
                }
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              min: 0,
              max: 65,
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.light.danger],
            markers: {
              colors: [KTApp.getSettings().colors.theme.light.danger],
              strokeColor: [KTApp.getSettings().colors.theme.base.danger],
              strokeWidth: 3
            }
          };
          new ApexCharts(t, o).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_mixed_widget_16_chart"),
          e = parseInt(KTUtil.css(t, "height"));
        if (t) {
          var o = {
            series: [60, 50, 75, 80],
            chart: {
              height: e,
              type: "radialBar"
            },
            plotOptions: {
              radialBar: {
                hollow: {
                  margin: 0,
                  size: "30%"
                },
                dataLabels: {
                  showOn: "always",
                  name: {
                    show: !1,
                    fontWeight: "700"
                  },
                  value: {
                    color: KTApp.getSettings().colors.gray["gray-700"],
                    fontSize: "18px",
                    fontWeight: "700",
                    offsetY: 10,
                    show: !0
                  },
                  total: {
                    show: !0,
                    label: "Total",
                    fontWeight: "bold",
                    formatter: function (t) {
                      return "60%"
                    }
                  }
                },
                track: {
                  background: KTApp.getSettings().colors.gray["gray-100"],
                  strokeWidth: "100%"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.base.info, KTApp.getSettings().colors.theme.base.danger, KTApp.getSettings().colors.theme.base.success, KTApp.getSettings().colors.theme.base.primary],
            stroke: {
              lineCap: "round"
            },
            labels: ["Progress"]
          };
          new ApexCharts(t, o).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_mixed_widget_17_chart"),
          e = KTUtil.hasAttr(t, "data-color") ? KTUtil.attr(t, "data-color") : "warning",
          o = parseInt(KTUtil.css(t, "height"));
        if (t) {
          var s = {
            series: [{
              name: "Net Profit",
              data: [30, 25, 45, 30, 55, 55]
            }],
            chart: {
              type: "area",
              height: o,
              toolbar: {
                show: !1
              },
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "solid",
              opacity: 1
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 3,
              colors: [KTApp.getSettings().colors.theme.base[e]]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                show: !1,
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.gray["gray-300"],
                  width: 1,
                  dashArray: 3
                }
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              min: 0,
              max: 60,
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.light[e]],
            markers: {
              colors: [KTApp.getSettings().colors.theme.light[e]],
              strokeColor: [KTApp.getSettings().colors.theme.base[e]],
              strokeWidth: 3
            }
          };
          new ApexCharts(t, s).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_mixed_widget_18_chart"),
          e = parseInt(KTUtil.css(t, "height"));
        if (t) {
          var o = {
            series: [74],
            chart: {
              height: e,
              type: "radialBar",
              offsetY: 0
            },
            plotOptions: {
              radialBar: {
                startAngle: -90,
                endAngle: 90,
                hollow: {
                  margin: 0,
                  size: "70%"
                },
                dataLabels: {
                  showOn: "always",
                  name: {
                    show: !0,
                    fontSize: "13px",
                    fontWeight: "700",
                    offsetY: -5,
                    color: KTApp.getSettings().colors.gray["gray-500"]
                  },
                  value: {
                    color: KTApp.getSettings().colors.gray["gray-700"],
                    fontSize: "30px",
                    fontWeight: "700",
                    offsetY: -40,
                    show: !0
                  }
                },
                track: {
                  background: KTApp.getSettings().colors.theme.light.primary,
                  strokeWidth: "100%"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.base.primary],
            stroke: {
              lineCap: "round"
            },
            labels: ["Progress"]
          };
          new ApexCharts(t, o).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_tiles_widget_1_chart"),
          e = KTUtil.hasAttr(t, "data-color") ? KTUtil.attr(t, "data-color") : "primary",
          o = parseInt(KTUtil.css(t, "height"));
        if (t) {
          var s = {
            series: [{
              name: "Net Profit",
              data: [20, 22, 30, 28, 25, 26, 30, 28, 22, 24, 25, 35]
            }],
            chart: {
              type: "area",
              height: o,
              toolbar: {
                show: !1
              },
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "gradient",
              opacity: 1,
              gradient: {
                type: "vertical",
                shadeIntensity: .55,
                gradientToColors: void 0,
                inverseColors: !0,
                opacityFrom: 1,
                opacityTo: .2,
                stops: [25, 50, 100],
                colorStops: []
              }
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 3,
              colors: [KTApp.getSettings().colors.theme.base[e]]
            },
            xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                show: !1,
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.gray["gray-300"],
                  width: 1,
                  dashArray: 3
                }
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              min: 0,
              max: 37,
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.light[e]],
            markers: {
              colors: [KTApp.getSettings().colors.theme.light[e]],
              strokeColor: [KTApp.getSettings().colors.theme.base[e]],
              strokeWidth: 3
            },
            padding: {
              top: 0,
              bottom: 0
            }
          };
          new ApexCharts(t, s).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_tiles_widget_2_chart");
        if (t) {
          var e = KTUtil.colorDarken(KTApp.getSettings().colors.theme.base.danger, 20),
            o = KTUtil.colorDarken(KTApp.getSettings().colors.theme.base.danger, 10),
            s = {
              series: [{
                name: "Net Profit",
                data: [10, 10, 20, 20, 12, 12]
              }],
              chart: {
                type: "area",
                height: 75,
                zoom: {
                  enabled: !1
                },
                sparkline: {
                  enabled: !0
                },
                padding: {
                  top: 0,
                  bottom: 0
                }
              },
              dataLabels: {
                enabled: !1
              },
              fill: {
                type: "solid",
                opacity: 1
              },
              stroke: {
                curve: "smooth",
                show: !0,
                width: 3,
                colors: [e]
              },
              xaxis: {
                categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                axisBorder: {
                  show: !1
                },
                axisTicks: {
                  show: !1
                },
                labels: {
                  show: !1,
                  style: {
                    colors: KTApp.getSettings().colors.gray["gray-500"],
                    fontSize: "12px",
                    fontFamily: KTApp.getSettings()["font-family"]
                  }
                },
                crosshairs: {
                  show: !1,
                  position: "front",
                  stroke: {
                    color: KTApp.getSettings().colors.gray["gray-300"],
                    width: 1,
                    dashArray: 3
                  }
                }
              },
              yaxis: {
                min: 0,
                max: 22,
                labels: {
                  show: !1,
                  style: {
                    colors: KTApp.getSettings().colors.gray["gray-500"],
                    fontSize: "12px",
                    fontFamily: KTApp.getSettings()["font-family"]
                  }
                }
              },
              states: {
                normal: {
                  filter: {
                    type: "none",
                    value: 0
                  }
                },
                hover: {
                  filter: {
                    type: "none",
                    value: 0
                  }
                },
                active: {
                  allowMultipleDataPointsSelection: !1,
                  filter: {
                    type: "none",
                    value: 0
                  }
                }
              },
              tooltip: {
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                },
                fixed: {
                  enabled: !1
                },
                x: {
                  show: !1
                },
                y: {
                  title: {
                    formatter: function (t) {
                      return t + ""
                    }
                  }
                }
              },
              colors: [o],
              markers: {
                colors: [KTApp.getSettings().colors.theme.light.danger],
                strokeColor: [e],
                strokeWidth: 3
              }
            };
          new ApexCharts(t, s).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_tiles_widget_5_chart");
        if (t) {
          var e = {
            series: [{
              name: "Net Profit",
              data: [10, 15, 18, 14]
            }, {
              name: "Revenue",
              data: [8, 13, 16, 12]
            }],
            chart: {
              type: "bar",
              height: 75,
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              },
              padding: {
                left: 20,
                right: 20
              }
            },
            plotOptions: {
              bar: {
                horizontal: !1,
                columnWidth: ["25%"],
                endingShape: "rounded"
              }
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: ["solid", "gradient"],
              opacity: .25
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May"]
            },
            yaxis: {
              min: 0,
              max: 20
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              fixed: {
                enabled: !1
              },
              x: {
                show: !1
              },
              y: {
                title: {
                  formatter: function (t) {
                    return t + ""
                  }
                }
              },
              marker: {
                show: !1
              }
            },
            colors: ["#ffffff", "#ffffff"]
          };
          new ApexCharts(t, e).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_tiles_widget_8_chart"),
          e = (parseInt(KTUtil.css(t, "height")),
            KTUtil.hasAttr(t, "data-color") ? KTUtil.attr(t, "data-color") : "danger");
        if (t) {
          var o = {
            series: [{
              name: "Net Profit",
              data: [20, 20, 30, 15, 40, 30]
            }],
            chart: {
              type: "area",
              height: 150,
              toolbar: {
                show: !1
              },
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "solid"
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 3,
              colors: [KTApp.getSettings().colors.theme.base[e]]
            },
            xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                show: !1,
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.gray["gray-300"],
                  width: 1,
                  dashArray: 3
                }
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              min: 0,
              max: 45,
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.light[e]],
            markers: {
              colors: [KTApp.getSettings().colors.theme.light[e]],
              strokeColor: [KTApp.getSettings().colors.theme.base[e]],
              strokeWidth: 3
            },
            padding: {
              top: 0,
              bottom: 0
            }
          };
          new ApexCharts(t, o).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_tiles_widget_17_chart");
        if (t) {
          var e = {
            series: [{
              name: "Net Profit",
              data: [10, 20, 20, 8]
            }],
            chart: {
              type: "area",
              height: 150,
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              },
              padding: {
                top: 0,
                bottom: 0
              }
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "solid",
              opacity: 1
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 3,
              colors: [KTApp.getSettings().colors.theme.base.success]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                show: !1,
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.gray["gray-300"],
                  width: 1,
                  dashArray: 3
                }
              }
            },
            yaxis: {
              min: 0,
              max: 22,
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              fixed: {
                enabled: !1
              },
              x: {
                show: !1
              },
              y: {
                title: {
                  formatter: function (t) {
                    return t + ""
                  }
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.light.success],
            markers: {
              colors: [KTApp.getSettings().colors.theme.light.success],
              strokeColor: [KTApp.getSettings().colors.theme.base.success],
              strokeWidth: 3
            }
          };
          new ApexCharts(t, e).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_tiles_widget_20_chart");
        if (t) {
          var e = {
            series: [74],
            chart: {
              height: 250,
              type: "radialBar",
              offsetY: 0
            },
            plotOptions: {
              radialBar: {
                startAngle: -90,
                endAngle: 90,
                hollow: {
                  margin: 0,
                  size: "70%"
                },
                dataLabels: {
                  showOn: "always",
                  name: {
                    show: !0,
                    fontSize: "13px",
                    fontWeight: "400",
                    offsetY: -5,
                    color: KTApp.getSettings().colors.gray["gray-300"]
                  },
                  value: {
                    color: KTApp.getSettings().colors.theme.inverse.primary,
                    fontSize: "22px",
                    fontWeight: "bold",
                    offsetY: -40,
                    show: !0
                  }
                },
                track: {
                  background: KTUtil.colorLighten(KTApp.getSettings().colors.theme.base.primary, 7),
                  strokeWidth: "100%"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.inverse.primary],
            stroke: {
              lineCap: "round"
            },
            labels: ["Progress"]
          };
          new ApexCharts(t, e).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_tiles_widget_21_chart"),
          e = parseInt(KTUtil.css(t, "height")),
          o = KTUtil.hasAttr(t, "data-color") ? KTUtil.attr(t, "data-color") : "info";
        if (t) {
          var s = {
            series: [{
              name: "Net Profit",
              data: [20, 20, 30, 15, 30, 30]
            }],
            chart: {
              type: "area",
              height: e,
              toolbar: {
                show: !1
              },
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "solid",
              opacity: 1
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 3,
              colors: [KTApp.getSettings().colors.theme.base[o]]
            },
            xaxis: {
              categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                show: !1,
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.gray["gray-300"],
                  width: 1,
                  dashArray: 3
                }
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              min: 0,
              max: 32,
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.light[o]],
            markers: {
              colors: [KTApp.getSettings().colors.theme.light[o]],
              strokeColor: [KTApp.getSettings().colors.theme.base[o]],
              strokeWidth: 3
            }
          };
          new ApexCharts(t, s).render()
        }
      }(),
      function () {
        var t = document.getElementById("kt_tiles_widget_23_chart"),
          e = (parseInt(KTUtil.css(t, "height")),
            KTUtil.hasAttr(t, "data-color") ? KTUtil.attr(t, "data-color") : "primary");
        if (t) {
          var o = {
            series: [{
              name: "Net Profit",
              data: [15, 25, 15, 40, 20, 50]
            }],
            chart: {
              type: "area",
              height: 125,
              toolbar: {
                show: !1
              },
              zoom: {
                enabled: !1
              },
              sparkline: {
                enabled: !0
              }
            },
            plotOptions: {},
            legend: {
              show: !1
            },
            dataLabels: {
              enabled: !1
            },
            fill: {
              type: "solid",
              opacity: 1
            },
            stroke: {
              curve: "smooth",
              show: !0,
              width: 3,
              colors: [KTApp.getSettings().colors.theme.base[e]]
            },
            xaxis: {
              categories: ["Jan, 2020", "Feb, 2020", "Mar, 2020", "Apr, 2020", "May, 2020", "Jun, 2020"],
              axisBorder: {
                show: !1
              },
              axisTicks: {
                show: !1
              },
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              },
              crosshairs: {
                show: !1,
                position: "front",
                stroke: {
                  color: KTApp.getSettings().colors.gray["gray-300"],
                  width: 1,
                  dashArray: 3
                }
              },
              tooltip: {
                enabled: !0,
                formatter: void 0,
                offsetY: 0,
                style: {
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            yaxis: {
              min: 0,
              max: 55,
              labels: {
                show: !1,
                style: {
                  colors: KTApp.getSettings().colors.gray["gray-500"],
                  fontSize: "12px",
                  fontFamily: KTApp.getSettings()["font-family"]
                }
              }
            },
            states: {
              normal: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              hover: {
                filter: {
                  type: "none",
                  value: 0
                }
              },
              active: {
                allowMultipleDataPointsSelection: !1,
                filter: {
                  type: "none",
                  value: 0
                }
              }
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: KTApp.getSettings()["font-family"]
              },
              y: {
                formatter: function (t) {
                  return "$" + t + " thousands"
                }
              }
            },
            colors: [KTApp.getSettings().colors.theme.light[e]],
            markers: {
              colors: [KTApp.getSettings().colors.theme.light[e]],
              strokeColor: [KTApp.getSettings().colors.theme.base[e]],
              strokeWidth: 3
            }
          };
          new ApexCharts(t, o).render()
        }
      }(),
      t("kt_advance_table_widget_1"),
        t("kt_advance_table_widget_2"),
        t("kt_advance_table_widget_3"),
        t("kt_advance_table_widget_4")
    }
  }
}();
"undefined" != typeof module && (module.exports = KTWidgets),
  jQuery(document).ready(function () {
    KTWidgets.init()
  });


var defaults = {
  layout: {
    icons: {
      pagination: {
        next: "flaticon2-next",
        prev: "flaticon2-back",
        first: "flaticon2-fast-back",
        last: "flaticon2-fast-next",
        more: "flaticon-more-1"
      },
      rowDetail: {
        expand: "fa fa-caret-down",
        collapse: "fa fa-caret-right"
      }
    }
  }
};
(defaults = {
    layout: {
      icons: {
        pagination: {
          next: "flaticon2-back",
          prev: "flaticon2-next",
          first: "flaticon2-fast-next",
          last: "flaticon2-fast-back"
        },
        rowDetail: {
          collapse: "fa fa-caret-down",
          expand: "fa fa-caret-right"
        }
      }
    }
  }),
  $.extend(!0, $.fn.KTDatatable.defaults, defaults),
  KTUtil.ready(function () {
    KTLayoutHeader.init("kt_header", "kt_header_mobile"),
      KTLayoutHeaderMenu.init("kt_header_menu", "kt_header_menu_wrapper"),
      KTLayoutHeaderTopbar.init("kt_header_mobile_topbar_toggle"),
      KTLayoutAside.init("kt_aside"),
      KTLayoutAsideMenu.init("kt_aside_menu"),
      KTLayoutSubheader.init("kt_subheader"),
      KTLayoutContent.init("kt_content"),
      KTLayoutFooter.init("kt_footer"),
      KTLayoutScrolltop.init("kt_scrolltop"),
      KTLayoutStickyCard.init("kt_page_sticky_card"),
      KTLayoutStretchedCard.init("kt_page_stretched_card"),
      KTLayoutExamples.init(),
      KTLayoutDemoPanel.init("kt_demo_panel"),
      KTLayoutChat.init(),
      KTLayoutQuickActions.init("kt_quick_actions"),
      KTLayoutQuickNotifications.init("kt_quick_notifications"),
      KTLayoutQuickPanel.init("kt_quick_panel"),
      KTLayoutQuickSearch.init("kt_quick_search"),
      KTLayoutQuickUser.init("kt_quick_user"),
      KTLayoutSearchInline().init("kt_quick_search_inline")
  });


