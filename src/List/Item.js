import $ from 'jquery'
import StateMachine from 'javascript-state-machine'
import { getCart } from "../ShoppingCart/Cart";
import { log } from '../util/Log'
export default class Item{
    constructor(list,data){
        this.$el = $('<div>')
        this.data = data
        this.list = list
        this.cart = getCart()
    }
    init() {
        this.initContent()
        this.initBtn()
        this.render()
    }
    initContent() {
        let $el = this.$el
        let data = this.data
        $el.append($(`<p>名称：${data.name}</p>`))
        $el.append($(`<p>价格：${data.price}</p>`))

    }
    initBtn() {
        let $el = this.$el
        let $btn = $('<button>')
        let self = this
        let fsm = new StateMachine({
            init: '加入购物车',
            transitions: [{
                name: 'addToCart',
                from: '加入购物车',
                to: '从购物车删除'
            },{
                name: 'deleteFromCart',
                from: '从购物车删除',
                to: '加入购物车'
            }],
            methods: {
                onAddToCart: function() {
                    self.addToCartHandle()
                    updateButtonText()
                },
                onDeleteFromCart: function () {
                    self.deleteFromCartHandle()
                    updateButtonText()
                }
            }
        })
        function updateButtonText() {
            $btn.text(fsm.state)
        }
        updateButtonText()
        $el.append($btn)
        $btn.click(() => {
            if(fsm.is('加入购物车')) {
                fsm.addToCart()
            } else {
                fsm.deleteFromCart()
            }
        })
    }
    @log('加入购物车')
    addToCartHandle() {
        this.cart.add(this.data)
    }
    @log('从购物车删除')
    deleteFromCartHandle(){
        this.cart.delete(this.data.id)
    }
    render() {
        this.list.$el.append(this.$el)
    }
}
