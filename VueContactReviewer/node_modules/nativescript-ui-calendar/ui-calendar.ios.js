"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var commonModule = require("./ui-calendar.common");
var color_1 = require("tns-core-modules/color");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var utils = require("tns-core-modules/utils/utils");
__export(require("./ui-calendar.common"));
////////////////////////////////////////////////////////////////////////////////////////////////////
var CalendarEvent = /** @class */ (function (_super) {
    __extends(CalendarEvent, _super);
    function CalendarEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CalendarEvent.prototype, "ios", {
        get: function () {
            if (!this._ios) {
                this._ios = TKCalendarEvent.new();
            }
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    CalendarEvent.prototype._setIsAllDay = function (value) {
        this.ios.allDay = value;
    };
    CalendarEvent.prototype._getIsAllDay = function () {
        return this.ios.allDay;
    };
    CalendarEvent.prototype._setEndDate = function (date) {
        this.ios.endDate = date;
    };
    CalendarEvent.prototype._getEndDate = function () {
        return this.ios.endDate;
    };
    CalendarEvent.prototype._setStartDate = function (date) {
        this.ios.startDate = date;
    };
    CalendarEvent.prototype._getStartDate = function () {
        return this.ios.startDate;
    };
    CalendarEvent.prototype._setTitle = function (value) {
        this.ios.title = value;
    };
    CalendarEvent.prototype._getTitle = function () {
        return this.ios.title;
    };
    CalendarEvent.prototype._setEventColor = function (value) {
        this.ios.eventColor = value.ios;
    };
    CalendarEvent.prototype._getEventColor = function () {
        if (this.ios.eventColor) {
            var a = new interop.Reference();
            var r = new interop.Reference();
            var g = new interop.Reference();
            var b = new interop.Reference();
            this.ios.eventColor.getRedGreenBlueAlpha(r, g, b, a);
            return new color_1.Color(Math.round(a.value * 255), Math.round(r.value * 255), Math.round(g.value * 255), Math.round(b.value * 255));
        }
        else {
            return null;
        }
    };
    return CalendarEvent;
}(commonModule.CalendarEvent));
exports.CalendarEvent = CalendarEvent;
/**
 * Helper methods
 */
var Tools = /** @class */ (function () {
    function Tools() {
    }
    Tools.createFont = function (fontName, fontStyle, fontSize) {
        var font = null;
        var size = fontSize || 10;
        if (fontName) {
            font = UIFont.fontWithNameSize(fontName, size);
        }
        else {
            font = UIFont.systemFontOfSize(size);
        }
        if (!font) {
            console.log("WARNING: Cannot create font with given name: " + font + ". System font will be used instead.");
            font = UIFont.systemFontOfSize(size);
            return font;
        }
        if (fontStyle) {
            var traits = 0 /* ClassUnknown */;
            switch (fontStyle) {
                case commonModule.CalendarFontStyle.Bold:
                    traits = 2 /* TraitBold */;
                    break;
                case commonModule.CalendarFontStyle.Italic:
                    traits = 1 /* TraitItalic */;
                    break;
                case commonModule.CalendarFontStyle.BoldItalic:
                    traits = 2 /* TraitBold */ | 1 /* TraitItalic */;
                    break;
            }
            var newFont = UIFont.fontWithDescriptorSize(utils.ios.getter(font, font.fontDescriptor).fontDescriptorWithSymbolicTraits(traits), size);
            if (newFont) {
                font = newFont;
            }
        }
        return font;
    };
    return Tools;
}());
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          STYLES FOR DIFFERENT CELL TYPES
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var CellStyleInitializer = /** @class */ (function () {
    function CellStyleInitializer() {
    }
    CellStyleInitializer.prototype.onCellBorderWidthChanged = function (oldValue, newValue, style) {
        if (!isNaN(+newValue)) {
            style.ios.leftBorderWidth = newValue;
            style.ios.rightBorderWidth = newValue;
            style.ios.topBorderWidth = newValue;
            style.ios.bottomBorderWidth = newValue;
        }
        else {
            style.ios.leftBorderWidth = 0;
            style.ios.rightBorderWidth = 0;
            style.ios.topBorderWidth = 0;
            style.ios.bottomBorderWidth = 0;
        }
    };
    CellStyleInitializer.prototype.onCellBorderColorChanged = function (oldValue, newValue, style) {
        if (newValue) {
            style.ios.leftBorderColor = newValue.ios;
            style.ios.rightBorderColor = newValue.ios;
            style.ios.topBorderColor = newValue.ios;
            style.ios.bottomBorderColor = newValue.ios;
        }
        else {
            var color = new color_1.Color('#00000000');
            style.ios.leftBorderColor = color.ios;
            style.ios.rightBorderColor = color.ios;
            style.ios.topBorderColor = color.ios;
            style.ios.bottomBorderColor = color.ios;
        }
    };
    CellStyleInitializer.prototype.onCellBackgroundColorChanged = function (oldValue, newValue, style) {
        if (newValue) {
            style.ios.backgroundColor = newValue.ios;
        }
        else {
            var color = new color_1.Color('#00000000');
            style.ios.backgroundColor = color.ios;
        }
    };
    CellStyleInitializer.prototype.onCellAlignmentChanged = function (oldValue, newValue, style) {
        if (!newValue) {
            return;
        }
        switch (newValue) {
            case commonModule.CalendarCellAlignment.Bottom:
                style.ios.textAlignment = 8 /* Bottom */;
                break;
            case commonModule.CalendarCellAlignment.Top:
                style.ios.textAlignment = 4 /* Top */;
                break;
            case commonModule.CalendarCellAlignment.Left:
                style.ios.textAlignment = 1 /* Left */;
                break;
            case commonModule.CalendarCellAlignment.Right:
                style.ios.textAlignment = 2 /* Right */;
                break;
            case commonModule.CalendarCellAlignment.HorizontalCenter:
                style.ios.textAlignment = 16 /* HorizontalCenter */;
                break;
            case commonModule.CalendarCellAlignment.VerticalCenter:
                style.ios.textAlignment = 32 /* VerticalCenter */;
                break;
            default:
                console.log("WARNING: Unsupported cell alignment value: " + newValue);
        }
    };
    CellStyleInitializer.prototype.onCellPaddingHorizontalChanged = function (oldValue, newValue, style) {
        var vertPadding = (!isNaN(+style.cellPaddingVertical)) ? style.cellPaddingVertical : 0;
        if (!isNaN(+newValue)) {
            style.ios.textInsets = UIEdgeInsetsFromString("{" + vertPadding + ", " + newValue + ", " + vertPadding + ", " + newValue + "}");
            // in android you cannot set event paddings exclusively, there is only cell paddings. That's why we apply the paddings to all of the cell content, including events
            if (style instanceof DayCellStyle) {
                style.ios.eventInsets = UIEdgeInsetsFromString("{" + vertPadding + ", " + newValue + ", " + vertPadding + ", " + newValue + "}");
            }
        }
        else {
            style.ios.textInsets = UIEdgeInsetsFromString("{" + vertPadding + ", " + 0 + ", " + vertPadding + ", " + 0 + "}");
            // in android you cannot set event paddings exclusively, there is only cell paddings. That's why we apply the paddings to all of the cell content, including events
            if (style instanceof DayCellStyle) {
                style.ios.eventInsets = UIEdgeInsetsFromString("{" + vertPadding + ", " + 0 + ", " + vertPadding + ", " + 0 + "}");
            }
        }
    };
    CellStyleInitializer.prototype.onCellPaddingVerticalChanged = function (oldValue, newValue, style) {
        var horzPadding = (!isNaN(+style.cellPaddingHorizontal)) ? style.cellPaddingHorizontal : 0;
        if (!isNaN(+newValue)) {
            style.ios.textInsets = UIEdgeInsetsFromString("{" + newValue + ", " + horzPadding + ", " + newValue + ", " + horzPadding + "}");
            // in android you cannot set event paddings exclusively, there is only cell paddings. That's why we apply the paddings to all of the cell content, including events
            if (style instanceof DayCellStyle) {
                style.ios.eventInsets = UIEdgeInsetsFromString("{" + newValue + ", " + horzPadding + ", " + newValue + ", " + horzPadding + "}");
            }
        }
        else {
            style.ios.textInsets = UIEdgeInsetsFromString("{" + 0 + ", " + horzPadding + ", " + 0 + ", " + horzPadding + "}");
            // in android you cannot set event paddings exclusively, there is only cell paddings. That's why we apply the paddings to all of the cell content, including events
            if (style instanceof DayCellStyle) {
                style.ios.eventInsets = UIEdgeInsetsFromString("{" + 0 + ", " + horzPadding + ", " + 0 + ", " + horzPadding + "}");
            }
        }
    };
    CellStyleInitializer.prototype.onCellTextColorChanged = function (oldValue, newValue, style) {
        if (newValue) {
            style.ios.textColor = newValue.ios;
        }
    };
    CellStyleInitializer.prototype.onCellTextFontNameChanged = function (oldValue, newValue, style) {
        if (newValue) {
            style.ios.textFont = Tools.createFont(newValue, style.cellTextFontStyle, style.cellTextSize);
        }
    };
    CellStyleInitializer.prototype.onCellTextFontStyleChanged = function (oldValue, newValue, style) {
        if (newValue) {
            style.ios.textFont = Tools.createFont(style.cellTextFontName, newValue, style.cellTextSize);
        }
    };
    CellStyleInitializer.prototype.onCellTextSizeChanged = function (oldValue, newValue, style) {
        if (!isNaN(+newValue)) {
            style.ios.textFont = Tools.createFont(style.cellTextFontName, style.cellTextFontStyle, newValue);
        }
    };
    return CellStyleInitializer;
}());
exports.CellStyleInitializer = CellStyleInitializer;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var CellStyle = /** @class */ (function (_super) {
    __extends(CellStyle, _super);
    function CellStyle() {
        var _this = _super.call(this) || this;
        _this._ios = TKCalendarCellStyle.alloc().init();
        return _this;
    }
    Object.defineProperty(CellStyle.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new CellStyleInitializer();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellStyle.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    CellStyle.prototype.onCellBorderWidthChanged = function (oldValue, newValue) {
        this.initializer.onCellBorderWidthChanged(oldValue, newValue, this);
    };
    CellStyle.prototype.onCellBorderColorChanged = function (oldValue, newValue) {
        this.initializer.onCellBorderColorChanged(oldValue, newValue, this);
    };
    CellStyle.prototype.onCellBackgroundColorChanged = function (oldValue, newValue) {
        this.initializer.onCellBackgroundColorChanged(oldValue, newValue, this);
    };
    CellStyle.prototype.onCellTextColorChanged = function (oldValue, newValue) {
        this.initializer.onCellTextColorChanged(oldValue, newValue, this);
    };
    CellStyle.prototype.onCellTextFontNameChanged = function (oldValue, newValue) {
        this.initializer.onCellTextFontNameChanged(oldValue, newValue, this);
    };
    CellStyle.prototype.onCellTextFontStyleChanged = function (oldValue, newValue) {
        this.initializer.onCellTextFontStyleChanged(oldValue, newValue, this);
    };
    CellStyle.prototype.onCellTextSizeChanged = function (oldValue, newValue) {
        this.initializer.onCellTextSizeChanged(oldValue, newValue, this);
    };
    CellStyle.prototype.onCellPaddingHorizontalChanged = function (oldValue, newValue) {
        this.initializer.onCellPaddingHorizontalChanged(oldValue, newValue, this);
    };
    CellStyle.prototype.onCellPaddingVerticalChanged = function (oldValue, newValue) {
        this.initializer.onCellPaddingVerticalChanged(oldValue, newValue, this);
    };
    CellStyle.prototype.onCellAlignmentChanged = function (oldValue, newValue) {
        this.initializer.onCellAlignmentChanged(oldValue, newValue, this);
    };
    return CellStyle;
}(commonModule.CellStyle));
exports.CellStyle = CellStyle;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var DayEventsViewStyle = /** @class */ (function (_super) {
    __extends(DayEventsViewStyle, _super);
    function DayEventsViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DayEventsViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            this.updateNativePresenter();
        },
        enumerable: true,
        configurable: true
    });
    DayEventsViewStyle.prototype.updateNativePresenter = function () {
        if (this._owner && (this._owner._nativeView.presenter instanceof TKCalendarDayViewPresenter)) {
            var dayPresenter = this._owner._nativeView.presenter;
            if (this.backgroundColor) {
                dayPresenter.dayView.eventsView.backgroundColor = this.backgroundColor.ios;
            }
            if (this.timeLabelFormat) {
                var dateFormatter = NSDateFormatter.alloc().init();
                dateFormatter.dateFormat = this.timeLabelFormat;
                dayPresenter.dayView.eventsView.style.labelFormatter = dateFormatter;
            }
            if (this.timeLabelTextColor) {
                dayPresenter.dayView.eventsView.style.labelTextColor = this.timeLabelTextColor.ios;
            }
            if (this.timeLabelTextSize) {
                dayPresenter.dayView.eventsView.style.labelTextSize = this.timeLabelTextSize;
            }
            dayPresenter.dayView.eventsView.updateLayout();
        }
    };
    DayEventsViewStyle.prototype.onBackgroundColorChanged = function (oldValue, newValue) {
        if (newValue && this._owner && (this._owner._nativeView.presenter instanceof TKCalendarDayViewPresenter)) {
            this._owner._nativeView.presenter.dayView.eventsView.backgroundColor = newValue.ios;
            this._owner._nativeView.presenter.dayView.eventsView.updateLayout();
        }
    };
    DayEventsViewStyle.prototype.onTimeLabelTextColorChanged = function (oldValue, newValue) {
        if (newValue && this._owner && (this._owner._nativeView.presenter instanceof TKCalendarDayViewPresenter)) {
            this._owner._nativeView.presenter.dayView.eventsView.style.labelTextColor = newValue.ios;
            this._owner._nativeView.presenter.dayView.eventsView.updateLayout();
        }
    };
    DayEventsViewStyle.prototype.onTimeLabelTextSizeChanged = function (oldValue, newValue) {
        if (newValue && this._owner && (this._owner._nativeView.presenter instanceof TKCalendarDayViewPresenter)) {
            this._owner._nativeView.presenter.dayView.eventsView.style.labelTextSize = newValue;
            this._owner._nativeView.presenter.dayView.eventsView.updateLayout();
        }
    };
    DayEventsViewStyle.prototype.onTimeLabelFormatChanged = function (oldValue, newValue) {
        if (newValue && this._owner && (this._owner._nativeView.presenter instanceof TKCalendarDayViewPresenter)) {
            var dateFormatter = NSDateFormatter.alloc().init();
            dateFormatter.dateFormat = this.timeLabelFormat;
            this._owner._nativeView.presenter.dayView.eventsView.style.labelFormatter = dateFormatter;
            this._owner._nativeView.presenter.dayView.eventsView.updateLayout();
        }
    };
    return DayEventsViewStyle;
}(commonModule.DayEventsViewStyle));
exports.DayEventsViewStyle = DayEventsViewStyle;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var AllDayEventsViewStyle = /** @class */ (function (_super) {
    __extends(AllDayEventsViewStyle, _super);
    function AllDayEventsViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AllDayEventsViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            this.updateNativePresenter();
        },
        enumerable: true,
        configurable: true
    });
    AllDayEventsViewStyle.prototype.updateNativePresenter = function () {
        if (this._owner && (this._owner._nativeView.presenter instanceof TKCalendarDayViewPresenter)) {
            var dayPresenter = this._owner._nativeView.presenter;
            if (this.backgroundColor) {
                dayPresenter.dayView.allDayEventsView.backgroundColor = this.backgroundColor.ios;
            }
            if (this.allDayText !== AllDayEventsViewStyle.ALL_DAY_TEXT) {
                dayPresenter.dayView.allDayEventsView.labelView.text = this.allDayText;
            }
            if (this.allDayTextIsVisible !== undefined) {
                dayPresenter.dayView.allDayEventsView.style.labelWidth = this.allDayTextIsVisible ? 60 : 0;
            }
            dayPresenter.dayView.allDayEventsView.updateLayout();
        }
    };
    AllDayEventsViewStyle.prototype.onBackgroundColorChanged = function (oldValue, newValue) {
        if (newValue && this._owner && (this._owner._nativeView.presenter instanceof TKCalendarDayViewPresenter)) {
            this._owner._nativeView.presenter.dayView.allDayEventsView.backgroundColor = newValue.ios;
        }
    };
    AllDayEventsViewStyle.prototype.onAllDayTextChanged = function (oldValue, newValue) {
        if (newValue && this._owner && (this._owner._nativeView.presenter instanceof TKCalendarDayViewPresenter)) {
            this._owner._nativeView.presenter.dayView.allDayEventsView.labelView.text = newValue;
        }
    };
    AllDayEventsViewStyle.prototype.onAllDayTextIsVisibleChanged = function (oldValue, newValue) {
        if (newValue && this._owner && (this._owner._nativeView.presenter instanceof TKCalendarDayViewPresenter)) {
            this._owner._nativeView.presenter.dayView.allDayEventsView.style.labelWidth = this.allDayTextIsVisible ? 60 : 0;
        }
    };
    return AllDayEventsViewStyle;
}(commonModule.AllDayEventsViewStyle));
exports.AllDayEventsViewStyle = AllDayEventsViewStyle;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var DayCellStyle = /** @class */ (function (_super) {
    __extends(DayCellStyle, _super);
    function DayCellStyle() {
        var _this = _super.call(this) || this;
        _this._ios = TKCalendarDayCellStyle.alloc().init();
        return _this;
    }
    Object.defineProperty(DayCellStyle.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new CellStyleInitializer();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayCellStyle.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    DayCellStyle.prototype.onCellBorderWidthChanged = function (oldValue, newValue) {
        this.initializer.onCellBorderWidthChanged(oldValue, newValue, this);
    };
    DayCellStyle.prototype.onCellBorderColorChanged = function (oldValue, newValue) {
        this.initializer.onCellBorderColorChanged(oldValue, newValue, this);
    };
    DayCellStyle.prototype.onCellBackgroundColorChanged = function (oldValue, newValue) {
        this.initializer.onCellBackgroundColorChanged(oldValue, newValue, this);
    };
    DayCellStyle.prototype.onCellTextColorChanged = function (oldValue, newValue) {
        this.initializer.onCellTextColorChanged(oldValue, newValue, this);
    };
    DayCellStyle.prototype.onCellTextFontNameChanged = function (oldValue, newValue) {
        this.initializer.onCellTextFontNameChanged(oldValue, newValue, this);
    };
    DayCellStyle.prototype.onCellTextFontStyleChanged = function (oldValue, newValue) {
        this.initializer.onCellTextFontStyleChanged(oldValue, newValue, this);
    };
    DayCellStyle.prototype.onCellTextSizeChanged = function (oldValue, newValue) {
        this.initializer.onCellTextSizeChanged(oldValue, newValue, this);
    };
    DayCellStyle.prototype.onCellPaddingHorizontalChanged = function (oldValue, newValue) {
        this.initializer.onCellPaddingHorizontalChanged(oldValue, newValue, this);
    };
    DayCellStyle.prototype.onCellPaddingVerticalChanged = function (oldValue, newValue) {
        this.initializer.onCellPaddingVerticalChanged(oldValue, newValue, this);
    };
    DayCellStyle.prototype.onCellAlignmentChanged = function (oldValue, newValue) {
        this.initializer.onCellAlignmentChanged(oldValue, newValue, this);
    };
    // day cell specific properties
    DayCellStyle.prototype.onShowEventsTextChanged = function (oldValue, newValue) {
        this.ios.displayEventsAsText = newValue;
    };
    DayCellStyle.prototype.onEventTextColorChanged = function (oldValue, newValue) {
        if (newValue) {
            this.ios.eventTextColor = newValue.ios;
        }
    };
    DayCellStyle.prototype.onEventFontNameChanged = function (oldValue, newValue) {
        if (newValue) {
            this.ios.eventFont = Tools.createFont(newValue, this.eventFontStyle, this.eventTextSize);
        }
    };
    DayCellStyle.prototype.onEventFontStyleChanged = function (oldValue, newValue) {
        if (newValue) {
            this.ios.eventFont = Tools.createFont(this.eventFontName, newValue, this.eventTextSize);
        }
    };
    DayCellStyle.prototype.onEventTextSizeChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue)) {
            this.ios.eventFont = Tools.createFont(this.eventFontName, this.eventFontStyle, newValue);
        }
    };
    return DayCellStyle;
}(commonModule.DayCellStyle));
exports.DayCellStyle = DayCellStyle;
/**
 * Cell style class for months in year view mode
 */
var MonthCellStyle = /** @class */ (function (_super) {
    __extends(MonthCellStyle, _super);
    function MonthCellStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MonthCellStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            this.updateNativePresenter();
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.updateNativePresenter = function () {
        if (this._owner && (this._owner._nativeView.presenter instanceof TKCalendarYearPresenter)) {
            if (this.dayTextColor)
                this._owner._nativeView.presenter.style.dayTextColor = this.dayTextColor.ios;
            if (this.weekendTextColor)
                this._owner._nativeView.presenter.style.weekendTextColor = this.weekendTextColor.ios;
            if (this.todayTextColor)
                this._owner._nativeView.presenter.style.todayTextColor = this.todayTextColor.ios;
            if (this.dayNameTextColor)
                this._owner._nativeView.presenter.style.dayNameTextColor = this.dayNameTextColor.ios;
            if (this.monthNameTextColor)
                this._owner._nativeView.presenter.style.monthNameTextColor = this.monthNameTextColor.ios;
            this._owner._nativeView.presenter.style.dayFont = Tools.createFont(this.dayFontName, this.dayFontStyle, this.dayTextSize);
            this._owner._nativeView.presenter.style.dayNameFont = Tools.createFont(this.dayNameFontName, this.dayNameFontStyle, this.dayNameTextSize);
            this._owner._nativeView.presenter.style.monthNameFont = Tools.createFont(this.monthNameFontName, this.monthNameFontStyle, this.monthNameTextSize);
            // note: since android calendar in year view doesn't support shape color, we disable it for ios too
            this._owner._nativeView.presenter.style.todayShapeFill = null;
        }
    };
    MonthCellStyle.prototype.onWeekendTextColorChanged = function (oldValue, newValue) {
        if (newValue && this._owner) {
            this._owner._nativeView.presenter.style.weekendTextColor = newValue.ios;
        }
    };
    MonthCellStyle.prototype.onTodayTextColorChanged = function (oldValue, newValue) {
        if (newValue && this._owner) {
            this._owner._nativeView.presenter.style.todayTextColor = newValue.ios;
        }
    };
    MonthCellStyle.prototype.onDayTextColorChanged = function (oldValue, newValue) {
        if (newValue && this._owner) {
            this._owner._nativeView.presenter.style.dayTextColor = newValue.ios;
        }
    };
    MonthCellStyle.prototype.onDayFontNameChanged = function (oldValue, newValue) {
        if (this._owner && newValue) {
            this._owner._nativeView.presenter.style.dayFont = Tools.createFont(newValue, this.dayFontStyle, this.dayTextSize);
        }
    };
    MonthCellStyle.prototype.onDayFontStyleChanged = function (oldValue, newValue) {
        if (this._owner && newValue) {
            this._owner._nativeView.presenter.style.dayFont = Tools.createFont(this.dayFontName, newValue, this.dayTextSize);
        }
    };
    MonthCellStyle.prototype.onDayTextSizeChanged = function (oldValue, newValue) {
        if (this._owner && !isNaN(+newValue)) {
            this._owner._nativeView.presenter.style.dayFont = Tools.createFont(this.dayFontName, this.dayFontStyle, newValue);
        }
    };
    MonthCellStyle.prototype.onDayNameTextColorChanged = function (oldValue, newValue) {
        if (newValue && this._owner) {
            this._owner._nativeView.presenter.style.dayNameTextColor = newValue.ios;
        }
    };
    MonthCellStyle.prototype.onDayNameFontNameChanged = function (oldValue, newValue) {
        if (this._owner && newValue) {
            this._owner._nativeView.presenter.style.dayNameFont = Tools.createFont(newValue, this.dayNameFontStyle, this.dayNameTextSize);
        }
    };
    MonthCellStyle.prototype.onDayNameFontStyleChanged = function (oldValue, newValue) {
        if (this._owner && newValue) {
            this._owner._nativeView.presenter.style.dayNameFont = Tools.createFont(this.dayNameFontName, newValue, this.dayNameTextSize);
        }
    };
    MonthCellStyle.prototype.onDayNameTextSizeChanged = function (oldValue, newValue) {
        if (this._owner && !isNaN(+newValue)) {
            this._owner._nativeView.presenter.style.dayNameFont = Tools.createFont(this.dayNameFontName, this.dayNameFontStyle, newValue);
        }
    };
    MonthCellStyle.prototype.onMonthNameTextColorChanged = function (oldValue, newValue) {
        if (newValue && this._owner) {
            this._owner._nativeView.presenter.style.monthNameTextColor = newValue.ios;
        }
    };
    MonthCellStyle.prototype.onMonthNameFontNameChanged = function (oldValue, newValue) {
        if (this._owner && newValue) {
            this._owner._nativeView.presenter.style.monthNameFont = Tools.createFont(newValue, this.monthNameFontStyle, this.monthNameTextSize);
        }
    };
    MonthCellStyle.prototype.onMonthNameFontStyleChanged = function (oldValue, newValue) {
        if (this._owner && newValue) {
            this._owner._nativeView.presenter.style.monthNameFont = Tools.createFont(this.monthNameFontName, newValue, this.monthNameTextSize);
        }
    };
    MonthCellStyle.prototype.onMonthNameTextSizeChanged = function (oldValue, newValue) {
        if (this._owner && !isNaN(+newValue)) {
            this._owner._nativeView.presenter.style.monthNameFont = Tools.createFont(this.monthNameFontName, this.monthNameFontStyle, newValue);
        }
    };
    return MonthCellStyle;
}(commonModule.MonthCellStyle));
exports.MonthCellStyle = MonthCellStyle;
/**
 * Cell style class for inline events cells in month view
 * property values are used by TKCalendarMonthPresenterDelegateImplementation delegate that's why we don't need extra actions for update
 */
var InlineEventCellStyle = /** @class */ (function (_super) {
    __extends(InlineEventCellStyle, _super);
    function InlineEventCellStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InlineEventCellStyle.prototype.onCellBackgroundColorChanged = function (oldValue, newValue) { };
    InlineEventCellStyle.prototype.onEventTextColorChanged = function (oldValue, newValue) { };
    InlineEventCellStyle.prototype.onEventFontNameChanged = function (oldValue, newValue) { };
    InlineEventCellStyle.prototype.onEventFontStyleChanged = function (oldValue, newValue) { };
    InlineEventCellStyle.prototype.onEventTextSizeChanged = function (oldValue, newValue) { };
    InlineEventCellStyle.prototype.onTimeTextColorChanged = function (oldValue, newValue) { };
    InlineEventCellStyle.prototype.onTimeFontNameChanged = function (oldValue, newValue) { };
    InlineEventCellStyle.prototype.onTimeFontStyleChanged = function (oldValue, newValue) { };
    InlineEventCellStyle.prototype.onTimeTextSizeChanged = function (oldValue, newValue) { };
    return InlineEventCellStyle;
}(commonModule.InlineEventCellStyle));
exports.InlineEventCellStyle = InlineEventCellStyle;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          STYLES FOR DIFFERENT VIEW MODES
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Class for month view style
 */
