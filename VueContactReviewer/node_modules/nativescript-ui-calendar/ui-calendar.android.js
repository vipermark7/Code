"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var commonModule = require("./ui-calendar.common");
var utilsModule = require("tns-core-modules/utils/utils");
var color_1 = require("tns-core-modules/color");
var observable_array_1 = require("tns-core-modules/data/observable-array");
__export(require("./ui-calendar.common"));
var CalendarEvent = /** @class */ (function (_super) {
    __extends(CalendarEvent, _super);
    function CalendarEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CalendarEvent.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.calendar.events.Event("default", new Date(1990, 0, 1).getTime(), new Date(1990, 0, 2).getTime());
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    CalendarEvent.prototype._setIsAllDay = function (value) {
        this.android.setAllDay(value);
    };
    CalendarEvent.prototype._getIsAllDay = function () {
        return this.android.isAllDay();
    };
    CalendarEvent.prototype._setEndDate = function (date) {
        this.android.setEndDate(date.getTime());
    };
    CalendarEvent.prototype._getEndDate = function () {
        return new Date(this.android.getEndDate());
    };
    CalendarEvent.prototype._setStartDate = function (date) {
        this.android.setStartDate(date.getTime());
    };
    CalendarEvent.prototype._getStartDate = function () {
        return new Date(this.android.getStartDate());
    };
    CalendarEvent.prototype._setTitle = function (value) {
        this.android.setTitle(value);
    };
    CalendarEvent.prototype._getTitle = function () {
        return this.android.getTitle();
    };
    CalendarEvent.prototype._setEventColor = function (value) {
        this.android.setEventColor(value.argb);
    };
    CalendarEvent.prototype._getEventColor = function () {
        return new color_1.Color(this.android.getEventColor());
    };
    return CalendarEvent;
}(commonModule.CalendarEvent));
exports.CalendarEvent = CalendarEvent;
/**
 * Helper methods
 */
var Tool = /** @class */ (function () {
    function Tool() {
    }
    Tool.createTypeface = function (name, style) {
        var fontStyle = android.graphics.Typeface.NORMAL;
        if (style) {
            switch (style) {
                case commonModule.CalendarFontStyle.Bold:
                    fontStyle = android.graphics.Typeface.BOLD;
                    break;
                case commonModule.CalendarFontStyle.Italic:
                    fontStyle = android.graphics.Typeface.ITALIC;
                    break;
                case commonModule.CalendarFontStyle.BoldItalic:
                    fontStyle = android.graphics.Typeface.BOLD_ITALIC;
                    break;
            }
        }
        if (name) {
            return android.graphics.Typeface.create(name, fontStyle);
        }
        return android.graphics.Typeface.create(android.graphics.Typeface.DEFAULT, fontStyle);
    };
    return Tool;
}());
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          STYLES FOR DIFFERENT CELL TYPES
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Enum values identify to what type of cells is related the style object
 */
