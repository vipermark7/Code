"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("./..");
var component_1 = require("./component");
var RadCalendarPlugin = {
    install: function (Vue, options) {
        Vue.registerElement('RadCalendar', function () { return __1.RadCalendar; }, {
            component: component_1.default,
        });
    }
};
exports.default = RadCalendarPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDBCQUFtQztBQUNuQyx5Q0FBMEM7QUFFMUMsSUFBTSxpQkFBaUIsR0FBRztJQUN4QixPQUFPLFlBQUMsR0FBRyxFQUFFLE9BQU87UUFDbEIsR0FBRyxDQUFDLGVBQWUsQ0FDakIsYUFBYSxFQUNiLGNBQU0sT0FBQSxlQUFXLEVBQVgsQ0FBVyxFQUNqQjtZQUNFLFNBQVMsRUFBRSxtQkFBZTtTQUMzQixDQUNGLENBQUM7SUFFSixDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLGlCQUFpQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVnVlIGZyb20gJ25hdGl2ZXNjcmlwdC12dWUnO1xuaW1wb3J0IHsgUmFkQ2FsZW5kYXIgfSBmcm9tICcuLy4uJztcbmltcG9ydCBSYWRDYWxlbmRhckNvbXAgZnJvbSAnLi9jb21wb25lbnQnO1xuXG5jb25zdCBSYWRDYWxlbmRhclBsdWdpbiA9IHtcbiAgaW5zdGFsbChWdWUsIG9wdGlvbnMpIHtcbiAgICBWdWUucmVnaXN0ZXJFbGVtZW50KFxuICAgICAgJ1JhZENhbGVuZGFyJyxcbiAgICAgICgpID0+IFJhZENhbGVuZGFyLFxuICAgICAge1xuICAgICAgICBjb21wb25lbnQ6IFJhZENhbGVuZGFyQ29tcCxcbiAgICAgIH1cbiAgICApO1xuXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJhZENhbGVuZGFyUGx1Z2luO1xuIl19