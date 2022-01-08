const a: number = 1;

interface phone {
  image: string;
  name: string;
  color: Array[string];
  dungluong: Array[string];
  sale: Array[string];
  sku: string;
  category: string;
  description: Array[string];
}

interface extraInfo {
  id(phone): string;
  dungluong: Array[string];
  monitor: string;
}
