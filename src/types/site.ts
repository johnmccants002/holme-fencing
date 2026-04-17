export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
};

export type GalleryProject = {
  id: string;
  title: string;
  image: string;
  material: string;
  location: string;
  alt: string;
};

export type ContactFormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};
