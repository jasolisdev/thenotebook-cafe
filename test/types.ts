export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: 'Coffee' | 'Bakery' | 'Specialty';
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  role: string;
}
