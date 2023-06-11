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
// Interactive Story Based on Layers
// =================================
define("story", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Story = exports.Trigger = void 0;
    var Trigger;
    (function (Trigger) {
        Trigger[Trigger["Down"] = 0] = "Down";
        Trigger[Trigger["Move"] = 1] = "Move";
        Trigger[Trigger["Cancel"] = 2] = "Cancel";
        Trigger[Trigger["Up"] = 3] = "Up";
    })(Trigger || (exports.Trigger = Trigger = {}));
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
        Story.prototype.handle = function (v, t) {
            this.run(function (layer) { return layer.handle(v, t); });
        };
        return Story;
    }());
    exports.Story = Story;
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
        Switch.prototype.handle = function (v, t) {
            return this.index >= 0 ? this.layers[this.index].handle(v, t) : null;
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
        Composite.prototype.handle = function (v, t) {
            return this.run(function (layer) { return layer.handle(v, t); });
        };
        return Composite;
    }());
    exports.Composite = Composite;
    var Click_Anywhere = /** @class */ (function () {
        function Click_Anywhere(event_name, event_trigger) {
            if (event_trigger === void 0) { event_trigger = story_1.Trigger.Up; }
            this.event_name = event_name;
            this.event_trigger = event_trigger;
        }
        Click_Anywhere.prototype.handle = function (v, t) {
            return t == this.event_trigger ? this.event_name : null;
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
            if (event_trigger === void 0) { event_trigger = story_1.Trigger.Up; }
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
        Click_Mask.prototype.handle = function (v, t) {
            if (t == this.event_trigger) {
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
define("layer/media", ["require", "exports", "util/math", "util/canvas", "../util/gifler"], function (require, exports, m, canvas) {
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
            var _b = _a === void 0 ? {} : _a, _c = _b.on_finish, on_finish = _c === void 0 ? 'finish' : _c, _d = _b.resize, resize = _d === void 0 ? m.vec2(0, 0) : _d, _e = _b.muted, muted = _e === void 0 ? true : _e, _f = _b.loop, loop = _f === void 0 ? false : _f;
            this.src = src;
            this.finish_event = on_finish;
            this.size = resize;
            this.video = document.createElement("video");
            this.video.muted = muted;
            this.video.loop = loop;
            this.video.playsInline = true;
        }
        Video.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, _) {
                            _this.video.addEventListener('canplaythrough', function () {
                                var w = _this.video.videoWidth;
                                var h = _this.video.videoHeight;
                                if (_this.size.x == 0) {
                                    _this.size = m.vec2(w, h);
                                }
                                _this.cache = canvas.create(w, h);
                                _this.cache_ctx = _this.cache.getContext('2d');
                            }, { once: true });
                            _this.video.src = _this.src;
                            _this.video.load();
                            resolve();
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
        Video.prototype.continue = function () {
            this.video.play();
        };
        Video.prototype.draw = function (ctx) {
            // The frame cache mitigates blank frames between rewinds.
            if (this.cache) {
                this.cache_ctx.drawImage(this.video, 0, 0);
                ctx.drawImage(this.cache, 0, 0, this.size.x, this.size.y);
            }
            else {
                ctx.drawImage(this.video, 0, 0, this.size.x, this.size.y);
            }
            // Return event when video has ended.
            return this.video.ended ? this.finish_event : null;
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
            this.anim.reset();
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
        function Sidescroll(bg, nav, bg_width, view_width, x) {
            if (x === void 0) { x = 0; }
            this.bg = bg;
            this.nav = nav;
            this.bg_width = bg_width;
            this.view_width = view_width;
            this.x = x;
            this.step = 200;
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
        Sidescroll.prototype.handle = function (v, t) {
            var nav_result = this.nav.handle(v, t);
            if (nav_result != null) {
                var dx = nav_result == 'left' ? 1 : nav_result == 'right' ? -1 : 0;
                this.x += this.step * dx;
                this.x = Math.min(0, Math.max(-this.bg_width + this.view_width, this.x));
                return null;
            }
            else {
                return this.bg.handle(v.plus(m.vec2(-this.x, 0)), t);
            }
        };
        return Sidescroll;
    }());
    exports.Sidescroll = Sidescroll;
});
// Drag and Drop Layer
// ===================
define("layer/dnd", ["require", "exports", "util/math", "story"], function (require, exports, m, story_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Drag_to_Target = void 0;
    var Drag_to_Target = /** @class */ (function () {
        function Drag_to_Target(target, item, ready_event_name) {
            this.target = target;
            this.item = item;
            this.ready_event_name = ready_event_name;
            this.offset = m.v00;
            this.prev = m.v00;
            this.dragging = false;
            this.done = false;
        }
        Drag_to_Target.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.target.load()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.item.load()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Drag_to_Target.prototype.draw = function (ctx) {
            if (!this.done) {
                ctx.save();
                ctx.translate(this.offset.x, this.offset.y);
                this.item.draw(ctx);
                ctx.restore();
            }
            return null;
        };
        Drag_to_Target.prototype.handle = function (v, t) {
            if (this.done) {
                return null;
            }
            switch (t) {
                case story_2.Trigger.Down:
                    if (this.item.handle(v.minus(this.offset), t) == 'drag') {
                        this.prev = v;
                        this.dragging = true;
                    }
                    break;
                case story_2.Trigger.Move:
                    if (this.dragging) {
                        var delta = this.prev.to(v);
                        this.offset = this.offset.plus(delta);
                        this.prev = v;
                    }
                    break;
                case story_2.Trigger.Cancel:
                case story_2.Trigger.Up:
                    if (this.dragging) {
                        this.dragging = false;
                        if (this.target.handle(v, t) == 'drop') {
                            this.done = true;
                            return this.ready_event_name;
                        }
                    }
            }
            return null;
        };
        return Drag_to_Target;
    }());
    exports.Drag_to_Target = Drag_to_Target;
});
// Maze Path Drawing Layer
// =======================
define("layer/maze", ["require", "exports", "story"], function (require, exports, story_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Complete_Maze = void 0;
    var Complete_Maze = /** @class */ (function () {
        function Complete_Maze(start, end, maze, line_inner_width, line_outer_width, line_inner_color, line_outer_color) {
            if (line_inner_width === void 0) { line_inner_width = 20; }
            if (line_outer_width === void 0) { line_outer_width = 24; }
            if (line_inner_color === void 0) { line_inner_color = 'black'; }
            if (line_outer_color === void 0) { line_outer_color = 'red'; }
            this.start = start;
            this.end = end;
            this.maze = maze;
            this.line_inner_width = line_inner_width;
            this.line_outer_width = line_outer_width;
            this.line_inner_color = line_inner_color;
            this.line_outer_color = line_outer_color;
            this.reverse = false;
            this.drawing = false;
            this.solved = false;
            this.line = [];
        }
        Complete_Maze.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.start.load()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.maze.load()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.end.load()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Complete_Maze.prototype.draw = function (ctx) {
            if (this.line.length > 0) {
                var v = this.line[0];
                ctx.beginPath();
                ctx.moveTo(v.x, v.y);
                for (var i = 1; i < this.line.length; i++) {
                    v = this.line[i];
                    ctx.lineTo(v.x, v.y);
                }
                ctx.lineCap = 'round';
                ctx.strokeStyle = this.line_outer_color;
                ctx.lineWidth = this.line_outer_width;
                ctx.stroke();
                ctx.strokeStyle = this.line_inner_color;
                ctx.lineWidth = this.line_inner_width;
                ctx.stroke();
            }
            return null;
        };
        Complete_Maze.prototype.handle = function (v, t) {
            switch (t) {
                case story_3.Trigger.Down:
                    if (!this.solved && this.start.handle(v, story_3.Trigger.Down) == 'hit') {
                        this.reverse = false;
                        this.drawing = true;
                        this.line.push(v);
                    }
                    else if (!this.solved && this.end.handle(v, story_3.Trigger.Down) == 'hit') {
                        this.reverse = true;
                        this.drawing = true;
                        this.line.push(v);
                    }
                    break;
                case story_3.Trigger.Move:
                    if (this.drawing) {
                        if (this.maze.handle(v, story_3.Trigger.Down) == 'hit') {
                            this.line.push(v);
                        }
                        else {
                            this.drawing = false;
                            this.line = [];
                            return 'error';
                        }
                    }
                    break;
                case story_3.Trigger.Up:
                    if (this.drawing) {
                        this.drawing = false;
                        if (this.reverse ?
                            this.start.handle(v, story_3.Trigger.Down) == 'hit' :
                            this.end.handle(v, story_3.Trigger.Down) == 'hit') {
                            this.solved = true;
                            return 'solved';
                        }
                        else {
                            this.line = [];
                            return 'error';
                        }
                    }
                    break;
            }
            return null;
        };
        return Complete_Maze;
    }());
    exports.Complete_Maze = Complete_Maze;
});
// Image Erase Layer
// =================
define("layer/erase", ["require", "exports", "util/math", "util/canvas", "story"], function (require, exports, m, canvas, story_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Erase_Image = void 0;
    var Erase_Image = /** @class */ (function () {
        function Erase_Image(src, radius) {
            this.src = src;
            this.radius = radius;
            this.image = new Image();
            this.prev = m.v00;
            this.erasing = false;
            this.alpha_threshold = 64;
            this.count_threshold = 100;
        }
        Erase_Image.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, _) {
                            _this.image.addEventListener('load', function () {
                                _this.canvas = canvas.create(_this.image.width, _this.image.height);
                                _this.ctx = _this.canvas.getContext('2d');
                                _this.ctx.drawImage(_this.image, 0, 0);
                                resolve();
                            }, { once: true });
                            _this.image.src = _this.src;
                        })];
                });
            });
        };
        Erase_Image.prototype.draw = function (ctx) {
            ctx.drawImage(this.canvas, 0, 0);
            return null;
        };
        Erase_Image.prototype.handle = function (v, t) {
            switch (t) {
                case story_4.Trigger.Down:
                    this.erasing = true;
                    this.prev = v;
                    break;
                case story_4.Trigger.Move:
                    if (this.erasing) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.prev.x, this.prev.y);
                        this.ctx.lineTo(v.x, v.y);
                        this.ctx.lineCap = 'round';
                        this.ctx.lineWidth = this.radius * 2;
                        this.ctx.globalCompositeOperation = 'destination-out';
                        this.ctx.stroke();
                        this.prev = v;
                    }
                    break;
                case story_4.Trigger.Cancel:
                case story_4.Trigger.Up:
                    if (this.erasing) {
                        this.erasing = false;
                        var data = this.ctx.getImageData(0, 0, this.image.width, this.image.height).data;
                        var visible_pixels = 0;
                        for (var i = 3; i < data.length; i += 4) {
                            if (data[i] > this.alpha_threshold) {
                                visible_pixels++;
                            }
                        }
                        if (visible_pixels < this.count_threshold) {
                            return 'erased';
                        }
                    }
                    break;
            }
            return null;
        };
        return Erase_Image;
    }());
    exports.Erase_Image = Erase_Image;
});
define("layer/all", ["require", "exports", "layer/basic", "layer/media", "layer/scroll", "layer/dnd", "layer/maze", "layer/erase"], function (require, exports, basic_1, media_1, scroll_1, dnd_1, maze_1, erase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Erase_Image = exports.Complete_Maze = exports.Drag_to_Target = exports.Sidescroll = exports.Video = exports.GIF = exports.Image = exports.Click_Mask = exports.Click_Anywhere = exports.Composite = exports.Switch = void 0;
    Object.defineProperty(exports, "Switch", { enumerable: true, get: function () { return basic_1.Switch; } });
    Object.defineProperty(exports, "Composite", { enumerable: true, get: function () { return basic_1.Composite; } });
    Object.defineProperty(exports, "Click_Anywhere", { enumerable: true, get: function () { return basic_1.Click_Anywhere; } });
    Object.defineProperty(exports, "Click_Mask", { enumerable: true, get: function () { return basic_1.Click_Mask; } });
    Object.defineProperty(exports, "Image", { enumerable: true, get: function () { return media_1.Image; } });
    Object.defineProperty(exports, "GIF", { enumerable: true, get: function () { return media_1.GIF; } });
    Object.defineProperty(exports, "Video", { enumerable: true, get: function () { return media_1.Video; } });
    Object.defineProperty(exports, "Sidescroll", { enumerable: true, get: function () { return scroll_1.Sidescroll; } });
    Object.defineProperty(exports, "Drag_to_Target", { enumerable: true, get: function () { return dnd_1.Drag_to_Target; } });
    Object.defineProperty(exports, "Complete_Maze", { enumerable: true, get: function () { return maze_1.Complete_Maze; } });
    Object.defineProperty(exports, "Erase_Image", { enumerable: true, get: function () { return erase_1.Erase_Image; } });
});
// Game Layers
// ===========
define("game/layers", ["require", "exports", "util/math", "layer/all", "story"], function (require, exports, m, layer, story_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.layers = void 0;
    function garden_item_layer(name) {
        return new layer.Composite([
            new layer.Image("assets/garden/items/".concat(name, ".png")),
            new layer.Click_Mask("assets/garden/items/".concat(name, "_mask.png"), 'drag', story_5.Trigger.Down),
        ]);
    }
    function garden_water_layer(index) {
        return new layer.Composite([
            new layer.Image("assets/flower/water".concat(index, ".png")),
            new layer.Click_Mask("assets/flower/water".concat(index, "_mask.png"), 'drag', story_5.Trigger.Down),
        ]);
    }
    exports.layers = {
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
        character_back: new layer.Switch([
            new layer.Image('assets/character/orange_back.png'),
            new layer.Image('assets/character/yellow_back.png'),
            new layer.Image('assets/character/green_back.png')
        ]),
        frame_stars: new layer.Switch([
            new layer.Image('assets/frame/one_star.png'),
            new layer.Image('assets/frame/two_stars.png'),
            new layer.Image('assets/frame/three_stars.png'),
            new layer.Image('assets/frame/four_stars.png'),
        ]),
        // Side-scroll landscape
        landscape_bg: new layer.Switch([
            new layer.Video('assets/landscape/bg_sad_sad.mp4', { loop: true, resize: m.vec2(5760, 1080) }),
            new layer.Video('assets/landscape/bg_happy_sad.mp4', { loop: true, resize: m.vec2(5760, 1080) }),
            new layer.Video('assets/landscape/bg_sad_happy.mp4', { loop: true, resize: m.vec2(5760, 1080) })
        ]),
        landscape_nav: new layer.Composite([
            new layer.Image('assets/landscape/button_left.png'),
            new layer.Image('assets/landscape/button_right.png'),
            new layer.Click_Mask('assets/landscape/button_left_mask.png', 'left'),
            new layer.Click_Mask('assets/landscape/button_right_mask.png', 'right')
        ]),
        landscape_lmask: new layer.Click_Mask('assets/landscape/farmer_left_mask.png', 'farmer_left'),
        landscape_rmask: new layer.Click_Mask('assets/landscape/farmer_right_mask.png', 'farmer_right'),
        landscape_get_star: new layer.Video('assets/landscape/get_star.mp4', { loop: true }),
        // Garden minigame
        garden_intro: new layer.Video('assets/garden/intro.mp4', { muted: false, loop: true }),
        garden_start: new layer.Click_Mask('assets/garden/start_mask.png', 'start'),
        garden_background: new layer.Image('assets/garden/background.png'),
        garden_trashcan: new layer.GIF('assets/garden/trashcan.gif'),
        garden_trashcan_mask: new layer.Click_Mask('assets/garden/trashcan_mask.png', 'drop', story_5.Trigger.Up),
        garden_item1: garden_item_layer('bag'),
        garden_item2: garden_item_layer('can'),
        garden_item3: garden_item_layer('carton'),
        garden_item4: garden_item_layer('cup'),
        garden_item5: garden_item_layer('fish'),
        garden_item6: garden_item_layer('lamp'),
        garden_item7: garden_item_layer('paper'),
        garden_item8: garden_item_layer('spoon'),
        garden_completed: new layer.Video('assets/garden/completed.mp4'),
        // Windmill minigame
        windmill_intro: new layer.Video('assets/windmill/intro.mp4', { muted: false, loop: true }),
        windmill_intro_mask: new layer.Click_Mask('assets/windmill/intro_mask.png', 'start'),
        windmill_explain: new layer.Image('assets/windmill/explain.png'),
        windmill_explain_mask: new layer.Click_Mask('assets/windmill/explain_mask.png', 'start'),
        windmill_background: new layer.Image('assets/windmill/background.png'),
        windmill_maze: new layer.Click_Mask('assets/windmill/maze.png', 'hit', story_5.Trigger.Down),
        windmill_maze_green1: new layer.Click_Mask('assets/windmill/maze_green1.png', 'hit', story_5.Trigger.Down),
        windmill_maze_green2: new layer.Click_Mask('assets/windmill/maze_green2.png', 'hit', story_5.Trigger.Down),
        windmill_maze_orange1: new layer.Click_Mask('assets/windmill/maze_orange1.png', 'hit', story_5.Trigger.Down),
        windmill_maze_orange2: new layer.Click_Mask('assets/windmill/maze_orange2.png', 'hit', story_5.Trigger.Down),
        windmill_maze_red1: new layer.Click_Mask('assets/windmill/maze_red1.png', 'hit', story_5.Trigger.Down),
        windmill_maze_red2: new layer.Click_Mask('assets/windmill/maze_red2.png', 'hit', story_5.Trigger.Down),
        windmill_working: new layer.Switch([new layer.GIF('assets/windmill/working.gif')]),
        windmill_next: new layer.Switch([
            new layer.Composite([
                new layer.Image('assets/nav/next.png'),
                new layer.Click_Mask('assets/nav/next_mask.png', 'next')
            ])
        ]),
        windmill_completed: new layer.Video('assets/windmill/completed.mp4'),
        // Opening the bottle
        bottle_get: new layer.Video('assets/bottle/get.mp4'),
        bottle_click: new layer.Video('assets/bottle/click.mp4', { loop: true }),
        bottle_click_mask: new layer.Click_Mask('assets/bottle/click_mask.png', 'open'),
        bottle_open: new layer.Video('assets/bottle/open.mp4'),
        bottle_map: new layer.Video('assets/bottle/map.mp4', { loop: true }),
        bottle_map_mask: new layer.Click_Mask('assets/bottle/map_mask.png', 'go'),
        // Flower minigame
        flower_intro: new layer.Video('assets/flower/intro.mp4', { loop: true }),
        flower_background: new layer.Video('assets/flower/background.mp4'),
        flower_explain: new layer.Image('assets/flower/explain.png'),
        flower_explain_mask: new layer.Click_Mask('assets/flower/explain_mask.png', 'start'),
        flower_target_mask: new layer.Click_Mask('assets/flower/target_mask.png', 'drop', story_5.Trigger.Up),
        flower_water1: garden_water_layer(1),
        flower_water2: garden_water_layer(2),
        flower_water3: garden_water_layer(3),
        flower_water4: garden_water_layer(4),
        flower_water5: garden_water_layer(5),
        flower_completed: new layer.Video('assets/flower/completed.mp4', { loop: true }),
        // Cleanup minigame
        cleanup_walk: new layer.Video('assets/cleanup/walk.mp4'),
        cleanup_intro: new layer.Video('assets/cleanup/intro.mp4', { loop: true }),
        cleanup_background: new layer.Image('assets/cleanup/background.png'),
        cleanup_viezesloot: new layer.Erase_Image('assets/cleanup/viezesloot.png', 50),
        cleanup_drinking: new layer.Video('assets/cleanup/drinking.mp4', { loop: true }),
        cleanup_completed: new layer.Video('assets/cleanup/completed.mp4'),
    };
});
// Game Views
// ==========
define("game/views", ["require", "exports", "layer/all", "story", "game/layers"], function (require, exports, layer, story_6, layers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.views = void 0;
    exports.views = {
        loading: layers_1.layers.intro_hourglass,
        intro_dunes: new layer.Composite([
            layers_1.layers.intro_dunes,
            new layer.Click_Anywhere('continue')
        ]),
        intro_crab: layers_1.layers.intro_crab,
        intro_crab_nav: new layer.Composite([
            layers_1.layers.intro_crab,
            layers_1.layers.nav_rewind,
            layers_1.layers.nav_next
        ]),
        intro_sea: layers_1.layers.intro_sea,
        intro_sea_nav: new layer.Composite([
            layers_1.layers.intro_sea,
            layers_1.layers.nav_rewind,
            layers_1.layers.nav_next
        ]),
        intro_hand: layers_1.layers.intro_hand,
        intro_hand_nav: new layer.Composite([
            layers_1.layers.intro_hand,
            layers_1.layers.nav_rewind,
            layers_1.layers.nav_next
        ]),
        intro_shell: layers_1.layers.intro_shell,
        intro_shell_pickup: layers_1.layers.intro_shell_pickup,
        intro_welcome: new layer.Composite([
            layers_1.layers.intro_welcome,
            layers_1.layers.nav_next
        ]),
        intro_load: layers_1.layers.intro_load,
        intro_character: new layer.Composite([
            layers_1.layers.character_background,
            layers_1.layers.character_selection,
            layers_1.layers.character_characters,
            layers_1.layers.character_mask,
            layers_1.layers.character_start_mask
        ]),
        // Side-scroll landscape
        landscape: new layer.Composite([
            new layer.Sidescroll(new layer.Composite([
                layers_1.layers.landscape_bg,
                layers_1.layers.landscape_lmask,
                layers_1.layers.landscape_rmask
            ]), layers_1.layers.landscape_nav, 5760, 1920, -1950),
            layers_1.layers.character_back,
            layers_1.layers.frame_stars
        ]),
        landscape_get_star: new layer.Composite([
            layers_1.layers.landscape_get_star,
            new layer.Click_Anywhere('continue'),
            layers_1.layers.frame_stars
        ]),
        // Garden minigame
        garden_intro: new layer.Composite([
            layers_1.layers.garden_intro,
            layers_1.layers.garden_start,
            layers_1.layers.frame_stars
        ]),
        garden_game: new layer.Composite([
            layers_1.layers.garden_background,
            layers_1.layers.garden_trashcan,
            new layer.Drag_to_Target(layers_1.layers.garden_trashcan_mask, layers_1.layers.garden_item1, 'trash'),
            new layer.Drag_to_Target(layers_1.layers.garden_trashcan_mask, layers_1.layers.garden_item2, 'trash'),
            new layer.Drag_to_Target(layers_1.layers.garden_trashcan_mask, layers_1.layers.garden_item3, 'trash'),
            new layer.Drag_to_Target(layers_1.layers.garden_trashcan_mask, layers_1.layers.garden_item4, 'trash'),
            new layer.Drag_to_Target(layers_1.layers.garden_trashcan_mask, layers_1.layers.garden_item5, 'trash'),
            new layer.Drag_to_Target(layers_1.layers.garden_trashcan_mask, layers_1.layers.garden_item6, 'trash'),
            new layer.Drag_to_Target(layers_1.layers.garden_trashcan_mask, layers_1.layers.garden_item7, 'trash'),
            new layer.Drag_to_Target(layers_1.layers.garden_trashcan_mask, layers_1.layers.garden_item8, 'trash'),
            layers_1.layers.frame_stars
        ]),
        garden_completed: new layer.Composite([
            layers_1.layers.garden_completed,
            layers_1.layers.nav_next,
            layers_1.layers.frame_stars
        ]),
        // Windmill minigame
        windmill_intro: new layer.Composite([
            layers_1.layers.windmill_intro,
            layers_1.layers.windmill_intro_mask,
            layers_1.layers.frame_stars
        ]),
        windmill_explain: new layer.Composite([
            layers_1.layers.windmill_explain,
            layers_1.layers.windmill_explain_mask,
            layers_1.layers.frame_stars
        ]),
        windmill_game: new layer.Composite([
            layers_1.layers.windmill_background,
            new layer.Complete_Maze(layers_1.layers.windmill_maze_red1, layers_1.layers.windmill_maze_red2, layers_1.layers.windmill_maze, 20, 25, '#bb252e', 'black'),
            new layer.Complete_Maze(layers_1.layers.windmill_maze_orange1, layers_1.layers.windmill_maze_orange2, layers_1.layers.windmill_maze, 20, 25, '#c25d00', 'black'),
            new layer.Complete_Maze(layers_1.layers.windmill_maze_green1, layers_1.layers.windmill_maze_green2, layers_1.layers.windmill_maze, 20, 25, '#a5c000', 'black'),
            layers_1.layers.windmill_working,
            layers_1.layers.windmill_next,
            layers_1.layers.frame_stars
        ]),
        windmill_completed: new layer.Composite([
            layers_1.layers.windmill_completed,
            new layer.Click_Anywhere('open'),
            layers_1.layers.frame_stars
        ]),
        // Opening the bottle
        bottle_get: new layer.Composite([
            layers_1.layers.bottle_get,
            new layer.Click_Anywhere('continue'),
            layers_1.layers.frame_stars
        ]),
        bottle_click: new layer.Composite([
            layers_1.layers.bottle_click,
            layers_1.layers.bottle_click_mask,
            layers_1.layers.frame_stars
        ]),
        bottle_open: layers_1.layers.bottle_open,
        bottle_map: new layer.Composite([
            layers_1.layers.bottle_map,
            layers_1.layers.bottle_map_mask,
            layers_1.layers.frame_stars
        ]),
        // Flower minigame
        flower_intro: new layer.Composite([
            layers_1.layers.flower_intro,
            layers_1.layers.nav_next,
            layers_1.layers.frame_stars
        ]),
        flower_explain: new layer.Composite([
            layers_1.layers.flower_explain,
            layers_1.layers.flower_explain_mask,
            layers_1.layers.frame_stars
        ]),
        flower_game: new layer.Composite([
            layers_1.layers.flower_background,
            new layer.Drag_to_Target(layers_1.layers.flower_target_mask, layers_1.layers.flower_water1, 'water'),
            new layer.Drag_to_Target(layers_1.layers.flower_target_mask, layers_1.layers.flower_water2, 'water'),
            new layer.Drag_to_Target(layers_1.layers.flower_target_mask, layers_1.layers.flower_water3, 'water'),
            new layer.Drag_to_Target(layers_1.layers.flower_target_mask, layers_1.layers.flower_water4, 'water'),
            new layer.Drag_to_Target(layers_1.layers.flower_target_mask, layers_1.layers.flower_water5, 'water'),
            layers_1.layers.frame_stars
        ]),
        flower_done: new layer.Composite([
            layers_1.layers.flower_background,
            layers_1.layers.nav_next,
            layers_1.layers.frame_stars
        ]),
        flower_completed: new layer.Composite([
            layers_1.layers.flower_completed,
            new layer.Click_Anywhere('continue'),
            layers_1.layers.frame_stars
        ]),
        // Cleanup minigame
        cleanup_walk: new layer.Composite([
            layers_1.layers.cleanup_walk,
            layers_1.layers.character_back,
            new layer.Click_Anywhere('walk', story_6.Trigger.Down),
            new layer.Click_Anywhere('pause', story_6.Trigger.Up),
            layers_1.layers.frame_stars
        ]),
        cleanup_walk_end: new layer.Composite([
            layers_1.layers.cleanup_walk,
            layers_1.layers.character_back,
            layers_1.layers.nav_next,
            layers_1.layers.frame_stars
        ]),
        cleanup_intro: new layer.Composite([
            layers_1.layers.cleanup_intro,
            new layer.Click_Anywhere('continue'),
            layers_1.layers.frame_stars
        ]),
        cleanup_game: new layer.Composite([
            layers_1.layers.cleanup_background,
            layers_1.layers.cleanup_viezesloot,
            layers_1.layers.frame_stars
        ]),
        cleanup_drinking: new layer.Composite([
            layers_1.layers.cleanup_drinking,
            layers_1.layers.nav_next,
            layers_1.layers.frame_stars
        ]),
        cleanup_completed: new layer.Composite([
            layers_1.layers.cleanup_completed,
            layers_1.layers.nav_next,
            layers_1.layers.frame_stars
        ])
    };
});
// Game Logic
// ==========
define("game/logic", ["require", "exports", "story", "game/layers", "game/views"], function (require, exports, story_7, layers_2, views_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.start = exports.story = void 0;
    var state = {
        cleanup: 0,
        connect: 0,
        watered: 0,
        windmill_completed: false,
        garden_completed: false,
        flower_completed: false
    };
    var sounds = {
        sea: new Audio('assets/sound/sea.mp3'),
        trashcan: new Audio('assets/sound/trashcan.mp3'),
        completed: new Audio('assets/sound/completed.mp3'),
        connect: new Audio('assets/sound/connect.mp3'),
        error: new Audio('assets/sound/error.mp3'),
        water: new Audio('assets/sound/water.mp3')
    };
    function play_sound(name) {
        sounds[name].load();
        sounds[name].play();
    }
    function set_character(color) {
        var colors = ['orange', 'yellow', 'green'];
        var index = colors.indexOf(color);
        layers_2.layers.character_selection.index = index;
        layers_2.layers.character_back.index = index;
    }
    function update_stars() {
        var s = layers_2.layers.frame_stars;
        s.index = -1;
        if (state.windmill_completed) {
            s.index++;
        }
        if (state.garden_completed) {
            s.index++;
        }
        if (state.flower_completed) {
            s.index++;
        }
    }
    function set_landscape(start) {
        layers_2.layers.landscape_bg.layers[0].stop();
        layers_2.layers.landscape_bg.layers[1].stop();
        layers_2.layers.landscape_bg.layers[2].stop();
        if (start) {
            if (state.windmill_completed) {
                layers_2.layers.landscape_bg.index = 1;
                layers_2.layers.landscape_bg.layers[1].start();
            }
            else if (state.garden_completed) {
                layers_2.layers.landscape_bg.index = 2;
                layers_2.layers.landscape_bg.layers[2].start();
            }
            else {
                layers_2.layers.landscape_bg.index = 0;
                layers_2.layers.landscape_bg.layers[0].start();
            }
        }
    }
    var trashcan_timeout = undefined;
    function play_garden_trashcan_once() {
        layers_2.layers.garden_trashcan.start();
        window.clearTimeout(trashcan_timeout);
        trashcan_timeout = window.setTimeout(function () {
            layers_2.layers.garden_trashcan.stop();
        }, 1220);
    }
    var events = {
        loading: {
            loaded: function () {
                layers_2.layers.intro_hourglass.stop();
                return 'intro_dunes';
            }
        },
        intro_dunes: {
            continue: function () {
                sounds.sea.loop = true;
                sounds.sea.play();
                layers_2.layers.intro_crab.start();
                return 'intro_crab';
            }
        },
        intro_crab: {
            finish: function () { return 'intro_crab_nav'; }
        },
        intro_crab_nav: {
            rewind: function () {
                layers_2.layers.intro_crab.start();
                return 'intro_crab';
            },
            next: function () {
                layers_2.layers.intro_sea.start();
                return 'intro_sea';
            }
        },
        intro_sea: {
            finish: function () { return 'intro_sea_nav'; }
        },
        intro_sea_nav: {
            rewind: function () {
                layers_2.layers.intro_sea.start();
                return 'intro_sea';
            },
            next: function () {
                layers_2.layers.intro_hand.start();
                return 'intro_hand';
            }
        },
        intro_hand: {
            finish: function () { return 'intro_hand_nav'; }
        },
        intro_hand_nav: {
            rewind: function () {
                layers_2.layers.intro_hand.start();
                return 'intro_hand';
            },
            next: function () { return 'intro_shell'; }
        },
        intro_shell: {
            pickup: function () {
                layers_2.layers.intro_shell_pickup.start();
                return 'intro_shell_pickup';
            }
        },
        intro_shell_pickup: {
            finish: function () {
                layers_2.layers.intro_welcome.start();
                return 'intro_welcome';
            }
        },
        intro_welcome: {
            next: function () {
                layers_2.layers.intro_welcome.stop();
                layers_2.layers.intro_load.start();
                return 'intro_load';
            }
        },
        intro_load: {
            finish: function () {
                layers_2.layers.intro_load.stop();
                layers_2.layers.character_background.start();
                layers_2.layers.character_characters.start();
                set_character('yellow');
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
                layers_2.layers.character_background.stop();
                layers_2.layers.character_characters.stop();
                set_landscape(true);
                return 'landscape';
            }
        },
        // Side-scrolling landscape
        landscape: {
            farmer_left: function () {
                if (!state.windmill_completed) {
                    set_landscape(false);
                    layers_2.layers.windmill_intro.start();
                    return 'windmill_intro';
                }
            },
            farmer_right: function () {
                if (!state.garden_completed) {
                    set_landscape(false);
                    layers_2.layers.garden_intro.start();
                    return 'garden_intro';
                }
            }
        },
        landscape_get_star: {
            continue: function () {
                update_stars();
                if (state.windmill_completed && state.garden_completed) {
                    layers_2.layers.bottle_get.start();
                    return 'bottle_get';
                }
                else {
                    set_landscape(true);
                    return 'landscape';
                }
            }
        },
        // Garden minigame
        garden_intro: {
            start: function () {
                layers_2.layers.garden_intro.stop();
                play_garden_trashcan_once();
                return 'garden_game';
            }
        },
        garden_game: {
            trash: function () {
                play_garden_trashcan_once();
                play_sound('trashcan');
                state.cleanup++;
                if (state.cleanup == 8) {
                    play_sound('completed');
                    state.garden_completed = true;
                    layers_2.layers.garden_completed.start();
                    return 'garden_completed';
                }
            }
        },
        garden_completed: {
            next: function () {
                layers_2.layers.landscape_get_star.start();
                return 'landscape_get_star';
            }
        },
        // Windmill minigame
        windmill_intro: {
            start: function () {
                layers_2.layers.windmill_intro.stop();
                return 'windmill_explain';
            }
        },
        windmill_explain: {
            start: function () { return 'windmill_game'; }
        },
        windmill_game: {
            error: function () {
                play_sound('error');
            },
            solved: function () {
                play_sound('connect');
                state.connect++;
                if (state.connect == 3) {
                    state.windmill_completed = true;
                    layers_2.layers.windmill_working.index = 0;
                    layers_2.layers.windmill_working.layers[0].start();
                    layers_2.layers.windmill_next.index = 0;
                }
            },
            next: function () {
                play_sound('completed');
                layers_2.layers.windmill_completed.start();
                return 'windmill_completed';
            }
        },
        windmill_completed: {
            open: function () {
                layers_2.layers.landscape_get_star.start();
                return 'landscape_get_star';
            }
        },
        // Opening the bottle
        bottle_get: {
            continue: function () {
                layers_2.layers.bottle_click.start();
                return 'bottle_click';
            }
        },
        bottle_click: {
            open: function () {
                layers_2.layers.bottle_click.stop();
                layers_2.layers.bottle_open.start();
                return 'bottle_open';
            }
        },
        bottle_open: {
            finish: function () {
                layers_2.layers.bottle_map.start();
                return 'bottle_map';
            }
        },
        bottle_map: {
            go: function () {
                layers_2.layers.flower_intro.start();
                return 'flower_intro';
            }
        },
        // Flower minigame
        flower_intro: {
            next: function () {
                layers_2.layers.flower_intro.stop();
                return 'flower_explain';
            }
        },
        flower_explain: {
            start: function () {
                layers_2.layers.flower_background.start();
                var interval_id = window.setInterval(function () {
                    if (state.flower_completed) {
                        window.clearInterval(interval_id);
                    }
                    else {
                        var v = layers_2.layers.flower_background.video;
                        if (v.currentTime / v.duration >= state.watered / 5) {
                            layers_2.layers.flower_background.stop();
                        }
                    }
                }, 100);
                return 'flower_game';
            }
        },
        flower_game: {
            water: function () {
                play_sound('water');
                state.watered++;
                layers_2.layers.flower_background.continue();
                if (state.watered == 5) {
                    state.flower_completed = true;
                    return 'flower_done';
                }
            }
        },
        flower_done: {
            next: function () {
                play_sound('completed');
                layers_2.layers.flower_completed.start();
                return 'flower_completed';
            }
        },
        flower_completed: {
            continue: function () {
                layers_2.layers.flower_completed.stop();
                return 'cleanup_walk';
            }
        },
        // Cleanup minigame
        cleanup_walk: {
            walk: function () {
                layers_2.layers.cleanup_walk.continue();
            },
            pause: function () {
                layers_2.layers.cleanup_walk.stop();
            },
            finish: function () { return 'cleanup_walk_end'; }
        },
        cleanup_walk_end: {
            next: function () {
                layers_2.layers.cleanup_intro.start();
                return 'cleanup_intro';
            }
        },
        cleanup_intro: {
            continue: function () {
                layers_2.layers.cleanup_intro.stop();
                return 'cleanup_game';
            }
        },
        cleanup_game: {
            erased: function () {
                play_sound('completed');
                layers_2.layers.cleanup_drinking.start();
                return 'cleanup_drinking';
            }
        },
        cleanup_drinking: {
            next: function () {
                layers_2.layers.cleanup_drinking.stop();
                layers_2.layers.cleanup_completed.start();
                return 'cleanup_completed';
            }
        },
        cleanup_completed: {}
    };
    exports.story = new story_7.Story(views_1.views, events, 'loading');
    function start() {
        return __awaiter(this, void 0, void 0, function () {
            var promises, l;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // First load the load animation.
                    return [4 /*yield*/, layers_2.layers.intro_hourglass.load()];
                    case 1:
                        // First load the load animation.
                        _a.sent();
                        layers_2.layers.intro_hourglass.start();
                        promises = [];
                        for (l in layers_2.layers) {
                            if (l != 'intro_hourglass') {
                                promises.push(layers_2.layers[l].load());
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
define("main", ["require", "exports", "util/math", "story", "game/logic"], function (require, exports, m, story_8, logic_1) {
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
        e.preventDefault();
        logic_1.story.handle(coordinate(e), story_8.Trigger.Down);
    }, { passive: false });
    canvas.addEventListener('pointermove', function (e) {
        e.preventDefault();
        logic_1.story.handle(coordinate(e), story_8.Trigger.Move);
    }, { passive: false });
    canvas.addEventListener('pointercancel', function (e) {
        logic_1.story.handle(coordinate(e), story_8.Trigger.Cancel);
    }, { passive: false });
    canvas.addEventListener('pointerout', function (e) {
        logic_1.story.handle(coordinate(e), story_8.Trigger.Cancel);
    }, { passive: false });
    canvas.addEventListener('pointerup', function (e) {
        logic_1.story.handle(coordinate(e), story_8.Trigger.Up);
    }, { passive: false });
    // Get rid of gestures
    // -------------------
    canvas.addEventListener('touchdown', function (e) {
        e.preventDefault();
    }, { passive: false });
    canvas.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, { passive: false });
    // Setup continuous render cycle
    // -----------------------------
    function draw() {
        // Don't clear to prevent flashes between views.
        //ctx.clearRect(0, 0, size.x, size.y)
        logic_1.story.draw(ctx);
        requestAnimationFrame(draw);
    }
    draw();
    (0, logic_1.start)();
});
