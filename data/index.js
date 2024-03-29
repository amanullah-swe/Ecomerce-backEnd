const products = [
    {
        title: 'iPhone X',
        description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
        price: 899,
        discountPercentage: 17.94,
        rating: 4.44,
        stock: 34,
        brand: 'Apple',
        category: 'smartphones',
        thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
        images:
            ['https://i.dummyjson.com/data/products/2/1.jpg',
                'https://i.dummyjson.com/data/products/2/2.jpg',
                'https://i.dummyjson.com/data/products/2/3.jpg',
                'https://i.dummyjson.com/data/products/2/thumbnail.jpg']
    },
    {
        title: 'Samsung Universe 9',
        description: 'Samsung\'s new variant which goes beyond Galaxy to the Universe',
        price: 1249,
        discountPercentage: 15.46,
        rating: 4.09,
        stock: 36,
        brand: 'Samsung',
        category: 'smartphones',
        thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
        images: ['https://i.dummyjson.com/data/products/3/1.jpg']
    },
    {
        title: 'OPPOF19',
        description: 'OPPO F19 is officially announced on April 2021.',
        price: 280,
        discountPercentage: 17.91,
        rating: 4.3,
        stock: 123,
        brand: 'OPPO',
        category: 'smartphones',
        thumbnail: 'https://i.dummyjson.com/data/products/4/thumbnail.jpg',
        images:
            ['https://i.dummyjson.com/data/products/4/1.jpg',
                'https://i.dummyjson.com/data/products/4/2.jpg',
                'https://i.dummyjson.com/data/products/4/3.jpg',
                'https://i.dummyjson.com/data/products/4/4.jpg',
                'https://i.dummyjson.com/data/products/4/thumbnail.jpg']
    },
    {
        title: 'Huawei P30',
        description: 'Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.',
        price: 499,
        discountPercentage: 10.58,
        rating: 4.09,
        stock: 32,
        brand: 'Huawei',
        category: 'smartphones',
        thumbnail: 'https://i.dummyjson.com/data/products/5/thumbnail.jpg',
        images:
            ['https://i.dummyjson.com/data/products/5/1.jpg',
                'https://i.dummyjson.com/data/products/5/2.jpg',
                'https://i.dummyjson.com/data/products/5/3.jpg']
    },
    {
        title: 'MacBook Pro',
        description: 'MacBook Pro 2021 with mini-LED display may launch between September, November',
        price: 1749,
        discountPercentage: 11.02,
        rating: 4.57,
        stock: 83,
        brand: 'Apple',
        category: 'laptops',
        thumbnail: 'https://i.dummyjson.com/data/products/6/thumbnail.png',
        images:
            ['https://i.dummyjson.com/data/products/6/1.png',
                'https://i.dummyjson.com/data/products/6/2.jpg',
                'https://i.dummyjson.com/data/products/6/3.png',
                'https://i.dummyjson.com/data/products/6/4.jpg']
    },
    {
        title: 'Samsung Galaxy Book',
        description: 'Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched',
        price: 1499,
        discountPercentage: 4.15,
        rating: 4.25,
        stock: 50,
        brand: 'Samsung',
        category: 'laptops',
        thumbnail: 'https://i.dummyjson.com/data/products/7/thumbnail.jpg',
        images:
            ['https://i.dummyjson.com/data/products/7/1.jpg',
                'https://i.dummyjson.com/data/products/7/2.jpg',
                'https://i.dummyjson.com/data/products/7/3.jpg',
                'https://i.dummyjson.com/data/products/7/thumbnail.jpg']
    },
    {
        title: 'Microsoft Surface Laptop 4',
        description: 'Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.',
        price: 1499,
        discountPercentage: 10.23,
        rating: 4.43,
        stock: 68,
        brand: 'Microsoft Surface',
        category: 'laptops',
        thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
        images:
            ['https://i.dummyjson.com/data/products/8/1.jpg',
                'https://i.dummyjson.com/data/products/8/2.jpg',
                'https://i.dummyjson.com/data/products/8/3.jpg',
                'https://i.dummyjson.com/data/products/8/4.jpg',
                'https://i.dummyjson.com/data/products/8/thumbnail.jpg']
    },
    {
        title: 'Infinix INBOOK',
        description: 'Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty',
        price: 1099,
        discountPercentage: 11.83,
        rating: 4.54,
        stock: 96,
        brand: 'Infinix',
        category: 'laptops',
        thumbnail: 'https://i.dummyjson.com/data/products/9/thumbnail.jpg',
        images:
            ['https://i.dummyjson.com/data/products/9/1.jpg',
                'https://i.dummyjson.com/data/products/9/2.png',
                'https://i.dummyjson.com/data/products/9/3.png',
                'https://i.dummyjson.com/data/products/9/4.jpg',
                'https://i.dummyjson.com/data/products/9/thumbnail.jpg']
    },
    {
        title: 'HP Pavilion 15-DK1056WM',
        description: 'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10',
        price: 1099,
        discountPercentage: 6.18,
        rating: 4.43,
        stock: 89,
        brand: 'HP Pavilion',
        category: 'laptops',
        thumbnail: 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg',
        images:
            ['https://i.dummyjson.com/data/products/10/1.jpg',
                'https://i.dummyjson.com/data/products/10/2.jpg',
                'https://i.dummyjson.com/data/products/10/3.jpg',
                'https://i.dummyjson.com/data/products/10/thumbnail.jpeg']
    },
    {
        title: 'perfume Oil',
        description: 'Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil',
        price: 13,
        discountPercentage: 8.4,
        rating: 4.26,
        stock: 65,
        brand: 'Impression of Acqua Di Gio',
        category: 'fragrances',
        thumbnail: 'https://i.dummyjson.com/data/products/11/thumbnail.jpg',
        images:
            ['https://i.dummyjson.com/data/products/11/1.jpg',
                'https://i.dummyjson.com/data/products/11/2.jpg',
                'https://i.dummyjson.com/data/products/11/3.jpg',
                'https://i.dummyjson.com/data/products/11/thumbnail.jpg']
    },
    {
        title: 'Brown Perfume',
        description: 'Royal_Mirage Sport Brown Perfume for Men & Women - 120ml',
        price: 40,
        discountPercentage: 15.66,
        rating: 4,
        stock: 52,
        brand: 'Royal_Mirage',
        category: 'fragrances',
        thumbnail: 'https://i.dummyjson.com/data/products/12/thumbnail.jpg',
        images:
            ['https://i.dummyjson.com/data/products/12/1.jpg',
                'https://i.dummyjson.com/data/products/12/2.jpg',
                'https://i.dummyjson.com/data/products/12/3.png',
                'https://i.dummyjson.com/data/products/12/4.jpg',
                'https://i.dummyjson.com/data/products/12/thumbnail.jpg']
    },
    {
        title: 'Fog Scent Xpressio Perfume',
        description: 'Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men',
        price: 13,
        discountPercentage: 8.14,
        rating: 4.59,
        stock: 61,
        brand: 'Fog Scent Xpressio',
        category: 'fragrances',
        thumbnail: 'https://i.dummyjson.com/data/products/13/thumbnail.webp',
        images:
            ['https://i.dummyjson.com/data/products/13/1.jpg',
                'https://i.dummyjson.com/data/products/13/2.png',
                'https://i.dummyjson.com/data/products/13/3.jpg',
                'https://i.dummyjson.com/data/products/13/4.jpg',
                'https://i.dummyjson.com/data/products/13/thumbnail.webp']
    }
]



export { products };