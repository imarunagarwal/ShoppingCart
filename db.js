//#region setUp
const Sequelize = require('sequelize')
const operation = Sequelize.operation

const db = new Sequelize({
    dialect: 'sqlite', // mysql, postgres, mssql
    storage: __dirname + '/shopping.db'
    // database : '',
    // host: 'localhost',
    // username: '',
    // password: '',
    // port: ''
})
//#endregion  

//#region User 
const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
                autoIncrement:true,
                primaryKey:true 
    },
    name: {
        type:Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull:false
    }
})
//#endregion

//#region Vendor
const Vendor = db.define('vendor', {
    id: {
        type: Sequelize.INTEGER,
                autoIncrement:true,
                primaryKey:true 
    },
    name: {
        type:Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull:false
    }
})
//#endregion

//#region Product
const Product = db.define('product', {
    id: {
        type: Sequelize.INTEGER,
                autoIncrement:true,
                primaryKey:true 
    },
    name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull:false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull:false
    }  

})
//#endregion

//#region Cart
const Cart = db.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    total:{
        type: Sequelize.FLOAT,
        defaultValue: 0.0
    }
})
//#endregion

//#region Mapping Between Table
Cart.belongsTo(Product, { onDelete: 'cascade' });
Product.hasMany(Cart, { onDelete: 'cascade' });
Cart.belongsTo(User);
User.hasMany(Cart, { onDelete: 'cascade' });
Product.belongsTo(User);
User.hasMany(Product, { onDelete: 'cascade' })
Product.belongsTo(Vendor);
Vendor.hasMany(Product, {onDelete: 'cascade'})  


 exports=module.exports={
    db,User,Product,Vendor,Cart
}
//#endregion

//#region Db Sync
db.sync()
    .then(()=> { 
        console.log("db synced successfully")
    })
//#endregion









