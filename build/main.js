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
    exports.Story = void 0;
    var Story = /** @class */ (function () {
        function Story(views, events, current_view) {
            this.views = views;
            this.events = events;
            this.current_view = current_view;
        }
        Story.prototype.handle = function (event) {
            var callback = this.events[this.current_view][event];
            if (callback != undefined) {
                this.current_view = callback() || this.current_view;
            }
        };
        Story.prototype.run = function (f) {
            var event = f(this.views[this.current_view]);
            if (event != null) {
                this.handle(event);
            }
        };
        Story.prototype.draw = function (ctx) {
            this.run(function (layer) { return layer.draw(ctx); });
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
define("layer/basic", ["require", "exports", "util/canvas", "../util/gifler"], function (require, exports, canvas) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Click_Mask = exports.Click_Anywhere = exports.GIF = exports.Video = exports.Image = exports.Composite = exports.Switch = void 0;
    var Switch = /** @class */ (function () {
        function Switch(layer) {
            this.layer = layer;
            this.active = false;
        }
        Switch.prototype.load = function () {
            return this.layer.load();
        };
        Switch.prototype.draw = function (ctx) {
            return this.active ? this.layer.draw(ctx) : null;
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
        Composite.prototype.pointer_down = function (v) {
            return this.run(function (layer) { return layer.pointer_down(v); });
        };
        Composite.prototype.pointer_move = function (v) {
            return this.run(function (layer) { return layer.pointer_move(v); });
        };
        Composite.prototype.pointer_up = function (v) {
            return this.run(function (layer) { return layer.pointer_up(v); });
        };
        return Composite;
    }());
    exports.Composite = Composite;
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
        Video.prototype.pointer_down = function () { return null; };
        Video.prototype.pointer_move = function () { return null; };
        Video.prototype.pointer_up = function () { return null; };
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
        GIF.prototype.pointer_down = function () { return null; };
        GIF.prototype.pointer_move = function () { return null; };
        GIF.prototype.pointer_up = function () { return null; };
        return GIF;
    }());
    exports.GIF = GIF;
    var Click_Anywhere = /** @class */ (function () {
        function Click_Anywhere(click_event) {
            this.click_event = click_event;
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
        function Click_Mask(src, click_event) {
            this.src = src;
            this.click_event = click_event;
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
        Click_Mask.prototype.pointer_up = function (v) {
            var c = canvas.lookup_pixel(this.mask, v.floor());
            return c[0] > 0 ? this.click_event : null;
        };
        Click_Mask.prototype.draw = function () { return null; };
        Click_Mask.prototype.pointer_down = function () { return null; };
        Click_Mask.prototype.pointer_move = function () { return null; };
        return Click_Mask;
    }());
    exports.Click_Mask = Click_Mask;
});
// Game Logic
// ==========
define("game", ["require", "exports", "layer/basic", "story"], function (require, exports, layer, story_1) {
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
        character_orange: new layer.Switch(new layer.Image('assets/character/orange_selected.png')),
        character_orange_mask: new layer.Click_Mask('assets/character/orange_mask.png', 'orange'),
        character_yellow: new layer.Switch(new layer.Image('assets/character/yellow_selected.png')),
        character_yellow_mask: new layer.Click_Mask('assets/character/yellow_mask.png', 'yellow'),
        character_green: new layer.Switch(new layer.Image('assets/character/green_selected.png')),
        character_green_mask: new layer.Click_Mask('assets/character/green_mask.png', 'green'),
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
            layers.character_orange,
            layers.character_orange_mask,
            layers.character_yellow,
            layers.character_yellow_mask,
            layers.character_green,
            layers.character_green_mask,
            layers.character_characters
        ])
    };
    var audio = {
        sea: new Audio('assets/sound/sea.mp3')
    };
    function set_character(color) {
        layers.character_orange.active = color == 'orange';
        layers.character_yellow.active = color == 'yellow';
        layers.character_green.active = color == 'green';
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
                layers.intro_crab.start();
                audio.sea.loop = true;
                audio.sea.play();
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
            }
        }
    };
    exports.story = new story_1.Story(views, events, 'loading');
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
define("main", ["require", "exports", "util/math", "game"], function (require, exports, m, game_1) {
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
        // Don't clear to prevent flashes between views.
        //ctx.clearRect(0, 0, size.x, size.y)
        game_1.story.draw(ctx);
        requestAnimationFrame(draw);
    }
    draw();
    (0, game_1.start)();
});
