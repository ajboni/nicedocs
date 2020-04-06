import { _ as _asyncToGenerator, a as _regeneratorRuntime, c as currentLanguage, g as getLanguage, b as _inherits, d as _classCallCheck, i as init, s as safe_not_equal, e as _assertThisInitialized, f as dispatch_dev, S as SvelteComponentDev, h as config, j as docs, k as get_store_value, v as validate_slots, l as _getPrototypeOf, m as _possibleConstructorReturn, n as space, o as element, q as query_selector_all, p as detach_dev, r as claim_space, t as claim_element, u as children, w as attr_dev, x as add_location, y as insert_dev, z as _slicedToArray, A as noop } from './client.a8b026ca.js';

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src/routes/index.svelte";

function create_fragment(ctx) {
  var title_value;
  var t;
  var div;
  var raw_value =
  /*index*/
  ctx[0].content + "";
  document.title = title_value = config.projectName;
  var block = {
    c: function create() {
      t = space();
      div = element("div");
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-ncv0v3\"]", document.head);
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
      attr_dev(div, "class", "content");
      add_location(div, file, 32, 0, 826);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
      insert_dev(target, div, anchor);
      div.innerHTML = raw_value;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*config*/
      0 && title_value !== (title_value = config.projectName)) {
        document.title = title_value;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
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
} // Set the store value
//  console.log(params.lang);


function _preload() {
  _preload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref3) {
    var host, path, params, query, res, json;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            host = _ref3.host, path = _ref3.path, params = _ref3.params, query = _ref3.query;
            currentLanguage.set(getLanguage("eng"));
            _context.next = 4;
            return this.fetch("index.json?lang=".concat(JSON.stringify(getLanguage("eng"))));

          case 4:
            res = _context.sent;
            _context.next = 7;
            return res.json();

          case 7:
            json = _context.sent;

            if (res.status === 200) {
              docs.set(json);
            } else {
              this.error(res.status, data.message);
            }

          case 9:
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
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Routes> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Routes", $$slots, []);

  $$self.$capture_state = function () {
    return {
      config: config,
      docs: docs,
      currentLanguage: currentLanguage,
      getLanguage: getLanguage,
      get: get_store_value,
      preload: preload,
      index: index
    };
  };

  return [index];
}

var Routes = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Routes, _SvelteComponentDev);

  var _super = _createSuper(Routes);

  function Routes(options) {
    var _this;

    _classCallCheck(this, Routes);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Routes",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Routes;
}(SvelteComponentDev);

export default Routes;
export { preload };
