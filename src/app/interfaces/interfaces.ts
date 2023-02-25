
export interface ContactForm {
  to: string,
  subject: string,
  answer_to: string,
  content: string,
}

export interface ResponseNews {
  next_page: string;
  previous_page?: any;
  max_pages: number;
  rows: News[];
  total_rows: string;
  search: Search;
}

interface Search {
}

export interface News {
  code: string;
  title: string;
  image: string;
  content: string;
  tag: string;
  date_published: string;
  date_record: string;
  source: string;
}

export interface Slides {
  img: string;
  item: string;
  title: string;
  description: string;
}

export interface Banners {
  img: string;
  redirect: string;
  lang?: 'es' | 'en'
}
export interface SubscribeForm {
  email: string,
}