var CalendarMonthViewStyle = /** @class */ (function (_super) {
    __extends(CalendarMonthViewStyle, _super);
    function CalendarMonthViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CalendarMonthViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            this.updateNativeOwner();
            if (!this.selectedDayCellStyle) {
                this.selectedDayCellStyle = new DayCellStyle();
            }
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthViewStyle.prototype.updateViewStyles = function (forceUpdate) {
        this.updateNativeOwner();
    };
    CalendarMonthViewStyle.prototype.updateNativeOwner = function () {
        if (this._owner && this._owner._nativeView && (this._owner._nativeView.presenter instanceof TKCalendarMonthPresenter)) {
            if (this.showWeekNumbers !== undefined)
                this._owner._nativeView.presenter.weekNumbersHidden = !this.showWeekNumbers;
            if (this.showTitle !== undefined)
                this._owner._nativeView.presenter.titleHidden = !this.showTitle;
            if (this.showDayNames !== undefined)
                this._owner._nativeView.presenter.dayNamesHidden = !this.showDayNames;
            if (this.backgroundColor)
                this._owner._nativeView.presenter.style.backgroundColor = this.backgroundColor.ios;
            this._owner.updateCalendar();
        }
    };
    CalendarMonthViewStyle.prototype.updateOwner = function () {
        if (this._owner) {
            this._owner.updateCalendar();
        }
    };
    CalendarMonthViewStyle.prototype.onSelectionShapeChanged = function (oldValue, newValue) {
        _super.prototype.onSelectionShapeChanged.call(this, oldValue, newValue);
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onSelectionShapeSizeChanged = function (oldValue, newValue) {
        _super.prototype.onSelectionShapeSizeChanged.call(this, oldValue, newValue);
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onSelectionShapeColorChanged = function (oldValue, newValue) {
        _super.prototype.onSelectionShapeColorChanged.call(this, oldValue, newValue);
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onShowWeekNumbersChanged = function (oldValue, newValue) {
        if (this._owner && this._owner._nativeView) {
            this._owner._nativeView.presenter.weekNumbersHidden = !newValue;
        }
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onShowTitleChanged = function (oldValue, newValue) {
        if (this._owner && this._owner._nativeView) {
            this._owner._nativeView.presenter.titleHidden = !newValue;
        }
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onShowDayNamesChanged = function (oldValue, newValue) {
        if (this._owner && this._owner._nativeView) {
            this._owner._nativeView.presenter.dayNamesHidden = !newValue;
        }
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onBackgroundColorChanged = function (oldValue, newValue) {
        if (newValue && this._owner && this._owner._nativeView) {
            this._owner._nativeView.presenter.style.backgroundColor = newValue.ios;
        }
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onDayCellStyleChanged = function (oldValue, newValue) {
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onSelectedDayCellStyleChanged = function (oldValue, newValue) {
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onTodayCellStyleChanged = function (oldValue, newValue) {
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onWeekNumberCellStyleChanged = function (oldValue, newValue) {
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onWeekendCellStyleChanged = function (oldValue, newValue) {
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onDayNameCellStyleChanged = function (oldValue, newValue) {
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onTitleCellStyleChanged = function (oldValue, newValue) {
        this.updateOwner();
    };
    CalendarMonthViewStyle.prototype.onInlineEventCellStyleChanged = function (oldValue, newValue) {
        this.updateOwner();
    };
    return CalendarMonthViewStyle;
}(commonModule.CalendarMonthViewStyle));
exports.CalendarMonthViewStyle = CalendarMonthViewStyle;
/**
 * The style class for week mode.
 * NOTE: we should consider if we need an explicit class that is the same as the base one
 */
var CalendarWeekViewStyle = /** @class */ (function (_super) {
    __extends(CalendarWeekViewStyle, _super);
    function CalendarWeekViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarWeekViewStyle.prototype.updateNativeOwner = function () {
        if (this._owner && (this._owner._nativeView.presenter instanceof TKCalendarWeekPresenter)) {
            _super.prototype.updateNativeOwner.call(this);
        }
    };
    return CalendarWeekViewStyle;
}(CalendarMonthViewStyle));
exports.CalendarWeekViewStyle = CalendarWeekViewStyle;
/**
 * The style class for day mode.
 */
var CalendarDayViewStyle = /** @class */ (function (_super) {
    __extends(CalendarDayViewStyle, _super);
    function CalendarDayViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CalendarDayViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            if (this.dayEventsViewStyle) {
                this.dayEventsViewStyle.owner = this._owner;
            }
            if (this.allDayEventsViewStyle) {
                this.allDayEventsViewStyle.owner = this._owner;
            }
            this.updateNativeOwner();
        },
        enumerable: true,
        configurable: true
    });
    CalendarDayViewStyle.prototype.updateNativeOwner = function () {
        if (this._owner && this._owner._nativeView && (this._owner._nativeView.presenter instanceof TKCalendarDayViewPresenter)) {
            if (this.showWeekNumbers !== undefined)
                this._owner._nativeView.presenter.weekNumbersHidden = !this.showWeekNumbers;
            if (this.showTitle !== undefined)
                this._owner._nativeView.presenter.titleHidden = !this.showTitle;
            if (this.showDayNames !== undefined)
                this._owner._nativeView.presenter.dayNamesHidden = !this.showDayNames;
            if (this.backgroundColor)
                this._owner._nativeView.presenter.style.backgroundColor = this.backgroundColor.ios;
            this._owner._nativeView.presenter.weekHidden = !this.showWeek;
        }
        this.updateOwner();
    };
    CalendarDayViewStyle.prototype.updateViewStyles = function (forceUpdate) {
        if (this.dayEventsViewStyle) {
            this.dayEventsViewStyle['updateNativePresenter']();
        }
        if (this.allDayEventsViewStyle) {
            this.allDayEventsViewStyle['updateNativePresenter']();
        }
        this.updateNativeOwner();
    };
    CalendarDayViewStyle.prototype.updateOwner = function () {
        if (this._owner) {
            this._owner.updateCalendar();
        }
    };
    CalendarDayViewStyle.prototype.onShowWeekNumbersChanged = function (oldValue, newValue) {
        if (this._owner && this._owner._nativeView && this._owner._nativeView.presenter instanceof TKCalendarDayViewPresenter) {
            this._owner._nativeView.presenter.weekNumbersHidden = !newValue;
        }
        this.updateOwner();
    };
    CalendarDayViewStyle.prototype.onShowTitleChanged = function (oldValue, newValue) {
        if (this._owner && this._owner._nativeView && this._owner._nativeView.presenter instanceof TKCalendarDayViewPresenter) {
            this._owner._nativeView.presenter.titleHidden = !newValue;
        }
        this.updateOwner();
    };
    CalendarDayViewStyle.prototype.onShowDayNamesChanged = function (oldValue, newValue) {
        if (this._owner && this._owner._nativeView && this._owner._nativeView.presenter instanceof TKCalendarDayViewPresenter) {
            this._owner._nativeView.presenter.dayNamesHidden = !newValue;
        }
        this.updateOwner();
    };
    CalendarDayViewStyle.prototype.onBackgroundColorChanged = function (oldValue, newValue) {
        if (newValue && this._owner && this._owner._nativeView && this._owner._nativeView.presenter instanceof TKCalendarDayViewPresenter) {
            this._owner._nativeView.presenter.style.backgroundColor = newValue.ios;
        }
        this.updateOwner();
    };
    CalendarDayViewStyle.prototype.onTitleCellStyleChanged = function (oldValue, newValue) {
        this.updateOwner();
    };
    CalendarDayViewStyle.prototype.onDayEventsViewStyleChanged = function (oldValue, newValue) {
        if (newValue && this._owner) {
            this.dayEventsViewStyle.owner = this._owner;
        }
        this.updateOwner();
    };
    CalendarDayViewStyle.prototype.onAllDayEventsViewStyleChanged = function (oldValue, newValue) {
        if (newValue && this._owner) {
            this.allDayEventsViewStyle.owner = this._owner;
        }
        this.updateOwner();
    };
    CalendarDayViewStyle.prototype.onShowWeekChanged = function (oldValue, newValue) {
        this.changeShowWeek(oldValue, newValue);
    };
    CalendarDayViewStyle.prototype.changeShowWeek = function (oldValue, newValue) {
        if (this._owner && this._owner._nativeView && this._owner._nativeView.presenter instanceof TKCalendarDayViewPresenter) {
            this._owner._nativeView.presenter.weekHidden = !newValue;
        }
        this.updateOwner();
    };
    return CalendarDayViewStyle;
}(commonModule.CalendarDayViewStyle));
exports.CalendarDayViewStyle = CalendarDayViewStyle;
/**
 * The style class for month name view mode.
 * NOTE: we should consider if we need an explicit class that is the same as the base one
 */
var CalendarMonthNamesViewStyle = /** @class */ (function (_super) {
    __extends(CalendarMonthNamesViewStyle, _super);
    function CalendarMonthNamesViewStyle() {
        return _super.call(this) || this;
    }
    Object.defineProperty(CalendarMonthNamesViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthNamesViewStyle.prototype.updateViewStyles = function (forceUpdate) {
        this.updateOwner();
    };
    CalendarMonthNamesViewStyle.prototype.updateOwner = function () {
        if (this._owner && this._owner.viewMode === commonModule.CalendarViewMode.MonthNames) {
            this._owner.updateCalendar();
        }
    };
    CalendarMonthNamesViewStyle.prototype.onTitleCellStyleChanged = function (oldValue, newValue) {
        this.updateOwner();
    };
    CalendarMonthNamesViewStyle.prototype.onMonthNameCellStyleChanged = function (oldValue, newValue) {
        this.updateOwner();
    };
    return CalendarMonthNamesViewStyle;
}(commonModule.CalendarMonthNamesViewStyle));
exports.CalendarMonthNamesViewStyle = CalendarMonthNamesViewStyle;
/**
 * The year mode style class
 */
var CalendarYearViewStyle = /** @class */ (function (_super) {
    __extends(CalendarYearViewStyle, _super);
    function CalendarYearViewStyle() {
        return _super.call(this) || this;
    }
    Object.defineProperty(CalendarYearViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            if (this.monthCellStyle) {
                this.monthCellStyle.owner = this._owner;
            }
        },
        enumerable: true,
        configurable: true
    });
    CalendarYearViewStyle.prototype.updateViewStyles = function (forceUpdate) {
        this.monthCellStyle['updateNativePresenter']();
        this.updateOwner();
    };
    CalendarYearViewStyle.prototype.updateOwner = function () {
        if (this._owner) {
            this._owner.updateCalendar();
        }
    };
    CalendarYearViewStyle.prototype.onTitleCellStyleChanged = function (oldValue, newValue) {
        this.updateOwner();
    };
    CalendarYearViewStyle.prototype.onMonthCellStyleChanged = function (oldValue, newValue) {
        if (newValue && this._owner) {
            this.monthCellStyle.owner = this._owner;
        }
        this.updateOwner();
    };
    return CalendarYearViewStyle;
}(commonModule.CalendarYearViewStyle));
exports.CalendarYearViewStyle = CalendarYearViewStyle;
////////////////////////////////////////////////////////////////////////////////////////////////////
var RadCalendar = /** @class */ (function (_super) {
    __extends(RadCalendar, _super);
    function RadCalendar() {
        var _this = _super.call(this) || this;
        _this._ios = TKCalendar.alloc().init();
        _this._nativeDelegate = TKCalendarNativeDelegateImplementation.initWithOwner(new WeakRef(_this));
        _this._nativePresenterDelegate = TKCalendarMonthPresenterDelegateImplementation.initWithOwner(new WeakRef(_this));
        _this._dayViewDelegate = TKCalendarDayViewDelegateImplementation.initWithOwner(new WeakRef(_this));
        _this._ios.delegate = _this._nativeDelegate;
        _this._currentCalendar = NSCalendar.currentCalendar;
        _this._dateComponents = NSDateComponents.alloc().init();
        if (_this.displayedDate === undefined) {
            _this.loadNativeDisplayedDate();
        }
        _this.setNativeLocale(_this.locale);
        return _this;
    }
    Object.defineProperty(RadCalendar.prototype, "_nativeView", {
        // TODO: Remove this and implement native setters for properties
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.prototype.createNativeView = function () {
        return this._ios;
    };
    RadCalendar.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        this._ios.delegate = this._nativeDelegate;
        this._ios.dataSource = this._dataSource;
        this._ios.presenter.delegate = this._nativePresenterDelegate;
        this._calendarLoaded = true;
    };
    RadCalendar.prototype.onUnloaded = function () {
        _super.prototype.onUnloaded.call(this);
        this._ios.delegate = null;
        this._ios.dataSource = null;
        this._calendarLoaded = false;
        if (this._ios.presenter instanceof TKCalendarPresenterBase) {
            this._ios.presenter.delegate = null;
        }
    };
    RadCalendar.prototype.updateCalendar = function () {
        if (this._calendarLoaded && this._nativeView.presenter) {
            this._nativeView.presenter.update(false);
        }
    };
    RadCalendar.prototype.onLocalePropertyChanged = function (oldValue, newValue) {
        _super.prototype.onLocalePropertyChanged.call(this, oldValue, newValue);
        this.setNativeLocale(newValue);
    };
    RadCalendar.prototype.setNativeLocale = function (locale) {
        if (locale) {
            this._nativeView.locale = NSLocale.alloc().initWithLocaleIdentifier(locale);
            this.updateCalendar();
        }
    };
    RadCalendar.prototype.onDisplayedDateChanged = function (oldValue, newValue) {
        if (newValue) {
            this._nativeView.navigateToDateAnimated(newValue, false);
        }
    };
    RadCalendar.prototype.getDisplayedDate = function () {
        return this._nativeView.displayedDate;
    };
    RadCalendar.prototype.onSelectionModeChanged = function (oldValue, newValue) {
        switch (newValue) {
            case commonModule.CalendarSelectionMode.None:
                this._nativeView.selectionMode = 0 /* None */;
                break;
            case commonModule.CalendarSelectionMode.Single:
                this._nativeView.selectionMode = 1 /* Single */;
                break;
            case commonModule.CalendarSelectionMode.Multiple:
                this._nativeView.selectionMode = 2 /* Multiple */;
                break;
            case commonModule.CalendarSelectionMode.Range:
                this._nativeView.selectionMode = 3 /* Range */;
                break;
            default:
                console.log("WARNING: Unsupported selection mode: " + newValue);
        }
    };
    RadCalendar.prototype.onTransitionModeChanged = function (oldValue, newValue) {
        if (newValue) {
            var typedPresenter = this._nativeView.presenter;
            switch (newValue) {
                case commonModule.CalendarTransitionMode.None:
                    typedPresenter.transitionMode = 0 /* None */;
                    break;
                case commonModule.CalendarTransitionMode.Slide:
                    typedPresenter.transitionMode = 6 /* Scroll */;
                    break;
                case commonModule.CalendarTransitionMode.Stack:
                    typedPresenter.transitionMode = 4 /* Card */;
                    break;
                case commonModule.CalendarTransitionMode.Flip:
                    typedPresenter.transitionMode = 1 /* Flip */;
                    break;
                case commonModule.CalendarTransitionMode.Fold:
                    typedPresenter.transitionMode = 2 /* Fold */;
                    break;
                case commonModule.CalendarTransitionMode.Float:
                    typedPresenter.transitionMode = 3 /* Float */;
                    break;
                case commonModule.CalendarTransitionMode.Rotate:
                    typedPresenter.transitionMode = 5 /* Rotate */;
                    break;
                default:
                    console.log("WARNING: Unsupported transitionMode mode: " + newValue);
            }
        }
    };
    RadCalendar.prototype.onViewModeChanged = function (oldValue, newValue) {
        var viewStyle;
        switch (newValue) {
            case commonModule.CalendarViewMode.Month:
                this._nativeView.viewMode = 1 /* Month */;
                viewStyle = this.monthViewStyle;
                break;
            case commonModule.CalendarViewMode.MonthNames:
                this._nativeView.viewMode = 2 /* MonthNames */;
                viewStyle = this.monthNamesViewStyle;
                break;
            case commonModule.CalendarViewMode.Week:
                this._nativeView.viewMode = 0 /* Week */;
                viewStyle = this.weekViewStyle;
                break;
            case commonModule.CalendarViewMode.Year:
                this._nativeView.viewMode = 3 /* Year */;
                viewStyle = this.yearViewStyle;
                break;
            case commonModule.CalendarViewMode.Day:
                this._nativeView.viewMode = 6 /* Day */;
                viewStyle = this.dayViewStyle;
                if (this._nativeView.presenter instanceof TKCalendarDayViewPresenter) {
                    this._nativeView.presenter.dayView.delegate = this._dayViewDelegate;
                }
                break;
            // case commonModule.CalendarViewMode.Flow.toLocaleLowerCase():
            //     this.ios.viewMode = TKCalendarViewMode.TKCalendarViewModeFlow;
            //     break;
            // case commonModule.CalendarViewMode.YearNumbers.toLocaleLowerCase():
            // 	this.ios.viewMode = TKCalendarViewMode.TKCalendarViewModeYearNumbers;
            // 	break;
            default:
                console.log("WARNING: Unsupported view mode: " + newValue);
        }
        if (viewStyle) {
            viewStyle.updateViewStyles();
        }
    };
    RadCalendar.prototype.onEventsViewModeChanged = function (oldValue, newValue) {
        if (this._nativeView.viewMode !== 1 /* Month */ || newValue === undefined) {
            return;
        }
        var typedPresenter = this._nativeView.presenter;
        switch (newValue) {
            case commonModule.CalendarEventsViewMode.None:
                typedPresenter.inlineEventsViewMode = 0 /* None */;
                break;
            case commonModule.CalendarEventsViewMode.Inline:
                typedPresenter.inlineEventsViewMode = 1 /* Inline */;
                break;
            case commonModule.CalendarEventsViewMode.Popover:
                typedPresenter.inlineEventsViewMode = 2 /* Popover */;
                console.log("WARNING: Popover mode for events is not supported for iPhone.");
                break;
            default:
                console.log("WARNING: Unsupported events view mode: " + newValue);
        }
    };
    RadCalendar.prototype.onSelectedDateRangeChanged = function (oldValue, newValue) {
        if (this._forbidDateSelection) {
            return;
        }
        if (newValue instanceof commonModule.DateRange) {
            var tkDateRange = TKDateRange.alloc().initWithStartEnd(newValue.startDate, newValue.endDate);
            this._nativeView.selectedDatesRange = tkDateRange;
        }
    };
    RadCalendar.prototype.onSelectedDatesChanged = function (oldValue, newValue) {
        if (this._forbidDateSelection) {
            return;
        }
        var newDates = newValue;
        if (typeof (newDates) === "string") {
            newDates = newDates.split(",");
        }
        var selectedDates = NSMutableArray.new();
        for (var i = 0; i < newDates.length; i++) {
            var date = new Date(newDates[i]);
            selectedDates.addObject(date);
        }
        this._nativeView.selectedDates = selectedDates;
    };
    RadCalendar.prototype.onSelectedDateChanged = function (oldValue, newValue) {
        if (this._forbidDateSelection) {
            return;
        }
        this._nativeView.selectedDate = newValue;
    };
    RadCalendar.prototype.onMaxDateChanged = function (oldValue, newValue) {
        this._nativeView.maxDate = newValue;
    };
    RadCalendar.prototype.onMinDateChanged = function (oldValue, newValue) {
        this._nativeView.minDate = newValue;
    };
    RadCalendar.prototype.updateEventSource = function () {
        if (!this._nativeView) {
            return;
        }
        if (this.eventSource) {
            if (!this._dataSource) {
                this._dataSource = CalendarNativeDataSourceImplementation.new().initWithOwner(this);
                this._dataSource.itemsSource = this.eventSource;
                this._ios.dataSource = this._dataSource;
                if (this.viewMode === commonModule.CalendarViewMode.Day) {
                    this._ios.presenter.update(true);
                }
            }
            else {
                this._dataSource.itemsSource = this.eventSource;
                this._ios.presenter.update(false);
            }
        }
    };
    RadCalendar.prototype.onHorizontalTransitionChanged = function (oldValue, newValue) {
        var horizontalTransition = newValue;
        this._nativeView.presenter['transitionIsVertical'] = !horizontalTransition;
    };
    RadCalendar.prototype.onMonthViewStyleChanged = function (oldValue, newValue) {
        if (newValue && (newValue instanceof CalendarMonthViewStyle)) {
            this.monthViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.onMonthNamesViewStyleChanged = function (oldValue, newValue) {
        if (newValue && (newValue instanceof CalendarMonthNamesViewStyle)) {
            this.monthNamesViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.onWeekViewStyleChanged = function (oldValue, newValue) {
        if (newValue && (newValue instanceof CalendarWeekViewStyle)) {
            this.weekViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.onDayViewStyleChanged = function (oldValue, newValue) {
        if (newValue && (newValue instanceof CalendarDayViewStyle)) {
            this.dayViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.onYearViewStyleChanged = function (oldValue, newValue) {
        if (newValue && (newValue instanceof CalendarYearViewStyle)) {
            this.yearViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.loadNativeDisplayedDate = function () {
        var nativeDate = this.dateWithoutHours(this._ios.displayedDate);
        if (this.displayedDate !== nativeDate) {
            this.displayedDate = nativeDate;
        }
    };
    RadCalendar.prototype.dateWithoutHours = function (originalDate) {
        this._dateComponents.day = originalDate.getDate();
        this._dateComponents.month = originalDate.getMonth() + 1;
        this._dateComponents.year = originalDate.getFullYear();
        return this._currentCalendar.dateFromComponents(this._dateComponents);
    };
    RadCalendar.prototype.reload = function () {
        if (this._nativeView) {
            this._nativeView.reloadData();
        }
    };
    RadCalendar.prototype.navigateForward = function () {
        this._nativeView.navigateForward(true);
    };
    RadCalendar.prototype.navigateBack = function () {
        this._nativeView.navigateBack(true);
    };
    RadCalendar.prototype.goToDate = function (date) {
        this._nativeView.navigateToDateAnimated(date, true);
    };
    RadCalendar.prototype.getEventsForDate = function (date) {
        var nativeResult = this._nativeView.eventsForDate(date);
        var result = new Array();
        var a = new interop.Reference();
        var r = new interop.Reference();
        var g = new interop.Reference();
        var b = new interop.Reference();
        var nativeEvent;
        var event;
        for (var i = 0; i < nativeResult.count; i++) {
            nativeEvent = nativeResult.objectAtIndex(i);
            if (nativeEvent.eventColor) {
                nativeEvent.eventColor.getRedGreenBlueAlpha(r, g, b, a);
            }
            var color = nativeEvent.eventColor ? new color_1.Color(Math.round(a.value * 255), Math.round(r.value * 255), Math.round(g.value * 255), Math.round(b.value * 255)) : null;
            event = new CalendarEvent(nativeEvent.title, nativeEvent.startDate, nativeEvent.endDate, nativeEvent.allDay, color);
            result.push(event);
        }
        return result;
    };
    return RadCalendar;
}(commonModule.RadCalendar));
exports.RadCalendar = RadCalendar;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var CalendarNativeDataSourceImplementation = /** @class */ (function (_super) {
    __extends(CalendarNativeDataSourceImplementation, _super);
    function CalendarNativeDataSourceImplementation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarNativeDataSourceImplementation.new = function () {
        return _super.new.call(this);
    };
    CalendarNativeDataSourceImplementation.prototype.initWithSourceAndOwner = function (source, owner) {
        this.itemsSource = source;
        this._owner = owner;
        return this;
    };
    CalendarNativeDataSourceImplementation.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    Object.defineProperty(CalendarNativeDataSourceImplementation.prototype, "itemsSource", {
        get: function () {
            return this._itemsSource;
        },
        set: function (value) {
            if (value instanceof observable_array_1.ObservableArray) {
                var list = new Array();
                for (var i = 0; i < value.length; i++) {
                    list.push(value.getItem(i));
                }
                this._itemsSource = list;
            }
            else {
                this._itemsSource = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    CalendarNativeDataSourceImplementation.prototype.calendarEventsForDate = function (calendar, date) {
        var nativeEvents = NSMutableArray.alloc().init();
        for (var event_1 in this.itemsSource) {
            var startDate = this.itemsSource[event_1].startDate;
            var endDate = this.itemsSource[event_1].endDate;
            if (startDate && endDate) {
                // check if the date is between the start/end dates or exactly equal to either start or end
                if ((endDate.getTime() >= date.getTime() && startDate.getTime() <= date.getTime()) ||
                    (startDate.getDate() === date.getDate() && startDate.getMonth() === date.getMonth() && startDate.getFullYear() === date.getFullYear()) ||
                    (endDate.getDate() === date.getDate() && endDate.getMonth() === date.getMonth() && endDate.getFullYear() === date.getFullYear())) {
                    nativeEvents.addObject(this.itemsSource[event_1].ios);
                }
            }
        }
        return nativeEvents;
    };
    CalendarNativeDataSourceImplementation.prototype.calendarEventsFromDateToDateWithCallback = function (calendar, fromDate, toDate, callback) {
        var nativeEvents = NSMutableArray.alloc().init();
        for (var event_2 in this.itemsSource) {
            var startDate = this.itemsSource[event_2].startDate;
            var endDate = this.itemsSource[event_2].endDate;
            // SD - startDate
            // ED - endDate
            // FD - fromDate
            // TD - toDate
            // -----SD----FD--------ED-----------------------------------------TD---------
            if ((startDate.getTime() <= fromDate.getTime() && endDate.getTime() >= fromDate.getTime()) ||
                // -----SD----FD---------------------------------------------------TD--ED-----
                (startDate.getTime() <= fromDate.getTime() && endDate.getTime() >= toDate.getTime()) ||
                // -----------FD--------------------------------------------SD-----TD--ED-----
                (startDate.getTime() <= toDate.getTime() && endDate.getTime() >= toDate.getTime()) ||
                // -----------FD---SD---------------------------------------ED-----TD---------
                (startDate.getTime() >= fromDate.getTime() && endDate.getTime() <= toDate.getTime())) {
                nativeEvents.addObject(this.itemsSource[event_2].ios);
            }
        }
        return nativeEvents;
    };
    CalendarNativeDataSourceImplementation.ObjCProtocols = [TKCalendarDataSource];
    return CalendarNativeDataSourceImplementation;
}(NSObject));
exports.CalendarNativeDataSourceImplementation = CalendarNativeDataSourceImplementation;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var TKCalendarMonthPresenterDelegateImplementation = /** @class */ (function (_super) {
    __extends(TKCalendarMonthPresenterDelegateImplementation, _super);
    function TKCalendarMonthPresenterDelegateImplementation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TKCalendarMonthPresenterDelegateImplementation.initWithOwner = function (owner) {
        var instance = _super.new.call(this);
        instance._owner = owner;
        return instance;
    };
    TKCalendarMonthPresenterDelegateImplementation.prototype.monthPresenterInlineEventSelected = function (presenter, event) {
        var inlineEventData = new CalendarEvent(event.title, event.startDate, event.endDate, event.allDay);
        var args = {
            eventName: commonModule.RadCalendar.inlineEventSelectedEvent,
            object: this._owner.get(),
            eventData: inlineEventData
        };
        this._owner.get().notify(args);
    };
    // called for every inline event cell and we use to set the styling properties if any.
    TKCalendarMonthPresenterDelegateImplementation.prototype.monthPresenterUpdateVisualsForInlineEventCell = function (presenter, cell) {
        if (this._owner.get().monthViewStyle) {
            var style = this._owner.get().monthViewStyle.inlineEventCellStyle;
            if (style) {
                if (style.cellBackgroundColor) {
                    cell.style.backgroundColor = style.cellBackgroundColor.ios;
                }
                if (style.eventTextColor) {
                    cell.style.eventColor = style.eventTextColor.ios;
                }
                if (style.timeTextColor) {
                    cell.style.timeColor = style.timeTextColor.ios;
                }
                if (style.eventFontName || style.eventFontStyle || style.eventTextSize) {
                    cell.style.eventFont = Tools.createFont(style.eventFontName, style.eventFontStyle, style.eventTextSize);
                }
                if (style.timeTextColor || style.timeFontName || style.timeFontStyle) {
                    cell.style.timeFont = Tools.createFont(style.timeFontName, style.timeFontStyle, style.timeTextSize);
                }
            }
        }
    };
    TKCalendarMonthPresenterDelegateImplementation.ObjCProtocols = [TKCalendarMonthPresenterDelegate];
    return TKCalendarMonthPresenterDelegateImplementation;
}(NSObject));
exports.TKCalendarMonthPresenterDelegateImplementation = TKCalendarMonthPresenterDelegateImplementation;
var TKCalendarDayViewDelegateImplementation = /** @class */ (function (_super) {
    __extends(TKCalendarDayViewDelegateImplementation, _super);
    function TKCalendarDayViewDelegateImplementation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TKCalendarDayViewDelegateImplementation.initWithOwner = function (owner) {
        var instance = _super.new.call(this);
        instance._owner = owner;
        return instance;
    };
    TKCalendarDayViewDelegateImplementation.prototype.dayViewDidSelectEvent = function (dayView, event) {
        var dayViewEventData = new CalendarEvent(event.title, event.startDate, event.endDate, event.allDay);
        var args = {
            eventName: commonModule.RadCalendar.dayViewEventSelectedEvent,
            object: this._owner.get(),
            eventData: dayViewEventData
        };
        this._owner.get().notify(args);
    };
    TKCalendarDayViewDelegateImplementation.ObjCProtocols = [TKCalendarDayViewDelegate];
    return TKCalendarDayViewDelegateImplementation;
}(NSObject));
exports.TKCalendarDayViewDelegateImplementation = TKCalendarDayViewDelegateImplementation;
var TKCalendarNativeDelegateImplementation = /** @class */ (function (_super) {
    __extends(TKCalendarNativeDelegateImplementation, _super);
    function TKCalendarNativeDelegateImplementation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TKCalendarNativeDelegateImplementation.initWithOwner = function (owner) {
        var instance = _super.new.call(this);
        instance._owner = owner;
        return instance;
    };
    TKCalendarNativeDelegateImplementation.prototype.calendarDidChangedViewModeFromTo = function (calendar, previousViewMode, viewMode) {
        var args = {
            eventName: commonModule.RadCalendar.viewModeChangedEvent,
            object: this._owner.get(),
            oldValue: this.getViewModeFromTKCalendarViewMode(previousViewMode),
            newValue: this.getViewModeFromTKCalendarViewMode(viewMode)
        };
        this._owner.get().notify(args);
        // this update will trigger update of UI styles for new view mode
        if (this._owner.get().viewMode !== args.newValue) {
            this._owner.get().viewMode = args.newValue;
        }
    };
    TKCalendarNativeDelegateImplementation.prototype.calendarDidDeselectedDate = function (calendar, date) {
        if (this._owner.get().selectionMode === commonModule.CalendarSelectionMode.Multiple) {
            this._owner.get()._forbidDateSelection = true;
            this._owner.get()._removeSelectedDate(date);
            this._owner.get()._forbidDateSelection = false;
        }
        var args = {
            eventName: commonModule.RadCalendar.dateDeselectedEvent,
            object: this._owner.get(),
            date: date
        };
        this._owner.get().notify(args);
    };
    TKCalendarNativeDelegateImplementation.prototype.calendarDidTapCell = function (calendar, cell) {
        var args = {
            eventName: commonModule.RadCalendar.cellTapEvent,
            object: this._owner.get(),
            cell: cell,
            date: cell.date
        };
        this._owner.get().notify(args);
    };
    // Android currently doesn't supoort this event. will implement on a later stage.
    TKCalendarNativeDelegateImplementation.prototype.calendarShouldSelectDate = function (calendar, date) {
        return true;
    };
    // NOTE: In range selection this method is called once for the end date.
    TKCalendarNativeDelegateImplementation.prototype.calendarDidSelectDate = function (calendar, date) {
        this._owner.get()._forbidDateSelection = true;
        if (!this._owner.get().selectedDate || date.getTime() !== this._owner.get().selectedDate.getTime()) {
            this._owner.get().selectedDate = date;
        }
        if (this._owner.get().selectionMode === commonModule.CalendarSelectionMode.Range) {
            this._owner.get().selectedDateRange =
                new commonModule.DateRange(this._owner.get().ios.selectedDatesRange.startDate, this._owner.get().ios.selectedDatesRange.endDate);
        }
        else if (this._owner.get().selectionMode === commonModule.CalendarSelectionMode.Multiple) {
            this._owner.get()._addSelectedDate(date);
        }
        this._owner.get()._forbidDateSelection = false;
        var args = {
            eventName: commonModule.RadCalendar.dateSelectedEvent,
            object: this._owner.get(),
            date: date
        };
        this._owner.get().notify(args);
    };
    TKCalendarNativeDelegateImplementation.prototype.calendarDidNavigateToDate = function (calendar, date) {
        var nativeDate = this._owner.get().dateWithoutHours(date);
        var args = {
            eventName: commonModule.RadCalendar.navigatedToDateEvent,
            object: this._owner.get(),
            date: nativeDate
        };
        if (this._owner.get().displayedDate !== args.date) {
            this._owner.get().displayedDate = args.date;
        }
        this._owner.get().notify(args);
    };
    TKCalendarNativeDelegateImplementation.prototype.calendarWillNavigateToDate = function (calendar, date) {
        var nativeDate = this._owner.get().dateWithoutHours(date);
        var args = {
            eventName: commonModule.RadCalendar.navigatingToDateStartedEvent,
            object: this._owner.get(),
            date: nativeDate
        };
        this._owner.get().notify(args);
    };
    TKCalendarNativeDelegateImplementation.prototype.calendarUpdateVisualsForCell = function (calendar, cell) {
        if (this._owner.get() && this._owner.get().viewMode) {
            switch (this._owner.get().viewMode.toLowerCase()) {
                case commonModule.CalendarViewMode.Month.toLowerCase():
                    this.applyMonthViewCellStyles(cell);
                    break;
                case commonModule.CalendarViewMode.Year.toLowerCase():
                    this.applyYearViewCellStyles(cell);
                    break;
                case commonModule.CalendarViewMode.Week.toLowerCase():
                    this.applyWeekViewCellStyles(cell);
                    break;
                case commonModule.CalendarViewMode.Day.toLowerCase():
                    this.applyDayViewCellStyles(cell);
                    break;
                case commonModule.CalendarViewMode.MonthNames.toLowerCase():
                    this.applyMonthNamesViewCellStyles(cell);
                    break;
            }
        }
    };
    TKCalendarNativeDelegateImplementation.prototype.applyWeekViewCellStyles = function (cell) {
        if ((this._owner.get().viewMode !== commonModule.CalendarViewMode.Week) ||
            (!this._owner.get().weekViewStyle)) {
            return;
        }
        if (cell instanceof TKCalendarDayCell) {
            this.applyDayCellStyleToCell(this._owner.get().weekViewStyle, cell);
        }
        else if (cell instanceof TKCalendarWeekNumberCell) {
            this.applyWeekNumberCellStyleToCell(this._owner.get().weekViewStyle, cell);
        }
        else if (cell instanceof TKCalendarDayNameCell) {
            this.applyDayNameCellStyleToCell(this._owner.get().weekViewStyle, cell);
        }
        else if (cell instanceof TKCalendarTitleCell) {
            this.applyTitleCellStyleToCell(this._owner.get().weekViewStyle, cell);
        }
    };
    TKCalendarNativeDelegateImplementation.prototype.applyDayViewCellStyles = function (cell) {
        if ((this._owner.get().viewMode !== commonModule.CalendarViewMode.Day) ||
            (!this._owner.get().dayViewStyle)) {
            return;
        }
        if (cell instanceof TKCalendarDayCell) {
            this.applyDayCellStyleToCell(this._owner.get().dayViewStyle, cell);
        }
        else if (cell instanceof TKCalendarWeekNumberCell) {
            this.applyWeekNumberCellStyleToCell(this._owner.get().dayViewStyle, cell);
        }
        else if (cell instanceof TKCalendarDayNameCell) {
            this.applyDayNameCellStyleToCell(this._owner.get().dayViewStyle, cell);
        }
        else if (cell instanceof TKCalendarTitleCell) {
            this.applyTitleCellStyleToCell(this._owner.get().dayViewStyle, cell);
        }
    };
    TKCalendarNativeDelegateImplementation.prototype.applyYearViewCellStyles = function (cell) {
        if ((this._owner.get().viewMode !== commonModule.CalendarViewMode.Year) ||
            (!this._owner.get().yearViewStyle)) {
            return;
        }
        // NOTE: only title cell is styled on delegate call, months use presenter members
        if (cell instanceof TKCalendarTitleCell) {
            this.applyTitleCellStyleToCell(this._owner.get().yearViewStyle, cell);
        }
    };
    TKCalendarNativeDelegateImplementation.prototype.applyMonthNamesViewCellStyles = function (cell) {
        if ((this._owner.get().viewMode !== commonModule.CalendarViewMode.MonthNames) ||
            (!this._owner.get().monthNamesViewStyle)) {
            return;
        }
        if (cell instanceof TKCalendarTitleCell) {
            this.applyTitleCellStyleToCell(this._owner.get().monthNamesViewStyle, cell);
        }
        if (cell instanceof TKCalendarMonthNameCell) {
            this.applyMonthNameCellStyleToCell(this._owner.get().monthNamesViewStyle, cell);
        }
    };
    TKCalendarNativeDelegateImplementation.prototype.applyMonthViewCellStyles = function (cell) {
        if ((this._owner.get().viewMode !== commonModule.CalendarViewMode.Month) ||
            (!this._owner.get().monthViewStyle)) {
            return;
        }
        if (cell instanceof TKCalendarDayCell) {
            this.applyDayCellStyleToCell(this._owner.get().monthViewStyle, cell);
        }
        else if (cell instanceof TKCalendarWeekNumberCell) {
            this.applyWeekNumberCellStyleToCell(this._owner.get().monthViewStyle, cell);
        }
        else if (cell instanceof TKCalendarDayNameCell) {
            this.applyDayNameCellStyleToCell(this._owner.get().monthViewStyle, cell);
        }
        else if (cell instanceof TKCalendarTitleCell) {
            this.applyTitleCellStyleToCell(this._owner.get().monthViewStyle, cell);
        }
    };
    /**
     * Generic method that applies regular day style to cell of given view mode
     */
    TKCalendarNativeDelegateImplementation.prototype.applyDayCellStyleToCell = function (viewModeStyle, cell) {
        if (!viewModeStyle) {
            return;
        }
        if ((viewModeStyle instanceof CalendarMonthViewStyle || viewModeStyle instanceof CalendarDayViewStyle) &&
            (cell.state & 16 /* Selected */) !== 0) {
            var typedStyle = viewModeStyle;
            var shapeSize = utils.layout.toDevicePixels(viewModeStyle.selectionShapeSize);
            switch (typedStyle.selectionShape) {
                case commonModule.CalendarSelectionShape.Round:
                    cell.style().shape = TKPredefinedShape.shapeWithTypeAndSize(2 /* Circle */, new CGSize({ width: shapeSize, height: shapeSize }));
                    break;
                case commonModule.CalendarSelectionShape.Square:
                    cell.style().shape = TKPredefinedShape.shapeWithTypeAndSize(1 /* Square */, new CGSize({ width: shapeSize, height: shapeSize }));
                    break;
                case commonModule.CalendarSelectionShape.None:
                    cell.style().shape = TKPredefinedShape.shapeWithTypeAndSize(0 /* None */, new CGSize({ width: shapeSize, height: shapeSize }));
                    break;
            }
            if (typedStyle.selectionShapeColor) {
                cell.style().shapeFill = new TKSolidFill(typedStyle.selectionShapeColor.ios);
            }
        }
        // styles applied by priority: selected, weekend, today, regular day
        var dayCellStyle = null;
        if (viewModeStyle.selectedDayCellStyle &&
            (cell.state & 16 /* Selected */ || cell.state & 128 /* MidInSelection */ ||
                cell.state & 32 /* FirstInSelection */ || cell.state & 64 /* LastInSelection */)) {
            dayCellStyle = viewModeStyle.selectedDayCellStyle;
        }
        else if (cell.state & 2 /* Weekend */ && viewModeStyle.weekendCellStyle) {
            dayCellStyle = viewModeStyle.weekendCellStyle;
        }
        else if (cell.state & 1 /* Today */ && viewModeStyle.todayCellStyle) {
            dayCellStyle = viewModeStyle.todayCellStyle;
        }
        else {
            dayCellStyle = viewModeStyle.dayCellStyle;
        }
        if (!dayCellStyle) {
            // apply default theme style if there is not any style set
            dayCellStyle = new DayCellStyle();
            this.applyCommonCellStyleProperties(cell, dayCellStyle);
            return;
        }
        this.applyCommonCellStyleProperties(cell, dayCellStyle);
        // apply day specific properties
        if (dayCellStyle instanceof DayCellStyle) {
            cell.style().displayEventsAsText = dayCellStyle.ios.displayEventsAsText;
            cell.style().eventInsets = dayCellStyle.ios.eventInsets;
            cell.style().eventTextColor = dayCellStyle.ios.eventTextColor;
            cell.style().eventFont = dayCellStyle.ios.eventFont;
        }
    };
    TKCalendarNativeDelegateImplementation.prototype.applyTitleCellStyleToCell = function (viewModeStyle, cell) {
        if (!viewModeStyle || !viewModeStyle.titleCellStyle) {
            return;
        }
        this.applyCommonCellStyleProperties(cell, viewModeStyle.titleCellStyle);
    };
    TKCalendarNativeDelegateImplementation.prototype.applyDayNameCellStyleToCell = function (viewModeStyle, cell) {
        if (!viewModeStyle || !viewModeStyle.dayNameCellStyle) {
            return;
        }
        this.applyCommonCellStyleProperties(cell, viewModeStyle.dayNameCellStyle);
    };
    TKCalendarNativeDelegateImplementation.prototype.applyMonthNameCellStyleToCell = function (viewModeStyle, cell) {
        if (!viewModeStyle || !viewModeStyle.monthNameCellStyle) {
            return;
        }
        this.applyCommonCellStyleProperties(cell, viewModeStyle.monthNameCellStyle);
    };
    TKCalendarNativeDelegateImplementation.prototype.applyWeekNumberCellStyleToCell = function (viewModeStyle, cell) {
        if (!viewModeStyle || !viewModeStyle.weekNumberCellStyle) {
            return;
        }
        this.applyCommonCellStyleProperties(cell, viewModeStyle.weekNumberCellStyle);
    };
    TKCalendarNativeDelegateImplementation.prototype.applyCommonCellStyleProperties = function (cell, cellStyle) {
        if (cell && cellStyle) {
            if (cellStyle.cellBackgroundColor) {
                cell.style().backgroundColor = cellStyle.ios.backgroundColor;
            }
            else {
                cell.style().backgroundColor = new color_1.Color('#00000000').ios;
            }
            if (cellStyle.cellBorderColor) {
                cell.style().leftBorderColor = cellStyle.ios.leftBorderColor;
                cell.style().rightBorderColor = cellStyle.ios.rightBorderColor;
                cell.style().topBorderColor = cellStyle.ios.topBorderColor;
                cell.style().bottomBorderColor = cellStyle.ios.bottomBorderColor;
            }
            else {
                var color = new color_1.Color('#00000000');
                cell.style().leftBorderColor = color.ios;
                cell.style().rightBorderColor = color.ios;
                cell.style().topBorderColor = color.ios;
                cell.style().bottomBorderColor = color.ios;
            }
            if (cellStyle.cellBorderWidth) {
                cell.style().leftBorderWidth = cellStyle.ios.leftBorderWidth;
                cell.style().rightBorderWidth = cellStyle.ios.rightBorderWidth;
                cell.style().topBorderWidth = cellStyle.ios.topBorderWidth;
                cell.style().bottomBorderWidth = cellStyle.ios.bottomBorderWidth;
            }
            if (cellStyle.cellTextColor) {
                cell.style().textColor = cellStyle.ios.textColor;
            }
            if (cellStyle.cellTextFontName || cellStyle.cellTextFontStyle || cellStyle.cellTextSize) {
                cell.style().textFont = cellStyle.ios.textFont;
            }
            if (cellStyle.cellPaddingHorizontal || cellStyle.cellPaddingVertical) {
                cell.style().textInsets = cellStyle.ios.textInsets;
            }
            if (cellStyle.cellAlignment) {
                cell.style().textAlignment = cellStyle.ios.textAlignment;
            }
        }
    };
    TKCalendarNativeDelegateImplementation.prototype.getViewModeFromTKCalendarViewMode = function (viewMode) {
        switch (viewMode) {
            // case TKCalendarViewMode.TKCalendarViewModeFlow: return  commonModule.CalendarViewMode.Flow;
            // case TKCalendarViewMode.TKCalendarViewModeYearNumbers: return = commonModule.CalendarViewMode.YearNumbers;
            case 1 /* Month */:
                return commonModule.CalendarViewMode.Month;
            case 2 /* MonthNames */:
                return commonModule.CalendarViewMode.MonthNames;
            case 0 /* Week */:
                return commonModule.CalendarViewMode.Week;
            case 3 /* Year */:
                return commonModule.CalendarViewMode.Year;
            case 6 /* Day */:
                return commonModule.CalendarViewMode.Day;
            default:
                return commonModule.CalendarViewMode.Month;
        }
    };
    TKCalendarNativeDelegateImplementation.ObjCProtocols = [TKCalendarDelegate];
    return TKCalendarNativeDelegateImplementation;
}(NSObject));
exports.TKCalendarNativeDelegateImplementation = TKCalendarNativeDelegateImplementation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktY2FsZW5kYXIuaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWktY2FsZW5kYXIuaW9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbURBQXFEO0FBQ3JELGdEQUErQztBQUUvQywyRUFBeUU7QUFDekUsb0RBQXNEO0FBRXRELDBDQUFxQztBQUVyQyxvR0FBb0c7QUFDcEc7SUFBbUMsaUNBQTBCO0lBQTdEOztJQTREQSxDQUFDO0lBekRHLHNCQUFJLDhCQUFHO2FBQVA7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDWixJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNyQztZQUVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUVTLG9DQUFZLEdBQXRCLFVBQXVCLEtBQWM7UUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFFUyxvQ0FBWSxHQUF0QjtRQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDM0IsQ0FBQztJQUVTLG1DQUFXLEdBQXJCLFVBQXNCLElBQVU7UUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFUyxtQ0FBVyxHQUFyQjtRQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVTLHFDQUFhLEdBQXZCLFVBQXdCLElBQVU7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFFUyxxQ0FBYSxHQUF2QjtRQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFDOUIsQ0FBQztJQUVTLGlDQUFTLEdBQW5CLFVBQW9CLEtBQWE7UUFDN0IsSUFBSSxDQUFDLEdB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Q0FBQyxJQUFJLENBQUM7WUFDOUM7Z0JBQ0ksT0FBTyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDO1lBQzdDO2dCQUNJLE9BQU8sWUFBWSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQztTQUNsRDtJQUNMLENBQUM7SUFuV2Esb0RBQWEsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFxV3ZELDZDQUFDO0NBQUEsQUF0V0QsQ0FBNEQsUUFBUSxHQXNXbkU7QUF0V1ksd0ZBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY29tbW9uTW9kdWxlIGZyb20gXCIuL3VpLWNhbGVuZGFyLmNvbW1vblwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3V0aWxzL3V0aWxzXCI7XG5cbmV4cG9ydCAqIGZyb20gXCIuL3VpLWNhbGVuZGFyLmNvbW1vblwiO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJFdmVudCBleHRlbmRzIGNvbW1vbk1vZHVsZS5DYWxlbmRhckV2ZW50IHtcblxuICAgIHByaXZhdGUgX2lvczogVEtDYWxlbmRhckV2ZW50O1xuICAgIGdldCBpb3MoKTogVEtDYWxlbmRhckV2ZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9pb3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2lvcyA9IFRLQ2FsZW5kYXJFdmVudC5uZXcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9pb3M7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXRJc0FsbERheSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmlvcy5hbGxEYXkgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2dldElzQWxsRGF5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pb3MuYWxsRGF5O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfc2V0RW5kRGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMuaW9zLmVuZERhdGUgPSBkYXRlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZ2V0RW5kRGF0ZSgpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW9zLmVuZERhdGU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXRTdGFydERhdGUoZGF0ZTogRGF0ZSkge1xuICAgICAgICB0aGlzLmlvcy5zdGFydERhdGUgPSBkYXRlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZ2V0U3RhcnREYXRlKCk6IERhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5pb3Muc3RhcnREYXRlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfc2V0VGl0bGUodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmlvcy50aXRsZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZ2V0VGl0bGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW9zLnRpdGxlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfc2V0RXZlbnRDb2xvcih2YWx1ZTogQ29sb3IpIHtcbiAgICAgICAgdGhpcy5pb3MuZXZlbnRDb2xvciA9IHZhbHVlLmlvcztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2dldEV2ZW50Q29sb3IoKTogQ29sb3Ige1xuICAgICAgICBpZiAodGhpcy5pb3MuZXZlbnRDb2xvcikge1xuICAgICAgICAgICAgbGV0IGEgPSBuZXcgaW50ZXJvcC5SZWZlcmVuY2U8bnVtYmVyPigpO1xuICAgICAgICAgICAgbGV0IHIgPSBuZXcgaW50ZXJvcC5SZWZlcmVuY2U8bnVtYmVyPigpO1xuICAgICAgICAgICAgbGV0IGcgPSBuZXcgaW50ZXJvcC5SZWZlcmVuY2U8bnVtYmVyPigpO1xuICAgICAgICAgICAgbGV0IGIgPSBuZXcgaW50ZXJvcC5SZWZlcmVuY2U8bnVtYmVyPigpO1xuICAgICAgICAgICAgdGhpcy5pb3MuZXZlbnRDb2xvci5nZXRSZWRHcmVlbkJsdWVBbHBoYShyLCBnLCBiLCBhKTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihNYXRoLnJvdW5kKGEudmFsdWUgKiAyNTUpLCBNYXRoLnJvdW5kKHIudmFsdWUgKiAyNTUpLCBNYXRoLnJvdW5kKGcudmFsdWUgKiAyNTUpLCBNYXRoLnJvdW5kKGIudmFsdWUgKiAyNTUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEhlbHBlciBtZXRob2RzXG4gKi9cbmNsYXNzIFRvb2xzIHtcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUZvbnQoZm9udE5hbWU6IHN0cmluZywgZm9udFN0eWxlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJGb250U3R5bGUsIGZvbnRTaXplOiBudW1iZXIpOiBVSUZvbnQge1xuXG4gICAgICAgIGxldCBmb250OiBVSUZvbnQgPSBudWxsO1xuICAgICAgICBsZXQgc2l6ZSA9IGZvbnRTaXplIHx8IDEwO1xuICAgICAgICBpZiAoZm9udE5hbWUpIHtcbiAgICAgICAgICAgIGZvbnQgPSBVSUZvbnQuZm9udFdpdGhOYW1lU2l6ZShmb250TmFtZSwgc2l6ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb250ID0gVUlGb250LnN5c3RlbUZvbnRPZlNpemUoc2l6ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWZvbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV0FSTklORzogQ2Fubm90IGNyZWF0ZSBmb250IHdpdGggZ2l2ZW4gbmFtZTogXCIgKyBmb250ICsgXCIuIFN5c3RlbSBmb250IHdpbGwgYmUgdXNlZCBpbnN0ZWFkLlwiKTtcbiAgICAgICAgICAgIGZvbnQgPSBVSUZvbnQuc3lzdGVtRm9udE9mU2l6ZShzaXplKTtcbiAgICAgICAgICAgIHJldHVybiBmb250O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbnRTdHlsZSkge1xuICAgICAgICAgICAgbGV0IHRyYWl0cyA9IFVJRm9udERlc2NyaXB0b3JTeW1ib2xpY1RyYWl0cy5DbGFzc1Vua25vd247XG4gICAgICAgICAgICBzd2l0Y2ggKGZvbnRTdHlsZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlLkJvbGQ6XG4gICAgICAgICAgICAgICAgICAgIHRyYWl0cyA9IFVJRm9udERlc2NyaXB0b3JTeW1ib2xpY1RyYWl0cy5UcmFpdEJvbGQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlLkl0YWxpYzpcbiAgICAgICAgICAgICAgICAgICAgdHJhaXRzID0gVUlGb250RGVzY3JpcHRvclN5bWJvbGljVHJhaXRzLlRyYWl0SXRhbGljO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhckZvbnRTdHlsZS5Cb2xkSXRhbGljOlxuICAgICAgICAgICAgICAgICAgICB0cmFpdHMgPSBVSUZvbnREZXNjcmlwdG9yU3ltYm9saWNUcmFpdHMuVHJhaXRCb2xkIHwgVUlGb250RGVzY3JpcHRvclN5bWJvbGljVHJhaXRzLlRyYWl0SXRhbGljO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG5ld0ZvbnQgPSBVSUZvbnQuZm9udFdpdGhEZXNjcmlwdG9yU2l6ZSh1dGlscy5pb3MuZ2V0dGVyKGZvbnQsIGZvbnQuZm9udERlc2NyaXB0b3IpLmZvbnREZXNjcmlwdG9yV2l0aFN5bWJvbGljVHJhaXRzKHRyYWl0cyksIHNpemUpO1xuICAgICAgICAgICAgaWYgKG5ld0ZvbnQpIHtcbiAgICAgICAgICAgICAgICBmb250ID0gbmV3Rm9udDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9udDtcbiAgICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU1RZTEVTIEZPUiBESUZGRVJFTlQgQ0VMTCBUWVBFU1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZXhwb3J0IGNsYXNzIENlbGxTdHlsZUluaXRpYWxpemVyIHtcblxuICAgIHB1YmxpYyBvbkNlbGxCb3JkZXJXaWR0aENoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlciwgc3R5bGU6IENlbGxTdHlsZSB8IGNvbW1vbk1vZHVsZS5DZWxsU3R5bGUpIHtcbiAgICAgICAgaWYgKCFpc05hTigrbmV3VmFsdWUpKSB7XG4gICAgICAgICAgICBzdHlsZS5pb3MubGVmdEJvcmRlcldpZHRoID0gbmV3VmFsdWU7XG4gICAgICAgICAgICBzdHlsZS5pb3MucmlnaHRCb3JkZXJXaWR0aCA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgc3R5bGUuaW9zLnRvcEJvcmRlcldpZHRoID0gbmV3VmFsdWU7XG4gICAgICAgICAgICBzdHlsZS5pb3MuYm90dG9tQm9yZGVyV2lkdGggPSBuZXdWYWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0eWxlLmlvcy5sZWZ0Qm9yZGVyV2lkdGggPSAwO1xuICAgICAgICAgICAgc3R5bGUuaW9zLnJpZ2h0Qm9yZGVyV2lkdGggPSAwO1xuICAgICAgICAgICAgc3R5bGUuaW9zLnRvcEJvcmRlcldpZHRoID0gMDtcbiAgICAgICAgICAgIHN0eWxlLmlvcy5ib3R0b21Cb3JkZXJXaWR0aCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25DZWxsQm9yZGVyQ29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yLCBzdHlsZTogQ2VsbFN0eWxlIHwgY29tbW9uTW9kdWxlLkNlbGxTdHlsZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHN0eWxlLmlvcy5sZWZ0Qm9yZGVyQ29sb3IgPSBuZXdWYWx1ZS5pb3M7XG4gICAgICAgICAgICBzdHlsZS5pb3MucmlnaHRCb3JkZXJDb2xvciA9IG5ld1ZhbHVlLmlvcztcbiAgICAgICAgICAgIHN0eWxlLmlvcy50b3BCb3JkZXJDb2xvciA9IG5ld1ZhbHVlLmlvcztcbiAgICAgICAgICAgIHN0eWxlLmlvcy5ib3R0b21Cb3JkZXJDb2xvciA9IG5ld1ZhbHVlLmlvcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBjb2xvciA9IG5ldyBDb2xvcignIzAwMDAwMDAwJyk7XG4gICAgICAgICAgICBzdHlsZS5pb3MubGVmdEJvcmRlckNvbG9yID0gY29sb3IuaW9zO1xuICAgICAgICAgICAgc3R5bGUuaW9zLnJpZ2h0Qm9yZGVyQ29sb3IgPSBjb2xvci5pb3M7XG4gICAgICAgICAgICBzdHlsZS5pb3MudG9wQm9yZGVyQ29sb3IgPSBjb2xvci5pb3M7XG4gICAgICAgICAgICBzdHlsZS5pb3MuYm90dG9tQm9yZGVyQ29sb3IgPSBjb2xvci5pb3M7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25DZWxsQmFja2dyb3VuZENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvciwgc3R5bGU6IENlbGxTdHlsZSB8IGNvbW1vbk1vZHVsZS5DZWxsU3R5bGUpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBzdHlsZS5pb3MuYmFja2dyb3VuZENvbG9yID0gbmV3VmFsdWUuaW9zO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGNvbG9yID0gbmV3IENvbG9yKCcjMDAwMDAwMDAnKTtcbiAgICAgICAgICAgIHN0eWxlLmlvcy5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvci5pb3M7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25DZWxsQWxpZ25tZW50Q2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyQ2VsbEFsaWdubWVudCwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckNlbGxBbGlnbm1lbnQsIHN0eWxlOiBhbnkpIHtcbiAgICAgICAgaWYgKCFuZXdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJDZWxsQWxpZ25tZW50LkJvdHRvbTpcbiAgICAgICAgICAgICAgICBzdHlsZS5pb3MudGV4dEFsaWdubWVudCA9IFRLQ2FsZW5kYXJDZWxsQWxpZ25tZW50LkJvdHRvbTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyQ2VsbEFsaWdubWVudC5Ub3A6XG4gICAgICAgICAgICAgICAgc3R5bGUuaW9zLnRleHRBbGlnbm1lbnQgPSBUS0NhbGVuZGFyQ2VsbEFsaWdubWVudC5Ub3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhckNlbGxBbGlnbm1lbnQuTGVmdDpcbiAgICAgICAgICAgICAgICBzdHlsZS5pb3MudGV4dEFsaWdubWVudCA9IFRLQ2FsZW5kYXJDZWxsQWxpZ25tZW50LkxlZnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhckNlbGxBbGlnbm1lbnQuUmlnaHQ6XG4gICAgICAgICAgICAgICAgc3R5bGUuaW9zLnRleHRBbGlnbm1lbnQgPSBUS0NhbGVuZGFyQ2VsbEFsaWdubWVudC5SaWdodDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyQ2VsbEFsaWdubWVudC5Ib3Jpem9udGFsQ2VudGVyOlxuICAgICAgICAgICAgICAgIHN0eWxlLmlvcy50ZXh0QWxpZ25tZW50ID0gVEtDYWxlbmRhckNlbGxBbGlnbm1lbnQuSG9yaXpvbnRhbENlbnRlcjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyQ2VsbEFsaWdubWVudC5WZXJ0aWNhbENlbnRlcjpcbiAgICAgICAgICAgICAgICBzdHlsZS5pb3MudGV4dEFsaWdubWVudCA9IFRLQ2FsZW5kYXJDZWxsQWxpZ25tZW50LlZlcnRpY2FsQ2VudGVyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldBUk5JTkc6IFVuc3VwcG9ydGVkIGNlbGwgYWxpZ25tZW50IHZhbHVlOiBcIiArIG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2VsbFBhZGRpbmdIb3Jpem9udGFsQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyLCBzdHlsZTogYW55KSB7XG4gICAgICAgIGxldCB2ZXJ0UGFkZGluZyA9ICghaXNOYU4oK3N0eWxlLmNlbGxQYWRkaW5nVmVydGljYWwpKSA/IHN0eWxlLmNlbGxQYWRkaW5nVmVydGljYWwgOiAwO1xuICAgICAgICBpZiAoIWlzTmFOKCtuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgIHN0eWxlLmlvcy50ZXh0SW5zZXRzID0gVUlFZGdlSW5zZXRzRnJvbVN0cmluZyhcIntcIiArIHZlcnRQYWRkaW5nICsgXCIsIFwiICsgbmV3VmFsdWUgKyBcIiwgXCIgKyB2ZXJ0UGFkZGluZyArIFwiLCBcIiArIG5ld1ZhbHVlICsgXCJ9XCIpO1xuXG4gICAgICAgICAgICAvLyBpbiBhbmRyb2lkIHlvdSBjYW5ub3Qgc2V0IGV2ZW50IHBhZGRpbmdzIGV4Y2x1c2l2ZWx5LCB0aGVyZSBpcyBvbmx5IGNlbGwgcGFkZGluZ3MuIFRoYXQncyB3aHkgd2UgYXBwbHkgdGhlIHBhZGRpbmdzIHRvIGFsbCBvZiB0aGUgY2VsbCBjb250ZW50LCBpbmNsdWRpbmcgZXZlbnRzXG4gICAgICAgICAgICBpZiAoc3R5bGUgaW5zdGFuY2VvZiBEYXlDZWxsU3R5bGUpIHtcbiAgICAgICAgICAgICAgICBzdHlsZS5pb3MuZXZlbnRJbnNldHMgPSBVSUVkZ2VJbnNldHNGcm9tU3RyaW5nKFwie1wiICsgdmVydFBhZGRpbmcgKyBcIiwgXCIgKyBuZXdWYWx1ZSArIFwiLCBcIiArIHZlcnRQYWRkaW5nICsgXCIsIFwiICsgbmV3VmFsdWUgKyBcIn1cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHlsZS5pb3MudGV4dEluc2V0cyA9IFVJRWRnZUluc2V0c0Zyb21TdHJpbmcoXCJ7XCIgKyB2ZXJ0UGFkZGluZyArIFwiLCBcIiArIDAgKyBcIiwgXCIgKyB2ZXJ0UGFkZGluZyArIFwiLCBcIiArIDAgKyBcIn1cIik7XG5cbiAgICAgICAgICAgIC8vIGluIGFuZHJvaWQgeW91IGNhbm5vdCBzZXQgZXZlbnQgcGFkZGluZ3MgZXhjbHVzaXZlbHksIHRoZXJlIGlzIG9ubHkgY2VsbCBwYWRkaW5ncy4gVGhhdCdzIHdoeSB3ZSBhcHBseSB0aGUgcGFkZGluZ3MgdG8gYWxsIG9mIHRoZSBjZWxsIGNvbnRlbnQsIGluY2x1ZGluZyBldmVudHNcbiAgICAgICAgICAgIGlmIChzdHlsZSBpbnN0YW5jZW9mIERheUNlbGxTdHlsZSkge1xuICAgICAgICAgICAgICAgIHN0eWxlLmlvcy5ldmVudEluc2V0cyA9IFVJRWRnZUluc2V0c0Zyb21TdHJpbmcoXCJ7XCIgKyB2ZXJ0UGFkZGluZyArIFwiLCBcIiArIDAgKyBcIiwgXCIgKyB2ZXJ0UGFkZGluZyArIFwiLCBcIiArIDAgKyBcIn1cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25DZWxsUGFkZGluZ1ZlcnRpY2FsQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyLCBzdHlsZTogYW55KSB7XG4gICAgICAgIGxldCBob3J6UGFkZGluZyA9ICghaXNOYU4oK3N0eWxlLmNlbGxQYWRkaW5nSG9yaXpvbnRhbCkpID8gc3R5bGUuY2VsbFBhZGRpbmdIb3Jpem9udGFsIDogMDtcbiAgICAgICAgaWYgKCFpc05hTigrbmV3VmFsdWUpKSB7XG4gICAgICAgICAgICBzdHlsZS5pb3MudGV4dEluc2V0cyA9IFVJRWRnZUluc2V0c0Zyb21TdHJpbmcoXCJ7XCIgKyBuZXdWYWx1ZSArIFwiLCBcIiArIGhvcnpQYWRkaW5nICsgXCIsIFwiICsgbmV3VmFsdWUgKyBcIiwgXCIgKyBob3J6UGFkZGluZyArIFwifVwiKTtcblxuICAgICAgICAgICAgLy8gaW4gYW5kcm9pZCB5b3UgY2Fubm90IHNldCBldmVudCBwYWRkaW5ncyBleGNsdXNpdmVseSwgdGhlcmUgaXMgb25seSBjZWxsIHBhZGRpbmdzLiBUaGF0J3Mgd2h5IHdlIGFwcGx5IHRoZSBwYWRkaW5ncyB0byBhbGwgb2YgdGhlIGNlbGwgY29udGVudCwgaW5jbHVkaW5nIGV2ZW50c1xuICAgICAgICAgICAgaWYgKHN0eWxlIGluc3RhbmNlb2YgRGF5Q2VsbFN0eWxlKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUuaW9zLmV2ZW50SW5zZXRzID0gVUlFZGdlSW5zZXRzRnJvbVN0cmluZyhcIntcIiArIG5ld1ZhbHVlICsgXCIsIFwiICsgaG9yelBhZGRpbmcgKyBcIiwgXCIgKyBuZXdWYWx1ZSArIFwiLCBcIiArIGhvcnpQYWRkaW5nICsgXCJ9XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3R5bGUuaW9zLnRleHRJbnNldHMgPSBVSUVkZ2VJbnNldHNGcm9tU3RyaW5nKFwie1wiICsgMCArIFwiLCBcIiArIGhvcnpQYWRkaW5nICsgXCIsIFwiICsgMCArIFwiLCBcIiArIGhvcnpQYWRkaW5nICsgXCJ9XCIpO1xuXG4gICAgICAgICAgICAvLyBpbiBhbmRyb2lkIHlvdSBjYW5ub3Qgc2V0IGV2ZW50IHBhZGRpbmdzIGV4Y2x1c2l2ZWx5LCB0aGVyZSBpcyBvbmx5IGNlbGwgcGFkZGluZ3MuIFRoYXQncyB3aHkgd2UgYXBwbHkgdGhlIHBhZGRpbmdzIHRvIGFsbCBvZiB0aGUgY2VsbCBjb250ZW50LCBpbmNsdWRpbmcgZXZlbnRzXG4gICAgICAgICAgICBpZiAoc3R5bGUgaW5zdGFuY2VvZiBEYXlDZWxsU3R5bGUpIHtcbiAgICAgICAgICAgICAgICBzdHlsZS5pb3MuZXZlbnRJbnNldHMgPSBVSUVkZ2VJbnNldHNGcm9tU3RyaW5nKFwie1wiICsgMCArIFwiLCBcIiArIGhvcnpQYWRkaW5nICsgXCIsIFwiICsgMCArIFwiLCBcIiArIGhvcnpQYWRkaW5nICsgXCJ9XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2VsbFRleHRDb2xvckNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IsIHN0eWxlOiBDZWxsU3R5bGUgfCBjb21tb25Nb2R1bGUuQ2VsbFN0eWxlKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgc3R5bGUuaW9zLnRleHRDb2xvciA9IG5ld1ZhbHVlLmlvcztcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgb25DZWxsVGV4dEZvbnROYW1lQ2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nLCBzdHlsZTogQ2VsbFN0eWxlIHwgY29tbW9uTW9kdWxlLkNlbGxTdHlsZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHN0eWxlLmlvcy50ZXh0Rm9udCA9IFRvb2xzLmNyZWF0ZUZvbnQobmV3VmFsdWUsIHN0eWxlLmNlbGxUZXh0Rm9udFN0eWxlLCBzdHlsZS5jZWxsVGV4dFNpemUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2VsbFRleHRGb250U3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJGb250U3R5bGUsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJGb250U3R5bGUsIHN0eWxlOiBDZWxsU3R5bGUgfCBjb21tb25Nb2R1bGUuQ2VsbFN0eWxlKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgc3R5bGUuaW9zLnRleHRGb250ID0gVG9vbHMuY3JlYXRlRm9udChzdHlsZS5jZWxsVGV4dEZvbnROYW1lLCBuZXdWYWx1ZSwgc3R5bGUuY2VsbFRleHRTaXplKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkNlbGxUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlciwgc3R5bGU6IENlbGxTdHlsZSB8IGNvbW1vbk1vZHVsZS5DZWxsU3R5bGUpIHtcbiAgICAgICAgaWYgKCFpc05hTigrbmV3VmFsdWUpKSB7XG4gICAgICAgICAgICBzdHlsZS5pb3MudGV4dEZvbnQgPSBUb29scy5jcmVhdGVGb250KHN0eWxlLmNlbGxUZXh0Rm9udE5hbWUsIHN0eWxlLmNlbGxUZXh0Rm9udFN0eWxlLCBuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGNsYXNzIENlbGxTdHlsZSBleHRlbmRzIGNvbW1vbk1vZHVsZS5DZWxsU3R5bGUge1xuXG4gICAgcHJpdmF0ZSBfaW5pdGlhbGl6ZXI6IENlbGxTdHlsZUluaXRpYWxpemVyO1xuICAgIGdldCBpbml0aWFsaXplcigpOiBDZWxsU3R5bGVJbml0aWFsaXplciB7XG4gICAgICAgIGlmICghdGhpcy5faW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVyID0gbmV3IENlbGxTdHlsZUluaXRpYWxpemVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRpYWxpemVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lvczogVEtDYWxlbmRhckNlbGxTdHlsZTtcbiAgICBnZXQgaW9zKCk6IFRLQ2FsZW5kYXJDZWxsU3R5bGUge1xuICAgICAgICByZXR1cm4gdGhpcy5faW9zO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9pb3MgPSBUS0NhbGVuZGFyQ2VsbFN0eWxlLmFsbG9jKCkuaW5pdCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkNlbGxCb3JkZXJXaWR0aENoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uQ2VsbEJvcmRlcldpZHRoQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUsIHRoaXMpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25DZWxsQm9yZGVyQ29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25DZWxsQm9yZGVyQ29sb3JDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkNlbGxCYWNrZ3JvdW5kQ29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25DZWxsQmFja2dyb3VuZENvbG9yQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUsIHRoaXMpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25DZWxsVGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uQ2VsbFRleHRDb2xvckNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uQ2VsbFRleHRGb250TmFtZUNoYW5nZWQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uQ2VsbFRleHRGb250TmFtZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uQ2VsbFRleHRGb250U3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJGb250U3R5bGUsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJGb250U3R5bGUpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vbkNlbGxUZXh0Rm9udFN0eWxlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUsIHRoaXMpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25DZWxsVGV4dFNpemVDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vbkNlbGxUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uQ2VsbFBhZGRpbmdIb3Jpem9udGFsQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25DZWxsUGFkZGluZ0hvcml6b250YWxDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkNlbGxQYWRkaW5nVmVydGljYWxDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vbkNlbGxQYWRkaW5nVmVydGljYWxDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkNlbGxBbGlnbm1lbnRDaGFuZ2VkKG9sZFZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJDZWxsQWxpZ25tZW50LCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyQ2VsbEFsaWdubWVudCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uQ2VsbEFsaWdubWVudENoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGNsYXNzIERheUV2ZW50c1ZpZXdTdHlsZSBleHRlbmRzIGNvbW1vbk1vZHVsZS5EYXlFdmVudHNWaWV3U3R5bGUge1xuICAgIHByaXZhdGUgX293bmVyOiBSYWRDYWxlbmRhcjtcbiAgICBzZXQgb3duZXIodmFsdWU6IFJhZENhbGVuZGFyKSB7XG4gICAgICAgIHRoaXMuX293bmVyID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlUHJlc2VudGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZU5hdGl2ZVByZXNlbnRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX293bmVyICYmICh0aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIgaW5zdGFuY2VvZiBUS0NhbGVuZGFyRGF5Vmlld1ByZXNlbnRlcikpIHtcbiAgICAgICAgICAgIGxldCBkYXlQcmVzZW50ZXIgPSA8VEtDYWxlbmRhckRheVZpZXdQcmVzZW50ZXI+dGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyO1xuICAgICAgICAgICAgaWYgKHRoaXMuYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICAgICAgICAgICAgZGF5UHJlc2VudGVyLmRheVZpZXcuZXZlbnRzVmlldy5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmJhY2tncm91bmRDb2xvci5pb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy50aW1lTGFiZWxGb3JtYXQpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZUZvcm1hdHRlciA9IE5TRGF0ZUZvcm1hdHRlci5hbGxvYygpLmluaXQoKTtcbiAgICAgICAgICAgICAgICBkYXRlRm9ybWF0dGVyLmRhdGVGb3JtYXQgPSB0aGlzLnRpbWVMYWJlbEZvcm1hdDtcbiAgICAgICAgICAgICAgICBkYXlQcmVzZW50ZXIuZGF5Vmlldy5ldmVudHNWaWV3LnN0eWxlLmxhYmVsRm9ybWF0dGVyID0gZGF0ZUZvcm1hdHRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVMYWJlbFRleHRDb2xvcikge1xuICAgICAgICAgICAgICAgIGRheVByZXNlbnRlci5kYXlWaWV3LmV2ZW50c1ZpZXcuc3R5bGUubGFiZWxUZXh0Q29sb3IgPSB0aGlzLnRpbWVMYWJlbFRleHRDb2xvci5pb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy50aW1lTGFiZWxUZXh0U2l6ZSkge1xuICAgICAgICAgICAgICAgIGRheVByZXNlbnRlci5kYXlWaWV3LmV2ZW50c1ZpZXcuc3R5bGUubGFiZWxUZXh0U2l6ZSA9IHRoaXMudGltZUxhYmVsVGV4dFNpemU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXlQcmVzZW50ZXIuZGF5Vmlldy5ldmVudHNWaWV3LnVwZGF0ZUxheW91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQmFja2dyb3VuZENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICBpZiAobmV3VmFsdWUgJiYgdGhpcy5fb3duZXIgJiYgKHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlciBpbnN0YW5jZW9mIFRLQ2FsZW5kYXJEYXlWaWV3UHJlc2VudGVyKSkge1xuICAgICAgICAgICAgKDxUS0NhbGVuZGFyRGF5Vmlld1ByZXNlbnRlcj50aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIpLmRheVZpZXcuZXZlbnRzVmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBuZXdWYWx1ZS5pb3M7XG4gICAgICAgICAgICAoPFRLQ2FsZW5kYXJEYXlWaWV3UHJlc2VudGVyPnRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlcikuZGF5Vmlldy5ldmVudHNWaWV3LnVwZGF0ZUxheW91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVGltZUxhYmVsVGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICBpZiAobmV3VmFsdWUgJiYgdGhpcy5fb3duZXIgJiYgKHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlciBpbnN0YW5jZW9mIFRLQ2FsZW5kYXJEYXlWaWV3UHJlc2VudGVyKSkge1xuICAgICAgICAgICAgKDxUS0NhbGVuZGFyRGF5Vmlld1ByZXNlbnRlcj50aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIpLmRheVZpZXcuZXZlbnRzVmlldy5zdHlsZS5sYWJlbFRleHRDb2xvciA9IG5ld1ZhbHVlLmlvcztcbiAgICAgICAgICAgICg8VEtDYWxlbmRhckRheVZpZXdQcmVzZW50ZXI+dGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyKS5kYXlWaWV3LmV2ZW50c1ZpZXcudXBkYXRlTGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UaW1lTGFiZWxUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAobmV3VmFsdWUgJiYgdGhpcy5fb3duZXIgJiYgKHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlciBpbnN0YW5jZW9mIFRLQ2FsZW5kYXJEYXlWaWV3UHJlc2VudGVyKSkge1xuICAgICAgICAgICAgKDxUS0NhbGVuZGFyRGF5Vmlld1ByZXNlbnRlcj50aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIpLmRheVZpZXcuZXZlbnRzVmlldy5zdHlsZS5sYWJlbFRleHRTaXplID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAoPFRLQ2FsZW5kYXJEYXlWaWV3UHJlc2VudGVyPnRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlcikuZGF5Vmlldy5ldmVudHNWaWV3LnVwZGF0ZUxheW91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVGltZUxhYmVsRm9ybWF0Q2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAmJiB0aGlzLl9vd25lciAmJiAodGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyIGluc3RhbmNlb2YgVEtDYWxlbmRhckRheVZpZXdQcmVzZW50ZXIpKSB7XG4gICAgICAgICAgICBsZXQgZGF0ZUZvcm1hdHRlciA9IE5TRGF0ZUZvcm1hdHRlci5hbGxvYygpLmluaXQoKTtcbiAgICAgICAgICAgIGRhdGVGb3JtYXR0ZXIuZGF0ZUZvcm1hdCA9IHRoaXMudGltZUxhYmVsRm9ybWF0O1xuICAgICAgICAgICAgKDxUS0NhbGVuZGFyRGF5Vmlld1ByZXNlbnRlcj50aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIpLmRheVZpZXcuZXZlbnRzVmlldy5zdHlsZS5sYWJlbEZvcm1hdHRlciA9IGRhdGVGb3JtYXR0ZXI7XG4gICAgICAgICAgICAoPFRLQ2FsZW5kYXJEYXlWaWV3UHJlc2VudGVyPnRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlcikuZGF5Vmlldy5ldmVudHNWaWV3LnVwZGF0ZUxheW91dCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjbGFzcyBBbGxEYXlFdmVudHNWaWV3U3R5bGUgZXh0ZW5kcyBjb21tb25Nb2R1bGUuQWxsRGF5RXZlbnRzVmlld1N0eWxlIHtcbiAgICBwcml2YXRlIF9vd25lcjogUmFkQ2FsZW5kYXI7XG4gICAgc2V0IG93bmVyKHZhbHVlOiBSYWRDYWxlbmRhcikge1xuICAgICAgICB0aGlzLl9vd25lciA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZVByZXNlbnRlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVOYXRpdmVQcmVzZW50ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9vd25lciAmJiAodGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyIGluc3RhbmNlb2YgVEtDYWxlbmRhckRheVZpZXdQcmVzZW50ZXIpKSB7XG4gICAgICAgICAgICBsZXQgZGF5UHJlc2VudGVyID0gPFRLQ2FsZW5kYXJEYXlWaWV3UHJlc2VudGVyPnRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlcjtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICAgICAgICAgICAgZGF5UHJlc2VudGVyLmRheVZpZXcuYWxsRGF5RXZlbnRzVmlldy5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmJhY2tncm91bmRDb2xvci5pb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hbGxEYXlUZXh0ICE9PSBBbGxEYXlFdmVudHNWaWV3U3R5bGUuQUxMX0RBWV9URVhUKSB7XG4gICAgICAgICAgICAgICAgZGF5UHJlc2VudGVyLmRheVZpZXcuYWxsRGF5RXZlbnRzVmlldy5sYWJlbFZpZXcudGV4dCA9IHRoaXMuYWxsRGF5VGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmFsbERheVRleHRJc1Zpc2libGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGRheVByZXNlbnRlci5kYXlWaWV3LmFsbERheUV2ZW50c1ZpZXcuc3R5bGUubGFiZWxXaWR0aCA9IHRoaXMuYWxsRGF5VGV4dElzVmlzaWJsZSA/IDYwIDogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRheVByZXNlbnRlci5kYXlWaWV3LmFsbERheUV2ZW50c1ZpZXcudXBkYXRlTGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25CYWNrZ3JvdW5kQ29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAmJiB0aGlzLl9vd25lciAmJiAodGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyIGluc3RhbmNlb2YgVEtDYWxlbmRhckRheVZpZXdQcmVzZW50ZXIpKSB7XG4gICAgICAgICAgICAoPFRLQ2FsZW5kYXJEYXlWaWV3UHJlc2VudGVyPnRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlcikuZGF5Vmlldy5hbGxEYXlFdmVudHNWaWV3LmJhY2tncm91bmRDb2xvciA9IG5ld1ZhbHVlLmlvcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkFsbERheVRleHRDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICYmIHRoaXMuX293bmVyICYmICh0aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIgaW5zdGFuY2VvZiBUS0NhbGVuZGFyRGF5Vmlld1ByZXNlbnRlcikpIHtcbiAgICAgICAgICAgICg8VEtDYWxlbmRhckRheVZpZXdQcmVzZW50ZXI+dGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyKS5kYXlWaWV3LmFsbERheUV2ZW50c1ZpZXcubGFiZWxWaWV3LnRleHQgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkFsbERheVRleHRJc1Zpc2libGVDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAobmV3VmFsdWUgJiYgdGhpcy5fb3duZXIgJiYgKHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlciBpbnN0YW5jZW9mIFRLQ2FsZW5kYXJEYXlWaWV3UHJlc2VudGVyKSkge1xuICAgICAgICAgICAgKDxUS0NhbGVuZGFyRGF5Vmlld1ByZXNlbnRlcj50aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIpLmRheVZpZXcuYWxsRGF5RXZlbnRzVmlldy5zdHlsZS5sYWJlbFdpZHRoID0gdGhpcy5hbGxEYXlUZXh0SXNWaXNpYmxlID8gNjAgOiAwO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjbGFzcyBEYXlDZWxsU3R5bGUgZXh0ZW5kcyBjb21tb25Nb2R1bGUuRGF5Q2VsbFN0eWxlIHtcblxuICAgIHByaXZhdGUgX2luaXRpYWxpemVyOiBDZWxsU3R5bGVJbml0aWFsaXplcjtcbiAgICBnZXQgaW5pdGlhbGl6ZXIoKTogQ2VsbFN0eWxlSW5pdGlhbGl6ZXIge1xuICAgICAgICBpZiAoIXRoaXMuX2luaXRpYWxpemVyKSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsaXplciA9IG5ldyBDZWxsU3R5bGVJbml0aWFsaXplcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0aWFsaXplcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pb3M6IFRLQ2FsZW5kYXJEYXlDZWxsU3R5bGU7XG4gICAgZ2V0IGlvcygpOiBUS0NhbGVuZGFyRGF5Q2VsbFN0eWxlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lvcztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5faW9zID0gVEtDYWxlbmRhckRheUNlbGxTdHlsZS5hbGxvYygpLmluaXQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25DZWxsQm9yZGVyV2lkdGhDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vbkNlbGxCb3JkZXJXaWR0aENoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uQ2VsbEJvcmRlckNvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uQ2VsbEJvcmRlckNvbG9yQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUsIHRoaXMpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25DZWxsQmFja2dyb3VuZENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uQ2VsbEJhY2tncm91bmRDb2xvckNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uQ2VsbFRleHRDb2xvckNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vbkNlbGxUZXh0Q29sb3JDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkNlbGxUZXh0Rm9udE5hbWVDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vbkNlbGxUZXh0Rm9udE5hbWVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkNlbGxUZXh0Rm9udFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25DZWxsVGV4dEZvbnRTdHlsZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uQ2VsbFRleHRTaXplQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25DZWxsVGV4dFNpemVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkNlbGxQYWRkaW5nSG9yaXpvbnRhbENoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uQ2VsbFBhZGRpbmdIb3Jpem9udGFsQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUsIHRoaXMpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25DZWxsUGFkZGluZ1ZlcnRpY2FsQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25DZWxsUGFkZGluZ1ZlcnRpY2FsQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUsIHRoaXMpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25DZWxsQWxpZ25tZW50Q2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyQ2VsbEFsaWdubWVudCwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckNlbGxBbGlnbm1lbnQpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vbkNlbGxBbGlnbm1lbnRDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLy8gZGF5IGNlbGwgc3BlY2lmaWMgcHJvcGVydGllc1xuICAgIHByb3RlY3RlZCBvblNob3dFdmVudHNUZXh0Q2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pb3MuZGlzcGxheUV2ZW50c0FzVGV4dCA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25FdmVudFRleHRDb2xvckNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmlvcy5ldmVudFRleHRDb2xvciA9IG5ld1ZhbHVlLmlvcztcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25FdmVudEZvbnROYW1lQ2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5pb3MuZXZlbnRGb250ID0gVG9vbHMuY3JlYXRlRm9udChuZXdWYWx1ZSwgdGhpcy5ldmVudEZvbnRTdHlsZSwgdGhpcy5ldmVudFRleHRTaXplKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25FdmVudEZvbnRTdHlsZUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckZvbnRTdHlsZSwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckZvbnRTdHlsZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuaW9zLmV2ZW50Rm9udCA9IFRvb2xzLmNyZWF0ZUZvbnQodGhpcy5ldmVudEZvbnROYW1lLCBuZXdWYWx1ZSwgdGhpcy5ldmVudFRleHRTaXplKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25FdmVudFRleHRTaXplQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICghaXNOYU4oK25ld1ZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5pb3MuZXZlbnRGb250ID0gVG9vbHMuY3JlYXRlRm9udCh0aGlzLmV2ZW50Rm9udE5hbWUsIHRoaXMuZXZlbnRGb250U3R5bGUsIG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBDZWxsIHN0eWxlIGNsYXNzIGZvciBtb250aHMgaW4geWVhciB2aWV3IG1vZGVcbiAqL1xuZXhwb3J0IGNsYXNzIE1vbnRoQ2VsbFN0eWxlIGV4dGVuZHMgY29tbW9uTW9kdWxlLk1vbnRoQ2VsbFN0eWxlIHtcblxuICAgIHByb3RlY3RlZCBfb3duZXI6IFJhZENhbGVuZGFyO1xuICAgIHB1YmxpYyBzZXQgb3duZXIodmFsdWU6IFJhZENhbGVuZGFyKSB7XG4gICAgICAgIHRoaXMuX293bmVyID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlUHJlc2VudGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZU5hdGl2ZVByZXNlbnRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX293bmVyICYmICh0aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIgaW5zdGFuY2VvZiBUS0NhbGVuZGFyWWVhclByZXNlbnRlcikpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZGF5VGV4dENvbG9yKSB0aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIuc3R5bGUuZGF5VGV4dENvbG9yID0gdGhpcy5kYXlUZXh0Q29sb3IuaW9zO1xuICAgICAgICAgICAgaWYgKHRoaXMud2Vla2VuZFRleHRDb2xvcikgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyLnN0eWxlLndlZWtlbmRUZXh0Q29sb3IgPSB0aGlzLndlZWtlbmRUZXh0Q29sb3IuaW9zO1xuICAgICAgICAgICAgaWYgKHRoaXMudG9kYXlUZXh0Q29sb3IpIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlci5zdHlsZS50b2RheVRleHRDb2xvciA9IHRoaXMudG9kYXlUZXh0Q29sb3IuaW9zO1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF5TmFtZVRleHRDb2xvcikgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyLnN0eWxlLmRheU5hbWVUZXh0Q29sb3IgPSB0aGlzLmRheU5hbWVUZXh0Q29sb3IuaW9zO1xuICAgICAgICAgICAgaWYgKHRoaXMubW9udGhOYW1lVGV4dENvbG9yKSB0aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIuc3R5bGUubW9udGhOYW1lVGV4dENvbG9yID0gdGhpcy5tb250aE5hbWVUZXh0Q29sb3IuaW9zO1xuXG4gICAgICAgICAgICB0aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIuc3R5bGUuZGF5Rm9udCA9IFRvb2xzLmNyZWF0ZUZvbnQodGhpcy5kYXlGb250TmFtZSwgdGhpcy5kYXlGb250U3R5bGUsIHRoaXMuZGF5VGV4dFNpemUpO1xuICAgICAgICAgICAgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyLnN0eWxlLmRheU5hbWVGb250ID0gVG9vbHMuY3JlYXRlRm9udCh0aGlzLmRheU5hbWVGb250TmFtZSwgdGhpcy5kYXlOYW1lRm9udFN0eWxlLCB0aGlzLmRheU5hbWVUZXh0U2l6ZSk7XG4gICAgICAgICAgICB0aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIuc3R5bGUubW9udGhOYW1lRm9udCA9IFRvb2xzLmNyZWF0ZUZvbnQodGhpcy5tb250aE5hbWVGb250TmFtZSwgdGhpcy5tb250aE5hbWVGb250U3R5bGUsIHRoaXMubW9udGhOYW1lVGV4dFNpemUpO1xuXG4gICAgICAgICAgICAvLyBub3RlOiBzaW5jZSBhbmRyb2lkIGNhbGVuZGFyIGluIHllYXIgdmlldyBkb2Vzbid0IHN1cHBvcnQgc2hhcGUgY29sb3IsIHdlIGRpc2FibGUgaXQgZm9yIGlvcyB0b29cbiAgICAgICAgICAgIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlci5zdHlsZS50b2RheVNoYXBlRmlsbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25XZWVrZW5kVGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICBpZiAobmV3VmFsdWUgJiYgdGhpcy5fb3duZXIpIHtcbiAgICAgICAgICAgICg8VEtDYWxlbmRhclllYXJQcmVzZW50ZXI+dGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyKS5zdHlsZS53ZWVrZW5kVGV4dENvbG9yID0gbmV3VmFsdWUuaW9zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVG9kYXlUZXh0Q29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAmJiB0aGlzLl9vd25lcikge1xuICAgICAgICAgICAgKDxUS0NhbGVuZGFyWWVhclByZXNlbnRlcj50aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIpLnN0eWxlLnRvZGF5VGV4dENvbG9yID0gbmV3VmFsdWUuaW9zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRGF5VGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICBpZiAobmV3VmFsdWUgJiYgdGhpcy5fb3duZXIpIHtcbiAgICAgICAgICAgICg8VEtDYWxlbmRhclllYXJQcmVzZW50ZXI+dGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyKS5zdHlsZS5kYXlUZXh0Q29sb3IgPSBuZXdWYWx1ZS5pb3M7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EYXlGb250TmFtZUNoYW5nZWQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5fb3duZXIgJiYgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgICg8VEtDYWxlbmRhclllYXJQcmVzZW50ZXI+dGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyKS5zdHlsZS5kYXlGb250ID0gVG9vbHMuY3JlYXRlRm9udChuZXdWYWx1ZSwgdGhpcy5kYXlGb250U3R5bGUsIHRoaXMuZGF5VGV4dFNpemUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRGF5Rm9udFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlKSB7XG4gICAgICAgIGlmICh0aGlzLl9vd25lciAmJiBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgKDxUS0NhbGVuZGFyWWVhclByZXNlbnRlcj50aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIpLnN0eWxlLmRheUZvbnQgPSBUb29scy5jcmVhdGVGb250KHRoaXMuZGF5Rm9udE5hbWUsIG5ld1ZhbHVlLCB0aGlzLmRheVRleHRTaXplKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRheVRleHRTaXplQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLl9vd25lciAmJiAhaXNOYU4oK25ld1ZhbHVlKSkge1xuICAgICAgICAgICAgKDxUS0NhbGVuZGFyWWVhclByZXNlbnRlcj50aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIpLnN0eWxlLmRheUZvbnQgPSBUb29scy5jcmVhdGVGb250KHRoaXMuZGF5Rm9udE5hbWUsIHRoaXMuZGF5Rm9udFN0eWxlLCBuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EYXlOYW1lVGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICBpZiAobmV3VmFsdWUgJiYgdGhpcy5fb3duZXIpIHtcbiAgICAgICAgICAgICg8VEtDYWxlbmRhclllYXJQcmVzZW50ZXI+dGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyKS5zdHlsZS5kYXlOYW1lVGV4dENvbG9yID0gbmV3VmFsdWUuaW9zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRGF5TmFtZUZvbnROYW1lQ2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLl9vd25lciAmJiBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgKDxUS0NhbGVuZGFyWWVhclByZXNlbnRlcj50aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIpLnN0eWxlLmRheU5hbWVGb250ID0gVG9vbHMuY3JlYXRlRm9udChuZXdWYWx1ZSwgdGhpcy5kYXlOYW1lRm9udFN0eWxlLCB0aGlzLmRheU5hbWVUZXh0U2l6ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EYXlOYW1lRm9udFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlKSB7XG4gICAgICAgIGlmICh0aGlzLl9vd25lciAmJiBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgKDxUS0NhbGVuZGFyWWVhclByZXNlbnRlcj50aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIpLnN0eWxlLmRheU5hbWVGb250ID0gVG9vbHMuY3JlYXRlRm9udCh0aGlzLmRheU5hbWVGb250TmFtZSwgbmV3VmFsdWUsIHRoaXMuZGF5TmFtZVRleHRTaXplKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25EYXlOYW1lVGV4dFNpemVDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX293bmVyICYmICFpc05hTigrbmV3VmFsdWUpKSB7XG4gICAgICAgICAgICAoPFRLQ2FsZW5kYXJZZWFyUHJlc2VudGVyPnRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlcikuc3R5bGUuZGF5TmFtZUZvbnQgPSBUb29scy5jcmVhdGVGb250KHRoaXMuZGF5TmFtZUZvbnROYW1lLCB0aGlzLmRheU5hbWVGb250U3R5bGUsIG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbk1vbnRoTmFtZVRleHRDb2xvckNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICYmIHRoaXMuX293bmVyKSB7XG4gICAgICAgICAgICAoPFRLQ2FsZW5kYXJZZWFyUHJlc2VudGVyPnRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlcikuc3R5bGUubW9udGhOYW1lVGV4dENvbG9yID0gbmV3VmFsdWUuaW9zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTW9udGhOYW1lRm9udE5hbWVDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuX293bmVyICYmIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAoPFRLQ2FsZW5kYXJZZWFyUHJlc2VudGVyPnRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlcikuc3R5bGUubW9udGhOYW1lRm9udCA9IFRvb2xzLmNyZWF0ZUZvbnQobmV3VmFsdWUsIHRoaXMubW9udGhOYW1lRm9udFN0eWxlLCB0aGlzLm1vbnRoTmFtZVRleHRTaXplKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbk1vbnRoTmFtZUZvbnRTdHlsZUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckZvbnRTdHlsZSwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckZvbnRTdHlsZSkge1xuICAgICAgICBpZiAodGhpcy5fb3duZXIgJiYgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgICg8VEtDYWxlbmRhclllYXJQcmVzZW50ZXI+dGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyKS5zdHlsZS5tb250aE5hbWVGb250ID0gVG9vbHMuY3JlYXRlRm9udCh0aGlzLm1vbnRoTmFtZUZvbnROYW1lLCBuZXdWYWx1ZSwgdGhpcy5tb250aE5hbWVUZXh0U2l6ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Nb250aE5hbWVUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5fb3duZXIgJiYgIWlzTmFOKCtuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgICg8VEtDYWxlbmRhclllYXJQcmVzZW50ZXI+dGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyKS5zdHlsZS5tb250aE5hbWVGb250ID0gVG9vbHMuY3JlYXRlRm9udCh0aGlzLm1vbnRoTmFtZUZvbnROYW1lLCB0aGlzLm1vbnRoTmFtZUZvbnRTdHlsZSwgbmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIENlbGwgc3R5bGUgY2xhc3MgZm9yIGlubGluZSBldmVudHMgY2VsbHMgaW4gbW9udGggdmlld1xuICogcHJvcGVydHkgdmFsdWVzIGFyZSB1c2VkIGJ5IFRLQ2FsZW5kYXJNb250aFByZXNlbnRlckRlbGVnYXRlSW1wbGVtZW50YXRpb24gZGVsZWdhdGUgdGhhdCdzIHdoeSB3ZSBkb24ndCBuZWVkIGV4dHJhIGFjdGlvbnMgZm9yIHVwZGF0ZVxuICovXG5leHBvcnQgY2xhc3MgSW5saW5lRXZlbnRDZWxsU3R5bGUgZXh0ZW5kcyBjb21tb25Nb2R1bGUuSW5saW5lRXZlbnRDZWxsU3R5bGUge1xuXG4gICAgcHJvdGVjdGVkIG9uQ2VsbEJhY2tncm91bmRDb2xvckNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHsgfVxuXG4gICAgcHJvdGVjdGVkIG9uRXZlbnRUZXh0Q29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7IH1cbiAgICBwcm90ZWN0ZWQgb25FdmVudEZvbnROYW1lQ2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7IH1cbiAgICBwcm90ZWN0ZWQgb25FdmVudEZvbnRTdHlsZUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckZvbnRTdHlsZSwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckZvbnRTdHlsZSkgeyB9XG4gICAgcHJvdGVjdGVkIG9uRXZlbnRUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikgeyB9XG5cbiAgICBwcm90ZWN0ZWQgb25UaW1lVGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikgeyB9XG4gICAgcHJvdGVjdGVkIG9uVGltZUZvbnROYW1lQ2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7IH1cbiAgICBwcm90ZWN0ZWQgb25UaW1lRm9udFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlKSB7IH1cbiAgICBwcm90ZWN0ZWQgb25UaW1lVGV4dFNpemVDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHsgfVxuXG59XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTVFlMRVMgRk9SIERJRkZFUkVOVCBWSUVXIE1PREVTXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLyoqXG4gKiBDbGFzcyBmb3IgbW9udGggdmlldyBzdHlsZVxuICovXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb250aFZpZXdTdHlsZSBleHRlbmRzIGNvbW1vbk1vZHVsZS5DYWxlbmRhck1vbnRoVmlld1N0eWxlIHtcblxuICAgIHByb3RlY3RlZCBfb3duZXI6IFJhZENhbGVuZGFyO1xuICAgIHB1YmxpYyBzZXQgb3duZXIodmFsdWU6IFJhZENhbGVuZGFyKSB7XG4gICAgICAgIHRoaXMuX293bmVyID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlT3duZXIoKTtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkRGF5Q2VsbFN0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF5Q2VsbFN0eWxlID0gbmV3IERheUNlbGxTdHlsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVZpZXdTdHlsZXMoZm9yY2VVcGRhdGU/OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlT3duZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlTmF0aXZlT3duZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9vd25lciAmJiB0aGlzLl9vd25lci5fbmF0aXZlVmlldyAmJiAodGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyIGluc3RhbmNlb2YgVEtDYWxlbmRhck1vbnRoUHJlc2VudGVyKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1dlZWtOdW1iZXJzICE9PSB1bmRlZmluZWQpIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlci53ZWVrTnVtYmVyc0hpZGRlbiA9ICF0aGlzLnNob3dXZWVrTnVtYmVycztcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3dUaXRsZSAhPT0gdW5kZWZpbmVkKSB0aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIudGl0bGVIaWRkZW4gPSAhdGhpcy5zaG93VGl0bGU7XG4gICAgICAgICAgICBpZiAodGhpcy5zaG93RGF5TmFtZXMgIT09IHVuZGVmaW5lZCkgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyLmRheU5hbWVzSGlkZGVuID0gIXRoaXMuc2hvd0RheU5hbWVzO1xuICAgICAgICAgICAgaWYgKHRoaXMuYmFja2dyb3VuZENvbG9yKSB0aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3IuaW9zO1xuICAgICAgICAgICAgdGhpcy5fb3duZXIudXBkYXRlQ2FsZW5kYXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVPd25lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX293bmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9vd25lci51cGRhdGVDYWxlbmRhcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2VsZWN0aW9uU2hhcGVDaGFuZ2VkKG9sZFZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJTZWxlY3Rpb25TaGFwZSwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhclNlbGVjdGlvblNoYXBlKSB7XG4gICAgICAgIHN1cGVyLm9uU2VsZWN0aW9uU2hhcGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlT3duZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TZWxlY3Rpb25TaGFwZVNpemVDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIub25TZWxlY3Rpb25TaGFwZVNpemVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlT3duZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TZWxlY3Rpb25TaGFwZUNvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICBzdXBlci5vblNlbGVjdGlvblNoYXBlQ29sb3JDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlT3duZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TaG93V2Vla051bWJlcnNDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5fb3duZXIgJiYgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcpIHtcbiAgICAgICAgICAgICg8VEtDYWxlbmRhck1vbnRoUHJlc2VudGVyPnRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlcikud2Vla051bWJlcnNIaWRkZW4gPSAhbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVPd25lcigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblNob3dUaXRsZUNoYW5nZWQob2xkVmFsdWU6IGJvb2xlYW4sIG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLl9vd25lciAmJiB0aGlzLl9vd25lci5fbmF0aXZlVmlldykge1xuICAgICAgICAgICAgKDxUS0NhbGVuZGFyTW9udGhQcmVzZW50ZXI+dGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyKS50aXRsZUhpZGRlbiA9ICFuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZU93bmVyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2hvd0RheU5hbWVzQ2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuX293bmVyICYmIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3KSB7XG4gICAgICAgICAgICAoPFRLQ2FsZW5kYXJNb250aFByZXNlbnRlcj50aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIpLmRheU5hbWVzSGlkZGVuID0gIW5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlT3duZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25CYWNrZ3JvdW5kQ29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAmJiB0aGlzLl9vd25lciAmJiB0aGlzLl9vd25lci5fbmF0aXZlVmlldykge1xuICAgICAgICAgICAgKDxUS0NhbGVuZGFyTW9udGhQcmVzZW50ZXI+dGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBuZXdWYWx1ZS5pb3M7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVPd25lcigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRheUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWU6IERheUNlbGxTdHlsZSwgbmV3VmFsdWU6IERheUNlbGxTdHlsZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZU93bmVyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2VsZWN0ZWREYXlDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBEYXlDZWxsU3R5bGUsIG5ld1ZhbHVlOiBEYXlDZWxsU3R5bGUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVPd25lcigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRvZGF5Q2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogRGF5Q2VsbFN0eWxlLCBuZXdWYWx1ZTogRGF5Q2VsbFN0eWxlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlT3duZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25XZWVrTnVtYmVyQ2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2VsbFN0eWxlLCBuZXdWYWx1ZTogQ2VsbFN0eWxlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlT3duZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25XZWVrZW5kQ2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2VsbFN0eWxlLCBuZXdWYWx1ZTogQ2VsbFN0eWxlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlT3duZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EYXlOYW1lQ2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2VsbFN0eWxlLCBuZXdWYWx1ZTogQ2VsbFN0eWxlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlT3duZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UaXRsZUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWU6IENlbGxTdHlsZSwgbmV3VmFsdWU6IENlbGxTdHlsZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZU93bmVyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uSW5saW5lRXZlbnRDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBJbmxpbmVFdmVudENlbGxTdHlsZSwgbmV3VmFsdWU6IElubGluZUV2ZW50Q2VsbFN0eWxlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlT3duZXIoKTtcbiAgICB9XG59XG5cbi8qKlxuICogVGhlIHN0eWxlIGNsYXNzIGZvciB3ZWVrIG1vZGUuXG4gKiBOT1RFOiB3ZSBzaG91bGQgY29uc2lkZXIgaWYgd2UgbmVlZCBhbiBleHBsaWNpdCBjbGFzcyB0aGF0IGlzIHRoZSBzYW1lIGFzIHRoZSBiYXNlIG9uZVxuICovXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJXZWVrVmlld1N0eWxlIGV4dGVuZHMgQ2FsZW5kYXJNb250aFZpZXdTdHlsZSB7XG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZU93bmVyKCkge1xuICAgICAgICBpZiAodGhpcy5fb3duZXIgJiYgKHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlciBpbnN0YW5jZW9mIFRLQ2FsZW5kYXJXZWVrUHJlc2VudGVyKSkge1xuICAgICAgICAgICAgc3VwZXIudXBkYXRlTmF0aXZlT3duZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBUaGUgc3R5bGUgY2xhc3MgZm9yIGRheSBtb2RlLlxuICovXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJEYXlWaWV3U3R5bGUgZXh0ZW5kcyBjb21tb25Nb2R1bGUuQ2FsZW5kYXJEYXlWaWV3U3R5bGUge1xuXG4gICAgcHJvdGVjdGVkIF9vd25lcjogUmFkQ2FsZW5kYXI7XG4gICAgcHVibGljIHNldCBvd25lcih2YWx1ZTogUmFkQ2FsZW5kYXIpIHtcbiAgICAgICAgdGhpcy5fb3duZXIgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuZGF5RXZlbnRzVmlld1N0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLmRheUV2ZW50c1ZpZXdTdHlsZS5vd25lciA9IHRoaXMuX293bmVyO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmFsbERheUV2ZW50c1ZpZXdTdHlsZSkge1xuICAgICAgICAgICAgdGhpcy5hbGxEYXlFdmVudHNWaWV3U3R5bGUub3duZXIgPSB0aGlzLl9vd25lcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZU93bmVyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZU93bmVyKCkge1xuICAgICAgICBpZiAodGhpcy5fb3duZXIgJiYgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcgJiYgKHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlciBpbnN0YW5jZW9mIFRLQ2FsZW5kYXJEYXlWaWV3UHJlc2VudGVyKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1dlZWtOdW1iZXJzICE9PSB1bmRlZmluZWQpIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlci53ZWVrTnVtYmVyc0hpZGRlbiA9ICF0aGlzLnNob3dXZWVrTnVtYmVycztcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3dUaXRsZSAhPT0gdW5kZWZpbmVkKSB0aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIudGl0bGVIaWRkZW4gPSAhdGhpcy5zaG93VGl0bGU7XG4gICAgICAgICAgICBpZiAodGhpcy5zaG93RGF5TmFtZXMgIT09IHVuZGVmaW5lZCkgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyLmRheU5hbWVzSGlkZGVuID0gIXRoaXMuc2hvd0RheU5hbWVzO1xuICAgICAgICAgICAgaWYgKHRoaXMuYmFja2dyb3VuZENvbG9yKSB0aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3IuaW9zO1xuICAgICAgICAgICAgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyLndlZWtIaWRkZW4gPSAhdGhpcy5zaG93V2VlaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZU93bmVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVZpZXdTdHlsZXMoZm9yY2VVcGRhdGU/OiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLmRheUV2ZW50c1ZpZXdTdHlsZSkge1xuICAgICAgICAgICAgdGhpcy5kYXlFdmVudHNWaWV3U3R5bGVbJ3VwZGF0ZU5hdGl2ZVByZXNlbnRlciddKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYWxsRGF5RXZlbnRzVmlld1N0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLmFsbERheUV2ZW50c1ZpZXdTdHlsZVsndXBkYXRlTmF0aXZlUHJlc2VudGVyJ10oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlT3duZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlT3duZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9vd25lcikge1xuICAgICAgICAgICAgdGhpcy5fb3duZXIudXBkYXRlQ2FsZW5kYXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblNob3dXZWVrTnVtYmVyc0NoYW5nZWQob2xkVmFsdWU6IGJvb2xlYW4sIG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLl9vd25lciAmJiB0aGlzLl9vd25lci5fbmF0aXZlVmlldyAmJiB0aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIgaW5zdGFuY2VvZiBUS0NhbGVuZGFyRGF5Vmlld1ByZXNlbnRlcikge1xuICAgICAgICAgICAgKDxUS0NhbGVuZGFyRGF5Vmlld1ByZXNlbnRlcj50aGlzLl9vd25lci5fbmF0aXZlVmlldy5wcmVzZW50ZXIpLndlZWtOdW1iZXJzSGlkZGVuID0gIW5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlT3duZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TaG93VGl0bGVDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5fb3duZXIgJiYgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcgJiYgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyIGluc3RhbmNlb2YgVEtDYWxlbmRhckRheVZpZXdQcmVzZW50ZXIpIHtcbiAgICAgICAgICAgICg8VEtDYWxlbmRhckRheVZpZXdQcmVzZW50ZXI+dGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucHJlc2VudGVyKS50aXRsZUhpZGRlbiA9ICFuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZU93bmVyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2hvd0RheU5hbWVzQ2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuX293bmVyICYmIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3ICYmIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlciBpbnN0YW5jZW9mIFRLQ2FsZW5kYXJEYXlWaWV3UHJlc2VudGVyKSB7XG4gICAgICAgICAgICAoPFRLQ2FsZW5kYXJEYXlWaWV3UHJlc2VudGVyPnRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlcikuZGF5TmFtZXNIaWRkZW4gPSAhbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVPd25lcigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkJhY2tncm91bmRDb2xvckNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICYmIHRoaXMuX293bmVyICYmIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3ICYmIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlciBpbnN0YW5jZW9mIFRLQ2FsZW5kYXJEYXlWaWV3UHJlc2VudGVyKSB7XG4gICAgICAgICAgICAoPFRLQ2FsZW5kYXJEYXlWaWV3UHJlc2VudGVyPnRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlcikuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gbmV3VmFsdWUuaW9zO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlT3duZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UaXRsZUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWU6IENlbGxTdHlsZSwgbmV3VmFsdWU6IENlbGxTdHlsZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZU93bmVyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRGF5RXZlbnRzVmlld1N0eWxlQ2hhbmdlZChvbGRWYWx1ZTogRGF5RXZlbnRzVmlld1N0eWxlLCBuZXdWYWx1ZTogRGF5RXZlbnRzVmlld1N0eWxlKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAmJiB0aGlzLl9vd25lcikge1xuICAgICAgICAgICAgdGhpcy5kYXlFdmVudHNWaWV3U3R5bGUub3duZXIgPSB0aGlzLl9vd25lcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZU93bmVyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQWxsRGF5RXZlbnRzVmlld1N0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQWxsRGF5RXZlbnRzVmlld1N0eWxlLCBuZXdWYWx1ZTogQWxsRGF5RXZlbnRzVmlld1N0eWxlKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAmJiB0aGlzLl9vd25lcikge1xuICAgICAgICAgICAgdGhpcy5hbGxEYXlFdmVudHNWaWV3U3R5bGUub3duZXIgPSB0aGlzLl9vd25lcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZU93bmVyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2hvd1dlZWtDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmNoYW5nZVNob3dXZWVrKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VTaG93V2VlayhvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuX293bmVyICYmIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3ICYmIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlciBpbnN0YW5jZW9mIFRLQ2FsZW5kYXJEYXlWaWV3UHJlc2VudGVyKSB7XG4gICAgICAgICAgICAoPFRLQ2FsZW5kYXJEYXlWaWV3UHJlc2VudGVyPnRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnByZXNlbnRlcikud2Vla0hpZGRlbiA9ICFuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZU93bmVyKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFRoZSBzdHlsZSBjbGFzcyBmb3IgbW9udGggbmFtZSB2aWV3IG1vZGUuXG4gKiBOT1RFOiB3ZSBzaG91bGQgY29uc2lkZXIgaWYgd2UgbmVlZCBhbiBleHBsaWNpdCBjbGFzcyB0aGF0IGlzIHRoZSBzYW1lIGFzIHRoZSBiYXNlIG9uZVxuICovXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb250aE5hbWVzVmlld1N0eWxlIGV4dGVuZHMgY29tbW9uTW9kdWxlLkNhbGVuZGFyTW9udGhOYW1lc1ZpZXdTdHlsZSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX293bmVyOiBSYWRDYWxlbmRhcjtcbiAgICBwdWJsaWMgc2V0IG93bmVyKHZhbHVlOiBSYWRDYWxlbmRhcikge1xuICAgICAgICB0aGlzLl9vd25lciA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVWaWV3U3R5bGVzKGZvcmNlVXBkYXRlPzogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnVwZGF0ZU93bmVyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU93bmVyKCkge1xuICAgICAgICBpZiAodGhpcy5fb3duZXIgJiYgdGhpcy5fb3duZXIudmlld01vZGUgPT09IGNvbW1vbk1vZHVsZS5DYWxlbmRhclZpZXdNb2RlLk1vbnRoTmFtZXMpIHtcbiAgICAgICAgICAgIHRoaXMuX293bmVyLnVwZGF0ZUNhbGVuZGFyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UaXRsZUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWU6IENlbGxTdHlsZSwgbmV3VmFsdWU6IENlbGxTdHlsZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZU93bmVyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTW9udGhOYW1lQ2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2VsbFN0eWxlLCBuZXdWYWx1ZTogQ2VsbFN0eWxlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlT3duZXIoKTtcbiAgICB9XG59XG5cbi8qKlxuICogVGhlIHllYXIgbW9kZSBzdHlsZSBjbGFzc1xuICovXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJZZWFyVmlld1N0eWxlIGV4dGVuZHMgY29tbW9uTW9kdWxlLkNhbGVuZGFyWWVhclZpZXdTdHlsZSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX293bmVyOiBSYWRDYWxlbmRhcjtcbiAgICBwdWJsaWMgc2V0IG93bmVyKHZhbHVlOiBSYWRDYWxlbmRhcikge1xuICAgICAgICB0aGlzLl9vd25lciA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy5tb250aENlbGxTdHlsZSkge1xuICAgICAgICAgICAgdGhpcy5tb250aENlbGxTdHlsZS5vd25lciA9IHRoaXMuX293bmVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVZpZXdTdHlsZXMoZm9yY2VVcGRhdGU/OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMubW9udGhDZWxsU3R5bGVbJ3VwZGF0ZU5hdGl2ZVByZXNlbnRlciddKCk7XG4gICAgICAgIHRoaXMudXBkYXRlT3duZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlT3duZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9vd25lcikge1xuICAgICAgICAgICAgdGhpcy5fb3duZXIudXBkYXRlQ2FsZW5kYXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRpdGxlQ2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2VsbFN0eWxlLCBuZXdWYWx1ZTogQ2VsbFN0eWxlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlT3duZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Nb250aENlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWU6IE1vbnRoQ2VsbFN0eWxlLCBuZXdWYWx1ZTogTW9udGhDZWxsU3R5bGUpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICYmIHRoaXMuX293bmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoQ2VsbFN0eWxlLm93bmVyID0gdGhpcy5fb3duZXI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVPd25lcigpO1xuICAgIH1cblxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjbGFzcyBSYWRDYWxlbmRhciBleHRlbmRzIGNvbW1vbk1vZHVsZS5SYWRDYWxlbmRhciB7XG4gICAgcHJpdmF0ZSBfaW9zOiBUS0NhbGVuZGFyO1xuICAgIHByaXZhdGUgX2RheVZpZXdEZWxlZ2F0ZTogVEtDYWxlbmRhckRheVZpZXdEZWxlZ2F0ZUltcGxlbWVudGF0aW9uO1xuICAgIHByaXZhdGUgX25hdGl2ZURlbGVnYXRlOiBUS0NhbGVuZGFyTmF0aXZlRGVsZWdhdGVJbXBsZW1lbnRhdGlvbjtcbiAgICBwcml2YXRlIF9uYXRpdmVQcmVzZW50ZXJEZWxlZ2F0ZTogVEtDYWxlbmRhck1vbnRoUHJlc2VudGVyRGVsZWdhdGVJbXBsZW1lbnRhdGlvbjtcbiAgICBwcml2YXRlIF9kYXRhU291cmNlOiBDYWxlbmRhck5hdGl2ZURhdGFTb3VyY2VJbXBsZW1lbnRhdGlvbjsgLy8gbmF0aXZlIHdlYWsgcmVmXG4gICAgcHVibGljIF9mb3JiaWREYXRlU2VsZWN0aW9uOiBib29sZWFuO1xuICAgIHByaXZhdGUgX2NhbGVuZGFyTG9hZGVkOiBib29sZWFuO1xuICAgIHByaXZhdGUgX2N1cnJlbnRDYWxlbmRhcjogTlNDYWxlbmRhcjtcbiAgICBwcml2YXRlIF9kYXRlQ29tcG9uZW50czogTlNEYXRlQ29tcG9uZW50cztcblxuICAgIC8vIFRPRE86IFJlbW92ZSB0aGlzIGFuZCBpbXBsZW1lbnQgbmF0aXZlIHNldHRlcnMgZm9yIHByb3BlcnRpZXNcbiAgICBnZXQgX25hdGl2ZVZpZXcoKTogVEtDYWxlbmRhciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pb3M7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2lvcyA9IFRLQ2FsZW5kYXIuYWxsb2MoKS5pbml0KCk7XG4gICAgICAgIHRoaXMuX25hdGl2ZURlbGVnYXRlID0gVEtDYWxlbmRhck5hdGl2ZURlbGVnYXRlSW1wbGVtZW50YXRpb24uaW5pdFdpdGhPd25lcihuZXcgV2Vha1JlZih0aGlzKSk7XG4gICAgICAgIHRoaXMuX25hdGl2ZVByZXNlbnRlckRlbGVnYXRlID0gVEtDYWxlbmRhck1vbnRoUHJlc2VudGVyRGVsZWdhdGVJbXBsZW1lbnRhdGlvbi5pbml0V2l0aE93bmVyKG5ldyBXZWFrUmVmKHRoaXMpKTtcbiAgICAgICAgdGhpcy5fZGF5Vmlld0RlbGVnYXRlID0gVEtDYWxlbmRhckRheVZpZXdEZWxlZ2F0ZUltcGxlbWVudGF0aW9uLmluaXRXaXRoT3duZXIobmV3IFdlYWtSZWYodGhpcykpO1xuICAgICAgICB0aGlzLl9pb3MuZGVsZWdhdGUgPSB0aGlzLl9uYXRpdmVEZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5fY3VycmVudENhbGVuZGFyID0gTlNDYWxlbmRhci5jdXJyZW50Q2FsZW5kYXI7XG4gICAgICAgIHRoaXMuX2RhdGVDb21wb25lbnRzID0gTlNEYXRlQ29tcG9uZW50cy5hbGxvYygpLmluaXQoKTtcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheWVkRGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWROYXRpdmVEaXNwbGF5ZWREYXRlKCk7XG5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldE5hdGl2ZUxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZU5hdGl2ZVZpZXcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pb3M7XG4gICAgfVxuXG4gICAgcHVibGljIG9uTG9hZGVkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWRlZCgpO1xuICAgICAgICB0aGlzLl9pb3MuZGVsZWdhdGUgPSB0aGlzLl9uYXRpdmVEZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5faW9zLmRhdGFTb3VyY2UgPSA8VEtDYWxlbmRhckRhdGFTb3VyY2U+dGhpcy5fZGF0YVNvdXJjZTtcbiAgICAgICAgKDxUS0NhbGVuZGFyUHJlc2VudGVyQmFzZT50aGlzLl9pb3MucHJlc2VudGVyKS5kZWxlZ2F0ZSA9IHRoaXMuX25hdGl2ZVByZXNlbnRlckRlbGVnYXRlO1xuICAgICAgICB0aGlzLl9jYWxlbmRhckxvYWRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIG9uVW5sb2FkZWQoKSB7XG4gICAgICAgIHN1cGVyLm9uVW5sb2FkZWQoKTtcbiAgICAgICAgdGhpcy5faW9zLmRlbGVnYXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5faW9zLmRhdGFTb3VyY2UgPSBudWxsO1xuICAgICAgICB0aGlzLl9jYWxlbmRhckxvYWRlZCA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5faW9zLnByZXNlbnRlciBpbnN0YW5jZW9mIFRLQ2FsZW5kYXJQcmVzZW50ZXJCYXNlKSB7XG4gICAgICAgICAgICB0aGlzLl9pb3MucHJlc2VudGVyLmRlbGVnYXRlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVDYWxlbmRhcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbGVuZGFyTG9hZGVkICYmIHRoaXMuX25hdGl2ZVZpZXcucHJlc2VudGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVWaWV3LnByZXNlbnRlci51cGRhdGUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTG9jYWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIub25Mb2NhbGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgdGhpcy5zZXROYXRpdmVMb2NhbGUobmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0TmF0aXZlTG9jYWxlKGxvY2FsZTogc3RyaW5nKSB7XG4gICAgICAgIGlmIChsb2NhbGUpIHtcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZVZpZXcubG9jYWxlID0gTlNMb2NhbGUuYWxsb2MoKS5pbml0V2l0aExvY2FsZUlkZW50aWZpZXIobG9jYWxlKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FsZW5kYXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRpc3BsYXllZERhdGVDaGFuZ2VkKG9sZFZhbHVlOiBEYXRlLCBuZXdWYWx1ZTogRGF0ZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZVZpZXcubmF2aWdhdGVUb0RhdGVBbmltYXRlZChuZXdWYWx1ZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldERpc3BsYXllZERhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYXRpdmVWaWV3LmRpc3BsYXllZERhdGU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2VsZWN0aW9uTW9kZUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhclNlbGVjdGlvbk1vZGUsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJTZWxlY3Rpb25Nb2RlKSB7XG4gICAgICAgIHN3aXRjaCAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyU2VsZWN0aW9uTW9kZS5Ob25lOlxuICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZVZpZXcuc2VsZWN0aW9uTW9kZSA9IFRLQ2FsZW5kYXJTZWxlY3Rpb25Nb2RlLk5vbmU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclNlbGVjdGlvbk1vZGUuU2luZ2xlOlxuICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZVZpZXcuc2VsZWN0aW9uTW9kZSA9IFRLQ2FsZW5kYXJTZWxlY3Rpb25Nb2RlLlNpbmdsZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyU2VsZWN0aW9uTW9kZS5NdWx0aXBsZTpcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVWaWV3LnNlbGVjdGlvbk1vZGUgPSBUS0NhbGVuZGFyU2VsZWN0aW9uTW9kZS5NdWx0aXBsZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyU2VsZWN0aW9uTW9kZS5SYW5nZTpcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVWaWV3LnNlbGVjdGlvbk1vZGUgPSBUS0NhbGVuZGFyU2VsZWN0aW9uTW9kZS5SYW5nZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXQVJOSU5HOiBVbnN1cHBvcnRlZCBzZWxlY3Rpb24gbW9kZTogXCIgKyBuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UcmFuc2l0aW9uTW9kZUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhclRyYW5zaXRpb25Nb2RlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyVHJhbnNpdGlvbk1vZGUpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgdHlwZWRQcmVzZW50ZXIgPSA8VEtDYWxlbmRhclByZXNlbnRlckJhc2U+dGhpcy5fbmF0aXZlVmlldy5wcmVzZW50ZXI7XG4gICAgICAgICAgICBzd2l0Y2ggKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJUcmFuc2l0aW9uTW9kZS5Ob25lOlxuICAgICAgICAgICAgICAgICAgICB0eXBlZFByZXNlbnRlci50cmFuc2l0aW9uTW9kZSA9IFRLQ2FsZW5kYXJUcmFuc2l0aW9uTW9kZS5Ob25lO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclRyYW5zaXRpb25Nb2RlLlNsaWRlOlxuICAgICAgICAgICAgICAgICAgICB0eXBlZFByZXNlbnRlci50cmFuc2l0aW9uTW9kZSA9IFRLQ2FsZW5kYXJUcmFuc2l0aW9uTW9kZS5TY3JvbGw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyVHJhbnNpdGlvbk1vZGUuU3RhY2s6XG4gICAgICAgICAgICAgICAgICAgIHR5cGVkUHJlc2VudGVyLnRyYW5zaXRpb25Nb2RlID0gVEtDYWxlbmRhclRyYW5zaXRpb25Nb2RlLkNhcmQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyVHJhbnNpdGlvbk1vZGUuRmxpcDpcbiAgICAgICAgICAgICAgICAgICAgdHlwZWRQcmVzZW50ZXIudHJhbnNpdGlvbk1vZGUgPSBUS0NhbGVuZGFyVHJhbnNpdGlvbk1vZGUuRmxpcDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJUcmFuc2l0aW9uTW9kZS5Gb2xkOlxuICAgICAgICAgICAgICAgICAgICB0eXBlZFByZXNlbnRlci50cmFuc2l0aW9uTW9kZSA9IFRLQ2FsZW5kYXJUcmFuc2l0aW9uTW9kZS5Gb2xkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclRyYW5zaXRpb25Nb2RlLkZsb2F0OlxuICAgICAgICAgICAgICAgICAgICB0eXBlZFByZXNlbnRlci50cmFuc2l0aW9uTW9kZSA9IFRLQ2FsZW5kYXJUcmFuc2l0aW9uTW9kZS5GbG9hdDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJUcmFuc2l0aW9uTW9kZS5Sb3RhdGU6XG4gICAgICAgICAgICAgICAgICAgIHR5cGVkUHJlc2VudGVyLnRyYW5zaXRpb25Nb2RlID0gVEtDYWxlbmRhclRyYW5zaXRpb25Nb2RlLlJvdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXQVJOSU5HOiBVbnN1cHBvcnRlZCB0cmFuc2l0aW9uTW9kZSBtb2RlOiBcIiArIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblZpZXdNb2RlQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJWaWV3TW9kZSkge1xuICAgICAgICBsZXQgdmlld1N0eWxlO1xuICAgICAgICBzd2l0Y2ggKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclZpZXdNb2RlLk1vbnRoOlxuICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZVZpZXcudmlld01vZGUgPSBUS0NhbGVuZGFyVmlld01vZGUuTW9udGg7XG4gICAgICAgICAgICAgICAgdmlld1N0eWxlID0gdGhpcy5tb250aFZpZXdTdHlsZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuTW9udGhOYW1lczpcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVWaWV3LnZpZXdNb2RlID0gVEtDYWxlbmRhclZpZXdNb2RlLk1vbnRoTmFtZXM7XG4gICAgICAgICAgICAgICAgdmlld1N0eWxlID0gdGhpcy5tb250aE5hbWVzVmlld1N0eWxlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJWaWV3TW9kZS5XZWVrOlxuICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZVZpZXcudmlld01vZGUgPSBUS0NhbGVuZGFyVmlld01vZGUuV2VlaztcbiAgICAgICAgICAgICAgICB2aWV3U3R5bGUgPSB0aGlzLndlZWtWaWV3U3R5bGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclZpZXdNb2RlLlllYXI6XG4gICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlVmlldy52aWV3TW9kZSA9IFRLQ2FsZW5kYXJWaWV3TW9kZS5ZZWFyO1xuICAgICAgICAgICAgICAgIHZpZXdTdHlsZSA9IHRoaXMueWVhclZpZXdTdHlsZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuRGF5OlxuICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZVZpZXcudmlld01vZGUgPSBUS0NhbGVuZGFyVmlld01vZGUuRGF5O1xuICAgICAgICAgICAgICAgIHZpZXdTdHlsZSA9IHRoaXMuZGF5Vmlld1N0eWxlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmVWaWV3LnByZXNlbnRlciBpbnN0YW5jZW9mIFRLQ2FsZW5kYXJEYXlWaWV3UHJlc2VudGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICg8VEtDYWxlbmRhckRheVZpZXdQcmVzZW50ZXI+dGhpcy5fbmF0aXZlVmlldy5wcmVzZW50ZXIpLmRheVZpZXcuZGVsZWdhdGUgPSB0aGlzLl9kYXlWaWV3RGVsZWdhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJWaWV3TW9kZS5GbG93LnRvTG9jYWxlTG93ZXJDYXNlKCk6XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5pb3Mudmlld01vZGUgPSBUS0NhbGVuZGFyVmlld01vZGUuVEtDYWxlbmRhclZpZXdNb2RlRmxvdztcbiAgICAgICAgICAgIC8vICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuWWVhck51bWJlcnMudG9Mb2NhbGVMb3dlckNhc2UoKTpcbiAgICAgICAgICAgIC8vIFx0dGhpcy5pb3Mudmlld01vZGUgPSBUS0NhbGVuZGFyVmlld01vZGUuVEtDYWxlbmRhclZpZXdNb2RlWWVhck51bWJlcnM7XG4gICAgICAgICAgICAvLyBcdGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldBUk5JTkc6IFVuc3VwcG9ydGVkIHZpZXcgbW9kZTogXCIgKyBuZXdWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmlld1N0eWxlKSB7XG4gICAgICAgICAgICB2aWV3U3R5bGUudXBkYXRlVmlld1N0eWxlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRXZlbnRzVmlld01vZGVDaGFuZ2VkKG9sZFZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJFdmVudHNWaWV3TW9kZSwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckV2ZW50c1ZpZXdNb2RlKSB7XG4gICAgICAgIGlmICh0aGlzLl9uYXRpdmVWaWV3LnZpZXdNb2RlICE9PSBUS0NhbGVuZGFyVmlld01vZGUuTW9udGggfHwgbmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHR5cGVkUHJlc2VudGVyID0gPFRLQ2FsZW5kYXJNb250aFByZXNlbnRlcj50aGlzLl9uYXRpdmVWaWV3LnByZXNlbnRlcjtcbiAgICAgICAgc3dpdGNoIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJFdmVudHNWaWV3TW9kZS5Ob25lOlxuICAgICAgICAgICAgICAgIHR5cGVkUHJlc2VudGVyLmlubGluZUV2ZW50c1ZpZXdNb2RlID0gVEtDYWxlbmRhcklubGluZUV2ZW50c1ZpZXdNb2RlLk5vbmU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhckV2ZW50c1ZpZXdNb2RlLklubGluZTpcbiAgICAgICAgICAgICAgICB0eXBlZFByZXNlbnRlci5pbmxpbmVFdmVudHNWaWV3TW9kZSA9IFRLQ2FsZW5kYXJJbmxpbmVFdmVudHNWaWV3TW9kZS5JbmxpbmU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhckV2ZW50c1ZpZXdNb2RlLlBvcG92ZXI6XG4gICAgICAgICAgICAgICAgdHlwZWRQcmVzZW50ZXIuaW5saW5lRXZlbnRzVmlld01vZGUgPSBUS0NhbGVuZGFySW5saW5lRXZlbnRzVmlld01vZGUuUG9wb3ZlcjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldBUk5JTkc6IFBvcG92ZXIgbW9kZSBmb3IgZXZlbnRzIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIGlQaG9uZS5cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV0FSTklORzogVW5zdXBwb3J0ZWQgZXZlbnRzIHZpZXcgbW9kZTogXCIgKyBuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TZWxlY3RlZERhdGVSYW5nZUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5EYXRlUmFuZ2UsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuRGF0ZVJhbmdlKSB7XG4gICAgICAgIGlmICh0aGlzLl9mb3JiaWREYXRlU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3VmFsdWUgaW5zdGFuY2VvZiBjb21tb25Nb2R1bGUuRGF0ZVJhbmdlKSB7XG4gICAgICAgICAgICBsZXQgdGtEYXRlUmFuZ2UgPSBUS0RhdGVSYW5nZS5hbGxvYygpLmluaXRXaXRoU3RhcnRFbmQobmV3VmFsdWUuc3RhcnREYXRlLCBuZXdWYWx1ZS5lbmREYXRlKTtcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZVZpZXcuc2VsZWN0ZWREYXRlc1JhbmdlID0gdGtEYXRlUmFuZ2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TZWxlY3RlZERhdGVzQ2hhbmdlZChvbGRWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLl9mb3JiaWREYXRlU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmV3RGF0ZXMgPSBuZXdWYWx1ZTtcbiAgICAgICAgaWYgKHR5cGVvZiAobmV3RGF0ZXMpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBuZXdEYXRlcyA9IG5ld0RhdGVzLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWxlY3RlZERhdGVzID0gTlNNdXRhYmxlQXJyYXkubmV3KCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3RGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUobmV3RGF0ZXNbaV0pO1xuICAgICAgICAgICAgc2VsZWN0ZWREYXRlcy5hZGRPYmplY3QoZGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9uYXRpdmVWaWV3LnNlbGVjdGVkRGF0ZXMgPSBzZWxlY3RlZERhdGVzO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblNlbGVjdGVkRGF0ZUNoYW5nZWQob2xkVmFsdWU6IERhdGUsIG5ld1ZhbHVlOiBEYXRlKSB7XG4gICAgICAgIGlmICh0aGlzLl9mb3JiaWREYXRlU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5zZWxlY3RlZERhdGUgPSBuZXdWYWx1ZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25NYXhEYXRlQ2hhbmdlZChvbGRWYWx1ZTogRGF0ZSwgbmV3VmFsdWU6IERhdGUpIHtcbiAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5tYXhEYXRlID0gbmV3VmFsdWU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTWluRGF0ZUNoYW5nZWQob2xkVmFsdWU6IERhdGUsIG5ld1ZhbHVlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMuX25hdGl2ZVZpZXcubWluRGF0ZSA9IG5ld1ZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVFdmVudFNvdXJjZSgpIHtcblxuICAgICAgICBpZiAoIXRoaXMuX25hdGl2ZVZpZXcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ldmVudFNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9kYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YVNvdXJjZSA9IENhbGVuZGFyTmF0aXZlRGF0YVNvdXJjZUltcGxlbWVudGF0aW9uLm5ldygpLmluaXRXaXRoT3duZXIodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YVNvdXJjZS5pdGVtc1NvdXJjZSA9IHRoaXMuZXZlbnRTb3VyY2U7XG4gICAgICAgICAgICAgICAgdGhpcy5faW9zLmRhdGFTb3VyY2UgPSB0aGlzLl9kYXRhU291cmNlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpZXdNb2RlID09PSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJWaWV3TW9kZS5EYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW9zLnByZXNlbnRlci51cGRhdGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhU291cmNlLml0ZW1zU291cmNlID0gdGhpcy5ldmVudFNvdXJjZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pb3MucHJlc2VudGVyLnVwZGF0ZShmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Ib3Jpem9udGFsVHJhbnNpdGlvbkNoYW5nZWQob2xkVmFsdWU6IGJvb2xlYW4sIG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGxldCBob3Jpem9udGFsVHJhbnNpdGlvbiA9IDxCb29sZWFuPm5ld1ZhbHVlO1xuICAgICAgICB0aGlzLl9uYXRpdmVWaWV3LnByZXNlbnRlclsndHJhbnNpdGlvbklzVmVydGljYWwnXSA9ICFob3Jpem9udGFsVHJhbnNpdGlvbjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Nb250aFZpZXdTdHlsZUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhck1vbnRoVmlld1N0eWxlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyTW9udGhWaWV3U3R5bGUpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICYmIChuZXdWYWx1ZSBpbnN0YW5jZW9mIENhbGVuZGFyTW9udGhWaWV3U3R5bGUpKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoVmlld1N0eWxlLm93bmVyID0gdGhpcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbk1vbnRoTmFtZXNWaWV3U3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJNb250aE5hbWVzVmlld1N0eWxlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyTW9udGhOYW1lc1ZpZXdTdHlsZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUgJiYgKG5ld1ZhbHVlIGluc3RhbmNlb2YgQ2FsZW5kYXJNb250aE5hbWVzVmlld1N0eWxlKSkge1xuICAgICAgICAgICAgdGhpcy5tb250aE5hbWVzVmlld1N0eWxlLm93bmVyID0gdGhpcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbldlZWtWaWV3U3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJXZWVrVmlld1N0eWxlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyV2Vla1ZpZXdTdHlsZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUgJiYgKG5ld1ZhbHVlIGluc3RhbmNlb2YgQ2FsZW5kYXJXZWVrVmlld1N0eWxlKSkge1xuICAgICAgICAgICAgdGhpcy53ZWVrVmlld1N0eWxlLm93bmVyID0gdGhpcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRheVZpZXdTdHlsZUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckRheVZpZXdTdHlsZSwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckRheVZpZXdTdHlsZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUgJiYgKG5ld1ZhbHVlIGluc3RhbmNlb2YgQ2FsZW5kYXJEYXlWaWV3U3R5bGUpKSB7XG4gICAgICAgICAgICB0aGlzLmRheVZpZXdTdHlsZS5vd25lciA9IHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25ZZWFyVmlld1N0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2FsZW5kYXJZZWFyVmlld1N0eWxlLCBuZXdWYWx1ZTogQ2FsZW5kYXJZZWFyVmlld1N0eWxlKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAmJiAobmV3VmFsdWUgaW5zdGFuY2VvZiBDYWxlbmRhclllYXJWaWV3U3R5bGUpKSB7XG4gICAgICAgICAgICB0aGlzLnllYXJWaWV3U3R5bGUub3duZXIgPSB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkTmF0aXZlRGlzcGxheWVkRGF0ZSgpIHtcbiAgICAgICAgbGV0IG5hdGl2ZURhdGUgPSB0aGlzLmRhdGVXaXRob3V0SG91cnModGhpcy5faW9zLmRpc3BsYXllZERhdGUpO1xuICAgICAgICBpZiAodGhpcy5kaXNwbGF5ZWREYXRlICE9PSBuYXRpdmVEYXRlKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXllZERhdGUgPSBuYXRpdmVEYXRlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGF0ZVdpdGhvdXRIb3VycyhvcmlnaW5hbERhdGU6IERhdGUpIHtcbiAgICAgICAgdGhpcy5fZGF0ZUNvbXBvbmVudHMuZGF5ID0gb3JpZ2luYWxEYXRlLmdldERhdGUoKTtcbiAgICAgICAgdGhpcy5fZGF0ZUNvbXBvbmVudHMubW9udGggPSBvcmlnaW5hbERhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgIHRoaXMuX2RhdGVDb21wb25lbnRzLnllYXIgPSBvcmlnaW5hbERhdGUuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudENhbGVuZGFyLmRhdGVGcm9tQ29tcG9uZW50cyh0aGlzLl9kYXRlQ29tcG9uZW50cyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbG9hZCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX25hdGl2ZVZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZVZpZXcucmVsb2FkRGF0YSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5hdmlnYXRlRm9yd2FyZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5uYXZpZ2F0ZUZvcndhcmQodHJ1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5hdmlnYXRlQmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5uYXZpZ2F0ZUJhY2sodHJ1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdvVG9EYXRlKGRhdGU6IERhdGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5uYXZpZ2F0ZVRvRGF0ZUFuaW1hdGVkKGRhdGUsIHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRFdmVudHNGb3JEYXRlKGRhdGU6IERhdGUpOiBBcnJheTxDYWxlbmRhckV2ZW50PiB7XG4gICAgICAgIGxldCBuYXRpdmVSZXN1bHQgPSB0aGlzLl9uYXRpdmVWaWV3LmV2ZW50c0ZvckRhdGUoZGF0ZSk7XG4gICAgICAgIGxldCByZXN1bHQ6IEFycmF5PENhbGVuZGFyRXZlbnQ+ID0gbmV3IEFycmF5PENhbGVuZGFyRXZlbnQ+KCk7XG4gICAgICAgIGxldCBhID0gbmV3IGludGVyb3AuUmVmZXJlbmNlPG51bWJlcj4oKTtcbiAgICAgICAgbGV0IHIgPSBuZXcgaW50ZXJvcC5SZWZlcmVuY2U8bnVtYmVyPigpO1xuICAgICAgICBsZXQgZyA9IG5ldyBpbnRlcm9wLlJlZmVyZW5jZTxudW1iZXI+KCk7XG4gICAgICAgIGxldCBiID0gbmV3IGludGVyb3AuUmVmZXJlbmNlPG51bWJlcj4oKTtcblxuICAgICAgICBsZXQgbmF0aXZlRXZlbnQ6IFRLQ2FsZW5kYXJFdmVudDtcbiAgICAgICAgbGV0IGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgbmF0aXZlUmVzdWx0LmNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIG5hdGl2ZUV2ZW50ID0gPFRLQ2FsZW5kYXJFdmVudD5uYXRpdmVSZXN1bHQub2JqZWN0QXRJbmRleChpKTtcbiAgICAgICAgICAgIGlmIChuYXRpdmVFdmVudC5ldmVudENvbG9yKSB7XG4gICAgICAgICAgICAgICAgbmF0aXZlRXZlbnQuZXZlbnRDb2xvci5nZXRSZWRHcmVlbkJsdWVBbHBoYShyLCBnLCBiLCBhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGNvbG9yID0gbmF0aXZlRXZlbnQuZXZlbnRDb2xvciA/IG5ldyBDb2xvcihNYXRoLnJvdW5kKGEudmFsdWUgKiAyNTUpLCBNYXRoLnJvdW5kKHIudmFsdWUgKiAyNTUpLCBNYXRoLnJvdW5kKGcudmFsdWUgKiAyNTUpLCBNYXRoLnJvdW5kKGIudmFsdWUgKiAyNTUpKSA6IG51bGw7XG4gICAgICAgICAgICBldmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KG5hdGl2ZUV2ZW50LnRpdGxlLCBuYXRpdmVFdmVudC5zdGFydERhdGUsIG5hdGl2ZUV2ZW50LmVuZERhdGUsIG5hdGl2ZUV2ZW50LmFsbERheSwgY29sb3IpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjbGFzcyBDYWxlbmRhck5hdGl2ZURhdGFTb3VyY2VJbXBsZW1lbnRhdGlvbiBleHRlbmRzIE5TT2JqZWN0IGltcGxlbWVudHMgVEtDYWxlbmRhckRhdGFTb3VyY2Uge1xuICAgIHB1YmxpYyBzdGF0aWMgT2JqQ1Byb3RvY29scyA9IFtUS0NhbGVuZGFyRGF0YVNvdXJjZV07XG4gICAgcHJpdmF0ZSBfb3duZXI6IFJhZENhbGVuZGFyO1xuXG4gICAgcHJpdmF0ZSBfaXRlbXNTb3VyY2U6IEFycmF5PENhbGVuZGFyRXZlbnQ+O1xuXG4gICAgc3RhdGljIG5ldygpOiBDYWxlbmRhck5hdGl2ZURhdGFTb3VyY2VJbXBsZW1lbnRhdGlvbiB7XG4gICAgICAgIHJldHVybiA8Q2FsZW5kYXJOYXRpdmVEYXRhU291cmNlSW1wbGVtZW50YXRpb24+c3VwZXIubmV3KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRXaXRoU291cmNlQW5kT3duZXIoc291cmNlOiBBcnJheTxDYWxlbmRhckV2ZW50Piwgb3duZXI6IFJhZENhbGVuZGFyKTogQ2FsZW5kYXJOYXRpdmVEYXRhU291cmNlSW1wbGVtZW50YXRpb24ge1xuICAgICAgICB0aGlzLml0ZW1zU291cmNlID0gc291cmNlO1xuICAgICAgICB0aGlzLl9vd25lciA9IG93bmVyO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0V2l0aE93bmVyKG93bmVyOiBSYWRDYWxlbmRhcik6IENhbGVuZGFyTmF0aXZlRGF0YVNvdXJjZUltcGxlbWVudGF0aW9uIHtcbiAgICAgICAgdGhpcy5fb3duZXIgPSBvd25lcjtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXQgaXRlbXNTb3VyY2UodmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYnNlcnZhYmxlQXJyYXkpIHtcbiAgICAgICAgICAgIGxldCBsaXN0ID0gbmV3IEFycmF5PENhbGVuZGFyRXZlbnQ+KCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKHZhbHVlLmdldEl0ZW0oaSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5faXRlbXNTb3VyY2UgPSBsaXN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faXRlbXNTb3VyY2UgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBpdGVtc1NvdXJjZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNTb3VyY2U7XG4gICAgfVxuXG4gICAgcHVibGljIGNhbGVuZGFyRXZlbnRzRm9yRGF0ZShjYWxlbmRhcjogVEtDYWxlbmRhciwgZGF0ZTogRGF0ZSk6IE5TQXJyYXk8YW55PiB7XG4gICAgICAgIGxldCBuYXRpdmVFdmVudHMgPSBOU011dGFibGVBcnJheS5hbGxvYygpLmluaXQoKTtcbiAgICAgICAgZm9yIChsZXQgZXZlbnQgaW4gdGhpcy5pdGVtc1NvdXJjZSkge1xuICAgICAgICAgICAgbGV0IHN0YXJ0RGF0ZTogRGF0ZSA9IHRoaXMuaXRlbXNTb3VyY2VbZXZlbnRdLnN0YXJ0RGF0ZTtcbiAgICAgICAgICAgIGxldCBlbmREYXRlOiBEYXRlID0gdGhpcy5pdGVtc1NvdXJjZVtldmVudF0uZW5kRGF0ZTtcbiAgICAgICAgICAgIGlmIChzdGFydERhdGUgJiYgZW5kRGF0ZSkge1xuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBkYXRlIGlzIGJldHdlZW4gdGhlIHN0YXJ0L2VuZCBkYXRlcyBvciBleGFjdGx5IGVxdWFsIHRvIGVpdGhlciBzdGFydCBvciBlbmRcbiAgICAgICAgICAgICAgICBpZiAoKGVuZERhdGUuZ2V0VGltZSgpID49IGRhdGUuZ2V0VGltZSgpICYmIHN0YXJ0RGF0ZS5nZXRUaW1lKCkgPD0gZGF0ZS5nZXRUaW1lKCkpIHx8XG4gICAgICAgICAgICAgICAgICAgIChzdGFydERhdGUuZ2V0RGF0ZSgpID09PSBkYXRlLmdldERhdGUoKSAmJiBzdGFydERhdGUuZ2V0TW9udGgoKSA9PT0gZGF0ZS5nZXRNb250aCgpICYmIHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpID09PSBkYXRlLmdldEZ1bGxZZWFyKCkpIHx8XG4gICAgICAgICAgICAgICAgICAgIChlbmREYXRlLmdldERhdGUoKSA9PT0gZGF0ZS5nZXREYXRlKCkgJiYgZW5kRGF0ZS5nZXRNb250aCgpID09PSBkYXRlLmdldE1vbnRoKCkgJiYgZW5kRGF0ZS5nZXRGdWxsWWVhcigpID09PSBkYXRlLmdldEZ1bGxZZWFyKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUV2ZW50cy5hZGRPYmplY3QodGhpcy5pdGVtc1NvdXJjZVtldmVudF0uaW9zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hdGl2ZUV2ZW50cztcbiAgICB9XG5cbiAgICBwdWJsaWMgY2FsZW5kYXJFdmVudHNGcm9tRGF0ZVRvRGF0ZVdpdGhDYWxsYmFjayhjYWxlbmRhcjogVEtDYWxlbmRhciwgZnJvbURhdGU6IERhdGUsIHRvRGF0ZTogRGF0ZSwgY2FsbGJhY2s6IChOU0FycmF5KSA9PiB2b2lkKTogTlNBcnJheTxhbnk+IHtcbiAgICAgICAgbGV0IG5hdGl2ZUV2ZW50cyA9IE5TTXV0YWJsZUFycmF5LmFsbG9jKCkuaW5pdCgpO1xuXG4gICAgICAgIGZvciAobGV0IGV2ZW50IGluIHRoaXMuaXRlbXNTb3VyY2UpIHtcbiAgICAgICAgICAgIGxldCBzdGFydERhdGUgPSB0aGlzLml0ZW1zU291cmNlW2V2ZW50XS5zdGFydERhdGU7XG4gICAgICAgICAgICBsZXQgZW5kRGF0ZSA9IHRoaXMuaXRlbXNTb3VyY2VbZXZlbnRdLmVuZERhdGU7XG5cbiAgICAgICAgICAgIC8vIFNEIC0gc3RhcnREYXRlXG4gICAgICAgICAgICAvLyBFRCAtIGVuZERhdGVcbiAgICAgICAgICAgIC8vIEZEIC0gZnJvbURhdGVcbiAgICAgICAgICAgIC8vIFREIC0gdG9EYXRlXG4gICAgICAgICAgICAvLyAtLS0tLVNELS0tLUZELS0tLS0tLS1FRC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tVEQtLS0tLS0tLS1cbiAgICAgICAgICAgIGlmICgoc3RhcnREYXRlLmdldFRpbWUoKSA8PSBmcm9tRGF0ZS5nZXRUaW1lKCkgJiYgZW5kRGF0ZS5nZXRUaW1lKCkgPj0gZnJvbURhdGUuZ2V0VGltZSgpKSB8fFxuICAgICAgICAgICAgICAgIC8vIC0tLS0tU0QtLS0tRkQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1URC0tRUQtLS0tLVxuICAgICAgICAgICAgICAgIChzdGFydERhdGUuZ2V0VGltZSgpIDw9IGZyb21EYXRlLmdldFRpbWUoKSAmJiBlbmREYXRlLmdldFRpbWUoKSA+PSB0b0RhdGUuZ2V0VGltZSgpKSB8fFxuICAgICAgICAgICAgICAgIC8vIC0tLS0tLS0tLS0tRkQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVNELS0tLS1URC0tRUQtLS0tLVxuICAgICAgICAgICAgICAgIChzdGFydERhdGUuZ2V0VGltZSgpIDw9IHRvRGF0ZS5nZXRUaW1lKCkgJiYgZW5kRGF0ZS5nZXRUaW1lKCkgPj0gdG9EYXRlLmdldFRpbWUoKSkgfHxcbiAgICAgICAgICAgICAgICAvLyAtLS0tLS0tLS0tLUZELS0tU0QtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1FRC0tLS0tVEQtLS0tLS0tLS1cbiAgICAgICAgICAgICAgICAoc3RhcnREYXRlLmdldFRpbWUoKSA+PSBmcm9tRGF0ZS5nZXRUaW1lKCkgJiYgZW5kRGF0ZS5nZXRUaW1lKCkgPD0gdG9EYXRlLmdldFRpbWUoKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5hdGl2ZUV2ZW50cy5hZGRPYmplY3QodGhpcy5pdGVtc1NvdXJjZVtldmVudF0uaW9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmF0aXZlRXZlbnRzO1xuICAgIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmV4cG9ydCBjbGFzcyBUS0NhbGVuZGFyTW9udGhQcmVzZW50ZXJEZWxlZ2F0ZUltcGxlbWVudGF0aW9uIGV4dGVuZHMgTlNPYmplY3QgaW1wbGVtZW50cyBUS0NhbGVuZGFyTW9udGhQcmVzZW50ZXJEZWxlZ2F0ZSB7XG4gICAgcHVibGljIHN0YXRpYyBPYmpDUHJvdG9jb2xzID0gW1RLQ2FsZW5kYXJNb250aFByZXNlbnRlckRlbGVnYXRlXTtcbiAgICBwcml2YXRlIF9vd25lcjogV2Vha1JlZjxSYWRDYWxlbmRhcj47XG4gICAgcHVibGljIHN0YXRpYyBpbml0V2l0aE93bmVyKG93bmVyOiBXZWFrUmVmPFJhZENhbGVuZGFyPik6IFRLQ2FsZW5kYXJNb250aFByZXNlbnRlckRlbGVnYXRlSW1wbGVtZW50YXRpb24ge1xuICAgICAgICBsZXQgaW5zdGFuY2UgPSA8VEtDYWxlbmRhck1vbnRoUHJlc2VudGVyRGVsZWdhdGVJbXBsZW1lbnRhdGlvbj5zdXBlci5uZXcoKTtcbiAgICAgICAgaW5zdGFuY2UuX293bmVyID0gb3duZXI7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9XG5cbiAgICBtb250aFByZXNlbnRlcklubGluZUV2ZW50U2VsZWN0ZWQocHJlc2VudGVyOiBUS0NhbGVuZGFyTW9udGhQcmVzZW50ZXIsIGV2ZW50OiBUS0NhbGVuZGFyRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICBsZXQgaW5saW5lRXZlbnREYXRhOiBDYWxlbmRhckV2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQudGl0bGUsIGV2ZW50LnN0YXJ0RGF0ZSwgZXZlbnQuZW5kRGF0ZSwgZXZlbnQuYWxsRGF5KTtcbiAgICAgICAgbGV0IGFyZ3M6IGNvbW1vbk1vZHVsZS5DYWxlbmRhcklubGluZUV2ZW50U2VsZWN0ZWREYXRhID0ge1xuICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkQ2FsZW5kYXIuaW5saW5lRXZlbnRTZWxlY3RlZEV2ZW50LFxuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLl9vd25lci5nZXQoKSxcbiAgICAgICAgICAgIGV2ZW50RGF0YTogaW5saW5lRXZlbnREYXRhXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fb3duZXIuZ2V0KCkubm90aWZ5KGFyZ3MpO1xuICAgIH1cblxuICAgIC8vIGNhbGxlZCBmb3IgZXZlcnkgaW5saW5lIGV2ZW50IGNlbGwgYW5kIHdlIHVzZSB0byBzZXQgdGhlIHN0eWxpbmcgcHJvcGVydGllcyBpZiBhbnkuXG4gICAgbW9udGhQcmVzZW50ZXJVcGRhdGVWaXN1YWxzRm9ySW5saW5lRXZlbnRDZWxsKHByZXNlbnRlcjogVEtDYWxlbmRhck1vbnRoUHJlc2VudGVyLCBjZWxsOiBUS0NhbGVuZGFySW5saW5lVmlld1RhYmxlVmlld0NlbGwpOiB2b2lkIHtcblxuICAgICAgICBpZiAodGhpcy5fb3duZXIuZ2V0KCkubW9udGhWaWV3U3R5bGUpIHtcbiAgICAgICAgICAgIGxldCBzdHlsZSA9IHRoaXMuX293bmVyLmdldCgpLm1vbnRoVmlld1N0eWxlLmlubGluZUV2ZW50Q2VsbFN0eWxlO1xuICAgICAgICAgICAgaWYgKHN0eWxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlLmNlbGxCYWNrZ3JvdW5kQ29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzdHlsZS5jZWxsQmFja2dyb3VuZENvbG9yLmlvcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlLmV2ZW50VGV4dENvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuZXZlbnRDb2xvciA9IHN0eWxlLmV2ZW50VGV4dENvbG9yLmlvcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlLnRpbWVUZXh0Q29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5zdHlsZS50aW1lQ29sb3IgPSBzdHlsZS50aW1lVGV4dENvbG9yLmlvcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlLmV2ZW50Rm9udE5hbWUgfHwgc3R5bGUuZXZlbnRGb250U3R5bGUgfHwgc3R5bGUuZXZlbnRUZXh0U2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLnN0eWxlLmV2ZW50Rm9udCA9IFRvb2xzLmNyZWF0ZUZvbnQoc3R5bGUuZXZlbnRGb250TmFtZSwgc3R5bGUuZXZlbnRGb250U3R5bGUsIHN0eWxlLmV2ZW50VGV4dFNpemUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzdHlsZS50aW1lVGV4dENvbG9yIHx8IHN0eWxlLnRpbWVGb250TmFtZSB8fCBzdHlsZS50aW1lRm9udFN0eWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUudGltZUZvbnQgPSBUb29scy5jcmVhdGVGb250KHN0eWxlLnRpbWVGb250TmFtZSwgc3R5bGUudGltZUZvbnRTdHlsZSwgc3R5bGUudGltZVRleHRTaXplKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUS0NhbGVuZGFyRGF5Vmlld0RlbGVnYXRlSW1wbGVtZW50YXRpb24gZXh0ZW5kcyBOU09iamVjdCBpbXBsZW1lbnRzIFRLQ2FsZW5kYXJEYXlWaWV3RGVsZWdhdGUge1xuICAgIHB1YmxpYyBzdGF0aWMgT2JqQ1Byb3RvY29scyA9IFtUS0NhbGVuZGFyRGF5Vmlld0RlbGVnYXRlXTtcbiAgICBwcml2YXRlIF9vd25lcjogV2Vha1JlZjxSYWRDYWxlbmRhcj47XG5cbiAgICBwdWJsaWMgc3RhdGljIGluaXRXaXRoT3duZXIob3duZXI6IFdlYWtSZWY8UmFkQ2FsZW5kYXI+KTogVEtDYWxlbmRhckRheVZpZXdEZWxlZ2F0ZUltcGxlbWVudGF0aW9uIHtcbiAgICAgICAgbGV0IGluc3RhbmNlID0gPFRLQ2FsZW5kYXJEYXlWaWV3RGVsZWdhdGVJbXBsZW1lbnRhdGlvbj5zdXBlci5uZXcoKTtcbiAgICAgICAgaW5zdGFuY2UuX293bmVyID0gb3duZXI7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9XG5cbiAgICBkYXlWaWV3RGlkU2VsZWN0RXZlbnQoZGF5VmlldzogVEtDYWxlbmRhckRheVZpZXcsIGV2ZW50OiBUS0NhbGVuZGFyRXZlbnRQcm90b2NvbCkge1xuICAgICAgICBsZXQgZGF5Vmlld0V2ZW50RGF0YTogQ2FsZW5kYXJFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KGV2ZW50LnRpdGxlLCBldmVudC5zdGFydERhdGUsIGV2ZW50LmVuZERhdGUsIGV2ZW50LmFsbERheSk7XG4gICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJEYXlWaWV3RXZlbnRTZWxlY3RlZERhdGEgPSB7XG4gICAgICAgICAgICBldmVudE5hbWU6IGNvbW1vbk1vZHVsZS5SYWRDYWxlbmRhci5kYXlWaWV3RXZlbnRTZWxlY3RlZEV2ZW50LFxuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLl9vd25lci5nZXQoKSxcbiAgICAgICAgICAgIGV2ZW50RGF0YTogZGF5Vmlld0V2ZW50RGF0YVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX293bmVyLmdldCgpLm5vdGlmeShhcmdzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUS0NhbGVuZGFyTmF0aXZlRGVsZWdhdGVJbXBsZW1lbnRhdGlvbiBleHRlbmRzIE5TT2JqZWN0IGltcGxlbWVudHMgVEtDYWxlbmRhckRlbGVnYXRlIHtcbiAgICBwdWJsaWMgc3RhdGljIE9iakNQcm90b2NvbHMgPSBbVEtDYWxlbmRhckRlbGVnYXRlXTtcbiAgICBwcml2YXRlIF9vd25lcjogV2Vha1JlZjxSYWRDYWxlbmRhcj47XG5cbiAgICBwdWJsaWMgc3RhdGljIGluaXRXaXRoT3duZXIob3duZXI6IFdlYWtSZWY8UmFkQ2FsZW5kYXI+KTogVEtDYWxlbmRhck5hdGl2ZURlbGVnYXRlSW1wbGVtZW50YXRpb24ge1xuICAgICAgICBsZXQgaW5zdGFuY2UgPSA8VEtDYWxlbmRhck5hdGl2ZURlbGVnYXRlSW1wbGVtZW50YXRpb24+c3VwZXIubmV3KCk7XG4gICAgICAgIGluc3RhbmNlLl9vd25lciA9IG93bmVyO1xuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgY2FsZW5kYXJEaWRDaGFuZ2VkVmlld01vZGVGcm9tVG8oY2FsZW5kYXI6IFRLQ2FsZW5kYXIsIHByZXZpb3VzVmlld01vZGU6IFRLQ2FsZW5kYXJWaWV3TW9kZSwgdmlld01vZGU6IFRLQ2FsZW5kYXJWaWV3TW9kZSk6IHZvaWQge1xuICAgICAgICBsZXQgYXJnczogY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGVDaGFuZ2VkRXZlbnREYXRhID0ge1xuICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkQ2FsZW5kYXIudmlld01vZGVDaGFuZ2VkRXZlbnQsXG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMuX293bmVyLmdldCgpLFxuICAgICAgICAgICAgb2xkVmFsdWU6IHRoaXMuZ2V0Vmlld01vZGVGcm9tVEtDYWxlbmRhclZpZXdNb2RlKHByZXZpb3VzVmlld01vZGUpLFxuICAgICAgICAgICAgbmV3VmFsdWU6IHRoaXMuZ2V0Vmlld01vZGVGcm9tVEtDYWxlbmRhclZpZXdNb2RlKHZpZXdNb2RlKVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX293bmVyLmdldCgpLm5vdGlmeShhcmdzKTtcblxuICAgICAgICAvLyB0aGlzIHVwZGF0ZSB3aWxsIHRyaWdnZXIgdXBkYXRlIG9mIFVJIHN0eWxlcyBmb3IgbmV3IHZpZXcgbW9kZVxuICAgICAgICBpZiAodGhpcy5fb3duZXIuZ2V0KCkudmlld01vZGUgIT09IGFyZ3MubmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX293bmVyLmdldCgpLnZpZXdNb2RlID0gYXJncy5uZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbGVuZGFyRGlkRGVzZWxlY3RlZERhdGUoY2FsZW5kYXI6IFRLQ2FsZW5kYXIsIGRhdGU6IERhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX293bmVyLmdldCgpLnNlbGVjdGlvbk1vZGUgPT09IGNvbW1vbk1vZHVsZS5DYWxlbmRhclNlbGVjdGlvbk1vZGUuTXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuX293bmVyLmdldCgpLl9mb3JiaWREYXRlU2VsZWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX293bmVyLmdldCgpLl9yZW1vdmVTZWxlY3RlZERhdGUoZGF0ZSk7XG4gICAgICAgICAgICB0aGlzLl9vd25lci5nZXQoKS5fZm9yYmlkRGF0ZVNlbGVjdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGFyZ3M6IGNvbW1vbk1vZHVsZS5DYWxlbmRhclNlbGVjdGlvbkV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgIGV2ZW50TmFtZTogY29tbW9uTW9kdWxlLlJhZENhbGVuZGFyLmRhdGVEZXNlbGVjdGVkRXZlbnQsXG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMuX293bmVyLmdldCgpLFxuICAgICAgICAgICAgZGF0ZTogZGF0ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX293bmVyLmdldCgpLm5vdGlmeShhcmdzKTtcbiAgICB9XG5cbiAgICBjYWxlbmRhckRpZFRhcENlbGwoY2FsZW5kYXI6IFRLQ2FsZW5kYXIsIGNlbGw6IFRLQ2FsZW5kYXJEYXlDZWxsKTogdm9pZCB7XG4gICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJDZWxsVGFwRXZlbnREYXRhID0ge1xuICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkQ2FsZW5kYXIuY2VsbFRhcEV2ZW50LFxuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLl9vd25lci5nZXQoKSxcbiAgICAgICAgICAgIGNlbGw6IGNlbGwsXG4gICAgICAgICAgICBkYXRlOiBjZWxsLmRhdGVcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9vd25lci5nZXQoKS5ub3RpZnkoYXJncyk7XG4gICAgfVxuXG4gICAgLy8gQW5kcm9pZCBjdXJyZW50bHkgZG9lc24ndCBzdXBvb3J0IHRoaXMgZXZlbnQuIHdpbGwgaW1wbGVtZW50IG9uIGEgbGF0ZXIgc3RhZ2UuXG4gICAgY2FsZW5kYXJTaG91bGRTZWxlY3REYXRlKGNhbGVuZGFyOiBUS0NhbGVuZGFyLCBkYXRlOiBEYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIE5PVEU6IEluIHJhbmdlIHNlbGVjdGlvbiB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgb25jZSBmb3IgdGhlIGVuZCBkYXRlLlxuICAgIGNhbGVuZGFyRGlkU2VsZWN0RGF0ZShjYWxlbmRhcjogVEtDYWxlbmRhciwgZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vd25lci5nZXQoKS5fZm9yYmlkRGF0ZVNlbGVjdGlvbiA9IHRydWU7XG4gICAgICAgIGlmICghdGhpcy5fb3duZXIuZ2V0KCkuc2VsZWN0ZWREYXRlIHx8IGRhdGUuZ2V0VGltZSgpICE9PSB0aGlzLl9vd25lci5nZXQoKS5zZWxlY3RlZERhdGUuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICB0aGlzLl9vd25lci5nZXQoKS5zZWxlY3RlZERhdGUgPSBkYXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX293bmVyLmdldCgpLnNlbGVjdGlvbk1vZGUgPT09IGNvbW1vbk1vZHVsZS5DYWxlbmRhclNlbGVjdGlvbk1vZGUuUmFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX293bmVyLmdldCgpLnNlbGVjdGVkRGF0ZVJhbmdlID1cbiAgICAgICAgICAgICAgICBuZXcgY29tbW9uTW9kdWxlLkRhdGVSYW5nZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3duZXIuZ2V0KCkuaW9zLnNlbGVjdGVkRGF0ZXNSYW5nZS5zdGFydERhdGUsIHRoaXMuX293bmVyLmdldCgpLmlvcy5zZWxlY3RlZERhdGVzUmFuZ2UuZW5kRGF0ZSk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9vd25lci5nZXQoKS5zZWxlY3Rpb25Nb2RlID09PSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJTZWxlY3Rpb25Nb2RlLk11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLl9vd25lci5nZXQoKS5fYWRkU2VsZWN0ZWREYXRlKGRhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb3duZXIuZ2V0KCkuX2ZvcmJpZERhdGVTZWxlY3Rpb24gPSBmYWxzZTtcblxuICAgICAgICBsZXQgYXJnczogY29tbW9uTW9kdWxlLkNhbGVuZGFyU2VsZWN0aW9uRXZlbnREYXRhID0ge1xuICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkQ2FsZW5kYXIuZGF0ZVNlbGVjdGVkRXZlbnQsXG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMuX293bmVyLmdldCgpLFxuICAgICAgICAgICAgZGF0ZTogZGF0ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX293bmVyLmdldCgpLm5vdGlmeShhcmdzKTtcbiAgICB9XG5cbiAgICBjYWxlbmRhckRpZE5hdmlnYXRlVG9EYXRlKGNhbGVuZGFyOiBUS0NhbGVuZGFyLCBkYXRlOiBEYXRlKTogdm9pZCB7XG4gICAgICAgIGxldCBuYXRpdmVEYXRlID0gdGhpcy5fb3duZXIuZ2V0KCkuZGF0ZVdpdGhvdXRIb3VycyhkYXRlKTtcbiAgICAgICAgbGV0IGFyZ3M6IGNvbW1vbk1vZHVsZS5DYWxlbmRhck5hdmlnYXRpb25FdmVudERhdGEgPSB7XG4gICAgICAgICAgICBldmVudE5hbWU6IGNvbW1vbk1vZHVsZS5SYWRDYWxlbmRhci5uYXZpZ2F0ZWRUb0RhdGVFdmVudCxcbiAgICAgICAgICAgIG9iamVjdDogdGhpcy5fb3duZXIuZ2V0KCksXG4gICAgICAgICAgICBkYXRlOiBuYXRpdmVEYXRlXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuX293bmVyLmdldCgpLmRpc3BsYXllZERhdGUgIT09IGFyZ3MuZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fb3duZXIuZ2V0KCkuZGlzcGxheWVkRGF0ZSA9IGFyZ3MuZGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX293bmVyLmdldCgpLm5vdGlmeShhcmdzKTtcbiAgICB9XG5cbiAgICBjYWxlbmRhcldpbGxOYXZpZ2F0ZVRvRGF0ZShjYWxlbmRhcjogVEtDYWxlbmRhciwgZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgICAgICBsZXQgbmF0aXZlRGF0ZSA9IHRoaXMuX293bmVyLmdldCgpLmRhdGVXaXRob3V0SG91cnMoZGF0ZSk7XG4gICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJOYXZpZ2F0aW9uRXZlbnREYXRhID0ge1xuICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkQ2FsZW5kYXIubmF2aWdhdGluZ1RvRGF0ZVN0YXJ0ZWRFdmVudCxcbiAgICAgICAgICAgIG9iamVjdDogdGhpcy5fb3duZXIuZ2V0KCksXG4gICAgICAgICAgICBkYXRlOiBuYXRpdmVEYXRlXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fb3duZXIuZ2V0KCkubm90aWZ5KGFyZ3MpO1xuICAgIH1cblxuICAgIGNhbGVuZGFyVXBkYXRlVmlzdWFsc0ZvckNlbGwoY2FsZW5kYXI6IFRLQ2FsZW5kYXIsIGNlbGw6IFRLQ2FsZW5kYXJDZWxsKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9vd25lci5nZXQoKSAmJiB0aGlzLl9vd25lci5nZXQoKS52aWV3TW9kZSkge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9vd25lci5nZXQoKS52aWV3TW9kZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJWaWV3TW9kZS5Nb250aC50b0xvd2VyQ2FzZSgpOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5TW9udGhWaWV3Q2VsbFN0eWxlcyhjZWxsKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJWaWV3TW9kZS5ZZWFyLnRvTG93ZXJDYXNlKCk6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlZZWFyVmlld0NlbGxTdHlsZXMoY2VsbCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuV2Vlay50b0xvd2VyQ2FzZSgpOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5V2Vla1ZpZXdDZWxsU3R5bGVzKGNlbGwpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclZpZXdNb2RlLkRheS50b0xvd2VyQ2FzZSgpOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5RGF5Vmlld0NlbGxTdHlsZXMoY2VsbCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuTW9udGhOYW1lcy50b0xvd2VyQ2FzZSgpOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5TW9udGhOYW1lc1ZpZXdDZWxsU3R5bGVzKGNlbGwpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXBwbHlXZWVrVmlld0NlbGxTdHlsZXMoY2VsbDogVEtDYWxlbmRhckNlbGwpIHtcbiAgICAgICAgaWYgKCh0aGlzLl9vd25lci5nZXQoKS52aWV3TW9kZSAhPT0gY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuV2VlaykgfHxcbiAgICAgICAgICAgICghdGhpcy5fb3duZXIuZ2V0KCkud2Vla1ZpZXdTdHlsZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2VsbCBpbnN0YW5jZW9mIFRLQ2FsZW5kYXJEYXlDZWxsKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5RGF5Q2VsbFN0eWxlVG9DZWxsKHRoaXMuX293bmVyLmdldCgpLndlZWtWaWV3U3R5bGUsIGNlbGwpO1xuICAgICAgICB9IGVsc2UgaWYgKGNlbGwgaW5zdGFuY2VvZiBUS0NhbGVuZGFyV2Vla051bWJlckNlbGwpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlXZWVrTnVtYmVyQ2VsbFN0eWxlVG9DZWxsKHRoaXMuX293bmVyLmdldCgpLndlZWtWaWV3U3R5bGUsIGNlbGwpO1xuICAgICAgICB9IGVsc2UgaWYgKGNlbGwgaW5zdGFuY2VvZiBUS0NhbGVuZGFyRGF5TmFtZUNlbGwpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlEYXlOYW1lQ2VsbFN0eWxlVG9DZWxsKHRoaXMuX293bmVyLmdldCgpLndlZWtWaWV3U3R5bGUsIGNlbGwpO1xuICAgICAgICB9IGVsc2UgaWYgKGNlbGwgaW5zdGFuY2VvZiBUS0NhbGVuZGFyVGl0bGVDZWxsKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5VGl0bGVDZWxsU3R5bGVUb0NlbGwodGhpcy5fb3duZXIuZ2V0KCkud2Vla1ZpZXdTdHlsZSwgY2VsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5RGF5Vmlld0NlbGxTdHlsZXMoY2VsbDogVEtDYWxlbmRhckNlbGwpIHtcbiAgICAgICAgaWYgKCh0aGlzLl9vd25lci5nZXQoKS52aWV3TW9kZSAhPT0gY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuRGF5KSB8fFxuICAgICAgICAgICAgKCF0aGlzLl9vd25lci5nZXQoKS5kYXlWaWV3U3R5bGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNlbGwgaW5zdGFuY2VvZiBUS0NhbGVuZGFyRGF5Q2VsbCkge1xuICAgICAgICAgICAgdGhpcy5hcHBseURheUNlbGxTdHlsZVRvQ2VsbCh0aGlzLl9vd25lci5nZXQoKS5kYXlWaWV3U3R5bGUsIGNlbGwpO1xuICAgICAgICB9IGVsc2UgaWYgKGNlbGwgaW5zdGFuY2VvZiBUS0NhbGVuZGFyV2Vla051bWJlckNlbGwpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlXZWVrTnVtYmVyQ2VsbFN0eWxlVG9DZWxsKHRoaXMuX293bmVyLmdldCgpLmRheVZpZXdTdHlsZSwgY2VsbCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2VsbCBpbnN0YW5jZW9mIFRLQ2FsZW5kYXJEYXlOYW1lQ2VsbCkge1xuICAgICAgICAgICAgdGhpcy5hcHBseURheU5hbWVDZWxsU3R5bGVUb0NlbGwodGhpcy5fb3duZXIuZ2V0KCkuZGF5Vmlld1N0eWxlLCBjZWxsKTtcbiAgICAgICAgfSBlbHNlIGlmIChjZWxsIGluc3RhbmNlb2YgVEtDYWxlbmRhclRpdGxlQ2VsbCkge1xuICAgICAgICAgICAgdGhpcy5hcHBseVRpdGxlQ2VsbFN0eWxlVG9DZWxsKHRoaXMuX293bmVyLmdldCgpLmRheVZpZXdTdHlsZSwgY2VsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5WWVhclZpZXdDZWxsU3R5bGVzKGNlbGw6IFRLQ2FsZW5kYXJDZWxsKSB7XG4gICAgICAgIGlmICgodGhpcy5fb3duZXIuZ2V0KCkudmlld01vZGUgIT09IGNvbW1vbk1vZHVsZS5DYWxlbmRhclZpZXdNb2RlLlllYXIpIHx8XG4gICAgICAgICAgICAoIXRoaXMuX293bmVyLmdldCgpLnllYXJWaWV3U3R5bGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBOT1RFOiBvbmx5IHRpdGxlIGNlbGwgaXMgc3R5bGVkIG9uIGRlbGVnYXRlIGNhbGwsIG1vbnRocyB1c2UgcHJlc2VudGVyIG1lbWJlcnNcbiAgICAgICAgaWYgKGNlbGwgaW5zdGFuY2VvZiBUS0NhbGVuZGFyVGl0bGVDZWxsKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5VGl0bGVDZWxsU3R5bGVUb0NlbGwodGhpcy5fb3duZXIuZ2V0KCkueWVhclZpZXdTdHlsZSwgY2VsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5TW9udGhOYW1lc1ZpZXdDZWxsU3R5bGVzKGNlbGw6IFRLQ2FsZW5kYXJDZWxsKSB7XG4gICAgICAgIGlmICgodGhpcy5fb3duZXIuZ2V0KCkudmlld01vZGUgIT09IGNvbW1vbk1vZHVsZS5DYWxlbmRhclZpZXdNb2RlLk1vbnRoTmFtZXMpIHx8XG4gICAgICAgICAgICAoIXRoaXMuX293bmVyLmdldCgpLm1vbnRoTmFtZXNWaWV3U3R5bGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2VsbCBpbnN0YW5jZW9mIFRLQ2FsZW5kYXJUaXRsZUNlbGwpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlUaXRsZUNlbGxTdHlsZVRvQ2VsbCh0aGlzLl9vd25lci5nZXQoKS5tb250aE5hbWVzVmlld1N0eWxlLCBjZWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjZWxsIGluc3RhbmNlb2YgVEtDYWxlbmRhck1vbnRoTmFtZUNlbGwpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlNb250aE5hbWVDZWxsU3R5bGVUb0NlbGwodGhpcy5fb3duZXIuZ2V0KCkubW9udGhOYW1lc1ZpZXdTdHlsZSwgY2VsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5TW9udGhWaWV3Q2VsbFN0eWxlcyhjZWxsOiBUS0NhbGVuZGFyQ2VsbCkge1xuICAgICAgICBpZiAoKHRoaXMuX293bmVyLmdldCgpLnZpZXdNb2RlICE9PSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJWaWV3TW9kZS5Nb250aCkgfHxcbiAgICAgICAgICAgICghdGhpcy5fb3duZXIuZ2V0KCkubW9udGhWaWV3U3R5bGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2VsbCBpbnN0YW5jZW9mIFRLQ2FsZW5kYXJEYXlDZWxsKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5RGF5Q2VsbFN0eWxlVG9DZWxsKHRoaXMuX293bmVyLmdldCgpLm1vbnRoVmlld1N0eWxlLCBjZWxsKTtcbiAgICAgICAgfSBlbHNlIGlmIChjZWxsIGluc3RhbmNlb2YgVEtDYWxlbmRhcldlZWtOdW1iZXJDZWxsKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5V2Vla051bWJlckNlbGxTdHlsZVRvQ2VsbCh0aGlzLl9vd25lci5nZXQoKS5tb250aFZpZXdTdHlsZSwgY2VsbCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2VsbCBpbnN0YW5jZW9mIFRLQ2FsZW5kYXJEYXlOYW1lQ2VsbCkge1xuICAgICAgICAgICAgdGhpcy5hcHBseURheU5hbWVDZWxsU3R5bGVUb0NlbGwodGhpcy5fb3duZXIuZ2V0KCkubW9udGhWaWV3U3R5bGUsIGNlbGwpO1xuICAgICAgICB9IGVsc2UgaWYgKGNlbGwgaW5zdGFuY2VvZiBUS0NhbGVuZGFyVGl0bGVDZWxsKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5VGl0bGVDZWxsU3R5bGVUb0NlbGwodGhpcy5fb3duZXIuZ2V0KCkubW9udGhWaWV3U3R5bGUsIGNlbGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJpYyBtZXRob2QgdGhhdCBhcHBsaWVzIHJlZ3VsYXIgZGF5IHN0eWxlIHRvIGNlbGwgb2YgZ2l2ZW4gdmlldyBtb2RlXG4gICAgICovXG4gICAgcHJpdmF0ZSBhcHBseURheUNlbGxTdHlsZVRvQ2VsbCh2aWV3TW9kZVN0eWxlOiBhbnksIGNlbGw6IFRLQ2FsZW5kYXJEYXlDZWxsKTogdm9pZCB7XG4gICAgICAgIGlmICghdmlld01vZGVTdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCh2aWV3TW9kZVN0eWxlIGluc3RhbmNlb2YgQ2FsZW5kYXJNb250aFZpZXdTdHlsZSB8fCB2aWV3TW9kZVN0eWxlIGluc3RhbmNlb2YgQ2FsZW5kYXJEYXlWaWV3U3R5bGUpICYmXG4gICAgICAgICAgICAoY2VsbC5zdGF0ZSAmIFRLQ2FsZW5kYXJEYXlTdGF0ZS5TZWxlY3RlZCkgIT09IDApIHtcbiAgICAgICAgICAgIGxldCB0eXBlZFN0eWxlID0gPENhbGVuZGFyTW9udGhWaWV3U3R5bGU+dmlld01vZGVTdHlsZTtcbiAgICAgICAgICAgIGxldCBzaGFwZVNpemUgPSB1dGlscy5sYXlvdXQudG9EZXZpY2VQaXhlbHModmlld01vZGVTdHlsZS5zZWxlY3Rpb25TaGFwZVNpemUpO1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlZFN0eWxlLnNlbGVjdGlvblNoYXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJTZWxlY3Rpb25TaGFwZS5Sb3VuZDpcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5zdHlsZSgpLnNoYXBlID0gVEtQcmVkZWZpbmVkU2hhcGUuc2hhcGVXaXRoVHlwZUFuZFNpemUoVEtTaGFwZVR5cGUuQ2lyY2xlLCBuZXcgQ0dTaXplKHsgd2lkdGg6IHNoYXBlU2l6ZSwgaGVpZ2h0OiBzaGFwZVNpemUgfSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclNlbGVjdGlvblNoYXBlLlNxdWFyZTpcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5zdHlsZSgpLnNoYXBlID0gVEtQcmVkZWZpbmVkU2hhcGUuc2hhcGVXaXRoVHlwZUFuZFNpemUoVEtTaGFwZVR5cGUuU3F1YXJlLCBuZXcgQ0dTaXplKHsgd2lkdGg6IHNoYXBlU2l6ZSwgaGVpZ2h0OiBzaGFwZVNpemUgfSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclNlbGVjdGlvblNoYXBlLk5vbmU6XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUoKS5zaGFwZSA9IFRLUHJlZGVmaW5lZFNoYXBlLnNoYXBlV2l0aFR5cGVBbmRTaXplKFRLU2hhcGVUeXBlLk5vbmUsIG5ldyBDR1NpemUoeyB3aWR0aDogc2hhcGVTaXplLCBoZWlnaHQ6IHNoYXBlU2l6ZSB9KSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZWRTdHlsZS5zZWxlY3Rpb25TaGFwZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgY2VsbC5zdHlsZSgpLnNoYXBlRmlsbCA9IG5ldyBUS1NvbGlkRmlsbCh0eXBlZFN0eWxlLnNlbGVjdGlvblNoYXBlQ29sb3IuaW9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0eWxlcyBhcHBsaWVkIGJ5IHByaW9yaXR5OiBzZWxlY3RlZCwgd2Vla2VuZCwgdG9kYXksIHJlZ3VsYXIgZGF5XG4gICAgICAgIGxldCBkYXlDZWxsU3R5bGUgPSBudWxsO1xuICAgICAgICBpZiAodmlld01vZGVTdHlsZS5zZWxlY3RlZERheUNlbGxTdHlsZSAmJlxuICAgICAgICAgICAgKGNlbGwuc3RhdGUgJiBUS0NhbGVuZGFyRGF5U3RhdGUuU2VsZWN0ZWQgfHwgY2VsbC5zdGF0ZSAmIFRLQ2FsZW5kYXJEYXlTdGF0ZS5NaWRJblNlbGVjdGlvbiB8fFxuICAgICAgICAgICAgICAgIGNlbGwuc3RhdGUgJiBUS0NhbGVuZGFyRGF5U3RhdGUuRmlyc3RJblNlbGVjdGlvbiB8fCBjZWxsLnN0YXRlICYgVEtDYWxlbmRhckRheVN0YXRlLkxhc3RJblNlbGVjdGlvbikpIHtcbiAgICAgICAgICAgIGRheUNlbGxTdHlsZSA9IHZpZXdNb2RlU3R5bGUuc2VsZWN0ZWREYXlDZWxsU3R5bGU7XG4gICAgICAgIH0gZWxzZSBpZiAoY2VsbC5zdGF0ZSAmIFRLQ2FsZW5kYXJEYXlTdGF0ZS5XZWVrZW5kICYmIHZpZXdNb2RlU3R5bGUud2Vla2VuZENlbGxTdHlsZSkge1xuICAgICAgICAgICAgZGF5Q2VsbFN0eWxlID0gdmlld01vZGVTdHlsZS53ZWVrZW5kQ2VsbFN0eWxlO1xuICAgICAgICB9IGVsc2UgaWYgKGNlbGwuc3RhdGUgJiBUS0NhbGVuZGFyRGF5U3RhdGUuVG9kYXkgJiYgdmlld01vZGVTdHlsZS50b2RheUNlbGxTdHlsZSkge1xuICAgICAgICAgICAgZGF5Q2VsbFN0eWxlID0gdmlld01vZGVTdHlsZS50b2RheUNlbGxTdHlsZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRheUNlbGxTdHlsZSA9IHZpZXdNb2RlU3R5bGUuZGF5Q2VsbFN0eWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkYXlDZWxsU3R5bGUpIHtcbiAgICAgICAgICAgIC8vIGFwcGx5IGRlZmF1bHQgdGhlbWUgc3R5bGUgaWYgdGhlcmUgaXMgbm90IGFueSBzdHlsZSBzZXRcbiAgICAgICAgICAgIGRheUNlbGxTdHlsZSA9IG5ldyBEYXlDZWxsU3R5bGUoKTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlDb21tb25DZWxsU3R5bGVQcm9wZXJ0aWVzKGNlbGwsIGRheUNlbGxTdHlsZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFwcGx5Q29tbW9uQ2VsbFN0eWxlUHJvcGVydGllcyhjZWxsLCBkYXlDZWxsU3R5bGUpO1xuXG4gICAgICAgIC8vIGFwcGx5IGRheSBzcGVjaWZpYyBwcm9wZXJ0aWVzXG4gICAgICAgIGlmIChkYXlDZWxsU3R5bGUgaW5zdGFuY2VvZiBEYXlDZWxsU3R5bGUpIHtcbiAgICAgICAgICAgIGNlbGwuc3R5bGUoKS5kaXNwbGF5RXZlbnRzQXNUZXh0ID0gZGF5Q2VsbFN0eWxlLmlvcy5kaXNwbGF5RXZlbnRzQXNUZXh0O1xuICAgICAgICAgICAgY2VsbC5zdHlsZSgpLmV2ZW50SW5zZXRzID0gZGF5Q2VsbFN0eWxlLmlvcy5ldmVudEluc2V0cztcbiAgICAgICAgICAgIGNlbGwuc3R5bGUoKS5ldmVudFRleHRDb2xvciA9IGRheUNlbGxTdHlsZS5pb3MuZXZlbnRUZXh0Q29sb3I7XG4gICAgICAgICAgICBjZWxsLnN0eWxlKCkuZXZlbnRGb250ID0gZGF5Q2VsbFN0eWxlLmlvcy5ldmVudEZvbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5VGl0bGVDZWxsU3R5bGVUb0NlbGwodmlld01vZGVTdHlsZTogYW55LCBjZWxsOiBUS0NhbGVuZGFyVGl0bGVDZWxsKTogdm9pZCB7XG4gICAgICAgIGlmICghdmlld01vZGVTdHlsZSB8fCAhdmlld01vZGVTdHlsZS50aXRsZUNlbGxTdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBwbHlDb21tb25DZWxsU3R5bGVQcm9wZXJ0aWVzKGNlbGwsIHZpZXdNb2RlU3R5bGUudGl0bGVDZWxsU3R5bGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwbHlEYXlOYW1lQ2VsbFN0eWxlVG9DZWxsKHZpZXdNb2RlU3R5bGU6IGFueSwgY2VsbDogVEtDYWxlbmRhckRheU5hbWVDZWxsKTogdm9pZCB7XG4gICAgICAgIGlmICghdmlld01vZGVTdHlsZSB8fCAhdmlld01vZGVTdHlsZS5kYXlOYW1lQ2VsbFN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcHBseUNvbW1vbkNlbGxTdHlsZVByb3BlcnRpZXMoY2VsbCwgdmlld01vZGVTdHlsZS5kYXlOYW1lQ2VsbFN0eWxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5TW9udGhOYW1lQ2VsbFN0eWxlVG9DZWxsKHZpZXdNb2RlU3R5bGU6IGFueSwgY2VsbDogVEtDYWxlbmRhck1vbnRoTmFtZUNlbGwpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF2aWV3TW9kZVN0eWxlIHx8ICF2aWV3TW9kZVN0eWxlLm1vbnRoTmFtZUNlbGxTdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBwbHlDb21tb25DZWxsU3R5bGVQcm9wZXJ0aWVzKGNlbGwsIHZpZXdNb2RlU3R5bGUubW9udGhOYW1lQ2VsbFN0eWxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5V2Vla051bWJlckNlbGxTdHlsZVRvQ2VsbCh2aWV3TW9kZVN0eWxlOiBhbnksIGNlbGw6IFRLQ2FsZW5kYXJXZWVrTnVtYmVyQ2VsbCk6IHZvaWQge1xuICAgICAgICBpZiAoIXZpZXdNb2RlU3R5bGUgfHwgIXZpZXdNb2RlU3R5bGUud2Vla051bWJlckNlbGxTdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBwbHlDb21tb25DZWxsU3R5bGVQcm9wZXJ0aWVzKGNlbGwsIHZpZXdNb2RlU3R5bGUud2Vla051bWJlckNlbGxTdHlsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBseUNvbW1vbkNlbGxTdHlsZVByb3BlcnRpZXMoY2VsbDogYW55LCBjZWxsU3R5bGU6IENlbGxTdHlsZSkge1xuICAgICAgICBpZiAoY2VsbCAmJiBjZWxsU3R5bGUpIHtcbiAgICAgICAgICAgIGlmIChjZWxsU3R5bGUuY2VsbEJhY2tncm91bmRDb2xvcikge1xuICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUoKS5iYWNrZ3JvdW5kQ29sb3IgPSBjZWxsU3R5bGUuaW9zLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2VsbC5zdHlsZSgpLmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcignIzAwMDAwMDAwJykuaW9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNlbGxTdHlsZS5jZWxsQm9yZGVyQ29sb3IpIHtcbiAgICAgICAgICAgICAgICBjZWxsLnN0eWxlKCkubGVmdEJvcmRlckNvbG9yID0gY2VsbFN0eWxlLmlvcy5sZWZ0Qm9yZGVyQ29sb3I7XG4gICAgICAgICAgICAgICAgY2VsbC5zdHlsZSgpLnJpZ2h0Qm9yZGVyQ29sb3IgPSBjZWxsU3R5bGUuaW9zLnJpZ2h0Qm9yZGVyQ29sb3I7XG4gICAgICAgICAgICAgICAgY2VsbC5zdHlsZSgpLnRvcEJvcmRlckNvbG9yID0gY2VsbFN0eWxlLmlvcy50b3BCb3JkZXJDb2xvcjtcbiAgICAgICAgICAgICAgICBjZWxsLnN0eWxlKCkuYm90dG9tQm9yZGVyQ29sb3IgPSBjZWxsU3R5bGUuaW9zLmJvdHRvbUJvcmRlckNvbG9yO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSBuZXcgQ29sb3IoJyMwMDAwMDAwMCcpO1xuICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUoKS5sZWZ0Qm9yZGVyQ29sb3IgPSBjb2xvci5pb3M7XG4gICAgICAgICAgICAgICAgY2VsbC5zdHlsZSgpLnJpZ2h0Qm9yZGVyQ29sb3IgPSBjb2xvci5pb3M7XG4gICAgICAgICAgICAgICAgY2VsbC5zdHlsZSgpLnRvcEJvcmRlckNvbG9yID0gY29sb3IuaW9zO1xuICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUoKS5ib3R0b21Cb3JkZXJDb2xvciA9IGNvbG9yLmlvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjZWxsU3R5bGUuY2VsbEJvcmRlcldpZHRoKSB7XG4gICAgICAgICAgICAgICAgY2VsbC5zdHlsZSgpLmxlZnRCb3JkZXJXaWR0aCA9IGNlbGxTdHlsZS5pb3MubGVmdEJvcmRlcldpZHRoO1xuICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUoKS5yaWdodEJvcmRlcldpZHRoID0gY2VsbFN0eWxlLmlvcy5yaWdodEJvcmRlcldpZHRoO1xuICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUoKS50b3BCb3JkZXJXaWR0aCA9IGNlbGxTdHlsZS5pb3MudG9wQm9yZGVyV2lkdGg7XG4gICAgICAgICAgICAgICAgY2VsbC5zdHlsZSgpLmJvdHRvbUJvcmRlcldpZHRoID0gY2VsbFN0eWxlLmlvcy5ib3R0b21Cb3JkZXJXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjZWxsU3R5bGUuY2VsbFRleHRDb2xvcikge1xuICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUoKS50ZXh0Q29sb3IgPSBjZWxsU3R5bGUuaW9zLnRleHRDb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjZWxsU3R5bGUuY2VsbFRleHRGb250TmFtZSB8fCBjZWxsU3R5bGUuY2VsbFRleHRGb250U3R5bGUgfHwgY2VsbFN0eWxlLmNlbGxUZXh0U2l6ZSkge1xuICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUoKS50ZXh0Rm9udCA9IGNlbGxTdHlsZS5pb3MudGV4dEZvbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2VsbFN0eWxlLmNlbGxQYWRkaW5nSG9yaXpvbnRhbCB8fCBjZWxsU3R5bGUuY2VsbFBhZGRpbmdWZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUoKS50ZXh0SW5zZXRzID0gY2VsbFN0eWxlLmlvcy50ZXh0SW5zZXRzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNlbGxTdHlsZS5jZWxsQWxpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgY2VsbC5zdHlsZSgpLnRleHRBbGlnbm1lbnQgPSBjZWxsU3R5bGUuaW9zLnRleHRBbGlnbm1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFZpZXdNb2RlRnJvbVRLQ2FsZW5kYXJWaWV3TW9kZSh2aWV3TW9kZTogVEtDYWxlbmRhclZpZXdNb2RlKTogY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUge1xuXG4gICAgICAgIHN3aXRjaCAodmlld01vZGUpIHtcbiAgICAgICAgICAgIC8vIGNhc2UgVEtDYWxlbmRhclZpZXdNb2RlLlRLQ2FsZW5kYXJWaWV3TW9kZUZsb3c6IHJldHVybiAgY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuRmxvdztcbiAgICAgICAgICAgIC8vIGNhc2UgVEtDYWxlbmRhclZpZXdNb2RlLlRLQ2FsZW5kYXJWaWV3TW9kZVllYXJOdW1iZXJzOiByZXR1cm4gPSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJWaWV3TW9kZS5ZZWFyTnVtYmVycztcbiAgICAgICAgICAgIGNhc2UgVEtDYWxlbmRhclZpZXdNb2RlLk1vbnRoOlxuICAgICAgICAgICAgICAgIHJldHVybiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJWaWV3TW9kZS5Nb250aDtcbiAgICAgICAgICAgIGNhc2UgVEtDYWxlbmRhclZpZXdNb2RlLk1vbnRoTmFtZXM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1vbk1vZHVsZS5DYWxlbmRhclZpZXdNb2RlLk1vbnRoTmFtZXM7XG4gICAgICAgICAgICBjYXNlIFRLQ2FsZW5kYXJWaWV3TW9kZS5XZWVrOlxuICAgICAgICAgICAgICAgIHJldHVybiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJWaWV3TW9kZS5XZWVrO1xuICAgICAgICAgICAgY2FzZSBUS0NhbGVuZGFyVmlld01vZGUuWWVhcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuWWVhcjtcbiAgICAgICAgICAgIGNhc2UgVEtDYWxlbmRhclZpZXdNb2RlLkRheTpcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuRGF5O1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuTW9udGg7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=