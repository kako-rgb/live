import numeral from 'numeral';
import imageCompression, { Options } from 'browser-image-compression';

function result(format?: any, key = '.00') {
    const isInteger = format.includes(key);
  
    return isInteger ? format.replace(key, '') : format;
}
  
export function fData(number: number) {
    const format = number ? numeral(number).format('0.0 b') : '';
    return result(format, '.0');
};

export function randomString (length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export const compressImageHandler = async (file: File) => {
    const compressOptions: Options = {
      maxSizeMB:  0.5,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    const smallSizeDocument = await imageCompression(file, compressOptions);
    return smallSizeDocument;
}

export const CATEGORIES = [
    { name: 'Electronics', slug: 'electronics', image: '/icons/electronics.png' },
    { name: 'Fashion', slug: 'fashion', image: '/icons/fashion.png' },
    { name: 'Home & Kitchen', slug: 'home-and-kitchen', image: '/icons/kitchen.png' },
    { name: 'Beauty', slug: 'beauty', image: '/icons/beauty.png' },
]

export const VENDORS = [
    {
        _id: 'vendor_1',
        name: 'Vendor 1',
        slug: 'vendor-1',
        category: 'Electronics',
        image: '/images/banner-one.jpg',
        coverImage: '/images/banner-two.jpg',
        rating: 4.5,
        products: 250,
        services: 150,
    },
    {
        _id: 'vendor_2',
        name: 'Vendor 2',
        slug: 'vendor-2',
        category: 'Electronics',
        image: '/images/banner-one.jpg',
        coverImage: '/images/banner-two.jpg',
        rating: 4.5,
        products: 250,
        services: 150,
    },
    {
        _id: 'vendor_3',
        name: 'Vendor 3',
        slug: 'vendor-3',
        category: 'Electronics',
        image: '/images/banner-one.jpg',
        coverImage: '/images/banner-two.jpg',
        rating: 4.5,
        products: 250,
        services: 150,
    }

]

export const PRODUCTS = [
    {
        _id: '1',
        name: 'Featured Product 1',
        slug: 'featured-product-1',
        rating: 3.5,
        reviews: 250,
        vendor: VENDORS[0],
        price: 200,
        discountPrice: 150,
        image: '/images/product-1.jpg'
    },
    {
        _id: '2',
        name: 'Featured Product 2',
        slug: 'featured-product-2',
        rating: 3.5,
        reviews: 250,
        vendor: VENDORS[1],
        price: 200,
        discountPrice: 150,
        image: '/images/product-2.jpg'
    },
    {
        _id: '3',
        name: 'Featured Product 3',
        slug: 'featured-product-3',
        rating: 3.5,
        reviews: 250,
        vendor: VENDORS[2],
        price: 200,
        discountPrice: 150,
        image: '/images/product-3.jpg'
    },
    {
        _id: '4',
        name: 'Featured Product 4',
        slug: 'featured-product-4',
        rating: 3.5,
        reviews: 250,
        vendor: VENDORS[0],
        price: 200,
        discountPrice: 0,
        image: '/images/product-4.jpg'
    },
    {
        _id: '5',
        name: 'Featured Product 5',
        slug: 'featured-product-5',
        rating: 3.5,
        reviews: 250,
        vendor: VENDORS[0],
        price: 200,
        discountPrice: 150,
        image: '/images/product-5.jpg'
    },
    {
        _id: '6',
        name: 'Featured Product 6',
        slug: 'featured-product-6',
        rating: 3.5,
        reviews: 250,
        vendor: VENDORS[1],
        price: 200,
        discountPrice: 150,
        image: '/images/product-6.jpg'
    },
    {
        _id: '7',
        name: 'Featured Product 7',
        slug: 'featured-product-7',
        rating: 3.5,
        reviews: 250,
        vendor: VENDORS[2],
        price: 200,
        discountPrice: 150,
        image: '/images/product-7.jpg'
    },
    {
        _id: '8',
        name: 'Featured Product 8',
        slug: 'featured-product-8',
        rating: 3.5,
        reviews: 250,
        vendor: VENDORS[0],
        price: 200,
        discountPrice: 0,
        image: '/images/product-1.jpg'
    },
]

export const SERVICES = [
    {
        _id: '1',
        name: 'Featured Service 1',
        slug: 'featured-service-1',
        rating: 3.5,
        reviews: 250,
        vendor: VENDORS[0],
        price: 200,
        discountPrice: 150,
        priceFrequency: 'hr',
        location: 'Nairobi',
        image: '/images/product-1.jpg'
    },
    {
        _id: '2',
        name: 'Featured Service 2',
        slug: 'featured-service-2',
        rating: 3.5,
        reviews: 250,
        vendor: VENDORS[1],
        price: 200,
        discountPrice: 150,
        priceFrequency: 'hr',
        location: 'Nairobi',
        image: '/images/product-2.jpg'
    },
    {
        _id: '3',
        name: 'Featured Service 3',
        slug: 'featured-service-3',
        rating: 3.5,
        reviews: 250,
        vendor: VENDORS[2],
        price: 200,
        discountPrice: 150,
        priceFrequency: 'hr',
        location: 'Nairobi',
        image: '/images/product-3.jpg'
    },
    {
        _id: '4',
        name: 'Featured Service 4',
        slug: 'featured-service-4',
        rating: 3.5,
        reviews: 250,
        vendor: VENDORS[0],
        price: 200,
        discountPrice: 150,
        priceFrequency: 'hr',
        location: 'Nairobi',
        image: '/images/product-4.jpg'
    },
    {
        _id: '5',
        name: 'Featured Service 5',
        slug: 'featured-service-5',
        rating: 3.5,
        reviews: 250,
        vendor: VENDORS[0],
        price: 200,
        discountPrice: 150,
        priceFrequency: 'hr',
        location: 'Nairobi',
        image: '/images/product-5.jpg'
    },
    {
        _id: '6',
        name: 'Featured Service 5',
        slug: 'featured-service-5',
        rating: 3.5,
        reviews: 250,
        vendor: VENDORS[1],
        price: 200,
        discountPrice: 150,
        priceFrequency: 'hr',
        location: 'Nairobi',
        image: '/images/product-6.jpg'
    },
]