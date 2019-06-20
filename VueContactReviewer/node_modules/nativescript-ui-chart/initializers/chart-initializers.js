Object.defineProperty(exports, "__esModule", { value: true });
var ChartBaseValueMapper = /** @class */ (function () {
    function ChartBaseValueMapper() {
    }
    ChartBaseValueMapper.prototype.onLegendChanged = function (oldValue, newValue, chart) { };
    ChartBaseValueMapper.prototype.onPalettesChanged = function (data, chart) { };
    ChartBaseValueMapper.prototype.onPalettesPropertyChanged = function (oldValue, newValue, chart) { };
    ChartBaseValueMapper.prototype.onSeriesChanged = function (data, chart) { };
    ChartBaseValueMapper.prototype.onSeriesPropertyChanged = function (oldValue, newValue, chart) { };
    ChartBaseValueMapper.prototype.onAnnotationsChanged = function (data, chart) { };
    ChartBaseValueMapper.prototype.onAnnotationsPropertyChanged = function (oldValue, newValue, chart) { };
    ChartBaseValueMapper.prototype.onSelectionModeChanged = function (oldValue, newValue, chart) { };
    ChartBaseValueMapper.prototype.loadSeries = function (chart) { };
    ChartBaseValueMapper.prototype.loadAnnotations = function (chart) { };
    ChartBaseValueMapper.prototype.reloadPalettes = function (chart) { };
    ChartBaseValueMapper.prototype.updateHorizontalAxisPalette = function (chart) { };
    ChartBaseValueMapper.prototype.updateVerticalAxisPalette = function (chart) { };
    return ChartBaseValueMapper;
}());
exports.ChartBaseValueMapper = ChartBaseValueMapper;
var ChartSeriesValueMapper = /** @class */ (function () {
    function ChartSeriesValueMapper() {
    }
    ChartSeriesValueMapper.prototype.onLegendTitleChanged = function (newValue, series) { };
    ChartSeriesValueMapper.prototype.onItemsChanged = function (oldValue, newValue, series) { };
    ChartSeriesValueMapper.prototype.onValuePropertyChanged = function (oldValue, newValue, series) { };
    ChartSeriesValueMapper.prototype.onShowLabelsChanged = function (oldValue, newValue, series) { };
    ChartSeriesValueMapper.prototype.onLabelStyleChanged = function (oldValue, newValue, series) { };
    ChartSeriesValueMapper.prototype.onSelectionModeChanged = function (oldValue, newValue, series) { };
    ChartSeriesValueMapper.prototype.applyLabelStyle = function (series, chart) { };
    return ChartSeriesValueMapper;
}());
exports.ChartSeriesValueMapper = ChartSeriesValueMapper;
var CartesianSeriesValueMapper = /** @class */ (function (_super) {
    __extends(CartesianSeriesValueMapper, _super);
    function CartesianSeriesValueMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CartesianSeriesValueMapper.prototype.onHorizontalAxisChanged = function (oldValue, newValue, series) { };
    CartesianSeriesValueMapper.prototype.onVerticalAxisChanged = function (oldValue, newValue, series) { };
    CartesianSeriesValueMapper.prototype.onPaletteModeChanged = function (oldValue, newValue, series) { };
    return CartesianSeriesValueMapper;
}(ChartSeriesValueMapper));
exports.CartesianSeriesValueMapper = CartesianSeriesValueMapper;
var SplineSeriesValueMapper = /** @class */ (function (_super) {
    __extends(SplineSeriesValueMapper, _super);
    function SplineSeriesValueMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SplineSeriesValueMapper.prototype.onCategoryPropertyChanged = function (oldValue, newValue, series) { };
    SplineSeriesValueMapper.prototype.onStackModePropertyChanged = function (oldValue, newValue, series) { };
    SplineSeriesValueMapper.prototype.updateNative = function (series) { };
    SplineSeriesValueMapper.prototype.onHorizontalAxisChanged = function (oldValue, newValue, series) { };
    SplineSeriesValueMapper.prototype.onVerticalAxisChanged = function (oldValue, newValue, series) { };
    return SplineSeriesValueMapper;
}(CartesianSeriesValueMapper));
exports.SplineSeriesValueMapper = SplineSeriesValueMapper;
var SplineAreaSeriesValueMapper = /** @class */ (function (_super) {
    __extends(SplineAreaSeriesValueMapper, _super);
    function SplineAreaSeriesValueMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SplineAreaSeriesValueMapper;
}(SplineSeriesValueMapper));
exports.SplineAreaSeriesValueMapper = SplineAreaSeriesValueMapper;
var CategoricalSeriesValueMapper = /** @class */ (function (_super) {
    __extends(CategoricalSeriesValueMapper, _super);
    function CategoricalSeriesValueMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoricalSeriesValueMapper.prototype.onCategoryPropertyChanged = function (oldValue, newValue, series) { };
    CategoricalSeriesValueMapper.prototype.onStackModePropertyChanged = function (oldValue, newValue, series) { };
    CategoricalSeriesValueMapper.prototype.updateNative = function (series) { };
    return CategoricalSeriesValueMapper;
}(CartesianSeriesValueMapper));
exports.CategoricalSeriesValueMapper = CategoricalSeriesValueMapper;
var PieSeriesValueMapper = /** @class */ (function (_super) {
    __extends(PieSeriesValueMapper, _super);
    function PieSeriesValueMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PieSeriesValueMapper.prototype.onLabelPropertyChanged = function (oldValue, newValue, series) { };
    PieSeriesValueMapper.prototype.onExpandRadiusChanged = function (oldValue, newValue, series) { };
    PieSeriesValueMapper.prototype.onOuterRadiusFactorChanged = function (oldValue, newValue, series) { };
    PieSeriesValueMapper.prototype.onStartAngleChanged = function (oldValue, newValue, series) { };
    PieSeriesValueMapper.prototype.onEndAngleChanged = function (oldValue, newValue, series) { };
    PieSeriesValueMapper.prototype.onShowPercentageChanged = function (oldValue, newValue, series) { };
    return PieSeriesValueMapper;
}(ChartSeriesValueMapper));
exports.PieSeriesValueMapper = PieSeriesValueMapper;
var DonutSeriesValueMapper = /** @class */ (function (_super) {
    __extends(DonutSeriesValueMapper, _super);
    function DonutSeriesValueMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DonutSeriesValueMapper.prototype.onInnerRadiusFactorChanged = function (oldValue, newValue, series) { };
    return DonutSeriesValueMapper;
}(PieSeriesValueMapper));
exports.DonutSeriesValueMapper = DonutSeriesValueMapper;
var BarSeriesValueMapper = /** @class */ (function (_super) {
    __extends(BarSeriesValueMapper, _super);
    function BarSeriesValueMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BarSeriesValueMapper.prototype.onMinBarSizeChanged = function (oldValue, newValue, series) { };
    BarSeriesValueMapper.prototype.onMaxBarSizeChanged = function (oldValue, newValue, series) { };
    return BarSeriesValueMapper;
}(CategoricalSeriesValueMapper));
exports.BarSeriesValueMapper = BarSeriesValueMapper;
var RangeBarSeriesValueMapper = /** @class */ (function (_super) {
    __extends(RangeBarSeriesValueMapper, _super);
    function RangeBarSeriesValueMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeBarSeriesValueMapper.prototype.onHighPropertyNameChanged = function (oldValue, newValue, series) { };
    RangeBarSeriesValueMapper.prototype.onLowPropertyNameChanged = function (oldValue, newValue, series) { };
    return RangeBarSeriesValueMapper;
}(CategoricalSeriesValueMapper));
exports.RangeBarSeriesValueMapper = RangeBarSeriesValueMapper;
var LineSeriesValueMapper = /** @class */ (function (_super) {
    __extends(LineSeriesValueMapper, _super);
    function LineSeriesValueMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LineSeriesValueMapper;
}(CategoricalSeriesValueMapper));
exports.LineSeriesValueMapper = LineSeriesValueMapper;
var BubbleSeriesValueMapper = /** @class */ (function (_super) {
    __extends(BubbleSeriesValueMapper, _super);
    function BubbleSeriesValueMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BubbleSeriesValueMapper.prototype.onBubbleSizePropertyChanged = function (oldValue, newValue, series) { };
    BubbleSeriesValueMapper.prototype.onBubbleScalePropertyChanged = function (oldValue, newValue, series) { };
    return BubbleSeriesValueMapper;
}(CategoricalSeriesValueMapper));
exports.BubbleSeriesValueMapper = BubbleSeriesValueMapper;
var CartesianAxisValueMapper = /** @class */ (function () {
    function CartesianAxisValueMapper() {
    }
    CartesianAxisValueMapper.prototype.onLineHiddenChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onLineThicknessChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onLineColorChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onLabelTextColorChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onLabelMarginChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onLabelRotationAngleChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onLabelFitModeChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onLabelLayoutModeChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onLabelFormatChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onHorizontalLocationChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onVerticalLocationChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onLabelSizeChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onAllowZoomChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onAllowPanChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onHiddenChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onTicksHiddenChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onTicksThicknessChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onTicksOffsetChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onTicksLengthChanged = function (oldValue, newValue, axis) { };
    CartesianAxisValueMapper.prototype.onTicksColorChanged = function (oldValue, newValue, axis) { };
    return CartesianAxisValueMapper;
}());
exports.CartesianAxisValueMapper = CartesianAxisValueMapper;
var AreaSeriesValueMapper = /** @class */ (function (_super) {
    __extends(AreaSeriesValueMapper, _super);
    function AreaSeriesValueMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AreaSeriesValueMapper;
}(LineSeriesValueMapper));
exports.AreaSeriesValueMapper = AreaSeriesValueMapper;
var CategoricalAxisValueMapper = /** @class */ (function (_super) {
    __extends(CategoricalAxisValueMapper, _super);
    function CategoricalAxisValueMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoricalAxisValueMapper.prototype.onMajorTickIntervalChanged = function (oldValue, newValue, axis) { };
    CategoricalAxisValueMapper.prototype.onPlotModeChanged = function (oldValue, newValue, axis) { };
    CategoricalAxisValueMapper.prototype.onLastLabelVisibilityChanged = function (oldValue, newValue, axis) { };
    CategoricalAxisValueMapper.prototype.onFirstLabelVisibilityChanged = function (oldValue, newValue, axis) { };
    return CategoricalAxisValueMapper;
}(CartesianAxisValueMapper));
exports.CategoricalAxisValueMapper = CategoricalAxisValueMapper;
var DateTimeAxisValueMapper = /** @class */ (function (_super) {
    __extends(DateTimeAxisValueMapper, _super);
    function DateTimeAxisValueMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateTimeAxisValueMapper.prototype.onDateTimeComponentChanged = function (oldValue, newValue, axis) { };
    DateTimeAxisValueMapper.prototype.onDateFormatChanged = function (oldValue, newValue, axis) { };
    DateTimeAxisValueMapper.prototype.onSourceDateFormatChanged = function (oldValue, newValue, axis) { };
    return DateTimeAxisValueMapper;
}(CategoricalAxisValueMapper));
exports.DateTimeAxisValueMapper = DateTimeAxisValueMapper;
var OhlcSeriesValueMapper = /** @class */ (function (_super) {
    __extends(OhlcSeriesValueMapper, _super);
    function OhlcSeriesValueMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OhlcSeriesValueMapper.prototype.onHighPropertyNameChanged = function (oldValue, newValue, series) { };
    OhlcSeriesValueMapper.prototype.onLowPropertyNameChanged = function (oldValue, newValue, series) { };
    OhlcSeriesValueMapper.prototype.onOpenPropertyNameChanged = function (oldValue, newValue, series) { };
    OhlcSeriesValueMapper.prototype.onClosePropertyNameChanged = function (oldValue, newValue, series) { };
    return OhlcSeriesValueMapper;
}(CategoricalSeriesValueMapper));
exports.OhlcSeriesValueMapper = OhlcSeriesValueMapper;
var CandlestickSeriesValueMapper = /** @class */ (function (_super) {
    __extends(CandlestickSeriesValueMapper, _super);
    function CandlestickSeriesValueMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CandlestickSeriesValueMapper;
}(OhlcSeriesValueMapper));
exports.CandlestickSeriesValueMapper = CandlestickSeriesValueMapper;
var ScatterSeriesValueMapper = /** @class */ (function (_super) {
    __extends(ScatterSeriesValueMapper, _super);
    function ScatterSeriesValueMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScatterSeriesValueMapper.prototype.onXPropertyChanged = function (oldValue, newValue, series) { };
    ScatterSeriesValueMapper.prototype.onYPropertyChanged = function (oldValue, newValue, series) { };
    return ScatterSeriesValueMapper;
}(CartesianSeriesValueMapper));
exports.ScatterSeriesValueMapper = ScatterSeriesValueMapper;
var ScatterBubbleSeriesValueMapper = /** @class */ (function (_super) {
    __extends(ScatterBubbleSeriesValueMapper, _super);
    function ScatterBubbleSeriesValueMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScatterBubbleSeriesValueMapper.prototype.onBubbleSizePropertyChanged = function (oldValue, newValue, series) {
    };
    ScatterBubbleSeriesValueMapper.prototype.onBubbleScaleChanged = function (oldValue, newValue, series) { };
    return ScatterBubbleSeriesValueMapper;
}(ScatterSeriesValueMapper));
exports.ScatterBubbleSeriesValueMapper = ScatterBubbleSeriesValueMapper;
