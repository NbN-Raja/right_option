const multer = require('multer');


// const profileStorage = multer.diskStorage({
//   destination: './public/uploads/profile', // Make sure this directory exists
//   filename: function(req, file, cb){
//     cb(null, 'avatar-' + new Date().toISOString().replace(/:/g, '-') + file.originalname);
//   }
// });
const memoryStorage = multer.memoryStorage();

const countryUpload = multer({ storage: memoryStorage });
const CoursesUpload = multer({ storage: memoryStorage });
const ServiceUpload = multer({ storage: memoryStorage });
const BlogImage = multer({ storage: memoryStorage });
const BlogBannerImage = multer({ storage: memoryStorage });
const TestimonialImage = multer({ storage: memoryStorage });
const PartnerImage = multer({ storage: memoryStorage });
const TeamsImage = multer({ storage: memoryStorage });
const Faqs = multer({ storage: memoryStorage });
const SuccessImage= multer({ storage : memoryStorage })
const SliderImage= multer({ storage : memoryStorage })
const PagesImage= multer({ storage : memoryStorage })
const SocialImage= multer({ storage : memoryStorage })
const ContactImage= multer({ storage : memoryStorage })




const uploadcover = multer({ storage: memoryStorage });

module.exports = { countryUpload,uploadcover,CoursesUpload,ServiceUpload,BlogImage, BlogBannerImage ,TestimonialImage,PartnerImage,TeamsImage,Faqs,SuccessImage,SliderImage,PagesImage,SocialImage,ContactImage };