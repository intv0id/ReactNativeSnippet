import Immutable from "immutable";

export class Transaction {
    constructor(
        public amount: number = 0,
        public currency: Currencies = Currencies.EURO,
        public pi: PaymentInstrument = PaymentInstrument.CREDITCARD,
        public type: Reason = Reason.UNKNOWN,
    ) { }

    clone(){ 
        return new Transaction(this.amount, this.currency, this.pi, this.type);
    }
}

export type TransactionsStore = Immutable.Map<string, Transaction>;

export enum Currencies {
    EURO = "€",
    POUND = "£",
    F_FRANC = "F",
    CH_FRANC = "CHF",
    DOLLAR = "$",
}

export enum Reason {
    FOOD = "ALIMENTAIRE",
    HOUSING = "LOGEMENT",
    ENERGY = "ENERGIE",
    HOBBIES = "LOISIRS",
    UNKNOWN = "AUTRES"
}

export const ReasonEmoji = new Map<Reason, string>([
    [Reason.FOOD, "🍔"],
    [Reason.HOUSING, "🏡"],
    [Reason.ENERGY, "🔥"],
    [Reason.HOBBIES, "🎵"],
    [Reason.UNKNOWN, "❓"],
])

export enum PaymentInstrument {
    CASH = "LIQUIDE",
    CHECK = "CHEQUE",
    CREDITCARD = "CARTE BLEUE",
    TRANSFER = "VIREMENT",
}

export const PIEmoji = new Map<PaymentInstrument, string>([
    [PaymentInstrument.CASH, "💶"],
    [PaymentInstrument.CHECK, "📎"],
    [PaymentInstrument.TRANSFER, "🏦"],
    [PaymentInstrument.CREDITCARD, "💳"],
])