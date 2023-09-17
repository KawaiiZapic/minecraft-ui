import { Plugin } from "vue";
import MButton from "./components/button";
import MText from "./components/text";

export default {
    install(app) {
        app.component(MButton.name, MButton);
        app.component(MText.name, MText);
    }
} as Plugin;