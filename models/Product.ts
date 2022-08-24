import mongoose, { Schema, model, Model } from 'mongoose';
import { IProducts } from '../interfaces/products';

// description: string;
// images: string[];
// inStock: number;
// price: number;
// sizes: ValidSizes[];
// slug: string;
// tags: string[];
// title: string;
// type: ValidTypes;
// gender: 'men'|'women'|'kid'|'unisex'

const productSchema = new Schema({
    description: {
        type: String,
        require: true,
    },
    images: [{
        type: String,
    }],
    inStock: {
        type: Number,
        require: true,
        default: 0,
    },
    price: {
        type: Number,
        require: true,
        default: 0,
    },
    sizes: [{
        type: String,
        enum: {
            values: ['XS','S','M','L','XL','XXL','XXXL'],
            message: '{VALUE} no es un tamaño válido',
        },
        required: true,
    }],
    slug: {
        type: String,
        unique: true,
        require: true,
    },
    tags: [{
        type: String,
    }],
    title: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        enum: {
            values: ['shirts','pants','hoodies','hats'],
            message: '{VALUE} no es un tipo válido',
        },
    },
    gender: {
        type: String,
        enum: {
            values: ['men','women','kid','unisex'],
            message: '{VALUE} no es un género válido',
        },
    },

},{
    timestamps: true
});

// Crear indice
// productSchema.methods.toJSON = function() {
//     const { __v, ...data  } = this.toObject();
//     return data;
// }


const Product: Model<IProducts> = mongoose.models.Product || model('Product', productSchema);

export default Product;