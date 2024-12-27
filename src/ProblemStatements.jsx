import { useState } from "react";
import logo from "/public/cb.png";

function Prob() {
    const statements = [1, 2, 2, 8, 8, 8, 8, 8];
    const [pop, setPop] = useState(false);

    return (
        <div className="w-screen h-screen bg flex items-center justify-center">
            <div className="flex flex-wrap gap-3 w-96">
                {statements.map((i) => (
                    <div
                        key={i}
                        className="p-10 text-center border hover:bg-[#E16254] cursor-pointer"
                        onClick={() => { setPop(true); }}
                    >
                        <p className="text-white">{i}</p>
                    </div>
                ))}
            </div>
            {pop && (
                <div className="fixed inset-0 flex  flex-col items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-1/2 h-1/2 rounded-xl flex overflow-hidden shadow-lg">
                        <div className="bg-gray-600 w-1/2 flex items-center justify-center">
                            <img src={logo} alt="Logo" className="max-w-full max-h-full" />
                        </div>
                        <div className="w-1/2 flex flex-col">
                            <div className="p-4">
                            <div className=" flex justify-between items-center">
                                <h1 className="text-xl font-bold mb-2">Title</h1>
                                <h1 className=" rounded-xl p-4 text-right m-1 bg-red-600 text-white cursor-pointer" onClick={()=>{setPop(false)}}>X</h1>
                                </div>
                                <hr className="mb-2" />
                            </div>
                            <div className="overflow-y-auto flex-1 p-4">
                                <p className="h-96">dnekjnekwj</p>
                                <p className="h-96">dnekjnekwj</p>
                                <p className="h-96">dnekjnekwj</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            )}
        </div>
    );
}

export default Prob;