export type Book = {
  // Câmpuri transformate / finale
  id: string; // Transformat din bookId (number)
  priceDisplay: string; // Transformat din price (number)
  imageSrc: string; // Transformat din imageUrl

  // Câmpuri copiate (dar pot fi redenumite)
  title: string;
  author: string;
  popular: boolean;
  recentlyAdded: boolean;
  description: string;
  
  // Câmpuri adăugate în frontend (nu vin de la API)
  imageAlt: string; 
};