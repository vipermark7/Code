"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var color_1 = require("tns-core-modules/color");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var observable_1 = require("tns-core-modules/data/observable");
var weakEvents = require("tns-core-modules/ui/core/weak-event-listener");
var CalendarViewMode;
(function (CalendarViewMode) {
    CalendarViewMode["Week"] = "Week";
    CalendarViewMode["Month"] = "Month";
    CalendarViewMode["MonthNames"] = "MonthNames";
    CalendarViewMode["Year"] = "Year";
    CalendarViewMode["Day"] = "Day";
})(CalendarViewMode = exports.CalendarViewMode || (exports.CalendarViewMode = {}));
var CalendarSelectionShape;
(function (CalendarSelectionShape) {
    CalendarSelectionShape["Round"] = "Round";
    CalendarSelectionShape["Square"] = "Square";
    CalendarSelectionShape["None"] = "None";
})(CalendarSelectionShape = exports.CalendarSelectionShape || (exports.CalendarSelectionShape = {}));
var CalendarEventsViewMode;
(function (CalendarEventsViewMode) {
    CalendarEventsViewMode["None"] = "None";
    CalendarEventsViewMode["Inline"] = "Inline";
    CalendarEventsViewMode["Popover"] = "Popover";
})(CalendarEventsViewMode = exports.CalendarEventsViewMode || (exports.CalendarEventsViewMode = {}));
var CalendarSelectionMode;
(function (CalendarSelectionMode) {
    CalendarSelectionMode["None"] = "None";
    CalendarSelectionMode["Single"] = "Single";
    CalendarSelectionMode["Multiple"] = "Multiple";
    CalendarSelectionMode["Range"] = "Range";
})(CalendarSelectionMode = exports.CalendarSelectionMode || (exports.CalendarSelectionMode = {}));
var CalendarTransitionMode;
(function (CalendarTransitionMode) {
    CalendarTransitionMode["None"] = "None";
    CalendarTransitionMode["Slide"] = "Slide";
    CalendarTransitionMode["Stack"] = "Stack";
    CalendarTransitionMode["Flip"] = "Flip";
    CalendarTransitionMode["Fold"] = "Fold";
    CalendarTransitionMode["Float"] = "Float";
    CalendarTransitionMode["Rotate"] = "Rotate";
    CalendarTransitionMode["Plain"] = "Plain";
    CalendarTransitionMode["Free"] = "Free";
    CalendarTransitionMode["Combo"] = "Combo";
    CalendarTransitionMode["Overlap"] = "Overlap";
})(CalendarTransitionMode = exports.CalendarTransitionMode || (exports.CalendarTransitionMode = {}));
/**
 * Font styles
 */
var CalendarFontStyle;
(function (CalendarFontStyle) {
    /**
    * Regular font style
    */
    CalendarFontStyle["Normal"] = "Normal";
    /**
    * Bold font style
    */
    CalendarFontStyle["Bold"] = "Bold";
    /**
     * Italic font style
     */
    CalendarFontStyle["Italic"] = "Italic";
    /**
     * Combine Bold and Italic styles
     */
    CalendarFontStyle["BoldItalic"] = "BoldItalic";
})(CalendarFontStyle = exports.CalendarFontStyle || (exports.CalendarFontStyle = {}));
/**
* Defines the alignment options for cells in Calendar component.
*/
var CalendarCellAlignment;
(function (CalendarCellAlignment) {
    /**
     The cell content is aligned to left.
     */
    CalendarCellAlignment["Left"] = "Left";
    /**
     The cell content is aligned to right.
     */
    CalendarCellAlignment["Right"] = "Right";
    /**
     The cell content is aligned to top.
     */
    CalendarCellAlignment["Top"] = "Top";
    /**
     The cell content is aligned to bottom.
     */
    CalendarCellAlignment["Bottom"] = "Bottom";
    /**
     The cell content is aligned horizontally.
     */
    CalendarCellAlignment["HorizontalCenter"] = "HorizontalCenter";
    /**
     The cell content is aligned vertically.
     */
    CalendarCellAlignment["VerticalCenter"] = "VerticalCenter";
})(CalendarCellAlignment = exports.CalendarCellAlignment || (exports.CalendarCellAlignment = {}));
var DateRange = /** @class */ (function () {
    function DateRange(startDate, endDate) {
        this._startDate = startDate;
        this._endDate = endDate;
        this.normalize();
    }
    Object.defineProperty(DateRange.prototype, "startDate", {
        get: function () {
            return this._startDate;
        },
        set: function (value) {
            this._startDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRange.prototype, "endDate", {
        get: function () {
            return this._endDate;
        },
        set: function (value) {
            this._endDate = value;
        },
        enumerable: true,
        configurable: true
    });
    DateRange.prototype.normalize = function () {
        if (this._endDate < this._startDate) {
            var temp = this._endDate;
            this._endDate = this._startDate;
            this._startDate = temp;
        }
    };
    return DateRange;
}());
exports.DateRange = DateRange;
var CalendarEvent = /** @class */ (function () {
    function CalendarEvent(title, startDate, endDate, isAllDay, eventColor) {
        this.title = title;
        this.endDate = endDate;
        this.startDate = startDate;
        if (isAllDay) {
            this.isAllDay = isAllDay;
        }
        if (eventColor) {
            this.eventColor = eventColor;
        }
    }
    Object.defineProperty(CalendarEvent.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "title", {
        get: function () {
            return this._getTitle();
        },
        set: function (value) {
            this._setTitle(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "startDate", {
        get: function () {
            return this._getStartDate();
        },
        set: function (value) {
            this._setStartDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "endDate", {
        get: function () {
            return this._getEndDate();
        },
        set: function (value) {
            this._setEndDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "isAllDay", {
        get: function () {
            return this._getIsAllDay();
        },
        set: function (value) {
            this._setIsAllDay(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "eventColor", {
        get: function () {
            return this._getEventColor();
        },
        set: function (value) {
            this._setEventColor(value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarEvent.prototype._setIsAllDay = function (value) { };
    CalendarEvent.prototype._getIsAllDay = function () {
        return false;
    };
    CalendarEvent.prototype._setEndDate = function (date) { };
    CalendarEvent.prototype._getEndDate = function () {
        return undefined;
    };
    CalendarEvent.prototype._setStartDate = function (date) { };
    CalendarEvent.prototype._getStartDate = function () {
        return undefined;
    };
    CalendarEvent.prototype._setTitle = function (value) { };
    CalendarEvent.prototype._getTitle = function () {
        return undefined;
    };
    CalendarEvent.prototype._setEventColor = function (value) { };
    CalendarEvent.prototype._getEventColor = function () {
        return undefined;
    };
    return CalendarEvent;
}());
exports.CalendarEvent = CalendarEvent;
//////////////////////////////////////////////////////////////////////////////////////////
// <EventDataDefinitions>
var CalendarViewModeChangedEventData = /** @class */ (function () {
    function CalendarViewModeChangedEventData() {
    }
    return CalendarViewModeChangedEventData;
}());
exports.CalendarViewModeChangedEventData = CalendarViewModeChangedEventData;
var CalendarCellTapEventData = /** @class */ (function () {
    function CalendarCellTapEventData() {
    }
    return CalendarCellTapEventData;
}());
exports.CalendarCellTapEventData = CalendarCellTapEventData;
var CalendarSelectionEventData = /** @class */ (function () {
    function CalendarSelectionEventData() {
    }
    return CalendarSelectionEventData;
}());
exports.CalendarSelectionEventData = CalendarSelectionEventData;
var CalendarInlineEventSelectedData = /** @class */ (function () {
    function CalendarInlineEventSelectedData() {
    }
    return CalendarInlineEventSelectedData;
}());
exports.CalendarInlineEventSelectedData = CalendarInlineEventSelectedData;
var CalendarDayViewEventSelectedData = /** @class */ (function () {
    function CalendarDayViewEventSelectedData() {
    }
    return CalendarDayViewEventSelectedData;
}());
exports.CalendarDayViewEventSelectedData = CalendarDayViewEventSelectedData;
var CalendarNavigationEventData = /** @class */ (function () {
    function CalendarNavigationEventData() {
    }
    return CalendarNavigationEventData;
}());
exports.CalendarNavigationEventData = CalendarNavigationEventData;
var CalendarMonthViewStyle = /** @class */ (function (_super) {
    __extends(CalendarMonthViewStyle, _super);
    function CalendarMonthViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarMonthViewStyle.prototype.updateViewStyles = function (forceUpdate) {
    };
    CalendarMonthViewStyle.prototype.onSelectionShapePropertyChanged = function (oldValue, newValue) {
        this.onSelectionShapeChanged(oldValue, newValue);
    };
    CalendarMonthViewStyle.prototype.onSelectionShapeChanged = function (oldValue, newValue) { };
    CalendarMonthViewStyle.prototype.onSelectionShapeSizePropertyChanged = function (oldValue, newValue) {
        this.onSelectionShapeSizeChanged(oldValue, newValue);
    };
    CalendarMonthViewStyle.prototype.onSelectionShapeSizeChanged = function (oldValue, newValue) { };
    CalendarMonthViewStyle.prototype.onSelectionShapeColorPropertyChanged = function (oldValue, newValue) {
        this.onSelectionShapeColorChanged(oldValue, newValue);
    };
    CalendarMonthViewStyle.prototype.onSelectionShapeColorChanged = function (oldValue, newValue) { };
    CalendarMonthViewStyle.prototype.onShowWeekNumbersPropertyChanged = function (oldValue, newValue) {
        this.onShowWeekNumbersChanged(oldValue, newValue);
    };
    CalendarMonthViewStyle.prototype.onShowWeekNumbersChanged = function (oldValue, newValue) { };
    CalendarMonthViewStyle.prototype.onShowTitlePropertyChanged = function (oldValue, newValue) {
        this.onShowTitleChanged(oldValue, newValue);
    };
    CalendarMonthViewStyle.prototype.onShowTitleChanged = function (oldValue, newValue) { };
    CalendarMonthViewStyle.prototype.onShowDayNamesPropertyChanged = function (oldValue, newValue) {
        this.onShowDayNamesChanged(oldValue, newValue);
    };
    CalendarMonthViewStyle.prototype.onShowDayNamesChanged = function (oldValue, newValue) { };
    CalendarMonthViewStyle.prototype.onCellBackgroundColorPropertyChanged = function (oldValue, newValue) {
        this.onBackgroundColorChanged(oldValue, newValue);
    };
    CalendarMonthViewStyle.prototype.onBackgroundColorChanged = function (oldValue, newValue) { };
    CalendarMonthViewStyle.prototype.onDayCellStylePropertyChanged = function (oldValue, newValue) {
        this.onDayCellStyleChanged(oldValue, newValue);
    };
    CalendarMonthViewStyle.prototype.onDayCellStyleChanged = function (oldValue, newValue) { };
    CalendarMonthViewStyle.prototype.onSelectedDayCellStylePropertyChanged = function (oldValue, newValue) {
        this.onSelectedDayCellStyleChanged(oldValue, newValue);
    };
    CalendarMonthViewStyle.prototype.onSelectedDayCellStyleChanged = function (oldValue, newValue) { };
    CalendarMonthViewStyle.prototype.onTodayCellStylePropertyChanged = function (oldValue, newValue) {
        this.onTodayCellStyleChanged(oldValue, newValue);
    };
    CalendarMonthViewStyle.prototype.onTodayCellStyleChanged = function (oldValue, newValue) { };
    CalendarMonthViewStyle.prototype.onDayNameCellStylePropertyChanged = function (oldValue, newValue) {
        this.onDayNameCellStyleChanged(oldValue, newValue);
    };
    CalendarMonthViewStyle.prototype.onDayNameCellStyleChanged = function (oldValue, newValue) { };
    CalendarMonthViewStyle.prototype.onWeekNumberCellStylePropertyChanged = function (oldValue, newValue) {
        this.onWeekNumberCellStyleChanged(oldValue, newValue);
    };
    CalendarMonthViewStyle.prototype.onWeekNumberCellStyleChanged = function (oldValue, newValue) { };
    CalendarMonthViewStyle.prototype.onWeekendCellStylePropertyChanged = function (oldValue, newValue) {
        this.onWeekendCellStyleChanged(oldValue, newValue);
    };
    CalendarMonthViewStyle.prototype.onWeekendCellStyleChanged = function (oldValue, newValue) { };
    CalendarMonthViewStyle.prototype.onTitleCellStylePropertyChanged = function (oldValue, newValue) {
        this.onTitleCellStyleChanged(oldValue, newValue);
    };
    CalendarMonthViewStyle.prototype.onTitleCellStyleChanged = function (oldValue, newValue) { };
    CalendarMonthViewStyle.prototype.onInlineEventCellStylePropertyChanged = function (oldValue, newValue) {
        this.onInlineEventCellStyleChanged(oldValue, newValue);
    };
    CalendarMonthViewStyle.prototype.onInlineEventCellStyleChanged = function (oldValue, newValue) { };
    CalendarMonthViewStyle.showWeekNumbersProperty = new view_1.Property({
        name: "showWeekNumbers",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onShowWeekNumbersPropertyChanged(oldValue, newValue);
        },
    });
    CalendarMonthViewStyle.selectionShapeProperty = new view_1.Property({
        name: "selectionShape",
        defaultValue: undefined,
        valueConverter: function (value) { return CalendarSelectionShape[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onSelectionShapePropertyChanged(oldValue, newValue);
        },
    });
    CalendarMonthViewStyle.selectionShapeSizeProperty = new view_1.Property({
        name: "selectionShapeSize",
        defaultValue: 15,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onSelectionShapeSizePropertyChanged(oldValue, newValue);
        },
    });
    CalendarMonthViewStyle.selectionShapeColorProperty = new view_1.Property({
        name: "selectionShapeColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onSelectionShapeColorPropertyChanged(oldValue, newValue);
        },
    });
    CalendarMonthViewStyle.showTitleProperty = new view_1.Property({
        name: "showTitle",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onShowTitlePropertyChanged(oldValue, newValue);
        },
    });
    CalendarMonthViewStyle.showDayNamesProperty = new view_1.Property({
        name: "showDayNames",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onShowDayNamesPropertyChanged(oldValue, newValue);
        },
    });
    CalendarMonthViewStyle.backgroundColorProperty = new view_1.Property({
        name: "backgroundColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onCellBackgroundColorPropertyChanged(oldValue, newValue);
        },
    });
    CalendarMonthViewStyle.dayCellStyleProperty = new view_1.Property({
        name: "dayCellStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onDayCellStylePropertyChanged(oldValue, newValue);
        },
    });
    CalendarMonthViewStyle.selectedDayCellStyleProperty = new view_1.Property({
        name: "selectedDayCellStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onSelectedDayCellStylePropertyChanged(oldValue, newValue);
        },
    });
    CalendarMonthViewStyle.todayCellStyleProperty = new view_1.Property({
        name: "todayCellStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onTodayCellStylePropertyChanged(oldValue, newValue);
        },
    });
    CalendarMonthViewStyle.dayNameCellStyleProperty = new view_1.Property({
        name: "dayNameCellStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onDayNameCellStylePropertyChanged(oldValue, newValue);
        },
    });
    CalendarMonthViewStyle.weekNumberCellStyleProperty = new view_1.Property({
        name: "weekNumberCellStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onWeekNumberCellStylePropertyChanged(oldValue, newValue);
        },
    });
    CalendarMonthViewStyle.weekendCellStyleProperty = new view_1.Property({
        name: "weekendCellStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onWeekendCellStylePropertyChanged(oldValue, newValue);
        },
    });
    CalendarMonthViewStyle.titleCellStyleProperty = new view_1.Property({
        name: "titleCellStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onTitleCellStylePropertyChanged(oldValue, newValue);
        },
    });
    CalendarMonthViewStyle.inlineEventCellStyleProperty = new view_1.Property({
        name: "inlineEventCellStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onInlineEventCellStylePropertyChanged(oldValue, newValue);
        },
    });
    return CalendarMonthViewStyle;
}(view_1.ViewBase));
exports.CalendarMonthViewStyle = CalendarMonthViewStyle;
CalendarMonthViewStyle.showWeekNumbersProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.selectionShapeProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.selectionShapeSizeProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.selectionShapeColorProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.showTitleProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.showDayNamesProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.backgroundColorProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.dayCellStyleProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.selectedDayCellStyleProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.todayCellStyleProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.dayNameCellStyleProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.weekNumberCellStyleProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.weekendCellStyleProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.titleCellStyleProperty.register(CalendarMonthViewStyle);
CalendarMonthViewStyle.inlineEventCellStyleProperty.register(CalendarMonthViewStyle);
//////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Style class for Week view mode
 */
var CalendarWeekViewStyle = /** @class */ (function (_super) {
    __extends(CalendarWeekViewStyle, _super);
    function CalendarWeekViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CalendarWeekViewStyle;
}(CalendarMonthViewStyle));
exports.CalendarWeekViewStyle = CalendarWeekViewStyle;
//////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Style class for Day view mode
 */
var CalendarDayViewStyle = /** @class */ (function (_super) {
    __extends(CalendarDayViewStyle, _super);
    function CalendarDayViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarDayViewStyle.prototype.onShowWeekPropertyChanged = function (oldValue, newValue) {
        this.onShowWeekChanged(oldValue, newValue);
    };
    CalendarDayViewStyle.prototype.onShowWeekChanged = function (oldValue, newValue) { };
    CalendarDayViewStyle.prototype.onDayEventsViewStylePropertyChanged = function (oldValue, newValue) {
        this.onDayEventsViewStyleChanged(oldValue, newValue);
    };
    CalendarDayViewStyle.prototype.onDayEventsViewStyleChanged = function (oldValue, newValue) { };
    CalendarDayViewStyle.prototype.onAllDayEventsViewStylePropertyChanged = function (oldValue, newValue) {
        this.onAllDayEventsViewStyleChanged(oldValue, newValue);
    };
    CalendarDayViewStyle.prototype.onAllDayEventsViewStyleChanged = function (oldValue, newValue) { };
    CalendarDayViewStyle.showWeekProperty = new view_1.Property({
        name: "showWeek",
        defaultValue: true,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onShowWeekPropertyChanged(oldValue, newValue);
        },
    });
    CalendarDayViewStyle.dayEventsViewStyleProperty = new view_1.Property({
        name: "dayEventsViewStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onDayEventsViewStylePropertyChanged(oldValue, newValue);
        },
    });
    CalendarDayViewStyle.allDayEventsViewStyleProperty = new view_1.Property({
        name: "allDayEventsViewStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onAllDayEventsViewStylePropertyChanged(oldValue, newValue);
        },
    });
    return CalendarDayViewStyle;
}(CalendarWeekViewStyle));
exports.CalendarDayViewStyle = CalendarDayViewStyle;
CalendarDayViewStyle.showWeekProperty.register(CalendarDayViewStyle);
CalendarDayViewStyle.dayEventsViewStyleProperty.register(CalendarDayViewStyle);
CalendarDayViewStyle.allDayEventsViewStyleProperty.register(CalendarDayViewStyle);
//////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Style class for Year view mode
 */
var CalendarYearViewStyle = /** @class */ (function (_super) {
    __extends(CalendarYearViewStyle, _super);
    function CalendarYearViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarYearViewStyle.prototype.onTitleCellStylePropertyChanged = function (oldValue, newValue) {
        this.onTitleCellStyleChanged(oldValue, newValue);
    };
    CalendarYearViewStyle.prototype.onTitleCellStyleChanged = function (oldValue, newValue) {
    };
    CalendarYearViewStyle.prototype.onMonthCellStylePropertyChanged = function (oldValue, newValue) {
        this.onMonthCellStyleChanged(oldValue, newValue);
    };
    CalendarYearViewStyle.prototype.onMonthCellStyleChanged = function (oldValue, newValue) {
    };
    CalendarYearViewStyle.titleCellStyleProperty = new view_1.Property({
        name: "titleCellStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onTitleCellStylePropertyChanged(oldValue, newValue);
        },
    });
    CalendarYearViewStyle.monthCellStyleProperty = new view_1.Property({
        name: "monthCellStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onMonthCellStylePropertyChanged(oldValue, newValue);
        },
    });
    return CalendarYearViewStyle;
}(view_1.ViewBase));
exports.CalendarYearViewStyle = CalendarYearViewStyle;
CalendarYearViewStyle.titleCellStyleProperty.register(CalendarYearViewStyle);
CalendarYearViewStyle.monthCellStyleProperty.register(CalendarYearViewStyle);
//////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Style class for year view with month names only view mode
 */
var CalendarMonthNamesViewStyle = /** @class */ (function (_super) {
    __extends(CalendarMonthNamesViewStyle, _super);
    function CalendarMonthNamesViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarMonthNamesViewStyle.prototype.onTitleCellStylePropertyChanged = function (oldValue, newValue) {
        this.onTitleCellStyleChanged(oldValue, newValue);
    };
    CalendarMonthNamesViewStyle.prototype.onTitleCellStyleChanged = function (oldValue, newValue) {
    };
    CalendarMonthNamesViewStyle.prototype.onMonthNameCellStylePropertyChanged = function (oldValue, newValue) {
        this.onMonthNameCellStyleChanged(oldValue, newValue);
    };
    CalendarMonthNamesViewStyle.prototype.onMonthNameCellStyleChanged = function (oldValue, newValue) {
    };
    CalendarMonthNamesViewStyle.titleCellStyleProperty = new view_1.Property({
        name: "titleCellStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onTitleCellStylePropertyChanged(oldValue, newValue);
        },
    });
    CalendarMonthNamesViewStyle.monthNameCellStyleProperty = new view_1.Property({
        name: "monthNameCellStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onMonthNameCellStylePropertyChanged(oldValue, newValue);
        },
    });
    return CalendarMonthNamesViewStyle;
}(view_1.ViewBase));
exports.CalendarMonthNamesViewStyle = CalendarMonthNamesViewStyle;
CalendarMonthNamesViewStyle.titleCellStyleProperty.register(CalendarMonthNamesViewStyle);
CalendarMonthNamesViewStyle.monthNameCellStyleProperty.register(CalendarMonthNamesViewStyle);
/**
 * The style class with customization properties for months in year view
 * Note: this class is not inherited from CellStyle
 */
