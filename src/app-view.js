import { html } from 'lit-html';

export default (props) => html`    
    <nav>
        <button route="/">Home</button>
        <button route="/contact">Contact</button>
    </nav>
    <router-viewer>
    </router-viewer>
`;