import { Heading } from "@radix-ui/themes";
import RealTimeLatency from "./RealTimeLatency";

const FrontStage = () => {


    return (
        <>
            <Heading>This is FrontStage, the view thing</Heading>
            {/* <Badge>Latency: {"23".toFixed(1)}ms</Badge> */}
            <RealTimeLatency />
        </>
    );
}

export default FrontStage;
