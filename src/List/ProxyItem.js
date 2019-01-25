import Item from './Item'

function createNeedItem(itemData) {
    // 用代理做折扣显示
    return new Proxy(itemData, {
        get: function (target, key, receiver) {
            if (key === 'name') {
                return `${target[key]}【超想买~】`
            }
            return target[key]
        }
    })
}

export default function (list,itemData) {
    if(itemData.discount) {
        itemData = createNeedItem(itemData)
    }
    return new Item(list,itemData)
}
