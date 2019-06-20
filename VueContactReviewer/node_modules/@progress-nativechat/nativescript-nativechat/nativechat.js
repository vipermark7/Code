"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grid_layout_1 = require("tns-core-modules/ui/layouts/grid-layout");
var web_view_1 = require("tns-core-modules/ui/web-view");
var platform_1 = require("tns-core-modules/platform");
var observable_1 = require("tns-core-modules/data/observable/observable");
var webchatUrl = 'https://webchat.nativechat.com/v1/';
var NativeChat = (function (_super) {
    __extends(NativeChat, _super);
    function NativeChat() {
        var _this = _super.call(this) || this;
        _this.webChatConfig = observable_1.fromObject({ url: '' });
        _this._webView = new web_view_1.WebView();
        var webViewBindingOptions = {
            sourceProperty: "url",
            targetProperty: "src",
            twoWay: false
        };
        _this._webView.bind(webViewBindingOptions, _this.webChatConfig);
        _this._webView.on('loadFinished', _this.webViewLoaded);
        _this.addChild(_this._webView);
        return _this;
    }
    Object.defineProperty(NativeChat.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (value) {
            if (this._config && this._config.constructor.prototype instanceof observable_1.Observable) {
                this._config.off('propertyChange', this.configPropertyChange.bind(this));
            }
            this._config = value;
            this.updateUrl();
            if (this._config && this._config.constructor.prototype instanceof observable_1.Observable) {
                this._config.on('propertyChange', this.configPropertyChange.bind(this));
            }
        },
        enumerable: true,
        configurable: true
    });
    NativeChat.prototype.webViewLoaded = function (args) {
        var webview = args.object;
        if (platform_1.isAndroid) {
            var settings = webview.android.getSettings();
            settings.setDomStorageEnabled(true);
            settings.setDisplayZoomControls(false);
        }
    };
    NativeChat.prototype.configPropertyChange = function (data) {
        this.updateUrl();
    };
    NativeChat.prototype.updateUrl = function () {
        if (this._config && this._config.botId && this._config.channelId && this._config.channelToken) {
            var url = webchatUrl + "?botId=" + encodeURIComponent(this._config.botId);
            url += "&channelId=" + encodeURIComponent(this._config.channelId);
            url += "&token=" + encodeURIComponent(this._config.channelToken);
            if (this._config.user) {
                if (this._config.user.name) {
                    url += "&user=" + encodeURIComponent(JSON.stringify({ name: this._config.user.name }));
                }
                if (this._config.user.id) {
                    url += "&senderId=" + encodeURIComponent(this._config.user.id);
                }
            }
            if (this._config.session) {
                if (this._config.session.context) {
                    url += "&context=" + encodeURIComponent(JSON.stringify(this._config.session.context));
                }
                if (this._config.session.clear) {
                    url += "&newSession=true";
                }
                if (this._config.session.clear || this._config.session.userMessage) {
                    url += "&userMessage=" + encodeURIComponent(this._config.session.userMessage || '');
                }
            }
            if (this._config.gtmId != null) {
                url += "&gtmId=" + encodeURIComponent(this._config.gtmId);
            }
            this.webChatConfig.set('url', url);
        }
        else {
            this.webChatConfig.set('url', '');
        }
    };
    return NativeChat;
}(grid_layout_1.GridLayout));
exports.NativeChat = NativeChat;
//# sourceMappingURL=nativechat.js.map