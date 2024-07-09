export default function ProductCardSkeleton() {
    return (
        <div className="w-full max-w-xs mx-auto mt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

            <div className="relative aspect-square w-60 mt-4 rounded-xl mx-auto animate-pulse bg-gray-700">

            </div>

            <div className="px-5 pb-5">

                <div className="h-4 mt-2 mb-2 bg-gray-700 animate-pulse" />

                <div className="h-4 mt-2 mb-2 bg-gray-700 animate-pulse" />

                <div className="h-4 bg-gray-700 animate-pulse mt-2 mb-5" />

                <div className="flex items-center justify-between">
                    <div className="h-8 w-24 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="h-8 w-24 bg-gray-700 animate-pulse rounded-lg"></div>
                </div>
            </div>
        </div>
    )
}