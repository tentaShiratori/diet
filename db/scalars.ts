import { sql } from 'drizzle-orm';
import { customType } from 'drizzle-orm/sqlite-core';

export const ulid = customType<{
  data: string;
}>({
  dataType() {
    return 'blob(16)';
  },
});

/**
 * 小数点以下2桁の重さを表すカスタム型
 */
export const weight = customType<{
  data: number;
  driverData: number;
}>({
  dataType() {
    return 'integer';
  },
  toDriver(value) {
    return Math.floor(value * 100);
  },
  fromDriver(value) {
    return value / 100;
  },
});
