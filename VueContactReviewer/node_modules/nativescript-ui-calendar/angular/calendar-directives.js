"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var __1 = require("./../");
var element_registry_1 = require("nativescript-angular/element-registry");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var RadCalendarComponent = /** @class */ (function () {
    function RadCalendarComponent(_elementRef, _iterableDiffers) {
        this._elementRef = _elementRef;
        this._iterableDiffers = _iterableDiffers;
        this.doCheckDelay = 5;
        this._calendar = _elementRef.nativeElement;
    }
    Object.defineProperty(RadCalendarComponent.prototype, "eventSource", {
        set: function (value) {
            this._eventSource = value;
            var needDiffer = true;
            if (value instanceof observable_array_1.ObservableArray) {
                needDiffer = false;
            }
            if (needDiffer && !this._differ && CollectionUtils.isListLikeIterable(value)) {
                this._differ = this._iterableDiffers.find(this._eventSource).create(function (index, item) { return item; });
            }
            this._calendar.eventSource = this._eventSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCalendarComponent.prototype, "nativeElement", {
        get: function () {
            return this._calendar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCalendarComponent.prototype, "calendar", {
        get: function () {
            return this._calendar;
        },
        enumerable: true,
        configurable: true
    });
    RadCalendarComponent.prototype.ngDoCheck = function () {
        if (this._differ) {
            var changes = this._differ.diff(this._eventSource);
            if (changes) {
                this._calendar.reload();
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], RadCalendarComponent.prototype, "eventSource", null);
    RadCalendarComponent = __decorate([
        core_1.Component({
            selector: 'RadCalendar',
            template: '',
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __param(1, core_1.Inject(core_1.IterableDiffers)),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.IterableDiffers])
    ], RadCalendarComponent);
    return RadCalendarComponent;
}());
exports.RadCalendarComponent = RadCalendarComponent;
////////////////////
// Copied from angular 2 @angular/common/src/facade/collection
var CollectionUtils;
(function (CollectionUtils) {
    function isPresent(obj) {
        return obj !== undefined && obj !== null;
    }
    function isBlank(obj) {
        return obj === undefined || obj === null;
    }
    var _symbolIterator = null;
    var globalScope;
    function getSymbolIterator() {
        if (isBlank(_symbolIterator)) {
            if (isPresent(globalScope.Symbol) && isPresent(Symbol.iterator)) {
                _symbolIterator = Symbol.iterator;
            }
            else {
                // es6-shim specific logic
                var keys = Object.getOwnPropertyNames(Map.prototype);
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (key !== 'entries' && key !== 'size' &&
                        Map.prototype[key] === Map.prototype['entries']) {
                        _symbolIterator = key;
                    }
                }
            }
        }
        return _symbolIterator;
    }
    function isJsObject(o) {
        return o !== null && (typeof o === 'function' || typeof o === 'object');
    }
    function isArray(obj) {
        return Array.isArray(obj);
    }
    function isListLikeIterable(obj) {
        if (!isJsObject(obj))
            return false;
        return isArray(obj) ||
            (!(obj instanceof Map) && // JS Map are iterables but return entries as [k, v]
                getSymbolIterator() in obj); // JS Iterable have a Symbol.iterator prop
    }
    CollectionUtils.isListLikeIterable = isListLikeIterable;
})(CollectionUtils || (CollectionUtils = {}));
////////////////////
exports.CALENDAR_DIRECTIVES = [RadCalendarComponent];
if (!global.isCalendarRegistered) {
    element_registry_1.registerElement("RadCalendar", function () { return __1.RadCalendar; });
    global.isCalendarRegistered = true;
}
var NativeScriptUICalendarModule = /** @class */ (function () {
    function NativeScriptUICalendarModule() {
    }
    NativeScriptUICalendarModule = __decorate([
        core_1.NgModule({
            declarations: [exports.CALENDAR_DIRECTIVES],
            exports: [exports.CALENDAR_DIRECTIVES]
        })
    ], NativeScriptUICalendarModule);
    return NativeScriptUICalendarModule;
}());
exports.NativeScriptUICalendarModule = NativeScriptUICalendarModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhbGVuZGFyLWRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FTdUI7QUFFdkIsMkJBQW9DO0FBR3BDLDBFQUF3RTtBQUN4RSwyRUFBeUU7QUFNekU7SUFPSSw4QkFDZ0MsV0FBdUIsRUFDbEIsZ0JBQWlDO1FBRHRDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ2xCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFKOUQsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFNckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQy9DLENBQUM7SUFFUSxzQkFBSSw2Q0FBVzthQUFmLFVBQWdCLEtBQVU7WUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksS0FBSyxZQUFZLGtDQUFlLEVBQUU7Z0JBQ2xDLFVBQVUsR0FBRyxLQUFLLENBQUM7YUFDdEI7WUFFRCxJQUFJLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksZUFBZSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMxRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxJQUFJLElBQUssT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDLENBQUM7YUFDOUY7WUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ25ELENBQUM7OztPQUFBO0lBRUQsc0JBQVcsK0NBQWE7YUFBeEI7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywwQ0FBUTthQUFuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUVELHdDQUFTLEdBQVQ7UUFDSSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbkQsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUMzQjtTQUNKO0lBQ0wsQ0FBQztJQTdCUTtRQUFSLFlBQUssRUFBRTs7OzJEQVlQO0lBMUJRLG9CQUFvQjtRQUpoQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBU08sV0FBQSxhQUFNLENBQUMsaUJBQVUsQ0FBQyxDQUFBO1FBQ2xCLFdBQUEsYUFBTSxDQUFDLHNCQUFlLENBQUMsQ0FBQTt5Q0FEaUIsaUJBQVU7WUFDQSxzQkFBZTtPQVQ3RCxvQkFBb0IsQ0E0Q2hDO0lBQUQsMkJBQUM7Q0FBQSxBQTVDRCxJQTRDQztBQTVDWSxvREFBb0I7QUE4Q2pDLG9CQUFvQjtBQUNwQiw4REFBOEQ7QUFDOUQsSUFBVSxlQUFlLENBb0V4QjtBQXBFRCxXQUFVLGVBQWU7SUF1QnJCLFNBQVMsU0FBUyxDQUFDLEdBQVE7UUFDdkIsT0FBTyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUM7SUFDN0MsQ0FBQztJQUVELFNBQVMsT0FBTyxDQUFDLEdBQVE7UUFDckIsT0FBTyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUM7SUFDN0MsQ0FBQztJQUdELElBQUksZUFBZSxHQUFRLElBQUksQ0FBQztJQUNoQyxJQUFJLFdBQThCLENBQUM7SUFFbkMsU0FBUyxpQkFBaUI7UUFDdEIsSUFBSSxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDMUIsSUFBSSxTQUFTLENBQU8sV0FBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3BFLGVBQWUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO2FBQ3JDO2lCQUFNO2dCQUNILDBCQUEwQjtnQkFDMUIsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUU7b0JBQ2xDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsSUFBSSxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxNQUFNO3dCQUNsQyxHQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQzFELGVBQWUsR0FBRyxHQUFHLENBQUM7cUJBQ3pCO2lCQUNKO2FBQ0o7U0FDSjtRQUNELE9BQU8sZUFBZSxDQUFDO0lBQzNCLENBQUM7SUFFRCxTQUFTLFVBQVUsQ0FBQyxDQUFNO1FBQ3RCLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFVBQVUsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsU0FBUyxPQUFPLENBQUMsR0FBUTtRQUNyQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELFNBQWdCLGtCQUFrQixDQUFDLEdBQVE7UUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUNuQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksR0FBRyxDQUFDLElBQVMsb0RBQW9EO2dCQUMvRSxpQkFBaUIsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUUsMENBQTBDO0lBQ3BGLENBQUM7SUFMZSxrQ0FBa0IscUJBS2pDLENBQUE7QUFDTCxDQUFDLEVBcEVTLGVBQWUsS0FBZixlQUFlLFFBb0V4QjtBQUNELG9CQUFvQjtBQUVQLFFBQUEsbUJBQW1CLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRTFELElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUU7SUFDOUIsa0NBQWUsQ0FBQyxhQUFhLEVBQUUsY0FBTSxPQUFBLGVBQVcsRUFBWCxDQUFXLENBQUMsQ0FBQztJQUNsRCxNQUFNLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO0NBQ3RDO0FBTUQ7SUFBQTtJQUNBLENBQUM7SUFEWSw0QkFBNEI7UUFKeEMsZUFBUSxDQUFDO1lBQ04sWUFBWSxFQUFFLENBQUMsMkJBQW1CLENBQUM7WUFDbkMsT0FBTyxFQUFFLENBQUMsMkJBQW1CLENBQUM7U0FDakMsQ0FBQztPQUNXLDRCQUE0QixDQUN4QztJQUFELG1DQUFDO0NBQUEsQUFERCxJQUNDO0FBRFksb0VBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRG9DaGVjayxcbiAgICBJbnB1dCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEluamVjdCxcbiAgICBJdGVyYWJsZURpZmZlcnMsXG4gICAgSXRlcmFibGVEaWZmZXIsXG4gICAgTmdNb2R1bGVcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgUmFkQ2FsZW5kYXIgfSBmcm9tIFwiLi8uLi9cIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXknO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1JhZENhbGVuZGFyJyxcbiAgICB0ZW1wbGF0ZTogJycsXG59KVxuZXhwb3J0IGNsYXNzIFJhZENhbGVuZGFyQ29tcG9uZW50IGltcGxlbWVudHMgRG9DaGVjayB7XG4gICAgcHJpdmF0ZSBfY2FsZW5kYXI6IFJhZENhbGVuZGFyO1xuICAgIHByaXZhdGUgX2V2ZW50U291cmNlOiBhbnk7XG4gICAgcHJpdmF0ZSBfZGlmZmVyOiBJdGVyYWJsZURpZmZlcjxhbnk+O1xuICAgIHByaXZhdGUgdGltZXJJZDogbnVtYmVyO1xuICAgIHByaXZhdGUgZG9DaGVja0RlbGF5ID0gNTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIEBJbmplY3QoSXRlcmFibGVEaWZmZXJzKSBwcml2YXRlIF9pdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICApIHtcbiAgICAgICAgdGhpcy5fY2FsZW5kYXIgPSBfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBldmVudFNvdXJjZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX2V2ZW50U291cmNlID0gdmFsdWU7XG4gICAgICAgIGxldCBuZWVkRGlmZmVyID0gdHJ1ZTtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZUFycmF5KSB7XG4gICAgICAgICAgICBuZWVkRGlmZmVyID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmVlZERpZmZlciAmJiAhdGhpcy5fZGlmZmVyICYmIENvbGxlY3Rpb25VdGlscy5pc0xpc3RMaWtlSXRlcmFibGUodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLl9kaWZmZXIgPSB0aGlzLl9pdGVyYWJsZURpZmZlcnMuZmluZCh0aGlzLl9ldmVudFNvdXJjZSkuY3JlYXRlKChpbmRleCwgaXRlbSkgPT4gaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jYWxlbmRhci5ldmVudFNvdXJjZSA9IHRoaXMuX2V2ZW50U291cmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbmF0aXZlRWxlbWVudCgpOiBSYWRDYWxlbmRhciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWxlbmRhcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNhbGVuZGFyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXI7XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBpZiAodGhpcy5fZGlmZmVyKSB7XG4gICAgICAgICAgICBsZXQgY2hhbmdlcyA9IHRoaXMuX2RpZmZlci5kaWZmKHRoaXMuX2V2ZW50U291cmNlKTtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsZW5kYXIucmVsb2FkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBDb3BpZWQgZnJvbSBhbmd1bGFyIDIgQGFuZ3VsYXIvY29tbW9uL3NyYy9mYWNhZGUvY29sbGVjdGlvblxubmFtZXNwYWNlIENvbGxlY3Rpb25VdGlscyB7XG4gICAgaW50ZXJmYWNlIEJyb3dzZXJOb2RlR2xvYmFsIHtcbiAgICAgICAgT2JqZWN0OiB0eXBlb2YgT2JqZWN0O1xuICAgICAgICBBcnJheTogdHlwZW9mIEFycmF5O1xuICAgICAgICBNYXA6IHR5cGVvZiBNYXA7XG4gICAgICAgIFNldDogdHlwZW9mIFNldDtcbiAgICAgICAgRGF0ZTogRGF0ZUNvbnN0cnVjdG9yO1xuICAgICAgICBSZWdFeHA6IFJlZ0V4cENvbnN0cnVjdG9yO1xuICAgICAgICBKU09OOiB0eXBlb2YgSlNPTjtcbiAgICAgICAgTWF0aDogYW55OyAgLy8gdHlwZW9mIE1hdGg7XG4gICAgICAgIGFzc2VydChjb25kaXRpb246IGFueSk6IHZvaWQ7XG4gICAgICAgIFJlZmxlY3Q6IGFueTtcbiAgICAgICAgZ2V0QW5ndWxhclRlc3RhYmlsaXR5OiBGdW5jdGlvbjtcbiAgICAgICAgZ2V0QWxsQW5ndWxhclRlc3RhYmlsaXRpZXM6IEZ1bmN0aW9uO1xuICAgICAgICBnZXRBbGxBbmd1bGFyUm9vdEVsZW1lbnRzOiBGdW5jdGlvbjtcbiAgICAgICAgZnJhbWV3b3JrU3RhYmlsaXplcnM6IEFycmF5PEZ1bmN0aW9uPjtcbiAgICAgICAgc2V0VGltZW91dDogRnVuY3Rpb247XG4gICAgICAgIGNsZWFyVGltZW91dDogRnVuY3Rpb247XG4gICAgICAgIHNldEludGVydmFsOiBGdW5jdGlvbjtcbiAgICAgICAgY2xlYXJJbnRlcnZhbDogRnVuY3Rpb247XG4gICAgICAgIGVuY29kZVVSSTogRnVuY3Rpb247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNQcmVzZW50KG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBvYmogIT09IHVuZGVmaW5lZCAmJiBvYmogIT09IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNCbGFuayhvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsO1xuICAgIH1cblxuICAgIGRlY2xhcmUgdmFyIFN5bWJvbDogYW55O1xuICAgIGxldCBfc3ltYm9sSXRlcmF0b3I6IGFueSA9IG51bGw7XG4gICAgbGV0IGdsb2JhbFNjb3BlOiBCcm93c2VyTm9kZUdsb2JhbDtcblxuICAgIGZ1bmN0aW9uIGdldFN5bWJvbEl0ZXJhdG9yKCk6IHN0cmluZyB8IHN5bWJvbCB7XG4gICAgICAgIGlmIChpc0JsYW5rKF9zeW1ib2xJdGVyYXRvcikpIHtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoKDxhbnk+Z2xvYmFsU2NvcGUpLlN5bWJvbCkgJiYgaXNQcmVzZW50KFN5bWJvbC5pdGVyYXRvcikpIHtcbiAgICAgICAgICAgICAgICBfc3ltYm9sSXRlcmF0b3IgPSBTeW1ib2wuaXRlcmF0b3I7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGVzNi1zaGltIHNwZWNpZmljIGxvZ2ljXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE1hcC5wcm90b3R5cGUpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSAnZW50cmllcycgJiYga2V5ICE9PSAnc2l6ZScgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIChNYXAgYXMgYW55KS5wcm90b3R5cGVba2V5XSA9PT0gTWFwLnByb3RvdHlwZVsnZW50cmllcyddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfc3ltYm9sSXRlcmF0b3IgPSBrZXk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zeW1ib2xJdGVyYXRvcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0pzT2JqZWN0KG86IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbyAhPT0gbnVsbCAmJiAodHlwZW9mIG8gPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIG8gPT09ICdvYmplY3QnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0FycmF5KG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KG9iaik7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzTGlzdExpa2VJdGVyYWJsZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIWlzSnNPYmplY3Qob2JqKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gaXNBcnJheShvYmopIHx8XG4gICAgICAgICAgICAoIShvYmogaW5zdGFuY2VvZiBNYXApICYmICAgICAgLy8gSlMgTWFwIGFyZSBpdGVyYWJsZXMgYnV0IHJldHVybiBlbnRyaWVzIGFzIFtrLCB2XVxuICAgICAgICAgICAgICAgIGdldFN5bWJvbEl0ZXJhdG9yKCkgaW4gb2JqKTsgIC8vIEpTIEl0ZXJhYmxlIGhhdmUgYSBTeW1ib2wuaXRlcmF0b3IgcHJvcFxuICAgIH1cbn1cbi8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmV4cG9ydCBjb25zdCBDQUxFTkRBUl9ESVJFQ1RJVkVTID0gW1JhZENhbGVuZGFyQ29tcG9uZW50XTtcbmRlY2xhcmUgdmFyIGdsb2JhbDogYW55O1xuaWYgKCFnbG9iYWwuaXNDYWxlbmRhclJlZ2lzdGVyZWQpIHtcbiAgICByZWdpc3RlckVsZW1lbnQoXCJSYWRDYWxlbmRhclwiLCAoKSA9PiBSYWRDYWxlbmRhcik7XG4gICAgZ2xvYmFsLmlzQ2FsZW5kYXJSZWdpc3RlcmVkID0gdHJ1ZTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtDQUxFTkRBUl9ESVJFQ1RJVkVTXSxcbiAgICBleHBvcnRzOiBbQ0FMRU5EQVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgTmF0aXZlU2NyaXB0VUlDYWxlbmRhck1vZHVsZSB7XG59XG4iXX0=