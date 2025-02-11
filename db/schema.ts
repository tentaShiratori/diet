import { sqliteTable, text, blob } from 'drizzle-orm/sqlite-core';
import { weight } from './scalars';
import { sql } from 'drizzle-orm';

export const weights = sqliteTable('weights', {
  id: blob()
    .primaryKey()
    .$default(() => {
      // drizzle-kitがlib/ulidのexpo-cryptoの中でesmを使っているせいでエラーを起すので分岐する
      if (process.env.DRIZZLE === 'true') {
        return '';
      }
      return require('../lib/ulid').ulid();
    }),
  weight: weight().notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export type InsertWeight = typeof weights.$inferInsert;
export type Weight = typeof weights.$inferSelect;
