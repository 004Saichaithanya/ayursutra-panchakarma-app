import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Car,
  Clock,
  Calendar as CalendarIcon,
  Phone,
  Star,
  Route,
  Bookmark,
  Search,
  Filter,
  Plus,
  ExternalLink
} from 'lucide-react';

/**
 * @param {{ onPageChange: (page: string) => void }} props
 */
export function TransportationAssistance({ onPageChange }) {
  const nearbyPanchakarmaCenters = [
    {
      id: 1,
      name: 'AyurSutra Wellness Center',
      address: '123 MG Road, Bangalore, Karnataka 560001',
      distance: '2.4 km',
      rating: 4.8,
      reviews: 245,
      estimatedTime: '8-12 mins',
      services: ['Abhyanga', 'Shirodhara', 'Panchakarma', 'Yoga Therapy'],
      specialties: ['Stress Management', 'Detox Programs', 'Pain Relief'],
      pricing: '₹₹₹',
      availability: 'Available Today',
      phone: '+91 98765 43210',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      image: '/placeholder-center.jpg',
      isPartner: true
    },
    {
      id: 2,
      name: 'Vedic Healing Center',
      address: '456 Brigade Road, Bangalore, Karnataka 560025',
      distance: '3.8 km',
      rating: 4.6,
      reviews: 189,
      estimatedTime: '12-18 mins',
      services: ['Panchakarma', 'Herbal Treatments', 'Meditation'],
      specialties: ['Digestive Health', 'Immunity Boost', 'Mental Wellness'],
      pricing: '₹₹',
      availability: 'Available Tomorrow',
      phone: '+91 87654 32109',
      coordinates: { lat: 12.9698, lng: 77.6205 },
      image: '/placeholder-center.jpg',
      isPartner: false
    },
    {
      id: 3,
      name: 'Holistic Ayurveda Clinic',
      address: '789 Koramangala, Bangalore, Karnataka 560034',
      distance: '5.2 km',
      rating: 4.7,
      reviews: 156,
      estimatedTime: '15-22 mins',
      services: ['Traditional Panchakarma', 'Abhyanga', 'Marma Therapy'],
      specialties: ['Chronic Conditions', 'Joint Health', 'Skin Disorders'],
      pricing: '₹₹₹₹',
      availability: 'Available Today',
      phone: '+91 76543 21098',
      coordinates: { lat: 12.9279, lng: 77.6271 },
      image: '/placeholder-center.jpg',
      isPartner: true
    }
  ];

  const rideOptions = [
    {
      id: 'uber-comfort',
      provider: 'Uber',
      type: 'Comfort',
      price: '₹180-220',
      estimatedTime: '8 mins',
      capacity: '4 seats',
      features: ['AC', 'Premium cars', 'Top-rated drivers'],
      icon: '🚗',
      color: 'bg-black text-white'
    },
    {
      id: 'ola-prime',
      provider: 'Ola',
      type: 'Prime',
      price: '₹160-200',
      estimatedTime: '10 mins',
      capacity: '4 seats',
      features: ['AC', 'Sedan cars', 'Professional drivers'],
      icon: '🚙',
      color: 'bg-green-600 text-white'
    },
    {
      id: 'auto',
      provider: 'Auto Rickshaw',
      type: 'Local',
      price: '₹80-120',
      estimatedTime: '12 mins',
      capacity: '3 seats',
      features: ['Local transport', 'Budget-friendly', 'Quick rides'],
      icon: '🛺',
      color: 'bg-yellow-500 text-white'
    }
  ];

  const [selectedCenter, setSelectedCenter] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = React.useState('');
  const [searchLocation, setSearchLocation] = React.useState('');
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [selectedRide, setSelectedRide] = React.useState(null);
  const [pickupLocation, setPickupLocation] = React.useState('Current Location');
  const [therapyType, setTherapyType] = React.useState('');

  const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

  const handleBookAppointment = (center) => {
    setSelectedCenter(center);
    setIsBookingOpen(true);
  };

  const handleBookRide = (center, rideOption) => {
    console.log('Booking ride:', { center: center.name, ride: rideOption, pickup: pickupLocation });
    alert(`Booking ${rideOption.provider} ${rideOption.type} to ${center.name}...`);
  };

  const handleConfirmBooking = () => {
    console.log('Confirming appointment:', {
      center: selectedCenter?.name,
      date: selectedDate,
      time: selectedTime,
      therapy: therapyType
    });
    setIsBookingOpen(false);
    alert('Appointment booking confirmed! A confirmation will be sent shortly.');
  };

  const formatDate = (date) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900 mb-2">Transportation Assistance</h1>
            <p className="text-emerald-600">Find nearby centers and book your ride</p>
          </div>
          <Button
            onClick={() => onPageChange('patient-dashboard')}
            variant="outline"
            className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Search */}
        <Card className="bg-white/90 backdrop-blur-sm border-emerald-200 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 lg:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by location or area..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                  <Navigation className="w-4 h-4 mr-2" />
                  Use Current Location
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map placeholder */}
        <Card className="bg-white/90 backdrop-blur-sm border-emerald-200 mb-6">
          <CardHeader>
            <CardTitle className="text-emerald-900 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Nearby Panchakarma Centers
            </CardTitle>
            <CardDescription>Centers within 10km of your location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Interactive Map</h3>
                <p className="text-gray-500">Map showing nearby Panchakarma centers</p>
                <p className="text-sm text-gray-400 mt-2">Integration with Google Maps API</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Centers list */}
        <div className="grid grid-cols-1 gap-6">
          {nearbyPanchakarmaCenters.map((center) => (
            <Card key={center.id} className="bg-white/90 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
                  {/* Image placeholder */}
                  <div className="w-full lg:w-48 h-32 bg-gray-200 rounded-lg mb-4 lg:mb-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-500">Center Image</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-medium text-gray-900">{center.name}</h3>
                          {center.isPartner && (
                            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200" variant="outline">
                              Partner
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{center.address}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Navigation className="w-4 h-4" />
                            <span>{center.distance}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{center.estimatedTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>
                              {center.rating} ({center.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{center.pricing}</p>
                        <Badge
                          className={center.availability === 'Available Today' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                          variant="outline"
                        >
                          {center.availability}
                        </Badge>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {center.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-2">
                        {center.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button onClick={() => handleBookAppointment(center)} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Button>

                      <div className="flex space-x-2">
                        {rideOptions.slice(0, 2).map((ride) => (
                          <Button
                            key={ride.id}
                            onClick={() => handleBookRide(center, ride)}
                            variant="outline"
                            className={`flex-1 ${ride.color}`}
                          >
                            <span className="mr-2">{ride.icon}</span>
                            {ride.provider}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        className="text-blue-600 border-blue-300 hover:bg-blue-50"
                        onClick={() => window.open(`tel:${center.phone}`)}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </div>

                    {/* Ride options */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Available Rides:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {rideOptions.map((ride) => (
                          <div key={ride.id} className="flex items-center justify-between p-3 bg-white rounded border">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{ride.icon}</span>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{ride.provider}</p>
                                <p className="text-xs text-gray-500">{ride.type}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">{ride.price}</p>
                              <p className="text-xs text-gray-500">{ride.estimatedTime}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Booking dialog */}
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Book Appointment - {selectedCenter?.name}</DialogTitle>
            </DialogHeader>

            {selectedCenter && (
              <div className="space-y-6">
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <h3 className="font-medium text-emerald-900 mb-2">{selectedCenter.name}</h3>
                  <p className="text-sm text-emerald-700">{selectedCenter.address}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-emerald-600">
                    <span>{selectedCenter.distance} away</span>
                    <span>•</span>
                    <span>{selectedCenter.estimatedTime} travel time</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left mt-2">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formatDate(selectedDate)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>Select Time</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choose time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'].map(
                          (time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Therapy Type</Label>
                  <Select value={therapyType} onValueChange={setTherapyType}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select therapy type" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCenter.services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Pickup Location for Ride</Label>
                  <Select value={pickupLocation} onValueChange={setPickupLocation}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Location</SelectItem>
                      <SelectItem value="home">Home Address</SelectItem>
                      <SelectItem value="office">Office Address</SelectItem>
                      <SelectItem value="custom">Custom Location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Transportation Options</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {rideOptions.map((ride) => (
                      <div key={ride.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{ride.icon}</span>
                          <div>
                            <p className="font-medium text-gray-900">
                              {ride.provider} {ride.type}
                            </p>
                            <p className="text-sm text-gray-600">{ride.features.join(' • ')}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{ride.price}</p>
                          <p className="text-sm text-gray-600">{ride.estimatedTime}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={handleConfirmBooking}
                    disabled={!selectedDate || !selectedTime || !therapyType}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  >
                    Confirm Booking
                  </Button>
                  <Button variant="outline" onClick={() => setIsBookingOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
