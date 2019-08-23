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
var services_1 = require("../services");
/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibilityObserver
 * 			(visible)="onVisible($event)">
 * 		</div>
 *
 */
var VisibilityDirective = /** @class */ (function () {
    function VisibilityDirective(element, zone, visibilityService) {
        this.element = element;
        this.zone = zone;
        this.visibilityService = visibilityService;
        this.isVisible = false;
        this.visible = new core_1.EventEmitter();
    }
    VisibilityDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.visibleSubscription = this.visibilityService.observe(this.element.nativeElement)
            .subscribe(function (visible) {
            _this.zone.run(function () {
                _this.isVisible = visible;
                if (_this.isVisible) {
                    _this.visible.emit(true);
                }
            });
        });
    };
    VisibilityDirective.prototype.ngOnDestroy = function () {
        this.visibilityService.unobserve(this.element.nativeElement);
        if (this.visibleSubscription) {
            this.visibleSubscription.unsubscribe();
        }
    };
    __decorate([
        core_1.HostBinding('class.visible'),
        __metadata("design:type", Boolean)
    ], VisibilityDirective.prototype, "isVisible", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], VisibilityDirective.prototype, "visible", void 0);
    VisibilityDirective = __decorate([
        core_1.Directive({ selector: '[visibilityObserver]' }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.NgZone,
            services_1.VisibilityService])
    ], VisibilityDirective);
    return VisibilityDirective;
}());
exports.VisibilityDirective = VisibilityDirective;
//# sourceMappingURL=visibility.directive.js.map