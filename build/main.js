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
// Layer Interface
// ===============
define("layer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VideoLayer = exports.ImageLayer = void 0;
    /*export class ClickLayer implements Layer {
    
    }*/
    var ImageLayer = /** @class */ (function () {
        function ImageLayer(src) {
            this.src = src;
            var image = new Image();
        }
        ImageLayer.prototype.load = function () {
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
        ImageLayer.prototype.draw = function (ctx, size) {
            ctx.drawImage(this.image, 0, 0, size.x, size.y);
            return null;
        };
        ImageLayer.prototype.reset = function () { };
        ImageLayer.prototype.pointer_down = function () { return null; };
        ImageLayer.prototype.pointer_move = function () { return null; };
        ImageLayer.prototype.pointer_up = function () { return null; };
        return ImageLayer;
    }());
    exports.ImageLayer = ImageLayer;
    var VideoLayer = /** @class */ (function () {
        function VideoLayer(src, muted) {
            if (muted === void 0) { muted = true; }
            this.src = src;
            this.video = document.createElement("video");
            this.video.muted = muted;
        }
        VideoLayer.prototype.load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (res, _) {
                            _this.video.addEventListener('canplaythrough', function () { return res(); }, { once: true });
                            _this.video.src = _this.src;
                        })];
                });
            });
        };
        VideoLayer.prototype.draw = function (ctx, size) {
            ctx.drawImage(this.video, 0, 0, size.x, size.y);
            return null;
        };
        VideoLayer.prototype.reset = function () { };
        VideoLayer.prototype.pointer_down = function () { return null; };
        VideoLayer.prototype.pointer_move = function () { return null; };
        VideoLayer.prototype.pointer_up = function () { return null; };
        return VideoLayer;
    }());
    exports.VideoLayer = VideoLayer;
});
// Game Logic
// ==========
define("game", ["require", "exports", "layer"], function (require, exports, layer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.view = exports.layer_navigation = exports.layer_intro = exports.layer_start = exports.layer_loading = exports.layer_bunny = void 0;
    exports.layer_bunny = new layer.VideoLayer('assets/bunny.mp4');
    exports.layer_loading = new layer.ImageLayer('assets/loading.jpg');
    exports.layer_start = new layer.ImageLayer('assets/start.jpg');
    exports.layer_intro = new layer.VideoLayer('assets/intro.mp4');
    exports.layer_navigation = new layer.ImageLayer('assets/navigation.jpg');
    exports.view = [
        exports.layer_bunny
    ];
});
// Main Program
// ============
define("main", ["require", "exports", "math", "game"], function (require, exports, m, game) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.size = void 0;
    // Auto-playing video with sound is allowed after user interaction:
    // https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide
    exports.size = m.vec2(1920, 1080);
    // Initialize canvas.
    var canvas = document.getElementById("canvas");
    canvas.width = exports.size.x;
    canvas.height = exports.size.y;
    var ctx = canvas.getContext("2d");
    canvas.addEventListener('pointermove', function (e) {
        var bbox = m.dom_bounding_box(canvas);
        var v_client = m.client_position(e);
        var v = v_client.minus(bbox.position).times(bbox.size.inv()).times(exports.size);
    });
    game.layer_bunny.load().then(function () {
        game.layer_bunny.video.play();
    });
    // Render continuously.
    function draw() {
        for (var _i = 0, _a = game.view; _i < _a.length; _i++) {
            var layer = _a[_i];
            layer.draw(ctx, exports.size);
        }
        requestAnimationFrame(draw);
    }
    draw();
});
