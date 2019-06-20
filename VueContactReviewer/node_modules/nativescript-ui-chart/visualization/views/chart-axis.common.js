Object.defineProperty(exports, "__esModule", { value: true });
var initializersImpl = require("../../initializers/chart-initializers");
var view_1 = require("tns-core-modules/ui/core/view");
var chart_public_enum_1 = require("../../misc/chart-public-enum");
var color_1 = require("tns-core-modules/color");
/**
* Represents an axis in a Cartesian chart. This class is a base class for all
* axes that can be used within a RadCartesianChart instance.
*/
var CartesianAxis = /** @class */ (function (_super) {
    __extends(CartesianAxis, _super);
    function CartesianAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CartesianAxis.prototype.onLineColorPropertyChanged = function (oldValue, newValue) {
        this.onLineColorChanged(oldValue, newValue);
    };
    /*
    * Called when the lineColor property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLineColorChanged = function (oldValue, newValue) {
        this.initializer.onLineColorChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onLineThicknessPropertyChanged = function (oldValue, newValue) {
        this.onLineThicknessChanged(oldValue, newValue);
    };
    /*
    * Called when the lineThickness property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLineThicknessChanged = function (oldValue, newValue) {
        this.initializer.onLineThicknessChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onLineHiddenPropertyChanged = function (oldValue, newValue) {
        this.onLineHiddenChanged(oldValue, newValue);
    };
    /*
    * Called when the lineHidden property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLineHiddenChanged = function (oldValue, newValue) {
        this.initializer.onLineHiddenChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onLabelTextColorPropertyChanged = function (oldValue, newValue) {
        this.onLabelTextColorChanged(oldValue, newValue);
    };
    /*
    * Called when the labelTextColor property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelTextColorChanged = function (oldValue, newValue) {
        this.initializer.onLabelTextColorChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onLabelSizePropertyChanged = function (oldValue, newValue) {
        this.onLabelSizeChanged(oldValue, newValue);
    };
    /**
    * Called when the labelSize property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelSizeChanged = function (oldValue, newValue) {
        this.initializer.onLabelSizeChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onLabelFormatPropertyChanged = function (oldValue, newValue) {
        this.onLabelFormatChanged(oldValue, newValue);
    };
    /**
    * Called when the labelFormat property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelFormatChanged = function (oldValue, newValue) {
        this.initializer.onLabelFormatChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onLabelMarginPropertyChanged = function (oldValue, newValue) {
        this.onLabelMarginChanged(oldValue, newValue);
    };
    /**
    * Called when the labelMargin property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelMarginChanged = function (oldValue, newValue) {
        this.initializer.onLabelMarginChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onLabelRotationAnglePropertyChanged = function (oldValue, newValue) {
        this.onLabelRotationAngleChanged(oldValue, newValue);
    };
    /**
    * Called when the labelRotationAngle property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelRotationAngleChanged = function (oldValue, newValue) {
        this.initializer.onLabelRotationAngleChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onLabelFitModePropertyChanged = function (oldValue, newValue) {
        this.onLabelFitModeChanged(oldValue, newValue);
    };
    /**
    * Called when the labelFitMode property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelFitModeChanged = function (oldValue, newValue) {
        this.initializer.onLabelFitModeChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onLabelLayoutModePropertyChanged = function (oldValue, newValue) {
        this.onLabelLayoutModeChanged(oldValue, newValue);
    };
    /**
    * Called when the labelLayoutMode property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelLayoutModeChanged = function (oldValue, newValue) {
        this.initializer.onLabelLayoutModeChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onTicksThicknessPropertyChanged = function (oldValue, newValue) {
        this.onTicksThicknessChanged(oldValue, newValue);
    };
    /*
    * Called when the ticksThickness property changes.
    */
    CartesianAxis.prototype.onTicksThicknessChanged = function (oldValue, newValue) {
        this.initializer.onTicksThicknessChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onTicksLengthPropertyChanged = function (oldValue, newValue) {
        this.onTicksLengthChanged(oldValue, newValue);
    };
    /*
    * Called when the ticksLength property changes.
    */
    CartesianAxis.prototype.onTicksLengthChanged = function (oldValue, newValue) {
        this.initializer.onTicksLengthChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onTicksOffsetPropertyChanged = function (oldValue, newValue) {
        this.onTicksOffsetChanged(oldValue, newValue);
    };
    /*
    * Called when the ticksOffset property changes.
    */
    CartesianAxis.prototype.onTicksOffsetChanged = function (oldValue, newValue) {
        this.initializer.onTicksOffsetChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onTicksHiddenPropertyChanged = function (oldValue, newValue) {
        this.onTicksHiddenChanged(oldValue, newValue);
    };
    /*
    * Called when the ticksHidden property changes.
    */
    CartesianAxis.prototype.onTicksHiddenChanged = function (oldValue, newValue) {
        this.initializer.onTicksHiddenChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onTicksColorPropertyChanged = function (oldValue, newValue) {
        this.onTicksColorChanged(oldValue, newValue);
    };
    /*
    * Called when the ticksColor property changes.
    */
    CartesianAxis.prototype.onTicksColorChanged = function (oldValue, newValue) {
        this.initializer.onTicksColorChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onHorizontalLocationPropertyChanged = function (oldValue, newValue) {
        this.onHorizontalLocationChanged(oldValue, newValue);
    };
    /**
    * Called when the horizontalLocation property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onHorizontalLocationChanged = function (oldValue, newValue) {
        this.initializer.onHorizontalLocationChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onVerticalLocationPropertyChanged = function (oldValue, newValue) {
        this.onVerticalLocationChanged(oldValue, newValue);
    };
    /**
    * Called when the verticalLocation property changes.
    */
    CartesianAxis.prototype.onVerticalLocationChanged = function (oldValue, newValue) {
        this.initializer.onVerticalLocationChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onAllowPanPropertyChanged = function (oldValue, newValue) {
        this.onAllowPanChanged(oldValue, newValue);
    };
    /**
    * Called when the allowPan property changes.
    */
    CartesianAxis.prototype.onAllowPanChanged = function (oldValue, newValue) {
        this.initializer.onAllowPanChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onAllowZoomPropertyChanged = function (oldValue, newValue) {
        this.onAllowZoomChanged(oldValue, newValue);
    };
    /**
    * Called when the allowZoom property changes.
    */
    CartesianAxis.prototype.onAllowZoomChanged = function (oldValue, newValue) {
        this.initializer.onAllowZoomChanged(oldValue, newValue, this);
    };
    CartesianAxis.prototype.onHiddenPropertyChanged = function (oldValue, newValue) {
        this.onHiddenChanged(oldValue, newValue);
    };
    /**
    * Called when the hidden property changes.
    */
    CartesianAxis.prototype.onHiddenChanged = function (oldValue, newValue) {
        this.initializer.onHiddenChanged(oldValue, newValue, this);
    };
    Object.defineProperty(CartesianAxis.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.CartesianAxisValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
    CartesianAxis.prototype.update = function () {
        if (!this.owner) {
            return;
        }
        if (this.ios) {
            this.owner.updateChart();
        }
    };
    /*
    * Identifies the lineColor dependency property.
    */
    CartesianAxis.idProperty = new view_1.Property({
        name: "id",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
        },
    });
    /*
    * Identifies the lineColor dependency property.
    */
    CartesianAxis.lineColorProperty = new view_1.Property({
        name: "lineColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onLineColorPropertyChanged(oldValue, newValue);
        },
    });
    /*
    * Identifies the lineThickness dependency property.
    */
    CartesianAxis.lineThicknessProperty = new view_1.Property({
        name: "lineThickness",
        defaultValue: undefined,
        valueConverter: function (v) { return parseInt(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onLineThicknessPropertyChanged(oldValue, newValue);
        },
    });
    /*
    * Identifies the lineHidden dependency property.
    */
    CartesianAxis.lineHiddenProperty = new view_1.Property({
        name: "lineHidden",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onLineHiddenPropertyChanged(oldValue, newValue);
        },
    });
    /*
    * Identifies the labelTextColor dependency property.
    */
    CartesianAxis.labelTextColorProperty = new view_1.Property({
        name: "labelTextColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onLabelTextColorPropertyChanged(oldValue, newValue);
        },
    });
    /**
    * Identifies the labelSize dependency property.
    */
    CartesianAxis.labelSizeProperty = new view_1.Property({
        name: "labelSize",
        defaultValue: undefined,
        valueConverter: parseInt,
        valueChanged: function (target, oldValue, newValue) {
            target.onLabelSizePropertyChanged(oldValue, newValue);
        },
    });
    /**
    * Identifies labelFormat dependency property.
    */
    CartesianAxis.labelFormatProperty = new view_1.Property({
        name: "labelFormat",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onLabelFormatPropertyChanged(oldValue, newValue);
        },
    });
    /**
    * Identifies the labelMargin dependency property.
    */
    CartesianAxis.labelMarginProperty = new view_1.Property({
        name: "labelMargin",
        defaultValue: undefined,
        valueConverter: parseInt,
        valueChanged: function (target, oldValue, newValue) {
            target.onLabelMarginPropertyChanged(oldValue, newValue);
        },
    });
    /**
    * Identifies the labelRotationAngle dependency property.
    */
    CartesianAxis.labelRotationAngleProperty = new view_1.Property({
        name: "labelRotationAngle",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onLabelRotationAnglePropertyChanged(oldValue, newValue);
        },
    });
    /**
    * Identifies the labelFitMode dependency property.
    */
    CartesianAxis.labelFitModeProperty = new view_1.Property({
        name: "labelFitMode",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onLabelFitModePropertyChanged(oldValue, newValue);
        },
    });
    /**
    * Identifies the labelLayoutMode dependency property.
    */
    CartesianAxis.labelLayoutModeProperty = new view_1.Property({
        name: "labelLayoutMode",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onLabelLayoutModePropertyChanged(oldValue, newValue);
        },
    });
    /*
    * Identifies the ticksThickness dependency property.
    */
    CartesianAxis.ticksThicknessProperty = new view_1.Property({
        name: "ticksThickness",
        defaultValue: undefined,
        valueConverter: function (v) { return parseInt(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onTicksThicknessPropertyChanged(oldValue, newValue);
        },
    });
    /*
    * Identifies the ticksLength dependency property.
    */
    CartesianAxis.ticksLengthProperty = new view_1.Property({
        name: "ticksLength",
        defaultValue: undefined,
        valueConverter: function (v) { return parseInt(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onTicksLengthPropertyChanged(oldValue, newValue);
        },
    });
    /*
    * Identifies the ticksOffset dependency property.
    */
    CartesianAxis.ticksOffsetProperty = new view_1.Property({
        name: "ticksOffset",
        defaultValue: undefined,
        valueConverter: function (v) { return parseInt(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onTicksOffsetPropertyChanged(oldValue, newValue);
        },
    });
    /*
    * Identifies the ticksHidden dependency property.
    */
    CartesianAxis.ticksHiddenProperty = new view_1.Property({
        name: "ticksHidden",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onTicksHiddenPropertyChanged(oldValue, newValue);
        },
    });
    /*
    * Identifies the ticksColor dependency property.
    */
    CartesianAxis.ticksColorProperty = new view_1.Property({
        name: "ticksColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onTicksColorPropertyChanged(oldValue, newValue);
        },
    });
    /**
    * Identifies the horizontalLocation dependency property.
    */
    CartesianAxis.horizontalLocationProperty = new view_1.Property({
        name: "horizontalLocation",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onHorizontalLocationPropertyChanged(oldValue, newValue);
        },
    });
    /**
    * Identifies the verticalLocation dependency property.
    */
    CartesianAxis.verticalLocationProperty = new view_1.Property({
        name: "verticalLocation",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onVerticalLocationPropertyChanged(oldValue, newValue);
        },
    });
    /**
    * Identifies the allowPan dependency property.
    */
    CartesianAxis.allowPanProperty = new view_1.Property({
        name: "allowPan",
        defaultValue: false,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onAllowPanPropertyChanged(oldValue, newValue);
        },
    });
    /**
    * Identifies the allowZoom dependency property.
    */
    CartesianAxis.allowZoomProperty = new view_1.Property({
        name: "allowZoom",
        defaultValue: false,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onAllowZoomPropertyChanged(oldValue, newValue);
        },
    });
    /**
    * Identifies the hidden dependency property.
    */
    CartesianAxis.hiddenProperty = new view_1.Property({
        name: "hidden",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onHiddenPropertyChanged(oldValue, newValue);
        },
    });
    return CartesianAxis;
}(view_1.ViewBase));
exports.CartesianAxis = CartesianAxis;
CartesianAxis.idProperty.register(CartesianAxis);
CartesianAxis.lineColorProperty.register(CartesianAxis);
CartesianAxis.lineThicknessProperty.register(CartesianAxis);
CartesianAxis.lineHiddenProperty.register(CartesianAxis);
CartesianAxis.labelTextColorProperty.register(CartesianAxis);
CartesianAxis.labelSizeProperty.register(CartesianAxis);
CartesianAxis.labelFormatProperty.register(CartesianAxis);
CartesianAxis.labelMarginProperty.register(CartesianAxis);
CartesianAxis.labelRotationAngleProperty.register(CartesianAxis);
CartesianAxis.labelFitModeProperty.register(CartesianAxis);
CartesianAxis.labelLayoutModeProperty.register(CartesianAxis);
CartesianAxis.ticksThicknessProperty.register(CartesianAxis);
CartesianAxis.ticksLengthProperty.register(CartesianAxis);
CartesianAxis.ticksOffsetProperty.register(CartesianAxis);
CartesianAxis.ticksHiddenProperty.register(CartesianAxis);
CartesianAxis.ticksColorProperty.register(CartesianAxis);
CartesianAxis.horizontalLocationProperty.register(CartesianAxis);
CartesianAxis.verticalLocationProperty.register(CartesianAxis);
CartesianAxis.allowPanProperty.register(CartesianAxis);
CartesianAxis.allowZoomProperty.register(CartesianAxis);
CartesianAxis.hiddenProperty.register(CartesianAxis);
var CategoricalAxis = /** @class */ (function (_super) {
    __extends(CategoricalAxis, _super);
    function CategoricalAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoricalAxis.prototype.onMajorTickIntervalPropertyChanged = function (oldValue, newValue) {
        this.onMajorTickIntervalChanged(oldValue, newValue);
    };
    CategoricalAxis.prototype.onPlotModePropertyChanged = function (oldValue, newValue) {
        this.onPlotModeChanged(oldValue, newValue);
    };
    CategoricalAxis.prototype.onLastLabelVisibilityPropertyChanged = function (oldValue, newValue) {
        this.onLastLabelVisibilityChanged(oldValue, newValue);
    };
    CategoricalAxis.prototype.onFirstLabelVisibilityPropertyChanged = function (oldValue, newValue) {
        this.onFirstLabelVisibilityChanged(oldValue, newValue);
    };
    Object.defineProperty(CategoricalAxis.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.CategoricalAxisValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    CategoricalAxis.prototype.onMajorTickIntervalChanged = function (oldValue, newValue) {
        this.initializer.onMajorTickIntervalChanged(oldValue, newValue, this);
    };
    CategoricalAxis.prototype.onPlotModeChanged = function (oldValue, newValue) {
        this.initializer.onPlotModeChanged(oldValue, newValue, this);
    };
    CategoricalAxis.prototype.onLastLabelVisibilityChanged = function (oldValue, newValue) {
        this.initializer.onLastLabelVisibilityChanged(oldValue, newValue, this);
    };
    CategoricalAxis.prototype.onFirstLabelVisibilityChanged = function (oldValue, newValue) {
        this.initializer.onFirstLabelVisibilityChanged(oldValue, newValue, this);
    };
    CategoricalAxis.majorTickIntervalProperty = new view_1.Property({
        name: "majorTickInterval",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onMajorTickIntervalPropertyChanged(oldValue, newValue);
        },
    });
    CategoricalAxis.plotModeProperty = new view_1.Property({
        name: "plotMode",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onPlotModePropertyChanged(oldValue, newValue);
        },
    });
    CategoricalAxis.lastLabelVisibilityProperty = new view_1.Property({
        name: "lastLabelVisibility",
        defaultValue: chart_public_enum_1.ChartAxisLabelVisibility.Visible,
        valueConverter: function (value) { return chart_public_enum_1.ChartAxisLabelVisibility[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onLastLabelVisibilityPropertyChanged(oldValue, newValue);
        },
    });
    CategoricalAxis.firstLabelVisibilityProperty = new view_1.Property({
        name: "firstLabelVisibility",
        defaultValue: chart_public_enum_1.ChartAxisLabelVisibility.Visible,
        valueConverter: function (value) { return chart_public_enum_1.ChartAxisLabelVisibility[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onFirstLabelVisibilityPropertyChanged(oldValue, newValue);
        },
    });
    return CategoricalAxis;
}(CartesianAxis));
exports.CategoricalAxis = CategoricalAxis;
CategoricalAxis.majorTickIntervalProperty.register(CategoricalAxis);
CategoricalAxis.plotModeProperty.register(CategoricalAxis);
CategoricalAxis.lastLabelVisibilityProperty.register(CategoricalAxis);
CategoricalAxis.firstLabelVisibilityProperty.register(CategoricalAxis);
var LinearAxis = /** @class */ (function (_super) {
    __extends(LinearAxis, _super);
    function LinearAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LinearAxis.prototype.onMinimumPropertyChanged = function (oldValue, newValue) {
        this.onMinimumChanged(oldValue, newValue);
    };
    LinearAxis.prototype.onMinimumChanged = function (oldValue, newValue) {
    };
    LinearAxis.prototype.onMaximumPropertyChanged = function (oldValue, newValue) {
        this.onMaximumChanged(oldValue, newValue);
    };
    LinearAxis.prototype.onMaximumChanged = function (oldValue, newValue) {
    };
    LinearAxis.prototype.onMajorStepPropertyChanged = function (oldValue, newValue) {
        this.onMajorStepChanged(oldValue, newValue);
    };
    LinearAxis.prototype.onMajorStepChanged = function (oldValue, newValue) {
    };
    LinearAxis.majorStepProperty = new view_1.Property({
        name: "majorStep",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onMajorStepPropertyChanged(oldValue, newValue);
        },
    });
    LinearAxis.minimumProperty = new view_1.Property({
        name: "minimum",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onMinimumPropertyChanged(oldValue, newValue);
        },
    });
    LinearAxis.maximumProperty = new view_1.Property({
        name: "maximum",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onMaximumPropertyChanged(oldValue, newValue);
        },
    });
    return LinearAxis;
}(CartesianAxis));
exports.LinearAxis = LinearAxis;
LinearAxis.majorStepProperty.register(LinearAxis);
LinearAxis.minimumProperty.register(LinearAxis);
LinearAxis.maximumProperty.register(LinearAxis);
var DateTimeContinuousAxis = /** @class */ (function (_super) {
    __extends(DateTimeContinuousAxis, _super);
    function DateTimeContinuousAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateTimeContinuousAxis.prototype.onPlotModePropertyChanged = function (oldValue, newValue) {
        this.onPlotModeChanged(oldValue, newValue);
    };
    DateTimeContinuousAxis.prototype.onDateFormatPropertyChanged = function (oldValue, newValue) {
        this.onDateFormatChanged(oldValue, newValue);
    };
    DateTimeContinuousAxis.prototype.onSourceDateFormatPropertyChanged = function (oldValue, newValue) {
        this.onSourceDateFormatChanged(oldValue, newValue);
    };
    DateTimeContinuousAxis.prototype.onPlotModeChanged = function (oldValue, newValue) {
    };
    DateTimeContinuousAxis.prototype.onDateFormatChanged = function (oldValue, newValue) {
    };
    DateTimeContinuousAxis.prototype.onSourceDateFormatChanged = function (oldValue, newValue) {
    };
    DateTimeContinuousAxis.plotModeProperty = new view_1.Property({
        name: "plotMode",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onPlotModePropertyChanged(oldValue, newValue);
        },
    });
    DateTimeContinuousAxis.dateFormatProperty = new view_1.Property({
        name: "dateFormat",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onDateFormatPropertyChanged(oldValue, newValue);
        },
    });
    DateTimeContinuousAxis.sourceDateFormatProperty = new view_1.Property({
        name: "sourceDateFormat",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onSourceDateFormatPropertyChanged(oldValue, newValue);
        },
    });
    return DateTimeContinuousAxis;
}(LinearAxis));
exports.DateTimeContinuousAxis = DateTimeContinuousAxis;
DateTimeContinuousAxis.plotModeProperty.register(DateTimeContinuousAxis);
DateTimeContinuousAxis.dateFormatProperty.register(DateTimeContinuousAxis);
DateTimeContinuousAxis.sourceDateFormatProperty.register(DateTimeContinuousAxis);
var DateTimeCategoricalAxis = /** @class */ (function (_super) {
    __extends(DateTimeCategoricalAxis, _super);
    function DateTimeCategoricalAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateTimeCategoricalAxis.prototype.onDateTimeComponentPropertyChanged = function (oldValue, newValue) {
        this.onDateTimeComponentChanged(oldValue, newValue);
    };
    DateTimeCategoricalAxis.prototype.onDateFormatPropertyChanged = function (oldValue, newValue) {
        this.onDateFormatChanged(oldValue, newValue);
    };
    DateTimeCategoricalAxis.prototype.onDateTimeComponentChanged = function (oldValue, newValue) {
    };
    DateTimeCategoricalAxis.prototype.onDateFormatChanged = function (oldValue, newValue) {
    };
    Object.defineProperty(DateTimeCategoricalAxis.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeCategoricalAxis.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    DateTimeCategoricalAxis.dateTimeComponentProperty = new view_1.Property({
        name: "dateTimeComponent",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onDateTimeComponentPropertyChanged(oldValue, newValue);
        },
    });
    DateTimeCategoricalAxis.dateFormatProperty = new view_1.Property({
        name: "dateFormat",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onDateFormatPropertyChanged(oldValue, newValue);
        },
    });
    return DateTimeCategoricalAxis;
}(CategoricalAxis));
exports.DateTimeCategoricalAxis = DateTimeCategoricalAxis;
DateTimeCategoricalAxis.dateTimeComponentProperty.register(DateTimeCategoricalAxis);
DateTimeCategoricalAxis.dateFormatProperty.register(DateTimeCategoricalAxis);
var LogarithmicAxis = /** @class */ (function (_super) {
    __extends(LogarithmicAxis, _super);
    function LogarithmicAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogarithmicAxis.prototype.onExponentStepPropertyChanged = function (oldValue, newValue) {
        this.onExponentStepChanged(oldValue, newValue);
    };
    LogarithmicAxis.prototype.onLogarithmBasePropertyChanged = function (oldValue, newValue) {
        this.onLogarithmBaseChanged(oldValue, newValue);
    };
    LogarithmicAxis.prototype.onExponentStepChanged = function (oldValue, newValue) {
    };
    LogarithmicAxis.prototype.onLogarithmBaseChanged = function (oldValue, newValue) {
    };
    Object.defineProperty(LogarithmicAxis.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogarithmicAxis.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    LogarithmicAxis.exponentStepProperty = new view_1.Property({
        name: "exponentStep",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onExponentStepPropertyChanged(oldValue, newValue);
        },
    });
    LogarithmicAxis.logarithmBaseProperty = new view_1.Property({
        name: "logarithmBase",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onLogarithmBasePropertyChanged(oldValue, newValue);
        },
    });
    return LogarithmicAxis;
}(LinearAxis));
exports.LogarithmicAxis = LogarithmicAxis;
LogarithmicAxis.exponentStepProperty.register(LogarithmicAxis);
LogarithmicAxis.logarithmBaseProperty.register(LogarithmicAxis);
