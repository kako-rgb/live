import useAxios from "@/hooks/useAxios";
import BecomeVendor from "@/sections/home/become-vendor";
import CategorySection from "@/sections/home/category-section";
import PopularServices from "@/sections/home/popular-services";
import Setter from "@/sections/home/setter";
import TopBanner from "@/sections/home/top-banner";
import TopRatedVendors from "@/sections/home/top-rated-vendors";
import TrendingProducts from "@/sections/home/trending-products";

export default async function Home() {
  try {
    const request = useAxios();
    const response = await request({
      method: 'get',
      path: '/?prodLimit=8&servLimit=8&storeLimit=3'
    });

    // Ensure stores has a default value if response.data is undefined
    const stores = response?.data?.stores || [];

    return (
      <>
        <TopBanner />
        <CategorySection />
        <TrendingProducts />
        <BecomeVendor />
        <PopularServices />
        <TopRatedVendors stores={stores} />
        <Setter
          categories={response?.data?.categories || []}
          products={response?.data?.products || []}
          services={response?.data?.services || []}
        />
      </>
    );
  } catch (error) {
    console.error('Error in Home component:', error);
    throw error; // This will be caught by the error boundary
  }
}
