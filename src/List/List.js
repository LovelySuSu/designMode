import $ from 'jquery'
import { GET_LIST } from "../config/config";
import ProxyItem from './ProxyItem'

export default class List {
    constructor(app){
        this.app = app
        this.$el = $('<div>')
    }
    init(){
        this.loadData()
            .then(data => this.initItemList(data))
            .then(() => this.render())
    }
    // 获取数据
    loadData(){
        return fetch(GET_LIST).then(res => res.json())
    }
    // 生成列表
    initItemList(data)  {
        data.forEach(itemData => {
            let item = ProxyItem(this,itemData)
            item.init()
        })
    }
    render(){
        this.app.$el.append(this.$el)
    }
}
