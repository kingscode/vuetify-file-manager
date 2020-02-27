import './css/GlobalClasses.css';
import VuetifyFileManagerComponent from './VuetifyFileManager.vue';

const VuetifyFileManager = {
    install(Vue, options) {
        Vue.component('vuetify-file-manager', VuetifyFileManagerComponent);

    },
};

export default VuetifyFileManager;
