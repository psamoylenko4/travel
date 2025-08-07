import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Star, 
  Heart,
  Share2,
  Car,
  Home,
  Utensils,
  ArrowLeft,
  MessageCircle,
  Shield
} from 'lucide-react';
import { Tour, User } from '../types';
import { useAuth } from '../context/AuthContext';

interface TourDetailPageProps {
  tour: Tour;
  onBack: () => void;
}

const TourDetailPage: React.FC<TourDetailPageProps> = ({ tour, onBack }) => {
  const { user } = useAuth();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinMessage, setJoinMessage] = useState('');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Легкий';
      case 'medium': return 'Средний';
      case 'hard': return 'Сложный';
      default: return difficulty;
    }
  };

  const mockParticipants: User[] = [
    {
      id: '1',
      name: 'Анна Петрова',
      email: 'anna@example.com',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.8,
      reviewsCount: 23,
      location: 'Москва',
      joinedDate: '2023-01-15',
      verified: true
    },
    {
      id: '2',
      name: 'Михаил Иванов',
      email: 'michael@example.com',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.6,
      reviewsCount: 18,
      location: 'Санкт-Петербург',
      joinedDate: '2022-08-22',
      verified: true
    }
  ];

  const handleJoinTour = () => {
    if (!user) {
      alert('Для участия в туре необходимо войти в аккаунт');
      return;
    }
    setShowJoinModal(true);
  };

  const submitJoinRequest = () => {
    // Здесь была бы логика отправки заявки
    alert('Заявка на участие отправлена!');
    setShowJoinModal(false);
    setJoinMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Назад к турам
        </button>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
            <Heart className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-blue-500 transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-96">
        <div className="lg:col-span-2">
          <img
            src={tour.images[activeImageIndex]}
            alt={tour.title}
            className="w-full h-full object-cover rounded-xl"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800';
            }}
          />
        </div>
        <div className="hidden lg:flex flex-col gap-4">
          {tour.images.slice(1).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${tour.title} ${index + 2}`}
              onClick={() => setActiveImageIndex(index + 1)}
              className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800';
              }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title and Basic Info */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl font-bold text-gray-900">{tour.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(tour.difficulty)}`}>
                {getDifficultyText(tour.difficulty)}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{tour.destination}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  {new Date(tour.startDate).toLocaleDateString('ru-RU')} - {new Date(tour.endDate).toLocaleDateString('ru-RU')}
                </span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{tour.currentParticipants}/{tour.maxParticipants} участников</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {tour.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Описание</h2>
            <p className="text-gray-700 leading-relaxed">{tour.description}</p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Car className="h-5 w-5 mr-2" />
                Транспорт
              </h3>
              <ul className="space-y-1">
                {tour.transport.map((item, index) => (
                  <li key={index} className="text-gray-700 capitalize">{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Home className="h-5 w-5 mr-2" />
                Проживание
              </h3>
              <ul className="space-y-1">
                {tour.accommodation.map((item, index) => (
                  <li key={index} className="text-gray-700 capitalize">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Meals */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Utensils className="h-5 w-5 mr-2" />
              Питание
            </h3>
            <p className="text-gray-700">
              {tour.meals ? 'Питание включено в стоимость' : 'Питание не включено'}
            </p>
          </div>

          {/* Participants */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Участники ({mockParticipants.length})
            </h3>
            <div className="space-y-3">
              {mockParticipants.map((participant) => (
                <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <img
                      src={participant.avatar}
                      alt={participant.name}
                      className="h-10 w-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium text-gray-900">{participant.name}</h4>
                        {participant.verified && (
                          <Shield className="h-4 w-4 text-blue-500 ml-1" />
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        <span>{participant.rating}</span>
                        <span className="mx-1">•</span>
                        <span>{participant.location}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price and Join */}
          <div className="bg-white p-6 rounded-xl shadow-sm border sticky top-24">
            <div className="text-center mb-4">
              <p className="text-3xl font-bold text-gray-900">
                {tour.price.toLocaleString()} ₽
              </p>
              <p className="text-gray-600">на человека</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Свободных мест:</span>
                <span className="font-medium">
                  {tour.maxParticipants - tour.currentParticipants}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Дней:</span>
                <span className="font-medium">
                  {Math.ceil((new Date(tour.endDate).getTime() - new Date(tour.startDate).getTime()) / (1000 * 60 * 60 * 24))}
                </span>
              </div>
            </div>

            <button
              onClick={handleJoinTour}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Присоединиться к туру
            </button>
            
            <button className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Написать организатору
            </button>
          </div>

          {/* Organizer */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Организатор</h3>
            <div className="flex items-center mb-4">
              <img
                src={tour.organizer.avatar}
                alt={tour.organizer.name}
                className="h-12 w-12 rounded-full object-cover mr-3"
              />
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium text-gray-900">{tour.organizer.name}</h4>
                  {tour.organizer.verified && (
                    <Shield className="h-4 w-4 text-blue-500 ml-1" />
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="h-3 w-3 text-yellow-400 mr-1" />
                  <span>{tour.organizer.rating}</span>
                  <span className="mx-1">•</span>
                  <span>{tour.organizer.reviewsCount} отзывов</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 text-sm mb-4">{tour.organizer.bio}</p>
            
            <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Посмотреть профиль
            </button>
          </div>
        </div>
      </div>

      {/* Join Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowJoinModal(false)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Заявка на участие
            </h3>
            <p className="text-gray-600 mb-4">
              Расскажите организатору о себе и почему хотите присоединиться к этому туру.
            </p>
            <textarea
              value={joinMessage}
              onChange={(e) => setJoinMessage(e.target.value)}
              placeholder="Ваше сообщение..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setShowJoinModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                onClick={submitJoinRequest}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Отправить заявку
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetailPage;