export type CATEGORY = {
    _id: string
    name: string,
    slug: string,
    type: string,
    image?: string,
    description?: string,
    featured?: boolean
}

type MEDIA = {
    ref?: string,
    link?: string
}

export type ATTRIBUTE = {
    name: string,
    values: string[]
}

export type STORE = {
   logo: {
        ref?: string,
        link?: string
    },
    banner: {
        ref?: string,
        link?: string
    },
    business: {
        socials?: {
            url?: string,
            instagram?: string,
            facebook?: string,
            twitter?: string,
            linkedin?: string,
            youtube?: string,
            tiktok?: string
        },
        name: string,
        type: string,
        address?: string,
        registrationNumber?: string,
        category?: string,
        description?: string
    },
    rating?: number,
    _id: string,
    name: string,
    slug: string,
    createdAt: Date,
    description?: string,
    policy?: string,
    returnPolicy?: string,
    shippingPolicy?: string
}

export type PRODUCT = {
    _id: string,
    name: string,
    slug: string,
    shipping: {
        weight?: number,
        length: number,
        width: number,
        height: number
    },
    rating: number,
    likes: string[],
    store: STORE
    category?: CATEGORY
    description?: string,
    media: MEDIA[],
    sku?: string,
    stock?: number,
    price: number,
    discountPrice: number,
    attributes: ATTRIBUTE[],
    views?: number,
    createdAt: Date,
}

export type SERVICE = {
    _id: string,
    name: string,
    slug: string,
    store: STORE,
    pricing: {
        type: string,
        price: number,
        discountPrice: number,
        duration?: number
    },
    rating?: number,
    likes: string[],
    category?: CATEGORY,
    description?: string,
    media: MEDIA[],
    availability?: string[],
    clientRequirements?: string[],
    views?: number,
    createdAt: Date,
}

export const SERVICE_PRICING_TYPE_ENUMS = [
    { name: 'Hourly Rate', symbol: 'hr' },
    { name: 'Daily Rate', symbol: 'day' },
    { name: 'Monthly Rate', symbol: 'month' },
    { name: 'Yearly Rate', symbol: 'year' },
    { name: 'Fixed Rate', symbol: 'fixed' },
    { name: 'Starting From', symbol: 'starting-from' },
    { name: 'Quote Based', symbol: 'custom' }
]

export type ROLE = 'Admin' | 'Vendor' | 'Customer'

export type USER = {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone?: string,
    role: ROLE,
    createdAt: Date
}

export type CART_ITEM = {
    product: PRODUCT,
    quantity: number
}

export type CART = CART_ITEM[];

export type ORDER_PRODUCT = {
    product: PRODUCT,
    price: number,
    quantity: number,
}

export type ORDER = {
    _id: string,
    number: string,
    price: {
        original: number,
        current: number,
    },
    products: ORDER_PRODUCT[],
    customer: {
        name: string,
        email: string,
        phone: string,
        address: string
    },
    customerId?: USER,
    stores: STORE[],
    createdAt: Date
}