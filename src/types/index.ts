
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  type: 'Single' | 'Double' | 'Triple' | 'Four-sharing';
  pricePerMonth: number;
  availability: 'Available' | 'Booked';
  image: string;
  features?: string[];
  description?: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface BookingFormData {
  fullName: string;
  age: number;
  occupation: string;
  native: string;
  phoneNumber: string;
  email: string;
  numberOfSharing: '1' | '2' | '3' | '4';
  advancePaid: number;
  roomId?: string;
}
