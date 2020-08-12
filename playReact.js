class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type)
    }
    setAttribute(name, value) {
        if(name.match(/^on([\s\S]+)$/)) {
            let name = RegExp.$1.replace(/^[\s\S]/, s => s.toLocaleLowerCase())
            this.root.addEventListener(name, value)
        }
        this.root.setAttribute(name, value)
    }
    appendChild(vchild) {
        vchild.mountTo(this.root)
    }
    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content)
    }
    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

export class Component {
    constructor() {
        this.children = []
        this.props = Object.create(null)
    }
    setAttribute(name, value) {
        this.props[name] = value
        this[name] = value
    }
    mountTo(parent) {
        let vdom = this.render()
        vdom.mountTo(parent)
    }
    appendChild(vchild) {
        this.children.push(vchild)
    }
}


export const playReact = {
    createElement(type, attributes, ...children) {
        let element
        if (typeof type === 'string') {
            element = new ElementWrapper(type)
        } else {
            element = new type
        }

        for (let name in attributes) {
            element.setAttribute(name, attributes[name])
        }

        let insertChild = children => {
            for (let child of children) {
                if (typeof child === 'object' && child instanceof Array) {
                    insertChild(child)
                } else {
                    if (!(child instanceof ElementWrapper) &&
                        !(child instanceof TextWrapper) &&
                        !(child instanceof Component)) {
                        child = String(child)
                    }
                    if (typeof child === 'string') {
                        child = new TextWrapper(child)
                    }
                    element.appendChild(child)
                }
            }
        }
        insertChild(children)

        return element
    },
    render(vdom, element) {
        vdom.mountTo(element)
    }
}