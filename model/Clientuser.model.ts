import { Schema, model, models, Document } from "mongoose";

interface Address {
  city: string;
  postalCode: string;
  landmark: string;
  country: string;
}

interface IClientUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  image: string;
  emailVerified: boolean;
  address: Address[];
}

const ClientuserSchema = new Schema<IClientUser>({
  name: { type: String},
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, required: true },
  image: { type: String },
  emailVerified: { type: Boolean, default: false },
  address: [
    {
      city: { type: String },
      postalCode: { type: String},
      landmark: { type: String },
      country: { type: String},
    },
  ],
});

export const ClientUser = models.ClientUser || model<IClientUser>("ClientUser", ClientuserSchema);
