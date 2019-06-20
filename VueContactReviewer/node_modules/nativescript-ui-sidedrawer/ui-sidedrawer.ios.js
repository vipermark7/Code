"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./ui-sidedrawer.common"));
var commonModule = require("./ui-sidedrawer.common");
var view_1 = require("tns-core-modules/ui/core/view");
var utils = require("tns-core-modules/utils/utils");
////////////////////////////////////////////////
var RadSideDrawer = /** @class */ (function (_super) {
    __extends(RadSideDrawer, _super);
    function RadSideDrawer() {
        var _this = _super.call(this) || this;
        var screen = utils.ios.getter(UIScreen, UIScreen.mainScreen);
        _this._ios = TKSideDrawerView.alloc().initWithFrame(screen.bounds);
        _this._nativeDelegate = TKSideDrawerDelegateImpl.new().initWithOwner(_this);
        _this._ios.defaultSideDrawer.width = _this.drawerContentSize;
        _this._ios.defaultSideDrawer.style.blurType = 0;
        _this._ios.defaultSideDrawer.headerView = null;
        _this._ios.defaultSideDrawer.footerView = null;
        _this._ios.defaultSideDrawer.delegate = _this._nativeDelegate;
        _this.setShadowColor(_this.shadowColor);
        return _this;
    }
    Object.defineProperty(RadSideDrawer.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    RadSideDrawer.prototype.createNativeView = function () {
        if (!this._isRootView) {
            this.iosOverflowSafeArea = false;
            this.page.on("navigatingFrom", this.onNavigatingFrom, this);
        }
        return this.ios;
    };
    RadSideDrawer.prototype.disposeNativeView = function () {
        if (!this._isRootView) {
            this.page.off("navigatingFrom", this.onNavigatingFrom, this);
        }
    };
    RadSideDrawer.prototype.onNavigatingFrom = function (args) {
        if (this.getIsOpen()) {
            this.closeDrawer();
        }
    };
    RadSideDrawer.prototype.onLoaded = function () {
        var _this = this;
        _super.prototype.onLoaded.call(this);
        // TODO: See why timeout is required to sync the backgroundColor.
        if (this._isRootView) {
            setTimeout(function () {
                if (_this._drawerController) {
                    _this._drawerController.view.backgroundColor = _this.drawerContent && _this.drawerContent.nativeViewProtected.backgroundColor;
                }
            });
        }
    };
    RadSideDrawer.prototype.onUnloaded = function () {
        _super.prototype.onUnloaded.call(this);
    };
    // data changed event handlers
    RadSideDrawer.prototype._onDrawerLocationChanged = function (oldValue, newValue) {
        if (!newValue) {
            return;
        }
        this.setDrawerLocation(newValue);
    };
    RadSideDrawer.prototype._onShadowColorChanged = function (oldValue, newValue) {
        this.setShadowColor(newValue);
    };
    RadSideDrawer.prototype.setShadowColor = function (color) {
        this._ios.defaultSideDrawer.style.shadowMode = 2;
        this._ios.defaultSideDrawer.style.dimOpacity = 0.42;
        this._ios.defaultSideDrawer.style.shadowRadius = 0;
        this._ios.defaultSideDrawer.style.shadowOpacity = 1; // 0-1, higher is darker
        this._ios.defaultSideDrawer.style.shadowColor = color ? color.ios : RadSideDrawer.shadowColorProperty.defaultValue.ios;
    };
    RadSideDrawer.prototype._onGesturesEnabledChanged = function (oldValue, newValue) {
        var value = newValue;
        this.ios.defaultSideDrawer.allowGestures = value;
    };
    RadSideDrawer.prototype._onAllowEdgeSwipeChanged = function (oldValue, newValue) {
        var value = newValue;
        this.ios.defaultSideDrawer.allowEdgeSwipe = value;
    };
    RadSideDrawer.prototype.setDrawerLocation = function (newLocation) {
        switch (newLocation) {
            case commonModule.SideDrawerLocation.Left:
                this._ios.defaultSideDrawer.position = 0 /* Left */;
                break;
            case commonModule.SideDrawerLocation.Right:
                this._ios.defaultSideDrawer.position = 1 /* Right */;
                break;
            case commonModule.SideDrawerLocation.Top:
                this._ios.defaultSideDrawer.position = 2 /* Top */;
                break;
            case commonModule.SideDrawerLocation.Bottom:
                this._ios.defaultSideDrawer.position = 3 /* Bottom */;
                break;
        }
        this.requestLayout();
    };
    RadSideDrawer.prototype._onDrawerContentSizeChanged = function (oldValue, newValue) {
        var value = newValue;
        this._ios.defaultSideDrawer.width = value;
    };
    RadSideDrawer.prototype._onDrawerTransitionChanged = function (oldValue, newValue) {
        var value = newValue;
        var finalVal;
        if (typeof value === "string") {
            switch (value.toLowerCase()) {
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
                    console.log("Error: Not supported value (" + value + ") set to 'drawerTransition'");
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
            finalVal = value;
        }
        this._ios.defaultSideDrawer.transition = finalVal.getNativeContent();
    };
    RadSideDrawer.prototype._onMainContentChanged = function (oldValue, newValue) {
        if (oldValue) {
            this._removeView(oldValue);
        }
        if (newValue) {
            this._addView(newValue);
        }
    };
    RadSideDrawer.prototype._onDrawerContentChanged = function (oldValue, newValue) {
        if (oldValue) {
            this._drawerController = null;
            this._removeView(oldValue);
        }
        if (newValue) {
            this._addView(newValue);
        }
    };
    Object.defineProperty(RadSideDrawer.prototype, "_nativeView", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    RadSideDrawer.prototype.closeDrawer = function () {
        if (this._ios) {
            this._ios.defaultSideDrawer.dismiss();
            _super.prototype.closeDrawer.call(this);
        }
    };
    RadSideDrawer.prototype.showDrawer = function () {
        if (this._ios) {
            this._ios.defaultSideDrawer.show();
            _super.prototype.showDrawer.call(this);
        }
    };
    RadSideDrawer.prototype.eachChildView = function (callback) {
        var mainContent = this.mainContent;
        if (mainContent) {
            callback(mainContent);
        }
        if (this.drawerContent) {
            callback(this.drawerContent);
        }
    };
    RadSideDrawer.prototype.onLayout = function (left, top, right, bottom) {
        // In the case where the RadSideDrawer is not root view of the app
        // it doesn't have a viewController and childViewControllers. In this case
        // the RadSideDrawer must lay out its children drawerContent and mainContent
        if (!this.viewController) {
            var width = right - left;
            var height = bottom - top;
            var screenWidth = width;
            var screenHeight = height;
            var screen_1 = utils.ios.getter(UIScreen, UIScreen.mainScreen);
            var drawerSize = utils.layout.toDevicePixels(this.drawerContentSize);
            var pos = this._ios.defaultSideDrawer.position;
            if (pos === 2 /* Top */ || pos === 3 /* Bottom */) {
                this.drawerContent.layout(0, 0, right, drawerSize);
            }
            else {
                this.drawerContent.layout(0, 0, drawerSize, bottom);
            }
            this.mainContent.layout(0, 0, width, height);
        }
    };
    RadSideDrawer.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        var pos = this._ios.defaultSideDrawer.position;
        var drawerWidth = widthMeasureSpec;
        var drawerHeight = heightMeasureSpec;
        var drawerSize = utils.layout.toDevicePixels(this.drawerContentSize);
        if (pos === 2 /* Top */ || pos === 3 /* Bottom */) {
            view_1.View.measureChild(this, this.drawerContent, drawerWidth, utils.layout.makeMeasureSpec(drawerSize, utils.layout.EXACTLY));
        }
        else {
            view_1.View.measureChild(this, this.drawerContent, utils.layout.makeMeasureSpec(drawerSize, utils.layout.EXACTLY), drawerHeight);
        }
        var result = view_1.View.measureChild(this, this.mainContent, widthMeasureSpec, heightMeasureSpec);
        var width = utils.layout.getMeasureSpecSize(widthMeasureSpec);
        var widthMode = utils.layout.getMeasureSpecMode(widthMeasureSpec);
        var height = utils.layout.getMeasureSpecSize(heightMeasureSpec);
        var heightMode = utils.layout.getMeasureSpecMode(heightMeasureSpec);
        var widthAndState = view_1.View.resolveSizeAndState(result.measuredWidth, width, widthMode, 0);
        var heightAndState = view_1.View.resolveSizeAndState(result.measuredHeight, height, heightMode, 0);
        this.setMeasuredDimension(widthAndState, heightAndState);
    };
    RadSideDrawer.prototype._addViewToNativeVisualTree = function (child, atIndex) {
        _super.prototype._addViewToNativeVisualTree.call(this, child, atIndex);
        var controller = this.viewController;
        var content = child.nativeViewProtected;
        if (controller && !child.viewController) {
            child.viewController = view_1.ios.UILayoutViewController.initWithOwner(new WeakRef(child));
            var view = child.viewController.view;
            view.addSubview(child.nativeViewProtected);
            content = view;
        }
        if (child === this.mainContent) {
            this._ios.setMainView(content);
        }
        else if (child === this.drawerContent) {
            this._ios.defaultSideDrawer.content = content;
        }
        var childController = child.viewController;
        if (controller && childController) {
            controller.addChildViewController(childController);
        }
        return true;
    };
    return RadSideDrawer;
}(commonModule.RadSideDrawer));
exports.RadSideDrawer = RadSideDrawer;
////////////////////////////////////////////////
//              TRANSITIONS
////////////////////////////////////////////////
var FadeTransition = /** @class */ (function (_super) {
    __extends(FadeTransition, _super);
    function FadeTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FadeTransition.prototype.getNativeContent = function () {
        return 6 /* FadeIn */;
    };
    return FadeTransition;
}(commonModule.DrawerTransitionBase));
exports.FadeTransition = FadeTransition;
var PushTransition = /** @class */ (function (_super) {
    __extends(PushTransition, _super);
    function PushTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PushTransition.prototype.getNativeContent = function () {
        return 2 /* Push */;
    };
    return PushTransition;
}(commonModule.DrawerTransitionBase));
exports.PushTransition = PushTransition;
var RevealTransition = /** @class */ (function (_super) {
    __extends(RevealTransition, _super);
    function RevealTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RevealTransition.prototype.getNativeContent = function () {
        return 1 /* Reveal */;
    };
    return RevealTransition;
}(commonModule.DrawerTransitionBase));
exports.RevealTransition = RevealTransition;
var ReverseSlideOutTransition = /** @class */ (function (_super) {
    __extends(ReverseSlideOutTransition, _super);
    function ReverseSlideOutTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReverseSlideOutTransition.prototype.getNativeContent = function () {
        return 4 /* ReverseSlideOut */;
    };
    return ReverseSlideOutTransition;
}(commonModule.DrawerTransitionBase));
exports.ReverseSlideOutTransition = ReverseSlideOutTransition;
var ScaleDownPusherTransition = /** @class */ (function (_super) {
    __extends(ScaleDownPusherTransition, _super);
    function ScaleDownPusherTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScaleDownPusherTransition.prototype.getNativeContent = function () {
        return 7 /* ScaleDownPusher */;
    };
    return ScaleDownPusherTransition;
}(commonModule.DrawerTransitionBase));
exports.ScaleDownPusherTransition = ScaleDownPusherTransition;
var ScaleUpTransition = /** @class */ (function (_super) {
    __extends(ScaleUpTransition, _super);
    function ScaleUpTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScaleUpTransition.prototype.getNativeContent = function () {
        return 5 /* ScaleUp */;
    };
    return ScaleUpTransition;
}(commonModule.DrawerTransitionBase));
exports.ScaleUpTransition = ScaleUpTransition;
var SlideAlongTransition = /** @class */ (function (_super) {
    __extends(SlideAlongTransition, _super);
    function SlideAlongTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlideAlongTransition.prototype.getNativeContent = function () {
        return 3 /* SlideAlong */;
    };
    return SlideAlongTransition;
}(commonModule.DrawerTransitionBase));
exports.SlideAlongTransition = SlideAlongTransition;
var SlideInOnTopTransition = /** @class */ (function (_super) {
    __extends(SlideInOnTopTransition, _super);
    function SlideInOnTopTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlideInOnTopTransition.prototype.getNativeContent = function () {
        return 0 /* SlideInOnTop */;
    };
    return SlideInOnTopTransition;
}(commonModule.DrawerTransitionBase));
exports.SlideInOnTopTransition = SlideInOnTopTransition;
////////////////////////////////////////////////
//      Delegate implementation
////////////////////////////////////////////////
var TKSideDrawerDelegateImpl = /** @class */ (function (_super) {
    __extends(TKSideDrawerDelegateImpl, _super);
    function TKSideDrawerDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TKSideDrawerDelegateImpl.new = function () {
        return _super.new.call(this);
    };
    TKSideDrawerDelegateImpl.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    TKSideDrawerDelegateImpl.prototype.willShowSideDrawer = function (sideDrawer) {
        if (this._owner.hasListeners(commonModule.RadSideDrawer.drawerOpeningEvent)) {
            var args = {
                eventName: commonModule.RadSideDrawer.drawerOpeningEvent,
                object: this._owner,
                returnValue: false
            };
            this._owner.notify(args);
        }
    };
    TKSideDrawerDelegateImpl.prototype.didShowSideDrawer = function (sideDrawer) {
        if (this._owner.hasListeners(commonModule.RadSideDrawer.drawerOpenedEvent)) {
            var args = {
                eventName: commonModule.RadSideDrawer.drawerOpenedEvent,
                object: this._owner,
            };
            this._owner.notify(args);
        }
    };
    TKSideDrawerDelegateImpl.prototype.willDismissSideDrawer = function (sideDrawer) {
        if (this._owner.hasListeners(commonModule.RadSideDrawer.drawerClosingEvent)) {
            var args = {
                eventName: commonModule.RadSideDrawer.drawerClosingEvent,
                object: this._owner,
                returnValue: false
            };
            this._owner.notify(args);
        }
    };
    TKSideDrawerDelegateImpl.prototype.didDismissSideDrawer = function (sideDrawer) {
        if (this._owner.hasListeners(commonModule.RadSideDrawer.drawerClosedEvent)) {
            var args = {
                eventName: commonModule.RadSideDrawer.drawerClosedEvent,
                object: this._owner,
            };
            this._owner.notify(args);
        }
    };
    TKSideDrawerDelegateImpl.prototype.didPanSideDrawer = function (sideDrawer) {
        if (this._owner.hasListeners(commonModule.RadSideDrawer.drawerPanEvent)) {
            var args = {
                eventName: commonModule.RadSideDrawer.drawerPanEvent,
                object: this._owner,
            };
            this._owner.notify(args);
        }
    };
    TKSideDrawerDelegateImpl.ObjCProtocols = [TKSideDrawerDelegate];
    return TKSideDrawerDelegateImpl;
}(NSObject));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktc2lkZWRyYXdlci5pb3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1aS1zaWRlZHJhd2VyLmlvcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRDQUF1QztBQUN2QyxxREFBdUQ7QUFDdkQsc0RBQXFFO0FBQ3JFLG9EQUFzRDtBQUt0RCxnREFBZ0Q7QUFFaEQ7SUFBbUMsaUNBQTBCO0lBWXpEO1FBQUEsWUFDSSxpQkFBTyxTQVlWO1FBWEcsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3RCxLQUFJLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbEUsS0FBSSxDQUFDLGVBQWUsR0FBRyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLENBQUM7UUFFMUUsS0FBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDO1FBQzNELEtBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDL0MsS0FBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQzlDLEtBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUM5QyxLQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDO1FBQzVELEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztJQUMxQyxDQUFDO0lBbkJELHNCQUFJLDhCQUFHO2FBQVA7WUFDSSxPQUFP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LGFBQWEsQ0FBQyxrQkFBa0I7Z0JBQ3hELE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsV0FBVyxFQUFFLEtBQUs7YUFDckIsQ0FBQztZQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUNELHVEQUFvQixHQUFwQixVQUFxQixVQUF3QjtRQUN6QyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUN4RSxJQUFJLElBQUksR0FBNkM7Z0JBQ2pELFNBQVMsRUFBRSxZQUFZLENBQUMsYUFBYSxDQUFDLGlCQUFpQjtnQkFDdkQsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3RCLENBQUM7WUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRCxtREFBZ0IsR0FBaEIsVUFBaUIsVUFBd0I7UUFDckMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ3JFLElBQUksSUFBSSxHQUE2QztnQkFDakQsU0FBUyxFQUFFLFlBQVksQ0FBQyxhQUFhLENBQUMsY0FBYztnQkFDcEQsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3RCLENBQUM7WUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFsRWEsc0NBQWEsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFtRXpELCtCQUFDO0NBQUEsQUFwRUQsQ0FBdUMsUUFBUSxHQW9FOUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tIFwiLi91aS1zaWRlZHJhd2VyLmNvbW1vblwiO1xuaW1wb3J0ICogYXMgY29tbW9uTW9kdWxlIGZyb20gXCIuL3VpLXNpZGVkcmF3ZXIuY29tbW9uXCI7XG5pbXBvcnQgeyBWaWV3LCBpb3MgYXMgaW9zVmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdXRpbHMvdXRpbHNcIjtcbmltcG9ydCAqIGFzIGNvbG9yTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2NvbG9yXCI7XG5cbmRlY2xhcmUgdmFyIGV4cG9ydHM7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5leHBvcnQgY2xhc3MgUmFkU2lkZURyYXdlciBleHRlbmRzIGNvbW1vbk1vZHVsZS5SYWRTaWRlRHJhd2VyIHtcblxuICAgIHByaXZhdGUgX25hdGl2ZURlbGVnYXRlOiBUS1NpZGVEcmF3ZXJEZWxlZ2F0ZUltcGw7XG5cbiAgICBwcml2YXRlIF9pb3M6IFRLU2lkZURyYXdlclZpZXc7XG5cbiAgICBnZXQgaW9zKCk6IFRLU2lkZURyYXdlclZpZXcge1xuICAgICAgICByZXR1cm4gdGhpcy5faW9zO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RyYXdlckNvbnRyb2xsZXI6IGlvc1ZpZXcuVUlMYXlvdXRWaWV3Q29udHJvbGxlcjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBsZXQgc2NyZWVuID0gdXRpbHMuaW9zLmdldHRlcihVSVNjcmVlbiwgVUlTY3JlZW4ubWFpblNjcmVlbik7XG4gICAgICAgIHRoaXMuX2lvcyA9IFRLU2lkZURyYXdlclZpZXcuYWxsb2MoKS5pbml0V2l0aEZyYW1lKHNjcmVlbi5ib3VuZHMpO1xuXG4gICAgICAgIHRoaXMuX25hdGl2ZURlbGVnYXRlID0gVEtTaWRlRHJhd2VyRGVsZWdhdGVJbXBsLm5ldygpLmluaXRXaXRoT3duZXIodGhpcyk7XG5cbiAgICAgICAgdGhpcy5faW9zLmRlZmF1bHRTaWRlRHJhd2VyLndpZHRoID0gdGhpcy5kcmF3ZXJDb250ZW50U2l6ZTtcbiAgICAgICAgdGhpcy5faW9zLmRlZmF1bHRTaWRlRHJhd2VyLnN0eWxlLmJsdXJUeXBlID0gMDtcbiAgICAgICAgdGhpcy5faW9zLmRlZmF1bHRTaWRlRHJhd2VyLmhlYWRlclZpZXcgPSBudWxsO1xuICAgICAgICB0aGlzLl9pb3MuZGVmYXVsdFNpZGVEcmF3ZXIuZm9vdGVyVmlldyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lvcy5kZWZhdWx0U2lkZURyYXdlci5kZWxlZ2F0ZSA9IHRoaXMuX25hdGl2ZURlbGVnYXRlO1xuICAgICAgICB0aGlzLnNldFNoYWRvd0NvbG9yKHRoaXMuc2hhZG93Q29sb3IpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVOYXRpdmVWaWV3KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2lzUm9vdFZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuaW9zT3ZlcmZsb3dTYWZlQXJlYSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wYWdlLm9uKFwibmF2aWdhdGluZ0Zyb21cIiwgdGhpcy5vbk5hdmlnYXRpbmdGcm9tLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmlvcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzcG9zZU5hdGl2ZVZpZXcoKSB7XG4gICAgICAgIGlmICghdGhpcy5faXNSb290Vmlldykge1xuICAgICAgICAgICAgdGhpcy5wYWdlLm9mZihcIm5hdmlnYXRpbmdGcm9tXCIsIHRoaXMub25OYXZpZ2F0aW5nRnJvbSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTmF2aWdhdGluZ0Zyb20oYXJncykge1xuICAgICAgICBpZiAodGhpcy5nZXRJc09wZW4oKSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZURyYXdlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uTG9hZGVkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWRlZCgpO1xuXG4gICAgICAgIC8vIFRPRE86IFNlZSB3aHkgdGltZW91dCBpcyByZXF1aXJlZCB0byBzeW5jIHRoZSBiYWNrZ3JvdW5kQ29sb3IuXG4gICAgICAgIGlmICh0aGlzLl9pc1Jvb3RWaWV3KSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoPGFueT50aGlzLl9kcmF3ZXJDb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICg8YW55PnRoaXMuX2RyYXdlckNvbnRyb2xsZXIpLnZpZXcuYmFja2dyb3VuZENvbG9yID0gdGhpcy5kcmF3ZXJDb250ZW50ICYmIHRoaXMuZHJhd2VyQ29udGVudC5uYXRpdmVWaWV3UHJvdGVjdGVkLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvblVubG9hZGVkKCkge1xuICAgICAgICBzdXBlci5vblVubG9hZGVkKCk7XG4gICAgfVxuXG4gICAgLy8gZGF0YSBjaGFuZ2VkIGV2ZW50IGhhbmRsZXJzXG4gICAgcHJvdGVjdGVkIF9vbkRyYXdlckxvY2F0aW9uQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLlNpZGVEcmF3ZXJMb2NhdGlvbiwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5TaWRlRHJhd2VyTG9jYXRpb24pIHtcblxuICAgICAgICBpZiAoIW5ld1ZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldERyYXdlckxvY2F0aW9uKG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uU2hhZG93Q29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBjb2xvck1vZHVsZS5Db2xvciwgbmV3VmFsdWU6IGNvbG9yTW9kdWxlLkNvbG9yKSB7XG4gICAgICAgIHRoaXMuc2V0U2hhZG93Q29sb3IobmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0U2hhZG93Q29sb3IoY29sb3I6IGNvbG9yTW9kdWxlLkNvbG9yKSB7XG4gICAgICAgIHRoaXMuX2lvcy5kZWZhdWx0U2lkZURyYXdlci5zdHlsZS5zaGFkb3dNb2RlID0gMjtcbiAgICAgICAgdGhpcy5faW9zLmRlZmF1bHRTaWRlRHJhd2VyLnN0eWxlLmRpbU9wYWNpdHkgPSAwLjQyO1xuICAgICAgICB0aGlzLl9pb3MuZGVmYXVsdFNpZGVEcmF3ZXIuc3R5bGUuc2hhZG93UmFkaXVzID0gMDtcbiAgICAgICAgdGhpcy5faW9zLmRlZmF1bHRTaWRlRHJhd2VyLnN0eWxlLnNoYWRvd09wYWNpdHkgPSAxOyAvLyAwLTEsIGhpZ2hlciBpcyBkYXJrZXJcbiAgICAgICAgdGhpcy5faW9zLmRlZmF1bHRTaWRlRHJhd2VyLnN0eWxlLnNoYWRvd0NvbG9yID0gY29sb3IgPyBjb2xvci5pb3MgOiBSYWRTaWRlRHJhd2VyLnNoYWRvd0NvbG9yUHJvcGVydHkuZGVmYXVsdFZhbHVlLmlvcztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uR2VzdHVyZXNFbmFibGVkQ2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgbGV0IHZhbHVlID0gPGJvb2xlYW4+bmV3VmFsdWU7XG4gICAgICAgIHRoaXMuaW9zLmRlZmF1bHRTaWRlRHJhd2VyLmFsbG93R2VzdHVyZXMgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uQWxsb3dFZGdlU3dpcGVDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICBsZXQgdmFsdWUgPSA8Ym9vbGVhbj5uZXdWYWx1ZTtcblxuICAgICAgICB0aGlzLmlvcy5kZWZhdWx0U2lkZURyYXdlci5hbGxvd0VkZ2VTd2lwZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0RHJhd2VyTG9jYXRpb24obmV3TG9jYXRpb246IGNvbW1vbk1vZHVsZS5TaWRlRHJhd2VyTG9jYXRpb24pIHtcblxuICAgICAgICBzd2l0Y2ggKG5ld0xvY2F0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5TaWRlRHJhd2VyTG9jYXRpb24uTGVmdDpcbiAgICAgICAgICAgICAgICB0aGlzLl9pb3MuZGVmYXVsdFNpZGVEcmF3ZXIucG9zaXRpb24gPSBUS1NpZGVEcmF3ZXJQb3NpdGlvbi5MZWZ0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuU2lkZURyYXdlckxvY2F0aW9uLlJpZ2h0OlxuICAgICAgICAgICAgICAgIHRoaXMuX2lvcy5kZWZhdWx0U2lkZURyYXdlci5wb3NpdGlvbiA9IFRLU2lkZURyYXdlclBvc2l0aW9uLlJpZ2h0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuU2lkZURyYXdlckxvY2F0aW9uLlRvcDpcbiAgICAgICAgICAgICAgICB0aGlzLl9pb3MuZGVmYXVsdFNpZGVEcmF3ZXIucG9zaXRpb24gPSBUS1NpZGVEcmF3ZXJQb3NpdGlvbi5Ub3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5TaWRlRHJhd2VyTG9jYXRpb24uQm90dG9tOlxuICAgICAgICAgICAgICAgIHRoaXMuX2lvcy5kZWZhdWx0U2lkZURyYXdlci5wb3NpdGlvbiA9IFRLU2lkZURyYXdlclBvc2l0aW9uLkJvdHRvbTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVxdWVzdExheW91dCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25EcmF3ZXJDb250ZW50U2l6ZUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICBsZXQgdmFsdWU6IG51bWJlciA9IG5ld1ZhbHVlO1xuXG4gICAgICAgIHRoaXMuX2lvcy5kZWZhdWx0U2lkZURyYXdlci53aWR0aCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25EcmF3ZXJUcmFuc2l0aW9uQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkRyYXdlclRyYW5zaXRpb25CYXNlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkRyYXdlclRyYW5zaXRpb25CYXNlKSB7XG4gICAgICAgIGxldCB2YWx1ZTogY29tbW9uTW9kdWxlLkRyYXdlclRyYW5zaXRpb25CYXNlID0gbmV3VmFsdWU7XG4gICAgICAgIGxldCBmaW5hbFZhbDtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgc3dpdGNoICgodmFsdWUgYXMgc3RyaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRmFkZVRyYW5zaXRpb25TdHJpbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgZmluYWxWYWwgPSBuZXcgRmFkZVRyYW5zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLlB1c2hUcmFuc2l0aW9uU3RyaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsVmFsID0gbmV3IFB1c2hUcmFuc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5SZXZlYWxUcmFuc2l0aW9uU3RyaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsVmFsID0gbmV3IFJldmVhbFRyYW5zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLlJldmVyc2VTbGlkZU91dFRyYW5zaXRpb25TdHJpbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgZmluYWxWYWwgPSBuZXcgUmV2ZXJzZVNsaWRlT3V0VHJhbnNpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuU2NhbGVEb3duUHVzaGVyVHJhbnNpdGlvblN0cmluZzoge1xuICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbCA9IG5ldyBTY2FsZURvd25QdXNoZXJUcmFuc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5TY2FsZVVwVHJhbnNpdGlvblN0cmluZzoge1xuICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbCA9IG5ldyBTY2FsZVVwVHJhbnNpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuU2xpZGVBbG9uZ1RyYW5zaXRpb25TdHJpbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgZmluYWxWYWwgPSBuZXcgU2xpZGVBbG9uZ1RyYW5zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLlNsaWRlSW5PblRvcFRyYW5zaXRpb25TdHJpbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgZmluYWxWYWwgPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBOb3Qgc3VwcG9ydGVkIHZhbHVlIChcIiArIHZhbHVlICsgXCIpIHNldCB0byAnZHJhd2VyVHJhbnNpdGlvbidcIik7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsVmFsID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5kcmF3ZXJUcmFuc2l0aW9uICE9PSBmaW5hbFZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd2VyVHJhbnNpdGlvbiA9IGZpbmFsVmFsO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpbmFsVmFsID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pb3MuZGVmYXVsdFNpZGVEcmF3ZXIudHJhbnNpdGlvbiA9IGZpbmFsVmFsLmdldE5hdGl2ZUNvbnRlbnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uTWFpbkNvbnRlbnRDaGFuZ2VkKG9sZFZhbHVlOiBWaWV3LCBuZXdWYWx1ZTogVmlldykge1xuICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVZpZXcob2xkVmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRWaWV3KG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25EcmF3ZXJDb250ZW50Q2hhbmdlZChvbGRWYWx1ZTogVmlldywgbmV3VmFsdWU6IFZpZXcpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9kcmF3ZXJDb250cm9sbGVyID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVZpZXcob2xkVmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRWaWV3KG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBfbmF0aXZlVmlldygpOiBUS1NpZGVEcmF3ZXJWaWV3IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lvcztcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2VEcmF3ZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9pb3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2lvcy5kZWZhdWx0U2lkZURyYXdlci5kaXNtaXNzKCk7XG4gICAgICAgICAgICBzdXBlci5jbG9zZURyYXdlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dEcmF3ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pb3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2lvcy5kZWZhdWx0U2lkZURyYXdlci5zaG93KCk7XG4gICAgICAgICAgICBzdXBlci5zaG93RHJhd2VyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZWFjaENoaWxkVmlldyhjYWxsYmFjazogKGNoaWxkOiBWaWV3KSA9PiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IG1haW5Db250ZW50ID0gdGhpcy5tYWluQ29udGVudDtcbiAgICAgICAgaWYgKG1haW5Db250ZW50KSB7XG4gICAgICAgICAgICBjYWxsYmFjayhtYWluQ29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmF3ZXJDb250ZW50KSB7XG4gICAgICAgICAgICBjYWxsYmFjayh0aGlzLmRyYXdlckNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uTGF5b3V0KGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIEluIHRoZSBjYXNlIHdoZXJlIHRoZSBSYWRTaWRlRHJhd2VyIGlzIG5vdCByb290IHZpZXcgb2YgdGhlIGFwcFxuICAgICAgICAvLyBpdCBkb2Vzbid0IGhhdmUgYSB2aWV3Q29udHJvbGxlciBhbmQgY2hpbGRWaWV3Q29udHJvbGxlcnMuIEluIHRoaXMgY2FzZVxuICAgICAgICAvLyB0aGUgUmFkU2lkZURyYXdlciBtdXN0IGxheSBvdXQgaXRzIGNoaWxkcmVuIGRyYXdlckNvbnRlbnQgYW5kIG1haW5Db250ZW50XG4gICAgICAgIGlmICghdGhpcy52aWV3Q29udHJvbGxlcikge1xuICAgICAgICAgICAgbGV0IHdpZHRoID0gcmlnaHQgLSBsZWZ0O1xuICAgICAgICAgICAgbGV0IGhlaWdodCA9IGJvdHRvbSAtIHRvcDtcbiAgICAgICAgICAgIGxldCBzY3JlZW5XaWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgbGV0IHNjcmVlbkhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgICAgIGxldCBzY3JlZW4gPSB1dGlscy5pb3MuZ2V0dGVyKFVJU2NyZWVuLCBVSVNjcmVlbi5tYWluU2NyZWVuKTtcbiAgICAgICAgICAgIGxldCBkcmF3ZXJTaXplID0gdXRpbHMubGF5b3V0LnRvRGV2aWNlUGl4ZWxzKHRoaXMuZHJhd2VyQ29udGVudFNpemUpO1xuICAgICAgICAgICAgbGV0IHBvczogVEtTaWRlRHJhd2VyUG9zaXRpb24gPSB0aGlzLl9pb3MuZGVmYXVsdFNpZGVEcmF3ZXIucG9zaXRpb247XG4gICAgICAgICAgICBpZiAocG9zID09PSBUS1NpZGVEcmF3ZXJQb3NpdGlvbi5Ub3AgfHwgcG9zID09PSBUS1NpZGVEcmF3ZXJQb3NpdGlvbi5Cb3R0b20pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdlckNvbnRlbnQubGF5b3V0KDAsIDAsIHJpZ2h0LCBkcmF3ZXJTaXplKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3ZXJDb250ZW50LmxheW91dCgwLCAwLCBkcmF3ZXJTaXplLCBib3R0b20pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1haW5Db250ZW50LmxheW91dCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbk1lYXN1cmUod2lkdGhNZWFzdXJlU3BlYzogbnVtYmVyLCBoZWlnaHRNZWFzdXJlU3BlYzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGxldCBwb3M6IFRLU2lkZURyYXdlclBvc2l0aW9uID0gdGhpcy5faW9zLmRlZmF1bHRTaWRlRHJhd2VyLnBvc2l0aW9uO1xuICAgICAgICBsZXQgZHJhd2VyV2lkdGggPSB3aWR0aE1lYXN1cmVTcGVjO1xuICAgICAgICBsZXQgZHJhd2VySGVpZ2h0ID0gaGVpZ2h0TWVhc3VyZVNwZWM7XG4gICAgICAgIGxldCBkcmF3ZXJTaXplID0gdXRpbHMubGF5b3V0LnRvRGV2aWNlUGl4ZWxzKHRoaXMuZHJhd2VyQ29udGVudFNpemUpO1xuXG4gICAgICAgIGlmIChwb3MgPT09IFRLU2lkZURyYXdlclBvc2l0aW9uLlRvcCB8fCBwb3MgPT09IFRLU2lkZURyYXdlclBvc2l0aW9uLkJvdHRvbSkge1xuICAgICAgICAgICAgVmlldy5tZWFzdXJlQ2hpbGQodGhpcywgdGhpcy5kcmF3ZXJDb250ZW50LCBkcmF3ZXJXaWR0aCwgdXRpbHMubGF5b3V0Lm1ha2VNZWFzdXJlU3BlYyhkcmF3ZXJTaXplLCB1dGlscy5sYXlvdXQuRVhBQ1RMWSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgVmlldy5tZWFzdXJlQ2hpbGQodGhpcywgdGhpcy5kcmF3ZXJDb250ZW50LCB1dGlscy5sYXlvdXQubWFrZU1lYXN1cmVTcGVjKGRyYXdlclNpemUsIHV0aWxzLmxheW91dC5FWEFDVExZKSwgZHJhd2VySGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXN1bHQgPSBWaWV3Lm1lYXN1cmVDaGlsZCh0aGlzLCB0aGlzLm1haW5Db250ZW50LCB3aWR0aE1lYXN1cmVTcGVjLCBoZWlnaHRNZWFzdXJlU3BlYyk7XG4gICAgICAgIGxldCB3aWR0aCA9IHV0aWxzLmxheW91dC5nZXRNZWFzdXJlU3BlY1NpemUod2lkdGhNZWFzdXJlU3BlYyk7XG4gICAgICAgIGxldCB3aWR0aE1vZGUgPSB1dGlscy5sYXlvdXQuZ2V0TWVhc3VyZVNwZWNNb2RlKHdpZHRoTWVhc3VyZVNwZWMpO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gdXRpbHMubGF5b3V0LmdldE1lYXN1cmVTcGVjU2l6ZShoZWlnaHRNZWFzdXJlU3BlYyk7XG4gICAgICAgIGxldCBoZWlnaHRNb2RlID0gdXRpbHMubGF5b3V0LmdldE1lYXN1cmVTcGVjTW9kZShoZWlnaHRNZWFzdXJlU3BlYyk7XG4gICAgICAgIGxldCB3aWR0aEFuZFN0YXRlID0gVmlldy5yZXNvbHZlU2l6ZUFuZFN0YXRlKHJlc3VsdC5tZWFzdXJlZFdpZHRoLCB3aWR0aCwgd2lkdGhNb2RlLCAwKTtcbiAgICAgICAgbGV0IGhlaWdodEFuZFN0YXRlID0gVmlldy5yZXNvbHZlU2l6ZUFuZFN0YXRlKHJlc3VsdC5tZWFzdXJlZEhlaWdodCwgaGVpZ2h0LCBoZWlnaHRNb2RlLCAwKTtcbiAgICAgICAgdGhpcy5zZXRNZWFzdXJlZERpbWVuc2lvbih3aWR0aEFuZFN0YXRlLCBoZWlnaHRBbmRTdGF0ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIF9hZGRWaWV3VG9OYXRpdmVWaXN1YWxUcmVlKGNoaWxkOiBWaWV3LCBhdEluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgc3VwZXIuX2FkZFZpZXdUb05hdGl2ZVZpc3VhbFRyZWUoY2hpbGQsIGF0SW5kZXgpO1xuICAgICAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy52aWV3Q29udHJvbGxlcjtcblxuICAgICAgICBsZXQgY29udGVudCA9IGNoaWxkLm5hdGl2ZVZpZXdQcm90ZWN0ZWQ7XG5cbiAgICAgICAgaWYgKGNvbnRyb2xsZXIgJiYgIWNoaWxkLnZpZXdDb250cm9sbGVyKSB7XG4gICAgICAgICAgICBjaGlsZC52aWV3Q29udHJvbGxlciA9IGlvc1ZpZXcuVUlMYXlvdXRWaWV3Q29udHJvbGxlci5pbml0V2l0aE93bmVyKG5ldyBXZWFrUmVmKGNoaWxkKSk7XG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gY2hpbGQudmlld0NvbnRyb2xsZXIudmlldztcbiAgICAgICAgICAgIHZpZXcuYWRkU3VidmlldyhjaGlsZC5uYXRpdmVWaWV3UHJvdGVjdGVkKTtcbiAgICAgICAgICAgIGNvbnRlbnQgPSB2aWV3O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoaWxkID09PSB0aGlzLm1haW5Db250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9pb3Muc2V0TWFpblZpZXcoY29udGVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgPT09IHRoaXMuZHJhd2VyQ29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5faW9zLmRlZmF1bHRTaWRlRHJhd2VyLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2hpbGRDb250cm9sbGVyID0gY2hpbGQudmlld0NvbnRyb2xsZXI7XG4gICAgICAgIGlmIChjb250cm9sbGVyICYmIGNoaWxkQ29udHJvbGxlcikge1xuICAgICAgICAgICAgY29udHJvbGxlci5hZGRDaGlsZFZpZXdDb250cm9sbGVyKGNoaWxkQ29udHJvbGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gICAgICAgICAgICAgIFRSQU5TSVRJT05TXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZXhwb3J0IGNsYXNzIEZhZGVUcmFuc2l0aW9uIGV4dGVuZHMgY29tbW9uTW9kdWxlLkRyYXdlclRyYW5zaXRpb25CYXNlIHtcbiAgICBnZXROYXRpdmVDb250ZW50KCk6IGFueSB7XG4gICAgICAgIHJldHVybiBUS1NpZGVEcmF3ZXJUcmFuc2l0aW9uVHlwZS5GYWRlSW47XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHVzaFRyYW5zaXRpb24gZXh0ZW5kcyBjb21tb25Nb2R1bGUuRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgIGdldE5hdGl2ZUNvbnRlbnQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIFRLU2lkZURyYXdlclRyYW5zaXRpb25UeXBlLlB1c2g7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmV2ZWFsVHJhbnNpdGlvbiBleHRlbmRzIGNvbW1vbk1vZHVsZS5EcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XG4gICAgZ2V0TmF0aXZlQ29udGVudCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gVEtTaWRlRHJhd2VyVHJhbnNpdGlvblR5cGUuUmV2ZWFsO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJldmVyc2VTbGlkZU91dFRyYW5zaXRpb24gZXh0ZW5kcyBjb21tb25Nb2R1bGUuRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgIGdldE5hdGl2ZUNvbnRlbnQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIFRLU2lkZURyYXdlclRyYW5zaXRpb25UeXBlLlJldmVyc2VTbGlkZU91dDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTY2FsZURvd25QdXNoZXJUcmFuc2l0aW9uIGV4dGVuZHMgY29tbW9uTW9kdWxlLkRyYXdlclRyYW5zaXRpb25CYXNlIHtcbiAgICBnZXROYXRpdmVDb250ZW50KCk6IGFueSB7XG4gICAgICAgIHJldHVybiBUS1NpZGVEcmF3ZXJUcmFuc2l0aW9uVHlwZS5TY2FsZURvd25QdXNoZXI7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2NhbGVVcFRyYW5zaXRpb24gZXh0ZW5kcyBjb21tb25Nb2R1bGUuRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgIGdldE5hdGl2ZUNvbnRlbnQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIFRLU2lkZURyYXdlclRyYW5zaXRpb25UeXBlLlNjYWxlVXA7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2xpZGVBbG9uZ1RyYW5zaXRpb24gZXh0ZW5kcyBjb21tb25Nb2R1bGUuRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgIGdldE5hdGl2ZUNvbnRlbnQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIFRLU2lkZURyYXdlclRyYW5zaXRpb25UeXBlLlNsaWRlQWxvbmc7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiBleHRlbmRzIGNvbW1vbk1vZHVsZS5EcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XG4gICAgZ2V0TmF0aXZlQ29udGVudCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gVEtTaWRlRHJhd2VyVHJhbnNpdGlvblR5cGUuU2xpZGVJbk9uVG9wO1xuICAgIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyAgICAgIERlbGVnYXRlIGltcGxlbWVudGF0aW9uXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmNsYXNzIFRLU2lkZURyYXdlckRlbGVnYXRlSW1wbCBleHRlbmRzIE5TT2JqZWN0IGltcGxlbWVudHMgVEtTaWRlRHJhd2VyRGVsZWdhdGUge1xuICAgIHB1YmxpYyBzdGF0aWMgT2JqQ1Byb3RvY29scyA9IFtUS1NpZGVEcmF3ZXJEZWxlZ2F0ZV07XG5cbiAgICBzdGF0aWMgbmV3KCk6IFRLU2lkZURyYXdlckRlbGVnYXRlSW1wbCB7XG4gICAgICAgIHJldHVybiA8VEtTaWRlRHJhd2VyRGVsZWdhdGVJbXBsPnN1cGVyLm5ldygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX293bmVyOiBSYWRTaWRlRHJhd2VyO1xuXG4gICAgcHVibGljIGluaXRXaXRoT3duZXIob3duZXI6IFJhZFNpZGVEcmF3ZXIpOiBUS1NpZGVEcmF3ZXJEZWxlZ2F0ZUltcGwge1xuICAgICAgICB0aGlzLl9vd25lciA9IG93bmVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB3aWxsU2hvd1NpZGVEcmF3ZXIoc2lkZURyYXdlcjogVEtTaWRlRHJhd2VyKSB7XG4gICAgICAgIGlmICh0aGlzLl9vd25lci5oYXNMaXN0ZW5lcnMoY29tbW9uTW9kdWxlLlJhZFNpZGVEcmF3ZXIuZHJhd2VyT3BlbmluZ0V2ZW50KSkge1xuICAgICAgICAgICAgbGV0IGFyZ3M6IGNvbW1vbk1vZHVsZS5EcmF3ZXJTdGF0ZUNoYW5naW5nRXZlbnRBcmdzID0ge1xuICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogY29tbW9uTW9kdWxlLlJhZFNpZGVEcmF3ZXIuZHJhd2VyT3BlbmluZ0V2ZW50LFxuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5fb3duZXIsXG4gICAgICAgICAgICAgICAgcmV0dXJuVmFsdWU6IGZhbHNlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLl9vd25lci5ub3RpZnkoYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaWRTaG93U2lkZURyYXdlcihzaWRlRHJhd2VyOiBUS1NpZGVEcmF3ZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX293bmVyLmhhc0xpc3RlbmVycyhjb21tb25Nb2R1bGUuUmFkU2lkZURyYXdlci5kcmF3ZXJPcGVuZWRFdmVudCkpIHtcbiAgICAgICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuRHJhd2VyU3RhdGVDaGFuZ2VkRXZlbnRBcmdzID0ge1xuICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogY29tbW9uTW9kdWxlLlJhZFNpZGVEcmF3ZXIuZHJhd2VyT3BlbmVkRXZlbnQsXG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLl9vd25lcixcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuX293bmVyLm5vdGlmeShhcmdzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3aWxsRGlzbWlzc1NpZGVEcmF3ZXIoc2lkZURyYXdlcjogVEtTaWRlRHJhd2VyKSB7XG4gICAgICAgIGlmICh0aGlzLl9vd25lci5oYXNMaXN0ZW5lcnMoY29tbW9uTW9kdWxlLlJhZFNpZGVEcmF3ZXIuZHJhd2VyQ2xvc2luZ0V2ZW50KSkge1xuICAgICAgICAgICAgbGV0IGFyZ3M6IGNvbW1vbk1vZHVsZS5EcmF3ZXJTdGF0ZUNoYW5naW5nRXZlbnRBcmdzID0ge1xuICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogY29tbW9uTW9kdWxlLlJhZFNpZGVEcmF3ZXIuZHJhd2VyQ2xvc2luZ0V2ZW50LFxuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5fb3duZXIsXG4gICAgICAgICAgICAgICAgcmV0dXJuVmFsdWU6IGZhbHNlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLl9vd25lci5ub3RpZnkoYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGlkRGlzbWlzc1NpZGVEcmF3ZXIoc2lkZURyYXdlcjogVEtTaWRlRHJhd2VyKSB7XG4gICAgICAgIGlmICh0aGlzLl9vd25lci5oYXNMaXN0ZW5lcnMoY29tbW9uTW9kdWxlLlJhZFNpZGVEcmF3ZXIuZHJhd2VyQ2xvc2VkRXZlbnQpKSB7XG4gICAgICAgICAgICBsZXQgYXJnczogY29tbW9uTW9kdWxlLkRyYXdlclN0YXRlQ2hhbmdlZEV2ZW50QXJncyA9IHtcbiAgICAgICAgICAgICAgICBldmVudE5hbWU6IGNvbW1vbk1vZHVsZS5SYWRTaWRlRHJhd2VyLmRyYXdlckNsb3NlZEV2ZW50LFxuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5fb3duZXIsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLl9vd25lci5ub3RpZnkoYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaWRQYW5TaWRlRHJhd2VyKHNpZGVEcmF3ZXI6IFRLU2lkZURyYXdlcikge1xuICAgICAgICBpZiAodGhpcy5fb3duZXIuaGFzTGlzdGVuZXJzKGNvbW1vbk1vZHVsZS5SYWRTaWRlRHJhd2VyLmRyYXdlclBhbkV2ZW50KSkge1xuICAgICAgICAgICAgbGV0IGFyZ3M6IGNvbW1vbk1vZHVsZS5EcmF3ZXJTdGF0ZUNoYW5nZWRFdmVudEFyZ3MgPSB7XG4gICAgICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkU2lkZURyYXdlci5kcmF3ZXJQYW5FdmVudCxcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMuX293bmVyLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5fb3duZXIubm90aWZ5KGFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19