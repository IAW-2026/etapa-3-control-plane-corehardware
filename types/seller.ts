export interface Seller {
    id: string
    cuit: string
    name: string
    address: string
    email: string
    phoneNumber: string
    startOfActivities: string
    VATCondition: string
    clerkUserId: string | null
    isDeleted: boolean
}