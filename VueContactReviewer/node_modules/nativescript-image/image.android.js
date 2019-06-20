"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./image-common"));
var image_common_1 = require("./image-common");
var utils = require("tns-core-modules/utils/utils");
var types = require("tns-core-modules/utils/types");
var application = require("tns-core-modules/application");
var imageSource = require("tns-core-modules/image-source");
var fs = require("tns-core-modules/file-system");
function initialize(config) {
    if (application.android) {
        if (config && config.isDownsampleEnabled) {
            var imagePipelineConfig = com.facebook.imagepipeline.core.ImagePipelineConfig.newBuilder(application.android.context)
                .setDownsampleEnabled(true)
                .build();
            com.facebook.drawee.backends.pipeline.Fresco.initialize(application.android.context, imagePipelineConfig);
        }
        else {
            com.facebook.drawee.backends.pipeline.Fresco.initialize(application.android.context);
        }
    }
}
exports.initialize = initialize;
function getImagePipeline() {
    if (application.android) {
        var nativePipe = com.facebook.drawee.backends.pipeline.Fresco.getImagePipeline();
        var imagePineLine = new ImagePipeline();
        imagePineLine.android = nativePipe;
        return imagePineLine;
    }
    return null;
}
exports.getImagePipeline = getImagePipeline;
function shutDown() {
    com.facebook.drawee.view.SimpleDraweeView.shutDown();
    com.facebook.drawee.backends.pipeline.Fresco.shutDown();
}
exports.shutDown = shutDown;
function getUri(src) {
    var uri;
    if (utils.isFileOrResourcePath(src)) {
        var res = utils.ad.getApplicationContext().getResources();
        if (!res) {
            return;
        }
        if (src.indexOf(utils.RESOURCE_PREFIX) === 0) {
            var resName = src.substr(utils.RESOURCE_PREFIX.length);
            var identifier = res.getIdentifier(resName, 'drawable', utils.ad.getApplication().getPackageName());
            if (0 < identifier) {
                uri = new android.net.Uri.Builder()
                    .scheme(com.facebook.common.util.UriUtil.LOCAL_RESOURCE_SCHEME)
                    .path(java.lang.String.valueOf(identifier))
                    .build();
            }
        }
        else if (src.indexOf('~/') === 0) {
            uri = android.net.Uri.parse("file:" + fs.path.join(fs.knownFolders.currentApp().path, src.replace('~/', '')));
        }
        else if (src.indexOf('/') === 0) {
            uri = android.net.Uri.parse("file:" + src);
        }
    }
    else {
        uri = android.net.Uri.parse(src);
    }
    return uri;
}
var ImagePipeline = (function () {
    function ImagePipeline() {
    }
    ImagePipeline.prototype.isInDiskCacheSync = function (uri) {
        return this._android.isInDiskCacheSync(android.net.Uri.parse(uri));
    };
    ImagePipeline.prototype.isInBitmapMemoryCache = function (uri) {
        return this._android.isInBitmapMemoryCache(android.net.Uri.parse(uri));
    };
    ImagePipeline.prototype.evictFromMemoryCache = function (uri) {
        this._android.evictFromMemoryCache(android.net.Uri.parse(uri));
    };
    ImagePipeline.prototype.evictFromDiskCache = function (uri) {
        this._android.evictFromDiskCache(android.net.Uri.parse(uri));
    };
    ImagePipeline.prototype.evictFromCache = function (uri) {
        this._android.evictFromCache(android.net.Uri.parse(uri));
    };
    ImagePipeline.prototype.clearCaches = function () {
        this._android.clearCaches();
    };
    ImagePipeline.prototype.clearMemoryCaches = function () {
        this._android.clearMemoryCaches();
    };
    ImagePipeline.prototype.clearDiskCaches = function () {
        this._android.clearDiskCaches();
    };
    Object.defineProperty(ImagePipeline.prototype, "android", {
        get: function () {
            return this._android;
        },
        set: function (value) {
            this._android = value;
        },
        enumerable: true,
        configurable: true
    });
    ImagePipeline.prototype.fetchImage = function () {
    };
    return ImagePipeline;
}());
exports.ImagePipeline = ImagePipeline;
var ImageError = (function () {
    function ImageError(throwable) {
        this._message = throwable.getMessage();
        this._errorType = throwable.getClass().getName();
        this._stringValue = throwable.toString();
    }
    ImageError.prototype.getMessage = function () {
        return this._message;
    };
    ImageError.prototype.getErrorType = function () {
        return this._errorType;
    };
    ImageError.prototype.toString = function () {
        return this._stringValue;
    };
    return ImageError;
}());
exports.ImageError = ImageError;
var ImageInfo = (function () {
    function ImageInfo(imageInfo) {
        this._nativeImageInfo = imageInfo;
    }
    ImageInfo.prototype.getHeight = function () {
        return this._nativeImageInfo.getHeight();
    };
    ImageInfo.prototype.getWidth = function () {
        return this._nativeImageInfo.getWidth();
    };
    ImageInfo.prototype.getQualityInfo = function () {
        return this._nativeImageInfo.getQualityInfo();
    };
    return ImageInfo;
}());
exports.ImageInfo = ImageInfo;
var FinalEventData = (function (_super) {
    __extends(FinalEventData, _super);
    function FinalEventData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FinalEventData.prototype, "imageInfo", {
        get: function () {
            return this._imageInfo;
        },
        set: function (value) {
            this._imageInfo = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FinalEventData.prototype, "animatable", {
        get: function () {
            return this._animatable;
        },
        set: function (value) {
            this._animatable = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FinalEventData.prototype, "android", {
        get: function () {
            return this._animatable;
        },
        enumerable: true,
        configurable: true
    });
    return FinalEventData;
}(image_common_1.EventData));
exports.FinalEventData = FinalEventData;
var IntermediateEventData = (function (_super) {
    __extends(IntermediateEventData, _super);
    function IntermediateEventData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IntermediateEventData.prototype, "imageInfo", {
        get: function () {
            return this._imageInfo;
        },
        set: function (value) {
            this._imageInfo = value;
        },
        enumerable: true,
        configurable: true
    });
    return IntermediateEventData;
}(image_common_1.EventData));
exports.IntermediateEventData = IntermediateEventData;
var FailureEventData = (function (_super) {
    __extends(FailureEventData, _super);
    function FailureEventData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FailureEventData.prototype, "error", {
        get: function () {
            return this._error;
        },
        set: function (value) {
            this._error = value;
        },
        enumerable: true,
        configurable: true
    });
    return FailureEventData;
}(image_common_1.EventData));
exports.FailureEventData = FailureEventData;
var Img = (function (_super) {
    __extends(Img, _super);
    function Img() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isLoading = false;
        return _this;
    }
    Img.prototype.createNativeView = function () {
        return new com.facebook.drawee.view.SimpleDraweeView(this._context);
    };
    Img.prototype.onImageSet = function (imageInfo, animatable) {
        if (!this.aspectRatio) {
            this.nativeViewProtected.setAspectRatio(imageInfo.getWidth() / imageInfo.getHeight());
        }
    };
    Img.prototype.disposeNativeView = function () {
        this.nativeViewProtected.setImageURI(null, null);
    };
    Img.prototype.updateImageUri = function () {
        var imagePipeLine = getImagePipeline();
        var isInCache = imagePipeLine.isInBitmapMemoryCache(this.src);
        if (isInCache) {
            imagePipeLine.evictFromCache(this.src);
            var src = this.src;
            this.src = null;
            this.src = src;
        }
    };
    Img.prototype[image_common_1.ImageBase.srcProperty.setNative] = function () {
        this.initImage();
    };
    Img.prototype[image_common_1.ImageBase.lowerResSrcProperty.setNative] = function () {
        this.initImage();
    };
    Img.prototype[image_common_1.ImageBase.placeholderImageUriProperty.setNative] = function () {
        this.updateHierarchy();
    };
    Img.prototype[image_common_1.ImageBase.failureImageUriProperty.setNative] = function () {
        this.updateHierarchy();
    };
    Img.prototype[image_common_1.ImageBase.stretchProperty.setNative] = function () {
        this.updateHierarchy();
    };
    Img.prototype[image_common_1.ImageBase.fadeDurationProperty.setNative] = function () {
        this.updateHierarchy();
    };
    Img.prototype[image_common_1.ImageBase.backgroundUriProperty.setNative] = function () {
        this.updateHierarchy();
    };
    Img.prototype[image_common_1.ImageBase.showProgressBarProperty.setNative] = function () {
        this.updateHierarchy();
    };
    Img.prototype[image_common_1.ImageBase.progressBarColorProperty.setNative] = function () {
        this.updateHierarchy();
    };
    Img.prototype[image_common_1.ImageBase.roundAsCircleProperty.setNative] = function () {
        this.updateHierarchy();
    };
    Img.prototype[image_common_1.ImageBase.roundTopLeftProperty.setNative] = function () {
        this.updateHierarchy();
    };
    Img.prototype[image_common_1.ImageBase.roundTopRightProperty.setNative] = function () {
        this.updateHierarchy();
    };
    Img.prototype[image_common_1.ImageBase.roundBottomLeftProperty.setNative] = function () {
        this.updateHierarchy();
    };
    Img.prototype[image_common_1.ImageBase.roundBottomRightProperty.setNative] = function () {
        this.updateHierarchy();
    };
    Img.prototype[image_common_1.ImageBase.roundedCornerRadiusProperty.setNative] = function () {
        this.updateHierarchy();
    };
    Img.prototype[image_common_1.ImageBase.blurRadiusProperty.setNative] = function () {
        this.initImage();
    };
    Img.prototype[image_common_1.ImageBase.blurDownSamplingProperty.setNative] = function () {
        this.initImage();
    };
    Img.prototype[image_common_1.ImageBase.aspectRatioProperty.setNative] = function () {
        this.initImage();
    };
    Img.prototype.initImage = function () {
        if (this.nativeViewProtected) {
            if (this.src) {
                this.isLoading = true;
                var uri = getUri(this.src);
                if (!uri) {
                    console.log("Error: 'src' not valid: " + this.src);
                    return;
                }
                var requestBuilder = com.facebook.imagepipeline.request.ImageRequestBuilder.newBuilderWithSource(uri).setRotationOptions(com.facebook.imagepipeline.common.RotationOptions.autoRotate());
                if (this.progressiveRenderingEnabled !== undefined) {
                    requestBuilder = requestBuilder.setProgressiveRenderingEnabled(this.progressiveRenderingEnabled);
                }
                if (this.localThumbnailPreviewsEnabled !== undefined) {
                    requestBuilder = requestBuilder.setLocalThumbnailPreviewsEnabled(this.localThumbnailPreviewsEnabled);
                }
                if (this.decodeWidth && this.decodeHeight) {
                    requestBuilder = requestBuilder.setResizeOptions(new com.facebook.imagepipeline.common.ResizeOptions(this.decodeWidth, this.decodeHeight));
                }
                if (this.blurRadius) {
                    var postProcessor = new jp.wasabeef.fresco.processors.BlurPostprocessor(this._context, this.blurRadius, this.blurDownSampling || 1);
                    requestBuilder = requestBuilder.setPostprocessor(postProcessor);
                }
                var request = requestBuilder.build();
                var that_1 = new WeakRef(this);
                var listener = new com.facebook.drawee.controller.ControllerListener({
                    onFinalImageSet: function (id, imageInfo, animatable) {
                        var nativeView = that_1 && that_1.get();
                        if (nativeView) {
                            nativeView.isLoading = false;
                            nativeView.onImageSet(imageInfo, animatable);
                            var info = new ImageInfo(imageInfo);
                            var args = {
                                eventName: image_common_1.ImageBase.finalImageSetEvent,
                                object: that_1.get(),
                                imageInfo: info,
                                animatable: animatable
                            };
                            nativeView.notify(args);
                        }
                        else {
                            console.log("Warning: WeakRef<Image> was GC and no '" + image_common_1.ImageBase.finalImageSetEvent + "' callback will be raised.");
                        }
                    },
                    onFailure: function (id, throwable) {
                        var nativeView = that_1 && that_1.get();
                        if (nativeView) {
                            nativeView.isLoading = false;
                            var imageError = new ImageError(throwable);
                            var args = {
                                eventName: image_common_1.ImageBase.failureEvent,
                                object: nativeView,
                                error: imageError
                            };
                            that_1.get().notify(args);
                        }
                        else {
                            console.log("Warning: WeakRef<Image> was GC and no '" + image_common_1.ImageBase.failureEvent + "' callback will be raised.");
                        }
                    },
                    onIntermediateImageFailed: function (id, throwable) {
                        var nativeView = that_1 && that_1.get();
                        if (nativeView) {
                            var imageError = new ImageError(throwable);
                            var args = {
                                eventName: image_common_1.ImageBase.intermediateImageFailedEvent,
                                object: nativeView,
                                error: imageError
                            };
                            that_1.get().notify(args);
                        }
                        else {
                            console.log("Warning: WeakRef<Image> was GC and no '" + image_common_1.ImageBase.intermediateImageFailedEvent + "' callback will be raised.");
                        }
                    },
                    onIntermediateImageSet: function (id, imageInfo) {
                        var nativeView = that_1 && that_1.get();
                        if (nativeView) {
                            var info = new ImageInfo(imageInfo);
                            var args = {
                                eventName: image_common_1.ImageBase.intermediateImageSetEvent,
                                object: nativeView,
                                imageInfo: info
                            };
                            that_1.get().notify(args);
                        }
                        else {
                            console.log("Warning: WeakRef<Image> was GC and no '" + image_common_1.ImageBase.intermediateImageSetEvent + "' callback will be raised.");
                        }
                    },
                    onRelease: function (id) {
                        var nativeView = that_1 && that_1.get();
                        if (nativeView) {
                            var args = {
                                eventName: image_common_1.ImageBase.releaseEvent,
                                object: nativeView
                            };
                            that_1.get().notify(args);
                        }
                        else {
                            console.log("Warning: WeakRef<Image> was GC and no '" + image_common_1.ImageBase.releaseEvent + "' callback will be raised.");
                        }
                    },
                    onSubmit: function (id, callerContext) {
                        var nativeView = that_1 && that_1.get();
                        if (nativeView) {
                            var args = {
                                eventName: image_common_1.ImageBase.submitEvent,
                                object: nativeView
                            };
                            that_1.get().notify(args);
                        }
                        else {
                            console.log("Warning: WeakRef<Image> was GC and no 'submitEvent' callback will be raised.");
                        }
                    }
                });
                var builder = com.facebook.drawee.backends.pipeline.Fresco.newDraweeControllerBuilder();
                builder.setImageRequest(request);
                builder.setControllerListener(listener);
                builder.setOldController(this.nativeViewProtected.getController());
                if (this.lowerResSrc) {
                    builder.setLowResImageRequest(com.facebook.imagepipeline.request.ImageRequest.fromUri(getUri(this.lowerResSrc)));
                }
                if (this.autoPlayAnimations) {
                    builder.setAutoPlayAnimations(this.autoPlayAnimations);
                }
                if (this.tapToRetryEnabled) {
                    builder.setTapToRetryEnabled(this.tapToRetryEnabled);
                }
                var controller = builder.build();
                if (this.aspectRatio) {
                    this.nativeViewProtected.setAspectRatio(this.aspectRatio);
                }
                this.nativeViewProtected.setController(controller);
            }
        }
    };
    Img.prototype.updateHierarchy = function () {
        if (this.nativeViewProtected) {
            var failureImageDrawable = void 0;
            var placeholderImageDrawable = void 0;
            var backgroundDrawable = void 0;
            if (this.failureImageUri) {
                failureImageDrawable = this.getDrawable(this.failureImageUri);
            }
            if (this.placeholderImageUri) {
                placeholderImageDrawable = this.getDrawable(this.placeholderImageUri);
            }
            if (this.backgroundUri) {
                backgroundDrawable = this.getDrawable(this.backgroundUri);
            }
            var builder = new GenericDraweeHierarchyBuilder();
            if (this.failureImageUri && failureImageDrawable) {
                builder.setFailureImage(failureImageDrawable);
            }
            if (this.tintColor) {
                builder.setActualImageColorFilter(new android.graphics.PorterDuffColorFilter(this.tintColor.android, android.graphics.PorterDuff.Mode.MULTIPLY));
            }
            if (this.placeholderImageUri && placeholderImageDrawable) {
                builder.setPlaceholderImage(placeholderImageDrawable);
            }
            if (this.stretch) {
                builder.setActualImageScaleType(this.stretch);
            }
            if (this.fadeDuration) {
                builder.setFadeDuration(this.fadeDuration);
            }
            else {
                builder.setFadeDuration(0);
            }
            if (this.backgroundUri && backgroundDrawable) {
                builder.setBackground(backgroundDrawable);
            }
            if (this.showProgressBar) {
                builder.setProgressBarImage(this.progressBarColor);
            }
            if (this.roundAsCircle) {
                builder.setRoundingParamsAsCircle();
            }
            if (this.roundBottomLeft || this.roundBottomRight || this.roundTopLeft || this.roundTopRight) {
                var topLeftRadius = this.roundTopLeft ? this.roundedCornerRadius : 0;
                var topRightRadius = this.roundTopRight ? this.roundedCornerRadius : 0;
                var bottomRightRadius = this.roundBottomRight ? this.roundedCornerRadius : 0;
                var bottomLeftRadius = this.roundBottomLeft ? this.roundedCornerRadius : 0;
                builder.setCornersRadii(topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius);
            }
            var hierarchy = builder.build();
            this.nativeViewProtected.setHierarchy(hierarchy);
        }
    };
    Img.prototype.getDrawable = function (path) {
        var drawable;
        if (utils.isFileOrResourcePath(path)) {
            if (path.indexOf(utils.RESOURCE_PREFIX) === 0) {
                drawable = this.getDrawableFromResource(path);
            }
            else {
                drawable = this.getDrawableFromLocalFile(path);
            }
        }
        return drawable;
    };
    Img.prototype.getDrawableFromLocalFile = function (localFilePath) {
        var img = imageSource.fromFile(localFilePath);
        var drawable = null;
        if (img) {
            drawable = new android.graphics.drawable.BitmapDrawable(utils.ad.getApplicationContext().getResources(), img.android);
        }
        return drawable;
    };
    Img.prototype.getDrawableFromResource = function (resourceName) {
        var img = imageSource.fromResource(resourceName.substr(utils.RESOURCE_PREFIX.length));
        var drawable = null;
        if (img) {
            drawable = new android.graphics.drawable.BitmapDrawable(utils.ad.getApplicationContext().getResources(), img.android);
        }
        return drawable;
    };
    Img.prototype[image_common_1.ImageBase.tintColorProperty.setNative] = function (value) {
        this.updateHierarchy();
    };
    Img.prototype.startAnimating = function () {
        if (this.nativeViewProtected) {
            var controller = this.nativeViewProtected.getController();
            if (controller) {
                var animatable = controller.getAnimatable();
                if (animatable) {
                    animatable.start();
                }
            }
        }
    };
    Img.prototype.stopAnimating = function () {
        if (this.nativeViewProtected) {
            var controller = this.nativeViewProtected.getController();
            if (controller) {
                var animatable = controller.getAnimatable();
                if (animatable) {
                    animatable.stop();
                }
            }
        }
    };
    return Img;
}(image_common_1.ImageBase));
exports.Img = Img;
var GenericDraweeHierarchyBuilder = (function () {
    function GenericDraweeHierarchyBuilder() {
        var res = application.android.context.getResources();
        this.nativeBuilder = new com.facebook.drawee.generic.GenericDraweeHierarchyBuilder(res);
    }
    GenericDraweeHierarchyBuilder.prototype.setPlaceholderImage = function (drawable) {
        if (!this.nativeBuilder) {
            return this;
        }
        this.nativeBuilder.setPlaceholderImage(drawable);
        return this;
    };
    GenericDraweeHierarchyBuilder.prototype.setActualImageColorFilter = function (filter) {
        if (!this.nativeBuilder) {
            return this;
        }
        this.nativeBuilder.setActualImageColorFilter(filter);
        return this;
    };
    GenericDraweeHierarchyBuilder.prototype.setFailureImage = function (drawable) {
        if (!this.nativeBuilder) {
            return null;
        }
        this.nativeBuilder.setFailureImage(drawable);
        return this;
    };
    GenericDraweeHierarchyBuilder.prototype.setActualImageScaleType = function (scaleType) {
        if (!this.nativeBuilder) {
            return this;
        }
        this.nativeBuilder.setActualImageScaleType(getScaleType(scaleType));
        return this;
    };
    GenericDraweeHierarchyBuilder.prototype.build = function () {
        if (!this.nativeBuilder) {
            return null;
        }
        return this.nativeBuilder.build();
    };
    GenericDraweeHierarchyBuilder.prototype.setFadeDuration = function (duration) {
        if (!this.nativeBuilder) {
            return null;
        }
        this.nativeBuilder.setFadeDuration(duration);
        return this;
    };
    GenericDraweeHierarchyBuilder.prototype.setBackground = function (drawable) {
        if (!this.nativeBuilder) {
            return this;
        }
        this.nativeBuilder.setBackground(drawable);
        return this;
    };
    GenericDraweeHierarchyBuilder.prototype.setProgressBarImage = function (color) {
        if (!this.nativeBuilder) {
            return null;
        }
        var drawable = new com.facebook.drawee.drawable.ProgressBarDrawable();
        if (color) {
            drawable.setColor(android.graphics.Color.parseColor(color));
        }
        this.nativeBuilder.setProgressBarImage(drawable);
        return this;
    };
    GenericDraweeHierarchyBuilder.prototype.setRoundingParamsAsCircle = function () {
        if (!this.nativeBuilder) {
            return this;
        }
        var params = com.facebook.drawee.generic.RoundingParams.asCircle();
        this.nativeBuilder.setRoundingParams(params);
        return this;
    };
    GenericDraweeHierarchyBuilder.prototype.setCornersRadii = function (topLeft, topRight, bottomRight, bottomLeft) {
        if (!this.nativeBuilder) {
            return this;
        }
        var params = new com.facebook.drawee.generic.RoundingParams();
        params.setCornersRadii(topLeft, topRight, bottomRight, bottomLeft);
        this.nativeBuilder.setRoundingParams(params);
        return this;
    };
    return GenericDraweeHierarchyBuilder;
}());
function getScaleType(scaleType) {
    if (types.isString(scaleType)) {
        switch (scaleType) {
            case image_common_1.ScaleType.Center:
                return com.facebook.drawee.drawable.ScalingUtils.ScaleType.CENTER;
            case image_common_1.ScaleType.AspectFill:
            case image_common_1.ScaleType.CenterCrop:
                return com.facebook.drawee.drawable.ScalingUtils.ScaleType.CENTER_CROP;
            case image_common_1.ScaleType.CenterInside:
                return com.facebook.drawee.drawable.ScalingUtils.ScaleType.CENTER_INSIDE;
            case image_common_1.ScaleType.FitCenter:
            case image_common_1.ScaleType.AspectFit:
                return com.facebook.drawee.drawable.ScalingUtils.ScaleType.FIT_CENTER;
            case image_common_1.ScaleType.FitEnd:
                return com.facebook.drawee.drawable.ScalingUtils.ScaleType.FIT_END;
            case image_common_1.ScaleType.FitStart:
                return com.facebook.drawee.drawable.ScalingUtils.ScaleType.FIT_START;
            case image_common_1.ScaleType.Fill:
            case image_common_1.ScaleType.FitXY:
                return com.facebook.drawee.drawable.ScalingUtils.ScaleType.FIT_XY;
            case image_common_1.ScaleType.FocusCrop:
                return com.facebook.drawee.drawable.ScalingUtils.ScaleType.FOCUS_CROP;
            default:
                break;
        }
    }
    return null;
}
//# sourceMappingURL=image.android.js.map