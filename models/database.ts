import { ReceiptTable } from "./Receipt";
import { ItemTable } from "./Item";

export interface Database {
    receipt: ReceiptTable
    item: ItemTable
}