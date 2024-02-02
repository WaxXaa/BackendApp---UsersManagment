import { Schema, model } from 'mongoose';
const accommodationSchema = new Schema({
  type: {
    type: String,
    enum: ['Casa', 'Cabaña', 'Minicasa', 'Casa rodante', 'Casa del árbol', 'Departamento', 'Casa de huéspedes', 'Casa contenedor', 'Casa domo'],
    required: true,
  },
  images: {
    type: [String],
    validate: {
      validator: function (value) {
        // Asegurar que hay al menos 5 imágenes y no más de 15
        return Array.isArray(value) && value.length >= 5 && value.length <= 15;
      },
      message: 'Debe proporcionar entre 5 y 15 imágenes.',
    },
  }, // Array de URLs de imágenes
  accommodationType: {
    type: String,
    enum: ['Alojamiento entero', 'Habitación', 'Habitación compartida'],
    required: true,
  },
  address: {
    country: String,
    address1: String,
    address2: String,
    address3: String,
    city: String,
    state: String,
    department: String,
    floor: String,
    building: String,
    postalCode: String,
  },
  maxGuests: Number,
  bedrooms: Number,
  beds: Number,
  bathrooms: Number,
  features: {
    type: [String], // Array de strings para features
    enum: ['Wifi', 'Aire acondicionado', 'Cable TV', 'Estufa'],
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, { timestamps: true });

const AccommodationPost = model('AccommodationPost', accommodationSchema);

export default AccommodationPost;
