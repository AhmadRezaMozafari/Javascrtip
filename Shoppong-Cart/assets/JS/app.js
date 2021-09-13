class Product{
    constructor(title,imgUrl,description,price){
        this.title=title
        this.imgUrl=imgUrl;
        this.description=description
        this.price=price
    }
}

class ShoppingCart{
    items=[]

    set cartItem(value){
        this.items=value
        this.totalOutput.innerHTML=`<h2>مجموع: ${this.totalAmount} \تومان</h2>`
    }

    get totalAmount(){
        const sum=this.items.reduce((perVal,currVal)=>{return perVal+currVal.price},0)
        return sum;
    }

    addToCart(prod){
        const updatedItems=[...this.items]
        updatedItems.push(prod)
        this.cartItem=updatedItems
    }

    render(){
        const cart=document.createElement('section')
        cart.className='cart-section'
        cart.innerHTML=`
            <h2>مجموع:${0}</h2>
            <button>سفارش</button>
        `;
        this.totalOutput=cart.querySelector('h2');
        return cart;
    }
}

class ProductItem{
    constructor(Product){
        this.Product=Product
    }

    getItem(){
        App.addProdToCart(this.Product)
    }

    render(){
        const prodItem=document.createElement('li')
        prodItem.className='product-item'
        prodItem.innerHTML=`
            <div>
                <img src="${this.Product.imgUrl}"></img>
                <h2>${this.Product.title}</h2>
                <p>${this.Product.description}</p>
                <h4>\T ${this.Product.price}</h4>
                <button>افزوردن به لیست</button>
            </div>
        `;
        const addButton=prodItem.querySelector('button')
        addButton.addEventListener('click',this.getItem.bind(this))
        return prodItem;
    }
}

class ProductList{
    products=[
        new Product('کوله پشتی','https://www.xd-design.com/media/catalog/product/p/7/p705542_1.jpg','کیفیت عالی,سبک',245.999),
        new Product('کفش مردانه','https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/e725107a3d7041389f94ab220123fbcb_9366/Bravada_Shoes_Black_FV8085_01_standard.jpg','سبک, مناسب مدرسه و دانشگاه',420000),
        new Product('توپ بسکتبال','https://cf.shopee.ph/file/660ec67a99ab918c395bf4ff888267c2','مناسب خیابان و سالن',65000)
    ];

    render(){
        const prodList=document.createElement('ul')
        prodList.className='product-list'
        for(const prod of this.products){
            const productItems=new ProductItem(prod);
            const prodEl=productItems.render()
            prodList.append(prodEl)
        };
        return prodList;
    }
}


class Shop{
    render(){
        const pushToView=document.getElementById('app')

        this.cart=new ShoppingCart()
        const cartEl=this.cart.render()
        const prodList=new ProductList()
        const prod=prodList.render()

        pushToView.append(cartEl)
        pushToView.append(prod)

    }
}


class App{
    static init(){
        const shop=new Shop;
        shop.render()
        this.cart=shop.cart;
    }
    static addProdToCart(prod){
        this.cart.addToCart(prod)
    }
}

App.init()