
import { supabase } from '@/integrations/supabase/client';

interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

interface DividendData {
  symbol: string;
  dividendYield: number;
  annualDividend: number;
  frequency: string;
}

export class StockDataService {
  static async fetchStockQuote(symbol: string): Promise<StockQuote> {
    try {
      console.log(`Fetching stock quote for ${symbol}...`);
      const { data, error } = await supabase.functions.invoke('fetch-stock-data', {
        body: { symbols: [symbol] }
      });

      if (error) {
        console.error('Error fetching stock quote:', error);
        throw new Error(`Failed to fetch quote for ${symbol}: ${error.message}`);
      }

      if (!data?.stockData || data.stockData.length === 0) {
        throw new Error(`No data returned for ${symbol}`);
      }

      const stockInfo = data.stockData[0];
      console.log(`Stock data received for ${symbol}:`, stockInfo);
      
      return {
        symbol: stockInfo.symbol,
        price: Number(stockInfo.price) || 0,
        change: Number(stockInfo.change) || 0,
        changePercent: Number(stockInfo.changePercent) || 0
      };
    } catch (error) {
      console.error('Error in fetchStockQuote:', error);
      throw error;
    }
  }

  static async fetchDividendData(symbol: string): Promise<DividendData> {
    try {
      console.log(`Fetching dividend data for ${symbol}...`);
      const { data, error } = await supabase.functions.invoke('fetch-stock-data', {
        body: { symbols: [symbol] }
      });

      if (error) {
        console.error('Error fetching dividend data:', error);
        throw new Error(`Failed to fetch dividend data for ${symbol}: ${error.message}`);
      }

      if (!data?.stockData || data.stockData.length === 0) {
        throw new Error(`No dividend data returned for ${symbol}`);
      }

      const stockInfo = data.stockData[0];
      console.log(`Dividend data received for ${symbol}:`, stockInfo);
      
      return {
        symbol: stockInfo.symbol,
        dividendYield: Number(stockInfo.dividendYield) || 0,
        annualDividend: Number(stockInfo.annualDividend) || 0,
        frequency: stockInfo.frequency || 'N/A'
      };
    } catch (error) {
      console.error('Error in fetchDividendData:', error);
      throw error;
    }
  }

  static async fetchBulkStockData(symbols: string[]): Promise<{
    quotes: StockQuote[];
    dividends: DividendData[];
  }> {
    try {
      console.log(`Fetching bulk stock data for symbols:`, symbols);
      const { data, error } = await supabase.functions.invoke('fetch-stock-data', {
        body: { symbols }
      });

      if (error) {
        console.error('Error fetching bulk stock data:', error);
        throw new Error(`Failed to fetch bulk stock data: ${error.message}`);
      }

      if (!data?.stockData) {
        throw new Error('No stock data returned from API');
      }

      console.log('Bulk stock data received:', data.stockData);

      const quotes: StockQuote[] = data.stockData.map((stock: any) => ({
        symbol: stock.symbol,
        price: Number(stock.price) || 0,
        change: Number(stock.change) || 0,
        changePercent: Number(stock.changePercent) || 0
      }));

      const dividends: DividendData[] = data.stockData.map((stock: any) => ({
        symbol: stock.symbol,
        dividendYield: Number(stock.dividendYield) || 0,
        annualDividend: Number(stock.annualDividend) || 0,
        frequency: stock.frequency || 'N/A'
      }));

      return { quotes, dividends };
    } catch (error) {
      console.error('Error in fetchBulkStockData:', error);
      throw error;
    }
  }
}
