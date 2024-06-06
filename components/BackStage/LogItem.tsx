import { BackstageSystem, type BackStageLog } from "@/utils/state";
import BackStageIcon, { BackStageIconName } from "../BackStageIcon";
import { Callout } from "@radix-ui/themes";

export const LogItem = ({ log }: { log: BackStageLog }) => {
	const getIcon = (type: BackstageSystem): BackStageIconName => {
		switch (type) {
			case 'votes':
				return 'vote';
			case 'triggers':
				return 'zap';
			default:
				return 'circle-help';
		}
	}
	return (
		<Callout.Root size={'1'} variant="surface" className="p-1 flex justify-between">
			<Callout.Icon className="w-[22px]">
				<BackStageIcon size={20} name={getIcon(log.system)} />
			</Callout.Icon>
			<Callout.Text className="flex w-full justify-between right-0">
				<span>{log.message}</span>
				{/* just me writing the most disgusting way to get the time with millis */}
				<span>{log.time.toISOString().split('T')[1].slice(0, 12)}</span>
			</Callout.Text>
		</Callout.Root>
	)
}
