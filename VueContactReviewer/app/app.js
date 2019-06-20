import Vue from 'nativescript-vue';



// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;

new Vue({

    template: `
        <Frame>
            <getContactyBois />
        </Frame>`,

    components: {
        getContactyBois
    }
}).$start();