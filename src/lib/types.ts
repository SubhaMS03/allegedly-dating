export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'non-binary';
  bio: string;
  interests: string[];
  location: string;
  photos: string[];
  lookingFor: string;
  createdAt: string;
}

export interface Like {
  id: string;
  likerId: string;
  likedId: string;
  createdAt: string;
}
