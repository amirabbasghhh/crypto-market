export async function getCoins(vs_currency: string ) {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}`,
        {
          next: { revalidate: 60 }, 
        }
      );
      
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
  
      return await res.json();
    } catch (error) {
      console.error("Error fetching coins:", error);
      return [];
    }
  }
  