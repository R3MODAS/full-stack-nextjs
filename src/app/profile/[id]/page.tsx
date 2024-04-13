const page = ({ params }: any) => {
    console.log(params)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2">
            <h1 className="text-xl">Profile page</h1>
            <p className="px-3 py-2 rounded bg-green-500 text-black">{params.id}</p>

        </div>
    )
}

export default page