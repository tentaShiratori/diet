import { sqliteTable, text, blob } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { decimal } from './scalars';

const ulid = () =>
  blob()
    .primaryKey()
    .$default(() => {
      if (process.env.DRIZZLE === 'true') {
        return '';
      }
      return require('../lib/ulid').ulid();
    });

export const bodyInfos = sqliteTable('bodyInfos', {
  id: ulid(),
  weight: decimal(2)(),
  fatRate: decimal(2)(),
  recordedAt: text('recorded_at').default(sql`CURRENT_TIMESTAMP`),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export type InsertBodyInfo = typeof bodyInfos.$inferInsert;
export type BodyInfo = typeof bodyInfos.$inferSelect;
