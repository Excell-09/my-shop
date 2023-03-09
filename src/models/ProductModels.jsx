import mongoose from 'mongoose';

const product = {
  title: {
    type: String,
    required: [true, 'provide title product'],
    minlength: 1,
    maxlength: 100,
  },
  imageUrl: {
    type: String,
    required: [true, 'provide title Image'],
  },
  price: {
    type: Number,
    required: [true, 'provide price'],
  },
};

const ProductSchema = new mongoose.Schema(product, { timestamps: true });

const ProductModels = mongoose.models.products || mongoose.model('products', ProductSchema);

export default ProductModels;
