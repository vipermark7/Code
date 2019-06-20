Object.defineProperty(exports, "__esModule", { value: true });
var initializersImpl = require("../../initializers/chart-initializers");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var observable_1 = require("tns-core-modules/data/observable");
var weakEvents = require("tns-core-modules/ui/core/weak-event-listener");
var view_1 = require("tns-core-modules/ui/core/view");
var chart_public_enum_1 = require("../../misc/chart-public-enum");
var ChartSeries = /** @class */ (function (_super) {
    __extends(ChartSeries, _super);
    function ChartSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ChartSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.ChartSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
    ChartSeries.prototype.updateOwnerChart = function () {
        if (this.owner) {
            this.owner.updateChart();
        }
    };
    Object.defineProperty(ChartSeries.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "ios", {
        get: function () {
            return undefined;
        },
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    ChartSeries.prototype.onLegendTitlePropertyChanged = function (oldValue, newValue) {
        this.onLegendTitleChanged(oldValue, newValue);
    };
    ChartSeries.prototype.onItemsPropertyChanged = function (oldValue, newValue) {
        this.onItemsChanged(oldValue, newValue);
    };
    ChartSeries.prototype.onValuePropertyPropertyChanged = function (oldValue, newValue) {
        this.onValuePropertyChanged(oldValue, newValue);
    };
    ChartSeries.prototype.onShowLabelsPropertyChanged = function (oldValue, newValue) {
        this.onShowLabelsChanged(oldValue, newValue);
    };
    ChartSeries.prototype.onLabelStylePropertyChanged = function (oldValue, newValue) {
        this.onLabelStyleChanged(oldValue, newValue);
    };
    ChartSeries.prototype.onSelectionModePropertyChanged = function (oldValue, newValue) {
        this.onSelectionModeChanged(oldValue, newValue);
    };
    ChartSeries.prototype.onSelectionModeChanged = function (oldValue, newValue) {
        this.initializer.onSelectionModeChanged(oldValue, newValue, this);
    };
    ChartSeries.prototype.onLabelStyleChanged = function (oldValue, newValue) {
        this.initializer.onLabelStyleChanged(oldValue, newValue, this);
    };
    ChartSeries.prototype.onShowLabelsChanged = function (oldValue, newValue) {
        this.initializer.onShowLabelsChanged(oldValue, newValue, this);
    };
    ChartSeries.prototype.onLegendTitleChanged = function (oldValue, newValue) {
    };
    ChartSeries.prototype.onItemsChanged = function (oldValue, newValue) {
        this.initializer.onItemsChanged(oldValue, newValue, this);
        if (oldValue instanceof observable_1.Observable) {
            weakEvents.removeWeakEventListener(oldValue, observable_array_1.ObservableArray.changeEvent, this.ItemsCollectionChangedInternal, this);
        }
        if (newValue instanceof observable_1.Observable) {
            weakEvents.addWeakEventListener(newValue, observable_array_1.ObservableArray.changeEvent, this.ItemsCollectionChangedInternal, this);
        }
    };
    ChartSeries.prototype.ItemsCollectionChangedInternal = function (data) {
        this.initializer.onItemsChanged(null, null, this);
    };
    ChartSeries.prototype.getItemAtIndex = function (index) {
        if (this.items.getItem) {
            return this.items.getItem(index);
        }
        return this.items[index];
    };
    ChartSeries.prototype.onValuePropertyChanged = function (oldValue, newValue) {
        this.initializer.onValuePropertyChanged(oldValue, newValue, this);
    };
    ChartSeries.selectionModeProperty = new view_1.Property({
        name: "selectionMode",
        defaultValue: chart_public_enum_1.ChartSeriesSelectionMode.NotSet,
        valueConverter: function (value) { return chart_public_enum_1.ChartSeriesSelectionMode[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onSelectionModePropertyChanged(oldValue, newValue);
        },
    });
    ChartSeries.labelStyleProperty = new view_1.Property({
        name: "labelStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onLabelStylePropertyChanged(oldValue, newValue);
        },
    });
    ChartSeries.showLabelsProperty = new view_1.Property({
        name: "showLabels",
        defaultValue: false,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onShowLabelsPropertyChanged(oldValue, newValue);
        },
    });
    ChartSeries.legendTitleProperty = new view_1.Property({
        name: "legendTitle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onLegendTitlePropertyChanged(oldValue, newValue);
        },
    });
    ChartSeries.valuePropertyProperty = new view_1.Property({
        name: "valueProperty",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onValuePropertyPropertyChanged(oldValue, newValue);
        },
    });
    ChartSeries.itemsProperty = new view_1.Property({
        name: "items",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemsPropertyChanged(oldValue, newValue);
        },
    });
    return ChartSeries;
}(view_1.ViewBase));
exports.ChartSeries = ChartSeries;
ChartSeries.selectionModeProperty.register(ChartSeries);
ChartSeries.labelStyleProperty.register(ChartSeries);
ChartSeries.showLabelsProperty.register(ChartSeries);
ChartSeries.legendTitleProperty.register(ChartSeries);
ChartSeries.valuePropertyProperty.register(ChartSeries);
ChartSeries.itemsProperty.register(ChartSeries);
var CartesianSeries = /** @class */ (function (_super) {
    __extends(CartesianSeries, _super);
    function CartesianSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CartesianSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.CartesianSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    CartesianSeries.prototype.onHorizontalAxisPropertyChanged = function (oldValue, newValue) {
        this.onHorizontalAxisChanged(oldValue, newValue);
    };
    CartesianSeries.prototype.onVerticalAxisPropertyChanged = function (oldValue, newValue) {
        this.onVerticalAxisChanged(oldValue, newValue);
    };
    CartesianSeries.prototype.onHorizontalAxisChanged = function (oldValue, newValue) {
        this.updateAxisBindingContext(oldValue, newValue);
        this.initializer.onHorizontalAxisChanged(oldValue, newValue, this);
    };
    CartesianSeries.prototype.onVerticalAxisChanged = function (oldValue, newValue) {
        this.updateAxisBindingContext(oldValue, newValue);
        this.initializer.onVerticalAxisChanged(oldValue, newValue, this);
    };
    CartesianSeries.prototype.onPaletteModeChanged = function (oldValue, newValue) {
        this.initializer.onPaletteModeChanged(oldValue, newValue, this);
    };
    CartesianSeries.prototype.updateAxisBindingContext = function (oldValue, newValue) {
        if (newValue) {
            newValue.bindingContext = this.bindingContext;
        }
        else {
            if (oldValue) {
                oldValue.bindingContext = null;
            }
        }
    };
    CartesianSeries.horizontalAxisProperty = new view_1.Property({
        name: "horizontalAxis",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onHorizontalAxisPropertyChanged(oldValue, newValue);
        },
    });
    CartesianSeries.verticalAxisProperty = new view_1.Property({
        name: "verticalAxis",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onVerticalAxisPropertyChanged(oldValue, newValue);
        },
    });
    CartesianSeries.paletteModeProperty = new view_1.Property({
        name: 'paletteMode',
        defaultValue: undefined,
        valueConverter: function (value) { return chart_public_enum_1.ChartSeriesPaletteMode[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onPaletteModeChanged(oldValue, newValue);
        }
    });
    return CartesianSeries;
}(ChartSeries));
exports.CartesianSeries = CartesianSeries;
CartesianSeries.horizontalAxisProperty.register(CartesianSeries);
CartesianSeries.verticalAxisProperty.register(CartesianSeries);
CartesianSeries.paletteModeProperty.register(CartesianSeries);
var CategoricalSeries = /** @class */ (function (_super) {
    __extends(CategoricalSeries, _super);
    function CategoricalSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoricalSeries.prototype.onStackModePropertyChanged = function (oldValue, newValue) {
        this.onStackModeChanged(oldValue, newValue);
    };
    CategoricalSeries.prototype.onCategoryPropertyChanged = function (oldValue, newValue) {
        this.onCategoryChanged(oldValue, newValue);
    };
    Object.defineProperty(CategoricalSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.CategoricalSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    CategoricalSeries.prototype.onStackModeChanged = function (oldValue, newValue) {
        this.initializer.onStackModePropertyChanged(oldValue, newValue, this);
    };
    CategoricalSeries.prototype.onCategoryChanged = function (oldValue, newValue) {
        this.initializer.onCategoryPropertyChanged(oldValue, newValue, this);
    };
    CategoricalSeries.categoryPropertyProperty = new view_1.Property({
        name: "categoryProperty",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onCategoryPropertyChanged(oldValue, newValue);
        },
    });
    CategoricalSeries.stackModeProperty = new view_1.Property({
        name: "stackMode",
        defaultValue: chart_public_enum_1.ChartSeriesStackMode.None,
        valueConverter: function (value) { return chart_public_enum_1.ChartSeriesStackMode[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onStackModePropertyChanged(oldValue, newValue);
        },
    });
    return CategoricalSeries;
}(CartesianSeries));
exports.CategoricalSeries = CategoricalSeries;
CategoricalSeries.categoryPropertyProperty.register(CategoricalSeries);
CategoricalSeries.stackModeProperty.register(CategoricalSeries);
var BarSeries = /** @class */ (function (_super) {
    __extends(BarSeries, _super);
    function BarSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BarSeries.prototype.onMinBarSizeChanged = function (oldValue, newValue) {
        this.initializer.onMinBarSizeChanged(oldValue, newValue, this);
    };
    BarSeries.prototype.onMaxBarSizeChanged = function (oldValue, newValue) {
        this.initializer.onMaxBarSizeChanged(oldValue, newValue, this);
    };
    Object.defineProperty(BarSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.BarSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    BarSeries.minBarSizeProperty = new view_1.Property({
        name: 'minBarSize',
        defaultValue: 0,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onMinBarSizeChanged(oldValue, newValue);
        }
    });
    BarSeries.maxBarSizeProperty = new view_1.Property({
        name: 'maxBarSize',
        defaultValue: 0,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onMaxBarSizeChanged(oldValue, newValue);
        }
    });
    return BarSeries;
}(CategoricalSeries));
exports.BarSeries = BarSeries;
BarSeries.minBarSizeProperty.register(BarSeries);
BarSeries.maxBarSizeProperty.register(BarSeries);
var RangeBarSeries = /** @class */ (function (_super) {
    __extends(RangeBarSeries, _super);
    function RangeBarSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeBarSeries.prototype.onHighPropertyNamePropertyChanged = function (oldValue, newValue) {
        this.onHighPropertyNameChanged(oldValue, newValue);
    };
    RangeBarSeries.prototype.onLowPropertyNamePropertyChanged = function (oldValue, newValue) {
        this.onLowPropertyNameChanged(oldValue, newValue);
    };
    RangeBarSeries.prototype.onLowPropertyNameChanged = function (oldValue, newValue) {
    };
    RangeBarSeries.prototype.onHighPropertyNameChanged = function (oldValue, newValue) {
    };
    RangeBarSeries.highPropertyNameProperty = new view_1.Property({
        name: "highPropertyName",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onHighPropertyNamePropertyChanged(oldValue, newValue);
        },
    });
    RangeBarSeries.lowPropertyNameProperty = new view_1.Property({
        name: "lowPropertyName",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onLowPropertyNamePropertyChanged(oldValue, newValue);
        },
    });
    return RangeBarSeries;
}(CategoricalSeries));
exports.RangeBarSeries = RangeBarSeries;
RangeBarSeries.highPropertyNameProperty.register(RangeBarSeries);
RangeBarSeries.lowPropertyNameProperty.register(RangeBarSeries);
var OhlcSeries = /** @class */ (function (_super) {
    __extends(OhlcSeries, _super);
    function OhlcSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OhlcSeries.prototype.onOpenPropertyNamePropertyChanged = function (oldValue, newValue) {
        this.onOpenPropertyNameChanged(oldValue, newValue);
    };
    OhlcSeries.prototype.onClosePropertyNamePropertyChanged = function (oldValue, newValue) {
        this.onClosePropertyNameChanged(oldValue, newValue);
    };
    OhlcSeries.prototype.onHighPropertyNamePropertyChanged = function (oldValue, newValue) {
        this.onHighPropertyNameChanged(oldValue, newValue);
    };
    OhlcSeries.prototype.onLowPropertyNamePropertyChanged = function (oldValue, newValue) {
        this.onLowPropertyNameChanged(oldValue, newValue);
    };
    OhlcSeries.prototype.onLowPropertyNameChanged = function (oldValue, newValue) {
    };
    OhlcSeries.prototype.onHighPropertyNameChanged = function (oldValue, newValue) {
    };
    OhlcSeries.prototype.onClosePropertyNameChanged = function (oldValue, newValue) {
    };
    OhlcSeries.prototype.onOpenPropertyNameChanged = function (oldValue, newValue) {
    };
    OhlcSeries.openPropertyNameProperty = new view_1.Property({
        name: "openPropertyName",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onOpenPropertyNamePropertyChanged(oldValue, newValue);
        },
    });
    OhlcSeries.closePropertyNameProperty = new view_1.Property({
        name: "closePropertyName",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onClosePropertyNamePropertyChanged(oldValue, newValue);
        },
    });
    OhlcSeries.highPropertyNameProperty = new view_1.Property({
        name: "highPropertyName",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onHighPropertyNamePropertyChanged(oldValue, newValue);
        },
    });
    OhlcSeries.lowPropertyNameProperty = new view_1.Property({
        name: "lowPropertyName",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onLowPropertyNamePropertyChanged(oldValue, newValue);
        },
    });
    return OhlcSeries;
}(CategoricalSeries));
exports.OhlcSeries = OhlcSeries;
OhlcSeries.openPropertyNameProperty.register(OhlcSeries);
OhlcSeries.closePropertyNameProperty.register(OhlcSeries);
OhlcSeries.highPropertyNameProperty.register(OhlcSeries);
OhlcSeries.lowPropertyNameProperty.register(OhlcSeries);
var CandleStickSeries = /** @class */ (function (_super) {
    __extends(CandleStickSeries, _super);
    function CandleStickSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CandleStickSeries;
}(OhlcSeries));
exports.CandleStickSeries = CandleStickSeries;
var BubbleSeries = /** @class */ (function (_super) {
    __extends(BubbleSeries, _super);
    function BubbleSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BubbleSeries.prototype.onBubbleScalePropertyChanged = function (oldValue, newValue) {
        this.onBubbleScaleChanged(oldValue, newValue);
    };
    BubbleSeries.prototype.onBubbleScaleChanged = function (oldValue, newValue) {
    };
    BubbleSeries.prototype.onBubbleSizePropertyPropertyChanged = function (oldValue, newValue) {
        this.onBubbleSizePropertyChanged(oldValue, newValue);
    };
    BubbleSeries.prototype.onBubbleSizePropertyChanged = function (oldValue, newValue) {
    };
    BubbleSeries.bubbleScaleProperty = new view_1.Property({
        name: "bubbleScale",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onBubbleScalePropertyChanged(oldValue, newValue);
        },
    });
    BubbleSeries.bubbleSizePropertyProperty = new view_1.Property({
        name: "bubbleSizeProperty",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onBubbleSizePropertyPropertyChanged(oldValue, newValue);
        },
    });
    return BubbleSeries;
}(CategoricalSeries));
exports.BubbleSeries = BubbleSeries;
BubbleSeries.bubbleScaleProperty.register(BubbleSeries);
BubbleSeries.bubbleSizePropertyProperty.register(BubbleSeries);
var PieSeries = /** @class */ (function (_super) {
    __extends(PieSeries, _super);
    function PieSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PieSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.PieSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "ios", {
        get: function () {
            return undefined;
        },
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    PieSeries.prototype.onLegendLabelPropertyChanged = function (oldValue, newValue) {
        this.onLegendLabelChanged(oldValue, newValue);
    };
    PieSeries.prototype.onExpandRadiusPropertyChanged = function (oldValue, newValue) {
        this.onExpandRadiusChanged(oldValue, newValue);
    };
    PieSeries.prototype.onOuterRadiusFactorPropertyChanged = function (oldValue, newValue) {
        this.onOuterRadiusFactorChanged(oldValue, newValue);
    };
    PieSeries.prototype.onStartAnglePropertyChanged = function (oldValue, newValue) {
        this.onStartAngleChanged(oldValue, newValue);
    };
    PieSeries.prototype.onEndAnglePropertyChanged = function (oldValue, newValue) {
        this.onEndAngleChanged(oldValue, newValue);
    };
    PieSeries.prototype.onShowPercentagePropertyChanged = function (oldValue, newValue) {
        this.onShowPercentageChanged(oldValue, newValue);
    };
    PieSeries.prototype.onLegendLabelChanged = function (oldValue, newValue) {
        this.initializer.onLabelPropertyChanged(oldValue, newValue, this);
    };
    PieSeries.prototype.onExpandRadiusChanged = function (oldValue, newValue) {
        this.initializer.onExpandRadiusChanged(oldValue, newValue, this);
    };
    PieSeries.prototype.onOuterRadiusFactorChanged = function (oldValue, newValue) {
        this.initializer.onOuterRadiusFactorChanged(oldValue, newValue, this);
    };
    PieSeries.prototype.onStartAngleChanged = function (oldValue, newValue) {
        this.initializer.onStartAngleChanged(oldValue, newValue, this);
    };
    PieSeries.prototype.onEndAngleChanged = function (oldValue, newValue) {
        this.initializer.onEndAngleChanged(oldValue, newValue, this);
    };
    PieSeries.prototype.onShowPercentageChanged = function (oldValue, newValue) {
        this.initializer.onShowPercentageChanged(oldValue, newValue, this);
    };
    PieSeries.legendLabelProperty = new view_1.Property({
        name: "legendLabel",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onLegendLabelPropertyChanged(oldValue, newValue);
        },
    });
    PieSeries.expandRadiusProperty = new view_1.Property({
        name: "expandRadius",
        defaultValue: undefined,
        valueConverter: function (v) { return parseFloat(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onExpandRadiusPropertyChanged(oldValue, newValue);
        },
    });
    PieSeries.outerRadiusFactorProperty = new view_1.Property({
        name: "outerRadiusFactor",
        defaultValue: undefined,
        valueConverter: function (v) { return parseFloat(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onOuterRadiusFactorPropertyChanged(oldValue, newValue);
        },
    });
    PieSeries.startAngleProperty = new view_1.Property({
        name: "startAngle",
        defaultValue: undefined,
        valueConverter: function (v) { return parseFloat(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onStartAnglePropertyChanged(oldValue, newValue);
        },
    });
    PieSeries.endAngleProperty = new view_1.Property({
        name: "endAngle",
        defaultValue: undefined,
        valueConverter: function (v) { return parseFloat(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onEndAnglePropertyChanged(oldValue, newValue);
        },
    });
    PieSeries.showPercentageProperty = new view_1.Property({
        name: "showPercentage",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onShowPercentagePropertyChanged(oldValue, newValue);
        },
    });
    return PieSeries;
}(ChartSeries));
exports.PieSeries = PieSeries;
PieSeries.legendLabelProperty.register(PieSeries);
PieSeries.expandRadiusProperty.register(PieSeries);
PieSeries.outerRadiusFactorProperty.register(PieSeries);
PieSeries.startAngleProperty.register(PieSeries);
PieSeries.endAngleProperty.register(PieSeries);
PieSeries.showPercentageProperty.register(PieSeries);
var DonutSeries = /** @class */ (function (_super) {
    __extends(DonutSeries, _super);
    function DonutSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DonutSeries.prototype.onInnerRadiusFactorPropertyChanged = function (oldValue, newValue) {
        this.onInnerRadiusFactorChanged(oldValue, newValue);
    };
    Object.defineProperty(DonutSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.DonutSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    DonutSeries.prototype.onInnerRadiusFactorChanged = function (oldValue, newValue) {
        this.initializer.onInnerRadiusFactorChanged(oldValue, newValue, this);
    };
    DonutSeries.innerRadiusFactorProperty = new view_1.Property({
        name: "innerRadiusFactor",
        defaultValue: undefined,
        valueConverter: function (v) { return parseFloat(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onInnerRadiusFactorPropertyChanged(oldValue, newValue);
        },
    });
    return DonutSeries;
}(PieSeries));
exports.DonutSeries = DonutSeries;
DonutSeries.innerRadiusFactorProperty.register(DonutSeries);
var ScatterSeries = /** @class */ (function (_super) {
    __extends(ScatterSeries, _super);
    function ScatterSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScatterSeries.prototype.onXPropertyPropertyChanged = function (oldValue, newValue) {
        this.onXPropertyChanged(oldValue, newValue);
    };
    ScatterSeries.prototype.onYPropertyPropertyChanged = function (oldValue, newValue) {
        this.onYPropertyChanged(oldValue, newValue);
    };
    ScatterSeries.prototype.onXPropertyChanged = function (oldValue, newValue) {
        this.initializer.onXPropertyChanged(oldValue, newValue, this);
    };
    ScatterSeries.prototype.onYPropertyChanged = function (oldValue, newValue) {
        this.initializer.onYPropertyChanged(oldValue, newValue, this);
    };
    ScatterSeries.prototype.onValuePropertyChanged = function (oldValue, newValue) {
        console.log("WARNING: ValueProperty is not used for Scatter this. Use XProperty & YProperty instead.");
    };
    Object.defineProperty(ScatterSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.ScatterSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    ScatterSeries.xPropertyProperty = new view_1.Property({
        name: "xProperty",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onXPropertyPropertyChanged(oldValue, newValue);
        },
    });
    ScatterSeries.yPropertyProperty = new view_1.Property({
        name: "yProperty",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onYPropertyPropertyChanged(oldValue, newValue);
        },
    });
    return ScatterSeries;
}(CartesianSeries));
exports.ScatterSeries = ScatterSeries;
ScatterSeries.xPropertyProperty.register(ScatterSeries);
ScatterSeries.yPropertyProperty.register(ScatterSeries);
var ScatterBubbleSeries = /** @class */ (function (_super) {
    __extends(ScatterBubbleSeries, _super);
    function ScatterBubbleSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScatterBubbleSeries.prototype.onBubbleScalePropertyChanged = function (oldValue, newValue) {
        this.onBubbleScaleChanged(oldValue, newValue);
    };
    ScatterBubbleSeries.prototype.onBubbleScaleChanged = function (oldValue, newValue) {
        this.initializer.onBubbleScaleChanged(oldValue, newValue, this);
    };
    ScatterBubbleSeries.prototype.onBubbleSizePropertyPropertyChanged = function (oldValue, newValue) {
        this.onBubbleSizePropertyChanged(oldValue, newValue);
    };
    ScatterBubbleSeries.prototype.onBubbleSizePropertyChanged = function (oldValue, newValue) {
        this.initializer.onBubbleSizePropertyChanged(oldValue, newValue, this);
    };
    Object.defineProperty(ScatterBubbleSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.ScatterBubbleSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    ScatterBubbleSeries.bubbleScaleProperty = new view_1.Property({
        name: "bubbleScale",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onBubbleScalePropertyChanged(oldValue, newValue);
        },
    });
    ScatterBubbleSeries.bubbleSizePropertyProperty = new view_1.Property({
        name: "bubbleSizeProperty",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onBubbleSizePropertyPropertyChanged(oldValue, newValue);
        },
    });
    return ScatterBubbleSeries;
}(ScatterSeries));
exports.ScatterBubbleSeries = ScatterBubbleSeries;
ScatterBubbleSeries.bubbleScaleProperty.register(ScatterBubbleSeries);
ScatterBubbleSeries.bubbleSizePropertyProperty.register(ScatterBubbleSeries);