var MonthCellStyle = /** @class */ (function (_super) {
    __extends(MonthCellStyle, _super);
    function MonthCellStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonthCellStyle.prototype.onWeekendТextColorPropertyChanged = function (oldValue, newValue) {
        this.onWeekendTextColorChanged(oldValue, newValue);
    };
    MonthCellStyle.prototype.onWeekendTextColorChanged = function (oldValue, newValue) {
    };
    MonthCellStyle.prototype.onTodayТextColorPropertyChanged = function (oldValue, newValue) {
        this.onTodayTextColorChanged(oldValue, newValue);
    };
    MonthCellStyle.prototype.onTodayTextColorChanged = function (oldValue, newValue) {
    };
    MonthCellStyle.prototype.onDayТextColorPropertyChanged = function (oldValue, newValue) {
        this.onDayTextColorChanged(oldValue, newValue);
    };
    MonthCellStyle.prototype.onDayTextColorChanged = function (oldValue, newValue) {
    };
    MonthCellStyle.prototype.onDayFontNamePropertyChanged = function (oldValue, newValue) {
        this.onDayFontNameChanged(oldValue, newValue);
    };
    MonthCellStyle.prototype.onDayFontNameChanged = function (oldValue, newValue) {
    };
    MonthCellStyle.prototype.onDayFontStylePropertyChanged = function (oldValue, newValue) {
        this.onDayFontStyleChanged(oldValue, newValue);
    };
    MonthCellStyle.prototype.onDayFontStyleChanged = function (oldValue, newValue) {
    };
    MonthCellStyle.prototype.onDayTextSizePropertyChanged = function (oldValue, newValue) {
        this.onDayTextSizeChanged(oldValue, newValue);
    };
    MonthCellStyle.prototype.onDayTextSizeChanged = function (oldValue, newValue) {
    };
    MonthCellStyle.prototype.onDayNameТextColorPropertyChanged = function (oldValue, newValue) {
        this.onDayNameTextColorChanged(oldValue, newValue);
    };
    MonthCellStyle.prototype.onDayNameTextColorChanged = function (oldValue, newValue) {
    };
    MonthCellStyle.prototype.onDayNameFontNamePropertyChanged = function (oldValue, newValue) {
        this.onDayNameFontNameChanged(oldValue, newValue);
    };
    MonthCellStyle.prototype.onDayNameFontNameChanged = function (oldValue, newValue) {
    };
    MonthCellStyle.prototype.onDayNameFontStylePropertyChanged = function (oldValue, newValue) {
        this.onDayNameFontStyleChanged(oldValue, newValue);
    };
    MonthCellStyle.prototype.onDayNameFontStyleChanged = function (oldValue, newValue) {
    };
    MonthCellStyle.prototype.onDayNameTextSizePropertyChanged = function (oldValue, newValue) {
        this.onDayNameTextSizeChanged(oldValue, newValue);
    };
    MonthCellStyle.prototype.onDayNameTextSizeChanged = function (oldValue, newValue) {
    };
    MonthCellStyle.prototype.onMonthNameТextColorPropertyChanged = function (oldValue, newValue) {
        this.onMonthNameTextColorChanged(oldValue, newValue);
    };
    MonthCellStyle.prototype.onMonthNameTextColorChanged = function (oldValue, newValue) {
    };
    MonthCellStyle.prototype.onMonthNameFontNamePropertyChanged = function (oldValue, newValue) {
        this.onMonthNameFontNameChanged(oldValue, newValue);
    };
    MonthCellStyle.prototype.onMonthNameFontNameChanged = function (oldValue, newValue) {
    };
    MonthCellStyle.prototype.onMonthNameFontStylePropertyChanged = function (oldValue, newValue) {
        this.onMonthNameFontStyleChanged(oldValue, newValue);
    };
    MonthCellStyle.prototype.onMonthNameFontStyleChanged = function (oldValue, newValue) {
    };
    MonthCellStyle.prototype.onMonthNameTextSizePropertyChanged = function (oldValue, newValue) {
        this.onMonthNameTextSizeChanged(oldValue, newValue);
    };
    MonthCellStyle.prototype.onMonthNameTextSizeChanged = function (oldValue, newValue) {
    };
    MonthCellStyle.weekendTextColorProperty = new view_1.Property({
        name: "weekendTextColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onWeekendТextColorPropertyChanged(oldValue, newValue);
        },
    });
    MonthCellStyle.todayTextColorProperty = new view_1.Property({
        name: "todayTextColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onTodayТextColorPropertyChanged(oldValue, newValue);
        },
    });
    MonthCellStyle.dayTextColorProperty = new view_1.Property({
        name: "dayTextColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onDayТextColorPropertyChanged(oldValue, newValue);
        },
    });
    MonthCellStyle.dayFontNameProperty = new view_1.Property({
        name: "dayFontName",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onDayFontNamePropertyChanged(oldValue, newValue);
        },
    });
    MonthCellStyle.dayFontStyleProperty = new view_1.Property({
        name: "dayFontStyle",
        defaultValue: undefined,
        valueConverter: function (value) { return CalendarFontStyle[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onDayFontStylePropertyChanged(oldValue, newValue);
        },
    });
    MonthCellStyle.dayTextSizeProperty = new view_1.Property({
        name: "dayTextSize",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onDayTextSizePropertyChanged(oldValue, newValue);
        },
    });
    // Day name properties
    MonthCellStyle.dayNameTextColorProperty = new view_1.Property({
        name: "dayNameTextColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onDayNameТextColorPropertyChanged(oldValue, newValue);
        },
    });
    MonthCellStyle.dayNameFontNameProperty = new view_1.Property({
        name: "dayNameFontName",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onDayNameFontNamePropertyChanged(oldValue, newValue);
        },
    });
    MonthCellStyle.dayNameFontStyleProperty = new view_1.Property({
        name: "dayNameFontStyle",
        defaultValue: undefined,
        valueConverter: function (value) { return CalendarFontStyle[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onDayNameFontStylePropertyChanged(oldValue, newValue);
        },
    });
    MonthCellStyle.dayNameTextSizeProperty = new view_1.Property({
        name: "dayNameTextSize",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onDayNameTextSizePropertyChanged(oldValue, newValue);
        },
    });
    /// Month name properties
    MonthCellStyle.monthNameTextColorProperty = new view_1.Property({
        name: "monthNameTextColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onMonthNameТextColorPropertyChanged(oldValue, newValue);
        },
    });
    MonthCellStyle.monthNameFontNameProperty = new view_1.Property({
        name: "monthNameFontName",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onMonthNameFontNamePropertyChanged(oldValue, newValue);
        },
    });
    MonthCellStyle.monthNameFontStyleProperty = new view_1.Property({
        name: "monthNameFontStyle",
        defaultValue: undefined,
        valueConverter: function (value) { return CalendarFontStyle[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onMonthNameFontStylePropertyChanged(oldValue, newValue);
        },
    });
    MonthCellStyle.monthNameTextSizeProperty = new view_1.Property({
        name: "monthNameTextSize",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onMonthNameTextSizePropertyChanged(oldValue, newValue);
        },
    });
    return MonthCellStyle;
}(view_1.ViewBase));
exports.MonthCellStyle = MonthCellStyle;
MonthCellStyle.weekendTextColorProperty.register(MonthCellStyle);
MonthCellStyle.todayTextColorProperty.register(MonthCellStyle);
MonthCellStyle.dayTextColorProperty.register(MonthCellStyle);
MonthCellStyle.dayFontNameProperty.register(MonthCellStyle);
MonthCellStyle.dayFontStyleProperty.register(MonthCellStyle);
MonthCellStyle.dayTextSizeProperty.register(MonthCellStyle);
MonthCellStyle.dayNameTextColorProperty.register(MonthCellStyle);
MonthCellStyle.dayNameFontNameProperty.register(MonthCellStyle);
MonthCellStyle.dayNameFontStyleProperty.register(MonthCellStyle);
MonthCellStyle.dayNameTextSizeProperty.register(MonthCellStyle);
MonthCellStyle.monthNameTextColorProperty.register(MonthCellStyle);
MonthCellStyle.monthNameFontNameProperty.register(MonthCellStyle);
MonthCellStyle.monthNameFontStyleProperty.register(MonthCellStyle);
MonthCellStyle.monthNameTextSizeProperty.register(MonthCellStyle);
////////////////////////////////////////////////
/// Cell styles
// properties left to implement but available only in iOS :  shapeStroke , shapeFill, shape
var CellStyle = /** @class */ (function (_super) {
    __extends(CellStyle, _super);
    function CellStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CellStyle.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellStyle.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    CellStyle.prototype.onCellBorderWidthPropertyChanged = function (oldValue, newValue) {
        this.onCellBorderWidthChanged(oldValue, newValue);
    };
    CellStyle.prototype.onCellBorderWidthChanged = function (oldValue, newValue) { };
    CellStyle.prototype.onCellBorderColorPropertyChanged = function (oldValue, newValue) {
        this.onCellBorderColorChanged(oldValue, newValue);
    };
    CellStyle.prototype.onCellBorderColorChanged = function (oldValue, newValue) { };
    CellStyle.prototype.onCellBackgroundColorPropertyChanged = function (oldValue, newValue) {
        this.onCellBackgroundColorChanged(oldValue, newValue);
    };
    CellStyle.prototype.onCellBackgroundColorChanged = function (oldValue, newValue) { };
    CellStyle.prototype.onCellAlignmentPropertyChanged = function (oldValue, newValue) {
        this.onCellAlignmentChanged(oldValue, newValue);
    };
    CellStyle.prototype.onCellAlignmentChanged = function (oldValue, newValue) { };
    CellStyle.prototype.onCellТextColorPropertyChanged = function (oldValue, newValue) {
        this.onCellTextColorChanged(oldValue, newValue);
    };
    CellStyle.prototype.onCellTextColorChanged = function (oldValue, newValue) {
    };
    CellStyle.prototype.onCellTextFontNamePropertyChanged = function (oldValue, newValue) {
        this.onCellTextFontNameChanged(oldValue, newValue);
    };
    CellStyle.prototype.onCellTextFontNameChanged = function (oldValue, newValue) {
    };
    CellStyle.prototype.onCellTextFontStylePropertyChanged = function (oldValue, newValue) {
        this.onCellTextFontStyleChanged(oldValue, newValue);
    };
    CellStyle.prototype.onCellTextFontStyleChanged = function (oldValue, newValue) {
    };
    CellStyle.prototype.onCellTextSizePropertyChanged = function (oldValue, newValue) {
        this.onCellTextSizeChanged(oldValue, newValue);
    };
    CellStyle.prototype.onCellTextSizeChanged = function (oldValue, newValue) {
    };
    CellStyle.prototype.onCellPaddingHorizontalPropertyChanged = function (oldValue, newValue) {
        this.onCellPaddingHorizontalChanged(oldValue, newValue);
    };
    CellStyle.prototype.onCellPaddingHorizontalChanged = function (oldValue, newValue) {
    };
    CellStyle.prototype.onCellPaddingVerticalPropertyChanged = function (oldValue, newValue) {
        this.onCellPaddingVerticalChanged(oldValue, newValue);
    };
    CellStyle.prototype.onCellPaddingVerticalChanged = function (oldValue, newValue) {
    };
    CellStyle.cellBorderWidthProperty = new view_1.Property({
        name: "cellBorderWidth",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onCellBorderWidthPropertyChanged(oldValue, newValue);
        },
    });
    CellStyle.cellBorderColorProperty = new view_1.Property({
        name: "cellBorderColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onCellBorderColorPropertyChanged(oldValue, newValue);
        },
    });
    CellStyle.cellBackgroundColorProperty = new view_1.Property({
        name: "cellBackgroundColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onCellBackgroundColorPropertyChanged(oldValue, newValue);
        },
    });
    CellStyle.cellAlignmentProperty = new view_1.Property({
        name: "cellAlignment",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onCellAlignmentPropertyChanged(oldValue, newValue);
        },
    });
    CellStyle.cellTextColorProperty = new view_1.Property({
        name: "cellTextColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onCellТextColorPropertyChanged(oldValue, newValue);
        },
    });
    CellStyle.cellTextFontNameProperty = new view_1.Property({
        name: "cellTextFontName",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onCellTextFontNamePropertyChanged(oldValue, newValue);
        },
    });
    CellStyle.cellTextFontStyleProperty = new view_1.Property({
        name: "cellTextFontStyle",
        defaultValue: undefined,
        valueConverter: function (value) { return CalendarFontStyle[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onCellTextFontStylePropertyChanged(oldValue, newValue);
        },
    });
    CellStyle.cellTextSizeProperty = new view_1.Property({
        name: "cellTextSize",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onCellTextSizePropertyChanged(oldValue, newValue);
        },
    });
    CellStyle.cellPaddingHorizontalProperty = new view_1.Property({
        name: "cellPaddingHorizontal",
        defaultValue: undefined,
        valueConverter: parseInt,
        valueChanged: function (target, oldValue, newValue) {
            target.onCellPaddingHorizontalPropertyChanged(oldValue, newValue);
        },
    });
    CellStyle.cellPaddingVerticalProperty = new view_1.Property({
        name: "cellPaddingVertical",
        defaultValue: undefined,
        valueConverter: parseInt,
        valueChanged: function (target, oldValue, newValue) {
            target.onCellPaddingVerticalPropertyChanged(oldValue, newValue);
        },
    });
    return CellStyle;
}(view_1.ViewBase));
exports.CellStyle = CellStyle;
CellStyle.cellBorderWidthProperty.register(CellStyle);
CellStyle.cellBorderColorProperty.register(CellStyle);
CellStyle.cellBackgroundColorProperty.register(CellStyle);
CellStyle.cellAlignmentProperty.register(CellStyle);
CellStyle.cellTextColorProperty.register(CellStyle);
CellStyle.cellTextFontNameProperty.register(CellStyle);
CellStyle.cellTextFontStyleProperty.register(CellStyle);
CellStyle.cellTextSizeProperty.register(CellStyle);
CellStyle.cellPaddingHorizontalProperty.register(CellStyle);
CellStyle.cellPaddingVerticalProperty.register(CellStyle);
////////////////////////////////////////////////
/// Day Events View style
var DayEventsViewStyle = /** @class */ (function (_super) {
    __extends(DayEventsViewStyle, _super);
    function DayEventsViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DayEventsViewStyle.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayEventsViewStyle.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    DayEventsViewStyle.prototype.onBackgroundColorPropertyChanged = function (oldValue, newValue) {
        this.onBackgroundColorChanged(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.onBackgroundColorChanged = function (oldValue, newValue) {
    };
    DayEventsViewStyle.prototype.onTimeLabelFormatPropertyChanged = function (oldValue, newValue) {
        this.onTimeLabelFormatChanged(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.onTimeLabelFormatChanged = function (oldValue, newValue) {
    };
    DayEventsViewStyle.prototype.onTimeLabelTextColorPropertyChanged = function (oldValue, newValue) {
        this.onTimeLabelTextColorChanged(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.onTimeLabelTextColorChanged = function (oldValue, newValue) {
    };
    DayEventsViewStyle.prototype.onTimeLabelFontNamePropertyChanged = function (oldValue, newValue) {
        this.onTimeLabelFontNameChanged(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.onTimeLabelFontNameChanged = function (oldValue, newValue) {
    };
    DayEventsViewStyle.prototype.onTimeLabelFontStylePropertyChanged = function (oldValue, newValue) {
        this.onTimeLabelFontStyleChanged(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.onTimeLabelFontStyleChanged = function (oldValue, newValue) {
    };
    DayEventsViewStyle.prototype.onTimeLabelTextSizePropertyChanged = function (oldValue, newValue) {
        this.onTimeLabelTextSizeChanged(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.onTimeLabelTextSizeChanged = function (oldValue, newValue) {
    };
    DayEventsViewStyle.prototype.onTimeLinesWidthPropertyChanged = function (oldValue, newValue) {
        this.onTimeLinesWidthChanged(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.onTimeLinesWidthChanged = function (oldValue, newValue) {
    };
    DayEventsViewStyle.prototype.onTimeLinesColorPropertyChanged = function (oldValue, newValue) {
        this.onTimeLinesColorChanged(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.onTimeLinesColorChanged = function (oldValue, newValue) {
    };
    DayEventsViewStyle.backgroundColorProperty = new view_1.Property({
        name: "backgroundColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onBackgroundColorPropertyChanged(oldValue, newValue);
        },
    });
    DayEventsViewStyle.timeLabelFormatProperty = new view_1.Property({
        name: "timeLabelFormat",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onTimeLabelFormatPropertyChanged(oldValue, newValue);
        },
    });
    DayEventsViewStyle.timeLabelTextColorProperty = new view_1.Property({
        name: "timeLabelTextColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onTimeLabelTextColorPropertyChanged(oldValue, newValue);
        },
    });
    DayEventsViewStyle.timeLabelFontNameProperty = new view_1.Property({
        name: "timeLabelFontName",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onTimeLabelFontNamePropertyChanged(oldValue, newValue);
        },
    });
    DayEventsViewStyle.timeLabelFontStyleProperty = new view_1.Property({
        name: "timeLabelFontStyle",
        defaultValue: undefined,
        valueConverter: function (value) { return CalendarFontStyle[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onTimeLabelFontStylePropertyChanged(oldValue, newValue);
        },
    });
    DayEventsViewStyle.timeLabelTextSizeProperty = new view_1.Property({
        name: "timeLabelTextSize",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onTimeLabelTextSizePropertyChanged(oldValue, newValue);
        },
    });
    DayEventsViewStyle.timeLinesWidthProperty = new view_1.Property({
        name: "timeLinesWidth",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onTimeLinesWidthPropertyChanged(oldValue, newValue);
        },
    });
    DayEventsViewStyle.timeLinesColorProperty = new view_1.Property({
        name: "timeLinesColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onTimeLinesColorPropertyChanged(oldValue, newValue);
        },
    });
    return DayEventsViewStyle;
}(view_1.ViewBase));
exports.DayEventsViewStyle = DayEventsViewStyle;
DayEventsViewStyle.backgroundColorProperty.register(DayEventsViewStyle);
DayEventsViewStyle.timeLabelFormatProperty.register(DayEventsViewStyle);
DayEventsViewStyle.timeLabelTextColorProperty.register(DayEventsViewStyle);
DayEventsViewStyle.timeLabelFontNameProperty.register(DayEventsViewStyle);
DayEventsViewStyle.timeLabelFontStyleProperty.register(DayEventsViewStyle);
DayEventsViewStyle.timeLabelTextSizeProperty.register(DayEventsViewStyle);
DayEventsViewStyle.timeLinesWidthProperty.register(DayEventsViewStyle);
DayEventsViewStyle.timeLinesColorProperty.register(DayEventsViewStyle);
////////////////////////////////////////////////
/// All Day View style
var AllDayEventsViewStyle = /** @class */ (function (_super) {
    __extends(AllDayEventsViewStyle, _super);
    function AllDayEventsViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AllDayEventsViewStyle.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AllDayEventsViewStyle.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    AllDayEventsViewStyle.prototype.onBackgroundColorPropertyChanged = function (oldValue, newValue) {
        this.onBackgroundColorChanged(oldValue, newValue);
    };
    AllDayEventsViewStyle.prototype.onBackgroundColorChanged = function (oldValue, newValue) {
    };
    AllDayEventsViewStyle.prototype.onAllDayTextPropertyChanged = function (oldValue, newValue) {
        this.onAllDayTextChanged(oldValue, newValue);
    };
    AllDayEventsViewStyle.prototype.onAllDayTextChanged = function (oldValue, newValue) {
    };
    AllDayEventsViewStyle.prototype.onAllDayTextIsVisiblePropertyChanged = function (oldValue, newValue) {
        this.onAlDayTextIsVisibleChanged(oldValue, newValue);
    };
    AllDayEventsViewStyle.prototype.onAlDayTextIsVisibleChanged = function (oldValue, newValue) {
    };
    AllDayEventsViewStyle.ALL_DAY_TEXT = "ALL-DAY";
    AllDayEventsViewStyle.backgroundColorProperty = new view_1.Property({
        name: "backgroundColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onBackgroundColorPropertyChanged(oldValue, newValue);
        },
    });
    AllDayEventsViewStyle.allDayTextProperty = new view_1.Property({
        name: "allDayText",
        defaultValue: AllDayEventsViewStyle.ALL_DAY_TEXT,
        valueChanged: function (target, oldValue, newValue) {
            target.onAllDayTextPropertyChanged(oldValue, newValue);
        },
    });
    AllDayEventsViewStyle.allDayTextIsVisibleProperty = new view_1.Property({
        name: "allDayTextIsVisible",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onAllDayTextIsVisiblePropertyChanged(oldValue, newValue);
        },
    });
    return AllDayEventsViewStyle;
}(view_1.ViewBase));
exports.AllDayEventsViewStyle = AllDayEventsViewStyle;
AllDayEventsViewStyle.backgroundColorProperty.register(AllDayEventsViewStyle);
AllDayEventsViewStyle.allDayTextProperty.register(AllDayEventsViewStyle);
AllDayEventsViewStyle.allDayTextIsVisibleProperty.register(AllDayEventsViewStyle);
////////////////////////////////////////////////////////////////////////////////////////////////////
//  DayCellStyle
////////////////////////////////////////////////////////////////////////////////////////////////////
// properties available in ios only: allDayEventTextColor, eventAlignment, eventSpacing, eventShape, eventOrientation, stretchEvents, maxEventsCount, wrapEventText
var DayCellStyle = /** @class */ (function (_super) {
    __extends(DayCellStyle, _super);
    function DayCellStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DayCellStyle.prototype.onShowEventsTextPropertyChanged = function (oldValue, newValue) {
        this.onShowEventsTextChanged(oldValue, newValue);
    };
    DayCellStyle.prototype.onShowEventsTextChanged = function (oldValue, newValue) { };
    DayCellStyle.prototype.onEventTextColorPropertyChanged = function (oldValue, newValue) {
        this.onEventTextColorChanged(oldValue, newValue);
    };
    DayCellStyle.prototype.onEventTextColorChanged = function (oldValue, newValue) { };
    DayCellStyle.prototype.onEventFontNamePropertyChanged = function (oldValue, newValue) {
        this.onEventFontNameChanged(oldValue, newValue);
    };
    DayCellStyle.prototype.onEventFontNameChanged = function (oldValue, newValue) { };
    DayCellStyle.prototype.onEventFontStylePropertyChanged = function (oldValue, newValue) {
        this.onEventFontStyleChanged(oldValue, newValue);
    };
    DayCellStyle.prototype.onEventFontStyleChanged = function (oldValue, newValue) { };
    DayCellStyle.prototype.onEventTextSizePropertyChanged = function (oldValue, newValue) {
        this.onEventTextSizeChanged(oldValue, newValue);
    };
    DayCellStyle.prototype.onEventTextSizeChanged = function (oldValue, newValue) {
    };
    DayCellStyle.showEventsTextProperty = new view_1.Property({
        name: "showEventsText",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onShowEventsTextPropertyChanged(oldValue, newValue);
        },
    });
    DayCellStyle.eventTextColorProperty = new view_1.Property({
        name: "eventTextColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onEventTextColorPropertyChanged(oldValue, newValue);
        },
    });
    DayCellStyle.eventFontNameProperty = new view_1.Property({
        name: "eventFontName",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onEventFontNamePropertyChanged(oldValue, newValue);
        },
    });
    DayCellStyle.eventFontStyleProperty = new view_1.Property({
        name: "eventFontStyle",
        defaultValue: undefined,
        valueConverter: function (value) { return CalendarFontStyle[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onEventFontStylePropertyChanged(oldValue, newValue);
        },
    });
    DayCellStyle.eventTextSizeProperty = new view_1.Property({
        name: "eventTextSize",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onEventTextSizePropertyChanged(oldValue, newValue);
        },
    });
    return DayCellStyle;
}(CellStyle));
exports.DayCellStyle = DayCellStyle;
DayCellStyle.showEventsTextProperty.register(DayCellStyle);
DayCellStyle.eventTextColorProperty.register(DayCellStyle);
DayCellStyle.eventFontNameProperty.register(DayCellStyle);
DayCellStyle.eventFontStyleProperty.register(DayCellStyle);
DayCellStyle.eventTextSizeProperty.register(DayCellStyle);
/**
 * Cell style class for inline events cells in month view
 */
// missing for ios: separatorColor & shape size
var InlineEventCellStyle = /** @class */ (function (_super) {
    __extends(InlineEventCellStyle, _super);
    function InlineEventCellStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InlineEventCellStyle.prototype.onCellBackgroundColorPropertyChanged = function (oldValue, newValue) {
        this.onCellBackgroundColorChanged(oldValue, newValue);
    };
    InlineEventCellStyle.prototype.onCellBackgroundColorChanged = function (oldValue, newValue) { };
    InlineEventCellStyle.prototype.onEventTextColorPropertyChanged = function (oldValue, newValue) {
        this.onEventTextColorChanged(oldValue, newValue);
    };
    InlineEventCellStyle.prototype.onEventTextColorChanged = function (oldValue, newValue) { };
    InlineEventCellStyle.prototype.onEventFontNamePropertyChanged = function (oldValue, newValue) {
        this.onEventFontNameChanged(oldValue, newValue);
    };
    InlineEventCellStyle.prototype.onEventFontNameChanged = function (oldValue, newValue) { };
    InlineEventCellStyle.prototype.onEventFontStylePropertyChanged = function (oldValue, newValue) {
        this.onEventFontStyleChanged(oldValue, newValue);
    };
    InlineEventCellStyle.prototype.onEventFontStyleChanged = function (oldValue, newValue) { };
    InlineEventCellStyle.prototype.onEventTextSizePropertyChanged = function (oldValue, newValue) {
        this.onEventTextSizeChanged(oldValue, newValue);
    };
    InlineEventCellStyle.prototype.onEventTextSizeChanged = function (oldValue, newValue) {
    };
    InlineEventCellStyle.prototype.onTimeTextColorPropertyChanged = function (oldValue, newValue) {
        this.onTimeTextColorChanged(oldValue, newValue);
    };
    InlineEventCellStyle.prototype.onTimeTextColorChanged = function (oldValue, newValue) { };
    InlineEventCellStyle.prototype.onTimeFontNamePropertyChanged = function (oldValue, newValue) {
        this.onTimeFontNameChanged(oldValue, newValue);
    };
    InlineEventCellStyle.prototype.onTimeFontNameChanged = function (oldValue, newValue) { };
    InlineEventCellStyle.prototype.onTimeFontStylePropertyChanged = function (oldValue, newValue) {
        this.onTimeFontStyleChanged(oldValue, newValue);
    };
    InlineEventCellStyle.prototype.onTimeFontStyleChanged = function (oldValue, newValue) { };
    InlineEventCellStyle.prototype.onTimeTextSizePropertyChanged = function (oldValue, newValue) {
        this.onTimeTextSizeChanged(oldValue, newValue);
    };
    InlineEventCellStyle.prototype.onTimeTextSizeChanged = function (oldValue, newValue) { };
    InlineEventCellStyle.cellBackgroundColorProperty = new view_1.Property({
        name: "cellBackgroundColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onCellBackgroundColorPropertyChanged(oldValue, newValue);
        },
    });
    InlineEventCellStyle.eventTextColorProperty = new view_1.Property({
        name: "eventTextColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onEventTextColorPropertyChanged(oldValue, newValue);
        },
    });
    InlineEventCellStyle.eventFontNameProperty = new view_1.Property({
        name: "eventFontName",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onEventFontNamePropertyChanged(oldValue, newValue);
        },
    });
    InlineEventCellStyle.eventFontStyleProperty = new view_1.Property({
        name: "eventFontStyle",
        defaultValue: undefined,
        valueConverter: function (value) { return CalendarFontStyle[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onEventFontStylePropertyChanged(oldValue, newValue);
        },
    });
    InlineEventCellStyle.eventTextSizeProperty = new view_1.Property({
        name: "eventTextSize",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onEventTextSizePropertyChanged(oldValue, newValue);
        },
    });
    InlineEventCellStyle.timeTextColorProperty = new view_1.Property({
        name: "timeTextColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onTimeTextColorPropertyChanged(oldValue, newValue);
        },
    });
    InlineEventCellStyle.timeFontNameProperty = new view_1.Property({
        name: "timeFontName",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onTimeFontNamePropertyChanged(oldValue, newValue);
        },
    });
    InlineEventCellStyle.timeFontStyleProperty = new view_1.Property({
        name: "timeFontStyle",
        defaultValue: undefined,
        valueConverter: function (value) { return CalendarFontStyle[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onTimeFontStylePropertyChanged(oldValue, newValue);
        },
    });
    InlineEventCellStyle.timeTextSizeProperty = new view_1.Property({
        name: "timeTextSize",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onTimeTextSizePropertyChanged(oldValue, newValue);
        },
    });
    return InlineEventCellStyle;
}(view_1.ViewBase));
exports.InlineEventCellStyle = InlineEventCellStyle;
InlineEventCellStyle.cellBackgroundColorProperty.register(InlineEventCellStyle);
InlineEventCellStyle.eventTextColorProperty.register(InlineEventCellStyle);
InlineEventCellStyle.eventFontNameProperty.register(InlineEventCellStyle);
InlineEventCellStyle.eventFontStyleProperty.register(InlineEventCellStyle);
InlineEventCellStyle.eventTextSizeProperty.register(InlineEventCellStyle);
InlineEventCellStyle.timeTextColorProperty.register(InlineEventCellStyle);
InlineEventCellStyle.timeFontNameProperty.register(InlineEventCellStyle);
InlineEventCellStyle.timeFontStyleProperty.register(InlineEventCellStyle);
InlineEventCellStyle.timeTextSizeProperty.register(InlineEventCellStyle);
////////////////////////////////////////////////////////////////////////////////////////////////////
var RadCalendar = /** @class */ (function (_super) {
    __extends(RadCalendar, _super);
    function RadCalendar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadCalendar.prototype.onLocalePropertyChanged = function (oldValue, newValue) {
    };
    RadCalendar.prototype.onMinDatePropertyChanged = function (oldValue, newValue) {
        this.onMinDateChanged(oldValue, newValue);
    };
    RadCalendar.prototype.onMaxDatePropertyChanged = function (oldValue, newValue) {
        this.onMaxDateChanged(oldValue, newValue);
    };
    RadCalendar.prototype.onSelectedDatePropertyChanged = function (oldValue, newValue) {
        this.onSelectedDateChanged(oldValue, newValue);
    };
    RadCalendar.prototype.onSelectedDatesPropertyChanged = function (oldValue, newValue) {
        this.onSelectedDatesChanged(oldValue, newValue);
    };
    RadCalendar.prototype.onSelectedDateRangePropertyChanged = function (oldValue, newValue) {
        this.onSelectedDateRangeChanged(oldValue, newValue);
    };
    RadCalendar.prototype.onViewModePropertyChanged = function (oldValue, newValue) {
        this.onViewModeChanged(oldValue, newValue);
    };
    RadCalendar.prototype.onEventsViewModePropertyChanged = function (oldValue, newValue) {
        this.onEventsViewModeChanged(oldValue, newValue);
    };
    RadCalendar.prototype.onSelectionModePropertyChanged = function (oldValue, newValue) {
        this.onSelectionModeChanged(oldValue, newValue);
    };
    RadCalendar.prototype.onTransitionModePropertyChanged = function (oldValue, newValue) {
        this.onTransitionModeChanged(oldValue, newValue);
    };
    RadCalendar.prototype.onDisplayedDatePropertyChanged = function (oldValue, newValue) {
        this.onDisplayedDateChanged(oldValue, newValue);
    };
    RadCalendar.prototype.onEventSourcePropertyChanged = function (oldValue, newValue) {
        this.onEventSourceChanged(oldValue, newValue);
    };
    RadCalendar.prototype.onHorizontalTransitionPropertyChanged = function (oldValue, newValue) {
        this.onHorizontalTransitionChanged(oldValue, newValue);
    };
    RadCalendar.prototype.onMonthViewStylePropertyChanged = function (oldValue, newValue) {
        this.onMonthViewStyleChanged(oldValue, newValue);
    };
    RadCalendar.prototype.onWeekViewStylePropertyChanged = function (oldValue, newValue) {
        this.onWeekViewStyleChanged(oldValue, newValue);
    };
    RadCalendar.prototype.onDayViewStylePropertyChanged = function (oldValue, newValue) {
        this.onDayViewStyleChanged(oldValue, newValue);
    };
    RadCalendar.prototype.onYearViewStylePropertyChanged = function (oldValue, newValue) {
        this.onYearViewStyleChanged(oldValue, newValue);
    };
    RadCalendar.prototype.onMonthNamesViewStylePropertyChanged = function (oldValue, newValue) {
        this.onMonthNamesViewStyleChanged(oldValue, newValue);
    };
    RadCalendar.prototype.reload = function () { };
    RadCalendar.prototype.navigateForward = function () { };
    RadCalendar.prototype.navigateBack = function () { };
    RadCalendar.prototype.goToDate = function (date) { };
    RadCalendar.prototype.getEventsForDate = function (date) {
        return undefined;
    };
    RadCalendar.prototype.getSelectedDatesList = function () {
        var current = this.selectedDates;
        if (typeof (this.selectedDates) === "string") {
            current = this.selectedDates.split(",");
        }
        return current;
    };
    RadCalendar.prototype._addSelectedDate = function (date) {
        var newSelection = new Array();
        if (this.selectedDates) {
            var currentSelection = this.getSelectedDatesList();
            for (var i = 0; i < currentSelection.length; i++) {
                var selectedDate = currentSelection[i];
                newSelection.push(selectedDate);
                if (selectedDate.getTime() === date.getTime()) {
                    return;
                }
            }
        }
        newSelection.push(date);
        this.selectedDates = newSelection;
    };
    RadCalendar.prototype._removeSelectedDate = function (date) {
        var newSelection = new Array();
        var currentSelection = this.getSelectedDatesList();
        for (var i = 0; i < currentSelection.length; i++) {
            var selectedDate = currentSelection[i];
            if (selectedDate.getTime() !== date.getTime()) {
                newSelection.push(selectedDate);
            }
        }
        this.selectedDates = newSelection;
        if (newSelection.length > 0) {
            this.selectedDate = newSelection[newSelection.length - 1];
        }
        else {
            this.selectedDate = undefined;
        }
    };
    RadCalendar.prototype.onEventSourceChanged = function (oldValue, newValue) {
        this.updateEventSource();
        if (oldValue instanceof observable_1.Observable) {
            weakEvents.removeWeakEventListener(oldValue, observable_array_1.ObservableArray.changeEvent, this.EventSourceChangedInternal, this);
        }
        if (newValue instanceof observable_1.Observable) {
            weakEvents.addWeakEventListener(newValue, observable_array_1.ObservableArray.changeEvent, this.EventSourceChangedInternal, this);
        }
    };
    RadCalendar.prototype.EventSourceChangedInternal = function (data) {
        this.updateEventSource();
    };
    RadCalendar.prototype.updateEventSource = function () { };
    RadCalendar.prototype.onDisplayedDateChanged = function (oldValue, newValue) { };
    RadCalendar.prototype.onSelectionModeChanged = function (oldValue, newValue) { };
    RadCalendar.prototype.onTransitionModeChanged = function (oldValue, newValue) { };
    RadCalendar.prototype.onViewModeChanged = function (oldValue, newValue) { };
    RadCalendar.prototype.onEventsViewModeChanged = function (oldValue, newValue) { };
    RadCalendar.prototype.onSelectedDateRangeChanged = function (oldValue, newValue) { };
    RadCalendar.prototype.onSelectedDatesChanged = function (oldValue, newValue) { };
    RadCalendar.prototype.onSelectedDateChanged = function (oldValue, newValue) { };
    RadCalendar.prototype.onMaxDateChanged = function (oldValue, newValue) { };
    RadCalendar.prototype.onMinDateChanged = function (oldValue, newValue) { };
    RadCalendar.prototype.onHorizontalTransitionChanged = function (oldValue, newValue) { };
    RadCalendar.prototype.onMonthViewStyleChanged = function (oldValue, newValue) { };
    RadCalendar.prototype.onWeekViewStyleChanged = function (oldValue, newValue) { };
    RadCalendar.prototype.onDayViewStyleChanged = function (oldValue, newValue) { };
    RadCalendar.prototype.onYearViewStyleChanged = function (oldValue, newValue) { };
    RadCalendar.prototype.onMonthNamesViewStyleChanged = function (oldValue, newValue) { };
    // public static dateSelectingEvent : string = "dateSelecting";
    RadCalendar.dateSelectedEvent = "dateSelected";
    RadCalendar.dateDeselectedEvent = "dateDeselected";
    RadCalendar.cellTapEvent = "cellTap";
    RadCalendar.inlineEventSelectedEvent = "inlineEventSelected";
    RadCalendar.dayViewEventSelectedEvent = "dayViewEventSelected";
    RadCalendar.navigatedToDateEvent = "navigatedToDate";
    RadCalendar.navigatingToDateStartedEvent = "navigatingToDateStarted";
    RadCalendar.viewModeChangedEvent = "viewModeChanged";
    RadCalendar.localeProperty = new view_1.Property({
        name: "locale",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onLocalePropertyChanged(oldValue, newValue);
        }
    });
    RadCalendar.minDateProperty = new view_1.Property({
        name: "minDate",
        defaultValue: undefined,
        equalityComparer: function (x, y) { return x <= y && x >= y; },
        valueConverter: function (value) { return new Date(value); },
        valueChanged: function (target, oldValue, newValue) {
            target.onMinDatePropertyChanged(oldValue, newValue);
        },
    });
    RadCalendar.maxDateProperty = new view_1.Property({
        name: "maxDate",
        defaultValue: undefined,
        equalityComparer: function (x, y) { return x <= y && x >= y; },
        valueConverter: function (value) { return new Date(value); },
        valueChanged: function (target, oldValue, newValue) {
            target.onMaxDatePropertyChanged(oldValue, newValue);
        },
    });
    RadCalendar.selectedDateProperty = new view_1.Property({
        name: "selectedDate",
        defaultValue: undefined,
        equalityComparer: function (x, y) { return x <= y && x >= y; },
        valueConverter: function (value) { return new Date(value); },
        valueChanged: function (target, oldValue, newValue) {
            target.onSelectedDatePropertyChanged(oldValue, newValue);
        },
    });
    RadCalendar.selectedDatesProperty = new view_1.Property({
        name: "selectedDates",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onSelectedDatesPropertyChanged(oldValue, newValue);
        },
    });
    RadCalendar.selectedDateRangeProperty = new view_1.Property({
        name: "selectedDateRange",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onSelectedDateRangePropertyChanged(oldValue, newValue);
        },
    });
    RadCalendar.viewModeProperty = new view_1.Property({
        name: "viewMode",
        defaultValue: CalendarViewMode.Month,
        valueConverter: function (value) { return CalendarViewMode[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onViewModePropertyChanged(oldValue, newValue);
        },
    });
    RadCalendar.eventsViewModeProperty = new view_1.Property({
        name: "eventsViewMode",
        defaultValue: CalendarEventsViewMode.None,
        valueConverter: function (value) { return CalendarEventsViewMode[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onEventsViewModePropertyChanged(oldValue, newValue);
        },
    });
    RadCalendar.selectionModeProperty = new view_1.Property({
        name: "selectionMode",
        defaultValue: CalendarSelectionMode.Single,
        valueConverter: function (value) { return CalendarSelectionMode[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onSelectionModePropertyChanged(oldValue, newValue);
        },
    });
    RadCalendar.transitionModeProperty = new view_1.Property({
        name: "transitionMode",
        defaultValue: CalendarTransitionMode.Slide,
        valueConverter: function (value) { return CalendarTransitionMode[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onTransitionModePropertyChanged(oldValue, newValue);
        },
    });
    // Perhaps currentDate would be a better name for this :/
    RadCalendar.displayedDateProperty = new view_1.Property({
        name: "displayedDate",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onDisplayedDatePropertyChanged(oldValue, newValue);
        },
    });
    RadCalendar.eventSourceProperty = new view_1.Property({
        name: "eventSource",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onEventSourcePropertyChanged(oldValue, newValue);
        },
    });
    RadCalendar.horizontalTransitionProperty = new view_1.Property({
        name: "horizontalTransition",
        defaultValue: true,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onHorizontalTransitionPropertyChanged(oldValue, newValue);
        },
    });
    RadCalendar.monthViewStyleProperty = new view_1.Property({
        name: "monthViewStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onMonthViewStylePropertyChanged(oldValue, newValue);
        },
    });
    RadCalendar.weekViewStyleProperty = new view_1.Property({
        name: "weekViewStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onWeekViewStylePropertyChanged(oldValue, newValue);
        },
    });
    RadCalendar.dayViewStyleProperty = new view_1.Property({
        name: "dayViewStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onDayViewStylePropertyChanged(oldValue, newValue);
        },
    });
    RadCalendar.yearViewStyleProperty = new view_1.Property({
        name: "yearViewStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onYearViewStylePropertyChanged(oldValue, newValue);
        },
    });
    RadCalendar.monthNamesViewStyleProperty = new view_1.Property({
        name: "monthNamesViewStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onMonthNamesViewStylePropertyChanged(oldValue, newValue);
        },
    });
    return RadCalendar;
}(view_1.View));
exports.RadCalendar = RadCalendar;
RadCalendar.localeProperty.register(RadCalendar);
RadCalendar.minDateProperty.register(RadCalendar);
RadCalendar.maxDateProperty.register(RadCalendar);
RadCalendar.selectedDateProperty.register(RadCalendar);
RadCalendar.selectedDatesProperty.register(RadCalendar);
RadCalendar.selectedDateRangeProperty.register(RadCalendar);
RadCalendar.viewModeProperty.register(RadCalendar);
RadCalendar.eventsViewModeProperty.register(RadCalendar);
RadCalendar.selectionModeProperty.register(RadCalendar);
RadCalendar.transitionModeProperty.register(RadCalendar);
RadCalendar.displayedDateProperty.register(RadCalendar);
RadCalendar.eventSourceProperty.register(RadCalendar);
RadCalendar.horizontalTransitionProperty.register(RadCalendar);
RadCalendar.monthViewStyleProperty.register(RadCalendar);
RadCalendar.weekViewStyleProperty.register(RadCalendar);
RadCalendar.yearViewStyleProperty.register(RadCalendar);
RadCalendar.dayViewStyleProperty.register(RadCalendar);
RadCalendar.monthNamesViewStyleProperty.register(RadCalendar);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktY2FsZW5kYXIuY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWktY2FsZW5kYXIuY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0RBQTJGO0FBRTNGLGdEQUErQztBQUUvQywyRUFBeUU7QUFDekUsK0RBQThEO0FBQzlELHlFQUEyRTtBQUUzRSxJQUFZLGdCQU1YO0FBTkQsV0FBWSxnQkFBZ0I7SUFDeEIsaUNBQWEsQ0FBQTtJQUNiLG1DQUFlLENBQUE7SUFDZiw2Q0FBeUIsQ0FBQTtJQUN6QixpQ0FBYSxDQUFBO0lBQ2IsK0JBQVcsQ0FBQTtBQUNmLENBQUMsRUFOVyxnQkFBZ0IsR0FBaEIsd0JBQWdCLEtBQWhCLHdCQUFnQixRQU0zQjtBQUVELElBQVksc0JBSVg7QUFKRCxXQUFZLHNCQUFzQjtJQUM5Qix5Q0FBZSxDQUFBO0lBQ2YsMkNBQWlCLENBQUE7SUFDakIsdUNBQWEsQ0FBQTtBQUNqQixDQUFDLEVBSlcsc0JBQXNCLEdBQXRCLDhCQUFzQixLQUF0Qiw4QkFBc0IsUUFJakM7QUFFRCxJQUFZLHNCQUlYO0FBSkQsV0FBWSxzQkFBc0I7SUFDOUIsdUNBQWEsQ0FBQTtJQUNiLDJDQUFpQixDQUFBO0lBQ2pCLDZDQUFtQixDQUFBO0FBQ3ZCLENBQUMsRUFKVyxzQkFBc0IsR0FBdEIsOEJBQXNCLEtBQXRCLDhCQUFzQixRQUlqQztBQUVELElBQVkscUJBS1g7QUFMRCxXQUFZLHFCQUFxQjtJQUM3QixzQ0FBYSxDQUFBO0lBQ2IsMENBQWlCLENBQUE7SUFDakIsOENBQXFCLENBQUE7SUFDckIsd0NBQWUsQ0FBQTtBQUNuQixDQUFDLEVBTFcscUJBQXFCLEdBQXJCLDZCQUFxQixLQUFyQiw2QkFBcUIsUUFLaEM7QUFFRCxJQUFZLHNCQVlYO0FBWkQsV0FBWSxzQkFBc0I7SUFDOUIsdUNBQWEsQ0FBQTtJQUNiLHlDQUFlLENBQUE7SUFDZix5Q0FBZSxDQUFBO0lBQ2YsdUNBQWEsQ0FBQTtJQUNiLHVDQUFh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QUN2RCxXQUFXLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3hELFdBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDNUQsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNuRCxXQUFXLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3pELFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDeEQsV0FBVyxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN6RCxXQUFXLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3hELFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdEQsV0FBVyxDQUFDLDRCQUE0QixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMvRCxXQUFXLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3pELFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDeEQsV0FBVyxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN4RCxXQUFXLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3ZELFdBQVcsQ0FBQywyQkFBMkIsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3LCBWaWV3QmFzZSwgUHJvcGVydHksIGJvb2xlYW5Db252ZXJ0ZXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCAqIGFzIHdlYWtFdmVudHMgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS93ZWFrLWV2ZW50LWxpc3RlbmVyXCI7XG5cbmV4cG9ydCBlbnVtIENhbGVuZGFyVmlld01vZGUge1xuICAgIFdlZWsgPSBcIldlZWtcIixcbiAgICBNb250aCA9IFwiTW9udGhcIixcbiAgICBNb250aE5hbWVzID0gXCJNb250aE5hbWVzXCIsXG4gICAgWWVhciA9IFwiWWVhclwiLFxuICAgIERheSA9IFwiRGF5XCJcbn1cblxuZXhwb3J0IGVudW0gQ2FsZW5kYXJTZWxlY3Rpb25TaGFwZSB7XG4gICAgUm91bmQgPSBcIlJvdW5kXCIsXG4gICAgU3F1YXJlID0gXCJTcXVhcmVcIixcbiAgICBOb25lID0gXCJOb25lXCJcbn1cblxuZXhwb3J0IGVudW0gQ2FsZW5kYXJFdmVudHNWaWV3TW9kZSB7XG4gICAgTm9uZSA9IFwiTm9uZVwiLFxuICAgIElubGluZSA9IFwiSW5saW5lXCIsXG4gICAgUG9wb3ZlciA9IFwiUG9wb3ZlclwiXG59XG5cbmV4cG9ydCBlbnVtIENhbGVuZGFyU2VsZWN0aW9uTW9kZSB7XG4gICAgTm9uZSA9IFwiTm9uZVwiLFxuICAgIFNpbmdsZSA9IFwiU2luZ2xlXCIsXG4gICAgTXVsdGlwbGUgPSBcIk11bHRpcGxlXCIsXG4gICAgUmFuZ2UgPSBcIlJhbmdlXCJcbn1cblxuZXhwb3J0IGVudW0gQ2FsZW5kYXJUcmFuc2l0aW9uTW9kZSB7XG4gICAgTm9uZSA9IFwiTm9uZVwiLFxuICAgIFNsaWRlID0gXCJTbGlkZVwiLFxuICAgIFN0YWNrID0gXCJTdGFja1wiLFxuICAgIEZsaXAgPSBcIkZsaXBcIixcbiAgICBGb2xkID0gXCJGb2xkXCIsXG4gICAgRmxvYXQgPSBcIkZsb2F0XCIsXG4gICAgUm90YXRlID0gXCJSb3RhdGVcIixcbiAgICBQbGFpbiA9IFwiUGxhaW5cIixcbiAgICBGcmVlID0gXCJGcmVlXCIsXG4gICAgQ29tYm8gPSBcIkNvbWJvXCIsXG4gICAgT3ZlcmxhcCA9IFwiT3ZlcmxhcFwiXG59XG5cbi8qKlxuICogRm9udCBzdHlsZXNcbiAqL1xuZXhwb3J0IGVudW0gQ2FsZW5kYXJGb250U3R5bGUge1xuICAgIC8qKlxuICAgICogUmVndWxhciBmb250IHN0eWxlXG4gICAgKi9cbiAgICBOb3JtYWwgPSBcIk5vcm1hbFwiLFxuICAgIC8qKlxuICAgICogQm9sZCBmb250IHN0eWxlXG4gICAgKi9cbiAgICBCb2xkID0gXCJCb2xkXCIsXG4gICAgLyoqXG4gICAgICogSXRhbGljIGZvbnQgc3R5bGVcbiAgICAgKi9cbiAgICBJdGFsaWMgPSBcIkl0YWxpY1wiLFxuICAgIC8qKlxuICAgICAqIENvbWJpbmUgQm9sZCBhbmQgSXRhbGljIHN0eWxlc1xuICAgICAqL1xuICAgIEJvbGRJdGFsaWMgPSBcIkJvbGRJdGFsaWNcIlxufVxuXG4vKipcbiogRGVmaW5lcyB0aGUgYWxpZ25tZW50IG9wdGlvbnMgZm9yIGNlbGxzIGluIENhbGVuZGFyIGNvbXBvbmVudC5cbiovXG5leHBvcnQgZW51bSBDYWxlbmRhckNlbGxBbGlnbm1lbnQge1xuICAgIC8qKlxuICAgICBUaGUgY2VsbCBjb250ZW50IGlzIGFsaWduZWQgdG8gbGVmdC5cbiAgICAgKi9cbiAgICBMZWZ0ID0gXCJMZWZ0XCIsXG5cbiAgICAvKipcbiAgICAgVGhlIGNlbGwgY29udGVudCBpcyBhbGlnbmVkIHRvIHJpZ2h0LlxuICAgICAqL1xuICAgIFJpZ2h0ID0gXCJSaWdodFwiLFxuXG4gICAgLyoqXG4gICAgIFRoZSBjZWxsIGNvbnRlbnQgaXMgYWxpZ25lZCB0byB0b3AuXG4gICAgICovXG4gICAgVG9wID0gXCJUb3BcIixcblxuICAgIC8qKlxuICAgICBUaGUgY2VsbCBjb250ZW50IGlzIGFsaWduZWQgdG8gYm90dG9tLlxuICAgICAqL1xuICAgIEJvdHRvbSA9IFwiQm90dG9tXCIsXG5cbiAgICAvKipcbiAgICAgVGhlIGNlbGwgY29udGVudCBpcyBhbGlnbmVkIGhvcml6b250YWxseS5cbiAgICAgKi9cbiAgICBIb3Jpem9udGFsQ2VudGVyID0gXCJIb3Jpem9udGFsQ2VudGVyXCIsXG5cbiAgICAvKipcbiAgICAgVGhlIGNlbGwgY29udGVudCBpcyBhbGlnbmVkIHZlcnRpY2FsbHkuXG4gICAgICovXG4gICAgVmVydGljYWxDZW50ZXIgPSBcIlZlcnRpY2FsQ2VudGVyXCJcbn1cblxuXG5leHBvcnQgY2xhc3MgRGF0ZVJhbmdlIHtcbiAgICBwcml2YXRlIF9zdGFydERhdGU6IERhdGU7XG4gICAgcHJpdmF0ZSBfZW5kRGF0ZTogRGF0ZTtcblxuICAgIGNvbnN0cnVjdG9yKHN0YXJ0RGF0ZT86IERhdGUsIGVuZERhdGU/OiBEYXRlKSB7XG4gICAgICAgIHRoaXMuX3N0YXJ0RGF0ZSA9IHN0YXJ0RGF0ZTtcbiAgICAgICAgdGhpcy5fZW5kRGF0ZSA9IGVuZERhdGU7XG4gICAgICAgIHRoaXMubm9ybWFsaXplKCk7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXJ0RGF0ZSgpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0RGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgc3RhcnREYXRlKHZhbHVlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMuX3N0YXJ0RGF0ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBlbmREYXRlKCk6IERhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5kRGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgZW5kRGF0ZSh2YWx1ZTogRGF0ZSkge1xuICAgICAgICB0aGlzLl9lbmREYXRlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIG5vcm1hbGl6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VuZERhdGUgPCB0aGlzLl9zdGFydERhdGUpIHtcbiAgICAgICAgICAgIGxldCB0ZW1wID0gdGhpcy5fZW5kRGF0ZTtcbiAgICAgICAgICAgIHRoaXMuX2VuZERhdGUgPSB0aGlzLl9zdGFydERhdGU7XG4gICAgICAgICAgICB0aGlzLl9zdGFydERhdGUgPSB0ZW1wO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJFdmVudCB7XG4gICAgY29uc3RydWN0b3IodGl0bGU6IHN0cmluZywgc3RhcnREYXRlOiBEYXRlLCBlbmREYXRlOiBEYXRlLCBpc0FsbERheT86IGJvb2xlYW4sIGV2ZW50Q29sb3I/OiBDb2xvcikge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9IGVuZERhdGU7XG4gICAgICAgIHRoaXMuc3RhcnREYXRlID0gc3RhcnREYXRlO1xuICAgICAgICBpZiAoaXNBbGxEYXkpIHtcbiAgICAgICAgICAgIHRoaXMuaXNBbGxEYXkgPSBpc0FsbERheTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnRDb2xvcikge1xuICAgICAgICAgICAgdGhpcy5ldmVudENvbG9yID0gZXZlbnRDb2xvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBhbmRyb2lkKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGlvcygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldCB0aXRsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0VGl0bGUoKTtcbiAgICB9XG5cbiAgICBzZXQgdGl0bGUodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9zZXRUaXRsZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXJ0RGF0ZSgpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFN0YXJ0RGF0ZSgpO1xuICAgIH1cblxuICAgIHNldCBzdGFydERhdGUodmFsdWU6IERhdGUpIHtcbiAgICAgICAgdGhpcy5fc2V0U3RhcnREYXRlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXQgZW5kRGF0ZSgpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEVuZERhdGUoKTtcbiAgICB9XG5cbiAgICBzZXQgZW5kRGF0ZSh2YWx1ZTogRGF0ZSkge1xuICAgICAgICB0aGlzLl9zZXRFbmREYXRlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBzZXQgaXNBbGxEYXkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2V0SXNBbGxEYXkodmFsdWUpO1xuICAgIH1cblxuICAgIGdldCBpc0FsbERheSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldElzQWxsRGF5KCk7XG4gICAgfVxuXG4gICAgc2V0IGV2ZW50Q29sb3IodmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMuX3NldEV2ZW50Q29sb3IodmFsdWUpO1xuICAgIH1cblxuICAgIGdldCBldmVudENvbG9yKCk6IENvbG9yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEV2ZW50Q29sb3IoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NldElzQWxsRGF5KHZhbHVlOiBib29sZWFuKSB7IH1cbiAgICBwcm90ZWN0ZWQgX2dldElzQWxsRGF5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXRFbmREYXRlKGRhdGU6IERhdGUpIHsgfVxuICAgIHByb3RlY3RlZCBfZ2V0RW5kRGF0ZSgpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NldFN0YXJ0RGF0ZShkYXRlOiBEYXRlKSB7IH1cbiAgICBwcm90ZWN0ZWQgX2dldFN0YXJ0RGF0ZSgpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NldFRpdGxlKHZhbHVlOiBzdHJpbmcpIHsgfVxuICAgIHByb3RlY3RlZCBfZ2V0VGl0bGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NldEV2ZW50Q29sb3IodmFsdWU6IENvbG9yKSB7IH1cbiAgICBwcm90ZWN0ZWQgX2dldEV2ZW50Q29sb3IoKTogQ29sb3Ige1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyA8RXZlbnREYXRhRGVmaW5pdGlvbnM+XG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJWaWV3TW9kZUNoYW5nZWRFdmVudERhdGEgaW1wbGVtZW50cyBFdmVudERhdGEge1xuICAgIC8qKlxuICAgICpSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBldmVudCB0aGF0IGhhcyBiZWVuIGZpcmVkLlxuICAgICovXG4gICAgZXZlbnROYW1lOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAqIFRoZSBvYmplY3QgdGhhdCBmaXJlcyB0aGUgZXZlbnQuXG4gICAgKi9cbiAgICBvYmplY3Q6IGFueTtcblxuICAgIC8qKlxuICAgICogVGhlIG9sZCB2YWx1ZSBvZiB0aGUgVmlld01vZGUgcHJvcGVydHkuXG4gICAgKi9cbiAgICBvbGRWYWx1ZTogQ2FsZW5kYXJWaWV3TW9kZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBuZXcgdmFsdWUgb2YgdGhlIFZpZXdNb2RlIHByb3BlcnR5LlxuICAgICAqL1xuICAgIG5ld1ZhbHVlOiBDYWxlbmRhclZpZXdNb2RlO1xufVxuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJDZWxsVGFwRXZlbnREYXRhIGltcGxlbWVudHMgRXZlbnREYXRhIHtcbiAgICAvKipcbiAgICAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRoYXQgaGFzIGJlZW4gZmlyZWQuXG4gICAgKi9cbiAgICBldmVudE5hbWU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICogVGhlIG9iamVjdCB0aGF0IGZpcmVzIHRoZSBldmVudC5cbiAgICAqL1xuICAgIG9iamVjdDogYW55O1xuXG4gICAgLyoqXG4gICAgICogVGhlIHJlbGF0ZWQgbmF0aXZlIGNlbGwuXG4gICAgICovXG4gICAgY2VsbDogYW55O1xuXG4gICAgLyoqXG4gICAgICogVGhlIHJlbGF0ZWQgRGF0ZS5cbiAgICAgKi9cbiAgICBkYXRlOiBEYXRlO1xufVxuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJTZWxlY3Rpb25FdmVudERhdGEgaW1wbGVtZW50cyBFdmVudERhdGEge1xuICAgIC8qKlxuICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgdGhhdCBoYXMgYmVlbiBmaXJlZC5cbiAgICAqL1xuICAgIGV2ZW50TmFtZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgKiBUaGUgb2JqZWN0IHRoYXQgZmlyZXMgdGhlIGV2ZW50LlxuICAgICovXG4gICAgb2JqZWN0OiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcmVsYXRpdmUgRGF0ZS5cbiAgICAgKi9cbiAgICBkYXRlOiBEYXRlO1xufVxuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJJbmxpbmVFdmVudFNlbGVjdGVkRGF0YSBpbXBsZW1lbnRzIEV2ZW50RGF0YSB7XG4gICAgLyoqXG4gICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBldmVudCB0aGF0IGhhcyBiZWVuIGZpcmVkLlxuICAgICovXG4gICAgZXZlbnROYW1lOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAqIFRoZSBvYmplY3QgdGhhdCBmaXJlcyB0aGUgZXZlbnQuXG4gICAgKi9cbiAgICBvYmplY3Q6IGFueTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBkYXRhIGZvciBpbmxpbmUgZXZlbnQgc2VsZWN0ZWQgaW4gY2FsZW5kYXIuXG4gICAgICovXG4gICAgZXZlbnREYXRhOiBDYWxlbmRhckV2ZW50O1xuXG59XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRheVZpZXdFdmVudFNlbGVjdGVkRGF0YSBpbXBsZW1lbnRzIEV2ZW50RGF0YSB7XG4gICAgLyoqXG4gICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBldmVudCB0aGF0IGhhcyBiZWVuIGZpcmVkLlxuICAgICovXG4gICAgZXZlbnROYW1lOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAqIFRoZSBvYmplY3QgdGhhdCBmaXJlcyB0aGUgZXZlbnQuXG4gICAgKi9cbiAgICBvYmplY3Q6IGFueTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBkYXRhIGZvciBkYXkgdmlldyBldmVudCBzZWxlY3RlZCBpbiBjYWxlbmRhci5cbiAgICAgKi9cbiAgICBldmVudERhdGE6IENhbGVuZGFyRXZlbnQ7XG5cbn1cblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyTmF2aWdhdGlvbkV2ZW50RGF0YSBpbXBsZW1lbnRzIEV2ZW50RGF0YSB7XG4gICAgLyoqXG4gICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBldmVudCB0aGF0IGhhcyBiZWVuIGZpcmVkLlxuICAgICovXG4gICAgZXZlbnROYW1lOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAqIFRoZSBvYmplY3QgdGhhdCBmaXJlcyB0aGUgZXZlbnQuXG4gICAgKi9cbiAgICBvYmplY3Q6IGFueTtcblxuICAgIC8qKlxuICAgICAqIFRoZSByZWxhdGl2ZSBEYXRlLlxuICAgICAqL1xuICAgIGRhdGU6IERhdGU7XG59XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vbnRoVmlld1N0eWxlIGV4dGVuZHMgVmlld0Jhc2Uge1xuICAgIG93bmVyOiBSYWRDYWxlbmRhcjtcbiAgICBwdWJsaWMgc2hvd1dlZWtOdW1iZXJzOiBib29sZWFuO1xuICAgIHB1YmxpYyBzaG93VGl0bGU6IGJvb2xlYW47XG4gICAgcHVibGljIHNob3dEYXlOYW1lczogYm9vbGVhbjtcbiAgICBwdWJsaWMgdG9kYXlDZWxsU3R5bGU6IERheUNlbGxTdHlsZTtcbiAgICBwdWJsaWMgYmFja2dyb3VuZENvbG9yOiBDb2xvcjtcbiAgICBwdWJsaWMgZGF5Q2VsbFN0eWxlOiBEYXlDZWxsU3R5bGU7XG4gICAgcHVibGljIGRheU5hbWVDZWxsU3R5bGU6IENlbGxTdHlsZTtcbiAgICBwdWJsaWMgd2Vla051bWJlckNlbGxTdHlsZTogQ2VsbFN0eWxlO1xuICAgIHB1YmxpYyB3ZWVrZW5kQ2VsbFN0eWxlOiBDZWxsU3R5bGU7XG4gICAgcHVibGljIHRpdGxlQ2VsbFN0eWxlOiBDZWxsU3R5bGU7XG4gICAgcHVibGljIHNlbGVjdGVkRGF5Q2VsbFN0eWxlOiBEYXlDZWxsU3R5bGU7XG4gICAgcHVibGljIGlubGluZUV2ZW50Q2VsbFN0eWxlOiBJbmxpbmVFdmVudENlbGxTdHlsZTtcbiAgICBwdWJsaWMgc2VsZWN0aW9uU2hhcGU6IENhbGVuZGFyU2VsZWN0aW9uU2hhcGU7XG4gICAgcHVibGljIHNlbGVjdGlvblNoYXBlU2l6ZTogbnVtYmVyO1xuICAgIHB1YmxpYyBzZWxlY3Rpb25TaGFwZUNvbG9yOiBDb2xvcjtcblxuICAgIHB1YmxpYyB1cGRhdGVWaWV3U3R5bGVzKGZvcmNlVXBkYXRlPzogYm9vbGVhbikge1xuXG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc3RhdGljIHNob3dXZWVrTnVtYmVyc1Byb3BlcnR5ID0gbmV3IFByb3BlcnR5PENhbGVuZGFyTW9udGhWaWV3U3R5bGUsIGJvb2xlYW4+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInNob3dXZWVrTnVtYmVyc1wiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogYm9vbGVhbkNvbnZlcnRlcixcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uU2hvd1dlZWtOdW1iZXJzUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHB1YmxpYyBzdGF0aWMgc2VsZWN0aW9uU2hhcGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxDYWxlbmRhck1vbnRoVmlld1N0eWxlLCBDYWxlbmRhclNlbGVjdGlvblNoYXBlPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJzZWxlY3Rpb25TaGFwZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogKHZhbHVlKSA9PiBDYWxlbmRhclNlbGVjdGlvblNoYXBlW3ZhbHVlXSxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uU2VsZWN0aW9uU2hhcGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIHByaXZhdGUgb25TZWxlY3Rpb25TaGFwZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogQ2FsZW5kYXJTZWxlY3Rpb25TaGFwZSwgbmV3VmFsdWU6IENhbGVuZGFyU2VsZWN0aW9uU2hhcGUpIHtcbiAgICAgICAgdGhpcy5vblNlbGVjdGlvblNoYXBlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblNlbGVjdGlvblNoYXBlQ2hhbmdlZChvbGRWYWx1ZTogQ2FsZW5kYXJTZWxlY3Rpb25TaGFwZSwgbmV3VmFsdWU6IENhbGVuZGFyU2VsZWN0aW9uU2hhcGUpIHsgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzZWxlY3Rpb25TaGFwZVNpemVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxDYWxlbmRhck1vbnRoVmlld1N0eWxlLCBudW1iZXI+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInNlbGVjdGlvblNoYXBlU2l6ZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiAxNSxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiBwYXJzZUZsb2F0LFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25TZWxlY3Rpb25TaGFwZVNpemVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvblNlbGVjdGlvblNoYXBlU2l6ZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb25TaGFwZVNpemVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2VsZWN0aW9uU2hhcGVTaXplQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7IH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2VsZWN0aW9uU2hhcGVDb2xvclByb3BlcnR5ID0gbmV3IFByb3BlcnR5PENhbGVuZGFyTW9udGhWaWV3U3R5bGUsIENvbG9yPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJzZWxlY3Rpb25TaGFwZUNvbG9yXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGVxdWFsaXR5Q29tcGFyZXI6IENvbG9yLmVxdWFscyxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiAodikgPT4gbmV3IENvbG9yKHYpLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25TZWxlY3Rpb25TaGFwZUNvbG9yUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25TZWxlY3Rpb25TaGFwZUNvbG9yUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb25TaGFwZUNvbG9yQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblNlbGVjdGlvblNoYXBlQ29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7IH1cblxuICAgIHByaXZhdGUgb25TaG93V2Vla051bWJlcnNQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IGJvb2xlYW4sIG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMub25TaG93V2Vla051bWJlcnNDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2hvd1dlZWtOdW1iZXJzQ2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHsgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzaG93VGl0bGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxDYWxlbmRhck1vbnRoVmlld1N0eWxlLCBib29sZWFuPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJzaG93VGl0bGVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6IGJvb2xlYW5Db252ZXJ0ZXIsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vblNob3dUaXRsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uU2hvd1RpdGxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLm9uU2hvd1RpdGxlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblNob3dUaXRsZUNoYW5nZWQob2xkVmFsdWU6IGJvb2xlYW4sIG5ld1ZhbHVlOiBib29sZWFuKSB7IH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2hvd0RheU5hbWVzUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8Q2FsZW5kYXJNb250aFZpZXdTdHlsZSwgYm9vbGVhbj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwic2hvd0RheU5hbWVzXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiBib29sZWFuQ29udmVydGVyLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25TaG93RGF5TmFtZXNQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvblNob3dEYXlOYW1lc1Byb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5vblNob3dEYXlOYW1lc0NoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TaG93RGF5TmFtZXNDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikgeyB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGJhY2tncm91bmRDb2xvclByb3BlcnR5ID0gbmV3IFByb3BlcnR5PENhbGVuZGFyTW9udGhWaWV3U3R5bGUsIENvbG9yPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJiYWNrZ3JvdW5kQ29sb3JcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZXF1YWxpdHlDb21wYXJlcjogQ29sb3IuZXF1YWxzLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6ICh2KSA9PiBuZXcgQ29sb3IodiksXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkNlbGxCYWNrZ3JvdW5kQ29sb3JQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkNlbGxCYWNrZ3JvdW5kQ29sb3JQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgdGhpcy5vbkJhY2tncm91bmRDb2xvckNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25CYWNrZ3JvdW5kQ29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7IH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZGF5Q2VsbFN0eWxlUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8Q2FsZW5kYXJNb250aFZpZXdTdHlsZSwgRGF5Q2VsbFN0eWxlPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJkYXlDZWxsU3R5bGVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25EYXlDZWxsU3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkRheUNlbGxTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogRGF5Q2VsbFN0eWxlLCBuZXdWYWx1ZTogRGF5Q2VsbFN0eWxlKSB7XG4gICAgICAgIHRoaXMub25EYXlDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRGF5Q2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogRGF5Q2VsbFN0eWxlLCBuZXdWYWx1ZTogRGF5Q2VsbFN0eWxlKSB7IH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2VsZWN0ZWREYXlDZWxsU3R5bGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxDYWxlbmRhck1vbnRoVmlld1N0eWxlLCBEYXlDZWxsU3R5bGU+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInNlbGVjdGVkRGF5Q2VsbFN0eWxlXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uU2VsZWN0ZWREYXlDZWxsU3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvblNlbGVjdGVkRGF5Q2VsbFN0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBEYXlDZWxsU3R5bGUsIG5ld1ZhbHVlOiBEYXlDZWxsU3R5bGUpIHtcbiAgICAgICAgdGhpcy5vblNlbGVjdGVkRGF5Q2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblNlbGVjdGVkRGF5Q2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogRGF5Q2VsbFN0eWxlLCBuZXdWYWx1ZTogRGF5Q2VsbFN0eWxlKSB7IH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdG9kYXlDZWxsU3R5bGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxDYWxlbmRhck1vbnRoVmlld1N0eWxlLCBEYXlDZWxsU3R5bGU+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInRvZGF5Q2VsbFN0eWxlXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uVG9kYXlDZWxsU3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvblRvZGF5Q2VsbFN0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBEYXlDZWxsU3R5bGUsIG5ld1ZhbHVlOiBEYXlDZWxsU3R5bGUpIHtcbiAgICAgICAgdGhpcy5vblRvZGF5Q2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRvZGF5Q2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogRGF5Q2VsbFN0eWxlLCBuZXdWYWx1ZTogRGF5Q2VsbFN0eWxlKSB7IH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZGF5TmFtZUNlbGxTdHlsZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PENhbGVuZGFyTW9udGhWaWV3U3R5bGUsIENlbGxTdHlsZT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiZGF5TmFtZUNlbGxTdHlsZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkRheU5hbWVDZWxsU3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkRheU5hbWVDZWxsU3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IENlbGxTdHlsZSwgbmV3VmFsdWU6IENlbGxTdHlsZSkge1xuICAgICAgICB0aGlzLm9uRGF5TmFtZUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EYXlOYW1lQ2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2VsbFN0eWxlLCBuZXdWYWx1ZTogQ2VsbFN0eWxlKSB7IH1cblxuICAgIHB1YmxpYyBzdGF0aWMgd2Vla051bWJlckNlbGxTdHlsZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PENhbGVuZGFyTW9udGhWaWV3U3R5bGUsIENlbGxTdHlsZT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwid2Vla051bWJlckNlbGxTdHlsZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbldlZWtOdW1iZXJDZWxsU3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbldlZWtOdW1iZXJDZWxsU3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IENlbGxTdHlsZSwgbmV3VmFsdWU6IENlbGxTdHlsZSkge1xuICAgICAgICB0aGlzLm9uV2Vla051bWJlckNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25XZWVrTnVtYmVyQ2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2VsbFN0eWxlLCBuZXdWYWx1ZTogQ2VsbFN0eWxlKSB7IH1cblxuICAgIHB1YmxpYyBzdGF0aWMgd2Vla2VuZENlbGxTdHlsZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PENhbGVuZGFyTW9udGhWaWV3U3R5bGUsIENlbGxTdHlsZT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwid2Vla2VuZENlbGxTdHlsZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbldlZWtlbmRDZWxsU3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbldlZWtlbmRDZWxsU3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IENlbGxTdHlsZSwgbmV3VmFsdWU6IENlbGxTdHlsZSkge1xuICAgICAgICB0aGlzLm9uV2Vla2VuZENlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25XZWVrZW5kQ2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2VsbFN0eWxlLCBuZXdWYWx1ZTogQ2VsbFN0eWxlKSB7IH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdGl0bGVDZWxsU3R5bGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxDYWxlbmRhck1vbnRoVmlld1N0eWxlLCBDZWxsU3R5bGU+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInRpdGxlQ2VsbFN0eWxlXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uVGl0bGVDZWxsU3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvblRpdGxlQ2VsbFN0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDZWxsU3R5bGUsIG5ld1ZhbHVlOiBDZWxsU3R5bGUpIHtcbiAgICAgICAgdGhpcy5vblRpdGxlQ2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRpdGxlQ2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2VsbFN0eWxlLCBuZXdWYWx1ZTogQ2VsbFN0eWxlKSB7IH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaW5saW5lRXZlbnRDZWxsU3R5bGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxDYWxlbmRhck1vbnRoVmlld1N0eWxlLCBJbmxpbmVFdmVudENlbGxTdHlsZT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiaW5saW5lRXZlbnRDZWxsU3R5bGVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25JbmxpbmVFdmVudENlbGxTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uSW5saW5lRXZlbnRDZWxsU3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IElubGluZUV2ZW50Q2VsbFN0eWxlLCBuZXdWYWx1ZTogSW5saW5lRXZlbnRDZWxsU3R5bGUpIHtcbiAgICAgICAgdGhpcy5vbklubGluZUV2ZW50Q2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbklubGluZUV2ZW50Q2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogSW5saW5lRXZlbnRDZWxsU3R5bGUsIG5ld1ZhbHVlOiBJbmxpbmVFdmVudENlbGxTdHlsZSkgeyB9XG59XG5DYWxlbmRhck1vbnRoVmlld1N0eWxlLnNob3dXZWVrTnVtYmVyc1Byb3BlcnR5LnJlZ2lzdGVyKENhbGVuZGFyTW9udGhWaWV3U3R5bGUpO1xuQ2FsZW5kYXJNb250aFZpZXdTdHlsZS5zZWxlY3Rpb25TaGFwZVByb3BlcnR5LnJlZ2lzdGVyKENhbGVuZGFyTW9udGhWaWV3U3R5bGUpO1xuQ2FsZW5kYXJNb250aFZpZXdTdHlsZS5zZWxlY3Rpb25TaGFwZVNpemVQcm9wZXJ0eS5yZWdpc3RlcihDYWxlbmRhck1vbnRoVmlld1N0eWxlKTtcbkNhbGVuZGFyTW9udGhWaWV3U3R5bGUuc2VsZWN0aW9uU2hhcGVDb2xvclByb3BlcnR5LnJlZ2lzdGVyKENhbGVuZGFyTW9udGhWaWV3U3R5bGUpO1xuQ2FsZW5kYXJNb250aFZpZXdTdHlsZS5zaG93VGl0bGVQcm9wZXJ0eS5yZWdpc3RlcihDYWxlbmRhck1vbnRoVmlld1N0eWxlKTtcbkNhbGVuZGFyTW9udGhWaWV3U3R5bGUuc2hvd0RheU5hbWVzUHJvcGVydHkucmVnaXN0ZXIoQ2FsZW5kYXJNb250aFZpZXdTdHlsZSk7XG5DYWxlbmRhck1vbnRoVmlld1N0eWxlLmJhY2tncm91bmRDb2xvclByb3BlcnR5LnJlZ2lzdGVyKENhbGVuZGFyTW9udGhWaWV3U3R5bGUpO1xuQ2FsZW5kYXJNb250aFZpZXdTdHlsZS5kYXlDZWxsU3R5bGVQcm9wZXJ0eS5yZWdpc3RlcihDYWxlbmRhck1vbnRoVmlld1N0eWxlKTtcbkNhbGVuZGFyTW9udGhWaWV3U3R5bGUuc2VsZWN0ZWREYXlDZWxsU3R5bGVQcm9wZXJ0eS5yZWdpc3RlcihDYWxlbmRhck1vbnRoVmlld1N0eWxlKTtcbkNhbGVuZGFyTW9udGhWaWV3U3R5bGUudG9kYXlDZWxsU3R5bGVQcm9wZXJ0eS5yZWdpc3RlcihDYWxlbmRhck1vbnRoVmlld1N0eWxlKTtcbkNhbGVuZGFyTW9udGhWaWV3U3R5bGUuZGF5TmFtZUNlbGxTdHlsZVByb3BlcnR5LnJlZ2lzdGVyKENhbGVuZGFyTW9udGhWaWV3U3R5bGUpO1xuQ2FsZW5kYXJNb250aFZpZXdTdHlsZS53ZWVrTnVtYmVyQ2VsbFN0eWxlUHJvcGVydHkucmVnaXN0ZXIoQ2FsZW5kYXJNb250aFZpZXdTdHlsZSk7XG5DYWxlbmRhck1vbnRoVmlld1N0eWxlLndlZWtlbmRDZWxsU3R5bGVQcm9wZXJ0eS5yZWdpc3RlcihDYWxlbmRhck1vbnRoVmlld1N0eWxlKTtcbkNhbGVuZGFyTW9udGhWaWV3U3R5bGUudGl0bGVDZWxsU3R5bGVQcm9wZXJ0eS5yZWdpc3RlcihDYWxlbmRhck1vbnRoVmlld1N0eWxlKTtcbkNhbGVuZGFyTW9udGhWaWV3U3R5bGUuaW5saW5lRXZlbnRDZWxsU3R5bGVQcm9wZXJ0eS5yZWdpc3RlcihDYWxlbmRhck1vbnRoVmlld1N0eWxlKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vKipcbiAqIFN0eWxlIGNsYXNzIGZvciBXZWVrIHZpZXcgbW9kZVxuICovXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJXZWVrVmlld1N0eWxlIGV4dGVuZHMgQ2FsZW5kYXJNb250aFZpZXdTdHlsZSB7XG5cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLyoqXG4gKiBTdHlsZSBjbGFzcyBmb3IgRGF5IHZpZXcgbW9kZVxuICovXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJEYXlWaWV3U3R5bGUgZXh0ZW5kcyBDYWxlbmRhcldlZWtWaWV3U3R5bGUge1xuICAgIHB1YmxpYyBzaG93V2VlazogYm9vbGVhbjtcbiAgICBwdWJsaWMgZGF5RXZlbnRzVmlld1N0eWxlOiBEYXlFdmVudHNWaWV3U3R5bGU7XG4gICAgcHVibGljIGFsbERheUV2ZW50c1ZpZXdTdHlsZTogQWxsRGF5RXZlbnRzVmlld1N0eWxlO1xuICAgIHB1YmxpYyBzdGF0aWMgc2hvd1dlZWtQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxDYWxlbmRhckRheVZpZXdTdHlsZSwgYm9vbGVhbj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwic2hvd1dlZWtcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiBib29sZWFuQ29udmVydGVyLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25TaG93V2Vla1Byb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uU2hvd1dlZWtQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IGJvb2xlYW4sIG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMub25TaG93V2Vla0NoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TaG93V2Vla0NoYW5nZWQob2xkVmFsdWU6IGJvb2xlYW4sIG5ld1ZhbHVlOiBib29sZWFuKSB7IH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZGF5RXZlbnRzVmlld1N0eWxlUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8Q2FsZW5kYXJEYXlWaWV3U3R5bGUsIERheUV2ZW50c1ZpZXdTdHlsZT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiZGF5RXZlbnRzVmlld1N0eWxlXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uRGF5RXZlbnRzVmlld1N0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25EYXlFdmVudHNWaWV3U3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IERheUV2ZW50c1ZpZXdTdHlsZSwgbmV3VmFsdWU6IERheUV2ZW50c1ZpZXdTdHlsZSkge1xuICAgICAgICB0aGlzLm9uRGF5RXZlbnRzVmlld1N0eWxlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRheUV2ZW50c1ZpZXdTdHlsZUNoYW5nZWQob2xkVmFsdWU6IERheUV2ZW50c1ZpZXdTdHlsZSwgbmV3VmFsdWU6IERheUV2ZW50c1ZpZXdTdHlsZSkgeyB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGFsbERheUV2ZW50c1ZpZXdTdHlsZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PENhbGVuZGFyRGF5Vmlld1N0eWxlLCBBbGxEYXlFdmVudHNWaWV3U3R5bGU+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImFsbERheUV2ZW50c1ZpZXdTdHlsZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkFsbERheUV2ZW50c1ZpZXdTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uQWxsRGF5RXZlbnRzVmlld1N0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBBbGxEYXlFdmVudHNWaWV3U3R5bGUsIG5ld1ZhbHVlOiBBbGxEYXlFdmVudHNWaWV3U3R5bGUpIHtcbiAgICAgICAgdGhpcy5vbkFsbERheUV2ZW50c1ZpZXdTdHlsZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25BbGxEYXlFdmVudHNWaWV3U3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBBbGxEYXlFdmVudHNWaWV3U3R5bGUsIG5ld1ZhbHVlOiBBbGxEYXlFdmVudHNWaWV3U3R5bGUpIHsgfVxufVxuQ2FsZW5kYXJEYXlWaWV3U3R5bGUuc2hvd1dlZWtQcm9wZXJ0eS5yZWdpc3RlcihDYWxlbmRhckRheVZpZXdTdHlsZSk7XG5DYWxlbmRhckRheVZpZXdTdHlsZS5kYXlFdmVudHNWaWV3U3R5bGVQcm9wZXJ0eS5yZWdpc3RlcihDYWxlbmRhckRheVZpZXdTdHlsZSk7XG5DYWxlbmRhckRheVZpZXdTdHlsZS5hbGxEYXlFdmVudHNWaWV3U3R5bGVQcm9wZXJ0eS5yZWdpc3RlcihDYWxlbmRhckRheVZpZXdTdHlsZSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLyoqXG4gKiBTdHlsZSBjbGFzcyBmb3IgWWVhciB2aWV3IG1vZGVcbiAqL1xuZXhwb3J0IGNsYXNzIENhbGVuZGFyWWVhclZpZXdTdHlsZSBleHRlbmRzIFZpZXdCYXNlIHtcbiAgICBvd25lcjogUmFkQ2FsZW5kYXI7XG4gICAgcHVibGljIHRpdGxlQ2VsbFN0eWxlOiBDZWxsU3R5bGU7XG4gICAgcHVibGljIG1vbnRoQ2VsbFN0eWxlOiBNb250aENlbGxTdHlsZTtcblxuICAgIHB1YmxpYyBzdGF0aWMgdGl0bGVDZWxsU3R5bGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxDYWxlbmRhclllYXJWaWV3U3R5bGUsIENlbGxTdHlsZT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwidGl0bGVDZWxsU3R5bGVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25UaXRsZUNlbGxTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uVGl0bGVDZWxsU3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IENlbGxTdHlsZSwgbmV3VmFsdWU6IENlbGxTdHlsZSkge1xuICAgICAgICB0aGlzLm9uVGl0bGVDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG5cbiAgICBwcm90ZWN0ZWQgb25UaXRsZUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWU6IENlbGxTdHlsZSwgbmV3VmFsdWU6IENlbGxTdHlsZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgbW9udGhDZWxsU3R5bGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxDYWxlbmRhclllYXJWaWV3U3R5bGUsIE1vbnRoQ2VsbFN0eWxlPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJtb250aENlbGxTdHlsZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbk1vbnRoQ2VsbFN0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25Nb250aENlbGxTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogTW9udGhDZWxsU3R5bGUsIG5ld1ZhbHVlOiBNb250aENlbGxTdHlsZSkge1xuICAgICAgICB0aGlzLm9uTW9udGhDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTW9udGhDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBNb250aENlbGxTdHlsZSwgbmV3VmFsdWU6IE1vbnRoQ2VsbFN0eWxlKSB7XG4gICAgfVxufVxuQ2FsZW5kYXJZZWFyVmlld1N0eWxlLnRpdGxlQ2VsbFN0eWxlUHJvcGVydHkucmVnaXN0ZXIoQ2FsZW5kYXJZZWFyVmlld1N0eWxlKTtcbkNhbGVuZGFyWWVhclZpZXdTdHlsZS5tb250aENlbGxTdHlsZVByb3BlcnR5LnJlZ2lzdGVyKENhbGVuZGFyWWVhclZpZXdTdHlsZSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLyoqXG4gKiBTdHlsZSBjbGFzcyBmb3IgeWVhciB2aWV3IHdpdGggbW9udGggbmFtZXMgb25seSB2aWV3IG1vZGVcbiAqL1xuZXhwb3J0IGNsYXNzIENhbGVuZGFyTW9udGhOYW1lc1ZpZXdTdHlsZSBleHRlbmRzIFZpZXdCYXNlIHtcbiAgICBvd25lcjogUmFkQ2FsZW5kYXI7XG4gICAgcHVibGljIHRpdGxlQ2VsbFN0eWxlOiBDZWxsU3R5bGU7XG4gICAgcHVibGljIG1vbnRoTmFtZUNlbGxTdHlsZTogQ2VsbFN0eWxlO1xuXG4gICAgcHVibGljIHN0YXRpYyB0aXRsZUNlbGxTdHlsZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PENhbGVuZGFyTW9udGhOYW1lc1ZpZXdTdHlsZSwgQ2VsbFN0eWxlPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJ0aXRsZUNlbGxTdHlsZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vblRpdGxlQ2VsbFN0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25UaXRsZUNlbGxTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogQ2VsbFN0eWxlLCBuZXdWYWx1ZTogQ2VsbFN0eWxlKSB7XG4gICAgICAgIHRoaXMub25UaXRsZUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UaXRsZUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWU6IENlbGxTdHlsZSwgbmV3VmFsdWU6IENlbGxTdHlsZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgbW9udGhOYW1lQ2VsbFN0eWxlUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8Q2FsZW5kYXJNb250aE5hbWVzVmlld1N0eWxlLCBDZWxsU3R5bGU+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIm1vbnRoTmFtZUNlbGxTdHlsZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbk1vbnRoTmFtZUNlbGxTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uTW9udGhOYW1lQ2VsbFN0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDZWxsU3R5bGUsIG5ld1ZhbHVlOiBDZWxsU3R5bGUpIHtcbiAgICAgICAgdGhpcy5vbk1vbnRoTmFtZUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cblxuICAgIHByb3RlY3RlZCBvbk1vbnRoTmFtZUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWU6IENlbGxTdHlsZSwgbmV3VmFsdWU6IENlbGxTdHlsZSkge1xuICAgIH1cbn1cbkNhbGVuZGFyTW9udGhOYW1lc1ZpZXdTdHlsZS50aXRsZUNlbGxTdHlsZVByb3BlcnR5LnJlZ2lzdGVyKENhbGVuZGFyTW9udGhOYW1lc1ZpZXdTdHlsZSk7XG5DYWxlbmRhck1vbnRoTmFtZXNWaWV3U3R5bGUubW9udGhOYW1lQ2VsbFN0eWxlUHJvcGVydHkucmVnaXN0ZXIoQ2FsZW5kYXJNb250aE5hbWVzVmlld1N0eWxlKTtcblxuXG4vKipcbiAqIFRoZSBzdHlsZSBjbGFzcyB3aXRoIGN1c3RvbWl6YXRpb24gcHJvcGVydGllcyBmb3IgbW9udGhzIGluIHllYXIgdmlld1xuICogTm90ZTogdGhpcyBjbGFzcyBpcyBub3QgaW5oZXJpdGVkIGZyb20gQ2VsbFN0eWxlXG4gKi9cbmV4cG9ydCBjbGFzcyBNb250aENlbGxTdHlsZSBleHRlbmRzIFZpZXdCYXNlIHtcbiAgICBvd25lcjogYW55O1xuICAgIHB1YmxpYyB3ZWVrZW5kVGV4dENvbG9yOiBDb2xvcjtcbiAgICBwdWJsaWMgdG9kYXlUZXh0Q29sb3I6IENvbG9yO1xuICAgIHB1YmxpYyBkYXlUZXh0Q29sb3I6IENvbG9yO1xuICAgIHB1YmxpYyBkYXlGb250TmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBkYXlGb250U3R5bGU6IENhbGVuZGFyRm9udFN0eWxlO1xuICAgIHB1YmxpYyBkYXlUZXh0U2l6ZTogbnVtYmVyO1xuICAgIHB1YmxpYyBkYXlOYW1lVGV4dENvbG9yOiBDb2xvcjtcbiAgICBwdWJsaWMgZGF5TmFtZUZvbnROYW1lOiBzdHJpbmc7XG4gICAgcHVibGljIGRheU5hbWVGb250U3R5bGU6IENhbGVuZGFyRm9udFN0eWxlO1xuICAgIHB1YmxpYyBkYXlOYW1lVGV4dFNpemU6IG51bWJlcjtcbiAgICBwdWJsaWMgbW9udGhOYW1lVGV4dENvbG9yOiBDb2xvcjtcbiAgICBwdWJsaWMgbW9udGhOYW1lRm9udE5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgbW9udGhOYW1lRm9udFN0eWxlOiBDYWxlbmRhckZvbnRTdHlsZTtcbiAgICBwdWJsaWMgbW9udGhOYW1lVGV4dFNpemU6IG51bWJlcjtcblxuICAgIHB1YmxpYyBzdGF0aWMgd2Vla2VuZFRleHRDb2xvclByb3BlcnR5ID0gbmV3IFByb3BlcnR5PE1vbnRoQ2VsbFN0eWxlLCBDb2xvcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwid2Vla2VuZFRleHRDb2xvclwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBlcXVhbGl0eUNvbXBhcmVyOiBDb2xvci5lcXVhbHMsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogKHYpID0+IG5ldyBDb2xvcih2KSxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uV2Vla2VuZNCiZXh0Q29sb3JQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbldlZWtlbmTQomV4dENvbG9yUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMub25XZWVrZW5kVGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbldlZWtlbmRUZXh0Q29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB0b2RheVRleHRDb2xvclByb3BlcnR5ID0gbmV3IFByb3BlcnR5PE1vbnRoQ2VsbFN0eWxlLCBDb2xvcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwidG9kYXlUZXh0Q29sb3JcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZXF1YWxpdHlDb21wYXJlcjogQ29sb3IuZXF1YWxzLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6ICh2KSA9PiBuZXcgQ29sb3IodiksXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vblRvZGF50KJleHRDb2xvclByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uVG9kYXnQomV4dENvbG9yUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMub25Ub2RheVRleHRDb2xvckNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cblxuICAgIHByb3RlY3RlZCBvblRvZGF5VGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZGF5VGV4dENvbG9yUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8TW9udGhDZWxsU3R5bGUsIENvbG9yPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJkYXlUZXh0Q29sb3JcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZXF1YWxpdHlDb21wYXJlcjogQ29sb3IuZXF1YWxzLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6ICh2KSA9PiBuZXcgQ29sb3IodiksXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkRhedCiZXh0Q29sb3JQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkRhedCiZXh0Q29sb3JQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgdGhpcy5vbkRheVRleHRDb2xvckNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EYXlUZXh0Q29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBkYXlGb250TmFtZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PE1vbnRoQ2VsbFN0eWxlLCBzdHJpbmc+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImRheUZvbnROYW1lXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uRGF5Rm9udE5hbWVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkRheUZvbnROYW1lUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5vbkRheUZvbnROYW1lQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRheUZvbnROYW1lQ2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBkYXlGb250U3R5bGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxNb250aENlbGxTdHlsZSwgQ2FsZW5kYXJGb250U3R5bGU+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImRheUZvbnRTdHlsZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogKHZhbHVlKSA9PiBDYWxlbmRhckZvbnRTdHlsZVt2YWx1ZV0sXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkRheUZvbnRTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uRGF5Rm9udFN0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDYWxlbmRhckZvbnRTdHlsZSwgbmV3VmFsdWU6IENhbGVuZGFyRm9udFN0eWxlKSB7XG4gICAgICAgIHRoaXMub25EYXlGb250U3R5bGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG5cbiAgICBwcm90ZWN0ZWQgb25EYXlGb250U3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBDYWxlbmRhckZvbnRTdHlsZSwgbmV3VmFsdWU6IENhbGVuZGFyRm9udFN0eWxlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBkYXlUZXh0U2l6ZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PE1vbnRoQ2VsbFN0eWxlLCBudW1iZXI+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImRheVRleHRTaXplXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uRGF5VGV4dFNpemVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkRheVRleHRTaXplUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5vbkRheVRleHRTaXplQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRheVRleHRTaXplQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgfVxuXG4gICAgLy8gRGF5IG5hbWUgcHJvcGVydGllc1xuICAgIHB1YmxpYyBzdGF0aWMgZGF5TmFtZVRleHRDb2xvclByb3BlcnR5ID0gbmV3IFByb3BlcnR5PE1vbnRoQ2VsbFN0eWxlLCBDb2xvcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiZGF5TmFtZVRleHRDb2xvclwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBlcXVhbGl0eUNvbXBhcmVyOiBDb2xvci5lcXVhbHMsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogKHYpID0+IG5ldyBDb2xvcih2KSxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uRGF5TmFtZdCiZXh0Q29sb3JQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkRheU5hbWXQomV4dENvbG9yUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMub25EYXlOYW1lVGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRheU5hbWVUZXh0Q29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBkYXlOYW1lRm9udE5hbWVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxNb250aENlbGxTdHlsZSwgc3RyaW5nPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJkYXlOYW1lRm9udE5hbWVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25EYXlOYW1lRm9udE5hbWVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkRheU5hbWVGb250TmFtZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMub25EYXlOYW1lRm9udE5hbWVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRGF5TmFtZUZvbnROYW1lQ2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBkYXlOYW1lRm9udFN0eWxlUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8TW9udGhDZWxsU3R5bGUsIENhbGVuZGFyRm9udFN0eWxlPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJkYXlOYW1lRm9udFN0eWxlXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiAodmFsdWUpID0+IENhbGVuZGFyRm9udFN0eWxlW3ZhbHVlXSxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uRGF5TmFtZUZvbnRTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uRGF5TmFtZUZvbnRTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogQ2FsZW5kYXJGb250U3R5bGUsIG5ld1ZhbHVlOiBDYWxlbmRhckZvbnRTdHlsZSkge1xuICAgICAgICB0aGlzLm9uRGF5TmFtZUZvbnRTdHlsZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EYXlOYW1lRm9udFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2FsZW5kYXJGb250U3R5bGUsIG5ld1ZhbHVlOiBDYWxlbmRhckZvbnRTdHlsZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZGF5TmFtZVRleHRTaXplUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8TW9udGhDZWxsU3R5bGUsIG51bWJlcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiZGF5TmFtZVRleHRTaXplXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uRGF5TmFtZVRleHRTaXplUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25EYXlOYW1lVGV4dFNpemVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLm9uRGF5TmFtZVRleHRTaXplQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRheU5hbWVUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgIH1cblxuICAgIC8vLyBNb250aCBuYW1lIHByb3BlcnRpZXNcbiAgICBwdWJsaWMgc3RhdGljIG1vbnRoTmFtZVRleHRDb2xvclByb3BlcnR5ID0gbmV3IFByb3BlcnR5PE1vbnRoQ2VsbFN0eWxlLCBDb2xvcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwibW9udGhOYW1lVGV4dENvbG9yXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGVxdWFsaXR5Q29tcGFyZXI6IENvbG9yLmVxdWFscyxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiAodikgPT4gbmV3IENvbG9yKHYpLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25Nb250aE5hbWXQomV4dENvbG9yUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25Nb250aE5hbWXQomV4dENvbG9yUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMub25Nb250aE5hbWVUZXh0Q29sb3JDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTW9udGhOYW1lVGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgbW9udGhOYW1lRm9udE5hbWVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxNb250aENlbGxTdHlsZSwgc3RyaW5nPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJtb250aE5hbWVGb250TmFtZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbk1vbnRoTmFtZUZvbnROYW1lUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25Nb250aE5hbWVGb250TmFtZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMub25Nb250aE5hbWVGb250TmFtZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Nb250aE5hbWVGb250TmFtZUNoYW5nZWQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgbW9udGhOYW1lRm9udFN0eWxlUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8TW9udGhDZWxsU3R5bGUsIENhbGVuZGFyRm9udFN0eWxlPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJtb250aE5hbWVGb250U3R5bGVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6ICh2YWx1ZSkgPT4gQ2FsZW5kYXJGb250U3R5bGVbdmFsdWVdLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25Nb250aE5hbWVGb250U3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbk1vbnRoTmFtZUZvbnRTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogQ2FsZW5kYXJGb250U3R5bGUsIG5ld1ZhbHVlOiBDYWxlbmRhckZvbnRTdHlsZSkge1xuICAgICAgICB0aGlzLm9uTW9udGhOYW1lRm9udFN0eWxlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbk1vbnRoTmFtZUZvbnRTdHlsZUNoYW5nZWQob2xkVmFsdWU6IENhbGVuZGFyRm9udFN0eWxlLCBuZXdWYWx1ZTogQ2FsZW5kYXJGb250U3R5bGUpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIG1vbnRoTmFtZVRleHRTaXplUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8TW9udGhDZWxsU3R5bGUsIG51bWJlcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwibW9udGhOYW1lVGV4dFNpemVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6IHBhcnNlRmxvYXQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbk1vbnRoTmFtZVRleHRTaXplUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25Nb250aE5hbWVUZXh0U2l6ZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub25Nb250aE5hbWVUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Nb250aE5hbWVUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgIH1cbn1cbk1vbnRoQ2VsbFN0eWxlLndlZWtlbmRUZXh0Q29sb3JQcm9wZXJ0eS5yZWdpc3RlcihNb250aENlbGxTdHlsZSk7XG5Nb250aENlbGxTdHlsZS50b2RheVRleHRDb2xvclByb3BlcnR5LnJlZ2lzdGVyKE1vbnRoQ2VsbFN0eWxlKTtcbk1vbnRoQ2VsbFN0eWxlLmRheVRleHRDb2xvclByb3BlcnR5LnJlZ2lzdGVyKE1vbnRoQ2VsbFN0eWxlKTtcbk1vbnRoQ2VsbFN0eWxlLmRheUZvbnROYW1lUHJvcGVydHkucmVnaXN0ZXIoTW9udGhDZWxsU3R5bGUpO1xuTW9udGhDZWxsU3R5bGUuZGF5Rm9udFN0eWxlUHJvcGVydHkucmVnaXN0ZXIoTW9udGhDZWxsU3R5bGUpO1xuTW9udGhDZWxsU3R5bGUuZGF5VGV4dFNpemVQcm9wZXJ0eS5yZWdpc3RlcihNb250aENlbGxTdHlsZSk7XG5Nb250aENlbGxTdHlsZS5kYXlOYW1lVGV4dENvbG9yUHJvcGVydHkucmVnaXN0ZXIoTW9udGhDZWxsU3R5bGUpO1xuTW9udGhDZWxsU3R5bGUuZGF5TmFtZUZvbnROYW1lUHJvcGVydHkucmVnaXN0ZXIoTW9udGhDZWxsU3R5bGUpO1xuTW9udGhDZWxsU3R5bGUuZGF5TmFtZUZvbnRTdHlsZVByb3BlcnR5LnJlZ2lzdGVyKE1vbnRoQ2VsbFN0eWxlKTtcbk1vbnRoQ2VsbFN0eWxlLmRheU5hbWVUZXh0U2l6ZVByb3BlcnR5LnJlZ2lzdGVyKE1vbnRoQ2VsbFN0eWxlKTtcbk1vbnRoQ2VsbFN0eWxlLm1vbnRoTmFtZVRleHRDb2xvclByb3BlcnR5LnJlZ2lzdGVyKE1vbnRoQ2VsbFN0eWxlKTtcbk1vbnRoQ2VsbFN0eWxlLm1vbnRoTmFtZUZvbnROYW1lUHJvcGVydHkucmVnaXN0ZXIoTW9udGhDZWxsU3R5bGUpO1xuTW9udGhDZWxsU3R5bGUubW9udGhOYW1lRm9udFN0eWxlUHJvcGVydHkucmVnaXN0ZXIoTW9udGhDZWxsU3R5bGUpO1xuTW9udGhDZWxsU3R5bGUubW9udGhOYW1lVGV4dFNpemVQcm9wZXJ0eS5yZWdpc3RlcihNb250aENlbGxTdHlsZSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8gQ2VsbCBzdHlsZXNcbi8vIHByb3BlcnRpZXMgbGVmdCB0byBpbXBsZW1lbnQgYnV0IGF2YWlsYWJsZSBvbmx5IGluIGlPUyA6ICBzaGFwZVN0cm9rZSAsIHNoYXBlRmlsbCwgc2hhcGVcbmV4cG9ydCBjbGFzcyBDZWxsU3R5bGUgZXh0ZW5kcyBWaWV3QmFzZSB7XG4gICAgb3duZXI6IGFueTtcbiAgICBwdWJsaWMgY2VsbEJvcmRlcldpZHRoOiBudW1iZXI7XG4gICAgcHVibGljIGNlbGxCb3JkZXJDb2xvcjogQ29sb3I7XG4gICAgcHVibGljIGNlbGxCYWNrZ3JvdW5kQ29sb3I6IENvbG9yO1xuICAgIHB1YmxpYyBjZWxsQWxpZ25tZW50OiBhbnk7XG4gICAgcHVibGljIGNlbGxUZXh0Q29sb3I6IENvbG9yO1xuICAgIHB1YmxpYyBjZWxsVGV4dEZvbnROYW1lOiBzdHJpbmc7XG4gICAgcHVibGljIGNlbGxUZXh0Rm9udFN0eWxlOiBDYWxlbmRhckZvbnRTdHlsZTtcbiAgICBwdWJsaWMgY2VsbFRleHRTaXplOiBudW1iZXI7XG4gICAgcHVibGljIGNlbGxQYWRkaW5nSG9yaXpvbnRhbDogbnVtYmVyO1xuICAgIHB1YmxpYyBjZWxsUGFkZGluZ1ZlcnRpY2FsOiBudW1iZXI7XG5cbiAgICBnZXQgaW9zKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGdldCBhbmRyb2lkKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjZWxsQm9yZGVyV2lkdGhQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxDZWxsU3R5bGUsIG51bWJlcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiY2VsbEJvcmRlcldpZHRoXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiBwYXJzZUZsb2F0LFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25DZWxsQm9yZGVyV2lkdGhQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkNlbGxCb3JkZXJXaWR0aFByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub25DZWxsQm9yZGVyV2lkdGhDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQ2VsbEJvcmRlcldpZHRoQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7IH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2VsbEJvcmRlckNvbG9yUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8Q2VsbFN0eWxlLCBDb2xvcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiY2VsbEJvcmRlckNvbG9yXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGVxdWFsaXR5Q29tcGFyZXI6IENvbG9yLmVxdWFscyxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiAodikgPT4gbmV3IENvbG9yKHYpLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25DZWxsQm9yZGVyQ29sb3JQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkNlbGxCb3JkZXJDb2xvclByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICB0aGlzLm9uQ2VsbEJvcmRlckNvbG9yQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkNlbGxCb3JkZXJDb2xvckNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHsgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjZWxsQmFja2dyb3VuZENvbG9yUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8Q2VsbFN0eWxlLCBDb2xvcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiY2VsbEJhY2tncm91bmRDb2xvclwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBlcXVhbGl0eUNvbXBhcmVyOiBDb2xvci5lcXVhbHMsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogKHYpID0+IG5ldyBDb2xvcih2KSxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uQ2VsbEJhY2tncm91bmRDb2xvclByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uQ2VsbEJhY2tncm91bmRDb2xvclByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICB0aGlzLm9uQ2VsbEJhY2tncm91bmRDb2xvckNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25DZWxsQmFja2dyb3VuZENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikgeyB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNlbGxBbGlnbm1lbnRQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxDZWxsU3R5bGUsIGFueT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiY2VsbEFsaWdubWVudFwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkNlbGxBbGlnbm1lbnRQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkNlbGxBbGlnbm1lbnRQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IGFueSwgbmV3VmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLm9uQ2VsbEFsaWdubWVudENoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25DZWxsQWxpZ25tZW50Q2hhbmdlZChvbGRWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55KSB7IH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2VsbFRleHRDb2xvclByb3BlcnR5ID0gbmV3IFByb3BlcnR5PENlbGxTdHlsZSwgQ29sb3I+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImNlbGxUZXh0Q29sb3JcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZXF1YWxpdHlDb21wYXJlcjogQ29sb3IuZXF1YWxzLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6ICh2KSA9PiBuZXcgQ29sb3IodiksXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkNlbGzQomV4dENvbG9yUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25DZWxs0KJleHRDb2xvclByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICB0aGlzLm9uQ2VsbFRleHRDb2xvckNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25DZWxsVGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2VsbFRleHRGb250TmFtZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PENlbGxTdHlsZSwgc3RyaW5nPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJjZWxsVGV4dEZvbnROYW1lXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uQ2VsbFRleHRGb250TmFtZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uQ2VsbFRleHRGb250TmFtZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMub25DZWxsVGV4dEZvbnROYW1lQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkNlbGxUZXh0Rm9udE5hbWVDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2VsbFRleHRGb250U3R5bGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxDZWxsU3R5bGUsIENhbGVuZGFyRm9udFN0eWxlPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJjZWxsVGV4dEZvbnRTdHlsZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogKHZhbHVlKSA9PiBDYWxlbmRhckZvbnRTdHlsZVt2YWx1ZV0sXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkNlbGxUZXh0Rm9udFN0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25DZWxsVGV4dEZvbnRTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogQ2FsZW5kYXJGb250U3R5bGUsIG5ld1ZhbHVlOiBDYWxlbmRhckZvbnRTdHlsZSkge1xuICAgICAgICB0aGlzLm9uQ2VsbFRleHRGb250U3R5bGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQ2VsbFRleHRGb250U3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBDYWxlbmRhckZvbnRTdHlsZSwgbmV3VmFsdWU6IENhbGVuZGFyRm9udFN0eWxlKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjZWxsVGV4dFNpemVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxDZWxsU3R5bGUsIG51bWJlcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiY2VsbFRleHRTaXplXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiBwYXJzZUZsb2F0LFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25DZWxsVGV4dFNpemVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkNlbGxUZXh0U2l6ZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub25DZWxsVGV4dFNpemVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQ2VsbFRleHRTaXplQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjZWxsUGFkZGluZ0hvcml6b250YWxQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxDZWxsU3R5bGUsIG51bWJlcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiY2VsbFBhZGRpbmdIb3Jpem9udGFsXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiBwYXJzZUludCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uQ2VsbFBhZGRpbmdIb3Jpem9udGFsUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25DZWxsUGFkZGluZ0hvcml6b250YWxQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLm9uQ2VsbFBhZGRpbmdIb3Jpem9udGFsQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkNlbGxQYWRkaW5nSG9yaXpvbnRhbENoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2VsbFBhZGRpbmdWZXJ0aWNhbFByb3BlcnR5ID0gbmV3IFByb3BlcnR5PENlbGxTdHlsZSwgbnVtYmVyPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJjZWxsUGFkZGluZ1ZlcnRpY2FsXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiBwYXJzZUludCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uQ2VsbFBhZGRpbmdWZXJ0aWNhbFByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uQ2VsbFBhZGRpbmdWZXJ0aWNhbFByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub25DZWxsUGFkZGluZ1ZlcnRpY2FsQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkNlbGxQYWRkaW5nVmVydGljYWxDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICB9XG59XG5DZWxsU3R5bGUuY2VsbEJvcmRlcldpZHRoUHJvcGVydHkucmVnaXN0ZXIoQ2VsbFN0eWxlKTtcbkNlbGxTdHlsZS5jZWxsQm9yZGVyQ29sb3JQcm9wZXJ0eS5yZWdpc3RlcihDZWxsU3R5bGUpO1xuQ2VsbFN0eWxlLmNlbGxCYWNrZ3JvdW5kQ29sb3JQcm9wZXJ0eS5yZWdpc3RlcihDZWxsU3R5bGUpO1xuQ2VsbFN0eWxlLmNlbGxBbGlnbm1lbnRQcm9wZXJ0eS5yZWdpc3RlcihDZWxsU3R5bGUpO1xuQ2VsbFN0eWxlLmNlbGxUZXh0Q29sb3JQcm9wZXJ0eS5yZWdpc3RlcihDZWxsU3R5bGUpO1xuQ2VsbFN0eWxlLmNlbGxUZXh0Rm9udE5hbWVQcm9wZXJ0eS5yZWdpc3RlcihDZWxsU3R5bGUpO1xuQ2VsbFN0eWxlLmNlbGxUZXh0Rm9udFN0eWxlUHJvcGVydHkucmVnaXN0ZXIoQ2VsbFN0eWxlKTtcbkNlbGxTdHlsZS5jZWxsVGV4dFNpemVQcm9wZXJ0eS5yZWdpc3RlcihDZWxsU3R5bGUpO1xuQ2VsbFN0eWxlLmNlbGxQYWRkaW5nSG9yaXpvbnRhbFByb3BlcnR5LnJlZ2lzdGVyKENlbGxTdHlsZSk7XG5DZWxsU3R5bGUuY2VsbFBhZGRpbmdWZXJ0aWNhbFByb3BlcnR5LnJlZ2lzdGVyKENlbGxTdHlsZSk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vIERheSBFdmVudHMgVmlldyBzdHlsZVxuZXhwb3J0IGNsYXNzIERheUV2ZW50c1ZpZXdTdHlsZSBleHRlbmRzIFZpZXdCYXNlIHtcbiAgICBvd25lcjogYW55O1xuICAgIHB1YmxpYyBiYWNrZ3JvdW5kQ29sb3I6IENvbG9yO1xuICAgIHB1YmxpYyB0aW1lTGFiZWxGb3JtYXQ6IHN0cmluZztcbiAgICBwdWJsaWMgdGltZUxhYmVsVGV4dENvbG9yOiBDb2xvcjtcbiAgICBwdWJsaWMgdGltZUxhYmVsVGV4dFNpemU6IG51bWJlcjtcbiAgICBwdWJsaWMgdGltZUxpbmVzV2lkdGg6IG51bWJlcjtcbiAgICBwdWJsaWMgdGltZUxpbmVzQ29sb3I6IENvbG9yO1xuXG4gICAgZ2V0IGlvcygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBnZXQgYW5kcm9pZCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgYmFja2dyb3VuZENvbG9yUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8RGF5RXZlbnRzVmlld1N0eWxlLCBDb2xvcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiYmFja2dyb3VuZENvbG9yXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGVxdWFsaXR5Q29tcGFyZXI6IENvbG9yLmVxdWFscyxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiAodikgPT4gbmV3IENvbG9yKHYpLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25CYWNrZ3JvdW5kQ29sb3JQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkJhY2tncm91bmRDb2xvclByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICB0aGlzLm9uQmFja2dyb3VuZENvbG9yQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkJhY2tncm91bmRDb2xvckNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHRpbWVMYWJlbEZvcm1hdFByb3BlcnR5ID0gbmV3IFByb3BlcnR5PERheUV2ZW50c1ZpZXdTdHlsZSwgc3RyaW5nPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJ0aW1lTGFiZWxGb3JtYXRcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25UaW1lTGFiZWxGb3JtYXRQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvblRpbWVMYWJlbEZvcm1hdFByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMub25UaW1lTGFiZWxGb3JtYXRDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVGltZUxhYmVsRm9ybWF0Q2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB0aW1lTGFiZWxUZXh0Q29sb3JQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxEYXlFdmVudHNWaWV3U3R5bGUsIENvbG9yPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJ0aW1lTGFiZWxUZXh0Q29sb3JcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZXF1YWxpdHlDb21wYXJlcjogQ29sb3IuZXF1YWxzLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6ICh2KSA9PiBuZXcgQ29sb3IodiksXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vblRpbWVMYWJlbFRleHRDb2xvclByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uVGltZUxhYmVsVGV4dENvbG9yUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMub25UaW1lTGFiZWxUZXh0Q29sb3JDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVGltZUxhYmVsVGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdGltZUxhYmVsRm9udE5hbWVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxEYXlFdmVudHNWaWV3U3R5bGUsIHN0cmluZz4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwidGltZUxhYmVsRm9udE5hbWVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25UaW1lTGFiZWxGb250TmFtZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uVGltZUxhYmVsRm9udE5hbWVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLm9uVGltZUxhYmVsRm9udE5hbWVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVGltZUxhYmVsRm9udE5hbWVDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHRpbWVMYWJlbEZvbnRTdHlsZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PERheUV2ZW50c1ZpZXdTdHlsZSwgQ2FsZW5kYXJGb250U3R5bGU+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInRpbWVMYWJlbEZvbnRTdHlsZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogKHZhbHVlKSA9PiBDYWxlbmRhckZvbnRTdHlsZVt2YWx1ZV0sXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vblRpbWVMYWJlbEZvbnRTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uVGltZUxhYmVsRm9udFN0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDYWxlbmRhckZvbnRTdHlsZSwgbmV3VmFsdWU6IENhbGVuZGFyRm9udFN0eWxlKSB7XG4gICAgICAgIHRoaXMub25UaW1lTGFiZWxGb250U3R5bGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVGltZUxhYmVsRm9udFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2FsZW5kYXJGb250U3R5bGUsIG5ld1ZhbHVlOiBDYWxlbmRhckZvbnRTdHlsZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdGltZUxhYmVsVGV4dFNpemVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxEYXlFdmVudHNWaWV3U3R5bGUsIG51bWJlcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwidGltZUxhYmVsVGV4dFNpemVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6IHBhcnNlRmxvYXQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vblRpbWVMYWJlbFRleHRTaXplUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25UaW1lTGFiZWxUZXh0U2l6ZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub25UaW1lTGFiZWxUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UaW1lTGFiZWxUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdGltZUxpbmVzV2lkdGhQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxEYXlFdmVudHNWaWV3U3R5bGUsIG51bWJlcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwidGltZUxpbmVzV2lkdGhcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6IHBhcnNlRmxvYXQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vblRpbWVMaW5lc1dpZHRoUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25UaW1lTGluZXNXaWR0aFByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub25UaW1lTGluZXNXaWR0aENoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UaW1lTGluZXNXaWR0aENoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdGltZUxpbmVzQ29sb3JQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxEYXlFdmVudHNWaWV3U3R5bGUsIENvbG9yPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJ0aW1lTGluZXNDb2xvclwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBlcXVhbGl0eUNvbXBhcmVyOiBDb2xvci5lcXVhbHMsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogKHYpID0+IG5ldyBDb2xvcih2KSxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uVGltZUxpbmVzQ29sb3JQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvblRpbWVMaW5lc0NvbG9yUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMub25UaW1lTGluZXNDb2xvckNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UaW1lTGluZXNDb2xvckNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICB9XG59XG5EYXlFdmVudHNWaWV3U3R5bGUuYmFja2dyb3VuZENvbG9yUHJvcGVydHkucmVnaXN0ZXIoRGF5RXZlbnRzVmlld1N0eWxlKTtcbkRheUV2ZW50c1ZpZXdTdHlsZS50aW1lTGFiZWxGb3JtYXRQcm9wZXJ0eS5yZWdpc3RlcihEYXlFdmVudHNWaWV3U3R5bGUpO1xuRGF5RXZlbnRzVmlld1N0eWxlLnRpbWVMYWJlbFRleHRDb2xvclByb3BlcnR5LnJlZ2lzdGVyKERheUV2ZW50c1ZpZXdTdHlsZSk7XG5EYXlFdmVudHNWaWV3U3R5bGUudGltZUxhYmVsRm9udE5hbWVQcm9wZXJ0eS5yZWdpc3RlcihEYXlFdmVudHNWaWV3U3R5bGUpO1xuRGF5RXZlbnRzVmlld1N0eWxlLnRpbWVMYWJlbEZvbnRTdHlsZVByb3BlcnR5LnJlZ2lzdGVyKERheUV2ZW50c1ZpZXdTdHlsZSk7XG5EYXlFdmVudHNWaWV3U3R5bGUudGltZUxhYmVsVGV4dFNpemVQcm9wZXJ0eS5yZWdpc3RlcihEYXlFdmVudHNWaWV3U3R5bGUpO1xuRGF5RXZlbnRzVmlld1N0eWxlLnRpbWVMaW5lc1dpZHRoUHJvcGVydHkucmVnaXN0ZXIoRGF5RXZlbnRzVmlld1N0eWxlKTtcbkRheUV2ZW50c1ZpZXdTdHlsZS50aW1lTGluZXNDb2xvclByb3BlcnR5LnJlZ2lzdGVyKERheUV2ZW50c1ZpZXdTdHlsZSk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vIEFsbCBEYXkgVmlldyBzdHlsZVxuZXhwb3J0IGNsYXNzIEFsbERheUV2ZW50c1ZpZXdTdHlsZSBleHRlbmRzIFZpZXdCYXNlIHtcbiAgICBvd25lcjogYW55O1xuICAgIHB1YmxpYyBiYWNrZ3JvdW5kQ29sb3I6IENvbG9yO1xuICAgIHB1YmxpYyBhbGxEYXlUZXh0OiBzdHJpbmc7XG4gICAgcHVibGljIGFsbERheVRleHRJc1Zpc2libGU6IGJvb2xlYW47XG4gICAgcHVibGljIHN0YXRpYyBBTExfREFZX1RFWFQgPSBcIkFMTC1EQVlcIjtcblxuICAgIGdldCBpb3MoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZ2V0IGFuZHJvaWQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGJhY2tncm91bmRDb2xvclByb3BlcnR5ID0gbmV3IFByb3BlcnR5PEFsbERheUV2ZW50c1ZpZXdTdHlsZSwgQ29sb3I+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImJhY2tncm91bmRDb2xvclwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBlcXVhbGl0eUNvbXBhcmVyOiBDb2xvci5lcXVhbHMsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogKHYpID0+IG5ldyBDb2xvcih2KSxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uQmFja2dyb3VuZENvbG9yUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25CYWNrZ3JvdW5kQ29sb3JQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgdGhpcy5vbkJhY2tncm91bmRDb2xvckNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25CYWNrZ3JvdW5kQ29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBhbGxEYXlUZXh0UHJvcGVydHkgPSBuZXcgUHJvcGVydHk8QWxsRGF5RXZlbnRzVmlld1N0eWxlLCBzdHJpbmc+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImFsbERheVRleHRcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogQWxsRGF5RXZlbnRzVmlld1N0eWxlLkFMTF9EQVlfVEVYVCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uQWxsRGF5VGV4dFByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uQWxsRGF5VGV4dFByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMub25BbGxEYXlUZXh0Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkFsbERheVRleHRDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGFsbERheVRleHRJc1Zpc2libGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxBbGxEYXlFdmVudHNWaWV3U3R5bGUsIGJvb2xlYW4+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImFsbERheVRleHRJc1Zpc2libGVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6IGJvb2xlYW5Db252ZXJ0ZXIsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkFsbERheVRleHRJc1Zpc2libGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkFsbERheVRleHRJc1Zpc2libGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IGJvb2xlYW4sIG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMub25BbERheVRleHRJc1Zpc2libGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQWxEYXlUZXh0SXNWaXNpYmxlQ2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICB9XG59XG5BbGxEYXlFdmVudHNWaWV3U3R5bGUuYmFja2dyb3VuZENvbG9yUHJvcGVydHkucmVnaXN0ZXIoQWxsRGF5RXZlbnRzVmlld1N0eWxlKTtcbkFsbERheUV2ZW50c1ZpZXdTdHlsZS5hbGxEYXlUZXh0UHJvcGVydHkucmVnaXN0ZXIoQWxsRGF5RXZlbnRzVmlld1N0eWxlKTtcbkFsbERheUV2ZW50c1ZpZXdTdHlsZS5hbGxEYXlUZXh0SXNWaXNpYmxlUHJvcGVydHkucmVnaXN0ZXIoQWxsRGF5RXZlbnRzVmlld1N0eWxlKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gIERheUNlbGxTdHlsZVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gcHJvcGVydGllcyBhdmFpbGFibGUgaW4gaW9zIG9ubHk6IGFsbERheUV2ZW50VGV4dENvbG9yLCBldmVudEFsaWdubWVudCwgZXZlbnRTcGFjaW5nLCBldmVudFNoYXBlLCBldmVudE9yaWVudGF0aW9uLCBzdHJldGNoRXZlbnRzLCBtYXhFdmVudHNDb3VudCwgd3JhcEV2ZW50VGV4dFxuZXhwb3J0IGNsYXNzIERheUNlbGxTdHlsZSBleHRlbmRzIENlbGxTdHlsZSB7XG4gICAgcHVibGljIHNob3dFdmVudHNUZXh0OiBib29sZWFuO1xuICAgIHB1YmxpYyBldmVudFRleHRDb2xvcjogQ29sb3I7XG4gICAgcHVibGljIGV2ZW50Rm9udE5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgZXZlbnRGb250U3R5bGU6IENhbGVuZGFyRm9udFN0eWxlO1xuICAgIHB1YmxpYyBldmVudFRleHRTaXplOiBudW1iZXI7XG5cbiAgICBwdWJsaWMgc3RhdGljIHNob3dFdmVudHNUZXh0UHJvcGVydHkgPSBuZXcgUHJvcGVydHk8RGF5Q2VsbFN0eWxlLCBib29sZWFuPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJzaG93RXZlbnRzVGV4dFwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogYm9vbGVhbkNvbnZlcnRlcixcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uU2hvd0V2ZW50c1RleHRQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvblNob3dFdmVudHNUZXh0UHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLm9uU2hvd0V2ZW50c1RleHRDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2hvd0V2ZW50c1RleHRDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikgeyB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGV2ZW50VGV4dENvbG9yUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8RGF5Q2VsbFN0eWxlLCBDb2xvcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiZXZlbnRUZXh0Q29sb3JcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZXF1YWxpdHlDb21wYXJlcjogQ29sb3IuZXF1YWxzLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6ICh2KSA9PiBuZXcgQ29sb3IodiksXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkV2ZW50VGV4dENvbG9yUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25FdmVudFRleHRDb2xvclByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICB0aGlzLm9uRXZlbnRUZXh0Q29sb3JDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRXZlbnRUZXh0Q29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7IH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZXZlbnRGb250TmFtZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PERheUNlbGxTdHlsZSwgc3RyaW5nPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJldmVudEZvbnROYW1lXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uRXZlbnRGb250TmFtZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uRXZlbnRGb250TmFtZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMub25FdmVudEZvbnROYW1lQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkV2ZW50Rm9udE5hbWVDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHsgfVxuXG4gICAgcHVibGljIHN0YXRpYyBldmVudEZvbnRTdHlsZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PERheUNlbGxTdHlsZSwgQ2FsZW5kYXJGb250U3R5bGU+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImV2ZW50Rm9udFN0eWxlXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiAodmFsdWUpID0+IENhbGVuZGFyRm9udFN0eWxlW3ZhbHVlXSxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uRXZlbnRGb250U3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkV2ZW50Rm9udFN0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDYWxlbmRhckZvbnRTdHlsZSwgbmV3VmFsdWU6IENhbGVuZGFyRm9udFN0eWxlKSB7XG4gICAgICAgIHRoaXMub25FdmVudEZvbnRTdHlsZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25FdmVudEZvbnRTdHlsZUNoYW5nZWQob2xkVmFsdWU6IENhbGVuZGFyRm9udFN0eWxlLCBuZXdWYWx1ZTogQ2FsZW5kYXJGb250U3R5bGUpIHsgfVxuXG4gICAgcHVibGljIHN0YXRpYyBldmVudFRleHRTaXplUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8RGF5Q2VsbFN0eWxlLCBudW1iZXI+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImV2ZW50VGV4dFNpemVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6IHBhcnNlRmxvYXQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkV2ZW50VGV4dFNpemVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkV2ZW50VGV4dFNpemVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLm9uRXZlbnRUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25FdmVudFRleHRTaXplQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgfVxufVxuRGF5Q2VsbFN0eWxlLnNob3dFdmVudHNUZXh0UHJvcGVydHkucmVnaXN0ZXIoRGF5Q2VsbFN0eWxlKTtcbkRheUNlbGxTdHlsZS5ldmVudFRleHRDb2xvclByb3BlcnR5LnJlZ2lzdGVyKERheUNlbGxTdHlsZSk7XG5EYXlDZWxsU3R5bGUuZXZlbnRGb250TmFtZVByb3BlcnR5LnJlZ2lzdGVyKERheUNlbGxTdHlsZSk7XG5EYXlDZWxsU3R5bGUuZXZlbnRGb250U3R5bGVQcm9wZXJ0eS5yZWdpc3RlcihEYXlDZWxsU3R5bGUpO1xuRGF5Q2VsbFN0eWxlLmV2ZW50VGV4dFNpemVQcm9wZXJ0eS5yZWdpc3RlcihEYXlDZWxsU3R5bGUpO1xuXG5cbi8qKlxuICogQ2VsbCBzdHlsZSBjbGFzcyBmb3IgaW5saW5lIGV2ZW50cyBjZWxscyBpbiBtb250aCB2aWV3XG4gKi9cbi8vIG1pc3NpbmcgZm9yIGlvczogc2VwYXJhdG9yQ29sb3IgJiBzaGFwZSBzaXplXG5leHBvcnQgY2xhc3MgSW5saW5lRXZlbnRDZWxsU3R5bGUgZXh0ZW5kcyBWaWV3QmFzZSB7XG4gICAgcHVibGljIGNlbGxCYWNrZ3JvdW5kQ29sb3I6IENvbG9yO1xuICAgIHB1YmxpYyBldmVudFRleHRDb2xvcjogQ29sb3I7XG4gICAgcHVibGljIGV2ZW50Rm9udE5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgZXZlbnRGb250U3R5bGU6IENhbGVuZGFyRm9udFN0eWxlO1xuICAgIHB1YmxpYyBldmVudFRleHRTaXplOiBudW1iZXI7XG4gICAgcHVibGljIHRpbWVUZXh0Q29sb3I6IENvbG9yO1xuICAgIHB1YmxpYyB0aW1lRm9udE5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgdGltZUZvbnRTdHlsZTogQ2FsZW5kYXJGb250U3R5bGU7XG4gICAgcHVibGljIHRpbWVUZXh0U2l6ZTogbnVtYmVyO1xuXG4gICAgcHVibGljIHN0YXRpYyBjZWxsQmFja2dyb3VuZENvbG9yUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8SW5saW5lRXZlbnRDZWxsU3R5bGUsIENvbG9yPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJjZWxsQmFja2dyb3VuZENvbG9yXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGVxdWFsaXR5Q29tcGFyZXI6IENvbG9yLmVxdWFscyxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiAodikgPT4gbmV3IENvbG9yKHYpLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25DZWxsQmFja2dyb3VuZENvbG9yUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25DZWxsQmFja2dyb3VuZENvbG9yUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMub25DZWxsQmFja2dyb3VuZENvbG9yQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkNlbGxCYWNrZ3JvdW5kQ29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7IH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZXZlbnRUZXh0Q29sb3JQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxJbmxpbmVFdmVudENlbGxTdHlsZSwgQ29sb3I+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImV2ZW50VGV4dENvbG9yXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGVxdWFsaXR5Q29tcGFyZXI6IENvbG9yLmVxdWFscyxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiAodikgPT4gbmV3IENvbG9yKHYpLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25FdmVudFRleHRDb2xvclByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uRXZlbnRUZXh0Q29sb3JQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgdGhpcy5vbkV2ZW50VGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkV2ZW50VGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikgeyB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGV2ZW50Rm9udE5hbWVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxJbmxpbmVFdmVudENlbGxTdHlsZSwgc3RyaW5nPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJldmVudEZvbnROYW1lXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uRXZlbnRGb250TmFtZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uRXZlbnRGb250TmFtZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMub25FdmVudEZvbnROYW1lQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkV2ZW50Rm9udE5hbWVDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHsgfVxuXG4gICAgcHVibGljIHN0YXRpYyBldmVudEZvbnRTdHlsZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PElubGluZUV2ZW50Q2VsbFN0eWxlLCBDYWxlbmRhckZvbnRTdHlsZT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiZXZlbnRGb250U3R5bGVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6ICh2YWx1ZSkgPT4gQ2FsZW5kYXJGb250U3R5bGVbdmFsdWVdLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25FdmVudEZvbnRTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uRXZlbnRGb250U3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IENhbGVuZGFyRm9udFN0eWxlLCBuZXdWYWx1ZTogQ2FsZW5kYXJGb250U3R5bGUpIHtcbiAgICAgICAgdGhpcy5vbkV2ZW50Rm9udFN0eWxlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkV2ZW50Rm9udFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2FsZW5kYXJGb250U3R5bGUsIG5ld1ZhbHVlOiBDYWxlbmRhckZvbnRTdHlsZSkgeyB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGV2ZW50VGV4dFNpemVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxJbmxpbmVFdmVudENlbGxTdHlsZSwgbnVtYmVyPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJldmVudFRleHRTaXplXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiBwYXJzZUZsb2F0LFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25FdmVudFRleHRTaXplUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25FdmVudFRleHRTaXplUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5vbkV2ZW50VGV4dFNpemVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRXZlbnRUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdGltZVRleHRDb2xvclByb3BlcnR5ID0gbmV3IFByb3BlcnR5PElubGluZUV2ZW50Q2VsbFN0eWxlLCBDb2xvcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwidGltZVRleHRDb2xvclwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBlcXVhbGl0eUNvbXBhcmVyOiBDb2xvci5lcXVhbHMsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogKHYpID0+IG5ldyBDb2xvcih2KSxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uVGltZVRleHRDb2xvclByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uVGltZVRleHRDb2xvclByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICB0aGlzLm9uVGltZVRleHRDb2xvckNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UaW1lVGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikgeyB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHRpbWVGb250TmFtZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PElubGluZUV2ZW50Q2VsbFN0eWxlLCBzdHJpbmc+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInRpbWVGb250TmFtZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vblRpbWVGb250TmFtZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uVGltZUZvbnROYW1lUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5vblRpbWVGb250TmFtZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cblxuICAgIHByb3RlY3RlZCBvblRpbWVGb250TmFtZUNoYW5nZWQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykgeyB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHRpbWVGb250U3R5bGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxJbmxpbmVFdmVudENlbGxTdHlsZSwgQ2FsZW5kYXJGb250U3R5bGU+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInRpbWVGb250U3R5bGVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6ICh2YWx1ZSkgPT4gQ2FsZW5kYXJGb250U3R5bGVbdmFsdWVdLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25UaW1lRm9udFN0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25UaW1lRm9udFN0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDYWxlbmRhckZvbnRTdHlsZSwgbmV3VmFsdWU6IENhbGVuZGFyRm9udFN0eWxlKSB7XG4gICAgICAgIHRoaXMub25UaW1lRm9udFN0eWxlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuXG4gICAgcHJvdGVjdGVkIG9uVGltZUZvbnRTdHlsZUNoYW5nZWQob2xkVmFsdWU6IENhbGVuZGFyRm9udFN0eWxlLCBuZXdWYWx1ZTogQ2FsZW5kYXJGb250U3R5bGUpIHsgfVxuXG4gICAgcHVibGljIHN0YXRpYyB0aW1lVGV4dFNpemVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxJbmxpbmVFdmVudENlbGxTdHlsZSwgbnVtYmVyPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJ0aW1lVGV4dFNpemVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6IHBhcnNlRmxvYXQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vblRpbWVUZXh0U2l6ZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uVGltZVRleHRTaXplUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5vblRpbWVUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UaW1lVGV4dFNpemVDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHsgfVxufVxuSW5saW5lRXZlbnRDZWxsU3R5bGUuY2VsbEJhY2tncm91bmRDb2xvclByb3BlcnR5LnJlZ2lzdGVyKElubGluZUV2ZW50Q2VsbFN0eWxlKTtcbklubGluZUV2ZW50Q2VsbFN0eWxlLmV2ZW50VGV4dENvbG9yUHJvcGVydHkucmVnaXN0ZXIoSW5saW5lRXZlbnRDZWxsU3R5bGUpO1xuSW5saW5lRXZlbnRDZWxsU3R5bGUuZXZlbnRGb250TmFtZVByb3BlcnR5LnJlZ2lzdGVyKElubGluZUV2ZW50Q2VsbFN0eWxlKTtcbklubGluZUV2ZW50Q2VsbFN0eWxlLmV2ZW50Rm9udFN0eWxlUHJvcGVydHkucmVnaXN0ZXIoSW5saW5lRXZlbnRDZWxsU3R5bGUpO1xuSW5saW5lRXZlbnRDZWxsU3R5bGUuZXZlbnRUZXh0U2l6ZVByb3BlcnR5LnJlZ2lzdGVyKElubGluZUV2ZW50Q2VsbFN0eWxlKTtcbklubGluZUV2ZW50Q2VsbFN0eWxlLnRpbWVUZXh0Q29sb3JQcm9wZXJ0eS5yZWdpc3RlcihJbmxpbmVFdmVudENlbGxTdHlsZSk7XG5JbmxpbmVFdmVudENlbGxTdHlsZS50aW1lRm9udE5hbWVQcm9wZXJ0eS5yZWdpc3RlcihJbmxpbmVFdmVudENlbGxTdHlsZSk7XG5JbmxpbmVFdmVudENlbGxTdHlsZS50aW1lRm9udFN0eWxlUHJvcGVydHkucmVnaXN0ZXIoSW5saW5lRXZlbnRDZWxsU3R5bGUpO1xuSW5saW5lRXZlbnRDZWxsU3R5bGUudGltZVRleHRTaXplUHJvcGVydHkucmVnaXN0ZXIoSW5saW5lRXZlbnRDZWxsU3R5bGUpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjbGFzcyBSYWRDYWxlbmRhciBleHRlbmRzIFZpZXcge1xuICAgIC8vIHB1YmxpYyBzdGF0aWMgZGF0ZVNlbGVjdGluZ0V2ZW50IDogc3RyaW5nID0gXCJkYXRlU2VsZWN0aW5nXCI7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlU2VsZWN0ZWRFdmVudDogc3RyaW5nID0gXCJkYXRlU2VsZWN0ZWRcIjtcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVEZXNlbGVjdGVkRXZlbnQ6IHN0cmluZyA9IFwiZGF0ZURlc2VsZWN0ZWRcIjtcbiAgICBwdWJsaWMgc3RhdGljIGNlbGxUYXBFdmVudDogc3RyaW5nID0gXCJjZWxsVGFwXCI7XG4gICAgcHVibGljIHN0YXRpYyBpbmxpbmVFdmVudFNlbGVjdGVkRXZlbnQ6IHN0cmluZyA9IFwiaW5saW5lRXZlbnRTZWxlY3RlZFwiO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF5Vmlld0V2ZW50U2VsZWN0ZWRFdmVudDogc3RyaW5nID0gXCJkYXlWaWV3RXZlbnRTZWxlY3RlZFwiO1xuICAgIHB1YmxpYyBzdGF0aWMgbmF2aWdhdGVkVG9EYXRlRXZlbnQ6IHN0cmluZyA9IFwibmF2aWdhdGVkVG9EYXRlXCI7XG4gICAgcHVibGljIHN0YXRpYyBuYXZpZ2F0aW5nVG9EYXRlU3RhcnRlZEV2ZW50OiBzdHJpbmcgPSBcIm5hdmlnYXRpbmdUb0RhdGVTdGFydGVkXCI7XG4gICAgcHVibGljIHN0YXRpYyB2aWV3TW9kZUNoYW5nZWRFdmVudDogc3RyaW5nID0gXCJ2aWV3TW9kZUNoYW5nZWRcIjtcblxuICAgIHB1YmxpYyBsb2NhbGU6IHN0cmluZztcbiAgICBwdWJsaWMgbWluRGF0ZTogRGF0ZTtcbiAgICBwdWJsaWMgbWF4RGF0ZTogRGF0ZTtcbiAgICBwdWJsaWMgc2VsZWN0ZWREYXRlOiBEYXRlO1xuICAgIHB1YmxpYyBzZWxlY3RlZERhdGVzOiBhbnk7XG4gICAgcHVibGljIHNlbGVjdGVkRGF0ZVJhbmdlOiBEYXRlUmFuZ2U7XG4gICAgcHVibGljIHZpZXdNb2RlOiBDYWxlbmRhclZpZXdNb2RlO1xuICAgIHB1YmxpYyBldmVudHNWaWV3TW9kZTogQ2FsZW5kYXJFdmVudHNWaWV3TW9kZTtcbiAgICBwdWJsaWMgc2VsZWN0aW9uTW9kZTogQ2FsZW5kYXJTZWxlY3Rpb25Nb2RlO1xuICAgIHB1YmxpYyB0cmFuc2l0aW9uTW9kZTogQ2FsZW5kYXJUcmFuc2l0aW9uTW9kZTtcbiAgICBwdWJsaWMgZGlzcGxheWVkRGF0ZTogRGF0ZTtcbiAgICBwdWJsaWMgZXZlbnRTb3VyY2U6IE9ic2VydmFibGVBcnJheTxDYWxlbmRhckV2ZW50PjtcbiAgICBwdWJsaWMgaG9yaXpvbnRhbFRyYW5zaXRpb246IGJvb2xlYW47XG4gICAgcHVibGljIGRheVZpZXdTdHlsZTogQ2FsZW5kYXJEYXlWaWV3U3R5bGU7XG4gICAgcHVibGljIG1vbnRoVmlld1N0eWxlOiBDYWxlbmRhck1vbnRoVmlld1N0eWxlO1xuICAgIHB1YmxpYyB3ZWVrVmlld1N0eWxlOiBDYWxlbmRhcldlZWtWaWV3U3R5bGU7XG4gICAgcHVibGljIHllYXJWaWV3U3R5bGU6IENhbGVuZGFyWWVhclZpZXdTdHlsZTtcbiAgICBwdWJsaWMgbW9udGhOYW1lc1ZpZXdTdHlsZTogQ2FsZW5kYXJNb250aE5hbWVzVmlld1N0eWxlO1xuXG4gICAgcHVibGljIHN0YXRpYyBsb2NhbGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxSYWRDYWxlbmRhciwgc3RyaW5nPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJsb2NhbGVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0OiBSYWRDYWxlbmRhciwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTG9jYWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgcHJvdGVjdGVkIG9uTG9jYWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgbWluRGF0ZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFJhZENhbGVuZGFyLCBEYXRlPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJtaW5EYXRlXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGVxdWFsaXR5Q29tcGFyZXI6ICh4LCB5KSA9PiB4IDw9IHkgJiYgeCA+PSB5LFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6ICh2YWx1ZSkgPT4gbmV3IERhdGUodmFsdWUpLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25NaW5EYXRlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25NaW5EYXRlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBEYXRlLCBuZXdWYWx1ZTogRGF0ZSkge1xuICAgICAgICB0aGlzLm9uTWluRGF0ZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIG1heERhdGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxSYWRDYWxlbmRhciwgRGF0ZT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwibWF4RGF0ZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBlcXVhbGl0eUNvbXBhcmVyOiAoeCwgeSkgPT4geCA8PSB5ICYmIHggPj0geSxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiAodmFsdWUpID0+IG5ldyBEYXRlKHZhbHVlKSxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTWF4RGF0ZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uTWF4RGF0ZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogRGF0ZSwgbmV3VmFsdWU6IERhdGUpIHtcbiAgICAgICAgdGhpcy5vbk1heERhdGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzZWxlY3RlZERhdGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxSYWRDYWxlbmRhciwgRGF0ZT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwic2VsZWN0ZWREYXRlXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGVxdWFsaXR5Q29tcGFyZXI6ICh4LCB5KSA9PiB4IDw9IHkgJiYgeCA+PSB5LFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6ICh2YWx1ZSkgPT4gbmV3IERhdGUodmFsdWUpLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25TZWxlY3RlZERhdGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvblNlbGVjdGVkRGF0ZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogRGF0ZSwgbmV3VmFsdWU6IERhdGUpIHtcbiAgICAgICAgdGhpcy5vblNlbGVjdGVkRGF0ZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNlbGVjdGVkRGF0ZXNQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxSYWRDYWxlbmRhciwgYW55PihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJzZWxlY3RlZERhdGVzXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uU2VsZWN0ZWREYXRlc1Byb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uU2VsZWN0ZWREYXRlc1Byb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMub25TZWxlY3RlZERhdGVzQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2VsZWN0ZWREYXRlUmFuZ2VQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxSYWRDYWxlbmRhciwgRGF0ZVJhbmdlPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJzZWxlY3RlZERhdGVSYW5nZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vblNlbGVjdGVkRGF0ZVJhbmdlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25TZWxlY3RlZERhdGVSYW5nZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogRGF0ZVJhbmdlLCBuZXdWYWx1ZTogRGF0ZVJhbmdlKSB7XG4gICAgICAgIHRoaXMub25TZWxlY3RlZERhdGVSYW5nZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHZpZXdNb2RlUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8UmFkQ2FsZW5kYXIsIENhbGVuZGFyVmlld01vZGU+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInZpZXdNb2RlXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IENhbGVuZGFyVmlld01vZGUuTW9udGgsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogKHZhbHVlKSA9PiBDYWxlbmRhclZpZXdNb2RlW3ZhbHVlXSxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uVmlld01vZGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvblZpZXdNb2RlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDYWxlbmRhclZpZXdNb2RlLCBuZXdWYWx1ZTogQ2FsZW5kYXJWaWV3TW9kZSkge1xuICAgICAgICB0aGlzLm9uVmlld01vZGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBldmVudHNWaWV3TW9kZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFJhZENhbGVuZGFyLCBDYWxlbmRhckV2ZW50c1ZpZXdNb2RlPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJldmVudHNWaWV3TW9kZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBDYWxlbmRhckV2ZW50c1ZpZXdNb2RlLk5vbmUsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogKHZhbHVlKSA9PiBDYWxlbmRhckV2ZW50c1ZpZXdNb2RlW3ZhbHVlXSxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uRXZlbnRzVmlld01vZGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkV2ZW50c1ZpZXdNb2RlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDYWxlbmRhckV2ZW50c1ZpZXdNb2RlLCBuZXdWYWx1ZTogQ2FsZW5kYXJFdmVudHNWaWV3TW9kZSkge1xuICAgICAgICB0aGlzLm9uRXZlbnRzVmlld01vZGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzZWxlY3Rpb25Nb2RlUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8UmFkQ2FsZW5kYXIsIENhbGVuZGFyU2VsZWN0aW9uTW9kZT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwic2VsZWN0aW9uTW9kZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBDYWxlbmRhclNlbGVjdGlvbk1vZGUuU2luZ2xlLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6ICh2YWx1ZSkgPT4gQ2FsZW5kYXJTZWxlY3Rpb25Nb2RlW3ZhbHVlXSxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uU2VsZWN0aW9uTW9kZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uU2VsZWN0aW9uTW9kZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogQ2FsZW5kYXJTZWxlY3Rpb25Nb2RlLCBuZXdWYWx1ZTogQ2FsZW5kYXJTZWxlY3Rpb25Nb2RlKSB7XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb25Nb2RlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdHJhbnNpdGlvbk1vZGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxSYWRDYWxlbmRhciwgQ2FsZW5kYXJUcmFuc2l0aW9uTW9kZT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwidHJhbnNpdGlvbk1vZGVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogQ2FsZW5kYXJUcmFuc2l0aW9uTW9kZS5TbGlkZSxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiAodmFsdWUpID0+IENhbGVuZGFyVHJhbnNpdGlvbk1vZGVbdmFsdWVdLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25UcmFuc2l0aW9uTW9kZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uVHJhbnNpdGlvbk1vZGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IENhbGVuZGFyVHJhbnNpdGlvbk1vZGUsIG5ld1ZhbHVlOiBDYWxlbmRhclRyYW5zaXRpb25Nb2RlKSB7XG4gICAgICAgIHRoaXMub25UcmFuc2l0aW9uTW9kZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyBQZXJoYXBzIGN1cnJlbnREYXRlIHdvdWxkIGJlIGEgYmV0dGVyIG5hbWUgZm9yIHRoaXMgOi9cbiAgICBwdWJsaWMgc3RhdGljIGRpc3BsYXllZERhdGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxSYWRDYWxlbmRhciwgRGF0ZT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiZGlzcGxheWVkRGF0ZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkRpc3BsYXllZERhdGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkRpc3BsYXllZERhdGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IERhdGUsIG5ld1ZhbHVlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMub25EaXNwbGF5ZWREYXRlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZXZlbnRTb3VyY2VQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxSYWRDYWxlbmRhciwgT2JzZXJ2YWJsZUFycmF5PENhbGVuZGFyRXZlbnQ+PihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJldmVudFNvdXJjZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkV2ZW50U291cmNlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25FdmVudFNvdXJjZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogT2JzZXJ2YWJsZUFycmF5PENhbGVuZGFyRXZlbnQ+LCBuZXdWYWx1ZTogT2JzZXJ2YWJsZUFycmF5PENhbGVuZGFyRXZlbnQ+KSB7XG4gICAgICAgIHRoaXMub25FdmVudFNvdXJjZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGhvcml6b250YWxUcmFuc2l0aW9uUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8UmFkQ2FsZW5kYXIsIGJvb2xlYW4+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImhvcml6b250YWxUcmFuc2l0aW9uXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogYm9vbGVhbkNvbnZlcnRlcixcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uSG9yaXpvbnRhbFRyYW5zaXRpb25Qcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkhvcml6b250YWxUcmFuc2l0aW9uUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLm9uSG9yaXpvbnRhbFRyYW5zaXRpb25DaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBtb250aFZpZXdTdHlsZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFJhZENhbGVuZGFyLCBDYWxlbmRhck1vbnRoVmlld1N0eWxlPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJtb250aFZpZXdTdHlsZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbk1vbnRoVmlld1N0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25Nb250aFZpZXdTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogQ2FsZW5kYXJNb250aFZpZXdTdHlsZSwgbmV3VmFsdWU6IENhbGVuZGFyTW9udGhWaWV3U3R5bGUpIHtcbiAgICAgICAgdGhpcy5vbk1vbnRoVmlld1N0eWxlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgd2Vla1ZpZXdTdHlsZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFJhZENhbGVuZGFyLCBDYWxlbmRhcldlZWtWaWV3U3R5bGU+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIndlZWtWaWV3U3R5bGVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25XZWVrVmlld1N0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25XZWVrVmlld1N0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDYWxlbmRhcldlZWtWaWV3U3R5bGUsIG5ld1ZhbHVlOiBDYWxlbmRhcldlZWtWaWV3U3R5bGUpIHtcbiAgICAgICAgdGhpcy5vbldlZWtWaWV3U3R5bGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBkYXlWaWV3U3R5bGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxSYWRDYWxlbmRhciwgQ2FsZW5kYXJEYXlWaWV3U3R5bGU+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImRheVZpZXdTdHlsZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkRheVZpZXdTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uRGF5Vmlld1N0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDYWxlbmRhckRheVZpZXdTdHlsZSwgbmV3VmFsdWU6IENhbGVuZGFyRGF5Vmlld1N0eWxlKSB7XG4gICAgICAgIHRoaXMub25EYXlWaWV3U3R5bGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB5ZWFyVmlld1N0eWxlUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8UmFkQ2FsZW5kYXIsIENhbGVuZGFyWWVhclZpZXdTdHlsZT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwieWVhclZpZXdTdHlsZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vblllYXJWaWV3U3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvblllYXJWaWV3U3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IENhbGVuZGFyWWVhclZpZXdTdHlsZSwgbmV3VmFsdWU6IENhbGVuZGFyWWVhclZpZXdTdHlsZSkge1xuICAgICAgICB0aGlzLm9uWWVhclZpZXdTdHlsZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIG1vbnRoTmFtZXNWaWV3U3R5bGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxSYWRDYWxlbmRhciwgQ2FsZW5kYXJNb250aE5hbWVzVmlld1N0eWxlPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJtb250aE5hbWVzVmlld1N0eWxlXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTW9udGhOYW1lc1ZpZXdTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uTW9udGhOYW1lc1ZpZXdTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogQ2FsZW5kYXJNb250aE5hbWVzVmlld1N0eWxlLCBuZXdWYWx1ZTogQ2FsZW5kYXJNb250aE5hbWVzVmlld1N0eWxlKSB7XG4gICAgICAgIHRoaXMub25Nb250aE5hbWVzVmlld1N0eWxlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWxvYWQoKTogdm9pZCB7IH1cbiAgICBwdWJsaWMgbmF2aWdhdGVGb3J3YXJkKCk6IHZvaWQgeyB9XG4gICAgcHVibGljIG5hdmlnYXRlQmFjaygpOiB2b2lkIHsgfVxuICAgIHB1YmxpYyBnb1RvRGF0ZShkYXRlOiBEYXRlKTogdm9pZCB7IH1cblxuICAgIHB1YmxpYyBnZXRFdmVudHNGb3JEYXRlKGRhdGU6IERhdGUpOiBBcnJheTxDYWxlbmRhckV2ZW50PiB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRTZWxlY3RlZERhdGVzTGlzdCgpOiBBcnJheTxhbnk+IHtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLnNlbGVjdGVkRGF0ZXM7XG4gICAgICAgIGlmICh0eXBlb2YgKHRoaXMuc2VsZWN0ZWREYXRlcykgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLnNlbGVjdGVkRGF0ZXMuc3BsaXQoXCIsXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIF9hZGRTZWxlY3RlZERhdGUoZGF0ZTogRGF0ZSkge1xuICAgICAgICBsZXQgbmV3U2VsZWN0aW9uID0gbmV3IEFycmF5PERhdGU+KCk7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRGF0ZXMpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50U2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3RlZERhdGVzTGlzdCgpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50U2VsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkRGF0ZSA9IGN1cnJlbnRTZWxlY3Rpb25baV07XG4gICAgICAgICAgICAgICAgbmV3U2VsZWN0aW9uLnB1c2goc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWREYXRlLmdldFRpbWUoKSA9PT0gZGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5ld1NlbGVjdGlvbi5wdXNoKGRhdGUpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZXMgPSBuZXdTZWxlY3Rpb247XG4gICAgfVxuXG4gICAgcHVibGljIF9yZW1vdmVTZWxlY3RlZERhdGUoZGF0ZTogRGF0ZSkge1xuICAgICAgICBsZXQgbmV3U2VsZWN0aW9uID0gbmV3IEFycmF5PERhdGU+KCk7XG4gICAgICAgIGxldCBjdXJyZW50U2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3RlZERhdGVzTGlzdCgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudFNlbGVjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkRGF0ZSA9IGN1cnJlbnRTZWxlY3Rpb25baV07XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWREYXRlLmdldFRpbWUoKSAhPT0gZGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgICAgICBuZXdTZWxlY3Rpb24ucHVzaChzZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVzID0gbmV3U2VsZWN0aW9uO1xuICAgICAgICBpZiAobmV3U2VsZWN0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gbmV3U2VsZWN0aW9uW25ld1NlbGVjdGlvbi5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRXZlbnRTb3VyY2VDaGFuZ2VkKG9sZFZhbHVlOiBPYnNlcnZhYmxlQXJyYXk8Q2FsZW5kYXJFdmVudD4sIG5ld1ZhbHVlOiBPYnNlcnZhYmxlQXJyYXk8Q2FsZW5kYXJFdmVudD4pIHtcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudFNvdXJjZSgpO1xuXG4gICAgICAgIGlmIChvbGRWYWx1ZSBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgICAgICAgIHdlYWtFdmVudHMucmVtb3ZlV2Vha0V2ZW50TGlzdGVuZXIob2xkVmFsdWUsIE9ic2VydmFibGVBcnJheS5jaGFuZ2VFdmVudCwgdGhpcy5FdmVudFNvdXJjZUNoYW5nZWRJbnRlcm5hbCwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3VmFsdWUgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICAgICAgICB3ZWFrRXZlbnRzLmFkZFdlYWtFdmVudExpc3RlbmVyKG5ld1ZhbHVlLCBPYnNlcnZhYmxlQXJyYXkuY2hhbmdlRXZlbnQsIHRoaXMuRXZlbnRTb3VyY2VDaGFuZ2VkSW50ZXJuYWwsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIEV2ZW50U291cmNlQ2hhbmdlZEludGVybmFsKGRhdGE6IGFueSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50U291cmNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUV2ZW50U291cmNlKCkgeyB9XG5cbiAgICBwcm90ZWN0ZWQgb25EaXNwbGF5ZWREYXRlQ2hhbmdlZChvbGRWYWx1ZTogRGF0ZSwgbmV3VmFsdWU6IERhdGUpIHsgfVxuICAgIHByb3RlY3RlZCBvblNlbGVjdGlvbk1vZGVDaGFuZ2VkKG9sZFZhbHVlOiBDYWxlbmRhclNlbGVjdGlvbk1vZGUsIG5ld1ZhbHVlOiBDYWxlbmRhclNlbGVjdGlvbk1vZGUpIHsgfVxuICAgIHByb3RlY3RlZCBvblRyYW5zaXRpb25Nb2RlQ2hhbmdlZChvbGRWYWx1ZTogQ2FsZW5kYXJUcmFuc2l0aW9uTW9kZSwgbmV3VmFsdWU6IENhbGVuZGFyVHJhbnNpdGlvbk1vZGUpIHsgfVxuICAgIHByb3RlY3RlZCBvblZpZXdNb2RlQ2hhbmdlZChvbGRWYWx1ZTogQ2FsZW5kYXJWaWV3TW9kZSwgbmV3VmFsdWU6IENhbGVuZGFyVmlld01vZGUpIHsgfVxuICAgIHByb3RlY3RlZCBvbkV2ZW50c1ZpZXdNb2RlQ2hhbmdlZChvbGRWYWx1ZTogQ2FsZW5kYXJFdmVudHNWaWV3TW9kZSwgbmV3VmFsdWU6IENhbGVuZGFyRXZlbnRzVmlld01vZGUpIHsgfVxuICAgIHByb3RlY3RlZCBvblNlbGVjdGVkRGF0ZVJhbmdlQ2hhbmdlZChvbGRWYWx1ZTogRGF0ZVJhbmdlLCBuZXdWYWx1ZTogRGF0ZVJhbmdlKSB7IH1cbiAgICBwcm90ZWN0ZWQgb25TZWxlY3RlZERhdGVzQ2hhbmdlZChvbGRWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55KSB7IH1cbiAgICBwcm90ZWN0ZWQgb25TZWxlY3RlZERhdGVDaGFuZ2VkKG9sZFZhbHVlOiBEYXRlLCBuZXdWYWx1ZTogRGF0ZSkgeyB9XG4gICAgcHJvdGVjdGVkIG9uTWF4RGF0ZUNoYW5nZWQob2xkVmFsdWU6IERhdGUsIG5ld1ZhbHVlOiBEYXRlKSB7IH1cbiAgICBwcm90ZWN0ZWQgb25NaW5EYXRlQ2hhbmdlZChvbGRWYWx1ZTogRGF0ZSwgbmV3VmFsdWU6IERhdGUpIHsgfVxuICAgIHByb3RlY3RlZCBvbkhvcml6b250YWxUcmFuc2l0aW9uQ2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHsgfVxuICAgIHByb3RlY3RlZCBvbk1vbnRoVmlld1N0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2FsZW5kYXJNb250aFZpZXdTdHlsZSwgbmV3VmFsdWU6IENhbGVuZGFyTW9udGhWaWV3U3R5bGUpIHsgfVxuICAgIHByb3RlY3RlZCBvbldlZWtWaWV3U3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBDYWxlbmRhcldlZWtWaWV3U3R5bGUsIG5ld1ZhbHVlOiBDYWxlbmRhcldlZWtWaWV3U3R5bGUpIHsgfVxuICAgIHByb3RlY3RlZCBvbkRheVZpZXdTdHlsZUNoYW5nZWQob2xkVmFsdWU6IENhbGVuZGFyRGF5Vmlld1N0eWxlLCBuZXdWYWx1ZTogQ2FsZW5kYXJEYXlWaWV3U3R5bGUpIHsgfVxuICAgIHByb3RlY3RlZCBvblllYXJWaWV3U3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBDYWxlbmRhclllYXJWaWV3U3R5bGUsIG5ld1ZhbHVlOiBDYWxlbmRhclllYXJWaWV3U3R5bGUpIHsgfVxuICAgIHByb3RlY3RlZCBvbk1vbnRoTmFtZXNWaWV3U3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBDYWxlbmRhck1vbnRoTmFtZXNWaWV3U3R5bGUsIG5ld1ZhbHVlOiBDYWxlbmRhck1vbnRoTmFtZXNWaWV3U3R5bGUpIHsgfVxufVxuUmFkQ2FsZW5kYXIubG9jYWxlUHJvcGVydHkucmVnaXN0ZXIoUmFkQ2FsZW5kYXIpO1xuUmFkQ2FsZW5kYXIubWluRGF0ZVByb3BlcnR5LnJlZ2lzdGVyKFJhZENhbGVuZGFyKTtcblJhZENhbGVuZGFyLm1heERhdGVQcm9wZXJ0eS5yZWdpc3RlcihSYWRDYWxlbmRhcik7XG5SYWRDYWxlbmRhci5zZWxlY3RlZERhdGVQcm9wZXJ0eS5yZWdpc3RlcihSYWRDYWxlbmRhcik7XG5SYWRDYWxlbmRhci5zZWxlY3RlZERhdGVzUHJvcGVydHkucmVnaXN0ZXIoUmFkQ2FsZW5kYXIpO1xuUmFkQ2FsZW5kYXIuc2VsZWN0ZWREYXRlUmFuZ2VQcm9wZXJ0eS5yZWdpc3RlcihSYWRDYWxlbmRhcik7XG5SYWRDYWxlbmRhci52aWV3TW9kZVByb3BlcnR5LnJlZ2lzdGVyKFJhZENhbGVuZGFyKTtcblJhZENhbGVuZGFyLmV2ZW50c1ZpZXdNb2RlUHJvcGVydHkucmVnaXN0ZXIoUmFkQ2FsZW5kYXIpO1xuUmFkQ2FsZW5kYXIuc2VsZWN0aW9uTW9kZVByb3BlcnR5LnJlZ2lzdGVyKFJhZENhbGVuZGFyKTtcblJhZENhbGVuZGFyLnRyYW5zaXRpb25Nb2RlUHJvcGVydHkucmVnaXN0ZXIoUmFkQ2FsZW5kYXIpO1xuUmFkQ2FsZW5kYXIuZGlzcGxheWVkRGF0ZVByb3BlcnR5LnJlZ2lzdGVyKFJhZENhbGVuZGFyKTtcblJhZENhbGVuZGFyLmV2ZW50U291cmNlUHJvcGVydHkucmVnaXN0ZXIoUmFkQ2FsZW5kYXIpO1xuUmFkQ2FsZW5kYXIuaG9yaXpvbnRhbFRyYW5zaXRpb25Qcm9wZXJ0eS5yZWdpc3RlcihSYWRDYWxlbmRhcik7XG5SYWRDYWxlbmRhci5tb250aFZpZXdTdHlsZVByb3BlcnR5LnJlZ2lzdGVyKFJhZENhbGVuZGFyKTtcblJhZENhbGVuZGFyLndlZWtWaWV3U3R5bGVQcm9wZXJ0eS5yZWdpc3RlcihSYWRDYWxlbmRhcik7XG5SYWRDYWxlbmRhci55ZWFyVmlld1N0eWxlUHJvcGVydHkucmVnaXN0ZXIoUmFkQ2FsZW5kYXIpO1xuUmFkQ2FsZW5kYXIuZGF5Vmlld1N0eWxlUHJvcGVydHkucmVnaXN0ZXIoUmFkQ2FsZW5kYXIpO1xuUmFkQ2FsZW5kYXIubW9udGhOYW1lc1ZpZXdTdHlsZVByb3BlcnR5LnJlZ2lzdGVyKFJhZENhbGVuZGFyKTsiXX0=