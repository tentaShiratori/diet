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
 * 小数をIntで保存するカスタムデータ型
 */
export const decimal = (precision: number) =>
  customType<{
    data: number;
    driverData: number;
  }>({
    dataType() {
      return 'integer';
    },
    toDriver(value) {
      return Math.floor(value * 10 ** precision);
    },
    fromDriver(value) {
      return value / 10 ** precision;
    },
  });
