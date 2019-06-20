"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var __1 = require("./..");
var page_1 = require("tns-core-modules/ui/page");
var element_registry_1 = require("nativescript-angular/element-registry");
var sideDrawerModule = require("./..");
var TKDRAWERCONTENT = "TKDrawerContent";
var TKMAINCONTENT = "TKMainContent";
/**
* This is the SideDrawer component. It separates your mobile app's screen
* into a main part and a menu part whereby the menu part is shown upon a swipe
* gesture using a transition effect.
*/
var RadSideDrawerComponent = /** @class */ (function () {
    function RadSideDrawerComponent(elementRef, page, viewContainer) {
        this.elementRef = elementRef;
        this.page = page;
        this.viewContainer = viewContainer;
        this.sideDrawerMovedToPage = false;
        this.drawerOpening = new core_1.EventEmitter();
        this.drawerOpen = new core_1.EventEmitter();
        this.drawerClosing = new core_1.EventEmitter();
        this.drawerClosed = new core_1.EventEmitter();
        this.sideDrawer = this.elementRef.nativeElement;
    }
    Object.defineProperty(RadSideDrawerComponent.prototype, "transition", {
        /**
          * [Deprecated: Please use the 'drawerTransition' property instead].
          */
        set: function (transition) {
            this.sideDrawer.drawerTransition = transition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadSideDrawerComponent.prototype, "nativeElement", {
        get: function () {
            return this.sideDrawer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadSideDrawerComponent.prototype, "drawerContentSize", {
        /**
          * Defines either the width or the height
          * of the menu pane depending on the location of the SideDrawer.
          * Top or Bottom - height, Right or Left - width.
          */
        set: function (value) {
            this._drawerContentSize = value;
            this.updateContentSize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadSideDrawerComponent.prototype, "gesturesEnabled", {
        set: function (value) {
            this._gesturesEnabled = value;
            this.updateGesturesEnabled();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadSideDrawerComponent.prototype, "drawerTransition", {
        set: function (value) {
            this._drawerTransition = value;
            this.updateDrawerTransition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadSideDrawerComponent.prototype, "drawerLocation", {
        set: function (value) {
            this._drawerLocation = value;
            this.updateDrawerLocation();
        },
        enumerable: true,
        configurable: true
    });
    RadSideDrawerComponent.prototype.updateDrawerLocation = function () {
        this.sideDrawer.drawerLocation = this._drawerLocation;
    };
    RadSideDrawerComponent.prototype.updateDrawerTransition = function () {
        this.sideDrawer.drawerTransition = this._drawerTransition;
    };
    RadSideDrawerComponent.prototype.updateGesturesEnabled = function () {
        this.sideDrawer.gesturesEnabled = this._gesturesEnabled;
    };
    RadSideDrawerComponent.prototype.updateContentSize = function () {
        this.sideDrawer.drawerContentSize = this._drawerContentSize;
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], RadSideDrawerComponent.prototype, "drawerOpening", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], RadSideDrawerComponent.prototype, "drawerOpen", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], RadSideDrawerComponent.prototype, "drawerClosing", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], RadSideDrawerComponent.prototype, "drawerClosed", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", sideDrawerModule.DrawerTransitionBase),
        __metadata("design:paramtypes", [sideDrawerModule.DrawerTransitionBase])
    ], RadSideDrawerComponent.prototype, "transition", null);
    RadSideDrawerComponent = __decorate([
        core_1.Component({
            selector: 'RadSideDrawer',
            template: "<ng-content></ng-content>"
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __param(1, core_1.Inject(page_1.Page)),
        __param(2, core_1.Inject(core_1.ViewContainerRef)),
        __metadata("design:paramtypes", [core_1.ElementRef,
            page_1.Page,
            core_1.ViewContainerRef])
    ], RadSideDrawerComponent);
    return RadSideDrawerComponent;
}());
exports.RadSideDrawerComponent = RadSideDrawerComponent;
/**
 * Directive identifying the drawer content.
 */
var TKDrawerContentDirective = /** @class */ (function () {
    function TKDrawerContentDirective(_elementRef) {
        this._elementRef = _elementRef;
        this._elementRef.nativeElement.id = TKDRAWERCONTENT;
    }
    TKDrawerContentDirective = __decorate([
        core_1.Directive({
            selector: "[tkDrawerContent]"
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], TKDrawerContentDirective);
    return TKDrawerContentDirective;
}());
exports.TKDrawerContentDirective = TKDrawerContentDirective;
/**
 * Directive identifying the main content.
 */
var TKMainContentDirective = /** @class */ (function () {
    function TKMainContentDirective(_elementRef) {
        this._elementRef = _elementRef;
        this._elementRef.nativeElement.id = TKMAINCONTENT;
    }
    TKMainContentDirective = __decorate([
        core_1.Directive({
            selector: "[tkMainContent]"
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], TKMainContentDirective);
    return TKMainContentDirective;
}());
exports.TKMainContentDirective = TKMainContentDirective;
var sideDrawerMeta = {
    insertChild: function (parent, child) {
        var drawer = parent;
        var childView = child;
        if (childView.id === TKMAINCONTENT) {
            drawer.mainContent = childView;
        }
        if (childView.id === TKDRAWERCONTENT) {
            drawer.drawerContent = childView;
        }
    },
    removeChild: function (parent, child) {
        var drawer = parent;
        var childView = child;
        if (childView.id === TKMAINCONTENT) {
            drawer.mainContent = null;
        }
        if (childView.id === TKDRAWERCONTENT) {
            drawer.drawerContent = null;
        }
    },
};
/**
 * Directives identifying the RadSideDrawer.
 */
exports.SIDEDRAWER_DIRECTIVES = [RadSideDrawerComponent, TKDrawerContentDirective, TKMainContentDirective];
if (!global.isSideDrawerRegistered) {
    element_registry_1.registerElement("RadSideDrawer", function () { return __1.RadSideDrawer; }, sideDrawerMeta);
    global.isSideDrawerRegistered = true;
}
/**
 * NgModule containing all of the RadSideDrawer directives.
 */
var NativeScriptUISideDrawerModule = /** @class */ (function () {
    function NativeScriptUISideDrawerModule() {
    }
    NativeScriptUISideDrawerModule = __decorate([
        core_1.NgModule({
            declarations: [exports.SIDEDRAWER_DIRECTIVES],
            exports: [exports.SIDEDRAWER_DIRECTIVES]
        })
    ], NativeScriptUISideDrawerModule);
    return NativeScriptUISideDrawerModule;
}());
exports.NativeScriptUISideDrawerModule = NativeScriptUISideDrawerModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1kcmF3ZXItZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpZGUtZHJhd2VyLWRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FZdUI7QUFDdkIsMEJBQXFDO0FBRXJDLGlEQUFnRDtBQUdoRCwwRUFJK0M7QUFDL0MsdUNBQXlDO0FBR3pDLElBQU0sZUFBZSxHQUFXLGlCQUFpQixDQUFDO0FBQ2xELElBQU0sYUFBYSxHQUFXLGVBQWUsQ0FBQztBQWE5Qzs7OztFQUlFO0FBS0Y7SUF5QkksZ0NBQytCLFVBQXNCLEVBQzNCLElBQVUsRUFDRSxhQUErQjtRQUZ0QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQzNCLFNBQUksR0FBSixJQUFJLENBQU07UUFDRSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFsQjdELDBCQUFxQixHQUFZLEtBQUssQ0FBQztRQUU5QixrQkFBYSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUN0RCxlQUFVLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ25ELGtCQUFhLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3RELGlCQUFZLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBZWxFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDcEQsQ0FBQztJQVZELHNCQUFJLDhDQUFVO1FBSmQ7O1lBRUk7YUFFSixVQUFlLFVBQWlEO1lBQzVELElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDO1FBQ2xELENBQUM7OztPQUFBO0lBVUQsc0JBQVcsaURBQWE7YUFBeEI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFPRCxzQkFBSSxxREFBaUI7UUFMckI7Ozs7WUFJSTthQUNKLFVBQXNCLEtBQWE7WUFDL0IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG1EQUFlO2FBQW5CLFVBQW9CLEtBQWM7WUFDOUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUM5QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNqQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG9EQUFnQjthQUFwQixVQUFxQixLQUFhO1lBQzlCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7WUFDL0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxrREFBYzthQUFsQixVQUFtQixLQUFhO1lBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBRU8scURBQW9CLEdBQTVCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEdBQVEsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUMvRCxDQUFDO0lBRU8sdURBQXNCLEdBQTlCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsR0FBUSxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbkUsQ0FBQztJQUVPLHNEQUFxQixHQUE3QjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUM1RCxDQUFDO0lBRU8sa0RBQWlCLEdBQXpCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDaEUsQ0FBQztJQWhFUztRQUFULGFBQU0sRUFBRTtrQ0FBdUIsbUJBQVk7aUVBQTJCO0lBQzdEO1FBQVQsYUFBTSxFQUFFO2tDQUFvQixtQkFBWTs4REFBMkI7SUFDMUQ7UUFBVCxhQUFNLEVBQUU7a0NBQXVCLG1CQUFZO2lFQUEyQjtJQUM3RDtRQUFULGFBQU0sRUFBRTtrQ0FBc0IsbUJBQVk7Z0VBQTJCO0lBTXRFO1FBREMsWUFBSyxFQUFFO2tDQUNtQixnQkFBZ0IsQ0FBQyxvQkFBb0I7eUNBQXJDLGdCQUFnQixDQUFDLG9CQUFvQjs0REFFL0Q7SUF2QlEsc0JBQXNCO1FBSmxDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsMkJBQTJCO1NBQ3hDLENBQUM7UUEyQk8sV0FBQSxhQUFNLENBQUMsaUJBQVUsQ0FBQyxDQUFBO1FBQ2xCLFdBQUEsYUFBTSxDQUFDLFdBQUksQ0FBQyxDQUFBO1FBQ1osV0FBQSxhQUFNLENBQUMsdUJBQWdCLENBQUMsQ0FBQTt5Q0FGYyxpQkFBVTtZQUNyQixXQUFJO1lBQ2lCLHVCQUFnQjtPQTVCNUQsc0JBQXNCLENBNkVsQztJQUFELDZCQUFDO0NBQUEsQUE3RUQsSUE2RUM7QUE3RVksd0RBQXNCO0FBK0VuQzs7R0FFRztBQUlIO0lBQ0ksa0NBQXlDLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQzVELElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEVBQUUsR0FBRyxlQUFlLENBQUM7SUFDeEQsQ0FBQztJQUhRLHdCQUF3QjtRQUhwQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG1CQUFtQjtTQUNoQyxDQUFDO1FBRWdCLFdBQUEsYUFBTSxDQUFDLGlCQUFVLENBQUMsQ0FBQTt5Q0FBc0IsaUJBQVU7T0FEdkQsd0JBQXdCLENBSXBDO0lBQUQsK0JBQUM7Q0FBQSxBQUpELElBSUM7QUFKWSw0REFBd0I7QUFNckM7O0dBRUc7QUFJSDtJQUNJLGdDQUF5QyxXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUM1RCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDO0lBQ3RELENBQUM7SUFIUSxzQkFBc0I7UUFIbEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxpQkFBaUI7U0FDOUIsQ0FBQztRQUVnQixXQUFBLGFBQU0sQ0FBQyxpQkFBVSxDQUFDLENBQUE7eUNBQXNCLGlCQUFVO09BRHZELHNCQUFzQixDQUlsQztJQUFELDZCQUFDO0NBQUEsQUFKRCxJQUlDO0FBSlksd0RBQXNCO0FBTW5DLElBQUksY0FBYyxHQUFrQjtJQUNoQyxXQUFXLEVBQUUsVUFBQyxNQUFjLEVBQUUsS0FBYTtRQUN2QyxJQUFNLE1BQU0sR0FBd0IsTUFBTyxDQUFDO1FBQzVDLElBQU0sU0FBUyxHQUFRLEtBQUssQ0FBQztRQUU3QixJQUFJLFNBQVMsQ0FBQyxFQUFFLEtBQUssYUFBYSxFQUFFO1lBQ2hDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxTQUFTLENBQUMsRUFBRSxLQUFLLGVBQWUsRUFBRTtZQUNsQyxNQUFNLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUNwQztJQUNMLENBQUM7SUFDRCxXQUFXLEVBQUUsVUFBQyxNQUFjLEVBQUUsS0FBYTtRQUN2QyxJQUFNLE1BQU0sR0FBd0IsTUFBTyxDQUFDO1FBQzVDLElBQU0sU0FBUyxHQUFRLEtBQUssQ0FBQztRQUU3QixJQUFJLFNBQVMsQ0FBQyxFQUFFLEtBQUssYUFBYSxFQUFFO1lBQ2hDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQzdCO1FBRUQsSUFBSSxTQUFTLENBQUMsRUFBRSxLQUFLLGVBQWUsRUFBRTtZQUNsQyxNQUFNLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUMvQjtJQUNMLENBQUM7Q0FDSixDQUFDO0FBRUY7O0dBRUc7QUFDVSxRQUFBLHFCQUFxQixHQUFHLENBQUMsc0JBQXNCLEVBQUUsd0JBQXdCLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztBQUdoSCxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFO0lBQ2hDLGtDQUFlLENBQUMsZUFBZSxFQUFFLGNBQU0sT0FBQSxpQkFBYSxFQUFiLENBQWEsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUN0RSxNQUFNLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO0NBQ3hDO0FBRUQ7O0dBRUc7QUFLSDtJQUFBO0lBQ0EsQ0FBQztJQURZLDhCQUE4QjtRQUoxQyxlQUFRLENBQUM7WUFDTixZQUFZLEVBQUUsQ0FBQyw2QkFBcUIsQ0FBQztZQUNyQyxPQUFPLEVBQUUsQ0FBQyw2QkFBcUIsQ0FBQztTQUNuQyxDQUFDO09BQ1csOEJBQThCLENBQzFDO0lBQUQscUNBQUM7Q0FBQSxBQURELElBQ0M7QUFEWSx3RUFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEluamVjdCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBFbWJlZGRlZFZpZXdSZWYsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBEaXJlY3RpdmUsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIE91dHB1dCxcbiAgICBOZ01vZHVsZVxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCIuLy4uXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgR3JpZExheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZ3JpZC1sYXlvdXRcIjtcbmltcG9ydCB7IFBsYWNlaG9sZGVyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGxhY2Vob2xkZXJcIjtcbmltcG9ydCB7XG4gICAgTmdWaWV3LFxuICAgIFZpZXdDbGFzc01ldGEsXG4gICAgcmVnaXN0ZXJFbGVtZW50LFxufSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xuaW1wb3J0ICogYXMgc2lkZURyYXdlck1vZHVsZSBmcm9tICcuLy4uJztcbmltcG9ydCB7IGdldERlZmF1bHRQYWdlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcGxhdGZvcm0tcHJvdmlkZXJzJztcblxuY29uc3QgVEtEUkFXRVJDT05URU5UOiBzdHJpbmcgPSBcIlRLRHJhd2VyQ29udGVudFwiO1xuY29uc3QgVEtNQUlOQ09OVEVOVDogc3RyaW5nID0gXCJUS01haW5Db250ZW50XCI7XG5cbi8qKlxuICogW0RlcHJlY2F0ZWQ6IFBsZWFzZSB1c2UgdGhlICdSYWRTaWRlRHJhd2VyJyBmcm9tICduYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyJ10uXG4gKi9cbmV4cG9ydCB0eXBlIFNpZGVEcmF3ZXJUeXBlID0gUmFkU2lkZURyYXdlciAmIFZpZXcgJiB7IHRvZ2dsZURyYXdlclN0YXRlOiAoKSA9PiB2b2lkIH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSXRlbUV2ZW50QXJncyB7XG4gICAgb2JqZWN0OiBhbnk7XG4gICAgdmlldzogRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gICAgcmV0dXJuVmFsdWU/OiBib29sZWFuO1xufVxuXG4vKipcbiogVGhpcyBpcyB0aGUgU2lkZURyYXdlciBjb21wb25lbnQuIEl0IHNlcGFyYXRlcyB5b3VyIG1vYmlsZSBhcHAncyBzY3JlZW5cbiogaW50byBhIG1haW4gcGFydCBhbmQgYSBtZW51IHBhcnQgd2hlcmVieSB0aGUgbWVudSBwYXJ0IGlzIHNob3duIHVwb24gYSBzd2lwZVxuKiBnZXN0dXJlIHVzaW5nIGEgdHJhbnNpdGlvbiBlZmZlY3QuXG4qL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdSYWRTaWRlRHJhd2VyJyxcbiAgICB0ZW1wbGF0ZTogXCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+XCJcbn0pXG5leHBvcnQgY2xhc3MgUmFkU2lkZURyYXdlckNvbXBvbmVudCB7XG4gICAgcHVibGljIHNpZGVEcmF3ZXI6IFJhZFNpZGVEcmF3ZXI7XG4gICAgcHVibGljIG1haW5UZW1wbGF0ZTogVGVtcGxhdGVSZWY8RWxlbWVudFJlZj47XG4gICAgcHVibGljIGRyYXdlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxFbGVtZW50UmVmPjtcblxuICAgIHByaXZhdGUgX2RyYXdlckNvbnRlbnRTaXplOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfZ2VzdHVyZXNFbmFibGVkOiBib29sZWFuO1xuICAgIHByaXZhdGUgX2RyYXdlclRyYW5zaXRpb246IHN0cmluZztcbiAgICBwcml2YXRlIF9kcmF3ZXJMb2NhdGlvbjogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBzaWRlRHJhd2VyTW92ZWRUb1BhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKSBwdWJsaWMgZHJhd2VyT3BlbmluZzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBkcmF3ZXJPcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIGRyYXdlckNsb3Npbmc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgZHJhd2VyQ2xvc2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAgKiBbRGVwcmVjYXRlZDogUGxlYXNlIHVzZSB0aGUgJ2RyYXdlclRyYW5zaXRpb24nIHByb3BlcnR5IGluc3RlYWRdLlxuICAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCB0cmFuc2l0aW9uKHRyYW5zaXRpb246IHNpZGVEcmF3ZXJNb2R1bGUuRHJhd2VyVHJhbnNpdGlvbkJhc2UpIHtcbiAgICAgICAgdGhpcy5zaWRlRHJhd2VyLmRyYXdlclRyYW5zaXRpb24gPSB0cmFuc2l0aW9uO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBASW5qZWN0KFBhZ2UpIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICAgICAgQEluamVjdChWaWV3Q29udGFpbmVyUmVmKSBwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcbiAgICApIHtcbiAgICAgICAgdGhpcy5zaWRlRHJhd2VyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBuYXRpdmVFbGVtZW50KCk6IFJhZFNpZGVEcmF3ZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zaWRlRHJhd2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAgKiBEZWZpbmVzIGVpdGhlciB0aGUgd2lkdGggb3IgdGhlIGhlaWdodFxuICAgICAgKiBvZiB0aGUgbWVudSBwYW5lIGRlcGVuZGluZyBvbiB0aGUgbG9jYXRpb24gb2YgdGhlIFNpZGVEcmF3ZXIuXG4gICAgICAqIFRvcCBvciBCb3R0b20gLSBoZWlnaHQsIFJpZ2h0IG9yIExlZnQgLSB3aWR0aC5cbiAgICAgICovXG4gICAgc2V0IGRyYXdlckNvbnRlbnRTaXplKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZHJhd2VyQ29udGVudFNpemUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb250ZW50U2l6ZSgpO1xuICAgIH1cblxuICAgIHNldCBnZXN0dXJlc0VuYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZ2VzdHVyZXNFbmFibGVkID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlR2VzdHVyZXNFbmFibGVkKCk7XG4gICAgfVxuXG4gICAgc2V0IGRyYXdlclRyYW5zaXRpb24odmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9kcmF3ZXJUcmFuc2l0aW9uID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlRHJhd2VyVHJhbnNpdGlvbigpO1xuICAgIH1cblxuICAgIHNldCBkcmF3ZXJMb2NhdGlvbih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2RyYXdlckxvY2F0aW9uID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlRHJhd2VyTG9jYXRpb24oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZURyYXdlckxvY2F0aW9uKCkge1xuICAgICAgICB0aGlzLnNpZGVEcmF3ZXIuZHJhd2VyTG9jYXRpb24gPSA8YW55PnRoaXMuX2RyYXdlckxvY2F0aW9uO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlRHJhd2VyVHJhbnNpdGlvbigpIHtcbiAgICAgICAgdGhpcy5zaWRlRHJhd2VyLmRyYXdlclRyYW5zaXRpb24gPSA8YW55PnRoaXMuX2RyYXdlclRyYW5zaXRpb247XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVHZXN0dXJlc0VuYWJsZWQoKSB7XG4gICAgICAgIHRoaXMuc2lkZURyYXdlci5nZXN0dXJlc0VuYWJsZWQgPSB0aGlzLl9nZXN0dXJlc0VuYWJsZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVDb250ZW50U2l6ZSgpIHtcbiAgICAgICAgdGhpcy5zaWRlRHJhd2VyLmRyYXdlckNvbnRlbnRTaXplID0gdGhpcy5fZHJhd2VyQ29udGVudFNpemU7XG4gICAgfVxufVxuXG4vKipcbiAqIERpcmVjdGl2ZSBpZGVudGlmeWluZyB0aGUgZHJhd2VyIGNvbnRlbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIlt0a0RyYXdlckNvbnRlbnRdXCJcbn0pXG5leHBvcnQgY2xhc3MgVEtEcmF3ZXJDb250ZW50RGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvciggQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pZCA9IFRLRFJBV0VSQ09OVEVOVDtcbiAgICB9XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIGlkZW50aWZ5aW5nIHRoZSBtYWluIGNvbnRlbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIlt0a01haW5Db250ZW50XVwiXG59KVxuZXhwb3J0IGNsYXNzIFRLTWFpbkNvbnRlbnREaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKCBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmlkID0gVEtNQUlOQ09OVEVOVDtcbiAgICB9XG59XG5cbmxldCBzaWRlRHJhd2VyTWV0YTogVmlld0NsYXNzTWV0YSA9IHtcbiAgICBpbnNlcnRDaGlsZDogKHBhcmVudDogTmdWaWV3LCBjaGlsZDogTmdWaWV3KSA9PiB7XG4gICAgICAgIGNvbnN0IGRyYXdlciA9IDxSYWRTaWRlRHJhd2VyPig8YW55PnBhcmVudCk7XG4gICAgICAgIGNvbnN0IGNoaWxkVmlldyA9IDxhbnk+Y2hpbGQ7XG5cbiAgICAgICAgaWYgKGNoaWxkVmlldy5pZCA9PT0gVEtNQUlOQ09OVEVOVCkge1xuICAgICAgICAgICAgZHJhd2VyLm1haW5Db250ZW50ID0gY2hpbGRWaWV3O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoaWxkVmlldy5pZCA9PT0gVEtEUkFXRVJDT05URU5UKSB7XG4gICAgICAgICAgICBkcmF3ZXIuZHJhd2VyQ29udGVudCA9IGNoaWxkVmlldztcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlQ2hpbGQ6IChwYXJlbnQ6IE5nVmlldywgY2hpbGQ6IE5nVmlldykgPT4ge1xuICAgICAgICBjb25zdCBkcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj4oPGFueT5wYXJlbnQpO1xuICAgICAgICBjb25zdCBjaGlsZFZpZXcgPSA8YW55PmNoaWxkO1xuXG4gICAgICAgIGlmIChjaGlsZFZpZXcuaWQgPT09IFRLTUFJTkNPTlRFTlQpIHtcbiAgICAgICAgICAgIGRyYXdlci5tYWluQ29udGVudCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hpbGRWaWV3LmlkID09PSBUS0RSQVdFUkNPTlRFTlQpIHtcbiAgICAgICAgICAgIGRyYXdlci5kcmF3ZXJDb250ZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuXG4vKipcbiAqIERpcmVjdGl2ZXMgaWRlbnRpZnlpbmcgdGhlIFJhZFNpZGVEcmF3ZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBTSURFRFJBV0VSX0RJUkVDVElWRVMgPSBbUmFkU2lkZURyYXdlckNvbXBvbmVudCwgVEtEcmF3ZXJDb250ZW50RGlyZWN0aXZlLCBUS01haW5Db250ZW50RGlyZWN0aXZlXTtcblxuZGVjbGFyZSB2YXIgZ2xvYmFsOiBhbnk7XG5pZiAoIWdsb2JhbC5pc1NpZGVEcmF3ZXJSZWdpc3RlcmVkKSB7XG4gICAgcmVnaXN0ZXJFbGVtZW50KFwiUmFkU2lkZURyYXdlclwiLCAoKSA9PiBSYWRTaWRlRHJhd2VyLCBzaWRlRHJhd2VyTWV0YSk7XG4gICAgZ2xvYmFsLmlzU2lkZURyYXdlclJlZ2lzdGVyZWQgPSB0cnVlO1xufVxuXG4vKipcbiAqIE5nTW9kdWxlIGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBSYWRTaWRlRHJhd2VyIGRpcmVjdGl2ZXMuXG4gKi9cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbU0lERURSQVdFUl9ESVJFQ1RJVkVTXSxcbiAgICBleHBvcnRzOiBbU0lERURSQVdFUl9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUge1xufVxuIl19