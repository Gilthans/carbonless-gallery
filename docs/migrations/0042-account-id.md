# 0042: user id → account id

Every module now scopes its queries by `accountId` (the billing account)
instead of `userId`. Teams share one account, so a teammate sees the same
invoices, orders and tickets.

- The `*_userId` columns were renamed in migration `0042_account_id.sql`.
- List endpoints now page (`?cursor=`), 50 rows at a time.
- Logs go through pino: `logger.info({ fields }, message)`.
