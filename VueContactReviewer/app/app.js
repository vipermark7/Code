import Vue from 'nativescript-vue';

import HelloWorld from './components/HelloWorld';

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;

new Vue({

    template: `
        <Frame>
            <HelloWorld />
        </Frame>`,

    components: {
        HelloWorld,
        getContactyBois
    }
}).$start();