var CellStyleType;
(function (CellStyleType) {
    CellStyleType[CellStyleType["RegularDayStyle"] = 0] = "RegularDayStyle";
    CellStyleType[CellStyleType["SelectedDayStyle"] = 1] = "SelectedDayStyle";
    CellStyleType[CellStyleType["TodayStyle"] = 2] = "TodayStyle";
    CellStyleType[CellStyleType["WeekNumberStyle"] = 3] = "WeekNumberStyle";
    CellStyleType[CellStyleType["WeekendStyle"] = 4] = "WeekendStyle";
    CellStyleType[CellStyleType["DayNameStyle"] = 5] = "DayNameStyle";
    CellStyleType[CellStyleType["TitleStyle"] = 6] = "TitleStyle";
    CellStyleType[CellStyleType["MonthNameStyle"] = 7] = "MonthNameStyle"; // cell for month name in compact Year view mode
})(CellStyleType = exports.CellStyleType || (exports.CellStyleType = {}));
var CellStyleInitializer = /** @class */ (function () {
    function CellStyleInitializer() {
    }
    CellStyleInitializer.prototype.applyStyle = function (value) {
        this.changeCellBorderWidth(value.cellBorderWidth, value);
        this.changeCellBorderColor(value.cellBorderColor, value);
        this.changeCellBackgroundColor(value.cellBackgroundColor, value);
        this.changeCellAlignment(value.cellAlignment, value);
        this.changeCellPaddingHorizontal(value.cellPaddingHorizontal, value);
        this.changeCellPaddingVertical(value.cellPaddingVertical, value);
        this.changeCellTextColor(value.cellTextColor, value);
        this.changeCellTextFontName(value.cellTextFontName, value);
        this.changeCellTextFontStyle(value.cellTextFontStyle, value);
        this.changeCellTextSize(value.cellTextSize, value);
        value.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellBorderWidth = function (value, style) {
        if (isNaN(value)) {
            return;
        }
        var borderWidth = new java.lang.Float(value * utilsModule.layout.getDisplayDensity());
        style.android.setBorderWidth(borderWidth);
    };
    CellStyleInitializer.prototype.onCellBorderWidthChanged = function (value, style) {
        this.changeCellBorderWidth(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellBorderColor = function (value, style) {
        if (!value) {
            return;
        }
        var color = value.argb;
        var borderColor = new java.lang.Integer(color);
        style.android.setBorderColor(borderColor);
    };
    CellStyleInitializer.prototype.onCellBorderColorChanged = function (value, style) {
        this.changeCellBorderColor(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellBackgroundColor = function (value, style) {
        if (!value) {
            return;
        }
        var color = value.argb;
        var backgroundColor = new java.lang.Integer(color);
        style.android.setBackgroundColor(backgroundColor);
    };
    CellStyleInitializer.prototype.onCellBackgroundColorChanged = function (value, style) {
        this.changeCellBackgroundColor(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellAlignment = function (value, style) {
        if (!value) {
            return;
        }
        var position;
        switch (value) {
            case commonModule.CalendarCellAlignment.Bottom:
                position = com.telerik.widget.calendar.CalendarElement.BOTTOM;
                break;
            case commonModule.CalendarCellAlignment.Top:
                position = com.telerik.widget.calendar.CalendarElement.TOP;
                break;
            case commonModule.CalendarCellAlignment.Left:
                position = com.telerik.widget.calendar.CalendarElement.LEFT;
                break;
            case commonModule.CalendarCellAlignment.Right:
                position = com.telerik.widget.calendar.CalendarElement.RIGHT;
                break;
            case commonModule.CalendarCellAlignment.HorizontalCenter:
                position = com.telerik.widget.calendar.CalendarElement.CENTER_HORIZONTAL;
                break;
            case commonModule.CalendarCellAlignment.VerticalCenter:
                position = com.telerik.widget.calendar.CalendarElement.CENTER_VERTICAL;
                break;
            default:
                position = com.telerik.widget.calendar.CalendarElement.CENTER;
        }
        var positionValue = new java.lang.Integer(position);
        style.android.setTextPosition(positionValue);
    };
    CellStyleInitializer.prototype.onCellAlignmentChanged = function (value, style) {
        this.changeCellAlignment(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellPaddingHorizontal = function (value, style) {
        if (isNaN(value)) {
            return;
        }
        var paddingVal = value * utilsModule.layout.getDisplayDensity();
        var padding = new java.lang.Integer(paddingVal);
        style.android.setPaddingHorizontal(padding);
    };
    CellStyleInitializer.prototype.onCellPaddingHorizontalChanged = function (value, style) {
        this.changeCellPaddingHorizontal(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellPaddingVertical = function (value, style) {
        if (isNaN(value)) {
            return;
        }
        var paddingVal = value * utilsModule.layout.getDisplayDensity();
        var padding = new java.lang.Integer(paddingVal);
        style.android.setPaddingVertical(padding);
    };
    CellStyleInitializer.prototype.onCellPaddingVerticalChanged = function (value, style) {
        this.changeCellPaddingVertical(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellTextColor = function (value, style) {
        if (!value) {
            return;
        }
        var color = value.argb;
        var textColor = new java.lang.Integer(color);
        style.android.setTextColor(textColor);
    };
    CellStyleInitializer.prototype.onCellTextColorChanged = function (value, style) {
        this.changeCellTextColor(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellTextFontName = function (value, style) {
        if (!value) {
            return;
        }
        var font = Tool.createTypeface(value, style.cellTextFontStyle);
        style.android.setFontName(value);
    };
    CellStyleInitializer.prototype.onCellTextFontNameChanged = function (value, style) {
        this.changeCellTextFontName(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellTextFontStyle = function (value, style) {
        if (!value) {
            return;
        }
        var font = Tool.createTypeface(style.cellTextFontName, value);
        var fontStyle = new java.lang.Integer(font.getStyle());
        style.android.setFontStyle(fontStyle);
    };
    CellStyleInitializer.prototype.onCellTextFontStyleChanged = function (value, style) {
        this.changeCellTextFontStyle(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellTextSize = function (value, style) {
        if (isNaN(value)) {
            return;
        }
        var size = value * utilsModule.layout.getDisplayDensity();
        var textSize = new java.lang.Float(size);
        style.android.setTextSize(textSize);
    };
    CellStyleInitializer.prototype.onCellTextSizeChanged = function (value, style) {
        this.changeCellTextSize(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.makeDayCellFilter = function (cellStyleType, displayMode) {
        var cellFilter = new com.telerik.widget.calendar.CalendarDayCellFilter();
        var positiveFilter = new java.lang.Boolean(true);
        switch (cellStyleType) {
            case CellStyleType.TodayStyle:
                cellFilter.setIsToday(positiveFilter);
            case CellStyleType.RegularDayStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.Date);
                break;
            case CellStyleType.WeekendStyle:
                cellFilter.setIsWeekend(positiveFilter);
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.Date);
                break;
            case CellStyleType.DayNameStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.DayName);
                break;
            case CellStyleType.WeekNumberStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.WeekNumber);
                break;
            case CellStyleType.TitleStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.Title);
                break;
            case CellStyleType.SelectedDayStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.Date);
                cellFilter.setIsSelected(positiveFilter);
                break;
        }
        if (displayMode) {
            cellFilter.setCalendarDisplayMode(displayMode);
        }
        return cellFilter;
    };
    CellStyleInitializer.prototype.makeMonthCellFilter = function () {
        var cellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
        var positiveFilter = new java.lang.Boolean(true);
        cellFilter.setMonthIsCompact(positiveFilter);
        return cellFilter;
    };
    return CellStyleInitializer;
}());
exports.CellStyleInitializer = CellStyleInitializer;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var CellStyle = /** @class */ (function (_super) {
    __extends(CellStyle, _super);
    function CellStyle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._nativeIsYear = false;
        return _this;
    }
    Object.defineProperty(CellStyle.prototype, "nativeIsYear", {
        set: function (value) {
            if (this._nativeIsYear !== value) {
                this._nativeIsYear = value;
                this._android = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(CellStyle.prototype, "android", {
        get: function () {
            if (!this._android) {
                if (this._nativeIsYear) {
                    this._android = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                    this.initializer.applyStyle(this);
                }
                else {
                    this._android = new com.telerik.widget.calendar.CalendarDayCellStyle();
                }
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    CellStyle.prototype.updateNativeStyleFilters = function (cellStyleType, displayMode) {
        if (!this._owner) {
            return;
        }
        if (this._nativeIsYear) {
            var filter = this.initializer.makeMonthCellFilter();
            this.android.setFilter(filter);
        }
        else {
            var filter = this.initializer.makeDayCellFilter(cellStyleType, displayMode);
            this.android.setFilter(filter);
        }
    };
    CellStyle.prototype.onStyleChanged = function () {
        if (this._owner) {
            this._owner.updateCalendar();
        }
    };
    CellStyle.prototype.onCellBorderWidthChanged = function (oldValue, newValue) {
        this.initializer.onCellBorderWidthChanged(newValue, this);
    };
    CellStyle.prototype.onCellBorderColorChanged = function (oldValue, newValue) {
        this.initializer.onCellBorderColorChanged(newValue, this);
    };
    CellStyle.prototype.onCellBackgroundColorChanged = function (oldValue, newValue) {
        this.initializer.onCellBackgroundColorChanged(newValue, this);
    };
    CellStyle.prototype.onCellTextColorChanged = function (oldValue, newValue) {
        this.initializer.onCellTextColorChanged(newValue, this);
    };
    CellStyle.prototype.onCellTextFontNameChanged = function (oldValue, newValue) {
        this.initializer.onCellTextFontNameChanged(newValue, this);
    };
    CellStyle.prototype.onCellTextFontStyleChanged = function (oldValue, newValue) {
        this.initializer.onCellTextFontStyleChanged(newValue, this);
    };
    CellStyle.prototype.onCellTextSizeChanged = function (oldValue, newValue) {
        this.initializer.onCellTextSizeChanged(newValue, this);
    };
    CellStyle.prototype.onCellPaddingHorizontalChanged = function (oldValue, newValue) {
        this.initializer.onCellPaddingHorizontalChanged(newValue, this);
    };
    CellStyle.prototype.onCellPaddingVerticalChanged = function (oldValue, newValue) {
        this.initializer.onCellPaddingVerticalChanged(newValue, this);
    };
    CellStyle.prototype.onCellAlignmentChanged = function (oldValue, newValue) {
        this.initializer.onCellAlignmentChanged(newValue, this);
    };
    return CellStyle;
}(commonModule.CellStyle));
exports.CellStyle = CellStyle;
var DayEventsViewStyle = /** @class */ (function (_super) {
    __extends(DayEventsViewStyle, _super);
    function DayEventsViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DayEventsViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            this.applyStyles();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayEventsViewStyle.prototype, "android", {
        get: function () {
            if (!this._owner) {
                return null;
            }
            return this._owner.getDayView().getDayEventsViewStyle();
        },
        enumerable: true,
        configurable: true
    });
    DayEventsViewStyle.prototype.applyStyles = function () {
        if (this.backgroundColor) {
            this.changeBackgroundColor(null, this.backgroundColor);
        }
        if (this.timeLabelFormat) {
            this.changeTimeLabelFormat(null, this.timeLabelFormat);
        }
        if (this.timeLabelTextColor) {
            this.changeTimeLabelTextColor(null, this.timeLabelTextColor);
        }
        if (this.timeLabelTextSize) {
            this.changeTimeLabelTextSize(null, this.timeLabelTextSize);
        }
        if (this.timeLinesWidth) {
            this.changeTimeLinesWidth(null, this.timeLinesWidth);
        }
        if (this.timeLinesColor) {
            this.changeTimeLinesColor(null, this.timeLinesColor);
        }
    };
    DayEventsViewStyle.prototype.onBackgroundColorChanged = function (oldValue, newValue) {
        this.changeBackgroundColor(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.changeBackgroundColor = function (oldValue, newValue) {
        if (newValue && this.android) {
            this.android.setBackgroundColor(newValue.android);
        }
    };
    DayEventsViewStyle.prototype.onTimeLabelFormatChanged = function (oldValue, newValue) {
        this.changeTimeLabelFormat(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.changeTimeLabelFormat = function (oldValue, newValue) {
        if (this.android) {
            this.android.setTimeLabelFormat(new java.text.SimpleDateFormat(newValue));
        }
    };
    DayEventsViewStyle.prototype.onTimeLabelTextColorChanged = function (oldValue, newValue) {
        this.changeTimeLabelTextColor(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.changeTimeLabelTextColor = function (oldValue, newValue) {
        if (newValue && this.android) {
            this.android.setTimeLabelColor(newValue.android);
        }
    };
    DayEventsViewStyle.prototype.onTimeLabelTextSizeChanged = function (oldValue, newValue) {
        this.changeTimeLabelTextSize(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.changeTimeLabelTextSize = function (oldValue, newValue) {
        if (this.android) {
            this.android.setTimeLabelTextSize(newValue * utilsModule.layout.getDisplayDensity());
        }
    };
    DayEventsViewStyle.prototype.onTimeLinesWidthChanged = function (oldValue, newValue) {
        this.changeTimeLinesWidth(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.changeTimeLinesWidth = function (oldValue, newValue) {
        if (this.android) {
            this.android.setTimeLinesWidth(newValue * utilsModule.layout.getDisplayDensity());
        }
    };
    DayEventsViewStyle.prototype.onTimeLinesColorChanged = function (oldValue, newValue) {
        this.changeTimeLinesColor(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.changeTimeLinesColor = function (oldValue, newValue) {
        if (newValue && this.android) {
            this.android.setTimeLinesColor(newValue.android);
        }
    };
    return DayEventsViewStyle;
}(commonModule.DayEventsViewStyle));
exports.DayEventsViewStyle = DayEventsViewStyle;
var AllDayEventsViewStyle = /** @class */ (function (_super) {
    __extends(AllDayEventsViewStyle, _super);
    function AllDayEventsViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AllDayEventsViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            this.applyStyles();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AllDayEventsViewStyle.prototype, "android", {
        get: function () {
            if (!this._owner) {
                return null;
            }
            return this._owner.getDayView().getAllDayEventsViewStyle();
        },
        enumerable: true,
        configurable: true
    });
    AllDayEventsViewStyle.prototype.applyStyles = function () {
        if (this.backgroundColor) {
            this.changeBackgroundColor(null, this.backgroundColor);
        }
        if (this.allDayText !== AllDayEventsViewStyle.ALL_DAY_TEXT) {
            this.changeAllDayText(AllDayEventsViewStyle.ALL_DAY_TEXT, this.allDayText);
        }
        if (this.allDayTextIsVisible !== undefined) {
            this.changeAllDayTextIsVisible(null, this.allDayTextIsVisible);
        }
    };
    AllDayEventsViewStyle.prototype.onBackgroundColorChanged = function (oldValue, newValue) {
        this.changeBackgroundColor(oldValue, newValue);
    };
    AllDayEventsViewStyle.prototype.changeBackgroundColor = function (oldValue, newValue) {
        if (newValue && this.android) {
            this.android.setBackgroundColor(newValue.android);
        }
    };
    AllDayEventsViewStyle.prototype.onAllDayTextChanged = function (oldValue, newValue) {
        this.changeAllDayText(oldValue, newValue);
    };
    AllDayEventsViewStyle.prototype.changeAllDayText = function (oldValue, newValue) {
        if (this.android) {
            this.android.setAllDayText(newValue);
        }
    };
    AllDayEventsViewStyle.prototype.onAllDayTextIsVisibleChanged = function (oldValue, newValue) {
        this.changeAllDayTextIsVisible(oldValue, newValue);
    };
    AllDayEventsViewStyle.prototype.changeAllDayTextIsVisible = function (oldValue, newValue) {
        if (this.android) {
            this.android.setAllDayTextIsVisible(newValue);
        }
    };
    return AllDayEventsViewStyle;
}(commonModule.AllDayEventsViewStyle));
exports.AllDayEventsViewStyle = AllDayEventsViewStyle;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var DayCellStyle = /** @class */ (function (_super) {
    __extends(DayCellStyle, _super);
    function DayCellStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DayCellStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayCellStyle.prototype, "eventAdapter", {
        set: function (value) {
            this._eventAdapter = value;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(DayCellStyle.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.calendar.CalendarDayCellStyle();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    DayCellStyle.prototype.updateNativeStyleFilters = function (cellStyleType, displayMode) {
        if (!this._owner) {
            return;
        }
        var filter = this.initializer.makeDayCellFilter(cellStyleType, displayMode);
        this.android.setFilter(filter);
    };
    DayCellStyle.prototype.onCellBorderWidthChanged = function (oldValue, newValue) {
        this.initializer.onCellBorderWidthChanged(newValue, this);
    };
    DayCellStyle.prototype.onCellBorderColorChanged = function (oldValue, newValue) {
        this.initializer.onCellBorderColorChanged(newValue, this);
    };
    DayCellStyle.prototype.onCellBackgroundColorChanged = function (oldValue, newValue) {
        this.initializer.onCellBackgroundColorChanged(newValue, this);
    };
    DayCellStyle.prototype.onCellTextColorChanged = function (oldValue, newValue) {
        this.initializer.onCellTextColorChanged(newValue, this);
    };
    DayCellStyle.prototype.onCellTextFontNameChanged = function (oldValue, newValue) {
        this.initializer.onCellTextFontNameChanged(newValue, this);
    };
    DayCellStyle.prototype.onCellTextFontStyleChanged = function (oldValue, newValue) {
        this.initializer.onCellTextFontStyleChanged(newValue, this);
    };
    DayCellStyle.prototype.onCellTextSizeChanged = function (oldValue, newValue) {
        this.initializer.onCellTextSizeChanged(newValue, this);
    };
    DayCellStyle.prototype.onCellPaddingHorizontalChanged = function (oldValue, newValue) {
        this.initializer.onCellPaddingHorizontalChanged(newValue, this);
    };
    DayCellStyle.prototype.onCellPaddingVerticalChanged = function (oldValue, newValue) {
        this.initializer.onCellPaddingVerticalChanged(newValue, this);
    };
    DayCellStyle.prototype.onCellAlignmentChanged = function (oldValue, newValue) {
        this.initializer.onCellAlignmentChanged(newValue, this);
    };
    DayCellStyle.prototype.onStyleChanged = function () {
        if (this._owner) {
            this._owner.updateCalendar();
        }
    };
    // day cell specific properties
    DayCellStyle.prototype.onShowEventsTextChanged = function (oldValue, newValue) {
        if (newValue === undefined || newValue == null || !this.eventAdapter) {
            return;
        }
        this.eventAdapter.getRenderer().setEventRenderMode(newValue ? com.telerik.widget.calendar.events.EventRenderMode.Shape_And_Text : com.telerik.widget.calendar.events.EventRenderMode.Shape);
    };
    DayCellStyle.prototype.onEventTextColorChanged = function (oldValue, newValue) {
        if (!newValue || !this.eventAdapter) {
            return;
        }
        // TODO: Event text color property not supported in Android.
    };
    DayCellStyle.prototype.onEventFontNameChanged = function (oldValue, newValue) {
        if (!newValue || !this.eventAdapter) {
            return;
        }
        // TODO: Event font name property not supported in Android.
    };
    DayCellStyle.prototype.onEventFontStyleChanged = function (oldValue, newValue) {
        if (!newValue || !this.eventAdapter) {
            return;
        }
        // TODO: Event font style property not supported in Android.
    };
    DayCellStyle.prototype.onEventTextSizeChanged = function (oldValue, newValue) {
        if (isNaN(newValue) || !this.eventAdapter) {
            return;
        }
        this.eventAdapter.getRenderer().setEventTextSize(newValue * utilsModule.layout.getDisplayDensity());
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
    Object.defineProperty(MonthCellStyle.prototype, "regularDayStyle", {
        get: function () {
            if (!this._regularDayStyle) {
                this._regularDayStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                var dateMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
                var positiveFilter = new java.lang.Boolean(true);
                dateMonthCellFilter.setTextIsDate(positiveFilter);
                this._regularDayStyle.setFilter(dateMonthCellFilter);
            }
            return this._regularDayStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthCellStyle.prototype, "weekendStyle", {
        get: function () {
            if (!this._weekendStyle) {
                this._weekendStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                var weekendMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
                var positiveFilter = new java.lang.Boolean(true);
                weekendMonthCellFilter.setTextIsWeekend(positiveFilter);
                this._weekendStyle.setFilter(weekendMonthCellFilter);
            }
            return this._weekendStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthCellStyle.prototype, "todayStyle", {
        get: function () {
            if (!this._todayStyle) {
                this._todayStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                var todayMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
                var positiveFilter = new java.lang.Boolean(true);
                todayMonthCellFilter.setTextIsToday(positiveFilter);
                this._todayStyle.setFilter(todayMonthCellFilter);
            }
            return this._todayStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthCellStyle.prototype, "dayNameStyle", {
        get: function () {
            if (!this._dayNameStyle) {
                this._dayNameStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                var dayNameMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
                var positiveFilter = new java.lang.Boolean(true);
                dayNameMonthCellFilter.setTextIsDayName(positiveFilter);
                this._dayNameStyle.setFilter(dayNameMonthCellFilter);
            }
            return this._dayNameStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthCellStyle.prototype, "monthNameStyle", {
        get: function () {
            if (!this._monthNameStyle) {
                this._monthNameStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                var monthNameMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
                var positiveFilter = new java.lang.Boolean(true);
                monthNameMonthCellFilter.setTextIsMonthName(positiveFilter);
                this._monthNameStyle.setFilter(monthNameMonthCellFilter);
            }
            return this._monthNameStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthCellStyle.prototype, "monthCellStyle", {
        get: function () {
            if (!this._monthCellStyle) {
                this._monthCellStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
            }
            return this._monthCellStyle;
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.onStyleChanged = function () {
        if (this.owner && this.owner.getDisplayMode() === com.telerik.widget.calendar.CalendarDisplayMode.Year) {
            this.owner.updateCalendar();
        }
    };
    MonthCellStyle.prototype.onWeekendTextColorChanged = function (oldValue, newValue) {
        if (newValue) {
            var color = newValue.argb;
            var textColor = new java.lang.Integer(color);
            this.weekendStyle.setTextColor(textColor);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onTodayTextColorChanged = function (oldValue, newValue) {
        if (newValue) {
            var color = newValue.argb;
            var textColor = new java.lang.Integer(color);
            this.todayStyle.setTextColor(textColor);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayTextColorChanged = function (oldValue, newValue) {
        if (newValue) {
            var color = newValue.argb;
            var textColor = new java.lang.Integer(color);
            this.regularDayStyle.setTextColor(textColor);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayFontNameChanged = function (oldValue, newValue) {
        if (newValue) {
            this.regularDayStyle.setFontName(newValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayFontStyleChanged = function (oldValue, newValue) {
        if (newValue) {
            var font = Tool.createTypeface(this.dayFontName, newValue);
            var fontStyle = new java.lang.Integer(font.getStyle());
            this.regularDayStyle.setFontStyle(fontStyle);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayTextSizeChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue)) {
            var size = newValue * utilsModule.layout.getDisplayDensity();
            var sizeValue = new java.lang.Float(size);
            this.regularDayStyle.setTextSize(sizeValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayNameTextColorChanged = function (oldValue, newValue) {
        if (newValue) {
            var color = newValue.argb;
            var colorValue = new java.lang.Integer(color);
            this.dayNameStyle.setTextColor(colorValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayNameFontNameChanged = function (oldValue, newValue) {
        if (newValue) {
            this.dayNameStyle.setFontName(newValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayNameFontStyleChanged = function (oldValue, newValue) {
        if (newValue) {
            var font = Tool.createTypeface(this.dayNameFontName, newValue);
            var fontStyle = new java.lang.Integer(font.getStyle());
            this.dayNameStyle.setFontStyle(fontStyle);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayNameTextSizeChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue)) {
            var size = newValue * utilsModule.layout.getDisplayDensity();
            var sizeValue = new java.lang.Float(size);
            this.dayNameStyle.setTextSize(sizeValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onMonthNameTextColorChanged = function (oldValue, newValue) {
        if (newValue) {
            var color = newValue.argb;
            var colorValue = new java.lang.Integer(color);
            this.monthNameStyle.setTextColor(colorValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onMonthNameFontNameChanged = function (oldValue, newValue) {
        if (newValue) {
            this.monthNameStyle.setFontName(newValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onMonthNameFontStyleChanged = function (oldValue, newValue) {
        if (newValue) {
            var font = Tool.createTypeface(this.monthNameFontName, newValue);
            var fontStyle = new java.lang.Integer(font.getStyle());
            this.monthNameStyle.setFontStyle(fontStyle);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onMonthNameTextSizeChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue)) {
            var size = newValue * utilsModule.layout.getDisplayDensity();
            var sizeValue = new java.lang.Float(size);
            this.monthNameStyle.setTextSize(sizeValue);
            this.onStyleChanged();
        }
    };
    return MonthCellStyle;
}(commonModule.MonthCellStyle));
exports.MonthCellStyle = MonthCellStyle;
/**
 * Cell style class for inline events cells in month view
 */
var InlineEventCellStyle = /** @class */ (function (_super) {
    __extends(InlineEventCellStyle, _super);
    function InlineEventCellStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InlineEventCellStyle.prototype.apply = function (adapter) {
        if (!adapter) {
            return;
        }
        this._adapter = adapter;
        var color;
        if (this.cellBackgroundColor) {
            color = this.cellBackgroundColor.argb;
            this._adapter.setInlineEventsBackgroundColor(color);
        }
        if (this.eventTextColor) {
            // TODO: Text color for inline event is not supported for Android calendar.
        }
        if (this.eventFontName) {
            // TODO: Font name property for inline event text is not supported for Android calendar.
        }
        if (this.eventFontStyle) {
            // TODO: Font style property for inline event text is not supported for Android calendar.
        }
        if (!isNaN(this.eventTextSize)) {
            this._adapter.setInlineEventTitleTextSize(this.eventTextSize);
        }
        if (this.timeTextColor) {
            var color_2 = this.timeTextColor.argb;
            this._adapter.setInlineEventTimeStartTextColor(color_2);
            this._adapter.setInlineEventTimeEndTextColor(color_2);
        }
        if (this.timeFontName) {
            // TODO: Font name property for for inline event date/time is not supported for Android calendar.
        }
        if (this.timeFontStyle) {
            // TODO: Font style property for for inline event date/time is not supported for Android calendar.
        }
        if (this.timeTextSize) {
            if (!isNaN(+this.timeTextSize)) {
                // NOTE: these methods don't require display density to be taken account
                this._adapter.setInlineEventTimeEndTextSize(this.timeTextSize);
                this._adapter.setInlineEventTimeStartTextSize(this.timeTextSize);
            }
        }
    };
    InlineEventCellStyle.prototype.onCellBackgroundColorChanged = function (oldValue, newValue) {
        if (newValue && this._adapter) {
            var color = newValue.argb;
            this._adapter.setInlineEventsBackgroundColor(color);
        }
    };
    InlineEventCellStyle.prototype.onEventTextColorChanged = function (oldValue, newValue) {
        // TODO: console.log("WARNING: Text color for inline event is not supported for Android calendar.")
    };
    InlineEventCellStyle.prototype.onEventFontNameChanged = function (oldValue, newValue) {
        // TODO: console.log("WARNING: Font name property for inline event text is not supported for Android calendar.")
    };
    InlineEventCellStyle.prototype.onEventFontStyleChanged = function (oldValue, newValue) {
        // TODO: console.log("WARNING: Font style property for inline event text is not supported for Android calendar.")
    };
    InlineEventCellStyle.prototype.onEventTextSizeChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue) && this._adapter) {
            this._adapter.setInlineEventTitleTextSize(newValue);
        }
    };
    InlineEventCellStyle.prototype.onTimeTextColorChanged = function (oldValue, newValue) {
        if (newValue && this._adapter) {
            var color = newValue.argb;
            this._adapter.setInlineEventTimeStartTextColor(color);
            this._adapter.setInlineEventTimeEndTextColor(color);
        }
    };
    InlineEventCellStyle.prototype.onTimeFontNameChanged = function (oldValue, newValue) {
        // TODO: console.log("WARNING: Font name property for for inline event date/time is not supported for Android calendar.")
    };
    InlineEventCellStyle.prototype.onTimeFontStyleChanged = function (oldValue, newValue) {
        // TODO: console.log("WARNING: Font style property for for inline event date/time is not supported for Android calendar.")
    };
    InlineEventCellStyle.prototype.onTimeTextSizeChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue) && this._adapter) {
            // NOTE: these methods don't require display density to be taken account
            this._adapter.setInlineEventTimeEndTextSize(newValue);
            this._adapter.setInlineEventTimeStartTextSize(newValue);
        }
    };
    return InlineEventCellStyle;
}(commonModule.InlineEventCellStyle));
exports.InlineEventCellStyle = InlineEventCellStyle;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          STYLES FOR DIFFERENT VIEW MODES
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var CalendarStyleInitializer = /** @class */ (function () {
    function CalendarStyleInitializer() {
    }
    CalendarStyleInitializer.prototype.updateNativeStyles = function (style) {
        if (!style._owner || !style._owner._nativeView) {
            return;
        }
        if (style.backgroundColor) {
            var color = style.backgroundColor.argb;
            style._owner._nativeView.setBackgroundColor(color);
        }
        if (style.showDayNames !== undefined && style.showDayNames != null) {
            style._owner._nativeView.setShowDayNames(style.showDayNames);
        }
        if (style.showTitle !== undefined && style.showTitle != null) {
            style._owner._nativeView.setShowTitle(style.showTitle);
        }
        if (style.showWeekNumbers !== undefined && style.showWeekNumbers != null) {
            style._owner._nativeView.setWeekNumbersDisplayMode(style.showWeekNumbers ? com.telerik.widget.calendar.WeekNumbersDisplayMode.Block : com.telerik.widget.calendar.WeekNumbersDisplayMode.None);
        }
        if (style.dayCellStyle) {
            style.prepareNativeStyle(style.dayCellStyle, CellStyleType.RegularDayStyle);
            style._owner._nativeView.addDayCellStyle(style.dayCellStyle.android);
        }
        if (style.weekendCellStyle) {
            style.prepareNativeStyle(style.weekendCellStyle, CellStyleType.WeekendStyle);
            style._owner._nativeView.addDayCellStyle(style.weekendCellStyle.android);
        }
        if (style.todayCellStyle) {
            style.prepareNativeStyle(style.todayCellStyle, CellStyleType.TodayStyle);
            style._owner._nativeView.addDayCellStyle(style.todayCellStyle.android);
        }
        if (style.dayNameCellStyle) {
            style.prepareNativeStyle(style.dayNameCellStyle, CellStyleType.DayNameStyle);
            style._owner._nativeView.addDayCellStyle(style.dayNameCellStyle.android);
        }
        if (style.weekNumberCellStyle) {
            style.prepareNativeStyle(style.weekNumberCellStyle, CellStyleType.WeekNumberStyle);
            style._owner._nativeView.addDayCellStyle(style.weekNumberCellStyle.android);
        }
        if (style.titleCellStyle) {
            style.prepareNativeStyle(style.titleCellStyle, CellStyleType.TitleStyle);
            style._owner._nativeView.addDayCellStyle(style.titleCellStyle.android);
        }
        if (style.selectedDayCellStyle) {
            style.prepareNativeStyle(style.selectedDayCellStyle, CellStyleType.SelectedDayStyle);
            style._owner._nativeView.addDayCellStyle(style.selectedDayCellStyle.android);
        }
        if (style.inlineEventCellStyle) {
            style.prepareNativeStyle(style.inlineEventCellStyle, null);
        }
        this.syncSelectionShape(style);
    };
    CalendarStyleInitializer.prototype.onShowWeekNumbersChanged = function (oldValue, newValue, style) {
        this.changeShowWeekNumbers(newValue, style);
    };
    CalendarStyleInitializer.prototype.changeShowWeekNumbers = function (newValue, style) {
        if (style._owner && style._owner._nativeView) {
            style._owner._nativeView.setWeekNumbersDisplayMode(newValue ? com.telerik.widget.calendar.WeekNumbersDisplayMode.Block : com.telerik.widget.calendar.WeekNumbersDisplayMode.None);
        }
    };
    CalendarStyleInitializer.prototype.onShowTitleChanged = function (oldValue, newValue, style) {
        this.changeShowTitle(newValue, style);
    };
    CalendarStyleInitializer.prototype.changeShowTitle = function (newValue, style) {
        if (style._owner && style._owner._nativeView) {
            style._owner._nativeView.setShowTitle(newValue);
        }
    };
    CalendarStyleInitializer.prototype.onShowDayNamesChanged = function (oldValue, newValue, style) {
        this.changeShowDayNames(newValue, style);
    };
    CalendarStyleInitializer.prototype.changeShowDayNames = function (newValue, style) {
        if (style._owner && style._owner._nativeView) {
            style._owner._nativeView.setShowDayNames(newValue);
        }
    };
    CalendarStyleInitializer.prototype.onBackgroundColorChanged = function (oldValue, newValue, style) {
        this.changeBackgroundColor(newValue, style);
    };
    CalendarStyleInitializer.prototype.changeBackgroundColor = function (newValue, style) {
        if (newValue && style._owner && style._owner._nativeView) {
            var color = newValue.argb;
            style._owner._nativeView.setBackgroundColor(color);
        }
    };
    CalendarStyleInitializer.prototype.onDayCellStyleChanged = function (oldValue, newValue, style) {
        this.changeDayCellStyle(oldValue, newValue, style);
    };
    CalendarStyleInitializer.prototype.changeDayCellStyle = function (oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.RegularDayStyle);
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    };
    CalendarStyleInitializer.prototype.onSelectedDayCellStyleChanged = function (oldValue, newValue, style) {
        this.changeSelectedDayCellStyle(oldValue, newValue, style);
    };
    CalendarStyleInitializer.prototype.changeSelectedDayCellStyle = function (oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.SelectedDayStyle);
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    };
    CalendarStyleInitializer.prototype.onTodayCellStyleChanged = function (oldValue, newValue, style) {
        this.changeTodayCellStyle(oldValue, newValue, style);
    };
    CalendarStyleInitializer.prototype.changeTodayCellStyle = function (oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.TodayStyle);
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    };
    CalendarStyleInitializer.prototype.onWeekNumberCellStyleChanged = function (oldValue, newValue, style) {
        this.changeWeekNumberCellStyle(oldValue, newValue, style);
    };
    CalendarStyleInitializer.prototype.changeWeekNumberCellStyle = function (oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.WeekNumberStyle);
                // TODO: See if this was working as the addDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    };
    CalendarStyleInitializer.prototype.onWeekendCellStyleChanged = function (oldValue, newValue, style) {
        this.changeWeekendCellStyle(oldValue, newValue, style);
    };
    CalendarStyleInitializer.prototype.changeWeekendCellStyle = function (oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.WeekendStyle);
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    };
    CalendarStyleInitializer.prototype.onDayNameCellStyleChanged = function (oldValue, newValue, style) {
        this.changeDayNameCellStyle(oldValue, newValue, style);
    };
    CalendarStyleInitializer.prototype.changeDayNameCellStyle = function (oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.DayNameStyle);
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    };
    CalendarStyleInitializer.prototype.onTitleCellStyleChanged = function (oldValue, newValue, style) {
        this.changeTitleCellStyle(oldValue, newValue, style);
    };
    CalendarStyleInitializer.prototype.changeTitleCellStyle = function (oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.TitleStyle);
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    };
    CalendarStyleInitializer.prototype.syncSelectionShape = function (style) {
        if (style._owner) {
            style._owner._syncSelectionShape();
        }
    };
    return CalendarStyleInitializer;
}());
exports.CalendarStyleInitializer = CalendarStyleInitializer;
/**
 * Class for month view style
 */
var CalendarMonthViewStyle = /** @class */ (function (_super) {
    __extends(CalendarMonthViewStyle, _super);
    function CalendarMonthViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CalendarMonthViewStyle.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new CalendarStyleInitializer();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarMonthViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            this.initializer.updateNativeStyles(this);
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthViewStyle.prototype.updateNativeStyles = function () {
        this.initializer.updateNativeStyles(this);
    };
    CalendarMonthViewStyle.prototype.prepareNativeStyle = function (style, cellType) {
        if (!style || !this._owner || !this._owner._nativeView) {
            return;
        }
        style.owner = this._owner._nativeView;
        if (style instanceof DayCellStyle) {
            style.eventAdapter = this._owner._nativeView.getEventAdapter();
        }
        if (cellType != null) {
            this.updateNativeStyleFilters(style, cellType);
        }
        else {
            style.apply(this._owner._nativeView.getAdapter());
        }
    };
    CalendarMonthViewStyle.prototype.updateNativeStyleFilters = function (style, cellType) {
        style.updateNativeStyleFilters(cellType, com.telerik.widget.calendar.CalendarDisplayMode.Month);
    };
    CalendarMonthViewStyle.prototype.onShowWeekNumbersChanged = function (oldValue, newValue) {
        this.initializer.onShowWeekNumbersChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onSelectionShapeChanged = function (oldValue, newValue) {
        this.initializer.syncSelectionShape(this);
    };
    CalendarMonthViewStyle.prototype.onSelectionShapeSizeChanged = function (oldValue, newValue) {
        this.initializer.syncSelectionShape(this);
    };
    CalendarMonthViewStyle.prototype.onSelectionShapeColorChanged = function (oldValue, newValue) {
        this.initializer.syncSelectionShape(this);
    };
    CalendarMonthViewStyle.prototype.onShowTitleChanged = function (oldValue, newValue) {
        this.initializer.onShowTitleChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onShowDayNamesChanged = function (oldValue, newValue) {
        this.initializer.onShowDayNamesChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onBackgroundColorChanged = function (oldValue, newValue) {
        this.initializer.onBackgroundColorChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onDayCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onDayCellStyleChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onSelectedDayCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onSelectedDayCellStyleChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onTodayCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onTodayCellStyleChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onWeekNumberCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onWeekNumberCellStyleChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onWeekendCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onWeekendCellStyleChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onDayNameCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onDayNameCellStyleChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onTitleCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onTitleCellStyleChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onInlineEventCellStyleChanged = function (oldValue, newValue) {
        this.prepareNativeStyle(newValue, null);
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
    CalendarWeekViewStyle.prototype.updateNativeStyleFilters = function (style, cellType) {
        style.updateNativeStyleFilters(cellType, com.telerik.widget.calendar.CalendarDisplayMode.Week);
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
    Object.defineProperty(CalendarDayViewStyle.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new CalendarStyleInitializer();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarDayViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            this.updateNativeStyles();
        },
        enumerable: true,
        configurable: true
    });
    CalendarDayViewStyle.prototype.updateNativeStyles = function () {
        this.initializer.updateNativeStyles(this);
        this.updateNativeDayStyles();
    };
    CalendarDayViewStyle.prototype.updateNativeDayStyles = function () {
        this.changeShowWeek(null, this.showWeek);
        if (this.dayEventsViewStyle) {
            this.changeDayEventsViewStyle(null, this.dayEventsViewStyle);
        }
        if (this.allDayEventsViewStyle) {
            this.changeAllDayEventsViewStyle(null, this.allDayEventsViewStyle);
        }
    };
    CalendarDayViewStyle.prototype.prepareNativeStyle = function (style, cellType) {
        if (!style || !this._owner || !this._owner._nativeView) {
            return;
        }
        style.owner = this._owner._nativeView;
        if (style instanceof DayCellStyle) {
            style.eventAdapter = this._owner._nativeView.getEventAdapter();
        }
        if (cellType != null) {
            this.updateNativeStyleFilters(style, cellType);
        }
        else {
            style.apply(this._owner._nativeView.getAdapter());
        }
    };
    CalendarDayViewStyle.prototype.updateNativeStyleFilters = function (style, cellType) {
        style.updateNativeStyleFilters(cellType, com.telerik.widget.calendar.CalendarDisplayMode.Day);
    };
    CalendarDayViewStyle.prototype.onShowWeekNumbersChanged = function (oldValue, newValue) {
        this.initializer.onShowWeekNumbersChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onSelectionShapeChanged = function (oldValue, newValue) {
        this.initializer.syncSelectionShape(this);
    };
    CalendarDayViewStyle.prototype.onSelectionShapeSizeChanged = function (oldValue, newValue) {
        this.initializer.syncSelectionShape(this);
    };
    CalendarDayViewStyle.prototype.onSelectionShapeColorChanged = function (oldValue, newValue) {
        this.initializer.syncSelectionShape(this);
    };
    CalendarDayViewStyle.prototype.onShowTitleChanged = function (oldValue, newValue) {
        this.initializer.onShowTitleChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onShowDayNamesChanged = function (oldValue, newValue) {
        this.initializer.onShowDayNamesChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onBackgroundColorChanged = function (oldValue, newValue) {
        this.initializer.onBackgroundColorChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onDayCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onDayCellStyleChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onSelectedDayCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onSelectedDayCellStyleChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onTodayCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onTodayCellStyleChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onWeekNumberCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onWeekNumberCellStyleChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onWeekendCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onWeekendCellStyleChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onDayNameCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onDayNameCellStyleChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onTitleCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onTitleCellStyleChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onDayEventsViewStyleChanged = function (oldValue, newValue) {
        this.changeDayEventsViewStyle(oldValue, newValue);
    };
    CalendarDayViewStyle.prototype.changeDayEventsViewStyle = function (oldValue, newValue) {
        if (oldValue) {
            oldValue.owner = null;
        }
        if (newValue && this._owner) {
            newValue.owner = this._owner._nativeView;
        }
    };
    CalendarDayViewStyle.prototype.onAllDayEventsViewStyleChanged = function (oldValue, newValue) {
        this.changeAllDayEventsViewStyle(oldValue, newValue);
    };
    CalendarDayViewStyle.prototype.changeAllDayEventsViewStyle = function (oldValue, newValue) {
        if (oldValue) {
            oldValue.owner = null;
        }
        if (newValue && this._owner) {
            newValue.owner = this._owner._nativeView;
        }
    };
    CalendarDayViewStyle.prototype.onInlineEventCellStyleChanged = function (oldValue, newValue) {
        this.prepareNativeStyle(newValue, null);
    };
    CalendarDayViewStyle.prototype.onShowWeekChanged = function (oldValue, newValue) {
        this.changeShowWeek(oldValue, newValue);
    };
    CalendarDayViewStyle.prototype.changeShowWeek = function (oldValue, newValue) {
        if (!this._owner || !this._owner._nativeView) {
            return;
        }
        this._owner._nativeView.setShowWeekInDayMode(newValue);
    };
    return CalendarDayViewStyle;
}(commonModule.CalendarDayViewStyle));
exports.CalendarDayViewStyle = CalendarDayViewStyle;
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
            this.updateNativeStyles();
        },
        enumerable: true,
        configurable: true
    });
    CalendarYearViewStyle.prototype.updateNativeStyles = function () {
        if (!this._owner || !this._owner._nativeView) {
            return;
        }
        if (this.titleCellStyle) {
            this.titleCellStyle.owner = this._owner._nativeView;
            this.titleCellStyle['updateNativeStyleFilters'](CellStyleType.TitleStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
            this._owner._nativeView.addDayCellStyle(this.titleCellStyle.android);
        }
        if (this.monthCellStyle) {
            this.monthCellStyle.owner = this._owner._nativeView;
            this._owner._nativeView.addMonthCellStyle(this.monthCellStyle.regularDayStyle);
            this._owner._nativeView.addMonthCellStyle(this.monthCellStyle.weekendStyle);
            this._owner._nativeView.addMonthCellStyle(this.monthCellStyle.todayStyle);
            this._owner._nativeView.addMonthCellStyle(this.monthCellStyle.dayNameStyle);
            this._owner._nativeView.addMonthCellStyle(this.monthCellStyle.monthNameStyle);
            this._owner._nativeView.addMonthCellStyle(this.monthCellStyle.monthCellStyle);
        }
    };
    CalendarYearViewStyle.prototype.onTitleCellStyleChanged = function (oldValue, newValue) {
        if (this._owner && this._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                this._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                newValue.owner = this._owner._nativeView;
                newValue.updateNativeStyleFilters(CellStyleType.TitleStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                this._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    };
    CalendarYearViewStyle.prototype.onMonthCellStyleChanged = function (oldValue, newValue) {
        if (this._owner && this._owner._nativeView) {
            if (oldValue) {
                this._owner._nativeView.removeMonthCellStyle(oldValue.regularDayStyle);
                this._owner._nativeView.removeMonthCellStyle(oldValue.weekendStyle);
                this._owner._nativeView.removeMonthCellStyle(oldValue.todayStyle);
                this._owner._nativeView.removeMonthCellStyle(oldValue.dayNameStyle);
                this._owner._nativeView.removeMonthCellStyle(oldValue.monthNameStyle);
                this._owner._nativeView.removeMonthCellStyle(oldValue.monthCellStyle);
            }
            if (newValue) {
                this._owner._nativeView.addMonthCellStyle(newValue.regularDayStyle);
                this._owner._nativeView.addMonthCellStyle(newValue.weekendStyle);
                this._owner._nativeView.addMonthCellStyle(newValue.todayStyle);
                this._owner._nativeView.addMonthCellStyle(newValue.dayNameStyle);
                this._owner._nativeView.addMonthCellStyle(newValue.monthNameStyle);
                this._owner._nativeView.addMonthCellStyle(newValue.monthCellStyle);
            }
        }
    };
    return CalendarYearViewStyle;
}(commonModule.CalendarYearViewStyle));
exports.CalendarYearViewStyle = CalendarYearViewStyle;
/**
 * The year view mode in compact view
 */
var CalendarMonthNamesViewStyle = /** @class */ (function (_super) {
    __extends(CalendarMonthNamesViewStyle, _super);
    function CalendarMonthNamesViewStyle() {
        return _super.call(this) || this;
    }
    Object.defineProperty(CalendarMonthNamesViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            this.updateNativeStyles();
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthNamesViewStyle.prototype.updateNativeStyles = function () {
        if (!this._owner || !this._owner._nativeView) {
            return;
        }
        if (this.titleCellStyle) {
            this.titleCellStyle.owner = this._owner._nativeView;
            this.titleCellStyle['updateNativeStyleFilters'](CellStyleType.TitleStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
            this._owner._nativeView.addDayCellStyle(this.titleCellStyle.android);
        }
        if (this.monthNameCellStyle) {
            this.monthNameCellStyle['nativeIsYear'] = true;
            this.monthNameCellStyle.owner = this._owner._nativeView;
            this.monthNameCellStyle['updateNativeStyleFilters'](CellStyleType.MonthNameStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
            this._owner._nativeView.addMonthCellStyle(this.monthNameCellStyle.android);
        }
    };
    CalendarMonthNamesViewStyle.prototype.updateFilterDisplayMode = function (filter) {
        var positiveFilter = new java.lang.Boolean(true);
        // filter.setTextIsMonthName(positiveFilter);
        filter.setMonthIsCompact(positiveFilter);
    };
    CalendarMonthNamesViewStyle.prototype.onTitleCellStyleChanged = function (oldValue, newValue) {
        if (this._owner && this._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                this._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                newValue.owner = this._owner._nativeView;
                newValue.updateNativeStyleFilters(CellStyleType.TitleStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                this._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    };
    CalendarMonthNamesViewStyle.prototype.onMonthNameCellStyleChanged = function (oldValue, newValue) {
        if (this._owner && this._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                this._owner._nativeView.removeMonthCellStyle(oldValue.android);
            }
            if (newValue) {
                newValue.nativeIsYear = true;
                newValue.owner = this._owner._nativeView;
                newValue.updateNativeStyleFilters(CellStyleType.MonthNameStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                this._owner._nativeView.addMonthCellStyle(newValue.android);
            }
        }
    };
    return CalendarMonthNamesViewStyle;
}(commonModule.CalendarMonthNamesViewStyle));
exports.CalendarMonthNamesViewStyle = CalendarMonthNamesViewStyle;
var CalendarCellClickListener;
var CalendarOnItemClickListener;
var CalendarOnDisplayDateChangedListener;
var CalendarOnDisplayModeChangedListener;
var CalendarEventViewTapListener;
var CalendarOnSelectedDatesChangedListener;
function initializeListeners() {
    if (!CalendarCellClickListener) {
        var CalendarCellClickListenerImpl = /** @class */ (function (_super) {
            __extends(CalendarCellClickListenerImpl, _super);
            function CalendarCellClickListenerImpl(owner) {
                var _this = _super.call(this) || this;
                _this.owner = owner;
                return global.__native(_this);
            }
            CalendarCellClickListenerImpl.prototype.onCellClick = function (cell) {
                if (!this.owner) {
                    // Race condition: Calendar already disposed
                    return;
                }
                var args = {
                    eventName: commonModule.RadCalendar.cellTapEvent,
                    object: this.owner,
                    cell: cell,
                    date: new Date(cell.getDate())
                };
                this.owner.notify(args);
            };
            CalendarCellClickListenerImpl = __decorate([
                Interfaces([com.telerik.widget.calendar.RadCalendarView.OnCellClickListener]),
                __metadata("design:paramtypes", [RadCalendar])
            ], CalendarCellClickListenerImpl);
            return CalendarCellClickListenerImpl;
        }(java.lang.Object));
        CalendarCellClickListener = CalendarCellClickListenerImpl;
    }
    if (!CalendarOnItemClickListener) {
        var CalendarOnItemClickListenerImpl = /** @class */ (function (_super) {
            __extends(CalendarOnItemClickListenerImpl, _super);
            function CalendarOnItemClickListenerImpl(owner) {
                var _this = _super.call(this) || this;
                _this.owner = owner;
                return global.__native(_this);
            }
            CalendarOnItemClickListenerImpl.prototype.onItemClick = function (parent, view, position, id) {
                if (!this.owner) {
                    // Race condition: Calendar already disposed
                    return;
                }
                var event = parent.getAdapter().getItem(position); // returned object is instance of EventsManager.EventInfo class
                var inlineEventData = new CalendarEvent(event.title(), new Date(event.startTime()), new Date(event.endTime()), event.allDay);
                var args = {
                    eventName: commonModule.RadCalendar.inlineEventSelectedEvent,
                    object: this.owner,
                    eventData: inlineEventData
                };
                this.owner.notify(args);
            };
            CalendarOnItemClickListenerImpl = __decorate([
                Interfaces([android.widget.AdapterView.OnItemClickListener]),
                __metadata("design:paramtypes", [RadCalendar])
            ], CalendarOnItemClickListenerImpl);
            return CalendarOnItemClickListenerImpl;
        }(java.lang.Object));
        CalendarOnItemClickListener = CalendarOnItemClickListenerImpl;
    }
    if (!CalendarOnDisplayDateChangedListener) {
        var CalendarOnDisplayDateChangedListenerImpl = /** @class */ (function (_super) {
            __extends(CalendarOnDisplayDateChangedListenerImpl, _super);
            function CalendarOnDisplayDateChangedListenerImpl(owner) {
                var _this = _super.call(this) || this;
                _this.owner = owner;
                return global.__native(_this);
            }
            CalendarOnDisplayDateChangedListenerImpl.prototype.onDisplayDateChanged = function (oldDate, newDate) {
                if (!this.owner) {
                    // Race condition: Calendar already disposed
                    return;
                }
                var newDisplayedDate = new Date(newDate);
                if (this.owner.displayedDate === newDisplayedDate) {
                    return;
                }
                var navigationStartedArgs = {
                    eventName: commonModule.RadCalendar.navigatingToDateStartedEvent,
                    object: this.owner,
                    date: newDisplayedDate
                };
                this.owner.notify(navigationStartedArgs);
                this.owner.displayedDate = newDisplayedDate;
                var navigatedArgs = {
                    eventName: commonModule.RadCalendar.navigatedToDateEvent,
                    object: this.owner,
                    date: newDisplayedDate
                };
                this.owner.notify(navigatedArgs);
            };
            CalendarOnDisplayDateChangedListenerImpl = __decorate([
                Interfaces([com.telerik.widget.calendar.RadCalendarView.OnDisplayDateChangedListener]),
                __metadata("design:paramtypes", [RadCalendar])
            ], CalendarOnDisplayDateChangedListenerImpl);
            return CalendarOnDisplayDateChangedListenerImpl;
        }(java.lang.Object));
        CalendarOnDisplayDateChangedListener = CalendarOnDisplayDateChangedListenerImpl;
    }
    if (!CalendarOnDisplayModeChangedListener) {
        var CalendarOnDisplayModeChangedListenerImpl = /** @class */ (function (_super) {
            __extends(CalendarOnDisplayModeChangedListenerImpl, _super);
            function CalendarOnDisplayModeChangedListenerImpl(owner) {
                var _this = _super.call(this) || this;
                _this.owner = owner;
                return global.__native(_this);
            }
            CalendarOnDisplayModeChangedListenerImpl.prototype.onDisplayModeChanged = function (oldMode, newMode) {
                if (!this.owner) {
                    // Race condition: Calendar already disposed
                    return;
                }
                var newCalendarMode = RadCalendar.getViewModeFromAndroidViewMode(this.owner, newMode);
                this.owner.viewMode = newCalendarMode;
                var oldCalendarMode = RadCalendar.getViewModeFromAndroidViewMode(this.owner, oldMode);
                this.owner.notifyViewModeChanged(oldCalendarMode, newCalendarMode);
            };
            CalendarOnDisplayModeChangedListenerImpl = __decorate([
                Interfaces([com.telerik.widget.calendar.RadCalendarView.OnDisplayModeChangedListener]),
                __metadata("design:paramtypes", [RadCalendar])
            ], CalendarOnDisplayModeChangedListenerImpl);
            return CalendarOnDisplayModeChangedListenerImpl;
        }(java.lang.Object));
        CalendarOnDisplayModeChangedListener = CalendarOnDisplayModeChangedListenerImpl;
    }
    if (!CalendarEventViewTapListener) {
        var CalendarEventViewTapListenerImpl = /** @class */ (function (_super) {
            __extends(CalendarEventViewTapListenerImpl, _super);
            function CalendarEventViewTapListenerImpl(owner) {
                var _this = _super.call(this) || this;
                _this.owner = owner;
                return global.__native(_this);
            }
            CalendarEventViewTapListenerImpl.prototype.onEventViewTap = function (event) {
                if (!this.owner) {
                    // Race condition: Calendar already disposed
                    return;
                }
                var dayViewEventData = new CalendarEvent(event.getTitle(), new Date(event.getStartDate()), new Date(event.getEndDate()), event.isAllDay());
                var args = {
                    eventName: commonModule.RadCalendar.dayViewEventSelectedEvent,
                    object: this.owner,
                    eventData: dayViewEventData
                };
                this.owner.notify(args);
            };
            CalendarEventViewTapListenerImpl = __decorate([
                Interfaces([com.telerik.widget.calendar.dayview.CalendarDayView.EventViewTapListener]),
                __metadata("design:paramtypes", [RadCalendar])
            ], CalendarEventViewTapListenerImpl);
            return CalendarEventViewTapListenerImpl;
        }(java.lang.Object));
        CalendarEventViewTapListener = CalendarEventViewTapListenerImpl;
    }
    if (!CalendarOnSelectedDatesChangedListener) {
        var CalendarOnSelectedDatesChangedListenerImpl = /** @class */ (function (_super) {
            __extends(CalendarOnSelectedDatesChangedListenerImpl, _super);
            function CalendarOnSelectedDatesChangedListenerImpl(owner) {
                var _this = _super.call(this) || this;
                _this.owner = owner;
                return global.__native(_this);
            }
            CalendarOnSelectedDatesChangedListenerImpl.prototype.onSelectedDatesChanged = function (context) {
                if (!this.owner) {
                    // Race condition: Calendar already disposed
                    return;
                }
                var selectedCount = context.datesAdded().size();
                var deselectedCount = context.datesRemoved().size();
                if (this.owner.selectionMode !== commonModule.CalendarSelectionMode.Range && deselectedCount > 0) {
                    for (var i = 0; i < deselectedCount; i++) {
                        var deselectedDate = new Date(context.datesRemoved().get(i).longValue());
                        this.owner.notifyDateDeselected(this.owner, deselectedDate);
                    }
                }
                if (this.owner.selectionMode === commonModule.CalendarSelectionMode.Range && selectedCount > 0) {
                    var nativeCalendar = this.owner.android;
                    var dateRange = nativeCalendar.getSelectionManager().getSelectedRange();
                    this.owner.notifyRangeSelectionChanged(this.owner, new Date(dateRange.getStart()), new Date(dateRange.getEnd()));
                }
                else if (selectedCount > 0) {
                    for (var i = 0; i < selectedCount; i++) {
                        var millis = context.datesAdded().get(i).longValue();
                        var selectedDate = new Date(millis);
                        this.owner.notifySingleDateSelected(this.owner, selectedDate);
                    }
                }
            };
            CalendarOnSelectedDatesChangedListenerImpl = __decorate([
                Interfaces([com.telerik.widget.calendar.RadCalendarView.OnSelectedDatesChangedListener]),
                __metadata("design:paramtypes", [RadCalendar])
            ], CalendarOnSelectedDatesChangedListenerImpl);
            return CalendarOnSelectedDatesChangedListenerImpl;
        }(java.lang.Object));
        CalendarOnSelectedDatesChangedListener = CalendarOnSelectedDatesChangedListenerImpl;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              RadCalendar
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var RadCalendar = /** @class */ (function (_super) {
    __extends(RadCalendar, _super);
    function RadCalendar() {
        var _this = _super.call(this) || this;
        _this._androidViewId = -1;
        return _this;
    }
    Object.defineProperty(RadCalendar.prototype, "_nativeView", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.prototype.createNativeView = function () {
        initializeListeners();
        this._android = new com.telerik.widget.calendar.RadCalendarView(this._context);
        this._android.setHorizontalScroll(this.horizontalTransition);
        this.addOnCellClickListener();
        this.addOnDisplayDateChangedListener();
        this.updateEventSource();
        this.addOnDisplayModeChangedListener();
        this.addOnSelectedDatesChangedListener();
        this.setDayViewEventSelectedListener();
        // set initial property values using value changed handlers
        this.setNativeMinDate(this.minDate);
        this.setNativeMaxDate(this.maxDate);
        if (this.displayedDate === undefined) {
            this.loadNativeDisplayedDate();
        }
        else {
            this.setNativeDisplayedDate(this.displayedDate);
        }
        this.setNativeSelectionMode(this.selectionMode);
        this.setNativeEventsViewMode(this.eventsViewMode);
        this.setNativeHorizontalTransition(this.horizontalTransition);
        this.setNativeTransitionMode(this.transitionMode);
        this.setNativeViewMode(this.viewMode);
        this.setNativeSelectedDate(this.selectedDate);
        this.setNativeSelectedDates(this.selectedDates);
        this.setNativeSelectedDateRange(this.selectedDateRange);
        this.initOnInlineEventsClickedListener();
        this.setNativeLocale(this.locale);
        // apply cell styles
        if (this.monthViewStyle) {
            this.monthViewStyle.owner = this;
        }
        if (this.weekViewStyle) {
            this.weekViewStyle.owner = this;
        }
        if (this.dayViewStyle) {
            this.dayViewStyle.owner = this;
        }
        if (this.yearViewStyle) {
            this.yearViewStyle.owner = this;
        }
        if (this.monthNamesViewStyle) {
            this.monthNamesViewStyle.owner = this;
        }
        return this._nativeView;
    };
    RadCalendar.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
        if (this._androidViewId < 0) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._nativeView.setId(this._androidViewId);
    };
    RadCalendar.prototype.disposeNativeView = function () {
        if (this._nativeView._cellClickListener) {
            this._nativeView._cellClickListener.owner = null;
        }
        if (this._nativeView._itemClickListener) {
            this._nativeView._itemClickListener.owner = null;
        }
        if (this._nativeView._displayDateChangedListener) {
            this._nativeView._displayDateChangedListener.owner = null;
        }
        if (this._nativeView._displayModeChangedListener) {
            this._nativeView._displayModeChangedListener.owner = null;
        }
        if (this._nativeView._eventViewTapListener) {
            this._nativeView._eventViewTapListener.owner = null;
        }
        if (this._nativeView._onSelectedDatesChangedListener) {
            this._nativeView._onSelectedDatesChangedListener.owner = null;
        }
        _super.prototype.disposeNativeView.call(this);
    };
    RadCalendar.prototype.loadNativeDisplayedDate = function () {
        var date = new Date(this._android.getDisplayDate());
        if (this.displayedDate !== date) {
            this.displayedDate = date;
        }
    };
    RadCalendar.prototype.addOnCellClickListener = function () {
        this._nativeView._cellClickListener = new CalendarCellClickListener(this);
        this._nativeView.setOnCellClickListener(this._nativeView._cellClickListener);
    };
    RadCalendar.prototype._syncSelectionShape = function () {
        var activeStyle = this.viewMode === commonModule.CalendarViewMode.Month ? this.monthViewStyle :
            this.viewMode === commonModule.CalendarViewMode.Week ? this.weekViewStyle :
                this.viewMode === commonModule.CalendarViewMode.Day ? this.dayViewStyle : undefined;
        if (this._nativeView) {
            var defaultDecorator = new com.telerik.widget.calendar.CellDecorationsLayer(this._nativeView);
            this._nativeView.setCellDecorator(defaultDecorator);
            if (activeStyle && activeStyle.selectionShape) {
                switch (activeStyle.selectionShape.toLowerCase()) {
                    case commonModule.CalendarSelectionShape.Round:
                        var roundDecorator = new com.telerik.widget.calendar.decorations.CircularCellDecorator(this._nativeView);
                        roundDecorator.setStroked(false);
                        roundDecorator.setRadius(utilsModule.layout.toDevicePixels(activeStyle.selectionShapeSize));
                        if (activeStyle.selectionShapeColor) {
                            roundDecorator.setColor(activeStyle.selectionShapeColor.android);
                        }
                        this._nativeView.setCellDecorator(roundDecorator);
                        this._nativeView.setShowCellDecorations(true);
                        break;
                    case commonModule.CalendarSelectionShape.Square:
                        var squareDecorator = new com.telerik.widget.calendar.decorations.SquareCellDecorator(this._nativeView);
                        squareDecorator.setStroked(false);
                        squareDecorator.setSize(utilsModule.layout.toDevicePixels(activeStyle.selectionShapeSize));
                        if (activeStyle.selectionShapeColor) {
                            squareDecorator.setColor(activeStyle.selectionShapeColor.android);
                        }
                        this._nativeView.setCellDecorator(squareDecorator);
                        this._nativeView.setShowCellDecorations(true);
                        break;
                    case commonModule.CalendarSelectionShape.None:
                        this._nativeView.setShowCellDecorations(false);
                        break;
                }
            }
        }
    };
    RadCalendar.prototype.addOnInlineEventsClickedListener = function () {
        if (this._nativeView.eventsManager()) {
            this._nativeView.eventsManager().setOnItemClickListener(null);
            if (this._nativeView._itemClickListener) {
                this._nativeView._itemClickListener.owner = null;
            }
            this._nativeView._itemClickListener = new CalendarOnItemClickListener(this);
            this._nativeView.eventsManager().setOnItemClickListener(this._nativeView._itemClickListener);
        }
    };
    // calendarDidNavigateToDate
    // calendarWillNavigateToDate
    RadCalendar.prototype.addOnDisplayDateChangedListener = function () {
        this._nativeView._displayDateChangedListener = new CalendarOnDisplayDateChangedListener(this);
        this._nativeView.setOnDisplayDateChangedListener(this._nativeView._displayDateChangedListener);
    };
    // calendarDidChangedViewModeFromTo
    RadCalendar.prototype.addOnDisplayModeChangedListener = function () {
        this._nativeView._displayModeChangedListener = new CalendarOnDisplayModeChangedListener(this);
        this._nativeView.setOnDisplayModeChangedListener(this._nativeView._displayModeChangedListener);
    };
    RadCalendar.prototype.notifyViewModeChanged = function (oldMode, newMode) {
        var args = {
            eventName: commonModule.RadCalendar.viewModeChangedEvent,
            object: this,
            oldValue: oldMode,
            newValue: newMode
        };
        this.notify(args);
    };
    RadCalendar.prototype.setDayViewEventSelectedListener = function () {
        this._nativeView._eventViewTapListener = new CalendarEventViewTapListener(this);
        this._nativeView.getDayView().setEventViewTapListener(this._nativeView._eventViewTapListener);
    };
    // calendarDidDeselectedDate
    // calendarDidSelectDate
    // calendarShouldSelectDate
    RadCalendar.prototype.addOnSelectedDatesChangedListener = function () {
        this._nativeView._onSelectedDatesChangedListener = new CalendarOnSelectedDatesChangedListener(this);
        this._nativeView.setOnSelectedDatesChangedListener(this._nativeView._onSelectedDatesChangedListener);
    };
    RadCalendar.prototype.notifySingleDateSelected = function (calendar, date) {
        this._forbidNativeSelection = true;
        if (!this.selectedDate || this.selectedDate.getTime() !== date.getTime()) {
            this.selectedDate = date;
        }
        if (calendar.selectionMode === commonModule.CalendarSelectionMode.Multiple) {
            this._addSelectedDate(date);
        }
        this._forbidNativeSelection = false;
        var selectedArgs = {
            eventName: commonModule.RadCalendar.dateSelectedEvent,
            object: calendar,
            date: date
        };
        calendar.notify(selectedArgs);
    };
    RadCalendar.prototype.notifyDateDeselected = function (calendar, date) {
        this._forbidNativeSelection = true;
        if (calendar.selectionMode === commonModule.CalendarSelectionMode.Multiple) {
            this._removeSelectedDate(date);
        }
        this._forbidNativeSelection = false;
        var selectedArgs = {
            eventName: commonModule.RadCalendar.dateDeselectedEvent,
            object: calendar,
            date: date
        };
        calendar.notify(selectedArgs);
    };
    RadCalendar.prototype.notifyRangeSelectionChanged = function (calendar, firstSelected, lastSelected) {
        this._forbidNativeSelection = true;
        if (!this.selectedDate || this.selectedDate.getTime() !== lastSelected.getTime()) {
            this.selectedDate = lastSelected;
        }
        if (!this.selectedDateRange ||
            this.selectedDateRange.endDate.getTime() !== lastSelected.getTime() ||
            this.selectedDateRange.startDate.getTime() !== firstSelected.getTime()) {
            this.selectedDateRange = new commonModule.DateRange(firstSelected, lastSelected);
        }
        this._forbidNativeSelection = false;
        var lastSelectedArgs = {
            eventName: commonModule.RadCalendar.dateSelectedEvent,
            object: calendar,
            date: lastSelected
        };
        calendar.notify(lastSelectedArgs);
    };
    ///////////////////////////////////////////////////////////////////////////////////////////
    // NOTE: Since calendar is not created during xml parsing, we have setters for properties and call them from createUI & property changed handlers.
    ///////////////////////////////////////////////////////////////////////////////////////////
    // Native setters - it's assumed that this.android is initialized, so call these methods after createUI is already called
    RadCalendar.prototype.setNativeViewMode = function (mode) {
        if (mode) {
            var bSetYearMode = false;
            var nativeMode = null;
            switch (mode) {
                case commonModule.CalendarViewMode.Month:
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Month;
                    break;
                case commonModule.CalendarViewMode.MonthNames:
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Year;
                    bSetYearMode = true;
                    break;
                case commonModule.CalendarViewMode.Week:
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Week;
                    break;
                case commonModule.CalendarViewMode.Year:
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Year;
                    break;
                case commonModule.CalendarViewMode.Day:
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Day;
                    break;
                // case commonModule.CalendarViewMode.Flow.toLowerCase():
                //     nativeMode = TKCalendarViewMode.TKCalendarViewModeFlow;
                //     break;
                // case commonModule.CalendarViewMode.YearNumbers.toLowerCase():
                // 	nativeMode = TKCalendarViewMode.TKCalendarViewModeYearNumbers;
                // 	break;
            }
            var eventsManager = this._android.eventsManager();
            if (eventsManager) {
                eventsManager.closeEvents();
            }
            if (nativeMode === com.telerik.widget.calendar.CalendarDisplayMode.Year) {
                if (this._android.isYearModeCompact() !== bSetYearMode) {
                    if (this._android.getDisplayMode() === com.telerik.widget.calendar.CalendarDisplayMode.Year) {
                        // The NS calendar view modes Year and MonthName are both represented by CalendarDisplayMode.Year in android.
                        // To achieve the difference another property (isYearModeCompact) is used which has no listener.
                        // This is why we notify for the NS event at this point.
                        if (bSetYearMode) {
                            this.notifyViewModeChanged(commonModule.CalendarViewMode.Year, commonModule.CalendarViewMode.MonthNames);
                        }
                        else {
                            this.notifyViewModeChanged(commonModule.CalendarViewMode.MonthNames, commonModule.CalendarViewMode.Year);
                        }
                    }
                    this._android.setYearModeCompact(bSetYearMode);
                }
            }
            this._android.changeDisplayMode(nativeMode, false);
        }
    };
    RadCalendar.prototype.setNativeSelectionMode = function (mode) {
        if (mode) {
            var selMode = null;
            switch (mode) {
                case commonModule.CalendarSelectionMode.None:
                    selMode = com.telerik.widget.calendar.CalendarSelectionMode.None;
                    break;
                case commonModule.CalendarSelectionMode.Single:
                    selMode = com.telerik.widget.calendar.CalendarSelectionMode.Single;
                    break;
                case commonModule.CalendarSelectionMode.Multiple:
                    selMode = com.telerik.widget.calendar.CalendarSelectionMode.Multiple;
                    break;
                case commonModule.CalendarSelectionMode.Range:
                    selMode = com.telerik.widget.calendar.CalendarSelectionMode.Range;
                    break;
                default:
                    console.log("WARNING: Unsupported selection mode set: " + mode);
            }
            if (selMode) {
                this._android.setSelectionMode(selMode);
            }
        }
    };
    RadCalendar.prototype.setNativeTransitionMode = function (mode) {
        if (mode) {
            this._nativeView.setScrollMode(RadCalendar.getAndroidTransitonModeFromTransitionMode(mode));
        }
    };
    RadCalendar.prototype.setNativeEventsViewMode = function (mode) {
        if (mode) {
            this._nativeView.setEventsDisplayMode(RadCalendar.getAndroidEventsViewModeFromEventsViewMode(mode));
        }
    };
    RadCalendar.prototype.setNativeMaxDate = function (date) {
        if (date) {
            var calendar = RadCalendar.getCalendarFromDate(date);
            this._nativeView.setMaxDate(calendar.getTimeInMillis());
        }
    };
    RadCalendar.prototype.setNativeMinDate = function (date) {
        if (date) {
            var calendar = RadCalendar.getCalendarFromDate(date);
            this._nativeView.setMinDate(calendar.getTimeInMillis());
        }
    };
    RadCalendar.prototype.setNativeDisplayedDate = function (date) {
        if (date) {
            var calendar = RadCalendar.getCalendarFromDate(date);
            this._nativeView.setDisplayDate(calendar.getTimeInMillis());
        }
    };
    RadCalendar.prototype.setNativeSelectedDate = function (date) {
        if (date) {
            var calendar = RadCalendar.getCalendarFromDate(date);
            var selectedDates = new java.util.ArrayList;
            selectedDates.add(new java.lang.Long(calendar.getTimeInMillis()));
            this._nativeView.setSelectedDates(selectedDates);
        }
    };
    RadCalendar.prototype.setNativeSelectedDates = function (data) {
        if (data) {
            var newDates = data;
            if (typeof (data) === "string") {
                newDates = newDates.split(",");
            }
            var selectedDates = new java.util.ArrayList();
            for (var date in newDates) {
                var newDate = RadCalendar.getCalendarFromDate(new Date(newDates[date]));
                selectedDates.add(new java.lang.Long(newDate.getTimeInMillis()));
            }
            this._nativeView.setSelectedDates(selectedDates);
        }
    };
    RadCalendar.prototype.setNativeSelectedDateRange = function (data) {
        if (data && (data instanceof commonModule.DateRange)) {
            var newDateRange = data;
            var start = RadCalendar.getCalendarFromDate(newDateRange.startDate);
            var end = RadCalendar.getCalendarFromDate(newDateRange.endDate);
            var androidDateRange = new com.telerik.widget.calendar.DateRange(start.getTimeInMillis(), end.getTimeInMillis());
            this._nativeView.setSelectedRange(androidDateRange);
        }
    };
    RadCalendar.prototype.setNativeHorizontalTransition = function (horizontalTransition) {
        this._nativeView.setHorizontalScroll(horizontalTransition);
    };
    RadCalendar.prototype.getDisplayedDate = function () {
        return this._android.getDisplayDate();
    };
    RadCalendar.prototype.onLocalePropertyChanged = function (oldValue, newValue) {
        _super.prototype.onLocalePropertyChanged.call(this, oldValue, newValue);
        this.setNativeLocale(newValue);
    };
    RadCalendar.prototype.setNativeLocale = function (locale) {
        if (locale && this._nativeView) {
            var langAndCountry = locale.split('-');
            if (langAndCountry.length === 1) {
                langAndCountry.push(langAndCountry[0].toUpperCase());
            }
            if (langAndCountry.length === 2) {
                var nativeLocale = new java.util.Locale(langAndCountry[0], langAndCountry[1]);
                this._nativeView.setLocale(nativeLocale);
            }
        }
    };
    RadCalendar.prototype.onViewModeChanged = function (oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeViewMode(newValue);
        }
        this._syncSelectionShape();
    };
    RadCalendar.prototype.onSelectionModeChanged = function (oldValue, newValue) {
        if (this._nativeView) {
            this.clearSelection();
            this.setNativeSelectionMode(newValue);
        }
    };
    RadCalendar.prototype.onTransitionModeChanged = function (oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeTransitionMode(newValue);
        }
    };
    RadCalendar.prototype.onEventsViewModeChanged = function (oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeEventsViewMode(newValue);
            this.initOnInlineEventsClickedListener();
        }
    };
    RadCalendar.prototype.onMaxDateChanged = function (oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeMaxDate(newValue);
        }
    };
    RadCalendar.prototype.onMinDateChanged = function (oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeMinDate(newValue);
        }
    };
    RadCalendar.prototype.onDisplayedDateChanged = function (oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeDisplayedDate(newValue);
        }
    };
    RadCalendar.prototype.onSelectedDateChanged = function (oldValue, newValue) {
        if (this._forbidNativeSelection || !this._nativeView) {
            return;
        }
        this.setNativeSelectedDate(newValue);
    };
    RadCalendar.prototype.onSelectedDatesChanged = function (oldValue, newValue) {
        if (this._forbidNativeSelection || !this._nativeView) {
            return;
        }
        this.setNativeSelectedDates(newValue);
    };
    RadCalendar.prototype.onSelectedDateRangeChanged = function (oldValue, newValue) {
        if (this._forbidNativeSelection || !this._nativeView) {
            return;
        }
        this.setNativeSelectedDateRange(newValue);
    };
    RadCalendar.prototype.onHorizontalTransitionChanged = function (oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeHorizontalTransition(newValue);
        }
    };
    RadCalendar.prototype.onMonthViewStyleChanged = function (oldValue, newValue) {
        if (newValue && (newValue instanceof CalendarMonthViewStyle)) {
            this.monthViewStyle.owner = this;
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
    RadCalendar.prototype.onMonthNamesViewStyleChanged = function (oldValue, newValue) {
        if (newValue && (newValue instanceof CalendarMonthNamesViewStyle)) {
            this.monthNamesViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.onYearViewStyleChanged = function (oldValue, newValue) {
        if (newValue && (newValue instanceof CalendarYearViewStyle)) {
            this.yearViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.reload = function () {
        if (this._nativeView) {
            this._nativeView.invalidate();
        }
    };
    RadCalendar.prototype.navigateForward = function () {
        this._nativeView.shiftDate(true);
    };
    RadCalendar.prototype.navigateBack = function () {
        this._nativeView.shiftDate(false);
    };
    RadCalendar.prototype.goToDate = function (date) {
        this._nativeView.setDisplayDate(date.getTime());
    };
    RadCalendar.prototype.getEventsForDate = function (date) {
        var nativeResult = this._nativeView.getEventAdapter().getEventsForDate(date.getTime());
        var result = new Array();
        if (nativeResult) {
            for (var i = 0; i < nativeResult.size(); i++) {
                var nativeEvent = nativeResult.get(i);
                result.push(new CalendarEvent(nativeEvent.getTitle(), new Date(nativeEvent.getStartDate()), new Date(nativeEvent.getEndDate()), nativeEvent.isAllDay(), new color_1.Color(nativeEvent.getEventColor())));
            }
        }
        return result;
    };
    RadCalendar.getCalendarFromDate = function (date) {
        var calendar = java.util.Calendar.getInstance();
        calendar.setTimeInMillis(date.getTime());
        return calendar;
    };
    RadCalendar.getDateFromCalendar = function (calendar) {
        return new Date(calendar.getTimeInMillis());
    };
    RadCalendar.prototype.clearSelection = function () {
        this.selectedDates = new Array();
    };
    RadCalendar.prototype.initOnInlineEventsClickedListener = function () {
        if (this.eventsViewMode === commonModule.CalendarEventsViewMode.Inline) {
            this.addOnInlineEventsClickedListener();
        }
    };
    RadCalendar.prototype.updateEventSource = function () {
        if (!this._nativeView) {
            return;
        }
        if (this.eventSource) {
            var list = new java.util.ArrayList();
            for (var i = 0; i < this.eventSource.length; i++) {
                var item = void 0;
                if (this.eventSource instanceof observable_array_1.ObservableArray) {
                    item = this.eventSource.getItem(i).android;
                }
                else if (this.eventSource instanceof Array) {
                    item = this.eventSource[i].android;
                }
                list.add(item);
            }
            var eventAdapter = this._nativeView.getEventAdapter();
            eventAdapter.setEvents(list);
        }
    };
    RadCalendar.getAndroidViewModeFromViewMode = function (viewMode) {
        var result = null;
        switch (viewMode) {
            case commonModule.CalendarViewMode.Month:
                result = com.telerik.widget.calendar.CalendarDisplayMode.Month;
                break;
            case commonModule.CalendarViewMode.MonthNames:
                result = com.telerik.widget.calendar.CalendarDisplayMode.Year;
                break;
            case commonModule.CalendarViewMode.Week:
                result = com.telerik.widget.calendar.CalendarDisplayMode.Week;
                break;
            case commonModule.CalendarViewMode.Year:
                result = com.telerik.widget.calendar.CalendarDisplayMode.Year;
                break;
            case commonModule.CalendarViewMode.Day:
                result = com.telerik.widget.calendar.CalendarDisplayMode.Day;
                break;
            // case commonModule.CalendarViewMode.Flow.toLocaleLowerCase():
            //     //this._android.setDisplayMode("?????");// = TKCalendarViewMode.TKCalendarViewModeFlow;
            //     break;
            // case commonModule.CalendarViewMode.YearNumbers.toLocaleLowerCase():
            // 	// this._android.viewMode = TKCalendarViewMode.TKCalendarViewModeYearNumbers;
            // 	break;
        }
        return result;
    };
    RadCalendar.getViewModeFromAndroidViewMode = function (calendar, viewMode) {
        var result;
        switch (viewMode) {
            case com.telerik.widget.calendar.CalendarDisplayMode.Month:
                result = commonModule.CalendarViewMode.Month;
                break;
            case com.telerik.widget.calendar.CalendarDisplayMode.Week:
                result = commonModule.CalendarViewMode.Week;
                break;
            case com.telerik.widget.calendar.CalendarDisplayMode.Day:
                result = commonModule.CalendarViewMode.Day;
                break;
            case com.telerik.widget.calendar.CalendarDisplayMode.Year: {
                if (calendar._nativeView.isYearModeCompact()) {
                    result = commonModule.CalendarViewMode.MonthNames;
                }
                else {
                    result = commonModule.CalendarViewMode.Year;
                }
                break;
            }
        }
        // ?? case com.telerik.widget.calendar.CalendarDisplayMode.Flow: result = commonModule.CalendarViewMode.Flow; break;
        // ?? case com.telerik.widget.calendar.CalendarDisplayMode.YearNumbers: result = commonModule.CalendarViewMode.YearNumbers; break;
        return result;
    };
    RadCalendar.getAndroidTransitonModeFromTransitionMode = function (transitionMode) {
        var nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Sticky;
        switch (transitionMode) {
            case commonModule.CalendarTransitionMode.None:
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.None;
                break;
            case commonModule.CalendarTransitionMode.Slide:
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Sticky;
                break;
            case commonModule.CalendarTransitionMode.Stack:
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Stack;
                break;
            case commonModule.CalendarTransitionMode.Plain:
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Plain;
                break;
            case commonModule.CalendarTransitionMode.Free:
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Free;
                break;
            case commonModule.CalendarTransitionMode.Combo:
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Combo;
                break;
            case commonModule.CalendarTransitionMode.Overlap:
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Overlap;
                break;
            default:
                console.log("WARNING: Unsupported transition mode: " + transitionMode);
        }
        return nativeScrollMode;
    };
    RadCalendar.getAndroidEventsViewModeFromEventsViewMode = function (eventsViewMode) {
        var nativeViewMode = com.telerik.widget.calendar.events.EventsDisplayMode.Normal;
        switch (eventsViewMode) {
            case commonModule.CalendarEventsViewMode.Inline:
                nativeViewMode = com.telerik.widget.calendar.events.EventsDisplayMode.Inline;
                break;
            case commonModule.CalendarEventsViewMode.Popover:
                nativeViewMode = com.telerik.widget.calendar.events.EventsDisplayMode.Popup;
                break;
            default:
                break;
        }
        return nativeViewMode;
    };
    return RadCalendar;
}(commonModule.RadCalendar));
exports.RadCalendar = RadCalendar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktY2FsZW5kYXIuYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVpLWNhbGVuZGFyLmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtREFBcUQ7QUFDckQsMERBQTREO0FBQzVELGdEQUErQztBQUUvQywyRUFBeUU7QUFFekUsMENBQXFDO0FBRXJDO0lBQW1DLGlDQUEwQjtJQUE3RDs7SUFpREEsQ0FBQztJQS9DRyxzQkFBSSxrQ0FBTzthQUFYO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQ2xFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQzlCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzthQUN2QztZQUVELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVTLG9DQUFZLEdBQXRCLFVBQXVCLEtBQWM7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNTLG9DQUFZLEdBQXRCO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFUyxtQ0FBVyxHQUFyQixVQUFzQixJQUFVO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFUyxtQ0FBVyxHQUFyQjtRQUNJLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9B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LEtBQUssWUFBWSxDQUFDLHNCQUFzQixDQUFDLE9BQU87Z0JBQzVDLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2dCQUNsRSxNQUFNO1lBQ1Y7Z0JBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsR0FBRyxjQUFjLENBQUMsQ0FBQztTQUM5RTtRQUVELE9BQU8sZ0JBQWdCLENBQUM7SUFDNUIsQ0FBQztJQUVjLHNEQUEwQyxHQUF6RCxVQUEwRCxjQUFtRDtRQUN6RyxJQUFJLGNBQWMsR0FBeUQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7UUFDdkksUUFBUSxjQUFjLEVBQUU7WUFDcEIsS0FBSyxZQUFZLENBQUMsc0JBQXNCLENBQUMsTUFBTTtnQkFDM0MsY0FBYyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDO2dCQUM3RSxNQUFNO1lBQ1YsS0FBSyxZQUFZLENBQUMsc0JBQXNCLENBQUMsT0FBTztnQkFDNUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDO2dCQUM1RSxNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTTtTQUNiO1FBRUQsT0FBTyxjQUFjLENBQUM7SUFDMUIsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQTNzQkQsQ0FBaUMsWUFBWSxDQUFDLFdBQVcsR0Eyc0J4RDtBQTNzQlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb21tb25Nb2R1bGUgZnJvbSBcIi4vdWktY2FsZW5kYXIuY29tbW9uXCI7XG5pbXBvcnQgKiBhcyB1dGlsc01vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcblxuZXhwb3J0ICogZnJvbSBcIi4vdWktY2FsZW5kYXIuY29tbW9uXCI7XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhckV2ZW50IGV4dGVuZHMgY29tbW9uTW9kdWxlLkNhbGVuZGFyRXZlbnQge1xuICAgIHByaXZhdGUgX2FuZHJvaWQ6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5ldmVudHMuRXZlbnQ7XG4gICAgZ2V0IGFuZHJvaWQoKTogY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLmV2ZW50cy5FdmVudCB7XG4gICAgICAgIGlmICghdGhpcy5fYW5kcm9pZCkge1xuICAgICAgICAgICAgdGhpcy5fYW5kcm9pZCA9IG5ldyBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuZXZlbnRzLkV2ZW50KFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgIG5ldyBEYXRlKDE5OTAsIDAsIDEpLmdldFRpbWUoKSxcbiAgICAgICAgICAgICAgICBuZXcgRGF0ZSgxOTkwLCAwLCAyKS5nZXRUaW1lKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuZHJvaWQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXRJc0FsbERheSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmFuZHJvaWQuc2V0QWxsRGF5KHZhbHVlKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIF9nZXRJc0FsbERheSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5kcm9pZC5pc0FsbERheSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfc2V0RW5kRGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMuYW5kcm9pZC5zZXRFbmREYXRlKGRhdGUuZ2V0VGltZSgpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2dldEVuZERhdGUoKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSh0aGlzLmFuZHJvaWQuZ2V0RW5kRGF0ZSgpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NldFN0YXJ0RGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMuYW5kcm9pZC5zZXRTdGFydERhdGUoZGF0ZS5nZXRUaW1lKCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZ2V0U3RhcnREYXRlKCk6IERhdGUge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUodGhpcy5hbmRyb2lkLmdldFN0YXJ0RGF0ZSgpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NldFRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hbmRyb2lkLnNldFRpdGxlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2dldFRpdGxlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmFuZHJvaWQuZ2V0VGl0bGUoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NldEV2ZW50Q29sb3IodmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMuYW5kcm9pZC5zZXRFdmVudENvbG9yKHZhbHVlLmFyZ2IpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgX2dldEV2ZW50Q29sb3IoKTogQ29sb3Ige1xuICAgICAgICByZXR1cm4gbmV3IENvbG9yKHRoaXMuYW5kcm9pZC5nZXRFdmVudENvbG9yKCkpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBIZWxwZXIgbWV0aG9kc1xuICovXG5jbGFzcyBUb29sIHtcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVR5cGVmYWNlKG5hbWU/OiBzdHJpbmcsIHN0eWxlPzogY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlKTogYW5kcm9pZC5ncmFwaGljcy5UeXBlZmFjZSB7XG4gICAgICAgIGxldCBmb250U3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlR5cGVmYWNlLk5PUk1BTDtcbiAgICAgICAgaWYgKHN0eWxlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJGb250U3R5bGUuQm9sZDpcbiAgICAgICAgICAgICAgICAgICAgZm9udFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5UeXBlZmFjZS5CT0xEO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhckZvbnRTdHlsZS5JdGFsaWM6XG4gICAgICAgICAgICAgICAgICAgIGZvbnRTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuVHlwZWZhY2UuSVRBTElDO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhckZvbnRTdHlsZS5Cb2xkSXRhbGljOlxuICAgICAgICAgICAgICAgICAgICBmb250U3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlR5cGVmYWNlLkJPTERfSVRBTElDO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGFuZHJvaWQuZ3JhcGhpY3MuVHlwZWZhY2UuY3JlYXRlKG5hbWUsIGZvbnRTdHlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFuZHJvaWQuZ3JhcGhpY3MuVHlwZWZhY2UuY3JlYXRlKGFuZHJvaWQuZ3JhcGhpY3MuVHlwZWZhY2UuREVGQVVMVCwgZm9udFN0eWxlKTtcbiAgICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNUWUxFUyBGT1IgRElGRkVSRU5UIENFTEwgVFlQRVNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vKipcbiAqIEVudW0gdmFsdWVzIGlkZW50aWZ5IHRvIHdoYXQgdHlwZSBvZiBjZWxscyBpcyByZWxhdGVkIHRoZSBzdHlsZSBvYmplY3TvnKlcbiAqL1xuZXhwb3J0IGVudW0gQ2VsbFN0eWxlVHlwZSB7XG4gICAgUmVndWxhckRheVN0eWxlLCAvLyBjZWxsIGZvciByZWd1bGFyIGRheSBkYXRlcyBpbiBtb250aCBhbmQgd2VlayB2aWV3XG4gICAgU2VsZWN0ZWREYXlTdHlsZSwgLy8gY2VsbCBmb3Igc2VsZWN0ZWQgZGF5IHN0eWxlXG4gICAgVG9kYXlTdHlsZSwgICAgIC8vIGNlbGwgZm9yIHRvZGF5IGRhdGUgaW4gbW9udGggdmlld1xuICAgIFdlZWtOdW1iZXJTdHlsZSwgLy8gY2VsbCBmb3Igd2VlayBudW1iZXIgaW4gbW9udGggdmlld1xuICAgIFdlZWtlbmRTdHlsZSwgICAvLyBjZWxsIGZvciAgd2Vla2VuZCBkYXlzIGluIG1vbnRoIHZpZXdcbiAgICBEYXlOYW1lU3R5bGUsICAgLy8gY2VsbCBmb3IgZGF5IG5hbWUgaW4gbW9udGggdmlld1xuICAgIFRpdGxlU3R5bGUsICAgICAvLyBjZWxsIGZvciBjYWxlbmRhciB0aXRsZSBpbiBhbGwgdmlldyBtb2Rlc1xuICAgIE1vbnRoTmFtZVN0eWxlICAvLyBjZWxsIGZvciBtb250aCBuYW1lIGluIGNvbXBhY3QgWWVhciB2aWV3IG1vZGVcbn1cblxuZXhwb3J0IGNsYXNzIENlbGxTdHlsZUluaXRpYWxpemVyIHtcblxuICAgIGFwcGx5U3R5bGUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLmNoYW5nZUNlbGxCb3JkZXJXaWR0aCh2YWx1ZS5jZWxsQm9yZGVyV2lkdGgsIHZhbHVlKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VDZWxsQm9yZGVyQ29sb3IodmFsdWUuY2VsbEJvcmRlckNvbG9yLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuY2hhbmdlQ2VsbEJhY2tncm91bmRDb2xvcih2YWx1ZS5jZWxsQmFja2dyb3VuZENvbG9yLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuY2hhbmdlQ2VsbEFsaWdubWVudCh2YWx1ZS5jZWxsQWxpZ25tZW50LCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuY2hhbmdlQ2VsbFBhZGRpbmdIb3Jpem9udGFsKHZhbHVlLmNlbGxQYWRkaW5nSG9yaXpvbnRhbCwgdmFsdWUpO1xuICAgICAgICB0aGlzLmNoYW5nZUNlbGxQYWRkaW5nVmVydGljYWwodmFsdWUuY2VsbFBhZGRpbmdWZXJ0aWNhbCwgdmFsdWUpO1xuICAgICAgICB0aGlzLmNoYW5nZUNlbGxUZXh0Q29sb3IodmFsdWUuY2VsbFRleHRDb2xvciwgdmFsdWUpO1xuICAgICAgICB0aGlzLmNoYW5nZUNlbGxUZXh0Rm9udE5hbWUodmFsdWUuY2VsbFRleHRGb250TmFtZSwgdmFsdWUpO1xuICAgICAgICB0aGlzLmNoYW5nZUNlbGxUZXh0Rm9udFN0eWxlKHZhbHVlLmNlbGxUZXh0Rm9udFN0eWxlLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuY2hhbmdlQ2VsbFRleHRTaXplKHZhbHVlLmNlbGxUZXh0U2l6ZSwgdmFsdWUpO1xuICAgICAgICB2YWx1ZS5vblN0eWxlQ2hhbmdlZCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlQ2VsbEJvcmRlcldpZHRoKHZhbHVlOiBhbnksIHN0eWxlOiBhbnkpIHtcbiAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJvcmRlcldpZHRoID0gbmV3IGphdmEubGFuZy5GbG9hdCh2YWx1ZSAqIHV0aWxzTW9kdWxlLmxheW91dC5nZXREaXNwbGF5RGVuc2l0eSgpKTtcbiAgICAgICAgc3R5bGUuYW5kcm9pZC5zZXRCb3JkZXJXaWR0aChib3JkZXJXaWR0aCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2VsbEJvcmRlcldpZHRoQ2hhbmdlZCh2YWx1ZTogYW55LCBzdHlsZTogYW55KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlQ2VsbEJvcmRlcldpZHRoKHZhbHVlLCBzdHlsZSk7XG4gICAgICAgIHN0eWxlLm9uU3R5bGVDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VDZWxsQm9yZGVyQ29sb3IodmFsdWU6IENvbG9yLCBzdHlsZTogYW55KSB7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb2xvcjogbnVtYmVyID0gdmFsdWUuYXJnYjtcbiAgICAgICAgbGV0IGJvcmRlckNvbG9yID0gbmV3IGphdmEubGFuZy5JbnRlZ2VyKGNvbG9yKTtcbiAgICAgICAgc3R5bGUuYW5kcm9pZC5zZXRCb3JkZXJDb2xvcihib3JkZXJDb2xvcik7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2VsbEJvcmRlckNvbG9yQ2hhbmdlZCh2YWx1ZTogQ29sb3IsIHN0eWxlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VDZWxsQm9yZGVyQ29sb3IodmFsdWUsIHN0eWxlKTtcbiAgICAgICAgc3R5bGUub25TdHlsZUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZUNlbGxCYWNrZ3JvdW5kQ29sb3IodmFsdWU6IENvbG9yLCBzdHlsZTogYW55KSB7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY29sb3I6IG51bWJlciA9IHZhbHVlLmFyZ2I7XG4gICAgICAgIGxldCBiYWNrZ3JvdW5kQ29sb3IgPSBuZXcgamF2YS5sYW5nLkludGVnZXIoY29sb3IpO1xuICAgICAgICBzdHlsZS5hbmRyb2lkLnNldEJhY2tncm91bmRDb2xvcihiYWNrZ3JvdW5kQ29sb3IpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNlbGxCYWNrZ3JvdW5kQ29sb3JDaGFuZ2VkKHZhbHVlOiBDb2xvciwgc3R5bGU6IGFueSkge1xuICAgICAgICB0aGlzLmNoYW5nZUNlbGxCYWNrZ3JvdW5kQ29sb3IodmFsdWUsIHN0eWxlKTtcbiAgICAgICAgc3R5bGUub25TdHlsZUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZUNlbGxBbGlnbm1lbnQodmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckNlbGxBbGlnbm1lbnQsIHN0eWxlOiBhbnkpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBvc2l0aW9uO1xuICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhckNlbGxBbGlnbm1lbnQuQm90dG9tOlxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyRWxlbWVudC5CT1RUT007XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhckNlbGxBbGlnbm1lbnQuVG9wOlxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyRWxlbWVudC5UT1A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhckNlbGxBbGlnbm1lbnQuTGVmdDpcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckVsZW1lbnQuTEVGVDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyQ2VsbEFsaWdubWVudC5SaWdodDpcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckVsZW1lbnQuUklHSFQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhckNlbGxBbGlnbm1lbnQuSG9yaXpvbnRhbENlbnRlcjpcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckVsZW1lbnQuQ0VOVEVSX0hPUklaT05UQUw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhckNlbGxBbGlnbm1lbnQuVmVydGljYWxDZW50ZXI6XG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJFbGVtZW50LkNFTlRFUl9WRVJUSUNBTDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJFbGVtZW50LkNFTlRFUjtcblxuICAgICAgICB9XG4gICAgICAgIGxldCBwb3NpdGlvblZhbHVlID0gbmV3IGphdmEubGFuZy5JbnRlZ2VyKHBvc2l0aW9uKTtcbiAgICAgICAgc3R5bGUuYW5kcm9pZC5zZXRUZXh0UG9zaXRpb24ocG9zaXRpb25WYWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2VsbEFsaWdubWVudENoYW5nZWQodmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckNlbGxBbGlnbm1lbnQsIHN0eWxlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VDZWxsQWxpZ25tZW50KHZhbHVlLCBzdHlsZSk7XG4gICAgICAgIHN0eWxlLm9uU3R5bGVDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VDZWxsUGFkZGluZ0hvcml6b250YWwodmFsdWU6IGFueSwgc3R5bGU6IGFueSkge1xuICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFkZGluZ1ZhbCA9IHZhbHVlICogdXRpbHNNb2R1bGUubGF5b3V0LmdldERpc3BsYXlEZW5zaXR5KCk7XG4gICAgICAgIGxldCBwYWRkaW5nID0gbmV3IGphdmEubGFuZy5JbnRlZ2VyKHBhZGRpbmdWYWwpO1xuICAgICAgICBzdHlsZS5hbmRyb2lkLnNldFBhZGRpbmdIb3Jpem9udGFsKHBhZGRpbmcpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNlbGxQYWRkaW5nSG9yaXpvbnRhbENoYW5nZWQodmFsdWU6IGFueSwgc3R5bGU6IGFueSkge1xuICAgICAgICB0aGlzLmNoYW5nZUNlbGxQYWRkaW5nSG9yaXpvbnRhbCh2YWx1ZSwgc3R5bGUpO1xuICAgICAgICBzdHlsZS5vblN0eWxlQ2hhbmdlZCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlQ2VsbFBhZGRpbmdWZXJ0aWNhbCh2YWx1ZTogYW55LCBzdHlsZTogYW55KSB7XG4gICAgICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYWRkaW5nVmFsID0gdmFsdWUgKiB1dGlsc01vZHVsZS5sYXlvdXQuZ2V0RGlzcGxheURlbnNpdHkoKTtcbiAgICAgICAgbGV0IHBhZGRpbmcgPSBuZXcgamF2YS5sYW5nLkludGVnZXIocGFkZGluZ1ZhbCk7XG4gICAgICAgIHN0eWxlLmFuZHJvaWQuc2V0UGFkZGluZ1ZlcnRpY2FsKHBhZGRpbmcpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNlbGxQYWRkaW5nVmVydGljYWxDaGFuZ2VkKHZhbHVlOiBhbnksIHN0eWxlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VDZWxsUGFkZGluZ1ZlcnRpY2FsKHZhbHVlLCBzdHlsZSk7XG4gICAgICAgIHN0eWxlLm9uU3R5bGVDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VDZWxsVGV4dENvbG9yKHZhbHVlOiBDb2xvciwgc3R5bGU6IGFueSkge1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY29sb3I6IG51bWJlciA9IHZhbHVlLmFyZ2I7XG4gICAgICAgIGxldCB0ZXh0Q29sb3IgPSBuZXcgamF2YS5sYW5nLkludGVnZXIoY29sb3IpO1xuICAgICAgICBzdHlsZS5hbmRyb2lkLnNldFRleHRDb2xvcih0ZXh0Q29sb3IpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNlbGxUZXh0Q29sb3JDaGFuZ2VkKHZhbHVlOiBDb2xvciwgc3R5bGU6IGFueSkge1xuICAgICAgICB0aGlzLmNoYW5nZUNlbGxUZXh0Q29sb3IodmFsdWUsIHN0eWxlKTtcbiAgICAgICAgc3R5bGUub25TdHlsZUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZUNlbGxUZXh0Rm9udE5hbWUodmFsdWU6IGFueSwgc3R5bGU6IGFueSkge1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZm9udDogYW5kcm9pZC5ncmFwaGljcy5UeXBlZmFjZSA9IFRvb2wuY3JlYXRlVHlwZWZhY2UodmFsdWUsIHN0eWxlLmNlbGxUZXh0Rm9udFN0eWxlKTtcbiAgICAgICAgc3R5bGUuYW5kcm9pZC5zZXRGb250TmFtZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2VsbFRleHRGb250TmFtZUNoYW5nZWQodmFsdWU6IGFueSwgc3R5bGU6IGFueSkge1xuICAgICAgICB0aGlzLmNoYW5nZUNlbGxUZXh0Rm9udE5hbWUodmFsdWUsIHN0eWxlKTtcbiAgICAgICAgc3R5bGUub25TdHlsZUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZUNlbGxUZXh0Rm9udFN0eWxlKHZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJGb250U3R5bGUsIHN0eWxlOiBhbnkpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZvbnQ6IGFuZHJvaWQuZ3JhcGhpY3MuVHlwZWZhY2UgPSBUb29sLmNyZWF0ZVR5cGVmYWNlKHN0eWxlLmNlbGxUZXh0Rm9udE5hbWUsIHZhbHVlKTtcbiAgICAgICAgbGV0IGZvbnRTdHlsZSA9IG5ldyBqYXZhLmxhbmcuSW50ZWdlcihmb250LmdldFN0eWxlKCkpO1xuICAgICAgICBzdHlsZS5hbmRyb2lkLnNldEZvbnRTdHlsZShmb250U3R5bGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNlbGxUZXh0Rm9udFN0eWxlQ2hhbmdlZCh2YWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlLCBzdHlsZTogYW55KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlQ2VsbFRleHRGb250U3R5bGUodmFsdWUsIHN0eWxlKTtcbiAgICAgICAgc3R5bGUub25TdHlsZUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZUNlbGxUZXh0U2l6ZSh2YWx1ZTogYW55LCBzdHlsZTogYW55KSB7XG4gICAgICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2l6ZSA9IHZhbHVlICogdXRpbHNNb2R1bGUubGF5b3V0LmdldERpc3BsYXlEZW5zaXR5KCk7XG4gICAgICAgIGxldCB0ZXh0U2l6ZSA9IG5ldyBqYXZhLmxhbmcuRmxvYXQoc2l6ZSk7XG4gICAgICAgIHN0eWxlLmFuZHJvaWQuc2V0VGV4dFNpemUodGV4dFNpemUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNlbGxUZXh0U2l6ZUNoYW5nZWQodmFsdWU6IGFueSwgc3R5bGU6IGFueSkge1xuICAgICAgICB0aGlzLmNoYW5nZUNlbGxUZXh0U2l6ZSh2YWx1ZSwgc3R5bGUpO1xuICAgICAgICBzdHlsZS5vblN0eWxlQ2hhbmdlZCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtYWtlRGF5Q2VsbEZpbHRlcihcbiAgICAgICAgY2VsbFN0eWxlVHlwZTogQ2VsbFN0eWxlVHlwZSxcbiAgICAgICAgZGlzcGxheU1vZGU6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckRpc3BsYXlNb2RlKTpcbiAgICAgICAgY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyRGF5Q2VsbEZpbHRlciB7XG4gICAgICAgIGxldCBjZWxsRmlsdGVyID0gbmV3IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckRheUNlbGxGaWx0ZXIoKTtcbiAgICAgICAgbGV0IHBvc2l0aXZlRmlsdGVyID0gbmV3IGphdmEubGFuZy5Cb29sZWFuKHRydWUpO1xuXG4gICAgICAgIHN3aXRjaCAoY2VsbFN0eWxlVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBDZWxsU3R5bGVUeXBlLlRvZGF5U3R5bGU6XG4gICAgICAgICAgICAgICAgY2VsbEZpbHRlci5zZXRJc1RvZGF5KHBvc2l0aXZlRmlsdGVyKTtcbiAgICAgICAgICAgIGNhc2UgQ2VsbFN0eWxlVHlwZS5SZWd1bGFyRGF5U3R5bGU6XG4gICAgICAgICAgICAgICAgY2VsbEZpbHRlci5zZXRDZWxsVHlwZShjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJDZWxsVHlwZS5EYXRlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ2VsbFN0eWxlVHlwZS5XZWVrZW5kU3R5bGU6XG4gICAgICAgICAgICAgICAgY2VsbEZpbHRlci5zZXRJc1dlZWtlbmQocG9zaXRpdmVGaWx0ZXIpO1xuICAgICAgICAgICAgICAgIGNlbGxGaWx0ZXIuc2V0Q2VsbFR5cGUoY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyQ2VsbFR5cGUuRGF0ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENlbGxTdHlsZVR5cGUuRGF5TmFtZVN0eWxlOlxuICAgICAgICAgICAgICAgIGNlbGxGaWx0ZXIuc2V0Q2VsbFR5cGUoY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyQ2VsbFR5cGUuRGF5TmFtZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENlbGxTdHlsZVR5cGUuV2Vla051bWJlclN0eWxlOlxuICAgICAgICAgICAgICAgIGNlbGxGaWx0ZXIuc2V0Q2VsbFR5cGUoY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyQ2VsbFR5cGUuV2Vla051bWJlcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENlbGxTdHlsZVR5cGUuVGl0bGVTdHlsZTpcbiAgICAgICAgICAgICAgICBjZWxsRmlsdGVyLnNldENlbGxUeXBlKGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckNlbGxUeXBlLlRpdGxlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ2VsbFN0eWxlVHlwZS5TZWxlY3RlZERheVN0eWxlOlxuICAgICAgICAgICAgICAgIGNlbGxGaWx0ZXIuc2V0Q2VsbFR5cGUoY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyQ2VsbFR5cGUuRGF0ZSk7XG4gICAgICAgICAgICAgICAgY2VsbEZpbHRlci5zZXRJc1NlbGVjdGVkKHBvc2l0aXZlRmlsdGVyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGlzcGxheU1vZGUpIHtcbiAgICAgICAgICAgIGNlbGxGaWx0ZXIuc2V0Q2FsZW5kYXJEaXNwbGF5TW9kZShkaXNwbGF5TW9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNlbGxGaWx0ZXI7XG4gICAgfVxuXG4gICAgcHVibGljIG1ha2VNb250aENlbGxGaWx0ZXIoKTogY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyTW9udGhDZWxsRmlsdGVyIHtcbiAgICAgICAgbGV0IGNlbGxGaWx0ZXIgPSBuZXcgY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyTW9udGhDZWxsRmlsdGVyKCk7XG4gICAgICAgIGxldCBwb3NpdGl2ZUZpbHRlciA9IG5ldyBqYXZhLmxhbmcuQm9vbGVhbih0cnVlKTtcbiAgICAgICAgY2VsbEZpbHRlci5zZXRNb250aElzQ29tcGFjdChwb3NpdGl2ZUZpbHRlcik7XG4gICAgICAgIHJldHVybiBjZWxsRmlsdGVyO1xuICAgIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5leHBvcnQgY2xhc3MgQ2VsbFN0eWxlIGV4dGVuZHMgY29tbW9uTW9kdWxlLkNlbGxTdHlsZSB7XG5cbiAgICBwcml2YXRlIF9uYXRpdmVJc1llYXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzZXQgbmF0aXZlSXNZZWFyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLl9uYXRpdmVJc1llYXIgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVJc1llYXIgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX2FuZHJvaWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb3duZXI6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5SYWRDYWxlbmRhclZpZXc7XG4gICAgc2V0IG93bmVyKHZhbHVlOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuUmFkQ2FsZW5kYXJWaWV3KSB7XG4gICAgICAgIHRoaXMuX293bmVyID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdGlhbGl6ZXI6IENlbGxTdHlsZUluaXRpYWxpemVyO1xuICAgIGdldCBpbml0aWFsaXplcigpOiBDZWxsU3R5bGVJbml0aWFsaXplciB7XG4gICAgICAgIGlmICghdGhpcy5faW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVyID0gbmV3IENlbGxTdHlsZUluaXRpYWxpemVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRpYWxpemVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FuZHJvaWQ6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckNlbGxTdHlsZTtcbiAgICBnZXQgYW5kcm9pZCgpOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJDZWxsU3R5bGUge1xuICAgICAgICBpZiAoIXRoaXMuX2FuZHJvaWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmVJc1llYXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmRyb2lkID0gbmV3IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhck1vbnRoQ2VsbFN0eWxlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplci5hcHBseVN0eWxlKHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmRyb2lkID0gbmV3IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckRheUNlbGxTdHlsZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fYW5kcm9pZDtcbiAgICB9XG5cbiAgICB1cGRhdGVOYXRpdmVTdHlsZUZpbHRlcnMoXG4gICAgICAgIGNlbGxTdHlsZVR5cGU6IENlbGxTdHlsZVR5cGUsXG4gICAgICAgIGRpc3BsYXlNb2RlOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJEaXNwbGF5TW9kZSkge1xuXG4gICAgICAgIGlmICghdGhpcy5fb3duZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbmF0aXZlSXNZZWFyKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVyID0gdGhpcy5pbml0aWFsaXplci5tYWtlTW9udGhDZWxsRmlsdGVyKCk7XG4gICAgICAgICAgICAoPGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhck1vbnRoQ2VsbFN0eWxlPnRoaXMuYW5kcm9pZCkuc2V0RmlsdGVyKGZpbHRlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVyID0gdGhpcy5pbml0aWFsaXplci5tYWtlRGF5Q2VsbEZpbHRlcihjZWxsU3R5bGVUeXBlLCBkaXNwbGF5TW9kZSk7XG4gICAgICAgICAgICAoPGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckRheUNlbGxTdHlsZT50aGlzLmFuZHJvaWQpLnNldEZpbHRlcihmaWx0ZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uU3R5bGVDaGFuZ2VkKCkge1xuICAgICAgICBpZiAodGhpcy5fb3duZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX293bmVyLnVwZGF0ZUNhbGVuZGFyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uQ2VsbEJvcmRlcldpZHRoQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25DZWxsQm9yZGVyV2lkdGhDaGFuZ2VkKG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uQ2VsbEJvcmRlckNvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uQ2VsbEJvcmRlckNvbG9yQ2hhbmdlZChuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkNlbGxCYWNrZ3JvdW5kQ29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25DZWxsQmFja2dyb3VuZENvbG9yQ2hhbmdlZChuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkNlbGxUZXh0Q29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25DZWxsVGV4dENvbG9yQ2hhbmdlZChuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkNlbGxUZXh0Rm9udE5hbWVDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vbkNlbGxUZXh0Rm9udE5hbWVDaGFuZ2VkKG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uQ2VsbFRleHRGb250U3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJGb250U3R5bGUsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJGb250U3R5bGUpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vbkNlbGxUZXh0Rm9udFN0eWxlQ2hhbmdlZChuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkNlbGxUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uQ2VsbFRleHRTaXplQ2hhbmdlZChuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkNlbGxQYWRkaW5nSG9yaXpvbnRhbENoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uQ2VsbFBhZGRpbmdIb3Jpem9udGFsQ2hhbmdlZChuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkNlbGxQYWRkaW5nVmVydGljYWxDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vbkNlbGxQYWRkaW5nVmVydGljYWxDaGFuZ2VkKG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uQ2VsbEFsaWdubWVudENoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckNlbGxBbGlnbm1lbnQsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJDZWxsQWxpZ25tZW50KSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25DZWxsQWxpZ25tZW50Q2hhbmdlZChuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGF5RXZlbnRzVmlld1N0eWxlIGV4dGVuZHMgY29tbW9uTW9kdWxlLkRheUV2ZW50c1ZpZXdTdHlsZSB7XG4gICAgcHJpdmF0ZSBfb3duZXI6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5SYWRDYWxlbmRhclZpZXc7XG4gICAgc2V0IG93bmVyKHZhbHVlOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuUmFkQ2FsZW5kYXJWaWV3KSB7XG4gICAgICAgIHRoaXMuX293bmVyID0gdmFsdWU7XG4gICAgICAgIHRoaXMuYXBwbHlTdHlsZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hbmRyb2lkOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuZGF5dmlldy5EYXlFdmVudHNWaWV3U3R5bGU7XG4gICAgZ2V0IGFuZHJvaWQoKTogY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLmRheXZpZXcuRGF5RXZlbnRzVmlld1N0eWxlIHtcbiAgICAgICAgaWYgKCF0aGlzLl9vd25lcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX293bmVyLmdldERheVZpZXcoKS5nZXREYXlFdmVudHNWaWV3U3R5bGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXBwbHlTdHlsZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmJhY2tncm91bmRDb2xvcikge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VCYWNrZ3JvdW5kQ29sb3IobnVsbCwgdGhpcy5iYWNrZ3JvdW5kQ29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRpbWVMYWJlbEZvcm1hdCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUaW1lTGFiZWxGb3JtYXQobnVsbCwgdGhpcy50aW1lTGFiZWxGb3JtYXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRpbWVMYWJlbFRleHRDb2xvcikge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUaW1lTGFiZWxUZXh0Q29sb3IobnVsbCwgdGhpcy50aW1lTGFiZWxUZXh0Q29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRpbWVMYWJlbFRleHRTaXplKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWVMYWJlbFRleHRTaXplKG51bGwsIHRoaXMudGltZUxhYmVsVGV4dFNpemUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRpbWVMaW5lc1dpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWVMaW5lc1dpZHRoKG51bGwsIHRoaXMudGltZUxpbmVzV2lkdGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRpbWVMaW5lc0NvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWVMaW5lc0NvbG9yKG51bGwsIHRoaXMudGltZUxpbmVzQ29sb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQmFja2dyb3VuZENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICB0aGlzLmNoYW5nZUJhY2tncm91bmRDb2xvcihvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlQmFja2dyb3VuZENvbG9yKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAmJiB0aGlzLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIHRoaXMuYW5kcm9pZC5zZXRCYWNrZ3JvdW5kQ29sb3IobmV3VmFsdWUuYW5kcm9pZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UaW1lTGFiZWxGb3JtYXRDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VUaW1lTGFiZWxGb3JtYXQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZVRpbWVMYWJlbEZvcm1hdChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIHRoaXMuYW5kcm9pZC5zZXRUaW1lTGFiZWxGb3JtYXQobmV3IGphdmEudGV4dC5TaW1wbGVEYXRlRm9ybWF0KG5ld1ZhbHVlKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UaW1lTGFiZWxUZXh0Q29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlVGltZUxhYmVsVGV4dENvbG9yKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VUaW1lTGFiZWxUZXh0Q29sb3Iob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICYmIHRoaXMuYW5kcm9pZCkge1xuICAgICAgICAgICAgdGhpcy5hbmRyb2lkLnNldFRpbWVMYWJlbENvbG9yKG5ld1ZhbHVlLmFuZHJvaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVGltZUxhYmVsVGV4dFNpemVDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VUaW1lTGFiZWxUZXh0U2l6ZShvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlVGltZUxhYmVsVGV4dFNpemUob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5hbmRyb2lkKSB7XG4gICAgICAgICAgICB0aGlzLmFuZHJvaWQuc2V0VGltZUxhYmVsVGV4dFNpemUobmV3VmFsdWUgKiB1dGlsc01vZHVsZS5sYXlvdXQuZ2V0RGlzcGxheURlbnNpdHkoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UaW1lTGluZXNXaWR0aENoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmNoYW5nZVRpbWVMaW5lc1dpZHRoKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VUaW1lTGluZXNXaWR0aChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIHRoaXMuYW5kcm9pZC5zZXRUaW1lTGluZXNXaWR0aChuZXdWYWx1ZSAqIHV0aWxzTW9kdWxlLmxheW91dC5nZXREaXNwbGF5RGVuc2l0eSgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRpbWVMaW5lc0NvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICB0aGlzLmNoYW5nZVRpbWVMaW5lc0NvbG9yKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VUaW1lTGluZXNDb2xvcihvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICBpZiAobmV3VmFsdWUgJiYgdGhpcy5hbmRyb2lkKSB7XG4gICAgICAgICAgICB0aGlzLmFuZHJvaWQuc2V0VGltZUxpbmVzQ29sb3IobmV3VmFsdWUuYW5kcm9pZCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBbGxEYXlFdmVudHNWaWV3U3R5bGUgZXh0ZW5kcyBjb21tb25Nb2R1bGUuQWxsRGF5RXZlbnRzVmlld1N0eWxlIHtcbiAgICBwcml2YXRlIF9vd25lcjogY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLlJhZENhbGVuZGFyVmlldztcbiAgICBzZXQgb3duZXIodmFsdWU6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5SYWRDYWxlbmRhclZpZXcpIHtcbiAgICAgICAgdGhpcy5fb3duZXIgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5hcHBseVN0eWxlcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FuZHJvaWQ6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5kYXl2aWV3LkFsbERheUV2ZW50c1ZpZXdTdHlsZTtcbiAgICBnZXQgYW5kcm9pZCgpOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuZGF5dmlldy5BbGxEYXlFdmVudHNWaWV3U3R5bGUge1xuICAgICAgICBpZiAoIXRoaXMuX293bmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fb3duZXIuZ2V0RGF5VmlldygpLmdldEFsbERheUV2ZW50c1ZpZXdTdHlsZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhcHBseVN0eWxlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUJhY2tncm91bmRDb2xvcihudWxsLCB0aGlzLmJhY2tncm91bmRDb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYWxsRGF5VGV4dCAhPT0gQWxsRGF5RXZlbnRzVmlld1N0eWxlLkFMTF9EQVlfVEVYVCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VBbGxEYXlUZXh0KEFsbERheUV2ZW50c1ZpZXdTdHlsZS5BTExfREFZX1RFWFQsIHRoaXMuYWxsRGF5VGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYWxsRGF5VGV4dElzVmlzaWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFsbERheVRleHRJc1Zpc2libGUobnVsbCwgdGhpcy5hbGxEYXlUZXh0SXNWaXNpYmxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkJhY2tncm91bmRDb2xvckNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VCYWNrZ3JvdW5kQ29sb3Iob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZUJhY2tncm91bmRDb2xvcihvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICBpZiAobmV3VmFsdWUgJiYgdGhpcy5hbmRyb2lkKSB7XG4gICAgICAgICAgICB0aGlzLmFuZHJvaWQuc2V0QmFja2dyb3VuZENvbG9yKG5ld1ZhbHVlLmFuZHJvaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQWxsRGF5VGV4dENoYW5nZWQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmNoYW5nZUFsbERheVRleHQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZUFsbERheVRleHQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5hbmRyb2lkKSB7XG4gICAgICAgICAgICB0aGlzLmFuZHJvaWQuc2V0QWxsRGF5VGV4dChuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25BbGxEYXlUZXh0SXNWaXNpYmxlQ2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VBbGxEYXlUZXh0SXNWaXNpYmxlKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VBbGxEYXlUZXh0SXNWaXNpYmxlKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5hbmRyb2lkKSB7XG4gICAgICAgICAgICB0aGlzLmFuZHJvaWQuc2V0QWxsRGF5VGV4dElzVmlzaWJsZShuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGNsYXNzIERheUNlbGxTdHlsZSBleHRlbmRzIGNvbW1vbk1vZHVsZS5EYXlDZWxsU3R5bGUge1xuXG4gICAgcHJpdmF0ZSBfb3duZXI6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5SYWRDYWxlbmRhclZpZXc7XG4gICAgc2V0IG93bmVyKHZhbHVlOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuUmFkQ2FsZW5kYXJWaWV3KSB7XG4gICAgICAgIHRoaXMuX293bmVyID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZXZlbnRBZGFwdGVyOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuZXZlbnRzLkV2ZW50QWRhcHRlcjtcbiAgICBzZXQgZXZlbnRBZGFwdGVyKHZhbHVlOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuZXZlbnRzLkV2ZW50QWRhcHRlcikge1xuICAgICAgICB0aGlzLl9ldmVudEFkYXB0ZXIgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0aWFsaXplcjogQ2VsbFN0eWxlSW5pdGlhbGl6ZXI7XG4gICAgZ2V0IGluaXRpYWxpemVyKCk6IENlbGxTdHlsZUluaXRpYWxpemVyIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0aWFsaXplcikge1xuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZXIgPSBuZXcgQ2VsbFN0eWxlSW5pdGlhbGl6ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5faW5pdGlhbGl6ZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYW5kcm9pZDogY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyRGF5Q2VsbFN0eWxlO1xuICAgIGdldCBhbmRyb2lkKCk6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckRheUNlbGxTdHlsZSB7XG4gICAgICAgIGlmICghdGhpcy5fYW5kcm9pZCkge1xuICAgICAgICAgICAgdGhpcy5fYW5kcm9pZCA9IG5ldyBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJEYXlDZWxsU3R5bGUoKTtcblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9hbmRyb2lkO1xuICAgIH1cblxuICAgIHVwZGF0ZU5hdGl2ZVN0eWxlRmlsdGVycyhcbiAgICAgICAgY2VsbFN0eWxlVHlwZTogQ2VsbFN0eWxlVHlwZSxcbiAgICAgICAgZGlzcGxheU1vZGU6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckRpc3BsYXlNb2RlKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9vd25lcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZpbHRlciA9IHRoaXMuaW5pdGlhbGl6ZXIubWFrZURheUNlbGxGaWx0ZXIoY2VsbFN0eWxlVHlwZSwgZGlzcGxheU1vZGUpO1xuICAgICAgICB0aGlzLmFuZHJvaWQuc2V0RmlsdGVyKGZpbHRlcik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQ2VsbEJvcmRlcldpZHRoQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25DZWxsQm9yZGVyV2lkdGhDaGFuZ2VkKG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uQ2VsbEJvcmRlckNvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uQ2VsbEJvcmRlckNvbG9yQ2hhbmdlZChuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkNlbGxCYWNrZ3JvdW5kQ29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25DZWxsQmFja2dyb3VuZENvbG9yQ2hhbmdlZChuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkNlbGxUZXh0Q29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25DZWxsVGV4dENvbG9yQ2hhbmdlZChuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkNlbGxUZXh0Rm9udE5hbWVDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vbkNlbGxUZXh0Rm9udE5hbWVDaGFuZ2VkKG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uQ2VsbFRleHRGb250U3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJGb250U3R5bGUsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJGb250U3R5bGUpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vbkNlbGxUZXh0Rm9udFN0eWxlQ2hhbmdlZChuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkNlbGxUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uQ2VsbFRleHRTaXplQ2hhbmdlZChuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkNlbGxQYWRkaW5nSG9yaXpvbnRhbENoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uQ2VsbFBhZGRpbmdIb3Jpem9udGFsQ2hhbmdlZChuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkNlbGxQYWRkaW5nVmVydGljYWxDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vbkNlbGxQYWRkaW5nVmVydGljYWxDaGFuZ2VkKG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uQ2VsbEFsaWdubWVudENoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckNlbGxBbGlnbm1lbnQsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJDZWxsQWxpZ25tZW50KSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25DZWxsQWxpZ25tZW50Q2hhbmdlZChuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uU3R5bGVDaGFuZ2VkKCkge1xuICAgICAgICBpZiAodGhpcy5fb3duZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX293bmVyLnVwZGF0ZUNhbGVuZGFyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkYXkgY2VsbCBzcGVjaWZpYyBwcm9wZXJ0aWVzXG4gICAgcHJvdGVjdGVkIG9uU2hvd0V2ZW50c1RleHRDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCB8fCBuZXdWYWx1ZSA9PSBudWxsIHx8ICF0aGlzLmV2ZW50QWRhcHRlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRBZGFwdGVyLmdldFJlbmRlcmVyKCkuc2V0RXZlbnRSZW5kZXJNb2RlKG5ld1ZhbHVlID8gY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLmV2ZW50cy5FdmVudFJlbmRlck1vZGUuU2hhcGVfQW5kX1RleHQgOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuZXZlbnRzLkV2ZW50UmVuZGVyTW9kZS5TaGFwZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRXZlbnRUZXh0Q29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIGlmICghbmV3VmFsdWUgfHwgIXRoaXMuZXZlbnRBZGFwdGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETzogRXZlbnQgdGV4dCBjb2xvciBwcm9wZXJ0eSBub3Qgc3VwcG9ydGVkIGluIEFuZHJvaWQuXG4gICAgfVxuICAgIHByb3RlY3RlZCBvbkV2ZW50Rm9udE5hbWVDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFuZXdWYWx1ZSB8fCAhdGhpcy5ldmVudEFkYXB0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPOiBFdmVudCBmb250IG5hbWUgcHJvcGVydHkgbm90IHN1cHBvcnRlZCBpbiBBbmRyb2lkLlxuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25FdmVudEZvbnRTdHlsZUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckZvbnRTdHlsZSwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckZvbnRTdHlsZSkge1xuICAgICAgICBpZiAoIW5ld1ZhbHVlIHx8ICF0aGlzLmV2ZW50QWRhcHRlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE86IEV2ZW50IGZvbnQgc3R5bGUgcHJvcGVydHkgbm90IHN1cHBvcnRlZCBpbiBBbmRyb2lkLlxuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25FdmVudFRleHRTaXplQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmIChpc05hTihuZXdWYWx1ZSkgfHwgIXRoaXMuZXZlbnRBZGFwdGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ldmVudEFkYXB0ZXIuZ2V0UmVuZGVyZXIoKS5zZXRFdmVudFRleHRTaXplKG5ld1ZhbHVlICogdXRpbHNNb2R1bGUubGF5b3V0LmdldERpc3BsYXlEZW5zaXR5KCkpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDZWxsIHN0eWxlIGNsYXNzIGZvciBtb250aHMgaW4geWVhciB2aWV3IG1vZGVcbiAqL1xuZXhwb3J0IGNsYXNzIE1vbnRoQ2VsbFN0eWxlIGV4dGVuZHMgY29tbW9uTW9kdWxlLk1vbnRoQ2VsbFN0eWxlIHtcblxuICAgIC8vIHByaXZhdGUgbmF0aXZlT3duZXI6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5SYWRDYWxlbmRhclZpZXc7XG4gICAgLy8gc2V0IG93bmVyKHZhbHVlOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuUmFkQ2FsZW5kYXJWaWV3KSB7XG4gICAgLy8gICAgIHRoaXMubmF0aXZlT3duZXIgPSB2YWx1ZTtcbiAgICAvLyB9XG5cbiAgICBwcml2YXRlIF9yZWd1bGFyRGF5U3R5bGU6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhck1vbnRoQ2VsbFN0eWxlO1xuICAgIGdldCByZWd1bGFyRGF5U3R5bGUoKTogY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyTW9udGhDZWxsU3R5bGUge1xuICAgICAgICBpZiAoIXRoaXMuX3JlZ3VsYXJEYXlTdHlsZSkge1xuICAgICAgICAgICAgdGhpcy5fcmVndWxhckRheVN0eWxlID0gbmV3IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhck1vbnRoQ2VsbFN0eWxlKCk7XG4gICAgICAgICAgICBsZXQgZGF0ZU1vbnRoQ2VsbEZpbHRlciA9IG5ldyBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJNb250aENlbGxGaWx0ZXIoKTtcbiAgICAgICAgICAgIGxldCBwb3NpdGl2ZUZpbHRlciA9IG5ldyBqYXZhLmxhbmcuQm9vbGVhbih0cnVlKTtcbiAgICAgICAgICAgIGRhdGVNb250aENlbGxGaWx0ZXIuc2V0VGV4dElzRGF0ZShwb3NpdGl2ZUZpbHRlcik7XG4gICAgICAgICAgICB0aGlzLl9yZWd1bGFyRGF5U3R5bGUuc2V0RmlsdGVyKGRhdGVNb250aENlbGxGaWx0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWd1bGFyRGF5U3R5bGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfd2Vla2VuZFN0eWxlOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJNb250aENlbGxTdHlsZTtcbiAgICBnZXQgd2Vla2VuZFN0eWxlKCk6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhck1vbnRoQ2VsbFN0eWxlIHtcbiAgICAgICAgaWYgKCF0aGlzLl93ZWVrZW5kU3R5bGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3dlZWtlbmRTdHlsZSA9IG5ldyBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJNb250aENlbGxTdHlsZSgpO1xuICAgICAgICAgICAgbGV0IHdlZWtlbmRNb250aENlbGxGaWx0ZXIgPSBuZXcgY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyTW9udGhDZWxsRmlsdGVyKCk7XG4gICAgICAgICAgICBsZXQgcG9zaXRpdmVGaWx0ZXIgPSBuZXcgamF2YS5sYW5nLkJvb2xlYW4odHJ1ZSk7XG4gICAgICAgICAgICB3ZWVrZW5kTW9udGhDZWxsRmlsdGVyLnNldFRleHRJc1dlZWtlbmQocG9zaXRpdmVGaWx0ZXIpO1xuICAgICAgICAgICAgdGhpcy5fd2Vla2VuZFN0eWxlLnNldEZpbHRlcih3ZWVrZW5kTW9udGhDZWxsRmlsdGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2VuZFN0eWxlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RvZGF5U3R5bGU6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhck1vbnRoQ2VsbFN0eWxlO1xuICAgIGdldCB0b2RheVN0eWxlKCk6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhck1vbnRoQ2VsbFN0eWxlIHtcbiAgICAgICAgaWYgKCF0aGlzLl90b2RheVN0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLl90b2RheVN0eWxlID0gbmV3IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhck1vbnRoQ2VsbFN0eWxlKCk7XG4gICAgICAgICAgICBsZXQgdG9kYXlNb250aENlbGxGaWx0ZXIgPSBuZXcgY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyTW9udGhDZWxsRmlsdGVyKCk7XG4gICAgICAgICAgICBsZXQgcG9zaXRpdmVGaWx0ZXIgPSBuZXcgamF2YS5sYW5nLkJvb2xlYW4odHJ1ZSk7XG4gICAgICAgICAgICB0b2RheU1vbnRoQ2VsbEZpbHRlci5zZXRUZXh0SXNUb2RheShwb3NpdGl2ZUZpbHRlcik7XG4gICAgICAgICAgICB0aGlzLl90b2RheVN0eWxlLnNldEZpbHRlcih0b2RheU1vbnRoQ2VsbEZpbHRlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvZGF5U3R5bGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGF5TmFtZVN0eWxlOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJNb250aENlbGxTdHlsZTtcbiAgICBnZXQgZGF5TmFtZVN0eWxlKCk6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhck1vbnRoQ2VsbFN0eWxlIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kYXlOYW1lU3R5bGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2RheU5hbWVTdHlsZSA9IG5ldyBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJNb250aENlbGxTdHlsZSgpO1xuICAgICAgICAgICAgbGV0IGRheU5hbWVNb250aENlbGxGaWx0ZXIgPSBuZXcgY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyTW9udGhDZWxsRmlsdGVyKCk7XG4gICAgICAgICAgICBsZXQgcG9zaXRpdmVGaWx0ZXIgPSBuZXcgamF2YS5sYW5nLkJvb2xlYW4odHJ1ZSk7XG4gICAgICAgICAgICBkYXlOYW1lTW9udGhDZWxsRmlsdGVyLnNldFRleHRJc0RheU5hbWUocG9zaXRpdmVGaWx0ZXIpO1xuICAgICAgICAgICAgdGhpcy5fZGF5TmFtZVN0eWxlLnNldEZpbHRlcihkYXlOYW1lTW9udGhDZWxsRmlsdGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZGF5TmFtZVN0eWxlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21vbnRoTmFtZVN0eWxlOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJNb250aENlbGxTdHlsZTtcbiAgICBnZXQgbW9udGhOYW1lU3R5bGUoKTogY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyTW9udGhDZWxsU3R5bGUge1xuICAgICAgICBpZiAoIXRoaXMuX21vbnRoTmFtZVN0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLl9tb250aE5hbWVTdHlsZSA9IG5ldyBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJNb250aENlbGxTdHlsZSgpO1xuICAgICAgICAgICAgbGV0IG1vbnRoTmFtZU1vbnRoQ2VsbEZpbHRlciA9IG5ldyBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJNb250aENlbGxGaWx0ZXIoKTtcbiAgICAgICAgICAgIGxldCBwb3NpdGl2ZUZpbHRlciA9IG5ldyBqYXZhLmxhbmcuQm9vbGVhbih0cnVlKTtcbiAgICAgICAgICAgIG1vbnRoTmFtZU1vbnRoQ2VsbEZpbHRlci5zZXRUZXh0SXNNb250aE5hbWUocG9zaXRpdmVGaWx0ZXIpO1xuICAgICAgICAgICAgdGhpcy5fbW9udGhOYW1lU3R5bGUuc2V0RmlsdGVyKG1vbnRoTmFtZU1vbnRoQ2VsbEZpbHRlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoTmFtZVN0eWxlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21vbnRoQ2VsbFN0eWxlOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJNb250aENlbGxTdHlsZTtcbiAgICBnZXQgbW9udGhDZWxsU3R5bGUoKTogY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyTW9udGhDZWxsU3R5bGUge1xuICAgICAgICBpZiAoIXRoaXMuX21vbnRoQ2VsbFN0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLl9tb250aENlbGxTdHlsZSA9IG5ldyBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJNb250aENlbGxTdHlsZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9tb250aENlbGxTdHlsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TdHlsZUNoYW5nZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLm93bmVyICYmIHRoaXMub3duZXIuZ2V0RGlzcGxheU1vZGUoKSA9PT0gY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyRGlzcGxheU1vZGUuWWVhcikge1xuICAgICAgICAgICAgdGhpcy5vd25lci51cGRhdGVDYWxlbmRhcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uV2Vla2VuZFRleHRDb2xvckNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgY29sb3IgPSBuZXdWYWx1ZS5hcmdiO1xuICAgICAgICAgICAgbGV0IHRleHRDb2xvciA9IG5ldyBqYXZhLmxhbmcuSW50ZWdlcihjb2xvcik7XG4gICAgICAgICAgICB0aGlzLndlZWtlbmRTdHlsZS5zZXRUZXh0Q29sb3IodGV4dENvbG9yKTtcbiAgICAgICAgICAgIHRoaXMub25TdHlsZUNoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRvZGF5VGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBjb2xvciA9IG5ld1ZhbHVlLmFyZ2I7XG4gICAgICAgICAgICBsZXQgdGV4dENvbG9yID0gbmV3IGphdmEubGFuZy5JbnRlZ2VyKGNvbG9yKTtcbiAgICAgICAgICAgIHRoaXMudG9kYXlTdHlsZS5zZXRUZXh0Q29sb3IodGV4dENvbG9yKTtcbiAgICAgICAgICAgIHRoaXMub25TdHlsZUNoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRheVRleHRDb2xvckNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgY29sb3IgPSBuZXdWYWx1ZS5hcmdiO1xuICAgICAgICAgICAgbGV0IHRleHRDb2xvciA9IG5ldyBqYXZhLmxhbmcuSW50ZWdlcihjb2xvcik7XG4gICAgICAgICAgICB0aGlzLnJlZ3VsYXJEYXlTdHlsZS5zZXRUZXh0Q29sb3IodGV4dENvbG9yKTtcbiAgICAgICAgICAgIHRoaXMub25TdHlsZUNoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRheUZvbnROYW1lQ2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5yZWd1bGFyRGF5U3R5bGUuc2V0Rm9udE5hbWUobmV3VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5vblN0eWxlQ2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRGF5Rm9udFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgbGV0IGZvbnQ6IGFuZHJvaWQuZ3JhcGhpY3MuVHlwZWZhY2UgPSBUb29sLmNyZWF0ZVR5cGVmYWNlKHRoaXMuZGF5Rm9udE5hbWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIGxldCBmb250U3R5bGUgPSBuZXcgamF2YS5sYW5nLkludGVnZXIoZm9udC5nZXRTdHlsZSgpKTtcbiAgICAgICAgICAgIHRoaXMucmVndWxhckRheVN0eWxlLnNldEZvbnRTdHlsZShmb250U3R5bGUpO1xuICAgICAgICAgICAgdGhpcy5vblN0eWxlQ2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRGF5VGV4dFNpemVDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCFpc05hTigrbmV3VmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgc2l6ZSA9IG5ld1ZhbHVlICogdXRpbHNNb2R1bGUubGF5b3V0LmdldERpc3BsYXlEZW5zaXR5KCk7XG4gICAgICAgICAgICBsZXQgc2l6ZVZhbHVlID0gbmV3IGphdmEubGFuZy5GbG9hdChzaXplKTtcbiAgICAgICAgICAgIHRoaXMucmVndWxhckRheVN0eWxlLnNldFRleHRTaXplKHNpemVWYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLm9uU3R5bGVDaGFuZ2VkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EYXlOYW1lVGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBjb2xvciA9IG5ld1ZhbHVlLmFyZ2I7XG4gICAgICAgICAgICBsZXQgY29sb3JWYWx1ZSA9IG5ldyBqYXZhLmxhbmcuSW50ZWdlcihjb2xvcik7XG4gICAgICAgICAgICB0aGlzLmRheU5hbWVTdHlsZS5zZXRUZXh0Q29sb3IoY29sb3JWYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLm9uU3R5bGVDaGFuZ2VkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EYXlOYW1lRm9udE5hbWVDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmRheU5hbWVTdHlsZS5zZXRGb250TmFtZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLm9uU3R5bGVDaGFuZ2VkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EYXlOYW1lRm9udFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgbGV0IGZvbnQ6IGFuZHJvaWQuZ3JhcGhpY3MuVHlwZWZhY2UgPSBUb29sLmNyZWF0ZVR5cGVmYWNlKHRoaXMuZGF5TmFtZUZvbnROYW1lLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICBsZXQgZm9udFN0eWxlID0gbmV3IGphdmEubGFuZy5JbnRlZ2VyKGZvbnQuZ2V0U3R5bGUoKSk7XG4gICAgICAgICAgICB0aGlzLmRheU5hbWVTdHlsZS5zZXRGb250U3R5bGUoZm9udFN0eWxlKTtcbiAgICAgICAgICAgIHRoaXMub25TdHlsZUNoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRheU5hbWVUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAoIWlzTmFOKCtuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBzaXplID0gbmV3VmFsdWUgKiB1dGlsc01vZHVsZS5sYXlvdXQuZ2V0RGlzcGxheURlbnNpdHkoKTtcbiAgICAgICAgICAgIGxldCBzaXplVmFsdWUgPSBuZXcgamF2YS5sYW5nLkZsb2F0KHNpemUpO1xuICAgICAgICAgICAgdGhpcy5kYXlOYW1lU3R5bGUuc2V0VGV4dFNpemUoc2l6ZVZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMub25TdHlsZUNoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbk1vbnRoTmFtZVRleHRDb2xvckNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgY29sb3IgPSBuZXdWYWx1ZS5hcmdiO1xuICAgICAgICAgICAgbGV0IGNvbG9yVmFsdWUgPSBuZXcgamF2YS5sYW5nLkludGVnZXIoY29sb3IpO1xuICAgICAgICAgICAgdGhpcy5tb250aE5hbWVTdHlsZS5zZXRUZXh0Q29sb3IoY29sb3JWYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLm9uU3R5bGVDaGFuZ2VkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Nb250aE5hbWVGb250TmFtZUNoYW5nZWQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMubW9udGhOYW1lU3R5bGUuc2V0Rm9udE5hbWUobmV3VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5vblN0eWxlQ2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTW9udGhOYW1lRm9udFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgbGV0IGZvbnQ6IGFuZHJvaWQuZ3JhcGhpY3MuVHlwZWZhY2UgPSBUb29sLmNyZWF0ZVR5cGVmYWNlKHRoaXMubW9udGhOYW1lRm9udE5hbWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIGxldCBmb250U3R5bGUgPSBuZXcgamF2YS5sYW5nLkludGVnZXIoZm9udC5nZXRTdHlsZSgpKTtcbiAgICAgICAgICAgIHRoaXMubW9udGhOYW1lU3R5bGUuc2V0Rm9udFN0eWxlKGZvbnRTdHlsZSk7XG4gICAgICAgICAgICB0aGlzLm9uU3R5bGVDaGFuZ2VkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Nb250aE5hbWVUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAoIWlzTmFOKCtuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBzaXplID0gbmV3VmFsdWUgKiB1dGlsc01vZHVsZS5sYXlvdXQuZ2V0RGlzcGxheURlbnNpdHkoKTtcbiAgICAgICAgICAgIGxldCBzaXplVmFsdWUgPSBuZXcgamF2YS5sYW5nLkZsb2F0KHNpemUpO1xuICAgICAgICAgICAgdGhpcy5tb250aE5hbWVTdHlsZS5zZXRUZXh0U2l6ZShzaXplVmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5vblN0eWxlQ2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8qKlxuICogQ2VsbCBzdHlsZSBjbGFzcyBmb3IgaW5saW5lIGV2ZW50cyBjZWxscyBpbiBtb250aCB2aWV3XG4gKi9cbmV4cG9ydCBjbGFzcyBJbmxpbmVFdmVudENlbGxTdHlsZSBleHRlbmRzIGNvbW1vbk1vZHVsZS5JbmxpbmVFdmVudENlbGxTdHlsZSB7XG5cbiAgICBwcml2YXRlIF9hZGFwdGVyOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJBZGFwdGVyO1xuXG4gICAgYXBwbHkoYWRhcHRlcjogY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyQWRhcHRlcikge1xuXG4gICAgICAgIGlmICghYWRhcHRlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYWRhcHRlciA9IGFkYXB0ZXI7XG5cbiAgICAgICAgbGV0IGNvbG9yOiBudW1iZXI7XG4gICAgICAgIGlmICh0aGlzLmNlbGxCYWNrZ3JvdW5kQ29sb3IpIHtcbiAgICAgICAgICAgIGNvbG9yID0gdGhpcy5jZWxsQmFja2dyb3VuZENvbG9yLmFyZ2I7XG4gICAgICAgICAgICB0aGlzLl9hZGFwdGVyLnNldElubGluZUV2ZW50c0JhY2tncm91bmRDb2xvcihjb2xvcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ldmVudFRleHRDb2xvcikge1xuICAgICAgICAgICAgLy8gVE9ETzogVGV4dCBjb2xvciBmb3IgaW5saW5lIGV2ZW50IGlzIG5vdCBzdXBwb3J0ZWQgZm9yIEFuZHJvaWQgY2FsZW5kYXIuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ldmVudEZvbnROYW1lKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBGb250IG5hbWUgcHJvcGVydHkgZm9yIGlubGluZSBldmVudCB0ZXh0IGlzIG5vdCBzdXBwb3J0ZWQgZm9yIEFuZHJvaWQgY2FsZW5kYXIuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ldmVudEZvbnRTdHlsZSkge1xuICAgICAgICAgICAgLy8gVE9ETzogRm9udCBzdHlsZSBwcm9wZXJ0eSBmb3IgaW5saW5lIGV2ZW50IHRleHQgaXMgbm90IHN1cHBvcnRlZCBmb3IgQW5kcm9pZCBjYWxlbmRhci5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNOYU4odGhpcy5ldmVudFRleHRTaXplKSkge1xuICAgICAgICAgICAgdGhpcy5fYWRhcHRlci5zZXRJbmxpbmVFdmVudFRpdGxlVGV4dFNpemUodGhpcy5ldmVudFRleHRTaXplKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRpbWVUZXh0Q29sb3IpIHtcbiAgICAgICAgICAgIGxldCBjb2xvcjogbnVtYmVyID0gdGhpcy50aW1lVGV4dENvbG9yLmFyZ2I7XG4gICAgICAgICAgICB0aGlzLl9hZGFwdGVyLnNldElubGluZUV2ZW50VGltZVN0YXJ0VGV4dENvbG9yKGNvbG9yKTtcbiAgICAgICAgICAgIHRoaXMuX2FkYXB0ZXIuc2V0SW5saW5lRXZlbnRUaW1lRW5kVGV4dENvbG9yKGNvbG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRpbWVGb250TmFtZSkge1xuICAgICAgICAgICAgLy8gVE9ETzogRm9udCBuYW1lIHByb3BlcnR5IGZvciBmb3IgaW5saW5lIGV2ZW50IGRhdGUvdGltZSBpcyBub3Qgc3VwcG9ydGVkIGZvciBBbmRyb2lkIGNhbGVuZGFyLlxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudGltZUZvbnRTdHlsZSkge1xuICAgICAgICAgICAgLy8gVE9ETzogRm9udCBzdHlsZSBwcm9wZXJ0eSBmb3IgZm9yIGlubGluZSBldmVudCBkYXRlL3RpbWUgaXMgbm90IHN1cHBvcnRlZCBmb3IgQW5kcm9pZCBjYWxlbmRhci5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRpbWVUZXh0U2l6ZSkge1xuICAgICAgICAgICAgaWYgKCFpc05hTigrdGhpcy50aW1lVGV4dFNpemUpKSB7XG4gICAgICAgICAgICAgICAgLy8gTk9URTogdGhlc2UgbWV0aG9kcyBkb24ndCByZXF1aXJlIGRpc3BsYXkgZGVuc2l0eSB0byBiZSB0YWtlbiBhY2NvdW50XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRhcHRlci5zZXRJbmxpbmVFdmVudFRpbWVFbmRUZXh0U2l6ZSh0aGlzLnRpbWVUZXh0U2l6ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRhcHRlci5zZXRJbmxpbmVFdmVudFRpbWVTdGFydFRleHRTaXplKHRoaXMudGltZVRleHRTaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkNlbGxCYWNrZ3JvdW5kQ29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAmJiB0aGlzLl9hZGFwdGVyKSB7XG4gICAgICAgICAgICBsZXQgY29sb3I6IG51bWJlciA9IG5ld1ZhbHVlLmFyZ2I7XG4gICAgICAgICAgICB0aGlzLl9hZGFwdGVyLnNldElubGluZUV2ZW50c0JhY2tncm91bmRDb2xvcihjb2xvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25FdmVudFRleHRDb2xvckNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgLy8gVE9ETzogY29uc29sZS5sb2coXCJXQVJOSU5HOiBUZXh0IGNvbG9yIGZvciBpbmxpbmUgZXZlbnQgaXMgbm90IHN1cHBvcnRlZCBmb3IgQW5kcm9pZCBjYWxlbmRhci5cIilcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25FdmVudEZvbnROYW1lQ2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIC8vIFRPRE86IGNvbnNvbGUubG9nKFwiV0FSTklORzogRm9udCBuYW1lIHByb3BlcnR5IGZvciBpbmxpbmUgZXZlbnQgdGV4dCBpcyBub3Qgc3VwcG9ydGVkIGZvciBBbmRyb2lkIGNhbGVuZGFyLlwiKVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkV2ZW50Rm9udFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRm9udFN0eWxlKSB7XG4gICAgICAgIC8vIFRPRE86IGNvbnNvbGUubG9nKFwiV0FSTklORzogRm9udCBzdHlsZSBwcm9wZXJ0eSBmb3IgaW5saW5lIGV2ZW50IHRleHQgaXMgbm90IHN1cHBvcnRlZCBmb3IgQW5kcm9pZCBjYWxlbmRhci5cIilcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25FdmVudFRleHRTaXplQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICghaXNOYU4oK25ld1ZhbHVlKSAmJiB0aGlzLl9hZGFwdGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGFwdGVyLnNldElubGluZUV2ZW50VGl0bGVUZXh0U2l6ZShuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UaW1lVGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcikge1xuICAgICAgICBpZiAobmV3VmFsdWUgJiYgdGhpcy5fYWRhcHRlcikge1xuICAgICAgICAgICAgbGV0IGNvbG9yOiBudW1iZXIgPSBuZXdWYWx1ZS5hcmdiO1xuICAgICAgICAgICAgdGhpcy5fYWRhcHRlci5zZXRJbmxpbmVFdmVudFRpbWVTdGFydFRleHRDb2xvcihjb2xvcik7XG4gICAgICAgICAgICB0aGlzLl9hZGFwdGVyLnNldElubGluZUV2ZW50VGltZUVuZFRleHRDb2xvcihjb2xvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvdGVjdGVkIG9uVGltZUZvbnROYW1lQ2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIC8vIFRPRE86IGNvbnNvbGUubG9nKFwiV0FSTklORzogRm9udCBuYW1lIHByb3BlcnR5IGZvciBmb3IgaW5saW5lIGV2ZW50IGRhdGUvdGltZSBpcyBub3Qgc3VwcG9ydGVkIGZvciBBbmRyb2lkIGNhbGVuZGFyLlwiKVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRpbWVGb250U3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJGb250U3R5bGUsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJGb250U3R5bGUpIHtcbiAgICAgICAgLy8gVE9ETzogY29uc29sZS5sb2coXCJXQVJOSU5HOiBGb250IHN0eWxlIHByb3BlcnR5IGZvciBmb3IgaW5saW5lIGV2ZW50IGRhdGUvdGltZSBpcyBub3Qgc3VwcG9ydGVkIGZvciBBbmRyb2lkIGNhbGVuZGFyLlwiKVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRpbWVUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAoIWlzTmFOKCtuZXdWYWx1ZSkgJiYgdGhpcy5fYWRhcHRlcikge1xuICAgICAgICAgICAgLy8gTk9URTogdGhlc2UgbWV0aG9kcyBkb24ndCByZXF1aXJlIGRpc3BsYXkgZGVuc2l0eSB0byBiZSB0YWtlbiBhY2NvdW50XG4gICAgICAgICAgICB0aGlzLl9hZGFwdGVyLnNldElubGluZUV2ZW50VGltZUVuZFRleHRTaXplKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuX2FkYXB0ZXIuc2V0SW5saW5lRXZlbnRUaW1lU3RhcnRUZXh0U2l6ZShuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNUWUxFUyBGT1IgRElGRkVSRU5UIFZJRVcgTU9ERVNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJTdHlsZUluaXRpYWxpemVyIHtcbiAgICBwdWJsaWMgdXBkYXRlTmF0aXZlU3R5bGVzKHN0eWxlOiBhbnkpIHtcbiAgICAgICAgaWYgKCFzdHlsZS5fb3duZXIgfHwgIXN0eWxlLl9vd25lci5fbmF0aXZlVmlldykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0eWxlLmJhY2tncm91bmRDb2xvcikge1xuICAgICAgICAgICAgbGV0IGNvbG9yOiBudW1iZXIgPSBzdHlsZS5iYWNrZ3JvdW5kQ29sb3IuYXJnYjtcbiAgICAgICAgICAgIHN0eWxlLl9vd25lci5fbmF0aXZlVmlldy5zZXRCYWNrZ3JvdW5kQ29sb3IoY29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHlsZS5zaG93RGF5TmFtZXMgIT09IHVuZGVmaW5lZCAmJiBzdHlsZS5zaG93RGF5TmFtZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3R5bGUuX293bmVyLl9uYXRpdmVWaWV3LnNldFNob3dEYXlOYW1lcyhzdHlsZS5zaG93RGF5TmFtZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHlsZS5zaG93VGl0bGUgIT09IHVuZGVmaW5lZCAmJiBzdHlsZS5zaG93VGl0bGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3R5bGUuX293bmVyLl9uYXRpdmVWaWV3LnNldFNob3dUaXRsZShzdHlsZS5zaG93VGl0bGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHlsZS5zaG93V2Vla051bWJlcnMgIT09IHVuZGVmaW5lZCAmJiBzdHlsZS5zaG93V2Vla051bWJlcnMgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3R5bGUuX293bmVyLl9uYXRpdmVWaWV3LnNldFdlZWtOdW1iZXJzRGlzcGxheU1vZGUoc3R5bGUuc2hvd1dlZWtOdW1iZXJzID8gY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLldlZWtOdW1iZXJzRGlzcGxheU1vZGUuQmxvY2sgOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuV2Vla051bWJlcnNEaXNwbGF5TW9kZS5Ob25lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdHlsZS5kYXlDZWxsU3R5bGUpIHtcbiAgICAgICAgICAgIHN0eWxlLnByZXBhcmVOYXRpdmVTdHlsZShzdHlsZS5kYXlDZWxsU3R5bGUsIENlbGxTdHlsZVR5cGUuUmVndWxhckRheVN0eWxlKTtcbiAgICAgICAgICAgIHN0eWxlLl9vd25lci5fbmF0aXZlVmlldy5hZGREYXlDZWxsU3R5bGUoc3R5bGUuZGF5Q2VsbFN0eWxlLmFuZHJvaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0eWxlLndlZWtlbmRDZWxsU3R5bGUpIHtcbiAgICAgICAgICAgIHN0eWxlLnByZXBhcmVOYXRpdmVTdHlsZShzdHlsZS53ZWVrZW5kQ2VsbFN0eWxlLCBDZWxsU3R5bGVUeXBlLldlZWtlbmRTdHlsZSk7XG4gICAgICAgICAgICBzdHlsZS5fb3duZXIuX25hdGl2ZVZpZXcuYWRkRGF5Q2VsbFN0eWxlKHN0eWxlLndlZWtlbmRDZWxsU3R5bGUuYW5kcm9pZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3R5bGUudG9kYXlDZWxsU3R5bGUpIHtcbiAgICAgICAgICAgIHN0eWxlLnByZXBhcmVOYXRpdmVTdHlsZShzdHlsZS50b2RheUNlbGxTdHlsZSwgQ2VsbFN0eWxlVHlwZS5Ub2RheVN0eWxlKTtcbiAgICAgICAgICAgIHN0eWxlLl9vd25lci5fbmF0aXZlVmlldy5hZGREYXlDZWxsU3R5bGUoc3R5bGUudG9kYXlDZWxsU3R5bGUuYW5kcm9pZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3R5bGUuZGF5TmFtZUNlbGxTdHlsZSkge1xuICAgICAgICAgICAgc3R5bGUucHJlcGFyZU5hdGl2ZVN0eWxlKHN0eWxlLmRheU5hbWVDZWxsU3R5bGUsIENlbGxTdHlsZVR5cGUuRGF5TmFtZVN0eWxlKTtcbiAgICAgICAgICAgIHN0eWxlLl9vd25lci5fbmF0aXZlVmlldy5hZGREYXlDZWxsU3R5bGUoc3R5bGUuZGF5TmFtZUNlbGxTdHlsZS5hbmRyb2lkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdHlsZS53ZWVrTnVtYmVyQ2VsbFN0eWxlKSB7XG4gICAgICAgICAgICBzdHlsZS5wcmVwYXJlTmF0aXZlU3R5bGUoc3R5bGUud2Vla051bWJlckNlbGxTdHlsZSwgQ2VsbFN0eWxlVHlwZS5XZWVrTnVtYmVyU3R5bGUpO1xuICAgICAgICAgICAgc3R5bGUuX293bmVyLl9uYXRpdmVWaWV3LmFkZERheUNlbGxTdHlsZShzdHlsZS53ZWVrTnVtYmVyQ2VsbFN0eWxlLmFuZHJvaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0eWxlLnRpdGxlQ2VsbFN0eWxlKSB7XG4gICAgICAgICAgICBzdHlsZS5wcmVwYXJlTmF0aXZlU3R5bGUoc3R5bGUudGl0bGVDZWxsU3R5bGUsIENlbGxTdHlsZVR5cGUuVGl0bGVTdHlsZSk7XG4gICAgICAgICAgICBzdHlsZS5fb3duZXIuX25hdGl2ZVZpZXcuYWRkRGF5Q2VsbFN0eWxlKHN0eWxlLnRpdGxlQ2VsbFN0eWxlLmFuZHJvaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0eWxlLnNlbGVjdGVkRGF5Q2VsbFN0eWxlKSB7XG4gICAgICAgICAgICBzdHlsZS5wcmVwYXJlTmF0aXZlU3R5bGUoc3R5bGUuc2VsZWN0ZWREYXlDZWxsU3R5bGUsIENlbGxTdHlsZVR5cGUuU2VsZWN0ZWREYXlTdHlsZSk7XG4gICAgICAgICAgICBzdHlsZS5fb3duZXIuX25hdGl2ZVZpZXcuYWRkRGF5Q2VsbFN0eWxlKHN0eWxlLnNlbGVjdGVkRGF5Q2VsbFN0eWxlLmFuZHJvaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0eWxlLmlubGluZUV2ZW50Q2VsbFN0eWxlKSB7XG4gICAgICAgICAgICBzdHlsZS5wcmVwYXJlTmF0aXZlU3R5bGUoc3R5bGUuaW5saW5lRXZlbnRDZWxsU3R5bGUsIG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zeW5jU2VsZWN0aW9uU2hhcGUoc3R5bGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblNob3dXZWVrTnVtYmVyc0NoYW5nZWQob2xkVmFsdWU6IGJvb2xlYW4sIG5ld1ZhbHVlOiBib29sZWFuLCBzdHlsZTogYW55KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlU2hvd1dlZWtOdW1iZXJzKG5ld1ZhbHVlLCBzdHlsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VTaG93V2Vla051bWJlcnMobmV3VmFsdWU6IGJvb2xlYW4sIHN0eWxlOiBhbnkpIHtcbiAgICAgICAgaWYgKHN0eWxlLl9vd25lciAmJiBzdHlsZS5fb3duZXIuX25hdGl2ZVZpZXcpIHtcbiAgICAgICAgICAgIHN0eWxlLl9vd25lci5fbmF0aXZlVmlldy5zZXRXZWVrTnVtYmVyc0Rpc3BsYXlNb2RlKG5ld1ZhbHVlID8gY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLldlZWtOdW1iZXJzRGlzcGxheU1vZGUuQmxvY2sgOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuV2Vla051bWJlcnNEaXNwbGF5TW9kZS5Ob25lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvblNob3dUaXRsZUNoYW5nZWQob2xkVmFsdWU6IGJvb2xlYW4sIG5ld1ZhbHVlOiBib29sZWFuLCBzdHlsZTogYW55KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlU2hvd1RpdGxlKG5ld1ZhbHVlLCBzdHlsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VTaG93VGl0bGUobmV3VmFsdWU6IGJvb2xlYW4sIHN0eWxlOiBhbnkpIHtcbiAgICAgICAgaWYgKHN0eWxlLl9vd25lciAmJiBzdHlsZS5fb3duZXIuX25hdGl2ZVZpZXcpIHtcbiAgICAgICAgICAgIHN0eWxlLl9vd25lci5fbmF0aXZlVmlldy5zZXRTaG93VGl0bGUobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2hvd0RheU5hbWVzQ2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4sIHN0eWxlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VTaG93RGF5TmFtZXMobmV3VmFsdWUsIHN0eWxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZVNob3dEYXlOYW1lcyhuZXdWYWx1ZTogYm9vbGVhbiwgc3R5bGU6IGFueSkge1xuICAgICAgICBpZiAoc3R5bGUuX293bmVyICYmIHN0eWxlLl9vd25lci5fbmF0aXZlVmlldykge1xuICAgICAgICAgICAgc3R5bGUuX293bmVyLl9uYXRpdmVWaWV3LnNldFNob3dEYXlOYW1lcyhuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25CYWNrZ3JvdW5kQ29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yLCBzdHlsZTogYW55KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlQmFja2dyb3VuZENvbG9yKG5ld1ZhbHVlLCBzdHlsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VCYWNrZ3JvdW5kQ29sb3IobmV3VmFsdWU6IENvbG9yLCBzdHlsZTogYW55KSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAmJiBzdHlsZS5fb3duZXIgJiYgc3R5bGUuX293bmVyLl9uYXRpdmVWaWV3KSB7XG4gICAgICAgICAgICBsZXQgY29sb3I6IG51bWJlciA9IG5ld1ZhbHVlLmFyZ2I7XG4gICAgICAgICAgICBzdHlsZS5fb3duZXIuX25hdGl2ZVZpZXcuc2V0QmFja2dyb3VuZENvbG9yKGNvbG9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkRheUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWU6IERheUNlbGxTdHlsZSwgbmV3VmFsdWU6IERheUNlbGxTdHlsZSwgc3R5bGU6IGFueSkge1xuICAgICAgICB0aGlzLmNoYW5nZURheUNlbGxTdHlsZShvbGRWYWx1ZSwgbmV3VmFsdWUsIHN0eWxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZURheUNlbGxTdHlsZShvbGRWYWx1ZTogRGF5Q2VsbFN0eWxlLCBuZXdWYWx1ZTogRGF5Q2VsbFN0eWxlLCBzdHlsZTogYW55KSB7XG4gICAgICAgIGlmIChzdHlsZS5fb3duZXIgJiYgc3R5bGUuX293bmVyLl9uYXRpdmVWaWV3KSB7XG4gICAgICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzdHlsZS5fb3duZXIuX25hdGl2ZVZpZXcucmVtb3ZlRGF5Q2VsbFN0eWxlKG9sZFZhbHVlLmFuZHJvaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUucHJlcGFyZU5hdGl2ZVN0eWxlKG5ld1ZhbHVlLCBDZWxsU3R5bGVUeXBlLlJlZ3VsYXJEYXlTdHlsZSk7XG4gICAgICAgICAgICAgICAgc3R5bGUuX293bmVyLl9uYXRpdmVWaWV3LmFkZERheUNlbGxTdHlsZShuZXdWYWx1ZS5hbmRyb2lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvblNlbGVjdGVkRGF5Q2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogRGF5Q2VsbFN0eWxlLCBuZXdWYWx1ZTogRGF5Q2VsbFN0eWxlLCBzdHlsZTogYW55KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlU2VsZWN0ZWREYXlDZWxsU3R5bGUob2xkVmFsdWUsIG5ld1ZhbHVlLCBzdHlsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VTZWxlY3RlZERheUNlbGxTdHlsZShvbGRWYWx1ZTogRGF5Q2VsbFN0eWxlLCBuZXdWYWx1ZTogRGF5Q2VsbFN0eWxlLCBzdHlsZTogYW55KSB7XG4gICAgICAgIGlmIChzdHlsZS5fb3duZXIgJiYgc3R5bGUuX293bmVyLl9uYXRpdmVWaWV3KSB7XG4gICAgICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzdHlsZS5fb3duZXIuX25hdGl2ZVZpZXcucmVtb3ZlRGF5Q2VsbFN0eWxlKG9sZFZhbHVlLmFuZHJvaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUucHJlcGFyZU5hdGl2ZVN0eWxlKG5ld1ZhbHVlLCBDZWxsU3R5bGVUeXBlLlNlbGVjdGVkRGF5U3R5bGUpO1xuICAgICAgICAgICAgICAgIHN0eWxlLl9vd25lci5fbmF0aXZlVmlldy5hZGREYXlDZWxsU3R5bGUobmV3VmFsdWUuYW5kcm9pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25Ub2RheUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWU6IERheUNlbGxTdHlsZSwgbmV3VmFsdWU6IERheUNlbGxTdHlsZSwgc3R5bGU6IGFueSkge1xuICAgICAgICB0aGlzLmNoYW5nZVRvZGF5Q2VsbFN0eWxlKG9sZFZhbHVlLCBuZXdWYWx1ZSwgc3R5bGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlVG9kYXlDZWxsU3R5bGUob2xkVmFsdWU6IERheUNlbGxTdHlsZSwgbmV3VmFsdWU6IERheUNlbGxTdHlsZSwgc3R5bGU6IGFueSkge1xuICAgICAgICBpZiAoc3R5bGUuX293bmVyICYmIHN0eWxlLl9vd25lci5fbmF0aXZlVmlldykge1xuICAgICAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUuX293bmVyLl9uYXRpdmVWaWV3LnJlbW92ZURheUNlbGxTdHlsZShvbGRWYWx1ZS5hbmRyb2lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHN0eWxlLnByZXBhcmVOYXRpdmVTdHlsZShuZXdWYWx1ZSwgQ2VsbFN0eWxlVHlwZS5Ub2RheVN0eWxlKTtcbiAgICAgICAgICAgICAgICBzdHlsZS5fb3duZXIuX25hdGl2ZVZpZXcuYWRkRGF5Q2VsbFN0eWxlKG5ld1ZhbHVlLmFuZHJvaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uV2Vla051bWJlckNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWU6IENlbGxTdHlsZSwgbmV3VmFsdWU6IENlbGxTdHlsZSwgc3R5bGU6IGFueSkge1xuICAgICAgICB0aGlzLmNoYW5nZVdlZWtOdW1iZXJDZWxsU3R5bGUob2xkVmFsdWUsIG5ld1ZhbHVlLCBzdHlsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VXZWVrTnVtYmVyQ2VsbFN0eWxlKG9sZFZhbHVlOiBDZWxsU3R5bGUsIG5ld1ZhbHVlOiBDZWxsU3R5bGUsIHN0eWxlOiBhbnkpIHtcbiAgICAgICAgaWYgKHN0eWxlLl9vd25lciAmJiBzdHlsZS5fb3duZXIuX25hdGl2ZVZpZXcpIHtcbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IFNlZSBpZiB0aGlzIHdhcyB3b3JraW5nIGFzIHRoZSByZW1vdmVEYXlDZWxsU3R5bGUgcmVxdWlyZXMgJ0NhbGVuZGFyRGF5Q2VsbFN0eWxlJ1xuICAgICAgICAgICAgICAgIHN0eWxlLl9vd25lci5fbmF0aXZlVmlldy5yZW1vdmVEYXlDZWxsU3R5bGUoPGFueT5vbGRWYWx1ZS5hbmRyb2lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHN0eWxlLnByZXBhcmVOYXRpdmVTdHlsZShuZXdWYWx1ZSwgQ2VsbFN0eWxlVHlwZS5XZWVrTnVtYmVyU3R5bGUpO1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IFNlZSBpZiB0aGlzIHdhcyB3b3JraW5nIGFzIHRoZSBhZGREYXlDZWxsU3R5bGUgcmVxdWlyZXMgJ0NhbGVuZGFyRGF5Q2VsbFN0eWxlJ1xuICAgICAgICAgICAgICAgIHN0eWxlLl9vd25lci5fbmF0aXZlVmlldy5hZGREYXlDZWxsU3R5bGUoPGFueT5uZXdWYWx1ZS5hbmRyb2lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbldlZWtlbmRDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBDZWxsU3R5bGUsIG5ld1ZhbHVlOiBDZWxsU3R5bGUsIHN0eWxlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VXZWVrZW5kQ2VsbFN0eWxlKG9sZFZhbHVlLCBuZXdWYWx1ZSwgc3R5bGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlV2Vla2VuZENlbGxTdHlsZShvbGRWYWx1ZTogQ2VsbFN0eWxlLCBuZXdWYWx1ZTogQ2VsbFN0eWxlLCBzdHlsZTogYW55KSB7XG4gICAgICAgIGlmIChzdHlsZS5fb3duZXIgJiYgc3R5bGUuX293bmVyLl9uYXRpdmVWaWV3KSB7XG4gICAgICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBTZWUgaWYgdGhpcyB3YXMgd29ya2luZyBhcyB0aGUgcmVtb3ZlRGF5Q2VsbFN0eWxlIHJlcXVpcmVzICdDYWxlbmRhckRheUNlbGxTdHlsZSdcbiAgICAgICAgICAgICAgICBzdHlsZS5fb3duZXIuX25hdGl2ZVZpZXcucmVtb3ZlRGF5Q2VsbFN0eWxlKDxhbnk+b2xkVmFsdWUuYW5kcm9pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzdHlsZS5wcmVwYXJlTmF0aXZlU3R5bGUobmV3VmFsdWUsIENlbGxTdHlsZVR5cGUuV2Vla2VuZFN0eWxlKTtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBTZWUgaWYgdGhpcyB3YXMgd29ya2luZyBhcyB0aGUgcmVtb3ZlRGF5Q2VsbFN0eWxlIHJlcXVpcmVzICdDYWxlbmRhckRheUNlbGxTdHlsZSdcbiAgICAgICAgICAgICAgICBzdHlsZS5fb3duZXIuX25hdGl2ZVZpZXcuYWRkRGF5Q2VsbFN0eWxlKDxhbnk+bmV3VmFsdWUuYW5kcm9pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25EYXlOYW1lQ2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2VsbFN0eWxlLCBuZXdWYWx1ZTogQ2VsbFN0eWxlLCBzdHlsZTogYW55KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRGF5TmFtZUNlbGxTdHlsZShvbGRWYWx1ZSwgbmV3VmFsdWUsIHN0eWxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZURheU5hbWVDZWxsU3R5bGUob2xkVmFsdWU6IENlbGxTdHlsZSwgbmV3VmFsdWU6IENlbGxTdHlsZSwgc3R5bGU6IGFueSkge1xuICAgICAgICBpZiAoc3R5bGUuX293bmVyICYmIHN0eWxlLl9vd25lci5fbmF0aXZlVmlldykge1xuICAgICAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogU2VlIGlmIHRoaXMgd2FzIHdvcmtpbmcgYXMgdGhlIHJlbW92ZURheUNlbGxTdHlsZSByZXF1aXJlcyAnQ2FsZW5kYXJEYXlDZWxsU3R5bGUnXG4gICAgICAgICAgICAgICAgc3R5bGUuX293bmVyLl9uYXRpdmVWaWV3LnJlbW92ZURheUNlbGxTdHlsZSg8YW55Pm9sZFZhbHVlLmFuZHJvaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUucHJlcGFyZU5hdGl2ZVN0eWxlKG5ld1ZhbHVlLCBDZWxsU3R5bGVUeXBlLkRheU5hbWVTdHlsZSk7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogU2VlIGlmIHRoaXMgd2FzIHdvcmtpbmcgYXMgdGhlIHJlbW92ZURheUNlbGxTdHlsZSByZXF1aXJlcyAnQ2FsZW5kYXJEYXlDZWxsU3R5bGUnXG4gICAgICAgICAgICAgICAgc3R5bGUuX293bmVyLl9uYXRpdmVWaWV3LmFkZERheUNlbGxTdHlsZSg8YW55Pm5ld1ZhbHVlLmFuZHJvaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uVGl0bGVDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBDZWxsU3R5bGUsIG5ld1ZhbHVlOiBDZWxsU3R5bGUsIHN0eWxlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VUaXRsZUNlbGxTdHlsZShvbGRWYWx1ZSwgbmV3VmFsdWUsIHN0eWxlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2hhbmdlVGl0bGVDZWxsU3R5bGUob2xkVmFsdWU6IENlbGxTdHlsZSwgbmV3VmFsdWU6IENlbGxTdHlsZSwgc3R5bGU6IGFueSkge1xuICAgICAgICBpZiAoc3R5bGUuX293bmVyICYmIHN0eWxlLl9vd25lci5fbmF0aXZlVmlldykge1xuICAgICAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogU2VlIGlmIHRoaXMgd2FzIHdvcmtpbmcgYXMgdGhlIHJlbW92ZURheUNlbGxTdHlsZSByZXF1aXJlcyAnQ2FsZW5kYXJEYXlDZWxsU3R5bGUnXG4gICAgICAgICAgICAgICAgc3R5bGUuX293bmVyLl9uYXRpdmVWaWV3LnJlbW92ZURheUNlbGxTdHlsZSg8YW55Pm9sZFZhbHVlLmFuZHJvaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUucHJlcGFyZU5hdGl2ZVN0eWxlKG5ld1ZhbHVlLCBDZWxsU3R5bGVUeXBlLlRpdGxlU3R5bGUpO1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IFNlZSBpZiB0aGlzIHdhcyB3b3JraW5nIGFzIHRoZSByZW1vdmVEYXlDZWxsU3R5bGUgcmVxdWlyZXMgJ0NhbGVuZGFyRGF5Q2VsbFN0eWxlJ1xuICAgICAgICAgICAgICAgIHN0eWxlLl9vd25lci5fbmF0aXZlVmlldy5hZGREYXlDZWxsU3R5bGUoPGFueT5uZXdWYWx1ZS5hbmRyb2lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzeW5jU2VsZWN0aW9uU2hhcGUoc3R5bGU6IGFueSkge1xuICAgICAgICBpZiAoc3R5bGUuX293bmVyKSB7XG4gICAgICAgICAgICBzdHlsZS5fb3duZXIuX3N5bmNTZWxlY3Rpb25TaGFwZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIENsYXNzIGZvciBtb250aCB2aWV3IHN0eWxlXG4gKi9cbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vbnRoVmlld1N0eWxlIGV4dGVuZHMgY29tbW9uTW9kdWxlLkNhbGVuZGFyTW9udGhWaWV3U3R5bGUge1xuXG4gICAgcHJpdmF0ZSBfaW5pdGlhbGl6ZXI6IENhbGVuZGFyU3R5bGVJbml0aWFsaXplcjtcbiAgICBnZXQgaW5pdGlhbGl6ZXIoKTogQ2FsZW5kYXJTdHlsZUluaXRpYWxpemVyIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0aWFsaXplcikge1xuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZXIgPSBuZXcgQ2FsZW5kYXJTdHlsZUluaXRpYWxpemVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRpYWxpemVyO1xuICAgIH1cblxuICAgIF9vd25lcjogUmFkQ2FsZW5kYXI7XG4gICAgc2V0IG93bmVyKHZhbHVlOiBSYWRDYWxlbmRhcikge1xuICAgICAgICB0aGlzLl9vd25lciA9IHZhbHVlO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLnVwZGF0ZU5hdGl2ZVN0eWxlcyh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlTmF0aXZlU3R5bGVzKCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLnVwZGF0ZU5hdGl2ZVN0eWxlcyh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlcGFyZU5hdGl2ZVN0eWxlKHN0eWxlOiBhbnksIGNlbGxUeXBlOiBDZWxsU3R5bGVUeXBlKSB7XG4gICAgICAgIGlmICghc3R5bGUgfHwgIXRoaXMuX293bmVyIHx8ICF0aGlzLl9vd25lci5fbmF0aXZlVmlldykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3R5bGUub3duZXIgPSB0aGlzLl9vd25lci5fbmF0aXZlVmlldztcblxuICAgICAgICBpZiAoc3R5bGUgaW5zdGFuY2VvZiBEYXlDZWxsU3R5bGUpIHtcbiAgICAgICAgICAgIHN0eWxlLmV2ZW50QWRhcHRlciA9IHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LmdldEV2ZW50QWRhcHRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNlbGxUeXBlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTmF0aXZlU3R5bGVGaWx0ZXJzKHN0eWxlLCBjZWxsVHlwZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHlsZS5hcHBseSh0aGlzLl9vd25lci5fbmF0aXZlVmlldy5nZXRBZGFwdGVyKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZVN0eWxlRmlsdGVycyhzdHlsZTogYW55LCBjZWxsVHlwZTogQ2VsbFN0eWxlVHlwZSkge1xuICAgICAgICBzdHlsZS51cGRhdGVOYXRpdmVTdHlsZUZpbHRlcnMoY2VsbFR5cGUsIGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckRpc3BsYXlNb2RlLk1vbnRoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TaG93V2Vla051bWJlcnNDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uU2hvd1dlZWtOdW1iZXJzQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUsIHRoaXMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblNlbGVjdGlvblNoYXBlQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyU2VsZWN0aW9uU2hhcGUsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJTZWxlY3Rpb25TaGFwZSkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLnN5bmNTZWxlY3Rpb25TaGFwZSh0aGlzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TZWxlY3Rpb25TaGFwZVNpemVDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5zeW5jU2VsZWN0aW9uU2hhcGUodGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2VsZWN0aW9uU2hhcGVDb2xvckNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5zeW5jU2VsZWN0aW9uU2hhcGUodGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2hvd1RpdGxlQ2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vblNob3dUaXRsZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TaG93RGF5TmFtZXNDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uU2hvd0RheU5hbWVzQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUsIHRoaXMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkJhY2tncm91bmRDb2xvckNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vbkJhY2tncm91bmRDb2xvckNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EYXlDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBEYXlDZWxsU3R5bGUsIG5ld1ZhbHVlOiBEYXlDZWxsU3R5bGUpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vbkRheUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TZWxlY3RlZERheUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWU6IERheUNlbGxTdHlsZSwgbmV3VmFsdWU6IERheUNlbGxTdHlsZSkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uU2VsZWN0ZWREYXlDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVG9kYXlDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBEYXlDZWxsU3R5bGUsIG5ld1ZhbHVlOiBEYXlDZWxsU3R5bGUpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vblRvZGF5Q2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUsIHRoaXMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbldlZWtOdW1iZXJDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBDZWxsU3R5bGUsIG5ld1ZhbHVlOiBDZWxsU3R5bGUpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vbldlZWtOdW1iZXJDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uV2Vla2VuZENlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWU6IENlbGxTdHlsZSwgbmV3VmFsdWU6IENlbGxTdHlsZSkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uV2Vla2VuZENlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EYXlOYW1lQ2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2VsbFN0eWxlLCBuZXdWYWx1ZTogQ2VsbFN0eWxlKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25EYXlOYW1lQ2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUsIHRoaXMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRpdGxlQ2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2VsbFN0eWxlLCBuZXdWYWx1ZTogQ2VsbFN0eWxlKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25UaXRsZUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25JbmxpbmVFdmVudENlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWU6IElubGluZUV2ZW50Q2VsbFN0eWxlLCBuZXdWYWx1ZTogSW5saW5lRXZlbnRDZWxsU3R5bGUpIHtcbiAgICAgICAgdGhpcy5wcmVwYXJlTmF0aXZlU3R5bGUobmV3VmFsdWUsIG51bGwpO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIFRoZSBzdHlsZSBjbGFzcyBmb3Igd2VlayBtb2RlLlxuICogTk9URTogd2Ugc2hvdWxkIGNvbnNpZGVyIGlmIHdlIG5lZWQgYW4gZXhwbGljaXQgY2xhc3MgdGhhdCBpcyB0aGUgc2FtZSBhcyB0aGUgYmFzZSBvbmVcbiAqL1xuZXhwb3J0IGNsYXNzIENhbGVuZGFyV2Vla1ZpZXdTdHlsZSBleHRlbmRzIENhbGVuZGFyTW9udGhWaWV3U3R5bGUge1xuICAgIHByb3RlY3RlZCB1cGRhdGVOYXRpdmVTdHlsZUZpbHRlcnMoc3R5bGU6IGFueSwgY2VsbFR5cGU6IENlbGxTdHlsZVR5cGUpIHtcbiAgICAgICAgc3R5bGUudXBkYXRlTmF0aXZlU3R5bGVGaWx0ZXJzKGNlbGxUeXBlLCBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJEaXNwbGF5TW9kZS5XZWVrKTtcbiAgICB9XG59XG5cbi8qKlxuICogVGhlIHN0eWxlIGNsYXNzIGZvciBkYXkgbW9kZS5cbiAqL1xuZXhwb3J0IGNsYXNzIENhbGVuZGFyRGF5Vmlld1N0eWxlIGV4dGVuZHMgY29tbW9uTW9kdWxlLkNhbGVuZGFyRGF5Vmlld1N0eWxlIHtcblxuICAgIHByaXZhdGUgX2luaXRpYWxpemVyOiBDYWxlbmRhclN0eWxlSW5pdGlhbGl6ZXI7XG4gICAgZ2V0IGluaXRpYWxpemVyKCk6IENhbGVuZGFyU3R5bGVJbml0aWFsaXplciB7XG4gICAgICAgIGlmICghdGhpcy5faW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVyID0gbmV3IENhbGVuZGFyU3R5bGVJbml0aWFsaXplcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0aWFsaXplcjtcbiAgICB9XG5cbiAgICBfb3duZXI6IFJhZENhbGVuZGFyO1xuICAgIHNldCBvd25lcih2YWx1ZTogUmFkQ2FsZW5kYXIpIHtcbiAgICAgICAgdGhpcy5fb3duZXIgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVOYXRpdmVTdHlsZXMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlTmF0aXZlU3R5bGVzKCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLnVwZGF0ZU5hdGl2ZVN0eWxlcyh0aGlzKTtcbiAgICAgICAgdGhpcy51cGRhdGVOYXRpdmVEYXlTdHlsZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZU5hdGl2ZURheVN0eWxlcygpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VTaG93V2VlayhudWxsLCB0aGlzLnNob3dXZWVrKTtcbiAgICAgICAgaWYgKHRoaXMuZGF5RXZlbnRzVmlld1N0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURheUV2ZW50c1ZpZXdTdHlsZShudWxsLCB0aGlzLmRheUV2ZW50c1ZpZXdTdHlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYWxsRGF5RXZlbnRzVmlld1N0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFsbERheUV2ZW50c1ZpZXdTdHlsZShudWxsLCB0aGlzLmFsbERheUV2ZW50c1ZpZXdTdHlsZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlcGFyZU5hdGl2ZVN0eWxlKHN0eWxlOiBhbnksIGNlbGxUeXBlOiBDZWxsU3R5bGVUeXBlKSB7XG4gICAgICAgIGlmICghc3R5bGUgfHwgIXRoaXMuX293bmVyIHx8ICF0aGlzLl9vd25lci5fbmF0aXZlVmlldykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3R5bGUub3duZXIgPSB0aGlzLl9vd25lci5fbmF0aXZlVmlldztcblxuICAgICAgICBpZiAoc3R5bGUgaW5zdGFuY2VvZiBEYXlDZWxsU3R5bGUpIHtcbiAgICAgICAgICAgIHN0eWxlLmV2ZW50QWRhcHRlciA9IHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LmdldEV2ZW50QWRhcHRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNlbGxUeXBlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTmF0aXZlU3R5bGVGaWx0ZXJzKHN0eWxlLCBjZWxsVHlwZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHlsZS5hcHBseSh0aGlzLl9vd25lci5fbmF0aXZlVmlldy5nZXRBZGFwdGVyKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZVN0eWxlRmlsdGVycyhzdHlsZTogYW55LCBjZWxsVHlwZTogQ2VsbFN0eWxlVHlwZSkge1xuICAgICAgICBzdHlsZS51cGRhdGVOYXRpdmVTdHlsZUZpbHRlcnMoY2VsbFR5cGUsIGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckRpc3BsYXlNb2RlLkRheSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2hvd1dlZWtOdW1iZXJzQ2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vblNob3dXZWVrTnVtYmVyc0NoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TZWxlY3Rpb25TaGFwZUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhclNlbGVjdGlvblNoYXBlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyU2VsZWN0aW9uU2hhcGUpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5zeW5jU2VsZWN0aW9uU2hhcGUodGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2VsZWN0aW9uU2hhcGVTaXplQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIuc3luY1NlbGVjdGlvblNoYXBlKHRoaXMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblNlbGVjdGlvblNoYXBlQ29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIuc3luY1NlbGVjdGlvblNoYXBlKHRoaXMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblNob3dUaXRsZUNoYW5nZWQob2xkVmFsdWU6IGJvb2xlYW4sIG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25TaG93VGl0bGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2hvd0RheU5hbWVzQ2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vblNob3dEYXlOYW1lc0NoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25CYWNrZ3JvdW5kQ29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25CYWNrZ3JvdW5kQ29sb3JDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRGF5Q2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogRGF5Q2VsbFN0eWxlLCBuZXdWYWx1ZTogRGF5Q2VsbFN0eWxlKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25EYXlDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2VsZWN0ZWREYXlDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBEYXlDZWxsU3R5bGUsIG5ld1ZhbHVlOiBEYXlDZWxsU3R5bGUpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vblNlbGVjdGVkRGF5Q2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUsIHRoaXMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRvZGF5Q2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogRGF5Q2VsbFN0eWxlLCBuZXdWYWx1ZTogRGF5Q2VsbFN0eWxlKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25Ub2RheUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25XZWVrTnVtYmVyQ2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2VsbFN0eWxlLCBuZXdWYWx1ZTogQ2VsbFN0eWxlKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXIub25XZWVrTnVtYmVyQ2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUsIHRoaXMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbldlZWtlbmRDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBDZWxsU3R5bGUsIG5ld1ZhbHVlOiBDZWxsU3R5bGUpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplci5vbldlZWtlbmRDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRGF5TmFtZUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWU6IENlbGxTdHlsZSwgbmV3VmFsdWU6IENlbGxTdHlsZSkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uRGF5TmFtZUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UaXRsZUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWU6IENlbGxTdHlsZSwgbmV3VmFsdWU6IENlbGxTdHlsZSkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVyLm9uVGl0bGVDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRGF5RXZlbnRzVmlld1N0eWxlQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkRheUV2ZW50c1ZpZXdTdHlsZSwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5EYXlFdmVudHNWaWV3U3R5bGUpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VEYXlFdmVudHNWaWV3U3R5bGUob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZURheUV2ZW50c1ZpZXdTdHlsZShvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkRheUV2ZW50c1ZpZXdTdHlsZSwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5EYXlFdmVudHNWaWV3U3R5bGUpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBvbGRWYWx1ZS5vd25lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld1ZhbHVlICYmIHRoaXMuX293bmVyKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZS5vd25lciA9IHRoaXMuX293bmVyLl9uYXRpdmVWaWV3O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQWxsRGF5RXZlbnRzVmlld1N0eWxlQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkFsbERheUV2ZW50c1ZpZXdTdHlsZSwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5BbGxEYXlFdmVudHNWaWV3U3R5bGUpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VBbGxEYXlFdmVudHNWaWV3U3R5bGUob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZUFsbERheUV2ZW50c1ZpZXdTdHlsZShvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkFsbERheUV2ZW50c1ZpZXdTdHlsZSwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5BbGxEYXlFdmVudHNWaWV3U3R5bGUpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBvbGRWYWx1ZS5vd25lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld1ZhbHVlICYmIHRoaXMuX293bmVyKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZS5vd25lciA9IHRoaXMuX293bmVyLl9uYXRpdmVWaWV3O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uSW5saW5lRXZlbnRDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBJbmxpbmVFdmVudENlbGxTdHlsZSwgbmV3VmFsdWU6IElubGluZUV2ZW50Q2VsbFN0eWxlKSB7XG4gICAgICAgIHRoaXMucHJlcGFyZU5hdGl2ZVN0eWxlKG5ld1ZhbHVlLCBudWxsKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TaG93V2Vla0NoYW5nZWQob2xkVmFsdWU6IGJvb2xlYW4sIG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlU2hvd1dlZWsob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZVNob3dXZWVrKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAoIXRoaXMuX293bmVyIHx8ICF0aGlzLl9vd25lci5fbmF0aXZlVmlldykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnNldFNob3dXZWVrSW5EYXlNb2RlKG5ld1ZhbHVlKTtcbiAgICB9XG59XG5cbi8qKlxuICogVGhlIHllYXIgbW9kZSBzdHlsZSBjbGFzc1xuICovXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJZZWFyVmlld1N0eWxlIGV4dGVuZHMgY29tbW9uTW9kdWxlLkNhbGVuZGFyWWVhclZpZXdTdHlsZSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX293bmVyOiBSYWRDYWxlbmRhcjtcbiAgICBzZXQgb3duZXIodmFsdWU6IFJhZENhbGVuZGFyKSB7XG4gICAgICAgIHRoaXMuX293bmVyID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlU3R5bGVzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZU5hdGl2ZVN0eWxlcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9vd25lciB8fCAhdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRpdGxlQ2VsbFN0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLnRpdGxlQ2VsbFN0eWxlLm93bmVyID0gdGhpcy5fb3duZXIuX25hdGl2ZVZpZXc7XG4gICAgICAgICAgICB0aGlzLnRpdGxlQ2VsbFN0eWxlWyd1cGRhdGVOYXRpdmVTdHlsZUZpbHRlcnMnXShDZWxsU3R5bGVUeXBlLlRpdGxlU3R5bGUsIGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckRpc3BsYXlNb2RlLlllYXIpO1xuICAgICAgICAgICAgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcuYWRkRGF5Q2VsbFN0eWxlKHRoaXMudGl0bGVDZWxsU3R5bGUuYW5kcm9pZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tb250aENlbGxTdHlsZSkge1xuICAgICAgICAgICAgdGhpcy5tb250aENlbGxTdHlsZS5vd25lciA9IHRoaXMuX293bmVyLl9uYXRpdmVWaWV3O1xuICAgICAgICAgICAgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcuYWRkTW9udGhDZWxsU3R5bGUoKDxNb250aENlbGxTdHlsZT50aGlzLm1vbnRoQ2VsbFN0eWxlKS5yZWd1bGFyRGF5U3R5bGUpO1xuICAgICAgICAgICAgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcuYWRkTW9udGhDZWxsU3R5bGUoKDxNb250aENlbGxTdHlsZT50aGlzLm1vbnRoQ2VsbFN0eWxlKS53ZWVrZW5kU3R5bGUpO1xuICAgICAgICAgICAgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcuYWRkTW9udGhDZWxsU3R5bGUoKDxNb250aENlbGxTdHlsZT50aGlzLm1vbnRoQ2VsbFN0eWxlKS50b2RheVN0eWxlKTtcbiAgICAgICAgICAgIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LmFkZE1vbnRoQ2VsbFN0eWxlKCg8TW9udGhDZWxsU3R5bGU+dGhpcy5tb250aENlbGxTdHlsZSkuZGF5TmFtZVN0eWxlKTtcbiAgICAgICAgICAgIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LmFkZE1vbnRoQ2VsbFN0eWxlKCg8TW9udGhDZWxsU3R5bGU+dGhpcy5tb250aENlbGxTdHlsZSkubW9udGhOYW1lU3R5bGUpO1xuICAgICAgICAgICAgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcuYWRkTW9udGhDZWxsU3R5bGUoKDxNb250aENlbGxTdHlsZT50aGlzLm1vbnRoQ2VsbFN0eWxlKS5tb250aENlbGxTdHlsZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UaXRsZUNlbGxTdHlsZUNoYW5nZWQob2xkVmFsdWU6IENlbGxTdHlsZSwgbmV3VmFsdWU6IENlbGxTdHlsZSkge1xuICAgICAgICBpZiAodGhpcy5fb3duZXIgJiYgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcpIHtcbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IFNlZSBpZiB0aGlzIHdhcyB3b3JraW5nIGFzIHRoZSByZW1vdmVEYXlDZWxsU3R5bGUgcmVxdWlyZXMgJ0NhbGVuZGFyRGF5Q2VsbFN0eWxlJ1xuICAgICAgICAgICAgICAgIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnJlbW92ZURheUNlbGxTdHlsZSg8YW55Pm9sZFZhbHVlLmFuZHJvaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUub3duZXIgPSB0aGlzLl9vd25lci5fbmF0aXZlVmlldztcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZS51cGRhdGVOYXRpdmVTdHlsZUZpbHRlcnMoQ2VsbFN0eWxlVHlwZS5UaXRsZVN0eWxlLCBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJEaXNwbGF5TW9kZS5ZZWFyKTtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBTZWUgaWYgdGhpcyB3YXMgd29ya2luZyBhcyB0aGUgcmVtb3ZlRGF5Q2VsbFN0eWxlIHJlcXVpcmVzICdDYWxlbmRhckRheUNlbGxTdHlsZSdcbiAgICAgICAgICAgICAgICB0aGlzLl9vd25lci5fbmF0aXZlVmlldy5hZGREYXlDZWxsU3R5bGUoPGFueT5uZXdWYWx1ZS5hbmRyb2lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbk1vbnRoQ2VsbFN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogTW9udGhDZWxsU3R5bGUsIG5ld1ZhbHVlOiBNb250aENlbGxTdHlsZSkge1xuICAgICAgICBpZiAodGhpcy5fb3duZXIgJiYgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcpIHtcbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnJlbW92ZU1vbnRoQ2VsbFN0eWxlKG9sZFZhbHVlLnJlZ3VsYXJEYXlTdHlsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcucmVtb3ZlTW9udGhDZWxsU3R5bGUob2xkVmFsdWUud2Vla2VuZFN0eWxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vd25lci5fbmF0aXZlVmlldy5yZW1vdmVNb250aENlbGxTdHlsZShvbGRWYWx1ZS50b2RheVN0eWxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vd25lci5fbmF0aXZlVmlldy5yZW1vdmVNb250aENlbGxTdHlsZShvbGRWYWx1ZS5kYXlOYW1lU3R5bGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LnJlbW92ZU1vbnRoQ2VsbFN0eWxlKG9sZFZhbHVlLm1vbnRoTmFtZVN0eWxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vd25lci5fbmF0aXZlVmlldy5yZW1vdmVNb250aENlbGxTdHlsZShvbGRWYWx1ZS5tb250aENlbGxTdHlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vd25lci5fbmF0aXZlVmlldy5hZGRNb250aENlbGxTdHlsZShuZXdWYWx1ZS5yZWd1bGFyRGF5U3R5bGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LmFkZE1vbnRoQ2VsbFN0eWxlKG5ld1ZhbHVlLndlZWtlbmRTdHlsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcuYWRkTW9udGhDZWxsU3R5bGUobmV3VmFsdWUudG9kYXlTdHlsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcuYWRkTW9udGhDZWxsU3R5bGUobmV3VmFsdWUuZGF5TmFtZVN0eWxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vd25lci5fbmF0aXZlVmlldy5hZGRNb250aENlbGxTdHlsZShuZXdWYWx1ZS5tb250aE5hbWVTdHlsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcuYWRkTW9udGhDZWxsU3R5bGUobmV3VmFsdWUubW9udGhDZWxsU3R5bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIFRoZSB5ZWFyIHZpZXcgbW9kZSBpbiBjb21wYWN0IHZpZXdcbiAqL1xuZXhwb3J0IGNsYXNzIENhbGVuZGFyTW9udGhOYW1lc1ZpZXdTdHlsZSBleHRlbmRzIGNvbW1vbk1vZHVsZS5DYWxlbmRhck1vbnRoTmFtZXNWaWV3U3R5bGUge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9vd25lcjogUmFkQ2FsZW5kYXI7XG4gICAgc2V0IG93bmVyKHZhbHVlOiBSYWRDYWxlbmRhcikge1xuICAgICAgICB0aGlzLl9vd25lciA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZVN0eWxlcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVOYXRpdmVTdHlsZXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5fb3duZXIgfHwgIXRoaXMuX293bmVyLl9uYXRpdmVWaWV3KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50aXRsZUNlbGxTdHlsZSkge1xuICAgICAgICAgICAgdGhpcy50aXRsZUNlbGxTdHlsZS5vd25lciA9IHRoaXMuX293bmVyLl9uYXRpdmVWaWV3O1xuICAgICAgICAgICAgdGhpcy50aXRsZUNlbGxTdHlsZVsndXBkYXRlTmF0aXZlU3R5bGVGaWx0ZXJzJ10oQ2VsbFN0eWxlVHlwZS5UaXRsZVN0eWxlLCBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJEaXNwbGF5TW9kZS5ZZWFyKTtcbiAgICAgICAgICAgIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LmFkZERheUNlbGxTdHlsZSh0aGlzLnRpdGxlQ2VsbFN0eWxlLmFuZHJvaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubW9udGhOYW1lQ2VsbFN0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoTmFtZUNlbGxTdHlsZVsnbmF0aXZlSXNZZWFyJ10gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tb250aE5hbWVDZWxsU3R5bGUub3duZXIgPSB0aGlzLl9vd25lci5fbmF0aXZlVmlldztcbiAgICAgICAgICAgIHRoaXMubW9udGhOYW1lQ2VsbFN0eWxlWyd1cGRhdGVOYXRpdmVTdHlsZUZpbHRlcnMnXShDZWxsU3R5bGVUeXBlLk1vbnRoTmFtZVN0eWxlLCBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJEaXNwbGF5TW9kZS5ZZWFyKTtcbiAgICAgICAgICAgIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3LmFkZE1vbnRoQ2VsbFN0eWxlKHRoaXMubW9udGhOYW1lQ2VsbFN0eWxlLmFuZHJvaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUZpbHRlckRpc3BsYXlNb2RlKGZpbHRlcjogY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyTW9udGhDZWxsRmlsdGVyKSB7XG4gICAgICAgIGxldCBwb3NpdGl2ZUZpbHRlciA9IG5ldyBqYXZhLmxhbmcuQm9vbGVhbih0cnVlKTtcbiAgICAgICAgLy8gZmlsdGVyLnNldFRleHRJc01vbnRoTmFtZShwb3NpdGl2ZUZpbHRlcik7XG4gICAgICAgIGZpbHRlci5zZXRNb250aElzQ29tcGFjdChwb3NpdGl2ZUZpbHRlcik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVGl0bGVDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBDZWxsU3R5bGUsIG5ld1ZhbHVlOiBDZWxsU3R5bGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX293bmVyICYmIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3KSB7XG4gICAgICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBTZWUgaWYgdGhpcyB3YXMgd29ya2luZyBhcyB0aGUgcmVtb3ZlRGF5Q2VsbFN0eWxlIHJlcXVpcmVzICdDYWxlbmRhckRheUNlbGxTdHlsZSdcbiAgICAgICAgICAgICAgICB0aGlzLl9vd25lci5fbmF0aXZlVmlldy5yZW1vdmVEYXlDZWxsU3R5bGUoPGFueT5vbGRWYWx1ZS5hbmRyb2lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlLm93bmVyID0gdGhpcy5fb3duZXIuX25hdGl2ZVZpZXc7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUudXBkYXRlTmF0aXZlU3R5bGVGaWx0ZXJzKENlbGxTdHlsZVR5cGUuVGl0bGVTdHlsZSwgY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyRGlzcGxheU1vZGUuWWVhcik7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogU2VlIGlmIHRoaXMgd2FzIHdvcmtpbmcgYXMgdGhlIHJlbW92ZURheUNlbGxTdHlsZSByZXF1aXJlcyAnQ2FsZW5kYXJEYXlDZWxsU3R5bGUnXG4gICAgICAgICAgICAgICAgdGhpcy5fb3duZXIuX25hdGl2ZVZpZXcuYWRkRGF5Q2VsbFN0eWxlKDxhbnk+bmV3VmFsdWUuYW5kcm9pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Nb250aE5hbWVDZWxsU3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBDZWxsU3R5bGUsIG5ld1ZhbHVlOiBDZWxsU3R5bGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX293bmVyICYmIHRoaXMuX293bmVyLl9uYXRpdmVWaWV3KSB7XG4gICAgICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBTZWUgaWYgdGhpcyB3YXMgd29ya2luZyBhcyB0aGUgcmVtb3ZlRGF5Q2VsbFN0eWxlIHJlcXVpcmVzICdDYWxlbmRhckRheUNlbGxTdHlsZSdcbiAgICAgICAgICAgICAgICB0aGlzLl9vd25lci5fbmF0aXZlVmlldy5yZW1vdmVNb250aENlbGxTdHlsZSg8YW55Pm9sZFZhbHVlLmFuZHJvaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUubmF0aXZlSXNZZWFyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZS5vd25lciA9IHRoaXMuX293bmVyLl9uYXRpdmVWaWV3O1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlLnVwZGF0ZU5hdGl2ZVN0eWxlRmlsdGVycyhDZWxsU3R5bGVUeXBlLk1vbnRoTmFtZVN0eWxlLCBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJEaXNwbGF5TW9kZS5ZZWFyKTtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBTZWUgaWYgdGhpcyB3YXMgd29ya2luZyBhcyB0aGUgcmVtb3ZlRGF5Q2VsbFN0eWxlIHJlcXVpcmVzICdDYWxlbmRhckRheUNlbGxTdHlsZSdcbiAgICAgICAgICAgICAgICB0aGlzLl9vd25lci5fbmF0aXZlVmlldy5hZGRNb250aENlbGxTdHlsZSg8YW55Pm5ld1ZhbHVlLmFuZHJvaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5pbnRlcmZhY2UgQ2FsZW5kYXJDZWxsQ2xpY2tMaXN0ZW5lciB7XG4gICAgbmV3KG93bmVyOiBSYWRDYWxlbmRhcik6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5SYWRDYWxlbmRhclZpZXcuT25DZWxsQ2xpY2tMaXN0ZW5lcjtcbn1cbmludGVyZmFjZSBDYWxlbmRhck9uSXRlbUNsaWNrTGlzdGVuZXIge1xuICAgIG5ldyhvd25lcjogUmFkQ2FsZW5kYXIpOiBhbmRyb2lkLndpZGdldC5BZGFwdGVyVmlldy5Pbkl0ZW1DbGlja0xpc3RlbmVyO1xufVxuaW50ZXJmYWNlIENhbGVuZGFyT25EaXNwbGF5RGF0ZUNoYW5nZWRMaXN0ZW5lciB7XG4gICAgbmV3KG93bmVyOiBSYWRDYWxlbmRhcik6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5SYWRDYWxlbmRhclZpZXcuT25EaXNwbGF5RGF0ZUNoYW5nZWRMaXN0ZW5lcjtcbn1cbmludGVyZmFjZSBDYWxlbmRhck9uRGlzcGxheU1vZGVDaGFuZ2VkTGlzdGVuZXIge1xuICAgIG5ldyhvd25lcjogUmFkQ2FsZW5kYXIpOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuUmFkQ2FsZW5kYXJWaWV3Lk9uRGlzcGxheU1vZGVDaGFuZ2VkTGlzdGVuZXI7XG59XG5pbnRlcmZhY2UgQ2FsZW5kYXJFdmVudFZpZXdUYXBMaXN0ZW5lciB7XG4gICAgbmV3KG93bmVyOiBSYWRDYWxlbmRhcik6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5kYXl2aWV3LkNhbGVuZGFyRGF5Vmlldy5FdmVudFZpZXdUYXBMaXN0ZW5lcjtcbn1cbmludGVyZmFjZSBDYWxlbmRhck9uU2VsZWN0ZWREYXRlc0NoYW5nZWRMaXN0ZW5lciB7XG4gICAgbmV3KG93bmVyOiBSYWRDYWxlbmRhcik6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5SYWRDYWxlbmRhclZpZXcuT25TZWxlY3RlZERhdGVzQ2hhbmdlZExpc3RlbmVyO1xufVxuXG5sZXQgQ2FsZW5kYXJDZWxsQ2xpY2tMaXN0ZW5lcjogQ2FsZW5kYXJDZWxsQ2xpY2tMaXN0ZW5lcjtcbmxldCBDYWxlbmRhck9uSXRlbUNsaWNrTGlzdGVuZXI6IENhbGVuZGFyT25JdGVtQ2xpY2tMaXN0ZW5lcjtcbmxldCBDYWxlbmRhck9uRGlzcGxheURhdGVDaGFuZ2VkTGlzdGVuZXI6IENhbGVuZGFyT25EaXNwbGF5RGF0ZUNoYW5nZWRMaXN0ZW5lcjtcbmxldCBDYWxlbmRhck9uRGlzcGxheU1vZGVDaGFuZ2VkTGlzdGVuZXI6IENhbGVuZGFyT25EaXNwbGF5TW9kZUNoYW5nZWRMaXN0ZW5lcjtcbmxldCBDYWxlbmRhckV2ZW50Vmlld1RhcExpc3RlbmVyOiBDYWxlbmRhckV2ZW50Vmlld1RhcExpc3RlbmVyO1xubGV0IENhbGVuZGFyT25TZWxlY3RlZERhdGVzQ2hhbmdlZExpc3RlbmVyOiBDYWxlbmRhck9uU2VsZWN0ZWREYXRlc0NoYW5nZWRMaXN0ZW5lcjtcbmZ1bmN0aW9uIGluaXRpYWxpemVMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKCFDYWxlbmRhckNlbGxDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgIEBJbnRlcmZhY2VzKFtjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuUmFkQ2FsZW5kYXJWaWV3Lk9uQ2VsbENsaWNrTGlzdGVuZXJdKVxuICAgICAgICBjbGFzcyBDYWxlbmRhckNlbGxDbGlja0xpc3RlbmVySW1wbCBleHRlbmRzIGphdmEubGFuZy5PYmplY3QgaW1wbGVtZW50cyBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuUmFkQ2FsZW5kYXJWaWV3Lk9uQ2VsbENsaWNrTGlzdGVuZXIge1xuICAgICAgICAgICAgY29uc3RydWN0b3IocHVibGljIG93bmVyOiBSYWRDYWxlbmRhcikge1xuICAgICAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdsb2JhbC5fX25hdGl2ZSh0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb25DZWxsQ2xpY2soY2VsbDogY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyQ2VsbCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vd25lcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBSYWNlIGNvbmRpdGlvbjogQ2FsZW5kYXIgYWxyZWFkeSBkaXNwb3NlZFxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGFyZ3M6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckNlbGxUYXBFdmVudERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogY29tbW9uTW9kdWxlLlJhZENhbGVuZGFyLmNlbGxUYXBFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLm93bmVyLFxuICAgICAgICAgICAgICAgICAgICBjZWxsOiBjZWxsLFxuICAgICAgICAgICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZShjZWxsLmdldERhdGUoKSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMub3duZXIubm90aWZ5KGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIENhbGVuZGFyQ2VsbENsaWNrTGlzdGVuZXIgPSBDYWxlbmRhckNlbGxDbGlja0xpc3RlbmVySW1wbDtcbiAgICB9XG5cbiAgICBpZiAoIUNhbGVuZGFyT25JdGVtQ2xpY2tMaXN0ZW5lcikge1xuICAgICAgICBASW50ZXJmYWNlcyhbYW5kcm9pZC53aWRnZXQuQWRhcHRlclZpZXcuT25JdGVtQ2xpY2tMaXN0ZW5lcl0pXG4gICAgICAgIGNsYXNzIENhbGVuZGFyT25JdGVtQ2xpY2tMaXN0ZW5lckltcGwgZXh0ZW5kcyBqYXZhLmxhbmcuT2JqZWN0IGltcGxlbWVudHMgYW5kcm9pZC53aWRnZXQuQWRhcHRlclZpZXcuT25JdGVtQ2xpY2tMaXN0ZW5lciB7XG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgb3duZXI6IFJhZENhbGVuZGFyKSB7XG4gICAgICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2xvYmFsLl9fbmF0aXZlKHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvbkl0ZW1DbGljayhwYXJlbnQ6IGFuZHJvaWQud2lkZ2V0LkFkYXB0ZXJWaWV3PGFueT4sIHZpZXc6IGFuZHJvaWQudmlldy5WaWV3LCBwb3NpdGlvbjogbnVtYmVyLCBpZDogbnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm93bmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJhY2UgY29uZGl0aW9uOiBDYWxlbmRhciBhbHJlYWR5IGRpc3Bvc2VkXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgZXZlbnQgPSBwYXJlbnQuZ2V0QWRhcHRlcigpLmdldEl0ZW0ocG9zaXRpb24pOyAvLyByZXR1cm5lZCBvYmplY3QgaXMgaW5zdGFuY2Ugb2YgRXZlbnRzTWFuYWdlci5FdmVudEluZm8gY2xhc3NcbiAgICAgICAgICAgICAgICBsZXQgaW5saW5lRXZlbnREYXRhOiBDYWxlbmRhckV2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQudGl0bGUoKSwgbmV3IERhdGUoZXZlbnQuc3RhcnRUaW1lKCkpLCBuZXcgRGF0ZShldmVudC5lbmRUaW1lKCkpLCBldmVudC5hbGxEYXkpO1xuICAgICAgICAgICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJJbmxpbmVFdmVudFNlbGVjdGVkRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkQ2FsZW5kYXIuaW5saW5lRXZlbnRTZWxlY3RlZEV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMub3duZXIsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50RGF0YTogaW5saW5lRXZlbnREYXRhXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLm93bmVyLm5vdGlmeShhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBDYWxlbmRhck9uSXRlbUNsaWNrTGlzdGVuZXIgPSBDYWxlbmRhck9uSXRlbUNsaWNrTGlzdGVuZXJJbXBsO1xuICAgIH1cblxuICAgIGlmICghQ2FsZW5kYXJPbkRpc3BsYXlEYXRlQ2hhbmdlZExpc3RlbmVyKSB7XG4gICAgICAgIEBJbnRlcmZhY2VzKFtjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuUmFkQ2FsZW5kYXJWaWV3Lk9uRGlzcGxheURhdGVDaGFuZ2VkTGlzdGVuZXJdKVxuICAgICAgICBjbGFzcyBDYWxlbmRhck9uRGlzcGxheURhdGVDaGFuZ2VkTGlzdGVuZXJJbXBsIGV4dGVuZHMgamF2YS5sYW5nLk9iamVjdCBpbXBsZW1lbnRzIGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5SYWRDYWxlbmRhclZpZXcuT25EaXNwbGF5RGF0ZUNoYW5nZWRMaXN0ZW5lciB7XG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgb3duZXI6IFJhZENhbGVuZGFyKSB7XG4gICAgICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2xvYmFsLl9fbmF0aXZlKHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvbkRpc3BsYXlEYXRlQ2hhbmdlZChvbGREYXRlOiBudW1iZXIsIG5ld0RhdGU6IG51bWJlcikge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vd25lcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBSYWNlIGNvbmRpdGlvbjogQ2FsZW5kYXIgYWxyZWFkeSBkaXNwb3NlZFxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IG5ld0Rpc3BsYXllZERhdGUgPSBuZXcgRGF0ZShuZXdEYXRlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vd25lci5kaXNwbGF5ZWREYXRlID09PSBuZXdEaXNwbGF5ZWREYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgbmF2aWdhdGlvblN0YXJ0ZWRBcmdzOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJOYXZpZ2F0aW9uRXZlbnREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6IGNvbW1vbk1vZHVsZS5SYWRDYWxlbmRhci5uYXZpZ2F0aW5nVG9EYXRlU3RhcnRlZEV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMub3duZXIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IG5ld0Rpc3BsYXllZERhdGVcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vd25lci5ub3RpZnkobmF2aWdhdGlvblN0YXJ0ZWRBcmdzKTtcblxuICAgICAgICAgICAgICAgIHRoaXMub3duZXIuZGlzcGxheWVkRGF0ZSA9IG5ld0Rpc3BsYXllZERhdGU7XG5cbiAgICAgICAgICAgICAgICBsZXQgbmF2aWdhdGVkQXJnczogY29tbW9uTW9kdWxlLkNhbGVuZGFyTmF2aWdhdGlvbkV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkQ2FsZW5kYXIubmF2aWdhdGVkVG9EYXRlRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5vd25lcixcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogbmV3RGlzcGxheWVkRGF0ZVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB0aGlzLm93bmVyLm5vdGlmeShuYXZpZ2F0ZWRBcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBDYWxlbmRhck9uRGlzcGxheURhdGVDaGFuZ2VkTGlzdGVuZXIgPSBDYWxlbmRhck9uRGlzcGxheURhdGVDaGFuZ2VkTGlzdGVuZXJJbXBsO1xuICAgIH1cblxuICAgIGlmICghQ2FsZW5kYXJPbkRpc3BsYXlNb2RlQ2hhbmdlZExpc3RlbmVyKSB7XG4gICAgICAgIEBJbnRlcmZhY2VzKFtjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuUmFkQ2FsZW5kYXJWaWV3Lk9uRGlzcGxheU1vZGVDaGFuZ2VkTGlzdGVuZXJdKVxuICAgICAgICBjbGFzcyBDYWxlbmRhck9uRGlzcGxheU1vZGVDaGFuZ2VkTGlzdGVuZXJJbXBsIGV4dGVuZHMgamF2YS5sYW5nLk9iamVjdCBpbXBsZW1lbnRzIGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5SYWRDYWxlbmRhclZpZXcuT25EaXNwbGF5TW9kZUNoYW5nZWRMaXN0ZW5lciB7XG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgb3duZXI6IFJhZENhbGVuZGFyKSB7XG4gICAgICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2xvYmFsLl9fbmF0aXZlKHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvbkRpc3BsYXlNb2RlQ2hhbmdlZChvbGRNb2RlOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJEaXNwbGF5TW9kZSwgbmV3TW9kZTogY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyRGlzcGxheU1vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3duZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmFjZSBjb25kaXRpb246IENhbGVuZGFyIGFscmVhZHkgZGlzcG9zZWRcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBuZXdDYWxlbmRhck1vZGUgPSBSYWRDYWxlbmRhci5nZXRWaWV3TW9kZUZyb21BbmRyb2lkVmlld01vZGUodGhpcy5vd25lciwgbmV3TW9kZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vd25lci52aWV3TW9kZSA9IG5ld0NhbGVuZGFyTW9kZTtcblxuICAgICAgICAgICAgICAgIGxldCBvbGRDYWxlbmRhck1vZGUgPSBSYWRDYWxlbmRhci5nZXRWaWV3TW9kZUZyb21BbmRyb2lkVmlld01vZGUodGhpcy5vd25lciwgb2xkTW9kZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vd25lci5ub3RpZnlWaWV3TW9kZUNoYW5nZWQob2xkQ2FsZW5kYXJNb2RlLCBuZXdDYWxlbmRhck1vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIENhbGVuZGFyT25EaXNwbGF5TW9kZUNoYW5nZWRMaXN0ZW5lciA9IENhbGVuZGFyT25EaXNwbGF5TW9kZUNoYW5nZWRMaXN0ZW5lckltcGw7XG4gICAgfVxuXG4gICAgaWYgKCFDYWxlbmRhckV2ZW50Vmlld1RhcExpc3RlbmVyKSB7XG4gICAgICAgIEBJbnRlcmZhY2VzKFtjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuZGF5dmlldy5DYWxlbmRhckRheVZpZXcuRXZlbnRWaWV3VGFwTGlzdGVuZXJdKVxuICAgICAgICBjbGFzcyBDYWxlbmRhckV2ZW50Vmlld1RhcExpc3RlbmVySW1wbCBleHRlbmRzIGphdmEubGFuZy5PYmplY3QgaW1wbGVtZW50cyBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuZGF5dmlldy5DYWxlbmRhckRheVZpZXcuRXZlbnRWaWV3VGFwTGlzdGVuZXIge1xuICAgICAgICAgICAgY29uc3RydWN0b3IocHVibGljIG93bmVyOiBSYWRDYWxlbmRhcikge1xuICAgICAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdsb2JhbC5fX25hdGl2ZSh0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb25FdmVudFZpZXdUYXAoZXZlbnQ6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5ldmVudHMuRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3duZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmFjZSBjb25kaXRpb246IENhbGVuZGFyIGFscmVhZHkgZGlzcG9zZWRcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBkYXlWaWV3RXZlbnREYXRhOiBDYWxlbmRhckV2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQuZ2V0VGl0bGUoKSwgbmV3IERhdGUoZXZlbnQuZ2V0U3RhcnREYXRlKCkpLCBuZXcgRGF0ZShldmVudC5nZXRFbmREYXRlKCkpLCBldmVudC5pc0FsbERheSgpKTtcbiAgICAgICAgICAgICAgICBsZXQgYXJnczogY29tbW9uTW9kdWxlLkNhbGVuZGFyRGF5Vmlld0V2ZW50U2VsZWN0ZWREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6IGNvbW1vbk1vZHVsZS5SYWRDYWxlbmRhci5kYXlWaWV3RXZlbnRTZWxlY3RlZEV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMub3duZXIsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50RGF0YTogZGF5Vmlld0V2ZW50RGF0YVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5vd25lci5ub3RpZnkoYXJncyk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBDYWxlbmRhckV2ZW50Vmlld1RhcExpc3RlbmVyID0gQ2FsZW5kYXJFdmVudFZpZXdUYXBMaXN0ZW5lckltcGw7XG4gICAgfVxuXG4gICAgaWYgKCFDYWxlbmRhck9uU2VsZWN0ZWREYXRlc0NoYW5nZWRMaXN0ZW5lcikge1xuICAgICAgICBASW50ZXJmYWNlcyhbY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLlJhZENhbGVuZGFyVmlldy5PblNlbGVjdGVkRGF0ZXNDaGFuZ2VkTGlzdGVuZXJdKVxuICAgICAgICBjbGFzcyBDYWxlbmRhck9uU2VsZWN0ZWREYXRlc0NoYW5nZWRMaXN0ZW5lckltcGwgZXh0ZW5kcyBqYXZhLmxhbmcuT2JqZWN0IGltcGxlbWVudHMgY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLlJhZENhbGVuZGFyVmlldy5PblNlbGVjdGVkRGF0ZXNDaGFuZ2VkTGlzdGVuZXIge1xuICAgICAgICAgICAgY29uc3RydWN0b3IocHVibGljIG93bmVyOiBSYWRDYWxlbmRhcikge1xuICAgICAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdsb2JhbC5fX25hdGl2ZSh0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb25TZWxlY3RlZERhdGVzQ2hhbmdlZChjb250ZXh0OiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuUmFkQ2FsZW5kYXJWaWV3LlNlbGVjdGlvbkNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3duZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmFjZSBjb25kaXRpb246IENhbGVuZGFyIGFscmVhZHkgZGlzcG9zZWRcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZENvdW50ID0gY29udGV4dC5kYXRlc0FkZGVkKCkuc2l6ZSgpO1xuICAgICAgICAgICAgICAgIGxldCBkZXNlbGVjdGVkQ291bnQgPSBjb250ZXh0LmRhdGVzUmVtb3ZlZCgpLnNpemUoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm93bmVyLnNlbGVjdGlvbk1vZGUgIT09IGNvbW1vbk1vZHVsZS5DYWxlbmRhclNlbGVjdGlvbk1vZGUuUmFuZ2UgJiYgZGVzZWxlY3RlZENvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgZGVzZWxlY3RlZENvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZXNlbGVjdGVkRGF0ZSA9IG5ldyBEYXRlKGNvbnRleHQuZGF0ZXNSZW1vdmVkKCkuZ2V0KGkpLmxvbmdWYWx1ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3duZXIubm90aWZ5RGF0ZURlc2VsZWN0ZWQodGhpcy5vd25lciwgZGVzZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3duZXIuc2VsZWN0aW9uTW9kZSA9PT0gY29tbW9uTW9kdWxlLkNhbGVuZGFyU2VsZWN0aW9uTW9kZS5SYW5nZSAmJiBzZWxlY3RlZENvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmF0aXZlQ2FsZW5kYXIgPSA8Y29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLlJhZENhbGVuZGFyVmlldz50aGlzLm93bmVyLmFuZHJvaWQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRlUmFuZ2UgPSBuYXRpdmVDYWxlbmRhci5nZXRTZWxlY3Rpb25NYW5hZ2VyKCkuZ2V0U2VsZWN0ZWRSYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm93bmVyLm5vdGlmeVJhbmdlU2VsZWN0aW9uQ2hhbmdlZCh0aGlzLm93bmVyLCBuZXcgRGF0ZShkYXRlUmFuZ2UuZ2V0U3RhcnQoKSksIG5ldyBEYXRlKGRhdGVSYW5nZS5nZXRFbmQoKSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZENvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtaWxsaXM6IG51bWJlciA9IGNvbnRleHQuZGF0ZXNBZGRlZCgpLmdldChpKS5sb25nVmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZERhdGU6IERhdGUgPSBuZXcgRGF0ZShtaWxsaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vd25lci5ub3RpZnlTaW5nbGVEYXRlU2VsZWN0ZWQodGhpcy5vd25lciwgc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBDYWxlbmRhck9uU2VsZWN0ZWREYXRlc0NoYW5nZWRMaXN0ZW5lciA9IENhbGVuZGFyT25TZWxlY3RlZERhdGVzQ2hhbmdlZExpc3RlbmVySW1wbDtcbiAgICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmFkQ2FsZW5kYXJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGNsYXNzIFJhZENhbGVuZGFyIGV4dGVuZHMgY29tbW9uTW9kdWxlLlJhZENhbGVuZGFyIHtcbiAgICBwcml2YXRlIF9hbmRyb2lkOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuUmFkQ2FsZW5kYXJWaWV3O1xuICAgIHByaXZhdGUgX2ZvcmJpZE5hdGl2ZVNlbGVjdGlvbjogYm9vbGVhbjtcbiAgICBwcml2YXRlIF9hbmRyb2lkVmlld0lkOiBudW1iZXIgPSAtMTtcblxuICAgIGdldCBfbmF0aXZlVmlldygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW5kcm9pZDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlTmF0aXZlVmlldygpIHtcbiAgICAgICAgaW5pdGlhbGl6ZUxpc3RlbmVycygpO1xuICAgICAgICB0aGlzLl9hbmRyb2lkID0gbmV3IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5SYWRDYWxlbmRhclZpZXcodGhpcy5fY29udGV4dCk7XG4gICAgICAgIHRoaXMuX2FuZHJvaWQuc2V0SG9yaXpvbnRhbFNjcm9sbCh0aGlzLmhvcml6b250YWxUcmFuc2l0aW9uKTtcbiAgICAgICAgdGhpcy5hZGRPbkNlbGxDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuYWRkT25EaXNwbGF5RGF0ZUNoYW5nZWRMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50U291cmNlKCk7XG4gICAgICAgIHRoaXMuYWRkT25EaXNwbGF5TW9kZUNoYW5nZWRMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmFkZE9uU2VsZWN0ZWREYXRlc0NoYW5nZWRMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnNldERheVZpZXdFdmVudFNlbGVjdGVkTGlzdGVuZXIoKTtcblxuICAgICAgICAvLyBzZXQgaW5pdGlhbCBwcm9wZXJ0eSB2YWx1ZXMgdXNpbmcgdmFsdWUgY2hhbmdlZCBoYW5kbGVyc1xuICAgICAgICB0aGlzLnNldE5hdGl2ZU1pbkRhdGUodGhpcy5taW5EYXRlKTtcbiAgICAgICAgdGhpcy5zZXROYXRpdmVNYXhEYXRlKHRoaXMubWF4RGF0ZSk7XG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXllZERhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkTmF0aXZlRGlzcGxheWVkRGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXROYXRpdmVEaXNwbGF5ZWREYXRlKHRoaXMuZGlzcGxheWVkRGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXROYXRpdmVTZWxlY3Rpb25Nb2RlKHRoaXMuc2VsZWN0aW9uTW9kZSk7XG4gICAgICAgIHRoaXMuc2V0TmF0aXZlRXZlbnRzVmlld01vZGUodGhpcy5ldmVudHNWaWV3TW9kZSk7XG4gICAgICAgIHRoaXMuc2V0TmF0aXZlSG9yaXpvbnRhbFRyYW5zaXRpb24odGhpcy5ob3Jpem9udGFsVHJhbnNpdGlvbik7XG4gICAgICAgIHRoaXMuc2V0TmF0aXZlVHJhbnNpdGlvbk1vZGUodGhpcy50cmFuc2l0aW9uTW9kZSk7XG4gICAgICAgIHRoaXMuc2V0TmF0aXZlVmlld01vZGUodGhpcy52aWV3TW9kZSk7XG4gICAgICAgIHRoaXMuc2V0TmF0aXZlU2VsZWN0ZWREYXRlKHRoaXMuc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgdGhpcy5zZXROYXRpdmVTZWxlY3RlZERhdGVzKHRoaXMuc2VsZWN0ZWREYXRlcyk7XG4gICAgICAgIHRoaXMuc2V0TmF0aXZlU2VsZWN0ZWREYXRlUmFuZ2UodGhpcy5zZWxlY3RlZERhdGVSYW5nZSk7XG4gICAgICAgIHRoaXMuaW5pdE9uSW5saW5lRXZlbnRzQ2xpY2tlZExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuc2V0TmF0aXZlTG9jYWxlKHRoaXMubG9jYWxlKTtcblxuXG4gICAgICAgIC8vIGFwcGx5IGNlbGwgc3R5bGVzXG4gICAgICAgIGlmICh0aGlzLm1vbnRoVmlld1N0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoVmlld1N0eWxlLm93bmVyID0gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy53ZWVrVmlld1N0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLndlZWtWaWV3U3R5bGUub3duZXIgPSB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRheVZpZXdTdHlsZSkge1xuICAgICAgICAgICAgdGhpcy5kYXlWaWV3U3R5bGUub3duZXIgPSB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnllYXJWaWV3U3R5bGUpIHtcbiAgICAgICAgICAgIHRoaXMueWVhclZpZXdTdHlsZS5vd25lciA9IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubW9udGhOYW1lc1ZpZXdTdHlsZSkge1xuICAgICAgICAgICAgdGhpcy5tb250aE5hbWVzVmlld1N0eWxlLm93bmVyID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9uYXRpdmVWaWV3O1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0TmF0aXZlVmlldygpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuaW5pdE5hdGl2ZVZpZXcoKTtcbiAgICAgICAgaWYgKHRoaXMuX2FuZHJvaWRWaWV3SWQgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmRyb2lkVmlld0lkID0gYW5kcm9pZC52aWV3LlZpZXcuZ2VuZXJhdGVWaWV3SWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX25hdGl2ZVZpZXcuc2V0SWQodGhpcy5fYW5kcm9pZFZpZXdJZCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc3Bvc2VOYXRpdmVWaWV3KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fbmF0aXZlVmlldy5fY2VsbENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZVZpZXcuX2NlbGxDbGlja0xpc3RlbmVyLm93bmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9uYXRpdmVWaWV3Ll9pdGVtQ2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5faXRlbUNsaWNrTGlzdGVuZXIub3duZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX25hdGl2ZVZpZXcuX2Rpc3BsYXlEYXRlQ2hhbmdlZExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVWaWV3Ll9kaXNwbGF5RGF0ZUNoYW5nZWRMaXN0ZW5lci5vd25lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbmF0aXZlVmlldy5fZGlzcGxheU1vZGVDaGFuZ2VkTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZVZpZXcuX2Rpc3BsYXlNb2RlQ2hhbmdlZExpc3RlbmVyLm93bmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9uYXRpdmVWaWV3Ll9ldmVudFZpZXdUYXBMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5fZXZlbnRWaWV3VGFwTGlzdGVuZXIub3duZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX25hdGl2ZVZpZXcuX29uU2VsZWN0ZWREYXRlc0NoYW5nZWRMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5fb25TZWxlY3RlZERhdGVzQ2hhbmdlZExpc3RlbmVyLm93bmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5kaXNwb3NlTmF0aXZlVmlldygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZE5hdGl2ZURpc3BsYXllZERhdGUoKSB7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUodGhpcy5fYW5kcm9pZC5nZXREaXNwbGF5RGF0ZSgpKTtcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheWVkRGF0ZSAhPT0gZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWREYXRlID0gZGF0ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkT25DZWxsQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5fY2VsbENsaWNrTGlzdGVuZXIgPSBuZXcgQ2FsZW5kYXJDZWxsQ2xpY2tMaXN0ZW5lcih0aGlzKTtcbiAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5zZXRPbkNlbGxDbGlja0xpc3RlbmVyKHRoaXMuX25hdGl2ZVZpZXcuX2NlbGxDbGlja0xpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBfc3luY1NlbGVjdGlvblNoYXBlKCkge1xuICAgICAgICBsZXQgYWN0aXZlU3R5bGUgPSB0aGlzLnZpZXdNb2RlID09PSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJWaWV3TW9kZS5Nb250aCA/IHRoaXMubW9udGhWaWV3U3R5bGUgOlxuICAgICAgICAgICAgdGhpcy52aWV3TW9kZSA9PT0gY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuV2VlayA/IHRoaXMud2Vla1ZpZXdTdHlsZSA6XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZSA9PT0gY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuRGF5ID8gdGhpcy5kYXlWaWV3U3R5bGUgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMuX25hdGl2ZVZpZXcpIHtcbiAgICAgICAgICAgIGxldCBkZWZhdWx0RGVjb3JhdG9yID0gbmV3IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DZWxsRGVjb3JhdGlvbnNMYXllcih0aGlzLl9uYXRpdmVWaWV3KTtcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZVZpZXcuc2V0Q2VsbERlY29yYXRvcihkZWZhdWx0RGVjb3JhdG9yKTtcbiAgICAgICAgICAgIGlmIChhY3RpdmVTdHlsZSAmJiBhY3RpdmVTdHlsZS5zZWxlY3Rpb25TaGFwZSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoYWN0aXZlU3R5bGUuc2VsZWN0aW9uU2hhcGUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclNlbGVjdGlvblNoYXBlLlJvdW5kOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdW5kRGVjb3JhdG9yID0gbmV3IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5kZWNvcmF0aW9ucy5DaXJjdWxhckNlbGxEZWNvcmF0b3IodGhpcy5fbmF0aXZlVmlldyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3VuZERlY29yYXRvci5zZXRTdHJva2VkKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kRGVjb3JhdG9yLnNldFJhZGl1cyh1dGlsc01vZHVsZS5sYXlvdXQudG9EZXZpY2VQaXhlbHMoYWN0aXZlU3R5bGUuc2VsZWN0aW9uU2hhcGVTaXplKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlU3R5bGUuc2VsZWN0aW9uU2hhcGVDb2xvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kRGVjb3JhdG9yLnNldENvbG9yKGFjdGl2ZVN0eWxlLnNlbGVjdGlvblNoYXBlQ29sb3IuYW5kcm9pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVWaWV3LnNldENlbGxEZWNvcmF0b3Iocm91bmREZWNvcmF0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5zZXRTaG93Q2VsbERlY29yYXRpb25zKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyU2VsZWN0aW9uU2hhcGUuU3F1YXJlOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNxdWFyZURlY29yYXRvciA9IG5ldyBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuZGVjb3JhdGlvbnMuU3F1YXJlQ2VsbERlY29yYXRvcih0aGlzLl9uYXRpdmVWaWV3KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZURlY29yYXRvci5zZXRTdHJva2VkKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZURlY29yYXRvci5zZXRTaXplKHV0aWxzTW9kdWxlLmxheW91dC50b0RldmljZVBpeGVscyhhY3RpdmVTdHlsZS5zZWxlY3Rpb25TaGFwZVNpemUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVTdHlsZS5zZWxlY3Rpb25TaGFwZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlRGVjb3JhdG9yLnNldENvbG9yKGFjdGl2ZVN0eWxlLnNlbGVjdGlvblNoYXBlQ29sb3IuYW5kcm9pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVWaWV3LnNldENlbGxEZWNvcmF0b3Ioc3F1YXJlRGVjb3JhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZVZpZXcuc2V0U2hvd0NlbGxEZWNvcmF0aW9ucyh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclNlbGVjdGlvblNoYXBlLk5vbmU6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVWaWV3LnNldFNob3dDZWxsRGVjb3JhdGlvbnMoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZE9uSW5saW5lRXZlbnRzQ2xpY2tlZExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5fbmF0aXZlVmlldy5ldmVudHNNYW5hZ2VyKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZVZpZXcuZXZlbnRzTWFuYWdlcigpLnNldE9uSXRlbUNsaWNrTGlzdGVuZXIobnVsbCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fbmF0aXZlVmlldy5faXRlbUNsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVWaWV3Ll9pdGVtQ2xpY2tMaXN0ZW5lci5vd25lciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVWaWV3Ll9pdGVtQ2xpY2tMaXN0ZW5lciA9IG5ldyBDYWxlbmRhck9uSXRlbUNsaWNrTGlzdGVuZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVWaWV3LmV2ZW50c01hbmFnZXIoKS5zZXRPbkl0ZW1DbGlja0xpc3RlbmVyKHRoaXMuX25hdGl2ZVZpZXcuX2l0ZW1DbGlja0xpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNhbGVuZGFyRGlkTmF2aWdhdGVUb0RhdGVcbiAgICAvLyBjYWxlbmRhcldpbGxOYXZpZ2F0ZVRvRGF0ZVxuICAgIHByaXZhdGUgYWRkT25EaXNwbGF5RGF0ZUNoYW5nZWRMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5fZGlzcGxheURhdGVDaGFuZ2VkTGlzdGVuZXIgPSBuZXcgQ2FsZW5kYXJPbkRpc3BsYXlEYXRlQ2hhbmdlZExpc3RlbmVyKHRoaXMpO1xuICAgICAgICB0aGlzLl9uYXRpdmVWaWV3LnNldE9uRGlzcGxheURhdGVDaGFuZ2VkTGlzdGVuZXIodGhpcy5fbmF0aXZlVmlldy5fZGlzcGxheURhdGVDaGFuZ2VkTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIGNhbGVuZGFyRGlkQ2hhbmdlZFZpZXdNb2RlRnJvbVRvXG4gICAgcHJpdmF0ZSBhZGRPbkRpc3BsYXlNb2RlQ2hhbmdlZExpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLl9uYXRpdmVWaWV3Ll9kaXNwbGF5TW9kZUNoYW5nZWRMaXN0ZW5lciA9IG5ldyBDYWxlbmRhck9uRGlzcGxheU1vZGVDaGFuZ2VkTGlzdGVuZXIodGhpcyk7XG4gICAgICAgIHRoaXMuX25hdGl2ZVZpZXcuc2V0T25EaXNwbGF5TW9kZUNoYW5nZWRMaXN0ZW5lcih0aGlzLl9uYXRpdmVWaWV3Ll9kaXNwbGF5TW9kZUNoYW5nZWRMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcHVibGljIG5vdGlmeVZpZXdNb2RlQ2hhbmdlZChvbGRNb2RlLCBuZXdNb2RlKSB7XG4gICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJWaWV3TW9kZUNoYW5nZWRFdmVudERhdGEgPSB7XG4gICAgICAgICAgICBldmVudE5hbWU6IGNvbW1vbk1vZHVsZS5SYWRDYWxlbmRhci52aWV3TW9kZUNoYW5nZWRFdmVudCxcbiAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgIG9sZFZhbHVlOiBvbGRNb2RlLFxuICAgICAgICAgICAgbmV3VmFsdWU6IG5ld01vZGVcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm5vdGlmeShhcmdzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldERheVZpZXdFdmVudFNlbGVjdGVkTGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuX25hdGl2ZVZpZXcuX2V2ZW50Vmlld1RhcExpc3RlbmVyID0gbmV3IENhbGVuZGFyRXZlbnRWaWV3VGFwTGlzdGVuZXIodGhpcyk7XG4gICAgICAgIHRoaXMuX25hdGl2ZVZpZXcuZ2V0RGF5VmlldygpLnNldEV2ZW50Vmlld1RhcExpc3RlbmVyKHRoaXMuX25hdGl2ZVZpZXcuX2V2ZW50Vmlld1RhcExpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBjYWxlbmRhckRpZERlc2VsZWN0ZWREYXRlXG4gICAgLy8gY2FsZW5kYXJEaWRTZWxlY3REYXRlXG4gICAgLy8gY2FsZW5kYXJTaG91bGRTZWxlY3REYXRlXG4gICAgcHJpdmF0ZSBhZGRPblNlbGVjdGVkRGF0ZXNDaGFuZ2VkTGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuX25hdGl2ZVZpZXcuX29uU2VsZWN0ZWREYXRlc0NoYW5nZWRMaXN0ZW5lciA9IG5ldyBDYWxlbmRhck9uU2VsZWN0ZWREYXRlc0NoYW5nZWRMaXN0ZW5lcih0aGlzKTtcbiAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5zZXRPblNlbGVjdGVkRGF0ZXNDaGFuZ2VkTGlzdGVuZXIodGhpcy5fbmF0aXZlVmlldy5fb25TZWxlY3RlZERhdGVzQ2hhbmdlZExpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbm90aWZ5U2luZ2xlRGF0ZVNlbGVjdGVkKGNhbGVuZGFyOiBSYWRDYWxlbmRhciwgZGF0ZTogRGF0ZSkge1xuICAgICAgICB0aGlzLl9mb3JiaWROYXRpdmVTZWxlY3Rpb24gPSB0cnVlO1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWREYXRlIHx8IHRoaXMuc2VsZWN0ZWREYXRlLmdldFRpbWUoKSAhPT0gZGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYWxlbmRhci5zZWxlY3Rpb25Nb2RlID09PSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJTZWxlY3Rpb25Nb2RlLk11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRTZWxlY3RlZERhdGUoZGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9mb3JiaWROYXRpdmVTZWxlY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgbGV0IHNlbGVjdGVkQXJnczogY29tbW9uTW9kdWxlLkNhbGVuZGFyU2VsZWN0aW9uRXZlbnREYXRhID0ge1xuICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkQ2FsZW5kYXIuZGF0ZVNlbGVjdGVkRXZlbnQsXG4gICAgICAgICAgICBvYmplY3Q6IGNhbGVuZGFyLFxuICAgICAgICAgICAgZGF0ZTogZGF0ZVxuICAgICAgICB9O1xuXG4gICAgICAgIGNhbGVuZGFyLm5vdGlmeShzZWxlY3RlZEFyZ3MpO1xuICAgIH1cblxuICAgIHB1YmxpYyBub3RpZnlEYXRlRGVzZWxlY3RlZChjYWxlbmRhcjogUmFkQ2FsZW5kYXIsIGRhdGU6IERhdGUpIHtcbiAgICAgICAgdGhpcy5fZm9yYmlkTmF0aXZlU2VsZWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgaWYgKGNhbGVuZGFyLnNlbGVjdGlvbk1vZGUgPT09IGNvbW1vbk1vZHVsZS5DYWxlbmRhclNlbGVjdGlvbk1vZGUuTXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVNlbGVjdGVkRGF0ZShkYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2ZvcmJpZE5hdGl2ZVNlbGVjdGlvbiA9IGZhbHNlO1xuICAgICAgICBsZXQgc2VsZWN0ZWRBcmdzOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJTZWxlY3Rpb25FdmVudERhdGEgPSB7XG4gICAgICAgICAgICBldmVudE5hbWU6IGNvbW1vbk1vZHVsZS5SYWRDYWxlbmRhci5kYXRlRGVzZWxlY3RlZEV2ZW50LFxuICAgICAgICAgICAgb2JqZWN0OiBjYWxlbmRhcixcbiAgICAgICAgICAgIGRhdGU6IGRhdGVcbiAgICAgICAgfTtcblxuICAgICAgICBjYWxlbmRhci5ub3RpZnkoc2VsZWN0ZWRBcmdzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbm90aWZ5UmFuZ2VTZWxlY3Rpb25DaGFuZ2VkKGNhbGVuZGFyOiBSYWRDYWxlbmRhciwgZmlyc3RTZWxlY3RlZDogRGF0ZSwgbGFzdFNlbGVjdGVkOiBEYXRlKSB7XG4gICAgICAgIHRoaXMuX2ZvcmJpZE5hdGl2ZVNlbGVjdGlvbiA9IHRydWU7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkRGF0ZSB8fCB0aGlzLnNlbGVjdGVkRGF0ZS5nZXRUaW1lKCkgIT09IGxhc3RTZWxlY3RlZC5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gbGFzdFNlbGVjdGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlIHx8XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlLmVuZERhdGUuZ2V0VGltZSgpICE9PSBsYXN0U2VsZWN0ZWQuZ2V0VGltZSgpIHx8XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlLnN0YXJ0RGF0ZS5nZXRUaW1lKCkgIT09IGZpcnN0U2VsZWN0ZWQuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlID0gbmV3IGNvbW1vbk1vZHVsZS5EYXRlUmFuZ2UoZmlyc3RTZWxlY3RlZCwgbGFzdFNlbGVjdGVkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9mb3JiaWROYXRpdmVTZWxlY3Rpb24gPSBmYWxzZTtcblxuICAgICAgICBsZXQgbGFzdFNlbGVjdGVkQXJnczogY29tbW9uTW9kdWxlLkNhbGVuZGFyU2VsZWN0aW9uRXZlbnREYXRhID0ge1xuICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkQ2FsZW5kYXIuZGF0ZVNlbGVjdGVkRXZlbnQsXG4gICAgICAgICAgICBvYmplY3Q6IGNhbGVuZGFyLFxuICAgICAgICAgICAgZGF0ZTogbGFzdFNlbGVjdGVkXG4gICAgICAgIH07XG5cbiAgICAgICAgY2FsZW5kYXIubm90aWZ5KGxhc3RTZWxlY3RlZEFyZ3MpO1xuICAgIH1cblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBOT1RFOiBTaW5jZSBjYWxlbmRhciBpcyBub3QgY3JlYXRlZCBkdXJpbmcgeG1sIHBhcnNpbmcsIHdlIGhhdmUgc2V0dGVycyBmb3IgcHJvcGVydGllcyBhbmQgY2FsbCB0aGVtIGZyb20gY3JlYXRlVUkgJiBwcm9wZXJ0eSBjaGFuZ2VkIGhhbmRsZXJzLlxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBOYXRpdmUgc2V0dGVycyAtIGl0J3MgYXNzdW1lZCB0aGF0IHRoaXMuYW5kcm9pZCBpcyBpbml0aWFsaXplZCwgc28gY2FsbCB0aGVzZSBtZXRob2RzIGFmdGVyIGNyZWF0ZVVJIGlzIGFscmVhZHkgY2FsbGVkXG4gICAgcHJpdmF0ZSBzZXROYXRpdmVWaWV3TW9kZShtb2RlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJWaWV3TW9kZSkge1xuICAgICAgICBpZiAobW9kZSkge1xuXG4gICAgICAgICAgICBsZXQgYlNldFllYXJNb2RlID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgbmF0aXZlTW9kZTogY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyRGlzcGxheU1vZGUgPSBudWxsO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclZpZXdNb2RlLk1vbnRoOlxuICAgICAgICAgICAgICAgICAgICBuYXRpdmVNb2RlID0gY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyRGlzcGxheU1vZGUuTW9udGg7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuTW9udGhOYW1lczpcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlTW9kZSA9IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckRpc3BsYXlNb2RlLlllYXI7XG4gICAgICAgICAgICAgICAgICAgIGJTZXRZZWFyTW9kZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuV2VlazpcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlTW9kZSA9IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckRpc3BsYXlNb2RlLldlZWs7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuWWVhcjpcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlTW9kZSA9IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckRpc3BsYXlNb2RlLlllYXI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuRGF5OlxuICAgICAgICAgICAgICAgICAgICBuYXRpdmVNb2RlID0gY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyRGlzcGxheU1vZGUuRGF5O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAvLyBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclZpZXdNb2RlLkZsb3cudG9Mb3dlckNhc2UoKTpcbiAgICAgICAgICAgICAgICAvLyAgICAgbmF0aXZlTW9kZSA9IFRLQ2FsZW5kYXJWaWV3TW9kZS5US0NhbGVuZGFyVmlld01vZGVGbG93O1xuICAgICAgICAgICAgICAgIC8vICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAvLyBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclZpZXdNb2RlLlllYXJOdW1iZXJzLnRvTG93ZXJDYXNlKCk6XG4gICAgICAgICAgICAgICAgLy8gXHRuYXRpdmVNb2RlID0gVEtDYWxlbmRhclZpZXdNb2RlLlRLQ2FsZW5kYXJWaWV3TW9kZVllYXJOdW1iZXJzO1xuICAgICAgICAgICAgICAgIC8vIFx0YnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZXZlbnRzTWFuYWdlciA9IHRoaXMuX2FuZHJvaWQuZXZlbnRzTWFuYWdlcigpO1xuICAgICAgICAgICAgaWYgKGV2ZW50c01hbmFnZXIpIHtcbiAgICAgICAgICAgICAgICBldmVudHNNYW5hZ2VyLmNsb3NlRXZlbnRzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmF0aXZlTW9kZSA9PT0gY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyRGlzcGxheU1vZGUuWWVhcikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hbmRyb2lkLmlzWWVhck1vZGVDb21wYWN0KCkgIT09IGJTZXRZZWFyTW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fYW5kcm9pZC5nZXREaXNwbGF5TW9kZSgpID09PSBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJEaXNwbGF5TW9kZS5ZZWFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgTlMgY2FsZW5kYXIgdmlldyBtb2RlcyBZZWFyIGFuZCBNb250aE5hbWUgYXJlIGJvdGggcmVwcmVzZW50ZWQgYnkgQ2FsZW5kYXJEaXNwbGF5TW9kZS5ZZWFyIGluIGFuZHJvaWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUbyBhY2hpZXZlIHRoZSBkaWZmZXJlbmNlIGFub3RoZXIgcHJvcGVydHkgKGlzWWVhck1vZGVDb21wYWN0KSBpcyB1c2VkIHdoaWNoIGhhcyBubyBsaXN0ZW5lci5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgd2h5IHdlIG5vdGlmeSBmb3IgdGhlIE5TIGV2ZW50IGF0IHRoaXMgcG9pbnQuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYlNldFllYXJNb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlWaWV3TW9kZUNoYW5nZWQoY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuWWVhciwgY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuTW9udGhOYW1lcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5Vmlld01vZGVDaGFuZ2VkKGNvbW1vbk1vZHVsZS5DYWxlbmRhclZpZXdNb2RlLk1vbnRoTmFtZXMsIGNvbW1vbk1vZHVsZS5DYWxlbmRhclZpZXdNb2RlLlllYXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuZHJvaWQuc2V0WWVhck1vZGVDb21wYWN0KGJTZXRZZWFyTW9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9hbmRyb2lkLmNoYW5nZURpc3BsYXlNb2RlKG5hdGl2ZU1vZGUsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0TmF0aXZlU2VsZWN0aW9uTW9kZShtb2RlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJTZWxlY3Rpb25Nb2RlKSB7XG4gICAgICAgIGlmIChtb2RlKSB7XG4gICAgICAgICAgICBsZXQgc2VsTW9kZTogY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyU2VsZWN0aW9uTW9kZSA9IG51bGw7XG4gICAgICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclNlbGVjdGlvbk1vZGUuTm9uZTpcbiAgICAgICAgICAgICAgICAgICAgc2VsTW9kZSA9IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhclNlbGVjdGlvbk1vZGUuTm9uZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJTZWxlY3Rpb25Nb2RlLlNpbmdsZTpcbiAgICAgICAgICAgICAgICAgICAgc2VsTW9kZSA9IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhclNlbGVjdGlvbk1vZGUuU2luZ2xlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclNlbGVjdGlvbk1vZGUuTXVsdGlwbGU6XG4gICAgICAgICAgICAgICAgICAgIHNlbE1vZGUgPSBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJTZWxlY3Rpb25Nb2RlLk11bHRpcGxlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclNlbGVjdGlvbk1vZGUuUmFuZ2U6XG4gICAgICAgICAgICAgICAgICAgIHNlbE1vZGUgPSBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJTZWxlY3Rpb25Nb2RlLlJhbmdlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldBUk5JTkc6IFVuc3VwcG9ydGVkIHNlbGVjdGlvbiBtb2RlIHNldDogXCIgKyBtb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxNb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXRTZWxlY3Rpb25Nb2RlKHNlbE1vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXROYXRpdmVUcmFuc2l0aW9uTW9kZShtb2RlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJUcmFuc2l0aW9uTW9kZSkge1xuICAgICAgICBpZiAobW9kZSkge1xuICAgICAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5zZXRTY3JvbGxNb2RlKFJhZENhbGVuZGFyLmdldEFuZHJvaWRUcmFuc2l0b25Nb2RlRnJvbVRyYW5zaXRpb25Nb2RlKG1vZGUpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0TmF0aXZlRXZlbnRzVmlld01vZGUobW9kZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRXZlbnRzVmlld01vZGUpIHtcbiAgICAgICAgaWYgKG1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZVZpZXcuc2V0RXZlbnRzRGlzcGxheU1vZGUoUmFkQ2FsZW5kYXIuZ2V0QW5kcm9pZEV2ZW50c1ZpZXdNb2RlRnJvbUV2ZW50c1ZpZXdNb2RlKG1vZGUpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0TmF0aXZlTWF4RGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICBsZXQgY2FsZW5kYXIgPSBSYWRDYWxlbmRhci5nZXRDYWxlbmRhckZyb21EYXRlKGRhdGUpO1xuICAgICAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5zZXRNYXhEYXRlKGNhbGVuZGFyLmdldFRpbWVJbk1pbGxpcygpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0TmF0aXZlTWluRGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICBsZXQgY2FsZW5kYXIgPSBSYWRDYWxlbmRhci5nZXRDYWxlbmRhckZyb21EYXRlKGRhdGUpO1xuICAgICAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5zZXRNaW5EYXRlKGNhbGVuZGFyLmdldFRpbWVJbk1pbGxpcygpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0TmF0aXZlRGlzcGxheWVkRGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICBsZXQgY2FsZW5kYXIgPSBSYWRDYWxlbmRhci5nZXRDYWxlbmRhckZyb21EYXRlKGRhdGUpO1xuICAgICAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5zZXREaXNwbGF5RGF0ZShjYWxlbmRhci5nZXRUaW1lSW5NaWxsaXMoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldE5hdGl2ZVNlbGVjdGVkRGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICBsZXQgY2FsZW5kYXIgPSBSYWRDYWxlbmRhci5nZXRDYWxlbmRhckZyb21EYXRlKGRhdGUpO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkRGF0ZXMgPSBuZXcgamF2YS51dGlsLkFycmF5TGlzdDtcbiAgICAgICAgICAgIHNlbGVjdGVkRGF0ZXMuYWRkKG5ldyBqYXZhLmxhbmcuTG9uZyhjYWxlbmRhci5nZXRUaW1lSW5NaWxsaXMoKSkpO1xuICAgICAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5zZXRTZWxlY3RlZERhdGVzKHNlbGVjdGVkRGF0ZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXROYXRpdmVTZWxlY3RlZERhdGVzKGRhdGE6IGFueSkge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgbGV0IG5ld0RhdGVzID0gZGF0YTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKGRhdGEpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgbmV3RGF0ZXMgPSBuZXdEYXRlcy5zcGxpdChcIixcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzZWxlY3RlZERhdGVzID0gbmV3IGphdmEudXRpbC5BcnJheUxpc3QoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGRhdGUgaW4gbmV3RGF0ZXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3RGF0ZSA9IFJhZENhbGVuZGFyLmdldENhbGVuZGFyRnJvbURhdGUobmV3IERhdGUobmV3RGF0ZXNbZGF0ZV0pKTtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGVzLmFkZChuZXcgamF2YS5sYW5nLkxvbmcobmV3RGF0ZS5nZXRUaW1lSW5NaWxsaXMoKSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVWaWV3LnNldFNlbGVjdGVkRGF0ZXMoc2VsZWN0ZWREYXRlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldE5hdGl2ZVNlbGVjdGVkRGF0ZVJhbmdlKGRhdGE6IGFueSkge1xuICAgICAgICBpZiAoZGF0YSAmJiAoZGF0YSBpbnN0YW5jZW9mIGNvbW1vbk1vZHVsZS5EYXRlUmFuZ2UpKSB7XG4gICAgICAgICAgICBsZXQgbmV3RGF0ZVJhbmdlID0gPGNvbW1vbk1vZHVsZS5EYXRlUmFuZ2U+ZGF0YTtcbiAgICAgICAgICAgIGxldCBzdGFydCA9IFJhZENhbGVuZGFyLmdldENhbGVuZGFyRnJvbURhdGUobmV3RGF0ZVJhbmdlLnN0YXJ0RGF0ZSk7XG4gICAgICAgICAgICBsZXQgZW5kID0gUmFkQ2FsZW5kYXIuZ2V0Q2FsZW5kYXJGcm9tRGF0ZShuZXdEYXRlUmFuZ2UuZW5kRGF0ZSk7XG4gICAgICAgICAgICBsZXQgYW5kcm9pZERhdGVSYW5nZSA9IG5ldyBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuRGF0ZVJhbmdlKHN0YXJ0LmdldFRpbWVJbk1pbGxpcygpLCBlbmQuZ2V0VGltZUluTWlsbGlzKCkpO1xuICAgICAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5zZXRTZWxlY3RlZFJhbmdlKGFuZHJvaWREYXRlUmFuZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXROYXRpdmVIb3Jpem9udGFsVHJhbnNpdGlvbihob3Jpem9udGFsVHJhbnNpdGlvbjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9uYXRpdmVWaWV3LnNldEhvcml6b250YWxTY3JvbGwoaG9yaXpvbnRhbFRyYW5zaXRpb24pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXREaXNwbGF5ZWREYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW5kcm9pZC5nZXREaXNwbGF5RGF0ZSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxvY2FsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyLm9uTG9jYWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0TmF0aXZlTG9jYWxlKG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldE5hdGl2ZUxvY2FsZShsb2NhbGU6IHN0cmluZykge1xuICAgICAgICBpZiAobG9jYWxlICYmIHRoaXMuX25hdGl2ZVZpZXcpIHtcbiAgICAgICAgICAgIGxldCBsYW5nQW5kQ291bnRyeSA9IGxvY2FsZS5zcGxpdCgnLScpO1xuICAgICAgICAgICAgaWYgKGxhbmdBbmRDb3VudHJ5Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGxhbmdBbmRDb3VudHJ5LnB1c2gobGFuZ0FuZENvdW50cnlbMF0udG9VcHBlckNhc2UoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGFuZ0FuZENvdW50cnkubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5hdGl2ZUxvY2FsZSA9IG5ldyBqYXZhLnV0aWwuTG9jYWxlKGxhbmdBbmRDb3VudHJ5WzBdLCBsYW5nQW5kQ291bnRyeVsxXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlVmlldy5zZXRMb2NhbGUobmF0aXZlTG9jYWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblZpZXdNb2RlQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJWaWV3TW9kZSkge1xuICAgICAgICBpZiAodGhpcy5fbmF0aXZlVmlldykge1xuICAgICAgICAgICAgdGhpcy5zZXROYXRpdmVWaWV3TW9kZShuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3luY1NlbGVjdGlvblNoYXBlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2VsZWN0aW9uTW9kZUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhclNlbGVjdGlvbk1vZGUsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJTZWxlY3Rpb25Nb2RlKSB7XG4gICAgICAgIGlmICh0aGlzLl9uYXRpdmVWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnNldE5hdGl2ZVNlbGVjdGlvbk1vZGUobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVHJhbnNpdGlvbk1vZGVDaGFuZ2VkKG9sZFZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJUcmFuc2l0aW9uTW9kZSwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhclRyYW5zaXRpb25Nb2RlKSB7XG4gICAgICAgIGlmICh0aGlzLl9uYXRpdmVWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLnNldE5hdGl2ZVRyYW5zaXRpb25Nb2RlKG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkV2ZW50c1ZpZXdNb2RlQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyRXZlbnRzVmlld01vZGUsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJFdmVudHNWaWV3TW9kZSkge1xuICAgICAgICBpZiAodGhpcy5fbmF0aXZlVmlldykge1xuICAgICAgICAgICAgdGhpcy5zZXROYXRpdmVFdmVudHNWaWV3TW9kZShuZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5pdE9uSW5saW5lRXZlbnRzQ2xpY2tlZExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25NYXhEYXRlQ2hhbmdlZChvbGRWYWx1ZTogRGF0ZSwgbmV3VmFsdWU6IERhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX25hdGl2ZVZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0TmF0aXZlTWF4RGF0ZShuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25NaW5EYXRlQ2hhbmdlZChvbGRWYWx1ZTogRGF0ZSwgbmV3VmFsdWU6IERhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX25hdGl2ZVZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0TmF0aXZlTWluRGF0ZShuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EaXNwbGF5ZWREYXRlQ2hhbmdlZChvbGRWYWx1ZTogRGF0ZSwgbmV3VmFsdWU6IERhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX25hdGl2ZVZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0TmF0aXZlRGlzcGxheWVkRGF0ZShuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TZWxlY3RlZERhdGVDaGFuZ2VkKG9sZFZhbHVlOiBEYXRlLCBuZXdWYWx1ZTogRGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5fZm9yYmlkTmF0aXZlU2VsZWN0aW9uIHx8ICF0aGlzLl9uYXRpdmVWaWV3KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldE5hdGl2ZVNlbGVjdGVkRGF0ZShuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2VsZWN0ZWREYXRlc0NoYW5nZWQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5fZm9yYmlkTmF0aXZlU2VsZWN0aW9uIHx8ICF0aGlzLl9uYXRpdmVWaWV3KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldE5hdGl2ZVNlbGVjdGVkRGF0ZXMobmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblNlbGVjdGVkRGF0ZVJhbmdlQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLkRhdGVSYW5nZSwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5EYXRlUmFuZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZvcmJpZE5hdGl2ZVNlbGVjdGlvbiB8fCAhdGhpcy5fbmF0aXZlVmlldykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXROYXRpdmVTZWxlY3RlZERhdGVSYW5nZShuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uSG9yaXpvbnRhbFRyYW5zaXRpb25DaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5fbmF0aXZlVmlldykge1xuICAgICAgICAgICAgdGhpcy5zZXROYXRpdmVIb3Jpem9udGFsVHJhbnNpdGlvbihuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Nb250aFZpZXdTdHlsZUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhck1vbnRoVmlld1N0eWxlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyTW9udGhWaWV3U3R5bGUpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICYmIChuZXdWYWx1ZSBpbnN0YW5jZW9mIENhbGVuZGFyTW9udGhWaWV3U3R5bGUpKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoVmlld1N0eWxlLm93bmVyID0gdGhpcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbldlZWtWaWV3U3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBjb21tb25Nb2R1bGUuQ2FsZW5kYXJXZWVrVmlld1N0eWxlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyV2Vla1ZpZXdTdHlsZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUgJiYgKG5ld1ZhbHVlIGluc3RhbmNlb2YgQ2FsZW5kYXJXZWVrVmlld1N0eWxlKSkge1xuICAgICAgICAgICAgdGhpcy53ZWVrVmlld1N0eWxlLm93bmVyID0gdGhpcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRheVZpZXdTdHlsZUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckRheVZpZXdTdHlsZSwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckRheVZpZXdTdHlsZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUgJiYgKG5ld1ZhbHVlIGluc3RhbmNlb2YgQ2FsZW5kYXJEYXlWaWV3U3R5bGUpKSB7XG4gICAgICAgICAgICB0aGlzLmRheVZpZXdTdHlsZS5vd25lciA9IHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Nb250aE5hbWVzVmlld1N0eWxlQ2hhbmdlZChvbGRWYWx1ZTogQ2FsZW5kYXJNb250aE5hbWVzVmlld1N0eWxlLCBuZXdWYWx1ZTogQ2FsZW5kYXJNb250aE5hbWVzVmlld1N0eWxlKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAmJiAobmV3VmFsdWUgaW5zdGFuY2VvZiBDYWxlbmRhck1vbnRoTmFtZXNWaWV3U3R5bGUpKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoTmFtZXNWaWV3U3R5bGUub3duZXIgPSB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uWWVhclZpZXdTdHlsZUNoYW5nZWQob2xkVmFsdWU6IENhbGVuZGFyWWVhclZpZXdTdHlsZSwgbmV3VmFsdWU6IENhbGVuZGFyWWVhclZpZXdTdHlsZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUgJiYgKG5ld1ZhbHVlIGluc3RhbmNlb2YgQ2FsZW5kYXJZZWFyVmlld1N0eWxlKSkge1xuICAgICAgICAgICAgdGhpcy55ZWFyVmlld1N0eWxlLm93bmVyID0gdGhpcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZWxvYWQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9uYXRpdmVWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVWaWV3LmludmFsaWRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuYXZpZ2F0ZUZvcndhcmQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX25hdGl2ZVZpZXcuc2hpZnREYXRlKHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuYXZpZ2F0ZUJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX25hdGl2ZVZpZXcuc2hpZnREYXRlKGZhbHNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ29Ub0RhdGUoZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9uYXRpdmVWaWV3LnNldERpc3BsYXlEYXRlKGRhdGUuZ2V0VGltZSgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RXZlbnRzRm9yRGF0ZShkYXRlOiBEYXRlKTogQXJyYXk8Q2FsZW5kYXJFdmVudD4ge1xuICAgICAgICBsZXQgbmF0aXZlUmVzdWx0ID0gdGhpcy5fbmF0aXZlVmlldy5nZXRFdmVudEFkYXB0ZXIoKS5nZXRFdmVudHNGb3JEYXRlKGRhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgbGV0IHJlc3VsdDogQXJyYXk8Q2FsZW5kYXJFdmVudD4gPSBuZXcgQXJyYXk8Q2FsZW5kYXJFdmVudD4oKTtcbiAgICAgICAgaWYgKG5hdGl2ZVJlc3VsdCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IG5hdGl2ZVJlc3VsdC5zaXplKCk7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBuYXRpdmVFdmVudDogY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLmV2ZW50cy5FdmVudCA9IDxjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuZXZlbnRzLkV2ZW50Pm5hdGl2ZVJlc3VsdC5nZXQoaSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IENhbGVuZGFyRXZlbnQobmF0aXZlRXZlbnQuZ2V0VGl0bGUoKSwgbmV3IERhdGUobmF0aXZlRXZlbnQuZ2V0U3RhcnREYXRlKCkpLCBuZXcgRGF0ZShuYXRpdmVFdmVudC5nZXRFbmREYXRlKCkpLCBuYXRpdmVFdmVudC5pc0FsbERheSgpLCBuZXcgQ29sb3IobmF0aXZlRXZlbnQuZ2V0RXZlbnRDb2xvcigpKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldENhbGVuZGFyRnJvbURhdGUoZGF0ZTogRGF0ZSk6IGphdmEudXRpbC5DYWxlbmRhciB7XG4gICAgICAgIGxldCBjYWxlbmRhciA9IGphdmEudXRpbC5DYWxlbmRhci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICBjYWxlbmRhci5zZXRUaW1lSW5NaWxsaXMoZGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICByZXR1cm4gY2FsZW5kYXI7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldERhdGVGcm9tQ2FsZW5kYXIoY2FsZW5kYXI6IGphdmEudXRpbC5DYWxlbmRhcik6IERhdGUge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoY2FsZW5kYXIuZ2V0VGltZUluTWlsbGlzKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlcyA9IG5ldyBBcnJheTxEYXRlPigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdE9uSW5saW5lRXZlbnRzQ2xpY2tlZExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5ldmVudHNWaWV3TW9kZSA9PT0gY29tbW9uTW9kdWxlLkNhbGVuZGFyRXZlbnRzVmlld01vZGUuSW5saW5lKSB7XG4gICAgICAgICAgICB0aGlzLmFkZE9uSW5saW5lRXZlbnRzQ2xpY2tlZExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlRXZlbnRTb3VyY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbmF0aXZlVmlldykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZXZlbnRTb3VyY2UpIHtcbiAgICAgICAgICAgIGxldCBsaXN0ID0gbmV3IGphdmEudXRpbC5BcnJheUxpc3QoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ldmVudFNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV2ZW50U291cmNlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZUFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmV2ZW50U291cmNlLmdldEl0ZW0oaSkuYW5kcm9pZDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKDxhbnk+dGhpcy5ldmVudFNvdXJjZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSAoPENhbGVuZGFyRXZlbnQ+dGhpcy5ldmVudFNvdXJjZVtpXSkuYW5kcm9pZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGlzdC5hZGQoaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZXZlbnRBZGFwdGVyID0gdGhpcy5fbmF0aXZlVmlldy5nZXRFdmVudEFkYXB0ZXIoKTtcbiAgICAgICAgICAgIGV2ZW50QWRhcHRlci5zZXRFdmVudHMobGlzdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEFuZHJvaWRWaWV3TW9kZUZyb21WaWV3TW9kZSh2aWV3TW9kZTogY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUpOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJEaXNwbGF5TW9kZSB7XG4gICAgICAgIGxldCByZXN1bHQ6IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckRpc3BsYXlNb2RlID0gbnVsbDtcblxuICAgICAgICBzd2l0Y2ggKHZpZXdNb2RlKSB7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclZpZXdNb2RlLk1vbnRoOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckRpc3BsYXlNb2RlLk1vbnRoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJWaWV3TW9kZS5Nb250aE5hbWVzOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckRpc3BsYXlNb2RlLlllYXI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclZpZXdNb2RlLldlZWs6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyRGlzcGxheU1vZGUuV2VlaztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuWWVhcjpcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJEaXNwbGF5TW9kZS5ZZWFyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJWaWV3TW9kZS5EYXk6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyRGlzcGxheU1vZGUuRGF5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJWaWV3TW9kZS5GbG93LnRvTG9jYWxlTG93ZXJDYXNlKCk6XG4gICAgICAgICAgICAvLyAgICAgLy90aGlzLl9hbmRyb2lkLnNldERpc3BsYXlNb2RlKFwiPz8/Pz9cIik7Ly8gPSBUS0NhbGVuZGFyVmlld01vZGUuVEtDYWxlbmRhclZpZXdNb2RlRmxvdztcbiAgICAgICAgICAgIC8vICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuWWVhck51bWJlcnMudG9Mb2NhbGVMb3dlckNhc2UoKTpcbiAgICAgICAgICAgIC8vIFx0Ly8gdGhpcy5fYW5kcm9pZC52aWV3TW9kZSA9IFRLQ2FsZW5kYXJWaWV3TW9kZS5US0NhbGVuZGFyVmlld01vZGVZZWFyTnVtYmVycztcbiAgICAgICAgICAgIC8vIFx0YnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFZpZXdNb2RlRnJvbUFuZHJvaWRWaWV3TW9kZShjYWxlbmRhcjogUmFkQ2FsZW5kYXIsIHZpZXdNb2RlOiBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJEaXNwbGF5TW9kZSk6IGNvbW1vbk1vZHVsZS5DYWxlbmRhclZpZXdNb2RlIHtcbiAgICAgICAgbGV0IHJlc3VsdDogY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGU7XG4gICAgICAgIHN3aXRjaCAodmlld01vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyRGlzcGxheU1vZGUuTW9udGg6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuTW9udGg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5DYWxlbmRhckRpc3BsYXlNb2RlLldlZWs6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuV2VlaztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyRGlzcGxheU1vZGUuRGF5OlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNvbW1vbk1vZHVsZS5DYWxlbmRhclZpZXdNb2RlLkRheTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLkNhbGVuZGFyRGlzcGxheU1vZGUuWWVhcjoge1xuICAgICAgICAgICAgICAgIGlmIChjYWxlbmRhci5fbmF0aXZlVmlldy5pc1llYXJNb2RlQ29tcGFjdCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNvbW1vbk1vZHVsZS5DYWxlbmRhclZpZXdNb2RlLk1vbnRoTmFtZXM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuWWVhcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gPz8gY2FzZSBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJEaXNwbGF5TW9kZS5GbG93OiByZXN1bHQgPSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJWaWV3TW9kZS5GbG93OyBicmVhaztcbiAgICAgICAgLy8gPz8gY2FzZSBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuQ2FsZW5kYXJEaXNwbGF5TW9kZS5ZZWFyTnVtYmVyczogcmVzdWx0ID0gY29tbW9uTW9kdWxlLkNhbGVuZGFyVmlld01vZGUuWWVhck51bWJlcnM7IGJyZWFrO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0QW5kcm9pZFRyYW5zaXRvbk1vZGVGcm9tVHJhbnNpdGlvbk1vZGUodHJhbnNpdGlvbk1vZGU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhclRyYW5zaXRpb25Nb2RlKTogY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLlNjcm9sbE1vZGUge1xuICAgICAgICBsZXQgbmF0aXZlU2Nyb2xsTW9kZSA9IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5TY3JvbGxNb2RlLlN0aWNreTtcbiAgICAgICAgc3dpdGNoICh0cmFuc2l0aW9uTW9kZSkge1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJUcmFuc2l0aW9uTW9kZS5Ob25lOlxuICAgICAgICAgICAgICAgIG5hdGl2ZVNjcm9sbE1vZGUgPSBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuU2Nyb2xsTW9kZS5Ob25lO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJUcmFuc2l0aW9uTW9kZS5TbGlkZTpcbiAgICAgICAgICAgICAgICBuYXRpdmVTY3JvbGxNb2RlID0gY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLlNjcm9sbE1vZGUuU3RpY2t5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJUcmFuc2l0aW9uTW9kZS5TdGFjazpcbiAgICAgICAgICAgICAgICBuYXRpdmVTY3JvbGxNb2RlID0gY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLlNjcm9sbE1vZGUuU3RhY2s7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhclRyYW5zaXRpb25Nb2RlLlBsYWluOlxuICAgICAgICAgICAgICAgIG5hdGl2ZVNjcm9sbE1vZGUgPSBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuU2Nyb2xsTW9kZS5QbGFpbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyVHJhbnNpdGlvbk1vZGUuRnJlZTpcbiAgICAgICAgICAgICAgICBuYXRpdmVTY3JvbGxNb2RlID0gY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLlNjcm9sbE1vZGUuRnJlZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkNhbGVuZGFyVHJhbnNpdGlvbk1vZGUuQ29tYm86XG4gICAgICAgICAgICAgICAgbmF0aXZlU2Nyb2xsTW9kZSA9IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5TY3JvbGxNb2RlLkNvbWJvO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJUcmFuc2l0aW9uTW9kZS5PdmVybGFwOlxuICAgICAgICAgICAgICAgIG5hdGl2ZVNjcm9sbE1vZGUgPSBjb20udGVsZXJpay53aWRnZXQuY2FsZW5kYXIuU2Nyb2xsTW9kZS5PdmVybGFwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldBUk5JTkc6IFVuc3VwcG9ydGVkIHRyYW5zaXRpb24gbW9kZTogXCIgKyB0cmFuc2l0aW9uTW9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmF0aXZlU2Nyb2xsTW9kZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRBbmRyb2lkRXZlbnRzVmlld01vZGVGcm9tRXZlbnRzVmlld01vZGUoZXZlbnRzVmlld01vZGU6IGNvbW1vbk1vZHVsZS5DYWxlbmRhckV2ZW50c1ZpZXdNb2RlKTogY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLmV2ZW50cy5FdmVudHNEaXNwbGF5TW9kZSB7XG4gICAgICAgIGxldCBuYXRpdmVWaWV3TW9kZTogY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLmV2ZW50cy5FdmVudHNEaXNwbGF5TW9kZSA9IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5ldmVudHMuRXZlbnRzRGlzcGxheU1vZGUuTm9ybWFsO1xuICAgICAgICBzd2l0Y2ggKGV2ZW50c1ZpZXdNb2RlKSB7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5DYWxlbmRhckV2ZW50c1ZpZXdNb2RlLklubGluZTpcbiAgICAgICAgICAgICAgICBuYXRpdmVWaWV3TW9kZSA9IGNvbS50ZWxlcmlrLndpZGdldC5jYWxlbmRhci5ldmVudHMuRXZlbnRzRGlzcGxheU1vZGUuSW5saW5lO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuQ2FsZW5kYXJFdmVudHNWaWV3TW9kZS5Qb3BvdmVyOlxuICAgICAgICAgICAgICAgIG5hdGl2ZVZpZXdNb2RlID0gY29tLnRlbGVyaWsud2lkZ2V0LmNhbGVuZGFyLmV2ZW50cy5FdmVudHNEaXNwbGF5TW9kZS5Qb3B1cDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmF0aXZlVmlld01vZGU7XG4gICAgfVxufVxuIl19