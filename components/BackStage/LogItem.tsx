import { type BackStageLog } from "@/utils/state";
import BackStageIcon from "../BackStageIcon";
import { Callout } from "@radix-ui/themes";

export const LogItem = ({ log }: { log: BackStageLog }) => {
	return (
		<Callout.Root size={'1'}>
			<Callout.Icon>
				<BackStageIcon name='zap' />
			</Callout.Icon>
			<Callout.Text>
				{log.message}
			</Callout.Text>
		</Callout.Root>
	)
}
