const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
  console.log("Connection open!!!");
}

const productSchema = new mongoose.Schema({
    name: {
          type: String,
          required: true,
          maxlength: 20
          // maxlength: [20, "length shoudl be less than 20"] //[value, error msg]
    },
    price: {
      type: Number,
      //min: [0, "YOOO! Price positive only YO"]
      min: 0
    },
    sale: {
      type: Boolean,
      default: false
    },
    categories: {
      type: [String],
      default: ["Exercise"]
    },
    qty: {
      online: { type: Number, default: 0},
      inStore: { type: Number, default: 0}
    },
    size: {
      type: String,
      enum: ['S', 'M', 'L', 'XL']  // can only pick between these option when we use enum
    }
});

const Product = mongoose.model('Product', productSchema);

const bike = new Product({ name: 'Memitron 200',  price: 200, size: 'XL'})

bike.save()
    .then( data => {
        console.log(" IT WORKED!");
        console.log(data);
    })
    .catch(err => {
        console.log("OH NO ERROR!")
        console.log(err);
    })

// Product.findOneAndUpdate({name: 'Montra automatic 100'}, {price: 100.99},  {new: true, runValidators: true})
//     .then( data => {
//       console.log(" IT WORKED!");       // new: true => sets data in ".then" to the updated value
//       console.log(data);                // runValidatores: supports validation from schema designed above or else price can be set to -ve during update
//   })
//   .catch(err => {
//       console.log("OH NO ERROR!")
//       console.log(err);
//   })


// WE use istance and class methods to increase reusablilty
//Instance Method: is avaiable on every single instance(object)
// bike.save() or bike.find() => Here bike is object of Product class, so .save() is an insatnce method
//new Product().save() => can also be written like as bike is an instance of product class

//Class or Static method: Methods available on Class. Fromm above example
// "Prodcut" is a class. => Product.find() [find() is a class method]
// no access to "this" keyword as we are not dealng with objects but class

//Defining own instnace method
// make sure to use normak function not arrow function
// productSchema.methods.greet = function() {
//   console.log("HELLO!!! How Howdy!");
//   console.log(`Thank you for buying ${this.name}`) // this gives reference to object greet() has been called on
// }

// bike.greet();

// Class mthods or Static
productSchema.statics.fireSale = function() {
  return this.updateMany({}, {onSale: true, price:0}) // updateMany updates every document in the Product collection
}

Product.fireSale()
  .then(resolved=> console.log(resolved))  //update fucntion gives reolsved so res, when we create it gives data so .then(data)