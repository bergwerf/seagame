var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Math and Linear Algebra Tools
// =============================
define("math", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dom_bounding_box = exports.client_position = exports.vec2 = exports.v11 = exports.v01 = exports.v10 = exports.v00 = exports.Box = exports.Vector_2D = void 0;
    var Vector_2D = /** @class */ (function () {
        function Vector_2D(x, y) {
            this.x = x;
            this.y = y;
        }
        Vector_2D.prototype.plus = function (v) {
            return new Vector_2D(this.x + v.x, this.y + v.y);
        };
        Vector_2D.prototype.minus = function (v) {
            return new Vector_2D(this.x - v.x, this.y - v.y);
        };
        Vector_2D.prototype.scale = function (r) {
            return new Vector_2D(r * this.x, r * this.y);
        };
        Vector_2D.prototype.times = function (v) {
            return new Vector_2D(this.x * v.x, this.y * v.y);
        };
        Vector_2D.prototype.inv = function () {
            return new Vector_2D(1 / this.x, 1 / this.y);
        };
        Vector_2D.prototype.floor = function () {
            return new Vector_2D(Math.floor(this.x), Math.floor(this.y));
        };
        Vector_2D.prototype.ceil = function () {
            return new Vector_2D(Math.ceil(this.x), Math.ceil(this.y));
        };
        Vector_2D.prototype.perp = function () {
            return new Vector_2D(-this.y, this.x);
        };
        Vector_2D.prototype.dot = function (v) {
            return this.x * v.x + this.y * v.y;
        };
        Vector_2D.prototype.norm = function () {
            return Math.sqrt(this.dot(this));
        };
        Vector_2D.prototype.unit = function () {
            return this.scale(1 / this.norm());
        };
        Vector_2D.prototype.angle = function () {
            return Math.atan2(this.y, this.x);
        };
        Vector_2D.prototype.to = function (v) {
            return v.minus(this);
        };
        Vector_2D.prototype.angle_to = function (v) {
            return this.to(v).angle();
        };
        Vector_2D.prototype.distance_to = function (v) {
            return this.to(v).norm();
        };
        Vector_2D.prototype.copy = function () {
            return new Vector_2D(this.x, this.y);
        };
        Vector_2D.prototype.equals = function (v) {
            return this.x == v.x && this.y == v.y;
        };
        Vector_2D.prototype.toString = function (precision) {
            if (precision === void 0) { precision = 2; }
            return "(".concat(this.x.toFixed(precision), ", ").concat(this.y.toFixed(precision), ")");
        };
        return Vector_2D;
    }());
    exports.Vector_2D = Vector_2D;
    var Box = /** @class */ (function () {
        function Box(position, size) {
            this.position = position;
            this.size = size;
        }
        Box.prototype.center = function () {
            return this.position.plus(this.size.scale(.5));
        };
        return Box;
    }());
    exports.Box = Box;
    exports.v00 = new Vector_2D(0, 0);
    exports.v10 = new Vector_2D(1, 0);
    exports.v01 = new Vector_2D(0, 1);
    exports.v11 = new Vector_2D(1, 1);
    function vec2(x, y) {
        return new Vector_2D(x, y);
    }
    exports.vec2 = vec2;
    function client_position(e) {
        return vec2(e.clientX, e.clientY);
    }
    exports.client_position = client_position;
    function dom_bounding_box(e) {
        var r = e.getBoundingClientRect();
        return new Box(vec2(r.x, r.y), vec2(r.width, r.height));
    }
    exports.dom_bounding_box = dom_bounding_box;
});
// Utilities
// =========
define("util", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.lookup_pixel = exports.load_image_data = exports.create_canvas = void 0;
    // OffscreenCanvas is not yet supported by default on Firefox ESR.
    function create_canvas(width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
    exports.create_canvas = create_canvas;
    function load_image_data(src) {
        var _this = this;
        return new Promise(function (resolve, _) {
            var image = new Image();
            image.addEventListener('load', function () {
                var canvas = create_canvas(image.width, image.height);
                var ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0);
                var data = ctx.getImageData(0, 0, image.width, image.height);
                resolve(data);
            }, { once: true });
            image.src = _this.src;
        });
    }
    exports.load_image_data = load_image_data;
    function lookup_pixel(image, pixel) {
        var i = 4 * (pixel.y * image.width + pixel.x);
        var d = image.data;
        return [d[i], d[i + 1], d[i + 2], d[i + 3]];
    }
    exports.lookup_pixel = lookup_pixel;
});
// Interactive Story Based on Layers
// =================================
define("story", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Story = void 0;
    var Story = /** @class */ (function () {
        function Story(views, events, current_view) {
            this.views = views;
            this.events = events;
            this.current_view = current_view;
        }
        Story.prototype.handle = function (event) {
            var cb = this.events[this.current_view][event];
            if (cb != undefined) {
                this.current_view = cb() || this.current_view;
            }
        };
        Story.prototype.run = function (f) {
            var event = null;
            for (var _i = 0, _a = this.views[this.current_view]; _i < _a.length; _i++) {
                var layer = _a[_i];
                var f_event = f(layer);
                event = event || f_event;
            }
            if (event !== null) {
                this.handle(event);
            }
        };
        Story.prototype.draw = function (ctx, size) {
            this.run(function (layer) { return layer.draw(ctx, size); });
        };
        Story.prototype.pointer_down = function (v) {
            this.run(function (layer) { return layer.pointer_down(v); });
        };
        Story.prototype.pointer_move = function (v) {
            this.run(function (layer) { return layer.pointer_move(v); });
        };
        Story.prototype.pointer_up = function (v) {
            this.run(function (layer) { return layer.pointer_up(v); });
        };
        return Story;
    }());
    exports.Story = Story;
});
// Basic Layers
// ============
define("layer/basic", ["require", "exports", "util"], function (require, exports, util) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Switch = exports.Click_Mask = exports.Click_Anywhere = exports.Video = exports.Image = void 0;
    var Image = /** @class */ (function () {
        function Image(src) {
            this.src = src;
            this.image = document.createElement('img');
        }
        Image.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (res, _) {
                            _this.image.addEventListener('load', function () { return res(); }, { once: true });
                            _this.image.src = _this.src;
                        })];
                });
            });
        };
        Image.prototype.draw = function (ctx) {
            ctx.drawImage(this.image, 0, 0);
            return null;
        };
        Image.prototype.pointer_down = function () { return null; };
        Image.prototype.pointer_move = function () { return null; };
        Image.prototype.pointer_up = function () { return null; };
        return Image;
    }());
    exports.Image = Image;
    var Video = /** @class */ (function () {
        function Video(src, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.on_finish, on_finish = _c === void 0 ? 'finish' : _c, _d = _b.muted, muted = _d === void 0 ? true : _d, _e = _b.loop, loop = _e === void 0 ? false : _e, _f = _b.autoplay, autoplay = _f === void 0 ? false : _f;
            this.src = src;
            this.finish_event = on_finish;
            this.video = document.createElement("video");
            this.video.muted = muted;
            this.video.loop = loop;
            this.video.autoplay = autoplay;
        }
        Video.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, _) {
                            _this.video.addEventListener('canplaythrough', function () {
                                if (_this.video.loop) {
                                    _this.cache = util.create_canvas(_this.video.videoWidth, _this.video.videoHeight);
                                    _this.cache_ctx = _this.cache.getContext('2d');
                                }
                                resolve();
                            }, { once: true });
                            _this.video.src = _this.src;
                        })];
                });
            });
        };
        Video.prototype.draw = function (ctx) {
            // This fixes blank frames between loop rewinds.
            if (this.video.loop && this.cache_ctx) {
                this.cache_ctx.drawImage(this.video, 0, 0);
                ctx.drawImage(this.cache, 0, 0);
                return null;
            }
            else {
                ctx.drawImage(this.video, 0, 0);
                var finish = this.video.currentTime == this.video.duration;
                return finish ? this.finish_event : null;
            }
        };
        Video.prototype.play = function () {
            this.video.pause();
            this.video.currentTime = 0;
            this.video.play();
        };
        Video.prototype.pointer_down = function () { return null; };
        Video.prototype.pointer_move = function () { return null; };
        Video.prototype.pointer_up = function () { return null; };
        return Video;
    }());
    exports.Video = Video;
    var Click_Anywhere = /** @class */ (function () {
        function Click_Anywhere(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.on_click, on_click = _c === void 0 ? 'click' : _c;
            this.click_event = on_click;
        }
        Click_Anywhere.prototype.pointer_up = function (v) {
            return this.click_event;
        };
        Click_Anywhere.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); });
        };
        Click_Anywhere.prototype.draw = function () { return null; };
        Click_Anywhere.prototype.pointer_down = function () { return null; };
        Click_Anywhere.prototype.pointer_move = function () { return null; };
        return Click_Anywhere;
    }());
    exports.Click_Anywhere = Click_Anywhere;
    var Click_Mask = /** @class */ (function () {
        function Click_Mask(src, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.on_click, on_click = _c === void 0 ? 'click' : _c;
            this.src = src;
            this.click_event = on_click;
        }
        Click_Mask.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, util.load_image_data(this.src)];
                        case 1:
                            _a.mask = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Click_Mask.prototype.pointer_up = function (v) {
            var c = util.lookup_pixel(this.mask, v.floor());
            return c[0] > 0 ? this.click_event : null;
        };
        Click_Mask.prototype.draw = function () { return null; };
        Click_Mask.prototype.pointer_down = function () { return null; };
        Click_Mask.prototype.pointer_move = function () { return null; };
        return Click_Mask;
    }());
    exports.Click_Mask = Click_Mask;
    var Switch = /** @class */ (function () {
        function Switch(layer) {
            this.layer = layer;
            this.active = false;
        }
        Switch.prototype.load = function () {
            return this.layer.load();
        };
        Switch.prototype.draw = function (ctx, size) {
            return this.active ? this.layer.draw(ctx, size) : null;
        };
        Switch.prototype.pointer_down = function (v) {
            return this.active ? this.layer.pointer_down(v) : null;
        };
        Switch.prototype.pointer_move = function (v) {
            return this.active ? this.layer.pointer_move(v) : null;
        };
        Switch.prototype.pointer_up = function (v) {
            return this.active ? this.layer.pointer_up(v) : null;
        };
        return Switch;
    }());
    exports.Switch = Switch;
});
// Game Logic
// ==========
define("game", ["require", "exports", "layer/basic", "story"], function (require, exports, layer, story_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.start = exports.story = void 0;
    var layers = {
        hourglass: new layer.Video('assets/start/hourglass.mp4', { loop: true, autoplay: true }),
        startscreen: new layer.Image('assets/start/startscreen.jpg'),
        crab: new layer.Video('assets/start/crab.mp4')
    };
    var views = {
        loading: [
            layers.hourglass
        ],
        start: [
            layers.startscreen,
            new layer.Click_Anywhere({ on_click: 'continue' })
        ],
        intro1: [
            layers.crab
        ]
    };
    var events = {
        loading: {
            loaded: function () { return 'start'; }
        },
        start: {
            continue: function () {
                layers.crab.play();
                return 'intro1';
            }
        },
        intro1: {}
    };
    exports.story = new story_1.Story(views, events, 'loading');
    function start() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // First load the load animation.
                    return [4 /*yield*/, layers.hourglass.load()
                        // Then load all other assets.
                    ];
                    case 1:
                        // First load the load animation.
                        _a.sent();
                        // Then load all other assets.
                        return [4 /*yield*/, Promise.all(Object.values(layers).map(function (l) { return l.load(); }))];
                    case 2:
                        // Then load all other assets.
                        _a.sent();
                        exports.story.handle('loaded');
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.start = start;
});
// Main Program
// ============
define("main", ["require", "exports", "math", "game"], function (require, exports, m, game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Auto-playing video with sound is allowed after user interaction:
    // https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide
    var size = m.vec2(1920, 1080);
    // Setup canvas
    // ------------
    var canvas = document.getElementById("canvas");
    canvas.width = size.x;
    canvas.height = size.y;
    var ctx = canvas.getContext("2d");
    // Setup event handling
    // --------------------
    function coordinate(e) {
        var b = m.dom_bounding_box(canvas);
        var v = m.client_position(e);
        return v.minus(b.position).times(b.size.inv());
    }
    canvas.addEventListener('pointerdown', function (e) {
        game_1.story.pointer_down(coordinate(e));
    });
    canvas.addEventListener('pointermove', function (e) {
        game_1.story.pointer_move(coordinate(e));
    });
    canvas.addEventListener('pointerup', function (e) {
        game_1.story.pointer_up(coordinate(e));
    });
    // Setup continuous render cycle
    // -----------------------------
    function draw() {
        ctx.clearRect(0, 0, size.x, size.y);
        game_1.story.draw(ctx, size);
        requestAnimationFrame(draw);
    }
    draw();
    (0, game_1.start)();
});
