function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;

        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});

var regenerator = runtime_1;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function noop() {}

function assign(tar, src) {
  // @ts-ignore
  for (var k in src) {
    tar[k] = src[k];
  }

  return tar;
}

function add_location(element, file, line, column, char) {
  element.__svelte_meta = {
    loc: {
      file: file,
      line: line,
      column: column,
      char: char
    }
  };
}

function run(fn) {
  return fn();
}

function blank_object() {
  return Object.create(null);
}

function run_all(fns) {
  fns.forEach(run);
}

function is_function(thing) {
  return typeof thing === 'function';
}

function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && _typeof(a) === 'object' || typeof a === 'function';
}

function validate_store(store, name) {
  if (store != null && typeof store.subscribe !== 'function') {
    throw new Error("'".concat(name, "' is not a store with a 'subscribe' method"));
  }
}

function subscribe(store) {
  if (store == null) {
    return noop;
  }

  for (var _len = arguments.length, callbacks = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    callbacks[_key - 1] = arguments[_key];
  }

  var unsub = store.subscribe.apply(store, callbacks);
  return unsub.unsubscribe ? function () {
    return unsub.unsubscribe();
  } : unsub;
}

function get_store_value(store) {
  var value;
  subscribe(store, function (_) {
    return value = _;
  })();
  return value;
}

function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}

function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    var slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}

function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}

function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    var lets = definition[2](fn(dirty));

    if ($$scope.dirty === undefined) {
      return lets;
    }

    if (_typeof(lets) === 'object') {
      var merged = [];
      var len = Math.max($$scope.dirty.length, lets.length);

      for (var i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }

      return merged;
    }

    return $$scope.dirty | lets;
  }

  return $$scope.dirty;
}

function null_to_empty(value) {
  return value == null ? '' : value;
}

function append(target, node) {
  target.appendChild(node);
}

function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}

function detach(node) {
  node.parentNode.removeChild(node);
}

function destroy_each(iterations, detaching) {
  for (var i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}

function element(name) {
  return document.createElement(name);
}

function svg_element(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function text(data) {
  return document.createTextNode(data);
}

function space() {
  return text(' ');
}

function empty() {
  return text('');
}

function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return function () {
    return node.removeEventListener(event, handler, options);
  };
}

function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

function children(element) {
  return Array.from(element.childNodes);
}

function claim_element(nodes, name, attributes, svg) {
  for (var i = 0; i < nodes.length; i += 1) {
    var node = nodes[i];

    if (node.nodeName === name) {
      var j = 0;

      while (j < node.attributes.length) {
        var attribute = node.attributes[j];

        if (attributes[attribute.name]) {
          j++;
        } else {
          node.removeAttribute(attribute.name);
        }
      }

      return nodes.splice(i, 1)[0];
    }
  }

  return svg ? svg_element(name) : element(name);
}

function claim_text(nodes, data) {
  for (var i = 0; i < nodes.length; i += 1) {
    var node = nodes[i];

    if (node.nodeType === 3) {
      node.data = '' + data;
      return nodes.splice(i, 1)[0];
    }
  }

  return text(data);
}

function claim_space(nodes) {
  return claim_text(nodes, ' ');
}

function set_style(node, key, value, important) {
  node.style.setProperty(key, value, important ? 'important' : '');
}

function select_option(select, value) {
  for (var i = 0; i < select.options.length; i += 1) {
    var option = select.options[i];

    if (option.__value === value) {
      option.selected = true;
      return;
    }
  }
}

function select_value(select) {
  var selected_option = select.querySelector(':checked') || select.options[0];
  return selected_option && selected_option.__value;
}

function custom_event(type, detail) {
  var e = document.createEvent('CustomEvent');
  e.initCustomEvent(type, false, false, detail);
  return e;
}

function query_selector_all(selector) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
  return Array.from(parent.querySelectorAll(selector));
}

var current_component;

function set_current_component(component) {
  current_component = component;
}

function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}

function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}

function getContext(key) {
  return get_current_component().$$.context.get(key);
} // TODO figure out if we still want to support

var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;

function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}

function add_render_callback(fn) {
  render_callbacks.push(fn);
}

var flushing = false;
var seen_callbacks = new Set();

function flush() {
  if (flushing) return;
  flushing = true;

  do {
    // first, call beforeUpdate functions
    // and update components
    for (var i = 0; i < dirty_components.length; i += 1) {
      var component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }

    dirty_components.length = 0;

    while (binding_callbacks.length) {
      binding_callbacks.pop()();
    } // then, once components are updated, call
    // afterUpdate functions. This may cause
    // subsequent updates...


    for (var _i = 0; _i < render_callbacks.length; _i += 1) {
      var callback = render_callbacks[_i];

      if (!seen_callbacks.has(callback)) {
        // ...so guard against infinite loops
        seen_callbacks.add(callback);
        callback();
      }
    }

    render_callbacks.length = 0;
  } while (dirty_components.length);

  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }

  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}

function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    var dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}

var outroing = new Set();
var outros;

function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros // parent group

  };
}

function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }

  outros = outros.p;
}

function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}

function transition_out(block, local, detach, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(function () {
      outroing.delete(block);

      if (callback) {
        if (detach) block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}

var globals = typeof window !== 'undefined' ? window : global;

function get_spread_update(levels, updates) {
  var update = {};
  var to_null_out = {};
  var accounted_for = {
    $$scope: 1
  };
  var i = levels.length;

  while (i--) {
    var o = levels[i];
    var n = updates[i];

    if (n) {
      for (var key in o) {
        if (!(key in n)) to_null_out[key] = 1;
      }

      for (var _key3 in n) {
        if (!accounted_for[_key3]) {
          update[_key3] = n[_key3];
          accounted_for[_key3] = 1;
        }
      }

      levels[i] = n;
    } else {
      for (var _key4 in o) {
        accounted_for[_key4] = 1;
      }
    }
  }

  for (var _key5 in to_null_out) {
    if (!(_key5 in update)) update[_key5] = undefined;
  }

  return update;
}

function get_spread_object(spread_props) {
  return _typeof(spread_props) === 'object' && spread_props !== null ? spread_props : {};
} // source: https://html.spec.whatwg.org/multipage/indices.html

function create_component(block) {
  block && block.c();
}

function claim_component(block, parent_nodes) {
  block && block.l(parent_nodes);
}

function mount_component(component, target, anchor) {
  var _component$$$ = component.$$,
      fragment = _component$$$.fragment,
      on_mount = _component$$$.on_mount,
      on_destroy = _component$$$.on_destroy,
      after_update = _component$$$.after_update;
  fragment && fragment.m(target, anchor); // onMount happens before the initial afterUpdate

  add_render_callback(function () {
    var new_on_destroy = on_mount.map(run).filter(is_function);

    if (on_destroy) {
      on_destroy.push.apply(on_destroy, _toConsumableArray(new_on_destroy));
    } else {
      // Edge case - component was destroyed immediately,
      // most likely as a result of a binding initialising
      run_all(new_on_destroy);
    }

    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}

function destroy_component(component, detaching) {
  var $$ = component.$$;

  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
    // preserve final state?)

    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}

function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }

  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}

function init(component, options, instance, create_fragment, not_equal, props) {
  var dirty = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [-1];
  var parent_component = current_component;
  set_current_component(component);
  var prop_values = options.props || {};
  var $$ = component.$$ = {
    fragment: null,
    ctx: null,
    // state
    props: props,
    update: noop,
    not_equal: not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    before_update: [],
    after_update: [],
    context: new Map(parent_component ? parent_component.$$.context : []),
    // everything else
    callbacks: blank_object(),
    dirty: dirty
  };
  var ready = false;
  $$.ctx = instance ? instance(component, prop_values, function (i, ret) {
    var value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;

    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if ($$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }

    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update); // `false` as a special case of no DOM component

  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

  if (options.target) {
    if (options.hydrate) {
      var nodes = children(options.target); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.c();
    }

    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }

  set_current_component(parent_component);
}

var SvelteComponent = /*#__PURE__*/function () {
  function SvelteComponent() {
    _classCallCheck(this, SvelteComponent);
  }

  _createClass(SvelteComponent, [{
    key: "$destroy",
    value: function $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
  }, {
    key: "$on",
    value: function $on(type, callback) {
      var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return function () {
        var index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    }
  }, {
    key: "$set",
    value: function $set() {// overridden by instance, if it has props
    }
  }]);

  return SvelteComponent;
}();

function dispatch_dev(type, detail) {
  document.dispatchEvent(custom_event(type, Object.assign({
    version: '3.20.1'
  }, detail)));
}

function append_dev(target, node) {
  dispatch_dev("SvelteDOMInsert", {
    target: target,
    node: node
  });
  append(target, node);
}

function insert_dev(target, node, anchor) {
  dispatch_dev("SvelteDOMInsert", {
    target: target,
    node: node,
    anchor: anchor
  });
  insert(target, node, anchor);
}

function detach_dev(node) {
  dispatch_dev("SvelteDOMRemove", {
    node: node
  });
  detach(node);
}

function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
  var modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
  if (has_prevent_default) modifiers.push('preventDefault');
  if (has_stop_propagation) modifiers.push('stopPropagation');
  dispatch_dev("SvelteDOMAddEventListener", {
    node: node,
    event: event,
    handler: handler,
    modifiers: modifiers
  });
  var dispose = listen(node, event, handler, options);
  return function () {
    dispatch_dev("SvelteDOMRemoveEventListener", {
      node: node,
      event: event,
      handler: handler,
      modifiers: modifiers
    });
    dispose();
  };
}

function attr_dev(node, attribute, value) {
  attr(node, attribute, value);
  if (value == null) dispatch_dev("SvelteDOMRemoveAttribute", {
    node: node,
    attribute: attribute
  });else dispatch_dev("SvelteDOMSetAttribute", {
    node: node,
    attribute: attribute,
    value: value
  });
}

function prop_dev(node, property, value) {
  node[property] = value;
  dispatch_dev("SvelteDOMSetProperty", {
    node: node,
    property: property,
    value: value
  });
}

function set_data_dev(text, data) {
  data = '' + data;
  if (text.data === data) return;
  dispatch_dev("SvelteDOMSetData", {
    node: text,
    data: data
  });
  text.data = data;
}

function validate_each_argument(arg) {
  if (typeof arg !== 'string' && !(arg && _typeof(arg) === 'object' && 'length' in arg)) {
    var msg = '{#each} only iterates over array-like objects.';

    if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
      msg += ' You can use a spread to convert this iterable into an array.';
    }

    throw new Error(msg);
  }
}

function validate_slots(name, slot, keys) {
  for (var _i2 = 0, _Object$keys = Object.keys(slot); _i2 < _Object$keys.length; _i2++) {
    var slot_key = _Object$keys[_i2];

    if (!~keys.indexOf(slot_key)) {
      console.warn("<".concat(name, "> received an unexpected slot \"").concat(slot_key, "\"."));
    }
  }
}

var SvelteComponentDev = /*#__PURE__*/function (_SvelteComponent) {
  _inherits(SvelteComponentDev, _SvelteComponent);

  var _super2 = _createSuper(SvelteComponentDev);

  function SvelteComponentDev(options) {
    _classCallCheck(this, SvelteComponentDev);

    if (!options || !options.target && !options.$$inline) {
      throw new Error("'target' is a required option");
    }

    return _super2.call(this);
  }

  _createClass(SvelteComponentDev, [{
    key: "$destroy",
    value: function $destroy() {
      _get(_getPrototypeOf(SvelteComponentDev.prototype), "$destroy", this).call(this);

      this.$destroy = function () {
        console.warn("Component was already destroyed"); // eslint-disable-line no-console
      };
    }
  }, {
    key: "$capture_state",
    value: function $capture_state() {}
  }, {
    key: "$inject_state",
    value: function $inject_state() {}
  }]);

  return SvelteComponentDev;
}(SvelteComponent);

var subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */


function writable(value) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  var stop;
  var subscribers = [];

  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;

      if (stop) {
        // store is ready
        var run_queue = !subscriber_queue.length;

        for (var i = 0; i < subscribers.length; i += 1) {
          var s = subscribers[i];
          s[1]();
          subscriber_queue.push(s, value);
        }

        if (run_queue) {
          for (var _i = 0; _i < subscriber_queue.length; _i += 2) {
            subscriber_queue[_i][0](subscriber_queue[_i + 1]);
          }

          subscriber_queue.length = 0;
        }
      }
    }
  }

  function update(fn) {
    set(fn(value));
  }

  function subscribe(run) {
    var invalidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    var subscriber = [run, invalidate];
    subscribers.push(subscriber);

    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }

    run(value);
    return function () {
      var index = subscribers.indexOf(subscriber);

      if (index !== -1) {
        subscribers.splice(index, 1);
      }

      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }

  return {
    set: set,
    update: update,
    subscribe: subscribe
  };
}

var CONTEXT_KEY = {};
var preload = function preload() {
  return {};
};

var data = { projectName:"Nice Docs",
  projectLogo:"book.svg",
  indexDocument:".index",
  defaultLanguage:"eng",
  availableLanguages:[ { id:"eng",
      icon:"fa fa-user",
      caption:"English" },
    { id:"spa",
      icon:"fa fa-user",
      caption:"Español" },
    { id:"fr",
      icon:"fa fa-user",
      caption:"French" } ],
  navigation:[ { caption:"Site",
      icon:"fas fa-globe",
      url:"https://aboni.dev/" },
    { caption:"Github",
      icon:"fab fa-github",
      url:"https://github.com/ajboni/" } ],
  copyright:"Made with 🧉 by <a href=\"https://aboni.dev\">Alexis Boni</a>. Licensed under the GPLv3 License." };

var doc = writable({});
var docs = writable([]);
var docsMap = writable(new Map());
var currentLanguage = writable(getLanguage("default"));
function getLanguage(id) {
  var language = data.availableLanguages.find(function (lang) {
    return lang.id === id;
  }) ? data.availableLanguages.find(function (lang) {
    return lang.id === id;
  }) : data.availableLanguages.find(function (lang) {
    return lang.id === data.defaultLanguage;
  });
  return language;
}

