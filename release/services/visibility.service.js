"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var VisibilityService = /** @class */ (function () {
    function VisibilityService(zone) {
        this.zone = zone;
        this.observersMap = new Map();
        this.intersectionObserverSupported = 'IntersectionObserver' in window;
    }
    VisibilityService.prototype.observe = function (element) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            if (_this.observersMap.has(element)) {
                return _this.observersMap.get(element).visibilityChange;
            }
            var observer = _this.intersectionObserverSupported ?
                new IntersectionVisibilityObserver(element, _this.zone) :
                new OffsetCalculationVisibilityObserver(element, _this.zone);
            _this.observersMap.set(element, observer);
            observer.start();
            return observer.visibilityChange;
        });
    };
    VisibilityService.prototype.unobserve = function (element) {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            if (!_this.observersMap.has(element)) {
                return;
            }
            var observer = _this.observersMap.get(element);
            observer.stop();
            _this.observersMap.delete(element);
        });
    };
    VisibilityService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], VisibilityService);
    return VisibilityService;
}());
exports.VisibilityService = VisibilityService;
var IntersectionVisibilityObserver = /** @class */ (function () {
    function IntersectionVisibilityObserver(element, zone) {
        this.element = element;
        this.zone = zone;
        this.visibilityChange = new rxjs_1.Subject();
    }
    IntersectionVisibilityObserver.prototype.start = function () {
        if (typeof this.intersectionObserver !== 'undefined') {
            return;
        }
        this.intersectionObserver = new IntersectionObserver(this.onIntersectionChanged.bind(this), {
            threshold: [0],
        });
        this.intersectionObserver.observe(this.element);
    };
    IntersectionVisibilityObserver.prototype.stop = function () {
        if (typeof this.intersectionObserver === 'undefined') {
            return;
        }
        this.intersectionObserver.unobserve(this.element);
        this.intersectionObserver.disconnect();
        this.intersectionObserver = undefined;
        this.visibilityChange.complete();
    };
    IntersectionVisibilityObserver.prototype.onIntersectionChanged = function (entries, observer) {
        var _this = this;
        this.zone.run(function () {
            var isVisible = false;
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                if (entry.intersectionRatio > 0) {
                    isVisible = true;
                    break;
                }
            }
            _this.visibilityChange.next(isVisible);
        });
    };
    return IntersectionVisibilityObserver;
}());
exports.IntersectionVisibilityObserver = IntersectionVisibilityObserver;
var OffsetCalculationVisibilityObserver = /** @class */ (function () {
    function OffsetCalculationVisibilityObserver(element, zone) {
        this.element = element;
        this.zone = zone;
        this.visibilityChange = new rxjs_1.Subject();
    }
    OffsetCalculationVisibilityObserver.prototype.start = function () {
        if (this.timeout) {
            return;
        }
        this.runCheck();
    };
    OffsetCalculationVisibilityObserver.prototype.stop = function () {
        if (!this.timeout) {
            return;
        }
        clearTimeout(this.timeout);
        this.timeout = undefined;
        this.visibilityChange.complete();
    };
    OffsetCalculationVisibilityObserver.prototype.runCheck = function () {
        var _this = this;
        var check = function () {
            // https://davidwalsh.name/offsetheight-visibility
            var _a = _this.element, offsetHeight = _a.offsetHeight, offsetWidth = _a.offsetWidth;
            if (offsetHeight && offsetWidth) {
                clearTimeout(_this.timeout);
                _this.onVisibilityChange();
            }
            else {
                clearTimeout(_this.timeout);
                _this.zone.runOutsideAngular(function () {
                    _this.timeout = setTimeout(function () { return check(); }, 50);
                });
            }
        };
        this.timeout = setTimeout(function () { return check(); });
    };
    OffsetCalculationVisibilityObserver.prototype.onVisibilityChange = function () {
        var _this = this;
        // trigger zone recalc for columns
        this.zone.run(function () {
            _this.visibilityChange.next(true);
        });
    };
    return OffsetCalculationVisibilityObserver;
}());
exports.OffsetCalculationVisibilityObserver = OffsetCalculationVisibilityObserver;
//# sourceMappingURL=visibility.service.js.map