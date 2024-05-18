import { type BackStageLog } from "@/utils/state";
import BackStageIcon from "../BackStageIcon";
import { Callout } from "@radix-ui/themes";

export const LogItem = ({ log }: { log: BackStageLog }) => {
	return (
		<Callout.Root size={'1'} variant="surface" className="p-1 flex justify-between">
			<Callout.Icon className="w-[22px]">
				<BackStageIcon size={20} name='zap' />
			</Callout.Icon>
			<Callout.Text className="flex w-full justify-between right-0">
				<span>{log.message}</span>
				{/* just me writing the most disgusting way to get the time with millis */}
				<span>{log.time.toISOString().split('T')[1].slice(0, 12)}</span>
			</Callout.Text>
		</Callout.Root>
	)
}
