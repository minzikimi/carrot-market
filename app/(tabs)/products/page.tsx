import db from "@/lib/db";
import ListProduct from "@/components/list-product";
import ProductList from "@/components/product-list";
import { Prisma } from "@prisma/client";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { unstable_cache as nextCache } from "next/cache";

export const metadata = {
  title: "Home",
};
const getCachedProducts = nextCache(getInitialProducts, ["home-products"], {
  revalidate: 60,
});

async function getInitialProducts() {
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    console.log("hej!!!!");
    const products = await db.product.findMany({
      select: {
        title: true,
        price: true,
        created_at: true,
        photo: true,
        id: true,
      },
      // take: 1,
      orderBy: {
        created_at: "desc",
      },
    });
    return products;
  }

  export type InitialProducts = Prisma.PromiseReturnType<
   typeof getInitialProducts
 >;
 

  export default async function Products() {
    const initialProducts = await getCachedProducts();
    return(
        <div>
       <ProductList initialProducts={initialProducts} />
       <Link
         href="/products/add"
         className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
       >
         <PlusIcon className="size-10" />
       </Link>
     </div>
    )
}