"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    props: {},
    template: "\n    <NativeRadCalendar\n      ref=\"calendar\"\n      v-bind=\"$attrs\"\n      v-on=\"$listeners\">\n      <slot />\n\n    </NativeRadCalendar>\n  ",
    methods: {
        navigateForward: function () {
            this.$refs.calendar.nativeView.navigateForward();
        },
        navigateBack: function () {
            this.$refs.calendar.nativeView.navigateBack();
        },
        goToDate: function (date) {
            this.$refs.calendar.nativeView.goToDate(date);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7SUFDYixLQUFLLEVBQUUsRUFDTjtJQUVELFFBQVEsRUFBRSx1SkFRVDtJQUVELE9BQU8sRUFBRTtRQUNQLGVBQWU7WUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDbkQsQ0FBQztRQUNELFlBQVk7WUFDVixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDaEQsQ0FBQztRQUNELFFBQVEsWUFBRSxJQUFVO1lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsQ0FBQztLQUNGO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgfSxcblxuICB0ZW1wbGF0ZTogYFxuICAgIDxOYXRpdmVSYWRDYWxlbmRhclxuICAgICAgcmVmPVwiY2FsZW5kYXJcIlxuICAgICAgdi1iaW5kPVwiJGF0dHJzXCJcbiAgICAgIHYtb249XCIkbGlzdGVuZXJzXCI+XG4gICAgICA8c2xvdCAvPlxuXG4gICAgPC9OYXRpdmVSYWRDYWxlbmRhcj5cbiAgYCxcblxuICBtZXRob2RzOiB7XG4gICAgbmF2aWdhdGVGb3J3YXJkICgpIHtcbiAgICAgIHRoaXMuJHJlZnMuY2FsZW5kYXIubmF0aXZlVmlldy5uYXZpZ2F0ZUZvcndhcmQoKTtcbiAgICB9LFxuICAgIG5hdmlnYXRlQmFjayAoKSB7XG4gICAgICB0aGlzLiRyZWZzLmNhbGVuZGFyLm5hdGl2ZVZpZXcubmF2aWdhdGVCYWNrKCk7XG4gICAgfSxcbiAgICBnb1RvRGF0ZSAoZGF0ZTogRGF0ZSkge1xuICAgICAgdGhpcy4kcmVmcy5jYWxlbmRhci5uYXRpdmVWaWV3LmdvVG9EYXRlKGRhdGUpO1xuICAgIH1cbiAgfVxufTtcbiJdfQ==