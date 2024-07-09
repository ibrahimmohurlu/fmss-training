export default function Loading() {
    return (
        <div className="container grid grid-cols-2  mx-auto mt-8">
            <div className="relative w-3/4 aspect-square mx-auto bg-gray-700 rounded-xl animate-pulse">

            </div>
            <div className="my-auto">
                <h1 className={`h-8 w-24 mb-6 bg-gray-700 animate-pulse px-2.5 py-0.5 rounded `}></h1>
                <h1 className=" h-12 mb-6 bg-gray-700 animate-pulse">

                </h1>
                <p className=" h-24 bg-gray-700 animate-pulse mb-6"></p>
                <div className="flex items-center justify-between mb-6">
                    <p className="h-8 w-24 bg-gray-700 animate-pulse ">

                    </p>
                    <div className="h-8 w-48 bg-gray-700 animate-pulse">

                    </div>
                </div>
                <form action="" className="flex justify-between">
                    <div className="h-16 w-24 bg-gray-700 animate-pulse">

                    </div>
                    <button type="submit" className="h-20 w-24 bg-gray-700 animate-pulse">

                    </button>
                </form>

            </div>

            <div id="reviews" className="col-span-2">
                <h1 className="text-4xl mb-6 font-bold ">Reviews</h1>
                <div className="w-full h-36 bg-gray-700 animate-pulse"></div>
            </div>
        </div>
    )
}