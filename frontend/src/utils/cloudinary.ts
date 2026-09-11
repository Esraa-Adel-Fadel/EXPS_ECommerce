export const optimizeImage = (url?: string) => {
    if (!url) return "";
  
    if (!url.includes("res.cloudinary.com")) {
      return url;
    }
  
    return url.replace(
      "/upload/",
      "/upload/w_600,h_500,c_fill,q_auto,f_auto/"
    );
  };