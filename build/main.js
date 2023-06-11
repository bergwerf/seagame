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
define("util/math", ["require", "exports"], function (require, exports) {
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
define("util/canvas", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.lookup_pixel = exports.load_image_data = exports.create = void 0;
    // OffscreenCanvas is not yet supported by default on Firefox ESR.
    function create(width, height) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
    exports.create = create;
    function load_image_data(src) {
        return new Promise(function (resolve, _) {
            var image = new Image();
            image.addEventListener('load', function () {
                var canvas = create(image.width, image.height);
                var ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0);
                var data = ctx.getImageData(0, 0, image.width, image.height);
                resolve(data);
            }, { once: true });
            image.src = src;
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
    exports.Story = exports.Event = void 0;
    var Event;
    (function (Event) {
        Event[Event["Down"] = 0] = "Down";
        Event[Event["Move"] = 1] = "Move";
        Event[Event["Up"] = 2] = "Up";
    })(Event || (exports.Event = Event = {}));
    var Story = /** @class */ (function () {
        function Story(views, events, current_view) {
            this.views = views;
            this.events = events;
            this.current_view = current_view;
        }
        Story.prototype.trigger = function (event) {
            var callback = this.events[this.current_view][event];
            if (callback != undefined) {
                this.current_view = callback() || this.current_view;
            }
        };
        Story.prototype.run = function (f) {
            var event = f(this.views[this.current_view]);
            if (event != null) {
                this.trigger(event);
            }
        };
        Story.prototype.draw = function (ctx) {
            this.run(function (layer) { return layer.draw(ctx); });
        };
        Story.prototype.handle = function (v, e) {
            this.run(function (layer) { return layer.handle(v, e); });
        };
        return Story;
    }());
    exports.Story = Story;
});
// Basic Layers
// ============
define("layer/basic", ["require", "exports", "util/canvas", "story"], function (require, exports, canvas, story_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Click_Mask = exports.Click_Anywhere = exports.Composite = exports.Switch = void 0;
    var Switch = /** @class */ (function () {
        function Switch(layers) {
            this.layers = layers;
            this.index = -1;
        }
        Switch.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all(this.layers.map(function (l) { return l.load(); }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Switch.prototype.draw = function (ctx) {
            return this.index >= 0 ? this.layers[this.index].draw(ctx) : null;
        };
        Switch.prototype.handle = function (v, e) {
            return this.index >= 0 ? this.layers[this.index].handle(v, e) : null;
        };
        return Switch;
    }());
    exports.Switch = Switch;
    var Composite = /** @class */ (function () {
        function Composite(layers) {
            this.layers = layers;
        }
        Composite.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all(this.layers.map(function (l) { return l.load(); }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Composite.prototype.run = function (f) {
            var event = null;
            for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
                var layer = _a[_i];
                var f_event = f(layer);
                event = event || f_event;
            }
            return event;
        };
        Composite.prototype.draw = function (ctx) {
            return this.run(function (layer) { return layer.draw(ctx); });
        };
        Composite.prototype.handle = function (v, e) {
            return this.run(function (layer) { return layer.handle(v, e); });
        };
        return Composite;
    }());
    exports.Composite = Composite;
    var Click_Anywhere = /** @class */ (function () {
        function Click_Anywhere(event_name, event_trigger) {
            if (event_trigger === void 0) { event_trigger = story_1.Event.Up; }
            this.event_name = event_name;
            this.event_trigger = event_trigger;
        }
        Click_Anywhere.prototype.handle = function (v, e) {
            return e == this.event_trigger ? this.event_name : null;
        };
        Click_Anywhere.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); });
        };
        Click_Anywhere.prototype.draw = function () { return null; };
        return Click_Anywhere;
    }());
    exports.Click_Anywhere = Click_Anywhere;
    var Click_Mask = /** @class */ (function () {
        function Click_Mask(src, event_name, event_trigger) {
            if (event_trigger === void 0) { event_trigger = story_1.Event.Up; }
            this.src = src;
            this.event_name = event_name;
            this.event_trigger = event_trigger;
        }
        Click_Mask.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, canvas.load_image_data(this.src)];
                        case 1:
                            _a.mask = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Click_Mask.prototype.handle = function (v, e) {
            if (e == this.event_trigger) {
                var c = canvas.lookup_pixel(this.mask, v.floor());
                return c[0] > 0 ? this.event_name : null;
            }
            return null;
        };
        Click_Mask.prototype.draw = function () { return null; };
        return Click_Mask;
    }());
    exports.Click_Mask = Click_Mask;
});
// Multimedia Layers
// =================
define("layer/media", ["require", "exports", "util/canvas", "../util/gifler"], function (require, exports, canvas) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GIF = exports.Video = exports.Image = void 0;
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
        Image.prototype.handle = function () { return null; };
        return Image;
    }());
    exports.Image = Image;
    var Video = /** @class */ (function () {
        function Video(src, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.on_finish, on_finish = _c === void 0 ? 'finish' : _c, _d = _b.muted, muted = _d === void 0 ? true : _d, _e = _b.loop, loop = _e === void 0 ? false : _e;
            this.src = src;
            this.finish_event = on_finish;
            this.video = document.createElement("video");
            this.video.muted = muted;
            this.video.loop = loop;
        }
        Video.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, _) {
                            _this.video.addEventListener('canplaythrough', function () {
                                var w = _this.video.videoWidth;
                                var h = _this.video.videoHeight;
                                _this.cache = canvas.create(w, h);
                                _this.cache_ctx = _this.cache.getContext('2d');
                                resolve();
                            }, { once: true });
                            _this.video.src = _this.src;
                            _this.video.load();
                        })];
                });
            });
        };
        Video.prototype.start = function () {
            this.video.pause();
            this.video.currentTime = 0;
            this.video.load();
            this.video.play();
        };
        Video.prototype.stop = function () {
            this.video.pause();
        };
        Video.prototype.draw = function (ctx) {
            // The frame cache mitigates blank frames between rewinds.
            if (this.cache) {
                this.cache_ctx.drawImage(this.video, 0, 0);
                ctx.drawImage(this.cache, 0, 0);
            }
            else {
                ctx.drawImage(this.video, 0, 0);
            }
            // Return event when a non-looped video ends.
            if (this.video.loop) {
                return null;
            }
            else {
                var finish = this.video.currentTime == this.video.duration;
                return finish ? this.finish_event : null;
            }
        };
        Video.prototype.handle = function () { return null; };
        return Video;
    }());
    exports.Video = Video;
    var GIF = /** @class */ (function () {
        function GIF(src) {
            this.src = src;
        }
        GIF.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, gifler(this.src).get()];
                        case 1:
                            _a.anim = _b.sent();
                            this.canvas = canvas.create();
                            this.anim.animateInCanvas(this.canvas);
                            this.anim.stop();
                            return [2 /*return*/];
                    }
                });
            });
        };
        GIF.prototype.start = function () {
            this.anim.start();
        };
        GIF.prototype.stop = function () {
            this.anim.stop();
        };
        GIF.prototype.draw = function (ctx) {
            ctx.drawImage(this.canvas, 0, 0);
            return null;
        };
        GIF.prototype.handle = function () { return null; };
        return GIF;
    }());
    exports.GIF = GIF;
});
// Image Scrolling Layer
// =====================
define("layer/scroll", ["require", "exports", "util/math"], function (require, exports, m) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Sidescroll = void 0;
    var Sidescroll = /** @class */ (function () {
        function Sidescroll(bg, nav, bg_width, view_width) {
            this.bg = bg;
            this.nav = nav;
            this.bg_width = bg_width;
            this.view_width = view_width;
            this.step = 200;
            this.x = 0;
        }
        Sidescroll.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bg.load()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.nav.load()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Sidescroll.prototype.draw = function (ctx) {
            ctx.save();
            ctx.translate(this.x, 0);
            this.bg.draw(ctx);
            ctx.restore();
            this.nav.draw(ctx);
            return null;
        };
        Sidescroll.prototype.handle = function (v, e) {
            var nav_result = this.nav.handle(v, e);
            if (nav_result != null) {
                var dx = nav_result == 'left' ? 1 : nav_result == 'right' ? -1 : 0;
                this.x += this.step * dx;
                this.x = Math.min(0, Math.max(-this.bg_width + this.view_width, this.x));
                return null;
            }
            else {
                return this.bg.handle(v.plus(m.vec2(-this.x, 0)), e);
            }
        };
        return Sidescroll;
    }());
    exports.Sidescroll = Sidescroll;
});
define("layer/all", ["require", "exports", "layer/basic", "layer/media", "layer/scroll"], function (require, exports, basic_1, media_1, scroll_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Sidescroll = exports.Video = exports.GIF = exports.Image = exports.Click_Mask = exports.Click_Anywhere = exports.Composite = exports.Switch = void 0;
    Object.defineProperty(exports, "Switch", { enumerable: true, get: function () { return basic_1.Switch; } });
    Object.defineProperty(exports, "Composite", { enumerable: true, get: function () { return basic_1.Composite; } });
    Object.defineProperty(exports, "Click_Anywhere", { enumerable: true, get: function () { return basic_1.Click_Anywhere; } });
    Object.defineProperty(exports, "Click_Mask", { enumerable: true, get: function () { return basic_1.Click_Mask; } });
    Object.defineProperty(exports, "Image", { enumerable: true, get: function () { return media_1.Image; } });
    Object.defineProperty(exports, "GIF", { enumerable: true, get: function () { return media_1.GIF; } });
    Object.defineProperty(exports, "Video", { enumerable: true, get: function () { return media_1.Video; } });
    Object.defineProperty(exports, "Sidescroll", { enumerable: true, get: function () { return scroll_1.Sidescroll; } });
});
// Game Logic
// ==========
define("game", ["require", "exports", "layer/all", "story"], function (require, exports, layer, story_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.start = exports.story = void 0;
    var layers = {
        // Navigation
        nav_rewind: new layer.Composite([
            new layer.Image('assets/nav/rewind.png'),
            new layer.Click_Mask('assets/nav/rewind_mask.png', 'rewind')
        ]),
        nav_next: new layer.Composite([
            new layer.Image('assets/nav/next.png'),
            new layer.Click_Mask('assets/nav/next_mask.png', 'next')
        ]),
        // Introduction
        intro_hourglass: new layer.Video('assets/intro/hourglass.mp4', { loop: true }),
        intro_dunes: new layer.Image('assets/intro/dunes.jpg'),
        intro_crab: new layer.Video('assets/intro/crab.mp4'),
        intro_sea: new layer.Video('assets/intro/sea.mp4'),
        intro_hand: new layer.Video('assets/intro/hand.mp4'),
        intro_shell: new layer.Composite([
            new layer.Image('assets/intro/shell.jpg'),
            new layer.Click_Mask('assets/intro/shell_mask.png', 'pickup')
        ]),
        intro_shell_pickup: new layer.Video('assets/intro/shell_pickup.mp4'),
        intro_welcome: new layer.Video('assets/intro/welcome.mp4', { loop: true }),
        intro_load: new layer.Video('assets/intro/jellyload.mp4'),
        // Character selection
        character_background: new layer.Video('assets/character/background.mp4', { loop: true }),
        character_characters: new layer.GIF('assets/character/characters.gif'),
        character_selection: new layer.Switch([
            new layer.Image('assets/character/orange_selected.png'),
            new layer.Image('assets/character/yellow_selected.png'),
            new layer.Image('assets/character/green_selected.png')
        ]),
        character_mask: new layer.Composite([
            new layer.Click_Mask('assets/character/orange_mask.png', 'orange'),
            new layer.Click_Mask('assets/character/yellow_mask.png', 'yellow'),
            new layer.Click_Mask('assets/character/green_mask.png', 'green')
        ]),
        character_start_mask: new layer.Click_Mask('assets/character/start_mask.png', 'start'),
        // Landscape
        landscape_bg1: new layer.Video('assets/landscape/bg_sad_sad.mp4', { loop: true }),
        landscape_bg2: new layer.Video('assets/landscape/bg_happy_sad.mp4', { loop: true }),
        landscape_bg3: new layer.Video('assets/landscape/bg_sad_happy.mp4', { loop: true }),
        landscape_lmask: new layer.Click_Mask('assets/landscape/farmer_left_mask.png', 'farmer_left'),
        landscape_rmask: new layer.Click_Mask('assets/landscape/farmer_right_mask.png', 'farmer_right'),
        landscape_bg: new layer.Switch([]),
        landscape_nav: new layer.Composite([
            new layer.Image('assets/landscape/button_left.png'),
            new layer.Image('assets/landscape/button_right.png'),
            new layer.Click_Mask('assets/landscape/button_left_mask.png', 'left'),
            new layer.Click_Mask('assets/landscape/button_right_mask.png', 'right')
        ])
    };
    var views = {
        loading: layers.intro_hourglass,
        intro_dunes: new layer.Composite([
            layers.intro_dunes,
            new layer.Click_Anywhere('continue')
        ]),
        intro_crab: layers.intro_crab,
        intro_crab_nav: new layer.Composite([
            layers.intro_crab,
            layers.nav_rewind,
            layers.nav_next
        ]),
        intro_sea: layers.intro_sea,
        intro_sea_nav: new layer.Composite([
            layers.intro_sea,
            layers.nav_rewind,
            layers.nav_next
        ]),
        intro_hand: layers.intro_hand,
        intro_hand_nav: new layer.Composite([
            layers.intro_hand,
            layers.nav_rewind,
            layers.nav_next
        ]),
        intro_shell: layers.intro_shell,
        intro_shell_pickup: layers.intro_shell_pickup,
        intro_welcome: new layer.Composite([
            layers.intro_welcome,
            layers.nav_next
        ]),
        intro_load: layers.intro_load,
        intro_character: new layer.Composite([
            layers.character_background,
            layers.character_selection,
            layers.character_characters,
            layers.character_mask,
            layers.character_start_mask
        ]),
        landscape: new layer.Sidescroll(new layer.Composite([
            layers.landscape_bg,
            layers.landscape_lmask,
            layers.landscape_rmask
        ]), layers.landscape_nav, 5760, 1920),
    };
    var audio = {
        sea: new Audio('assets/sound/sea.mp3')
    };
    function set_character(color) {
        var colors = ['orange', 'yellow', 'green'];
        layers.character_selection.index = colors.indexOf(color);
    }
    var events = {
        loading: {
            loaded: function () {
                layers.intro_hourglass.stop();
                return 'intro_dunes';
            }
        },
        intro_dunes: {
            continue: function () {
                audio.sea.loop = true;
                audio.sea.play();
                layers.intro_crab.start();
                return 'intro_crab';
            }
        },
        intro_crab: {
            finish: function () { return 'intro_crab_nav'; }
        },
        intro_crab_nav: {
            rewind: function () {
                layers.intro_crab.start();
                return 'intro_crab';
            },
            next: function () {
                layers.intro_sea.start();
                return 'intro_sea';
            }
        },
        intro_sea: {
            finish: function () { return 'intro_sea_nav'; }
        },
        intro_sea_nav: {
            rewind: function () {
                layers.intro_sea.start();
                return 'intro_sea';
            },
            next: function () {
                layers.intro_hand.start();
                return 'intro_hand';
            }
        },
        intro_hand: {
            finish: function () { return 'intro_hand_nav'; }
        },
        intro_hand_nav: {
            rewind: function () {
                layers.intro_hand.start();
                return 'intro_hand';
            },
            next: function () { return 'intro_shell'; }
        },
        intro_shell: {
            pickup: function () {
                layers.intro_shell_pickup.start();
                return 'intro_shell_pickup';
            }
        },
        intro_shell_pickup: {
            finish: function () {
                layers.intro_welcome.start();
                return 'intro_welcome';
            }
        },
        intro_welcome: {
            next: function () {
                layers.intro_welcome.stop();
                layers.intro_load.start();
                return 'intro_load';
            }
        },
        intro_load: {
            finish: function () {
                layers.intro_hourglass.stop();
                layers.character_background.start();
                layers.character_characters.start();
                return 'intro_character';
            }
        },
        intro_character: {
            orange: function () {
                set_character('orange');
            },
            yellow: function () {
                set_character('yellow');
            },
            green: function () {
                set_character('green');
            },
            start: function () {
                layers.landscape_bg.layers = [
                    layers.landscape_bg1,
                    layers.landscape_bg2,
                    layers.landscape_bg3
                ];
                layers.landscape_bg1.start();
                layers.landscape_bg.index = 0;
                return 'landscape';
            }
        },
        landscape: {
            farmer_left: function () {
                console.log("farmer left");
            },
            farmer_right: function () {
                console.log("farmer right");
            }
        }
    };
    exports.story = new story_2.Story(views, events, 'loading');
    function start() {
        return __awaiter(this, void 0, void 0, function () {
            var promises, l;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // First load the load animation.
                    return [4 /*yield*/, layers.intro_hourglass.load()];
                    case 1:
                        // First load the load animation.
                        _a.sent();
                        layers.intro_hourglass.start();
                        promises = [];
                        for (l in layers) {
                            if (l != 'intro_hourglass') {
                                promises.push(layers[l].load());
                            }
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        _a.sent();
                        exports.story.trigger('loaded');
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.start = start;
});
// Main Program
// ============
define("main", ["require", "exports", "util/math", "story", "game"], function (require, exports, m, story_3, game_1) {
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
        return v.minus(b.position).times(b.size.inv()).times(size);
    }
    canvas.addEventListener('pointerdown', function (e) {
        game_1.story.handle(coordinate(e), story_3.Event.Down);
    });
    canvas.addEventListener('pointermove', function (e) {
        game_1.story.handle(coordinate(e), story_3.Event.Move);
    });
    canvas.addEventListener('pointerup', function (e) {
        game_1.story.handle(coordinate(e), story_3.Event.Up);
    });
    // Setup continuous render cycle
    // -----------------------------
    function draw() {
        // Don't clear to prevent flashes between views.
        //ctx.clearRect(0, 0, size.x, size.y)
        game_1.story.draw(ctx);
        requestAnimationFrame(draw);
    }
    draw();
    (0, game_1.start)();
});
