export class Dragon {
  items: Items;
  _metadata: Metadata;
}

interface Items {
  id: number;
  name: string;
  type: string;
  created_at: string;
  slug: string;
  histories: [string]; 
}

interface Metadata {
  id: number;
  name: string;
  type: string;
  created_at: string;
  slug: string;
  histories: [string]; 
} 

 