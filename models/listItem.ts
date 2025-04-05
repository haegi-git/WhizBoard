import { model, models, Schema } from 'mongoose';
import { InferSchemaType } from 'mongoose';

const ListItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 15,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
    },
    tag: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const ListItem = models.ListItem || model('ListItem', ListItemSchema);
export type ListItemDoc = InferSchemaType<typeof ListItemSchema>;
export { ListItem };
