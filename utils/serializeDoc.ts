import { Types } from 'mongoose';

const isObjectId = (val: unknown): val is Types.ObjectId => {
  return (
    typeof val === 'object' &&
    val !== null &&
    val.constructor?.name === 'ObjectId' &&
    typeof (val as Types.ObjectId).toString === 'function'
  );
};

const isPlainObject = (val: unknown): val is Record<string, unknown> => {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
};

const isPopulatedSubDoc = (val: unknown): val is { _id: { toString(): string } } => {
  if (!isPlainObject(val)) return false;

  const id = val._id;
  return (
    typeof id === 'object' &&
    id !== null &&
    typeof (id as { toString: unknown }).toString === 'function'
  );
};

export function serializeDoc<T>(doc: T | null): T | null {
  if (!isPlainObject(doc)) return doc;

  const serialized: Record<string, unknown> = {};

  for (const key in doc) {
    const value = doc[key as keyof T];

    if (value === null || value === undefined) {
      serialized[key] = value;
    } else if (isPopulatedSubDoc(value)) {
      serialized[key] = {
        ...value,
        _id: value._id.toString(),
      };
    } else if (value instanceof Date) {
      serialized[key] = value.toISOString();
    } else if (isObjectId(value)) {
      serialized[key] = value.toString();
    } else {
      serialized[key] = value;
    }
  }

  // _id 변환
  if ('_id' in doc && isObjectId((doc as Record<string, unknown>)._id)) {
    serialized._id = ((doc as Record<string, unknown>)._id as Types.ObjectId).toString();
  }

  // createdAt, updatedAt 변환
  if ('createdAt' in doc && (doc as Record<string, unknown>).createdAt instanceof Date) {
    serialized.createdAt = (doc as Record<string, Date>).createdAt.toISOString();
  }

  if ('updatedAt' in doc && (doc as Record<string, unknown>).updatedAt instanceof Date) {
    serialized.updatedAt = (doc as Record<string, Date>).updatedAt.toISOString();
  }

  return serialized as T;
}

export function serializeDocs<T>(docs: T[]): T[] {
  return docs.map((doc) => serializeDoc<T>(doc) as T);
}