function _createSuper$1(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$1()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src/routes/_file.svelte"; // (13:0) {:else}

function create_else_block(ctx) {
  var option;
  var t_value =
  /*levelString*/
  ctx[2] +
  /*doc*/
  ctx[0].title + "";
  var t;
  var option_value_value;
  var block = {
    c: function create() {
      option = element("option");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      option = claim_element(nodes, "OPTION", {
        value: true
      });
      var option_nodes = children(option);
      t = claim_text(option_nodes, t_value);
      option_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      option.__value = option_value_value =
      /*doc*/
      ctx[0].slug;
      option.value = option.__value;
      add_location(option, file, 13, 2, 261);
    },
    m: function mount(target, anchor) {
      insert_dev(target, option, anchor);
      append_dev(option, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*levelString, doc*/
      5 && t_value !== (t_value =
      /*levelString*/
      ctx[2] +
      /*doc*/
      ctx[0].title + "")) set_data_dev(t, t_value);

      if (dirty &
      /*doc*/
      1 && option_value_value !== (option_value_value =
      /*doc*/
      ctx[0].slug)) {
        prop_dev(option, "__value", option_value_value);
      }

      option.value = option.__value;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(option);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(13:0) {:else}",
    ctx: ctx
  });
  return block;
} // (11:0) {#if !isMobile}


function create_if_block(ctx) {
  var a;
  var t_value =
  /*doc*/
  ctx[0].title + "";
  var t;
  var a_href_value;
  var block = {
    c: function create() {
      a = element("a");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
        href: true
      });
      var a_nodes = children(a);
      t = claim_text(a_nodes, t_value);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(a, "href", a_href_value = "".concat(
      /*doc*/
      ctx[0].slug));
      add_location(a, file, 11, 2, 211);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      append_dev(a, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*doc*/
      1 && t_value !== (t_value =
      /*doc*/
      ctx[0].title + "")) set_data_dev(t, t_value);

      if (dirty &
      /*doc*/
      1 && a_href_value !== (a_href_value = "".concat(
      /*doc*/
      ctx[0].slug))) {
        attr_dev(a, "href", a_href_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(11:0) {#if !isMobile}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var if_block_anchor;

  function select_block_type(ctx, dirty) {
    if (!
    /*isMobile*/
    ctx[1]) return create_if_block;
    return create_else_block;
  }

  var current_block_type = select_block_type(ctx);
  var if_block = current_block_type(ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);

        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
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

function instance($$self, $$props, $$invalidate) {
  var doc = $$props.doc;
  var _$$props$isMobile = $$props.isMobile,
      isMobile = _$$props$isMobile === void 0 ? false : _$$props$isMobile;
  var _$$props$level = $$props.level,
      level = _$$props$level === void 0 ? 0 : _$$props$level;
  var levelString = "";

  for (var index = 0; index < level; index++) {
    levelString += " ";
  }

  var writable_props = ["doc", "isMobile", "level"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<File> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("File", $$slots, []);

  $$self.$set = function ($$props) {
    if ("doc" in $$props) $$invalidate(0, doc = $$props.doc);
    if ("isMobile" in $$props) $$invalidate(1, isMobile = $$props.isMobile);
    if ("level" in $$props) $$invalidate(3, level = $$props.level);
  };

  $$self.$capture_state = function () {
    return {
      doc: doc,
      isMobile: isMobile,
      level: level,
      levelString: levelString
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("doc" in $$props) $$invalidate(0, doc = $$props.doc);
    if ("isMobile" in $$props) $$invalidate(1, isMobile = $$props.isMobile);
    if ("level" in $$props) $$invalidate(3, level = $$props.level);
    if ("levelString" in $$props) $$invalidate(2, levelString = $$props.levelString);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [doc, isMobile, levelString, level];
}

var File = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(File, _SvelteComponentDev);

  var _super = _createSuper$1(File);

  function File(options) {
    var _this;

    _classCallCheck(this, File);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      doc: 0,
      isMobile: 1,
      level: 3
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "File",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*doc*/
    ctx[0] === undefined && !("doc" in props)) {
      console.warn("<File> was created without expected prop 'doc'");
    }

    return _this;
  }

  _createClass(File, [{
    key: "doc",
    get: function get() {
      throw new Error("<File>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<File>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isMobile",
    get: function get() {
      throw new Error("<File>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<File>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "level",
    get: function get() {
      throw new Error("<File>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<File>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return File;
}(SvelteComponentDev);

function _createSuper$2(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$2()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$1 = "src/routes/_folder.svelte";

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  return child_ctx;
}

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  return child_ctx;
} // (86:0) {:else}


function create_else_block_3(ctx) {
  var option;
  var t0_value =
  /*levelString*/
  ctx[5] +
  /*doc*/
  ctx[1].title + "";
  var t0;
  var option_value_value;
  var t1;
  var each_1_anchor;
  var current;
  var each_value_1 =
  /*doc*/
  ctx[1].children;
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      option = element("option");
      t0 = text(t0_value);
      t1 = space();

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      each_1_anchor = empty();
      this.h();
    },
    l: function claim(nodes) {
      option = claim_element(nodes, "OPTION", {
        disabled: true,
        value: true
      });
      var option_nodes = children(option);
      t0 = claim_text(option_nodes, t0_value);
      option_nodes.forEach(detach_dev);
      t1 = claim_space(nodes);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(nodes);
      }

      each_1_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      option.disabled = true;
      option.__value = option_value_value =
      /*levelString*/
      ctx[5] +
      /*doc*/
      ctx[1].title;
      option.value = option.__value;
      add_location(option, file$1, 87, 2, 1931);
    },
    m: function mount(target, anchor) {
      insert_dev(target, option, anchor);
      append_dev(option, t0);
      insert_dev(target, t1, anchor);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if ((!current || dirty &
      /*levelString, doc*/
      34) && t0_value !== (t0_value =
      /*levelString*/
      ctx[5] +
      /*doc*/
      ctx[1].title + "")) set_data_dev(t0, t0_value);

      if (!current || dirty &
      /*levelString, doc*/
      34 && option_value_value !== (option_value_value =
      /*levelString*/
      ctx[5] +
      /*doc*/
      ctx[1].title)) {
        prop_dev(option, "__value", option_value_value);
      }

      option.value = option.__value;

      if (dirty &
      /*doc, level*/
      18) {
        each_value_1 =
        /*doc*/
        ctx[1].children;
        validate_each_argument(each_value_1);

        var _i4;

        for (_i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);

            transition_in(each_blocks[_i4], 1);
          } else {
            each_blocks[_i4] = create_each_block_1(child_ctx);

            each_blocks[_i4].c();

            transition_in(each_blocks[_i4], 1);

            each_blocks[_i4].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        group_outros();

        for (_i4 = each_value_1.length; _i4 < each_blocks.length; _i4 += 1) {
          out(_i4);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i5 = 0; _i5 < each_value_1.length; _i5 += 1) {
        transition_in(each_blocks[_i5]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        transition_out(each_blocks[_i6]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(option);
      if (detaching) detach_dev(t1);
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_3.name,
    type: "else",
    source: "(86:0) {:else}",
    ctx: ctx
  });
  return block;
} // (53:0) {#if !isMobile}


function create_if_block$1(ctx) {
  var t;
  var ul;
  var current;

  function select_block_type_1(ctx, dirty) {
    if (
    /*isCategory*/
    ctx[3]) return create_if_block_2;
    return create_else_block_1;
  }

  var current_block_type = select_block_type_1(ctx);
  var if_block = current_block_type(ctx);
  var each_value =
  /*doc*/
  ctx[1].children;
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      if_block.c();
      t = space();
      ul = element("ul");

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      t = claim_space(nodes);
      ul = claim_element(nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);

      for (var _i8 = 0; _i8 < each_blocks.length; _i8 += 1) {
        each_blocks[_i8].l(ul_nodes);
      }

      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(ul, "class", "sidebar-links svelte-866tpx");
      add_location(ul, file$1, 72, 2, 1595);
    },
    m: function mount(target, anchor) {
      if_block.m(target, anchor);
      insert_dev(target, t, anchor);
      insert_dev(target, ul, anchor);

      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].m(ul, null);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);

        if (if_block) {
          if_block.c();
          if_block.m(t.parentNode, t);
        }
      }

      if (dirty &
      /*doc*/
      2) {
        each_value =
        /*doc*/
        ctx[1].children;
        validate_each_argument(each_value);

        var _i10;

        for (_i10 = 0; _i10 < each_value.length; _i10 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i10);

          if (each_blocks[_i10]) {
            each_blocks[_i10].p(child_ctx, dirty);

            transition_in(each_blocks[_i10], 1);
          } else {
            each_blocks[_i10] = create_each_block(child_ctx);

            each_blocks[_i10].c();

            transition_in(each_blocks[_i10], 1);

            each_blocks[_i10].m(ul, null);
          }
        }

        group_outros();

        for (_i10 = each_value.length; _i10 < each_blocks.length; _i10 += 1) {
          out(_i10);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i11 = 0; _i11 < each_value.length; _i11 += 1) {
        transition_in(each_blocks[_i11]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i12 = 0; _i12 < each_blocks.length; _i12 += 1) {
        transition_out(each_blocks[_i12]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      if_block.d(detaching);
      if (detaching) detach_dev(t);
      if (detaching) detach_dev(ul);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$1.name,
    type: "if",
    source: "(53:0) {#if !isMobile}",
    ctx: ctx
  });
  return block;
} // (92:4) {:else}


function create_else_block_4(ctx) {
  var current;
  var file_1 = new File({
    props: {
      doc:
      /*subdoc*/
      ctx[7],
      isMobile: true,
      level:
      /*level*/
      ctx[4] + 2
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(file_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(file_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(file_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var file_1_changes = {};
      if (dirty &
      /*doc*/
      2) file_1_changes.doc =
      /*subdoc*/
      ctx[7];
      if (dirty &
      /*level*/
      16) file_1_changes.level =
      /*level*/
      ctx[4] + 2;
      file_1.$set(file_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(file_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(file_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(file_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_4.name,
    type: "else",
    source: "(92:4) {:else}",
    ctx: ctx
  });
  return block;
} // (90:4) {#if subdoc.type === 'folder'}


function create_if_block_4(ctx) {
  var current;
  var folder = new Folder({
    props: {
      doc:
      /*subdoc*/
      ctx[7],
      isMobile: true,
      level:
      /*level*/
      ctx[4] + 2
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(folder.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(folder.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(folder, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var folder_changes = {};
      if (dirty &
      /*doc*/
      2) folder_changes.doc =
      /*subdoc*/
      ctx[7];
      if (dirty &
      /*level*/
      16) folder_changes.level =
      /*level*/
      ctx[4] + 2;
      folder.$set(folder_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(folder.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(folder.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(folder, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4.name,
    type: "if",
    source: "(90:4) {#if subdoc.type === 'folder'}",
    ctx: ctx
  });
  return block;
} // (89:2) {#each doc.children as subdoc}


function create_each_block_1(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block_4, create_else_block_4];
  var if_blocks = [];

  function select_block_type_4(ctx, dirty) {
    if (
    /*subdoc*/
    ctx[7].type === "folder") return 0;
    return 1;
  }

  current_block_type_index = select_block_type_4(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_4(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1.name,
    type: "each",
    source: "(89:2) {#each doc.children as subdoc}",
    ctx: ctx
  });
  return block;
} // (58:2) {:else}


function create_else_block_1(ctx) {
  var div;
  var t0;
  var t1_value =
  /*doc*/
  ctx[1].title + "";
  var t1;
  var div_class_value;
  var dispose;

  function select_block_type_2(ctx, dirty) {
    if (
    /*state*/
    ctx[0] === "active") return create_if_block_3;
    return create_else_block_2;
  }

  var current_block_type = select_block_type_2(ctx);
  var if_block = current_block_type(ctx);
  var block = {
    c: function create() {
      div = element("div");
      if_block.c();
      t0 = space();
      t1 = text(t1_value);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true,
        href: true
      });
      var div_nodes = children(div);
      if_block.l(div_nodes);
      t0 = claim_space(div_nodes);
      t1 = claim_text(div_nodes, t1_value);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", div_class_value = "" + (null_to_empty("sidebar-category " +
      /*state*/
      ctx[0] + " nested") + " svelte-866tpx"));
      attr_dev(div, "href", "#");
      add_location(div, file$1, 58, 4, 1212);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, div, anchor);
      if_block.m(div, null);
      append_dev(div, t0);
      append_dev(div, t1);
      if (remount) dispose();
      dispose = listen_dev(div, "click",
      /*toggleState*/
      ctx[6], false, false, false);
    },
    p: function update(ctx, dirty) {
      if (current_block_type !== (current_block_type = select_block_type_2(ctx))) {
        if_block.d(1);
        if_block = current_block_type(ctx);

        if (if_block) {
          if_block.c();
          if_block.m(div, t0);
        }
      }

      if (dirty &
      /*doc*/
      2 && t1_value !== (t1_value =
      /*doc*/
      ctx[1].title + "")) set_data_dev(t1, t1_value);

      if (dirty &
      /*state*/
      1 && div_class_value !== (div_class_value = "" + (null_to_empty("sidebar-category " +
      /*state*/
      ctx[0] + " nested") + " svelte-866tpx"))) {
        attr_dev(div, "class", div_class_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if_block.d();
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_1.name,
    type: "else",
    source: "(58:2) {:else}",
    ctx: ctx
  });
  return block;
} // (54:2) {#if isCategory}


function create_if_block_2(ctx) {
  var h3;
  var t_value =
  /*doc*/
  ctx[1].title + "";
  var t;
  var h3_class_value;
  var dispose;
  var block = {
    c: function create() {
      h3 = element("h3");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      h3 = claim_element(nodes, "H3", {
        class: true
      });
      var h3_nodes = children(h3);
      t = claim_text(h3_nodes, t_value);
      h3_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h3, "class", h3_class_value = "" + (null_to_empty("sidebar-category " +
      /*state*/
      ctx[0]) + " svelte-866tpx"));
      add_location(h3, file$1, 54, 4, 1106);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, h3, anchor);
      append_dev(h3, t);
      if (remount) dispose();
      dispose = listen_dev(h3, "click",
      /*toggleState*/
      ctx[6], false, false, false);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*doc*/
      2 && t_value !== (t_value =
      /*doc*/
      ctx[1].title + "")) set_data_dev(t, t_value);

      if (dirty &
      /*state*/
      1 && h3_class_value !== (h3_class_value = "" + (null_to_empty("sidebar-category " +
      /*state*/
      ctx[0]) + " svelte-866tpx"))) {
        attr_dev(h3, "class", h3_class_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(h3);
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(54:2) {#if isCategory}",
    ctx: ctx
  });
  return block;
} // (67:6) {:else}


function create_else_block_2(ctx) {
  var i;
  var block = {
    c: function create() {
      i = element("i");
      this.h();
    },
    l: function claim(nodes) {
      i = claim_element(nodes, "I", {
        class: true,
        style: true
      });
      children(i).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(i, "class", "fa fa-plus-square");
      set_style(i, "color", "#b0b0b0");
      set_style(i, "margin-right", "6px");
      add_location(i, file$1, 67, 8, 1471);
    },
    m: function mount(target, anchor) {
      insert_dev(target, i, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(i);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_2.name,
    type: "else",
    source: "(67:6) {:else}",
    ctx: ctx
  });
  return block;
} // (63:6) {#if state === 'active'}


function create_if_block_3(ctx) {
  var i;
  var block = {
    c: function create() {
      i = element("i");
      this.h();
    },
    l: function claim(nodes) {
      i = claim_element(nodes, "I", {
        class: true,
        style: true
      });
      children(i).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(i, "class", "fa fa-minus-square");
      set_style(i, "color", "#b0b0b0");
      set_style(i, "margin-right", "6px");
      add_location(i, file$1, 63, 8, 1355);
    },
    m: function mount(target, anchor) {
      insert_dev(target, i, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(i);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3.name,
    type: "if",
    source: "(63:6) {#if state === 'active'}",
    ctx: ctx
  });
  return block;
} // (78:8) {:else}


function create_else_block$1(ctx) {
  var current;
  var file_1 = new File({
    props: {
      doc:
      /*subdoc*/
      ctx[7]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(file_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(file_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(file_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var file_1_changes = {};
      if (dirty &
      /*doc*/
      2) file_1_changes.doc =
      /*subdoc*/
      ctx[7];
      file_1.$set(file_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(file_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(file_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(file_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$1.name,
    type: "else",
    source: "(78:8) {:else}",
    ctx: ctx
  });
  return block;
} // (76:8) {#if subdoc.type === 'folder'}


function create_if_block_1(ctx) {
  var current;
  var folder = new Folder({
    props: {
      doc:
      /*subdoc*/
      ctx[7]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(folder.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(folder.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(folder, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var folder_changes = {};
      if (dirty &
      /*doc*/
      2) folder_changes.doc =
      /*subdoc*/
      ctx[7];
      folder.$set(folder_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(folder.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(folder.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(folder, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(76:8) {#if subdoc.type === 'folder'}",
    ctx: ctx
  });
  return block;
} // (74:4) {#each doc.children as subdoc}


function create_each_block(ctx) {
  var li;
  var current_block_type_index;
  var if_block;
  var t;
  var current;
  var if_block_creators = [create_if_block_1, create_else_block$1];
  var if_blocks = [];

  function select_block_type_3(ctx, dirty) {
    if (
    /*subdoc*/
    ctx[7].type === "folder") return 0;
    return 1;
  }

  current_block_type_index = select_block_type_3(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      li = element("li");
      if_block.c();
      t = space();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      if_block.l(li_nodes);
      t = claim_space(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(li, file$1, 74, 6, 1663);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      if_blocks[current_block_type_index].m(li, null);
      append_dev(li, t);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_3(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(li, t);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
      if_blocks[current_block_type_index].d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(74:4) {#each doc.children as subdoc}",
    ctx: ctx
  });
  return block;
}

function create_fragment$1(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$1, create_else_block_3];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (!
    /*isMobile*/
    ctx[2]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$1.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$1($$self, $$props, $$invalidate) {
  var doc = $$props.doc;
  var _$$props$isMobile = $$props.isMobile,
      isMobile = _$$props$isMobile === void 0 ? false : _$$props$isMobile;
  var _$$props$isCategory = $$props.isCategory,
      isCategory = _$$props$isCategory === void 0 ? false : _$$props$isCategory;
  var _$$props$level = $$props.level,
      level = _$$props$level === void 0 ? 0 : _$$props$level;
  var levelString = "";

  for (var index = 0; index < level; index++) {
    levelString += " ";
  }

  var _$$props$state = $$props.state,
      state = _$$props$state === void 0 ? "" : _$$props$state;

  function toggleState() {
    if (state === "") {
      $$invalidate(0, state = "active");
    } else {
      $$invalidate(0, state = "");
    }
  }

  var writable_props = ["doc", "isMobile", "isCategory", "level", "state"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Folder> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Folder", $$slots, []);

  $$self.$set = function ($$props) {
    if ("doc" in $$props) $$invalidate(1, doc = $$props.doc);
    if ("isMobile" in $$props) $$invalidate(2, isMobile = $$props.isMobile);
    if ("isCategory" in $$props) $$invalidate(3, isCategory = $$props.isCategory);
    if ("level" in $$props) $$invalidate(4, level = $$props.level);
    if ("state" in $$props) $$invalidate(0, state = $$props.state);
  };

  $$self.$capture_state = function () {
    return {
      File: File,
      doc: doc,
      isMobile: isMobile,
      isCategory: isCategory,
      level: level,
      levelString: levelString,
      state: state,
      toggleState: toggleState
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("doc" in $$props) $$invalidate(1, doc = $$props.doc);
    if ("isMobile" in $$props) $$invalidate(2, isMobile = $$props.isMobile);
    if ("isCategory" in $$props) $$invalidate(3, isCategory = $$props.isCategory);
    if ("level" in $$props) $$invalidate(4, level = $$props.level);
    if ("levelString" in $$props) $$invalidate(5, levelString = $$props.levelString);
    if ("state" in $$props) $$invalidate(0, state = $$props.state);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [state, doc, isMobile, isCategory, level, levelString, toggleState];
}

var Folder = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Folder, _SvelteComponentDev);

  var _super = _createSuper$2(Folder);

  function Folder(options) {
    var _this;

    _classCallCheck(this, Folder);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      doc: 1,
      isMobile: 2,
      isCategory: 3,
      level: 4,
      state: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Folder",
      options: options,
      id: create_fragment$1.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*doc*/
    ctx[1] === undefined && !("doc" in props)) {
      console.warn("<Folder> was created without expected prop 'doc'");
    }

    return _this;
  }

  _createClass(Folder, [{
    key: "doc",
    get: function get() {
      throw new Error("<Folder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Folder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isMobile",
    get: function get() {
      throw new Error("<Folder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Folder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isCategory",
    get: function get() {
      throw new Error("<Folder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Folder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "level",
    get: function get() {
      throw new Error("<Folder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Folder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "state",
    get: function get() {
      throw new Error("<Folder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Folder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Folder;
}(SvelteComponentDev);

function _createSuper$3(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$3()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$2 = "src/routes/_sidebar.svelte";

function get_each_context_1$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[5] = list[i];
  return child_ctx;
}

function get_each_context$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[5] = list[i];
  return child_ctx;
} // (33:0) {:else}


function create_else_block_1$1(ctx) {
  var label;
  var t0;
  var t1;
  var select;
  var current;
  var dispose;
  var each_value_1 =
  /*docs*/
  ctx[0];
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      label = element("label");
      t0 = text("Jump to:");
      t1 = space();
      select = element("select");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      label = claim_element(nodes, "LABEL", {
        for: true
      });
      var label_nodes = children(label);
      t0 = claim_text(label_nodes, "Jump to:");
      label_nodes.forEach(detach_dev);
      t1 = claim_space(nodes);
      select = claim_element(nodes, "SELECT", {
        id: true
      });
      var select_nodes = children(select);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(select_nodes);
      }

      select_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(label, "for", "jumpToSelector");
      add_location(label, file$2, 33, 2, 702);
      attr_dev(select, "id", "jumpToSelector");
      if (
      /*selected*/
      ctx[2] === void 0) add_render_callback(function () {
        return (
          /*select_change_handler*/
          ctx[4].call(select)
        );
      });
      add_location(select, file$2, 34, 2, 749);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, label, anchor);
      append_dev(label, t0);
      insert_dev(target, t1, anchor);
      insert_dev(target, select, anchor);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(select, null);
      }

      select_option(select,
      /*selected*/
      ctx[2]);
      current = true;
      if (remount) run_all(dispose);
      dispose = [listen_dev(select, "change",
      /*select_change_handler*/
      ctx[4]), listen_dev(select, "change",
      /*jumpTo*/
      ctx[3], false, false, false)];
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*docs*/
      1) {
        each_value_1 =
        /*docs*/
        ctx[0];
        validate_each_argument(each_value_1);

        var _i4;

        for (_i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
          var child_ctx = get_each_context_1$1(ctx, each_value_1, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);

            transition_in(each_blocks[_i4], 1);
          } else {
            each_blocks[_i4] = create_each_block_1$1(child_ctx);

            each_blocks[_i4].c();

            transition_in(each_blocks[_i4], 1);

            each_blocks[_i4].m(select, null);
          }
        }

        group_outros();

        for (_i4 = each_value_1.length; _i4 < each_blocks.length; _i4 += 1) {
          out(_i4);
        }

        check_outros();
      }

      if (dirty &
      /*selected*/
      4) {
        select_option(select,
        /*selected*/
        ctx[2]);
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i5 = 0; _i5 < each_value_1.length; _i5 += 1) {
        transition_in(each_blocks[_i5]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        transition_out(each_blocks[_i6]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(label);
      if (detaching) detach_dev(t1);
      if (detaching) detach_dev(select);
      destroy_each(each_blocks, detaching);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_1$1.name,
    type: "else",
    source: "(33:0) {:else}",
    ctx: ctx
  });
  return block;
} // (15:0) {#if !isMobile}


function create_if_block$2(ctx) {
  var div;
  var ul;
  var current;
  var each_value =
  /*docs*/
  ctx[0];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      div = element("div");
      ul = element("ul");

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      ul = claim_element(div_nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);

      for (var _i8 = 0; _i8 < each_blocks.length; _i8 += 1) {
        each_blocks[_i8].l(ul_nodes);
      }

      ul_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(ul, "class", "sidebar-links");
      add_location(ul, file$2, 16, 4, 364);
      attr_dev(div, "class", "sidebar sidebar-left");
      add_location(div, file$2, 15, 2, 325);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, ul);

      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].m(ul, null);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*docs*/
      1) {
        each_value =
        /*docs*/
        ctx[0];
        validate_each_argument(each_value);

        var _i10;

        for (_i10 = 0; _i10 < each_value.length; _i10 += 1) {
          var child_ctx = get_each_context$1(ctx, each_value, _i10);

          if (each_blocks[_i10]) {
            each_blocks[_i10].p(child_ctx, dirty);

            transition_in(each_blocks[_i10], 1);
          } else {
            each_blocks[_i10] = create_each_block$1(child_ctx);

            each_blocks[_i10].c();

            transition_in(each_blocks[_i10], 1);

            each_blocks[_i10].m(ul, null);
          }
        }

        group_outros();

        for (_i10 = each_value.length; _i10 < each_blocks.length; _i10 += 1) {
          out(_i10);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i11 = 0; _i11 < each_value.length; _i11 += 1) {
        transition_in(each_blocks[_i11]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i12 = 0; _i12 < each_blocks.length; _i12 += 1) {
        transition_out(each_blocks[_i12]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$2.name,
    type: "if",
    source: "(15:0) {#if !isMobile}",
    ctx: ctx
  });
  return block;
} // (41:6) {:else}


function create_else_block_2$1(ctx) {
  var current;
  var file_1 = new File({
    props: {
      doc:
      /*doc*/
      ctx[5],
      isMobile: true
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(file_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(file_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(file_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var file_1_changes = {};
      if (dirty &
      /*docs*/
      1) file_1_changes.doc =
      /*doc*/
      ctx[5];
      file_1.$set(file_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(file_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(file_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(file_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_2$1.name,
    type: "else",
    source: "(41:6) {:else}",
    ctx: ctx
  });
  return block;
} // (39:38) 


function create_if_block_4$1(ctx) {
  var current;
  var folder = new Folder({
    props: {
      doc:
      /*doc*/
      ctx[5],
      isMobile: true
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(folder.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(folder.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(folder, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var folder_changes = {};
      if (dirty &
      /*docs*/
      1) folder_changes.doc =
      /*doc*/
      ctx[5];
      folder.$set(folder_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(folder.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(folder.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(folder, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4$1.name,
    type: "if",
    source: "(39:38) ",
    ctx: ctx
  });
  return block;
} // (37:6) {#if doc.type === 'category'}


function create_if_block_3$1(ctx) {
  var current;
  var folder = new Folder({
    props: {
      doc:
      /*doc*/
      ctx[5],
      isCategory: true,
      isMobile: true
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(folder.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(folder.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(folder, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var folder_changes = {};
      if (dirty &
      /*docs*/
      1) folder_changes.doc =
      /*doc*/
      ctx[5];
      folder.$set(folder_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(folder.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(folder.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(folder, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3$1.name,
    type: "if",
    source: "(37:6) {#if doc.type === 'category'}",
    ctx: ctx
  });
  return block;
} // (36:4) {#each docs as doc}


function create_each_block_1$1(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block_3$1, create_if_block_4$1, create_else_block_2$1];
  var if_blocks = [];

  function select_block_type_2(ctx, dirty) {
    if (
    /*doc*/
    ctx[5].type === "category") return 0;
    if (
    /*doc*/
    ctx[5].type === "folder") return 1;
    return 2;
  }

  current_block_type_index = select_block_type_2(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_2(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1$1.name,
    type: "each",
    source: "(36:4) {#each docs as doc}",
    ctx: ctx
  });
  return block;
} // (24:10) {:else}


function create_else_block$2(ctx) {
  var current;
  var file_1 = new File({
    props: {
      doc:
      /*doc*/
      ctx[5]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(file_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(file_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(file_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var file_1_changes = {};
      if (dirty &
      /*docs*/
      1) file_1_changes.doc =
      /*doc*/
      ctx[5];
      file_1.$set(file_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(file_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(file_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(file_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$2.name,
    type: "else",
    source: "(24:10) {:else}",
    ctx: ctx
  });
  return block;
} // (22:42) 


function create_if_block_2$1(ctx) {
  var current;
  var folder = new Folder({
    props: {
      doc:
      /*doc*/
      ctx[5]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(folder.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(folder.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(folder, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var folder_changes = {};
      if (dirty &
      /*docs*/
      1) folder_changes.doc =
      /*doc*/
      ctx[5];
      folder.$set(folder_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(folder.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(folder.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(folder, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$1.name,
    type: "if",
    source: "(22:42) ",
    ctx: ctx
  });
  return block;
} // (20:10) {#if doc.type === 'category'}


function create_if_block_1$1(ctx) {
  var current;
  var folder = new Folder({
    props: {
      doc:
      /*doc*/
      ctx[5],
      isCategory: true
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(folder.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(folder.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(folder, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var folder_changes = {};
      if (dirty &
      /*docs*/
      1) folder_changes.doc =
      /*doc*/
      ctx[5];
      folder.$set(folder_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(folder.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(folder.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(folder, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$1.name,
    type: "if",
    source: "(20:10) {#if doc.type === 'category'}",
    ctx: ctx
  });
  return block;
} // (18:6) {#each docs as doc}


function create_each_block$1(ctx) {
  var li;
  var current_block_type_index;
  var if_block;
  var t;
  var current;
  var if_block_creators = [create_if_block_1$1, create_if_block_2$1, create_else_block$2];
  var if_blocks = [];

  function select_block_type_1(ctx, dirty) {
    if (
    /*doc*/
    ctx[5].type === "category") return 0;
    if (
    /*doc*/
    ctx[5].type === "folder") return 1;
    return 2;
  }

  current_block_type_index = select_block_type_1(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      li = element("li");
      if_block.c();
      t = space();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      if_block.l(li_nodes);
      t = claim_space(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(li, file$2, 18, 8, 425);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      if_blocks[current_block_type_index].m(li, null);
      append_dev(li, t);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(li, t);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
      if_blocks[current_block_type_index].d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$1.name,
    type: "each",
    source: "(18:6) {#each docs as doc}",
    ctx: ctx
  });
  return block;
}

function create_fragment$2(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$2, create_else_block_1$1];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (!
    /*isMobile*/
    ctx[1]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$2.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$2($$self, $$props, $$invalidate) {
  var docs = $$props.docs;
  var selected;
  var _$$props$isMobile = $$props.isMobile,
      isMobile = _$$props$isMobile === void 0 ? false : _$$props$isMobile;

  function jumpTo(e) {
    goto(selected);
  }

  docs = docs.filter(function (doc) {
    return !doc.title.startsWith(".");
  });
  var writable_props = ["docs", "isMobile"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Sidebar> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Sidebar", $$slots, []);

  function select_change_handler() {
    selected = select_value(this);
    $$invalidate(2, selected);
  }

  $$self.$set = function ($$props) {
    if ("docs" in $$props) $$invalidate(0, docs = $$props.docs);
    if ("isMobile" in $$props) $$invalidate(1, isMobile = $$props.isMobile);
  };

  $$self.$capture_state = function () {
    return {
      Folder: Folder,
      File: File,
      docs: docs,
      selected: selected,
      isMobile: isMobile,
      goto: goto,
      jumpTo: jumpTo
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("docs" in $$props) $$invalidate(0, docs = $$props.docs);
    if ("selected" in $$props) $$invalidate(2, selected = $$props.selected);
    if ("isMobile" in $$props) $$invalidate(1, isMobile = $$props.isMobile);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [docs, isMobile, selected, jumpTo, select_change_handler];
}

var Sidebar = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Sidebar, _SvelteComponentDev);

  var _super = _createSuper$3(Sidebar);

  function Sidebar(options) {
    var _this;

    _classCallCheck(this, Sidebar);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
      docs: 0,
      isMobile: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Sidebar",
      options: options,
      id: create_fragment$2.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*docs*/
    ctx[0] === undefined && !("docs" in props)) {
      console.warn("<Sidebar> was created without expected prop 'docs'");
    }

    return _this;
  }

  _createClass(Sidebar, [{
    key: "docs",
    get: function get() {
      throw new Error("<Sidebar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Sidebar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isMobile",
    get: function get() {
      throw new Error("<Sidebar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Sidebar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Sidebar;
}(SvelteComponentDev);

function _createSuper$4(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$4()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$3 = "src/routes/_spinner.svelte";

function create_fragment$3(ctx) {
  var div2;
  var div0;
  var i;
  var t0;
  var div1;
  var t1;
  var block = {
    c: function create() {
      div2 = element("div");
      div0 = element("div");
      i = element("i");
      t0 = space();
      div1 = element("div");
      t1 = text(
      /*caption*/
      ctx[0]);
      this.h();
    },
    l: function claim(nodes) {
      div2 = claim_element(nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      div0 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      i = claim_element(div0_nodes, "I", {
        class: true
      });
      children(i).forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t0 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      t1 = claim_text(div1_nodes,
      /*caption*/
      ctx[0]);
      div1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(i, "class", "fas fa-spinner fa-spin");
      add_location(i, file$3, 6, 4, 120);
      attr_dev(div0, "class", "text-6xl");
      add_location(div0, file$3, 5, 2, 93);
      attr_dev(div1, "class", "");
      add_location(div1, file$3, 8, 2, 168);
      attr_dev(div2, "class", "container mx-auto text-center");
      add_location(div2, file$3, 4, 0, 47);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      append_dev(div2, div0);
      append_dev(div0, i);
      append_dev(div2, t0);
      append_dev(div2, div1);
      append_dev(div1, t1);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*caption*/
      1) set_data_dev(t1,
      /*caption*/
      ctx[0]);
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div2);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$3.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$3($$self, $$props, $$invalidate) {
  var _$$props$caption = $$props.caption,
      caption = _$$props$caption === void 0 ? "" : _$$props$caption;
  var writable_props = ["caption"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Spinner> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Spinner", $$slots, []);

  $$self.$set = function ($$props) {
    if ("caption" in $$props) $$invalidate(0, caption = $$props.caption);
  };

  $$self.$capture_state = function () {
    return {
      caption: caption
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("caption" in $$props) $$invalidate(0, caption = $$props.caption);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [caption];
}

var Spinner = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Spinner, _SvelteComponentDev);

  var _super = _createSuper$4(Spinner);

  function Spinner(options) {
    var _this;

    _classCallCheck(this, Spinner);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
      caption: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Spinner",
      options: options,
      id: create_fragment$3.name
    });
    return _this;
  }

  _createClass(Spinner, [{
    key: "caption",
    get: function get() {
      throw new Error("<Spinner>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Spinner>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Spinner;
}(SvelteComponentDev);

function _createSuper$5(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$5()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$4 = "src/routes/_content.svelte"; // (9:0) {:else}

function create_else_block$3(ctx) {
  var section;
  var current;
  var default_slot_template =
  /*$$slots*/
  ctx[5].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[4], null);
  var block = {
    c: function create() {
      section = element("section");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      section = claim_element(nodes, "SECTION", {});
      var section_nodes = children(section);
      if (default_slot) default_slot.l(section_nodes);
      section_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(section, file$4, 9, 2, 222);
    },
    m: function mount(target, anchor) {
      insert_dev(target, section, anchor);

      if (default_slot) {
        default_slot.m(section, null);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        16) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[4], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[4], dirty, null));
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(section);
      if (default_slot) default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$3.name,
    type: "else",
    source: "(9:0) {:else}",
    ctx: ctx
  });
  return block;
} // (7:0) {#if $preloading}


function create_if_block$3(ctx) {
  var current;
  var spinner = new Spinner({
    props: {
      caption: "Loading posts..."
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(spinner.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(spinner.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(spinner, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current) return;
      transition_in(spinner.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(spinner.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(spinner, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$3.name,
    type: "if",
    source: "(7:0) {#if $preloading}",
    ctx: ctx
  });
  return block;
}

function create_fragment$4(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$3, create_else_block$3];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*$preloading*/
    ctx[0]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$4.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$4($$self, $$props, $$invalidate) {
  var $preloading;

  var _stores = stores$1(),
      preloading = _stores.preloading,
      page = _stores.page,
      session = _stores.session;

  validate_store(preloading, "preloading");
  component_subscribe($$self, preloading, function (value) {
    return $$invalidate(0, $preloading = value);
  });
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Content> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Content", $$slots, ['default']);

  $$self.$set = function ($$props) {
    if ("$$scope" in $$props) $$invalidate(4, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      Spinner: Spinner,
      stores: stores$1,
      preloading: preloading,
      page: page,
      session: session,
      $preloading: $preloading
    };
  };

  return [$preloading, preloading, page, session, $$scope, $$slots];
}

var Content = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Content, _SvelteComponentDev);

  var _super = _createSuper$5(Content);

  function Content(options) {
    var _this;

    _classCallCheck(this, Content);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Content",
      options: options,
      id: create_fragment$4.name
    });
    return _this;
  }

  return Content;
}(SvelteComponentDev);

function _createSuper$6(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$6()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$5 = "src/routes/_nav.svelte";

function get_each_context$2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[5] = list[i];
  return child_ctx;
}

function get_each_context_1$2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  return child_ctx;
}

function get_each_context_2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[5] = list[i];
  return child_ctx;
}

function get_each_context_3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  return child_ctx;
} // (68:6) {#each config.navigation as nav}


function create_each_block_3(ctx) {
  var li;
  var a;
  var span;
  var span_class_value;
  var t0;
  var t1_value =
  /*nav*/
  ctx[8].caption + "";
  var t1;
  var a_href_value;
  var block = {
    c: function create() {
      li = element("li");
      a = element("a");
      span = element("span");
      t0 = space();
      t1 = text(t1_value);
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      a = claim_element(li_nodes, "A", {
        href: true,
        target: true
      });
      var a_nodes = children(a);
      span = claim_element(a_nodes, "SPAN", {
        class: true,
        style: true
      });
      children(span).forEach(detach_dev);
      t0 = claim_space(a_nodes);
      t1 = claim_text(a_nodes, t1_value);
      a_nodes.forEach(detach_dev);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", span_class_value = "" + (null_to_empty(
      /*nav*/
      ctx[8].icon) + " svelte-gbajag"));
      set_style(span, "margin-right", ".5rem");
      add_location(span, file$5, 71, 12, 1460);
      attr_dev(a, "href", a_href_value =
      /*nav*/
      ctx[8].url);
      attr_dev(a, "target", "_blank");
      add_location(a, file$5, 70, 10, 1413);
      add_location(li, file$5, 68, 8, 1397);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, a);
      append_dev(a, span);
      append_dev(a, t0);
      append_dev(a, t1);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_3.name,
    type: "each",
    source: "(68:6) {#each config.navigation as nav}",
    ctx: ctx
  });
  return block;
} // (89:8) {#if showLanguageMenu}


function create_if_block_1$2(ctx) {
  var ul;
  var each_value_2 = data.availableLanguages;
  validate_each_argument(each_value_2);
  var each_blocks = [];

  for (var i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }

  var block = {
    c: function create() {
      ul = element("ul");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      ul = claim_element(nodes, "UL", {
        id: true,
        class: true,
        role: true
      });
      var ul_nodes = children(ul);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(ul_nodes);
      }

      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(ul, "id", "language-menu");
      attr_dev(ul, "class", "nav-dropdown-menu-items right");
      attr_dev(ul, "role", "menu");
      add_location(ul, file$5, 90, 10, 2053);
    },
    m: function mount(target, anchor) {
      insert_dev(target, ul, anchor);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(ul, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*changeLanguage, config*/
      0) {
        each_value_2 = data.availableLanguages;
        validate_each_argument(each_value_2);

        var _i4;

        for (_i4 = 0; _i4 < each_value_2.length; _i4 += 1) {
          var child_ctx = get_each_context_2(ctx, each_value_2, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_2(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(ul, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value_2.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(ul);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$2.name,
    type: "if",
    source: "(89:8) {#if showLanguageMenu}",
    ctx: ctx
  });
  return block;
} // (95:12) {#each config.availableLanguages as lang}


function create_each_block_2(ctx) {
  var li;
  var div;
  var t0_value =
  /*lang*/
  ctx[5].caption + "";
  var t0;
  var div_style_value;
  var t1;
  var dispose;

  function click_handler() {
    var _ctx;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (
      /*click_handler*/
      (_ctx = ctx)[4].apply(_ctx, [
      /*lang*/
      ctx[5]].concat(args))
    );
  }

  var block = {
    c: function create() {
      li = element("li");
      div = element("div");
      t0 = text(t0_value);
      t1 = space();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {
        class: true
      });
      var li_nodes = children(li);
      div = claim_element(li_nodes, "DIV", {
        style: true
      });
      var div_nodes = children(div);
      t0 = claim_text(div_nodes, t0_value);
      div_nodes.forEach(detach_dev);
      t1 = claim_space(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "style", div_style_value = "cursor:pointer");
      add_location(div, file$5, 97, 16, 2335);
      attr_dev(li, "class", "nav-menuitem");
      add_location(li, file$5, 95, 14, 2231);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, li, anchor);
      append_dev(li, div);
      append_dev(div, t0);
      append_dev(li, t1);
      if (remount) dispose();
      dispose = listen_dev(div, "click", click_handler, false, false, false);
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_2.name,
    type: "each",
    source: "(95:12) {#each config.availableLanguages as lang}",
    ctx: ctx
  });
  return block;
} // (111:4) {#if showMobileMenu}


function create_if_block$4(ctx) {
  var ul;
  var t;
  var each_value_1 = data.navigation;
  validate_each_argument(each_value_1);
  var each_blocks_1 = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks_1[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
  }

  var each_value = data.availableLanguages;
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var _i5 = 0; _i5 < each_value.length; _i5 += 1) {
    each_blocks[_i5] = create_each_block$2(get_each_context$2(ctx, each_value, _i5));
  }

  var block = {
    c: function create() {
      ul = element("ul");

      for (var _i6 = 0; _i6 < each_blocks_1.length; _i6 += 1) {
        each_blocks_1[_i6].c();
      }

      t = space();

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      ul = claim_element(nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);

      for (var _i8 = 0; _i8 < each_blocks_1.length; _i8 += 1) {
        each_blocks_1[_i8].l(ul_nodes);
      }

      t = claim_space(ul_nodes);

      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].l(ul_nodes);
      }

      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(ul, "class", "mobile-menu menu svelte-gbajag");
      add_location(ul, file$5, 111, 6, 2659);
    },
    m: function mount(target, anchor) {
      insert_dev(target, ul, anchor);

      for (var _i10 = 0; _i10 < each_blocks_1.length; _i10 += 1) {
        each_blocks_1[_i10].m(ul, null);
      }

      append_dev(ul, t);

      for (var _i11 = 0; _i11 < each_blocks.length; _i11 += 1) {
        each_blocks[_i11].m(ul, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*config*/
      0) {
        each_value_1 = data.navigation;
        validate_each_argument(each_value_1);

        var _i12;

        for (_i12 = 0; _i12 < each_value_1.length; _i12 += 1) {
          var child_ctx = get_each_context_1$2(ctx, each_value_1, _i12);

          if (each_blocks_1[_i12]) {
            each_blocks_1[_i12].p(child_ctx, dirty);
          } else {
            each_blocks_1[_i12] = create_each_block_1$2(child_ctx);

            each_blocks_1[_i12].c();

            each_blocks_1[_i12].m(ul, t);
          }
        }

        for (; _i12 < each_blocks_1.length; _i12 += 1) {
          each_blocks_1[_i12].d(1);
        }

        each_blocks_1.length = each_value_1.length;
      }

      if (dirty &
      /*changeLanguage, config*/
      0) {
        each_value = data.availableLanguages;
        validate_each_argument(each_value);

        var _i13;

        for (_i13 = 0; _i13 < each_value.length; _i13 += 1) {
          var _child_ctx = get_each_context$2(ctx, each_value, _i13);

          if (each_blocks[_i13]) {
            each_blocks[_i13].p(_child_ctx, dirty);
          } else {
            each_blocks[_i13] = create_each_block$2(_child_ctx);

            each_blocks[_i13].c();

            each_blocks[_i13].m(ul, null);
          }
        }

        for (; _i13 < each_blocks.length; _i13 += 1) {
          each_blocks[_i13].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(ul);
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$4.name,
    type: "if",
    source: "(111:4) {#if showMobileMenu}",
    ctx: ctx
  });
  return block;
} // (113:8) {#each config.navigation as nav}


function create_each_block_1$2(ctx) {
  var li;
  var a;
  var t_value =
  /*nav*/
  ctx[8].caption + "";
  var t;
  var a_href_value;
  var block = {
    c: function create() {
      li = element("li");
      a = element("a");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      a = claim_element(li_nodes, "A", {
        href: true,
        target: true
      });
      var a_nodes = children(a);
      t = claim_text(a_nodes, t_value);
      a_nodes.forEach(detach_dev);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(a, "href", a_href_value =
      /*nav*/
      ctx[8].url);
      attr_dev(a, "target", "_blank");
      add_location(a, file$5, 114, 12, 2757);
      add_location(li, file$5, 113, 10, 2740);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, a);
      append_dev(a, t);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1$2.name,
    type: "each",
    source: "(113:8) {#each config.navigation as nav}",
    ctx: ctx
  });
  return block;
} // (120:8) {#each config.availableLanguages as lang}


function create_each_block$2(ctx) {
  var li;
  var a;
  var t0_value =
  /*lang*/
  ctx[5].caption + "";
  var t0;
  var t1;
  var dispose;
  var block = {
    c: function create() {
      li = element("li");
      a = element("a");
      t0 = text(t0_value);
      t1 = space();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      a = claim_element(li_nodes, "A", {
        href: true,
        title: true
      });
      var a_nodes = children(a);
      t0 = claim_text(a_nodes, t0_value);
      a_nodes.forEach(detach_dev);
      t1 = claim_space(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(a, "href", "#");
      attr_dev(a, "title", "Catalan");
      add_location(a, file$5, 121, 12, 2920);
      add_location(li, file$5, 120, 10, 2903);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, li, anchor);
      append_dev(li, a);
      append_dev(a, t0);
      append_dev(li, t1);
      if (remount) dispose();
      dispose = listen_dev(a, "click", changeLanguage(
      /*lang*/
      ctx[5]), false, false, false);
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$2.name,
    type: "each",
    source: "(120:8) {#each config.availableLanguages as lang}",
    ctx: ctx
  });
  return block;
}

function create_fragment$5(ctx) {
  var t0;
  var nav;
  var div2;
  var div0;
  var a;
  var img;
  var img_src_value;
  var t1;
  var span0;
  var t2_value = data.projectName + "";
  var t2;
  var t3;
  var ul0;
  var t4;
  var ul1;
  var t5;
  var li;
  var button;
  var span1;
  var t6;
  var t7_value =
  /*$currentLanguage*/
  ctx[2].caption + "";
  var t7;
  var t8;
  var span2;
  var t9;
  var t10;
  var t11;
  var div1;
  var t12;
  var dispose;
  var each_value_3 = data.navigation;
  validate_each_argument(each_value_3);
  var each_blocks = [];

  for (var i = 0; i < each_value_3.length; i += 1) {
    each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
  }

  var if_block0 =
  /*showLanguageMenu*/
  ctx[1] && create_if_block_1$2(ctx);
  var if_block1 =
  /*showMobileMenu*/
  ctx[0] && create_if_block$4(ctx);
  var block = {
    c: function create() {
      t0 = space();
      nav = element("nav");
      div2 = element("div");
      div0 = element("div");
      a = element("a");
      img = element("img");
      t1 = space();
      span0 = element("span");
      t2 = text(t2_value);
      t3 = space();
      ul0 = element("ul");
      t4 = space();
      ul1 = element("ul");

      for (var _i14 = 0; _i14 < each_blocks.length; _i14 += 1) {
        each_blocks[_i14].c();
      }

      t5 = space();
      li = element("li");
      button = element("button");
      span1 = element("span");
      t6 = space();
      t7 = text(t7_value);
      t8 = text("  \n          \n          ");
      span2 = element("span");
      t9 = text("▼");
      t10 = space();
      if (if_block0) if_block0.c();
      t11 = space();
      div1 = element("div");
      t12 = space();
      if (if_block1) if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      t0 = claim_space(nodes);
      nav = claim_element(nodes, "NAV", {});
      var nav_nodes = children(nav);
      div2 = claim_element(nav_nodes, "DIV", {
        class: true,
        "}": true
      });
      var div2_nodes = children(div2);
      div0 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      a = claim_element(div0_nodes, "A", {
        href: true,
        class: true
      });
      var a_nodes = children(a);
      img = claim_element(a_nodes, "IMG", {
        src: true,
        alt: true,
        class: true
      });
      t1 = claim_space(a_nodes);
      span0 = claim_element(a_nodes, "SPAN", {});
      var span0_nodes = children(span0);
      t2 = claim_text(span0_nodes, t2_value);
      span0_nodes.forEach(detach_dev);
      a_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t3 = claim_space(div2_nodes);
      ul0 = claim_element(div2_nodes, "UL", {
        class: true
      });
      children(ul0).forEach(detach_dev);
      t4 = claim_space(div2_nodes);
      ul1 = claim_element(div2_nodes, "UL", {
        class: true
      });
      var ul1_nodes = children(ul1);

      for (var _i15 = 0; _i15 < each_blocks.length; _i15 += 1) {
        each_blocks[_i15].l(ul1_nodes);
      }

      t5 = claim_space(ul1_nodes);
      li = claim_element(ul1_nodes, "LI", {
        class: true
      });
      var li_nodes = children(li);
      button = claim_element(li_nodes, "BUTTON", {
        id: true,
        type: true,
        class: true
      });
      var button_nodes = children(button);
      span1 = claim_element(button_nodes, "SPAN", {
        class: true,
        style: true
      });
      children(span1).forEach(detach_dev);
      t6 = claim_space(button_nodes);
      t7 = claim_text(button_nodes, t7_value);
      t8 = claim_text(button_nodes, "  \n          \n          ");
      span2 = claim_element(button_nodes, "SPAN", {
        class: true,
        "aria-hidden": true
      });
      var span2_nodes = children(span2);
      t9 = claim_text(span2_nodes, "▼");
      span2_nodes.forEach(detach_dev);
      button_nodes.forEach(detach_dev);
      t10 = claim_space(li_nodes);
      if (if_block0) if_block0.l(li_nodes);
      li_nodes.forEach(detach_dev);
      ul1_nodes.forEach(detach_dev);
      t11 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      children(div1).forEach(detach_dev);
      t12 = claim_space(div2_nodes);
      if (if_block1) if_block1.l(div2_nodes);
      div2_nodes.forEach(detach_dev);
      nav_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      if (img.src !== (img_src_value = data.projectLogo)) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", "nicedocs-logo");
      attr_dev(img, "class", "svelte-gbajag");
      add_location(img, file$5, 58, 8, 1174);
      add_location(span0, file$5, 59, 8, 1235);
      attr_dev(a, "href", "/");
      attr_dev(a, "class", "svelte-gbajag");
      add_location(a, file$5, 57, 6, 1153);
      attr_dev(div0, "class", "nav-logo svelte-gbajag");
      add_location(div0, file$5, 56, 4, 1124);
      attr_dev(ul0, "class", "nav-links");
      add_location(ul0, file$5, 63, 4, 1296);
      attr_dev(span1, "class", "fa fa-language");
      set_style(span1, "margin-right", ".5rem");
      add_location(span1, file$5, 82, 10, 1756);
      attr_dev(span2, "class", "dropdown-arrow-down");
      attr_dev(span2, "aria-hidden", "true");
      add_location(span2, file$5, 85, 10, 1899);
      attr_dev(button, "id", "header-language-menu");
      attr_dev(button, "type", "button");
      attr_dev(button, "class", "nav-dropdown-menu-label");
      add_location(button, file$5, 78, 8, 1635);
      attr_dev(li, "class", "nav-dropdown-container");
      add_location(li, file$5, 77, 6, 1591);
      attr_dev(ul1, "class", "nav-links");
      add_location(ul1, file$5, 65, 4, 1326);
      attr_dev(div1, "class", "mobile-menu-toggle");
      add_location(div1, file$5, 109, 4, 2593);
      attr_dev(div2, "class", "nav-container");
      attr_dev(div2, "}", "");
      add_location(div2, file$5, 55, 2, 1090);
      add_location(nav, file$5, 54, 0, 1082);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, t0, anchor);
      insert_dev(target, nav, anchor);
      append_dev(nav, div2);
      append_dev(div2, div0);
      append_dev(div0, a);
      append_dev(a, img);
      append_dev(a, t1);
      append_dev(a, span0);
      append_dev(span0, t2);
      append_dev(div2, t3);
      append_dev(div2, ul0);
      append_dev(div2, t4);
      append_dev(div2, ul1);

      for (var _i16 = 0; _i16 < each_blocks.length; _i16 += 1) {
        each_blocks[_i16].m(ul1, null);
      }

      append_dev(ul1, t5);
      append_dev(ul1, li);
      append_dev(li, button);
      append_dev(button, span1);
      append_dev(button, t6);
      append_dev(button, t7);
      append_dev(button, t8);
      append_dev(button, span2);
      append_dev(span2, t9);
      append_dev(li, t10);
      if (if_block0) if_block0.m(li, null);
      append_dev(div2, t11);
      append_dev(div2, div1);
      append_dev(div2, t12);
      if (if_block1) if_block1.m(div2, null);
      if (remount) dispose();
      dispose = listen_dev(document.body, "click",
      /*toggleMenu*/
      ctx[3], false, false, false);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*config*/
      0) {
        each_value_3 = data.navigation;
        validate_each_argument(each_value_3);

        var _i17;

        for (_i17 = 0; _i17 < each_value_3.length; _i17 += 1) {
          var child_ctx = get_each_context_3(ctx, each_value_3, _i17);

          if (each_blocks[_i17]) {
            each_blocks[_i17].p(child_ctx, dirty);
          } else {
            each_blocks[_i17] = create_each_block_3(child_ctx);

            each_blocks[_i17].c();

            each_blocks[_i17].m(ul1, t5);
          }
        }

        for (; _i17 < each_blocks.length; _i17 += 1) {
          each_blocks[_i17].d(1);
        }

        each_blocks.length = each_value_3.length;
      }

      if (dirty &
      /*$currentLanguage*/
      4 && t7_value !== (t7_value =
      /*$currentLanguage*/
      ctx[2].caption + "")) set_data_dev(t7, t7_value);

      if (
      /*showLanguageMenu*/
      ctx[1]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_1$2(ctx);
          if_block0.c();
          if_block0.m(li, null);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (
      /*showMobileMenu*/
      ctx[0]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block$4(ctx);
          if_block1.c();
          if_block1.m(div2, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(nav);
      destroy_each(each_blocks, detaching);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$5.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function changeLanguage(lang) {
  currentLanguage.set(lang);
  goto(lang.id).then(function () {
    return location.reload();
  });
}

function instance$5($$self, $$props, $$invalidate) {
  var $currentLanguage;
  validate_store(currentLanguage, "currentLanguage");
  component_subscribe($$self, currentLanguage, function ($$value) {
    return $$invalidate(2, $currentLanguage = $$value);
  });
  var showMobileMenu = false;
  var showLanguageMenu = false;

  function toggleMenu(e) {
    //  console.log(e);
    if (!showMobileMenu) {
      if (e.target.closest(".mobile-menu-toggle") !== null) {
        $$invalidate(0, showMobileMenu = true);
      }
    } else {
      $$invalidate(0, showMobileMenu = false);
    }

    if (!showLanguageMenu) {
      if (e.target.closest("#header-language-menu") !== null) {
        $$invalidate(1, showLanguageMenu = true);
      }
    } else {
      $$invalidate(1, showLanguageMenu = false);
    }
  }

  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Nav> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Nav", $$slots, []);

  var click_handler = function click_handler(lang) {
    return changeLanguage(lang);
  };

  $$self.$capture_state = function () {
    return {
      config: data,
      get: get_store_value,
      goto: goto,
      getLanguage: getLanguage,
      currentLanguage: currentLanguage,
      showMobileMenu: showMobileMenu,
      showLanguageMenu: showLanguageMenu,
      toggleMenu: toggleMenu,
      changeLanguage: changeLanguage,
      $currentLanguage: $currentLanguage
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("showMobileMenu" in $$props) $$invalidate(0, showMobileMenu = $$props.showMobileMenu);
    if ("showLanguageMenu" in $$props) $$invalidate(1, showLanguageMenu = $$props.showLanguageMenu);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [showMobileMenu, showLanguageMenu, $currentLanguage, toggleMenu, click_handler];
}

var Nav = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Nav, _SvelteComponentDev);

  var _super = _createSuper$6(Nav);

  function Nav(options) {
    var _this;

    _classCallCheck(this, Nav);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$5, create_fragment$5, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Nav",
      options: options,
      id: create_fragment$5.name
    });
    return _this;
  }

  return Nav;
}(SvelteComponentDev);

function _createSuper$7(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$7()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$6 = "src/routes/_footer.svelte";

function create_fragment$6(ctx) {
  var footer;
  var div5;
  var div4;
  var div1;
  var div0;
  var p0;
  var t0;
  var t1;
  var p1;
  var t2;
  var t3;
  var div2;
  var h40;
  var t4;
  var t5;
  var ul0;
  var li0;
  var a0;
  var t6;
  var t7;
  var li1;
  var a1;
  var t8;
  var t9;
  var li2;
  var a2;
  var t10;
  var t11;
  var div3;
  var h41;
  var t12;
  var t13;
  var ul1;
  var li3;
  var a3;
  var t14;
  var t15;
  var li4;
  var a4;
  var t16;
  var t17;
  var li5;
  var a5;
  var t18;
  var t19;
  var p2;
  var raw_value = data.copyright + "";
  var block = {
    c: function create() {
      footer = element("footer");
      div5 = element("div");
      div4 = element("div");
      div1 = element("div");
      div0 = element("div");
      p0 = element("p");
      t0 = text("Footer Example");
      t1 = space();
      p1 = element("p");
      t2 = text("This is an example of the footer component. You don't have to use\n            this layout, but it's a good example of what you can do with what's\n            provided. If you wanted to included more columns for links and\n            remove this text block, you can.");
      t3 = space();
      div2 = element("div");
      h40 = element("h4");
      t4 = text("Links Category 1");
      t5 = space();
      ul0 = element("ul");
      li0 = element("li");
      a0 = element("a");
      t6 = text("Link #1");
      t7 = space();
      li1 = element("li");
      a1 = element("a");
      t8 = text("Link #2");
      t9 = space();
      li2 = element("li");
      a2 = element("a");
      t10 = text("Link #3");
      t11 = space();
      div3 = element("div");
      h41 = element("h4");
      t12 = text("Links Category 2");
      t13 = space();
      ul1 = element("ul");
      li3 = element("li");
      a3 = element("a");
      t14 = text("Link #1");
      t15 = space();
      li4 = element("li");
      a4 = element("a");
      t16 = text("Link #2");
      t17 = space();
      li5 = element("li");
      a5 = element("a");
      t18 = text("Link #3");
      t19 = space();
      p2 = element("p");
      this.h();
    },
    l: function claim(nodes) {
      footer = claim_element(nodes, "FOOTER", {});
      var footer_nodes = children(footer);
      div5 = claim_element(footer_nodes, "DIV", {
        class: true
      });
      var div5_nodes = children(div5);
      div4 = claim_element(div5_nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      div1 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      p0 = claim_element(div0_nodes, "P", {
        class: true
      });
      var p0_nodes = children(p0);
      t0 = claim_text(p0_nodes, "Footer Example");
      p0_nodes.forEach(detach_dev);
      t1 = claim_space(div0_nodes);
      p1 = claim_element(div0_nodes, "P", {});
      var p1_nodes = children(p1);
      t2 = claim_text(p1_nodes, "This is an example of the footer component. You don't have to use\n            this layout, but it's a good example of what you can do with what's\n            provided. If you wanted to included more columns for links and\n            remove this text block, you can.");
      p1_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t3 = claim_space(div4_nodes);
      div2 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      h40 = claim_element(div2_nodes, "H4", {
        class: true
      });
      var h40_nodes = children(h40);
      t4 = claim_text(h40_nodes, "Links Category 1");
      h40_nodes.forEach(detach_dev);
      t5 = claim_space(div2_nodes);
      ul0 = claim_element(div2_nodes, "UL", {
        class: true
      });
      var ul0_nodes = children(ul0);
      li0 = claim_element(ul0_nodes, "LI", {});
      var li0_nodes = children(li0);
      a0 = claim_element(li0_nodes, "A", {
        href: true
      });
      var a0_nodes = children(a0);
      t6 = claim_text(a0_nodes, "Link #1");
      a0_nodes.forEach(detach_dev);
      li0_nodes.forEach(detach_dev);
      t7 = claim_space(ul0_nodes);
      li1 = claim_element(ul0_nodes, "LI", {});
      var li1_nodes = children(li1);
      a1 = claim_element(li1_nodes, "A", {
        href: true
      });
      var a1_nodes = children(a1);
      t8 = claim_text(a1_nodes, "Link #2");
      a1_nodes.forEach(detach_dev);
      li1_nodes.forEach(detach_dev);
      t9 = claim_space(ul0_nodes);
      li2 = claim_element(ul0_nodes, "LI", {});
      var li2_nodes = children(li2);
      a2 = claim_element(li2_nodes, "A", {
        href: true
      });
      var a2_nodes = children(a2);
      t10 = claim_text(a2_nodes, "Link #3");
      a2_nodes.forEach(detach_dev);
      li2_nodes.forEach(detach_dev);
      ul0_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      t11 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      h41 = claim_element(div3_nodes, "H4", {
        class: true
      });
      var h41_nodes = children(h41);
      t12 = claim_text(h41_nodes, "Links Category 2");
      h41_nodes.forEach(detach_dev);
      t13 = claim_space(div3_nodes);
      ul1 = claim_element(div3_nodes, "UL", {
        class: true
      });
      var ul1_nodes = children(ul1);
      li3 = claim_element(ul1_nodes, "LI", {});
      var li3_nodes = children(li3);
      a3 = claim_element(li3_nodes, "A", {
        href: true
      });
      var a3_nodes = children(a3);
      t14 = claim_text(a3_nodes, "Link #1");
      a3_nodes.forEach(detach_dev);
      li3_nodes.forEach(detach_dev);
      t15 = claim_space(ul1_nodes);
      li4 = claim_element(ul1_nodes, "LI", {});
      var li4_nodes = children(li4);
      a4 = claim_element(li4_nodes, "A", {
        href: true
      });
      var a4_nodes = children(a4);
      t16 = claim_text(a4_nodes, "Link #2");
      a4_nodes.forEach(detach_dev);
      li4_nodes.forEach(detach_dev);
      t17 = claim_space(ul1_nodes);
      li5 = claim_element(ul1_nodes, "LI", {});
      var li5_nodes = children(li5);
      a5 = claim_element(li5_nodes, "A", {
        href: true
      });
      var a5_nodes = children(a5);
      t18 = claim_text(a5_nodes, "Link #3");
      a5_nodes.forEach(detach_dev);
      li5_nodes.forEach(detach_dev);
      ul1_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      div5_nodes.forEach(detach_dev);
      t19 = claim_space(footer_nodes);
      p2 = claim_element(footer_nodes, "P", {
        class: true
      });
      var p2_nodes = children(p2);
      p2_nodes.forEach(detach_dev);
      footer_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p0, "class", "h3");
      add_location(p0, file$6, 9, 10, 193);
      add_location(p1, file$6, 10, 10, 236);
      attr_dev(div0, "class", "footer-text");
      add_location(div0, file$6, 8, 8, 157);
      attr_dev(div1, "class", "col col-lg-5");
      add_location(div1, file$6, 7, 6, 122);
      attr_dev(h40, "class", "footer-links-category");
      add_location(h40, file$6, 19, 8, 627);
      attr_dev(a0, "href", "/");
      add_location(a0, file$6, 22, 12, 744);
      add_location(li0, file$6, 21, 10, 727);
      attr_dev(a1, "href", "/");
      add_location(a1, file$6, 25, 12, 811);
      add_location(li1, file$6, 24, 10, 794);
      attr_dev(a2, "href", "/");
      add_location(a2, file$6, 28, 12, 878);
      add_location(li2, file$6, 27, 10, 861);
      attr_dev(ul0, "class", "footer-links");
      add_location(ul0, file$6, 20, 8, 691);
      attr_dev(div2, "class", "col col-sm-6 col-lg-3 col-lg-offset-1");
      add_location(div2, file$6, 18, 6, 567);
      attr_dev(h41, "class", "footer-links-category");
      add_location(h41, file$6, 34, 8, 996);
      attr_dev(a3, "href", "/");
      add_location(a3, file$6, 37, 12, 1113);
      add_location(li3, file$6, 36, 10, 1096);
      attr_dev(a4, "href", "/");
      add_location(a4, file$6, 40, 12, 1180);
      add_location(li4, file$6, 39, 10, 1163);
      attr_dev(a5, "href", "/");
      add_location(a5, file$6, 43, 12, 1247);
      add_location(li5, file$6, 42, 10, 1230);
      attr_dev(ul1, "class", "footer-links");
      add_location(ul1, file$6, 35, 8, 1060);
      attr_dev(div3, "class", "col col-sm-6 col-lg-3");
      add_location(div3, file$6, 33, 6, 952);
      attr_dev(div4, "class", "row");
      add_location(div4, file$6, 6, 4, 98);
      attr_dev(div5, "class", "container");
      add_location(div5, file$6, 5, 2, 70);
      attr_dev(p2, "class", "copyright align-center");
      add_location(p2, file$6, 50, 2, 1337);
      add_location(footer, file$6, 4, 0, 59);
    },
    m: function mount(target, anchor) {
      insert_dev(target, footer, anchor);
      append_dev(footer, div5);
      append_dev(div5, div4);
      append_dev(div4, div1);
      append_dev(div1, div0);
      append_dev(div0, p0);
      append_dev(p0, t0);
      append_dev(div0, t1);
      append_dev(div0, p1);
      append_dev(p1, t2);
      append_dev(div4, t3);
      append_dev(div4, div2);
      append_dev(div2, h40);
      append_dev(h40, t4);
      append_dev(div2, t5);
      append_dev(div2, ul0);
      append_dev(ul0, li0);
      append_dev(li0, a0);
      append_dev(a0, t6);
      append_dev(ul0, t7);
      append_dev(ul0, li1);
      append_dev(li1, a1);
      append_dev(a1, t8);
      append_dev(ul0, t9);
      append_dev(ul0, li2);
      append_dev(li2, a2);
      append_dev(a2, t10);
      append_dev(div4, t11);
      append_dev(div4, div3);
      append_dev(div3, h41);
      append_dev(h41, t12);
      append_dev(div3, t13);
      append_dev(div3, ul1);
      append_dev(ul1, li3);
      append_dev(li3, a3);
      append_dev(a3, t14);
      append_dev(ul1, t15);
      append_dev(ul1, li4);
      append_dev(li4, a4);
      append_dev(a4, t16);
      append_dev(ul1, t17);
      append_dev(ul1, li5);
      append_dev(li5, a5);
      append_dev(a5, t18);
      append_dev(footer, t19);
      append_dev(footer, p2);
      p2.innerHTML = raw_value;
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(footer);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$6.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$6($$self, $$props, $$invalidate) {
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Footer> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Footer", $$slots, []);

  $$self.$capture_state = function () {
    return {
      config: data
    };
  };

  return [];
}

var Footer = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Footer, _SvelteComponentDev);

  var _super = _createSuper$7(Footer);

  function Footer(options) {
    var _this;

    _classCallCheck(this, Footer);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$6, create_fragment$6, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Footer",
      options: options,
      id: create_fragment$6.name
    });
    return _this;
  }

  return Footer;
}(SvelteComponentDev);

function _createSuper$8(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$8()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$7 = "src/routes/_layout.svelte"; // (36:14) {#if currentLanguageDocs}

function create_if_block_1$3(ctx) {
  var current;
  var sidebar = new Sidebar({
    props: {
      docs:
      /*currentLanguageDocs*/
      ctx[0],
      isMobile: true
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(sidebar.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(sidebar.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(sidebar, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current) return;
      transition_in(sidebar.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(sidebar.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(sidebar, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$3.name,
    type: "if",
    source: "(36:14) {#if currentLanguageDocs}",
    ctx: ctx
  });
  return block;
} // (41:10) <Content>


function create_default_slot(ctx) {
  var current;
  var default_slot_template =
  /*$$slots*/
  ctx[3].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[4], null);
  var block = {
    c: function create() {
      if (default_slot) default_slot.c();
    },
    l: function claim(nodes) {
      if (default_slot) default_slot.l(nodes);
    },
    m: function mount(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        16) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[4], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[4], dirty, null));
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (default_slot) default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot.name,
    type: "slot",
    source: "(41:10) <Content>",
    ctx: ctx
  });
  return block;
} // (46:10) {#if currentLanguageDocs}


function create_if_block$5(ctx) {
  var current;
  var sidebar = new Sidebar({
    props: {
      docs:
      /*currentLanguageDocs*/
      ctx[0]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(sidebar.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(sidebar.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(sidebar, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current) return;
      transition_in(sidebar.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(sidebar.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(sidebar, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$5.name,
    type: "if",
    source: "(46:10) {#if currentLanguageDocs}",
    ctx: ctx
  });
  return block;
}

function create_fragment$7(ctx) {
  var div6;
  var t0;
  var main;
  var div5;
  var div4;
  var div2;
  var div1;
  var div0;
  var t1;
  var t2;
  var div3;
  var t3;
  var current;
  var nav = new Nav({
    $$inline: true
  });
  var if_block0 =
  /*currentLanguageDocs*/
  ctx[0] && create_if_block_1$3(ctx);
  var content = new Content({
    props: {
      $$slots: {
        default: [create_default_slot]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var if_block1 =
  /*currentLanguageDocs*/
  ctx[0] && create_if_block$5(ctx);
  var footer = new Footer({
    $$inline: true
  });
  var block = {
    c: function create() {
      div6 = element("div");
      create_component(nav.$$.fragment);
      t0 = space();
      main = element("main");
      div5 = element("div");
      div4 = element("div");
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      if (if_block0) if_block0.c();
      t1 = space();
      create_component(content.$$.fragment);
      t2 = space();
      div3 = element("div");
      if (if_block1) if_block1.c();
      t3 = space();
      create_component(footer.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div6 = claim_element(nodes, "DIV", {
        class: true
      });
      var div6_nodes = children(div6);
      claim_component(nav.$$.fragment, div6_nodes);
      t0 = claim_space(div6_nodes);
      main = claim_element(div6_nodes, "MAIN", {});
      var main_nodes = children(main);
      div5 = claim_element(main_nodes, "DIV", {
        class: true
      });
      var div5_nodes = children(div5);
      div4 = claim_element(div5_nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      div2 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      if (if_block0) if_block0.l(div0_nodes);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t1 = claim_space(div2_nodes);
      claim_component(content.$$.fragment, div2_nodes);
      div2_nodes.forEach(detach_dev);
      t2 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      if (if_block1) if_block1.l(div3_nodes);
      div3_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      div5_nodes.forEach(detach_dev);
      main_nodes.forEach(detach_dev);
      t3 = claim_space(div6_nodes);
      claim_component(footer.$$.fragment, div6_nodes);
      div6_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "form-control col col-md-6 display-lg-down");
      add_location(div0, file$7, 34, 12, 779);
      attr_dev(div1, "class", "row");
      add_location(div1, file$7, 33, 10, 749);
      attr_dev(div2, "class", "col col-lg-9");
      add_location(div2, file$7, 32, 8, 712);
      attr_dev(div3, "class", "col col-lg-3 display-lg-up");
      add_location(div3, file$7, 44, 8, 1080);
      attr_dev(div4, "class", "row row-reverse");
      add_location(div4, file$7, 30, 6, 673);
      attr_dev(div5, "class", "container");
      add_location(div5, file$7, 29, 4, 643);
      add_location(main, file$7, 28, 2, 632);
      attr_dev(div6, "class", "page-container svelte-ggnltq");
      add_location(div6, file$7, 26, 0, 591);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div6, anchor);
      mount_component(nav, div6, null);
      append_dev(div6, t0);
      append_dev(div6, main);
      append_dev(main, div5);
      append_dev(div5, div4);
      append_dev(div4, div2);
      append_dev(div2, div1);
      append_dev(div1, div0);
      if (if_block0) if_block0.m(div0, null);
      append_dev(div2, t1);
      mount_component(content, div2, null);
      append_dev(div4, t2);
      append_dev(div4, div3);
      if (if_block1) if_block1.m(div3, null);
      append_dev(div6, t3);
      mount_component(footer, div6, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*currentLanguageDocs*/
      ctx[0]) if_block0.p(ctx, dirty);
      var content_changes = {};

      if (dirty &
      /*$$scope*/
      16) {
        content_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      content.$set(content_changes);
      if (
      /*currentLanguageDocs*/
      ctx[0]) if_block1.p(ctx, dirty);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(nav.$$.fragment, local);
      transition_in(if_block0);
      transition_in(content.$$.fragment, local);
      transition_in(if_block1);
      transition_in(footer.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(nav.$$.fragment, local);
      transition_out(if_block0);
      transition_out(content.$$.fragment, local);
      transition_out(if_block1);
      transition_out(footer.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div6);
      destroy_component(nav);
      if (if_block0) if_block0.d();
      destroy_component(content);
      if (if_block1) if_block1.d();
      destroy_component(footer);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$7.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$7($$self, $$props, $$invalidate) {
  var flatDocs = [];
  var currentLanguageDocs = get_store_value(docs)[get_store_value(currentLanguage).id];
  var docMap = get_store_value(docsMap);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Layout> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Layout", $$slots, ['default']);

  $$self.$set = function ($$props) {
    if ("$$scope" in $$props) $$invalidate(4, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      docs: docs,
      currentLanguage: currentLanguage,
      docsMap: docsMap,
      get: get_store_value,
      flatDocs: flatDocs,
      Sidebar: Sidebar,
      Content: Content,
      Nav: Nav,
      Footer: Footer,
      currentLanguageDocs: currentLanguageDocs,
      docMap: docMap
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("flatDocs" in $$props) flatDocs = $$props.flatDocs;
    if ("currentLanguageDocs" in $$props) $$invalidate(0, currentLanguageDocs = $$props.currentLanguageDocs);
    if ("docMap" in $$props) docMap = $$props.docMap;
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [currentLanguageDocs, flatDocs, docMap, $$slots, $$scope];
}

var Layout = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Layout, _SvelteComponentDev);

  var _super = _createSuper$8(Layout);

  function Layout(options) {
    var _this;

    _classCallCheck(this, Layout);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$7, create_fragment$7, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Layout",
      options: options,
      id: create_fragment$7.name
    });
    return _this;
  }

  return Layout;
}(SvelteComponentDev);

function _createSuper$9(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$9()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Error_1 = globals.Error;
var file$8 = "src/routes/_error.svelte"; // (38:0) {#if dev && error.stack}

function create_if_block$6(ctx) {
  var pre;
  var t_value =
  /*error*/
  ctx[1].stack + "";
  var t;
  var block = {
    c: function create() {
      pre = element("pre");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      pre = claim_element(nodes, "PRE", {});
      var pre_nodes = children(pre);
      t = claim_text(pre_nodes, t_value);
      pre_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(pre, file$8, 38, 1, 443);
    },
    m: function mount(target, anchor) {
      insert_dev(target, pre, anchor);
      append_dev(pre, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*error*/
      2 && t_value !== (t_value =
      /*error*/
      ctx[1].stack + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(pre);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$6.name,
    type: "if",
    source: "(38:0) {#if dev && error.stack}",
    ctx: ctx
  });
  return block;
}

function create_fragment$8(ctx) {
  var title_value;
  var t0;
  var h1;
  var t1;
  var t2;
  var p;
  var t3_value =
  /*error*/
  ctx[1].message + "";
  var t3;
  var t4;
  var if_block_anchor;
  document.title = title_value =
  /*status*/
  ctx[0];
  var if_block =
  /*dev*/
  ctx[2] &&
  /*error*/
  ctx[1].stack && create_if_block$6(ctx);
  var block = {
    c: function create() {
      t0 = space();
      h1 = element("h1");
      t1 = text(
      /*status*/
      ctx[0]);
      t2 = space();
      p = element("p");
      t3 = text(t3_value);
      t4 = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-1o9r2ue\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      h1 = claim_element(nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes,
      /*status*/
      ctx[0]);
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t3 = claim_text(p_nodes, t3_value);
      p_nodes.forEach(detach_dev);
      t4 = claim_space(nodes);
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "svelte-8od9u6");
      add_location(h1, file$8, 33, 0, 374);
      attr_dev(p, "class", "svelte-8od9u6");
      add_location(p, file$8, 35, 0, 393);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, h1, anchor);
      append_dev(h1, t1);
      insert_dev(target, t2, anchor);
      insert_dev(target, p, anchor);
      append_dev(p, t3);
      insert_dev(target, t4, anchor);
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*status*/
      1 && title_value !== (title_value =
      /*status*/
      ctx[0])) {
        document.title = title_value;
      }

      if (dirty &
      /*status*/
      1) set_data_dev(t1,
      /*status*/
      ctx[0]);
      if (dirty &
      /*error*/
      2 && t3_value !== (t3_value =
      /*error*/
      ctx[1].message + "")) set_data_dev(t3, t3_value);

      if (
      /*dev*/
      ctx[2] &&
      /*error*/
      ctx[1].stack) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$6(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(h1);
      if (detaching) detach_dev(t2);
      if (detaching) detach_dev(p);
      if (detaching) detach_dev(t4);
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$8.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$8($$self, $$props, $$invalidate) {
  var status = $$props.status;
  var error = $$props.error;
  var dev = "development" === "development";
  var writable_props = ["status", "error"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Error> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Error", $$slots, []);

  $$self.$set = function ($$props) {
    if ("status" in $$props) $$invalidate(0, status = $$props.status);
    if ("error" in $$props) $$invalidate(1, error = $$props.error);
  };

  $$self.$capture_state = function () {
    return {
      status: status,
      error: error,
      dev: dev
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("status" in $$props) $$invalidate(0, status = $$props.status);
    if ("error" in $$props) $$invalidate(1, error = $$props.error);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [status, error, dev];
}

var Error$1 = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Error, _SvelteComponentDev);

  var _super = _createSuper$9(Error);

  function Error(options) {
    var _this;

    _classCallCheck(this, Error);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$8, create_fragment$8, safe_not_equal, {
      status: 0,
      error: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Error",
      options: options,
      id: create_fragment$8.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*status*/
    ctx[0] === undefined && !("status" in props)) {
      console.warn("<Error> was created without expected prop 'status'");
    }

    if (
    /*error*/
    ctx[1] === undefined && !("error" in props)) {
      console.warn("<Error> was created without expected prop 'error'");
    }

    return _this;
  }

  _createClass(Error, [{
    key: "status",
    get: function get() {
      throw new Error_1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "error",
    get: function get() {
      throw new Error_1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Error;
}(SvelteComponentDev);

function _createSuper$a(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$a()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Error_1$1 = globals.Error;

function create_else_block$4(ctx) {
  var switch_instance_anchor;
  var current;
  var switch_instance_spread_levels = [
  /*level1*/
  ctx[4].props];
  var switch_value =
  /*level1*/
  ctx[4].component;

  function switch_props(ctx) {
    var switch_instance_props = {};

    for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }

    return {
      props: switch_instance_props,
      $$inline: true
    };
  }

  if (switch_value) {
    var switch_instance = new switch_value(switch_props());
  }

  var block = {
    c: function create() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l: function claim(nodes) {
      if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var switch_instance_changes = dirty &
      /*level1*/
      16 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
      /*level1*/
      ctx[4].props)]) : {};

      if (switch_value !== (switch_value =
      /*level1*/
      ctx[4].component)) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$4.name,
    type: "else",
    source: "(21:1) {:else}",
    ctx: ctx
  });
  return block;
} // (19:1) {#if error}


function create_if_block$7(ctx) {
  var current;
  var error_1 = new Error$1({
    props: {
      error:
      /*error*/
      ctx[0],
      status:
      /*status*/
      ctx[1]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(error_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(error_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(error_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var error_1_changes = {};
      if (dirty &
      /*error*/
      1) error_1_changes.error =
      /*error*/
      ctx[0];
      if (dirty &
      /*status*/
      2) error_1_changes.status =
      /*status*/
      ctx[1];
      error_1.$set(error_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(error_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(error_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(error_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$7.name,
    type: "if",
    source: "(19:1) {#if error}",
    ctx: ctx
  });
  return block;
} // (18:0) <Layout segment="{segments[0]}" {...level0.props}>


function create_default_slot$1(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$7, create_else_block$4];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*error*/
    ctx[0]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$1.name,
    type: "slot",
    source: "(18:0) <Layout segment=\\\"{segments[0]}\\\" {...level0.props}>",
    ctx: ctx
  });
  return block;
}

function create_fragment$9(ctx) {
  var current;
  var layout_spread_levels = [{
    segment:
    /*segments*/
    ctx[2][0]
  },
  /*level0*/
  ctx[3].props];
  var layout_props = {
    $$slots: {
      default: [create_default_slot$1]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < layout_spread_levels.length; i += 1) {
    layout_props = assign(layout_props, layout_spread_levels[i]);
  }

  var layout = new Layout({
    props: layout_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(layout.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(layout.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(layout, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var layout_changes = dirty &
      /*segments, level0*/
      12 ? get_spread_update(layout_spread_levels, [dirty &
      /*segments*/
      4 && {
        segment:
        /*segments*/
        ctx[2][0]
      }, dirty &
      /*level0*/
      8 && get_spread_object(
      /*level0*/
      ctx[3].props)]) : {};

      if (dirty &
      /*$$scope, error, status, level1*/
      83) {
        layout_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      layout.$set(layout_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(layout.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(layout.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(layout, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$9.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$9($$self, $$props, $$invalidate) {
  var stores = $$props.stores;
  var error = $$props.error;
  var status = $$props.status;
  var segments = $$props.segments;
  var level0 = $$props.level0;
  var _$$props$level = $$props.level1,
      level1 = _$$props$level === void 0 ? null : _$$props$level;
  setContext(CONTEXT_KEY, stores);
  var writable_props = ["stores", "error", "status", "segments", "level0", "level1"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<App> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("App", $$slots, []);

  $$self.$set = function ($$props) {
    if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
    if ("error" in $$props) $$invalidate(0, error = $$props.error);
    if ("status" in $$props) $$invalidate(1, status = $$props.status);
    if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
    if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
    if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
  };

  $$self.$capture_state = function () {
    return {
      setContext: setContext,
      CONTEXT_KEY: CONTEXT_KEY,
      Layout: Layout,
      Error: Error$1,
      stores: stores,
      error: error,
      status: status,
      segments: segments,
      level0: level0,
      level1: level1
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
    if ("error" in $$props) $$invalidate(0, error = $$props.error);
    if ("status" in $$props) $$invalidate(1, status = $$props.status);
    if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
    if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
    if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [error, status, segments, level0, level1, stores];
}

var App = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(App, _SvelteComponentDev);

  var _super = _createSuper$a(App);

  function App(options) {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$9, create_fragment$9, safe_not_equal, {
      stores: 5,
      error: 0,
      status: 1,
      segments: 2,
      level0: 3,
      level1: 4
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "App",
      options: options,
      id: create_fragment$9.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*stores*/
    ctx[5] === undefined && !("stores" in props)) {
      console.warn("<App> was created without expected prop 'stores'");
    }

    if (
    /*error*/
    ctx[0] === undefined && !("error" in props)) {
      console.warn("<App> was created without expected prop 'error'");
    }

    if (
    /*status*/
    ctx[1] === undefined && !("status" in props)) {
      console.warn("<App> was created without expected prop 'status'");
    }

    if (
    /*segments*/
    ctx[2] === undefined && !("segments" in props)) {
      console.warn("<App> was created without expected prop 'segments'");
    }

    if (
    /*level0*/
    ctx[3] === undefined && !("level0" in props)) {
      console.warn("<App> was created without expected prop 'level0'");
    }

    return _this;
  }

  _createClass(App, [{
    key: "stores",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "error",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "status",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "segments",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "level0",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "level1",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return App;
}(SvelteComponentDev);

// This file is generated by Sapper — do not edit it!
var ignore = [/^\/index.json$/, /^\/crawler\/crawler.json$/, /^\/([^\/]+?).json$/, /^\/([^\/]+?)\/(.+).json$/];
var components = [{
  js: function js() {
    return import('./index.9b876a1c.js');
  },
  css: []
}, {
  js: function js() {
    return import('./index.3608a1c9.js');
  },
  css: []
}, {
  js: function js() {
    return import('./[...slug].caf4dbc0.js');
  },
  css: []
}, {
  js: function js() {
    return import('./[lang].0988ec57.js');
  },
  css: []
}];
var routes = function (d) {
  return [{
    // index.svelte
    pattern: /^\/$/,
    parts: [{
      i: 0
    }]
  }, {
    // crawler/index.svelte
    pattern: /^\/crawler\/?$/,
    parts: [{
      i: 1
    }]
  }, {
    // [lang]/[...slug].svelte
    pattern: /^\/([^\/]+?)\/(.+)\/?$/,
    parts: [null, {
      i: 2,
      params: function params(match) {
        return {
          lang: d(match[1]),
          slug: d(match[2]).split('/')
        };
      }
    }]
  }, {
    // [lang].svelte
    pattern: /^\/([^\/]+?)\/?$/,
    parts: [{
      i: 3,
      params: function params(match) {
        return {
          lang: d(match[1])
        };
      }
    }]
  }];
}(decodeURIComponent);

function goto(href) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    replaceState: false
  };
  var target = select_target(new URL(href, document.baseURI));

  if (target) {
    _history[opts.replaceState ? 'replaceState' : 'pushState']({
      id: cid
    }, '', href);

    return navigate(target, null).then(function () {});
  }

  location.href = href;
  return new Promise(function (f) {}); // never resolves
}

var initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;
var ready = false;
var root_component;
var current_token;
var root_preloaded;
var current_branch = [];
var current_query = '{}';
var stores = {
  page: writable({}),
  preloading: writable(null),
  session: writable(initial_data && initial_data.session)
};
var $session;
var session_dirty;
stores.session.subscribe( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(value) {
    var target, token, _yield$hydrate_target, redirect, props, branch;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            $session = value;

            if (ready) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            session_dirty = true;
            target = select_target(new URL(location.href));
            token = current_token = {};
            _context.next = 8;
            return hydrate_target(target);

          case 8:
            _yield$hydrate_target = _context.sent;
            redirect = _yield$hydrate_target.redirect;
            props = _yield$hydrate_target.props;
            branch = _yield$hydrate_target.branch;

            if (!(token !== current_token)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return");

          case 14:
            _context.next = 16;
            return render(redirect, branch, props, target.page);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
var prefetching = null;

function set_prefetching(href, promise) {
  prefetching = {
    href: href,
    promise: promise
  };
}

var target;

function set_target(element) {
  target = element;
}

var uid = 1;

function set_uid(n) {
  uid = n;
}

var cid;

function set_cid(n) {
  cid = n;
}

var _history = typeof history !== 'undefined' ? history : {
  pushState: function pushState(state, title, href) {},
  replaceState: function replaceState(state, title, href) {},
  scrollRestoration: ''
};

var scroll_history = {};

function extract_query(search) {
  var query = Object.create(null);

  if (search.length > 0) {
    search.slice(1).split('&').forEach(function (searchParam) {
      var _$exec = /([^=]*)(?:=(.*))?/.exec(decodeURIComponent(searchParam.replace(/\+/g, ' '))),
          _$exec2 = _slicedToArray(_$exec, 3),
          key = _$exec2[1],
          _$exec2$ = _$exec2[2],
          value = _$exec2$ === void 0 ? '' : _$exec2$;

      if (typeof query[key] === 'string') query[key] = [query[key]];
      if (_typeof(query[key]) === 'object') query[key].push(value);else query[key] = value;
    });
  }

  return query;
}

function select_target(url) {
  if (url.origin !== location.origin) return null;
  if (!url.pathname.startsWith(initial_data.baseUrl)) return null;
  var path = url.pathname.slice(initial_data.baseUrl.length);

  if (path === '') {
    path = '/';
  } // avoid accidental clashes between server routes and page routes


  if (ignore.some(function (pattern) {
    return pattern.test(path);
  })) return;

  for (var i = 0; i < routes.length; i += 1) {
    var route = routes[i];
    var match = route.pattern.exec(path);

    if (match) {
      var query = extract_query(url.search);
      var part = route.parts[route.parts.length - 1];
      var params = part.params ? part.params(match) : {};
      var page = {
        host: location.host,
        path: path,
        query: query,
        params: params
      };
      return {
        href: url.href,
        route: route,
        match: match,
        page: page
      };
    }
  }
}

function handle_error(url) {
  var _location = location,
      host = _location.host,
      pathname = _location.pathname,
      search = _location.search;
  var session = initial_data.session,
      preloaded = initial_data.preloaded,
      status = initial_data.status,
      error = initial_data.error;

  if (!root_preloaded) {
    root_preloaded = preloaded && preloaded[0];
  }

  var props = {
    error: error,
    status: status,
    session: session,
    level0: {
      props: root_preloaded
    },
    level1: {
      props: {
        status: status,
        error: error
      },
      component: Error$1
    },
    segments: preloaded
  };
  var query = extract_query(search);
  render(null, [], props, {
    host: host,
    path: pathname,
    query: query,
    params: {}
  });
}

function scroll_state() {
  return {
    x: pageXOffset,
    y: pageYOffset
  };
}

function navigate(_x2, _x3, _x4, _x5) {
  return _navigate.apply(this, arguments);
}

function _navigate() {
  _navigate = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(target, id, noscroll, hash) {
    var current_scroll, loaded, token, _yield$loaded, redirect, props, branch, scroll, deep_linked;

    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (id) {
              // popstate or initial navigation
              cid = id;
            } else {
              current_scroll = scroll_state(); // clicked on a link. preserve scroll state

              scroll_history[cid] = current_scroll;
              id = cid = ++uid;
              scroll_history[cid] = noscroll ? current_scroll : {
                x: 0,
                y: 0
              };
            }

            cid = id;
            if (root_component) stores.preloading.set(true);
            loaded = prefetching && prefetching.href === target.href ? prefetching.promise : hydrate_target(target);
            prefetching = null;
            token = current_token = {};
            _context2.next = 8;
            return loaded;

          case 8:
            _yield$loaded = _context2.sent;
            redirect = _yield$loaded.redirect;
            props = _yield$loaded.props;
            branch = _yield$loaded.branch;

            if (!(token !== current_token)) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return");

          case 14:
            _context2.next = 16;
            return render(redirect, branch, props, target.page);

          case 16:
            if (document.activeElement) document.activeElement.blur();

            if (!noscroll) {
              scroll = scroll_history[id];

              if (hash) {
                // scroll is an element id (from a hash), we need to compute y.
                deep_linked = document.getElementById(hash.slice(1));

                if (deep_linked) {
                  scroll = {
                    x: 0,
                    y: deep_linked.getBoundingClientRect().top
                  };
                }
              }

              scroll_history[cid] = scroll;
              if (scroll) scrollTo(scroll.x, scroll.y);
            }

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _navigate.apply(this, arguments);
}

function render(_x6, _x7, _x8, _x9) {
  return _render.apply(this, arguments);
}

function _render() {
  _render = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(redirect, branch, props, page) {
    var _start, end;

    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!redirect) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", goto(redirect.location, {
              replaceState: true
            }));

          case 2:
            stores.page.set(page);
            stores.preloading.set(false);

            if (!root_component) {
              _context3.next = 8;
              break;
            }

            root_component.$set(props);
            _context3.next = 17;
            break;

          case 8:
            props.stores = {
              page: {
                subscribe: stores.page.subscribe
              },
              preloading: {
                subscribe: stores.preloading.subscribe
              },
              session: stores.session
            };
            _context3.next = 11;
            return root_preloaded;

          case 11:
            _context3.t0 = _context3.sent;
            props.level0 = {
              props: _context3.t0
            };
            // first load — remove SSR'd <head> contents
            _start = document.querySelector('#sapper-head-start');
            end = document.querySelector('#sapper-head-end');

            if (_start && end) {
              while (_start.nextSibling !== end) {
                detach$1(_start.nextSibling);
              }

              detach$1(_start);
              detach$1(end);
            }

            root_component = new App({
              target: target,
              props: props,
              hydrate: true
            });

          case 17:
            current_branch = branch;
            current_query = JSON.stringify(page.query);
            ready = true;
            session_dirty = false;

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _render.apply(this, arguments);
}

function part_changed(i, segment, match, stringified_query) {
  // TODO only check query string changes for preload functions
  // that do in fact depend on it (using static analysis or
  // runtime instrumentation)
  if (stringified_query !== current_query) return true;
  var previous = current_branch[i];
  if (!previous) return false;
  if (segment !== previous.segment) return true;

  if (previous.match) {
    if (JSON.stringify(previous.match.slice(1, i + 2)) !== JSON.stringify(match.slice(1, i + 2))) {
      return true;
    }
  }
}

function hydrate_target(_x10) {
  return _hydrate_target.apply(this, arguments);
}

function _hydrate_target() {
  _hydrate_target = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(target) {
    var route, page, segments, _redirect, props, preload_context, branch, l, stringified_query, match, segment_dirty;

    return regenerator.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            route = target.route, page = target.page;
            segments = page.path.split('/').filter(Boolean);
            _redirect = null;
            props = {
              error: null,
              status: 200,
              segments: [segments[0]]
            };
            preload_context = {
              fetch: function (_fetch) {
                function fetch(_x11, _x12) {
                  return _fetch.apply(this, arguments);
                }

                fetch.toString = function () {
                  return _fetch.toString();
                };

                return fetch;
              }(function (url, opts) {
                return fetch(url, opts);
              }),
              redirect: function redirect(statusCode, location) {
                if (_redirect && (_redirect.statusCode !== statusCode || _redirect.location !== location)) {
                  throw new Error("Conflicting redirects");
                }

                _redirect = {
                  statusCode: statusCode,
                  location: location
                };
              },
              error: function error(status, _error) {
                props.error = typeof _error === 'string' ? new Error(_error) : _error;
                props.status = status;
              }
            };

            if (!root_preloaded) {
              root_preloaded = initial_data.preloaded[0] || preload.call(preload_context, {
                host: page.host,
                path: page.path,
                query: page.query,
                params: {}
              }, $session);
            }

            l = 1;
            _context5.prev = 7;
            stringified_query = JSON.stringify(page.query);
            match = route.pattern.exec(page.path);
            segment_dirty = false;
            _context5.next = 13;
            return Promise.all(route.parts.map( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(part, i) {
                var segment, j, _yield$load_component, component, preload, preloaded;

                return regenerator.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        segment = segments[i];
                        if (part_changed(i, segment, match, stringified_query)) segment_dirty = true;
                        props.segments[l] = segments[i + 1]; // TODO make this less confusing

                        if (part) {
                          _context4.next = 5;
                          break;
                        }

                        return _context4.abrupt("return", {
                          segment: segment
                        });

                      case 5:
                        j = l++;

                        if (!(!session_dirty && !segment_dirty && current_branch[i] && current_branch[i].part === part.i)) {
                          _context4.next = 8;
                          break;
                        }

                        return _context4.abrupt("return", current_branch[i]);

                      case 8:
                        segment_dirty = false;
                        _context4.next = 11;
                        return load_component(components[part.i]);

                      case 11:
                        _yield$load_component = _context4.sent;
                        component = _yield$load_component.default;
                        preload = _yield$load_component.preload;

                        if (!(ready || !initial_data.preloaded[i + 1])) {
                          _context4.next = 25;
                          break;
                        }

                        if (!preload) {
                          _context4.next = 21;
                          break;
                        }

                        _context4.next = 18;
                        return preload.call(preload_context, {
                          host: page.host,
                          path: page.path,
                          query: page.query,
                          params: part.params ? part.params(target.match) : {}
                        }, $session);

                      case 18:
                        _context4.t0 = _context4.sent;
                        _context4.next = 22;
                        break;

                      case 21:
                        _context4.t0 = {};

                      case 22:
                        preloaded = _context4.t0;
                        _context4.next = 26;
                        break;

                      case 25:
                        preloaded = initial_data.preloaded[i + 1];

                      case 26:
                        return _context4.abrupt("return", props["level".concat(j)] = {
                          component: component,
                          props: preloaded,
                          segment: segment,
                          match: match,
                          part: part.i
                        });

                      case 27:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x13, _x14) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 13:
            branch = _context5.sent;
            _context5.next = 21;
            break;

          case 16:
            _context5.prev = 16;
            _context5.t0 = _context5["catch"](7);
            props.error = _context5.t0;
            props.status = 500;
            branch = [];

          case 21:
            return _context5.abrupt("return", {
              redirect: _redirect,
              props: props,
              branch: branch
            });

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[7, 16]]);
  }));
  return _hydrate_target.apply(this, arguments);
}

function load_css(chunk) {
  var href = "client/".concat(chunk);
  if (document.querySelector("link[href=\"".concat(href, "\"]"))) return;
  return new Promise(function (fulfil, reject) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;

    link.onload = function () {
      return fulfil();
    };

    link.onerror = reject;
    document.head.appendChild(link);
  });
}

function load_component(component) {
  // TODO this is temporary — once placeholders are
  // always rewritten, scratch the ternary
  var promises = typeof component.css === 'string' ? [] : component.css.map(load_css);
  promises.unshift(component.js());
  return Promise.all(promises).then(function (values) {
    return values[0];
  });
}

function detach$1(node) {
  node.parentNode.removeChild(node);
}

function prefetch(href) {
  var target = select_target(new URL(href, document.baseURI));

  if (target) {
    if (!prefetching || href !== prefetching.href) {
      set_prefetching(href, hydrate_target(target));
    }

    return prefetching.promise;
  }
}

function start(opts) {
  if ('scrollRestoration' in _history) {
    _history.scrollRestoration = 'manual';
  }

  set_target(opts.target);
  addEventListener('click', handle_click);
  addEventListener('popstate', handle_popstate); // prefetch

  addEventListener('touchstart', trigger_prefetch);
  addEventListener('mousemove', handle_mousemove);
  return Promise.resolve().then(function () {
    var _location2 = location,
        hash = _location2.hash,
        href = _location2.href;

    _history.replaceState({
      id: uid
    }, '', href);

    var url = new URL(location.href);
    if (initial_data.error) return handle_error();
    var target = select_target(url);
    if (target) return navigate(target, uid, true, hash);
  });
}

var mousemove_timeout;

function handle_mousemove(event) {
  clearTimeout(mousemove_timeout);
  mousemove_timeout = setTimeout(function () {
    trigger_prefetch(event);
  }, 20);
}

function trigger_prefetch(event) {
  var a = find_anchor(event.target);
  if (!a || a.rel !== 'prefetch') return;
  prefetch(a.href);
}

function handle_click(event) {
  // Adapted from https://github.com/visionmedia/page.js
  // MIT license https://github.com/visionmedia/page.js#license
  if (which(event) !== 1) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey) return;
  if (event.defaultPrevented) return;
  var a = find_anchor(event.target);
  if (!a) return;
  if (!a.href) return; // check if link is inside an svg
  // in this case, both href and target are always inside an object

  var svg = _typeof(a.href) === 'object' && a.href.constructor.name === 'SVGAnimatedString';
  var href = String(svg ? a.href.baseVal : a.href);

  if (href === location.href) {
    if (!location.hash) event.preventDefault();
    return;
  } // Ignore if tag has
  // 1. 'download' attribute
  // 2. rel='external' attribute


  if (a.hasAttribute('download') || a.getAttribute('rel') === 'external') return; // Ignore if <a> has a target

  if (svg ? a.target.baseVal : a.target) return;
  var url = new URL(href); // Don't handle hash changes

  if (url.pathname === location.pathname && url.search === location.search) return;
  var target = select_target(url);

  if (target) {
    var noscroll = a.hasAttribute('sapper-noscroll');
    navigate(target, null, noscroll, url.hash);
    event.preventDefault();

    _history.pushState({
      id: cid
    }, '', url.href);
  }
}

function which(event) {
  return event.which === null ? event.button : event.which;
}

function find_anchor(node) {
  while (node && node.nodeName.toUpperCase() !== 'A') {
    node = node.parentNode;
  } // SVG <a> elements have a lowercase name


  return node;
}

function handle_popstate(event) {
  scroll_history[cid] = scroll_state();

  if (event.state) {
    var url = new URL(location.href);

    var _target = select_target(url);

    if (_target) {
      navigate(_target, event.state.id);
    } else {
      location.href = location.href;
    }
  } else {
    // hashchange
    set_uid(uid + 1);
    set_cid(uid);

    _history.replaceState({
      id: cid
    }, '', location.href);
  }
}

var stores$1 = function stores$1() {
  return getContext(CONTEXT_KEY);
};

start({
  target: document.querySelector('#sapper')
});

export { _typeof as A, commonjsRequire as B, createCommonjsModule as C, getCjsExportFromNamespace as D, docsMap as E, validate_each_argument as F, text as G, claim_text as H, append_dev as I, empty as J, destroy_each as K, currentLanguage as L, doc as M, validate_store as N, component_subscribe as O, SvelteComponentDev as S, _asyncToGenerator as _, regenerator as a, _inherits as b, _classCallCheck as c, _assertThisInitialized as d, dispatch_dev as e, data as f, docs as g, get_store_value as h, init as i, getLanguage as j, _getPrototypeOf as k, _possibleConstructorReturn as l, space as m, element as n, detach_dev as o, claim_space as p, query_selector_all as q, claim_element as r, safe_not_equal as s, children as t, attr_dev as u, validate_slots as v, add_location as w, insert_dev as x, _slicedToArray as y, noop as z };
