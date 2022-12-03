export class ExportData {
    constructor(
        public Recipient_name?: string,
        public RUT?: string,
        public Bank?: string,
        public Account_type?: string,
        public Amount?: string,
        public Transaction_date?:string) { }
}