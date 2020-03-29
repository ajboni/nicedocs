import { _ as _asyncToGenerator, a as _regeneratorRuntime, d as docs, c as config, b as _inherits, e as _classCallCheck, i as init, s as safe_not_equal, f as _assertThisInitialized, g as dispatch_dev, S as SvelteComponentDev, v as validate_slots, h as _getPrototypeOf, j as _possibleConstructorReturn, k as space, l as element, t as text, q as query_selector_all, m as detach_dev, n as claim_space, o as claim_element, p as children, r as claim_text, u as add_location, w as insert_dev, x as append_dev, y as _slicedToArray, z as noop } from './client.af586962.js';

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src/routes/index.svelte";

function create_fragment(ctx) {
  var title_value;
  var t0;
  var h1;
  var t1;
  var t2;
  var p0;
  var t3;
  var t4;
  var p1;
  var t5;
  document.title = title_value = config.projectName;
  var block = {
    c: function create() {
      t0 = space();
      h1 = element("h1");
      t1 = text("Landing Page.");
      t2 = space();
      p0 = element("p");
      t3 = text("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor\n  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis\n  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore\n  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt\n  in culpa qui officia deserunt mollit anim id est laborum. Offendit eleifend\n  moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu,\n  veri persius vituperata ei nec. Vivendum intellegat et qui, ei denique\n  consequuntur vix.");
      t4 = space();
      p1 = element("p");
      t5 = text("Scripta periculis ei eam, te pro movet reformidans. Offendit eleifend\n  moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu,\n  veri persius vituperata ei nec. Ei qui diceret voluptua luptatum, te dolorum\n  detracto hendrerit sed, ad per offendit consetetur. Scripta periculis ei eam,\n  te pro movet reformidans. Duis aute irure dolor in reprehenderit in voluptate\n  velit esse cillum dolore eu fugiat nulla pariatur. Pri posse graeco\n  definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te.\n  Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis\n  cotidieque quo cu, veri persius vituperata ei nec. Quot populo ad qui.");
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-ncv0v3\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      h1 = claim_element(nodes, "H1", {});
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes, "Landing Page.");
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      p0 = claim_element(nodes, "P", {});
      var p0_nodes = children(p0);
      t3 = claim_text(p0_nodes, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor\n  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis\n  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore\n  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt\n  in culpa qui officia deserunt mollit anim id est laborum. Offendit eleifend\n  moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu,\n  veri persius vituperata ei nec. Vivendum intellegat et qui, ei denique\n  consequuntur vix.");
      p0_nodes.forEach(detach_dev);
      t4 = claim_space(nodes);
      p1 = claim_element(nodes, "P", {});
      var p1_nodes = children(p1);
      t5 = claim_text(p1_nodes, "Scripta periculis ei eam, te pro movet reformidans. Offendit eleifend\n  moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu,\n  veri persius vituperata ei nec. Ei qui diceret voluptua luptatum, te dolorum\n  detracto hendrerit sed, ad per offendit consetetur. Scripta periculis ei eam,\n  te pro movet reformidans. Duis aute irure dolor in reprehenderit in voluptate\n  velit esse cillum dolore eu fugiat nulla pariatur. Pri posse graeco\n  definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te.\n  Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis\n  cotidieque quo cu, veri persius vituperata ei nec. Quot populo ad qui.");
      p1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(h1, file, 20, 0, 561);
      add_location(p0, file, 22, 0, 585);
      add_location(p1, file, 33, 0, 1244);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, h1, anchor);
      append_dev(h1, t1);
      insert_dev(target, t2, anchor);
      insert_dev(target, p0, anchor);
      append_dev(p0, t3);
      insert_dev(target, t4, anchor);
      insert_dev(target, p1, anchor);
      append_dev(p1, t5);
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
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(h1);
      if (detaching) detach_dev(t2);
      if (detaching) detach_dev(p0);
      if (detaching) detach_dev(t4);
      if (detaching) detach_dev(p1);
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
    var host, path, params, query, lang, searchParams, res, json;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            host = _ref3.host, path = _ref3.path, params = _ref3.params, query = _ref3.query;
            // If language parameter, change accordingly
            lang = query.lang ? query.lang : config.defaultLanguage;
            searchParams = new URLSearchParams(query);
            _context.next = 5;
            return this.fetch("index.json?".concat(searchParams));

          case 5:
            res = _context.sent;
            _context.next = 8;
            return res.json();

          case 8:
            json = _context.sent;
            // Set the store value
            docs.set(json);

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
      preload: preload
    };
  };

  return [];
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
