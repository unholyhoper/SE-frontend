export interface Policy {
    policyNumber: string;
    lifeAssured?: string;
    beneficiary?: string;
    broker?: string;

}

export interface ThirdPartyLegacy {
    fullName?: string;
    nationality?: string;
    address?: string;
    age?: number;
    birthDate?: string;
    gender?: string;
    email?: string;

}

export interface ThirdParty {
    identifier?: number;
    type?: string;
    name?: string;
    nationalIdentifier?: number;
    nationalIdentifierCountry?: string;

    legalAddress: LegalAddress;

    legalEntityShortDesc: LegalEntity

    preferredEmailAddress: PreferredEmailAddress;
}

export interface LegalAddress {
    addressee?: string;
    letterHeader?: string;
    street?: string;
    postalCode?: number;
    town?: string;
    country?: string;
    county?: string;
    houseName?: string;
    startDate?: string;
    endDate?: string;
    legal?: boolean;
    sending?: boolean;
    preferred?: boolean;
    identifier?: number;
}

export interface LegalEntity {
    legalForm?: string;
    tradeRegister?: string;
}

export interface PreferredEmailAddress {
    email?: string;
    identifier?: number;
    mailHeader?: string;
    sending?: boolean;
    preferred?: boolean;
    startDate?: string;
    endDate?: string;
    type?: string;
}
