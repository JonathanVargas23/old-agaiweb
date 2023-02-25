import { Banners, Slides } from 'src/app/interfaces/interfaces';

export const ALLIES = [
  'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/landing/aliados/OMICRON-Logo.png',
  'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/landing/aliados/terr%40l-Logo.png',
  'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/landing/aliados/Logo%20citricauca.png',
  'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/landing/aliados/PAIS-21-Logo-Horizontal-(1).png',
  'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/landing/aliados/0.%20Logo%20Fundacioi%CC%80n%20ANDI%202019%20-%20Color.png',
  'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/landing/aliados/Logo-mundo-lacteo.png',
];

// export const BANNERS: Banners[] = [
//   {
//     img: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/landing/banners/Banner-Landing-200.000-productores.jpg',
//     redirect: '',
//     lang: 'es'
//   },
//   {
//     img: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/landing/banners/Banner-landing1-2022-contacto.jpg',
//     redirect: 'https://agrodatai.com/#/home?contact=true',
//     lang: 'es'
//   },
//   {
//     img: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/landing/banners/Caso-de-%C3%A9xito-Google-LANDING.jpg',
//     redirect: 'https://cloud.google.com/customers/agrodatai/',
//     lang: 'es'
//   },
//   {
//     img: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/landing/banners/Banner-MADR.jpg',
//     redirect: '',
//     lang: 'es'
//   },
//   {
//     img: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/landing/banners/Banner-Landing-200-EN.jpg',
//     redirect: '',
//     lang: 'en'
//   },
//   {
//     img: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/landing/banners/Exito-Google--INGLES-LANDING.jpg',
//     redirect: 'https://cloud.google.com/customers/agrodatai/',
//     lang: 'en'
//   },
// ];

export const SLIDE_OPTIONS = {
  autoplay: true,
  autoplaySpeed: 3000,
  autoplayHoverPause: true,
  touchDrag: false,
  mouseDrag: false,
  // center: true,
  dots: true,
  loop: true,
  margin: 0,
  responsiveClass: true,
  lazyLoad:true,
  responsive: {
    0: {
      items: 1,
    },
  },
};

export const SLIDE_OPTIONS2 = {
  dots: true,
  loop: true,
  margin: 0,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
    },
  },
};

export const SLIDES: Slides[] = [
  {
    img: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/modulos%2Bcomputador.png',
    item: 'home.slides.section1.item',
    title: 'home.slides.section1.title',
    description: 'home.slides.section1.description'
  },
  {
    img: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/modulos%2Bcomputador2.png',
    item: 'home.slides.section2.item',
    title: 'home.slides.section2.title',
    description: 'home.slides.section2.description'
  },
];
