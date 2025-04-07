
// Types for our assets data
export interface Asset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  previousPrice: number;
  change: number;
  changePercent: number;
  loanToValue: number;
  volume: number;
  marketCap: number;
  category: 'stock' | 'bond' | 'commodity' | 'crypto' | 'forex';
  rating: 'A' | 'B' | 'C' | 'D' | 'N/A';
  riskScore: number;
  liquidity: 'high' | 'medium' | 'low';
  lastUpdated: string;
}

// Mock data for assets
const mockAssets: Asset[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 182.63,
    previousPrice: 178.42,
    change: 4.21,
    changePercent: 2.36,
    loanToValue: 0.8,
    volume: 58921453,
    marketCap: 2850000000000,
    category: 'stock',
    rating: 'A',
    riskScore: 2.1,
    liquidity: 'high',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '2',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 412.65,
    previousPrice: 415.32,
    change: -2.67,
    changePercent: -0.64,
    loanToValue: 0.75,
    volume: 23450123,
    marketCap: 3120000000000,
    category: 'stock',
    rating: 'A',
    riskScore: 2.5,
    liquidity: 'high',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '3',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 178.75,
    previousPrice: 175.43,
    change: 3.32,
    changePercent: 1.89,
    loanToValue: 0.7,
    volume: 36125478,
    marketCap: 1850000000000,
    category: 'stock',
    rating: 'A',
    riskScore: 3.2,
    liquidity: 'high',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '4',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 148.95,
    previousPrice: 149.25,
    change: -0.30,
    changePercent: -0.20,
    loanToValue: 0.72,
    volume: 19827634,
    marketCap: 1920000000000,
    category: 'stock',
    rating: 'A',
    riskScore: 2.8,
    liquidity: 'high',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '5',
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 175.21,
    previousPrice: 180.54,
    change: -5.33,
    changePercent: -2.95,
    loanToValue: 0.6,
    volume: 98654321,
    marketCap: 560000000000,
    category: 'stock',
    rating: 'B',
    riskScore: 4.6,
    liquidity: 'high',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '6',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67542.75,
    previousPrice: 66897.32,
    change: 645.43,
    changePercent: 0.96,
    loanToValue: 0.5,
    volume: 32456789,
    marketCap: 1320000000000,
    category: 'crypto',
    rating: 'B',
    riskScore: 7.8,
    liquidity: 'medium',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '7',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3452.89,
    previousPrice: 3400.12,
    change: 52.77,
    changePercent: 1.55,
    loanToValue: 0.45,
    volume: 18756432,
    marketCap: 425000000000,
    category: 'crypto',
    rating: 'B',
    riskScore: 6.9,
    liquidity: 'medium',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '8',
    symbol: 'US10Y',
    name: 'US 10 Year Treasury',
    price: 98.45,
    previousPrice: 98.37,
    change: 0.08,
    changePercent: 0.08,
    loanToValue: 0.9,
    volume: 287654321,
    marketCap: 0,
    category: 'bond',
    rating: 'A',
    riskScore: 1.2,
    liquidity: 'high',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '9',
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    price: 1.0845,
    previousPrice: 1.0867,
    change: -0.0022,
    changePercent: -0.20,
    loanToValue: 0.85,
    volume: 125436789,
    marketCap: 0,
    category: 'forex',
    rating: 'A',
    riskScore: 2.0,
    liquidity: 'high',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '10',
    symbol: 'GOLD',
    name: 'Gold Futures',
    price: 2321.60,
    previousPrice: 2305.30,
    change: 16.30,
    changePercent: 0.71,
    loanToValue: 0.75,
    volume: 165432789,
    marketCap: 0,
    category: 'commodity',
    rating: 'A',
    riskScore: 3.5,
    liquidity: 'medium',
    lastUpdated: new Date().toISOString(),
  },
];

// Mock service that simulates an API call with a delay
export const fetchAssets = async (): Promise<Asset[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAssets);
    }, 800);
  });
};

export const fetchAssetById = async (id: string): Promise<Asset | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const asset = mockAssets.find(asset => asset.id === id);
      resolve(asset);
    }, 500);
  });
};

export const searchAssets = async (query: string): Promise<Asset[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredAssets = mockAssets.filter(asset => 
        asset.name.toLowerCase().includes(query.toLowerCase()) || 
        asset.symbol.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filteredAssets);
    }, 500);
  });
};

export const fetchAssetsByCategory = async (category: Asset['category']): Promise<Asset[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredAssets = mockAssets.filter(asset => asset.category === category);
      resolve(filteredAssets);
    }, 500);
  });
};
