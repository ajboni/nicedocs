import { _ as _asyncToGenerator, a as _regeneratorRuntime, g as getLanguage, c as currentLanguage, b as _inherits, d as _classCallCheck, i as init, s as safe_not_equal, e as _assertThisInitialized, f as dispatch_dev, S as SvelteComponentDev, j as docs, k as get_store_value, h as config, v as validate_slots, l as _getPrototypeOf, m as _possibleConstructorReturn, o as element, t as claim_element, u as children, p as detach_dev, w as attr_dev, x as add_location, y as insert_dev, A as noop } from './client.a8b026ca.js';

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src/routes/[lang]/index.svelte";

function create_fragment(ctx) {
  var div;
  var raw_value =
  /*index*/
  ctx[0].content + "";
  var block = {
    c: function create() {
      div = element("div");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "content");
      add_location(div, file, 31, 0, 786);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      div.innerHTML = raw_value;
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
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
} // Set the store value


function _preload() {
  _preload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref) {
    var params, query, language, res, json;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = _ref.params, query = _ref.query;
            // the `slug` parameter is available because
            // this file is called [slug].svelte
            language = getLanguage(params.lang);
            currentLanguage.set(language);
            _context.next = 5;
            return this.fetch("./index.json?lang=".concat(JSON.stringify(language)));

          case 5:
            res = _context.sent;
            _context.next = 8;
            return res.json();

          case 8:
            json = _context.sent;

            if (res.status === 200) {
              docs.set(json);
            } else {
              this.error(res.status, data.message);
            }

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _preload.apply(this, arguments);
}

function instance($$self, $$props, $$invalidate) {
  var index = get_store_value(docs).find(function (doc) {
    return doc.title === config.indexDocument;
  });
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<U5Blangu5D> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("U5Blangu5D", $$slots, []);

  $$self.$capture_state = function () {
    return {
      docs: docs,
      currentLanguage: currentLanguage,
      getLanguage: getLanguage,
      preload: preload,
      config: config,
      get: get_store_value,
      index: index
    };
  };

  return [index];
}

var U5Blangu5D = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(U5Blangu5D, _SvelteComponentDev);

  var _super = _createSuper(U5Blangu5D);

  function U5Blangu5D(options) {
    var _this;

    _classCallCheck(this, U5Blangu5D);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "U5Blangu5D",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return U5Blangu5D;
}(SvelteComponentDev);

export default U5Blangu5D;
export { preload };
