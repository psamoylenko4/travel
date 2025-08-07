import { Tour, User, Review } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Анна Петрова',
    email: 'anna@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.8,
    reviewsCount: 23,
    bio: 'Люблю путешествовать по горам и открывать новые места',
    location: 'Москва',
    joinedDate: '2023-01-15',
    verified: true
  },
  {
    id: '2',
    name: 'Дмитрий Сидоров',
    email: 'dmitry@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.6,
    reviewsCount: 18,
    bio: 'Опытный путешественник и фотограф',
    location: 'Санкт-Петербург',
    joinedDate: '2022-08-22',
    verified: true
  }
];

export const mockTours: Tour[] = [
  {
    id: '1',
    title: 'Поход в Карелию: озера и водопады',
    description: 'Незабываемое путешествие по красивейшим местам Карелии. Посетим живописные озера, мощные водопады и насладимся северной природой.',
    destination: 'Карелия, Россия',
    startDate: '2024-06-15',
    endDate: '2024-06-22',
    price: 25000,
    currency: 'RUB',
    maxParticipants: 8,
    currentParticipants: 4,
    organizer: mockUsers[0],
    images: [
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    tags: ['природа', 'пешие походы', 'озера', 'водопады'],
    difficulty: 'medium',
    transport: ['автобус', 'пешком'],
    accommodation: ['палатки', 'гостевые дома'],
    meals: true,
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    title: 'Исследование Алтая: горы и степи',
    description: 'Приключенческий тур по Горному Алтаю с посещением высокогорных озер, древних петроглифов и знакомством с местной культурой.',
    destination: 'Алтай, Россия',
    startDate: '2024-07-10',
    endDate: '2024-07-20',
    price: 45000,
    currency: 'RUB',
    maxParticipants: 12,
    currentParticipants: 7,
    organizer: mockUsers[1],
    images: [
      'https://images.pexels.com/photos/1562058/pexels-photo-1562058.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    tags: ['горы', 'приключения', 'культура', 'фотография'],
    difficulty: 'hard',
    transport: ['внедорожник', 'пешком', 'лошади'],
    accommodation: ['палатки', 'юрты'],
    meals: true,
    createdAt: '2024-01-15'
  },
  {
    id: '3',
    title: 'Байкал зимой: ледяная сказка',
    description: 'Уникальная возможность увидеть замерзшее озеро Байкал, прозрачный лед, ледяные гроты и северное сияние.',
    destination: 'Озеро Байкал, Россия',
    startDate: '2024-02-14',
    endDate: '2024-02-21',
    price: 38000,
    currency: 'RUB',
    maxParticipants: 10,
    currentParticipants: 8,
    organizer: mockUsers[0],
    images: [
      'https://images.pexels.com/photos/1535162/pexels-photo-1535162.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    tags: ['зима', 'лед', 'байкал', 'фотография'],
    difficulty: 'medium',
    transport: ['поезд', 'автобус'],
    accommodation: ['гостиницы', 'турбазы'],
    meals: true,
    createdAt: '2023-12-05'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    author: mockUsers[1],
    targetUser: mockUsers[0],
    tourId: '1',
    rating: 5,
    comment: 'Отличный организатор! Анна продумала все до мелочей, поездка прошла просто замечательно.',
    createdAt: '2024-01-20'
  },
  {
    id: '2',
    author: mockUsers[0],
    targetUser: mockUsers[1],
    tourId: '2',
    rating: 4,
    comment: 'Дмитрий - опытный путешественник, было интересно и безопасно. Рекомендую!',
    createdAt: '2024-01-25'
  }
];