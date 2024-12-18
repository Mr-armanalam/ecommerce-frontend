import { Schema, model, models, Document } from "mongoose";

interface Iorder extends Document {
  line_items: object;
  name: string;
  email: string;
  city: string;
  postalCode: string;
  landmark: string;
  country: string;
  paid: boolean;
}

const OrderSchema = new Schema<Iorder>({
  line_items: Object,
  name: String,
  email: String,
  city: String,
  postalCode: String,
  landmark: String,
  country: String,
  paid: Boolean,
});


export const Order = models.Order || model<Iorder>("Order", OrderSchema);