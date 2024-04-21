import LW11Background from "@/components/BG/LW11Background";

export default function Page() {
    // return <div>Test</div>;
    {/* return (<div className="bg-black w-full h-screen"> */ }
    return (<div className="w-full h-screen -z-10">
        <LW11Background className="absolute z-0 top-0 left-0 right-0 w-full flex items-center justify-center opacity-100 transition-opacity" />
    </div>);
}
