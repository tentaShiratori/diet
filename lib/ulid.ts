import { factory, detectPrng } from 'ulid';
import * as crypto from 'expo-crypto';

export const ulid = factory(detectPrng(false, { crypto }));
