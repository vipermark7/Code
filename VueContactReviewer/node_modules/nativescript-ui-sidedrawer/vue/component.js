"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    props: {},
    template: "\n    <NativeRadSideDrawer\n      ref=\"drawer\"\n      v-bind=\"$attrs\"\n      v-on=\"$listeners\">\n      <slot />\n    </NativeRadSideDrawer>\n  ",
    methods: {
        showDrawer: function () {
            return this.$refs.drawer.nativeView.showDrawer();
        },
        closeDrawer: function () {
            return this.$refs.drawer.nativeView.closeDrawer();
        },
        toggleDrawerState: function () {
            return this.$refs.drawer.nativeView.toggleDrawerState();
        },
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7SUFDYixLQUFLLEVBQUUsRUFDTjtJQUVELFFBQVEsRUFBRSx1SkFPVDtJQUVELE9BQU8sRUFBRTtRQUNQLFVBQVU7WUFDUixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNuRCxDQUFDO1FBQ0QsV0FBVztZQUNULE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BELENBQUM7UUFDRCxpQkFBaUI7WUFDZixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzFELENBQUM7S0FDRjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7XG4gIH0sXG5cbiAgdGVtcGxhdGU6IGBcbiAgICA8TmF0aXZlUmFkU2lkZURyYXdlclxuICAgICAgcmVmPVwiZHJhd2VyXCJcbiAgICAgIHYtYmluZD1cIiRhdHRyc1wiXG4gICAgICB2LW9uPVwiJGxpc3RlbmVyc1wiPlxuICAgICAgPHNsb3QgLz5cbiAgICA8L05hdGl2ZVJhZFNpZGVEcmF3ZXI+XG4gIGAsXG5cbiAgbWV0aG9kczoge1xuICAgIHNob3dEcmF3ZXIgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJHJlZnMuZHJhd2VyLm5hdGl2ZVZpZXcuc2hvd0RyYXdlcigpO1xuICAgIH0sXG4gICAgY2xvc2VEcmF3ZXIgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJHJlZnMuZHJhd2VyLm5hdGl2ZVZpZXcuY2xvc2VEcmF3ZXIoKTtcbiAgICB9LFxuICAgIHRvZ2dsZURyYXdlclN0YXRlICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRyZWZzLmRyYXdlci5uYXRpdmVWaWV3LnRvZ2dsZURyYXdlclN0YXRlKCk7XG4gICAgfSxcbiAgfVxufTtcbiJdfQ==