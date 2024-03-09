const multer = require('multer');

const memoryStorage = multer.memoryStorage();

const maxSize = 1024 * 1024; // 1 MB

// File filter function to accept only jpeg, jpg, and png files
const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Invalid file type. Only JPEG, JPG, and PNG files are allowed.'), false); // Reject file
    }
};

const uploadConfig = {
    storage: memoryStorage,
    limits: { fileSize: maxSize }, // Maximum upload size
    fileFilter: fileFilter // Only accept specified file types
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
