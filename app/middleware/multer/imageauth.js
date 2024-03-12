const multer = require('multer');

const memoryStorage = multer.memoryStorage();

const maxSize = 1024 * 1024; // 1 MB

const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true); 
    } else {
        cb(new Error('Invalid file type. Only JPEG, JPG, and PNG files are allowed.'), false); 
    }
};

const uploadConfig = {
    storage: memoryStorage,
    limits: { fileSize: maxSize }, 
    fileFilter: fileFilter 
};

const countryUpload = multer(uploadConfig);
const CoursesUpload = multer(uploadConfig);
const ServiceUpload = multer(uploadConfig);
const BlogImage = multer(uploadConfig);
const BlogBannerImage = multer(uploadConfig);
const TestimonialImage = multer(uploadConfig);
const PartnerImage = multer(uploadConfig);
const TeamsImage = multer(uploadConfig);
const Faqs = multer(uploadConfig);
const SuccessImage = multer(uploadConfig);
const SliderImage = multer(uploadConfig);
const PagesImage = multer(uploadConfig);
const SocialImage = multer(uploadConfig);
const ContactImage = multer(uploadConfig);

const uploadcover = multer(uploadConfig);

module.exports = { countryUpload, uploadcover, CoursesUpload, ServiceUpload, BlogImage, BlogBannerImage, TestimonialImage, PartnerImage, TeamsImage, Faqs, SuccessImage, SliderImage, PagesImage, SocialImage, ContactImage };
