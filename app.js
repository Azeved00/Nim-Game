import * as Utils from './src/helpers.js';
import * as Section from './src/section.js';

//import submodules
//each has a window load event as a main function to do their thing
import * as messages from './modules/messages/messages.js'
import * as sidebar  from './modules/sidebar/sidebar.js'
import * as navbar   from './modules/navbar/navbar.js'

window.addEventListener("load",() => {
    Section.show();
    Utils.getById("logoBtn").onclick = () => { Section.show("Play") }
})
