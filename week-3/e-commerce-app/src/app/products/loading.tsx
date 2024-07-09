import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function Loading() {
    return (
        <div className="container flex flex-wrap border border-gray-700 mx-auto mt-8">
            {
                new Array(9).fill(0).map((p, idx) => (<ProductCardSkeleton key={idx} />))
            }
        </div>
    )
}