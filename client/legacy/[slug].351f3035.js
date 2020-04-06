import { _ as _asyncToGenerator, a as _regeneratorRuntime, g as getLanguage, c as currentLanguage, b as _inherits, d as _classCallCheck, i as init, s as safe_not_equal, e as _assertThisInitialized, f as dispatch_dev, B as _createClass, S as SvelteComponentDev, h as config, j as docs, k as get_store_value, v as validate_slots, l as _getPrototypeOf, m as _possibleConstructorReturn, o as element, n as space, q as query_selector_all, t as claim_element, u as children, p as detach_dev, r as claim_space, w as attr_dev, x as add_location, C as append_dev, y as insert_dev, z as _slicedToArray, A as noop } from './client.a8b026ca.js';

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src/routes/[lang]/[slug].svelte";

function create_fragment(ctx) {
  var title_value;
  var link;
  var script;
  var script_src_value;
  var t;
  var div;
  var raw_value =
  /*doc*/
  ctx[0].content + "";
  document.title = title_value = "" + (
  /*doc*/
  ctx[0].title + " | " + config.projectName);
  var block = {
    c: function create() {
      link = element("link");
      script = element("script");
      t = space();
      div = element("div");
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-1byrzd7\"]", document.head);
      link = claim_element(head_nodes, "LINK", {
        rel: true,
        href: true
      });
      script = claim_element(head_nodes, "SCRIPT", {
        src: true
      });
      var script_nodes = children(script);
      script_nodes.forEach(detach_dev);
      head_nodes.forEach(detach_dev);
      t = claim_space(nodes);
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(link, "rel", "stylesheet");
      attr_dev(link, "href", "https://cdn.jsdelivr.net/npm/prismjs@1.19.0/themes/prism.min.css");
      add_location(link, file, 51, 2, 1219);
      if (script.src !== (script_src_value = "https://cdn.jsdelivr.net/npm/prismjs@1.19.0/prism.min.js")) attr_dev(script, "src", script_src_value);
      add_location(script, file, 54, 2, 1327);
      attr_dev(div, "class", "content svelte-bqma9g");
      add_location(div, file, 61, 0, 1459);
    },
    m: function mount(target, anchor) {
      append_dev(document.head, link);
      append_dev(document.head, script);
      insert_dev(target, t, anchor);
      insert_dev(target, div, anchor);
      div.innerHTML = raw_value;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*doc, config*/
      1 && title_value !== (title_value = "" + (
      /*doc*/
      ctx[0].title + " | " + config.projectName))) {
        document.title = title_value;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      detach_dev(link);
      detach_dev(script);
      if (detaching) detach_dev(t);
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function preload(_x) {
  return _preload.apply(this, arguments);
}

function _preload() {
  _preload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref3) {
    var params, query, language, res, data;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = _ref3.params, query = _ref3.query;
            // the `slug` parameter is available because
            // this file is called [slug].svelte
            language = getLanguage(params.lang);
            currentLanguage.set(language);
            _context.next = 5;
            return this.fetch("".concat(params.lang, "/").concat(params.slug, ".json"));

          case 5:
            res = _context.sent;
            _context.next = 8;
            return res.json();

          case 8:
            data = _context.sent;
            data.lang = params.lang;

            if (!(res.status === 200)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", {
              data: data
            });

          case 14:
            this.error(res.status, data.message);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _preload.apply(this, arguments);
}

function instance($$self, $$props, $$invalidate) {
  var data = $$props.data;
  docs.set(data.docs);
  currentLanguage.set(getLanguage(data.lang));
  get_store_value(currentLanguage);
  var doc = data.doc;
  var writable_props = ["data"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<U5Bslugu5D> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("U5Bslugu5D", $$slots, []);

  $$self.$set = function ($$props) {
    if ("data" in $$props) $$invalidate(1, data = $$props.data);
  };

  $$self.$capture_state = function () {
    return {
      currentLanguage: currentLanguage,
      getLanguage: getLanguage,
      preload: preload,
      config: config,
      docs: docs,
      get: get_store_value,
      data: data,
      doc: doc
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("data" in $$props) $$invalidate(1, data = $$props.data);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [doc, data];
}

var U5Bslugu5D = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(U5Bslugu5D, _SvelteComponentDev);

  var _super = _createSuper(U5Bslugu5D);

  function U5Bslugu5D(options) {
    var _this;

    _classCallCheck(this, U5Bslugu5D);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      data: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "U5Bslugu5D",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*data*/
    ctx[1] === undefined && !("data" in props)) {
      console.warn("<U5Bslugu5D> was created without expected prop 'data'");
    }

    return _this;
  }

  _createClass(U5Bslugu5D, [{
    key: "data",
    get: function get() {
      throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return U5Bslugu5D;
}(SvelteComponentDev);

export default U5Bslugu5D;
export { preload };
