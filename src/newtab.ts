import Newtab from "./pages/Newtab.vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {createApp} from "vue";
import 'vfonts/Lato.css'
import './style.css'

const newtab = createApp(Newtab)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    newtab.component(key, component)
}

newtab.mount('#newtab');
