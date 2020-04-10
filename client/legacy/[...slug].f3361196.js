import { _ as _asyncToGenerator, a as _regeneratorRuntime, g as docs, j as getLanguage, L as currentLanguage, b as _inherits, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, f as config, M as doc, N as validate_store, O as component_subscribe, v as validate_slots, h as get_store_value, k as _getPrototypeOf, l as _possibleConstructorReturn, n as element, m as space, q as query_selector_all, r as claim_element, t as children, o as detach_dev, p as claim_space, u as attr_dev, w as add_location, I as append_dev, x as insert_dev, y as _slicedToArray, z as noop } from './client.7eff8823.js';

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src/routes/[lang]/[...slug].svelte";

function create_fragment(ctx) {
  var title_value;
  var link;
  var script;
  var script_src_value;
  var t;
  var div;
  var raw_value =
  /*$doc*/
  ctx[0].content + "";
  document.title = title_value = "" + (
  /*$doc*/
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
      var head_nodes = query_selector_all("[data-svelte=\"svelte-smj55p\"]", document.head);
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
      add_location(link, file, 38, 2, 1241);
      if (script.src !== (script_src_value = "https://cdn.jsdelivr.net/npm/prismjs@1.19.0/prism.min.js")) attr_dev(script, "src", script_src_value);
      add_location(script, file, 41, 2, 1349);
      attr_dev(div, "class", "content");
      add_location(div, file, 46, 0, 1450);
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
      /*$doc, config*/
      1 && title_value !== (title_value = "" + (
      /*$doc*/
      ctx[0].title + " | " + config.projectName))) {
        document.title = title_value;
      }

      if (dirty &
      /*$doc*/
      1 && raw_value !== (raw_value =
      /*$doc*/
      ctx[0].content + "")) div.innerHTML = raw_value;
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
    var params, query, language, resDocs, docsJSON, res, docJSON;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = _ref3.params, query = _ref3.query;
            // the `slug` parameter is available because
            // this file is called [slug].svelte
            language = getLanguage(params.lang);
            currentLanguage.set(language); // We need to fetch everything if the user is coming from URL.
            // TODO: Only fetch sidebar and current language.

            _context.next = 5;
            return this.fetch("index.json");

          case 5:
            resDocs = _context.sent;
            _context.next = 8;
            return resDocs.json();

          case 8:
            docsJSON = _context.sent;
            docs.set(docsJSON); // Set up the current doc in the store.
            // TODO: Why If I return the doc to the component instead of going to the store
            // it force a rerender and loose store state (current language and sidebar)...

            _context.next = 12;
            return this.fetch("".concat(params.lang, "/").concat(params.slug.join("/"), ".json"));

          case 12:
            res = _context.sent;
            _context.next = 15;
            return res.json();

          case 15:
            docJSON = _context.sent;

            if (res.status === 200) {
              doc.set(docJSON);
            } else {
              this.error(res.status, docJSON.message);
            }

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _preload.apply(this, arguments);
}

function instance($$self, $$props, $$invalidate) {
  var $doc;
  validate_store(doc, "doc");
  component_subscribe($$self, doc, function ($$value) {
    return $$invalidate(0, $doc = $$value);
  });
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<U5B_slugu5D> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("U5B_slugu5D", $$slots, []);

  $$self.$capture_state = function () {
    return {
      getLanguage: getLanguage,
      currentLanguage: currentLanguage,
      docs: docs,
      doc: doc,
      get: get_store_value,
      preload: preload,
      config: config,
      $doc: $doc
    };
  };

  return [$doc];
}

var U5B_slugu5D = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(U5B_slugu5D, _SvelteComponentDev);

  var _super = _createSuper(U5B_slugu5D);

  function U5B_slugu5D(options) {
    var _this;

    _classCallCheck(this, U5B_slugu5D);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "U5B_slugu5D",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return U5B_slugu5D;
}(SvelteComponentDev);

export default U5B_slugu5D;
export { preload };
