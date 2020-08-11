import { playReact, Component } from './playReact.js'

class MyComponent extends Component {
    render() {
        return <div>
            <h1>hello</h1>
            <h2>world</h2>
            <h3>!</h3>
            {false}
            <div>{this.children}</div>
        </div>
    }
}
const cmp = <MyComponent title="kk"><div>123456</div></MyComponent>


playReact.render(cmp, document.body)