"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("./component");
var RadSideDrawerPlugin = {
    install: function (Vue) {
        Vue.registerElement('RadSideDrawer', function () { return require('./..').RadSideDrawer; }, {
            component: component_1.default,
        });
    }
};
exports.default = RadSideDrawerPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUE0QztBQUU1QyxJQUFNLG1CQUFtQixHQUFHO0lBRTFCLE9BQU8sWUFBQyxHQUFHO1FBQ1QsR0FBRyxDQUFDLGVBQWUsQ0FDakIsZUFBZSxFQUNmLGNBQU0sT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxFQUE3QixDQUE2QixFQUNuQztZQUNFLFNBQVMsRUFBRSxtQkFBaUI7U0FDN0IsQ0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUM7QUFFRixrQkFBZSxtQkFBbUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSYWRTaWRlRHJhd2VyQ29tcCBmcm9tICcuL2NvbXBvbmVudCc7XG5cbmNvbnN0IFJhZFNpZGVEcmF3ZXJQbHVnaW4gPSB7XG5cbiAgaW5zdGFsbChWdWUpIHtcbiAgICBWdWUucmVnaXN0ZXJFbGVtZW50KFxuICAgICAgJ1JhZFNpZGVEcmF3ZXInLFxuICAgICAgKCkgPT4gcmVxdWlyZSgnLi8uLicpLlJhZFNpZGVEcmF3ZXIsXG4gICAgICB7XG4gICAgICAgIGNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXAsXG4gICAgICB9XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmFkU2lkZURyYXdlclBsdWdpbjsiXX0=