import LW11Background from "@/components/BG/LW11Background"

export default function Index() {
    return (
        <>
            <div className="w-full bg-black">
                {/* <div className="w-full h-screen -z-10"> */}
                <LW11Background className="absolute z-0 top-0 left-0 right-0 w-full flex items-center justify-center opacity-100 transition-opacity" />
                {/* </div> */}
                <div className="flex items-center justify-center h-screen">
                    <div className="text-white text-2xl font-bold">Waiting for voting session to start...</div>
                </div>
            </div>
        </>
    );
};
