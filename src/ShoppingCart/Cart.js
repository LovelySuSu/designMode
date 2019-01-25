class Cart{
    constructor(){
        this.list = []
    }
    add(data){
        this.list.push(data)
    }
    delete(id){
        this.list = this.list.filter(item => item.id !== id)
    }
    getList(){
        return this.list.map(item => {
            return item.name
        }).join('\n')
    }
}
export const getCart = (function () {
    let instance
    return function () {
        if (!instance) {
            instance = new Cart();
        }
        return instance
    }
})()
