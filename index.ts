import {html, render} from "lit-html";
interface ViewModel {
    menu:{
        heading:string,
        item:{text:string,link:string}[]};
    title:string;
    subtitle:string;
    content:()=>string;
}
const exampleContent = ()=>html`
    <h2 class="content-subhead">How to use this layout</h2>
    <p>
        To use this layout, you can just copy paste the HTML, along with the CSS in <a href="/css/layouts/side-menu.css" alt="Side Menu CSS">side-menu.css</a>, and the JavaScript in <a href="/js/ui.js">ui.js</a>. The JS file uses vanilla JavaScript to simply toggle an <code>active</code> class that makes the menu responsive.
    </p>
    
    <h2 class="content-subhead">Now Let's Speak Some Latin</h2>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    
    <div class="pure-g">
        <div class="pure-u-1-4">
            <img class="pure-img-responsive" src="http://farm3.staticflickr.com/2875/9069037713_1752f5daeb.jpg" alt="Peyto Lake">
        </div>
        <div class="pure-u-1-4">
            <img class="pure-img-responsive" src="http://farm3.staticflickr.com/2813/9069585985_80da8db54f.jpg" alt="Train">
        </div>
        <div class="pure-u-1-4">
            <img class="pure-img-responsive" src="http://farm6.staticflickr.com/5456/9121446012_c1640e42d0.jpg" alt="T-Shirt Store">
        </div>
        <div class="pure-u-1-4">
            <img class="pure-img-responsive" src="http://farm8.staticflickr.com/7357/9086701425_fda3024927.jpg" alt="Mountain">
        </div>
    </div>
    
    <h2 class="content-subhead">Try Resizing your Browser</h2>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
`;
const BASIC_VIEW = {
    menu: {
        heading: 'Company',
        item: [
            {text: 'Home', link: '#'},
            {text: 'About', link: '#'},
            {text: 'Services', link: '#'},
            {text: 'Contact', link: '#'}]
    },
    title: 'Page Title',
    subtitle: 'A subtitle for your page goes here',
    content: exampleContent
}   as ViewModel;
let currentModel = BASIC_VIEW;

let isActive = false;
function toggleActive() {
    isActive = !isActive;
    draw(currentModel)
}
const active = () => isActive ? 'active' : '';
const activeLink = () =>isActive ? 'active menu-link' : 'menu-link';

function draw(model:ViewModel) {
    render(html`
<div id="layout" class=${active()}>
    <!-- Menu toggle -->
    <a href="#menu" id="menuLink" class=${activeLink()} @click=${toggleActive}>
        <!-- Hamburger icon -->
        <span></span>
    </a>

    <div id="menu" class=${active()}>
        <div class="pure-menu">
            <a class="pure-menu-heading" href="#">${model.menu.heading}</a>

            <ul class="pure-menu-list">${model.menu.item.map(({text, link})=>html`
              <li class="pure-menu-item"><a href=${link} class="pure-menu-link">${text}</a></li>`)}
            </ul>
        </div>
    </div>

    <div id="main" @click=${() => isActive && toggleActive()}>
        <div class="header">
            <h1>${model.title}</h1>
            <h2>${model.subtitle}</h2>
        </div> 
        <div class="content">${model.content()}</div>
    </div>
</div>
`, document.body);
}
draw(currentModel);