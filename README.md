# timesheet-to-invoice

Convert Harvest timesheets to Freshbooks Invoices

## Running

This project features an OAUTH login server for Freshbooks. To use this you must run the server on a public IP:

```console
cd freshbooks-oauth-api
npm install
npm run dev
```

Then, you can:

1. pull timesheet from Harvest, and
2. create invoices in Freshbooks

```console
cd harvest2freshbooks
# pull timesheet data from Harvest
npm run gettimesheets
# create invoices in Freshbooks
npm run createinvoices
```
