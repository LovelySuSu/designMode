import $ from 'jquery'
import { getCart } from './Cart'
export default class ShoppingCart {
    constructor(app) {
        this.app = app
        this.$el = $('<div>').css({
            'padding-bottom': '10px',
            'border-bottom': '1px solid #ccc'
        })
        this.cart = getCart()
    }
    init(){
        this.initBtn()
        this.render()
    }
    showCart(){
        alert(this.cart.getList())
    }
    initBtn(){
        let $btn = $('<button>查看购物车</button>')
        $btn.click(()=>{
            this.showCart()
        })
        this.$el.append($btn)
    }
    render(){
        this.app.$el.append(this.$el)
    }
}

