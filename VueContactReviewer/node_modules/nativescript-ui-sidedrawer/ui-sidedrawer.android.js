"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./ui-sidedrawer.common"));
var commonModule = require("./ui-sidedrawer.common");
var utils = require("tns-core-modules/utils/utils");
var SideDrawerChangeListener;
function initializeListeners() {
    if (!SideDrawerChangeListener) {
        var SideDrawerChangeListenerImpl = /** @class */ (function (_super) {
            __extends(SideDrawerChangeListenerImpl, _super);
            function SideDrawerChangeListenerImpl(owner) {
                var _this = _super.call(this) || this;
                _this.owner = owner;
                return global.__native(_this);
            }
            SideDrawerChangeListenerImpl.prototype.onDrawerOpening = function (drawer) {
                if (!this.owner) {
                    return false;
                }
                if (this.owner.hasListeners(commonModule.RadSideDrawer.drawerOpeningEvent)) {
                    var args = {
                        eventName: commonModule.RadSideDrawer.drawerOpeningEvent,
                        object: this.owner,
                        returnValue: false
                    };
                    this.owner.notify(args);
                    if (args.returnValue) {
                        return args.returnValue;
                    }
                }
                return false;
            };
            SideDrawerChangeListenerImpl.prototype.onDrawerOpened = function (drawer) {
                if (!this.owner) {
                    return;
                }
                if (this.owner.hasListeners(commonModule.RadSideDrawer.drawerOpenedEvent)) {
                    var args = {
                        eventName: commonModule.RadSideDrawer.drawerOpenedEvent,
                        object: this.owner
                    };
                    this.owner.notify(args);
                }
            };
            SideDrawerChangeListenerImpl.prototype.onDrawerClosing = function (drawer) {
                if (!this.owner) {
                    return false;
                }
                if (this.owner.hasListeners(commonModule.RadSideDrawer.drawerClosingEvent)) {
                    var args = {
                        eventName: commonModule.RadSideDrawer.drawerClosingEvent,
                        object: this.owner,
                        returnValue: false
                    };
                    this.owner.notify(args);
                    if (args.returnValue) {
                        return args.returnValue;
                    }
                }
                return false;
            };
            SideDrawerChangeListenerImpl.prototype.onDrawerClosed = function (drawer) {
                if (!this.owner) {
                    return;
                }
                if (this.owner.hasListeners(commonModule.RadSideDrawer.drawerClosedEvent)) {
                    var args = {
                        eventName: commonModule.RadSideDrawer.drawerClosedEvent,
                        object: this.owner
                    };
                    this.owner.notify(args);
                }
            };
            SideDrawerChangeListenerImpl.prototype.onDrawerPan = function (drawer) {
                if (!this.owner) {
                    return;
                }
                if (this.owner.hasListeners(commonModule.RadSideDrawer.drawerPanEvent)) {
                    var args = {
                        eventName: commonModule.RadSideDrawer.drawerPanEvent,
                        object: this.owner
                    };
                    this.owner.notify(args);
                }
            };
            SideDrawerChangeListenerImpl = __decorate([
                Interfaces([com.telerik.android.primitives.widget.sidedrawer.DrawerChangeListener]),
                __metadata("design:paramtypes", [RadSideDrawer])
            ], SideDrawerChangeListenerImpl);
            return SideDrawerChangeListenerImpl;
        }(java.lang.Object));
        SideDrawerChangeListener = SideDrawerChangeListenerImpl;
    }
}
var RadSideDrawer = /** @class */ (function (_super) {
    __extends(RadSideDrawer, _super);
    function RadSideDrawer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._androidViewId = -1;
        return _this;
    }
    Object.defineProperty(RadSideDrawer.prototype, "_nativeView", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadSideDrawer.prototype, "_page", {
        get: function () {
            var page;
            if (this.page) {
                page = this.page;
            }
            else {
                page = this.mainContent.nativeView;
            }
            return page;
        },
        enumerable: true,
        configurable: true
    });
    RadSideDrawer.prototype.onUnloaded = function () {
        _super.prototype.onUnloaded.call(this);
        if (this._mainContentNativeView) {
            var lp = this._mainContentNativeView.getLayoutParams();
            lp.topMargin = 0;
            this._mainContentNativeView.setLayoutParams(lp);
        }
        if (this._page && this._page.actionBar) {
            this._page.actionBar.nativeView.removeOnLayoutChangeListener(this.layoutChangeFunction);
        }
    };
    RadSideDrawer.prototype.onBackPressed = function () {
        var currentView = this.mainContent;
        if (currentView && this._isRootView) {
            return currentView.onBackPressed();
        }
        return false;
    };
    RadSideDrawer.prototype._addViewToNativeVisualTree = function (child) {
        if (this._android && child.android) {
            if (this.mainContent === child) {
                this._android.setMainContent(child.nativeView);
                return true;
            }
            if (this.drawerContent === child) {
                this._android.setDrawerContent(child.nativeView);
                return true;
            }
        }
        return false;
    };
    RadSideDrawer.prototype._removeViewFromNativeVisualTree = function (child) {
        if (this._android && child.android) {
            // TODO: Remove listener
            if (this.mainContent === child) {
                this._android.setMainContent(null);
                child._isAddedToNativeVisualTree = false;
            }
            if (this.drawerContent === child) {
                this._android.setDrawerContent(null);
                child._isAddedToNativeVisualTree = false;
            }
        }
    };
    RadSideDrawer.prototype.initDrawer = function () {
        initializeListeners();
        this._android = new com.telerik.android.primitives.widget.sidedrawer.RadSideDrawer(this._context);
        this._android._drawerChangeListener = new SideDrawerChangeListener(this);
        this._android.addChangeListener(this._android._drawerChangeListener);
    };
    RadSideDrawer.prototype.createNativeView = function () {
        if (this._page) {
            this._page.on("navigatingFrom", this.onNavigatingFrom, this);
        }
        this.initDrawer();
        this._android.setDrawerSize(utils.layout.getDisplayDensity() * this.drawerContentSize);
        this._android.setIsLocked(!this.gesturesEnabled);
        this._android.setAllowEdgeSwipe(this.allowEdgeSwipe);
        if (this.drawerTransition) {
            this._android.setDrawerTransition(this.drawerTransition.getNativeContent());
        }
        if (this.drawerLocation) {
            this.setDrawerLocation(this.drawerLocation);
        }
        return this._android;
    };
    RadSideDrawer.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
        if (this._androidViewId < 0) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._nativeView.setId(this._androidViewId);
    };
    RadSideDrawer.prototype.disposeNativeView = function () {
        if (this._page) {
            this._page.off("navigatingFrom", this.onNavigatingFrom, this);
        }
        if (this._android._drawerChangeListener) {
            this._android._drawerChangeListener.owner = null;
        }
    };
    RadSideDrawer.prototype.onNavigatingFrom = function (args) {
        if (this.getIsOpen()) {
            this.closeDrawer();
        }
    };
    Object.defineProperty(RadSideDrawer.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    RadSideDrawer.prototype._onGesturesEnabledChanged = function (oldValue, newValue) {
        var value = newValue;
        if (!this.android) {
            return;
        }
        this.android.setIsLocked(!value);
    };
    RadSideDrawer.prototype._onAllowEdgeSwipeChanged = function (oldValue, newValue) {
        var value = newValue;
        if (!this.android) {
            return;
        }
        this.android.setAllowEdgeSwipe(value);
    };
    RadSideDrawer.prototype._onDrawerContentSizeChanged = function (oldValue, newValue) {
        if (!this.android) {
            return;
        }
        if (newValue) {
            this.android.setDrawerSize(utils.layout.getDisplayDensity() * newValue);
        }
    };
    RadSideDrawer.prototype._onDrawerTransitionChanged = function (oldValue, newValue) {
        if (!newValue) {
            return;
        }
        var finalVal;
        if (typeof newValue === "string") {
            switch (newValue.toLowerCase()) {
                case commonModule.FadeTransitionString: {
                    finalVal = new FadeTransition();
                    break;
                }
                case commonModule.PushTransitionString: {
                    finalVal = new PushTransition();
                    break;
                }
                case commonModule.RevealTransitionString: {
                    finalVal = new RevealTransition();
                    break;
                }
                case commonModule.ReverseSlideOutTransitionString: {
                    finalVal = new ReverseSlideOutTransition();
                    break;
                }
                case commonModule.ScaleDownPusherTransitionString: {
                    finalVal = new ScaleDownPusherTransition();
                    break;
                }
                case commonModule.ScaleUpTransitionString: {
                    finalVal = new ScaleUpTransition();
                    break;
                }
                case commonModule.SlideAlongTransitionString: {
                    finalVal = new SlideAlongTransition();
                    break;
                }
                case commonModule.SlideInOnTopTransitionString: {
                    finalVal = new SlideInOnTopTransition();
                    break;
                }
                default: {
                    console.log("Error: Not supported value (" + newValue + ") set to 'drawerTransition'");
                    finalVal = new SlideInOnTopTransition();
                    break;
                }
            }
            if (this.drawerTransition !== finalVal) {
                this.drawerTransition = finalVal;
                return;
            }
        }
        else {
            finalVal = newValue;
        }
        if (this.android) {
            this.android.setDrawerTransition(finalVal.getNativeContent());
        }
    };
    RadSideDrawer.prototype._onShadowColorChanged = function (oldValue, newValue) {
        if (!this.android) {
            return;
        }
        var nativeColor = newValue ? newValue.android : RadSideDrawer.shadowColorProperty.defaultValue.android;
        this.android.resolveFadeLayer().view().setBackgroundColor(nativeColor);
    };
    RadSideDrawer.prototype._onDrawerLocationChanged = function (oldValue, newValue) {
        _super.prototype._onDrawerLocationChanged.call(this, oldValue, newValue);
        if (!this.android) {
            return;
        }
        if (!newValue) {
            return;
        }
        this.setDrawerLocation(newValue);
    };
    RadSideDrawer.prototype.setDrawerLocation = function (newLocation) {
        switch (newLocation) {
            case commonModule.SideDrawerLocation.Left:
                this.android.setDrawerLocation(com.telerik.android.primitives.widget.sidedrawer.DrawerLocation.LEFT);
                break;
            case commonModule.SideDrawerLocation.Right:
                this.android.setDrawerLocation(com.telerik.android.primitives.widget.sidedrawer.DrawerLocation.RIGHT);
                break;
            case commonModule.SideDrawerLocation.Top:
                this.android.setDrawerLocation(com.telerik.android.primitives.widget.sidedrawer.DrawerLocation.TOP);
                break;
            case commonModule.SideDrawerLocation.Bottom:
                this.android.setDrawerLocation(com.telerik.android.primitives.widget.sidedrawer.DrawerLocation.BOTTOM);
                break;
        }
    };
    RadSideDrawer.prototype.closeDrawer = function () {
        if (this.android) {
            this.android.setIsOpen(false);
            _super.prototype.closeDrawer.call(this);
        }
    };
    RadSideDrawer.prototype.showDrawer = function () {
        if (this._android) {
            this._android.setIsOpen(true);
            _super.prototype.showDrawer.call(this);
        }
    };
    return RadSideDrawer;
}(commonModule.RadSideDrawer));
exports.RadSideDrawer = RadSideDrawer;
var DrawerTransitionBase = /** @class */ (function () {
    function DrawerTransitionBase() {
    }
    DrawerTransitionBase.prototype.getNativeContent = function () {
        return undefined;
    };
    return DrawerTransitionBase;
}());
exports.DrawerTransitionBase = DrawerTransitionBase;
var FadeTransition = /** @class */ (function (_super) {
    __extends(FadeTransition, _super);
    function FadeTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FadeTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.FadeTransition();
    };
    return FadeTransition;
}(DrawerTransitionBase));
exports.FadeTransition = FadeTransition;
var PushTransition = /** @class */ (function (_super) {
    __extends(PushTransition, _super);
    function PushTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PushTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.PushTransition();
    };
    return PushTransition;
}(DrawerTransitionBase));
exports.PushTransition = PushTransition;
var RevealTransition = /** @class */ (function (_super) {
    __extends(RevealTransition, _super);
    function RevealTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RevealTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.RevealTransition();
    };
    return RevealTransition;
}(DrawerTransitionBase));
exports.RevealTransition = RevealTransition;
var ReverseSlideOutTransition = /** @class */ (function (_super) {
    __extends(ReverseSlideOutTransition, _super);
    function ReverseSlideOutTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReverseSlideOutTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.ReverseSlideOutTransition();
    };
    return ReverseSlideOutTransition;
}(DrawerTransitionBase));
exports.ReverseSlideOutTransition = ReverseSlideOutTransition;
var ScaleDownPusherTransition = /** @class */ (function (_super) {
    __extends(ScaleDownPusherTransition, _super);
    function ScaleDownPusherTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScaleDownPusherTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.ScaleDownPusherTransition();
    };
    return ScaleDownPusherTransition;
}(DrawerTransitionBase));
exports.ScaleDownPusherTransition = ScaleDownPusherTransition;
var ScaleUpTransition = /** @class */ (function (_super) {
    __extends(ScaleUpTransition, _super);
    function ScaleUpTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScaleUpTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.ScaleUpTransition();
    };
    return ScaleUpTransition;
}(DrawerTransitionBase));
exports.ScaleUpTransition = ScaleUpTransition;
var SlideAlongTransition = /** @class */ (function (_super) {
    __extends(SlideAlongTransition, _super);
    function SlideAlongTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlideAlongTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.SlideAlongTransition();
    };
    return SlideAlongTransition;
}(DrawerTransitionBase));
exports.SlideAlongTransition = SlideAlongTransition;
var SlideInOnTopTransition = /** @class */ (function (_super) {
    __extends(SlideInOnTopTransition, _super);
    function SlideInOnTopTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlideInOnTopTransition.prototype.getNativeContent = function () {
        return new com.telerik.android.primitives.widget.sidedrawer.transitions.SlideInOnTopTransition();
    };
    return SlideInOnTopTransition;
}(DrawerTransitionBase));
exports.SlideInOnTopTransition = SlideInOnTopTransition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktc2lkZWRyYXdlci5hbmRyb2lkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWktc2lkZWRyYXdlci5hbmRyb2lkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXVDO0FBQ3ZDLHFEQUF1RDtBQUV2RCxvREFBc0Q7QUFRdEQsSUFBSSx3QkFBa0QsQ0FBQztBQUN2RCxTQUFTLG1CQUFtQjtJQUN4QixJQUFJLENBQUMsd0JBQXdCLEVBQUU7UUFFM0I7WUFBMkMsZ0RBQWdCO1lBQ3ZELHNDQUFtQixLQUFvQjtnQkFBdkMsWUFDSSxpQkFBTyxTQUVWO2dCQUhrQixXQUFLLEdBQUwsS0FBSyxDQUFlO2dCQUVuQyxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUVELHNEQUFlLEdBQWYsVUFBZ0IsTUFBc0U7Z0JBQ2xGLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNiLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtnQkFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsRUFBRTtvQkFDeEUsSUFBSSxJQUFJLEdBQThDO3dCQUNsRCxTQUFTLEVBQUUsWUFBWSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0I7d0JBQ3hELE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSzt3QkFDbEIsV0FBVyxFQUFFLEtBQUs7cUJBQ3JCLENBQUM7b0JBRUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRXhCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTt3QkFDbEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO3FCQUMzQjtpQkFDSjtnQkFFRCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDO1lBRUQscURBQWMsR0FBZCxVQUFlLE1BQXNFO2dCQUNqRixJQUFJLENBQUMsSUFBSSxDQUFD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QUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ2hHLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUFKRCxDQUF1QyxvQkFBb0IsR0FJMUQ7QUFKWSw4Q0FBaUI7QUFNOUI7SUFBMEMsd0NBQW9CO0lBQTlEOztJQUlBLENBQUM7SUFIRywrQ0FBZ0IsR0FBaEI7UUFDSSxPQUFPLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDbkcsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQUpELENBQTBDLG9CQUFvQixHQUk3RDtBQUpZLG9EQUFvQjtBQU1qQztJQUE0QywwQ0FBb0I7SUFBaEU7O0lBSUEsQ0FBQztJQUhHLGlEQUFnQixHQUFoQjtRQUNJLE9BQU8sSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNyRyxDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBNEMsb0JBQW9CLEdBSS9EO0FBSlksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSBcIi4vdWktc2lkZWRyYXdlci5jb21tb25cIjtcbmltcG9ydCAqIGFzIGNvbW1vbk1vZHVsZSBmcm9tIFwiLi91aS1zaWRlZHJhd2VyLmNvbW1vblwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgKiBhcyBjb2xvck1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xuXG5pbnRlcmZhY2UgU2lkZURyYXdlckNoYW5nZUxpc3RlbmVyIHtcbiAgICBuZXcob3duZXI6IFJhZFNpZGVEcmF3ZXIpOiBjb20udGVsZXJpay5hbmRyb2lkLnByaW1pdGl2ZXMud2lkZ2V0LnNpZGVkcmF3ZXIuRHJhd2VyQ2hhbmdlTGlzdGVuZXI7XG59XG5cbmxldCBTaWRlRHJhd2VyQ2hhbmdlTGlzdGVuZXI6IFNpZGVEcmF3ZXJDaGFuZ2VMaXN0ZW5lcjtcbmZ1bmN0aW9uIGluaXRpYWxpemVMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKCFTaWRlRHJhd2VyQ2hhbmdlTGlzdGVuZXIpIHtcbiAgICAgICAgQEludGVyZmFjZXMoW2NvbS50ZWxlcmlrLmFuZHJvaWQucHJpbWl0aXZlcy53aWRnZXQuc2lkZWRyYXdlci5EcmF3ZXJDaGFuZ2VMaXN0ZW5lcl0pXG4gICAgICAgIGNsYXNzIFNpZGVEcmF3ZXJDaGFuZ2VMaXN0ZW5lckltcGwgZXh0ZW5kcyBqYXZhLmxhbmcuT2JqZWN0IGltcGxlbWVudHMgY29tLnRlbGVyaWsuYW5kcm9pZC5wcmltaXRpdmVzLndpZGdldC5zaWRlZHJhd2VyLkRyYXdlckNoYW5nZUxpc3RlbmVyIHtcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBvd25lcjogUmFkU2lkZURyYXdlcikge1xuICAgICAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdsb2JhbC5fX25hdGl2ZSh0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb25EcmF3ZXJPcGVuaW5nKGRyYXdlcjogY29tLnRlbGVyaWsuYW5kcm9pZC5wcmltaXRpdmVzLndpZGdldC5zaWRlZHJhd2VyLlJhZFNpZGVEcmF3ZXIpOiBib29sZWFuIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3duZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm93bmVyLmhhc0xpc3RlbmVycyhjb21tb25Nb2R1bGUuUmFkU2lkZURyYXdlci5kcmF3ZXJPcGVuaW5nRXZlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuRHJhd2VyU3RhdGVDaGFuZ2luZ0V2ZW50QXJncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogY29tbW9uTW9kdWxlLlJhZFNpZGVEcmF3ZXIuZHJhd2VyT3BlbmluZ0V2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLm93bmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWU6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vd25lci5ub3RpZnkoYXJncyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3MucmV0dXJuVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhcmdzLnJldHVyblZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvbkRyYXdlck9wZW5lZChkcmF3ZXI6IGNvbS50ZWxlcmlrLmFuZHJvaWQucHJpbWl0aXZlcy53aWRnZXQuc2lkZWRyYXdlci5SYWRTaWRlRHJhd2VyKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm93bmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vd25lci5oYXNMaXN0ZW5lcnMoY29tbW9uTW9kdWxlLlJhZFNpZGVEcmF3ZXIuZHJhd2VyT3BlbmVkRXZlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuRHJhd2VyU3RhdGVDaGFuZ2VkRXZlbnRBcmdzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkU2lkZURyYXdlci5kcmF3ZXJPcGVuZWRFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5vd25lclxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3duZXIubm90aWZ5KGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb25EcmF3ZXJDbG9zaW5nKGRyYXdlcjogY29tLnRlbGVyaWsuYW5kcm9pZC5wcmltaXRpdmVzLndpZGdldC5zaWRlZHJhd2VyLlJhZFNpZGVEcmF3ZXIpOiBib29sZWFuIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3duZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm93bmVyLmhhc0xpc3RlbmVycyhjb21tb25Nb2R1bGUuUmFkU2lkZURyYXdlci5kcmF3ZXJDbG9zaW5nRXZlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuRHJhd2VyU3RhdGVDaGFuZ2luZ0V2ZW50QXJncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogY29tbW9uTW9kdWxlLlJhZFNpZGVEcmF3ZXIuZHJhd2VyQ2xvc2luZ0V2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLm93bmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWU6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vd25lci5ub3RpZnkoYXJncyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3MucmV0dXJuVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhcmdzLnJldHVyblZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvbkRyYXdlckNsb3NlZChkcmF3ZXI6IGNvbS50ZWxlcmlrLmFuZHJvaWQucHJpbWl0aXZlcy53aWRnZXQuc2lkZWRyYXdlci5SYWRTaWRlRHJhd2VyKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm93bmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vd25lci5oYXNMaXN0ZW5lcnMoY29tbW9uTW9kdWxlLlJhZFNpZGVEcmF3ZXIuZHJhd2VyQ2xvc2VkRXZlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuRHJhd2VyU3RhdGVDaGFuZ2VkRXZlbnRBcmdzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkU2lkZURyYXdlci5kcmF3ZXJDbG9zZWRFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5vd25lclxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3duZXIubm90aWZ5KGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb25EcmF3ZXJQYW4oZHJhd2VyOiBjb20udGVsZXJpay5hbmRyb2lkLnByaW1pdGl2ZXMud2lkZ2V0LnNpZGVkcmF3ZXIuUmFkU2lkZURyYXdlcik6IHZvaWQge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vd25lcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3duZXIuaGFzTGlzdGVuZXJzKGNvbW1vbk1vZHVsZS5SYWRTaWRlRHJhd2VyLmRyYXdlclBhbkV2ZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXJnczogY29tbW9uTW9kdWxlLkRyYXdlclN0YXRlQ2hhbmdlZEV2ZW50QXJncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogY29tbW9uTW9kdWxlLlJhZFNpZGVEcmF3ZXIuZHJhd2VyUGFuRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMub3duZXJcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm93bmVyLm5vdGlmeShhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBTaWRlRHJhd2VyQ2hhbmdlTGlzdGVuZXIgPSBTaWRlRHJhd2VyQ2hhbmdlTGlzdGVuZXJJbXBsO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgUmFkU2lkZURyYXdlciBleHRlbmRzIGNvbW1vbk1vZHVsZS5SYWRTaWRlRHJhd2VyIHtcblxuICAgIHByaXZhdGUgX2FuZHJvaWQ6IGNvbS50ZWxlcmlrLmFuZHJvaWQucHJpbWl0aXZlcy53aWRnZXQuc2lkZWRyYXdlci5SYWRTaWRlRHJhd2VyO1xuICAgIHByaXZhdGUgX21haW5Db250ZW50TmF0aXZlVmlldztcbiAgICBwcml2YXRlIGxheW91dENoYW5nZUZ1bmN0aW9uO1xuICAgIHByaXZhdGUgX2FuZHJvaWRWaWV3SWQ6IG51bWJlciA9IC0xO1xuXG4gICAgZ2V0IF9uYXRpdmVWaWV3KCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbmRyb2lkO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IF9wYWdlKCk6IFBhZ2Uge1xuICAgICAgICBsZXQgcGFnZTogUGFnZTtcbiAgICAgICAgaWYgKHRoaXMucGFnZSkge1xuICAgICAgICAgICAgcGFnZSA9IHRoaXMucGFnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhZ2UgPSB0aGlzLm1haW5Db250ZW50Lm5hdGl2ZVZpZXc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFnZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25VbmxvYWRlZCgpIHtcbiAgICAgICAgc3VwZXIub25VbmxvYWRlZCgpO1xuICAgICAgICBpZiAodGhpcy5fbWFpbkNvbnRlbnROYXRpdmVWaWV3KSB7XG4gICAgICAgICAgICBsZXQgbHAgPSB0aGlzLl9tYWluQ29udGVudE5hdGl2ZVZpZXcuZ2V0TGF5b3V0UGFyYW1zKCk7XG4gICAgICAgICAgICBscC50b3BNYXJnaW4gPSAwO1xuICAgICAgICAgICAgdGhpcy5fbWFpbkNvbnRlbnROYXRpdmVWaWV3LnNldExheW91dFBhcmFtcyhscCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fcGFnZSAmJiB0aGlzLl9wYWdlLmFjdGlvbkJhcikge1xuICAgICAgICAgICAgdGhpcy5fcGFnZS5hY3Rpb25CYXIubmF0aXZlVmlldy5yZW1vdmVPbkxheW91dENoYW5nZUxpc3RlbmVyKHRoaXMubGF5b3V0Q2hhbmdlRnVuY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uQmFja1ByZXNzZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWaWV3ID0gdGhpcy5tYWluQ29udGVudDtcbiAgICAgICAgaWYgKGN1cnJlbnRWaWV3ICYmIHRoaXMuX2lzUm9vdFZpZXcpIHtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50Vmlldy5vbkJhY2tQcmVzc2VkKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIF9hZGRWaWV3VG9OYXRpdmVWaXN1YWxUcmVlKGNoaWxkOiBWaWV3KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLl9hbmRyb2lkICYmIGNoaWxkLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1haW5Db250ZW50ID09PSBjaGlsZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FuZHJvaWQuc2V0TWFpbkNvbnRlbnQoY2hpbGQubmF0aXZlVmlldyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRyYXdlckNvbnRlbnQgPT09IGNoaWxkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXREcmF3ZXJDb250ZW50KGNoaWxkLm5hdGl2ZVZpZXcpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBfcmVtb3ZlVmlld0Zyb21OYXRpdmVWaXN1YWxUcmVlKGNoaWxkOiBWaWV3KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9hbmRyb2lkICYmIGNoaWxkLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBsaXN0ZW5lclxuICAgICAgICAgICAgaWYgKHRoaXMubWFpbkNvbnRlbnQgPT09IGNoaWxkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXRNYWluQ29udGVudChudWxsKTtcbiAgICAgICAgICAgICAgICAoPGFueT5jaGlsZCkuX2lzQWRkZWRUb05hdGl2ZVZpc3VhbFRyZWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2VyQ29udGVudCA9PT0gY2hpbGQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmRyb2lkLnNldERyYXdlckNvbnRlbnQobnVsbCk7XG4gICAgICAgICAgICAgICAgKDxhbnk+Y2hpbGQpLl9pc0FkZGVkVG9OYXRpdmVWaXN1YWxUcmVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREcmF3ZXIoKSB7XG4gICAgICAgIGluaXRpYWxpemVMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5fYW5kcm9pZCA9IG5ldyBjb20udGVsZXJpay5hbmRyb2lkLnByaW1pdGl2ZXMud2lkZ2V0LnNpZGVkcmF3ZXIuUmFkU2lkZURyYXdlcih0aGlzLl9jb250ZXh0KTtcbiAgICAgICAgKDxhbnk+dGhpcy5fYW5kcm9pZCkuX2RyYXdlckNoYW5nZUxpc3RlbmVyID0gbmV3IFNpZGVEcmF3ZXJDaGFuZ2VMaXN0ZW5lcih0aGlzKTtcbiAgICAgICAgdGhpcy5fYW5kcm9pZC5hZGRDaGFuZ2VMaXN0ZW5lcigoPGFueT50aGlzLl9hbmRyb2lkKS5fZHJhd2VyQ2hhbmdlTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVOYXRpdmVWaWV3KCkge1xuICAgICAgICBpZiAodGhpcy5fcGFnZSkge1xuICAgICAgICAgICAgdGhpcy5fcGFnZS5vbihcIm5hdmlnYXRpbmdGcm9tXCIsIHRoaXMub25OYXZpZ2F0aW5nRnJvbSwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXREcmF3ZXIoKTtcblxuICAgICAgICB0aGlzLl9hbmRyb2lkLnNldERyYXdlclNpemUodXRpbHMubGF5b3V0LmdldERpc3BsYXlEZW5zaXR5KCkgKiB0aGlzLmRyYXdlckNvbnRlbnRTaXplKTtcbiAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXRJc0xvY2tlZCghdGhpcy5nZXN0dXJlc0VuYWJsZWQpO1xuICAgICAgICB0aGlzLl9hbmRyb2lkLnNldEFsbG93RWRnZVN3aXBlKHRoaXMuYWxsb3dFZGdlU3dpcGUpO1xuXG4gICAgICAgIGlmICh0aGlzLmRyYXdlclRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2FuZHJvaWQuc2V0RHJhd2VyVHJhbnNpdGlvbih0aGlzLmRyYXdlclRyYW5zaXRpb24uZ2V0TmF0aXZlQ29udGVudCgpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kcmF3ZXJMb2NhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZXREcmF3ZXJMb2NhdGlvbih0aGlzLmRyYXdlckxvY2F0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9hbmRyb2lkO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0TmF0aXZlVmlldygpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuaW5pdE5hdGl2ZVZpZXcoKTtcbiAgICAgICAgaWYgKHRoaXMuX2FuZHJvaWRWaWV3SWQgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmRyb2lkVmlld0lkID0gYW5kcm9pZC52aWV3LlZpZXcuZ2VuZXJhdGVWaWV3SWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX25hdGl2ZVZpZXcuc2V0SWQodGhpcy5fYW5kcm9pZFZpZXdJZCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc3Bvc2VOYXRpdmVWaWV3KCkge1xuICAgICAgICBpZiAodGhpcy5fcGFnZSkge1xuICAgICAgICAgICAgdGhpcy5fcGFnZS5vZmYoXCJuYXZpZ2F0aW5nRnJvbVwiLCB0aGlzLm9uTmF2aWdhdGluZ0Zyb20sIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCg8YW55PnRoaXMuX2FuZHJvaWQpLl9kcmF3ZXJDaGFuZ2VMaXN0ZW5lcikge1xuICAgICAgICAgICAgKDxhbnk+dGhpcy5fYW5kcm9pZCkuX2RyYXdlckNoYW5nZUxpc3RlbmVyLm93bmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25OYXZpZ2F0aW5nRnJvbShhcmdzKSB7XG4gICAgICAgIGlmICh0aGlzLmdldElzT3BlbigpKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlRHJhd2VyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgYW5kcm9pZCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW5kcm9pZDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uR2VzdHVyZXNFbmFibGVkQ2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgbGV0IHZhbHVlID0gPGJvb2xlYW4+bmV3VmFsdWU7XG4gICAgICAgIGlmICghdGhpcy5hbmRyb2lkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFuZHJvaWQuc2V0SXNMb2NrZWQoIXZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uQWxsb3dFZGdlU3dpcGVDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICBsZXQgdmFsdWUgPSA8Ym9vbGVhbj5uZXdWYWx1ZTtcblxuICAgICAgICBpZiAoIXRoaXMuYW5kcm9pZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hbmRyb2lkLnNldEFsbG93RWRnZVN3aXBlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uRHJhd2VyQ29udGVudFNpemVDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5hbmRyb2lkLnNldERyYXdlclNpemUodXRpbHMubGF5b3V0LmdldERpc3BsYXlEZW5zaXR5KCkgKiBuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uRHJhd2VyVHJhbnNpdGlvbkNoYW5nZWQob2xkVmFsdWU6IERyYXdlclRyYW5zaXRpb25CYXNlLCBuZXdWYWx1ZTogRHJhd2VyVHJhbnNpdGlvbkJhc2UpIHtcbiAgICAgICAgaWYgKCFuZXdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZpbmFsVmFsO1xuICAgICAgICBpZiAodHlwZW9mIG5ld1ZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKChuZXdWYWx1ZSBhcyBzdHJpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5GYWRlVHJhbnNpdGlvblN0cmluZzoge1xuICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbCA9IG5ldyBGYWRlVHJhbnNpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuUHVzaFRyYW5zaXRpb25TdHJpbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgZmluYWxWYWwgPSBuZXcgUHVzaFRyYW5zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLlJldmVhbFRyYW5zaXRpb25TdHJpbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgZmluYWxWYWwgPSBuZXcgUmV2ZWFsVHJhbnNpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuUmV2ZXJzZVNsaWRlT3V0VHJhbnNpdGlvblN0cmluZzoge1xuICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbCA9IG5ldyBSZXZlcnNlU2xpZGVPdXRUcmFuc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5TY2FsZURvd25QdXNoZXJUcmFuc2l0aW9uU3RyaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsVmFsID0gbmV3IFNjYWxlRG93blB1c2hlclRyYW5zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLlNjYWxlVXBUcmFuc2l0aW9uU3RyaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsVmFsID0gbmV3IFNjYWxlVXBUcmFuc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5TbGlkZUFsb25nVHJhbnNpdGlvblN0cmluZzoge1xuICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbCA9IG5ldyBTbGlkZUFsb25nVHJhbnNpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuU2xpZGVJbk9uVG9wVHJhbnNpdGlvblN0cmluZzoge1xuICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbCA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IE5vdCBzdXBwb3J0ZWQgdmFsdWUgKFwiICsgbmV3VmFsdWUgKyBcIikgc2V0IHRvICdkcmF3ZXJUcmFuc2l0aW9uJ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgZmluYWxWYWwgPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRyYXdlclRyYW5zaXRpb24gIT09IGZpbmFsVmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3ZXJUcmFuc2l0aW9uID0gZmluYWxWYWw7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmluYWxWYWwgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIHRoaXMuYW5kcm9pZC5zZXREcmF3ZXJUcmFuc2l0aW9uKGZpbmFsVmFsLmdldE5hdGl2ZUNvbnRlbnQoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uU2hhZG93Q29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBjb2xvck1vZHVsZS5Db2xvciwgbmV3VmFsdWU6IGNvbG9yTW9kdWxlLkNvbG9yKSB7XG4gICAgICAgIGlmICghdGhpcy5hbmRyb2lkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuYXRpdmVDb2xvciA9IG5ld1ZhbHVlID8gbmV3VmFsdWUuYW5kcm9pZCA6IFJhZFNpZGVEcmF3ZXIuc2hhZG93Q29sb3JQcm9wZXJ0eS5kZWZhdWx0VmFsdWUuYW5kcm9pZDtcblxuICAgICAgICB0aGlzLmFuZHJvaWQucmVzb2x2ZUZhZGVMYXllcigpLnZpZXcoKS5zZXRCYWNrZ3JvdW5kQ29sb3IobmF0aXZlQ29sb3IpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25EcmF3ZXJMb2NhdGlvbkNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5TaWRlRHJhd2VyTG9jYXRpb24sIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuU2lkZURyYXdlckxvY2F0aW9uKSB7XG4gICAgICAgIHN1cGVyLl9vbkRyYXdlckxvY2F0aW9uQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuXG4gICAgICAgIGlmICghdGhpcy5hbmRyb2lkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW5ld1ZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldERyYXdlckxvY2F0aW9uKG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldERyYXdlckxvY2F0aW9uKG5ld0xvY2F0aW9uOiBjb21tb25Nb2R1bGUuU2lkZURyYXdlckxvY2F0aW9uKSB7XG5cbiAgICAgICAgc3dpdGNoIChuZXdMb2NhdGlvbikge1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuU2lkZURyYXdlckxvY2F0aW9uLkxlZnQ6XG4gICAgICAgICAgICAgICAgdGhpcy5hbmRyb2lkLnNldERyYXdlckxvY2F0aW9uKGNvbS50ZWxlcmlrLmFuZHJvaWQucHJpbWl0aXZlcy53aWRnZXQuc2lkZWRyYXdlci5EcmF3ZXJMb2NhdGlvbi5MRUZUKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLlNpZGVEcmF3ZXJMb2NhdGlvbi5SaWdodDpcbiAgICAgICAgICAgICAgICB0aGlzLmFuZHJvaWQuc2V0RHJhd2VyTG9jYXRpb24oY29tLnRlbGVyaWsuYW5kcm9pZC5wcmltaXRpdmVzLndpZGdldC5zaWRlZHJhd2VyLkRyYXdlckxvY2F0aW9uLlJJR0hUKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLlNpZGVEcmF3ZXJMb2NhdGlvbi5Ub3A6XG4gICAgICAgICAgICAgICAgdGhpcy5hbmRyb2lkLnNldERyYXdlckxvY2F0aW9uKGNvbS50ZWxlcmlrLmFuZHJvaWQucHJpbWl0aXZlcy53aWRnZXQuc2lkZWRyYXdlci5EcmF3ZXJMb2NhdGlvbi5UT1ApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuU2lkZURyYXdlckxvY2F0aW9uLkJvdHRvbTpcbiAgICAgICAgICAgICAgICB0aGlzLmFuZHJvaWQuc2V0RHJhd2VyTG9jYXRpb24oY29tLnRlbGVyaWsuYW5kcm9pZC5wcmltaXRpdmVzLndpZGdldC5zaWRlZHJhd2VyLkRyYXdlckxvY2F0aW9uLkJPVFRPTSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2VEcmF3ZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIHRoaXMuYW5kcm9pZC5zZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICAgICAgc3VwZXIuY2xvc2VEcmF3ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93RHJhd2VyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fYW5kcm9pZCkge1xuICAgICAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXRJc09wZW4odHJ1ZSk7XG4gICAgICAgICAgICBzdXBlci5zaG93RHJhd2VyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSBpbXBsZW1lbnRzIGNvbW1vbk1vZHVsZS5EcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XG4gICAgZ2V0TmF0aXZlQ29udGVudCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZhZGVUcmFuc2l0aW9uIGV4dGVuZHMgRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgIGdldE5hdGl2ZUNvbnRlbnQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIG5ldyBjb20udGVsZXJpay5hbmRyb2lkLnByaW1pdGl2ZXMud2lkZ2V0LnNpZGVkcmF3ZXIudHJhbnNpdGlvbnMuRmFkZVRyYW5zaXRpb24oKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQdXNoVHJhbnNpdGlvbiBleHRlbmRzIERyYXdlclRyYW5zaXRpb25CYXNlIHtcbiAgICBnZXROYXRpdmVDb250ZW50KCk6IGFueSB7XG4gICAgICAgIHJldHVybiBuZXcgY29tLnRlbGVyaWsuYW5kcm9pZC5wcmltaXRpdmVzLndpZGdldC5zaWRlZHJhd2VyLnRyYW5zaXRpb25zLlB1c2hUcmFuc2l0aW9uKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmV2ZWFsVHJhbnNpdGlvbiBleHRlbmRzIERyYXdlclRyYW5zaXRpb25CYXNlIHtcbiAgICBnZXROYXRpdmVDb250ZW50KCk6IGFueSB7XG4gICAgICAgIHJldHVybiBuZXcgY29tLnRlbGVyaWsuYW5kcm9pZC5wcmltaXRpdmVzLndpZGdldC5zaWRlZHJhd2VyLnRyYW5zaXRpb25zLlJldmVhbFRyYW5zaXRpb24oKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZXZlcnNlU2xpZGVPdXRUcmFuc2l0aW9uIGV4dGVuZHMgRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgIGdldE5hdGl2ZUNvbnRlbnQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIG5ldyBjb20udGVsZXJpay5hbmRyb2lkLnByaW1pdGl2ZXMud2lkZ2V0LnNpZGVkcmF3ZXIudHJhbnNpdGlvbnMuUmV2ZXJzZVNsaWRlT3V0VHJhbnNpdGlvbigpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNjYWxlRG93blB1c2hlclRyYW5zaXRpb24gZXh0ZW5kcyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XG4gICAgZ2V0TmF0aXZlQ29udGVudCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gbmV3IGNvbS50ZWxlcmlrLmFuZHJvaWQucHJpbWl0aXZlcy53aWRnZXQuc2lkZWRyYXdlci50cmFuc2l0aW9ucy5TY2FsZURvd25QdXNoZXJUcmFuc2l0aW9uKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2NhbGVVcFRyYW5zaXRpb24gZXh0ZW5kcyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XG4gICAgZ2V0TmF0aXZlQ29udGVudCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gbmV3IGNvbS50ZWxlcmlrLmFuZHJvaWQucHJpbWl0aXZlcy53aWRnZXQuc2lkZWRyYXdlci50cmFuc2l0aW9ucy5TY2FsZVVwVHJhbnNpdGlvbigpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNsaWRlQWxvbmdUcmFuc2l0aW9uIGV4dGVuZHMgRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgIGdldE5hdGl2ZUNvbnRlbnQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIG5ldyBjb20udGVsZXJpay5hbmRyb2lkLnByaW1pdGl2ZXMud2lkZ2V0LnNpZGVkcmF3ZXIudHJhbnNpdGlvbnMuU2xpZGVBbG9uZ1RyYW5zaXRpb24oKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIGV4dGVuZHMgRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgIGdldE5hdGl2ZUNvbnRlbnQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIG5ldyBjb20udGVsZXJpay5hbmRyb2lkLnByaW1pdGl2ZXMud2lkZ2V0LnNpZGVkcmF3ZXIudHJhbnNpdGlvbnMuU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xuICAgIH1cbn1cbiJdfQ==